/*
 * templates.js - free spreadsheet templates shown on the Templates tab.
 * Each template is plain data: { slug, icon, title, blurb, tags, columns, sample }.
 * The app generates a downloadable .csv and a paste-into-Sheets copy from this
 * data on the fly (see app.js) - no binary files, no build step.
 * To add one: copy a block, give it a unique slug, list columns + a sample row.
 */
window.TEMPLATES = [
  {
    slug: "scholarship-tracker",
    icon: "🎯",
    title: "Scholarship & deadline tracker",
    blurb: "Track every scholarship you find: amount, deadline, requirements and status, so nothing slips past you.",
    tags: ["scholarships", "deadlines", "money", "college"],
    columns: ["Scholarship", "Amount", "Deadline", "Type", "Requirements", "Status", "Link", "Notes"],
    sample: [
      ["Example Local Foundation Award", "$2,500", "2025-03-15", "Essay", "500-word essay + transcript", "Not started", "https://", "Local - low competition"],
      ["Example No-Essay Scholarship", "$1,000", "2025-04-30", "No-essay", "Just an application form", "In progress", "https://", "Renews yearly"]
    ]
  },
  {
    slug: "college-app-tracker",
    icon: "🎓",
    title: "College application tracker",
    blurb: "One row per school: plan, deadline, essays, recs and decision. The dashboard that keeps senior fall sane.",
    tags: ["college", "applications", "deadlines", "essays"],
    columns: ["School", "Tier (safety/match/reach)", "Plan (ED/EA/RD)", "Deadline", "Portal", "Supplemental essays", "Recs sent", "Fee / waiver", "Submitted", "Decision"],
    sample: [
      ["Example State University", "Safety", "EA", "2025-11-01", "Common App", "0", "Yes", "Waiver", "No", ""],
      ["Example Dream University", "Reach", "ED", "2025-11-01", "Common App", "2", "Not yet", "$75", "No", ""]
    ]
  },
  {
    slug: "research-program-tracker",
    icon: "🔬",
    title: "Research / program application tracker",
    blurb: "Keep summer research programs and REUs organized: eligibility, materials, recommenders and deadlines.",
    tags: ["research", "programs", "reu", "summer"],
    columns: ["Program", "Field", "Deadline", "Eligibility", "Materials needed", "Recommenders", "Status", "Link"],
    sample: [
      ["Example Summer Research Program", "Biology", "2025-02-01", "Rising senior", "Transcript, 2 letters, essays", "Ms. Lee, Dr. Patel", "Drafting essays", "https://"],
      ["Example University REU", "Physics", "2025-02-15", "Undergrad (some HS)", "Resume, statement", "Mr. Gomez", "Not started", "https://"]
    ]
  },
  {
    slug: "student-budget",
    icon: "💵",
    title: "Monthly student budget",
    blurb: "See where your money goes each month. List income and expenses, set a budget, and compare it to what you actually spend.",
    tags: ["budget", "money", "finance", "spending"],
    columns: ["Category", "Type (income/expense)", "Budgeted", "Actual", "Difference", "Notes"],
    sample: [
      ["Part-time job / allowance", "Income", "400", "400", "0", ""],
      ["Rent / housing", "Expense", "0", "0", "0", "On-campus / with family"],
      ["Food & groceries", "Expense", "150", "0", "0", ""],
      ["Textbooks & supplies", "Expense", "60", "0", "0", "Buy used / rent"],
      ["Subscriptions", "Expense", "15", "0", "0", "Use student discounts"],
      ["Fun / eating out", "Expense", "80", "0", "0", ""],
      ["Savings", "Expense", "50", "0", "0", "Pay yourself first"]
    ]
  },
  {
    slug: "subscription-tracker",
    icon: "🔁",
    title: "Free trial & subscription tracker",
    blurb: "Never get surprise-charged again. Log when each free trial ends and the date to cancel by.",
    tags: ["subscriptions", "free trials", "money", "perks"],
    columns: ["Service", "Plan", "Started", "Trial ends", "Cancel by", "Cost after trial", "Status"],
    sample: [
      ["Example Streaming", "Student", "2025-09-01", "2025-12-01", "2025-11-28", "$5.99/mo", "Free trial"],
      ["Example Cloud Storage", "Free tier", "2025-09-10", "n/a", "n/a", "$0", "Keep"]
    ]
  },
  {
    slug: "activities-list",
    icon: "📝",
    title: "Common App activities list",
    blurb: "Draft your 10 activities with roles, hours and 150-character descriptions before you touch the real application.",
    tags: ["college", "activities", "resume", "common app"],
    columns: ["Activity", "Position / role", "Organization", "Grades (9-12)", "Hrs/week", "Weeks/year", "Description (<=150 char)"],
    sample: [
      ["Robotics Team", "Build lead", "School", "10,11,12", "6", "30", "Led 5-person build team; placed 2nd at regional; mentored two freshmen on CAD."],
      ["Tutoring", "Volunteer", "Local library", "11,12", "2", "40", "Tutored middle-schoolers in algebra weekly; built free practice-problem packets."]
    ]
  },
  {
    slug: "assignment-planner",
    icon: "✅",
    title: "Assignment & study planner",
    blurb: "A simple homework and study tracker: what's due, when, how urgent, and whether it's done.",
    tags: ["school", "planner", "homework", "study"],
    columns: ["Class", "Task", "Due date", "Priority", "Est. time", "Status"],
    sample: [
      ["AP Biology", "Chapter 7 problem set", "2025-10-03", "High", "1.5h", "Not started"],
      ["English", "Essay draft", "2025-10-06", "Medium", "2h", "In progress"]
    ]
  },
  {
    slug: "college-cost-compare",
    icon: "⚖️",
    title: "College cost & aid comparison",
    blurb: "Compare real offers side by side. Sticker price means little — this shows your actual net cost per year.",
    tags: ["college", "financial aid", "cost", "money"],
    columns: ["School", "Sticker price", "Grants / scholarships", "Loans offered", "Work-study", "Net cost / year", "Notes"],
    sample: [
      ["Example State University", "28,000", "12,000", "5,500", "2,000", "14,000", "In-state"],
      ["Example Private University", "78,000", "55,000", "5,500", "2,500", "20,500", "Great aid"]
    ]
  }
];
