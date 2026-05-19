/**
 * Google Sheets integration via Apps Script
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste the code below and deploy as Web App (Anyone can access)
 * 4. Copy the deployment URL and paste it as VITE_SHEETS_URL in .env
 *
 * --- Apps Script Code ---
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   const row = [new Date(), ...Object.values(data)];
 *   sheet.appendRow(row);
 *   return ContentService.createTextOutput(JSON.stringify({ success: true }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * -----------------------
 */

// ← ضع هنا رابط النشر الخاص بك من Apps Script
const SHEETS_URL = import.meta.env.VITE_SHEETS_URL || "";

export async function sendToSheets(data: Record<string, string>): Promise<boolean> {
  if (!SHEETS_URL) {
    console.warn("VITE_SHEETS_URL not set. Data:", data);
    return true; // في حالة التطوير نُعيد true حتى يعمل الـ UI
  }

  try {
    await fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors", // مطلوب لـ Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return true;
  } catch (err) {
    console.error("Sheets error:", err);
    return false;
  }
}
