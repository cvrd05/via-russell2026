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
  'https://script.google.com/macros/s/AKfycbxUiAHK9WfVNLmCgX4IsZ5Np-B4cRxJa1vAp5hd-lRX43vquJ4u0RDwsdVP8acFZvr0/exec';

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
 * schema. The form doesn't yet collect an invite code, a meal choice, or a
 * song request, so those are sent as empty strings (the sheet will simply
 * have blank cells for them) — `dietaryRestrictions` is mapped to `meal`
 * since it's the closest existing field. Add UI inputs for the others later
 * if the couple wants guests to fill them in directly.
 */
function buildPayload(data: RsvpFormData): GoogleSheetsRsvpPayload {
  const guestCount = rsvpSettings.allowAdditionalGuests ? data.numberOfGuests : 1;

  // Only the additional party members beyond the primary submitter — whose
  // own name already lives in the `name` field above — and only as many
  // slots as `guestCount` actually calls for (the guestNames array is kept
  // at a fixed length in form state regardless of the current count).
  const additionalGuestNames = data.guestNames
    .slice(0, Math.max(guestCount - 1, 0))
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  return {
    inviteCode: '',
    name: data.fullName,
    email: data.email,
    phone: data.contactNumber,
    attending: ATTENDANCE_LABELS[data.attendance],
    guests: String(guestCount),
    guestNames: additionalGuestNames.join(', '),
    meal: data.dietaryRestrictions,
    song: '',
    message: data.message,
    source: 'Wedding Website',
  };
}

export async function submitRsvp(data: RsvpFormData): Promise<RsvpSubmissionResult> {
  const payload = buildPayload(data);

  try {
    await fetch(RSVP_ENDPOINT, {
      method: 'POST',
      // Explicit text/plain Content-Type (never "application/json") keeps
      // this a CORS-simple request so the browser never sends a preflight
      // OPTIONS request, which Google Apps Script web apps don't support.
      // Apps Script still reads the raw JSON via e.postData.contents and
      // JSON.parse()s it on the server side.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      // "no-cors" is required here. Google Apps Script's actual /exec
      // response frequently doesn't carry a reliable
      // Access-Control-Allow-Origin header, so a normal cors-mode fetch
      // throws "TypeError: Failed to fetch" even though the request
      // reached Apps Script and executed successfully — this is exactly
      // why the Sheet was already receiving rows despite the website
      // showing an error. no-cors sidesteps that response-readability
      // check; the request still goes through and doPost still runs, we
      // just can't read a body/status back.
      //
      // Trade-off: with an opaque no-cors response, we can no longer tell
      // a genuine server-side failure (e.g. a typo'd sheet name) apart
      // from success — any dispatched request that doesn't hit a real
      // network error resolves here as success. Deliberately NOT retried
      // with a second request on failure, since Apps Script may have
      // already processed the first one; retrying risks a duplicate row
      // + duplicate notification email for a single RSVP. Monitor the
      // Apps Script "Executions" log for real server-side errors instead.
      mode: 'no-cors',
      body: JSON.stringify(payload),
    });

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
