

# Email Notification System for Loop

## Overview
Build a notification email system using **Resend** (via a Supabase Edge Function) to send emails to users when key events occur: meeting completed, weekly digest, and meeting reminders.

> **Note:** EmailJS is a frontend-only email service and is not recommended for this use case since we need server-side sending with user data from the database. Resend is the right choice here -- it's secure, works perfectly with Edge Functions, and handles all three notification types.

---

## What You'll Need

Before implementation, you'll need a **Resend API key**:
1. Sign up at [resend.com](https://resend.com)
2. Verify your email domain at [resend.com/domains](https://resend.com/domains)
3. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)

---

## Implementation Steps

### Step 1: Add RESEND_API_KEY Secret
- Store the Resend API key as a Supabase secret so Edge Functions can use it securely.

### Step 2: Database -- Notification Preferences Table
Create a `notification_preferences` table so users can control which emails they receive:

| Column | Type | Default |
|--------|------|---------|
| id | uuid | gen_random_uuid() |
| user_id | text (unique) | -- |
| meeting_completed | boolean | true |
| weekly_digest | boolean | true |
| meeting_reminders | boolean | true |
| created_at | timestamptz | now() |
| updated_at | timestamptz | now() |

RLS policies will ensure users can only read/update their own preferences.

### Step 3: Edge Function -- `send-notification`
A single Edge Function that handles all three email types based on a `type` parameter:

- **meeting_completed**: Triggered after `generate-minutes` finishes. Sends a summary email with key points and action items count.
- **weekly_digest**: Triggered by a scheduled call (or manually). Queries the user's meetings and tasks from the past week and sends a summary.
- **meeting_reminder**: Sends a reminder about unreviewed meetings (loops with no MoM generated).

The function will:
1. Look up the user's email from the `profiles` table
2. Check `notification_preferences` to see if this type is enabled
3. Send a styled HTML email via Resend
4. Skip silently if the user has disabled that notification type

### Step 4: Integrate into Meeting Flow
Update `generate-minutes/index.ts` to call `send-notification` (via internal fetch) after successfully generating minutes, triggering the "meeting completed" email.

### Step 5: Notification Settings UI
Add a "Notifications" tab to the Settings page with toggles for:
- Meeting completed emails
- Weekly digest emails
- Meeting reminder emails

Each toggle updates the `notification_preferences` table in real-time.

---

## Technical Details

### Email Templates
Each email type will have a clean, branded HTML template:

- **Meeting Completed**: Subject line "[Meeting Title] - Minutes Ready", includes summary, action items count, and a link to view the full loop.
- **Weekly Digest**: Subject "Your Weekly Loop Digest", lists meetings count, tasks created, tasks completed, and top action items.
- **Meeting Reminder**: Subject "You have unreviewed meetings", lists loops without generated minutes.

### Edge Function Structure
```text
supabase/functions/send-notification/index.ts
```

Request body format:
```text
{
  "type": "meeting_completed" | "weekly_digest" | "meeting_reminder",
  "userId": "user-uuid",
  "data": { ... type-specific data ... }
}
```

### Files to Create
- `supabase/functions/send-notification/index.ts` -- Main email sending function
- Database migration for `notification_preferences` table

### Files to Modify
- `supabase/functions/generate-minutes/index.ts` -- Add call to send notification after minutes are generated
- `src/pages/Settings.tsx` -- Add Notifications tab with preference toggles
- `supabase/config.toml` -- Register the new edge function

