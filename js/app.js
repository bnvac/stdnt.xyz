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
      '<span class="row-due">' + esc(s.deadline || "Varies") + "</span></div></div>";
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
    var subs = (p.subjects || []).slice(0, 3).map(function (s) { return '<span class="tg">' + esc(s) + "</span>"; }).join("");
    var sub = esc(p.details || (p.subjects || []).join(", ")) + (p.when ? ' <span class="find">&middot; ' + esc(p.when) + "</span>" : "");
    var cost = shortCost(p);
    return '<div class="row" style="animation-delay:' + Math.min(i * 6, 180) + 'ms">' + rank +
      '<a class="row-main" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      '<div class="row-title">' + esc(p.name) + (p.flagship ? ' <span class="card-star">&#9733;</span>' : "") + ' <span class="ext">&#8599;</span></div>' +
      '<div class="row-sub">' + sub + "</div>" +
      '<div class="row-tags">' + grades + subs + "</div></a>" +
      starBtn("prog", p.name) +
      '<div class="row-right"><span class="row-amt' + (cost.full ? " full" : "") + '">' + esc(cost.t) + "</span>" +
      '<span class="row-due">' + esc(p.deadline || "") + "</span></div></div>";
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
    var html = "";
    if (st.length) html += '<h3 class="saved-h">Tools &amp; Perks <span>' + st.length + "</span></h3><div class=\"grid\">" + st.map(toolCard).join("") + "</div>";
    if (ss.length) html += '<h3 class="saved-h">Scholarships <span>' + ss.length + "</span></h3><div class=\"list\">" + ss.map(schRow).join("") + "</div>";
    if (sp.length) html += '<h3 class="saved-h">STEM Programs <span>' + sp.length + "</span></h3><div class=\"list\">" + sp.map(progRow).join("") + "</div>";
    var total = st.length + ss.length + sp.length;
    body.innerHTML = html || '<div class="saved-empty"><p>No saved items match that search.</p></div>';
    meta.textContent = total === saved.size ? ("You have " + saved.size + " saved item" + (saved.size === 1 ? "" : "s")) : ("Showing " + total + " of " + saved.size + " saved");
    empty.hidden = true;
    return total;
  }

  // ---- shared --------------------------------------------------------
  function activate(box, btn) {
    box.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-active", c === btn); });
  }
  function render() {
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
    ["tools", "sch", "prog", "saved"].forEach(function (t) { $("#panel-" + t).hidden = t !== tab; });
    search.placeholder = tab === "tools" ? "Search tools, APIs, perks..." :
      tab === "sch" ? "Search scholarships..." :
      tab === "prog" ? "Search programs, subjects..." : "Search your saved list...";
    render();
  }

  function wire() {
    document.querySelectorAll(".tab").forEach(function (t) {
      t.addEventListener("click", function () { switchTab(t.dataset.tab); });
    });
    $("#tools-access").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.tools.access = b.dataset.access; activate($("#tools-access"), b); render();
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
      render();
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

  // ---- marquee -------------------------------------------------------
  function buildMarquee() {
    var slugs = []; var seen = {};
    RES.forEach(function (r) { if (r.slug && !seen[r.slug]) { seen[r.slug] = 1; slugs.push(r.slug); } });
    var half = Math.ceil(slugs.length / 2);
    function tiles(arr) {
      return arr.map(function (s) {
        return '<span class="logo-tile"><span class="ic" style="--src:url(\'' + ICON_CDN + s + '\')"></span></span>';
      }).join("");
    }
    var a = tiles(slugs.slice(0, half)), b = tiles(slugs.slice(half));
    $("#mq1").innerHTML = a + a;
    $("#mq2").innerHTML = b + b;
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
  initTheme();
  buildMarquee();
  buildCatChips();
  buildSchChips();
  buildProgChips();
  wire();
  initViews();
  render();
})();
