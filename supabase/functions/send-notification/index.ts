import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

function meetingCompletedHtml(data: { title: string; summary: string; actionItemsCount: number; loopId: string }) {
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #111; margin: 0;">Loop</h1>
    </div>
    <div style="background: #f9f9f9; border-radius: 16px; padding: 32px;">
      <h2 style="font-size: 18px; font-weight: 600; color: #111; margin: 0 0 8px;">Meeting Minutes Ready</h2>
      <p style="font-size: 14px; color: #666; margin: 0 0 20px;">${data.title}</p>
      <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <p style="font-size: 14px; color: #333; line-height: 1.6; margin: 0;">${data.summary}</p>
      </div>
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="background: white; border-radius: 12px; padding: 16px; flex: 1; text-align: center;">
          <p style="font-size: 24px; font-weight: 700; color: #4F46E5; margin: 0;">${data.actionItemsCount}</p>
          <p style="font-size: 12px; color: #999; margin: 4px 0 0;">Action Items</p>
        </div>
      </div>
    </div>
    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 24px;">You received this because meeting notifications are enabled in your Loop settings.</p>
  </div>`;
}

function weeklyDigestHtml(data: { meetingsCount: number; tasksCreated: number; tasksCompleted: number; topItems: string[] }) {
  const itemsHtml = data.topItems.map(item => `<li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #333;">${item}</li>`).join('');
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #111; margin: 0;">Loop</h1>
    </div>
    <div style="background: #f9f9f9; border-radius: 16px; padding: 32px;">
      <h2 style="font-size: 18px; font-weight: 600; color: #111; margin: 0 0 20px;">Your Weekly Digest</h2>
      <div style="display: flex; gap: 12px; margin-bottom: 24px;">
        <div style="background: white; border-radius: 12px; padding: 16px; flex: 1; text-align: center;">
          <p style="font-size: 24px; font-weight: 700; color: #4F46E5; margin: 0;">${data.meetingsCount}</p>
          <p style="font-size: 11px; color: #999; margin: 4px 0 0;">Meetings</p>
        </div>
        <div style="background: white; border-radius: 12px; padding: 16px; flex: 1; text-align: center;">
          <p style="font-size: 24px; font-weight: 700; color: #10B981; margin: 0;">${data.tasksCompleted}</p>
          <p style="font-size: 11px; color: #999; margin: 4px 0 0;">Completed</p>
        </div>
        <div style="background: white; border-radius: 12px; padding: 16px; flex: 1; text-align: center;">
          <p style="font-size: 24px; font-weight: 700; color: #F59E0B; margin: 0;">${data.tasksCreated}</p>
          <p style="font-size: 11px; color: #999; margin: 4px 0 0;">New Tasks</p>
        </div>
      </div>
      ${data.topItems.length > 0 ? `<div style="background: white; border-radius: 12px; padding: 16px;"><h3 style="font-size: 13px; font-weight: 600; color: #666; margin: 0 0 12px;">Top Action Items</h3><ul style="list-style: none; padding: 0; margin: 0;">${itemsHtml}</ul></div>` : ''}
    </div>
    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 24px;">You received this because weekly digest is enabled in your Loop settings.</p>
  </div>`;
}

function meetingReminderHtml(data: { unreviewedLoops: { id: string; title: string; created_at: string }[] }) {
  const loopsHtml = data.unreviewedLoops.map(l => `<li style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #333;">${l.title} <span style="color: #999; font-size: 12px;">(${new Date(l.created_at).toLocaleDateString()})</span></li>`).join('');
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #111; margin: 0;">Loop</h1>
    </div>
    <div style="background: #f9f9f9; border-radius: 16px; padding: 32px;">
      <h2 style="font-size: 18px; font-weight: 600; color: #111; margin: 0 0 8px;">You Have Unreviewed Meetings</h2>
      <p style="font-size: 14px; color: #666; margin: 0 0 20px;">${data.unreviewedLoops.length} meeting(s) still need minutes generated.</p>
      <div style="background: white; border-radius: 12px; padding: 16px;">
        <ul style="list-style: none; padding: 0; margin: 0;">${loopsHtml}</ul>
      </div>
    </div>
    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 24px;">You received this because meeting reminders are enabled in your Loop settings.</p>
  </div>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { type, userId, data } = await req.json();

    if (!type || !userId) {
      return new Response(JSON.stringify({ error: "Missing type or userId" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Get user email from profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("user_id", userId)
      .maybeSingle();

    if (!profile?.email) {
      return new Response(JSON.stringify({ error: "User email not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Check notification preferences
    const { data: prefs } = await supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    // Default all to true if no preferences row exists
    const preferences = prefs || { meeting_completed: true, weekly_digest: true, meeting_reminders: true };

    let subject = "";
    let html = "";
    let shouldSend = true;

    switch (type) {
      case "meeting_completed":
        shouldSend = preferences.meeting_completed;
        subject = `${data.title} - Minutes Ready`;
        html = meetingCompletedHtml(data);
        break;

      case "weekly_digest":
        shouldSend = preferences.weekly_digest;
        subject = "Your Weekly Loop Digest";
        // Fetch weekly stats
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const [meetingsRes, tasksRes] = await Promise.all([
          supabase.from("loops").select("id").eq("user_id", userId).gte("created_at", weekAgo),
          supabase.from("tasks").select("id, title, status").eq("user_id", userId).gte("created_at", weekAgo),
        ]);
        const tasks = tasksRes.data || [];
        html = weeklyDigestHtml({
          meetingsCount: meetingsRes.data?.length || 0,
          tasksCreated: tasks.length,
          tasksCompleted: tasks.filter(t => t.status === "completed").length,
          topItems: tasks.filter(t => t.status !== "completed").slice(0, 5).map(t => t.title),
        });
        break;

      case "meeting_reminder":
        shouldSend = preferences.meeting_reminders;
        subject = "You have unreviewed meetings";
        const { data: unreviewed } = await supabase
          .from("loops")
          .select("id, title, created_at")
          .eq("user_id", userId)
          .is("summary", null)
          .eq("status", "completed")
          .order("created_at", { ascending: false })
          .limit(10);
        if (!unreviewed || unreviewed.length === 0) {
          return new Response(JSON.stringify({ skipped: true, reason: "No unreviewed meetings" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        html = meetingReminderHtml({ unreviewedLoops: unreviewed });
        break;

      default:
        return new Response(JSON.stringify({ error: "Invalid notification type" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }

    if (!shouldSend) {
      return new Response(JSON.stringify({ skipped: true, reason: "Notification disabled by user" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const emailRes = await resend.emails.send({
      from: "Loop <noreply@resend.dev>",
      to: [profile.email],
      subject,
      html,
    });

    console.log("Email sent:", emailRes);

    return new Response(JSON.stringify({ success: true, emailId: emailRes.data?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Send notification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
