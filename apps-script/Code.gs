const SHEET_NAME = 'Sheet1';
const HEADERS = ['Timestamp', 'Name', 'Phone', 'Email', 'Source'];

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== HEADERS[0]) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function setup() {
  getSheet_();
}

function doPost(e) {
  const data = e && e.parameter ? e.parameter : {};
  const name = String(data.name || '').trim();
  const phone = String(data.phone || '').trim();
  const email = String(data.email || '').trim().toLowerCase();
  const source = String(data.source || 'kurced-website').trim();

  if (!name || !phone || !/^\S+@\S+\.\S+$/.test(email)) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Please provide a name, phone number, and valid email.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet_().appendRow([new Date(), name, phone, email, source]);
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput('Kurced mailing list collector is online.');
}
