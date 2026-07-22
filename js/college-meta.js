/*
 * college-meta.js - hand-curated application info for well-known colleges:
 * typical deadlines, application plan, how many supplemental essays they make
 * you write ("how annoying it is to apply"), the platform, and whether the CSS
 * Profile is needed for aid. Keyed by the exact College Scorecard name
 * (lowercased). Dates are TYPICAL windows for a fall-entry cycle - always
 * confirm on the school's site. `essays` = supplemental essays / short-answer
 * prompts beyond the main Common App / personal statement.
 *
 *   plan   headline early option: ED, EA, REA (restrictive/single-choice EA),
 *          Rolling, or RD when there's no early round
 *   early  early deadline (null if none / rolling)
 *   rd     regular-decision deadline (null if rolling-only)
 *   essays number of supplemental writing pieces (0 = just the main essay)
 *   app    application platform
 *   css    true if the CSS Profile is required for institutional aid
 */
window.COLLEGE_META = {
  "massachusetts institute of technology": { plan: "EA", early: "Nov 1", rd: "Jan 4", essays: 5, app: "MIT app", css: true },
  "harvard university": { plan: "REA", early: "Nov 1", rd: "Jan 1", essays: 5, app: "Common App", css: true },
  "princeton university": { plan: "REA", early: "Nov 1", rd: "Jan 1", essays: 4, app: "Common App", css: true },
  "yale university": { plan: "REA", early: "Nov 1", rd: "Jan 2", essays: 7, app: "Common App", css: true },
  "stanford university": { plan: "REA", early: "Nov 1", rd: "Jan 5", essays: 8, app: "Common App", css: true },
  "columbia university in the city of new york": { plan: "ED", early: "Nov 1", rd: "Jan 1", essays: 6, app: "Common App", css: true },
  "cornell university": { plan: "ED", early: "Nov 1", rd: "Jan 2", essays: 3, app: "Common App", css: true },
  "brown university": { plan: "ED", early: "Nov 1", rd: "Jan 3", essays: 3, app: "Common App", css: true },
  "dartmouth college": { plan: "ED", early: "Nov 1", rd: "Jan 3", essays: 3, app: "Common App", css: true },
  "university of pennsylvania": { plan: "ED", early: "Nov 1", rd: "Jan 5", essays: 3, app: "Common App", css: true },
  "california institute of technology": { plan: "EA", early: "Nov 1", rd: "Jan 3", essays: 5, app: "Common App", css: true },
  "duke university": { plan: "ED", early: "Nov 1", rd: "Jan 2", essays: 2, app: "Common App", css: true },
  "johns hopkins university": { plan: "ED", early: "Nov 1", rd: "Jan 2", essays: 2, app: "Common App", css: true },
  "northwestern university": { plan: "ED", early: "Nov 1", rd: "Jan 1", essays: 2, app: "Common App", css: true },
  "university of chicago": { plan: "EA", early: "Nov 1", rd: "Jan 2", essays: 2, app: "Common App", css: true },
  "vanderbilt university": { plan: "ED", early: "Nov 1", rd: "Jan 1", essays: 1, app: "Common App", css: true },
  "rice university": { plan: "ED", early: "Nov 1", rd: "Jan 4", essays: 4, app: "Common App", css: true },
  "university of notre dame": { plan: "REA", early: "Nov 1", rd: "Jan 1", essays: 3, app: "Common App", css: true },
  "georgetown university": { plan: "EA", early: "Nov 1", rd: "Jan 10", essays: 3, app: "Georgetown app", css: true },
  "carnegie mellon university": { plan: "ED", early: "Nov 1", rd: "Jan 3", essays: 3, app: "Common App", css: true },
  "emory university": { plan: "ED", early: "Nov 1", rd: "Jan 1", essays: 2, app: "Common App", css: true },
  "washington university in st louis": { plan: "ED", early: "Nov 1", rd: "Jan 2", essays: 1, app: "Common App", css: true },
  "university of southern california": { plan: "EA", early: "Nov 1", rd: "Jan 15", essays: 5, app: "Common App", css: true },
  "new york university": { plan: "ED", early: "Nov 1", rd: "Jan 5", essays: 1, app: "Common App", css: true },
  "tufts university": { plan: "ED", early: "Nov 1", rd: "Jan 1", essays: 3, app: "Common App", css: true },
  "boston university": { plan: "ED", early: "Nov 1", rd: "Jan 4", essays: 1, app: "Common App", css: true },
  "boston college": { plan: "EA", early: "Nov 1", rd: "Jan 1", essays: 1, app: "Common App", css: true },
  "northeastern university": { plan: "ED", early: "Nov 1", rd: "Jan 1", essays: 1, app: "Common App", css: false },
  "georgia institute of technology-main campus": { plan: "EA", early: "Oct 15", rd: "Jan 4", essays: 1, app: "Common App", css: false },
  "university of michigan-ann arbor": { plan: "EA", early: "Nov 1", rd: "Feb 1", essays: 2, app: "Common App", css: false },
  "university of virginia-main campus": { plan: "EA", early: "Nov 1", rd: "Jan 5", essays: 2, app: "Common App", css: false },
  "university of north carolina at chapel hill": { plan: "EA", early: "Oct 15", rd: "Jan 15", essays: 2, app: "Common App", css: true },
  "university of california-los angeles": { plan: "RD", early: null, rd: "Nov 30", essays: 4, app: "UC app", css: false },
  "university of california-berkeley": { plan: "RD", early: null, rd: "Nov 30", essays: 4, app: "UC app", css: false },
  "university of california-san diego": { plan: "RD", early: null, rd: "Nov 30", essays: 4, app: "UC app", css: false },
  "university of california-irvine": { plan: "RD", early: null, rd: "Nov 30", essays: 4, app: "UC app", css: false },
  "university of california-davis": { plan: "RD", early: null, rd: "Nov 30", essays: 4, app: "UC app", css: false },
  "university of california-santa barbara": { plan: "RD", early: null, rd: "Nov 30", essays: 4, app: "UC app", css: false },
  "the university of texas at austin": { plan: "RD", early: null, rd: "Dec 1", essays: 3, app: "ApplyTexas", css: false },
  "university of illinois urbana-champaign": { plan: "EA", early: "Nov 1", rd: "Jan 5", essays: 2, app: "Common App", css: false },
  "university of wisconsin-madison": { plan: "EA", early: "Nov 1", rd: "Feb 1", essays: 2, app: "Common App", css: false },
  "university of washington-seattle campus": { plan: "RD", early: null, rd: "Nov 15", essays: 2, app: "Coalition", css: false },
  "purdue university-main campus": { plan: "EA", early: "Nov 1", rd: "Jan 15", essays: 2, app: "Common App", css: false },
  "ohio state university-main campus": { plan: "EA", early: "Nov 1", rd: "Feb 1", essays: 1, app: "Common App", css: false },
  "pennsylvania state university-main campus": { plan: "Rolling", early: "Nov 1", rd: null, essays: 1, app: "Own app", css: false },
  "university of florida": { plan: "RD", early: null, rd: "Nov 1", essays: 1, app: "Own app", css: false },
  "the university of alabama": { plan: "Rolling", early: "Dec 1", rd: null, essays: 0, app: "Own app", css: false },
  "north carolina state university at raleigh": { plan: "EA", early: "Oct 15", rd: "Jan 15", essays: 2, app: "Common App", css: false },
  "university of massachusetts-amherst": { plan: "EA", early: "Nov 5", rd: "Jan 15", essays: 1, app: "Common App", css: false },
  "university of massachusetts-lowell": { plan: "Rolling", early: "Nov 1", rd: null, essays: 0, app: "Common App", css: false },
  "worcester polytechnic institute": { plan: "EA", early: "Nov 1", rd: "Feb 1", essays: 0, app: "Common App", css: true },
  "case western reserve university": { plan: "EA", early: "Nov 1", rd: "Jan 15", essays: 1, app: "Common App", css: true },
  "virginia polytechnic institute and state university": { plan: "EA", early: "Nov 1", rd: "Jan 15", essays: 2, app: "Common App", css: false },
  "texas a&m university-college station": { plan: "RD", early: null, rd: "Dec 1", essays: 3, app: "ApplyTexas", css: false },
  "university of maryland-college park": { plan: "EA", early: "Nov 1", rd: "Jan 15", essays: 3, app: "Common App", css: false },
  "university of georgia": { plan: "EA", early: "Oct 15", rd: "Jan 1", essays: 2, app: "Common App", css: false },
  "clemson university": { plan: "RD", early: null, rd: "Dec 1", essays: 1, app: "Common App", css: false },
  "auburn university": { plan: "Rolling", early: null, rd: null, essays: 0, app: "Own app", css: false },
  "university of colorado boulder": { plan: "EA", early: "Nov 15", rd: "Jan 15", essays: 2, app: "Common App", css: false },
  "michigan state university": { plan: "Rolling", early: "Nov 1", rd: null, essays: 2, app: "Own app", css: false },
  "indiana university-bloomington": { plan: "EA", early: "Nov 1", rd: "Feb 1", essays: 1, app: "Common App", css: false },
  "university of minnesota-twin cities": { plan: "Rolling", early: "Nov 1", rd: "Jan 1", essays: 1, app: "Common App", css: false },
  "university of miami": { plan: "ED", early: "Nov 1", rd: "Jan 15", essays: 1, app: "Common App", css: true },
  "wake forest university": { plan: "ED", early: "Nov 15", rd: "Jan 1", essays: 4, app: "Common App", css: true },
  "villanova university": { plan: "ED", early: "Nov 1", rd: "Jan 15", essays: 1, app: "Common App", css: true },
  "tulane university of louisiana": { plan: "EA", early: "Nov 15", rd: "Jan 15", essays: 1, app: "Common App", css: false },
  "university of pittsburgh-pittsburgh campus": { plan: "Rolling", early: null, rd: null, essays: 0, app: "Own app", css: false },
  "lehigh university": { plan: "ED", early: "Nov 1", rd: "Jan 1", essays: 2, app: "Common App", css: true },
  "williams college": { plan: "ED", early: "Nov 15", rd: "Jan 6", essays: 3, app: "Common App", css: true },
  "brigham young university": { plan: "RD", early: null, rd: "Dec 1", essays: 4, app: "Own app", css: false }
};
