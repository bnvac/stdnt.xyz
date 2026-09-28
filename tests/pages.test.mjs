// Checks the generated files that are committed to the repo (pages, feeds,
// logos, icons). If one fails after a data change, run `npm run build`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { SITE } from "../scripts/lib/data.mjs";

const read = (f) => readFileSync(f, "utf8");
const local = (url) => url.replace(`${SITE}/`, "");

test("every sitemap URL is a real page with a title, one h1, a canonical and a share image", () => {
  const locs = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length >= 15, `${locs.length} URLs`);
  for (const loc of locs) {
    const file = `${local(loc)}index.html`;
    assert.ok(existsSync(file), `${file} exists`);
    const html = read(file);
    assert.match(html, /<title>[^<]{10,}<\/title>/, `${file} title`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${file} has one h1`);
    assert.ok(html.includes(`<link rel="canonical" href="${loc}"`), `${file} canonical`);
    const img = (html.match(/property="og:image" content="([^"]+)"/) || [])[1];
    assert.ok(img && existsSync(local(img)), `${file} share image ${img}`);
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  }
});

test("the 404 page is noindex, has no canonical and isn't in the sitemap", () => {
  const html = read("404.html");
  assert.match(html, /<meta name="robots" content="noindex"/);
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!read("sitemap.xml").includes("404"));
});

test("calendar feeds are valid iCalendar", () => {
  const feeds = readdirSync("calendar").filter((f) => f.endsWith(".ics"));
  assert.ok(feeds.includes("all.ics"));
  for (const f of feeds) {
    const t = read(`calendar/${f}`);
    assert.ok(t.startsWith("BEGIN:VCALENDAR\r\n") && t.endsWith("END:VCALENDAR\r\n"), `${f} wrapper`);
    assert.ok(!/[^\r]\n/.test(t), `${f} uses CRLF line endings`);
    for (const line of t.split("\r\n")) assert.ok(Buffer.byteLength(line) <= 75, `${f}: line over 75 octets`);
    const uids = [...t.matchAll(/^UID:(.+)$/gm)].map((m) => m[1]);
    assert.equal(new Set(uids).size, uids.length, `${f} UIDs are unique`);
    assert.equal((t.match(/BEGIN:VEVENT/g) || []).length, uids.length, `${f} every event has a UID`);
  }
});

test("every logo in the manifest is on disk", () => {
  const L = JSON.parse(read("js/logos.js").match(/window\.LOGOS = (.*);/)[1]);
  for (const [d, ext] of Object.entries(L.d)) assert.ok(existsSync(`logos/${d}.${ext === 1 ? "png" : ext}`), d);
  for (const s of Object.keys(L.si)) assert.ok(existsSync(`logos/si/${s}.svg`), s);
});

test("icons and the web manifest are in place", () => {
  for (const f of ["favicon.ico", "favicon.svg", "apple-touch-icon.png", "site.webmanifest"]) assert.ok(existsSync(f), f);
  const m = JSON.parse(read("site.webmanifest"));
  assert.ok(m.icons.length >= 2 && m.icons.every((i) => existsSync(i.src)), "manifest icons exist");
});
