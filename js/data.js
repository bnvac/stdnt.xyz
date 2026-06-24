/*
 * data.js - the catalog of free tools, perks & APIs.
 * Scholarships live in scholarships.js; STEM programs in programs.js.
 *
 * Resource fields:
 *   name     display name
 *   url      where to get it
 *   category must match a CATEGORIES id
 *   access   "student"  -> needs .edu / student (or teen) verification
 *            "everyone" -> free for anyone online
 *   slug     a Simple Icons slug (https://simpleicons.org) for the brand logo.
 *            Omit if no brand icon exists - a letter monogram is shown instead.
 *   mono     optional 1-3 char monogram override for the fallback
 *   value    optional headline perk, e.g. "$200k+ in tools"
 *   desc     one or two plain sentences
 *   tags     optional keywords for search
 *   featured optional - pinned near the top with a star
 */

window.CATEGORIES = [
  { id: "packs",        name: "Student Packs",   blurb: "Mega-bundles that unlock dozens of perks at once." },
  { id: "ai",           name: "AI Tools",        blurb: "Assistants & copilots, many free with a school email." },
  { id: "apis",         name: "Free APIs & Keys",blurb: "Free LLM, search & infra APIs to build with." },
  { id: "hackclub",     name: "Hack Club",       blurb: "Free programs, hardware & perks for teens 13-18." },
  { id: "dev",          name: "Developer Tools", blurb: "IDEs, editors, domains - everything for shipping code." },
  { id: "cloud",        name: "Cloud & Hosting", blurb: "Deploy and run projects on generous free tiers." },
  { id: "design",       name: "Design",          blurb: "Graphics, 3D, video and photo tools." },
  { id: "files",        name: "Files & PDFs",    blurb: "PDF tools, converters and file utilities." },
  { id: "productivity", name: "Productivity",    blurb: "Notes, docs, office suites and organization." },
  { id: "learning",     name: "Learn Anything",  blurb: "Courses, lectures & channels to self-study free." },
  { id: "testprep",     name: "Test Prep",       blurb: "Practice & tutoring for the SAT, ACT and APs." },
  { id: "lifestyle",    name: "Lifestyle",       blurb: "Music, shopping & streaming student discounts." }
];

window.RESOURCES = [
  /* ---------------------------------------------------------------- packs */
  { name: "GitHub Student Developer Pack", url: "https://education.github.com/pack", category: "packs", access: "student", slug: "github", featured: true,
    value: "$200k+ in tools", desc: "The single best deal for students. One verification unlocks free GitHub Copilot, cloud credits, a free domain and dozens of premium partner offers.", tags: ["bundle", "copilot", "free domain", "credits"] },
  { name: "Microsoft Azure for Students", url: "https://azure.microsoft.com/free/students/", category: "packs", access: "student", mono: "Az",
    value: "$100 credit, no card", desc: "$100 in Azure credit plus a catalog of always-free cloud services - no credit card required.", tags: ["microsoft", "azure", "cloud", "credit"] },
  { name: "AWS Educate", url: "https://aws.amazon.com/education/awseducate/", category: "packs", access: "student", mono: "AWS",
    desc: "Free, self-paced cloud training and hands-on labs from Amazon Web Services - no account or card needed.", tags: ["amazon", "aws", "cloud", "training"] },
  { name: "Notion for Education", url: "https://www.notion.com/product/notion-for-education", category: "packs", access: "student", slug: "notion",
    value: "Free Plus plan", desc: "Students and educators get Notion's paid Plus plan free - notes, wikis, databases and project tracking.", tags: ["notes", "productivity", "ai"] },

  /* ------------------------------------------------------------------- ai */
  { name: "GitHub Copilot", url: "https://github.com/features/copilot", category: "ai", access: "student", slug: "github", featured: true,
    desc: "AI pair-programmer in your editor. Verified students get Copilot Pro free via the GitHub Student Pack.", tags: ["copilot", "code", "autocomplete", "ai"] },
  { name: "Cursor for Students", url: "https://cursor.com/students", category: "ai", access: "student", slug: "cursor",
    value: "Free year of Pro", desc: "The AI-first code editor offers students a free year of Pro - refactor, debug and learn by asking your codebase questions.", tags: ["editor", "code", "ai"] },
  { name: "Perplexity Pro for Students", url: "https://www.perplexity.ai/", category: "ai", access: "student", slug: "perplexity",
    desc: "AI answer engine with cited sources. Perplexity has run campus programs giving students free Pro - check the current offer.", tags: ["search", "research", "ai"] },
  { name: "Google Gemini for Students", url: "https://gemini.google/students/", category: "ai", access: "student", slug: "googlegemini",
    value: "Free year", desc: "Google has offered eligible university students a free year of its premium Gemini plan with expanded AI features and storage.", tags: ["google", "ai", "assistant"] },
  { name: "Claude", url: "https://claude.ai/", category: "ai", access: "everyone", slug: "anthropic",
    desc: "Anthropic's AI assistant for writing, coding and analysis, with a capable free tier anyone can use.", tags: ["anthropic", "assistant", "writing", "ai"] },
  { name: "ChatGPT", url: "https://chatgpt.com/", category: "ai", access: "everyone", mono: "AI",
    desc: "OpenAI's chatbot has a solid free tier; watch for periodic student promos on its paid plans during the school year.", tags: ["openai", "assistant", "ai"] },
  { name: "Google Colab", url: "https://colab.research.google.com/", category: "ai", access: "everyone", slug: "googlecolab",
    desc: "Run Python notebooks in the browser with free GPU/TPU time - perfect for data science, ML and class projects.", tags: ["python", "notebook", "gpu", "ml"] },

  /* ----------------------------------------------------------------- apis */
  { name: "Hack Club AI", url: "https://ai.hackclub.com/", category: "apis", access: "student", slug: "hackclub", featured: true,
    value: "Free, no card", desc: "Free LLM and image-generation API for teens in Hack Club - grab a key and start building AI projects instantly.", tags: ["llm", "ai", "api", "teens", "image"] },
  { name: "Google AI Studio (Gemini API)", url: "https://aistudio.google.com/", category: "apis", access: "everyone", slug: "googlegemini", featured: true,
    value: "Free API keys", desc: "Generous free tier for the Gemini API - one of the easiest ways to get a powerful, free LLM key for your apps.", tags: ["gemini", "llm", "api", "google"] },
  { name: "OpenRouter", url: "https://openrouter.ai/", category: "apis", access: "everyone", slug: "openrouter",
    desc: "One API key for hundreds of models - including a rotating set of completely free ones. Great for prototyping.", tags: ["llm", "api", "models", "free"] },
  { name: "Groq", url: "https://console.groq.com/", category: "apis", access: "everyone", mono: "Gq",
    desc: "Blazing-fast LLM inference (Llama and more) with a free developer tier and a simple OpenAI-compatible API.", tags: ["llm", "api", "fast", "inference"] },
  { name: "Cerebras Inference", url: "https://cloud.cerebras.ai/", category: "apis", access: "everyone", mono: "Cb",
    desc: "Extremely fast open-model inference with a free API tier - great when you need speed for free.", tags: ["llm", "api", "fast", "inference"] },
  { name: "Mistral AI (La Plateforme)", url: "https://console.mistral.ai/", category: "apis", access: "everyone", slug: "mistralai",
    desc: "Free experimentation tier for Mistral's open and frontier models via a clean API.", tags: ["llm", "api", "mistral"] },
  { name: "GitHub Models", url: "https://github.com/marketplace/models", category: "apis", access: "everyone", slug: "github",
    desc: "Free playground and API access to top models (GPT, Llama, Phi and more) right from your GitHub account.", tags: ["llm", "api", "models", "github"] },
  { name: "Cloudflare Workers AI", url: "https://developers.cloudflare.com/workers-ai/", category: "apis", access: "everyone", slug: "cloudflare",
    desc: "Run open models on Cloudflare's edge with a free daily allocation - pairs perfectly with free Workers hosting.", tags: ["llm", "api", "edge", "cloudflare"] },
  { name: "Hugging Face Inference", url: "https://huggingface.co/", category: "apis", access: "everyone", slug: "huggingface",
    desc: "Free Inference API and Spaces for thousands of open models - text, image, audio and more.", tags: ["models", "api", "ml", "open source"] },
  { name: "Hack Club Web Search API", url: "https://toolbox.hackclub.com/", category: "apis", access: "student", slug: "brave",
    desc: "Free Brave-powered web search API for Hack Club teens - search the web and find images/videos programmatically.", tags: ["search", "api", "brave", "teens"] },
  { name: "Brave Search API", url: "https://brave.com/search/api/", category: "apis", access: "everyone", slug: "brave",
    desc: "Independent web-search API with a free tier - handy for building your own search or RAG features.", tags: ["search", "api"] },
  { name: "Google Cloud Free Tier", url: "https://cloud.google.com/free", category: "apis", access: "everyone", slug: "googlecloud",
    value: "$300 credit", desc: "$300 in credits plus always-free products - compute, storage, and AI APIs to build real projects.", tags: ["cloud", "credit", "api", "google"] },

  /* -------------------------------------------------------------- hackclub */
  { name: "Hack Club", url: "https://hackclub.com/", category: "hackclub", access: "student", slug: "hackclub", featured: true,
    desc: "The world's largest nonprofit network of teen makers - free programs, grants, hardware and a huge Slack community.", tags: ["teens", "community", "maker", "free"] },
  { name: "Hack Club Toolbox", url: "https://toolbox.hackclub.com/", category: "hackclub", access: "student", slug: "hackclub",
    desc: "A directory of Hack Club's tools, programs and perks for teen hackers - YSWS programs, hosting, AI, search and more.", tags: ["directory", "tools", "teens"] },
  { name: "Hack Club Slack", url: "https://hackclub.com/slack/", category: "hackclub", access: "student", mono: "Sl",
    desc: "130k+ members: chat, collaborate and get help from tens of thousands of teen makers, plus AMAs with people like Sal Khan.", tags: ["community", "slack", "chat", "teens"] },
  { name: "HCB (Fiscal Sponsorship)", url: "https://hackclub.com/hcb/", category: "hackclub", access: "student", slug: "hackclub",
    desc: "Run your hackathon or club like a real 501(c)(3): accept donations and manage money with no paperwork nightmare.", tags: ["nonprofit", "finance", "hackathon", "fundraising"] },
  { name: "Sprig", url: "https://sprig.hackclub.com/", category: "hackclub", access: "student", slug: "hackclub",
    value: "Earn a console", desc: "Build a tile-based JavaScript game and Hack Club ships you a hardware game console to play it on.", tags: ["games", "javascript", "hardware", "ysws"] },
  { name: "Hackatime", url: "https://hackatime.hackclub.com/", category: "hackclub", access: "student", slug: "hackclub",
    desc: "Hack Club's free coding-time tracker - log hours on your projects to unlock many YSWS hardware/prize programs.", tags: ["time tracking", "wakatime", "teens"] },
  { name: "Hack Club Spaces", url: "https://spaces.hackclub.com/", category: "hackclub", access: "student", slug: "hackclub",
    desc: "All-in-one web IDE to create, host and collaborate, with 500+ supported languages and ready-made templates.", tags: ["ide", "hosting", "web", "teens"] },
  { name: "Hack Club CDN", url: "https://toolbox.hackclub.com/", category: "hackclub", access: "student", slug: "hackclub",
    value: "50GB free", desc: "50GB of free image and video hosting with permanent links for your websites and projects.", tags: ["cdn", "hosting", "images", "teens"] },
  { name: "Brilliant Premium (via Hack Club)", url: "https://toolbox.hackclub.com/", category: "hackclub", access: "student", mono: "Br",
    desc: "Free Brilliant Premium student access - interactive courses in math, CS and science - just for being in Hack Club.", tags: ["brilliant", "learning", "perk", "teens"] },
  { name: "Zoom Pro (via Hack Club)", url: "https://toolbox.hackclub.com/", category: "hackclub", access: "student", slug: "zoom",
    desc: "Run unlimited-length Zoom Pro meetings for free for your Hack Club.", tags: ["zoom", "meetings", "perk", "teens"] },

  /* ------------------------------------------------------------------ dev */
  { name: "JetBrains Student License", url: "https://www.jetbrains.com/community/education/", category: "dev", access: "student", slug: "jetbrains", featured: true,
    value: "All IDEs, free", desc: "Free access to the entire JetBrains toolbox - IntelliJ IDEA, PyCharm, WebStorm, CLion and more - while you're a student.", tags: ["ide", "intellij", "pycharm", "webstorm"] },
  { name: "Visual Studio Code", url: "https://code.visualstudio.com/", category: "dev", access: "everyone", mono: "VS",
    desc: "The free, open-source editor that's become the default for nearly every language, with a massive extension marketplace.", tags: ["vscode", "editor", "code"] },
  { name: "Namecheap Free Domain (.me)", url: "https://nc.me/", category: "dev", access: "student", slug: "namecheap",
    desc: "A free .me domain for a year plus SSL via the GitHub Student Pack - claim your portfolio URL.", tags: ["domain", "website", "ssl"] },
  { name: "Postman Student Program", url: "https://www.postman.com/student-program/", category: "dev", access: "student", slug: "postman",
    desc: "Free learning resources, certifications and credits for building and testing APIs.", tags: ["api", "testing", "certification"] },
  { name: "MongoDB Atlas + Certification", url: "https://www.mongodb.com/students", category: "dev", access: "student", slug: "mongodb",
    desc: "Database credits and a free certification voucher via the Student Pack, plus an always-free Atlas tier for everyone.", tags: ["database", "atlas", "credit"] },
  { name: "Git", url: "https://git-scm.com/", category: "dev", access: "everyone", slug: "git",
    desc: "The free, open-source version control system that underpins basically all modern software collaboration.", tags: ["version control", "open source"] },
  { name: "Replit", url: "https://replit.com/", category: "dev", access: "everyone", slug: "replit",
    desc: "Code, run and host projects entirely in the browser in dozens of languages - nothing to install.", tags: ["online ide", "browser", "code"] },

  /* ---------------------------------------------------------------- cloud */
  { name: "Vercel", url: "https://vercel.com/", category: "cloud", access: "everyone", slug: "vercel",
    desc: "Deploy front-end apps from a Git repo in seconds, with a generous free Hobby tier and automatic HTTPS.", tags: ["hosting", "deploy", "frontend", "nextjs"] },
  { name: "Netlify", url: "https://www.netlify.com/", category: "cloud", access: "everyone", slug: "netlify",
    desc: "Free hosting for static sites and serverless functions with continuous deploys from GitHub.", tags: ["hosting", "static", "deploy"] },
  { name: "Cloudflare Pages", url: "https://pages.cloudflare.com/", category: "cloud", access: "everyone", slug: "cloudflare",
    desc: "Fast, free static and full-stack hosting on Cloudflare's global network, with unlimited bandwidth.", tags: ["pages", "hosting", "cdn"] },
  { name: "GitHub Pages", url: "https://pages.github.com/", category: "cloud", access: "everyone", slug: "github",
    desc: "Host a website free directly from a GitHub repo - ideal for portfolios and docs (this site runs on it!).", tags: ["pages", "hosting", "static"] },
  { name: "Supabase", url: "https://supabase.com/", category: "cloud", access: "everyone", slug: "supabase",
    desc: "An open-source Firebase alternative: hosted Postgres, auth, storage and APIs with a usable free tier.", tags: ["database", "backend", "postgres", "auth"] },
  { name: "DigitalOcean Credit", url: "https://www.digitalocean.com/github-students", category: "cloud", access: "student", slug: "digitalocean",
    value: "$200 credit", desc: "$200 in platform credit via the GitHub Student Pack - spin up real servers, databases and apps.", tags: ["cloud", "credit", "server"] },

  /* --------------------------------------------------------------- design */
  { name: "Figma Education", url: "https://www.figma.com/education/", category: "design", access: "student", slug: "figma", featured: true,
    value: "Free Pro plan", desc: "The industry-standard interface design and prototyping tool, with its paid education plan free for verified students.", tags: ["design", "ui", "prototype", "ux"] },
  { name: "Autodesk Education", url: "https://www.autodesk.com/education/edu-software/overview", category: "design", access: "student", slug: "autodesk",
    desc: "Free student access to Fusion 360, AutoCAD, Maya, Revit and more - professional CAD, 3D and animation.", tags: ["fusion 360", "autocad", "cad", "3d"] },
  { name: "Canva", url: "https://www.canva.com/", category: "design", access: "everyone", mono: "Cv",
    desc: "Drag-and-drop graphics for posters, slides and social posts. Free for everyone; Canva for Education is fully free for schools.", tags: ["graphics", "design", "posters", "slides"] },
  { name: "Blender", url: "https://www.blender.org/", category: "design", access: "everyone", slug: "blender",
    desc: "Free, open-source 3D suite for modeling, animation, rendering and even video editing - fully professional-grade.", tags: ["3d", "animation", "modeling", "render"] },
  { name: "DaVinci Resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve", category: "design", access: "everyone", slug: "davinciresolve",
    desc: "A genuinely professional video editor and color grader, with a free version covering almost everything creators need.", tags: ["video", "editing", "color"] },
  { name: "Krita", url: "https://krita.org/", category: "design", access: "everyone", slug: "krita",
    desc: "Free, open-source painting and photo-editing app - a strong Photoshop alternative for digital art.", tags: ["art", "painting", "photoshop alternative"] },
  { name: "Unsplash", url: "https://unsplash.com/", category: "design", access: "everyone", slug: "unsplash",
    desc: "Huge library of high-quality photos free to use in personal, educational and commercial projects.", tags: ["photos", "images", "stock"] },

  /* --------------------------------------------------------- productivity */
  { name: "Microsoft 365 Education", url: "https://www.microsoft.com/en-us/education/products/office", category: "productivity", access: "student", mono: "365", featured: true,
    value: "Office free", desc: "Word, Excel, PowerPoint, OneNote and Teams free for students and teachers at eligible schools - just use your school email.", tags: ["office", "word", "excel", "powerpoint"] },
  { name: "Notion", url: "https://www.notion.com/", category: "productivity", access: "everyone", slug: "notion",
    desc: "All-in-one workspace for notes, tasks, wikis and databases. Free for personal use, with a free upgrade for students.", tags: ["notes", "tasks", "wiki", "organize"] },
  { name: "Obsidian", url: "https://obsidian.md/", category: "productivity", access: "everyone", slug: "obsidian",
    desc: "Free local-first note-taking that links your ideas into a personal knowledge graph - great for studying.", tags: ["notes", "markdown", "knowledge"] },
  { name: "Overleaf", url: "https://www.overleaf.com/", category: "productivity", access: "everyone", slug: "overleaf",
    desc: "Collaborative LaTeX editor in the browser - the go-to for typesetting math-heavy papers and problem sets.", tags: ["latex", "writing", "papers"] },
  { name: "Zotero", url: "https://www.zotero.org/", category: "productivity", access: "everyone", slug: "zotero",
    desc: "Free, open-source reference manager that collects, organizes and cites your research sources.", tags: ["citations", "research", "bibliography"] },
  { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning/", category: "productivity", access: "student", mono: "in",
    desc: "Thousands of professional video courses - frequently free through your university or public library card.", tags: ["courses", "career", "skills"] },

  /* ------------------------------------------------------------- learning */
  { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", category: "learning", access: "everyone", mono: "MIT", featured: true,
    desc: "Free lecture videos, notes, assignments and exams from real MIT courses - learn college-level material at your pace.", tags: ["ocw", "courses", "lectures", "college"] },
  { name: "Khan Academy", url: "https://www.khanacademy.org/", category: "learning", access: "everyone", slug: "khanacademy",
    desc: "Free, structured lessons, quizzes and tests covering nearly every K-12 and early-college subject.", tags: ["math", "science", "courses", "self-study"] },
  { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", category: "learning", access: "everyone", slug: "freecodecamp",
    desc: "Free, hands-on coding curriculum with thousands of exercises and free certifications in web dev, data and more.", tags: ["coding", "web", "certification", "javascript"] },
  { name: "The Odin Project", url: "https://www.theodinproject.com/", category: "learning", access: "everyone", mono: "OP",
    desc: "A free, complete full-stack web development curriculum built around real projects and a supportive community.", tags: ["web dev", "full stack", "javascript"] },
  { name: "Harvard CS50", url: "https://cs50.harvard.edu/", category: "learning", access: "everyone", mono: "CS",
    desc: "Harvard's famous intro to computer science, free online with lectures, problem sets and an active community.", tags: ["harvard", "computer science", "intro"] },
  { name: "Codecademy", url: "https://www.codecademy.com/", category: "learning", access: "everyone", slug: "codecademy",
    desc: "Interactive, in-browser lessons that teach coding step by step - a great place to start your coding journey for free.", tags: ["coding", "interactive", "languages"] },
  { name: "3Blue1Brown", url: "https://www.youtube.com/c/3blue1brown", category: "learning", access: "everyone", mono: "3B",
    desc: "Beautiful visual explanations of math and CS - especially linear algebra and calculus - for intuition-first learners.", tags: ["math", "youtube", "visual", "calculus"] },
  { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor", category: "learning", access: "everyone", mono: "OC",
    desc: "Despite the name, a clear crash course for nearly every STEM subject - chemistry, calculus, physics, stats and more.", tags: ["youtube", "chemistry", "physics", "stem"] },
  { name: "Desmos Graphing Calculator", url: "https://www.desmos.com/calculator", category: "learning", access: "everyone", mono: "fx",
    desc: "Free, powerful online graphing calculator (and a 3D version) to visualize equations and tackle math homework.", tags: ["graphing", "calculator", "math"] },

  /* ------------------------------------------------------------- testprep */
  { name: "Khan Academy SAT Prep", url: "https://www.khanacademy.org/digital-sat", category: "testprep", access: "everyone", slug: "khanacademy",
    desc: "The official, completely free Digital SAT practice course - personalized prep endorsed by College Board.", tags: ["sat", "test prep", "college board"] },
  { name: "Schoolhouse.world", url: "https://schoolhouse.world/", category: "testprep", access: "everyone", mono: "SH",
    desc: "Free, live peer tutoring (including SAT bootcamps) led by trained student volunteers - on-demand help at no cost.", tags: ["tutoring", "sat", "peer", "free"] },
  { name: "CrackSAT / CrackACT / CrackAP", url: "https://www.cracksat.net/", category: "testprep", access: "everyone", mono: "CR",
    desc: "Large libraries of free practice tests and questions for the SAT, ACT and AP exams, with answer explanations.", tags: ["sat", "act", "ap", "practice tests"] },

  /* ------------------------------------------------------------ lifestyle */
  { name: "Spotify Premium Student", url: "https://www.spotify.com/student/", category: "lifestyle", access: "student", slug: "spotify",
    desc: "Heavily discounted Premium for students, often bundled with other streaming perks - verify via SheerID.", tags: ["music", "streaming", "discount"] },
  { name: "Amazon Prime Student", url: "https://www.amazon.com/joinstudent", category: "lifestyle", access: "student", mono: "a",
    value: "6 months free", desc: "A free 6-month Prime trial for students, then a discounted rate - free shipping, Prime Video and more.", tags: ["amazon", "prime", "shipping", "discount"] },
  { name: "YouTube Premium Student", url: "https://www.youtube.com/premium/student", category: "lifestyle", access: "student", slug: "youtube",
    desc: "Ad-free YouTube and YouTube Music at a discounted student rate, with verification.", tags: ["premium", "music", "discount"] },
  { name: "UNiDAYS", url: "https://www.myunidays.com/", category: "lifestyle", access: "student", mono: "U!",
    desc: "A hub of verified student discounts across hundreds of brands - tech, fashion, food and software in one place.", tags: ["discounts", "shopping", "deals"] },
  { name: "Student Beans", url: "https://www.studentbeans.com/", category: "lifestyle", access: "student", mono: "SB",
    desc: "Another big student-discount network with exclusive codes for tech, clothing, food and entertainment.", tags: ["discounts", "deals", "shopping"] },
  { name: "Apple Education Pricing", url: "https://www.apple.com/us-edu/store", category: "lifestyle", access: "student", slug: "apple",
    desc: "Discounts on Mac and iPad for students and educators, often with seasonal back-to-school gift-card promos.", tags: ["apple", "mac", "ipad", "discount"] },

  /* ------------------------------------------------------------- files & pdfs */
  { name: "iLovePDF", url: "https://www.ilovepdf.com/", category: "files", access: "everyone", slug: "ilovepdf", featured: true,
    desc: "Every PDF tool you need in one place: merge, split, compress, convert, sign and edit PDFs free in your browser.", tags: ["pdf", "convert", "compress", "merge"] },
  { name: "TinyWow", url: "https://tinywow.com/", category: "files", access: "everyone", mono: "TW",
    desc: "A huge free toolbox for PDFs, images, video and writing, with no signup and no watermarks.", tags: ["pdf", "convert", "image", "tools"] },
  { name: "PDF24 Tools", url: "https://tools.pdf24.org/", category: "files", access: "everyone", mono: "24",
    desc: "Free, privacy-friendly PDF tools online or as a desktop app: convert, compress, edit and more.", tags: ["pdf", "convert", "compress"] },
  { name: "Cobalt", url: "https://cobalt.tools/", category: "files", access: "everyone", mono: "co",
    desc: "Clean, free, ad-free downloader for video and audio from across the web.", tags: ["download", "video", "audio"] },
  { name: "Stirling PDF", url: "https://stirlingpdf.io/", category: "files", access: "everyone", mono: "St",
    desc: "A self-hostable, open-source suite of 50+ PDF tools that runs entirely on your own machine.", tags: ["pdf", "open source", "self-host"] },

  /* ----------------------------------------------- more design & media tools */
  { name: "Photopea", url: "https://www.photopea.com/", category: "design", access: "everyone", slug: "photopea",
    desc: "A full Photoshop-style image editor that runs free in your browser and even opens PSD files.", tags: ["photoshop", "editor", "image", "psd"] },
  { name: "remove.bg", url: "https://www.remove.bg/", category: "design", access: "everyone", mono: "bg",
    desc: "Remove the background from any photo automatically in one click.", tags: ["background", "image", "cutout"] },
  { name: "Squoosh", url: "https://squoosh.app/", category: "design", access: "everyone", mono: "Sq",
    desc: "Compress and convert images right in the browser (by Google). Perfect before uploading anywhere.", tags: ["image", "compress", "convert"] },
  { name: "Pexels", url: "https://www.pexels.com/", category: "design", access: "everyone", slug: "pexels",
    desc: "Free high-quality stock photos and videos you can use almost anywhere.", tags: ["photos", "video", "stock"] },
  { name: "Pixabay", url: "https://pixabay.com/", category: "design", access: "everyone", slug: "pixabay",
    desc: "Free photos, vectors, illustrations, music and sound effects under a permissive license.", tags: ["photos", "music", "vectors", "stock"] },
  { name: "Coolors", url: "https://coolors.co/", category: "design", access: "everyone", mono: "Co",
    desc: "Generate, save and explore color palettes for your designs in seconds.", tags: ["color", "palette", "design"] },
  { name: "Excalidraw", url: "https://excalidraw.com/", category: "design", access: "everyone", slug: "excalidraw",
    desc: "Free virtual whiteboard for hand-drawn-style diagrams, sketches and wireframes.", tags: ["whiteboard", "diagram", "sketch"] },
  { name: "Tinkercad", url: "https://www.tinkercad.com/", category: "design", access: "everyone", slug: "tinkercad",
    desc: "Free, beginner-friendly 3D design, electronics and block-coding from Autodesk.", tags: ["3d", "cad", "electronics", "beginner"] },

  /* ---------------------------------------------------- more dev & productivity */
  { name: "Carbon", url: "https://carbon.now.sh/", category: "dev", access: "everyone", mono: "</>",
    desc: "Turn source code into beautiful, shareable images for slides and social posts.", tags: ["code", "screenshot", "share"] },
  { name: "Regex101", url: "https://regex101.com/", category: "dev", access: "everyone", mono: ".*",
    desc: "Build, test and debug regular expressions with a live, explained breakdown.", tags: ["regex", "testing", "debug"] },
  { name: "draw.io (diagrams.net)", url: "https://app.diagrams.net/", category: "productivity", access: "everyone", slug: "diagramsdotnet",
    desc: "Free diagramming for flowcharts, UML, network and architecture diagrams, saved to your own drive.", tags: ["diagram", "flowchart", "uml"] },
  { name: "DeepL", url: "https://www.deepl.com/translator", category: "productivity", access: "everyone", slug: "deepl",
    desc: "A translator that often reads more naturally than the alternatives, with a generous free tier.", tags: ["translate", "language", "writing"] },
  { name: "Google Slides", url: "https://docs.google.com/presentation/", category: "productivity", access: "everyone", slug: "googleslides",
    desc: "Free, collaborative presentations in the browser that auto-save to Google Drive.", tags: ["slides", "presentation", "google"] },

  /* ----------------------------------------------------------- more learning */
  { name: "Quizlet", url: "https://quizlet.com/", category: "learning", access: "everyone", slug: "quizlet",
    desc: "Flashcards and study modes for any subject, with a solid free tier.", tags: ["flashcards", "study", "memorize"] },
  { name: "Anki", url: "https://apps.ankiweb.net/", category: "learning", access: "everyone", slug: "anki",
    desc: "Free, powerful spaced-repetition flashcards, beloved by med students and language learners.", tags: ["flashcards", "spaced repetition", "memory"] },
  { name: "Wolfram Alpha", url: "https://www.wolframalpha.com/", category: "learning", access: "everyone", mono: "W|",
    desc: "A computational engine for math, science and stats that returns instant answers free.", tags: ["math", "science", "compute"] },
  { name: "Symbolab", url: "https://www.symbolab.com/", category: "learning", access: "everyone", slug: "symbolab",
    desc: "Step-by-step math solver for algebra, calculus, trig and more.", tags: ["math", "solver", "steps"] },
  { name: "Google Scholar", url: "https://scholar.google.com/", category: "learning", access: "everyone", slug: "googlescholar",
    desc: "Search scholarly papers, theses and citations across every discipline for free.", tags: ["research", "papers", "citations"] },
  { name: "NotebookLM", url: "https://notebooklm.google.com/", category: "ai", access: "everyone", slug: "notebooklm",
    desc: "Google's free AI research assistant that reasons over your own notes, PDFs and sources.", tags: ["ai", "research", "notes", "google"] },
  { name: "Bitwarden", url: "https://bitwarden.com/", category: "productivity", access: "everyone", slug: "bitwarden",
    desc: "Free, open-source password manager that syncs across all your devices.", tags: ["password", "security", "open source"] },
  { name: "Proton", url: "https://proton.me/", category: "productivity", access: "everyone", slug: "proton",
    desc: "Private, free email, calendar, drive and VPN with end-to-end encryption.", tags: ["email", "privacy", "vpn", "drive"] },
  { name: "LibreOffice", url: "https://www.libreoffice.org/", category: "productivity", access: "everyone", slug: "libreoffice",
    desc: "Free, open-source office suite: documents, spreadsheets and presentations.", tags: ["office", "documents", "open source"] },
  { name: "Miro", url: "https://miro.com/", category: "productivity", access: "everyone", slug: "miro",
    desc: "Online collaborative whiteboard with a free plan for brainstorming and planning.", tags: ["whiteboard", "collaborate", "planning"] },
  { name: "Framer", url: "https://www.framer.com/", category: "design", access: "everyone", slug: "framer",
    desc: "Design and publish a real website for free, no code required.", tags: ["website", "design", "no-code"] },
  { name: "GIMP", url: "https://www.gimp.org/", category: "design", access: "everyone", slug: "gimp",
    desc: "Free, open-source image editor, a powerful Photoshop alternative.", tags: ["image", "editor", "photoshop alternative"] },
  { name: "Inkscape", url: "https://inkscape.org/", category: "design", access: "everyone", slug: "inkscape",
    desc: "Free, open-source vector graphics editor for logos and illustrations.", tags: ["vector", "svg", "illustration"] },
  { name: "tldraw", url: "https://www.tldraw.com/", category: "design", access: "everyone", slug: "tldraw",
    desc: "A delightful, free infinite canvas for quick diagrams and sketches.", tags: ["whiteboard", "diagram", "canvas"] },
  { name: "Audacity", url: "https://www.audacityteam.org/", category: "design", access: "everyone", slug: "audacity",
    desc: "Free, open-source audio recorder and multi-track editor.", tags: ["audio", "editor", "podcast"] },
  { name: "OBS Studio", url: "https://obsproject.com/", category: "design", access: "everyone", slug: "obsstudio",
    desc: "Free, open-source software for screen recording and live streaming.", tags: ["screen record", "streaming", "video"] }
];

/* Sponsors shown on the About tab. Empty by default, add real sponsors only. */
window.SPONSORS = [];
