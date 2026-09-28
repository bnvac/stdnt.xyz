/*
 * programs-extra.js - hand-added programs that aren't in the community
 * spreadsheets (e.g. federal DoD/NASA/NIST apprenticeships). Loaded after
 * programs.js so a regeneration of programs.js never wipes these.
 */
(function () {
  var extra = [
    { name: "AEOP (Army Educational Outreach Program)", url: "https://www.usaeop.com/", deadline: "Varies", when: "Year-round", cost: "Free", free: true,
      subjects: ["STEM", "Research", "Engineering"], tags: ["US", "Paid", "Stipend", "In-person", "Remote"], grades: ["Freshman", "Sophomore", "Junior", "Senior"],
      ranking: "A-", accRate: "Varies", flagship: true,
      details: "Umbrella of free U.S. Army STEM programs and paid apprenticeships (REAP, GEMS, UNITE and more), open nationally." },
    { name: "SEAP (Science & Engineering Apprenticeship Program)", url: "https://www.navalsteminterns.us/internships/seap/", deadline: "November 1", when: "Summer (8 weeks)", cost: "Free (+ stipend ~$4,000)", free: true,
      subjects: ["Research", "STEM", "Engineering"], tags: ["US", "Paid", "Stipend", "In-person", "Lab Work"], grades: ["Sophomore", "Junior", "Senior"],
      ranking: "A", accRate: "Selective", flagship: true,
      details: "Paid summer apprenticeship in U.S. Navy research labs, working one-on-one with a mentor scientist." },
    { name: "REAP (Research & Engineering Apprenticeship Program)", url: "https://www.usaeop.com/program/reap/", deadline: "Feb", when: "Summer (5-8 weeks)", cost: "Free (+ stipend)", free: true,
      subjects: ["Research", "STEM", "Engineering"], tags: ["US", "Paid", "Stipend", "Minority", "Low-Income", "In-person", "Lab Work"], grades: ["Sophomore", "Junior", "Senior"],
      ranking: "A-", accRate: "Selective", flagship: true,
      details: "Paid summer research apprenticeship for students from historically underrepresented and underserved communities." },
    { name: "GEMS (Gains in the Education of Math and Science)", url: "https://www.usaeop.com/program/gems/", deadline: "Spring", when: "Summer (1-4 weeks)", cost: "Free (+ stipend)", free: true,
      subjects: ["STEM", "Engineering"], tags: ["US", "In-person", "Stipend"], grades: ["Freshman", "Sophomore", "Junior", "Senior"],
      ranking: "B", accRate: "Accessible", flagship: false,
      details: "Hands-on STEM enrichment at Army labs with near-peer mentors, for middle and high schoolers." },
    { name: "NREIP (Naval Research Enterprise Internship Program)", url: "https://www.navalsteminterns.us/internships/nreip/", deadline: "Nov 1", when: "Summer (8-10 weeks)", cost: "Free (+ stipend)", free: true,
      subjects: ["Research", "Engineering", "STEM", "Coding"], tags: ["US", "Paid", "Stipend", "In-person", "Lab Work"], grades: [],
      ranking: "A-", accRate: "Selective", flagship: false,
      details: "Paid 10-week research internships at U.S. Navy labs for college students (31+ credits, U.S. citizens 18+); stipends start at $7,500." },
    { name: "NASA OSTEM Internships", url: "https://intern.nasa.gov/", deadline: "Varies (3 cycles)", when: "Spring / Summer / Fall", cost: "Free (+ stipend)", free: true,
      subjects: ["Aerospace", "Engineering", "Research", "STEM", "Coding"], tags: ["US", "Paid", "Stipend", "Remote", "In-person"], grades: ["Junior", "Senior"],
      ranking: "A", accRate: "Selective", flagship: true,
      details: "Paid NASA internships across centers; some roles are open to high-school students aged 16+." },
    { name: "NIST SHIP (Summer High School Internship Program)", url: "https://www.nist.gov/ship", deadline: "Feb", when: "Summer (7 weeks)", cost: "Free (volunteer)", free: true,
      subjects: ["Research", "STEM", "Engineering", "Coding"], tags: ["Maryland", "Colorado", "In-person", "Lab Work"], grades: ["Junior", "Senior"],
      ranking: "B+", accRate: "Selective", flagship: false,
      details: "Unpaid 7-week research internship with NIST scientists in Gaithersburg, MD or Boulder, CO. For high school juniors and seniors who are U.S. citizens with a 3.0+ unweighted GPA." },
    // MIT Lincoln Laboratory (its Beaver Works Summer Institute is in programs.js)
    { name: "LLRISE (Lincoln Laboratory Radar Introduction for Student Engineers)", url: "https://www.ll.mit.edu/outreach/llrise", deadline: "March 11", when: "July 12 - July 25", cost: "Free (you pay travel to MIT)", free: true, added: "2026-09-28",
      subjects: ["Engineering", "Physics", "STEM"], tags: ["US", "Residential", "In-person", "MIT", "MA"], grades: ["Junior"],
      ranking: "A", accRate: "Highly selective", flagship: false,
      details: "Free two-week residential workshop at MIT and MIT Lincoln Laboratory where rising seniors build a Doppler and range radar alongside Lab engineers. U.S. citizens only; permanent residents aren't eligible." },
    { name: "LLCipher (Lincoln Laboratory cryptography workshop)", url: "https://www.ll.mit.edu/outreach/llcipher", deadline: "April 15", when: "August 3 - August 7", cost: "Free (commuter, no housing)", free: true, added: "2026-09-28",
      subjects: ["Math", "Coding", "STEM"], tags: ["US", "In-person", "MIT", "Cambridge", "MA"], grades: ["Freshman", "Sophomore", "Junior", "Senior"],
      ranking: "A-", accRate: "Selective", flagship: false,
      details: "Free one-week MIT Lincoln Laboratory course in theoretical cryptography at MIT Beaver Works in Cambridge: build a secure encryption scheme and digital signature. Non-residential, so plan your own housing and transport. For U.S. citizens and permanent residents." },
    { name: "MIT Lincoln Laboratory Summer Research Program (SRP)", url: "https://www.ll.mit.edu/careers/student-opportunities/summer-research-program", deadline: "Varies", when: "Mid-May - mid-August", cost: "Free (paid internship)", free: true, added: "2026-09-28",
      subjects: ["Research", "Engineering", "Coding", "STEM"], tags: ["US", "Paid", "In-person", "Lab Work", "MA"], grades: [],
      ranking: "A-", accRate: "Selective", flagship: false,
      details: "Paid summer research internships at MIT Lincoln Laboratory in Lexington, MA for college students who have finished sophomore year and for grad students. U.S. citizens only; travel help and discounted housing for students coming from 50+ miles away." }
  ];
  // Drop any community-sheet stub these entries replace (e.g. a bare "SEAP"),
  // so regenerating programs.js can't bring the duplicate back.
  var mine = {};
  extra.forEach(function (p) { mine[p.name.split(" (")[0].toLowerCase()] = 1; });
  window.PROGRAMS = (window.PROGRAMS || []).filter(function (p) { return !mine[String(p.name).toLowerCase()]; }).concat(extra);
})();
