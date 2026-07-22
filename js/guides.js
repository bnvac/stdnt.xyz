/*
 * guides.js - in-site how-to guides shown on the Guides tab.
 * Plain data: each guide has { slug, icon, title, blurb, readMins, tags, body }.
 * `body` is first-party HTML rendered into the reading overlay (see app.js).
 * To add a guide: copy a block, give it a unique slug, write the body. No build step.
 */
window.GUIDES = [
  {
    slug: "cold-email-research",
    icon: "envelope",
    title: "Cold-email a professor for research",
    blurb: "How students land free, often-remote research by emailing professors the right way - with a proven template.",
    readMins: 6,
    tags: ["research", "email", "internships", "college"],
    body: `
      <p class="guide-lead">You do not need connections to do real research. Every year students get into labs - often remote, often as a high-schooler or first-year - just by sending a short, specific email to the right professor. Most students never try, so the ones who do stand out.</p>

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
        <li><strong>A small, clear ask</strong> - a short call, or whether they take volunteer/remote help.</li>
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
        <li>Email 10-20 professors, not one. A 10-20% reply rate is normal - volume is part of the strategy.</li>
        <li>Send Tuesday - Thursday mornings. Avoid Friday afternoons and holidays.</li>
        <li>No reply in 7-10 days? Send <em>one</em> short, polite follow-up. Then move on.</li>
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
    icon: "cap",
    title: "Claim the GitHub Student Pack",
    blurb: "Unlock $200k+ of free developer tools, cloud credits and domains - how to verify and what to redeem first.",
    readMins: 5,
    tags: ["github", "developer", "free", "cloud", "perks"],
    body: `
      <p class="guide-lead">The <a href="https://education.github.com/pack" target="_blank" rel="noopener">GitHub Student Developer Pack</a> is the single best freebie for any student who writes code: free cloud hosting, domains, AI tools, and pro software, bundled into one verification. Total value is well over $200k.</p>

      <h3>Who qualifies</h3>
      <ul>
        <li>You're enrolled in a degree- or diploma-granting program (high school counts in many cases).</li>
        <li>You're 13+ and have a GitHub account.</li>
        <li>You can prove enrollment - ideally a school email, or a document.</li>
      </ul>

      <h3>How to verify (5 minutes)</h3>
      <ol>
        <li>Create or sign in to your <a href="https://github.com" target="_blank" rel="noopener">GitHub</a> account.</li>
        <li>Go to <a href="https://education.github.com/pack" target="_blank" rel="noopener">education.github.com/pack</a> and click <em>Get the pack</em>.</li>
        <li>Add your <strong>school email</strong> to your account first - it makes approval near-instant.</li>
        <li>No school email? Upload a dated proof of enrollment (student ID, transcript, or acceptance letter). Make the name and date clearly visible.</li>
        <li>Allow GitHub to use your location during the request; it speeds up review.</li>
      </ol>

      <div class="guide-note">
        <strong>If you're rejected:</strong> the usual cause is an unreadable or undated document. Re-apply with a clear photo where your name, school name, and a current date are all visible. A current-term schedule or enrollment letter works better than an ID with no date.
      </div>

      <h3>Redeem these first</h3>
      <p>Don't try to claim all 100+ offers. Grab the few that actually save you money or ship projects:</p>
      <ul>
        <li><strong>GitHub Copilot Pro</strong> - free while you're a student. The headline perk.</li>
        <li><strong>Namecheap / .me domain</strong> - a free year of a domain plus an SSL cert for your portfolio.</li>
        <li><strong>DigitalOcean / Azure / Heroku-style credits</strong> - real hosting credit for side projects.</li>
        <li><strong>Notion, Sentry, Datadog, Frontend Masters / educative</strong> - pro tiers and paid courses, free.</li>
        <li><strong>JetBrains</strong> - the whole IDE suite free (also available directly via their student plan).</li>
      </ul>

      <h3>Tips</h3>
      <ul>
        <li>Renew before your verification lapses - GitHub re-checks roughly once a year.</li>
        <li>Set a calendar reminder for credits that expire (cloud credits especially).</li>
        <li>Keep your school email attached to GitHub so renewals stay frictionless.</li>
      </ul>
      <p class="guide-xref">Stuck on the proof step? See <a href="#guide/verify-student">Verify as a student</a>.</p>
    `
  },

  {
    slug: "verify-student",
    icon: "id",
    title: "Verify as a student",
    blurb: "How SheerID, .edu emails and document checks work - and how to pass them so perks actually unlock.",
    readMins: 5,
    tags: ["verification", "sheerid", "edu", "perks"],
    body: `
      <p class="guide-lead">Most student perks gate behind a quick check that you're really enrolled. Once you understand the three ways it's done, passing is usually a two-minute job.</p>

      <h3>The three methods</h3>
      <ul>
        <li><strong>School email (.edu / .ac.uk / etc.)</strong> - the fastest. You click a link in an email sent to your school address. Instant.</li>
        <li><strong>SheerID</strong> - a third-party verifier used by Spotify, Notion, Figma, and many others. You enter your school and name; it checks enrollment databases automatically.</li>
        <li><strong>Document upload</strong> - the fallback when the automatic check can't find you. You upload a dated proof.</li>
      </ul>

      <h3>What counts as proof</h3>
      <p>Any official document showing <strong>your name + your school's name + a date within the current term</strong>:</p>
      <ul>
        <li>Class schedule or enrollment verification letter (best - always dated).</li>
        <li>Tuition receipt or fee statement.</li>
        <li>Transcript with a current date.</li>
        <li>Student ID <em>only if</em> it shows an expiry or current year (many don't - pair it with a dated doc).</li>
      </ul>

      <h3>Step-by-step</h3>
      <ol>
        <li>Try the <strong>school-email</strong> option first whenever it's offered.</li>
        <li>If using SheerID, type your school's <em>official full name</em> exactly, and the name your school has on file.</li>
        <li>If asked for a document, photograph it flat, in good light, with all four corners visible.</li>
        <li>Make sure the name, school, and date are all legible - crop out everything else.</li>
        <li>Submit a PDF or PNG; avoid blurry screenshots.</li>
      </ol>

      <div class="guide-note">
        <strong>If you're rejected:</strong> 90% of the time it's a name mismatch or a missing date. Use the exact legal name your school has on record, and pick a document with a visible current-term date. You can almost always re-submit.
      </div>

      <h3>No .edu email?</h3>
      <p>You can still verify. Most services accept the document route, and SheerID checks enrollment directly - no school email required. Community college and many international and online programs qualify too.</p>

      <div class="guide-note">
        <strong>Privacy:</strong> verifiers only confirm enrollment status - they don't share your documents with the company offering the perk. Still, only upload to the official verification page (check the URL), never to a random link from an email.
      </div>
    `
  },

  {
    slug: "win-scholarships",
    icon: "trophy",
    title: "Find & win scholarships",
    blurb: "Where the legit money is, how to dodge scams, and an essay approach that actually wins.",
    readMins: 7,
    tags: ["scholarships", "money", "essays", "college"],
    body: `
      <p class="guide-lead">Billions in scholarships go unclaimed every year - not because they're hidden, but because applying is tedious and most students give up. A simple system beats raw talent here.</p>

      <h3>Where to find legit ones</h3>
      <ul>
        <li>Your school's counseling office and your college's financial-aid page - the highest-odds, least-competition source.</li>
        <li>Local: community foundations, Rotary/Kiwanis, credit unions, employers (yours or your parents'), and faith or cultural groups.</li>
        <li>Reputable databases: Going Merry, Bold.org, Scholarships.com, Fastweb, and the College Board's BigFuture.</li>
        <li>Field- and identity-specific awards - these have far smaller applicant pools.</li>
      </ul>
      <p class="guide-xref">Browse the <a href="#sch">Scholarships tab</a> for a curated list, or take the <a href="#foryou">For You quiz</a> to match by eligibility.</p>

      <h3>Spot and avoid scams</h3>
      <div class="guide-note">
        <strong>Red flags - walk away if:</strong> there's an application or "processing" fee, it's "guaranteed," it asks for your bank account or SSN to "hold" the award, or you won a scholarship you never applied for. <strong>Legit scholarships never charge you to apply.</strong>
      </div>

      <h3>Build a system, not a one-off</h3>
      <ul>
        <li>Keep a spreadsheet: name, amount, deadline, requirements, status.</li>
        <li>Apply to many smaller, local awards - your odds on a $500 local award crush your odds on a national $20k one.</li>
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
      <p>Track outcomes, reuse and improve your strongest essays, and send a short thank-you if you win - some awards renew yearly, and a good impression matters. Rejections are just odds; keep volume up.</p>
    `
  },

  {
    slug: "summer-research",
    icon: "flask",
    title: "Land summer research / REUs",
    blurb: "Find funded summer research and REUs, hit the right timeline, and apply in a way that gets you in.",
    readMins: 6,
    tags: ["research", "reu", "summer", "stem", "internships"],
    body: `
      <p class="guide-lead">A summer research program is one of the best things you can do for a STEM path - you do real work, get mentored, and often get <em>paid</em>. Many are fully funded with a stipend and housing. The catch is they fill up months ahead, so timing matters as much as your résumé.</p>

      <h3>What an REU is</h3>
      <p>"REU" = Research Experiences for Undergraduates, an NSF-funded program where you join a lab for ~8-10 weeks, usually with a <strong>stipend (~$4-6k), free housing, and travel</strong>. There are parallel programs for high schoolers (e.g. RSI, SSP, university summer research) too.</p>

      <h3>Where to find them</h3>
      <ul>
        <li><a href="https://etap.nsf.gov" target="_blank" rel="noopener">NSF ETAP / REU site search</a> - the official list, filterable by field.</li>
        <li><a href="https://www.pathwaystoscience.org/programs.aspx" target="_blank" rel="noopener">Pathways to Science</a> - a huge searchable database of summer programs and REUs.</li>
        <li>University "summer research" pages - most large universities run their own funded programs.</li>
        <li>Your own department's faculty (the direct route).</li>
      </ul>

      <h3>The timeline (this is the part people miss)</h3>
      <ul>
        <li><strong>Fall:</strong> make a list, note deadlines, line up recommenders.</li>
        <li><strong>December - February:</strong> most deadlines land here. Apply early in the window - some review on a rolling basis.</li>
        <li><strong>March - April:</strong> decisions arrive. Have backups.</li>
      </ul>

      <h3>Make a strong application</h3>
      <ul>
        <li>Ask for recommendation letters <strong>3-4 weeks ahead</strong>, and give recommenders your résumé and a note on what to highlight.</li>
        <li>Tailor your statement to <em>that</em> program - name labs or projects you'd want to work in.</li>
        <li>Lead with concrete skills and any prior project, class, or self-study, even small ones.</li>
        <li>Apply broadly - these are competitive; 8-15 applications is reasonable.</li>
      </ul>

      <h3>Remote &amp; free options</h3>
      <p>Can't relocate or didn't get a funded spot? Remote research is real - data, computational, and literature work all happen online. The most reliable way in is to email professors directly.</p>
      <p class="guide-xref">Next step: <a href="#guide/cold-email-research">Cold-email a professor for research</a> - the exact template that gets replies.</p>
    `
  },

  {
    slug: "stem-competitions",
    icon: "medal",
    title: "STEM competitions for high schoolers",
    blurb: "The most beginner-friendly way to find what you love in STEM - the main contests and how to actually study for them.",
    readMins: 7,
    tags: ["competitions", "stem", "math", "science", "high school"],
    body: `
      <p class="guide-lead">Competitions are the best low-stakes way to discover what you enjoy - and you'll often place well at the regional level just by showing up prepared. If your school doesn't have a team, that's your opening: find a teacher and start one.</p>

      <h3>Start here (team, beginner-friendly)</h3>
      <ul>
        <li><strong>Science Olympiad</strong> - a 15-person team with 20+ "events" across science and engineering (study, build, and lab events). Great for going deep on topics you like. Use the official site, the student-run wiki, and the forums.</li>
        <li><strong>Science Bowl</strong> - fast buzzer trivia, teams of 4, covering physics, chem, bio, earth science, math, and a little CS. You either know it in 5-15 seconds or you don't.</li>
        <li><strong>Quiz Bowl</strong> - buzzer trivia across <em>everything</em>: sciences, history, fine arts, and pop culture. Practice on Protobowl / QuizDB.</li>
      </ul>

      <h3>Subject olympiads (solo, deeper)</h3>
      <ul>
        <li><strong>Biology - USABO:</strong> a hard 50-minute exam; top scorers advance to semifinals and then a national camp. Read Campbell's, then a cell/molecular and a plant text, then drill past tests.</li>
        <li><strong>Chemistry - USNCO</strong> (local → national → study camp). <strong>Physics - F=ma → USAPhO.</strong></li>
        <li><strong>Computing - USACO:</strong> four contests a year, divisions Bronze → Silver → Gold → Platinum. Learn data structures &amp; algorithms and practice on usaco.guide and Codeforces.</li>
        <li><strong>Astronomy (USAAAO), Earth Science (USESO), Neuroscience (Brain Bee - based on the <em>Brain Facts</em> book).</strong></li>
      </ul>

      <h3>Math</h3>
      <p>The ladder is <strong>AMC 10/12 → AIME → USA(J)MO</strong>. Art of Problem Solving (AoPS) has a free wiki of past problems and forums; its books and classes cost money.</p>

      <h3>Humanities &amp; beyond</h3>
      <p>Academic Decathlon (10 events, GPA-based divisions), Speech &amp; Debate, Model UN, the Scholastic Art &amp; Writing Awards, Linguistics (NACLO), robotics (FRC/FTC/VEX), innovation/pitch contests (Conrad, Diamond Challenge), and <a href="https://hackathons.hackclub.com" target="_blank" rel="noopener">hackathons</a>.</p>

      <div class="guide-note">
        <strong>How to study (any of them):</strong> pick subjects you actually enjoy, learn from textbooks + Khan Academy/YouTube, and grind past papers - keeping a list of what you miss. Then join the Discord or forum for your competition; that's where the free practice tests, binders, and study groups live.
      </div>

      <p class="guide-xref">Ready to go deeper than contests? See <a href="#guide/hs-research">Do real research in high school</a> and <a href="#guide/summer-research">Land summer research / REUs</a>.</p>
      <p class="guide-credit">Distilled from crowdsourced student guides - verify current rules and dates.</p>
    `
  },

  {
    slug: "hs-research",
    icon: "flask",
    title: "Do real research in high school",
    blurb: "How the research path actually works - getting a mentor, doing a project, and competing at science fairs like ISEF and STS.",
    readMins: 7,
    tags: ["research", "science fair", "isef", "mentorship", "high school"],
    body: `
      <p class="guide-lead">A genuine, hands-on project is your first real step into a scientific field - and a strong signal for college and beyond. Here's how the path actually works.</p>

      <h3>Research vs. internship</h3>
      <p>An <strong>internship</strong> means helping with or observing a mentor's work. <strong>Research</strong> means running your own project and writing your own paper you can submit to competitions. Aim for the latter when you can - but interning first is a perfectly good on-ramp.</p>

      <h3>How to get started</h3>
      <ol>
        <li><strong>Find a topic.</strong> Read papers on things you're curious about (Google Scholar; Nature's "News &amp; Views" gives accessible summaries) or watch a research symposium.</li>
        <li><strong>Get a mentor.</strong> Two routes: apply to programs that place you with one, or contact a professor directly.</li>
        <li><strong>Start small.</strong> Shadow, learn to read the literature and the method, then take on a spinoff project of your own.</li>
      </ol>

      <div class="guide-note">
        <strong>Treat program applications like college admissions.</strong> Many flagship programs admit under ~10%, and most applicants have similar clubs and awards - so the essays are where you stand out. Apply to a few less-famous "safety" programs too; don't bet everything on RSI.
      </div>

      <h3>Where to find mentors &amp; programs</h3>
      <ul>
        <li>The "educational outreach" / summer-research pages of universities near you - many fund travel and housing.</li>
        <li>Established examples: Simons (Stony Brook), SSP, RSI (MIT - extremely selective), Garcia, CSHL Partners for the Future, state Governor's Schools, and MIT THINK (you propose a project instead of doing it first).</li>
        <li><strong>Student-run research organizations and communities</strong> - groups like <strong>NSRI</strong> and <strong>Synthica</strong>, plus subject-specific Discords, where high schoolers share opportunities and find collaborators and mentors.</li>
      </ul>

      <h3>Compete with your project</h3>
      <ul>
        <li><strong>Regeneron ISEF</strong> - the largest fair; you qualify through a regional or state fair and present a board/poster.</li>
        <li><strong>Regeneron STS</strong> - the most prestigious; it judges your research <em>and</em> your whole academic profile through many essays, so start early.</li>
        <li>Also: JSHS, Davidson Fellows, Junior Academies of Science, BioGENEius, and the Breakthrough Junior Challenge.</li>
      </ul>

      <p class="guide-xref">Getting the mentor is the hard part - see <a href="#guide/cold-email-research">Cold-email a professor for research</a>. For funded summer placements, see <a href="#guide/summer-research">Land summer research / REUs</a>.</p>
      <p class="guide-credit">Distilled from crowdsourced student guides - verify current programs and deadlines.</p>
    `
  },

  {
    slug: "college-admissions",
    icon: "clipboard",
    title: "The college admissions playbook",
    blurb: "How holistic admissions really work - the 'spike,' what GPA/APs actually matter, and a grade-by-grade timeline.",
    readMins: 7,
    tags: ["college", "admissions", "gpa", "strategy", "high school"],
    body: `
      <p class="guide-lead">Admissions at selective schools are <strong>holistic</strong> - GPA and APs are a smaller piece than you think. The biggest lever is finding something you genuinely love and going deep on it.</p>

      <div class="guide-note">
        Don't start panicking freshman year - it's unhealthy and unnecessary. Spend most of high school exploring: join lots of clubs, then narrow to a handful you actually care about. <strong>Quality over quantity.</strong>
      </div>

      <h3>The "spike" / passion model</h3>
      <p>Pick a subject or skill you find genuinely cool, then proactively pursue it until you're excellent. With internet access you can self-teach almost anything to a high level. This makes high school fulfilling, gives you real accomplishments to show - and even if you don't get your dream school, the skills set you up for success anyway. It's a win-win.</p>

      <h3>GPA &amp; rank</h3>
      <p>Don't obsess over GPA. Roughly above a 3.6 / 94 is excellent for top schools; aim to land within a school's 25th - 75th percentile. <strong>Class rank</strong> (top 5-10%) often matters more than small GPA differences.</p>

      <h3>APs</h3>
      <p>You don't need 15 APs. Take the most rigorous courses that fit your interests and do well in them. Exam scores mostly earn college credit - and many schools grant little - so don't stress a couple of lower scores.</p>

      <h3>A rough timeline</h3>
      <ul>
        <li><strong>Grades 9-10:</strong> explore widely, build extracurriculars.</li>
        <li><strong>Early grade 11:</strong> study for the PSAT (National Merit), start the SAT/ACT, begin your college list.</li>
        <li><strong>Summer before 12:</strong> draft essays, finalize your list.</li>
        <li><strong>Fall grade 12:</strong> applications - and keep your grades up; colleges see senior year.</li>
      </ul>

      <p class="guide-xref">Go deeper: <a href="#guide/sat-act">Ace the SAT &amp; ACT</a> · <a href="#guide/college-essay">Write a standout college essay</a> · <a href="#guide/college-apps">College lists, deadlines &amp; rec letters</a>. Also browse <a href="#sch">Scholarships</a> and the <a href="#foryou">For You quiz</a>.</p>
      <p class="guide-credit">Distilled from crowdsourced student advice - admissions specifics change, so verify before relying on any detail.</p>
    `
  },

  {
    slug: "sat-act",
    icon: "pencil",
    title: "Ace the SAT & ACT",
    blurb: "How to choose between them, study for free to a great score, and why the PSAT might matter most of all.",
    readMins: 6,
    tags: ["sat", "act", "psat", "testing", "college"],
    body: `
      <p class="guide-lead">Test scores aren't the whole picture, but they're one of the first things an admissions officer notices - and nobody perfect-scores by winging it. The good news: you can self-study to a strong score for free.</p>

      <h3>SAT or ACT?</h3>
      <ul>
        <li><strong>SAT:</strong> harder questions but more time each - rewards critical thinking.</li>
        <li><strong>ACT:</strong> easier questions but very little time - rewards speed and fast reading, and has a science (graph-reading) section.</li>
        <li><strong>Take one timed practice test of each before studying</strong>, then commit to whichever fits you. Rough targets: top schools ~1500+ SAT / ~34+ ACT; mid-high tier ~1430+ / ~30+. You do <em>not</em> need a perfect score to get in.</li>
      </ul>

      <h3>How to study (free first)</h3>
      <ul>
        <li>Official practice tests are the best resource. Do timed sections, then review <em>every</em> miss and write down why you got it wrong.</li>
        <li><strong>Khan Academy</strong> (free) is excellent; <strong>UWorld</strong> (paid) is a strong extra question bank.</li>
        <li>Popular books: <strong>College Panda</strong> (math), <strong>Erica Meltzer</strong> (English), and the SAT <strong>"Black Book"</strong> for strategy.</li>
        <li>Join a study Discord for free PDFs and motivation.</li>
      </ul>

      <div class="guide-note">
        <strong>Skip the $1,000s prep classes.</strong> Self-study is usually cheaper and more effective; if you need help, a basic math/English tutor beats a big-name course. And you can test almost any month (Sept - Aug) - there's no secret "easy curve" month.
      </div>

      <h3>Don't sleep on the PSAT</h3>
      <p>A strong junior-year PSAT can make you a <strong>National Merit</strong> semifinalist/finalist - an award that brings real scholarship offers and perks. Plenty of students say it did more for them than the SAT itself.</p>

      <p class="guide-xref">See the big picture in <a href="#guide/college-admissions">The college admissions playbook</a>.</p>
    `
  },

  {
    slug: "college-essay",
    icon: "pencil",
    title: "Write a standout college essay",
    blurb: "The essay is where you stop being a stat sheet and become a person - a process that works, from blank page to final edit.",
    readMins: 8,
    tags: ["college", "essays", "personal statement", "writing"],
    body: `
      <p class="guide-lead">Your essays may matter as much as your resume and more than your test scores. Until your essay, you look like every other qualified applicant - the essay is where you become a person.</p>

      <h3>What you're writing</h3>
      <p>One <strong>650-word personal statement</strong> (sent to every school via the Common App) plus <strong>supplemental essays</strong> specific to each college (Why us / Why major / community, etc.). Supplements deserve equal attention - and require real research on the school.</p>

      <h3>The personal statement is about you, not your achievements</h3>
      <p>It should reveal the inner you that isn't visible anywhere else in your application. Be specific, honest, and a little vulnerable. A "generic" topic is fine if it's truly about how something <em>changed you</em>. Make it something only you could have written - if your activities are covered elsewhere, don't just re-list them here.</p>

      <h3>A process that works <span style="font-weight:400">(adapted from AdmissionsMom's guide)</span></h3>
      <ol>
        <li><strong>Stop reading other people's accepted essays</strong> - they get in your head and most aren't as good as they seem.</li>
        <li><strong>Warm up:</strong> set a one-minute timer and list everything you love / value / believe.</li>
        <li><strong>Go within</strong> - write answers to: What do I believe? What keeps me up at night? What's my superpower? What reminds me of home?</li>
        <li><strong>Free-write fast</strong> (try themostdangerouswritingapp.com) on a couple of those prompts.</li>
        <li><strong>Draft</strong> using an "I believe / I wonder" lens - lean toward reflection, not just narrative.</li>
        <li><strong>Add specific details</strong> - vague = forgettable. Fix every vague sentence.</li>
        <li><strong>Edit hard</strong> - read it aloud, on paper, and backward; cut adverbs / "really" / "very"; use contractions; have one trusted person read it.</li>
      </ol>

      <div class="guide-note">
        For "Why us" essays, name real classes, clubs, professors - even a campus problem you'd help fix. Saying you value community is fine; saying <em>exactly how</em> you'll contribute is a game-changer.
      </div>

      <h3>Free feedback</h3>
      <p>Trade essays with other applicants, use CollegeVine, and the r/ApplyingToCollege and r/CollegeEssayReview communities (take all feedback with a grain of salt). Read real "essays that worked" published by schools like JHU, Tufts, and Harvard.</p>

      <p class="guide-xref">Pair this with <a href="#guide/college-apps">College lists, deadlines &amp; rec letters</a>.</p>
    `
  },

  {
    slug: "college-apps",
    icon: "folder",
    title: "College lists, deadlines & rec letters",
    blurb: "The strategy around your app - ED vs EA, a balanced list, fly-in programs, and how to get a glowing recommendation.",
    readMins: 8,
    tags: ["college", "early decision", "recommendations", "applications"],
    body: `
      <p class="guide-lead">Where you apply, when, and who vouches for you is as important as the application itself.</p>

      <h3>Deadlines: ED / EA / REA / RD</h3>
      <ul>
        <li><strong>Regular Decision (RD):</strong> apply ~January, results ~March.</li>
        <li><strong>Early Action (EA):</strong> apply ~November, results ~December; non-binding, can boost chances and unlock early scholarship offers at state schools.</li>
        <li><strong>Early Decision (ED) / Restricted Early Action (REA):</strong> one school only. ED is <strong>binding</strong> (you must attend if admitted and the aid works). Do ED only for a clear #1 - it's the strongest "demonstrated interest" you can show.</li>
        <li>Most ED/REA plans still let you apply EA to public/state schools - do that for a financial-aid backup. And keep senior grades up; colleges see them.</li>
      </ul>

      <h3>Build a balanced list</h3>
      <ul>
        <li><strong>Safety / Match / Reach</strong> - and don't apply to more than ~10 (quality drops fast). Pick for fit first (where you'd want to live and vibe with people), then for your major/field.</li>
        <li>Research with current students (Reddit/Discord), accepted-student profiles, and tools like Naviance Supermatch. Treat rankings (even US News) as rough, and don't over-trust College Confidential.</li>
        <li><strong>Premed tip:</strong> weigh GPA deflation - a high GPA matters a lot for med-school applications later.</li>
      </ul>

      <h3>Fly-in &amp; overnight programs</h3>
      <p>Free multi-day campus visits (often for low-income or underrepresented students). They give deep insight into student life, frequently boost your admissions odds, sometimes waive fees - and double as great essay practice. Ask any school of interest whether they offer one.</p>

      <h3>Your activities list &gt; your test score</h3>
      <p>The Common App takes 10 activities. Caretaking, hobbies (with a sample of your work), and self-driven projects all count. Show <strong>initiative and impact</strong>, not just titles.</p>

      <h3>Recommendation letters</h3>
      <p>Usually one counselor + 1-2 teachers, ideally <strong>core-subject teachers from 10th/11th grade who know you well</strong>. An "A" isn't enough - pick teachers who can speak to your curiosity, maturity, and initiative. Don't exceed ~3-4 letters total, and avoid family/friend letters. Make it easy for them: thank them, then hand over a short "brag sheet" with 2-4 traits and specific moments you'd love them to highlight.</p>

      <div class="guide-tpl">
        <button class="guide-copy" type="button" data-copy aria-label="Copy brag sheet">Copy</button>
        <pre>Dear [Teacher],

Thank you so much for agreeing to write my recommendation. To make it
easier, here are a few traits and specific moments I'd be grateful if
you could highlight:

1) [Trait, e.g. intellectual curiosity]: [a specific moment from your
   class, e.g. the synesthesia paper I chose for our sophomore unit].
2) [Trait, e.g. initiative / leadership]: [specific example, e.g. the
   study guides I made before our exam].
3) [Trait, e.g. resilience]: [specific example].

For context, the through-line of my application is [your "brand" in one
line, e.g. a quantitative thinker who wants to use data for social good].

Thank you again - it genuinely means a lot.

Best,
[Your name]</pre>
      </div>

      <p class="guide-xref">See also <a href="#guide/college-essay">Write a standout college essay</a> and <a href="#guide/college-admissions">The college admissions playbook</a>.</p>
      <p class="guide-credit">Distilled from crowdsourced student guides and r/ApplyingToCollege - verify current deadlines and policies.</p>
    `
  },

  {
    slug: "financial-aid",
    icon: "cash",
    title: "Get financial aid (FAFSA & beyond)",
    blurb: "How to actually pay for college: file the FAFSA, understand grants vs loans, and appeal a weak offer.",
    readMins: 7,
    tags: ["financial aid", "fafsa", "money", "college", "loans"],
    body: `
      <p class="guide-lead">The sticker price of a college is almost never what people pay. Financial aid - grants, scholarships, work-study, and loans - is how. The single most important thing you can do is <strong>file the FAFSA</strong>, and file it early.</p>

      <h3>Start with the FAFSA (it's free)</h3>
      <ul>
        <li>The <strong>FAFSA</strong> (Free Application for Federal Student Aid) unlocks federal grants, work-study, and loans - and most colleges and states use it for <em>their</em> aid too. Fill it out at <a href="https://studentaid.gov" target="_blank" rel="noopener">studentaid.gov</a>.</li>
        <li><strong>File it even if you think you won't qualify.</strong> Many merit awards and payment options require a FAFSA on file, and eligibility surprises people.</li>
        <li><strong>File as early as you can</strong> after it opens - some aid is first-come, first-served, and states/colleges have their own earlier deadlines.</li>
        <li>Some private colleges also require the <strong>CSS Profile</strong> for their own institutional aid. Check each school's requirements.</li>
      </ul>

      <div class="guide-note">
        <strong>It's called <em>Free</em> for a reason.</strong> Never pay a site to file your FAFSA - the official one at studentaid.gov costs nothing. Anyone charging to "submit" it for you is a scam or an upsell.
      </div>

      <h3>Know what kind of aid you're getting</h3>
      <ul>
        <li><strong>Grants &amp; scholarships</strong> - free money you don't repay (federal Pell Grant, state grants, college aid, outside scholarships). Maximize these first.</li>
        <li><strong>Work-study</strong> - a part-time job, often on campus, funded through aid.</li>
        <li><strong>Loans</strong> - money you repay <em>with interest</em>. Federal loans (especially subsidized) beat private loans on terms. Borrow only what you need.</li>
      </ul>
      <p>An award letter mixes these together, so read it carefully: a big number can be mostly loans. What matters is your <strong>net cost</strong> - total price minus grants and scholarships.</p>

      <h3>Compare offers on net cost</h3>
      <p>Line your offers up side by side and compare the real out-of-pocket cost per year, not the headline aid number.</p>
      <p class="guide-xref">Use the <a href="#templates">College cost &amp; aid comparison template</a> to do exactly that, and the <a href="#sch">Scholarships tab</a> to stack on outside awards.</p>

      <h3>Appeal a disappointing offer</h3>
      <p>Aid offers aren't always final. If your family's finances changed (job loss, medical bills) or another comparable school gave you more, you can submit a <strong>financial aid appeal</strong> (sometimes called "professional judgment"). Email the financial aid office, be specific and polite, attach documentation, and ask if they can review your package. It often works.</p>

      <h3>Don't forget</h3>
      <ul>
        <li><strong>Renew the FAFSA every year</strong> - it's not one-and-done.</li>
        <li>Apply EA to state schools for early aid and scholarship offers.</li>
        <li>Outside scholarships are real money - chase the local ones with smaller pools.</li>
      </ul>

      <p class="guide-xref">Related: <a href="#guide/win-scholarships">Find &amp; win scholarships</a> and <a href="#guide/college-apps">College lists, deadlines &amp; rec letters</a>.</p>
      <p class="guide-credit">General guidance - financial-aid rules and deadlines change yearly, so confirm current details at studentaid.gov.</p>
    `
  }
];
