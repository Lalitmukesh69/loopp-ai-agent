import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Helper to efficiently convert ArrayBuffer to Base64 without exceeding memory limits
// The standard Deno base64 encoder concatenates strings byte-by-byte which causes
// V8 to run out of memory (exceed 256MB) for audio files larger than a few MBs.
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 32768; // 32KB chunks to avoid call stack limits
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  return btoa(binary);
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// CONFIGURATION
// If "google/gemini-2.5-flash" fails, switch this to "google/gemini-2.0-flash-exp"
// Gemini 2.0 Flash is specifically optimized for real-time audio.
const MODEL_NAME = "google/gemini-2.5-flash"; 

serve(async (req) => {
  // 1. Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
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
    console.log("Authenticated user:", userId);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // 2. Parse the Audio File
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) throw new Error("No audio file provided");

    // 3. Prepare Audio for Gemini
    // We use standard Base64 encoding with a memory-efficient chunked approach. 
    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = arrayBufferToBase64(arrayBuffer);
    const mimeType = audioFile.type || "audio/webm";

    console.log(`Transcribing ${audioFile.size} bytes using ${MODEL_NAME}...`);

    // 4. Call Gemini Gateway
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            // SYSTEM PROMPT: Strictly enforces Speech-to-Text behavior
            content: "You are a professional transcriber. Your task is to output the exact text from the audio. Do not add timestamps, do not add speaker labels, and do not add conversational fillers. Output ONLY the text. CRITICAL INSTRUCTION: If the audio is completely silent, contains only white noise, or has no discernible speech, you MUST output exactly the word [SILENCE] and nothing else. Do not hallucinate advertisements, programs, or random text."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Transcribe this audio."
              },
              {
                type: "image_url", // Standard OpenAI-compat format for Gemini Audio
                image_url: {
                  url: `data:${mimeType};base64,${base64Audio}`,
                },
              },
            ],
          },
        ],
        temperature: 0.0, // 0.0 is crucial for transcription accuracy
        max_tokens: 8192,
      }),
    });

    // 5. Handle Gateway Errors (prevent 500 crash)
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gateway Error:", errorData);
      
      // Check specifically if the model name is wrong
      if (errorData.includes("model") && errorData.includes("found")) {
         return new Response(
          JSON.stringify({ 
            error: `The model '${MODEL_NAME}' does not exist. Please try 'google/gemini-2.0-flash-exp' or 'google/gemini-1.5-flash'.` 
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`Gateway returned status ${response.status}: ${errorData}`);
    }

    const result = await response.json();
    let transcription = result.choices?.[0]?.message?.content?.trim() || "";

    // 5.5 Handle Silence and Known Hallucinations
    const lowerTranscript = transcription.toLowerCase();
    if (
      transcription === "[SILENCE]" ||
      lowerTranscript.includes("paid advertisement for") ||
      lowerTranscript.includes("pro vibe") ||
      lowerTranscript.includes("united states air force")
    ) {
      console.log("Filtered out silence or known hallucination.");
      transcription = "";
    }

    console.log("Transcription result:", transcription.substring(0, 200));

    // 6. Return Success
    return new Response(
      JSON.stringify({ transcription }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Transcription Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
