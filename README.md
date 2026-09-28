<div align="center">

<a href="https://bnvac.github.io/stdnt.xyz/"><img src=".github/banner.svg" alt="stdnt.xyz: where students get free stuff. 190+ free tools, 120+ scholarships and 180+ STEM programs." width="100%" /></a>

### Every free thing you can get as a student - in one fast, searchable page.

Tools · **free LLM API keys** · student perks · **120+ scholarships** · **180+ STEM programs**

<p>
  <a href="https://bnvac.github.io/stdnt.xyz/"><img alt="Open the site" src="https://img.shields.io/badge/open_the_site-stdnt.xyz-4f7cff?style=for-the-badge"></a>
  <a href="https://github.com/bnvac/stdnt.xyz/issues/new/choose"><img alt="Add a freebie" src="https://img.shields.io/badge/add_a_freebie-no_coding-8b5cf6?style=for-the-badge"></a>
</p>

<p>
  <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue">
</p>

<sub>In partnership with <a href="https://allthesame.org/">All The Same Organization</a></sub><br>
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
| 🗂️ **14 sections** | Tools · Discounts · Scholarships · STEM Programs · Competitions · Deadlines · New · For You · Saved · Guides · Templates · Hackathons · Contribute · About |
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
| ⚡ **Lightweight** | no sign-up, no ads, nothing to install: it loads instantly on any device |

## 🤝 Contributing

Two ways, **both credit you automatically**:

1. **No coding** - open the [Contribute page](https://bnvac.github.io/stdnt.xyz/#contribute)
   or pick a category at [New issue](https://github.com/bnvac/stdnt.xyz/issues/new/choose).
   Each is a short form (tool, scholarship, program, competition, discount, or a
   fix report). Submit it and it becomes a tracked, labelled issue.
2. **A pull request** - every listing is one object in a `site/js/*.js` file. A new
   tool goes in `window.RESOURCES` in `site/js/data.js`:

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
send them.** 💛 Every data shape and the checklist before you open a PR are in
**[CONTRIBUTING.md](CONTRIBUTING.md)**.

## 🛠️ Run it locally

```bash
git clone https://github.com/bnvac/stdnt.xyz
cd stdnt.xyz
npm run dev        # then open http://localhost:8000
```

Nothing to install and no build step. Tests, scripts, the project layout and
deploying are in **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)**.

## 🙏 Credits

- Built in partnership with [All The Same Organization](https://allthesame.org/), a youth-led nonprofit that advances equitable access to essential resources and opportunities.
- Scholarship & STEM-program data adapted from open community spreadsheets.
- Inspired by Richard O.'s MIT Admissions blog, [*"Where the Free Things Are."*](https://mitadmissions.org/blogs/entry/where-the-free-things-are/)
- Brand icons by [Simple Icons](https://simpleicons.org). View counter by [Abacus](https://abacus.jasoncameron.dev).

## ⚖️ A note

This is for *discovering* things you'll genuinely enjoy - **not** a checklist to grind.
Pick a few, go deep, ignore the rest. Offers change, so always confirm on the provider's site.

<div align="center"><sub>MIT licensed · made for students, by students</sub></div>
