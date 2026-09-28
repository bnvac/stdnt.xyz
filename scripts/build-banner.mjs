#!/usr/bin/env node
/*
 * build-banner.mjs - draws .github/banner.svg, the banner at the top of the
 * README: the headline, live listing counts and a wall of the brand logos in
 * site/logos/si. Every letter is outlined into a path, because GitHub shows
 * README images without web fonts, so it looks the same everywhere.
 *
 * Setting type properly (kerning) needs HarfBuzz, so it's a manual step:
 *
 *   npm i --no-save harfbuzzjs@1
 *   npm run banner
 *
 * Counts round down to a ten ("190+"), so it only needs a re-run when one
 * crosses a ten. Fonts load from Google Fonts; set FONT_DIR to a folder with
 * Inter-600.ttf, Inter-800.ttf and JetBrainsMono-700.ttf to run offline.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { loadData, gone, REPO, SITE_DIR } from "./lib/data.mjs";

const hb = await import("harfbuzzjs").catch(() => {
  console.error("build-banner needs HarfBuzz: run `npm i --no-save harfbuzzjs@1` first.");
  process.exit(1);
});

const OUT = join(REPO, ".github/banner.svg");
const W = 1280, H = 400, X0 = 76;
const HEADLINE = ["Where students get", "free stuff."];   // same as the og.png share image

const D = loadData();
const tens = (n) => `${Math.floor(n / 10) * 10}+`;
const live = (list) => list.filter((x) => !gone(x)).length;
const PILLS = [
  [tens(D.RESOURCES.length), "free tools", "#7d9bff"],
  [tens(live(D.SCHOLARSHIPS)), "scholarships", "#a78bfa"],
  [tens(live(D.PROGRAMS)), "STEM programs", "#f472b6"]
];

// the logo wall: three highlighted tiles, then the rest from the middle out,
// most recognizable first (wordmark logos are left out, they read as text)
const LIT = { "-1,-1": "github", "1,0": "googlegemini", "0,2": "figma" };
const LOGOS = ["notion", "spotify", "apple", "jetbrains", "youtube", "cursor", "vercel", "reddit", "blender",
  "huggingface", "hackclub", "google", "perplexity", "khanacademy", "cloudflare", "replit", "obsidian",
  "postman", "mongodb", "digitalocean", "netlify", "supabase", "miro", "overleaf", "codecademy", "freecodecamp",
  "quizlet", "anki", "deepl", "googlecolab", "git", "brave", "proton", "bitwarden", "framer", "autodesk",
  "notebooklm", "excalidraw", "inkscape", "gimp", "krita", "audacity", "davinciresolve", "obsstudio",
  "googlescholar", "libreoffice", "zotero", "loom", "devpost", "handshake", "hubspot", "namecheap", "openrouter",
  "mistralai", "googleslides", "unsplash", "pexels", "photopea", "pixlr", "tldraw", "diagramsdotnet",
  "udacity", "googlecloud"].filter((s) => existsSync(join(SITE_DIR, "logos/si", `${s}.svg`)));

// ---- type ---------------------------------------------------------------------
const FONTS = { "Inter-600": ["Inter", 600], "Inter-800": ["Inter", 800], "JetBrainsMono-700": ["JetBrains Mono", 700] };
async function loadFont(name) {
  let data;
  if (process.env.FONT_DIR) data = readFileSync(join(process.env.FONT_DIR, `${name}.ttf`));
  else {
    // asked without a browser user agent, Google Fonts answers with plain TTF files
    const [family, weight] = FONTS[name];
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`)).text();
    const url = (css.match(/url\((https:[^)]+\.ttf)\)/) || [])[1];
    if (!url) throw new Error(`Google Fonts sent no TTF for ${family} ${weight}`);
    data = new Uint8Array(await (await fetch(url)).arrayBuffer());
  }
  const face = new hb.Face(new hb.Blob(data), 0);
  return { font: new hb.Font(face), upem: face.upem, outlines: new Map() };
}
const fonts = {};
for (const name of Object.keys(FONTS)) fonts[name] = await loadFont(name);

const num = (n) => String(Math.round(n * 10) / 10 || 0);   // a tenth of a pixel is plenty
// set a line of type: its width, and draw(x, baseline) giving one path's data
function text(fontName, str, size, track = 0) {
  const f = fonts[fontName], s = size / f.upem;
  const buf = new hb.Buffer();
  buf.addText(str);
  buf.guessSegmentProperties();
  hb.shape(f.font, buf);
  const glyphs = buf.getGlyphInfosAndPositions();
  let width = 0;
  const placed = glyphs.map((g, i) => {
    const at = { id: g.codepoint, x: width + (g.xOffset || 0) * s, y: -(g.yOffset || 0) * s };
    width += g.xAdvance * s + (i < glyphs.length - 1 ? track * size : 0);
    return at;
  });
  const draw = (x0, y0) => placed.map((g) => {
    if (!f.outlines.has(g.id)) f.outlines.set(g.id, f.font.glyphToJson(g.id));
    // font units point y up, SVG points it down
    return f.outlines.get(g.id).map((c) => c.type + c.values.map((v, i) => num(i % 2 ? y0 + g.y - v * s : x0 + g.x + v * s)).join(" ")).join("");
  }).join("");
  return { width, draw };
}

// ---- layout -------------------------------------------------------------------
const defs = [];

// brand: the favicon tile, then stdnt.xyz with its x-height centred on the tile
const favicon = readFileSync(join(SITE_DIR, "favicon.svg"), "utf8").match(/<path[^>]* d="([^"]+)"/)[1];
const TY = 56, TS = 46, BS = 30, BT = -0.02;
const b1 = text("JetBrainsMono-700", "stdnt", BS, BT), b2 = text("JetBrainsMono-700", ".xyz", BS, BT);
const bx = X0 + TS + 14, by = TY + TS / 2 + 0.275 * BS + 0.5;
const brand = `<rect x="${X0}" y="${TY}" width="${TS}" height="${TS}" rx="${num(TS * 14 / 64)}" fill="#4f7cff"/>
  <path transform="translate(${X0} ${TY}) scale(${TS / 64})" fill="#fff" d="${favicon}"/>
  <path fill="#ecedf1" d="${b1.draw(bx, by)}"/>
  <path fill="#6b6f7d" d="${b2.draw(bx + b1.width + BT * BS, by)}"/>`;

// headline, sized so the first line fits the left column
const HT = -0.035;
const S = Math.min(70, Math.floor(600 / text("Inter-800", HEADLINE[0], 100, HT).width * 100));
const h1 = text("Inter-800", HEADLINE[0], S, HT), h2 = text("Inter-800", HEADLINE[1], S, HT);
const base1 = 196, base2 = base1 + Math.round(S * 1.06);
defs.push(`<linearGradient id="grad" x1="${X0}" y1="0" x2="${num(X0 + h2.width)}" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4f7cff"/><stop offset=".55" stop-color="#8b5cf6"/><stop offset="1" stop-color="#ec4899"/>
    </linearGradient>`);
const headline = `<path fill="#f3f4f7" d="${h1.draw(X0, base1)}"/>
  <path fill="url(#grad)" d="${h2.draw(X0, base2)}"/>`;

// count pills
const PH = 42, PY = base2 + 38, PS = 18, PAD = 16, GAP = 10;
const space = text("Inter-600", " ", PS).width;
let px = X0;
const pills = PILLS.map(([n, label, color]) => {
  const a = text("Inter-800", n, PS), l = text("Inter-600", label, PS);
  const w = PAD * 2 + a.width + space + l.width, ty = PY + PH / 2 + PS * 0.364;   // caps (.727em) centred
  const out = `<rect x="${num(px + 0.5)}" y="${PY + 0.5}" width="${num(w - 1)}" height="${PH - 1}" rx="12" fill="#fff" fill-opacity=".045" stroke="#fff" stroke-opacity=".1"/>
  <path fill="${color}" d="${a.draw(px + PAD, ty)}"/>
  <path fill="#c9ccd6" d="${l.draw(px + PAD + a.width + space, ty)}"/>`;
  px += w + GAP;
  return out;
}).join("\n  ");
const fadeFrom = Math.round(px - GAP + 24);   // the wall fades in just right of the pills

// logo wall: a tilted grid of tiles, skipping the ones the fade hides
const TILE = 60, LT = 68, PITCH = 76, ANG = -12, CX = 1012, CY = 196;
const cos = Math.cos(ANG * Math.PI / 180), sin = Math.sin(ANG * Math.PI / 180);
const cells = [];
for (let j = -5; j <= 5; j++) for (let i = -6; i <= 6; i++) {
  const x = CX + PITCH * (i * cos - j * sin), y = CY + PITCH * (i * sin + j * cos);
  if (x > fadeFrom - TILE * 0.72 && x < W + 60 && y > -60 && y < H + 60) cells.push({ x, y, lit: LIT[`${i},${j}`] });
}
const plain = cells.filter((c) => !c.lit).sort((a, b) => Math.hypot(a.x - CX, a.y - CY) - Math.hypot(b.x - CX, b.y - CY));
plain.forEach((c, n) => { c.slug = LOGOS[n % LOGOS.length]; });
const lit = cells.filter((c) => c.lit);
const at = (c) => `translate(${num(c.x)} ${num(c.y)})`;
const tiles = plain.map((c) => `<g transform="${at(c)} rotate(${ANG})"><use xlink:href="#tile"/><use xlink:href="#${c.slug}" x="-14" y="-14" width="28" height="28"/></g>`);
const litTiles = lit.map((c) => `<g transform="${at(c)}">
      <circle r="84" fill="url(#halo)"/>
      <g transform="rotate(${ANG})"><rect x="${-LT / 2}" y="${-LT / 2}" width="${LT}" height="${LT}" rx="17" fill="#1b1d26" stroke="url(#ring)" stroke-width="2"/><use xlink:href="#${c.lit}" x="-17" y="-17" width="34" height="34" fill="#fff"/></g>
    </g>`);
// two decimals is plenty for a 24-unit icon; trimming digits (not rounding) keeps compact arc flags intact
const icon = (slug) => readFileSync(join(SITE_DIR, "logos/si", `${slug}.svg`), "utf8").match(/ d="([^"]+)"/)[1].replace(/(\.\d\d)\d+/g, "$1");
defs.push(`<rect id="tile" x="${-TILE / 2}" y="${-TILE / 2}" width="${TILE}" height="${TILE}" rx="15" fill="#131419" stroke="#24262f"/>
    <linearGradient id="wallFade" x1="${fadeFrom}" y1="0" x2="${fadeFrom + 226}" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/>
    </linearGradient>
    <mask id="wall"><rect width="${W}" height="${H}" fill="url(#wallFade)"/></mask>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#4f7cff"/><stop offset=".55" stop-color="#8b5cf6"/><stop offset="1" stop-color="#ec4899"/>
    </linearGradient>
    <radialGradient id="halo"><stop stop-color="#6d7dff" stop-opacity=".55"/><stop offset="1" stop-color="#6d7dff" stop-opacity="0"/></radialGradient>`,
  ...[...new Set([...plain.map((c) => c.slug), ...lit.map((c) => c.lit)])].map((s) => `<symbol id="${s}" viewBox="0 0 24 24"><path d="${icon(s)}"/></symbol>`));

// ---- svg ----------------------------------------------------------------------
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <!-- Generated by scripts/build-banner.mjs (npm run banner); edit that, not this. -->
  <title>stdnt.xyz: ${HEADLINE.join(" ").toLowerCase()}</title>
  <defs>
    <clipPath id="card"><rect width="${W}" height="${H}" rx="24"/></clipPath>
    <radialGradient id="glowBlue" cx="200" cy="-40" r="620" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4f7cff" stop-opacity=".42"/><stop offset="1" stop-color="#4f7cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowViolet" cx="1150" cy="440" r="600" gradientUnits="userSpaceOnUse">
      <stop stop-color="#8b5cf6" stop-opacity=".4"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowPink" cx="700" cy="470" r="360" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ec4899" stop-opacity=".14"/><stop offset="1" stop-color="#ec4899" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 .5H.5V40" stroke="#fff" stroke-opacity=".05"/></pattern>
    <radialGradient id="gridFade" cx="330" cy="180" r="560" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="gridMask"><rect width="${W}" height="${H}" fill="url(#gridFade)"/></mask>
    <linearGradient id="shine" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" stop-opacity="0"/><stop offset=".3" stop-color="#fff" stop-opacity=".22"/><stop offset=".7" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    ${defs.join("\n    ")}
  </defs>
  <g clip-path="url(#card)">
    <rect width="${W}" height="${H}" fill="#0c0d10"/>
    <rect width="${W}" height="${H}" fill="url(#glowBlue)"/>
    <rect width="${W}" height="${H}" fill="url(#glowViolet)"/>
    <rect width="${W}" height="${H}" fill="url(#glowPink)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#gridMask)"/>
    <g mask="url(#wall)">
      <g fill="#7d818f">
      ${tiles.join("\n      ")}
      </g>
      ${litTiles.join("\n      ")}
    </g>
    <rect width="${W}" height="1" fill="url(#shine)"/>
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="23.5" stroke="#fff" stroke-opacity=".08"/>
  ${brand}
  ${headline}
  ${pills}
</svg>
`;
writeFileSync(OUT, svg);
console.log(`wrote .github/banner.svg (${Math.round(svg.length / 1024)} KB): ${PILLS.map(([n, label]) => `${n} ${label}`).join(", ")}`);
