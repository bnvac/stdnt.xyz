import { test } from "node:test";
import assert from "node:assert/strict";
import { boot } from "./helpers.mjs";
import { loadData } from "../scripts/lib/data.mjs";

const W = loadData();

test("the app boots and every tab renders without errors", () => {
  const app = boot();
  const tabs = [...new Set(app.$$(".tab[data-tab]").map((t) => t.dataset.tab))];
  assert.ok(tabs.length >= 8, `found ${tabs.length} tabs`);
  for (const t of tabs) {
    app.click(app.$(`.tab[data-tab="${t}"]`));
    assert.equal(app.$(`#panel-${t}`).hidden, false, `${t} panel shows`);
  }
  assert.deepEqual(app.errors, []);
});

test("search counts matches on every tab and links to the other sections", () => {
  const app = boot({ url: "https://stdnt.xyz/?q=sat" });
  assert.equal(app.$("#search").value, "sat");
  assert.ok(+app.$("#n-tools").textContent > 0 && +app.$("#n-tools").textContent < W.RESOURCES.length, "tool count narrows");
  assert.equal(app.$("#xsearch").hidden, false);
  assert.ok(app.$$("#xsearch .xs-chip").length > 0, "offers other sections");
  assert.deepEqual(app.errors, []);
});

test("tool, competition and club cards keep save and report in the footer", () => {
  const app = boot();
  for (const [tab, grid] of [["tools", "#tools-grid"], ["competitions", "#competitions-grid"], ["clubs", "#clubs-grid"]]) {
    app.click(app.$(`.tab[data-tab="${tab}"]`));
    const cards = app.$$(`${grid} .card`);
    assert.ok(cards.length > 0, `${tab} has cards`);
    for (const c of cards) {
      assert.equal(c.querySelector(".card-top .star"), null, "no star in the header");
      assert.ok(c.querySelector(".card-foot .star"), "star in the footer");
    }
  }
});

test("program dates are rounded, with the exact past dates on hover", () => {
  const app = boot({ url: "https://stdnt.xyz/#prog" });
  const dates = app.$$("#prog-list .find");
  assert.ok(dates.length > 20);
  const exact = dates.filter((d) => /\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}\b/.test(d.textContent));
  assert.deepEqual(exact.map((d) => d.textContent), []);
  const rounded = dates.filter((d) => /Usually/.test(d.textContent));
  assert.ok(rounded.length > 20 && rounded.every((d) => /^Past session: /.test(d.title)));
});

test("a saved list can be shared and opened by someone else", () => {
  const mine = [`tool::${W.RESOURCES[0].name}`, `sch::${W.SCHOLARSHIPS[0].name}`];
  const a = boot({ storage: { "edu-saved": JSON.stringify(mine) } });
  a.click(a.$('.tab[data-tab="saved"]'));
  a.click(a.$('[data-act="share"]'));
  const link = a.copied();
  assert.match(link, /^https:\/\/stdnt\.xyz\/#saved&list=[a-z0-9]+\.[a-z0-9]+$/);

  const b = boot({ url: link });
  assert.ok(b.$(".saved-shared"), "shared banner shows");
  assert.equal(b.$$("#saved-body .card, #saved-body .row").length, 2);
  assert.equal(b.$("#n-saved").textContent, "0", "visitor's own list untouched");
  b.click(b.$('[data-act="keep"]'));
  assert.equal(b.$("#n-saved").textContent, "2");
  assert.deepEqual(JSON.parse(b.window.localStorage.getItem("edu-saved")).sort(), mine.sort());
  assert.equal(b.$(".saved-shared"), null, "banner closes");
});

test("the newsletter shows as coming soon until an endpoint is configured", () => {
  const app = boot();
  const boxes = app.$$(".news, .news-band");
  assert.ok(boxes.length >= 2 && boxes.every((b) => !b.hidden), "both signups show");
  for (const b of boxes) {
    assert.equal(b.querySelector(".news-form").hidden, true, "no form that can't send");
    assert.equal(b.querySelector(".soon-tag").hidden, false, "marked coming soon");
  }
  assert.equal(app.$("#dl-remind").hidden, true);
});

test("the subscribe panel links every calendar feed", () => {
  const app = boot({ url: "https://stdnt.xyz/#deadlines" });
  app.click(app.$("#dl-sub"));
  assert.equal(app.$("#sub-apple").getAttribute("href"), "webcal://stdnt.xyz/calendar/all.ics");
  assert.match(app.$("#sub-google").getAttribute("href"), /^https:\/\/calendar\.google\.com\/calendar\/r\?cid=webcal/);
  app.click(app.$('#dl-sub-panel [data-feed="scholarships"]'));
  assert.equal(app.$("#sub-apple").getAttribute("href"), "webcal://stdnt.xyz/calendar/scholarships.ics");
});

test("the partnership with All The Same Organization is credited", () => {
  const app = boot();
  assert.ok(app.$('.hero-partner[href="https://allthesame.org/"]'), "on the front page");
  for (const sel of [".about-partner", ".ftr-partner"]) assert.ok(app.$(`${sel} a[href="https://allthesame.org/"]`), sel);
});

test("the New tab lists every listing added in the last six months, newest first", () => {
  const cutoff = Date.now() - 180 * 864e5;
  const expected = [...W.RESOURCES, ...W.DISCOUNTS, ...W.SCHOLARSHIPS, ...W.PROGRAMS, ...W.COMPETITIONS, ...W.CLUBS]
    .filter((x) => x.added && Date.parse(x.added) >= cutoff)
    .sort((a, b) => b.added.localeCompare(a.added) || a.name.localeCompare(b.name))
    .map((x) => x.name);
  const app = boot({ url: "https://stdnt.xyz/#new" });
  const shown = app.$$("#new-list .row-title").map((t) => t.textContent.replace(/\s*↗\s*$/, "").trim());
  assert.deepEqual(shown, expected);
  assert.equal(app.$("#n-new").textContent, String(expected.length));
  assert.deepEqual(app.errors, []);
});

test("the clubs tab groups every chapter and volunteer listing, and clubs can be saved", () => {
  const app = boot({ url: "https://stdnt.xyz/#clubs" });
  const heads = app.$$("#clubs-grid .saved-h").map((h) => h.textContent.replace(/\s*\d+\s*$/, "").trim());
  assert.deepEqual(heads, Array.from(W.CLUB_CATS, (c) => c.name));
  assert.equal(app.$$("#clubs-grid .card").length, W.CLUBS.length);
  assert.equal(app.$("#n-clubs").textContent, String(W.CLUBS.length));
  app.click(app.$("#clubs-grid .card .star"));
  assert.equal(app.$("#n-saved").textContent, "1");
  assert.deepEqual(app.errors, []);
});
