# Contributing to stdnt.xyz

Thank you - keeping this list fresh and growing is the whole point. stdnt.xyz is
built in partnership with [All The Same Organization](https://allthesame.org/).
There are **two ways** to contribute, and **both credit you** automatically.

## 1. The easy way - fill out a form (no coding)

Go to the **[Contribute page](https://stdnt.xyz/#contribute)** on
the site, or open a [new issue](https://github.com/bnvac/stdnt.xyz/issues/new/choose)
and pick a category:

| Category | What it's for |
|---|---|
| **Add a tool or perk** | Free software, APIs, apps, student perks |
| **Add a scholarship** | A scholarship, grant, or fellowship |
| **Add a STEM / summer program** | A summer, research, or enrichment program |
| **Add a competition** | An academic competition or olympiad |
| **Add a student discount** | An everyday student deal |
| **Report a problem** | A dead link, wrong deadline, or defunct listing |

Each one is a short structured form. Submit it and it becomes a tracked issue - a
maintainer copies it into the data and merges. **You don't need to touch any code.**

Every form has an optional **logo / screenshot** field - just drag an image into it
(or paste from your clipboard) and GitHub uploads it for you. A logo or a screenshot
of the page is a big help.

## 2. The fast way - open a pull request

Every listing is **one plain object** in a JS file. No build step, no framework.

| File | Holds |
|---|---|
| `js/data.js` | tools, perks & free APIs (`window.RESOURCES`) |
| `js/scholarships.js` | scholarships (`window.SCHOLARSHIPS`) |
| `js/programs.js`, `js/programs-extra.js` | STEM programs |
| `js/competitions.js` | competitions |
| `js/discounts.js` | student discounts |
| `js/finaid.js` | FAFSA / CSS Profile / state financial-aid dates |
| `js/guides.js`, `js/templates.js` | the how-to guides and spreadsheet templates |

Example - add a tool in `js/data.js`:

```js
{
  name: "Cool Free Thing",
  url: "https://example.com/",
  category: "apis",        // see window.CATEGORIES
  access: "everyone",      // "student" or "everyone"
  slug: "github",          // a simpleicons.org slug (or omit for a monogram)
  logo: "https://...",     // optional: a logo image URL (e.g. one a contributor
                           //   dropped into the form). Shown contained on a white
                           //   tile - square-ish logos look best. Wins over slug/favicon.
  value: "$50 credit",     // optional highlight
  desc: "One honest sentence about what it is.",
  tags: ["llm", "api"],    // optional, helps search
  verified: "2026-06"      // optional: YYYY-MM you last confirmed it
}
```

Counts, chips, search, logos and deadlines all update automatically.

**Generated files - don't edit by hand.** The *Build site* workflow rebuilds these
from the data files whenever data changes on `main` (and daily): the crawlable pages
in `guides/`, `scholarships/`, `programs/`, `competitions/`, `tools/`, `discounts/`,
`deadlines/`, plus `404.html` and `sitemap.xml`; the calendar feeds in `calendar/`;
the cached logos in `logos/` + `js/logos.js`; and `data/hackathons.json`. You don't
need to rebuild them in a pull request. Share images and icons are the exception:
re-render them with `npm run images` after adding a guide or changing `favicon.svg`.

### Run it locally

```bash
git clone https://github.com/bnvac/stdnt.xyz
cd stdnt.xyz
npm run dev        # http://localhost:8000
```

Before opening a pull request:

1. `npm install` (once), then `npm test`. It runs the data check (missing fields,
   bad URLs, duplicates, unreadable deadlines) and the test suite. The *Checks*
   workflow runs the same thing on every pull request.
2. If you changed a file in `js/` or `css/`, bump the `?v=N` cache number on every
   asset in `index.html` (search-and-replace `?v=NN`).
3. Use plain hyphens, commas or colons rather than em or en dashes.

See the **Development** section of the [README](README.md) for
every script.

## How contributions are tracked

Everything runs through GitHub, so credit is automatic:

- **Issue forms** are authored by *you* and labelled by category
  (`contribution`, `tool`, `scholarship`, …). Filter them any time:
  [`label:contribution`](https://github.com/bnvac/stdnt.xyz/issues?q=is%3Aissue+label%3Acontribution).
- **Pull requests** show up in the repo's
  [contributors graph](https://github.com/bnvac/stdnt.xyz/graphs/contributors)
  and on your GitHub profile.

## What belongs here

- **Free** (or free-for-students) things that are **real and currently live**.
- Official links - not aggregators, referral links, or affiliate wrappers.
- No piracy / paywall-bypass / "shadow library" sites. Open-access and legal
  free alternatives only.

When in doubt, open it anyway and we'll talk it through. 💛
