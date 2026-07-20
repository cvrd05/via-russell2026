/**
 * ─────────────────────────────────────────────────────────────────────────
 * Via & Russell — Wedding RSVP Web App (Google Apps Script)
 * ─────────────────────────────────────────────────────────────────────────
 * Receives RSVP submissions POSTed as JSON from the wedding website
 * (src/utils/rsvp.ts), appends a row to the RSVP sheet, and emails a
 * notification to the couple.
 *
 * This file is kept in the website repo purely for reference/version
 * control — it must be pasted into the actual Apps Script project (the
 * one behind the deployed Web App URL) to take effect. See the deployment
 * notes at the bottom of this file.
 * ─────────────────────────────────────────────────────────────────────────
 */

// ── CONFIGURE THESE ─────────────────────────────────────────────────────

// Tab name inside the spreadsheet that RSVP rows are appended to.
// Change this if your tab isn't literally named "RSVP".
const SHEET_NAME = 'RSVP';

// Where RSVP notification emails are sent.
const NOTIFICATION_EMAIL = 'viamarzan.vm@gmail.com';

// If this script is bound to the spreadsheet (created via
// Extensions > Apps Script from inside the Sheet itself — the normal way),
// leave this as-is; SpreadsheetApp.getActiveSpreadsheet() will resolve to
// "ViaRussell2026-RSVP" automatically. If this is a standalone script
// instead, replace getActiveSpreadsheet() below with
// SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').

// ─────────────────────────────────────────────────────────────────────────

function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'Via & Russell RSVP API is running.' });
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (parseError) {
    Logger.log('doPost: failed to parse request body — ' + parseError.message);
    return jsonResponse({ status: 'error', message: 'Invalid request body.' });
  }

  // 1. Save to the sheet first. If this fails, stop here and report the
  // error — we don't want to email a notification for an RSVP that was
  // never actually recorded.
  try {
    appendRsvpToSheet(data);
    Logger.log('RSVP saved');
  } catch (sheetError) {
    Logger.log('doPost: sheet append failed — ' + sheetError.message);
    return jsonResponse({
      status: 'error',
      message: 'Failed to save the RSVP. Please try again.',
    });
  }

  // 2. Send the email notification only after the sheet write succeeded.
  try {
    sendRsvpNotificationEmail(data);
    Logger.log('Email sent successfully');
  } catch (emailError) {
    // The RSVP is already safely recorded in the sheet at this point, so
    // this is logged (not silently swallowed) and reported back distinctly
    // rather than telling the guest their RSVP failed outright.
    Logger.log('doPost: email notification failed — ' + emailError.message);
    return jsonResponse({
      status: 'success',
      emailStatus: 'failed',
      message: 'RSVP saved, but the email notification failed to send.',
    });
  }

  return jsonResponse({ status: 'success' });
}

function appendRsvpToSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet tab "' + SHEET_NAME + '" was not found in this spreadsheet.');
  }

  // Column order: Timestamp, Name, Email, Phone, Invite Code, Attending,
  // Number of Guests, Guest Names, Meal Choice, Song Request, Message,
  // Source. If your sheet's header row uses a different order, reorder
  // this array to match it exactly — appendRow() fills columns
  // left-to-right with no regard for header labels.
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.inviteCode || '',
    data.attending || '',
    data.guests || '',
    data.guestNames || '',
    data.meal || '',
    data.song || '',
    data.message || '',
    data.source || '',
  ]);
}

function sendRsvpNotificationEmail(data) {
  const subject = '🎉 New Wedding RSVP Received';
  const submittedAt = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'MMMM d, yyyy h:mm a',
  );

  const body = [
    'New RSVP received:',
    '',
    'Name: ' + (data.name || ''),
    'Email: ' + (data.email || ''),
    'Phone: ' + (data.phone || ''),
    'Invite Code: ' + (data.inviteCode || ''),
    'Attending: ' + (data.attending || ''),
    'Number of Guests: ' + (data.guests || ''),
    'Guest Names: ' + (data.guestNames || ''),
    'Meal Choice: ' + (data.meal || ''),
    'Song Request: ' + (data.song || ''),
    'Message: ' + (data.message || ''),
    'Submission Date: ' + submittedAt,
  ].join('\n');

  // MailApp is used instead of GmailApp because it only needs the
  // lightweight "send email" scope (no Gmail account access) and is the
  // standard choice for simple notification emails like this one.
  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body,
  });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/**
 * Run this manually once from the Apps Script editor (select
 * "testSendEmail" in the function dropdown, then click ▶ Run) to trigger
 * the one-time authorization prompt for MailApp and confirm the email
 * actually arrives, without needing a real form submission.
 */
function testSendEmail() {
  sendRsvpNotificationEmail({
    name: 'Test Guest',
    email: 'test@example.com',
    phone: '+63 900 000 0000',
    inviteCode: 'TEST-CODE',
    attending: 'Attending',
    guests: '1',
    guestNames: '',
    meal: 'No restrictions',
    song: 'Perfect — Ed Sheeran',
    message: 'This is a test RSVP.',
  });
  Logger.log('testSendEmail: email sent successfully');
}
