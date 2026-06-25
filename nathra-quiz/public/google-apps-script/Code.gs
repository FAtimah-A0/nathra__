/**
 * نثرة — حفظ بيانات الاختبار في Google Sheets
 * الجدول: https://docs.google.com/spreadsheets/d/1I7IS8-KC917YoYmC9CI7zIzqbYSvDohIIOPPo_uvWmw
 *
 * Deploy → Web app → Execute as: Me → Who has access: Anyone
 */

const SPREADSHEET_ID = '1I7IS8-KC917YoYmC9CI7zIzqbYSvDohIIOPPo_uvWmw';
const HEADERS = ['الاسم', 'الجوال', 'المستوى', 'الموضوع', 'النتيجة', 'التاريخ'];

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];
  ensureHeaders_(sheet);
  return sheet;
}

function ensureHeaders_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    return;
  }

  const firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell !== HEADERS[0]) {
    sheet.insertRowsBefore(1, 1);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function appendLeadRow(params) {
  const sheet = getSheet_();
  sheet.appendRow([
    params.name || '',
    params.phone || '',
    params.level || '',
    params.topic || '',
    params.score || '',
    params.timestamp || new Date().toLocaleString('ar-SA'),
  ]);
}

function doGet(e) {
  try {
    appendLeadRow(e.parameter || {});
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const params = e.parameter && Object.keys(e.parameter).length
      ? e.parameter
      : JSON.parse(e.postData.contents || '{}');
    appendLeadRow(params);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** شغّل هذه الدالة مرة واحدة للاختبار */
function testAppend() {
  appendLeadRow({
    name: 'اختبار نثرة',
    phone: '0500000000',
    level: 'مبتدئ',
    topic: 'Google Sheets',
    score: '3/5',
    timestamp: new Date().toLocaleString('ar-SA'),
  });
}

/** تجهيز الجدول بالعناوين — شغّلها مرة واحدة */
function setupSheet() {
  getSheet_();
}
