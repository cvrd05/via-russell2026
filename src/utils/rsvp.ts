import { rsvpSettings } from '@/data/weddingConfig';
import type { AttendanceStatus, RsvpFormData, RsvpSubmissionResult } from '@/types/wedding';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * RSVP SUBMISSION — Google Apps Script / Google Sheets integration
 * ─────────────────────────────────────────────────────────────────────────
 * Submissions are POSTed as JSON to a Google Apps Script Web App, which is
 * expected to append the row to the "ViaRussell2026-RSVP" Google Sheet and
 * email a notification to the couple.
 *
 * The endpoint is configurable via the VITE_RSVP_ENDPOINT environment
 * variable (see .env.example) and falls back to the couple's deployed Web
 * App URL below so the form works out of the box without extra setup.
 * ─────────────────────────────────────────────────────────────────────────
 */
const RSVP_ENDPOINT =
  import.meta.env.VITE_RSVP_ENDPOINT ??
  'https://script.google.com/macros/s/AKfycby3nba_eUHEyJxnDptweTuY8FKltrCeTeFxNuf3j7l1JxAtkCApjz6gu52R8nO3P1Y/exec';

/**
 * Shape expected by the Google Apps Script Web App / RSVP Google Sheet.
 * Every field is a string because Apps Script writes each one directly into
 * a Sheet cell.
 */
interface GoogleSheetsRsvpPayload {
  inviteCode: string;
  name: string;
  email: string;
  phone: string;
  attending: string;
  guests: string;
  guestNames: string;
  meal: string;
  song: string;
  message: string;
  source: string;
}

/**
 * Human-readable labels sent to the sheet for the `attending` column.
 * Adjust these if the Apps Script expects a different exact string
 * (e.g. "Yes" / "No").
 */
const ATTENDANCE_LABELS: Record<AttendanceStatus, string> = {
  attending: 'Attending',
  'not-attending': 'Not Attending',
};

/**
 * Maps the site's current RSVP form fields onto the Google Sheet's column
 * schema. The form doesn't yet collect an invite code, per-guest names, a
 * meal choice, or a song request, so those are sent as empty strings (the
 * sheet will simply have blank cells for them) — `dietaryRestrictions` is
 * mapped to `meal` since it's the closest existing field. Add UI inputs for
 * the others later if the couple wants guests to fill them in directly.
 */
function buildPayload(data: RsvpFormData): GoogleSheetsRsvpPayload {
  return {
    inviteCode: '',
    name: data.fullName,
    email: data.email,
    phone: data.contactNumber,
    attending: ATTENDANCE_LABELS[data.attendance],
    guests: String(rsvpSettings.allowAdditionalGuests ? data.numberOfGuests : 1),
    guestNames: '',
    meal: data.dietaryRestrictions,
    song: '',
    message: data.message,
    source: 'Wedding Website',
  };
}

export async function submitRsvp(data: RsvpFormData): Promise<RsvpSubmissionResult> {
  const payload = buildPayload(data);

  try {
    const response = await fetch(RSVP_ENDPOINT, {
      method: 'POST',
      // Deliberately no Content-Type header. Setting one (e.g.
      // "application/json") makes this a non-simple CORS request, which
      // triggers a preflight OPTIONS request — Google Apps Script web apps
      // don't handle that. Leaving it unset makes the browser send
      // "text/plain;charset=UTF-8" instead, which is preflight-exempt;
      // Apps Script still reads the raw JSON via e.postData.contents and
      // JSON.parse()s it on the server side.
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, error: `The RSVP service responded with status ${response.status}.` };
    }

    // Apps Script response bodies vary by implementation — treat a
    // parseable JSON body with an explicit error flag as a failure,
    // otherwise trust the HTTP 200 status as a successful submission.
    try {
      const result = await response.json();
      if (result && typeof result === 'object' && result.status === 'error') {
        return { success: false, error: result.message ?? 'The RSVP service reported an error.' };
      }
    } catch {
      // Non-JSON response body — fall through and treat as success.
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? `Unable to reach the RSVP service (${error.message}).`
          : 'Unable to reach the RSVP service.',
    };
  }
}
