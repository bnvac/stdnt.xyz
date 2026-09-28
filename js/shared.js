/*
 * shared.js - small formatting helpers used by both the app (js/app.js) and
 * the build scripts (scripts/lib/data.mjs loads this file too), so the site
 * and the generated pages always word things the same way.
 */
(function (root) {
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DAYS_BEFORE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  // "Under 3% admitted", "Highly selective"... from a program's accRate text
  function selectivity(p) {
    var s = String(p.accRate || "").trim(), m = s.match(/(<|~)?\s*(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*%/);
    if (m) return (m[1] === "<" ? "Under " : "~") + m[2] + (m[3] ? "-" + m[3] : "") + "% admitted";
    if (!s || /varies/i.test(s)) return "";
    if (/per state/i.test(s)) return s;
    if (/test-based/i.test(s)) return "Test-score based";
    if (/highly selective|elite/i.test(s)) return "Highly selective";
    if (/selective/i.test(s)) return "Selective";
    if (/accessible|^high\b/i.test(s)) return "Open to most";
    return "";
  }

  // Program dates in the data come from a past session, so exact days
  // ("June 23 - August 3") read like this year's and end up a few days off.
  // Round them to parts of a month instead:
  //   "June 23 - August 3"           -> "Usually late June to early August (about 6 weeks)"
  //   "June 16 - June 29 / July 14 - July 27" -> "2 sessions, usually mid June to late July (about 2 weeks each)"
  // Returns { text, past }: past is the original wording when it was rounded
  // (for a tooltip), "" when `when` had no exact dates and is returned as is.
  var MON = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\\.?";   // "August", "Aug" or "Aug."
  var RANGE = new RegExp(MON + "\\s+(\\d{1,2})\\s*-\\s*(?:" + MON + "\\s+)?(\\d{1,2})\\b", "g");
  function monthIndex(name) { return "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(name) / 3; }
  function part(day) { return day <= 10 ? "early" : day <= 20 ? "mid" : "late"; }
  function dayOfYear(m, d) { return DAYS_BEFORE[m] + d; }
  function span(a, ad, b, bd) {
    if (a === b) return part(ad) === part(bd) ? part(ad) + " " + MONTHS[a] : part(ad) + " to " + part(bd) + " " + MONTHS[a];
    return part(ad) + " " + MONTHS[a] + " to " + part(bd) + " " + MONTHS[b];
  }
  function length(r) {
    var days = dayOfYear(r.b, r.bd) - dayOfYear(r.a, r.ad) + 1;
    if (days <= 0) days += 365;
    if (days < 7) return days + " days";
    var w = Math.round(days / 7);
    return "about " + w + " week" + (w === 1 ? "" : "s");
  }
  function whenText(when) {
    var s = String(when || "").trim(), ranges = [], m;
    RANGE.lastIndex = 0;
    while ((m = RANGE.exec(s))) {
      var a = monthIndex(m[1]);
      ranges.push({ a: a, ad: +m[2], b: m[3] ? monthIndex(m[3]) : a, bd: +m[4] });
    }
    if (!ranges.length) return { text: s, past: "" };
    var start = ranges[0], end = ranges[0];
    ranges.forEach(function (r) {
      if (dayOfYear(r.a, r.ad) < dayOfYear(start.a, start.ad)) start = r;
      if (dayOfYear(r.b, r.bd) > dayOfYear(end.b, end.bd)) end = r;
    });
    var when2 = span(start.a, start.ad, end.b, end.bd);
    var given = s.match(/\((\d+)\s*(?:weeks?|wks?)\)/i);   // keep a length the listing already states
    var lengths = ranges.map(length);
    var len = given ? given[1] + " weeks" : lengths.every(function (l) { return l === lengths[0]; }) ? lengths[0] : "";
    var text = ranges.length > 1
      ? ranges.length + " sessions, usually " + when2 + (len ? " (" + len + " each)" : "")
      : "Usually " + when2 + (len ? " (" + len + ")" : "");
    return { text: text, past: s };
  }

  root.SHARED = { selectivity: selectivity, whenText: whenText };
})(typeof window !== "undefined" ? window : this);
