/*
 * helpers.mjs - boots the real app (site/index.html plus every script it loads, in
 * order) inside jsdom, with the browser APIs jsdom doesn't have stubbed out.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { JSDOM, VirtualConsole } from "jsdom";
import { SITE_DIR } from "../scripts/lib/data.mjs";

export const HTML = readFileSync(join(SITE_DIR, "index.html"), "utf8");
export const SCRIPTS = [...HTML.matchAll(/<script src="(js\/[\w-]+\.js)(?:\?[^"]*)?"/g)].map((m) => m[1]);

export function boot({ url = "https://stdnt.xyz/", storage = {} } = {}) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", (e) => { if (!/Not implemented/.test(e.message)) errors.push(e.message); });
  const { window } = new JSDOM(HTML, { url, runScripts: "outside-only", virtualConsole: vc });
  for (const [k, v] of Object.entries(storage)) window.localStorage.setItem(k, v);
  window.matchMedia = () => ({ matches: false, addEventListener() {}, addListener() {} });
  window.requestAnimationFrame = () => 0;
  window.cancelAnimationFrame = () => {};
  window.scrollTo = () => {};
  window.Element.prototype.scrollIntoView = () => {};
  window.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({}), text: () => Promise.resolve("") });
  window.URL.createObjectURL = () => "blob:stub";
  window.URL.revokeObjectURL = () => {};
  let copied = "";
  Object.defineProperty(window.navigator, "clipboard", { configurable: true, value: { writeText: (t) => { copied = t; return Promise.resolve(); } } });
  for (const f of SCRIPTS) window.eval(readFileSync(join(SITE_DIR, f), "utf8"));
  const doc = window.document;
  return {
    window, doc, errors,
    $: (s) => doc.querySelector(s),
    $$: (s) => [...doc.querySelectorAll(s)],
    click: (el) => el.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true })),
    copied: () => copied
  };
}
