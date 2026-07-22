// Fetch a curated set of colleges from the U.S. Dept of Education College
// Scorecard API and bake them into js/colleges.js (public-domain gov data).
const KEY = process.env.SCORECARD_KEY || "DEMO_KEY";
const BASE = "https://api.data.gov/ed/collegescorecard/v1/schools";
const FIELDS = [
  "id", "school.name", "school.city", "school.state", "school.school_url",
  "school.ownership",
  "latest.admissions.admission_rate.overall",
  "latest.cost.avg_net_price.overall", "latest.cost.attendance.academic_year",
  "latest.admissions.sat_scores.midpoint.overall",
  "latest.admissions.sat_scores.midpoint.critical_reading",
  "latest.admissions.sat_scores.midpoint.math",
  "latest.admissions.act_scores.midpoint.cumulative",
  "latest.student.size", "latest.completion.completion_rate_4yr_150nt"
].join(",");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function q(params) {
  const u = new URL(BASE);
  u.searchParams.set("api_key", KEY);
  u.searchParams.set("fields", FIELDS);
  u.searchParams.set("per_page", "100");
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  for (let attempt = 0; attempt < 5; attempt++) {
    const r = await fetch(u, { signal: AbortSignal.timeout(30000) });
    if (r.ok) return (await r.json()).results || [];
    if (r.status === 429) { await sleep(4000 * (attempt + 1)); continue; }
    throw new Error(`${r.status} ${await r.text()}`);
  }
  throw new Error("429 after retries");
}

const byId = new Map();
function add(rows) { for (const r of rows) if (r["school.name"]) byId.set(r.id, r); }

// the user's own list + academies + notable gaps, by name
const NAMED = [
  "The University of Alabama", "North Carolina State University at Raleigh",
  "Massachusetts Institute of Technology", "Georgia Institute of Technology-Main Campus",
  "University of Southern California", "Case Western Reserve University",
  "Worcester Polytechnic Institute", "University of Florida",
  "University of Massachusetts-Lowell", "University of Massachusetts-Amherst",
  "Harvard University", "Princeton University", "Tufts University",
  "Cornell University", "Stanford University", "Carnegie Mellon University",
  "United States Military Academy", "United States Naval Academy",
  "United States Air Force Academy"
];

const run = async () => {
  // most selective bachelor's-granting, operating, non-tiny
  add(await q({ "school.degrees_awarded.predominant": "3", "school.operating": "1",
    "latest.student.size__range": "400..", "sort": "latest.admissions.admission_rate.overall:asc" }));
  await sleep(1500);
  // largest (big well-known publics + privates)
  add(await q({ "school.degrees_awarded.predominant": "3", "school.operating": "1",
    "latest.student.size__range": "400..", "sort": "latest.student.size:desc" }));
  await sleep(1500);
  // graduate-predominant heavyweights too (e.g. some research unis file as 4)
  add(await q({ "school.degrees_awarded.predominant": "4", "school.operating": "1",
    "latest.student.size__range": "2000..", "sort": "latest.admissions.admission_rate.overall:asc" }));
  // report coverage of the user's named list
  const have = new Set([...byId.values()].map((r) => r["school.name"]));
  const missing = NAMED.filter((n) => !have.has(n));
  console.log("MISSING from broad queries:", missing.length ? missing.join(" | ") : "none");

  const clean = [...byId.values()].map((r) => {
    const sat = r["latest.admissions.sat_scores.midpoint.overall"]
      || ((r["latest.admissions.sat_scores.midpoint.critical_reading"] && r["latest.admissions.sat_scores.midpoint.math"])
        ? r["latest.admissions.sat_scores.midpoint.critical_reading"] + r["latest.admissions.sat_scores.midpoint.math"] : null);
    const url = (r["school.school_url"] || "").replace(/\/+$/, "");
    return {
      id: r.id, name: r["school.name"], city: r["school.city"], state: r["school.state"],
      url: url ? (/^https?:/.test(url) ? url : "https://" + url) : "",
      own: r["school.ownership"] || null,
      admit: r["latest.admissions.admission_rate.overall"] ?? null,
      net: r["latest.cost.avg_net_price.overall"] ?? null,
      cost: r["latest.cost.attendance.academic_year"] ?? null,
      sat: sat, act: r["latest.admissions.act_scores.midpoint.cumulative"] ?? null,
      size: r["latest.student.size"] ?? null,
      grad: r["latest.completion.completion_rate_4yr_150nt"] ?? null
    };
  }).filter((c) => c.size && c.size >= 400)
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log("collected", clean.length, "colleges");
  const out = `/*
 * colleges.js - a curated snapshot of U.S. college data from the U.S. Dept of
 * Education College Scorecard (public domain). Powers the College tracker so
 * search + stats work offline with no API key. The tracker can also query the
 * live Scorecard API for any school not listed here (see SCORECARD_API_KEY in
 * app.js). Regenerate with scripts/build-colleges.mjs.
 * Fields: admit (rate 0-1), net (avg net price $), cost ($/yr), sat (midpoint),
 * act (midpoint), size (undergrads), grad (4yr completion 0-1), own (1 public,
 * 2 private nonprofit, 3 private for-profit).
 */
window.COLLEGES = ${JSON.stringify(clean, null, 0).replace(/\},\{/g, "},\n{")};
`;
  const fs = await import("node:fs");
  fs.writeFileSync("/home/user/edu.edu/js/colleges.js", out);
  fs.copyFileSync("/tmp/claude-0/-home-user-edu-edu/dd2129ad-6553-5d86-a5b8-32c7ee4c7248/scratchpad/build-colleges.mjs", "/home/user/edu.edu/scripts/build-colleges.mjs");
  console.log("wrote js/colleges.js + scripts/build-colleges.mjs");
};
run().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
