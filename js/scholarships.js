/*
 * scholarships.js — scholarship directory.
 * Transcribed from community spreadsheets/screenshots. Amounts are maximums and
 * deadlines are approximate — ALWAYS confirm details on the official site.
 *
 * group: "big"     -> large awards / full rides / identity-based
 *        "creative"-> art, video, design, "quirky" contests
 *        "essay"   -> essay & writing contests
 *        "general" -> varies in effort
 *        "noessay" -> low-effort, no-essay & sweepstakes (apply at your own peril)
 *
 * amount: number for sorting (FULL = full ride sentinel, 0 = varies/unspecified)
 * url: official link where confirmed, otherwise a Google search link (find: true)
 */
(function () {
  var FULL = 1000000; // sentinel so "full ride" sorts to the top
  function s(q) { return "https://www.google.com/search?q=" + encodeURIComponent(q + " scholarship"); }

  window.SCH_FULL = FULL;
  window.SCHOLARSHIPS = [
    /* ---------------------------------------------------- big money / identity */
    { name: "QuestBridge National College Match", level: "HS Senior", amount: FULL, amountText: "Full 4-yr ride", deadline: "Late Sep", url: "https://www.questbridge.org/", group: "big", tags: ["Need-based", "Identity", "Full ride"], note: "Matches high-achieving, low-income students to 50+ top colleges." },
    { name: "Jack Kent Cooke Foundation", level: "HS Senior", amount: FULL, amountText: "Up to $55k/yr", deadline: "Nov 16", url: "https://www.jkcf.org/our-scholarships/college-scholarship-program/", group: "big", tags: ["Need-based", "Full ride"], note: "Family income ≤ ~$95k. Huge award + advising." },
    { name: "Gates Scholarship (formerly Gates Millennium)", level: "HS Senior", amount: FULL, amountText: "Full ride", deadline: "Mid-Sep", url: "https://www.thegatesscholarship.org/scholarship", group: "big", tags: ["Identity", "Need-based", "Full ride"], note: "Pell-eligible minority students." },
    { name: "Posse Scholarship", level: "HS Senior", amount: FULL, amountText: "Full tuition", deadline: "Varies", url: "https://www.possefoundation.org/", group: "big", tags: ["Leadership", "Nomination", "Full ride"], note: "Leadership; select partner universities only." },
    { name: "SMART Scholarship (DoD)", level: "Undergrad+", amount: FULL, amountText: "Full ride + job", deadline: "Dec 1", url: "https://www.smartscholarship.org/smart", group: "big", tags: ["STEM", "Full ride"], note: "STEM only. Pays tuition + stipend + guaranteed job." },
    { name: "Dr Pepper Tuition Giveaway", level: "18–24", amount: 100000, amountText: "$100,000", deadline: "Oct 11", url: "https://www.drpeppertuition.com/", group: "big", tags: ["Video", "No essay"], note: "Pitch your future in a short video." },
    { name: "McDonald's HACER Scholarship", level: "HS Senior", amount: 100000, amountText: "Up to $100,000", deadline: "Feb 5", url: "https://www.mcdonalds.com/us/en-us/community/hacer.html", group: "big", tags: ["Identity"], note: "Hispanic/Latino students." },
    { name: "Hagan Scholarship", level: "HS Senior", amount: 60000, amountText: "$60,000", deadline: "Mar 1", url: "https://haganscholarships.org/", group: "big", tags: ["Need-based", "Rural"], note: "Income below ~$100k; rural focus. $7,500 × 8 semesters." },
    { name: "Burger King Scholars", level: "HS Senior", amount: 60000, amountText: "Up to $60,000", deadline: "Dec 15", url: "https://bkmclamorefoundation.org/who-we-are/burger-king-scholars-program", group: "big", tags: ["Need-based"], note: "Most awards $1,000; a few large." },
    { name: "Elks National Foundation MVS", level: "HS Senior", amount: 50000, amountText: "Up to $50,000", deadline: "Nov 13", url: "https://www.elks.org/scholars/scholarships/mvs.cfm", group: "big", tags: ["Need-based", "Leadership"], note: "Most Valuable Student contest." },
    { name: "ASPFM Scholarship", level: "Undergrad", amount: 40000, amountText: "$40,000", deadline: "Feb 1", url: s("ASPFM"), find: true, group: "big", tags: ["Essay"], note: "~2,750-word essay." },
    { name: "Dream.US National Scholarship", level: "HS Senior / Undergrad", amount: 33000, amountText: "Up to $33,000", deadline: "Feb 29", url: "https://www.thedream.us/scholarships/national-scholarship/", group: "big", tags: ["Identity", "Immigrants"], note: "For DACA/undocumented students." },
    { name: "Beinecke Scholarship", level: "College Junior", amount: 35000, amountText: "$35,000", deadline: "Mar 29", url: "https://beineckescholarship.org/", group: "big", tags: ["Nomination", "Humanities"], note: "Nomination required; arts/humanities/social sci." },
    { name: "Jackie Robinson Foundation", level: "HS Senior", amount: 30000, amountText: "Up to $30,000", deadline: "Jan 10", url: "https://jackierobinson.org/apply/", group: "big", tags: ["Identity", "Leadership"], note: "Students of color; mentorship included." },
    { name: "RL+DS Rosenberg Poetry Fellowship", level: "21+", amount: 27000, amountText: "$27,000", deadline: "Apr 1", url: s("Rosenberg poetry fellowship"), find: true, group: "big", tags: ["Poetry"], note: "Looks involved — poetry questions." },
    { name: "Horatio Alger Scholarship", level: "HS Junior–Postgrad", amount: 25000, amountText: "Up to $25,000", deadline: "Mar 15", url: "https://scholars.horatioalger.org/", group: "big", tags: ["Need-based", "Adversity"], note: "Income ≤ ~$65k; overcame adversity." },
    { name: "Chick-fil-A Leadership Scholarship", level: "Undergrad", amount: 25000, amountText: "Up to $25,000", deadline: "Oct 18", url: "https://www.chick-fil-a.com/scholarships", group: "big", tags: ["Employees"], note: "Must work at Chick-fil-A." },
    { name: "APIA Scholars", level: "Undergrad", amount: 20000, amountText: "Up to $20,000", deadline: "Jan 9", url: "https://apiascholars.org/scholarship/apia-scholarship/", group: "big", tags: ["Identity"], note: "Asian & Pacific Islander Americans." },
    { name: "Dell Scholars", level: "HS Senior", amount: 20000, amountText: "$20,000", deadline: "Dec 1", url: "https://www.dellscholars.org/scholarship/", group: "big", tags: ["Need-based"], note: "Must be in an approved college-readiness program." },
    { name: "U.S. Bank Student Scholarship", level: "17+", amount: 20000, amountText: "$20,000", deadline: "Oct 30", url: "https://www.usbank.com/student-scholarship.html", group: "big", tags: ["No essay", "Financial literacy"], note: "Complete short financial-literacy lessons." },
    { name: "SWE Scholarships", level: "Undergrad", amount: 20000, amountText: "Up to $20,000", deadline: "Jan / Mar", url: "https://swe.org/scholarships/", group: "big", tags: ["Women", "Engineering", "STEM"], note: "Women in engineering; one application, many awards." },
    { name: "Beyond the Boroughs", level: "HS Senior", amount: 20000, amountText: "$20,000", deadline: "Mar 15", url: "https://www.beyondtheboroughs.org/", group: "big", tags: ["Need-based"], note: "$5k × 4 years." },
    { name: "Davis-Putter Scholarship", level: "Undergrad", amount: 15000, amountText: "Up to $15,000", deadline: "Apr 1", url: "https://davisputter.org/apply-for-scholarships/", group: "big", tags: ["Activism"], note: "For student activists with financial need." },

    /* ---------------------------------------------------- quirky / creative */
    { name: "Breakthrough Junior Challenge", level: "13–18", amount: 250000, amountText: "$250,000", deadline: "~Late June", url: "https://breakthroughjuniorchallenge.org/", group: "creative", tags: ["Video", "STEM"], note: "Make a short science/math explainer video." },
    { name: "Sphinx Competition", level: "≤30", amount: 50000, amountText: "Up to $50,000", deadline: "Jan", url: "https://www.sphinxmusic.org/sphinx-competition", group: "creative", tags: ["Music", "Identity"], note: "Black & Latinx classical string players." },
    { name: "VFW Voice of Democracy", level: "HS", amount: 35000, amountText: "Up to $35,000", deadline: "Oct 31", url: "https://www.vfw.org/community/youth-and-education/youth-scholarships", group: "creative", tags: ["Audio essay"], note: "Recorded audio-essay on a patriotic theme." },
    { name: "American Legion Oratorical Contest", level: "HS", amount: 25000, amountText: "Up to $25,000", deadline: "State-dependent", url: "https://www.legion.org/oratorical", group: "creative", tags: ["Speech"], note: "Speech competition on the Constitution." },
    { name: "Gallery Collection Greeting Card", level: "14+", amount: 10000, amountText: "$10,000", deadline: "Mar 1", url: "https://www.gallerycollection.com/greeting-cards-scholarship.htm", group: "creative", tags: ["Art", "Design"], note: "Design a greeting card." },
    { name: "National Potato Council Scholarship", level: "Graduate", amount: 10000, amountText: "$10,000", deadline: "Varies", url: "https://www.nationalpotatocouncil.org/get-involved/academic-scholarship/", group: "creative", tags: ["STEM", "Niche"], note: "Must demonstrate interest in potato-related research. Yes, really." },
    { name: "Toshiba/NSTA ExploraVision", level: "K–12", amount: 10000, amountText: "Up to $10,000", deadline: "Jan 31", url: "https://www.exploravision.org/", group: "creative", tags: ["STEM", "Team"], note: "Team science-innovation project." },
    { name: "Project Yellow Light", level: "14–25", amount: 8000, amountText: "Up to $8,000", deadline: "Apr 1", url: "https://www.projectyellowlight.com/", group: "creative", tags: ["Video", "Design"], note: "Distracted-driving PSA — video, billboard, or radio." },
    { name: "American Red Cross Leaders Save Lives", level: "HS / Undergrad", amount: 2500, amountText: "Up to $2,500", deadline: "Aug 31", url: "https://www.redcrossblood.org/hosting-a-blood-drive/leaders-save-lives.html", group: "creative", tags: ["Service"], note: "Host a blood drive." },
    { name: "James Alan Cox Foundation (Photography)", level: "HS / Undergrad", amount: 2500, amountText: "$2,500", deadline: "Varies (Jul)", url: "https://www.jamesalancoxfoundation.org/", group: "creative", tags: ["Photography", "Video"], note: "Student photographers & videographers." },
    { name: "Courageous Persuaders", level: "HS", amount: 3000, amountText: "Up to $3,000", deadline: "Mar 11", url: "https://www.courageouspersuaders.com/", group: "creative", tags: ["Video"], note: "30-second commercial warning younger teens." },
    { name: "Frame My Future Scholarship", level: "Undergrad", amount: 2000, amountText: "$2,000", deadline: "Mar 15", url: "https://www.framemyfuture.com/", group: "creative", tags: ["Art", "Design"], note: "Create a piece showing what you hope to achieve." },
    { name: "Bow Seat Ocean Awareness Contest", level: "11–18", amount: 1500, amountText: "Up to $1,500+", deadline: "Jun 10", url: "https://bowseat.org/programs/ocean-awareness-contest/", group: "creative", tags: ["Art", "Environment"], note: "Art, writing, film, or music on ocean themes." },
    { name: "CRI Scholarship", level: "14–22", amount: 1500, amountText: "$1,500", deadline: "Apr 25", url: s("CRI design video"), find: true, group: "creative", tags: ["Design", "Video"], note: "Create a design/video." },

    /* ---------------------------------------------------- essay / writing */
    { name: "Vegetarian Resource Group", level: "HS Senior", amount: 10000, amountText: "Up to $10,000", deadline: "Feb 20", url: "https://www.vrg.org/student/scholar.htm", group: "essay", tags: ["Essay"], note: "Promote vegetarianism." },
    { name: "Thermo Fisher Antibody Scholarship", level: "HS Senior+", amount: 10000, amountText: "$10,000", deadline: "May 1", url: "https://www.thermofisher.com/us/en/home/academic/educators-scholarships/antibody-scholarship-program.html", group: "essay", tags: ["STEM", "Essay"] },
    { name: "Unigo Scholarships", level: "14+", amount: 10000, amountText: "$1k–$10k", deadline: "Monthly", url: "https://www.unigo.com/scholarships", group: "essay", tags: ["Essay", "Short answer"], note: "Tons of quirky short-answer scholarships." },
    { name: "Gloria Barron Prize for Young Heroes", level: "8–18", amount: 10000, amountText: "$10,000", deadline: "Apr 15", url: "https://barronprize.org/", group: "essay", tags: ["Service", "Project"], note: "Led an impactful project." },
    { name: "JFK Profile in Courage Essay", level: "9–12", amount: 10000, amountText: "$10,000", deadline: "Jan 12", url: "https://www.jfklibrary.org/learn/education/profile-in-courage-essay-contest", group: "essay", tags: ["Essay", "History"], note: "Essay about a U.S. elected official's political courage." },
    { name: "U.S. Creative Writing Scholarship", level: "HS Senior", amount: 10000, amountText: "$10,000", deadline: "Opens Oct", url: s("US creative writing high school"), find: true, group: "essay", tags: ["Writing"], note: "Several writing sections." },
    { name: "L. Ron Hubbard Writers of the Future", level: "Any (amateur)", amount: 5000, amountText: "Up to $5,000", deadline: "Quarterly", url: "https://www.writersofthefuture.com/", group: "essay", tags: ["Writing", "Sci-fi"], note: "Submit a sci-fi/fantasy short story." },
    { name: "Ayn Rand Institute Essay Contests", level: "8–12", amount: 5000, amountText: "Up to $5,000", deadline: "Apr 25", url: "https://aynrand.org/students/essay-contests/", group: "essay", tags: ["Essay"], note: "Essay on an Ayn Rand novel." },
    { name: "American College Foundation Visionary", level: "9–12", amount: 5000, amountText: "$5,000", deadline: "Jun 1", url: "https://www.americancollegefoundation.org/", group: "essay", tags: ["Essay"], note: "500-word essay." },
    { name: "Stossel in the Classroom", level: "MS / HS", amount: 2500, amountText: "Up to $2,500", deadline: "Mar 22", url: "https://stosselintheclassroom.org/contest/", group: "essay", tags: ["Essay", "Video"], note: "Choice of 4 topics." },
    { name: "James H Park Memorial Scholarship", level: "≤19", amount: 20000, amountText: "$20,000", deadline: "Varies", url: s("James H Park Memorial"), find: true, group: "essay", tags: ["Service", "Nomination"], note: "100 hrs medical service + nomination required." },
    { name: "Apex Minecraft Hosting Scholarship", level: "HS / Undergrad", amount: 2000, amountText: "$2,000", deadline: "Jul 31", url: "https://apexminecrafthosting.com/scholarship/", group: "essay", tags: ["Essay", "Gaming"], note: "Essay involving Minecraft." },
    { name: "Zombie Apocalypse Scholarship (Unigo)", level: "14+", amount: 2000, amountText: "$2,000", deadline: "Mar 31", url: "https://www.unigo.com/scholarships/our-scholarships/zombie-apocalypse-scholarship", group: "essay", tags: ["Essay", "Fun"], note: "Describe your escape plan if zombies hit your school." },
    { name: "Americanism Essay Contest (FRA)", level: "7–12", amount: 5000, amountText: "Up to $5,000", deadline: "Dec 1", url: "https://www.fra.org/", group: "essay", tags: ["Essay"], note: "Patriotic-themed essay." },
    { name: "AU Essay Contest", level: "HS Junior/Senior", amount: 1500, amountText: "$1,500", deadline: "Varies", url: s("AU essay contest high school"), find: true, group: "essay", tags: ["Essay"], note: "750–1,000 words." },
    { name: "Gen & Kelly Tanabe Scholarship", level: "HS Fresh–Adult", amount: 1000, amountText: "$1,000", deadline: "Jul 31", url: "https://www.gkscholarship.com/", group: "essay", tags: ["Essay"], note: "250-word paragraph." },
    { name: "Cancer Unwrapped Writing Contest", level: "9–12", amount: 1000, amountText: "$1,000", deadline: "Mar 2", url: "https://cancerpathways.org/cancer-unwrapped-writing-contest/", group: "essay", tags: ["Essay"], note: "Write about an experience with cancer (need not be your own)." },
    { name: "ASHG DNA Day Essay Contest", level: "9–12", amount: 1000, amountText: "Up to $1,000", deadline: "Mar", url: "https://www.ashg.org/discover-genetics/dna-day/essay-contest/", group: "essay", tags: ["STEM", "Essay"], note: "Genetics essay." },
    { name: "GRHS Heritage Essay", level: "6–Undergrad", amount: 1000, amountText: "$1,000", deadline: "Mar 31", url: "https://www.grhs.org/", group: "essay", tags: ["Essay", "Heritage"], note: "German/Russian heritage." },
    { name: "JASNA Essay Contest", level: "HS Student", amount: 1000, amountText: "$1,000", deadline: "Jun 1", url: "https://jasna.org/programs/essay-contest/", group: "essay", tags: ["Essay", "Literature"], note: "Jane Austen essay, 6–8 pages." },
    { name: "RealtyHop Scholarship", level: "Undergrad", amount: 2000, amountText: "$2,000", deadline: "Apr / Aug", url: "https://www.realtyhop.com/scholarship", group: "essay", tags: ["Essay"], note: "500-word essay." },
    { name: "CarBrain Scholarship", level: "Undergrad", amount: 1000, amountText: "$1,000", deadline: "Nov 1", url: "https://carbrain.com/scholarship", group: "essay", tags: ["Essay", "STEM"], note: "Essay on AI & the automotive industry." },
    { name: "National HS Poetry Contest", level: "HS", amount: 500, amountText: "$500", deadline: "Quarterly", url: s("national high school poetry contest"), find: true, group: "essay", tags: ["Poetry"], note: "Short (~20-line) poem." },
    { name: "1Dental Scholarship", level: "HS Senior", amount: 500, amountText: "$500", deadline: "May 31", url: "https://www.1dental.com/dental-scholarship/", group: "essay", tags: ["Short answer"], note: "2 short answers about dental health." },

    /* ---------------------------------------------------- general / varies */
    { name: "Coca-Cola Scholars", level: "HS Senior", amount: 20000, amountText: "$20,000", deadline: "Oct 31", url: "https://www.coca-colascholarsfoundation.org/", group: "general", tags: ["Leadership"], note: "Achievement & service based." },
    { name: "Engebretson Foundation Scholarship", level: "HS Senior", amount: 20000, amountText: "$20,000", deadline: "Mar 1", url: s("Engebretson Foundation"), find: true, group: "general", tags: ["Need-based"] },
    { name: "AANAPISI Scholars", level: "Undergrad", amount: 10000, amountText: "$10,000", deadline: "Jan 9", url: "https://apiascholars.org/", group: "general", tags: ["Identity"], note: "Asian, Native American & Pacific Islander." },
    { name: "Graduate Women in Science Fellowship", level: "Graduate", amount: 10000, amountText: "$10,000", deadline: "Jan 8", url: "https://www.gwis.org/page/fellowship_program", group: "general", tags: ["Women", "STEM"] },
    { name: "Lindsey Vonn Foundation Scholarship", level: "10–18", amount: 5000, amountText: "$5,000", deadline: "Mar 31", url: "https://www.lindseyvonnfoundation.org/scholarships", group: "general", tags: ["Women"] },
    { name: "Buick Achievers Scholarship", level: "HS Senior–Postgrad", amount: 25000, amountText: "$25,000", deadline: "Feb", url: s("Buick Achievers"), find: true, group: "general", tags: ["STEM"], note: "Check availability — may be discontinued." },
    { name: "Carson Scholars Fund", level: "4th–11th", amount: 1000, amountText: "$1,000", deadline: "Jan 12", url: "https://carsonscholars.org/", group: "general", tags: ["Nomination"], note: "Must be nominated by your school." },
    { name: "SBO Essay Scholarship", level: "K–12", amount: 1000, amountText: "$1,000", deadline: "Mar 31", url: s("School Band and Orchestra essay"), find: true, group: "general", tags: ["Music", "Essay"], note: "250-word paragraph about music." },
    { name: "Working Student Scholarship", level: "Undergrad", amount: 1000, amountText: "$1,000", deadline: "Dec 15", url: s("working student"), find: true, group: "general", tags: ["Essay"], note: "500 words." },
    { name: "Tall Clubs International Scholarship", level: "Undergrad", amount: 1000, amountText: "$1,000", deadline: "Varies", url: "https://www.tall.org/scholarships", group: "general", tags: ["Niche"], note: "You have to actually be tall." },
    { name: "CiP Scholarship", level: "17+", amount: 1000, amountText: "$1,000", deadline: "Mar 31", url: s("CiP scholarship why college"), find: true, group: "general", tags: ["Essay"], note: "Why do you want to go to school?" },
    { name: "FBUSA Scholarship", level: "HS Senior / College", amount: 2000, amountText: "$2,000", deadline: "Monthly", url: "https://www.1fbusa.com/scholarship", group: "general", tags: ["No essay"] },
    { name: "Navin Narayan College Scholarship", level: "HS Senior", amount: 1000, amountText: "$1,000", deadline: "Feb", url: s("Navin Narayan college Red Cross"), find: true, group: "general", tags: ["Service"] },
    { name: "Against All Odds Scholarship", level: "Undergrad", amount: 1000, amountText: "$1,000", deadline: "Jan 31", url: s("Against All Odds"), find: true, group: "general", tags: ["Email"], note: "You email them to apply." },
    { name: "dmv.edu Scholarship", level: "HS / Undergrad", amount: 1000, amountText: "$1,000", deadline: "Mar 31", url: "https://www.dmv.org/scholarship.php", group: "general", tags: ["No essay"] },
    { name: "CTG Scholarship", level: "HS Junior/Senior", amount: 500, amountText: "$500", deadline: "Monthly", url: s("CTG scholarship"), find: true, group: "general", tags: ["Essay"], note: "Write about why you should get it." },
    { name: "Bezos Scholars Program", level: "HS Junior", amount: 0, amountText: "Program", deadline: "Jan 25", url: "https://www.bezosscholars.org/", group: "general", tags: ["Leadership"], note: "Leadership program + advising (not direct cash)." },
    { name: "Alexander Hamilton Scholars", level: "HS Junior", amount: 0, amountText: "Program", deadline: "Jan 31", url: "https://www.hamiltonscholars.org/", group: "general", tags: ["Leadership"] },
    { name: "Fontana Scholarship Program", level: "HS Senior", amount: 0, amountText: "Varies", deadline: "Mar 14", url: "https://www.fontanascholarship.org/", group: "general", tags: ["First gen"], note: "First-gen; raffle-style." },
    { name: "SARA Scholarship (Women's Golf)", level: "HS Senior", amount: 2500, amountText: "$2,500", deadline: "Apr 30", url: s("SARA women golf"), find: true, group: "general", tags: ["Women", "Golf"], note: "Female; just be 'involved' with golf." },

    /* ---------------------------------------------------- no-essay / sweepstakes */
    { name: "Niche \"No Essay\" Scholarship", level: "HS / Undergrad", amount: 2000, amountText: "$2,000", deadline: "Monthly", url: "https://www.niche.com/colleges/scholarship/no-essay-scholarship/", group: "noessay", tags: ["No essay", "Raffle"] },
    { name: "ScholarshipPoints", level: "13+", amount: 2500, amountText: "$2,500", deadline: "Monthly", url: "https://www.scholarshippoints.com/", group: "noessay", tags: ["No essay", "Raffle"] },
    { name: "SmarterCollege Scholarship", level: "17+", amount: 2500, amountText: "$2,500", deadline: "Monthly", url: s("SmarterCollege"), find: true, group: "noessay", tags: ["No essay", "Raffle"] },
    { name: "Nitro Scholarship", level: "17+", amount: 2000, amountText: "$2,000", deadline: "Monthly", url: "https://www.nitrocollege.com/scholarship", group: "noessay", tags: ["No essay", "Raffle"] },
    { name: "CampusReel Scholarship", level: "HS Fresh+", amount: 2000, amountText: "$2,000", deadline: "Rolling", url: "https://www.campusreel.org/scholarships", group: "noessay", tags: ["No essay"], note: "Watch a student tour." },
    { name: "Sallie Mae Scholarship", level: "HS Junior+", amount: 2000, amountText: "$2,000", deadline: "Dec 31", url: "https://www.salliemae.com/scholarships/", group: "noessay", tags: ["No essay", "Raffle"] },
    { name: "CollegeVine Scholarships", level: "HS Student", amount: 2000, amountText: "$2,000", deadline: "Quarterly", url: "https://www.collegevine.com/scholarships", group: "noessay", tags: ["No essay"] },
    { name: "Cappex Easy Money Scholarship", level: "13+", amount: 1000, amountText: "$1,000", deadline: "Monthly", url: "https://www.appily.com/scholarships", group: "noessay", tags: ["No essay", "Raffle"], note: "Cappex is now Appily." },
    { name: "SmartOwl Scholarship", level: "16+", amount: 1000, amountText: "$1,000", deadline: "Monthly", url: s("SmartOwl no essay"), find: true, group: "noessay", tags: ["No essay"] },
    { name: "SuperCollege Scholarship", level: "HS Senior / Undergrad", amount: 1000, amountText: "$1,000", deadline: "Jan 31", url: "https://www.supercollege.com/scholarship/", group: "noessay", tags: ["No essay"] },
    { name: "Community Champ Scholarship", level: "18+", amount: 1000, amountText: "$1,000", deadline: "Feb 1", url: s("Community Champion"), find: true, group: "noessay", tags: ["No essay"] },
    { name: "Shining Star Scholarship", level: "18+", amount: 1000, amountText: "$1,000", deadline: "Monthly", url: s("Shining Star"), find: true, group: "noessay", tags: ["No essay"] },
    { name: "TC School Scholarship", level: "HS Fresh+", amount: 1000, amountText: "$1,000", deadline: "Quarterly", url: s("TC access scholarship"), find: true, group: "noessay", tags: ["No essay"] },
    { name: "AtC Scholarship", level: "HS", amount: 1000, amountText: "$1,000", deadline: "Quarterly", url: s("AtC access scholarship"), find: true, group: "noessay", tags: ["No essay"] },
    { name: "CiE Scholarship", level: "16+", amount: 500, amountText: "$500", deadline: "Quarterly", url: s("CiE cedar scholarship"), find: true, group: "noessay", tags: ["No essay"] },

    /* ---------------------------------------------------- directories (find more) */
    { name: "College Board BigFuture Directory", level: "All", amount: 0, amountText: "Directory", deadline: "—", url: "https://bigfuture.collegeboard.org/scholarships", group: "general", tags: ["Directory"], note: "Searchable directory — finding scholarships is the hard part, start here." },
    { name: "Scholarship America Directory", level: "All", amount: 0, amountText: "Directory", deadline: "—", url: "https://scholarshipamerica.org/students/browse-scholarships/", group: "general", tags: ["Directory"], note: "Another large, searchable scholarship directory." }
  ];
})();
