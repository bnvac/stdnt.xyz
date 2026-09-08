/*
 * finaid.js - key financial-aid deadlines every applicant should know. These
 * are universal (not tied to a school) and show up in the Deadlines calendar
 * under the "Aid" filter. Dates are the normal annual windows - always confirm
 * the exact date for your cycle and state.
 *   tag: short label shown on the deadline row
 */
window.FINAID = [
  { name: "FAFSA opens", tag: "FAFSA", deadline: "Oct 1",
    url: "https://studentaid.gov/h/apply-for-aid/fafsa",
    note: "The federal aid form opens. File ASAP - some federal and school aid is first-come, first-served." },
  { name: "CSS Profile opens", tag: "CSS Profile", deadline: "Oct 1",
    url: "https://cssprofile.collegeboard.org/",
    note: "Extra aid form required by ~200 (mostly private) colleges for their own grants. Fee waivers exist." },
  { name: "CSS Profile due (Early Decision / Action)", tag: "CSS Profile", deadline: "Nov 1",
    url: "https://cssprofile.collegeboard.org/",
    note: "Most ED/EA schools want the CSS Profile by their application deadline." },
  { name: "Priority FAFSA / state aid (many states)", tag: "State aid", deadline: "Feb 15",
    url: "https://studentaid.gov/apply-for-aid/fafsa/fafsa-deadlines",
    note: "Many states and schools set a priority date around now and award first-come. Check your state's exact date." },
  { name: "CSS Profile due (Regular Decision)", tag: "CSS Profile", deadline: "Feb 1",
    url: "https://cssprofile.collegeboard.org/",
    note: "Typical RD CSS Profile / IDOC (tax docs) deadline. Confirm each school's date." },
  { name: "FAFSA federal deadline", tag: "FAFSA", deadline: "Jun 30",
    url: "https://studentaid.gov/h/apply-for-aid/fafsa",
    note: "Last day to submit the FAFSA for the aid year (states and schools close much earlier)." }
];
