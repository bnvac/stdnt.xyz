/*
 * data.js — the catalog of free stuff for students.
 *
 * Edit this file to add or update resources. Everything on the site renders
 * from the two arrays below, so no build step or framework is required.
 *
 * Resource fields:
 *   name        (string)  display name
 *   url         (string)  where to get it
 *   category    (string)  must match a CATEGORIES id
 *   access      (string)  "student"  -> needs .edu / student verification
 *                         "everyone" -> free for anyone online
 *   icon        (string)  an emoji shown on the card
 *   desc        (string)  one or two sentences, plain language
 *   value       (string)  optional headline perk, e.g. "$200k+ in tools"
 *   tags        (array)   optional keywords used by search
 *   featured    (bool)    optional — pinned to the top, gets a star
 */

window.CATEGORIES = [
  { id: "packs",       name: "Student Packs",        icon: "🎁", blurb: "Mega-bundles that unlock dozens of perks at once." },
  { id: "ai",          name: "AI Tools",             icon: "🤖", blurb: "Assistants, copilots and models — many free with a school email." },
  { id: "dev",         name: "Developer Tools",      icon: "💻", blurb: "IDEs, editors, domains and everything for shipping code." },
  { id: "cloud",       name: "Cloud & Hosting",      icon: "☁️", blurb: "Deploy and run your projects on generous free tiers." },
  { id: "design",      name: "Design & Creativity",  icon: "🎨", blurb: "Graphics, 3D, video and photo tools." },
  { id: "productivity",name: "Productivity",         icon: "📝", blurb: "Notes, docs, office suites and organization." },
  { id: "learning",    name: "Learn Anything",       icon: "📚", blurb: "Courses, lectures and channels to self-study for free." },
  { id: "testprep",    name: "Test Prep",            icon: "🧪", blurb: "Practice and tutoring for the SAT, ACT and APs." },
  { id: "lifestyle",   name: "Lifestyle & Perks",    icon: "🎧", blurb: "Music, shopping and streaming student discounts." },
  { id: "programs",    name: "Programs & Community",  icon: "🏕️", blurb: "Summer programs, hackathons and clubs." },
  { id: "scholarships",name: "Scholarships",         icon: "💰", blurb: "Money for college from foundations and companies." }
];

window.RESOURCES = [
  /* ---------------------------------------------------------------- packs */
  {
    name: "GitHub Student Developer Pack",
    url: "https://education.github.com/pack",
    category: "packs", access: "student", icon: "🐙", featured: true,
    value: "$200k+ in tools & credits",
    desc: "The single best deal for students. One verification unlocks free GitHub Copilot, cloud credits, a free domain, premium dev tools and dozens more partner offers.",
    tags: ["github", "bundle", "copilot", "free domain", "credits"]
  },
  {
    name: "Hack Club Toolbox",
    url: "https://toolbox.hackclub.com/",
    category: "packs", access: "everyone", icon: "🧰", featured: true,
    desc: "A community-curated directory of free tools, APIs and credits aimed at teen hackers and hackathon builders — hosting, domains, design assets and more.",
    tags: ["hack club", "hackathon", "teens", "directory"]
  },
  {
    name: "Hack Club",
    url: "https://hackclub.com/",
    category: "packs", access: "everyone", icon: "🚩",
    desc: "A worldwide network of high-school coding clubs offering grants, free PCB/hardware programs (OnBoard, Sprig), hackathons and a huge Slack of teen makers.",
    tags: ["hack club", "grants", "hardware", "community", "teens"]
  },
  {
    name: "Microsoft Azure for Students",
    url: "https://azure.microsoft.com/free/students/",
    category: "packs", access: "student", icon: "🟦",
    value: "$100 credit, no card",
    desc: "$100 in Azure credit plus a big catalog of always-free services — no credit card required, just a verified student account.",
    tags: ["microsoft", "azure", "cloud", "credit"]
  },
  {
    name: "AWS Educate",
    url: "https://aws.amazon.com/education/awseducate/",
    category: "packs", access: "student", icon: "📦",
    desc: "Free, self-paced cloud training and hands-on labs from Amazon Web Services with no AWS account or credit card needed.",
    tags: ["amazon", "aws", "cloud", "training"]
  },
  {
    name: "Notion for Education",
    url: "https://www.notion.com/product/notion-for-education",
    category: "packs", access: "student", icon: "⬛",
    value: "Free Plus plan",
    desc: "Students and educators get Notion's paid Plus plan free, including Notion AI add-ons in many cases — for notes, wikis, databases and project tracking.",
    tags: ["notion", "notes", "productivity", "ai"]
  },

  /* ------------------------------------------------------------------- ai */
  {
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    category: "ai", access: "student", icon: "🧑‍✈️", featured: true,
    desc: "AI pair-programmer in your editor. Verified students get Copilot Pro free through the GitHub Student Developer Pack.",
    tags: ["copilot", "code", "autocomplete", "github", "ai"]
  },
  {
    name: "Perplexity Pro for Students",
    url: "https://www.perplexity.ai/",
    category: "ai", access: "student", icon: "🔮",
    desc: "AI answer engine with cited sources. Perplexity has run campus programs giving students free Pro — check the current student offer with your .edu email.",
    tags: ["perplexity", "search", "research", "ai"]
  },
  {
    name: "Google Gemini for Students",
    url: "https://gemini.google/students/",
    category: "ai", access: "student", icon: "✨",
    desc: "Google has offered eligible university students a free year of its premium Gemini plan with expanded AI features and storage.",
    tags: ["google", "gemini", "ai", "assistant"]
  },
  {
    name: "Cursor for Students",
    url: "https://cursor.com/students",
    category: "ai", access: "student", icon: "🖱️",
    desc: "The AI-first code editor offers students a free year of Pro — great for refactoring, debugging and learning by asking your codebase questions.",
    tags: ["cursor", "editor", "code", "ai"]
  },
  {
    name: "Claude",
    url: "https://claude.ai/",
    category: "ai", access: "everyone", icon: "📎",
    desc: "Anthropic's AI assistant for writing, coding and analysis, with a capable free tier anyone can use in the browser.",
    tags: ["claude", "anthropic", "assistant", "writing", "ai"]
  },
  {
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    category: "ai", access: "everyone", icon: "💬",
    desc: "OpenAI's chatbot has a solid free tier; watch for periodic student promotions on its paid Plus plan during the school year.",
    tags: ["openai", "chatgpt", "assistant", "ai"]
  },
  {
    name: "Google Colab",
    url: "https://colab.research.google.com/",
    category: "ai", access: "everyone", icon: "🔬",
    desc: "Run Python notebooks in the browser with free GPU/TPU time — perfect for data science, machine learning and class projects.",
    tags: ["colab", "python", "notebook", "gpu", "ml"]
  },

  /* ------------------------------------------------------------------ dev */
  {
    name: "JetBrains Student License",
    url: "https://www.jetbrains.com/community/education/",
    category: "dev", access: "student", icon: "🧠", featured: true,
    value: "All IDEs, free",
    desc: "Free access to the entire JetBrains toolbox — IntelliJ IDEA, PyCharm, WebStorm, CLion and more — for as long as you're a student.",
    tags: ["jetbrains", "ide", "intellij", "pycharm", "webstorm"]
  },
  {
    name: "Visual Studio Code",
    url: "https://code.visualstudio.com/",
    category: "dev", access: "everyone", icon: "🔵",
    desc: "The free, open-source code editor that's become the default for nearly every language, with a massive extension marketplace.",
    tags: ["vscode", "editor", "microsoft", "code"]
  },
  {
    name: "Namecheap Free Domain (.me)",
    url: "https://nc.me/",
    category: "dev", access: "student", icon: "🌐",
    desc: "A free .me domain for one year plus SSL, available to students through the GitHub Student Pack — claim your personal site or portfolio URL.",
    tags: ["namecheap", "domain", "website", "ssl"]
  },
  {
    name: "Postman Student Program",
    url: "https://www.postman.com/student-program/",
    category: "dev", access: "student", icon: "📮",
    desc: "Free learning resources, certifications and credits for building and testing APIs with the industry-standard API platform.",
    tags: ["postman", "api", "testing", "certification"]
  },
  {
    name: "MongoDB Atlas + Certification",
    url: "https://www.mongodb.com/students",
    category: "dev", access: "student", icon: "🍃",
    desc: "Database credits and a free certification voucher for students via the GitHub Student Pack, plus an always-free Atlas tier for everyone.",
    tags: ["mongodb", "database", "atlas", "credit"]
  },
  {
    name: "Git",
    url: "https://git-scm.com/",
    category: "dev", access: "everyone", icon: "🌿",
    desc: "The free, open-source version control system that underpins basically all modern software collaboration.",
    tags: ["git", "version control", "open source"]
  },
  {
    name: "Replit",
    url: "https://replit.com/",
    category: "dev", access: "everyone", icon: "🛠️",
    desc: "Code, run and host projects entirely in the browser in dozens of languages — a frictionless place to start coding with nothing to install.",
    tags: ["replit", "online ide", "browser", "code"]
  },

  /* ---------------------------------------------------------------- cloud */
  {
    name: "Vercel",
    url: "https://vercel.com/",
    category: "cloud", access: "everyone", icon: "▲",
    desc: "Deploy front-end apps and sites from a Git repo in seconds, with a generous free Hobby tier and automatic HTTPS.",
    tags: ["vercel", "hosting", "deploy", "frontend", "nextjs"]
  },
  {
    name: "Netlify",
    url: "https://www.netlify.com/",
    category: "cloud", access: "everyone", icon: "🌐",
    desc: "Free hosting for static sites and serverless functions with continuous deploys straight from GitHub.",
    tags: ["netlify", "hosting", "static", "deploy"]
  },
  {
    name: "Cloudflare Pages",
    url: "https://pages.cloudflare.com/",
    category: "cloud", access: "everyone", icon: "🟧",
    desc: "Fast, free static and full-stack hosting on Cloudflare's global network, with unlimited bandwidth on the free plan.",
    tags: ["cloudflare", "pages", "hosting", "cdn"]
  },
  {
    name: "GitHub Pages",
    url: "https://pages.github.com/",
    category: "cloud", access: "everyone", icon: "📄",
    desc: "Host a website for free directly from a GitHub repository — ideal for portfolios, docs and project pages (this site can run on it!).",
    tags: ["github", "pages", "hosting", "static"]
  },
  {
    name: "Supabase",
    url: "https://supabase.com/",
    category: "cloud", access: "everyone", icon: "⚡",
    desc: "An open-source Firebase alternative: hosted Postgres database, auth, storage and APIs with a usable free tier.",
    tags: ["supabase", "database", "backend", "postgres", "auth"]
  },
  {
    name: "DigitalOcean Credit",
    url: "https://www.digitalocean.com/github-students",
    category: "cloud", access: "student", icon: "🌊",
    value: "$200 credit",
    desc: "$200 in platform credit for students through the GitHub Student Pack — spin up real servers, databases and apps.",
    tags: ["digitalocean", "cloud", "credit", "server"]
  },

  /* --------------------------------------------------------------- design */
  {
    name: "Figma Education",
    url: "https://www.figma.com/education/",
    category: "design", access: "student", icon: "🎨", featured: true,
    value: "Free Pro plan",
    desc: "The industry-standard interface design and prototyping tool, with its paid education plan free for verified students and educators.",
    tags: ["figma", "design", "ui", "prototype", "ux"]
  },
  {
    name: "Autodesk Education",
    url: "https://www.autodesk.com/education/edu-software/overview",
    category: "design", access: "student", icon: "📐",
    desc: "Free student access to Fusion 360, AutoCAD, Maya, Revit and more — professional CAD, 3D modeling and animation software.",
    tags: ["autodesk", "fusion 360", "autocad", "cad", "3d"]
  },
  {
    name: "Canva",
    url: "https://www.canva.com/",
    category: "design", access: "everyone", icon: "🖌️",
    desc: "Drag-and-drop graphics for posters, slides and social posts. Free for everyone, with a fully free Canva for Education tier for schools.",
    tags: ["canva", "graphics", "design", "posters", "slides"]
  },
  {
    name: "Blender",
    url: "https://www.blender.org/",
    category: "design", access: "everyone", icon: "🟠",
    desc: "Free, open-source 3D creation suite for modeling, animation, rendering and even video editing — fully professional-grade.",
    tags: ["blender", "3d", "animation", "modeling", "render"]
  },
  {
    name: "DaVinci Resolve",
    url: "https://www.blackmagicdesign.com/products/davinciresolve",
    category: "design", access: "everyone", icon: "🎬",
    desc: "A genuinely professional video editor and color grader with a free version that covers almost everything most creators need.",
    tags: ["davinci", "video", "editing", "color"]
  },
  {
    name: "Krita",
    url: "https://krita.org/",
    category: "design", access: "everyone", icon: "🖍️",
    desc: "Free, open-source painting and photo-editing app — a strong Photoshop alternative for digital art and illustration.",
    tags: ["krita", "art", "painting", "photoshop alternative"]
  },
  {
    name: "Unsplash",
    url: "https://unsplash.com/",
    category: "design", access: "everyone", icon: "📷",
    desc: "Huge library of high-quality photos free to use in personal, educational and commercial projects under the Unsplash license.",
    tags: ["unsplash", "photos", "images", "stock"]
  },

  /* --------------------------------------------------------- productivity */
  {
    name: "Microsoft 365 Education",
    url: "https://www.microsoft.com/en-us/education/products/office",
    category: "productivity", access: "student", icon: "📊", featured: true,
    value: "Office free",
    desc: "Word, Excel, PowerPoint, OneNote and Teams free for students and teachers at eligible schools — just sign up with your school email.",
    tags: ["microsoft", "office", "word", "excel", "powerpoint"]
  },
  {
    name: "Notion",
    url: "https://www.notion.com/",
    category: "productivity", access: "everyone", icon: "⬛",
    desc: "All-in-one workspace for notes, tasks, wikis and databases. Free for personal use, with a free upgraded plan for students.",
    tags: ["notion", "notes", "tasks", "wiki", "organize"]
  },
  {
    name: "Obsidian",
    url: "https://obsidian.md/",
    category: "productivity", access: "everyone", icon: "🪨",
    desc: "Free local-first note-taking that links your ideas into a personal knowledge graph — great for studying and research.",
    tags: ["obsidian", "notes", "markdown", "knowledge"]
  },
  {
    name: "Overleaf",
    url: "https://www.overleaf.com/",
    category: "productivity", access: "everyone", icon: "📄",
    desc: "Collaborative LaTeX editor in the browser — the go-to for typesetting math-heavy papers, problem sets and theses.",
    tags: ["overleaf", "latex", "writing", "papers"]
  },
  {
    name: "Zotero",
    url: "https://www.zotero.org/",
    category: "productivity", access: "everyone", icon: "📚",
    desc: "Free, open-source reference manager that collects, organizes and cites your research sources in any citation style.",
    tags: ["zotero", "citations", "research", "bibliography"]
  },
  {
    name: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/",
    category: "productivity", access: "student", icon: "🎓",
    desc: "Thousands of professional video courses — frequently free through your university or local public library card.",
    tags: ["linkedin", "courses", "career", "skills"]
  },

  /* ------------------------------------------------------------- learning */
  {
    name: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/",
    category: "learning", access: "everyone", icon: "🏛️", featured: true,
    desc: "Free lecture videos, notes, assignments and exams from real MIT courses — learn college-level material at your own pace.",
    tags: ["mit", "ocw", "courses", "lectures", "college"]
  },
  {
    name: "Khan Academy",
    url: "https://www.khanacademy.org/",
    category: "learning", access: "everyone", icon: "🌟",
    desc: "Free, structured lessons, quizzes and tests covering nearly every K-12 and early-college subject, from calculus to economics.",
    tags: ["khan academy", "math", "science", "courses", "self-study"]
  },
  {
    name: "freeCodeCamp",
    url: "https://www.freecodecamp.org/",
    category: "learning", access: "everyone", icon: "🔥",
    desc: "Free, hands-on coding curriculum with thousands of exercises and free certifications in web dev, data and more.",
    tags: ["freecodecamp", "coding", "web", "certification", "javascript"]
  },
  {
    name: "The Odin Project",
    url: "https://www.theodinproject.com/",
    category: "learning", access: "everyone", icon: "⚔️",
    desc: "A free, complete full-stack web development curriculum built around real projects and a supportive community.",
    tags: ["odin", "web dev", "full stack", "javascript", "ruby"]
  },
  {
    name: "Harvard CS50",
    url: "https://cs50.harvard.edu/",
    category: "learning", access: "everyone", icon: "🎓",
    desc: "Harvard's famous intro to computer science, free online with lectures, problem sets and an active community.",
    tags: ["cs50", "harvard", "computer science", "intro", "programming"]
  },
  {
    name: "Codecademy",
    url: "https://www.codecademy.com/",
    category: "learning", access: "everyone", icon: "👩‍💻",
    desc: "Interactive, in-browser lessons that teach coding languages step by step — a great place to start your coding journey for free.",
    tags: ["codecademy", "coding", "interactive", "languages"]
  },
  {
    name: "3Blue1Brown",
    url: "https://www.youtube.com/c/3blue1brown",
    category: "learning", access: "everyone", icon: "🔵",
    desc: "Beautiful visual explanations of math and computer science — especially linear algebra and calculus — for intuition-first learners.",
    tags: ["3blue1brown", "math", "youtube", "visual", "calculus"]
  },
  {
    name: "The Organic Chemistry Tutor",
    url: "https://www.youtube.com/@TheOrganicChemistryTutor",
    category: "learning", access: "everyone", icon: "🧪",
    desc: "Despite the name, a clear, thorough crash course for nearly every STEM subject — chemistry, calculus, physics, stats and more.",
    tags: ["youtube", "chemistry", "physics", "math", "stem"]
  },
  {
    name: "Desmos Graphing Calculator",
    url: "https://www.desmos.com/calculator",
    category: "learning", access: "everyone", icon: "📈",
    desc: "Free, powerful online graphing calculator (and a 3D version) to visualize equations and tackle math homework.",
    tags: ["desmos", "graphing", "calculator", "math"]
  },

  /* ------------------------------------------------------------- testprep */
  {
    name: "Khan Academy SAT Prep",
    url: "https://www.khanacademy.org/digital-sat",
    category: "testprep", access: "everyone", icon: "✏️",
    desc: "The official, completely free Digital SAT practice course — personalized topic-by-topic prep endorsed by College Board.",
    tags: ["sat", "khan academy", "test prep", "college board"]
  },
  {
    name: "Schoolhouse.world",
    url: "https://schoolhouse.world/",
    category: "testprep", access: "everyone", icon: "🌍",
    desc: "Free, live peer tutoring (including SAT bootcamps) led by trained student volunteers — on-demand help at no cost.",
    tags: ["schoolhouse", "tutoring", "sat", "peer", "free"]
  },
  {
    name: "CrackSAT / CrackACT / CrackAP",
    url: "https://www.cracksat.net/",
    category: "testprep", access: "everyone", icon: "📝",
    desc: "Large libraries of free practice tests and questions for the SAT, ACT and AP exams, with answer explanations.",
    tags: ["sat", "act", "ap", "practice tests"]
  },

  /* ------------------------------------------------------------ lifestyle */
  {
    name: "Spotify Premium Student",
    url: "https://www.spotify.com/student/",
    category: "lifestyle", access: "student", icon: "🎧",
    desc: "Heavily discounted Premium for students, often bundled with other streaming perks — verify with your school via SheerID.",
    tags: ["spotify", "music", "streaming", "discount"]
  },
  {
    name: "Amazon Prime Student",
    url: "https://www.amazon.com/joinstudent",
    category: "lifestyle", access: "student", icon: "📦",
    value: "6 months free",
    desc: "A free 6-month Prime trial for students, then a discounted rate — free shipping, Prime Video and more.",
    tags: ["amazon", "prime", "shipping", "student", "discount"]
  },
  {
    name: "YouTube Premium Student",
    url: "https://www.youtube.com/premium/student",
    category: "lifestyle", access: "student", icon: "▶️",
    desc: "Ad-free YouTube and YouTube Music at a discounted student rate, with student verification.",
    tags: ["youtube", "premium", "music", "discount"]
  },
  {
    name: "UNiDAYS",
    url: "https://www.myunidays.com/",
    category: "lifestyle", access: "student", icon: "🛍️",
    desc: "A hub of verified student discounts across hundreds of brands — tech, fashion, food and software in one place.",
    tags: ["unidays", "discounts", "shopping", "deals"]
  },
  {
    name: "Student Beans",
    url: "https://www.studentbeans.com/",
    category: "lifestyle", access: "student", icon: "🫘",
    desc: "Another big student-discount network with exclusive codes for tech, clothing, food and entertainment brands.",
    tags: ["student beans", "discounts", "deals", "shopping"]
  },

  /* ------------------------------------------------------------- programs */
  {
    name: "Major League Hacking (MLH)",
    url: "https://mlh.io/",
    category: "programs", access: "everyone", icon: "🏆",
    desc: "The official student hackathon league — find free hackathons worldwide plus fellowships and learning events.",
    tags: ["mlh", "hackathon", "students", "community"]
  },
  {
    name: "MITES (MIT)",
    url: "https://mites.mit.edu/",
    category: "programs", access: "student", icon: "🔭",
    desc: "Free MIT STEM enrichment programs for grades 7–12 from underrepresented backgrounds, with travel support for on-campus sessions.",
    tags: ["mit", "mites", "summer", "stem", "free"]
  },
  {
    name: "Research Science Institute (RSI)",
    url: "https://www.cee.org/programs/research-science-institute",
    category: "programs", access: "student", icon: "🧬",
    desc: "A cost-free, highly selective summer research program pairing rising high-school seniors with mentors at MIT.",
    tags: ["rsi", "research", "summer", "mit", "stem"]
  },
  {
    name: "Kode With Klossy",
    url: "https://www.kodewithklossy.com/",
    category: "programs", access: "student", icon: "👩‍💻",
    desc: "Free summer coding camps for teens who identify as girls or non-binary, covering web, mobile, ML and data science.",
    tags: ["kode with klossy", "coding", "summer", "free", "girls"]
  },
  {
    name: "Congressional App Challenge",
    url: "https://www.congressionalappchallenge.us/",
    category: "programs", access: "student", icon: "🏛️",
    desc: "A free nationwide coding competition where middle and high schoolers build an app to represent their district.",
    tags: ["app challenge", "coding", "competition", "free"]
  },

  /* --------------------------------------------------------- scholarships */
  {
    name: "QuestBridge",
    url: "https://www.questbridge.org/",
    category: "scholarships", access: "student", icon: "🌉",
    desc: "Matches high-achieving, low-income students with full four-year scholarships at 50+ top colleges.",
    tags: ["questbridge", "scholarship", "full ride", "low income"]
  },
  {
    name: "The Gates Scholarship",
    url: "https://www.thegatesscholarship.org/scholarship",
    category: "scholarships", access: "student", icon: "🚪",
    desc: "A full-ride, last-dollar scholarship for outstanding minority students from low-income households.",
    tags: ["gates", "scholarship", "full ride", "minority"]
  },
  {
    name: "Jack Kent Cooke Foundation",
    url: "https://www.jkcf.org/our-scholarships/",
    category: "scholarships", access: "student", icon: "🎓",
    desc: "Generous scholarships (up to tens of thousands per year) plus advising for high-achieving students with financial need.",
    tags: ["jack kent cooke", "scholarship", "need-based"]
  },
  {
    name: "Coca-Cola Scholars",
    url: "https://www.coca-colascholarsfoundation.org/",
    category: "scholarships", access: "student", icon: "🥤",
    desc: "Achievement-based scholarships for graduating high-school seniors, recognizing leadership and service.",
    tags: ["coca-cola", "scholarship", "leadership", "seniors"]
  },
  {
    name: "College Board Scholarship Directory",
    url: "https://bigfuture.collegeboard.org/scholarships",
    category: "scholarships", access: "everyone", icon: "🗂️",
    desc: "A large, searchable directory to discover scholarships you qualify for — the hardest part is finding them, so start here.",
    tags: ["college board", "directory", "scholarship", "search"]
  }
];
