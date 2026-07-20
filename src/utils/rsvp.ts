import { rsvpSettings } from '@/data/weddingConfig';
import type { RsvpFormData, RsvpSubmissionResult } from '@/types/wedding';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * RSVP SUBMISSION — FUTURE BACKEND INTEGRATION POINT
 * ─────────────────────────────────────────────────────────────────────────
 * No backend is wired up yet. This function is the single place the RSVP
 * form calls to submit a response, so it's the natural seam for adding real
 * persistence later without touching the form component.
 *
 * Planned integration (not yet implemented):
 *  1. Supabase — insert the RSVP into a `rsvps` table via
 *     `supabase.from('rsvps').insert({...})`. Suggested columns mirror
 *     `RsvpFormData` below plus `id`, `created_at`, and a `status` column
 *     for guest-management tracking.
 *  2. Email notifications — trigger a Supabase Edge Function (or a service
 *     like Resend/SendGrid) on insert to email `rsvpSettings.notificationEmail`
 *     (currently viamarzan.vm@gmail.com) with the new response, and
 *     optionally send the guest a confirmation email.
 *  3. Guest management dashboard — a separate authenticated view that reads
 *     from the same `rsvps` table to list/filter/export confirmed guests.
 *  4. RSVP confirmation tracking — dedupe/update responses by email so a
 *     guest can revise their RSVP; the `status` column above tracks
 *     confirmed/declined/pending state for the dashboard.
 *
 * Until that's wired up, this simulates a network round-trip and resolves
 * successfully so the UI/UX can be fully built and tested end-to-end.
 * ─────────────────────────────────────────────────────────────────────────
 */
export async function submitRsvp(data: RsvpFormData): Promise<RsvpSubmissionResult> {
  const payload = {
    ...data,
    numberOfGuests: rsvpSettings.allowAdditionalGuests ? data.numberOfGuests : 1,
    submittedAt: new Date().toISOString(),
  };

  // eslint-disable-next-line no-console
  console.info('[RSVP] Submission ready for backend integration:', payload);

  await new Promise((resolve) => setTimeout(resolve, 700));

  return { success: true };
}
