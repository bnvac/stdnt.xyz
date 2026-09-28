import { test } from "node:test";
import assert from "node:assert/strict";
import { loadData } from "../scripts/lib/data.mjs";

const SHARED = loadData(["js/shared.js"]).SHARED;
// the helpers run in a vm context, so copy results into this realm before deep-comparing
const whenText = (w) => ({ ...SHARED.whenText(w) }), selectivity = SHARED.selectivity;

test("whenText rounds exact past dates to parts of a month", () => {
  assert.deepEqual(whenText("June 23 - August 3"), { text: "Usually late June to early August (about 6 weeks)", past: "June 23 - August 3" });
  assert.equal(whenText("July 7 - July 27").text, "Usually early to late July (about 3 weeks)");
  assert.equal(whenText("July 22 - July 26").text, "Usually late July (5 days)");
  assert.equal(whenText("June 15 - July 10 (Approx)").text, "Usually mid June to early July (about 4 weeks)");
});

test("whenText keeps a length the listing already states", () => {
  assert.equal(whenText("June 18 - August 12 (8 weeks)").text, "Usually mid June to mid August (8 weeks)");
});

test("whenText summarizes multiple sessions, including short month names", () => {
  assert.equal(whenText("June 16 - June 29 / July 14 - July 27").text, "2 sessions, usually mid June to late July (about 2 weeks each)");
  assert.equal(whenText("June 23 - July 12 / July 14 - Aug 2").text, "2 sessions, usually late June to early August (about 3 weeks each)");
});

test("whenText leaves approximate wording alone", () => {
  for (const w of ["Late May - early August (10 weeks)", "4 weeks (residential)", "Year-round", ""]) assert.deepEqual(whenText(w), { text: w, past: "" });
});

test("selectivity turns acceptance rates into short tags", () => {
  assert.equal(selectivity({ accRate: "<3%" }), "Under 3% admitted");
  assert.equal(selectivity({ accRate: "~3-5%" }), "~3-5% admitted");
  assert.equal(selectivity({ accRate: "Highly selective" }), "Highly selective");
  assert.equal(selectivity({ accRate: "Varies" }), "");
  assert.equal(selectivity({}), "");
});
