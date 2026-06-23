/*
 * app.js — renders and filters the resource catalog.
 * Reads window.RESOURCES and window.CATEGORIES from data.js.
 */
(function () {
  "use strict";

  const RESOURCES = window.RESOURCES || [];
  const CATEGORIES = window.CATEGORIES || [];
  const CAT_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

  // ---- DOM handles -------------------------------------------------------
  const grid = document.getElementById("card-grid");
  const meta = document.getElementById("results-meta");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search");
  const categoryRow = document.getElementById("category-row");
  const accessChips = Array.from(document.querySelectorAll(".access-chip"));
  const themeToggle = document.getElementById("theme-toggle");
  const clearBtn = document.getElementById("clear-filters");

  // ---- state -------------------------------------------------------------
  const state = { query: "", access: "all", category: "all" };

  // ---- helpers -----------------------------------------------------------
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function sortResources(list) {
    // Featured first, then alphabetical.
    return list.slice().sort((a, b) => {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      return a.name.localeCompare(b.name);
    });
  }

  function matchesQuery(r, q) {
    if (!q) return true;
    const cat = CAT_BY_ID[r.category];
    const hay = [
      r.name, r.desc, r.value, cat && cat.name, (r.tags || []).join(" ")
    ].filter(Boolean).join(" ").toLowerCase();
    // every whitespace-separated term must appear somewhere
    return q.toLowerCase().split(/\s+/).every((term) => hay.includes(term));
  }

  function filtered() {
    return RESOURCES.filter((r) =>
      (state.access === "all" || r.access === state.access) &&
      (state.category === "all" || r.category === state.category) &&
      matchesQuery(r, state.query)
    );
  }

  // ---- rendering ---------------------------------------------------------
  function cardHTML(r, i) {
    const cat = CAT_BY_ID[r.category] || { name: r.category, icon: "🔗" };
    const badgeClass = r.access === "student" ? "badge-student" : "badge-everyone";
    const badgeText = r.access === "student" ? "Student" : "Everyone";
    return `
      <a class="card" href="${esc(r.url)}" target="_blank" rel="noopener"
         style="animation-delay:${Math.min(i * 28, 320)}ms"
         aria-label="${esc(r.name)} — opens in a new tab">
        <div class="card-top">
          <span class="card-icon" aria-hidden="true">${esc(r.icon || "🔗")}</span>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
        <h3 class="card-name">
          ${esc(r.name)}
          ${r.featured ? '<span class="card-star" title="Editor favorite" aria-hidden="true">⭐</span>' : ""}
        </h3>
        ${r.value ? `<span class="card-value">${esc(r.value)}</span>` : ""}
        <p class="card-desc">${esc(r.desc)}</p>
        <div class="card-foot">
          <span class="card-cat">${esc(cat.icon)} ${esc(cat.name)}</span>
          <span class="card-cta">Get it <span aria-hidden="true">→</span></span>
        </div>
      </a>`;
  }

  function render() {
    const list = sortResources(filtered());

    grid.innerHTML = list.map(cardHTML).join("");
    emptyState.hidden = list.length !== 0;

    const total = RESOURCES.length;
    if (list.length === total) {
      meta.textContent = `Showing all ${total} resources`;
    } else {
      meta.textContent = `Showing ${list.length} of ${total} resources`;
    }

    // keep category chip counts in sync with the active access filter
    updateCategoryCounts();
  }

  function countFor(catId) {
    return RESOURCES.filter((r) =>
      r.category === catId && (state.access === "all" || r.access === state.access)
    ).length;
  }

  function updateCategoryCounts() {
    categoryRow.querySelectorAll(".cat-chip[data-cat]").forEach((chip) => {
      const id = chip.dataset.cat;
      if (id === "all") return;
      const countEl = chip.querySelector(".cat-count");
      if (countEl) countEl.textContent = countFor(id);
    });
  }

  // ---- build category chips ---------------------------------------------
  function buildCategoryChips() {
    const allChip =
      `<button class="cat-chip is-active" data-cat="all" type="button">All categories</button>`;
    const chips = CATEGORIES.map((c) =>
      `<button class="cat-chip" data-cat="${c.id}" type="button" title="${esc(c.blurb)}">
         <span aria-hidden="true">${esc(c.icon)}</span> ${esc(c.name)}
         <span class="cat-count">${countFor(c.id)}</span>
       </button>`
    ).join("");
    categoryRow.innerHTML = allChip + chips;

    categoryRow.addEventListener("click", (e) => {
      const chip = e.target.closest(".cat-chip");
      if (!chip) return;
      state.category = chip.dataset.cat;
      categoryRow.querySelectorAll(".cat-chip").forEach((c) =>
        c.classList.toggle("is-active", c === chip));
      render();
    });
  }

  // ---- wire up controls --------------------------------------------------
  function wireControls() {
    let t;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(t);
      const v = e.target.value;
      t = setTimeout(() => { state.query = v.trim(); render(); }, 120);
    });

    accessChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        state.access = chip.dataset.access;
        accessChips.forEach((c) => c.classList.toggle("is-active", c === chip));
        render();
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", resetFilters);
    }

    // "/" focuses search, Escape clears it
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      } else if (e.key === "Escape" && document.activeElement === searchInput) {
        searchInput.value = "";
        state.query = "";
        render();
        searchInput.blur();
      }
    });
  }

  function resetFilters() {
    state.query = "";
    state.access = "all";
    state.category = "all";
    searchInput.value = "";
    accessChips.forEach((c) => c.classList.toggle("is-active", c.dataset.access === "all"));
    categoryRow.querySelectorAll(".cat-chip").forEach((c) =>
      c.classList.toggle("is-active", c.dataset.cat === "all"));
    render();
  }

  // ---- theme -------------------------------------------------------------
  function initTheme() {
    const saved = localStorage.getItem("edu-theme");
    const prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = saved || (prefersLight ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);

    themeToggle.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("edu-theme", next);
    });
  }

  // ---- hero stats --------------------------------------------------------
  function initStats() {
    const total = document.getElementById("stat-total");
    const cats = document.getElementById("stat-cats");
    if (total) countUp(total, RESOURCES.length);
    if (cats) countUp(cats, CATEGORIES.length);
  }

  function countUp(el, target) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = target;
      return;
    }
    const dur = 700;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(p * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---- go ----------------------------------------------------------------
  initTheme();
  buildCategoryChips();
  wireControls();
  initStats();
  render();
})();
