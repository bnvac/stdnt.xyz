/*
 * guides.js - in-site how-to guides shown on the Guides tab.
 * Plain data: each guide has { slug, icon, title, blurb, readMins, tags, body }.
 * `body` is first-party HTML rendered into the reading overlay (see app.js).
 * To add a guide: copy a block, give it a unique slug, write the body. No build step.
 */
window.GUIDES = [
  {
    slug: "cold-email-research",
    icon: "✉️",
    title: "Cold-email a professor for research",
    blurb: "How students land free, often-remote research by emailing professors the right way — with a proven template.",
    readMins: 6,
    tags: ["research", "email", "internships", "college"],
    body: `
      <p class="guide-lead">You do not need connections to do real research. Every year students get into labs — often remote, often as a high-schooler or first-year — just by sending a short, specific email to the right professor. Most students never try, so the ones who do stand out.</p>

      <h3>1. Find the right people, not just the right schools</h3>
      <p>Pick <em>people whose work you find interesting</em>, not just famous universities. A motivated professor at a state school will teach you more than a busy superstar who never replies.</p>
      <ul>
        <li>Search <a href="https://scholar.google.com" target="_blank" rel="noopener">Google Scholar</a> for your topic (e.g. <code>protein folding machine learning</code>) and read recent papers.</li>
        <li>Browse department "Faculty" and "Research" pages. Note who has a lab site, recent publications, and current projects.</li>
        <li>Favor people who publish often and mention undergraduate or volunteer researchers.</li>
      </ul>

      <h3>2. Actually read one of their papers</h3>
      <p>Read (or skim) one recent paper or their lab summary before emailing. You only need the gist: what question they ask and why it matters. This is the single thing that separates a real email from spam they delete in two seconds.</p>

      <h3>3. Write a short, specific email</h3>
      <p>Keep it under ~150 words. Professors get dozens of these. The goal is to show you are real, genuinely interested, and easy to say yes to.</p>
      <ul>
        <li><strong>Specific subject line</strong> referencing their work.</li>
        <li><strong>One line on who you are</strong> (year, school, relevant skills).</li>
        <li><strong>Two lines that prove you read their work</strong> and a concrete idea or question.</li>
        <li><strong>A small, clear ask</strong> — a short call, or whether they take volunteer/remote help.</li>
        <li>Attach a one-page resume/CV if you have one.</li>
      </ul>

      <h3>4. The template</h3>
      <p>Copy this, then make every bracket your own. Generic = deleted.</p>
      <div class="guide-tpl">
        <button class="guide-copy" type="button" data-copy aria-label="Copy template">Copy</button>
        <pre>Subject: Interested in your work on [specific topic]

Dear Professor [Last name],

I'm [name], a [year, e.g. high-school senior / first-year] at [school] interested in [field]. I read your recent paper on [specific paper or project] and was struck by [one concrete detail or result].

I'd love to contribute, even in a small or remote role. I have experience with [1-2 relevant skills: Python, wet-lab, data analysis, literature review], and I'm a fast, reliable learner. Would you be open to a brief call, or do you take on volunteer/remote research assistants?

I've attached a short CV. Thank you for your time.

Best,
[Name]
[Email] - [optional: GitHub / portfolio link]</pre>
      </div>

      <h3>5. Send smart, then follow up</h3>
      <ul>
        <li>Email 10–20 professors, not one. A 10–20% reply rate is normal — volume is part of the strategy.</li>
        <li>Send Tuesday–Thursday mornings. Avoid Friday afternoons and holidays.</li>
        <li>No reply in 7–10 days? Send <em>one</em> short, polite follow-up. Then move on.</li>
      </ul>

      <div class="guide-note">
        <strong>Avoid these:</strong> mass "Dear Professor" emails with no specifics, long life stories, demanding a paid position up front, or attaching huge files. Short, specific, and low-pressure wins.
      </div>

      <h3>6. After you get a yes</h3>
      <p>Reply fast, be honest about your time and skills, and deliver the first small task well. One good lab experience leads to a recommendation letter, a co-authorship, and a much easier "yes" the next time.</p>
      <p class="guide-xref">Want a structured program instead of a cold pitch? See <a href="#guide/summer-research">Land summer research / REUs</a>.</p>
    `
  },

  {
    slug: "github-student-pack",
    icon: "🎓",
    title: "Claim the GitHub Student Pack",
    blurb: "Unlock $200k+ of free developer tools, cloud credits and domains — how to verify and what to redeem first.",
    readMins: 5,
    tags: ["github", "developer", "free", "cloud", "perks"],
    body: `
      <p class="guide-lead">The <a href="https://education.github.com/pack" target="_blank" rel="noopener">GitHub Student Developer Pack</a> is the single best freebie for any student who writes code: free cloud hosting, domains, AI tools, and pro software, bundled into one verification. Total value is well over $200k.</p>

      <h3>Who qualifies</h3>
      <ul>
        <li>You're enrolled in a degree- or diploma-granting program (high school counts in many cases).</li>
        <li>You're 13+ and have a GitHub account.</li>
        <li>You can prove enrollment — ideally a school email, or a document.</li>
      </ul>

      <h3>How to verify (5 minutes)</h3>
      <ol>
        <li>Create or sign in to your <a href="https://github.com" target="_blank" rel="noopener">GitHub</a> account.</li>
        <li>Go to <a href="https://education.github.com/pack" target="_blank" rel="noopener">education.github.com/pack</a> and click <em>Get the pack</em>.</li>
        <li>Add your <strong>school email</strong> to your account first — it makes approval near-instant.</li>
        <li>No school email? Upload a dated proof of enrollment (student ID, transcript, or acceptance letter). Make the name and date clearly visible.</li>
        <li>Allow GitHub to use your location during the request; it speeds up review.</li>
      </ol>

      <div class="guide-note">
        <strong>If you're rejected:</strong> the usual cause is an unreadable or undated document. Re-apply with a clear photo where your name, school name, and a current date are all visible. A current-term schedule or enrollment letter works better than an ID with no date.
      </div>

      <h3>Redeem these first</h3>
      <p>Don't try to claim all 100+ offers. Grab the few that actually save you money or ship projects:</p>
      <ul>
        <li><strong>GitHub Copilot Pro</strong> — free while you're a student. The headline perk.</li>
        <li><strong>Namecheap / .me domain</strong> — a free year of a domain plus an SSL cert for your portfolio.</li>
        <li><strong>DigitalOcean / Azure / Heroku-style credits</strong> — real hosting credit for side projects.</li>
        <li><strong>Notion, Sentry, Datadog, Frontend Masters / educative</strong> — pro tiers and paid courses, free.</li>
        <li><strong>JetBrains</strong> — the whole IDE suite free (also available directly via their student plan).</li>
      </ul>

      <h3>Tips</h3>
      <ul>
        <li>Renew before your verification lapses — GitHub re-checks roughly once a year.</li>
        <li>Set a calendar reminder for credits that expire (cloud credits especially).</li>
        <li>Keep your school email attached to GitHub so renewals stay frictionless.</li>
      </ul>
      <p class="guide-xref">Stuck on the proof step? See <a href="#guide/verify-student">Verify as a student</a>.</p>
    `
  },

  {
    slug: "verify-student",
    icon: "🪪",
    title: "Verify as a student",
    blurb: "How SheerID, .edu emails and document checks work — and how to pass them so perks actually unlock.",
    readMins: 5,
    tags: ["verification", "sheerid", "edu", "perks"],
    body: `
      <p class="guide-lead">Most student perks gate behind a quick check that you're really enrolled. Once you understand the three ways it's done, passing is usually a two-minute job.</p>

      <h3>The three methods</h3>
      <ul>
        <li><strong>School email (.edu / .ac.uk / etc.)</strong> — the fastest. You click a link in an email sent to your school address. Instant.</li>
        <li><strong>SheerID</strong> — a third-party verifier used by Spotify, Notion, Figma, and many others. You enter your school and name; it checks enrollment databases automatically.</li>
        <li><strong>Document upload</strong> — the fallback when the automatic check can't find you. You upload a dated proof.</li>
      </ul>

      <h3>What counts as proof</h3>
      <p>Any official document showing <strong>your name + your school's name + a date within the current term</strong>:</p>
      <ul>
        <li>Class schedule or enrollment verification letter (best — always dated).</li>
        <li>Tuition receipt or fee statement.</li>
        <li>Transcript with a current date.</li>
        <li>Student ID <em>only if</em> it shows an expiry or current year (many don't — pair it with a dated doc).</li>
      </ul>

      <h3>Step-by-step</h3>
      <ol>
        <li>Try the <strong>school-email</strong> option first whenever it's offered.</li>
        <li>If using SheerID, type your school's <em>official full name</em> exactly, and the name your school has on file.</li>
        <li>If asked for a document, photograph it flat, in good light, with all four corners visible.</li>
        <li>Make sure the name, school, and date are all legible — crop out everything else.</li>
        <li>Submit a PDF or PNG; avoid blurry screenshots.</li>
      </ol>

      <div class="guide-note">
        <strong>If you're rejected:</strong> 90% of the time it's a name mismatch or a missing date. Use the exact legal name your school has on record, and pick a document with a visible current-term date. You can almost always re-submit.
      </div>

      <h3>No .edu email?</h3>
      <p>You can still verify. Most services accept the document route, and SheerID checks enrollment directly — no school email required. Community college and many international and online programs qualify too.</p>

      <div class="guide-note">
        <strong>Privacy:</strong> verifiers only confirm enrollment status — they don't share your documents with the company offering the perk. Still, only upload to the official verification page (check the URL), never to a random link from an email.
      </div>
    `
  },

  {
    slug: "win-scholarships",
    icon: "🏆",
    title: "Find & win scholarships",
    blurb: "Where the legit money is, how to dodge scams, and an essay approach that actually wins.",
    readMins: 7,
    tags: ["scholarships", "money", "essays", "college"],
    body: `
      <p class="guide-lead">Billions in scholarships go unclaimed every year — not because they're hidden, but because applying is tedious and most students give up. A simple system beats raw talent here.</p>

      <h3>Where to find legit ones</h3>
      <ul>
        <li>Your school's counseling office and your college's financial-aid page — the highest-odds, least-competition source.</li>
        <li>Local: community foundations, Rotary/Kiwanis, credit unions, employers (yours or your parents'), and faith or cultural groups.</li>
        <li>Reputable databases: Going Merry, Bold.org, Scholarships.com, Fastweb, and the College Board's BigFuture.</li>
        <li>Field- and identity-specific awards — these have far smaller applicant pools.</li>
      </ul>
      <p class="guide-xref">Browse the <a href="#sch">Scholarships tab</a> for a curated list, or take the <a href="#foryou">For You quiz</a> to match by eligibility.</p>

      <h3>Spot and avoid scams</h3>
      <div class="guide-note">
        <strong>Red flags — walk away if:</strong> there's an application or "processing" fee, it's "guaranteed," it asks for your bank account or SSN to "hold" the award, or you won a scholarship you never applied for. <strong>Legit scholarships never charge you to apply.</strong>
      </div>

      <h3>Build a system, not a one-off</h3>
      <ul>
        <li>Keep a spreadsheet: name, amount, deadline, requirements, status.</li>
        <li>Apply to many smaller, local awards — your odds on a $500 local award crush your odds on a national $20k one.</li>
        <li>Write a few <strong>base essays</strong> (e.g. "a challenge you overcame", "why this field", "community") and adapt them per prompt instead of starting cold each time.</li>
        <li>Block a recurring hour each week. Consistency wins this game.</li>
      </ul>

      <h3>Write essays that win</h3>
      <ul>
        <li><strong>Answer the actual prompt</strong> in the first two sentences. Readers skim.</li>
        <li><strong>Be specific and concrete.</strong> One vivid, true story beats five vague claims about being "passionate" and "hard-working".</li>
        <li><strong>Show change.</strong> What did you do, and how did it change you or others? Reflection is what reviewers reward.</li>
        <li><strong>Match the mission.</strong> Echo what the sponsoring organization cares about.</li>
        <li><strong>Proofread out loud</strong> and have one other person read it. Typos read as "didn't care".</li>
      </ul>

      <h3>After you apply</h3>
      <p>Track outcomes, reuse and improve your strongest essays, and send a short thank-you if you win — some awards renew yearly, and a good impression matters. Rejections are just odds; keep volume up.</p>
    `
  },

  {
    slug: "summer-research",
    icon: "🔬",
    title: "Land summer research / REUs",
    blurb: "Find funded summer research and REUs, hit the right timeline, and apply in a way that gets you in.",
    readMins: 6,
    tags: ["research", "reu", "summer", "stem", "internships"],
    body: `
      <p class="guide-lead">A summer research program is one of the best things you can do for a STEM path — you do real work, get mentored, and often get <em>paid</em>. Many are fully funded with a stipend and housing. The catch is they fill up months ahead, so timing matters as much as your résumé.</p>

      <h3>What an REU is</h3>
      <p>"REU" = Research Experiences for Undergraduates, an NSF-funded program where you join a lab for ~8–10 weeks, usually with a <strong>stipend (~$4–6k), free housing, and travel</strong>. There are parallel programs for high schoolers (e.g. RSI, SSP, university summer research) too.</p>

      <h3>Where to find them</h3>
      <ul>
        <li><a href="https://etap.nsf.gov" target="_blank" rel="noopener">NSF ETAP / REU site search</a> — the official list, filterable by field.</li>
        <li><a href="https://www.pathwaystoscience.org/programs.aspx" target="_blank" rel="noopener">Pathways to Science</a> — a huge searchable database of summer programs and REUs.</li>
        <li>University "summer research" pages — most large universities run their own funded programs.</li>
        <li>Your own department's faculty (the direct route).</li>
      </ul>

      <h3>The timeline (this is the part people miss)</h3>
      <ul>
        <li><strong>Fall:</strong> make a list, note deadlines, line up recommenders.</li>
        <li><strong>December–February:</strong> most deadlines land here. Apply early in the window — some review on a rolling basis.</li>
        <li><strong>March–April:</strong> decisions arrive. Have backups.</li>
      </ul>

      <h3>Make a strong application</h3>
      <ul>
        <li>Ask for recommendation letters <strong>3–4 weeks ahead</strong>, and give recommenders your résumé and a note on what to highlight.</li>
        <li>Tailor your statement to <em>that</em> program — name labs or projects you'd want to work in.</li>
        <li>Lead with concrete skills and any prior project, class, or self-study, even small ones.</li>
        <li>Apply broadly — these are competitive; 8–15 applications is reasonable.</li>
      </ul>

      <h3>Remote &amp; free options</h3>
      <p>Can't relocate or didn't get a funded spot? Remote research is real — data, computational, and literature work all happen online. The most reliable way in is to email professors directly.</p>
      <p class="guide-xref">Next step: <a href="#guide/cold-email-research">Cold-email a professor for research</a> — the exact template that gets replies.</p>
    `
  }
];
