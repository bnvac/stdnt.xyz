# 📧 Email reminders - setup notes

The site can email students before their deadlines, but a static site can't
send email or run a scheduler by itself. You wire it to **one free backend**
and paste its URL into the site. Here's the easiest option
(**Google Apps Script** - free, no server, ~10 minutes).

The site is already built to POST to your endpoint. When someone clicks
**"Email me reminders"** on the Deadlines tab and enters their email, it sends
the deadlines currently in view:

```json
{ "email": "you@example.com",
  "items": [ { "name": "...", "url": "...", "deadline": "Mar 1", "date": "20270301" } ] }
```

(The `date` is `YYYYMMDD` for the next occurrence of that deadline.)

Until an endpoint is set, the button just points people to this doc and to the
**Add all to calendar (.ics)** export, which already works with zero setup.

---

## Option A - Google Apps Script + Google Sheet (recommended, free)

1. Create a new Google Sheet. Note its tab name (default `Sheet1`).
2. **Extensions -> Apps Script**, delete the placeholder, and paste:

```javascript
// stdnt.xyz email reminders
const SHEET = 'Sheet1';
const DAYS_BEFORE = [14, 3];      // email this many days before each deadline

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET);
  (data.items || []).forEach(it => {
    sheet.appendRow([new Date(), data.email, it.name, it.url, it.date]); // date = YYYYMMDD
  });
  return ContentService.createTextOutput('ok');
}

// Run daily (set a time-driven trigger, see step 4)
function sendReminders() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET);
  const rows = sheet.getDataRange().getValues();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let i = 1; i < rows.length; i++) {
    const [, email, name, url, ymd] = rows[i];
    if (!email || !ymd) continue;
    const s = String(ymd);
    const due = new Date(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8));
    const days = Math.round((due - today) / 86400000);
    if (DAYS_BEFORE.indexOf(days) >= 0) {
      MailApp.sendEmail(email, `Reminder: "${name}" is due in ${days} days`,
        `Heads up! "${name}" closes on ${due.toDateString()}.\n\nApply: ${url}\n\n- stdnt.xyz`);
    }
  }
}
```

3. **Deploy -> New deployment -> Web app.** Execute as **Me**, access **Anyone**.
   Copy the **Web app URL**.
4. In the Apps Script editor: **Triggers (clock icon) -> Add Trigger** ->
   function `sendReminders`, **Time-driven -> Day timer** (e.g. 7-8am). Save.
5. In `js/app.js`, set:
   ```js
   var REMINDER_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
   ```
   Commit & deploy. Done - the button now stores submissions and the daily
   trigger emails everyone before their deadlines.

> Note: the site POSTs with `Content-Type: text/plain` on purpose - this avoids
> a CORS preflight that Apps Script doesn't answer. `doPost` still parses the
> JSON body fine.

---

## Option B - Cloudflare Worker + Cron (also free)

If you'd rather not use Google: deploy a Worker that saves submissions to **KV**
and add a **Cron Trigger** that scans daily and sends via an email API
(Resend, MailChannels, etc.). Same request shape; same `REMINDER_ENDPOINT`
variable. Use whichever you're comfortable maintaining.

---

## Privacy

Only the email address and the deadlines the student chose are sent, and only
when they click the button. Keep the receiving Sheet/KV private, and consider
adding an unsubscribe link in the email body if you collect many addresses.
