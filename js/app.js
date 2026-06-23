/*
 * app.js — renders the three tabs (Tools, Scholarships, Programs),
 * handles search/filter/sort, the view counter and theme.
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
  var RANK = { "S++": 0, "S+": 1, "S": 2, "S-": 3, "A+": 4, "A": 5, "A-": 6, "B+": 7, "B": 8, "B-": 9, "C+": 10, "C": 11, "C-": 12 };
  var MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
  var SCH_GROUPS = [
    { id: "all", label: "All" }, { id: "big", label: "Big money" },
    { id: "creative", label: "Creative" }, { id: "essay", label: "Essay" },
    { id: "general", label: "General" }, { id: "noessay", label: "No-essay" }
  ];

  // ---- dom -----------------------------------------------------------
  var $ = function (id) { return document.getElementById(id); };
  var search = $("search");
  var meta = $("meta");
  var empty = $("empty");

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
    if (!s || /varies|monthly|quarterly|rolling|—|state|announce|tbd|check|nomination|opens|\?/.test(s)) {
      var mm = s.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/);
      return mm ? MONTHS[mm[1]] * 100 : 9999;
    }
    var m = s.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{1,2})?/);
    return m ? MONTHS[m[1]] * 100 + (m[2] ? +m[2] : 0) : 9999;
  }
  function monoFrom(name) {
    var w = String(name).replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
    return w.length ? w[0][0].toUpperCase() : "?";
  }
  function iconHTML(item) {
    if (item.slug) return '<span class="ic-wrap"><span class="ic" style="--src:url(\'' + ICON_CDN + esc(item.slug) + '\')"></span></span>';
    return '<span class="ic-wrap"><span class="ic-mono">' + esc(item.mono || monoFrom(item.name)) + "</span></span>";
  }
  function searchLink(name) { return "https://www.google.com/search?q=" + encodeURIComponent(name); }

  // ---- TOOLS ---------------------------------------------------------
  function buildCatChips() {
    var box = $("tools-cats");
    box.innerHTML = '<button class="chip is-active" data-cat="all" type="button">All</button>' +
      CATS.map(function (c) {
        return '<button class="chip" data-cat="' + c.id + '" type="button" title="' + esc(c.blurb) + '">' +
          esc(c.name) + ' <span class="c-n" data-cn="' + c.id + '"></span></button>';
      }).join("");
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.tools.cat = b.dataset.cat;
      activate(box, b); render();
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
      Math.min(i * 18, 260) + 'ms">' +
      '<div class="card-top">' + iconHTML(r) +
      '<span class="card-name">' + esc(r.name) + (r.featured ? ' <span class="card-star">★</span>' : "") + "</span>" +
      '<span class="card-meta">' + badge + "</span></div>" +
      (r.value ? '<span class="card-value">' + esc(r.value) + "</span>" : "") +
      '<p class="card-desc">' + esc(r.desc) + "</p>" +
      '<div class="card-foot"><span class="card-cat">' + esc(c.name) + "</span>" +
      '<span class="card-cta">Get it →</span></div></a>';
  }
  function renderTools() {
    var list = toolsFiltered();
    $("tools-grid").innerHTML = list.map(toolCard).join("");
    CATS.forEach(function (c) { var el = document.querySelector('[data-cn="' + c.id + '"]'); if (el) el.textContent = catCount(c.id); });
    return list.length;
  }

  // ---- SCHOLARSHIPS --------------------------------------------------
  function buildSchChips() {
    var box = $("sch-groups");
    box.innerHTML = SCH_GROUPS.map(function (g) {
      var n = g.id === "all" ? SCH.length : SCH.filter(function (s) { return s.group === g.id; }).length;
      return '<button class="chip' + (g.id === "all" ? " is-active" : "") + '" data-group="' + g.id +
        '" type="button">' + esc(g.label) + ' <span class="c-n">' + n + "</span></button>";
    }).join("");
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.sch.group = b.dataset.group; activate(box, b); render();
    });
    $("sch-sort").addEventListener("change", function (e) { state.sch.sort = e.target.value; render(); });
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
      return b.amount - a.amount || a.name.localeCompare(b.name); // amount
    });
    return list;
  }
  function schRow(s, i) {
    var amtFull = s.amount >= FULL || /full/i.test(s.amountText || "");
    var tags = (s.tags || []).map(function (t) { return '<span class="tg">' + esc(t) + "</span>"; }).join("");
    var sub = esc(s.level || "") + (s.note ? ' · ' + esc(s.note) : "") + (s.find ? ' <span class="find">· search</span>' : "");
    return '<a class="row" href="' + esc(s.url) + '" target="_blank" rel="noopener" style="animation-delay:' +
      Math.min(i * 10, 200) + 'ms">' +
      '<div class="row-main"><div class="row-title">' + esc(s.name) + ' <span class="ext">↗</span></div>' +
      '<div class="row-sub">' + sub + "</div>" +
      (tags ? '<div class="row-tags">' + tags + "</div>" : "") + "</div>" +
      '<div class="row-right"><span class="row-amt' + (amtFull ? " full" : "") + '">' + esc(s.amountText || "—") + "</span>" +
      '<span class="row-due">' + esc(s.deadline || "—") + "</span></div></a>";
  }
  function renderSch() {
    var list = schFiltered();
    $("sch-list").innerHTML = list.map(schRow).join("");
    return list.length;
  }

  // ---- PROGRAMS ------------------------------------------------------
  function buildProgChips() {
    var box = $("prog-grades");
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.prog.grade = b.dataset.grade; activate(box, b); render();
    });
    $("prog-free").addEventListener("change", function (e) { state.prog.free = e.target.checked; render(); });
    $("prog-sort").addEventListener("change", function (e) { state.prog.sort = e.target.value; render(); });
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
      var ra = a.ranking in RANK ? RANK[a.ranking] : 50, rb = b.ranking in RANK ? RANK[b.ranking] : 50; // rank
      return ra - rb || dlSort(a.deadline) - dlSort(b.deadline);
    });
    return list;
  }
  function shortCost(p) {
    if (p.free || /free|fully funded/i.test(p.cost)) return { t: "Free", full: true };
    var m = String(p.cost).match(/[$£][\d,]+/);
    if (m) return { t: m[0], full: false };
    return { t: p.cost ? p.cost.split("(")[0].trim().slice(0, 14) : "—", full: false };
  }
  function progRow(p, i) {
    var url = p.url || searchLink(p.name + " program");
    var rank = p.ranking ? '<span class="rank' + (/^S/.test(p.ranking) ? " s" : "") + '">' + esc(p.ranking) + "</span>" : "";
    var grades = (p.grades || []).map(function (g) { return '<span class="tg tg-grade">' + esc(g) + "</span>"; }).join("");
    var subs = (p.subjects || []).slice(0, 3).map(function (s) { return '<span class="tg">' + esc(s) + "</span>"; }).join("");
    var sub = esc(p.details || (p.subjects || []).join(", ")) +
      (p.when ? ' <span class="find">· ' + esc(p.when) + "</span>" : "");
    var cost = shortCost(p);
    return '<a class="row" href="' + esc(url) + '" target="_blank" rel="noopener" style="animation-delay:' +
      Math.min(i * 8, 200) + 'ms">' + rank +
      '<div class="row-main"><div class="row-title">' + esc(p.name) +
      (p.flagship ? ' <span class="card-star">★</span>' : "") + ' <span class="ext">↗</span></div>' +
      '<div class="row-sub">' + sub + "</div>" +
      '<div class="row-tags">' + grades + subs + "</div></div>" +
      '<div class="row-right"><span class="row-amt' + (cost.full ? " full" : "") + '">' + esc(cost.t) + "</span>" +
      '<span class="row-due">' + esc(p.deadline || "—") + "</span></div></a>";
  }
  function renderProg() {
    var list = progFiltered();
    $("prog-list").innerHTML = list.map(progRow).join("");
    return list.length;
  }

  // ---- shared --------------------------------------------------------
  function activate(box, btn) {
    box.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-active", c === btn); });
  }
  function render() {
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
    $("panel-tools").hidden = tab !== "tools";
    $("panel-sch").hidden = tab !== "sch";
    $("panel-prog").hidden = tab !== "prog";
    search.placeholder = tab === "tools" ? "Search tools, APIs, perks…" :
      tab === "sch" ? "Search scholarships…" : "Search programs, subjects…";
    render();
  }

  function wire() {
    document.querySelectorAll(".tab").forEach(function (t) {
      t.addEventListener("click", function () { switchTab(t.dataset.tab); });
    });
    $("tools-access").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.tools.access = b.dataset.access; activate($("tools-access"), b); render();
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
    $("clear").addEventListener("click", function () {
      state.q = ""; search.value = "";
      state.tools = { access: "all", cat: "all" };
      state.sch = { group: "all", sort: state.sch.sort };
      state.prog = { grade: "all", free: false, sort: state.prog.sort };
      $("prog-free").checked = false;
      document.querySelectorAll(".chips").forEach(function (box) {
        box.querySelectorAll(".chip").forEach(function (c, i) { c.classList.toggle("is-active", i === 0); });
      });
      render();
    });
  }

  // ---- theme ---------------------------------------------------------
  function initTheme() {
    var saved = localStorage.getItem("edu-theme");
    var light = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.setAttribute("data-theme", saved || (light ? "light" : "dark"));
    $("theme-toggle").addEventListener("click", function () {
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
          $("views-count").textContent = commas(d.value);
          $("views").hidden = false;
        }
      })
      .catch(function () { /* counter unavailable — stay hidden */ });
  }

  // ---- go ------------------------------------------------------------
  $("n-tools").textContent = RES.length;
  $("n-sch").textContent = SCH.length;
  $("n-prog").textContent = PROG.length;
  initTheme();
  buildCatChips();
  buildSchChips();
  buildProgChips();
  wire();
  initViews();
  render();
})();
