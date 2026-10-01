/*
 * competitions.js - academic competitions shown on the Competitions tab.
 * Shape: { name, url, category, format, grades, deadline, desc, tags }.
 * `category` maps to window.COMPETITION_CATS; `deadline` (a month or month+day)
 * is optional and, when set, also surfaces in the Deadlines view.
 * Dates are typical annual windows - always confirm the exact date on the site.
 */
window.COMPETITION_CATS = [
  { id: "science", name: "Science" },
  { id: "math", name: "Math" },
  { id: "cs", name: "Computer science" },
  { id: "research", name: "Research & science fairs" },
  { id: "innovation", name: "Innovation & entrepreneurship" },
  { id: "humanities", name: "Humanities & arts" },
  { id: "robotics", name: "Robotics" }
];

window.COMPETITIONS = [
  // science
  { name: "Science Olympiad", url: "https://www.soinc.org/", category: "science", format: "Team", grades: "6-12", deadline: "",
    desc: "Team event with 20+ science & engineering events (study, build and lab); regionals → states → nationals. The most beginner-friendly.", tags: ["science", "engineering", "team"] },
  { name: "Science Bowl", url: "https://science.osti.gov/wdts/nsb", category: "science", format: "Team", grades: "9-12", deadline: "",
    desc: "Fast buzzer quiz across physics, chem, bio, earth science and math; regional winners advance to nationals.", tags: ["quiz", "team"] },
  { name: "USA Biolympiad (USABO)", url: "https://www.usabo-trc.org/", category: "science", format: "Solo", grades: "9-12", deadline: "",
    desc: "Hard biology exam; top scorers reach semifinals and a national training camp.", tags: ["biology", "exam"] },
  { name: "Chemistry Olympiad (USNCO)", url: "https://www.acs.org/education/students/highschool/olympiad.html", category: "science", format: "Solo", grades: "9-12", deadline: "",
    desc: "Chemistry exam series: local → national → two-week study camp.", tags: ["chemistry", "exam"] },
  { name: "Physics Olympiad (F=ma)", url: "https://www.aapt.org/physicsteam/", category: "science", format: "Solo", grades: "9-12", deadline: "",
    desc: "The F=ma exam qualifies you for the USAPhO and the national physics camp.", tags: ["physics", "exam"] },
  { name: "Brain Bee", url: "https://thebrainbee.org/", category: "science", format: "Solo", grades: "9-12", deadline: "",
    desc: "Neuroscience competition based on the free Brain Facts book; winners can earn research placements.", tags: ["neuroscience", "exam"] },
  { name: "iGEM", url: "https://igem.org/Competition/High_School", category: "science", format: "Team", grades: "9-12", deadline: "",
    desc: "Build a synthetic-biology project end to end; the premier synbio competition (usually needs lab access or a mentor).", tags: ["biology", "synbio", "project"] },
  { name: "USA Astronomy & Astrophysics Olympiad (USAAAO)", url: "https://usaaao.org/", category: "science", format: "Solo", grades: "9-12", deadline: "",
    desc: "A 75-minute first-round exam each February, proctored by a teacher at your school ($30, aid available); top scorers move on toward the international astronomy olympiad.", tags: ["astronomy", "physics", "exam", "olympiad"], added: "2026-10-01" },
  { name: "National Ocean Sciences Bowl (NOSB)", url: "https://nosb.org/", category: "science", format: "Team", grades: "9-12", deadline: "",
    desc: "Buzzer quiz on the biology, chemistry, geology and physics of the oceans; regional bowl winners go to the national finals.", tags: ["ocean", "marine biology", "quiz", "team"], added: "2026-10-01" },
  { name: "NCF-Envirothon", url: "https://envirothon.org/", category: "science", format: "Team", grades: "9-12", deadline: "",
    desc: "Hands-on environmental science contest (soils, aquatic ecology, forestry, wildlife) that runs from state events to an international final with $50,000+ in scholarships and prizes.", tags: ["environment", "ecology", "outdoors", "team"], added: "2026-10-01" },
  { name: "Genes in Space", url: "https://www.genesinspace.org/", category: "science", format: "Solo or pair", grades: "7-12", deadline: "Apr",
    desc: "Propose a DNA experiment to run in space, alone or with a partner and an adult sponsor; the winning idea flies to the International Space Station. No lab experience needed.", tags: ["biology", "dna", "space", "research"], added: "2026-10-01" },

  // math
  { name: "AMC → AIME → USAMO", url: "https://maa.org/maa-invitational-competitions", category: "math", format: "Solo", grades: "9-12", deadline: "November",
    desc: "The main US math olympiad ladder: AMC 10/12, then AIME, then USA(J)MO. Practice on Art of Problem Solving.", tags: ["math", "olympiad"] },
  { name: "MathWorks Math Modeling (M3)", url: "https://m3challenge.siam.org/", category: "math", format: "Team", grades: "11-12", deadline: "",
    desc: "Solve a real-world problem with mathematical modeling over one intense weekend.", tags: ["math", "modeling", "team"] },
  { name: "USA Mathematical Talent Search (USAMTS)", url: "https://www.usamts.org/", category: "math", format: "Solo", grades: "6-12", deadline: "",
    desc: "Free proof-based contest: a month per round to write up five problems, with written feedback on your work. A path to the AIME, for US students who haven't finished high school.", tags: ["proofs", "free", "online", "aime"], added: "2026-10-01" },
  { name: "HMMT (Harvard-MIT Math Tournament)", url: "https://www.hmmt.org/", category: "math", format: "Team", grades: "9-12", deadline: "Sep",
    desc: "One of the biggest high school math tournaments, held each November at Harvard and February at MIT. A coach registers teams in September ($80 per team).", tags: ["math", "tournament", "team"], added: "2026-10-01" },
  { name: "ARML (American Regions Math League)", url: "https://www.arml.com/", category: "math", format: "Team", grades: "9-12", deadline: "",
    desc: "Regional teams compete each June at several university sites in team, power, individual and relay rounds. Ask your state or local math league how to try out.", tags: ["math", "team", "regional"], added: "2026-10-01" },
  { name: "MATHCOUNTS Competition Series", url: "https://www.mathcounts.org/programs/mathcounts-competition-series", category: "math", format: "Team or solo", grades: "6-8", deadline: "Dec 15",
    desc: "The main middle school math contest, from chapter to state to nationals. Schools register by mid-December ($42-$48 per student, half off for Title I schools); students whose school doesn't take part can enter on their own.", tags: ["math", "middle school", "team"], added: "2026-10-01" },
  { name: "Purple Comet! Math Meet", url: "https://purplecomet.org/", category: "math", format: "Team", grades: "6-12", deadline: "Apr",
    desc: "Free online team contest held over a ten-day window each spring: teams of up to six, with an adult supervisor, solve as many problems as they can in 60 or 90 minutes.", tags: ["math", "free", "online", "team"], added: "2026-10-01" },

  // computer science
  { name: "USA Computing Olympiad (USACO)", url: "http://www.usaco.org/", category: "cs", format: "Solo", grades: "9-12", deadline: "",
    desc: "Competitive programming contests with Bronze → Platinum divisions; top scorers reach the USACO camp.", tags: ["coding", "algorithms"] },
  { name: "Hackathons", url: "https://hackathons.hackclub.com/", category: "cs", format: "Team", grades: "9-12", deadline: "",
    desc: "Build a project in 24-48 hours. Hack Club lists tons of free high-school hackathons.", tags: ["coding", "build", "team"] },
  { name: "picoCTF", url: "https://picoctf.org/", category: "cs", format: "Team or solo", grades: "13+", deadline: "Mar",
    desc: "Carnegie Mellon's free capture-the-flag hacking competition each March, with practice challenges all year; US middle and high schoolers can win prizes.", tags: ["cybersecurity", "ctf", "free", "hacking"], added: "2026-10-01" },
  { name: "CyberPatriot", url: "https://www.uscyberpatriot.org/", category: "cs", format: "Team", grades: "6-12", deadline: "",
    desc: "The Air Force Association's cyber defense competition: teams find and fix security holes in virtual computers. Registration usually closes in early October; JROTC, Civil Air Patrol and Sea Cadet teams pay no fee.", tags: ["cybersecurity", "networking", "team"], added: "2026-10-01" },
  { name: "Technovation Girls", url: "https://www.technovation.org/", category: "cs", format: "Team", grades: "Ages 8-18", deadline: "",
    desc: "Build a mobile app or AI project that solves a problem in your community, then pitch it. The season runs October to May, and a co-ed track opens for 2027.", tags: ["apps", "ai", "entrepreneurship", "women"], added: "2026-10-01" },
  { name: "NASA Space Apps Challenge", url: "https://www.spaceappschallenge.org/", category: "cs", format: "Team", grades: "All ages", deadline: "Nov 14",
    desc: "A free global hackathon each fall (Nov 14-15 in 2026) where teams of up to six use NASA data to tackle real challenges, at local events or online.", tags: ["hackathon", "space", "data", "free"], added: "2026-10-01" },
  { name: "American Computer Science League (ACSL)", url: "https://www.acsl.org/", category: "cs", format: "School team", grades: "3-12", deadline: "",
    desc: "Four short contests a year on computer science fundamentals and programming, taken at your school, with divisions from elementary to AP level. A team costs $175.", tags: ["programming", "cs fundamentals", "team"], added: "2026-10-01" },

  // research & science fairs
  { name: "Regeneron ISEF", url: "https://www.societyforscience.org/isef/", category: "research", format: "Solo or team", grades: "9-12", deadline: "",
    desc: "The largest international science fair; qualify through a regional or state fair, then present a project.", tags: ["research", "science fair"] },
  { name: "Regeneron Science Talent Search (STS)", url: "https://www.societyforscience.org/regeneron-sts/", category: "research", format: "Solo", grades: "12", deadline: "November",
    desc: "The most prestigious US research competition; judges your project and full academic profile. Start the essays early.", tags: ["research", "seniors"] },
  { name: "Junior Science & Humanities Symposium (JSHS)", url: "https://www.jshs.org/", category: "research", format: "Solo", grades: "9-12", deadline: "",
    desc: "Present original STEM research at a regional symposium for scholarships and a shot at nationals.", tags: ["research", "presentation"] },
  { name: "Davidson Fellows", url: "https://www.davidsongifted.org/gifted-programs/fellows-scholarship/", category: "research", format: "Solo", grades: "K-12 (under 18)", deadline: "February",
    desc: "$10k-$50k scholarships for significant projects in STEM, literature, music and beyond.", tags: ["research", "scholarship"] },
  { name: "Breakthrough Junior Challenge", url: "https://breakthroughjuniorchallenge.org/", category: "research", format: "Solo", grades: "13-18", deadline: "June",
    desc: "Explain a science or math concept in a short video for a large scholarship.", tags: ["science", "video", "scholarship"] },

  // innovation & entrepreneurship
  { name: "Conrad Challenge", url: "https://www.conradchallenge.org/", category: "innovation", format: "Team", grades: "9-12", deadline: "November",
    desc: "Design an innovation or business to solve a real problem, then pitch it to judges.", tags: ["startup", "pitch", "team"] },
  { name: "Diamond Challenge", url: "https://diamondchallenge.org/", category: "innovation", format: "Team", grades: "9-12", deadline: "November",
    desc: "High-school entrepreneurship competition with a written concept round and a live pitch.", tags: ["entrepreneurship", "pitch"] },
  { name: "MIT THINK Scholars", url: "https://think.mit.edu/", category: "innovation", format: "Solo or team", grades: "9-12", deadline: "",
    desc: "Propose a STEM project (no prior research needed); winners get funding and MIT mentorship to build it.", tags: ["project", "stem"] },
  { name: "Wharton Global High School Investment Competition", url: "https://globalyouth.wharton.upenn.edu/competitions/investment-competition/", category: "innovation", format: "Team", grades: "9-12", deadline: "Sep",
    desc: "Free: teams of four to six with a teacher advisor manage a virtual portfolio for a client from late September to early December. Advisors register teams in August and September.", tags: ["finance", "investing", "business", "free"], added: "2026-10-01" },
  { name: "Samsung Solve for Tomorrow", url: "https://www.samsung.com/us/solvefortomorrow/", category: "innovation", format: "Class team", grades: "6-12", deadline: "Nov 23",
    desc: "Public school classes propose a STEM project that helps their community, entered by a teacher. National winners get $100,000 prize packages of technology and classroom supplies.", tags: ["stem", "community", "public school"], added: "2026-10-01" },
  { name: "Blue Ocean Student Entrepreneur Competition", url: "https://blueoceancompetition.org/", category: "innovation", format: "Solo or team", grades: "9-12", deadline: "Feb 21",
    desc: "Free virtual pitch contest for high schoolers worldwide: take a short online course, then submit a five-minute video pitch. Top prizes are $1,000, $750 and $500, plus regional awards.", tags: ["entrepreneurship", "pitch", "business", "free"], added: "2026-10-01" },

  // humanities & arts
  { name: "Quiz Bowl", url: "https://www.naqt.com/", category: "humanities", format: "Team", grades: "9-12", deadline: "",
    desc: "Buzzer trivia across every subject; question patterns repeat, so practice pays off fast.", tags: ["trivia", "team"] },
  { name: "Academic Decathlon", url: "https://www.usad.org/", category: "humanities", format: "Team", grades: "9-12", deadline: "",
    desc: "Ten-event academic competition with GPA-based divisions, built so everyone can compete.", tags: ["academic", "team"] },
  { name: "NACLO (Linguistics)", url: "https://www.nacloweb.org/", category: "humanities", format: "Solo", grades: "9-12", deadline: "January",
    desc: "North American Computational Linguistics Open - fun logic puzzles, no prior linguistics needed.", tags: ["linguistics", "puzzles"] },
  { name: "Scholastic Art & Writing Awards", url: "https://www.artandwriting.org/", category: "humanities", format: "Solo", grades: "7-12", deadline: "December",
    desc: "The most recognized creative arts & writing awards for teens; colleges know them.", tags: ["art", "writing"] },
  { name: "National History Day", url: "https://nhd.org/", category: "humanities", format: "Solo or group", grades: "6-12", deadline: "",
    desc: "Research a topic on the yearly theme (2027: Innovation in History) and present it as a paper, exhibit, documentary, website or performance, from local contests to nationals in June.", tags: ["history", "research", "projects"], added: "2026-10-01" },
  { name: "John Locke Institute Essay Competition", url: "https://www.johnlockeinstitute.com/essay-competition", category: "humanities", format: "Solo", grades: "Under 19", deadline: "",
    desc: "Free global essay prize on big questions in philosophy, politics, economics, history and more, due in late spring. Winners get credit toward the Institute's summer programmes, not cash.", tags: ["essay", "philosophy", "writing", "free"], added: "2026-10-01" },

  // robotics
  { name: "FIRST Robotics (FRC / FTC)", url: "https://www.firstinspires.org/robotics/frc", category: "robotics", format: "Team", grades: "7-12", deadline: "",
    desc: "Build and code competition robots in large team events; grants exist to help cover costs.", tags: ["robotics", "engineering", "team"] },
  { name: "SeaPerch", url: "https://seaperch.org/", category: "robotics", format: "Team", grades: "Elementary to high school", deadline: "",
    desc: "Build an underwater robot (ROV) from a kit and race it through obstacle courses at 100+ regional events; top teams earn spots at the International SeaPerch Challenge.", tags: ["underwater", "robotics", "engineering", "team"], added: "2026-10-01" },
  { name: "BEST Robotics", url: "https://bestrobotics.org/", category: "robotics", format: "School team", grades: "6-12", deadline: "",
    desc: "Free for schools: teams get a kit of everyday materials and eight weeks to build a robot for a game-day contest, plus a judged award for design and presentation.", tags: ["robotics", "engineering", "free", "team"], added: "2026-10-01" },
  { name: "VEX Robotics", url: "https://www.vexrobotics.com/competition", category: "robotics", format: "Team", grades: "9-12", deadline: "",
    desc: "Build smaller competition robots; fall season, widely accessible for new teams.", tags: ["robotics", "team"] }
];
