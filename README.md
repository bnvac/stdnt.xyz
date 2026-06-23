# 🎓 edu.edu — Free Stuff for Students

A hand-curated, searchable directory of **free tools, software, courses, AI assistants and perks** you can get as a student — plus a pile of things that are genuinely free for *everyone* online.

From the **GitHub Student Developer Pack** and **Hack Club Toolbox** to free college courses, cloud credits, design software and scholarships, it's all in one filterable page.

> Inspired by Richard O.'s wonderful MIT Admissions blog,
> [“Where the Free Things Are.”](https://mitadmissions.org/blogs/entry/where-the-free-things-are/)

## ✨ Features

- 🔍 **Instant search** across names, descriptions, categories and tags (`/` to focus, `Esc` to clear)
- 🏷️ **Two-axis filtering** — by category, and by access type:
  - **Student** — free, but needs a `.edu` / student verification
  - **Everyone** — free for anyone, no strings attached
- ⭐ **Featured picks** float to the top
- 🌙 **Dark / light theme** with system detection and saved preference
- 📱 **Fully responsive** and accessible
- ⚡ **Zero build step, zero dependencies** — plain HTML/CSS/JS

## 🗂️ Project structure

```
.
├── index.html        # markup + content sections
├── css/
│   └── styles.css    # theming, layout, components
└── js/
    ├── data.js       # 👈 the catalog — edit this to add resources
    └── app.js        # rendering, search, filtering, theme
```

## ➕ Adding or editing a resource

Everything renders from `js/data.js`. Add an object to `window.RESOURCES`:

```js
{
  name: "Cool Free Thing",
  url: "https://example.com/",
  category: "dev",          // must match an id in window.CATEGORIES
  access: "student",        // "student" (needs .edu) or "everyone"
  icon: "🚀",               // an emoji
  desc: "One or two plain-language sentences about what it is.",
  value: "$50 credit",      // optional headline perk
  tags: ["keyword", "..."], // optional, improves search
  featured: true            // optional, pins it to the top
}
```

The category chips, counts, search index and hero stats all update automatically.

## 🚀 Running locally

It's a static site — just open `index.html` in a browser. Or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Deploying to GitHub Pages

1. Push to GitHub (this repo).
2. **Settings → Pages → Build and deployment → Deploy from a branch.**
3. Pick the branch and the `/ (root)` folder, then save.

The `.nojekyll` file is included so the `css/` and `js/` folders are served as-is.

## 🤝 Contributing

Spotted something outdated, broken or missing? Offers and eligibility change
often, so PRs that fix links or add new freebies are very welcome. Keep
descriptions honest and confirm the offer is real before adding it.

## ⚖️ A note on the list

This is meant to help you *discover* things you'll genuinely enjoy — **not** a
checklist to grind through. As the original blog puts it: study hard, be nice,
and pursue your passion. Pick the few resources that excite you and ignore the rest.

---

Built for students, by students. 💛
