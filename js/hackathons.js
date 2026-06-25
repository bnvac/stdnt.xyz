/*
 * hackathons.js - baked-in fallback list for the Hackathons tab.
 *
 * At runtime app.js fetches data/hackathons.json (same-origin, refreshed daily
 * by .github/workflows/hackathons.yml from the Hack Club Hackathons API) and
 * uses that when available. This array is the offline / first-paint fallback so
 * the tab is never empty. Shape:
 *   { name, url, start, end, city, region, country, cc, format, source, hs }
 *   format: "in-person" | "online" | "hybrid"   hs: high-school focused
 * Dates are YYYY-MM-DD; always confirm exact dates on each event's site.
 */
window.HACKATHONS = [
  { name: "Cove Hacks", url: "https://www.covehacks.dev/", start: "2026-06-26", end: "2026-06-28", city: "Palo Alto", region: "California", country: "United States", cc: "US", format: "in-person", source: "Hack Club", hs: true },
  { name: "Pixel Forge Jam #2", url: "https://pixelforgejam.org/", start: "2026-06-27", end: "2026-07-04", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "Hack Club", hs: true },
  { name: "Hack the Arts", url: "https://www.hackthearts.net", start: "2026-07-01", end: "2026-08-01", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "Hack Club", hs: true },
  { name: "Global Hack Week: Season Launch", url: "https://ghw.mlh.io/", start: "2026-07-10", end: "2026-07-16", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "MLH", hs: false },
  { name: "Horizons Crux", url: "https://crux.hackclub.com", start: "2026-07-10", end: "2026-07-12", city: "", region: "", country: "", cc: "", format: "in-person", source: "Hack Club", hs: true },
  { name: "The Vakathon", url: "https://thevakathon.com", start: "2026-07-11", end: "2026-07-11", city: "San Ramon", region: "California", country: "United States", cc: "US", format: "in-person", source: "Hack Club", hs: true },
  { name: "vsHacks", url: "https://vshacks.com/", start: "2026-07-11", end: "2026-07-12", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "Hack Club", hs: true },
  { name: "Outpost", url: "https://outpost.hackclub.com", start: "2026-07-14", end: "2026-07-19", city: "", region: "", country: "", cc: "", format: "in-person", source: "Hack Club", hs: true },
  { name: "Garuda Hacks 7.0", url: "https://www.garudahacks.com/", start: "2026-07-16", end: "2026-07-18", city: "Kelapa Dua", region: "Banten", country: "Indonesia", cc: "ID", format: "in-person", source: "Hack Club", hs: true },
  { name: "Hack the 6ix", url: "https://hackthe6ix.com/", start: "2026-07-17", end: "2026-07-19", city: "Toronto", region: "Ontario", country: "Canada", cc: "CA", format: "in-person", source: "MLH", hs: false },
  { name: "Horizons Europa", url: "https://horizons.hackclub.com/europa", start: "2026-07-24", end: "2026-07-26", city: "Berlin", region: "Berlin", country: "Germany", cc: "DE", format: "in-person", source: "Hack Club", hs: true },
  { name: "Hexafalls 2", url: "https://mlh.io/seasons/2026/events", start: "2026-07-24", end: "2026-07-26", city: "Kolkata", region: "West Bengal", country: "India", cc: "IN", format: "in-person", source: "MLH", hs: false },
  { name: "Horizons Arcana", url: "https://arcana.hackclub.com/", start: "2026-07-31", end: "2026-08-02", city: "Singapore", region: "", country: "Singapore", cc: "SG", format: "in-person", source: "Hack Club", hs: true },
  { name: "Paradox", url: "https://paradox.hackclub.com", start: "2026-08-03", end: "2026-08-06", city: "London", region: "England", country: "United Kingdom", cc: "GB", format: "in-person", source: "Hack Club", hs: true },
  { name: "Bay-Valley Hacks", url: "https://bayvalleyhacks.com/", start: "2026-08-08", end: "2026-08-08", city: "Dublin", region: "California", country: "United States", cc: "US", format: "in-person", source: "Hack Club", hs: true },
  { name: "Horizons Equinox", url: "https://equinox.hackclub.com/", start: "2026-08-14", end: "2026-08-16", city: "Cairo", region: "Cairo", country: "Egypt", cc: "EG", format: "in-person", source: "Hack Club", hs: true },
  { name: "Pixel Forge AI Hackathon", url: "https://pixelforgehackathons.info/", start: "2026-08-15", end: "2026-08-22", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "Hack Club", hs: true },
  { name: "Global Hack Week: Data", url: "https://ghw.mlh.io/", start: "2026-09-11", end: "2026-09-17", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "MLH", hs: false },
  { name: "Hyphen-Hacks", url: "https://www.hyphen-hacks.com/", start: "2026-09-26", end: "2026-09-26", city: "San Francisco", region: "California", country: "United States", cc: "US", format: "in-person", source: "Hack Club", hs: true },
  { name: "Banana Hacks", url: "https://www.bananahacks.tech", start: "2026-10-09", end: "2026-10-12", city: "", region: "", country: "Worldwide", cc: "", format: "online", source: "Hack Club", hs: true }
];
