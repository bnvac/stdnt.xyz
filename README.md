<div align="center">

<img src=".github/banner.svg" alt="stdnt.xyz - free stuff for students" width="100%" />

<h1>🎓 stdnt.xyz</h1>

### Every free thing you can get as a student - in one fast, searchable page.

Tools · **free LLM API keys** · student perks · **120+ scholarships** · **180+ STEM programs**

<sub>In partnership with <a href="https://allthesame.org/">All The Same Organization</a></sub>

<p>
  <a href="#-quick-start"><img alt="Quick start" src="https://img.shields.io/badge/get_started-2_min-4f7cff?style=for-the-badge"></a>
  <img alt="No build step" src="https://img.shields.io/badge/build_step-none-10b981?style=for-the-badge">
  <img alt="Runtime dependencies" src="https://img.shields.io/badge/runtime_dependencies-0-8b5cf6?style=for-the-badge">
</p>

<p>
  <img alt="HTML" src="https://img.shields.io/badge/HTML-vanilla-e34f26?logo=html5&logoColor=white">
  <img alt="CSS" src="https://img.shields.io/badge/CSS-no_framework-1572b6?logo=css3&logoColor=white">
  <img alt="JS" src="https://img.shields.io/badge/JS-vanilla-f7df1e?logo=javascript&logoColor=black">
  <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue">
</p>

<sub>⭐ Star it · 🔁 share it · 🛠️ PR your favourite freebie</sub>

</div>

---

## 🤔 Why this exists

Your `.edu` email (and honestly, just *being online*) unlocks **thousands of dollars** of free software, AI, hosting, scholarships and programs - but it's scattered across a hundred pages, blog posts and Google Sheets that quietly stop being updated.

So this pulls the best of it into **one minimalist site you can actually search**:

- 🎁 **Student packs** - GitHub Student Developer Pack ($200k+), Azure, Notion…
- 🤖 **AI tools** - Copilot, Cursor, Perplexity & Gemini for students
- 🔑 **Free API keys** - Gemini, Groq, Cerebras, OpenRouter, Hugging Face, Hack Club AI & more
- 🚩 **Hack Club** - free hardware, Slack, HCB, Brilliant Premium, CDN…
- 💻 **Dev / cloud / design / productivity** - JetBrains, Vercel, Figma, Microsoft 365…
- 💰 **120+ scholarships** - from full-rides to "describe your zombie-apocalypse escape plan"
- 🔬 **180+ STEM programs** - research, internships & summer programs, filterable by grade

> Built to be the live home for community scholarship/program spreadsheets that
> *"will no longer be updated"* - so nothing good gets lost.

## ✨ Features

| | |
|---|---|
| 🔎 **Instant search** | filter as you type, with live match counts on every tab and shareable `?q=` links (`/` to focus, `Esc` to clear) |
| 🗂️ **13 sections** | Tools · Discounts · Scholarships · STEM Programs · Competitions · Deadlines · For You · Saved · Guides · Templates · Hackathons · Contribute · About |
| ✦ **"For You" quiz** | answer a few questions (income, background, grade…) and get matched to scholarships & programs, all computed on-device |
| ⭐ **Save to list** | star any item to build a personal list (saved on-device) |
| 🎚️ **Smart filters** | segmented access toggle, category/type/grade chips, free-only |
| ↕️ **Sorting** | by amount, **closing soon**, deadline, **top picks**, or **acceptance rate** |
| 📅 **Deadlines** | "closing soon" badges, a month calendar, **.ics** export, and **subscribable feeds** for Google, Apple and Outlook that update themselves |
| 📚 **Guides** | practical how-tos with tips students share on Reddit, each also a standalone page search engines can index |
| 👑 **Editor's choice** | a short, unpaid list of standout tools and programs; see *How we pick* on the About tab |
| 🆕 **New listings** | a New tab and page with everything added in the last six months |
| 🔗 **Shareable matches** | your quiz answers encode into a link you can send to anyone |
| 📤 **Share & export saved** | send your list as a **link**, copy it, download **CSV**, export deadlines as **.ics**, or print |
| 📱 **Installable** | add it to your phone's home screen and it opens like an app |
| ➕ **Submit a resource** | a button opens a prefilled GitHub issue, no coding needed |
| 🏷️ **Real brand logos** | self-hosted from [Simple Icons](https://simpleicons.org) and site favicons, with clean monogram fallbacks |
| 🌗 **Dark / light** | system-aware, remembers your choice |
| 👁️ **Live view counter** | because watching it climb is fun |
| ⚡ **No runtime dependencies** | pure HTML/CSS/JS - loads instantly, deploys anywhere |

## 🚀 Quick start

```bash
git clone https://github.com/bnvac/stdnt.xyz
cd stdnt.xyz
npm run dev        # then open http://localhost:8000
```

The site itself needs no install and no build step: `npm run dev` serves the
`site/` folder the way GitHub Pages does (you can also open `site/index.html`
directly). Run `npm install` once if you want to run the tests.

### Deploy free on GitHub Pages
**Settings → Pages → Source: GitHub Actions.** The *Build and deploy site* workflow
publishes the `site/` folder on every push to `main`.

## 🧩 Project structure

```
stdnt.xyz/
├── site/                    # everything that gets published
│   ├── index.html           # the app: markup + every tab
│   ├── css/                 # styles.css (app), pages.css (static pages)
│   ├── js/
│   │   ├── data.js          # 👈 tools, perks & free APIs
│   │   ├── scholarships.js  # 👈 scholarships
│   │   ├── programs.js      # 👈 STEM programs (+ programs-extra.js)
│   │   ├── competitions.js  # 👈 competitions
│   │   ├── discounts.js     # 👈 student discounts
│   │   ├── finaid.js, guides.js, templates.js, hackathons.js
│   │   ├── shared.js        # formatting helpers shared with the build scripts
│   │   └── app.js           # render, search, filters, saved list, theme
│   ├── assets/, favicon.*   # icons and share images
│   │
│   │   generated by the build, don't edit by hand:
│   ├── guides/ scholarships/ programs/ competitions/ tools/ discounts/ deadlines/ new/
│   ├── 404.html, sitemap.xml    # static pages search engines can index
│   ├── calendar/*.ics           # subscribable deadline feeds
│   ├── logos/ + js/logos.js     # cached logos
│   └── data/                    # hackathons.json (daily), link-status.json (weekly)
├── scripts/                 # build, check and dev tools (see Development)
├── tests/                   # `npm test`
├── docs/                    # newsletter + email reminder setup
└── .github/                 # workflows, issue forms, PR template
```

## 🛠️ Development

| Command | What it does |
|---|---|
| `npm run dev` | serve `site/` at http://localhost:8000 (`PORT=3000` to change) |
| `npm test` | data check + test suite (what CI runs on every push and PR) |
| `npm run check` | just the data check: missing fields, bad URLs, duplicates, unreadable deadlines |
| `npm run build` | refresh hackathons, cache new logos, rebuild the calendar feeds and static pages |
| `npm run build:pages` | rebuild only the feeds and static pages (no network) |
| `npm run check:links` | check every external link (slow; CI does this weekly) |
| `npm run images` | re-render share images and icons (needs Playwright, see the script header) |

Three GitHub workflows keep things running:

- **Checks** runs `npm test` on every push and pull request.
- **Build and deploy site** regenerates the generated files and publishes `site/` to
  Pages on every push to `main`, and daily.
- **Link check** runs weekly. A link counts as dead after failing two weeks in a row: it gets a
  "Link may be down" note on the site and a line in one "Broken links" issue, which closes
  itself once everything passes.

House rules: when you change a file in `site/js/` or `site/css/`, bump the `?v=N` cache
number on every asset in `site/index.html` together. Use plain hyphens rather than em or
en dashes (the data check enforces both).

## ➕ Add a freebie (it's one object)

Open `site/js/data.js` and add to `window.RESOURCES`:

```js
{
  name: "Cool Free Thing",
  url: "https://example.com/",
  category: "apis",        // see window.CATEGORIES
  access: "everyone",      // "student" or "everyone"
  slug: "github",          // a simpleicons.org slug (or omit for a monogram)
  value: "$50 credit",     // optional highlight
  desc: "One honest sentence about what it is.",
  tags: ["llm", "api"],    // optional, helps search
  added: "2026-10-01"      // the day you add it: puts it on the New tab
}
```

Counts, chips, search and the icon all update automatically. Scholarships and programs
follow the same idea in their files. **PRs that add or fix freebies are the whole point -
send them.** 💛

## 🤝 Contributing

Two ways, **both credit you automatically**:

1. **No coding** - open the [Contribute page](https://stdnt.xyz/#contribute)
   or pick a category at [New issue](https://github.com/bnvac/stdnt.xyz/issues/new/choose).
   Each is a short form (tool, scholarship, program, competition, discount, or a
   fix report). Submit it and it becomes a tracked, labelled issue.
2. **A pull request** - every listing is one object in a `site/js/*.js` file (see above).

Full details, data shapes and how contributions are tracked are in
**[CONTRIBUTING.md](CONTRIBUTING.md)**.

## 📧 Newsletter

The site is static, so the weekly email digest hands signups to a third-party
provider (Buttondown / Mailchimp). It's off by default - the on-site
*"This week for you"* digest works regardless. To switch email on, follow
**[docs/NEWSLETTER.md](docs/NEWSLETTER.md)** (it's one variable plus a cache bump).

## 🙏 Credits

- Built in partnership with [All The Same Organization](https://allthesame.org/), a youth-led nonprofit that advances equitable access to essential resources and opportunities.
- Scholarship & STEM-program data adapted from open community spreadsheets.
- Inspired by Richard O.'s MIT Admissions blog, [*"Where the Free Things Are."*](https://mitadmissions.org/blogs/entry/where-the-free-things-are/)
- Brand icons by [Simple Icons](https://simpleicons.org). View counter by [Abacus](https://abacus.jasoncameron.dev).

## ⚖️ A note

This is for *discovering* things you'll genuinely enjoy - **not** a checklist to grind.
Pick a few, go deep, ignore the rest. Offers change, so always confirm on the provider's site.

<div align="center"><sub>MIT licensed · made for students, by students</sub></div>
