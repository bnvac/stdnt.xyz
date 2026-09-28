#!/usr/bin/env node
/*
 * check-data.mjs - catches data mistakes before they reach the site: missing
 * fields, broken URLs, duplicate listings, unknown categories, deadlines the
 * app can't read, bad `added` dates (they drive the New tab), mismatched ?v=
 * cache numbers and em/en dashes (house style is plain hyphens).
 *
 *   npm run check          (also runs first in `npm test` and in CI)
 *
 * Errors fail the check (exit 1); warnings are printed but pass.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { loadData, deadlineDates, gone, ROLLING, REPO, SITE_DIR } from "./lib/data.mjs";

const W = loadData();
const errors = [], warnings = [];
let listings = 0;

const CATEGORY_IDS = new Set((W.CATEGORIES || []).map((c) => c.id));
const oneOf = (field, values) => (x) => values.has(x[field]) ? "" : `${field} "${x[field]}" is not one of: ${[...values].join(", ")}`;
const RULES = {
  RESOURCES: { required: ["name", "url", "category", "access", "desc"], checks: [oneOf("category", CATEGORY_IDS), oneOf("access", new Set(["student", "everyone"]))], internalLinks: true },
  DISCOUNTS: { required: ["name", "url", "desc"] },
  SCHOLARSHIPS: { required: ["name", "url", "amountText"], checks: [oneOf("group", new Set(["big", "essay", "creative", "general", "noessay"]))], deadlines: true },
  PROGRAMS: { required: ["name", "url"], deadlines: true },
  COMPETITIONS: { required: ["name", "url", "category", "desc"], checks: [oneOf("category", new Set(["science", "math", "cs", "research", "innovation", "humanities", "robotics"]))], deadlines: true },
  FINAID: { required: ["name", "url", "deadline"], deadlines: true },
  GUIDES: { key: "slug", required: ["slug", "title", "blurb", "body"], checks: [(g) => /^[a-z0-9-]+$/.test(g.slug) ? "" : `slug "${g.slug}" should be lowercase-with-hyphens`], noUrl: true },
  TEMPLATES: { key: "slug", required: ["slug", "title", "columns"], noUrl: true },
  HACKATHONS: { required: ["name", "url"] }
};

function validUrl(u, internalOk) {
  if (internalOk && /^#[\w/-]+$/.test(u)) return true;
  try { const p = new URL(u); return /^https?:$/.test(p.protocol) && p.hostname.includes("."); } catch { return false; }
}

for (const [set, rule] of Object.entries(RULES)) {
  const list = W[set];
  if (!Array.isArray(list) || !list.length) { errors.push(`${set}: missing or empty`); continue; }
  const seen = new Map(), key = rule.key || "name";
  list.forEach((x, i) => {
    listings++;
    const where = `${set} "${x[key] || `#${i}`}"`;
    for (const f of rule.required) if (x[f] == null || x[f] === "" || (Array.isArray(x[f]) && !x[f].length)) errors.push(`${where}: missing ${f}`);
    for (const c of rule.checks || []) { const msg = c(x); if (msg) errors.push(`${where}: ${msg}`); }
    if (!rule.noUrl && x.url) {
      if (!validUrl(x.url, rule.internalLinks)) errors.push(`${where}: bad URL ${x.url}`);
      else if (x.url.startsWith("http://")) warnings.push(`${where}: link isn't https (${x.url})`);
    }
    const k = String(x[key] || "").trim().toLowerCase();
    if (k && seen.has(k)) errors.push(`${where}: listed twice (entries ${seen.get(k)} and ${i})`);
    else if (k) seen.set(k, i);
    if (x.added != null && !(/^\d{4}-\d{2}-\d{2}$/.test(x.added) && Date.parse(x.added) <= Date.now() + 864e5))
      errors.push(`${where}: added "${x.added}" should be the date it was added, as YYYY-MM-DD`);
    if (rule.deadlines && x.deadline && !gone(x)) {   // closed listings are hidden from deadlines anyway
      const d = String(x.deadline).trim().toLowerCase();
      if (!ROLLING.test(d) && !deadlineDates(d).length) warnings.push(`${where}: deadline "${x.deadline}" has no date the app can count down to`);
    }
  });
}

// every asset in index.html should share one ?v= cache number
const html = readFileSync(join(SITE_DIR, "index.html"), "utf8");
const versions = new Set([...html.matchAll(/\.(?:js|css)\?v=(\d+)/g)].map((m) => m[1]));
if (versions.size !== 1) errors.push(`site/index.html: assets use different ?v= numbers (${[...versions].join(", ")}); bump them all together`);
for (const m of html.matchAll(/<script src="([^"?]+)/g)) if (!existsSync(join(SITE_DIR, m[1]))) errors.push(`site/index.html: loads ${m[1]}, which doesn't exist`);
const pagesFile = join(SITE_DIR, "programs/index.html");
const pageV = existsSync(pagesFile) && (readFileSync(pagesFile, "utf8").match(/styles\.css\?v=(\d+)/) || [])[1];
if (pageV && versions.size === 1 && !versions.has(pageV)) warnings.push(`generated pages use ?v=${pageV}, site/index.html uses ?v=${[...versions][0]}: run \`npm run build\` (the Build site workflow also does this on main)`);

// house style: no em or en dashes in anything we write (hackathon data comes from an API, so it's skipped)
const DASH = /[\u2013\u2014]/;
const SCAN = ["site/index.html", "site/404.html", "site/site.webmanifest", "site/css", "site/js", "README.md", "CONTRIBUTING.md", "scripts", "tests", "docs", ".github"];
const TEXT = /\.(html|css|js|mjs|md|yml|yaml|json|webmanifest)$/;
function* walk(p) {
  if (!existsSync(p)) return;
  if (statSync(p).isDirectory()) for (const f of readdirSync(p)) yield* walk(join(p, f));
  else if (TEXT.test(p) || !p.includes(".")) yield p;
}
for (const root of SCAN) for (const f of walk(join(REPO, root))) {
  readFileSync(f, "utf8").split("\n").forEach((line, i) => { if (DASH.test(line)) errors.push(`${f.slice(REPO.length)}:${i + 1}: em/en dash (use a hyphen, comma or colon)`); });
}

for (const w of warnings) console.log(`  warn   ${w}`);
for (const e of errors) console.log(`  ERROR  ${e}`);
console.log(`Data check: ${listings} listings in ${Object.keys(RULES).length} datasets, ${errors.length} error${errors.length === 1 ? "" : "s"}, ${warnings.length} warning${warnings.length === 1 ? "" : "s"}.`);
process.exit(errors.length ? 1 : 0);
