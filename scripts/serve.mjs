#!/usr/bin/env node
/*
 * serve.mjs - serves site/ locally, behaving like GitHub Pages: folders serve
 * their index.html (and redirect to a trailing slash), anything missing gets
 * 404.html with a 404 status. No caching, so edits show on reload.
 *
 *   npm run dev              # http://localhost:8000
 *   PORT=3000 npm run dev
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { SITE_DIR } from "./lib/data.mjs";

const ROOT = SITE_DIR.replace(/[\\/]$/, "");
const PORT = Number(process.env.PORT) || 8000;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp",
  ".ico": "image/x-icon", ".ics": "text/calendar; charset=utf-8", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2"
};

createServer(async (req, res) => {
  let path;
  try { path = decodeURIComponent(new URL(req.url, "http://localhost").pathname); }
  catch { res.writeHead(400); return res.end("Bad request"); }
  let file = normalize(join(ROOT, path));
  if (file !== ROOT && !file.startsWith(ROOT + sep)) { res.writeHead(403); return res.end("Forbidden"); }
  try {
    if ((await stat(file)).isDirectory()) {
      if (!path.endsWith("/")) { res.writeHead(301, { Location: path + "/" }); return res.end(); }
      file = join(file, "index.html");
    }
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(body);
  } catch {
    const body = await readFile(join(ROOT, "404.html")).catch(() => "Not found");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(body);
  }
}).listen(PORT, () => console.log(`stdnt.xyz running at http://localhost:${PORT}`));
