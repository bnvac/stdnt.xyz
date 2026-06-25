/*
 * discounts.js - consumer student discounts shown on the Discounts tab.
 * Same shape as resources in data.js: { name, url, category, access, mono|slug, desc, value, tags }.
 * Categories map to window.DISCOUNT_CATS below. Offers change often - keep
 * descriptions general and let the link-checker / a yearly review catch rot.
 */
window.DISCOUNT_CATS = [
  { id: "media", name: "Streaming & music", blurb: "Music, video and audio" },
  { id: "software", name: "Software", blurb: "Apps and creative tools" },
  { id: "shopping", name: "Shopping & tech", blurb: "Retail and devices" },
  { id: "food", name: "Food", blurb: "Delivery and dining" },
  { id: "travel", name: "Travel", blurb: "Flights, rail and abroad" },
  { id: "news", name: "News", blurb: "Subscriptions" },
  { id: "services", name: "Discount platforms", blurb: "Unlock many brands" }
];

window.DISCOUNTS = [
  // discount platforms (start here)
  { name: "UNiDAYS", url: "https://www.myunidays.com/", category: "services", access: "student", mono: "UN",
    desc: "Free membership that unlocks verified student discounts at hundreds of brands.", value: "Free", tags: ["platform", "verification", "deals"] },
  { name: "Student Beans", url: "https://www.studentbeans.com/", category: "services", access: "student", mono: "SB",
    desc: "Student discount platform with verified codes for fashion, tech, food and more.", value: "Free", tags: ["platform", "codes", "deals"] },
  { name: "ISIC Card", url: "https://www.isic.org/", category: "travel", access: "student", mono: "IS",
    desc: "International Student Identity Card: thousands of travel, retail and museum discounts worldwide.", tags: ["card", "travel", "international"] },

  // streaming & music
  { name: "Spotify Premium Student", url: "https://www.spotify.com/us/student/", category: "media", access: "student", mono: "Sp",
    desc: "Discounted Premium for students, often bundled with Hulu and SHOWTIME.", value: "~50% off", tags: ["music", "audio"] },
  { name: "Apple Music Student", url: "https://www.apple.com/apple-music/", category: "media", access: "student", mono: "Am",
    desc: "Half-price Apple Music for up to 48 months; includes Apple TV+ in some regions.", value: "~50% off", tags: ["music"] },
  { name: "YouTube Premium Student", url: "https://www.youtube.com/premium/student", category: "media", access: "student", mono: "YT",
    desc: "Discounted ad-free YouTube and YouTube Music for verified students.", tags: ["video", "music"] },
  { name: "Hulu (Student)", url: "https://www.hulu.com/student", category: "media", access: "student", mono: "Hu",
    desc: "Discounted Hulu plan, sometimes included free with Spotify Premium Student.", tags: ["video"] },
  { name: "Peacock Student", url: "https://www.peacocktv.com/", category: "media", access: "student", mono: "Pe",
    desc: "Student rate on Peacock Premium streaming.", tags: ["video"] },
  { name: "Paramount+ Student", url: "https://www.paramountplus.com/", category: "media", access: "student", mono: "P+",
    desc: "Student discount on Paramount+ streaming.", tags: ["video"] },

  // software
  { name: "Microsoft 365 Education", url: "https://www.microsoft.com/en-us/education/products/office", category: "software", access: "student", mono: "MS",
    desc: "Word, Excel, PowerPoint and Teams free for students at eligible schools.", value: "Free", tags: ["office", "productivity"] },
  { name: "Apple Education Store", url: "https://www.apple.com/us-edu/store", category: "software", access: "student", mono: "Ap",
    desc: "Education pricing on Mac and iPad, plus back-to-school gift-card promos.", tags: ["mac", "ipad", "devices"] },
  { name: "Adobe Creative Cloud Student", url: "https://www.adobe.com/creativecloud/buy/students.html", category: "software", access: "student", mono: "Ad",
    desc: "Big discount on the full Creative Cloud suite (Photoshop, Premiere and more).", value: "~60% off", tags: ["design", "video"] },
  { name: "Autodesk Education", url: "https://www.autodesk.com/education/edu-software/overview", category: "software", access: "student", mono: "Au",
    desc: "Free AutoCAD, Fusion, Maya and more for verified students.", value: "Free", tags: ["cad", "3d", "engineering"] },
  { name: "Squarespace Student", url: "https://www.squarespace.com/", category: "software", access: "student", mono: "Sq",
    desc: "Student discount on Squarespace website plans for your portfolio.", tags: ["website", "portfolio"] },

  // shopping & tech
  { name: "Amazon Prime Student", url: "https://www.amazon.com/amazonprime", category: "shopping", access: "student", mono: "Pr",
    desc: "6-month free trial, then 50% off Prime: fast shipping, Prime Video and student deals.", value: "50% off", tags: ["shopping", "shipping", "video"] },
  { name: "Samsung Education Store", url: "https://www.samsung.com/us/shop/offer/education", category: "shopping", access: "student", mono: "Sm",
    desc: "Student and education discounts on Galaxy phones, tablets and laptops.", tags: ["phone", "laptop", "devices"] },
  { name: "Dell University", url: "https://www.dell.com/en-us/lp/university", category: "shopping", access: "student", mono: "De",
    desc: "Member-exclusive student coupons and pricing on laptops and accessories.", tags: ["laptop", "devices"] },
  { name: "Nike Student", url: "https://www.nike.com/help/a/student-discount", category: "shopping", access: "student", mono: "Ni",
    desc: "Student discount on Nike via verification (SheerID).", value: "10% off", tags: ["apparel", "shoes"] },
  { name: "Adidas Student", url: "https://www.adidas.com/us/student-discount", category: "shopping", access: "student", mono: "Ai",
    desc: "Student discount at Adidas through verification.", tags: ["apparel", "shoes"] },

  // food
  { name: "Grubhub+ Student", url: "https://www.grubhub.com/", category: "food", access: "student", mono: "GH",
    desc: "Free Grubhub+ for students: $0 delivery fees on eligible orders.", tags: ["delivery", "food"] },
  { name: "DoorDash DashPass (Student)", url: "https://www.doordash.com/", category: "food", access: "student", mono: "DD",
    desc: "Discounted DashPass for students with reduced fees on eligible orders.", tags: ["delivery", "food"] },

  // travel
  { name: "StudentUniverse", url: "https://www.studentuniverse.com/", category: "travel", access: "student", mono: "SU",
    desc: "Discounted flights, hotels and tours for students and travelers under 26.", tags: ["flights", "travel"] },
  { name: "Amtrak Student", url: "https://www.amtrak.com/deals/everyday-discounts.html", category: "travel", access: "student", mono: "At",
    desc: "Discount on Amtrak fares for students (often via Student Advantage).", tags: ["rail", "travel"] },

  // news
  { name: "The New York Times Student", url: "https://www.nytimes.com/subscription/student-allaccess", category: "news", access: "student", mono: "NYT",
    desc: "Heavily discounted NYT digital subscription for students.", tags: ["news", "reading"] },
  { name: "WSJ Student", url: "https://education.wsj.com/", category: "news", access: "student", mono: "WSJ",
    desc: "Discounted Wall Street Journal membership for students.", tags: ["news", "finance"] },
  { name: "The Economist Student", url: "https://www.economist.com/student", category: "news", access: "student", mono: "Ec",
    desc: "Student rate on The Economist digital subscription.", tags: ["news", "world"] }
];
