/*
 * app.js - renders the tabs (Tools, Scholarships, Programs, Saved),
 * the logo marquee, search/filter/sort, save-to-list, view counter and theme.
 * Data comes from data.js, scholarships.js, programs.js.
 */
(function () {
  "use strict";

  var RES = window.RESOURCES || [];
  var CATS = window.CATEGORIES || [];
  var SCH = window.SCHOLARSHIPS || [];
  var PROG = window.PROGRAMS || [];
  var GUIDES = window.GUIDES || [];
  var TEMPLATES = window.TEMPLATES || [];
  var DISCOUNTS = window.DISCOUNTS || [];
  var DISC_CATS = window.DISCOUNT_CATS || [];
  var COMPS = window.COMPETITIONS || [];
  var COMP_CATS = window.COMPETITION_CATS || [];
  var HACKATHONS = window.HACKATHONS || [];
  var ROADMAPS = window.ROADMAPS || [];
  var COLLEGE_CHECKLIST = window.COLLEGE_CHECKLIST || [];
  var FULL = window.SCH_FULL || 1000000;
  // set to your Buttondown/Mailchimp embed-subscribe URL to enable email signup
  var NEWSLETTER_ENDPOINT = "";
  var GH_REPO = "https://github.com/2008wbbv/edu.edu";
  // contribute categories -> their GitHub issue-form templates (tracked + credited)
  var CONTRIB = [
    { icon: "code", label: "Tool or perk", desc: "Free software, an API, an app or a student perk.", template: "add-tool.yml" },
    { icon: "cap", label: "Scholarship", desc: "A scholarship, grant or fellowship students can apply for.", template: "add-scholarship.yml" },
    { icon: "flask", label: "STEM / summer program", desc: "A research, summer or enrichment program.", template: "add-program.yml" },
    { icon: "trophy", label: "Competition", desc: "An academic competition, contest or olympiad.", template: "add-competition.yml" },
    { icon: "cash", label: "Student discount", desc: "An everyday student deal or discount.", template: "add-discount.yml" },
    { icon: "refresh", label: "Report a problem", desc: "A dead link, wrong deadline or defunct listing.", template: "report.yml" }
  ];
  var CAT = {}; CATS.forEach(function (c) { CAT[c.id] = c; });
  DISC_CATS.forEach(function (c) { CAT[c.id] = c; });   // discount categories share the label map

  var ICON_CDN = "https://cdn.simpleicons.org/";
  var STAR = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 18.9 6.2 21l1.1-6.45L2.6 9.95l6.5-.95z"/></svg>';
  // line icons (currentColor, sized by CSS) - used in the hero + hackathons tab
  var SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var ICO_MONEY = SVG + '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5h0M18 14.5h0"/></svg>';
  var ICO_TROPHY = SVG + '<path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4.5v1A3.5 3.5 0 0 0 8 10.5M17 6h2.5v1A3.5 3.5 0 0 1 16 10.5"/><path d="M9.5 18h5M12 14v4M8.5 21h7"/></svg>';
  var ICO_CAP = SVG + '<path d="M12 4 2 9l10 5 10-5-10-5z"/><path d="M6 11.3V16c0 1.2 2.7 2.4 6 2.4s6-1.2 6-2.4v-4.7"/><path d="M22 9.2v5"/></svg>';
  var ICO_CLOCK = SVG + '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 1.8"/></svg>';
  var ICO_CAL = SVG + '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>';
  var ICO_PIN = SVG + '<path d="M20 10c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  var ICO_GLOBE = SVG + '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18"/></svg>';
  // named line-icon set - data files reference these keys, rendered via icon()
  var ICONS = {
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    cap: '<path d="M12 4 2 9l10 5 10-5-10-5z"/><path d="M6 11.3V16c0 1.2 2.7 2.4 6 2.4s6-1.2 6-2.4v-4.7"/><path d="M22 9.2v5"/>',
    flask: '<path d="M9 3h6M10 3v6l-5.2 8.3A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.7L14 9V3"/><path d="M7.5 14h9"/>',
    cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5h0M18 14.5h0"/>',
    refresh: '<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6"/><path d="M20.5 4v5h-5"/>',
    note: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h6"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/>',
    scale: '<path d="M12 4v16M8 20h8M6 7h12M12 5 6 7l-3 6a3 3 0 0 0 6 0zM12 5l6 2 3 6a3 3 0 0 1-6 0z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h4"/>',
    envelope: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M5.8 16c.5-1.4 1.7-2.1 3.2-2.1s2.7.7 3.2 2.1M14 10h4M14 13h4"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4.5v1A3.5 3.5 0 0 0 8 10.5M17 6h2.5v1A3.5 3.5 0 0 1 16 10.5"/><path d="M9.5 18h5M12 14v4M8.5 21h7"/>',
    medal: '<circle cx="12" cy="15" r="5"/><path d="M8.5 3 12 10M15.5 3 12 10M8 3h8"/><path d="M12 13.2 12.9 15h-1.8z"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6H9z"/><path d="M9 11h6M9 15h4"/>',
    pencil: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z"/><path d="m14 7 3 3"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    math: '<path d="M5 12h14"/><circle cx="12" cy="6.5" r="1"/><circle cx="12" cy="17.5" r="1"/>',
    code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    atom: '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
    bulb: '<path d="M9.5 18h5M10.5 21h3"/><path d="M12 3a6 6 0 0 0-3.8 10.6c.6.5 1.1 1.2 1.2 2.4h5.2c.1-1.2.6-1.9 1.2-2.4A6 6 0 0 0 12 3z"/>',
    book: '<path d="M12 6c-1.6-1-4-1.5-6-1.5-1.2 0-2 .2-2 .2v13s.8-.2 2-.2c2 0 4.4.5 6 1.5M12 6c1.6-1 4-1.5 6-1.5 1.2 0 2 .2 2 .2v13s-.8-.2-2-.2c-2 0-4.4.5-6 1.5M12 6v13"/>',
    robot: '<rect x="5" y="8" width="14" height="11" rx="2"/><path d="M12 8V5"/><circle cx="12" cy="3.5" r="1.5"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/><path d="M10 16h4M3 12v3M21 12v3"/>'
  };
  function icon(key) { return SVG + (ICONS[key] || ICONS.target) + "</svg>"; }
  var COMP_ICON = { science: "flask", math: "math", cs: "code", research: "atom", innovation: "bulb", humanities: "book", robotics: "robot" };
  var PIN_SVG = '<svg class="tg-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.4"/></svg>';

  // ---- favicon logos (graceful) --------------------------------------
  function faviconURL(d) { return "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(d) + "&sz=64"; }
  function domainOf(u) {
    if (!u || !/^https?:\/\//i.test(u) || /google\.com\/search/.test(u)) return "";
    try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return ""; }
  }
  function hueOf(s) { var n = 0; s = s || "?"; for (var i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) % 360; return n; }
  // a square logo tile: real favicon when we have a domain, coloured letter fallback otherwise
  function logoTile(name, url) {
    var dom = domainOf(url), letter = esc((name || "?").trim().charAt(0).toUpperCase());
    var img = dom ? '<img class="logo-img" src="' + faviconURL(dom) + '" alt="" loading="lazy" />' : "";
    return '<span class="logo-ico" style="--h:' + hueOf(name) + '" aria-hidden="true">' + letter + img + "</span>";
  }

  // ---- freshness: status flags, link checks & user reporting -----------
  var WARN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>';
  var FLAG_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4M5 4h11l-1.6 3.5L16 11H5"/></svg>';
  var DEAD = {};   // url -> true, populated weekly by the link check (data/link-status.json)
  // classify decay straight from the listing text - no backend needed
  function statusOf(item) {
    var t = [item.deadline, item.note, item.details, item.amountText, item.when, item.cost].filter(Boolean).join(" ").toLowerCase();
    if (/defund|discontinu|no longer|shut down|shutter|defunct/.test(t)) return "defunct";
    if (/cancel/.test(t)) return "cancelled";
    if (/paused|on hold|hiatus|suspend/.test(t)) return "paused";
    if (/check website|check site|\btbd\b|to be announced|to be determined|unconfirmed/.test(t)) return "unconfirmed";
    return "";
  }
  function gone(item) { var s = statusOf(item); return s === "defunct" || s === "cancelled" || s === "paused"; }
  var STATUS_LBL = { defunct: "May be defunct", cancelled: "Cancelled", paused: "Paused", unconfirmed: "Unconfirmed date" };
  function statusBadge(item) {
    var s = statusOf(item); if (!s) return "";
    return '<span class="status status-' + s + '" title="Flagged from the listing text - verify before relying on it">' + WARN_SVG + STATUS_LBL[s] + "</span>";
  }
  function linkDownBadge(url) {
    return (url && DEAD[url]) ? '<span class="status status-dead" title="Our weekly automated check could not reach this link">' + WARN_SVG + "Link may be down</span>" : "";
  }
  function freshTags(item, url) { return statusBadge(item) + linkDownBadge(url); }
  function flagBtn(name, url) {
    return '<button class="flag" type="button" data-flag-name="' + esc(name) + '" data-flag-url="' + esc(url || "") +
      '" title="Report a problem: dead link, ended, or wrong date" aria-label="Report a problem with this listing">' + FLAG_SVG + "</button>";
  }
  // "verified" chip - shown only where a human last reviewed the listing (item.verified = "YYYY-MM")
  var CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  function verifiedChip(item) {
    if (!item || !item.verified) return "";
    var v = String(item.verified), p = v.split("-");
    var label = (p.length >= 2 && DL_MON) ? (DL_MON[(+p[1]) - 1] + " '" + p[0].slice(2)) : v;
    return ' <span class="vchip" title="Last reviewed by a human ' + esc(v) + '">' + CHECK_SVG + "Verified " + esc(label) + "</span>";
  }
  // pull the weekly link-check results (same-origin JSON, refreshed by CI)
  function loadLinkStatus() {
    fetch("data/link-status.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;
        if (d.dead && d.dead.length) { DEAD = {}; d.dead.forEach(function (u) { DEAD[u] = true; }); }
        var note = $("#fresh-note");
        if (note && d.updated) {
          var dt = new Date(d.updated);
          note.innerHTML = 'Links auto-checked weekly &middot; last run ' + DL_MON[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() +
            (d.dead && d.dead.length ? " &middot; " + d.dead.length + " flagged" : " &middot; all reachable");
          note.hidden = false;
        }
        render();
      })
      .catch(function () {});
  }
  var RANK = { "S++": 0, "S+": 1, "S": 2, "S-": 3, "A+": 4, "A": 5, "A-": 6, "B+": 7, "B": 8, "B-": 9, "C+": 10, "C": 11, "C-": 12 };
  var MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
  var SCH_GROUPS = [
    { id: "all", label: "All" }, { id: "big", label: "Big money" },
    { id: "creative", label: "Creative" }, { id: "essay", label: "Essay" },
    { id: "general", label: "General" }, { id: "noessay", label: "No-essay" }
  ];

  var $ = function (s) { return document.querySelector(s); };
  var search = $("#search");
  var meta = $("#meta");
  var empty = $("#empty");

  var saved = loadSaved();
  var checklist = loadChecklist();
  var state = {
    tab: "tools", q: "",
    tools: { access: "all", cat: "all" },
    sch: { group: "all", sort: "amount", eligible: false },
    prog: { grade: "all", free: false, sort: "rank", eligible: false },
    deadlines: { kind: "all", window: "all" },
    roadmap: null
  };

  // ---- helpers -------------------------------------------------------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function terms() { return state.q.toLowerCase().split(/\s+/).filter(Boolean); }
  function hit(hay, ts) { hay = hay.toLowerCase(); return ts.every(function (t) { return hay.indexOf(t) >= 0; }); }
  function commas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function dlSort(d) {
    var s = String(d || "").toLowerCase();
    var m = s.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{1,2})?/);
    if (m) return MONTHS[m[1]] * 100 + (m[2] ? +m[2] : 0);
    return 9999;
  }
  function monoFrom(name) {
    var w = String(name).replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
    return w.length ? w[0][0].toUpperCase() : "?";
  }
  function accNum(p) { // acceptance rate -> number (lower = more selective)
    var s = String(p.accRate || "").toLowerCase();
    var m = s.match(/(\d+(?:\.\d+)?)/);
    if (m) return parseFloat(m[1]);
    if (/highly selective|elite|2 per/.test(s)) return 4;
    if (/selective/.test(s)) return 18;
    if (/accessible|high|test-based/.test(s)) return 55;
    return 999;
  }
  function lc(arr) { return (arr || []).map(function (x) { return String(x).toLowerCase(); }); }
  function inArr(a, x) { return a.indexOf(x) >= 0; }

  // state-restricted programs (tagged with a state but not a broad/national scope)
  var US_STATES = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming"];
  var BROAD = ["us", "international", "national", "remote", "online", "virtual", "worldwide", "global", "anywhere"];
  function titleCase(s) { return s.replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
  function progStateInfo(p) {
    var t = lc(p.tags || []);
    var states = (p.tags || []).filter(function (x) { return US_STATES.indexOf(String(x).toLowerCase()) >= 0; });
    var broad = t.some(function (x) { return BROAD.indexOf(x) >= 0; });
    var blob = [p.name, p.cost, p.details].join(" ").toLowerCase();
    var restricted = /\bresidents?\b/.test(blob); // "X Residents" -> residency-restricted (not "residential")
    if (restricted && !states.length) states = US_STATES.filter(function (s) { return blob.indexOf(s) >= 0; }).map(titleCase);
    return {
      states: states,
      located: states.length > 0 && states.length <= 3 && !broad,   // just located there, open to all
      restricted: restricted && states.length > 0                    // residents only
    };
  }

  // ---- deadlines / calendar ------------------------------------------
  var TODAY = new Date(); TODAY.setHours(0, 0, 0, 0);
  var CAL_SVG = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zM5 8h14v11H5V8zm6 2v3H8v2h3v3h2v-3h3v-2h-3v-3h-2z"/></svg>';
  function dlInfo(d) {
    var s = String(d || "").trim().toLowerCase();
    if (!s || /rolling|monthly|quarterly|varies|dependent|psat|open|tbd|announce|check|nomination|^-$/.test(s)) return { rolling: true, date: null, days: null, soon: false };
    var m = s.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{1,2})?/);
    if (!m) return { rolling: true, date: null, days: null, soon: false };
    var dt = new Date(TODAY.getFullYear(), MONTHS[m[1]] - 1, m[2] ? +m[2] : 15); dt.setHours(0, 0, 0, 0);
    if (dt < TODAY) dt = new Date(TODAY.getFullYear() + 1, MONTHS[m[1]] - 1, m[2] ? +m[2] : 15);
    var days = Math.round((dt - TODAY) / 86400000);
    return { rolling: false, date: dt, days: days, soon: days <= 30 };
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(dt) { return dt.getFullYear() + pad(dt.getMonth() + 1) + pad(dt.getDate()); }
  function gcal(name, url, dt) {
    var d2 = new Date(dt.getTime() + 86400000);
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
      encodeURIComponent("Apply: " + name) + "&dates=" + ymd(dt) + "/" + ymd(d2) +
      "&details=" + encodeURIComponent("Application deadline for " + name + (url ? "\n" + url : ""));
  }
  function calCell(name, url, deadline) {
    var info = dlInfo(deadline); var due = esc(deadline || "");
    if (!info.date) return '<span class="row-due">' + (due || "Rolling") + "</span>";
    var soon = info.soon ? " soon" : "";
    var left = info.days <= 60 ? ' &middot; ' + info.days + "d" : "";
    return '<span class="row-due' + soon + '">' + due + left +
      ' <a class="cal" href="' + gcal(name, url, info.date) + '" target="_blank" rel="noopener" title="Add deadline to Google Calendar" aria-label="Add to calendar">' + CAL_SVG + "</a></span>";
  }
  function download(filename, text, mime) {
    var blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t)["catch"](function () { fallbackCopy(t); }); }
    else fallbackCopy(t);
  }
  function fallbackCopy(t) {
    var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove();
  }
  function flash(sel) { var el = $(sel); if (!el) return; el.hidden = false; clearTimeout(el._t); el._t = setTimeout(function () { el.hidden = true; }, 1600); }
  function csvCell(v) { v = String(v == null ? "" : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function icsEsc(v) { return String(v || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, " "); }
  function iconHTML(item) {
    if (item.slug) return '<span class="ic-wrap"><span class="ic" style="--src:url(\'' + ICON_CDN + esc(item.slug) + '\')"></span></span>';
    var dom = domainOf(item.url);
    var inner = '<span class="ic-mono">' + esc(item.mono || monoFrom(item.name)) + "</span>";
    if (dom) inner += '<img class="ic-fav" src="' + faviconURL(dom) + '" alt="" loading="lazy" />';
    return '<span class="ic-wrap">' + inner + "</span>";
  }
  function searchLink(name) { return "https://www.google.com/search?q=" + encodeURIComponent(name); }

  // ---- saved list ----------------------------------------------------
  function loadSaved() {
    try { return new Set(JSON.parse(localStorage.getItem("edu-saved") || "[]")); }
    catch (e) { return new Set(); }
  }
  function persistSaved() {
    try { localStorage.setItem("edu-saved", JSON.stringify(Array.from(saved))); } catch (e) {}
  }
  function loadChecklist() {
    try { return new Set(JSON.parse(localStorage.getItem("edu-checklist") || "[]")); }
    catch (e) { return new Set(); }
  }
  function saveChecklist() {
    try { localStorage.setItem("edu-checklist", JSON.stringify(Array.from(checklist))); } catch (e) {}
  }
  function sid(type, name) { return type + "::" + name; }
  function starBtn(type, name) {
    var id = sid(type, name), on = saved.has(id);
    return '<button class="star' + (on ? " on" : "") + '" type="button" data-id="' + esc(id) +
      '" aria-pressed="' + on + '" aria-label="' + (on ? "Saved to your list" : "Save to your list") + '">' + STAR + "</button>";
  }

  // ---- TOOLS ---------------------------------------------------------
  function buildCatChips() {
    var box = $("#tools-cats");
    box.innerHTML = '<button class="chip is-active" data-cat="all" type="button">All</button>' +
      CATS.map(function (c) {
        return '<button class="chip" data-cat="' + c.id + '" type="button" title="' + esc(c.blurb) + '">' +
          esc(c.name) + ' <span class="c-n" data-cn="' + c.id + '"></span></button>';
      }).join("");
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.tools.cat = b.dataset.cat; activate(box, b); render();
    });
  }
  function catCount(id) {
    return RES.filter(function (r) {
      return r.category === id && (state.tools.access === "all" || r.access === state.tools.access);
    }).length;
  }
  function toolsFiltered() {
    var ts = terms();
    return RES.filter(function (r) {
      if (state.tools.access !== "all" && r.access !== state.tools.access) return false;
      if (state.tools.cat !== "all" && r.category !== state.tools.cat) return false;
      if (ts.length) {
        var c = CAT[r.category];
        if (!hit([r.name, r.desc, r.value, c && c.name, (r.tags || []).join(" ")].join(" "), ts)) return false;
      }
      return true;
    }).sort(function (a, b) {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      return a.name.localeCompare(b.name);
    });
  }
  function toolCard(r, i) {
    var c = CAT[r.category] || { name: r.category };
    var badge = r.access === "student"
      ? '<span class="badge badge-stu">Student</span>'
      : '<span class="badge badge-evr">Everyone</span>';
    var internal = /^#/.test(r.url || "");
    var link = internal ? "" : ' target="_blank" rel="noopener"';
    var cta = internal ? "Read the guide &rarr;" : "Get it &rarr;";
    return '<a class="card' + (internal ? " card-guide" : "") + '" href="' + esc(r.url) + '"' + link + ' style="animation-delay:' +
      Math.min(i * 16, 240) + 'ms">' +
      '<div class="card-top">' + iconHTML(r) +
      '<span class="card-name">' + esc(r.name) + (r.featured ? ' <span class="card-star">&#9733;</span>' : "") + verifiedChip(r) + "</span>" +
      '<span class="card-meta">' + badge + starBtn("tool", r.name) + (internal ? "" : flagBtn(r.name, r.url)) + "</span></div>" +
      (r.value ? '<span class="card-value">' + esc(r.value) + "</span>" : "") +
      '<p class="card-desc">' + esc(r.desc) + "</p>" +
      (linkDownBadge(r.url) ? '<div class="card-flags">' + linkDownBadge(r.url) + "</div>" : "") +
      '<div class="card-foot"><span class="card-cat">' + esc(c.name) + "</span>" +
      '<span class="card-cta">' + cta + "</span></div></a>";
  }
  function renderTools() {
    var list = toolsFiltered();
    $("#tools-grid").innerHTML = list.map(toolCard).join("");
    CATS.forEach(function (c) { var el = $('[data-cn="' + c.id + '"]'); if (el) el.textContent = catCount(c.id); });
    return list.length;
  }

  // ---- SCHOLARSHIPS --------------------------------------------------
  function buildSchChips() {
    var box = $("#sch-groups");
    box.innerHTML = SCH_GROUPS.map(function (g) {
      var n = g.id === "all" ? SCH.length : SCH.filter(function (s) { return s.group === g.id; }).length;
      return '<button class="chip' + (g.id === "all" ? " is-active" : "") + '" data-group="' + g.id +
        '" type="button">' + esc(g.label) + ' <span class="c-n">' + n + "</span></button>";
    }).join("");
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.sch.group = b.dataset.group; activate(box, b); render();
    });
    $("#sch-sort").addEventListener("change", function (e) { state.sch.sort = e.target.value; render(); });
    var elig = $("#sch-eligible");
    if (elig) elig.addEventListener("change", function (e) { state.sch.eligible = e.target.checked; render(); });
  }
  function schFiltered() {
    var ts = terms(), onlyElig = state.sch.eligible && quizAnswered();
    var list = SCH.filter(function (s) {
      if (state.sch.group !== "all" && s.group !== state.sch.group) return false;
      if (onlyElig && schScore(s) === -1) return false;
      if (ts.length && !hit([s.name, s.level, s.note, s.amountText, (s.tags || []).join(" ")].join(" "), ts)) return false;
      return true;
    });
    var by = state.sch.sort;
    list.sort(function (a, b) {
      if (by === "name") return a.name.localeCompare(b.name);
      if (by === "deadline") return dlSort(a.deadline) - dlSort(b.deadline) || b.amount - a.amount;
      if (by === "soon") { var ia = dlInfo(a.deadline), ib = dlInfo(b.deadline); return (ia.date ? ia.days : 1e9) - (ib.date ? ib.days : 1e9) || b.amount - a.amount; }
      return b.amount - a.amount || a.name.localeCompare(b.name);
    });
    return list;
  }
  function schRow(s, i) {
    var amtFull = s.amount >= FULL || /full/i.test(s.amountText || "");
    var tags = (s.tags || []).map(function (t) { return '<span class="tg">' + esc(t) + "</span>"; }).join("");
    var sub = esc(s.level || "") + (s.note ? " &middot; " + esc(s.note) : "") + (s.find ? ' <span class="find">&middot; search</span>' : "");
    var ft = freshTags(s, s.url), eg = eligChips(s);
    return '<div class="row' + (gone(s) ? " row-gone" : "") + '" style="animation-delay:' + Math.min(i * 8, 180) + 'ms">' +
      '<a class="row-main" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
      '<div class="row-title">' + esc(s.name) + matchBadge("sch", s) + verifiedChip(s) + ' <span class="ext">&#8599;</span></div>' +
      '<div class="row-sub">' + sub + "</div>" +
      ((tags || ft || eg) ? '<div class="row-tags">' + ft + eg + tags + "</div>" : "") + "</a>" +
      '<span class="row-acts">' + starBtn("sch", s.name) + flagBtn(s.name, s.url) + "</span>" +
      '<div class="row-right"><span class="row-amt' + (amtFull ? " full" : "") + '">' + esc(s.amountText || "Varies") + "</span>" +
      calCell(s.name, s.url, s.deadline) + "</div></div>";
  }
  function renderSch() {
    var list = schFiltered();
    $("#sch-list").innerHTML = list.map(schRow).join("");
    return list.length;
  }

  // ---- PROGRAMS ------------------------------------------------------
  function buildProgChips() {
    var box = $("#prog-grades");
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.prog.grade = b.dataset.grade; activate(box, b); render();
    });
    $("#prog-free").addEventListener("change", function (e) { state.prog.free = e.target.checked; render(); });
    $("#prog-sort").addEventListener("change", function (e) { state.prog.sort = e.target.value; render(); });
    var elig = $("#prog-eligible");
    if (elig) elig.addEventListener("change", function (e) { state.prog.eligible = e.target.checked; render(); });
  }
  function progFiltered() {
    var ts = terms(), onlyElig = state.prog.eligible && quizAnswered();
    var list = PROG.filter(function (p) {
      if (state.prog.free && !p.free) return false;
      if (state.prog.grade !== "all" && (p.grades || []).indexOf(state.prog.grade) < 0) return false;
      if (onlyElig && progScore(p) === -1) return false;
      if (ts.length && !hit([p.name, p.details, (p.subjects || []).join(" "), (p.tags || []).join(" "), (p.grades || []).join(" ")].join(" "), ts)) return false;
      return true;
    });
    var by = state.prog.sort;
    list.sort(function (a, b) {
      if (by === "name") return a.name.localeCompare(b.name);
      if (by === "deadline") return dlSort(a.deadline) - dlSort(b.deadline);
      if (by === "accept") return accNum(a) - accNum(b) || a.name.localeCompare(b.name);
      if (by === "soon") { var ia = dlInfo(a.deadline), ib = dlInfo(b.deadline); return (ia.date ? ia.days : 1e9) - (ib.date ? ib.days : 1e9); }
      var ra = a.ranking in RANK ? RANK[a.ranking] : 50, rb = b.ranking in RANK ? RANK[b.ranking] : 50;
      return ra - rb || dlSort(a.deadline) - dlSort(b.deadline);
    });
    return list;
  }
  function shortCost(p) {
    if (p.free || /free|fully funded/i.test(p.cost)) return { t: "Free", full: true };
    var m = String(p.cost).match(/[$£][\d,]+/);
    if (m) return { t: m[0], full: false };
    return { t: p.cost ? p.cost.split("(")[0].trim().slice(0, 14) : "", full: false };
  }
  function progRow(p, i) {
    var url = p.url || searchLink(p.name + " program");
    var rank = p.ranking ? '<span class="rank' + (/^S/.test(p.ranking) ? " s" : "") + '">' + esc(p.ranking) + "</span>" : '<span class="rank ghost"></span>';
    var grades = (p.grades || []).map(function (g) { return '<span class="tg tg-grade">' + esc(g) + "</span>"; }).join("");
    var si = progStateInfo(p);
    var stateTag = si.restricted ? '<span class="tg tg-state">' + PIN_SVG + esc(si.states.slice(0, 2).join("/")) + " only</span>"
      : (si.located ? '<span class="tg tg-loc">' + PIN_SVG + esc(si.states.slice(0, 2).join("/")) + "</span>" : "");
    var subs = (p.subjects || []).slice(0, 3).map(function (s) { return '<span class="tg">' + esc(s) + "</span>"; }).join("");
    var sub = esc(p.details || (p.subjects || []).join(", ")) + (p.when ? ' <span class="find">&middot; ' + esc(p.when) + "</span>" : "");
    var cost = shortCost(p);
    var fav = (p.flagship && domainOf(p.url)) ? '<img class="row-fav" src="' + faviconURL(domainOf(p.url)) + '" alt="" loading="lazy" />' : "";
    return '<div class="row' + (gone(p) ? " row-gone" : "") + '" style="animation-delay:' + Math.min(i * 6, 180) + 'ms">' + rank +
      '<a class="row-main" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      '<div class="row-title">' + fav + esc(p.name) + (p.flagship ? ' <span class="card-star">&#9733;</span>' : "") + matchBadge("prog", p) + verifiedChip(p) + ' <span class="ext">&#8599;</span></div>' +
      '<div class="row-sub">' + sub + "</div>" +
      '<div class="row-tags">' + freshTags(p, url) + eligChips(p) + stateTag + grades + subs + "</div></a>" +
      '<span class="row-acts">' + starBtn("prog", p.name) + flagBtn(p.name, url) + "</span>" +
      '<div class="row-right"><span class="row-amt' + (cost.full ? " full" : "") + '">' + esc(cost.t) + "</span>" +
      calCell(p.name, url, p.deadline) + "</div></div>";
  }
  function renderProg() {
    var list = progFiltered();
    $("#prog-list").innerHTML = list.map(progRow).join("");
    return list.length;
  }

  // ---- SAVED ---------------------------------------------------------
  function renderSaved() {
    var ts = terms();
    function f(arr, fields) { return ts.length ? arr.filter(function (x) { return hit(fields(x), ts); }) : arr; }
    var st = f(RES.concat(DISCOUNTS).filter(function (r) { return saved.has(sid("tool", r.name)); }), function (r) { return [r.name, r.desc, (r.tags || []).join(" ")].join(" "); });
    var ss = f(SCH.filter(function (s) { return saved.has(sid("sch", s.name)); }), function (s) { return [s.name, s.level, s.note].join(" "); });
    var sp = f(PROG.filter(function (p) { return saved.has(sid("prog", p.name)); }), function (p) { return [p.name, p.details, (p.subjects || []).join(" ")].join(" "); });
    var sc = f(COMPS.filter(function (c) { return saved.has(sid("comp", c.name)); }), function (c) { return [c.name, c.desc, (c.tags || []).join(" ")].join(" "); });
    var body = $("#saved-body");
    if (saved.size === 0) {
      body.innerHTML = '<div class="saved-empty"><div class="saved-star">' + STAR + "</div>" +
        "<p>Your list is empty.</p><p class=\"saved-hint\">Tap the star on any tool, scholarship or program to save it here. It stays on this device.</p></div>";
      meta.textContent = ""; empty.hidden = true; return 0;
    }
    var toolbar = '<div class="saved-tools">' +
      '<button class="btn btn-ghost" data-act="copy" type="button">Copy</button>' +
      '<button class="btn btn-ghost" data-act="csv" type="button">Download CSV</button>' +
      '<button class="btn btn-ghost" data-act="ics" type="button">Deadlines (.ics)</button>' +
      '<button class="btn btn-ghost" data-act="print" type="button">Print</button>' +
      '<span class="copied" id="saved-copied" hidden>Copied!</span></div>';
    var html = "";
    if (st.length) html += '<h3 class="saved-h">Tools, Perks &amp; Discounts <span>' + st.length + "</span></h3><div class=\"grid\">" + st.map(toolCard).join("") + "</div>";
    if (ss.length) html += '<h3 class="saved-h">Scholarships <span>' + ss.length + "</span></h3><div class=\"list\">" + ss.map(schRow).join("") + "</div>";
    if (sp.length) html += '<h3 class="saved-h">STEM Programs <span>' + sp.length + "</span></h3><div class=\"list\">" + sp.map(progRow).join("") + "</div>";
    if (sc.length) html += '<h3 class="saved-h">Competitions <span>' + sc.length + "</span></h3><div class=\"grid\">" + sc.map(competitionCard).join("") + "</div>";
    var total = st.length + ss.length + sp.length + sc.length;
    body.innerHTML = toolbar + (html || '<p class="muted" style="padding:1rem 0">No saved items match that search.</p>');
    meta.textContent = total === saved.size ? ("You have " + saved.size + " saved item" + (saved.size === 1 ? "" : "s")) : ("Showing " + total + " of " + saved.size + " saved");
    empty.hidden = true;
    return total;
  }
  function savedItems() {
    var out = [];
    RES.concat(DISCOUNTS).forEach(function (r) { if (saved.has(sid("tool", r.name))) out.push({ type: "Tool", name: r.name, url: r.url, detail: (CAT[r.category] || {}).name || "", deadline: "" }); });
    SCH.forEach(function (s) { if (saved.has(sid("sch", s.name))) out.push({ type: "Scholarship", name: s.name, url: s.url, detail: s.amountText || "", deadline: s.deadline || "" }); });
    PROG.forEach(function (p) { if (saved.has(sid("prog", p.name))) out.push({ type: "Program", name: p.name, url: p.url || "", detail: (p.subjects || []).join("; "), deadline: p.deadline || "" }); });
    COMPS.forEach(function (c) { if (saved.has(sid("comp", c.name))) out.push({ type: "Competition", name: c.name, url: c.url, detail: c.format || "", deadline: c.deadline || "" }); });
    return out;
  }
  function toCSV(items) {
    var rows = [["Type", "Name", "Link", "Detail", "Deadline"]];
    items.forEach(function (it) { rows.push([it.type, it.name, it.url, it.detail, it.deadline]); });
    return rows.map(function (r) { return r.map(csvCell).join(","); }).join("\r\n");
  }
  function toICS(items) {
    var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//stdnt.xyz//EN", "CALSCALE:GREGORIAN"];
    items.forEach(function (it) {
      var info = dlInfo(it.deadline); if (!info.date) return;
      L.push("BEGIN:VEVENT", "UID:" + Math.abs(it.name.split("").reduce(function (a, c) { return (a * 31 + c.charCodeAt(0)) | 0; }, 7)) + "@stdnt.xyz",
        "DTSTART;VALUE=DATE:" + ymd(info.date), "DTEND;VALUE=DATE:" + ymd(new Date(info.date.getTime() + 86400000)),
        "SUMMARY:Apply: " + icsEsc(it.name), "DESCRIPTION:" + icsEsc(it.url), "END:VEVENT");
    });
    L.push("END:VCALENDAR"); return L.join("\r\n");
  }

  // ---- FOR YOU (quiz) ------------------------------------------------
  var STATES = ["", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
  var QUIZ = [
    { id: "grade", q: "What year are you?", opts: [
      { v: "Freshman", l: "9th" }, { v: "Sophomore", l: "10th" }, { v: "Junior", l: "11th" },
      { v: "Senior", l: "12th" }, { v: "College", l: "College" }, { v: "", l: "Skip" } ] },
    { id: "income", q: "Household income?", opts: [
      { v: "low", l: "Under $40k" }, { v: "mid", l: "$40k-80k" }, { v: "midhi", l: "$80k-150k" },
      { v: "hi", l: "$150k+" }, { v: "", l: "Skip" } ] },
    { id: "race", q: "Do you identify with an underrepresented group? (often unlocks more)", opts: [
      { v: "black", l: "Black" }, { v: "hispanic", l: "Hispanic / Latino" }, { v: "native", l: "Native American" },
      { v: "aapi", l: "Asian / Pacific Isl." }, { v: "", l: "Prefer not to say" } ] },
    { id: "gender", q: "Gender?", opts: [
      { v: "woman", l: "Woman" }, { v: "nonbinary", l: "Non-binary" }, { v: "man", l: "Man" }, { v: "", l: "Prefer not" } ] },
    { id: "firstgen", q: "First-generation college student?", opts: [ { v: "yes", l: "Yes" }, { v: "", l: "No / skip" } ] },
    { id: "immigrant", q: "Immigrant, DACA or undocumented?", opts: [ { v: "yes", l: "Yes" }, { v: "", l: "No / skip" } ] },
    { id: "citizenship", q: "Citizenship status?", opts: [
      { v: "us", l: "US citizen / PR" }, { v: "intl", l: "International" }, { v: "", l: "Skip" } ] },
    { id: "gpa", q: "Roughly your GPA? (filters out minimums you miss)", opts: [
      { v: "3.9", l: "3.75+" }, { v: "3.5", l: "3.5-3.74" }, { v: "3.0", l: "3.0-3.49" }, { v: "2.5", l: "Below 3.0" }, { v: "", l: "Skip" } ] },
    { id: "field", q: "What field are you into?", opts: [
      { v: "cs", l: "Computer Science" }, { v: "eng", l: "Engineering" }, { v: "med", l: "Medicine / Bio" },
      { v: "math", l: "Math / Physics" }, { v: "business", l: "Business" }, { v: "arts", l: "Arts & Humanities" }, { v: "", l: "Undecided" } ] },
    { id: "state", q: "Your state? (helps match local programs)", select: STATES }
  ];
  var quiz = loadQuiz();
  function loadQuiz() { try { return JSON.parse(localStorage.getItem("edu-quiz") || "{}") || {}; } catch (e) { return {}; } }
  function saveQuiz() { try { localStorage.setItem("edu-quiz", JSON.stringify(quiz)); } catch (e) {} }
  function applyHash() { // shared link: #foryou&grade=Senior&income=low
    var h = (location.hash || "").replace(/^#/, ""); if (!h) return false;
    var parts = h.split("&"); if (parts[0] !== "foryou") return false;
    parts.slice(1).forEach(function (p) { var i = p.indexOf("="); if (i > 0) quiz[p.slice(0, i)] = decodeURIComponent(p.slice(i + 1)); });
    saveQuiz(); return true;
  }

  function buildQuiz() {
    var form = $("#quiz-form"); if (!form) return;
    form.innerHTML = QUIZ.map(function (b) {
      if (b.select) {
        var opts = b.select.map(function (st) {
          return '<option value="' + esc(st) + '"' + ((quiz[b.id] || "") === st ? " selected" : "") + ">" + (st || "Any state") + "</option>";
        }).join("");
        return '<div class="qblock"><div class="qq">' + esc(b.q) + '</div><select class="qselect" data-q="' + b.id + '">' + opts + "</select></div>";
      }
      var btns = b.opts.map(function (o) {
        var on = o.v !== "" && (quiz[b.id] || "") === o.v;
        return '<button class="qchip' + (on ? " is-active" : "") + '" type="button" data-q="' + b.id + '" data-v="' + esc(o.v) + '">' + esc(o.l) + "</button>";
      }).join("");
      return '<div class="qblock"><div class="qq">' + esc(b.q) + '</div><div class="qopts">' + btns + "</div></div>";
    }).join("");
  }
  function levelOk(level, grade) {
    var l = String(level || "").toLowerCase();
    if (!l || /\ball\b|any|various/.test(l)) return true;
    var hs = /(hs|high school|k-12|9-12|8-12|7-12|6-12|grade|sophomore|freshman|9th|10th|11th|12th|13-18|11-18|8-18|10-18)/.test(l);
    var college = /(undergrad|college|graduate|postgrad|university)/.test(l);
    if (grade === "College") return college || !hs;     // college: ok if college-ish or open (not strictly HS)
    return !(college && !hs);                            // HS: ok unless clearly college/grad only
  }
  // ---- eligibility: turn buried requirements into structured fields ----
  function eligibilityOf(item) {
    var tags = lc(item.tags);
    var strict = (item.name + " " + (item.note || "") + " " + tags.join(" ")).toLowerCase();
    var full = (strict + " " + (item.details || "") + " " + (item.level || "") + " " + (item.amountText || "")).toLowerCase();
    var e = { intlOk: null, needBased: false, incomeMax: null, firstGen: false, gpaMin: null, groups: {} };
    if (/international|all nationalities|any nationality|regardless of citizenship|students worldwide|non-citizen/.test(full)) e.intlOk = true;
    if (e.intlOk !== true && /u\.s\.? citizen|citizen or permanent|permanent resident|green card|citizens? only|must be a citizen|domestic student/.test(full)) e.intlOk = false;
    if (inArr(tags, "need-based") || /need-based|financial need|low-income|low income|\bpell\b|family income|household income|economic hardship|adversity|demonstrated need/.test(full)) e.needBased = true;
    if (/income|earn|families|household/.test(full)) {
      var mk = full.match(/\$\s?([0-9]{1,3})\s?k\b/), mf = full.match(/\$\s?([0-9]{2,3}),([0-9]{3})\b/);
      if (mk) e.incomeMax = +mk[1] * 1000; else if (mf) e.incomeMax = +(mf[1] + mf[2]);
    }
    var g = full.match(/([0-3]\.[0-9]{1,2})\s*(?:\+|or higher|gpa|minimum)|gpa[^0-9]{0,14}([0-3]\.[0-9]{1,2})/);
    if (g) { var gv = parseFloat(g[1] || g[2]); if (gv >= 2 && gv <= 4) e.gpaMin = gv; }
    if (inArr(tags, "first gen") || /first-gen|first generation/.test(full)) e.firstGen = true;
    function grp(k, re) { if (re.test(strict)) e.groups[k] = true; }
    grp("women", /\bwomen\b|\bwoman\b|female|\bgirls\b/);
    grp("black", /black|african[ -]?american/);
    grp("hispanic", /hispanic|latino|latina|latinx/);
    grp("native", /native american|indigenous|american indian|alaska native/);
    grp("aapi", /asian|pacific islander|\baapi\b/);
    grp("lgbtq", /lgbtq|\blgbt\b|queer|transgender/);
    grp("disability", /disabilit|disabled|\bdeaf\b|blind/);
    grp("veteran", /veteran|military|armed forces/);
    grp("immigrant", /\bdaca\b|undocumented|immigrant|dreamer/);
    return e;
  }
  // hard ineligibility - only when the user actually told us, and only on
  // confident signals (citizenship, GPA minimum, women-only, race-restricted)
  function eligExclude(item) {
    var q = quiz, el = eligibilityOf(item);
    if (q.citizenship === "intl" && el.intlOk === false) return true;
    if (q.gpa && el.gpaMin && parseFloat(q.gpa) < el.gpaMin) return true;
    if (q.gender === "man" && el.groups.women) return true;
    if (q.race) { var rk = ["black", "hispanic", "native", "aapi"].filter(function (r) { return el.groups[r]; }); if (rk.length && rk.indexOf(q.race) < 0) return true; }
    return false;
  }
  function eligChips(item) {
    var e = eligibilityOf(item), out = "";
    function c(l) { out += '<span class="tg tg-elig">' + l + "</span>"; }
    if (e.intlOk === true) c("Intl OK");
    if (e.gpaMin) c("GPA " + e.gpaMin + "+");
    if (e.incomeMax) c("Income &le; $" + (e.incomeMax >= 1000 ? Math.round(e.incomeMax / 1000) + "k" : e.incomeMax));
    if (e.needBased && !inArr(lc(item.tags), "need-based")) c("Need-based");
    return out;
  }
  function schScore(s) {
    var q = quiz, t = lc(s.tags), note = (s.note || "").toLowerCase(), name = s.name.toLowerCase(), sc = 0;
    if (eligExclude(s)) return -1;
    if (q.grade) { if (!levelOk(s.level, q.grade)) return -1; sc = 1; } // eligible-by-grade baseline
    if ((q.income === "low" || q.income === "mid") && (inArr(t, "need-based") || inArr(t, "adversity"))) sc += 2;
    if (q.race) {
      if (inArr(t, "identity")) sc += 2;
      var kw = ({ black: ["black", "african"], hispanic: ["hispanic", "latino", "latinx"], native: ["native", "indigenous"], aapi: ["asian", "pacific islander", "aapi"] }[q.race]) || [];
      if (kw.some(function (k) { return note.indexOf(k) >= 0 || name.indexOf(k) >= 0; })) sc += 3;
    }
    if ((q.gender === "woman" || q.gender === "nonbinary") && inArr(t, "women")) sc += 2;
    if (q.firstgen === "yes" && (inArr(t, "first gen") || note.indexOf("first-gen") >= 0 || note.indexOf("first gen") >= 0)) sc += 2;
    if (q.immigrant === "yes" && (inArr(t, "immigrants") || note.indexOf("daca") >= 0 || note.indexOf("undocumented") >= 0)) sc += 3;
    if (q.field) {
      if (["cs", "eng", "med", "math"].indexOf(q.field) >= 0 && inArr(t, "stem")) sc += 1;
      else if (q.field === "arts" && (inArr(t, "humanities") || inArr(t, "writing") || inArr(t, "art") || inArr(t, "music") || inArr(t, "poetry") || inArr(t, "literature"))) sc += 1;
      else if (q.field === "business" && (inArr(t, "business") || name.indexOf("business") >= 0)) sc += 1;
    }
    return sc;
  }
  function progScore(p) {
    var q = quiz, t = lc(p.tags), subj = lc(p.subjects), sc = 1; // baseline: eligible (excluded entries return -1)
    if (eligExclude(p)) return -1;
    if (q.grade && q.grade !== "College") { if ((p.grades || []).indexOf(q.grade) < 0) return -1; sc += 1; }
    if ((q.income === "low" || q.income === "mid") && inArr(t, "low-income")) sc += 2;
    if (q.race && inArr(t, "minority")) sc += 2;
    if ((q.gender === "woman" || q.gender === "nonbinary") && inArr(t, "females")) sc += 2;
    if (q.firstgen === "yes" && inArr(t, "first gen")) sc += 2;
    if (q.field) {
      var want = ({ cs: ["coding", "ai/tech"], eng: ["engineering"], med: ["medicine", "biology", "health", "cancer", "neuroscience", "reproductive health", "disabilities", "dentistry"], math: ["math", "physics", "astronomy"], business: ["business"], arts: ["humanities", "writing", "art"] }[q.field]) || [];
      if (want.some(function (w) { return inArr(subj, w); })) sc += 2;
    }
    if (q.state) {
      var si = progStateInfo(p);
      if (si.restricted) {
        if (lc(si.states).indexOf(q.state.toLowerCase()) >= 0) sc += 3; // residents-only, you qualify
        else return -1;                                                 // residents-only elsewhere: exclude
      } else if (si.located && lc(si.states).indexOf(q.state.toLowerCase()) >= 0) sc += 2; // local to you
      else if (inArr(t, q.state.toLowerCase())) sc += 1;
    }
    return sc;
  }
  // ---- personalization (quiz-driven match badges) --------------------
  var FIELD_COMP = { cs: ["cs"], eng: ["robotics", "innovation"], med: ["science"], math: ["math"], business: ["innovation"], arts: ["humanities"] };
  function quizAnswered() { for (var k in quiz) { if (quiz[k]) return true; } return false; }
  function compScore(c) { var f = quiz.field; return (f && (FIELD_COMP[f] || []).indexOf(c.category) >= 0) ? 3 : 0; }
  function matchBadge(kind, item) {
    if (!quizAnswered()) return "";
    var sc = kind === "sch" ? schScore(item) : kind === "prog" ? progScore(item) : compScore(item);
    return sc >= 3 ? ' <span class="match-tag">&#10022; For you</span>' : "";
  }

  // "This week for you" - the soonest deadlines you actually qualify for,
  // the on-site version of the weekly email digest (computed live, no backend)
  function digestDeadlines(limit) {
    var out = [];
    SCH.forEach(function (s) { if (gone(s) || eligExclude(s)) return; var info = dlInfo(s.deadline); if (info.date && schScore(s) > 0) out.push({ name: s.name, url: s.url, info: info, meta: s.amountText || "" }); });
    PROG.forEach(function (p) { if (gone(p) || eligExclude(p)) return; var info = dlInfo(p.deadline); if (info.date && progScore(p) > 0) out.push({ name: p.name, url: p.url || searchLink(p.name + " program"), info: info, meta: p.ranking || "" }); });
    out.sort(function (a, b) { return a.info.days - b.info.days || a.name.localeCompare(b.name); });
    return out.slice(0, limit || 5);
  }
  function digestHTML(schN, progN) {
    var dig = digestDeadlines(5);
    var h = '<div class="digest"><div class="digest-head"><span class="digest-ico" aria-hidden="true">' + icon("envelope") + "</span>" +
      '<div><h3 class="digest-h">This week for you</h3>' +
      '<p class="digest-sub">' + commas(schN) + " scholarships and " + commas(progN) + " programs match you — here are the closest deadlines, refreshed every visit.</p></div></div>";
    if (dig.length) {
      h += '<ul class="digest-list">' + dig.map(function (d) {
        var left = d.info.days <= 0 ? "due today" : "in " + d.info.days + " day" + (d.info.days === 1 ? "" : "s");
        return '<li><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' +
          '<span class="digest-when">' + DL_MON[d.info.date.getMonth()] + " " + d.info.date.getDate() + "</span>" +
          '<span class="digest-name">' + esc(d.name) + "</span>" +
          '<span class="digest-left' + (d.info.soon ? " soon" : "") + '">' + left + "</span></a></li>";
      }).join("") + "</ul>";
    } else {
      h += '<p class="muted digest-none">No matched deadlines coming up right now — browse the full lists below.</p>';
    }
    return h + "</div>";
  }

  function renderQuiz() {
    var res = $("#quiz-results");
    var answered = Object.keys(quiz).some(function (k) { return quiz[k]; });
    if (!answered) {
      res.innerHTML = '<div class="quiz-empty">Pick an answer above and your personalized matches will appear right here.</div>';
      meta.textContent = ""; empty.hidden = true; return;
    }
    var schM = SCH.map(function (s) { return { s: s, sc: schScore(s) }; }).filter(function (o) { return o.sc > 0; })
      .sort(function (a, b) { return b.sc - a.sc || b.s.amount - a.s.amount; });
    var progM = PROG.map(function (p) { return { p: p, sc: progScore(p) }; }).filter(function (o) { return o.sc > 0; })
      .sort(function (a, b) { return b.sc - a.sc || accNum(a.p) - accNum(b.p); });
    var html = digestHTML(schM.length, progM.length);
    html += '<h3 class="quiz-rh">Scholarships for you <span>' + schM.length + "</span></h3>";
    html += schM.length ? '<div class="list">' + schM.slice(0, 50).map(function (o, i) { return schRow(o.s, i); }).join("") + "</div>"
      : '<p class="muted">No specific scholarship matches yet, try adjusting your answers.</p>';
    html += '<h3 class="quiz-rh">Programs for you <span>' + progM.length + "</span></h3>";
    html += progM.length ? '<div class="list">' + progM.slice(0, 50).map(function (o, i) { return progRow(o.p, i); }).join("") + "</div>"
      : '<p class="muted">No specific program matches with these answers.</p>';
    res.innerHTML = html;
    meta.textContent = "Matched " + schM.length + " scholarships and " + progM.length + " programs to you";
    empty.hidden = true;
  }

  // ---- shared --------------------------------------------------------
  function activate(box, btn) {
    box.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-active", c === btn); });
  }
  function render() {
    if (state.tab === "about") { meta.textContent = ""; empty.hidden = true; return; }
    if (state.tab === "foryou") { renderQuiz(); return; }
    if (state.tab === "saved") { renderSaved(); return; }
    if (state.tab === "guides") {
      var gn = renderGuides();
      meta.textContent = state.q ? ("Showing " + gn + " of " + GUIDES.length + " guides") : (GUIDES.length + " guides");
      empty.hidden = true; return;
    }
    if (state.tab === "templates") {
      var tn = renderTemplates();
      meta.textContent = state.q ? ("Showing " + tn + " of " + TEMPLATES.length + " templates") : (TEMPLATES.length + " templates");
      empty.hidden = true; return;
    }
    if (state.tab === "deadlines") {
      var dn = renderDeadlines();
      meta.textContent = dn + " upcoming deadline" + (dn === 1 ? "" : "s") + (state.deadlines.window === "all" ? "" : " in the next " + state.deadlines.window + " days");
      empty.hidden = true; return;
    }
    if (state.tab === "discounts") {
      var disc = renderDiscounts();
      meta.textContent = state.q ? ("Showing " + disc + " of " + DISCOUNTS.length + " discounts") : (DISCOUNTS.length + " student discounts");
      empty.hidden = true; return;
    }
    if (state.tab === "competitions") {
      var cn = renderCompetitions();
      meta.textContent = state.q ? ("Showing " + cn + " of " + COMPS.length + " competitions") : (COMPS.length + " competitions");
      empty.hidden = true; return;
    }
    if (state.tab === "hackathons") {
      var hk = renderHackathons();
      meta.textContent = state.q ? ("Showing " + hk + " of " + HACKATHONS.length + " hackathons") : (HACKATHONS.length + " upcoming hackathons");
      empty.hidden = true; return;
    }
    if (state.tab === "roadmaps") { renderRoadmaps(); meta.textContent = ROADMAPS.length + " step-by-step roadmaps"; empty.hidden = true; return; }
    if (state.tab === "contribute") { renderContribute(); meta.textContent = ""; empty.hidden = true; return; }
    var n, total, label;
    if (state.tab === "tools") { n = renderTools(); total = RES.length; label = "tools"; }
    else if (state.tab === "sch") { n = renderSch(); total = SCH.length; label = "scholarships"; }
    else { n = renderProg(); total = PROG.length; label = "programs"; }
    meta.textContent = n === total ? ("Showing all " + total + " " + label) : ("Showing " + n + " of " + total + " " + label);
    empty.hidden = n !== 0;
  }
  function switchTab(tab) {
    state.tab = tab;
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.toggle("is-active", t.dataset.tab === tab); });
    document.querySelectorAll(".filterset").forEach(function (f) { f.hidden = f.dataset.for !== tab; });
    ["tools", "discounts", "sch", "prog", "competitions", "deadlines", "roadmaps", "foryou", "saved", "guides", "templates", "hackathons", "contribute", "about"].forEach(function (t) { $("#panel-" + t).hidden = t !== tab; });
    document.title = (TAB_TITLES[tab] ? TAB_TITLES[tab] + " · " : "") + "stdnt.xyz - free stuff for students";
    var moreBtn = $("#more-btn"); if (moreBtn) moreBtn.classList.toggle("is-active", !!OVERFLOW[tab]);
    closeMore();
    search.placeholder = tab === "tools" ? "Search tools, APIs, perks..." :
      tab === "discounts" ? "Search student discounts..." :
      tab === "sch" ? "Search scholarships..." :
      tab === "prog" ? "Search programs, subjects..." :
      tab === "competitions" ? "Search competitions..." :
      tab === "hackathons" ? "Search hackathons, cities..." :
      tab === "deadlines" ? "Search deadlines..." :
      tab === "saved" ? "Search your saved list..." :
      tab === "guides" ? "Search guides..." :
      tab === "templates" ? "Search templates..." : "Search...";
    render();
  }

  function wire() {
    // hide favicons that fail to load so the letter/silhouette fallback shows
    // (error events don't bubble, so listen in the capture phase)
    document.addEventListener("error", function (e) {
      var t = e.target;
      if (t && t.tagName === "IMG" && t.classList &&
        (t.classList.contains("logo-img") || t.classList.contains("ic-fav") || t.classList.contains("row-fav"))) {
        t.style.display = "none";
      }
    }, true);
    document.querySelectorAll(".tab").forEach(function (t) {
      t.addEventListener("click", function () { switchTab(t.dataset.tab); });
    });
    $("#tools-access").addEventListener("click", function (e) {
      var b = e.target.closest(".seg"); if (!b) return;
      state.tools.access = b.dataset.access;
      $("#tools-access").querySelectorAll(".seg").forEach(function (s) { s.classList.toggle("is-active", s === b); });
      render();
    });
    var deb;
    search.addEventListener("input", function (e) {
      clearTimeout(deb); var v = e.target.value;
      deb = setTimeout(function () { state.q = v.trim(); render(); }, 110);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && guideOpen()) { e.preventDefault(); closeReader(); return; }
      if (e.key === "/" && document.activeElement !== search) { e.preventDefault(); search.focus(); }
      else if (e.key === "Escape" && document.activeElement === search) { search.value = ""; state.q = ""; render(); search.blur(); }
    });
    $("#clear").addEventListener("click", function () {
      state.q = ""; search.value = "";
      state.tools = { access: "all", cat: "all" };
      state.sch = { group: "all", sort: state.sch.sort };
      state.prog = { grade: "all", free: false, sort: state.prog.sort };
      $("#prog-free").checked = false;
      document.querySelectorAll(".chips").forEach(function (box) {
        box.querySelectorAll(".chip").forEach(function (c, i) { c.classList.toggle("is-active", i === 0); });
      });
      $("#tools-access").querySelectorAll(".seg").forEach(function (s) { s.classList.toggle("is-active", s.dataset.access === "all"); });
      render();
    });
    // hero announcement / CTA buttons jump to a tab
    document.addEventListener("click", function (e) {
      var g = e.target.closest("[data-goto]"); if (!g) return;
      switchTab(g.dataset.goto);
      var nav = document.querySelector(".tabs"); if (nav) nav.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    // quiz answers
    var qf = $("#quiz-form");
    if (qf) qf.addEventListener("click", function (e) {
      var b = e.target.closest(".qchip"); if (!b) return;
      var id = b.dataset.q, v = b.dataset.v;
      quiz[id] = (quiz[id] === v) ? "" : v;
      saveQuiz();
      qf.querySelectorAll('.qchip[data-q="' + id + '"]').forEach(function (c) { c.classList.toggle("is-active", c.dataset.v !== "" && c.dataset.v === (quiz[id] || "")); });
      renderQuiz(); renderHero();
    });
    if (qf) qf.addEventListener("change", function (e) {
      var sel = e.target.closest(".qselect"); if (!sel) return;
      quiz[sel.dataset.q] = sel.value; saveQuiz(); renderQuiz(); renderHero();
    });
    var qr = $("#quiz-reset");
    if (qr) qr.addEventListener("click", function () { quiz = {}; saveQuiz(); buildQuiz(); renderQuiz(); renderHero(); });
    var qsh = $("#quiz-share");
    if (qsh) qsh.addEventListener("click", function () {
      var p = Object.keys(quiz).filter(function (k) { return quiz[k]; }).map(function (k) { return k + "=" + encodeURIComponent(quiz[k]); }).join("&");
      copyText(location.origin + location.pathname + "#foryou" + (p ? "&" + p : ""));
      flash("#quiz-copied");
    });
    // saved-list export
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-act]"); if (!b) return;
      var act = b.dataset.act, items = savedItems();
      if (act === "print") window.print();
      else if (act === "copy") { copyText(items.map(function (it) { return it.name + " - " + it.url; }).join("\n")); flash("#saved-copied"); }
      else if (act === "csv") download("stdnt-saved.csv", toCSV(items), "text/csv;charset=utf-8");
      else if (act === "ics") download("stdnt-deadlines.ics", toICS(items), "text/calendar;charset=utf-8");
    });
    // report a problem (delegated) - opens a prefilled GitHub issue, no backend
    document.addEventListener("click", function (e) {
      var f = e.target.closest(".flag"); if (!f) return;
      e.preventDefault(); e.stopPropagation();
      var name = f.dataset.flagName || "", url = f.dataset.flagUrl || "";
      var body = "**Listing:** " + name + "\n**Link:** " + url +
        "\n\n**What's wrong?** (tick any)\n- [ ] Link is dead / 404\n- [ ] Program or scholarship no longer exists\n- [ ] Deadline is wrong or out of date\n- [ ] Other (explain below)\n\n**Details:**\n";
      var href = "https://github.com/2008wbbv/edu.edu/issues/new?title=" +
        encodeURIComponent("Listing issue: " + name) + "&body=" + encodeURIComponent(body);
      window.open(href, "_blank", "noopener");
    });
    // star toggling (delegated; works inside anchors and across tabs)
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".star"); if (!btn) return;
      e.preventDefault(); e.stopPropagation();
      var id = btn.dataset.id;
      if (saved.has(id)) saved.delete(id); else saved.add(id);
      persistSaved();
      document.querySelectorAll(".star").forEach(function (b) {
        if (b.dataset.id === id) {
          var on = saved.has(id);
          b.classList.toggle("on", on);
          b.setAttribute("aria-pressed", on);
          b.setAttribute("aria-label", on ? "Saved to your list" : "Save to your list");
        }
      });
      $("#n-saved").textContent = saved.size;
      if (state.tab === "saved") renderSaved();
    });
    // roadmaps: pick a goal, or follow a step that deep-links into another tab
    document.addEventListener("click", function (e) {
      var pick = e.target.closest("[data-rm-pick]");
      if (pick) { state.roadmap = pick.getAttribute("data-rm-pick"); renderRoadmaps(); return; }
      var go = e.target.closest("[data-rm-goto]"); if (!go) return;
      e.preventDefault();
      var tab = go.getAttribute("data-rm-goto"), q = go.getAttribute("data-rm-q") || "";
      search.value = q; state.q = q.trim();
      switchTab(tab);
      var nav = document.querySelector(".tabs"); if (nav) nav.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    // checklist: tick items off (persisted on this device)
    document.addEventListener("click", function (e) {
      var c = e.target.closest(".ck-check"); if (!c) return;
      var id = c.getAttribute("data-ck");
      if (checklist.has(id)) checklist.delete(id); else checklist.add(id);
      saveChecklist();
      var on = checklist.has(id), li = c.closest(".ck-item");
      if (li) li.classList.toggle("is-done", on);
      c.setAttribute("aria-checked", on);
      updateChecklistProgress();
    });
  }

  // newsletter signup - hands off to a third-party provider (no backend, no
  // emails stored in this repo). Until one is wired up, the live on-page
  // digest above is the working substitute.
  function wireNewsletter() {
    // delegated so any number of .news-form signups (For You + the site-wide
    // band) work from one handler
    document.addEventListener("submit", function (e) {
      var form = e.target.closest(".news-form"); if (!form) return;
      e.preventDefault();
      var input = form.querySelector(".news-input");
      var box = form.closest(".news, .news-band") || form.parentNode;
      var note = box ? box.querySelector(".news-note") : null;
      var email = (input && input.value || "").trim(); if (!email) return;
      if (NEWSLETTER_ENDPOINT) {
        var fd = new FormData(); fd.append("email", email);
        fetch(NEWSLETTER_ENDPOINT, { method: "POST", body: fd, mode: "no-cors" }).catch(function () {});
        if (note) note.textContent = "Thanks! Check your inbox to confirm your subscription.";
        form.reset();
      } else if (note) {
        note.innerHTML = 'Email digests aren\'t switched on yet — but your matches update live every visit. Want this? <a href="https://github.com/2008wbbv/edu.edu/issues/new?title=Enable+email+digest" target="_blank" rel="noopener">+1 it on GitHub</a>.';
      }
    });
  }

  // ---- hero logo collage ---------------------------------------------
  function buildCollage() {
    var L = $("#collage-l"), R = $("#collage-r"); if (!L || !R) return;
    var slugs = []; var seen = {};
    RES.forEach(function (r) { if (r.slug && !seen[r.slug]) { seen[r.slug] = 1; slugs.push(r.slug); } });
    function tiles(arr) {
      return arr.map(function (s, i) {
        var rot = ((i * 5) % 9) - 4; // -4..4 deg
        return '<span class="ctile" style="transform:rotate(' + rot + 'deg)"><span class="ic" style="--src:url(\'' + ICON_CDN + s + '\')"></span></span>';
      }).join("");
    }
    var n = Math.min(14, Math.floor(slugs.length / 2));
    L.innerHTML = tiles(slugs.slice(0, n));
    R.innerHTML = tiles(slugs.slice(n, n * 2));
  }

  // ---- sponsors + stats ----------------------------------------------
  function renderSponsors() {
    var box = $("#sponsors"); if (!box) return;
    var list = window.SPONSORS || [];
    var html = list.map(function (s) {
      var logo = s.slug
        ? '<img class="sp-logo" src="' + ICON_CDN + esc(s.slug) + '" alt="' + esc(s.name) + '" loading="lazy" />'
        : '<span class="sp-mono">' + esc(s.name) + "</span>";
      return '<a class="sponsor" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + logo +
        '<span class="sp-name">' + esc(s.name) + (s.note ? ' <span class="sp-note">' + esc(s.note) + "</span>" : "") + "</span></a>";
    }).join("");
    if (!list.length) html = '<span class="sp-none">No sponsors yet, want to be the first?</span>';
    html += '<a class="sponsor sponsor-add" href="https://github.com/2008wbbv/edu.edu" target="_blank" rel="noopener"><span class="sp-plus">+</span><span class="sp-name">Your logo here</span></a>';
    box.innerHTML = html;
  }
  function fillStats() {
    [["#hs-tools", RES.length], ["#hs-sch", SCH.length], ["#hs-prog", PROG.length],
     ["#ab-tools", RES.length], ["#ab-sch", SCH.length], ["#ab-prog", PROG.length],
     ["#ab-comp", COMPS.length], ["#ab-hack", HACKATHONS.length]].forEach(function (p) {
      var el = $(p[0]); if (el) el.textContent = commas(p[1]);
    });
  }

  // ---- GUIDES --------------------------------------------------------
  function guideBySlug(slug) {
    for (var i = 0; i < GUIDES.length; i++) if (GUIDES[i].slug === slug) return GUIDES[i];
    return null;
  }
  function guidesFiltered() {
    var ts = terms();
    return GUIDES.filter(function (g) {
      if (!ts.length) return true;
      return hit([g.title, g.blurb, (g.tags || []).join(" ")].join(" "), ts);
    });
  }
  function guideCard(g, i) {
    var tags = (g.tags || []).slice(0, 3).map(function (t) { return '<span class="guide-tag">' + esc(t) + "</span>"; }).join("");
    return '<a class="guide-card" href="#guide/' + esc(g.slug) + '" style="animation-delay:' + Math.min(i * 45, 270) + 'ms">' +
      '<span class="guide-ico" aria-hidden="true">' + icon(g.icon) + "</span>" +
      '<span class="guide-card-main">' +
        '<span class="guide-card-title">' + esc(g.title) + "</span>" +
        '<span class="guide-card-blurb">' + esc(g.blurb) + "</span>" +
        '<span class="guide-card-meta"><span class="guide-mins">' + g.readMins + " min read</span>" + tags + "</span>" +
      "</span>" +
      '<span class="guide-card-arrow" aria-hidden="true">&rarr;</span></a>';
  }
  function renderGuides() {
    var box = $("#guides-grid"); if (!box) return 0;
    var list = guidesFiltered();
    box.innerHTML = list.length ? list.map(guideCard).join("")
      : '<p class="muted guides-empty">No guides match your search.</p>';
    return list.length;
  }
  function guideReaderHTML(g) {
    var tags = (g.tags || []).map(function (t) { return '<span class="guide-tag">' + esc(t) + "</span>"; }).join("");
    return '<header class="guide-rhead">' +
        '<span class="guide-rico" aria-hidden="true">' + icon(g.icon) + "</span>" +
        '<h2 class="guide-rtitle" id="guide-reader-title">' + esc(g.title) + "</h2>" +
        '<p class="guide-rmeta"><span class="guide-mins">' + g.readMins + " min read</span>" + tags + "</p>" +
      "</header>" +
      '<div class="guide-rbody">' + g.body + "</div>" +
      '<a class="guide-rback" href="#guides">&larr; All guides</a>';
  }
  var lastFocus = null;
  function guideOpen() { var ov = $("#guide-overlay"); return !!(ov && !ov.hidden); }
  function openGuide(slug) {
    var g = guideBySlug(slug); if (!g) { closeGuide(); return; }
    var ov = $("#guide-overlay"), body = $("#guide-reader-body");
    if (!ov || !body) return;
    body.innerHTML = guideReaderHTML(g);
    lastFocus = document.activeElement;
    ov.hidden = false;
    document.documentElement.classList.add("guide-open");
    var reader = ov.querySelector(".guide-reader");
    if (reader) { reader.scrollTop = 0; reader.focus(); }
  }
  function closeGuide() {
    var ov = $("#guide-overlay"); if (!ov || ov.hidden) return;
    ov.hidden = true;
    document.documentElement.classList.remove("guide-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function closeReader() {
    if (!guideOpen()) return;
    if ((location.hash || "").indexOf("#guide/") === 0) location.hash = "guides"; // hashchange -> closeGuide
    else closeGuide();
  }
  // copy + button "Copied!" feedback, reusing the shared copyText/fallbackCopy
  function copyWithFeedback(text, btn) {
    copyText(text);
    var label = btn.textContent;
    btn.textContent = "Copied!";
    btn.classList.add("is-copied");
    setTimeout(function () { btn.textContent = label; btn.classList.remove("is-copied"); }, 1600);
  }
  // ---- MEDIA KIT (downloadable wordmark + brand) ---------------------
  function wordmarkSVG(theme) {
    var main = theme === "dark" ? "#ecedf1" : "#16181d";
    var dim = theme === "dark" ? "#6b6f7d" : "#9296a3";
    return '<svg xmlns="http://www.w3.org/2000/svg" width="430" height="100" viewBox="0 0 430 100">' +
      '<text x="14" y="64" font-family="\'JetBrains Mono\', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="54" font-weight="700" letter-spacing="-1.5">' +
      '<tspan fill="' + main + '">stdnt</tspan><tspan fill="' + dim + '">.xyz</tspan></text></svg>';
  }
  function wireMediaKit() {
    var kit = $("#mediakit"); if (!kit) return;
    kit.addEventListener("click", function (e) {
      var dl = e.target.closest("[data-mk-dl]");
      if (dl) { var t = dl.getAttribute("data-mk-dl"); download("stdnt-xyz-wordmark-" + t + ".svg", wordmarkSVG(t), "image/svg+xml"); return; }
      var sw = e.target.closest("[data-mk-copy]");
      if (sw) {
        copyText(sw.getAttribute("data-mk-copy"));
        var lab = sw.querySelector(".mk-swatch-hex") || sw, old = lab.textContent;
        lab.textContent = "Copied!"; setTimeout(function () { lab.textContent = old; }, 1200); return;
      }
      var bp = e.target.closest("[data-mk-boiler]");
      if (bp) { var bo = $("#mk-boiler"); if (bo) copyWithFeedback(bo.textContent.trim(), bp); return; }
    });
  }
  function wireGuideOverlay() {
    var ov = $("#guide-overlay"); if (!ov) return;
    ov.addEventListener("click", function (e) {
      if (e.target.closest("[data-guide-close]")) { e.preventDefault(); closeReader(); return; }
      var cp = e.target.closest("[data-copy]");
      if (cp) { var pre = cp.parentNode.querySelector("pre"); if (pre) copyWithFeedback(pre.innerText || pre.textContent, cp); }
    });
  }
  function routeGuideHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (h.indexOf("guide/") === 0) {
      if (state.tab !== "guides") switchTab("guides");
      openGuide(h.slice("guide/".length));
      return true;
    }
    if (h === "guides") {
      closeGuide();
      if (state.tab !== "guides") switchTab("guides");
      return true;
    }
    return false;
  }
  var TAB_HASHES = { tools: 1, discounts: 1, sch: 1, prog: 1, competitions: 1, deadlines: 1, roadmaps: 1, foryou: 1, saved: 1, guides: 1, templates: 1, hackathons: 1, contribute: 1, about: 1 };
  var OVERFLOW = { guides: 1, templates: 1, hackathons: 1, contribute: 1, about: 1 };   // tabs tucked into the "More" menu
  var TAB_TITLES = { tools: "Free tools & perks", discounts: "Student discounts", sch: "Scholarships", prog: "STEM programs", competitions: "Competitions", deadlines: "Deadlines", roadmaps: "Roadmaps", foryou: "Find your matches", saved: "Saved", guides: "Guides", templates: "Templates", hackathons: "Hackathons", contribute: "Contribute", about: "About" };
  function closeMore() { var m = $("#tab-menu"), b = $("#more-btn"); if (m && !m.hidden) { m.hidden = true; if (b) b.setAttribute("aria-expanded", "false"); } }
  function wireMore() {
    var btn = $("#more-btn"), menu = $("#tab-menu"); if (!btn || !menu) return;
    btn.addEventListener("click", function (e) { e.stopPropagation(); var open = menu.hidden; menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); });
    document.addEventListener("click", function (e) { if (!menu.hidden && !e.target.closest(".tab-more")) closeMore(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMore(); });
  }
  function routeHash() {
    if (routeGuideHash()) return true;
    if (guideOpen()) closeGuide();
    var h = (location.hash || "").replace(/^#/, "");
    if (TAB_HASHES[h]) { if (state.tab !== h) switchTab(h); return true; }
    return false;
  }

  // ---- TEMPLATES (spreadsheets) --------------------------------------
  function templateBySlug(slug) {
    for (var i = 0; i < TEMPLATES.length; i++) if (TEMPLATES[i].slug === slug) return TEMPLATES[i];
    return null;
  }
  function templatesFiltered() {
    var ts = terms();
    return TEMPLATES.filter(function (t) {
      if (!ts.length) return true;
      return hit([t.title, t.blurb, (t.tags || []).join(" "), (t.columns || []).join(" ")].join(" "), ts);
    });
  }
  function tplRows(t) { return [t.columns || []].concat(t.sample || []); }
  function tplCSV(t) { return tplRows(t).map(function (r) { return r.map(csvCell).join(","); }).join("\r\n"); }
  function tplTSV(t) { return tplRows(t).map(function (r) { return r.map(function (c) { return String(c == null ? "" : c).replace(/\t/g, " "); }).join("\t"); }).join("\n"); }
  function downloadCSV(t) { download(t.slug + ".csv", "﻿" + tplCSV(t), "text/csv;charset=utf-8"); }
  function templateCard(t, i) {
    var cols = (t.columns || []).map(function (c) { return '<span class="tpl-col">' + esc(c) + "</span>"; }).join("");
    return '<div class="tpl-card" style="animation-delay:' + Math.min(i * 40, 240) + 'ms">' +
      '<div class="tpl-head"><span class="tpl-ico" aria-hidden="true">' + icon(t.icon) + "</span>" +
        '<span class="tpl-headmain"><span class="tpl-title">' + esc(t.title) + "</span>" +
        '<span class="tpl-blurb">' + esc(t.blurb) + "</span></span></div>" +
      '<div class="tpl-cols">' + cols + "</div>" +
      '<div class="tpl-actions">' +
        '<button class="btn btn-grad tpl-btn" type="button" data-tpl-csv="' + esc(t.slug) + '">' +
          '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg> Download .csv</button>' +
        '<button class="btn btn-ghost tpl-btn" type="button" data-tpl-copy="' + esc(t.slug) + '">Copy for Sheets</button>' +
      "</div></div>";
  }
  function renderTemplates() {
    var box = $("#templates-grid"); if (!box) return 0;
    var list = templatesFiltered();
    box.innerHTML = list.length ? list.map(templateCard).join("")
      : '<p class="muted guides-empty">No templates match your search.</p>';
    return list.length;
  }
  function wireTemplates() {
    var box = $("#templates-grid"); if (!box) return;
    box.addEventListener("click", function (e) {
      var d = e.target.closest("[data-tpl-csv]");
      if (d) { var t = templateBySlug(d.getAttribute("data-tpl-csv")); if (t) downloadCSV(t); return; }
      var c = e.target.closest("[data-tpl-copy]");
      if (c) { var t2 = templateBySlug(c.getAttribute("data-tpl-copy")); if (t2) copyWithFeedback(tplTSV(t2), c); }
    });
  }

  // ---- DISCOUNTS -----------------------------------------------------
  function discountsFiltered() {
    var ts = terms();
    return DISCOUNTS.filter(function (d) {
      if (!ts.length) return true;
      var c = CAT[d.category];
      return hit([d.name, d.desc, d.value, c && c.name, (d.tags || []).join(" ")].join(" "), ts);
    });
  }
  function renderDiscounts() {
    var box = $("#discounts-grid"); if (!box) return 0;
    var list = discountsFiltered(), html = "";
    DISC_CATS.forEach(function (cat) {
      var items = list.filter(function (d) { return d.category === cat.id; });
      if (!items.length) return;
      html += '<h3 class="saved-h">' + esc(cat.name) + " <span>" + items.length + "</span></h3>" +
        '<div class="grid">' + items.map(toolCard).join("") + "</div>";
    });
    box.innerHTML = html || '<p class="muted guides-empty">No discounts match your search.</p>';
    return list.length;
  }

  // ---- COMPETITIONS --------------------------------------------------
  function competitionsFiltered() {
    var ts = terms();
    return COMPS.filter(function (c) {
      if (!ts.length) return true;
      return hit([c.name, c.desc, c.category, c.format, (c.tags || []).join(" ")].join(" "), ts);
    });
  }
  function competitionCard(c, i) {
    var dl = c.deadline ? '<span class="tg tg-comp">' + esc(c.deadline) + "</span>" : "";
    var fmt = c.format ? '<span class="tg">' + esc(c.format) + "</span>" : "";
    var gr = c.grades ? '<span class="tg">Grades ' + esc(c.grades) + "</span>" : "";
    var ft = freshTags(c, c.url);
    return '<a class="card" href="' + esc(c.url) + '" target="_blank" rel="noopener" style="animation-delay:' + Math.min(i * 16, 240) + 'ms">' +
      '<div class="card-top">' + logoTile(c.name, c.url) +
      '<span class="card-name">' + esc(c.name) + matchBadge("comp", c) + "</span>" +
      '<span class="card-meta">' + starBtn("comp", c.name) + flagBtn(c.name, c.url) + "</span></div>" +
      '<p class="card-desc">' + esc(c.desc) + "</p>" +
      (ft ? '<div class="card-flags">' + ft + "</div>" : "") +
      '<div class="card-foot comp-foot">' + dl + fmt + gr + "</div></a>";
  }
  function renderCompetitions() {
    var box = $("#competitions-grid"); if (!box) return 0;
    var list = competitionsFiltered(), html = "";
    COMP_CATS.forEach(function (cat) {
      var items = list.filter(function (c) { return c.category === cat.id; });
      if (!items.length) return;
      html += '<h3 class="saved-h saved-h-ico">' + icon(COMP_ICON[cat.id]) + esc(cat.name) + " <span>" + items.length + "</span></h3>" +
        '<div class="grid">' + items.map(competitionCard).join("") + "</div>";
    });
    box.innerHTML = html || '<p class="muted guides-empty">No competitions match your search.</p>';
    return list.length;
  }

  // ---- HACKATHONS ----------------------------------------------------
  function hackathonsFiltered() {
    var ts = terms();
    return HACKATHONS.filter(function (h) {
      if (!ts.length) return true;
      return hit([h.name, h.city, h.region, h.country, h.format, h.source].join(" "), ts);
    });
  }
  function hkParts(s) { var a = (s || "").split("-"); return a.length === 3 ? { y: +a[0], m: +a[1] - 1, d: +a[2] } : null; }
  function hkDate(h) {
    var s = hkParts(h.start), e = hkParts(h.end);
    if (!s) return "Dates TBA";
    var sm = DL_MON[s.m];
    if (!e || (e.y === s.y && e.m === s.m && e.d === s.d)) return sm + " " + s.d;
    if (e.y === s.y && e.m === s.m) return sm + " " + s.d + "–" + e.d;
    return sm + " " + s.d + " – " + DL_MON[e.m] + " " + e.d;
  }
  function hkDays(s) {
    var p = hkParts(s); if (!p) return null;
    var now = new Date(); now.setHours(0, 0, 0, 0);
    return Math.round((new Date(p.y, p.m, p.d) - now) / 86400000);
  }
  function hkLoc(h) {
    if (h.format === "online") return "Online · Worldwide";
    var loc = [h.city, h.region && h.region !== h.city ? h.region : h.country].filter(Boolean).join(", ");
    return loc || (h.country || "In person");
  }
  function hackCard(h, i) {
    var fmtCls = h.format === "online" ? "is-online" : h.format === "hybrid" ? "is-hybrid" : "is-inperson";
    var fmtLbl = h.format === "online" ? "Online" : h.format === "hybrid" ? "Hybrid" : "In person";
    var d0 = hkDays(h.start), d1 = hkDays(h.end), pill = "";
    if (d0 !== null) {
      if (d0 <= 0 && (d1 === null || d1 >= 0)) pill = '<span class="hk-pill hk-live">Live now</span>';
      else if (d0 === 1) pill = '<span class="hk-pill hk-soon">Tomorrow</span>';
      else if (d0 > 1 && d0 <= 14) pill = '<span class="hk-pill hk-soon">in ' + d0 + ' days</span>';
    }
    var tags = '<span class="tg hk-fmt ' + fmtCls + '">' + fmtLbl + "</span>";
    if (h.hs) tags += '<span class="tg">High school</span>';
    tags += '<span class="tg hk-src">' + esc(h.source) + "</span>";
    return '<a class="card hk-card" href="' + esc(h.url) + '" target="_blank" rel="noopener" style="animation-delay:' + Math.min(i * 16, 240) + 'ms">' +
      '<div class="card-top">' + logoTile(h.name, h.url) +
        '<span class="card-name">' + esc(h.name) + pill + "</span></div>" +
      '<div class="hk-info">' +
        '<span class="hk-line">' + ICO_CAL + "<span>" + hkDate(h) + "</span></span>" +
        '<span class="hk-line">' + (h.format === "online" ? ICO_GLOBE : ICO_PIN) + "<span>" + esc(hkLoc(h)) + "</span></span></div>" +
      '<div class="card-foot hk-foot">' + tags + "</div></a>";
  }
  function renderHackathons() {
    var box = $("#hackathons-grid"); if (!box) return 0;
    var list = hackathonsFiltered();
    if (!list.length) { box.innerHTML = '<p class="muted guides-empty">No hackathons match your search.</p>'; return 0; }
    var groups = [], idx = {}, n = 0;
    list.forEach(function (h) {
      var p = hkParts(h.start), key = p ? (DL_MON[p.m] + " " + p.y) : "Dates TBA";
      if (idx[key] == null) { idx[key] = groups.length; groups.push({ key: key, items: [] }); }
      groups[idx[key]].items.push(h);
    });
    box.innerHTML = groups.map(function (g) {
      return '<h3 class="saved-h">' + esc(g.key) + " <span>" + g.items.length + "</span></h3>" +
        '<div class="grid">' + g.items.map(function (h) { return hackCard(h, n++); }).join("") + "</div>";
    }).join("");
    return list.length;
  }
  // pull the freshest list (same-origin JSON, refreshed daily by CI); the
  // baked-in window.HACKATHONS stays as the offline fallback.
  function loadHackathons() {
    fetch("data/hackathons.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.events || !d.events.length) return;
        HACKATHONS = d.events;
        $("#n-hackathons").textContent = HACKATHONS.length;
        var abh = $("#ab-hack"); if (abh) abh.textContent = commas(HACKATHONS.length);
        var note = $("#hk-updated");
        if (note && d.updated) {
          var dt = new Date(d.updated);
          note.textContent = "Live · updated " + DL_MON[dt.getMonth()] + " " + dt.getDate();
          note.hidden = false;
        }
        if (state.tab === "hackathons") render();
      })
      .catch(function () {});
  }

  // ---- ROADMAPS (goal -> sequenced steps; the opportunity graph) ------
  function roadmapById(id) { for (var i = 0; i < ROADMAPS.length; i++) if (ROADMAPS[i].id === id) return ROADMAPS[i]; return null; }
  function defaultRoadmap() {
    var map = { cs: "cs", eng: "stem", med: "premed", math: "stem", business: "business", arts: "arts" };
    if (quiz.field && map[quiz.field]) return map[quiz.field];
    if (quiz.firstgen === "yes" || quiz.income === "low") return "firstgen";
    return ROADMAPS.length ? ROADMAPS[0].id : null;
  }
  // rough countdown: the September after the user finishes 12th grade
  function collegeCountdown() {
    var yrs = { Freshman: 3, Sophomore: 2, Junior: 1, Senior: 0 }[quiz.grade];
    if (yrs == null) return null;                 // "College" or unanswered
    var now = new Date();
    var endYear = now.getMonth() >= 6 ? now.getFullYear() + 1 : now.getFullYear(); // academic year end
    var start = new Date(endYear + yrs, 8, 1);     // ~Sep 1 of the start year
    var days = Math.ceil((start - now) / 86400000);
    if (days < 0) return null;
    return { days: days, date: start };
  }
  function rmDoItem(d) {
    var inner = '<span class="rm-do-tick" aria-hidden="true">' + icon("check") + "</span>";
    if (d.url) {
      return '<a class="rm-do" href="' + esc(d.url) + '" target="_blank" rel="noopener">' + inner +
        '<span class="rm-do-t">' + esc(d.t) + ' <span class="ext">&#8599;</span></span></a>';
    }
    return '<button class="rm-do" type="button" data-rm-goto="' + esc(d.goto || "tools") + '" data-rm-q="' + esc(d.q || "") + '">' +
      inner + '<span class="rm-do-t">' + esc(d.t) + "</span>" +
      '<span class="rm-do-go" aria-hidden="true">&rarr;</span></button>';
  }
  // ---- countdown-to-college checklist (persisted, deep-linked) -------
  function checklistStats() {
    var total = 0, done = 0;
    COLLEGE_CHECKLIST.forEach(function (ph) { ph.items.forEach(function (it) { total++; if (checklist.has(it.id)) done++; }); });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0 };
  }
  function nowPhase() { return { Freshman: 0, Sophomore: 0, Junior: 1, Senior: 3 }[quiz.grade]; }
  function ckRing(pct) {
    var C = 2 * Math.PI * 20;
    return '<span class="ck-ring-wrap"><svg class="ck-ring" viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">' +
      '<circle class="ck-ring-bg" cx="24" cy="24" r="20"/>' +
      '<circle class="ck-ring-fg" cx="24" cy="24" r="20" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pct / 100)).toFixed(1) + '"/>' +
      '</svg><span class="ck-ring-num">' + pct + '%</span></span>';
  }
  function renderChecklist() {
    if (!COLLEGE_CHECKLIST.length) return "";
    var st = checklistStats(), now = nowPhase();
    var phases = COLLEGE_CHECKLIST.map(function (ph, pi) {
      var items = ph.items.map(function (it) {
        var on = checklist.has(it.id);
        var go = it.goto ? '<button class="ck-go" type="button" data-rm-goto="' + esc(it.goto) + '" data-rm-q="' + esc(it.q || "") + '" aria-label="Open in site">&rarr;</button>' : "";
        return '<li class="ck-item' + (on ? " is-done" : "") + '">' +
          '<button class="ck-check" type="button" role="checkbox" aria-checked="' + on + '" data-ck="' + esc(it.id) + '">' +
            '<span class="ck-box" aria-hidden="true">' + icon("check") + "</span>" +
            '<span class="ck-t">' + esc(it.t) + "</span></button>" + go + "</li>";
      }).join("");
      var isNow = pi === now;
      return '<div class="ck-phase' + (isNow ? " is-now" : "") + '">' +
        '<div class="ck-phase-h">' + esc(ph.phase) + (isNow ? ' <span class="ck-now">You are here</span>' : "") + "</div>" +
        '<ul class="ck-list">' + items + "</ul></div>";
    }).join("");
    return '<div class="ck">' +
      '<div class="ck-head">' + ckRing(st.pct) +
        '<div class="ck-head-txt"><h3 class="ck-h">Countdown checklist</h3>' +
        '<p class="ck-sub">The things that actually get you in — tick them off as you go. Saved on this device.</p>' +
        '<div class="ck-progtxt"><b>' + st.done + "</b> of " + st.total + " done</div></div></div>" +
      '<div class="ck-bar"><span style="width:' + st.pct + '%"></span></div>' +
      '<div class="ck-phases">' + phases + "</div></div>";
  }
  function updateChecklistProgress() {
    var st = checklistStats(), C = 2 * Math.PI * 20;
    var bar = document.querySelector(".ck-bar span"); if (bar) bar.style.width = st.pct + "%";
    var txt = document.querySelector(".ck-progtxt"); if (txt) txt.innerHTML = "<b>" + st.done + "</b> of " + st.total + " done";
    var fg = document.querySelector(".ck-ring-fg"); if (fg) fg.setAttribute("stroke-dashoffset", (C * (1 - st.pct / 100)).toFixed(1));
    var num = document.querySelector(".ck-ring-num"); if (num) num.textContent = st.pct + "%";
  }

  function renderRoadmaps() {
    var box = $("#roadmaps-body"); if (!box) return;
    if (!ROADMAPS.length) { box.innerHTML = '<p class="muted">Roadmaps are loading…</p>'; return; }
    if (!state.roadmap || !roadmapById(state.roadmap)) state.roadmap = defaultRoadmap();
    var rm = roadmapById(state.roadmap) || ROADMAPS[0];

    var chips = ROADMAPS.map(function (r) {
      return '<button class="rm-goal' + (r.id === rm.id ? " is-active" : "") + '" type="button" data-rm-pick="' + esc(r.id) +
        '" style="--rm-hue:' + r.hue + '"><span class="rm-goal-ico" aria-hidden="true">' + icon(r.icon) + "</span>" + esc(r.goal) + "</button>";
    }).join("");

    var cd = collegeCountdown(), cdHTML;
    if (cd) {
      cdHTML = '<div class="rm-countdown"><span class="rm-cd-ico" aria-hidden="true">' + icon("calendar") + "</span>" +
        '<span class="rm-cd-txt"><b>&asymp; ' + commas(cd.days) + "</b> days until you start college " +
        '<span class="rm-cd-sub">(' + DL_MON[cd.date.getMonth()] + " " + cd.date.getFullYear() + ", rough estimate)</span></span></div>";
    } else {
      cdHTML = '<div class="rm-countdown rm-cd-quiz"><span class="rm-cd-ico" aria-hidden="true">' + icon("calendar") + "</span>" +
        '<span class="rm-cd-txt">Tell us your grade in <button class="linkbtn" type="button" data-rm-goto="foryou" data-rm-q="">For You</button> to see your countdown to college.</span></div>';
    }

    var stages = rm.stages.map(function (s, i) {
      var dos = (s.do || []).map(rmDoItem).join("");
      var unlocks = (s.unlocks || []).map(function (u) { return '<span class="rm-unlock">' + icon("check") + esc(u) + "</span>"; }).join("");
      return '<div class="rm-stage" style="animation-delay:' + Math.min(i * 70, 350) + 'ms">' +
        '<div class="rm-stage-rail" aria-hidden="true"><span class="rm-node">' + (i + 1) + "</span></div>" +
        '<div class="rm-stage-body">' +
          '<div class="rm-when">' + esc(s.when) + "</div>" +
          '<h3 class="rm-stage-title">' + esc(s.title) + "</h3>" +
          '<div class="rm-dos">' + dos + "</div>" +
          (unlocks ? '<div class="rm-unlocks"><span class="rm-unlocks-l">Unlocks</span>' + unlocks + "</div>" : "") +
        "</div></div>";
    }).join("");

    box.innerHTML =
      '<p class="rm-intro">Pick a goal and follow the path. Each step links straight to the scholarships, programs and competitions you need — and shows what it <b>unlocks</b> next.</p>' +
      '<div class="rm-goals">' + chips + "</div>" +
      cdHTML +
      renderChecklist() +
      '<div class="rm-current" style="--rm-hue:' + rm.hue + '">' +
        '<div class="rm-current-head"><span class="rm-current-ico" aria-hidden="true">' + icon(rm.icon) + "</span>" +
          '<div><h2 class="rm-current-goal">' + esc(rm.goal) + "</h2><p class=\"rm-current-blurb\">" + esc(rm.blurb) + "</p></div></div>" +
        '<div class="rm-flow">' + stages + "</div>" +
      "</div>";
  }

  // ---- CONTRIBUTE (GitHub issue forms, per category, all tracked) ----
  function renderContribute() {
    var box = $("#contribute-body"); if (!box) return;
    var cards = CONTRIB.map(function (c) {
      return '<a class="cb-card" href="' + GH_REPO + "/issues/new?template=" + esc(c.template) + '" target="_blank" rel="noopener">' +
        '<span class="cb-card-ico" aria-hidden="true">' + icon(c.icon) + "</span>" +
        '<span class="cb-card-main"><span class="cb-card-t">' + esc(c.label) + "</span>" +
        '<span class="cb-card-d">' + esc(c.desc) + "</span></span>" +
        '<span class="cb-card-go" aria-hidden="true">&rarr;</span></a>';
    }).join("");
    var steps = [
      ["1", "Pick a category", "Choose what you want to add below."],
      ["2", "Fill the form", "A short, structured form on GitHub — no coding."],
      ["3", "It's tracked", "It becomes an issue credited to your GitHub account."]
    ].map(function (s) {
      return '<div class="cb-step"><span class="cb-step-n">' + s[0] + "</span>" +
        "<div><b>" + esc(s[1]) + "</b><span>" + esc(s[2]) + "</span></div></div>";
    }).join("");
    box.innerHTML =
      '<div class="cb-steps">' + steps + "</div>" +
      '<h3 class="cb-h">What are you adding?</h3>' +
      '<div class="cb-grid">' + cards + "</div>" +
      '<div class="cb-split">' +
        '<div class="cb-panel cb-pr">' +
          '<span class="cb-panel-ico" aria-hidden="true">' + icon("code") + "</span>" +
          "<h4>Comfortable with code?</h4>" +
          "<p>Every listing is one object in a <code>js/*.js</code> file — no build step. Open a pull request and add it directly.</p>" +
          '<a class="btn btn-grad" href="' + GH_REPO + '/blob/HEAD/CONTRIBUTING.md" target="_blank" rel="noopener">Read the contributor guide</a>' +
        "</div>" +
        '<div class="cb-panel cb-track">' +
          '<span class="cb-panel-ico" aria-hidden="true">' + icon("check") + "</span>" +
          "<h4>Every contribution is credited</h4>" +
          "<p>It all runs through GitHub, so each addition is attributed to you — by issue label and in the contributors graph.</p>" +
          '<div class="cb-track-links">' +
            '<a href="' + GH_REPO + '/issues?q=is%3Aissue+label%3Acontribution" target="_blank" rel="noopener">See contributions <span class="ext">&#8599;</span></a>' +
            '<a href="' + GH_REPO + '/graphs/contributors" target="_blank" rel="noopener">Contributors <span class="ext">&#8599;</span></a>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  // ---- DEADLINES (aggregated) ----------------------------------------
  var DL_MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function deadlineItems() {
    var out = [];
    // skip anything flagged defunct/cancelled/paused so dead opportunities never show as live deadlines
    SCH.forEach(function (s) { if (gone(s)) return; var info = dlInfo(s.deadline); if (info.date) out.push({ kind: "sch", name: s.name, url: s.url, deadline: s.deadline, info: info, meta: s.amountText || "" }); });
    PROG.forEach(function (p) { if (gone(p)) return; var info = dlInfo(p.deadline); if (info.date) out.push({ kind: "prog", name: p.name, url: p.url || searchLink(p.name + " program"), deadline: p.deadline, info: info, meta: p.ranking || "" }); });
    COMPS.forEach(function (c) { if (gone(c)) return; var info = dlInfo(c.deadline); if (info.date) out.push({ kind: "comp", name: c.name, url: c.url, deadline: c.deadline, info: info, meta: c.format || "" }); });
    out.sort(function (a, b) { return a.info.days - b.info.days || a.name.localeCompare(b.name); });
    return out;
  }
  function deadlinesFiltered() {
    var ts = terms(), k = state.deadlines.kind, w = state.deadlines.window;
    var max = w === "all" ? Infinity : +w;
    return deadlineItems().filter(function (it) {
      if (k !== "all" && it.kind !== k) return false;
      if (it.info.days > max) return false;
      if (ts.length && !hit([it.name, it.meta].join(" "), ts)) return false;
      return true;
    });
  }
  function deadlineRow(it, i) {
    var info = it.info;
    var dleft = info.days <= 0 ? "today" : info.days + "d left";
    var label = { sch: "Scholarship", prog: "Program", comp: "Competition" }[it.kind] || "";
    return '<div class="row" style="animation-delay:' + Math.min(i * 6, 180) + 'ms">' +
      '<div class="dl-date' + (info.soon ? " soon" : "") + '"><b>' + DL_MON[info.date.getMonth()] + " " + info.date.getDate() + "</b><span>" + dleft + "</span></div>" +
      logoTile(it.name, it.url) +
      '<a class="row-main" href="' + esc(it.url) + '" target="_blank" rel="noopener">' +
        '<div class="row-title">' + esc(it.name) + ' <span class="ext">&#8599;</span></div>' +
        '<div class="row-tags"><span class="tg tg-' + it.kind + '">' + label + "</span>" + (it.meta ? '<span class="tg">' + esc(it.meta) + "</span>" : "") + linkDownBadge(it.url) + "</div>" +
      "</a>" +
      '<span class="row-acts">' + starBtn(it.kind, it.name) + flagBtn(it.name, it.url) + "</span>" +
      '<div class="row-right">' + calCell(it.name, it.url, it.deadline) + "</div></div>";
  }
  function renderDeadlines() {
    var box = $("#deadlines-list"); if (!box) return 0;
    var list = deadlinesFiltered();
    box.innerHTML = list.length ? list.map(deadlineRow).join("")
      : '<p class="muted guides-empty">No deadlines match these filters.</p>';
    return list.length;
  }
  function deadlineExportItems() {
    return deadlinesFiltered().map(function (it) {
      return { type: it.kind === "sch" ? "Scholarship" : "Program", name: it.name, url: it.url, detail: it.meta, deadline: it.deadline };
    });
  }
  function wireDeadlines() {
    var kind = $("#dl-kind");
    if (kind) kind.addEventListener("click", function (e) {
      var b = e.target.closest(".seg"); if (!b) return;
      state.deadlines.kind = b.dataset.kind;
      kind.querySelectorAll(".seg").forEach(function (s) { s.classList.toggle("is-active", s === b); });
      render();
    });
    var win = $("#dl-window");
    if (win) win.addEventListener("change", function (e) { state.deadlines.window = e.target.value; render(); });
    var ics = $("#dl-ics");
    if (ics) ics.addEventListener("click", function () { download("stdnt-deadlines.ics", toICS(deadlineExportItems()), "text/calendar;charset=utf-8"); });
    var csv = $("#dl-csv");
    if (csv) csv.addEventListener("click", function () { download("stdnt-deadlines.csv", "﻿" + toCSV(deadlineExportItems()), "text/csv;charset=utf-8"); });
  }

  // ---- HERO (closing-soon strip + scholarship $ stat) ----------------
  function fmtMoney(n) {
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M+";
    if (n >= 1e3) return "$" + Math.round(n / 1e3) + "k+";
    return "$" + commas(n);
  }
  function countUp(el, target, money) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !window.requestAnimationFrame) { el.textContent = money ? fmtMoney(target) : commas(target); return; }
    var dur = 1100, start = 0;
    function tick(now) {
      if (!start) start = now;
      var t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3), v = Math.round(target * e);
      el.textContent = money ? fmtMoney(v) : commas(v);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function renderHeroStats() {
    var box = $("#hero-stats"); if (!box) return;
    var dollars = SCH.reduce(function (a, s) { return a + ((s.amount > 0 && s.amount < FULL) ? s.amount : 0); }, 0);
    var cards = [
      { icon: ICO_MONEY, target: dollars, money: true, label: "in scholarships", cls: " money" },
      { icon: ICO_TROPHY, target: SCH.length, label: "scholarships", cls: "" },
      { icon: ICO_CAP, target: PROG.length, label: "STEM programs", cls: "" },
      { icon: ICO_CLOCK, target: deadlineItems().length, label: "live deadlines", cls: "" }
    ];
    box.innerHTML = cards.map(function (c, i) {
      return '<div class="hstat' + c.cls + '" style="animation-delay:' + (i * 80) + 'ms">' +
        '<span class="hstat-ico" aria-hidden="true">' + c.icon + "</span>" +
        '<b class="hstat-n">' + (c.money ? "$0" : "0") + "</b>" +
        '<span class="hstat-l">' + c.label + "</span></div>";
    }).join("");
    box.hidden = false;
    var nums = box.querySelectorAll(".hstat-n");
    cards.forEach(function (c, i) { if (nums[i]) countUp(nums[i], c.target, !!c.money); });
  }
  var INSTITUTIONS = [
    { name: "MIT", domain: "mit.edu" }, { name: "Stanford", domain: "stanford.edu" }, { name: "Harvard", domain: "harvard.edu" },
    { name: "Caltech", domain: "caltech.edu" }, { name: "Princeton", domain: "princeton.edu" }, { name: "Yale", domain: "yale.edu" },
    { name: "Columbia", domain: "columbia.edu" }, { name: "UC Berkeley", domain: "berkeley.edu" }, { name: "Cornell", domain: "cornell.edu" },
    { name: "Johns Hopkins", domain: "jhu.edu" }, { name: "Carnegie Mellon", domain: "cmu.edu" }, { name: "Stony Brook", domain: "stonybrook.edu" },
    { name: "NASA", domain: "nasa.gov" }, { name: "NSF", domain: "nsf.gov" }, { name: "Cold Spring Harbor", domain: "cshl.edu" },
    { name: "Brookhaven Lab", domain: "bnl.gov" }, { name: "Society for Science", domain: "societyforscience.org" }, { name: "Regeneron", domain: "regeneron.com" },
    { name: "Davidson", domain: "davidsongifted.org" }, { name: "Coca-Cola", domain: "coca-cola.com" }, { name: "Gates Foundation", domain: "gatesfoundation.org" },
    { name: "QuestBridge", domain: "questbridge.org" }, { name: "Posse Foundation", domain: "possefoundation.org" }, { name: "Google", domain: "google.com" }, { name: "Microsoft", domain: "microsoft.com" }
  ];
  function renderLogos() {
    var t = $("#logos-track"); if (!t) return;
    var html = INSTITUTIONS.map(function (o) {
      return '<a class="logo-tile" href="https://' + o.domain + '" target="_blank" rel="noopener">' +
        '<img src="https://www.google.com/s2/favicons?domain=' + o.domain + '&sz=64" alt="" loading="lazy" width="20" height="20" />' +
        "<span>" + esc(o.name) + "</span></a>";
    }).join("");
    t.innerHTML = html + html;   // duplicate for a seamless marquee loop
    t.querySelectorAll("img").forEach(function (img) { img.addEventListener("error", function () { img.style.display = "none"; }); });
  }
  function renderHero() {
    if (quizAnswered()) {
      var sm = 0, pm = 0;
      SCH.forEach(function (s) { if (schScore(s) >= 3) sm++; });
      PROG.forEach(function (p) { if (progScore(p) >= 3) pm++; });
      var ann = document.querySelector(".announce");
      if (ann && (sm + pm) > 0) ann.innerHTML = '<span class="announce-tag">&#10022; For you</span> ' + (sm + pm) + ' scholarships &amp; programs match your profile <span aria-hidden="true">&rarr;</span>';
    }
    var box = $("#hero-soon"); if (!box) return;
    var all = deadlineItems().filter(function (it) { return it.info.days >= 0; });
    if (!all.length) { box.hidden = true; return; }
    var chips = all.slice(0, 4).map(function (it) {
      return '<a class="soon-chip" href="' + esc(it.url) + '" target="_blank" rel="noopener"><b>' + DL_MON[it.info.date.getMonth()] + " " + it.info.date.getDate() + "</b> " + esc(it.name) + "</a>";
    }).join("");
    box.innerHTML = '<span class="soon-label">' + ICO_CLOCK + ' Closing soon</span>' + chips + '<a class="soon-all" href="#deadlines">See all ' + all.length + " &rarr;</a>";
    box.hidden = false;
  }

  // ---- SEO (structured data, JS-rendered) ----------------------------
  function injectStructuredData() {
    try {
      var origin = location.origin + location.pathname;
      function itemList(name, arr, urlFn) {
        return {
          "@context": "https://schema.org", "@type": "ItemList", "name": name, "numberOfItems": arr.length,
          "itemListElement": arr.slice(0, 100).map(function (x, i) { return { "@type": "ListItem", "position": i + 1, "name": x.name, "url": urlFn(x) }; })
        };
      }
      var blocks = [
        { "@context": "https://schema.org", "@type": "WebSite", "name": "stdnt.xyz", "url": origin, "description": "Every free thing you can get as a student - tools, free API keys, perks, scholarships, STEM programs and competitions, in one searchable place." },
        { "@context": "https://schema.org", "@type": "EducationalOrganization", "name": "stdnt.xyz", "url": origin, "description": "A free, open-source directory of student resources: tools, scholarships, STEM programs, competitions and guides." },
        itemList("Scholarships for students", SCH, function (s) { return s.url; }),
        itemList("STEM programs for students", PROG, function (p) { return p.url || searchLink(p.name); })
      ];
      blocks.forEach(function (b) {
        var el = document.createElement("script");
        el.type = "application/ld+json";
        el.textContent = JSON.stringify(b);
        document.head.appendChild(el);
      });
      if (!document.querySelector("link[rel=canonical]")) {
        var can = document.createElement("link"); can.rel = "canonical"; can.href = origin; document.head.appendChild(can);
      }
    } catch (e) {}
  }

  // ---- theme ---------------------------------------------------------
  function initTheme() {
    var sv = localStorage.getItem("edu-theme");
    var light = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.setAttribute("data-theme", sv || (light ? "light" : "dark"));
    $("#theme-toggle").addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("edu-theme", next);
    });
  }

  // ---- view counter (Abacus, graceful) -------------------------------
  function initViews() {
    fetch("https://abacus.jasoncameron.dev/hit/edu-edu/home")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && typeof d.value === "number") {
          $("#views-count").textContent = commas(d.value);
          $("#views").hidden = false;
        }
      })
      .catch(function () {});
  }

  // ---- go ------------------------------------------------------------
  $("#n-tools").textContent = RES.length;
  $("#n-sch").textContent = SCH.length;
  $("#n-prog").textContent = PROG.length;
  $("#n-saved").textContent = saved.size;
  $("#n-guides").textContent = GUIDES.length;
  $("#n-templates").textContent = TEMPLATES.length;
  $("#n-deadlines").textContent = deadlineItems().length;
  $("#n-discounts").textContent = DISCOUNTS.length;
  $("#n-competitions").textContent = COMPS.length;
  $("#n-hackathons").textContent = HACKATHONS.length;
  var nrm = $("#n-roadmaps"); if (nrm) nrm.textContent = ROADMAPS.length;
  fillStats();
  var deepLink = applyHash();
  var subBtn = $("#submit-resource");
  if (subBtn) subBtn.href = "https://github.com/2008wbbv/edu.edu/issues/new?title=" +
    encodeURIComponent("Add a resource: ") + "&body=" +
    encodeURIComponent("**Name:**\n**Link:**\n**Category:** (tool / scholarship / program)\n**Who it's for:** (student / everyone)\n**One-sentence description:**\n**Anything else:**\n");
  initTheme();
  buildCollage();
  buildCatChips();
  buildSchChips();
  buildProgChips();
  buildQuiz();
  renderSponsors();
  renderGuides();
  renderTemplates();
  renderDeadlines();
  renderDiscounts();
  renderCompetitions();
  renderHackathons();
  loadHackathons();
  loadLinkStatus();
  renderHero();
  renderHeroStats();
  renderLogos();
  wire();
  wireGuideOverlay();
  wireTemplates();
  wireDeadlines();
  wireNewsletter();
  wireMediaKit();
  wireMore();
  injectStructuredData();
  initViews();
  window.addEventListener("hashchange", function () { routeHash(); });
  if (deepLink) switchTab("foryou");
  else if (!routeHash()) render();
})();
