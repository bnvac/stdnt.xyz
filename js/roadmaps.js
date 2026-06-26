/*
 * roadmaps.js - goal-based "opportunity roadmaps" for the Roadmaps tab.
 * Each roadmap is a sequence of stages toward a goal; every stage lists
 * concrete moves (that deep-link into the site) and what they "unlock" -
 * the opportunity-graph idea (one thing leads to the next).
 *
 * Shape:
 *   { id, goal, blurb, icon (ICONS key), hue (0-360),
 *     stages: [ { when, title, do: [ {t, goto?, q?, url?} ], unlocks: [str] } ] }
 *   goto = tab id to open; q = search to prefill; url = external link.
 */
window.ROADMAPS = [
  {
    id: "stem", goal: "Top STEM college", blurb: "The classic research + olympiad track to an MIT-tier school.", icon: "flask", hue: 222,
    stages: [
      { when: "Grade 9-10", title: "Find your subject & build a base", do: [
          { t: "Science Olympiad", goto: "competitions", q: "science olympiad" },
          { t: "AMC 10 (math)", goto: "competitions", q: "amc" },
          { t: "Learn free on MIT OCW / Khan", goto: "tools", q: "openstax" } ],
        unlocks: ["Subject mastery", "Competition record"] },
      { when: "Grade 10-11", title: "Go deep & place in competitions", do: [
          { t: "USABO / USNCO / F=ma", goto: "competitions", q: "olympiad" },
          { t: "Regeneron ISEF via a fair", goto: "competitions", q: "isef" } ],
        unlocks: ["Awards for your app", "Eligibility for elite summers"] },
      { when: "Grade 11", title: "Do real research", do: [
          { t: "Cold-email a professor", goto: "guides", q: "cold-email" },
          { t: "Find a research program", goto: "prog", q: "research" } ],
        unlocks: ["A mentor & a paper", "Strong recommendation letters"] },
      { when: "Summer before 12", title: "Selective summer programs", do: [
          { t: "RSI (free, top-tier)", goto: "prog", q: "RSI" },
          { t: "MITES / other MIT programs", goto: "prog", q: "MITES" } ],
        unlocks: ["A national network", "A standout application"] },
      { when: "Grade 12", title: "Apply (for free)", do: [
          { t: "Get application fee waivers", goto: "tools", q: "fee waiver" },
          { t: "Big merit scholarships", goto: "sch", q: "STEM" } ],
        unlocks: ["Admission + money"] }
    ]
  },
  {
    id: "premed", goal: "Pre-med / biology", blurb: "Build a health-and-research profile for top bio programs.", icon: "flask", hue: 158,
    stages: [
      { when: "Grade 9-10", title: "Foundations", do: [
          { t: "Brain Bee / Biolympiad", goto: "competitions", q: "bio" },
          { t: "HOSA (health pre-professionals)", goto: "competitions", q: "hosa" } ],
        unlocks: ["Bio fundamentals"] },
      { when: "Grade 10-11", title: "Get clinical & lab exposure", do: [
          { t: "Hospital / clinic volunteering", goto: "prog", q: "health" },
          { t: "Cold-email a lab", goto: "guides", q: "cold-email" } ],
        unlocks: ["Patient/lab hours", "A mentor"] },
      { when: "Summer 11", title: "Research or medical programs", do: [
          { t: "Summer research programs", goto: "prog", q: "biology" },
          { t: "Cold Spring Harbor / NIH-style", goto: "prog", q: "research" } ],
        unlocks: ["A project", "Letters of rec"] },
      { when: "Grade 12", title: "Apply", do: [
          { t: "Need-based & STEM scholarships", goto: "sch", q: "STEM" },
          { t: "Fee waivers", goto: "tools", q: "fee waiver" } ],
        unlocks: ["Admission + aid"] }
    ]
  },
  {
    id: "cs", goal: "Software / CS", blurb: "From first line of code to internships and a CS admit.", icon: "code", hue: 270,
    stages: [
      { when: "Anytime", title: "Learn to build", do: [
          { t: "Free courses (edX/Colab)", goto: "tools", q: "colab" },
          { t: "GitHub Student Pack", goto: "tools", q: "student pack" } ],
        unlocks: ["Projects to show"] },
      { when: "Grade 10-11", title: "Compete & ship", do: [
          { t: "USACO (competitive programming)", goto: "competitions", q: "usaco" },
          { t: "Hackathons near you", goto: "hackathons", q: "" } ],
        unlocks: ["A portfolio", "A team & network"] },
      { when: "Grade 11-12", title: "Build credibility", do: [
          { t: "Open source + free APIs", goto: "tools", q: "api" },
          { t: "Internships (Handshake)", goto: "tools", q: "handshake" } ],
        unlocks: ["Real experience", "Referrals"] },
      { when: "Grade 12", title: "Apply", do: [
          { t: "Merit scholarships", goto: "sch", q: "STEM" },
          { t: "Fee waivers", goto: "tools", q: "fee waiver" } ],
        unlocks: ["Admission + money"] }
    ]
  },
  {
    id: "business", goal: "Business / entrepreneurship", blurb: "Lead, pitch and build something real.", icon: "briefcase", hue: 32,
    stages: [
      { when: "Grade 9-10", title: "Join & lead", do: [
          { t: "DECA / FBLA competitions", goto: "competitions", q: "business" } ],
        unlocks: ["Leadership record"] },
      { when: "Grade 10-11", title: "Compete & create", do: [
          { t: "Conrad / Diamond Challenge", goto: "competitions", q: "challenge" },
          { t: "Start a small venture or club", goto: "guides", q: "" } ],
        unlocks: ["A pitch & traction"] },
      { when: "Grade 11-12", title: "Internships & money", do: [
          { t: "Internships (Handshake)", goto: "tools", q: "handshake" },
          { t: "Business scholarships", goto: "sch", q: "business" } ],
        unlocks: ["Experience + funding"] },
      { when: "Grade 12", title: "Apply", do: [
          { t: "Fee waivers", goto: "tools", q: "fee waiver" } ],
        unlocks: ["Admission"] }
    ]
  },
  {
    id: "arts", goal: "Arts & humanities", blurb: "Build a portfolio and win recognition for creative work.", icon: "pencil", hue: 320,
    stages: [
      { when: "Grade 9-11", title: "Make a lot of work", do: [
          { t: "Scholastic Art & Writing Awards", goto: "competitions", q: "scholastic" } ],
        unlocks: ["A growing portfolio"] },
      { when: "Grade 10-11", title: "Win recognition", do: [
          { t: "YoungArts", goto: "sch", q: "youngarts" },
          { t: "Essay contests (JFK, VFW)", goto: "sch", q: "essay" } ],
        unlocks: ["Awards & cash"] },
      { when: "Summer 11", title: "Go further", do: [
          { t: "Free journalism / writing programs", goto: "tools", q: "journalism" } ],
        unlocks: ["Mentorship & samples"] },
      { when: "Grade 12", title: "Apply", do: [
          { t: "Creative & essay scholarships", goto: "sch", q: "creative" },
          { t: "Fee waivers", goto: "tools", q: "fee waiver" } ],
        unlocks: ["Admission + money"] }
    ]
  },
  {
    id: "firstgen", goal: "First-gen / low-income", blurb: "The highest-leverage, lowest-cost path to a great college.", icon: "id", hue: 199,
    stages: [
      { when: "Grade 9-11", title: "Get into access programs", do: [
          { t: "QuestBridge & college access orgs", goto: "sch", q: "questbridge" },
          { t: "Free summer programs", goto: "prog", q: "free" } ],
        unlocks: ["Mentorship", "Insider guidance"] },
      { when: "Grade 11", title: "Visit colleges for free", do: [
          { t: "Apply to fly-in programs", goto: "guides", q: "" },
          { t: "Need-based scholarships", goto: "sch", q: "need" } ],
        unlocks: ["Free campus visits", "Demonstrated interest"] },
      { when: "Grade 12", title: "Apply for free + file aid", do: [
          { t: "Application fee waivers", goto: "tools", q: "fee waiver" },
          { t: "File the FAFSA", goto: "tools", q: "fafsa" },
          { t: "QuestBridge Match / big awards", goto: "sch", q: "questbridge" } ],
        unlocks: ["Full-ride shots", "Federal aid"] }
    ]
  },
  {
    id: "transfer", goal: "Community college → transfer", blurb: "Start affordable, transfer up, graduate with less debt.", icon: "cap", hue: 142,
    stages: [
      { when: "Year 1 (CC)", title: "Crush your GPA", do: [
          { t: "Free textbooks (OpenStax)", goto: "tools", q: "openstax" },
          { t: "Join Phi Theta Kappa", goto: "tools", q: "phi theta kappa" } ],
        unlocks: ["Transfer scholarships", "Honor-society perks"] },
      { when: "Year 1-2", title: "Plan the transfer", do: [
          { t: "Pick a transfer pathway", goto: "tools", q: "transfer" } ],
        unlocks: ["A clear credit plan"] },
      { when: "Before transfer", title: "Win transfer money", do: [
          { t: "Jack Kent Cooke Transfer", goto: "sch", q: "transfer" },
          { t: "File the FAFSA", goto: "tools", q: "fafsa" } ],
        unlocks: ["Up to full funding"] }
    ]
  },
  {
    id: "trades", goal: "Skilled trades (no degree)", blurb: "Earn while you learn - a debt-free path to a real career.", icon: "briefcase", hue: 18,
    stages: [
      { when: "Grade 9-12", title: "Build skills", do: [
          { t: "Join SkillsUSA", goto: "tools", q: "skillsusa" } ],
        unlocks: ["Hands-on credentials"] },
      { when: "Grade 11-12", title: "Find a paid apprenticeship", do: [
          { t: "Search Apprenticeship.gov", goto: "tools", q: "apprenticeship" } ],
        unlocks: ["Paid training", "A trade"] },
      { when: "Anytime", title: "Fund career school", do: [
          { t: "mikeroweWORKS & trade scholarships", goto: "sch", q: "trades" } ],
        unlocks: ["Lower/zero cost"] }
    ]
  }
];
