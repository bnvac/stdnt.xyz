/*
 * lib/data.mjs - shared helpers for the build scripts: load the site's plain
 * data files (which assign to window.*) and parse deadlines the same way the
 * app does (js/app.js dlInfo), so generated pages and calendars always agree
 * with what the site shows.
 */
import { readFileSync } from "node:fs";
import vm from "node:vm";

export const SITE = "https://stdnt.xyz";   // live origin used in canonical URLs, sitemaps and feeds

const DATA_FILES = ["js/shared.js", "js/data.js", "js/scholarships.js", "js/programs.js", "js/programs-extra.js",
  "js/competitions.js", "js/discounts.js", "js/finaid.js", "js/guides.js", "js/templates.js", "js/hackathons.js"];

export function loadData(files = DATA_FILES) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const f of files) vm.runInContext(readFileSync(f, "utf8"), sandbox, { filename: f });
  return sandbox.window;
}

// same wording checks as statusOf()/gone() in app.js
export function gone(item) {
  const t = [item.deadline, item.note, item.details, item.amountText, item.when, item.cost].filter(Boolean).join(" ").toLowerCase();
  return /defund|discontinu|no longer|shut down|shutter|defunct|cancel|paused|on hold|hiatus|suspend/.test(t);
}

const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
export const ROLLING = /rolling|monthly|quarterly|varies|dependent|psat|open|tbd|announce|check|nomination|^-$/;

// every date named in a deadline string, each rolled to its next occurrence.
// { date, exact } where exact=false means only a month was given.
export function deadlineDates(deadline, today = new Date()) {
  const s = String(deadline || "").trim().toLowerCase();
  if (!s || ROLLING.test(s)) return [];
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const out = [], re = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{1,2})?/g;
  let m;
  while ((m = re.exec(s))) {
    const exact = !!m[2], day = exact ? +m[2] : 1;
    let d = new Date(t0.getFullYear(), MONTHS[m[1]] - 1, day);
    if (d < t0) d = new Date(t0.getFullYear() + 1, MONTHS[m[1]] - 1, day);
    out.push({ date: d, exact });
  }
  return out;
}

export const slugify = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 80);
export const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const domainOf = (u) => { try { return /^https?:\/\//.test(u) ? new URL(u).hostname.replace(/^www\./, "") : ""; } catch { return ""; } };
