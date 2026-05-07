import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing authorization" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: authError } = await supabase.auth.getClaims(token);
    if (authError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log("Generating minutes for user:", userId);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { transcript, title, loopId, notes } = await req.json();

    // If no transcript provided, fetch from transcripts table
    let fullTranscript = transcript || '';
    if (!fullTranscript && loopId) {
      const { data: segments } = await supabase
        .from('transcripts')
        .select('chunk_text')
        .eq('loop_id', loopId)
        .order('chunk_index', { ascending: true });
      if (segments && segments.length > 0) {
        fullTranscript = segments.map((s: any) => s.chunk_text).join(' ');
      }
    }

    // Also fetch notes from DB if not provided
    let userNotes = notes || '';
    if (!userNotes && loopId) {
      const { data: noteData } = await supabase
        .from('notes')
        .select('content')
        .eq('loop_id', loopId)
        .order('created_at', { ascending: true });
      if (noteData && noteData.length > 0) {
        userNotes = noteData.map((n: any) => n.content).join('\n\n');
      }
    }

    // Fetch loop title if not provided
    let meetingTitle = title || 'Meeting';
    if (!title && loopId) {
      const { data: loop } = await supabase
        .from('loops')
        .select('title')
        .eq('id', loopId)
        .maybeSingle();
      if (loop?.title) meetingTitle = loop.title;
    }

    if (!fullTranscript && !userNotes) {
      return new Response(
        JSON.stringify({ error: "No transcript or notes provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating meeting minutes for: ${meetingTitle}, loopId: ${loopId}`);
    console.log(`Transcript length: ${fullTranscript.length}, Notes length: ${userNotes.length}`);

    // Build the prompt — include both transcript and notes
    let userContent = `Meeting Title: ${meetingTitle}\n\n`;
    if (fullTranscript) {
      userContent += `Meeting Transcript:\n${fullTranscript}\n\n`;
    }
    if (userNotes) {
      userContent += `User's Raw Notes:\n${userNotes}\n\n`;
    }
    userContent += 'Generate the meeting minutes and rewritten notes in JSON format.';

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional meeting minutes generator and note editor. Analyze the provided transcript and/or user notes and generate structured meeting minutes in JSON format.

Return a JSON object with exactly this structure:
{
  "suggestedTitle": "A short, descriptive title for this meeting (max 6 words, e.g. 'Q2 Marketing Strategy Review', 'Product Launch Planning', 'Design Sprint Kickoff')",
  "summary": "A brief 2-3 sentence executive summary of the meeting",
  "keyPoints": ["Array of 3-5 main discussion points"],
  "actionItems": ["Array of specific action items - each should be a clear, actionable task"],
  "decisions": ["Array of decisions made during the meeting"],
  "attendees": ["List of speaker names if detectable, otherwise empty array"],
  "language": "The primary language detected (e.g., English, Hindi, Spanish)",
  "rewrittenNotes": "A professionally rewritten version of the user's notes combined with insights from the transcript. Format these as clean, well-structured markdown with proper headings, bullet points, and clear professional language. Make them comprehensive yet concise. If no user notes were provided, generate professional notes from the transcript."
}

For suggestedTitle:
- Create a concise, meaningful title that captures the core topic of the meeting
- Keep it under 6 words
- Use title case
- Make it specific (not generic like 'Team Meeting' or 'Discussion')

For rewrittenNotes:
- Combine information from both the transcript and the user's raw notes
- Use professional business language
- Structure with clear headings and bullet points
- Include key decisions, action items, and discussion highlights
- Remove casual language, filler words, and redundancies
- Make the notes self-contained so someone who wasn't in the meeting can understand

For actionItems, extract clear tasks. Be concise but comprehensive.`
          },
          {
            role: "user",
            content: userContent
          }
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gateway Error:", errorData);
      throw new Error(`Gateway returned status ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content?.trim() || "";

    let minutes;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        minutes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse minutes:", parseError);
      minutes = {
        summary: "Unable to parse meeting summary. Please try regenerating.",
        keyPoints: [],
        actionItems: [],
        decisions: [],
        attendees: [],
        rewrittenNotes: ""
      };
    }

    // Ensure all required fields exist
    minutes = {
      suggestedTitle: minutes.suggestedTitle || "",
      summary: minutes.summary || "",
      keyPoints: Array.isArray(minutes.keyPoints) ? minutes.keyPoints : [],
      actionItems: Array.isArray(minutes.actionItems) ? minutes.actionItems : [],
      decisions: Array.isArray(minutes.decisions) ? minutes.decisions : [],
      attendees: Array.isArray(minutes.attendees) ? minutes.attendees : [],
      language: minutes.language || "Unknown",
      rewrittenNotes: minutes.rewrittenNotes || ""
    };

    // Auto-name meeting if user hasn't set a custom title
    const defaultTitles = ['untitled meeting', 'quick meeting', 'new note', 'meeting'];
    const isDefaultTitle = defaultTitles.includes(meetingTitle.toLowerCase().trim());
    if (loopId && isDefaultTitle && minutes.suggestedTitle) {
      console.log(`Auto-naming meeting: "${meetingTitle}" → "${minutes.suggestedTitle}"`);
      await supabase
        .from('loops')
        .update({ title: minutes.suggestedTitle })
        .eq('id', loopId);
      meetingTitle = minutes.suggestedTitle;
    }

    // Save action items to tasks table
    if (loopId && minutes.actionItems.length > 0) {
      console.log(`Saving ${minutes.actionItems.length} action items`);
      
      await supabase
        .from('tasks')
        .delete()
        .eq('loop_id', loopId)
        .eq('user_id', userId);

      const tasksToInsert = minutes.actionItems.map((item: string, index: number) => ({
        title: item,
        user_id: userId,
        loop_id: loopId,
        source: meetingTitle,
        priority: index === 0 ? 'high' : 'medium',
        status: 'pending'
      }));

      const { error: insertError } = await supabase
        .from('tasks')
        .insert(tasksToInsert);

      if (insertError) {
        console.error("Error saving tasks:", insertError);
      }
    }

    // Update loops table with summary, language, and mark as completed
    if (loopId) {
      await supabase
        .from('loops')
        .update({ 
          action_items: minutes.actionItems,
          summary: JSON.stringify(minutes),
          language: minutes.language,
          status: 'completed'
        })
        .eq('id', loopId);

      // Save rewritten notes back to notes table
      if (minutes.rewrittenNotes) {
        const { data: existingNote } = await supabase
          .from('notes')
          .select('id')
          .eq('loop_id', loopId)
          .maybeSingle();

        if (existingNote) {
          await supabase
            .from('notes')
            .update({ rewritten_content: minutes.rewrittenNotes })
            .eq('id', existingNote.id);
        } else {
          await supabase
            .from('notes')
            .insert({
              loop_id: loopId,
              user_id: userId,
              content: userNotes || '',
              rewritten_content: minutes.rewrittenNotes
            });
        }
      }
    }

    console.log("Minutes generated successfully");

    // Fire-and-forget notification
    try {
      const notificationUrl = `${supabaseUrl}/functions/v1/send-notification`;
      fetch(notificationUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          type: "meeting_completed",
          userId,
          data: {
            title: meetingTitle,
            summary: minutes.summary,
            actionItemsCount: minutes.actionItems.length,
            loopId: loopId || "",
          },
        }),
      }).catch(err => console.error("Notification send failed:", err));
    } catch (notifError) {
      console.error("Failed to trigger notification:", notifError);
    }

    return new Response(
      JSON.stringify({ minutes }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Generate Minutes Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});