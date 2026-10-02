#!/usr/bin/env node
/*
 * build-pages.mjs - writes crawlable static pages next to the single-page app,
 * so search engines can index each guide and each directory section:
 *
 *   guides/                 all guides        guides/<slug>/   one per guide
 *   scholarships/  programs/  competitions/  clubs/  tools/  discounts/  deadlines/  new/
 *   sitemap.xml             every page above
 *   404.html                the "page not found" page (not in the sitemap)
 *
 *   node scripts/build-pages.mjs
 *
 * Pages reuse css/styles.css (+ css/pages.css) and the cached logos, link
 * back into the app for filtering, and are rebuilt by
 * .github/workflows/site-build.yml whenever the data changes (and daily, so
 * the deadlines page stays current).
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { loadData, deadlineDates, gone, esc, domainOf, SITE, SITE_DIR } from "./lib/data.mjs";

process.chdir(SITE_DIR);

const W = loadData();
const V = (readFileSync("index.html", "utf8").match(/styles\.css\?v=(\d+)/) || [, "1"])[1];   // same cache version as the app
let LOGOS = { d: {}, si: {} };
try { LOGOS = JSON.parse(readFileSync("js/logos.js", "utf8").match(/window\.LOGOS = (.*);/)[1]); } catch {}
const today = new Date();
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ---- small helpers ------------------------------------------------------
const hue = (s) => { let n = 0; s = s || "?"; for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) % 360; return n; };
function tile(name, url, slug) {
  // an <img>, not the app's CSS mask: a relative url() in a custom property would resolve against css/
  if (slug && LOGOS.si[slug]) return `<span class="logo-ico" style="--h:${hue(name)}" aria-hidden="true"><img class="logo-img" src="logos/si/${esc(slug)}.svg" alt="" width="38" height="38" loading="lazy" /></span>`;
  const d = domainOf(url), letter = esc((name || "?").trim().charAt(0).toUpperCase());
  const ext = d && LOGOS.d[d] ? (LOGOS.d[d] === 1 ? "png" : LOGOS.d[d]) : "";
  const img = ext ? `<img class="logo-img" src="logos/${esc(d)}.${ext}" alt="" width="38" height="38" loading="lazy" />` : "";
  return `<span class="logo-ico" style="--h:${hue(name)}" aria-hidden="true">${letter}${img}</span>`;
}
const out = (href, text) => `<a href="${esc(href)}" target="_blank" rel="noopener">${text}</a>`;
const words = (html) => html.replace(/<[^>]+>/g, " ").replace(/&[#\w]+;/g, " ").split(/\s+/).filter(Boolean).length;
const minutes = (html) => Math.max(1, Math.round(words(html) / 220));
const { selectivity, whenText } = W.SHARED;   // js/shared.js, the same wording the app uses
const GRADE = { Freshman: 9, Sophomore: 10, Junior: 11, Senior: 12 };
function grades(list) {
  const n = (list || []).map((g) => GRADE[g]).filter(Boolean).sort((a, b) => a - b);
  if (!n.length) return "";
  return n.length === 1 ? `Grade ${n[0]}` : n[n.length - 1] - n[0] === n.length - 1 ? `Grades ${n[0]}-${n[n.length - 1]}` : `Grades ${n.join(", ")}`;
}
const chips = (arr) => arr.filter(Boolean).map((t) => `<span class="tg">${esc(t)}</span>`).join("");
const CROWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/></svg>';
const pick = (on) => (on ? ` <span class="ed-pick" title="Editor's choice">${CROWN}Editor's choice</span>` : "");

// ---- page shell ---------------------------------------------------------
const NAV = [["tools/", "Tools"], ["scholarships/", "Scholarships"], ["programs/", "STEM programs"], ["competitions/", "Competitions"], ["clubs/", "Clubs"], ["deadlines/", "Deadlines"], ["guides/", "Guides"]];
function page({ path, title, desc, h1, lead, crumbs = [], body, schema = [], image = "og.png", type = "website", cta, notFound = false }) {
  const depth = path.split("/").filter(Boolean).length;
  // relative to <base>; the 404 page writes them from script (see below)
  const assets = [`<link rel="icon" href="favicon.ico" sizes="32x32" />`, `<link rel="icon" href="favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="apple-touch-icon.png" />`, `<link rel="manifest" href="site.webmanifest" />`,
    `<link rel="stylesheet" href="css/styles.css?v=${V}" />`, `<link rel="stylesheet" href="css/pages.css?v=${V}" />`];
  const url = `${SITE}/${path}`;
  const crumb = [["", "Home"], ...crumbs];
  const ld = [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumb.map(([p, n], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: `${SITE}/${p}` })) }, ...schema];
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
${notFound ? `  <meta name="robots" content="noindex" />
  <!-- served at whatever path was requested, so find the site root at runtime
       (/<repo>/ on github.io, / on the custom domain or the local dev server)
       and write the relative links after it, where the preload scanner can't
       fetch them against the wrong path first -->
  <script>(function(){var p=location.pathname.split("/"),b=/\\.github\\.io$/.test(location.hostname)&&p[1]?"/"+p[1]+"/":"/";document.write('<base href="'+b+'" />'+${JSON.stringify(assets.join(""))})})()</script>` : `  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="stdnt.xyz" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${SITE}/${image}" />
  <base href="${"../".repeat(depth) || "./"}" />
  ${assets.slice(0, 4).join("\n  ")}`}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet" />
${notFound ? "" : `  ${assets.slice(4).join("\n  ")}\n`}  <script>try{document.documentElement.setAttribute("data-theme",localStorage.getItem("edu-theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"))}catch(e){}</script>
${notFound ? "" : `  <script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : ld).replace(/</g, "\\u003c")}</script>
`}</head>
<body class="sp">
  <header class="sp-hdr">
    <div class="sp-hdr-inner">
      <a class="brand" href="./"><span class="brand-name">stdnt<span class="brand-dim">.xyz</span></span></a>
      <nav class="sp-nav" aria-label="Sections">${NAV.map(([h, n]) => `<a href="${h}"${h === path ? ' aria-current="page"' : ""}>${n}</a>`).join("")}</nav>
    </div>
  </header>
  <main class="sp-main">
    ${crumbs.length ? `<nav class="sp-crumbs" aria-label="Breadcrumb">${crumb.map(([p, n], i) => i === crumb.length - 1 ? `<span>${esc(n)}</span>` : `<a href="${p || "./"}">${esc(n)}</a>`).join('<span aria-hidden="true">/</span>')}</nav>` : ""}
    <h1 class="sp-h1">${esc(h1)}</h1>
    ${lead ? `<p class="sp-lead">${lead}</p>` : ""}
    ${body}
    ${cta ? `<a class="sp-cta" href="${cta[0]}"><span>${cta[1]}</span> <span aria-hidden="true">&rarr;</span></a>` : ""}
  </main>
  <footer class="sp-ftr">
    <nav aria-label="Browse">${NAV.concat([["discounts/", "Discounts"], ["new/", "New"]]).map(([h, n]) => `<a href="${h}">${n}</a>`).join("")}</nav>
    <p>stdnt.xyz is a free, open-source directory of what students can get for free, built in partnership with <a href="https://allthesame.org/" target="_blank" rel="noopener">All The Same Organization</a>.</p>
    <p><a href="./#about">How we pick</a> &middot; <a href="https://github.com/bnvac/stdnt.xyz" target="_blank" rel="noopener">GitHub</a></p>
  </footer>
  <script>document.addEventListener("click",function(e){var b=e.target.closest("[data-copy]");if(!b)return;var p=b.parentNode.querySelector("pre");if(p&&navigator.clipboard){navigator.clipboard.writeText(p.innerText);b.textContent="Copied!";setTimeout(function(){b.textContent="Copy"},1500)}});</script>
</body>
</html>
`;
}
const itemList = (name, arr) => ({ "@context": "https://schema.org", "@type": "ItemList", name, numberOfItems: arr.length,
  itemListElement: arr.slice(0, 100).map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, ...(x.url ? { url: x.url } : {}) })) });
const collection = (path, name, desc) => ({ "@context": "https://schema.org", "@type": "CollectionPage", name, description: desc, url: `${SITE}/${path}`, isPartOf: { "@type": "WebSite", name: "stdnt.xyz", url: `${SITE}/` } });
function save(path, html) { mkdirSync(path, { recursive: true }); writeFileSync(path + "index.html", html); }
const row = (lead, main, side) => `<li class="sp-row">${lead}<div class="sp-row-main">${main}</div>${side ? `<div class="sp-row-side">${side}</div>` : ""}</li>`;
const section = (id, title, blurb, items) => items.length ? `<section class="sp-sec" id="${id}"><h2>${esc(title)} <span class="sp-n">${items.length}</span></h2>${blurb ? `<p class="sp-sec-blurb">${esc(blurb)}</p>` : ""}<ul class="sp-list">${items.join("")}</ul></section>` : "";
const toc = (secs) => `<nav class="sp-toc" aria-label="On this page">${secs.filter((s) => s[2]).map(([id, t, n]) => `<a href="${esc(sectionHref(id))}">${esc(t)} <span>${n}</span></a>`).join("")}</nav>`;
let CURRENT = "";
const sectionHref = (id) => `${CURRENT}#${id}`;   // <base> points at the site root, so anchors carry the page path
const pages = [];

// ---- guides ---------------------------------------------------------------
const GUIDES = W.GUIDES || [];
const guideBody = (html) => html.replace(/href="#guide\/([\w-]+)"/g, 'href="guides/$1/"').replace(/href="#guides"/g, 'href="guides/"');
for (const g of GUIDES) {
  const path = `guides/${g.slug}/`, img = existsSync(`${path}og.png`) ? `${path}og.png` : "og.png";
  const mins = minutes(g.body);
  save(path, page({ path, type: "article", image: img,
    title: `${g.title} (${mins} min guide) | stdnt.xyz`, desc: g.blurb, h1: g.title,
    lead: `<span class="guide-mins">${mins} min read</span> ${chips(g.tags || [])}`,
    crumbs: [["guides/", "Guides"], [path, g.title]],
    body: `<article class="guide-rbody sp-guide">${guideBody(g.body)}</article>` +
      `<aside class="sp-more"><h2>More guides</h2><ul>${GUIDES.filter((x) => x !== g).map((x) => `<li><a href="guides/${x.slug}/">${esc(x.title)}</a></li>`).join("")}</ul></aside>`,
    schema: [{ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.blurb, image: `${SITE}/${img}`, url: `${SITE}/${path}`,
      author: { "@type": "Organization", name: "stdnt.xyz", url: `${SITE}/` }, publisher: { "@type": "Organization", name: "stdnt.xyz", url: `${SITE}/` },
      mainEntityOfPage: `${SITE}/${path}`, keywords: (g.tags || []).join(", "), timeRequired: `PT${mins}M` }],
    cta: ["./#guides", "Browse all the free stuff these guides point to"] }));
  pages.push(path);
}
save("guides/", page({ path: "guides/", title: "Free guides for students: scholarships, research, SAT and college apps | stdnt.xyz",
  desc: "Short, practical guides for students: cold-email a professor for research, win scholarships, ace the SAT and ACT, write your college essay, get financial aid and more.",
  h1: "Guides", lead: "Short, practical how-tos, each with tips students keep sharing on Reddit.", crumbs: [["guides/", "Guides"]],
  body: `<ul class="sp-guides">${GUIDES.map((g) => `<li><a class="sp-guide-card" href="guides/${g.slug}/"><b>${esc(g.title)}</b><span>${esc(g.blurb)}</span><em>${minutes(g.body)} min read</em></a></li>`).join("")}</ul>`,
  schema: [collection("guides/", "Guides", "Practical guides for students"), itemList("Guides", GUIDES.map((g) => ({ name: g.title, url: `${SITE}/guides/${g.slug}/` })))] }));
pages.push("guides/");

// ---- scholarships ---------------------------------------------------------
{
  CURRENT = "scholarships/";
  const SCH = (W.SCHOLARSHIPS || []).filter((s) => !gone(s));
  const GROUPS = [["big", "Big money", "Full rides and five-figure awards."], ["essay", "Essay scholarships", "Write once, reuse often: most prompts overlap."],
    ["creative", "Creative and contest scholarships", "Art, writing, video and project contests."], ["general", "More scholarships", "Niche, local-style and identity-based awards with smaller pools."],
    ["noessay", "No-essay scholarships", "Quick entries with lottery-style odds: use a separate email."]];
  const r = (s) => row(tile(s.name, s.url), `<h3>${out(s.url, esc(s.name))}</h3>${s.note ? `<p>${esc(s.note)}</p>` : ""}<div class="row-tags">${chips([s.level, ...(s.tags || [])])}</div>`,
    `<b class="sp-amt">${esc(s.amountText || "Varies")}</b><span>${esc(s.deadline || "Rolling")}</span>`);
  const secs = GROUPS.map(([id, t, b]) => [id, t, SCH.filter((s) => (s.group || "general") === id).sort((a, b2) => (b2.amount || 0) - (a.amount || 0)), b]);
  const desc = `${SCH.length} scholarships for high school and college students, from full rides to no-essay awards, with amounts, eligibility and deadlines. Free, updated weekly.`;
  save("scholarships/", page({ path: "scholarships/", title: `${SCH.length} scholarships for high school and college students | stdnt.xyz`, desc,
    h1: "Scholarships for high school and college students", lead: `${SCH.length} legit scholarships with their amounts, who can apply and deadlines. Never pay to apply for a scholarship.`,
    crumbs: [["scholarships/", "Scholarships"]], body: toc(secs.map(([id, t, a]) => [id, t, a.length])) + secs.map(([id, t, a, b]) => section(id, t, b, a.map(r))).join(""),
    schema: [collection("scholarships/", "Scholarships", desc), itemList("Scholarships", SCH)], cta: ["./#sch", "Filter by what you qualify for"] }));
  pages.push("scholarships/");
}

// ---- programs ---------------------------------------------------------------
{
  CURRENT = "programs/";
  const RANK = { "S++": 0, "S+": 1, "S": 2, "S-": 3, "A+": 4, "A": 5, "A-": 6, "B+": 7, "B": 8, "B-": 9, "C+": 10, "C": 11, "C-": 12 };
  const PROG = (W.PROGRAMS || []).filter((p) => !gone(p) && p.url).sort((a, b) => ((RANK[a.ranking] ?? 50) - (RANK[b.ranking] ?? 50)) || a.name.localeCompare(b.name));
  const top = PROG.filter((p) => /^S/.test(p.ranking || "")), rest = PROG.filter((p) => !/^S/.test(p.ranking || ""));
  const free = (p) => p.free || /free|fully funded/i.test(p.cost || "");
  const whenLine = (when) => { const w = whenText(when); return w.text ? `<p class="sp-when"${w.past ? ` title="${esc(`Past session: ${w.past}. This year's dates may shift a little.`)}"` : ""}>${esc(w.text)}</p>` : ""; };
  const r = (p) => row(tile(p.name, p.url), `<h3>${out(p.url, esc(p.name))}${pick(/^S/.test(p.ranking || ""))}</h3>${p.details ? `<p>${esc(p.details)}</p>` : ""}${whenLine(p.when)}<div class="row-tags">${chips([selectivity(p), grades(p.grades), ...(p.subjects || []).slice(0, 3)])}</div>`,
    `<b class="sp-amt">${free(p) ? "Free" : esc((p.cost || "").split("(")[0].trim().slice(0, 18))}</b><span>${esc(p.deadline || "Rolling")}</span>`);
  const desc = `${PROG.length} STEM summer programs, research internships and camps for high school students, with selectivity, grades, cost and deadlines. Many are free or paid.`;
  const secs = [["editors-choice", "Editor's choice", top, "The standouts: highly selective, strong mentorship, usually free or funded."], ["all-programs", "More programs", rest, ""]];
  save("programs/", page({ path: "programs/", title: `${PROG.length} free and selective STEM summer programs for high school students | stdnt.xyz`, desc,
    h1: "STEM summer programs for high school students", lead: `${PROG.length} research programs, internships and camps. Many are free, and some pay a stipend.`,
    crumbs: [["programs/", "STEM programs"]], body: toc(secs.map(([id, t, a]) => [id, t, a.length])) + secs.map(([id, t, a, b]) => section(id, t, b, a.map(r))).join(""),
    schema: [collection("programs/", "STEM programs", desc), itemList("STEM programs", PROG)], cta: ["./#prog", "Filter programs by grade, subject and cost"] }));
  pages.push("programs/");
}

// ---- competitions ---------------------------------------------------------------
{
  CURRENT = "competitions/";
  const COMPS = W.COMPETITIONS || [];
  const CATS = [["science", "Science"], ["math", "Math"], ["cs", "Computer science"], ["research", "Research"], ["innovation", "Innovation"], ["humanities", "Humanities"], ["robotics", "Robotics"]];
  const r = (c) => row(tile(c.name, c.url), `<h3>${out(c.url, esc(c.name))}</h3>${c.desc ? `<p>${esc(c.desc)}</p>` : ""}<div class="row-tags">${chips([c.grades ? `Grades ${c.grades}` : "", c.format])}</div>`,
    `<span>${esc(c.deadline || "Varies")}</span>`);
  const secs = CATS.map(([id, t]) => [id, t, COMPS.filter((c) => c.category === id)]);
  const desc = `${COMPS.length} academic competitions and olympiads for high school students (science, math, computer science, research and more) with grades and deadlines.`;
  save("competitions/", page({ path: "competitions/", title: `${COMPS.length} academic competitions for high school students | stdnt.xyz`, desc,
    h1: "Academic competitions for high school students", lead: "The most beginner-friendly way to find what you love. No team at your school? Start one.",
    crumbs: [["competitions/", "Competitions"]], body: toc(secs.map(([id, t, a]) => [id, t, a.length])) + secs.map(([id, t, a]) => section(id, t, "", a.map(r))).join(""),
    schema: [collection("competitions/", "Competitions", desc), itemList("Competitions", COMPS)], cta: ["./#competitions", "See competitions in the app"] }));
  pages.push("competitions/");
}

// ---- clubs & volunteering ------------------------------------------------------
{
  CURRENT = "clubs/";
  const CLUBS = W.CLUBS || [], CATS = W.CLUB_CATS || [];
  const r = (c) => row(tile(c.name, c.url), `<h3>${out(c.url, esc(c.name))}</h3>${c.desc ? `<p>${esc(c.desc)}</p>` : ""}${c.needs ? `<p class="sp-when">${esc(c.needs)}</p>` : ""}<div class="row-tags">${chips([c.who, c.cost])}</div>`, "");
  const secs = CATS.map((c) => [c.id, c.name, CLUBS.filter((x) => x.category === c.id)]);
  const desc = `${CLUBS.length} clubs you can start a chapter of at your school (DECA, FBLA, HOSA, Key Club and more) and places to volunteer in person or online, with who can join and what it takes.`;
  save("clubs/", page({ path: "clubs/", title: "Clubs to start at your school and places to volunteer | stdnt.xyz", desc,
    h1: "Clubs and volunteering for students", lead: "Start a chapter of a national club at your school, or volunteer in person or online. Rules and dues vary by state, so check each official page.",
    crumbs: [["clubs/", "Clubs & volunteering"]], body: toc(secs.map(([id, t, a]) => [id, t, a.length])) + secs.map(([id, t, a]) => section(id, t, "", a.map(r))).join(""),
    schema: [collection("clubs/", "Clubs and volunteering", desc), itemList("Clubs and volunteering", CLUBS)], cta: ["./#clubs", "See clubs and volunteering in the app"] }));
  pages.push("clubs/");
}

// ---- tools ---------------------------------------------------------------
{
  CURRENT = "tools/";
  const RES = W.RESOURCES || [], CATS = W.CATEGORIES || [];
  const r = (t) => row(tile(t.name, t.url, t.slug), `<h3>${out(t.url, esc(t.name))}${pick(t.featured)}</h3><p>${esc(t.desc || "")}</p><div class="row-tags">${chips([t.access === "student" ? "Students" : "Everyone", t.value])}</div>`, "");
  const secs = CATS.map((c) => [c.id, c.name, RES.filter((t) => t.category === c.id).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name)), c.blurb]);
  const desc = `${RES.length} free tools, perks and API keys for students: GitHub Student Pack, free AI tools, cloud credits, design and productivity software, and more.`;
  save("tools/", page({ path: "tools/", title: `${RES.length} free tools and perks for students (GitHub Student Pack, AI, APIs) | stdnt.xyz`, desc,
    h1: "Free tools and perks for students", lead: "Software, AI tools, API keys and cloud credits that are free for everyone or for students.",
    crumbs: [["tools/", "Tools"]], body: toc(secs.map(([id, t, a]) => [id, t, a.length])) + secs.map(([id, t, a, b]) => section(id, t, b, a.map(r))).join(""),
    schema: [collection("tools/", "Free tools and perks", desc), itemList("Free tools for students", RES)], cta: ["./#tools", "Search and filter every tool"] }));
  pages.push("tools/");
}

// ---- discounts ---------------------------------------------------------------
{
  CURRENT = "discounts/";
  const D = W.DISCOUNTS || [];
  const r = (t) => row(tile(t.name, t.url, t.slug), `<h3>${out(t.url, esc(t.name))}</h3><p>${esc(t.desc || "")}</p><div class="row-tags">${chips([t.value])}</div>`, "");
  const desc = `${D.length} everyday student discounts on software, streaming, shopping and travel, with how to verify.`;
  save("discounts/", page({ path: "discounts/", title: `${D.length} student discounts worth knowing | stdnt.xyz`, desc,
    h1: "Student discounts", lead: "Everyday deals that unlock with a school email or a quick verification.", crumbs: [["discounts/", "Discounts"]],
    body: `<ul class="sp-list">${D.map(r).join("")}</ul>`, schema: [collection("discounts/", "Student discounts", desc), itemList("Student discounts", D)], cta: ["./#discounts", "Open discounts in the app"] }));
  pages.push("discounts/");
}

// ---- deadlines (next 120 days, rebuilt daily) --------------------------------
{
  CURRENT = "deadlines/";
  const items = [];
  const add = (kind, x) => { if (kind !== "Financial aid" && gone(x)) return; const d = deadlineDates(x.deadline, today)[0]; if (d && (d.date - today) / 864e5 <= 120) items.push({ kind, x, ...d }); };
  (W.SCHOLARSHIPS || []).forEach((s) => add("Scholarship", s));
  (W.PROGRAMS || []).forEach((p) => p.url && add("Program", p));
  (W.COMPETITIONS || []).forEach((c) => add("Competition", c));
  (W.FINAID || []).forEach((a) => add("Financial aid", a));
  items.sort((a, b) => a.date - b.date || a.x.name.localeCompare(b.x.name));
  const byMonth = {};
  items.forEach((it) => { const k = `${MONTH[it.date.getMonth()]} ${it.date.getFullYear()}`; (byMonth[k] = byMonth[k] || []).push(it); });
  const r = (it) => row(`<span class="sp-date"><b>${it.exact ? it.date.getDate() : "~"}</b>${MON[it.date.getMonth()]}</span>`,
    `<h3>${out(it.x.url, esc(it.x.name))}</h3><div class="row-tags">${chips([it.kind, it.x.amountText || "", it.exact ? "" : `Sometime in ${MONTH[it.date.getMonth()]}`])}</div>`, "");
  const desc = `Upcoming scholarship, STEM program, competition and financial-aid deadlines for students, updated daily, plus a calendar feed you can subscribe to.`;
  save("deadlines/", page({ path: "deadlines/", title: "Upcoming scholarship and program deadlines (updated daily) | stdnt.xyz", desc,
    h1: "Upcoming deadlines", lead: `The next four months of deadlines. <a href="calendar/all.ics">Subscribe to the calendar feed</a> and they'll show up in your calendar automatically.`,
    crumbs: [["deadlines/", "Deadlines"]], body: Object.entries(byMonth).map(([m, list]) => section(m.toLowerCase().replace(/\s+/g, "-"), m, "", list.map(r))).join("") || "<p>No deadlines in the next four months.</p>",
    schema: [collection("deadlines/", "Upcoming deadlines", desc)], cta: ["./#deadlines", "See every deadline and add them to your calendar"] }));
  pages.push("deadlines/");
}

// ---- new listings (anything carrying added: "YYYY-MM-DD" in the last 180 days) ----
{
  CURRENT = "new/";
  const KIND = { tool: "Tool", sch: "Scholarship", prog: "Program", comp: "Competition", club: "Club" };
  const cutoff = today.getTime() - 180 * 864e5, items = [];
  const add = (kind, list) => (list || []).forEach((x) => { if (x.added && Date.parse(x.added) >= cutoff) items.push({ kind, x }); });
  add("tool", [...(W.RESOURCES || []), ...(W.DISCOUNTS || [])]); add("sch", W.SCHOLARSHIPS); add("prog", W.PROGRAMS); add("comp", W.COMPETITIONS); add("club", W.CLUBS);
  items.sort((a, b) => b.x.added.localeCompare(a.x.added) || a.x.name.localeCompare(b.x.name));
  const byMonth = {};
  items.forEach((it) => { const k = `${MONTH[+it.x.added.slice(5, 7) - 1]} ${it.x.added.slice(0, 4)}`; (byMonth[k] = byMonth[k] || []).push(it); });
  const r = ({ kind, x }) => row(tile(x.name, x.url, x.slug),
    `<h3>${out(x.url, esc(x.name))}</h3>${x.desc || x.details || x.note ? `<p>${esc(x.desc || x.details || x.note)}</p>` : ""}<div class="row-tags">${chips([KIND[kind], x.amountText || x.value || x.who || ""])}</div>`,
    `<span>Added ${MON[+x.added.slice(5, 7) - 1]} ${+x.added.slice(8, 10)}</span>`);
  const desc = "The newest free tools, scholarships and STEM programs added to stdnt.xyz, newest first.";
  save("new/", page({ path: "new/", title: "New free tools, scholarships and STEM programs for students | stdnt.xyz", desc,
    h1: "New on stdnt.xyz", lead: `${items.length} listing${items.length === 1 ? "" : "s"} added in the last six months, newest first.`,
    crumbs: [["new/", "New"]], body: Object.entries(byMonth).map(([m, list]) => section(m.toLowerCase().replace(/\s+/g, "-"), m, "", list.map(r))).join("") || "<p>Nothing new in the last six months.</p>",
    schema: [collection("new/", "New listings", desc), itemList("New listings", items.map((it) => it.x))], cta: ["./#new", "See new listings in the app"] }));
  pages.push("new/");
}

// ---- 404 (GitHub Pages serves 404.html for any missing path; not in the sitemap) ----
{
  CURRENT = "";
  const links = NAV.concat([["discounts/", "Discounts"]]).map(([h, n]) => `<a href="${h}">${n}</a>`).join("");
  writeFileSync("404.html", page({ path: "404.html", notFound: true, title: "Page not found | stdnt.xyz",
    desc: "This page doesn't exist. Search stdnt.xyz for free tools, scholarships, STEM programs and deadlines.",
    h1: "Page not found", lead: "That link is broken or the page has moved. Try searching for what you were after:",
    body: `<form class="sp-search" action="./" method="get" role="search">
      <input type="search" name="q" id="q404" placeholder="Scholarships, programs, tools..." aria-label="Search stdnt.xyz" />
      <button type="submit">Search</button>
    </form>
    <p class="sp-sec-blurb">Or browse a section:</p>
    <nav class="sp-toc" aria-label="Sections">${links}</nav>
    <script>(function(){var i=document.getElementById("q404"),s=location.pathname.split("/").filter(Boolean).pop()||"";try{s=decodeURIComponent(s)}catch(e){}s=s.replace(/\.html?$/,"").replace(/[-_+]+/g," ").trim();if(i&&s&&!/^stdnt\.xyz$/.test(s))i.value=s})()</script>`,
    cta: ["./", "Go to the homepage"] }));
  console.log("wrote 404.html");
}

// ---- sitemap ---------------------------------------------------------------
const urls = ["", ...pages.filter((p) => !p.startsWith("guides/") || p === "guides/"), ...pages.filter((p) => p.startsWith("guides/") && p !== "guides/")];
writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((p) => `  <url><loc>${SITE}/${p}</loc><changefreq>${p === "deadlines/" || p === "" ? "daily" : "weekly"}</changefreq><priority>${p === "" ? "1.0" : p.split("/").length > 2 ? "0.7" : "0.8"}</priority></url>`).join("\n") + "\n</urlset>\n");
console.log(`pages: ${pages.length} + sitemap.xml (${urls.length} URLs)`);
