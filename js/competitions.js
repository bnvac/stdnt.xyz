/*
 * competitions.js - academic competitions shown on the Competitions tab.
 * Shape: { name, url, category, format, grades, deadline, desc, tags }.
 * `category` maps to window.COMPETITION_CATS; `deadline` (a month or month+day)
 * is optional and, when set, also surfaces in the Deadlines view.
 * Dates are typical annual windows - always confirm the exact date on the site.
 */
window.COMPETITION_CATS = [
  { id: "science", name: "Science", emoji: "🔬" },
  { id: "math", name: "Math", emoji: "➗" },
  { id: "cs", name: "Computer science", emoji: "💻" },
  { id: "research", name: "Research & science fairs", emoji: "🧪" },
  { id: "innovation", name: "Innovation & entrepreneurship", emoji: "💡" },
  { id: "humanities", name: "Humanities & arts", emoji: "📚" },
  { id: "robotics", name: "Robotics", emoji: "🤖" }
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

  // math
  { name: "AMC → AIME → USAMO", url: "https://maa.org/maa-invitational-competitions", category: "math", format: "Solo", grades: "9-12", deadline: "November",
    desc: "The main US math olympiad ladder: AMC 10/12, then AIME, then USA(J)MO. Practice on Art of Problem Solving.", tags: ["math", "olympiad"] },
  { name: "MathWorks Math Modeling (M3)", url: "https://m3challenge.siam.org/", category: "math", format: "Team", grades: "11-12", deadline: "",
    desc: "Solve a real-world problem with mathematical modeling over one intense weekend.", tags: ["math", "modeling", "team"] },

  // computer science
  { name: "USA Computing Olympiad (USACO)", url: "http://www.usaco.org/", category: "cs", format: "Solo", grades: "9-12", deadline: "",
    desc: "Competitive programming contests with Bronze → Platinum divisions; top scorers reach the USACO camp.", tags: ["coding", "algorithms"] },
  { name: "Hackathons", url: "https://hackathons.hackclub.com/", category: "cs", format: "Team", grades: "9-12", deadline: "",
    desc: "Build a project in 24-48 hours. Hack Club lists tons of free high-school hackathons.", tags: ["coding", "build", "team"] },

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

  // humanities & arts
  { name: "Quiz Bowl", url: "https://www.naqt.com/", category: "humanities", format: "Team", grades: "9-12", deadline: "",
    desc: "Buzzer trivia across every subject; question patterns repeat, so practice pays off fast.", tags: ["trivia", "team"] },
  { name: "Academic Decathlon", url: "https://www.usad.org/", category: "humanities", format: "Team", grades: "9-12", deadline: "",
    desc: "Ten-event academic competition with GPA-based divisions, built so everyone can compete.", tags: ["academic", "team"] },
  { name: "NACLO (Linguistics)", url: "https://www.nacloweb.org/", category: "humanities", format: "Solo", grades: "9-12", deadline: "January",
    desc: "North American Computational Linguistics Open — fun logic puzzles, no prior linguistics needed.", tags: ["linguistics", "puzzles"] },
  { name: "Scholastic Art & Writing Awards", url: "https://www.artandwriting.org/", category: "humanities", format: "Solo", grades: "7-12", deadline: "December",
    desc: "The most recognized creative arts & writing awards for teens; colleges know them.", tags: ["art", "writing"] },

  // robotics
  { name: "FIRST Robotics (FRC / FTC)", url: "https://www.firstinspires.org/robotics/frc", category: "robotics", format: "Team", grades: "7-12", deadline: "",
    desc: "Build and code competition robots in large team events; grants exist to help cover costs.", tags: ["robotics", "engineering", "team"] },
  { name: "VEX Robotics", url: "https://www.vexrobotics.com/competition", category: "robotics", format: "Team", grades: "9-12", deadline: "",
    desc: "Build smaller competition robots; fall season, widely accessible for new teams.", tags: ["robotics", "team"] }
];
