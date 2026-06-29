# Contributing to stdnt.xyz

Thank you — keeping this list fresh and growing is the whole point. There are
**two ways** to contribute, and **both credit you** automatically.

## 1. The easy way — fill out a form (no coding)

Go to the **[Contribute page](https://2008wbbv.github.io/edu.edu/#contribute)** on
the site, or open a [new issue](https://github.com/2008wbbv/edu.edu/issues/new/choose)
and pick a category:

| Category | What it's for |
|---|---|
| **Add a tool or perk** | Free software, APIs, apps, student perks |
| **Add a scholarship** | A scholarship, grant, or fellowship |
| **Add a STEM / summer program** | A summer, research, or enrichment program |
| **Add a competition** | An academic competition or olympiad |
| **Add a student discount** | An everyday student deal |
| **Report a problem** | A dead link, wrong deadline, or defunct listing |

Each one is a short structured form. Submit it and it becomes a tracked issue — a
maintainer copies it into the data and merges. **You don't need to touch any code.**

Every form has an optional **logo / screenshot** field — just drag an image into it
(or paste from your clipboard) and GitHub uploads it for you. A logo or a screenshot
of the page is a big help.

## 2. The fast way — open a pull request

Every listing is **one plain object** in a JS file. No build step, no framework.

| File | Holds |
|---|---|
| `js/data.js` | tools, perks & free APIs (`window.RESOURCES`) |
| `js/scholarships.js` | scholarships (`window.SCHOLARSHIPS`) |
| `js/programs.js`, `js/programs-extra.js` | STEM programs |
| `js/competitions.js` | competitions |
| `js/discounts.js` | student discounts |
| `js/roadmaps.js` | goal roadmaps & the college checklist |

Example — add a tool in `js/data.js`:

```js
{
  name: "Cool Free Thing",
  url: "https://example.com/",
  category: "apis",        // see window.CATEGORIES
  access: "everyone",      // "student" or "everyone"
  slug: "github",          // a simpleicons.org slug (or omit for a monogram)
  logo: "https://...",     // optional: a logo image URL (e.g. one a contributor
                           //   dropped into the form). Shown contained on a white
                           //   tile — square-ish logos look best. Wins over slug/favicon.
  value: "$50 credit",     // optional highlight
  desc: "One honest sentence about what it is.",
  tags: ["llm", "api"],    // optional, helps search
  verified: "2026-06"      // optional: YYYY-MM you last confirmed it
}
```

Counts, chips, search, logos and deadlines all update automatically.

### Run it locally

```bash
git clone https://github.com/2008wbbv/edu.edu
cd edu.edu
python3 -m http.server 8000   # open http://localhost:8000
```

…or just open `index.html`. When you change a `js/*.js` or `css` file, bump the
`?v=N` cache number in `index.html` (search-and-replace `?v=NN`).

## How contributions are tracked

Everything runs through GitHub, so credit is automatic:

- **Issue forms** are authored by *you* and labelled by category
  (`contribution`, `tool`, `scholarship`, …). Filter them any time:
  [`label:contribution`](https://github.com/2008wbbv/edu.edu/issues?q=is%3Aissue+label%3Acontribution).
- **Pull requests** show up in the repo's
  [contributors graph](https://github.com/2008wbbv/edu.edu/graphs/contributors)
  and on your GitHub profile.

## What belongs here

- **Free** (or free-for-students) things that are **real and currently live**.
- Official links — not aggregators, referral links, or affiliate wrappers.
- No piracy / paywall-bypass / "shadow library" sites. Open-access and legal
  free alternatives only.

When in doubt, open it anyway and we'll talk it through. 💛
