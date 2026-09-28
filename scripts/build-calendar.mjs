#!/usr/bin/env node
/*
 * build-calendar.mjs - writes subscribable iCalendar feeds of every deadline
 * on the site into calendar/*.ics. People subscribe once (Google, Apple,
 * Outlook) and new or changed deadlines show up automatically, because
 * .github/workflows/site-build.yml re-runs this daily and on data changes.
 *
 *   node scripts/build-calendar.mjs
 *
 * Deadlines that only name a month land on the 1st as an early heads-up.
 * UIDs are stable per listing + date so clients update instead of duplicating.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { loadData, deadlineDates, gone, slugify, SITE, SITE_DIR } from "./lib/data.mjs";

process.chdir(SITE_DIR);

const W = loadData();
const today = new Date();
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const FEEDS = {
  all: { name: "stdnt.xyz deadlines", desc: "Scholarship, program, competition and financial-aid deadlines from stdnt.xyz." },
  scholarships: { name: "stdnt.xyz scholarship deadlines", desc: "Scholarship deadlines from stdnt.xyz.", kind: "sch" },
  programs: { name: "stdnt.xyz program deadlines", desc: "STEM summer program and internship deadlines from stdnt.xyz.", kind: "prog" },
  competitions: { name: "stdnt.xyz competition deadlines", desc: "Academic competition deadlines from stdnt.xyz.", kind: "comp" },
  "financial-aid": { name: "stdnt.xyz financial aid dates", desc: "FAFSA, CSS Profile and state aid dates.", kind: "aid" },
};
const LABEL = { sch: "Scholarship", prog: "Program", comp: "Competition", aid: "Financial aid" };

// every listing with a parseable deadline, like deadlineItems() in app.js
const items = [];
const add = (kind, x, extra) => { if (kind !== "aid" && gone(x)) return; deadlineDates(x.deadline, today).forEach((d) => items.push({ kind, x, extra, ...d })); };
(W.SCHOLARSHIPS || []).forEach((s) => add("sch", s, s.amountText));
(W.PROGRAMS || []).forEach((p) => add("prog", p, p.cost));
(W.COMPETITIONS || []).forEach((c) => add("comp", c, c.format));
(W.FINAID || []).forEach((a) => add("aid", a, a.tag));
items.sort((a, b) => a.date - b.date || a.x.name.localeCompare(b.x.name));

const ymd = (d) => d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
const text = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
// RFC 5545: lines longer than 75 octets fold onto continuation lines starting with a space
function fold(line) {
  const b = Buffer.from(line, "utf8");
  if (b.length <= 75) return line;
  const out = []; let i = 0, first = true;
  while (i < b.length) {
    let n = first ? 75 : 74;
    while (n > 0 && i + n < b.length && (b[i + n] & 0xc0) === 0x80) n--;   // don't split a UTF-8 character
    out.push((first ? "" : " ") + b.subarray(i, i + n).toString("utf8"));
    i += n; first = false;
  }
  return out.join("\r\n");
}
const stamp = today.getFullYear() + "0101T000000Z";   // stable within a year, so unchanged feeds don't churn

function vevent({ kind, x, extra, date, exact }) {
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const title = kind === "aid" ? x.name : exact ? `Deadline: ${x.name}` : `Deadline in ${MONTH[date.getMonth()]}: ${x.name}`;
  const desc = [`${LABEL[kind]}${extra ? " · " + extra : ""}`, `Deadline listed as: ${x.deadline}${exact ? "" : " (exact day varies, check the site)"}`,
    x.url || "", `More deadlines: ${SITE}/#deadlines`].filter(Boolean).join("\n");
  return ["BEGIN:VEVENT", `UID:${kind}-${slugify(x.name)}-${ymd(date)}@stdnt.xyz`, `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd(date)}`, `DTEND;VALUE=DATE:${ymd(end)}`, `SUMMARY:${text(title)}`, `DESCRIPTION:${text(desc)}`,
    ...(x.url ? [`URL:${x.url}`] : []), `CATEGORIES:${text(LABEL[kind])}`, "TRANSP:TRANSPARENT",
    "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${text(title)}`, "TRIGGER:-P7D", "END:VALARM",
    "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${text(title)}`, "TRIGGER:-P1D", "END:VALARM", "END:VEVENT"];
}

mkdirSync("calendar", { recursive: true });
for (const [file, f] of Object.entries(FEEDS)) {
  const list = items.filter((it) => !f.kind || it.kind === f.kind);
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//stdnt.xyz//Deadlines//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    `X-WR-CALNAME:${text(f.name)}`, `X-WR-CALDESC:${text(f.desc)}`, "REFRESH-INTERVAL;VALUE=DURATION:PT12H", "X-PUBLISHED-TTL:PT12H",
    ...list.flatMap(vevent), "END:VCALENDAR"];
  writeFileSync(`calendar/${file}.ics`, lines.map(fold).join("\r\n") + "\r\n");
  console.log(`calendar/${file}.ics: ${list.length} events`);
}
