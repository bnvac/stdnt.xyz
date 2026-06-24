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
  var FULL = window.SCH_FULL || 1000000;
  var CAT = {}; CATS.forEach(function (c) { CAT[c.id] = c; });

  var ICON_CDN = "https://cdn.simpleicons.org/";
  var STAR = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 18.9 6.2 21l1.1-6.45L2.6 9.95l6.5-.95z"/></svg>';
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
  var state = {
    tab: "tools", q: "",
    tools: { access: "all", cat: "all" },
    sch: { group: "all", sort: "amount" },
    prog: { grade: "all", free: false, sort: "rank" }
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
    return '<span class="ic-wrap"><span class="ic-mono">' + esc(item.mono || monoFrom(item.name)) + "</span></span>";
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
    return '<a class="card" href="' + esc(r.url) + '" target="_blank" rel="noopener" style="animation-delay:' +
      Math.min(i * 16, 240) + 'ms">' +
      '<div class="card-top">' + iconHTML(r) +
      '<span class="card-name">' + esc(r.name) + (r.featured ? ' <span class="card-star">&#9733;</span>' : "") + "</span>" +
      '<span class="card-meta">' + badge + starBtn("tool", r.name) + "</span></div>" +
      (r.value ? '<span class="card-value">' + esc(r.value) + "</span>" : "") +
      '<p class="card-desc">' + esc(r.desc) + "</p>" +
      '<div class="card-foot"><span class="card-cat">' + esc(c.name) + "</span>" +
      '<span class="card-cta">Get it &rarr;</span></div></a>';
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
  }
  function schFiltered() {
    var ts = terms();
    var list = SCH.filter(function (s) {
      if (state.sch.group !== "all" && s.group !== state.sch.group) return false;
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
    return '<div class="row" style="animation-delay:' + Math.min(i * 8, 180) + 'ms">' +
      '<a class="row-main" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
      '<div class="row-title">' + esc(s.name) + ' <span class="ext">&#8599;</span></div>' +
      '<div class="row-sub">' + sub + "</div>" +
      (tags ? '<div class="row-tags">' + tags + "</div>" : "") + "</a>" +
      starBtn("sch", s.name) +
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
  }
  function progFiltered() {
    var ts = terms();
    var list = PROG.filter(function (p) {
      if (state.prog.free && !p.free) return false;
      if (state.prog.grade !== "all" && (p.grades || []).indexOf(state.prog.grade) < 0) return false;
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
    var stateTag = si.restricted ? '<span class="tg tg-state">&#128205; ' + esc(si.states.slice(0, 2).join("/")) + " only</span>"
      : (si.located ? '<span class="tg tg-loc">&#128205; ' + esc(si.states.slice(0, 2).join("/")) + "</span>" : "");
    var subs = (p.subjects || []).slice(0, 3).map(function (s) { return '<span class="tg">' + esc(s) + "</span>"; }).join("");
    var sub = esc(p.details || (p.subjects || []).join(", ")) + (p.when ? ' <span class="find">&middot; ' + esc(p.when) + "</span>" : "");
    var cost = shortCost(p);
    return '<div class="row" style="animation-delay:' + Math.min(i * 6, 180) + 'ms">' + rank +
      '<a class="row-main" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      '<div class="row-title">' + esc(p.name) + (p.flagship ? ' <span class="card-star">&#9733;</span>' : "") + ' <span class="ext">&#8599;</span></div>' +
      '<div class="row-sub">' + sub + "</div>" +
      '<div class="row-tags">' + stateTag + grades + subs + "</div></a>" +
      starBtn("prog", p.name) +
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
    var st = f(RES.filter(function (r) { return saved.has(sid("tool", r.name)); }), function (r) { return [r.name, r.desc, (r.tags || []).join(" ")].join(" "); });
    var ss = f(SCH.filter(function (s) { return saved.has(sid("sch", s.name)); }), function (s) { return [s.name, s.level, s.note].join(" "); });
    var sp = f(PROG.filter(function (p) { return saved.has(sid("prog", p.name)); }), function (p) { return [p.name, p.details, (p.subjects || []).join(" ")].join(" "); });
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
    if (st.length) html += '<h3 class="saved-h">Tools &amp; Perks <span>' + st.length + "</span></h3><div class=\"grid\">" + st.map(toolCard).join("") + "</div>";
    if (ss.length) html += '<h3 class="saved-h">Scholarships <span>' + ss.length + "</span></h3><div class=\"list\">" + ss.map(schRow).join("") + "</div>";
    if (sp.length) html += '<h3 class="saved-h">STEM Programs <span>' + sp.length + "</span></h3><div class=\"list\">" + sp.map(progRow).join("") + "</div>";
    var total = st.length + ss.length + sp.length;
    body.innerHTML = toolbar + (html || '<p class="muted" style="padding:1rem 0">No saved items match that search.</p>');
    meta.textContent = total === saved.size ? ("You have " + saved.size + " saved item" + (saved.size === 1 ? "" : "s")) : ("Showing " + total + " of " + saved.size + " saved");
    empty.hidden = true;
    return total;
  }
  function savedItems() {
    var out = [];
    RES.forEach(function (r) { if (saved.has(sid("tool", r.name))) out.push({ type: "Tool", name: r.name, url: r.url, detail: (CAT[r.category] || {}).name || "", deadline: "" }); });
    SCH.forEach(function (s) { if (saved.has(sid("sch", s.name))) out.push({ type: "Scholarship", name: s.name, url: s.url, detail: s.amountText || "", deadline: s.deadline || "" }); });
    PROG.forEach(function (p) { if (saved.has(sid("prog", p.name))) out.push({ type: "Program", name: p.name, url: p.url || "", detail: (p.subjects || []).join("; "), deadline: p.deadline || "" }); });
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
  function schScore(s) {
    var q = quiz, t = lc(s.tags), note = (s.note || "").toLowerCase(), name = s.name.toLowerCase(), sc = 0;
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
    var html = '<h3 class="quiz-rh">Scholarships for you <span>' + schM.length + "</span></h3>";
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
    ["tools", "sch", "prog", "foryou", "saved", "about"].forEach(function (t) { $("#panel-" + t).hidden = t !== tab; });
    search.placeholder = tab === "tools" ? "Search tools, APIs, perks..." :
      tab === "sch" ? "Search scholarships..." :
      tab === "prog" ? "Search programs, subjects..." :
      tab === "saved" ? "Search your saved list..." : "Search...";
    render();
  }

  function wire() {
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
      renderQuiz();
    });
    if (qf) qf.addEventListener("change", function (e) {
      var sel = e.target.closest(".qselect"); if (!sel) return;
      quiz[sel.dataset.q] = sel.value; saveQuiz(); renderQuiz();
    });
    var qr = $("#quiz-reset");
    if (qr) qr.addEventListener("click", function () { quiz = {}; saveQuiz(); buildQuiz(); renderQuiz(); });
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
     ["#ab-tools", RES.length], ["#ab-sch", SCH.length], ["#ab-prog", PROG.length]].forEach(function (p) {
      var el = $(p[0]); if (el) el.textContent = commas(p[1]);
    });
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
  wire();
  initViews();
  if (deepLink) switchTab("foryou"); else render();
})();
