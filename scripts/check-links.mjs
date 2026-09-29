#!/usr/bin/env node
/*
 * check-links.mjs - checks every external URL in the data/content files.
 *
 *   npm run check:links                        # check everything
 *   LINK_LIMIT=20 node scripts/check-links.mjs # quick smoke test (writes nothing)
 *
 * A link only counts as dead after failing two runs in a row (one-off outages
 * and flaky servers are common), so data/link-status.json keeps two lists:
 *   suspect - failed this run for the first time (not shown on the site)
 *   dead    - failed this run and the previous one: the site shows
 *             "Link may be down" on these
 * Also writes link-report.md (repo root) and, in GitHub Actions, the `dead` count as a
 * step output for .github/workflows/link-check.yml. Broken third-party links
 * are a content problem, not a script failure, so this always exits 0.
 */
import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { REPO, SITE_DIR } from "./lib/data.mjs";

process.chdir(SITE_DIR);

const FILES = [
  "js/data.js", "js/scholarships.js", "js/programs.js", "js/programs-extra.js",
  "js/competitions.js", "js/clubs.js", "js/discounts.js", "js/finaid.js", "js/guides.js", "js/templates.js"
];
const URL_RE = /https?:\/\/[^\s"'`<>)\]]+/g;
const TIMEOUT = 20000;
const CONCURRENCY = 12;
const LIMIT = process.env.LINK_LIMIT ? +process.env.LINK_LIMIT : Infinity;
// "the site is up but won't talk to a script" - reported, never flagged
const SOFT = new Set([401, 403, 405, 406, 429]);
// many sites answer bot-looking requests (or HEAD) with 403/404/503 while
// serving browsers fine, so look like a browser
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9"
};

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

async function request(u, method) {
  // a fresh timeout per request, so a HEAD that hangs can't abort the GET retry
  const res = await fetch(u, { method, redirect: "follow", headers: HEADERS, signal: AbortSignal.timeout(TIMEOUT) });
  if (method === "GET") res.body?.cancel().catch(() => {});   // status is all we need
  return res;
}
async function check(u) {
  try {
    let res = await request(u, "HEAD").catch(() => null);
    if (!res || !res.ok) res = await request(u, "GET");     // plenty of servers mishandle HEAD
    return { u, status: res.status, ok: res.ok };
  } catch (e) {
    const code = String((e && e.cause && e.cause.code) || (e && e.name) || "");
    // no such domain or a bad certificate is broken for visitors too;
    // a timeout or reset can't tell a dead site from a bot wall
    const hard = /ENOTFOUND|CERT|ERR_TLS/.test(code);
    return { u, status: 0, ok: false, hard, error: code || String((e && e.message) || e) };
  }
}

const results = [];
for (let i = 0; i < list.length; i += CONCURRENCY) {
  const batch = list.slice(i, i + CONCURRENCY);
  results.push(...await Promise.all(batch.map(check)));
  process.stdout.write(`\r  checked ${Math.min(i + CONCURRENCY, list.length)}/${list.length}`);
}
console.log("");

const failed = [], warned = [];
for (const r of results) {
  if (r.ok) continue;
  (SOFT.has(r.status) || (r.status === 0 && !r.hard) ? warned : failed).push(r);
}

// two strikes: dead only if it also failed last time
let prev = { dead: [], suspect: [] };
try { prev = JSON.parse(readFileSync("data/link-status.json", "utf8")); } catch {}
const before = new Set([...(prev.dead || []), ...(prev.suspect || [])]);
const dead = failed.filter((r) => before.has(r.u)), suspect = failed.filter((r) => !before.has(r.u));

const line = (r) => {
  const code = r.status ? `HTTP ${r.status}` : `error: ${r.error || "no response"}`;
  return `- [ ] ${r.u}: **${code}** (in ${[...urls.get(r.u)].join(", ")})`;
};
let report = `# Link check, ${new Date().toISOString().slice(0, 10)}\n\n`;
report += `Checked ${list.length} URLs: **${dead.length} dead**, ${suspect.length} failed for the first time, ${warned.length} blocked or timed out, ${results.length - failed.length - warned.length} OK.\n\n`;
if (dead.length) report += `## Dead: failed two checks in a row (flagged on the site)\n\n${dead.map(line).join("\n")}\n\n`;
if (suspect.length) report += `## Failed this week only (flagged if they fail again next week)\n\n${suspect.map(line).join("\n")}\n\n`;
if (warned.length) report += `<details><summary>${warned.length} links were blocked (401/403/429) or timed out: usually bot walls, spot-check</summary>\n\n${warned.map(line).join("\n")}\n\n</details>\n`;
writeFileSync(join(REPO, "link-report.md"), report);   // the link-check workflow posts this as the issue body
console.log(report);

// only a full run updates the status, so a LINK_LIMIT smoke test never wipes it
if (!Number.isFinite(LIMIT)) {
  writeFileSync("data/link-status.json", JSON.stringify({
    updated: new Date().toISOString(),
    checked: list.length,
    dead: dead.map((r) => r.u).sort(),
    suspect: suspect.map((r) => r.u).sort()
  }, null, 2) + "\n");
  console.log(`wrote data/link-status.json (${dead.length} dead, ${suspect.length} suspect)`);
}
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `dead=${dead.length}\n`);
