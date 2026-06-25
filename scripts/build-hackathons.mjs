#!/usr/bin/env node
/*
 * build-hackathons.mjs - refreshes data/hackathons.json from the Hack Club
 * Hackathons API (the only source that exposes clean JSON), merged with a
 * small curated set of MLH flagship events (MLH has no public JSON/CORS API).
 *
 * The browser can't call the Hack Club API directly - it sends no
 * Access-Control-Allow-Origin header - so this runs server-side in CI
 * (.github/workflows/hackathons.yml), writes a same-origin data/hackathons.json,
 * and the static site fetches that. Keeps the site 100% self-contained at
 * runtime (no third-party libraries or proxies) while staying fresh daily.
 *
 *   node scripts/build-hackathons.mjs
 */
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const HC_API = "https://hackathons.hackclub.com/api/events/upcoming/";

// MLH flagship events - curated by hand because MLH exposes no JSON API.
// Only URLs that actually resolve (dead links are bad UX even though the
// link checker doesn't scan this path). Refresh each season.
const MLH = [
  { name: "Global Hack Week: Season Launch", url: "https://ghw.mlh.io/", start: "2026-07-10", end: "2026-07-16", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "MLH", hs: false },
  { name: "Hack the 6ix", url: "https://hackthe6ix.com/", start: "2026-07-17", end: "2026-07-19", city: "Toronto", region: "Ontario", country: "Canada", cc: "CA", format: "in-person", source: "MLH", hs: false },
  { name: "Hexafalls 2", url: "https://mlh.io/seasons/2026/events", start: "2026-07-24", end: "2026-07-26", city: "Kolkata", region: "West Bengal", country: "India", cc: "IN", format: "in-person", source: "MLH", hs: false },
  { name: "Global Hack Week: Agents", url: "https://ghw.mlh.io/", start: "2026-08-07", end: "2026-08-13", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "MLH", hs: false },
  { name: "Global Hack Week: Data", url: "https://ghw.mlh.io/", start: "2026-09-11", end: "2026-09-17", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "MLH", hs: false }
];

const fmtOf = (e) => (e.virtual ? "online" : e.hybrid ? "hybrid" : "in-person");
const dstr = (s) => (s || "").slice(0, 10);

function normalizeHC(list) {
  return list.map((e) => ({
    name: (e.name || "").trim(),
    url: e.website || "https://hackathons.hackclub.com/",
    start: dstr(e.start),
    end: dstr(e.end) || dstr(e.start),
    city: e.city || "",
    region: e.state || "",
    country: e.virtual ? "Worldwide" : (e.country || ""),
    cc: e.countryCode || "",
    format: fmtOf(e),
    source: "Hack Club",
    hs: true   // hackathons.hackclub.com lists high-school hackathons
  }));
}

async function main() {
  let hc = [];
  try {
    const res = await fetch(HC_API, { headers: { "User-Agent": "stdnt-xyz-hackathons/1.0" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    hc = normalizeHC(await res.json());
    console.log("Hack Club events:", hc.length);
  } catch (e) {
    console.error("Hack Club API failed:", e.message);
    // keep previously cached Hack Club events rather than wiping the file
    try {
      const prev = JSON.parse(readFileSync("data/hackathons.json", "utf8"));
      hc = (prev.events || []).filter((x) => x.source === "Hack Club");
      console.log("reusing", hc.length, "cached Hack Club events");
    } catch { /* no prior file - fall back to MLH only */ }
  }

  const today = new Date().toISOString().slice(0, 10);
  const all = hc.concat(MLH)
    .filter((e) => e.name && e.url && (e.end || e.start) >= today)
    .sort((a, b) => (a.start || "").localeCompare(b.start || "") || a.name.localeCompare(b.name));

  // dedupe by name + start date
  const seen = new Set(), events = [];
  for (const e of all) {
    const k = e.name.toLowerCase() + "|" + e.start;
    if (seen.has(k)) continue;
    seen.add(k);
    events.push(e);
  }

  // skip rewriting when the events are unchanged, so the daily job doesn't
  // create no-op commits just because the timestamp moved.
  try {
    const prev = JSON.parse(readFileSync("data/hackathons.json", "utf8"));
    if (JSON.stringify(prev.events) === JSON.stringify(events)) {
      console.log("no change -", events.length, "events; leaving file as is");
      return;
    }
  } catch { /* no prior file - write a fresh one */ }

  const out = {
    updated: new Date().toISOString(),
    source: "hackathons.hackclub.com API + curated MLH",
    count: events.length,
    events
  };
  mkdirSync("data", { recursive: true });
  writeFileSync("data/hackathons.json", JSON.stringify(out, null, 2) + "\n");
  console.log("wrote data/hackathons.json with", events.length, "events");
}

main();
