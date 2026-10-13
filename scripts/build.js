#!/usr/bin/env node
/* Builds every page of Rainline Garden from assets/data.js.
 * Usage: node scripts/build.js
 * Pages are written into the repository root so GitHub Pages can serve them directly. */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const D = require("../assets/data.js");
const P = require("../assets/plan.js");
const R = require("../assets/render.js");

const CONFIG = {
  siteName: "Rainline Garden",
  siteUrl: "https://mahxiao05.github.io/rainline-garden/", // change when a custom domain is connected
  contactEmail: "xventuresbusiness@gmail.com",
  adsenseClient: "", // e.g. "ca-pub-1234567890123456"; leave empty until AdSense approves the site
  updated: new Date().toISOString().slice(0, 10)
};

const SOURCES = {
  noaa: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals",
  osuMonthly: "https://extension.oregonstate.edu/collection/monthly-garden-calendars",
  osuApril: "https://extension.oregonstate.edu/catalog/em-9476-april-garden-calendar",
  osuMay: "https://extension.oregonstate.edu/catalog/em-9688-may-garden-calendar",
  osuMarch: "https://extension.oregonstate.edu/catalog/em-9714-march-garden-calendar",
  osuCentral: "https://extension.oregonstate.edu/gardening/vegetables/central-oregon-vegetable-garden-calendar",
  osuSoil: "https://extension.oregonstate.edu/news/let-soil-temperature-guide-you-when-planting-vegetables-0"
};
const MONTH_PUBS = {
  1: "em-9698-january-garden-calendar", 2: "em-9689-february-garden-calendar", 3: "em-9714-march-garden-calendar",
  4: "em-9476-april-garden-calendar", 5: "em-9688-may-garden-calendar", 6: "em-9528-june-garden-calendar",
  7: "em-9543-july-garden-calendar", 8: "em-9539-august-garden-calendar", 9: "em-9587-september-garden-calendar",
  10: "em-9611-october-garden-calendar", 11: "em-9615-november-garden-calendar", 12: "em-9684-december-garden-calendar"
};

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pages = [];

function layout({ rel, title, description, canonical, current, body, scripts }) {
  const base = rel; // relative prefix back to the site root, e.g. "../../"
  const nav = [["", "Planner"], ["frost-dates/", "Frost dates by city"], ["garden-calendar/", "Monthly garden chores"], ["how-it-works/", "How it works"]]
    .map(([href, label]) => `<a href="${base}${href}"${current === href ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  const ads = CONFIG.adsenseClient
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CONFIG.adsenseClient}" crossorigin="anonymous"></script>` : "";
  return `<!doctype html>
<html lang="en" data-base="${base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${CONFIG.siteUrl}${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${CONFIG.siteUrl}${canonical}">
<meta name="theme-color" content="#1E3A2B">
<link rel="icon" href="${base}assets/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@700;800&family=Alegreya+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/style.css">
${ads}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head"><div class="wrap">
<a class="brand" href="${base}">Rainline Garden</a>
<nav class="nav" aria-label="Main">${nav}</nav>
</div></header>
<main id="main" class="wrap">
${body}
</main>
<footer class="site-foot"><div class="wrap">
<p>Rainline Garden: free planting calendars for Oregon and Washington gardens.<br>Frost data from NOAA. Planting timing from OSU Extension guidance. Updated ${CONFIG.updated}.</p>
<nav aria-label="Footer"><a href="${base}about/">About</a><a href="${base}how-it-works/">Sources</a><a href="${base}privacy/">Privacy</a></nav>
</div></footer>
${(scripts || []).map(s => `<script src="${base}assets/${s}"></script>`).join("\n")}
</body>
</html>
`;
}

function write(rel, file, html, priority) {
  const out = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  const loc = file.replace(/index\.html$/, "");
  if (priority !== null) pages.push({ loc, priority: priority || "0.6" });
}

const ad = name => `<div class="ad-slot" data-ad="${name}"></div>`;
const SCRIPTS = ["data.js", "plan.js", "render.js", "app.js"];
const placeLabel = p => `${p.city}, ${p.state}`;

/* Home */
write("", "index.html", layout({
  rel: "", canonical: "", current: "",
  title: "Rainline Garden: Planting Calendar and Frost Dates for Oregon and Washington",
  description: "When to plant vegetables where you live in Oregon and Washington. Enter your ZIP for local frost dates and a planting calendar built from NOAA data and OSU Extension guidance.",
  body: `
<section class="hero">
<h1>Plant on Northwest time.</h1>
<p class="lede">Enter your ZIP or pick a city for local frost dates, what to plant this week, and a full-year planting calendar for Oregon and Washington gardens.</p>
<form id="finder" class="finder" novalidate>
  <div class="field"><label for="zip">ZIP code</label><input id="zip" name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" pattern="[0-9]{5}" placeholder="97214"></div>
  <span class="or">or</span>
  <div class="field field-select"><label for="place">City</label><select id="place" name="place"><option value="">Choose a city</option></select></div>
  <button class="btn" type="submit">Show my calendar</button>
</form>
<p id="msg" class="msg" role="status" aria-live="polite"></p>
</section>
<section id="result" aria-live="polite"></section>
${ad("home-mid")}
<section class="prose">
<h2>Why Northwest planting dates are different</h2>
<p>National planting charts key everything off the last frost date. In much of the Pacific Northwest that's only half the story. Portland's typical last frost is in mid-March, yet tomatoes planted then would sit in cold, wet soil for two months. Oregon State University Extension advises waiting until soil is consistently above 70°F for tomatoes, squash and peppers.</p>
<p>East of the Cascades it flips. At Redmond, the NOAA station nearest Bend, the typical last frost isn't until June, and the frost-free season is closer to three months than eight. Rainline Garden combines both: NOAA frost records for each area, and regional timing from OSU Extension for when the soil is actually ready.</p>
<p><a href="how-it-works/">See exactly how the dates are worked out</a>.</p>
</section>`,
  scripts: SCRIPTS
}), "1.0");

/* City pages */
const byState = s => D.places.filter(p => p.state === s).sort((a, b) => a.city.localeCompare(b.city));
D.places.forEach(place => {
  const p = P.plan(D, place);
  const f = p.frost;
  const nearby = D.places.filter(x => x.zone === place.zone && x.slug !== place.slug).slice(0, 6);
  const notes = p.crops.map(r => `<div><h3>${r.crop.name}</h3><p>${esc(r.crop.note)}</p></div>`).join("");
  const tomato = p.crops.find(r => r.crop.id === "tomatoes").windows[0];
  const peas = p.crops.find(r => r.crop.id === "peas").windows[0];
  write("../../", `frost-dates/${place.slug}/index.html`, layout({
    rel: "../../", canonical: `frost-dates/${place.slug}/`, current: "frost-dates/",
    title: `${placeLabel(place)} Frost Dates and Planting Calendar | Rainline Garden`,
    description: `The typical last spring frost in ${placeLabel(place)} is ${P.fmtLong(f.spring50)} and the first fall frost is ${P.fmtLong(f.fall50)}. See when to plant tomatoes, peas, garlic and 18 more crops.`,
    body: `
<section class="hero" id="live" data-place="${place.slug}">
<h1>${esc(place.city)}, ${place.state} frost dates and planting calendar</h1>
<p class="lede">The typical last spring frost in ${esc(place.city)} is ${P.fmtLong(f.spring50)}, and the first fall frost is around ${P.fmtLong(f.fall50)}. Sow peas from ${P.fmt(peas.start)}; set out tomatoes from ${P.fmt(tomato.start)}.</p>
</section>
${R.frostFacts(p)}
${R.regionNote(p)}
<h2>What to plant now</h2>
<div id="now"><p class="empty">Turn on JavaScript to see what's in season today. The full calendar is below.</p></div>
<h2>Planting calendar</h2>
<div id="chart">${R.chart(p)}</div>
${ad("city-mid")}
<h2>Planting dates for ${esc(place.city)}</h2>
${R.table(p)}
<p class="station">Dates are a guide, not a guarantee. Check the soil before planting: cool-season crops need it workable and not soggy; warm-season crops need it warm. A $10 soil thermometer pays for itself.</p>
<h2>Crop tips</h2>
<div class="notes">${notes}</div>
<h2>Nearby areas with similar weather</h2>
<ul class="places">${nearby.map(x => `<li><a href="../${x.slug}/">${esc(placeLabel(x))}</a></li>`).join("")}</ul>
<p><a href="../">All Oregon and Washington cities</a> or <a href="../../">use the planner with your ZIP</a>.</p>`,
    scripts: SCRIPTS
  }), "0.8");
});

/* Frost dates index */
const placeList = s => byState(s).map(x => {
  const st = D.stations[x.station];
  return `<li><a href="${x.slug}/">${esc(x.city)}</a> <span>last frost ${P.fmt(P.doy(st.spring50))}, first frost ${P.fmt(P.doy(st.fall50))}</span></li>`;
}).join("");
write("../", "frost-dates/index.html", layout({
  rel: "../", canonical: "frost-dates/", current: "frost-dates/",
  title: "Oregon and Washington Frost Dates by City | Rainline Garden",
  description: "Typical last spring and first fall frost dates for 30 Oregon and Washington cities, from 1991-2020 NOAA climate normals, with a planting calendar for each.",
  body: `
<section class="hero"><h1>Frost dates by city</h1>
<p class="lede">Typical last spring and first fall frost dates for Oregon and Washington, from NOAA's 1991–2020 climate normals. Pick a city for its full planting calendar.</p></section>
<h2>Oregon</h2><ul class="places">${placeList("OR")}</ul>
<h2>Washington</h2><ul class="places">${placeList("WA")}</ul>
<p class="callout">"Typical" means the median: in half of years the last spring frost comes later. Each city page also shows the date when frost is over in 9 years out of 10.</p>`
}), "0.9");

/* Monthly calendar */
write("../", "garden-calendar/index.html", layout({
  rel: "../", canonical: "garden-calendar/", current: "garden-calendar/",
  title: "Pacific Northwest Garden Calendar: Monthly Chores | Rainline Garden",
  description: "Month-by-month vegetable garden chores for Oregon and Washington, from seed ordering in January to garlic planting in October.",
  body: `
<section class="hero"><h1>Monthly garden chores</h1>
<p class="lede">What to do in a Northwest vegetable garden each month. For exact planting dates where you live, <a href="../">use the planner</a>.</p></section>
<div class="months-list">${D.chores.map(c => `<section class="month" data-m="${c.m}"><h2>${c.title}</h2><ul>${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
<p class="src"><a href="https://extension.oregonstate.edu/catalog/${MONTH_PUBS[c.m]}">OSU Extension ${c.title} calendar</a></p></section>`).join("")}</div>
${ad("calendar-bottom")}`,
  scripts: ["data.js", "plan.js", "render.js", "app.js"]
}), "0.8");

/* How it works */
const z = D.zones;
const zoneRows = Object.keys(z).map(k => `<tr><th scope="row">${z[k].name}</th><td>${P.fmt(P.doy(z[k].anchors.coolEarly))}</td><td>${P.fmt(P.doy(z[k].anchors.coolTrans))}</td><td>${P.fmt(P.doy(z[k].anchors.warmSeed))}</td><td>${P.fmt(P.doy(z[k].anchors.warmTrans))}</td><td>${P.fmtRange(P.doy(z[k].anchors.garlicStart), P.doy(z[k].anchors.garlicEnd))}</td></tr>`).join("");
const stationRows = D.places.map(x => { const s = D.stations[x.station]; return `<tr><th scope="row">${esc(placeLabel(x))}</th><td>${esc(s.name)} (${x.station})</td><td>${P.fmt(P.doy(s.spring50))}</td><td>${P.fmt(P.doy(s.spring10))}</td><td>${P.fmt(P.doy(s.fall50))}</td><td>${P.fmt(P.doy(s.fall10))}</td></tr>`; }).join("");
write("../", "how-it-works/index.html", layout({
  rel: "../", canonical: "how-it-works/", current: "how-it-works/",
  title: "How Rainline Garden Works: Data and Sources",
  description: "The NOAA frost data and OSU Extension guidance behind Rainline Garden's planting dates, and exactly how each date is calculated.",
  body: `
<section class="hero prose"><h1>How it works</h1>
<p class="lede">Every date on this site comes from public data and a rule you can check. Here are both.</p></section>
<div class="prose">
<h2>Frost dates</h2>
<p>Frost dates are from the <a href="${SOURCES.noaa}">NOAA U.S. Climate Normals for 1991–2020</a>, which give the probability of a 32°F freeze at each weather station. We use:</p>
<ul><li><strong>Typical last spring frost:</strong> the date after which there's a 50% chance of another freeze.</li>
<li><strong>9-in-10 safe date:</strong> the date after which there's only a 10% chance.</li>
<li><strong>Typical first fall frost:</strong> the date by which there's a 50% chance of the first freeze.</li></ul>
<p>Most stations are at airports. Airports in valley bottoms can run colder than nearby hillsides, and city centers can run warmer. Your own garden may differ by a week or more.</p>
<h2>Planting dates</h2>
<p>Each crop gets the <em>later</em> of two dates:</p>
<ol><li><strong>A regional date</strong> for when the soil is usually ready, taken from Oregon State University Extension's <a href="${SOURCES.osuMarch}">March</a>, <a href="${SOURCES.osuApril}">April</a> and <a href="${SOURCES.osuMay}">May</a> garden calendars, its <a href="${SOURCES.osuCentral}">Central Oregon vegetable calendar</a>, and its <a href="${SOURCES.osuSoil}">soil temperature guidance</a>. Washington areas use the closest matching Oregon region.</li>
<li><strong>A frost check</strong> against your local typical last frost: hardy early crops up to 6 weeks before it, frost-tolerant transplants up to 4 weeks before, warm-season transplants not before it, and warm-season seeds a week after it.</li></ol>
<p>Seed-starting dates count back from the outdoor date (for example, tomatoes 6–8 weeks ahead). Fall planting dates count back from your typical first fall frost, capped at October 15 because fall crops need daylight to grow, not just mild weather. Warm-season crops are flagged when planting at the window's start leaves too few days before fall frost for a typical variety to produce.</p>
</div>
<h2>Regional dates used</h2>
<div class="table-wrap"><table class="plan"><thead><tr><th scope="col">Region</th><th scope="col">Hardy early crops</th><th scope="col">Cool transplants</th><th scope="col">Warm seeds</th><th scope="col">Warm transplants</th><th scope="col">Garlic</th></tr></thead><tbody>${zoneRows}</tbody></table></div>
<h2>Station data</h2>
<div class="table-wrap"><table class="plan"><thead><tr><th scope="col">Area</th><th scope="col">NOAA station</th><th scope="col">Last frost (50%)</th><th scope="col">Last frost (10%)</th><th scope="col">First frost (50%)</th><th scope="col">First frost (10%)</th></tr></thead><tbody>${stationRows}</tbody></table></div>
<p class="station">Spotted something that looks wrong? Email <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p>`
}), "0.5");

/* About */
write("../", "about/index.html", layout({
  rel: "../", canonical: "about/", current: "about/",
  title: "About Rainline Garden",
  description: "Rainline Garden is a free planting calendar made for Oregon and Washington gardeners.",
  body: `<section class="hero prose"><h1>About Rainline Garden</h1>
<p class="lede">A free planting calendar built for Pacific Northwest gardens, not adapted from a national chart.</p></section>
<div class="prose"><p>National planting guides treat the whole country the same way. The Northwest doesn't cooperate: coastal gardens rarely frost but never get hot, west-side valleys have long seasons and cold spring soil, and the high desert can frost in July. Rainline Garden gives each area its own dates, built from NOAA weather records and Oregon State University Extension guidance.</p>
<p>The site is free and supported by advertising. It isn't affiliated with NOAA, Oregon State University or Washington State University.</p>
<p>Questions or corrections: <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p></div>`
}), "0.3");

/* Privacy */
write("../", "privacy/index.html", layout({
  rel: "../", canonical: "privacy/", current: "privacy/",
  title: "Privacy Policy | Rainline Garden",
  description: "How Rainline Garden handles your information.",
  body: `<section class="hero prose"><h1>Privacy policy</h1><p class="lede">Last updated ${CONFIG.updated}.</p></section>
<div class="prose">
<h2>What we collect</h2>
<p>Rainline Garden has no accounts and no forms that send data to us. The ZIP code you enter is matched to a city inside your browser and is never sent to our server. The planner remembers the last city you chose in your browser's local storage so it's ready next time; you can clear it by clearing site data in your browser.</p>
<h2>Advertising</h2>
<p>This site uses Google AdSense to show ads. Google and its partners use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads">Google Ads Settings</a>, and learn more at <a href="https://policies.google.com/technologies/ads">How Google uses information from sites that use its services</a>.</p>
<h2>Hosting and fonts</h2>
<p>The site is hosted on GitHub Pages, which may log visitor IP addresses for security. Fonts load from Google Fonts.</p>
<h2>Contact</h2>
<p>Questions about this policy: <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p></div>`
}), "0.2");

/* 404 (absolute links because it can be served at any path) */
fs.writeFileSync(path.join(ROOT, "404.html"), layout({
  rel: "/rainline-garden/", canonical: "", current: null,
  title: "Page not found | Rainline Garden", description: "That page doesn't exist.",
  body: `<section class="hero prose"><h1>That page doesn't exist.</h1><p class="lede">Try the <a href="/rainline-garden/">planner</a> or the <a href="/rainline-garden/frost-dates/">list of cities</a>.</p></section>`
}));

/* sitemap, robots */
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${CONFIG.siteUrl}${p.loc}</loc><lastmod>${CONFIG.updated}</lastmod><priority>${p.priority}</priority></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.siteUrl}sitemap.xml\n`);
fs.writeFileSync(path.join(ROOT, ".nojekyll"), "");
console.log(`Built ${pages.length} pages.`);
