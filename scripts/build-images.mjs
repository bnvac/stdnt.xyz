#!/usr/bin/env node
/*
 * build-images.mjs - renders every raster image the site ships:
 *   - share images (1200x630 link previews on Discord, iMessage, X...):
 *     og.png for the site and guides/<slug>/og.png per guide
 *   - icons from favicon.svg: favicon.ico, apple-touch-icon.png and the
 *     home-screen icons in assets/icons/ that site.webmanifest points to
 *
 * Needs a headless browser, so it's a manual step, not part of CI:
 *
 *   npm i --no-save playwright && npx playwright install chromium
 *   npm run images            # or: node scripts/build-images.mjs [og|icons]
 *
 * Re-run it after adding a guide or editing favicon.svg, then `npm run build`.
 * Set FONT_DIR to a folder with Inter.woff2 + JetBrainsMono.woff2 to render
 * offline; otherwise the fonts load from Google Fonts like the site does.
 */
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import { loadData, esc } from "./lib/data.mjs";

const only = process.argv[2];   // "og", "icons" or nothing for both
const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const page = await browser.newPage();
const tmp = join(tmpdir(), "stdnt-render.html");
async function render(html, file, width, height, transparent = false) {
  writeFileSync(tmp, html);
  await page.setViewportSize({ width, height });
  await page.goto("file://" + tmp);
  await page.evaluate(() => document.fonts.ready);
  mkdirSync(file.replace(/[^/]*$/, "") || ".", { recursive: true });
  const png = await page.screenshot({ type: "png", omitBackground: transparent });
  if (file) { writeFileSync(file, png); console.log("wrote", file); }
  return png;
}

// ---- share images ---------------------------------------------------------
if (only !== "icons") {
  const W = loadData();
  const FONT_DIR = process.env.FONT_DIR;
  const fonts = FONT_DIR
    ? `@font-face{font-family:Inter;src:url("file://${FONT_DIR}/Inter.woff2");font-weight:100 900}@font-face{font-family:"JetBrains Mono";src:url("file://${FONT_DIR}/JetBrainsMono.woff2");font-weight:700}`
    : `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&family=JetBrains+Mono:wght@700&display=block");`;
  const css = `${fonts}
*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;overflow:hidden;position:relative;background:#0c0d10;color:#ecedf1;font-family:Inter,"DejaVu Sans",sans-serif}
.g1,.g2{position:absolute;border-radius:50%;filter:blur(10px)}.g1{width:760px;height:760px;left:-220px;top:-360px;background:radial-gradient(circle,rgba(79,124,255,.45),transparent 62%)}
.g2{width:820px;height:820px;right:-260px;bottom:-420px;background:radial-gradient(circle,rgba(139,92,246,.42),transparent 62%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(circle at 50% 42%,#000,transparent 78%)}
.wrap{position:absolute;inset:0;padding:60px 72px;display:flex;flex-direction:column}
.brand{font-family:"JetBrains Mono",monospace;font-size:34px;font-weight:700;letter-spacing:-1px}.brand span{color:#6b6f7d}
.eyebrow{margin-top:auto;font-size:21px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8ea8ff}
h1{margin:14px 0 0;font-weight:800;letter-spacing:-.04em;line-height:1.03}
.grad{background:linear-gradient(90deg,#4f7cff,#8b5cf6 55%,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{margin-top:20px;font-size:28px;line-height:1.4;color:#a0a4b2;max-width:1000px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.pills{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.pill{padding:10px 18px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);font-size:22px;font-weight:600;color:#c9ccd6}.pill b{color:#fff}
.url{position:absolute;right:72px;top:66px;font-family:"JetBrains Mono",monospace;font-size:20px;color:#6b6f7d}`;
  const shell = (inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="g1"></div><div class="g2"></div><div class="grid"></div><div class="wrap">${inner}</div></body></html>`;
  const brand = `<div class="brand">stdnt<span>.xyz</span></div>`;

  const cards = [["og.png", shell(`${brand}<div class="eyebrow">Free for students</div>
  <h1 style="font-size:88px">Where students get<br><span class="grad">free stuff.</span></h1>
  <div class="pills"><span class="pill"><b>${(W.SCHOLARSHIPS || []).length}</b> scholarships</span><span class="pill"><b>${(W.PROGRAMS || []).length}</b> STEM programs</span>
  <span class="pill"><b>${(W.RESOURCES || []).length}</b> free tools</span><span class="pill">Deadline calendar</span></div>`)]];
  for (const g of W.GUIDES || []) {
    const mins = Math.max(1, Math.round(g.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220));
    const size = g.title.length > 34 ? 70 : 82;
    cards.push([`guides/${g.slug}/og.png`, shell(`${brand}<div class="url">stdnt.xyz/guides</div><div class="eyebrow">Guide &middot; ${mins} min read</div>
    <h1 style="font-size:${size}px">${esc(g.title)}</h1><div class="sub">${esc(g.blurb)}</div>`)]);
  }
  for (const [file, html] of cards) await render(html, file, 1200, 630);
}

// ---- icons ----------------------------------------------------------------
if (only !== "og") {
  const svg = readFileSync("favicon.svg", "utf8");
  // full-bleed square for iOS (which rounds the corners itself) and Android
  // "maskable" icons (cropped to a circle or squircle); the glyph sits well
  // inside the safe zone either way
  const square = svg.replace(/ rx="[\d.]+"/, "");
  const icon = (src, size) => `<!doctype html><html><body style="margin:0">${src.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`;
  const icoSizes = [16, 32, 48];
  const pngs = [];
  for (const size of icoSizes) pngs.push(await render(icon(svg, size), "", size, size, true));
  writeFileSync("favicon.ico", ico(pngs, icoSizes));
  console.log("wrote favicon.ico");
  await render(icon(square, 180), "apple-touch-icon.png", 180, 180);
  await render(icon(svg, 192), "assets/icons/icon-192.png", 192, 192, true);
  await render(icon(svg, 512), "assets/icons/icon-512.png", 512, 512, true);
  await render(icon(square, 512), "assets/icons/icon-maskable-512.png", 512, 512);
}
await browser.close();

// PNG-compressed .ico (supported by every current browser): a 6-byte header,
// one 16-byte directory entry per size, then the PNG files back to back
function ico(images, sizes) {
  const head = Buffer.alloc(6 + 16 * images.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach((png, i) => {
    const e = 6 + 16 * i, s = sizes[i] >= 256 ? 0 : sizes[i];
    head.writeUInt8(s, e); head.writeUInt8(s, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(png.length, e + 8); head.writeUInt32LE(offset, e + 12);
    offset += png.length;
  });
  return Buffer.concat([head, ...images]);
}
