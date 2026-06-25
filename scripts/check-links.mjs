#!/usr/bin/env node
/*
 * check-links.mjs - finds every external URL in the data/content files and
 * reports the dead ones. Writes link-report.md and exits 1 if any hard
 * failures are found (used by .github/workflows/link-check.yml).
 *
 *   node scripts/check-links.mjs            # check everything
 *   LINK_LIMIT=20 node scripts/check-links.mjs   # quick smoke test
 */
import { readFileSync, writeFileSync } from "node:fs";

const FILES = [
  "js/data.js", "js/scholarships.js", "js/programs.js",
  "js/programs-extra.js", "js/guides.js", "js/templates.js"
];
const URL_RE = /https?:\/\/[^\s"'`<>)\]]+/g;
const TIMEOUT = 15000;
const CONCURRENCY = 12;
const LIMIT = process.env.LINK_LIMIT ? +process.env.LINK_LIMIT : Infinity;
// statuses that usually mean "site is up but blocks bots" - warn, don't fail the build
const SOFT = new Set([401, 403, 405, 406, 429]);

const stripTrailing = (u) => u.replace(/[.,;:'")\]]+$/, "");
function validURL(u) {
  try { const url = new URL(u); return !!url.hostname && url.hostname.includes("."); }
  catch { return false; }
}

// collect url -> set of files it appears in
const urls = new Map();
for (const f of FILES) {
  let text;
  try { text = readFileSync(f, "utf8"); } catch { continue; }
  for (let u of text.match(URL_RE) || []) {
    u = stripTrailing(u);
    if (!validURL(u)) continue;
    if (!urls.has(u)) urls.set(u, new Set());
    urls.get(u).add(f);
  }
}

let list = [...urls.keys()].sort();
if (Number.isFinite(LIMIT)) list = list.slice(0, LIMIT);
console.log(`Checking ${list.length} unique URLs from ${FILES.length} files...`);

async function check(u) {
  const opts = {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0 (compatible; stdnt-xyz-linkcheck/1.0; +https://github.com/2008wbbv/edu.edu)" },
    signal: AbortSignal.timeout(TIMEOUT)
  };
  try {
    let res = await fetch(u, { ...opts, method: "HEAD" });
    if (res.status === 405 || res.status === 501) res = await fetch(u, { ...opts, method: "GET" });
    return { u, status: res.status, ok: res.ok };
  } catch {
    try {
      const res = await fetch(u, { ...opts, method: "GET" });
      return { u, status: res.status, ok: res.ok };
    } catch (e2) {
      return { u, status: 0, ok: false, error: String((e2 && e2.message) || e2) };
    }
  }
}

const results = [];
for (let i = 0; i < list.length; i += CONCURRENCY) {
  const batch = list.slice(i, i + CONCURRENCY);
  results.push(...await Promise.all(batch.map(check)));
  process.stdout.write(`\r  checked ${Math.min(i + CONCURRENCY, list.length)}/${list.length}`);
}
console.log("");

const broken = [], warned = [];
for (const r of results) {
  if (r.ok) continue;
  (SOFT.has(r.status) ? warned : broken).push(r);
}

const line = (r) => {
  const code = r.status ? `HTTP ${r.status}` : `error: ${r.error || "no response"}`;
  return `- [ ] ${r.u} — **${code}** (in ${[...urls.get(r.u)].join(", ")})`;
};

let report = `# Link check — ${new Date().toISOString().slice(0, 10)}\n\n`;
report += `Checked ${list.length} URLs: **${broken.length} broken**, ${warned.length} blocked/rate-limited, ${results.length - broken.length - warned.length} OK.\n\n`;
if (broken.length) report += `## Broken links (need fixing)\n\n${broken.map(line).join("\n")}\n\n`;
if (warned.length) report += `<details><summary>${warned.length} links returned 401/403/429 (likely bot-blocking — usually fine, spot-check)</summary>\n\n${warned.map(line).join("\n")}\n\n</details>\n`;
writeFileSync("link-report.md", report);
console.log(report);

if (broken.length) { console.error(`${broken.length} broken link(s) found.`); process.exit(1); }
console.log("No broken links.");
