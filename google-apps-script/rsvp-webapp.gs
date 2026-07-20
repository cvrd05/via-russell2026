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
const SHEET_NAME = 'RSVP';

// Comma-separated list of recipients for the RSVP notification email.
// Each address is trimmed and validated at send time — a stray space or
// typo here fails loudly (logged, and the doPost response reports it)
// instead of silently dropping the notification.
const NOTIFICATION_EMAIL = 'viamarzan.vm@gmail.com, delasalascyrus@gmail.com';

// Leave this blank ('') if this script is BOUND to the spreadsheet
// (created via Extensions > Apps Script from inside the Sheet itself —
// the normal way). In that case SpreadsheetApp.getActiveSpreadsheet()
// resolves to it automatically.
//
// If this is a STANDALONE script instead (created directly at
// script.google.com, not from within the Sheet), getActiveSpreadsheet()
// returns null and every request will fail. Paste your spreadsheet ID
// here — it's the long string in the sheet's URL between /d/ and /edit,
// e.g. https://docs.google.com/spreadsheets/d/**THIS_PART**/edit — and
// the script will use SpreadsheetApp.openById(...) instead.
const SPREADSHEET_ID = '';

// ─────────────────────────────────────────────────────────────────────────

function doGet(e) {
  Logger.log('doGet triggered');
  return jsonResponse({
    status: 'ok',
    message: 'Via & Russell RSVP API is running.',
    deployedVersionCheck: new Date().toISOString(),
  });
}

function doPost(e) {
  Logger.log('doPost triggered');

  if (!e || !e.postData || !e.postData.contents) {
    Logger.log('doPost: request had no postData.contents — request body was empty.');
    return jsonResponse({ status: 'error', message: 'Empty request body.' });
  }

  let data;
  try {
    data = JSON.parse(e.postData.contents);
    Logger.log('doPost: payload parsed — name=' + data.name + ', email=' + data.email);
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
      message: 'Failed to save the RSVP: ' + sheetError.message,
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
      message: 'RSVP saved, but the email notification failed: ' + emailError.message,
    });
  }

  return jsonResponse({ status: 'success' });
}

function getRsvpSpreadsheet() {
  if (SPREADSHEET_ID) {
    Logger.log('getRsvpSpreadsheet: opening by SPREADSHEET_ID');
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error(
      'This script is not bound to a spreadsheet (getActiveSpreadsheet() returned null). ' +
        'It is a standalone script — set the SPREADSHEET_ID constant near the top of this file.',
    );
  }
  Logger.log('getRsvpSpreadsheet: using bound spreadsheet "' + active.getName() + '"');
  return active;
}

function appendRsvpToSheet(data) {
  const spreadsheet = getRsvpSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error(
      'Sheet tab "' +
        SHEET_NAME +
        '" was not found in spreadsheet "' +
        spreadsheet.getName() +
        '". Tabs available: ' +
        spreadsheet
          .getSheets()
          .map(function (s) {
            return s.getName();
          })
          .join(', '),
    );
  }
  Logger.log('appendRsvpToSheet: sheet tab "' + SHEET_NAME + '" found, appending row');

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

/**
 * Splits NOTIFICATION_EMAIL on commas, trims whitespace off each address,
 * drops empty entries, and rejects anything that doesn't look like a
 * plausible email address — so a typo (e.g. a stray space splitting one
 * address into two garbage tokens) throws a clear, loud error instead of
 * MailApp silently failing or erroring on an unhelpful message.
 */
function getValidatedRecipients() {
  const emailPattern = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/;
  const recipients = NOTIFICATION_EMAIL.split(',')
    .map(function (address) {
      return address.trim();
    })
    .filter(function (address) {
      return address.length > 0;
    });

  const invalid = recipients.filter(function (address) {
    return !emailPattern.test(address);
  });

  if (invalid.length > 0) {
    throw new Error(
      'NOTIFICATION_EMAIL contains invalid address(es): "' +
        invalid.join('", "') +
        '". Check for stray spaces or typos.',
    );
  }

  if (recipients.length === 0) {
    throw new Error('NOTIFICATION_EMAIL is empty — no recipients configured.');
  }

  return recipients.join(',');
}

function sendRsvpNotificationEmail(data) {
  const recipients = getValidatedRecipients();
  Logger.log('sendRsvpNotificationEmail: sending to ' + recipients);

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
  // MailApp.sendEmail accepts a comma-separated string for multiple "to"
  // recipients.
  MailApp.sendEmail({
    to: recipients,
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
 * actually arrives, without needing a real form submission. Also
 * exercises getValidatedRecipients(), so a bad NOTIFICATION_EMAIL value
 * shows up here immediately.
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

/**
 * Run this manually to exercise the FULL doPost flow (parse → sheet →
 * email) from inside the Apps Script editor, without needing the website
 * or any network request at all. This isolates "is my Apps Script logic
 * correct" from "is the website's request actually reaching Apps Script"
 * — if this fails, the bug is in this script or the Sheet/permissions; if
 * this succeeds but real website submissions still don't show up, the
 * problem is the deployment (stale version) or the request never arriving.
 */
function testDoPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        inviteCode: 'TEST-CODE',
        name: 'Test Guest (testDoPost)',
        email: 'test@example.com',
        phone: '+63 900 000 0000',
        attending: 'Attending',
        guests: '1',
        guestNames: '',
        meal: 'No restrictions',
        song: 'Perfect — Ed Sheeran',
        message: 'This is a testDoPost() run.',
        source: 'Apps Script Manual Test',
      }),
    },
  };

  const result = doPost(fakeEvent);
  Logger.log('testDoPost: doPost returned — ' + result.getContent());
}
