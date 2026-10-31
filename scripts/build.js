#!/usr/bin/env node
/* Builds every page of Rainline Garden from assets/data.js.
 * Usage: node scripts/build.js
 * Pages are written into the repository root so GitHub Pages can serve them directly. */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const D = require("../assets/data.js");
const P = require("../assets/plan.js");
const CATEGORY_EXTRAS = require("./category-extras.js");
const COLLECTIONS = require("./collections.js");
const { extras: EXTRAS, familyOf: FAMILY_OF } = require("./plant-extras.js");
const R = require("../assets/render.js");
const G = require("./guide.js");
const PHOTOS = require("./photos.js");
const SCIENCE = require("./crop-science.js");
const NOTES = require("./crop-notes.js");
const CARE_TIPS = require("./care-tips.js");
const CATEGORY_GUIDES = require("./category-guides.js");
const VARIETIES = require("./varieties.js");
const VIDEOS = require("./videos.js");
const AREA_TIPS = require("./area-tips.js");
const STATION_CHECK = require("./station-check.js");
const { SIZES, fileBase, sizesFor } = require("./photo-sizes.js");
const ARTICLES = require("./articles-4.js").concat(require("./articles-3.js"), require("./articles-2.js"), require("./articles.js")); // newest first

const CONFIG = {
  siteName: "Rainline Garden",
  customDomain: "rainlinegarden.org", // e.g. "rainlinegarden.com"; set after buying the domain, then rebuild (see README)
  contactEmail: "info@rainlinegarden.org",
  owner: "X Ventures LLC", // the company that owns and runs the site
  // Article authors are in AUTHORS below. Only list credentials the person actually holds.
  adsenseClient: "ca-pub-7867146450299069", // AdSense publisher ID; also written to ads.txt
  adsenseSlot: "7360740911", // AdSense display ad unit (responsive) shown in each page's ad slot; empty leaves the slots blank
  amazonTag: "", // Amazon Associates tracking ID, e.g. "rainline-20"; product links work without it but earn nothing
  newsletterAction: "", // email signup form URL, e.g. "https://buttondown.com/api/emails/embed-subscribe/rainline"; signup boxes stay hidden until set
  newsletterField: "email", // the form field name your email provider expects
  newsletterTagField: "tag", // field your provider uses to tag subscribers; My garden plan tags frost-alert signups "frost-alert" and "frost-{town}"
  goatcounterCode: "", // free, cookie-free visitor stats: the code you picked at goatcounter.com, e.g. "rainline"
  updated: new Date().toISOString().slice(0, 10)
};
CONFIG.siteUrl = CONFIG.customDomain ? `https://${CONFIG.customDomain}/` : "https://mahxiao05.github.io/rainline-garden/";
CONFIG.basePath = new URL(CONFIG.siteUrl).pathname; // "/" on a custom domain, "/rainline-garden/" on GitHub Pages
const YEAR = CONFIG.updated.slice(0, 4);
// Visible dates show month and year only ("October 2026"); full dates stay in datetime attributes, JSON-LD and the sitemap.
const monthYear = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });
const stamp = iso => `<time datetime="${iso}">${monthYear(iso)}</time>`;

const SOURCES = {
  noaa: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
};

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pages = [];
const OWNER_LD = { "@type": "Organization", name: CONFIG.owner, url: CONFIG.siteUrl };
const AUTHORS = {
  "jigmey-dorjee": {
    name: "Jigmey Dorjee", role: "Experienced home gardener", he: "He", cover: "author-jigmey.svg",
    facts: ["Grew up in Oregon", "Years of growing vegetables at home", "Checks dates against NOAA weather records"],
    bio: "Jigmey Dorjee grew up in Oregon, where gardening means working with the weather: cold, wet springs, dry summers and long, mild falls. He's an experienced home gardener who has grown his own vegetables for years, and he knows firsthand that a Northwest garden runs on a different calendar than the national planting charts. He writes about vegetables and planting timing for Rainline Garden and checks the advice against NOAA weather records and university research.",
    short: "Jigmey Dorjee grew up in Oregon and has grown his own vegetables at home for years. He writes about vegetables and planting timing, and checks the advice against NOAA weather records and university research."
  },
  "elaine-holloway": {
    name: "Elaine Holloway", role: "Soil, native plants and perennials", he: "She", cover: "author-elaine.svg",
    facts: ["Born and raised in the Portland area", "Studied environmental science at Portland State", "Focus: soil health, native and pollinator plants"],
    bio: "Elaine Holloway was born and raised in the greater Portland area, where she grew up helping family tend backyard vegetable plots, native plant borders and container gardens. A lifelong gardener, she focuses on regional horticulture: building healthy soil, managing moisture through wet Northwest winters and dry summers, choosing native and climate-adapted plants, and adding pollinator-friendly, low-maintenance plantings to home gardens. She studied environmental science with a focus on horticulture at Portland State University, including plant ecology, sustainable agriculture and native plants. Where Jigmey covers vegetables and planting dates, Elaine covers the soil underneath them and the perennials, herbs and flowers around them.",
    short: "Elaine Holloway was born and raised in the Portland area, has gardened all her life and studied environmental science at Portland State. She writes about soil, moisture, perennials and native and pollinator-friendly plants for Northwest gardens.",
    // Harvest photos in assets/img/results/{img}-480/-800 (.jpg + .webp, 4:5). Caption parts: plain text, or [text, crop id] to link a plant page.
    results: [
      { img: "elaine-summer-basket", alt: "A basket of eggplant, long green peppers and beans beside a bottle gourd, luffa, small cucumbers, and a dish of tomatoes, cherry tomatoes and strawberries",
        caption: [["Eggplant", "eggplant"], ", long green ", ["peppers", "peppers"], " and ", ["beans", "beans"], " in the basket, with a bottle gourd, luffa, small ", ["cucumbers", "cucumbers"], ", slicing, yellow and cherry ", ["tomatoes", "tomatoes"], " and ", ["strawberries", "strawberries"], "."] },
      { img: "elaine-okra-luffa-tomatoes", alt: "Dark striped heirloom tomatoes, speckled beans, red okra pods and ridged luffa on a counter, with a bag of leafy greens",
        caption: ["Dark heirloom ", ["tomatoes", "tomatoes"], ", speckled ", ["beans", "beans"], ", red okra and ridged luffa, with a bag of leafy greens."] },
      { img: "elaine-red-okra", alt: "A hand holding four red okra pods in front of the okra plant",
        caption: ["Red okra, picked young and tender, with more pods still growing on the plant."] },
      { img: "elaine-gourd-squash-roots", alt: "A large bottle gourd, a green winter squash, and a colander of carrots, red potatoes and a tomato",
        caption: ["A bottle gourd and a green ", ["winter squash", "winter-squash"], ", with ", ["carrots", "carrots"], ", red ", ["potatoes", "potatoes"], " and a ", ["tomato", "tomatoes"], "."] }
    ]
  }
};
const DEFAULT_AUTHOR = "jigmey-dorjee";
// Drop a square photo at assets/img/authors/{id}.jpg and it replaces the initials badge.
const authorPhoto = id => fs.existsSync(path.join(ROOT, "assets/img/authors", id + ".jpg")) ? `assets/img/authors/${id}.jpg` : null;
const avatar = (rel, id, cls) => authorPhoto(id)
  ? `<img class="avatar ${cls || ""}" src="${rel}${authorPhoto(id)}" alt="${AUTHORS[id].name}" width="96" height="96">`
  : `<span class="avatar ${cls || ""}${id === "elaine-holloway" ? " avatar-alt" : ""}" aria-hidden="true">${initials(AUTHORS[id].name)}</span>`;
const authorLd = id => ({ "@type": "Person", name: AUTHORS[id].name, url: `${CONFIG.siteUrl}about/#${id}` });
// author: "site" bylines an article to Rainline Garden itself, for general guides no one person wrote or checked.
const SITE_BY = "site";
const byLd = id => id === SITE_BY ? { "@type": "Organization", name: CONFIG.siteName, url: CONFIG.siteUrl } : authorLd(id);
const byAvatar = (rel, id, cls) => id === SITE_BY ? `<img class="avatar avatar-site ${cls || ""}" src="${rel}assets/icon.svg" alt="Rainline Garden logo" aria-hidden="true" width="96" height="96">` : avatar(rel, id, cls);
const byName = (rel, id) => id === SITE_BY ? `<a href="${rel}about/">${CONFIG.siteName}</a>` : `<a href="${rel}about/#${id}">${AUTHORS[id].name}</a>`;
const byBox = (rel, id) => id === SITE_BY
  ? `<aside class="author-box">${byAvatar(rel, id, "avatar-lg")}<div><h2>About Rainline Garden</h2><p>Free planting calendars and growing guides for Oregon, Washington and Idaho gardens, built from NOAA frost records for ${D.places.length} towns.</p><a href="${rel}about/">More about us</a></div></aside>`
  : `<aside class="author-box">${avatar(rel, id, "avatar-lg")}<div><h2>About the author</h2><p>${esc(AUTHORS[id].short)}</p><a href="${rel}about/#${id}">More about ${AUTHORS[id].name.split(" ")[0]}</a></div></aside>`;
const authorCard = (rel, id, heading) => { const a = AUTHORS[id]; return `<section class="profile" id="${id}">
<div class="profile-cover"><img src="${rel}assets/img/${a.cover}" alt="Garden illustration for ${a.name}" aria-hidden="true" width="1200" height="320" loading="lazy"></div>
<div class="profile-body">
${avatar(rel, id, "avatar-xl")}
<p class="profile-kicker">${heading}</p>
<h2 class="profile-name">${a.name}</h2>
<p class="profile-role">${a.role}</p>
<ul class="profile-facts">${a.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
<p>${esc(a.bio)}</p>
${a.results ? resultsGallery(rel, a.results) : ""}
</div></section>`; };
const resultsGallery = (rel, list) => `<h3 class="results-h" id="growing-results">Growing results</h3>
<p class="results-note">Harvests from the home garden.</p>
<ul class="results-grid">${list.map(r => { const src = ext => `${rel}assets/img/results/${r.img}-480.${ext} 480w, ${rel}assets/img/results/${r.img}-800.${ext} 800w`;
  return `<li><figure><picture><source type="image/webp" srcset="${src("webp")}" sizes="(min-width: 46rem) 20rem, calc(100vw - 72px)">
<img src="${rel}assets/img/results/${r.img}-800.jpg" srcset="${src("jpg")}" sizes="(min-width: 46rem) 20rem, calc(100vw - 72px)" width="800" height="1000" alt="${esc(r.alt)}" loading="lazy" decoding="async"></picture>
<figcaption>${r.caption.map(c => typeof c === "string" ? esc(c) : `<a href="${rel}when-to-plant/${c[1]}/">${esc(c[0])}</a>`).join("")}</figcaption></figure></li>`; }).join("")}</ul>`;
// Photo contributors, shown on the About page. Only say what the person actually does; never name their town or street.
const CONTRIBUTORS = {
  "janelle-burklund": { name: "Janelle Burklund", role: "Hobby gardener, Portland", kicker: "Contributor: garden photos", cover: "janelle-raised-beds",
    bio: "Janelle Burklund is a Portland local and an Oregonian who gardens as a hobby and grows her own food. She shares photos from her garden so you can see these plants growing in a Northwest yard." }
};
// Contributor photos from their own gardens, used with permission: assets/img/results/{img}-480/-800 (.jpg + .webp, 4:3).
// by: a CONTRIBUTORS id. crops: plant pages that show it; home: shown on the home page.
const GARDEN_PHOTOS = [
  { by: "janelle-burklund", img: "janelle-broccoli-head", crops: ["broccoli"], alt: "Top-down view of a broccoli plant in a wooden raised bed, with a small green head forming among wide blue-green leaves",
    caption: ["A broccoli head starting to form in the middle of the plant."] },
  { by: "janelle-burklund", img: "janelle-broccoli-leaves", crops: ["broccoli"], alt: "A full broccoli head seen from above, surrounded by large blue-green leaves",
    caption: ["A full-size head, ready to cut while the buds are still tight."] },
  { by: "janelle-burklund", img: "janelle-kohlrabi-bed", crops: ["kohlrabi"], alt: "Young kohlrabi plants in a raised bed, with pale green bulbs swelling at the base of their leaves",
    caption: ["Kohlrabi bulbs swelling just above the soil in a raised bed."] },
  { by: "janelle-burklund", img: "janelle-red-cabbage-bed", crops: ["cabbage"], alt: "Red cabbage heads in a metal raised bed edged with orange marigolds, beside a wood-chip path",
    caption: ["Red cabbage in a raised bed, with marigolds planted along the edge."] },
  { by: "janelle-burklund", img: "janelle-raised-beds", home: true, alt: "A backyard vegetable garden of raised beds with red and green cabbage, tomatoes and marigolds, backed by tall arborvitae",
    caption: ["Raised beds of ", ["cabbage", "cabbage"], ", ", ["tomatoes", "tomatoes"], " and marigolds in late summer."] },
  { by: "janelle-burklund", img: "janelle-summer-harvest", home: true, alt: "A summer harvest on a kitchen counter: cherry tomatoes, green beans, eggplant, purple and yellow peppers and cucumbers",
    caption: ["A summer harvest: cherry ", ["tomatoes", "tomatoes"], ", ", ["beans", "beans"], ", ", ["eggplant", "eggplant"], ", ", ["peppers", "peppers"], " and ", ["cucumbers", "cucumbers"], "."] }
];
const gardenGrid = (rel, list, credit = true) => `<ul class="results-grid garden-grid${list.length === 1 ? " garden-single" : ""}">${list.map(r => { const src = ext => `${rel}assets/img/results/${r.img}-480.${ext} 480w, ${rel}assets/img/results/${r.img}-800.${ext} 800w`;
  return `<li><figure><picture><source type="image/webp" srcset="${src("webp")}" sizes="(min-width: 46rem) 30rem, calc(100vw - 36px)">
<img src="${rel}assets/img/results/${r.img}-800.jpg" srcset="${src("jpg")}" sizes="(min-width: 46rem) 30rem, calc(100vw - 36px)" width="800" height="600" alt="${esc(r.alt)}" loading="lazy" decoding="async"></picture>
<figcaption>${r.caption.map(c => typeof c === "string" ? esc(c) : `<a href="${rel}when-to-plant/${c[1]}/">${esc(c[0])}</a>`).join("")}${credit ? ` <span class="photo-credit">Photo: <a href="${rel}about/#${r.by}">${esc(CONTRIBUTORS[r.by].name)}</a>, contributor</span>` : ""}</figcaption></figure></li>`; }).join("")}</ul>`;
const contributorCard = (rel, id) => { const c = CONTRIBUTORS[id]; return `<section class="profile" id="${id}">
<div class="profile-cover"><img src="${rel}assets/img/results/${c.cover}-800.jpg" alt="" aria-hidden="true" width="800" height="600" loading="lazy" decoding="async"></div>
<div class="profile-body">
<span class="avatar avatar-xl avatar-alt" aria-hidden="true">${initials(c.name)}</span>
<p class="profile-kicker">${esc(c.kicker)}</p>
<h2 class="profile-name">${esc(c.name)}</h2>
<p class="profile-role">${esc(c.role)}</p>
<p>${esc(c.bio)}</p>
<h3 class="results-h">From ${esc(c.name.split(" ")[0])}'s garden</h3>
${gardenGrid(rel, GARDEN_PHOTOS.filter(r => r.by === id), false)}
</div></section>`; };
const cropGarden = (rel, c) => { const list = GARDEN_PHOTOS.filter(r => (r.crops || []).includes(c.id));
  return list.length ? `<section class="garden-photos" id="local-garden"><h2>${c.name} in a Northwest garden</h2>
${gardenGrid(rel, list)}</section>\n` : ""; };
GARDEN_PHOTOS.forEach(r => [480, 800].forEach(w => ["jpg", "webp"].forEach(ext => {
  if (!fs.existsSync(path.join(ROOT, `assets/img/results/${r.img}-${w}.${ext}`))) throw new Error(`Missing assets/img/results/${r.img}-${w}.${ext}`);
})));
const initials = n => n.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();

// Search engines cut titles past about 70 characters, so long ones drop the site name.
// Google shows about 60 characters of a title, so the brand suffix is dropped when it would push past that.
const TITLE_MAX = 60;
const shortTitle = t => t.length > TITLE_MAX ? t.replace(/ \| Rainline Garden$/, "") : t;
// The first of several wordings that fits in a search result title.
const fitTitle = (...ts) => ts.find(t => t.length <= TITLE_MAX) || ts[ts.length - 1];
// Descriptions over about 160 characters get cut off in search results.
const fitDesc = (...ds) => ds.find(d => d.length <= 160) || ds[ds.length - 1];
// "In Portland: May 15 – Jun 12. " for a crop's description, the window most people search for.
const portDates = (c, port) => { const r = rowFor(port, c.id), w = G.crops[c.id].fall ? win(r, "fall") : win(r, "spring") || win(r, "fall");
  return w ? `In Portland: ${P.fmtRange(w.start, w.end)}. ` : ""; };
// "Red-flowering currant" -> "Red-Flowering Currant" for titles.
const titleCase = t => t.replace(/[A-Za-z][^\s-]*/g, (w, i) => i && /^(and|or|of|in|the|for)$/.test(w) ? w : w[0].toUpperCase() + w.slice(1));

function layout({ rel, title, description, canonical, current, body, scripts, jsonld, noindex, image }) {
  const base = rel; // relative prefix back to the site root, e.g. "../../"
  const cur = href => current === href ? ' aria-current="page"' : "";
  const LEARN = [["beginners-guide/", "Beginner's guide", "Start your first Northwest garden"], ["garden-calendar/", "Monthly chores", "What to do in the garden each month"],
    ["articles/", "Articles", "Growing guides for Northwest weather"], ["glossary/", "Glossary", "Gardening words in plain language"], ["what-to-grow/", "Plant quiz", "Find the plants that suit you"], ["how-it-works/", "How it works", "Where our dates come from"]];
  const learnOn = LEARN.some(([href]) => href === current);
  const ICON = {
    search: '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plan: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="4" y="3.5" width="16" height="17" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="m8 9 1.5 1.5L12 8M8 15l1.5 1.5L12 14M14.5 9.5H17M14.5 15.5H17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path class="m1" d="M4 7h16"/><path class="m2" d="M4 12h16"/><path class="m3" d="M4 17h16"/></svg>'
  };
  const MAIN = [["", "Home"], ["when-to-plant/", "When to plant"], ["frost-dates/", "Town calendars"]];
  const nav = MAIN.map(([href, label]) => `<a href="${base}${href}"${cur(href)}>${label}</a>`).join("") +
    `<div class="nav-more"><button type="button" class="nav-more-btn${learnOn ? " is-current" : ""}" aria-expanded="false" aria-controls="nav-learn">Learn${ICON.chev}</button>` +
    `<div class="nav-menu" id="nav-learn" hidden>${LEARN.map(([href, label, sub]) => `<a href="${base}${href}"${cur(href)}><strong>${label}</strong><span>${sub}</span></a>`).join("")}</div></div>`;
  const menu = `<div class="site-menu" id="site-menu" hidden><div class="wrap">
<p class="menu-town" hidden></p>
<div class="menu-cols"><div><p class="menu-h">Plan</p>${MAIN.concat([["my-garden/", "My garden plan"], ["what-to-grow/", "Plant quiz"]]).map(([href, label]) => `<a href="${base}${href}"${cur(href)}>${label}</a>`).join("")}</div>
<div><p class="menu-h">Learn</p>${LEARN.filter(([href]) => href !== "what-to-grow/").map(([href, label]) => `<a href="${base}${href}"${cur(href)}>${label}</a>`).join("")}</div></div>
</div></div>`;
  const search = `<div class="search-pop" id="search-pop" hidden><div class="wrap"><div class="search-box" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-owns="search-list">
${ICON.search}<label for="search-q" class="sr">Search plants, towns and guides</label><input id="search-q" type="search" autocomplete="off" spellcheck="false" placeholder="Search plants, towns and guides" aria-autocomplete="list" aria-controls="search-list">
<button type="button" class="search-close" aria-label="Close search">Esc</button></div>
<ul id="search-list" class="search-list" role="listbox" aria-label="Results"></ul></div></div>`;
  const ld = (jsonld || []).map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n");
  // The ad script loads only on pages with an ad slot: never on noindexed pages or on pages without much content of
  // their own (contact, privacy, quiz...), which AdSense treats as low value. One slot per page keeps ads light.
  const ads = CONFIG.adsenseClient && !noindex && body.includes('class="adsbygoogle"')
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CONFIG.adsenseClient}" crossorigin="anonymous"></script>` : "";
  return `<!doctype html>
<html lang="en" data-base="${base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(shortTitle(title))}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">\n' : ""}<link rel="canonical" href="${CONFIG.siteUrl}${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${CONFIG.siteUrl}${canonical}">
<meta property="og:image" content="${CONFIG.siteUrl}${image || "assets/img/og.png"}">
<meta property="og:site_name" content="Rainline Garden">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FAF7F0">
<script>try{var t=localStorage.getItem("rainline-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="icon" href="${base}favicon.ico" sizes="48x48">
<link rel="icon" href="${base}assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}apple-touch-icon.png">
<link rel="manifest" href="${base}site.webmanifest">
<link rel="stylesheet" href="${base}assets/fonts/fonts.css">
<link rel="stylesheet" href="${base}assets/style.css?v=${ver("style.css")}">
${ads}
${CONFIG.goatcounterCode ? `<script data-goatcounter="https://${CONFIG.goatcounterCode}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>` : ""}
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head"><div class="wrap">
<a class="brand" href="${base}"><img src="${base}assets/icon.svg" width="30" height="30" alt="Rainline Garden logo" aria-hidden="true">Rainline Garden</a>
<nav class="nav" aria-label="Main">${nav}</nav>
<button type="button" class="head-search" aria-label="Search plants, towns and guides" aria-expanded="false" aria-controls="search-pop">${ICON.search}<span>Search</span><kbd class="head-kbd">Ctrl K</kbd></button>
<a class="head-cta" href="${base}my-garden/"${cur("my-garden/")}>${ICON.plan}<span>My garden plan</span></a>
<button class="theme-btn" type="button" aria-label="Switch to dark mode" title="Light or dark mode"><svg class="i-moon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor"/></svg><svg class="i-sun" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
<button type="button" class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="site-menu">${ICON.menu}</button>
</div>
${menu}
${search}
</header>
<main id="main" class="wrap">
${body}
</main>
<footer class="site-foot"><div class="wrap">
<p><strong class="foot-brand">Rainline Garden</strong><br>Free planting calendars for Oregon, Washington and Idaho gardens.<br>Frost data from NOAA climate normals. Updated ${stamp(CONFIG.updated)}.${CONFIG.amazonTag ? "<br>As an Amazon Associate, Rainline Garden earns from qualifying purchases." : ""}</p>
<nav aria-label="Footer"><a href="${base}glossary/">Glossary</a><a href="${base}how-it-works/">How it works</a><a href="${base}about/">About</a><a href="${base}contact/">Contact</a><a href="${base}privacy/">Privacy</a><a href="${base}terms/">Terms</a></nav>
<p class="owner">&copy; ${YEAR} ${CONFIG.owner}. Rainline Garden is owned and operated by ${CONFIG.owner}.</p>
</div></footer>
<script>(function(){var r=document.documentElement,b=document.querySelector(".theme-btn");if(!b)return;function cur(){return r.dataset.theme==="dark"?"dark":"light"}function sync(){b.setAttribute("aria-label",cur()==="dark"?"Switch to light mode":"Switch to dark mode")}sync();b.addEventListener("click",function(){var n=cur()==="dark"?"light":"dark";r.dataset.theme=n;try{localStorage.setItem("rainline-theme",n)}catch(e){}sync()})})();</script>
${(scripts || []).map(s => `<script src="${base}assets/${s}?v=${ver(s)}"></script>`).join("\n")}
<script src="${base}assets/nav.js?v=${ver("nav.js")}" defer></script>
</body>
</html>
`;
}

// Dates are masked when comparing, so a page whose content hasn't changed keeps its old "Updated" date
// instead of every rebuild restamping the whole site.
const DATE_RE = /\d{4}-\d\d-\d\d|(?:January|February|March|April|May|June|July|August|September|October|November|December)(?: \d{1,2},)? \d{4}/g;
// Only the page body counts: a new title or description isn't new content, so it keeps the old date too.
// Version stamps on assets, so browsers fetch new CSS and scripts as soon as they change instead of after their cache expires.
const ver = f => require("crypto").createHash("sha1").update(fs.readFileSync(path.join(__dirname, "../assets", f))).digest("hex").slice(0, 8);
const bodyOf = h => h.slice(h.indexOf("<body")).replace(/\?v=[0-9a-f]{8}/g, "");
const sameBut = (a, b) => bodyOf(a).replace(DATE_RE, "D") === bodyOf(b).replace(DATE_RE, "D");
// Pages built before dates went month-and-year printed full dates; read them as the new format so they keep their date.
const toMonthYear = s => s.replace(/(Updated|Last updated) (\d{4}-\d\d-\d\d)\./g, (m, w, d) => `${w} ${w === "Updated" ? stamp(d) : monthYear(d)}.`)
  .replace(/(<time datetime="(\d{4}-\d\d-\d\d)">)[A-Z][a-z]+ \d{1,2}, \d{4}</g, (m, t, d) => t + monthYear(d) + "<");
function write(rel, file, html, priority) {
  const out = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const old = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : null;
  const kept = old !== null && sameBut(toMonthYear(old), html) && (old.match(/Updated (?:<time datetime=")?(\d{4}-\d\d-\d\d)/) || [])[1];
  const U = CONFIG.updated, final = !kept ? html : html.split(`datetime="${U}">${monthYear(U)}`).join(`datetime="${kept}">${monthYear(kept)}`)
    .split(`"dateModified":"${U}"`).join(`"dateModified":"${kept}"`).split(`Last updated ${monthYear(U)}.`).join(`Last updated ${monthYear(kept)}.`);
  if (final !== old) fs.writeFileSync(out, final);
  const loc = file.replace(/index\.html$/, "");
  if (priority !== null) pages.push({ loc, priority: priority || "0.6", lastmod: kept || CONFIG.updated });
}

// One responsive display unit per slot. Unfilled units (e.g. while AdSense reviews the site) are hidden by CSS.
const ad = name => CONFIG.adsenseClient && CONFIG.adsenseSlot
  ? `<div class="ad-slot" data-ad="${name}"><ins class="adsbygoogle" style="display:block" data-ad-client="${CONFIG.adsenseClient}" data-ad-slot="${CONFIG.adsenseSlot}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>`
  : `<div class="ad-slot" data-ad="${name}"></div>`;
const SCRIPTS = ["data.js", "plan.js", "render.js", "app.js"];
const placeLabel = p => `${p.city}, ${p.state}`;
// Up to n towns near a place: same area first, then the same climate region.
const nearbyOf = (place, n = 6) => {
  const others = D.places.filter(x => x.slug !== place.slug);
  return others.filter(x => x.area === place.area).concat(others.filter(x => x.area !== place.area && x.zone === place.zone)).slice(0, n);
};
// Towns whose dates match share one row, so the tables don't repeat the same dates town after town.
// Each link carries data-slug so the town picker can find a town's row.
function groupedRows(plans, dates) {
  const groups = new Map();
  plans.forEach(p => { const k = dates(p); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(p); });
  return [...groups].map(([k, ps]) => `<tr><th scope="row">${ps.map(p => `<a href="../../frost-dates/${p.place.slug}/" data-slug="${p.place.slug}">${esc(placeLabel(p.place))}</a>`).join(", ")}</th>${k}</tr>`).join("");
}
// "Find your town": a picker that shows one town's dates, with every town folded under one toggle.
// The picker reads its dates from the town's row in the tables below, so it needs no extra data.
const TOWN_PICK_JS = `<script>(function(){var box=document.querySelector(".town-pick"),sel=box.querySelector("select"),out=box.querySelector(".town-pick-out");
var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],C=[0,31,59,90,120,151,181,212,243,273,304,334];
function fmt(n){for(var m=11;m>=0;m--)if(n>C[m])return M[m]+" "+(n-C[m]);return ""}
function when(d){return d<7?"in "+d+" day"+(d===1?"":"s"):"in about "+Math.round(d/7)+" week"+(Math.round(d/7)===1?"":"s")}
function verdict(tds,town){var now=new Date(),t=C[now.getMonth()]+now.getDate(),w=[];
tds.forEach(function(td){if(td.hasAttribute("data-s"))w.push({k:td.getAttribute("data-k"),l:td.getAttribute("data-label"),s:+td.getAttribute("data-s"),e:+td.getAttribute("data-e")})});
if(!w.length)return "";var g=w.filter(function(x){return x.k==="garden"})[0];
var open=w.filter(function(x){return x.k!=="indoor"&&t>=x.s&&t<=x.e})[0];
if(open)return "<b>Yes, plant now.</b> "+(open.k==="fall"?"The fall window":"The window")+" in "+town+" is open until "+fmt(open.e)+".";
var ind=w.filter(function(x){return x.k==="indoor"&&t>=x.s&&t<=x.e})[0];
if(ind)return "<b>Start seeds indoors now</b>, through "+fmt(ind.e)+(g?". They go in the garden from "+fmt(g.s)+".":".");
var next=w.filter(function(x){return x.s>t}).sort(function(a,b){return a.s-b.s})[0];
if(next)return (g&&g.e<t?"<b>Too late for spring.</b> Next chance: "+next.l.toLowerCase():"<b>Not yet.</b> "+next.l)+" from "+fmt(next.s)+", "+when(next.s-t)+".";
var first=w.slice().sort(function(a,b){return a.s-b.s})[0];
return "<b>Too late for this year</b> in "+town+". Next chance: "+first.l.toLowerCase()+" from "+fmt(first.s)+" next year."}
function show(slug){var a=document.querySelector('.area-groups a[data-slug="'+slug+'"]');if(!a)return false;sel.value=slug;
var tds=[].slice.call(a.closest("tr").querySelectorAll("td")),v=verdict(tds,a.textContent.replace(/, [A-Z]{2}$/,""));
var h=tds.map(function(td){return '<p><b>'+td.innerHTML+'</b> <span>'+td.getAttribute("data-label")+'</span></p>'}).join("");
out.innerHTML=(v?'<p class="pick-now"><span>Is it too late to plant?</span> '+v+'</p>':'')+h+'<a href="'+a.getAttribute("href")+'">Full '+a.textContent+' calendar &rarr;</a>';return true}
var t=(location.search.match(/[?&]town=([a-z-]+)/)||[])[1],done=false;
if(t&&show(t)){done=true;try{localStorage.setItem("rainline-place",t)}catch(e){}}else try{var s=localStorage.getItem("rainline-place");if(s)done=show(s)}catch(e){}
if(!done)show(sel.value);
sel.addEventListener("change",function(){if(show(sel.value)){try{localStorage.setItem("rainline-place",sel.value)}catch(e){}}})})()</script>`;
function areaTables(head, dates, plans) {
  const bySlug = slug => plans.find(p => p.place.slug === slug);
  const first = bySlug("portland-or"), firstRow = groupedRows([first], dates);
  const pickOut = firstRow.replace(/^.*?<\/th>/, "").replace(/<\/tr>$/, "").replace(/<td data-label="([^"]*)"[^>]*>(.*?)<\/td>/g, '<p><b>$2</b> <span>$1</span></p>');
  return `<div class="town-pick" id="your-town"><label for="town-pick">Your town</label>
<select id="town-pick">${P.byArea(D).map(g => `<optgroup label="${esc(g.area.name)} (${g.area.state})">${g.places.map(pl => `<option value="${pl.slug}"${pl.slug === "portland-or" ? " selected" : ""}>${esc(placeLabel(pl))}</option>`).join("")}</optgroup>`).join("")}</select>
<div class="town-pick-out" aria-live="polite">${pickOut}<a href="../../frost-dates/portland-or/">Full Portland, OR calendar &rarr;</a></div></div>
<details class="all-towns"><summary>See every town (${plans.length})</summary>
<div class="area-groups">${P.byArea(D).map(g => `<details class="area-group"><summary>${esc(g.area.name)}, ${g.area.state} <span>${g.places.length} towns</span></summary><div class="table-wrap"><table class="plan"><thead>${head}</thead><tbody>${groupedRows(g.places.map(pl => bySlug(pl.slug)), dates)}</tbody></table></div></details>`).join("")}</div></details>
${TOWN_PICK_JS}`;
}

/* Shared pieces */
// "Tomatoes" -> "tomato", "Apple trees" -> "apple", for headings like "Popular tomato varieties".
const singular = n => { const s = lc(n).replace(/ trees$/, ""); return /^(asparagus|camas)$/.test(s) ? s : s.replace(/ies$/, "y").replace(/(sh|ch|o)es$/, "$1").replace(/([^s])s$/, "$1"); };
const lc = n => n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels").replace(/^(oregon|douglas|pacific|asian)/, w => w[0].toUpperCase() + w.slice(1));
const DIFF = { 1: ["Easy", "easy"], 2: ["Moderate", "moderate"], 3: ["Tricky here", "tricky"] };
const badge = d => `<span class="badge badge-${DIFF[d][1]}">${DIFF[d][0]}</span>`;
const cropById = id => D.crops.find(c => c.id === id);
const rowFor = (p, id) => p.crops.find(r => r.crop.id === id);
const win = (r, kind) => r.windows.find(w => w.kind === kind);
const shopUrl = q => `https://www.amazon.com/s?k=${encodeURIComponent(q)}${CONFIG.amazonTag ? `&tag=${encodeURIComponent(CONFIG.amazonTag)}` : ""}`;
const shopLink = ([label, q]) => `<a href="${shopUrl(q)}" rel="sponsored nofollow noopener" target="_blank">${esc(label)}</a>`;

function gearBox(items, title) {
  return `<aside class="gear"><h2>${title || "What you'll need"}</h2><ul>${items.map(g => `<li>${shopLink(g)}</li>`).join("")}</ul>
<p class="fine">${CONFIG.amazonTag ? "These links go to Amazon. If you buy through them, Rainline Garden earns a small commission at no cost to you." : "These links go to Amazon search results."}</p></aside>`;
}

function newsletter(where) {
  if (!CONFIG.newsletterAction) return "";
  return `<aside class="signup"><div><h2>Get a monthly planting reminder</h2>
<p>One short email a month with what to plant and what to do in ${where || "your Northwest garden"}. No spam; unsubscribe any time.</p></div>
<form action="${esc(CONFIG.newsletterAction)}" method="post" target="_blank" class="signup-form">
<label for="nl-email" class="sr">Email address</label><input id="nl-email" type="email" name="${esc(CONFIG.newsletterField)}" placeholder="you@example.com" required autocomplete="email">
<button class="btn" type="submit">Sign me up</button></form></aside>`;
}

function beginnerBox(rel, slug, where, onGuide) {
  const cards = G.beginner.map(id => {
    const c = cropById(id);
    const href = slug ? `${rel}when-to-plant/${id}/?town=${slug}#your-town` : `${rel}when-to-plant/${id}/`;
    return `<li><a class="card" href="${href}">${R.icon(id, rel, 64)}<span class="card-t">${c.name}</span><span class="card-s">${G.beginnerWhy[id]}</span></a></li>`;
  }).join("");
  return `<section class="beginner"><h2>New to gardening? Start with these 5 easy crops</h2>
<p>They're forgiving, quick and hard to kill${where ? ` in ${esc(where)}` : ""}. Tap one for planting dates and step-by-step instructions${onGuide ? "" : `, or read the <a href="${rel}beginners-guide/">beginner's guide</a>`}.</p>
<ul class="cards">${cards}</ul></section>`;
}

function crumbs(rel, items) {
  // items: [[label, pathFromRoot or null for the current page]]
  const all = [["Home", ""]].concat(items);
  const html = `<nav class="crumbs" aria-label="Breadcrumb"><ol>${all.map(([l, h]) => h === null ? `<li aria-current="page">${esc(l)}</li>` : `<li><a href="${rel}${h}">${esc(l)}</a></li>`).join("")}</ol></nav>`;
  const ld = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map(([l, h], i) => ({ "@type": "ListItem", position: i + 1, name: l, ...(h !== null ? { item: CONFIG.siteUrl + h } : {}) })) };
  return { html, ld };
}

function relatedArticles(rel, cropId, max) {
  // Articles about this crop come first: ones that list it first, and of those, ones about the fewest crops.
  const list = ARTICLES.filter(a => a.crops.includes(cropId))
    .sort((a, b) => a.crops.indexOf(cropId) - b.crops.indexOf(cropId) || a.crops.length - b.crops.length).slice(0, max || Infinity);
  if (!list.length) return "";
  return `<aside class="reads"><h2>Read more</h2><ul>${list.map(a => `<li><a href="${rel}articles/${a.slug}/">${esc(a.title)}</a><span>${esc(a.description)}</span></li>`).join("")}</ul></aside>`;
}

// Topics for grouping the articles page. Articles about one crop use that crop's icon;
// general articles set `icon` to a drawing in assets/img/topics/.
const ARTICLE_TOPICS = [
  ["crops", "Plant guides", "How to grow specific vegetables, fruit and flowers here."],
  ["timing", "Timing and seasons", "Frost dates, soil temperature, seed starting and planning the year."],
  ["soil", "Beds, soil and water", "Raised beds, containers, soil care and summer watering."],
  ["problems", "Pests and diseases", "Slugs, blight and the other troubles of a wet climate."],
  ["flowers", "Flowers and pollinators", "Cut flowers and plantings for bees and butterflies."]
];
ARTICLES.forEach(a => {
  if (!ARTICLE_TOPICS.some(t => t[0] === a.topic)) throw new Error(`Article ${a.slug} needs a topic`);
  if (a.gardenPhoto && !GARDEN_PHOTOS.some(r => r.img === a.gardenPhoto)) throw new Error(`Article ${a.slug} has an unknown garden photo`);
  if (a.icon && !fs.existsSync(path.join(ROOT, "assets/img/topics", a.icon + ".svg"))) throw new Error(`Missing topic icon ${a.icon}`);
});
const articleIcon = (a, rel, size) => a.icon
  ? `<img class="ico" src="${rel}assets/img/topics/${a.icon}.svg" width="${size}" height="${size}" alt="${a.icon.replace(/-/g, " ")} icon" aria-hidden="true" loading="lazy">`
  : R.icon(a.crops[0], rel, size);

/* Real photos (scripts/photos.js). photo() returns a <figure> with WebP and JPEG sources at two widths. */
Object.keys(PHOTOS).forEach(key => sizesFor(key).forEach(s => ["webp", "jpg"].forEach(ext => {
  const f = `assets/img/photos/${fileBase(key)}-${SIZES[s].w}.${ext}`;
  if (!fs.existsSync(path.join(ROOT, f))) throw new Error(`Missing ${f}: run node scripts/fetch-photos.js`);
})));
D.crops.forEach(c => {
  if (!fs.existsSync(path.join(ROOT, `assets/img/crops/${c.id}.webp`))) throw new Error(`Missing icon assets/img/crops/${c.id}.webp: add a "crop:${c.id}" photo and run node scripts/fetch-photos.js (hardy-kiwi.webp is rendered from hardy-kiwi.svg, since no photo of it exists)`);
});
const photoFile = (key, size, ext = "jpg") => `assets/img/photos/${fileBase(key)}-${SIZES[size].w}.${ext}`;
function photo(key, rel, { big, small, cls, sizes, eager }) {
  const p = PHOTOS[key];
  if (!p) return "";
  const set = ext => `${rel}${photoFile(key, big, ext)} ${SIZES[big].w}w, ${rel}${photoFile(key, small, ext)} ${SIZES[small].w}w`;
  return `<figure class="${cls}"><picture><source type="image/webp" srcset="${set("webp")}" sizes="${sizes}">
<img src="${rel}${photoFile(key, big)}" srcset="${set("jpg")}" sizes="${sizes}" width="${SIZES[big].w}" height="${SIZES[big].h}" alt="${esc(p.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture></figure>`;
}
// In-article photos: "inline:<slug>-<n>" in scripts/photos.js, placed in the article text with ${fig(n)}.
const inlinePhoto = (a, n, rel) => { const key = `inline:${a.slug}-${n}`;
  if (!PHOTOS[key]) throw new Error(`Article ${a.slug} uses fig(${n}) but scripts/photos.js has no "${key}"`);
  return photo(key, rel, { big: "inline", small: "inlineSm", cls: "photo-inline", sizes: "(min-width: 44rem) 40rem, calc(100vw - 32px)" }); };
const banner = (key, rel) => photo(key, rel, { big: "banner", small: "bannerSm", cls: "photo-banner", sizes: "(min-width: 70rem) 66rem, calc(100vw - 32px)", eager: true });

function articleCards(rel, list) {
  const pic = a => PHOTOS["article:" + a.slug] ? `<img class="card-photo" src="${rel}${photoFile("article:" + a.slug, "bannerSm", "webp")}" width="720" height="300" alt="" loading="lazy" decoding="async">` : articleIcon(a, rel, 48);
  return `<ul class="reads-grid">${list.map(a => `<li><a class="card${PHOTOS["article:" + a.slug] ? " has-photo" : ""}" href="${rel}articles/${a.slug}/">${pic(a)}<span class="card-t">${esc(a.title)}</span><span class="card-s">${esc(a.description)}</span></a></li>`).join("")}</ul>`;
}

function faqLd(qas) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qas.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}

// Cleaner layout for crops with notes in scripts/crop-science.js (in depth) or scripts/crop-notes.js (shorter).
function scienceBody(c, g, sci, { head, dates, plans, port }) {
  const ex = EXTRAS[c.id];
  return `${quickFacts(c, g)}
${plantTags(c, g, port)}
${jump(sci, VARIETIES[c.id])}
<p class="callout">${esc(c.note)}</p>
<h2 id="dates">${singular(c.name).replace(/^./, x => x.toUpperCase())} planting dates</h2>
${areaTables(head, dates, plans)}
${yearStrip(c, ex, port)}
${ad("crop-mid")}
<h2 id="grow">How to grow ${lc(c.name)}</h2>
<div class="grow-grid"><div>${stepsForHub(c, g, port)}</div>
${sideCard(g)}</div>${videoBox(c)}
${cropGarden("../../", c)}${varietyCards(c)}
${howMany(c, ex)}
${scienceParts(sci, c)}
${neighbors(c, ex)}
${pestCards(c, ex)}
${gearBox(g.gear)}
<h2 id="faq">Common questions about growing ${lc(c.name)}</h2>
${faqHtml(sci.faq)}
${relatedArticles("../../", c.id, 4)}
${PHONE_FOLD_JS}`;
}
// Long sections that start closed on phones (open on wider screens); "On this page" links open them.
const phoneFold = (id, title, body) => `<details class="fold" id="${id}" data-phone-fold open><summary><h2>${title}</h2></summary>
${body}</details>`;
const PHONE_FOLD_JS = `<script>(function(){var f=document.querySelectorAll("details[data-phone-fold]");if(matchMedia("(max-width: 40rem)").matches)f.forEach(function(d){if("#"+d.id!==location.hash)d.open=false});function show(){var d=location.hash&&document.getElementById(location.hash.slice(1));if(d&&d.matches("details[data-phone-fold]"))d.open=true}addEventListener("hashchange",show)})()</script>`;
const jump = (sci, vars) => `<nav class="jump" aria-label="On this page"><a href="#dates">Planting dates</a><a href="#grow">How to grow</a>${vars ? '<a href="#varieties">Varieties</a>' : ""}<a href="#how-many">How much to grow</a><a href="#numbers">Key numbers</a><a href="#science">${sci.notes ? "Growing notes" : "The science"}</a><a href="#neighbors">Neighbors</a><a href="#pests">Pests</a><a href="#faq">Questions</a></nav>`;

/* Plant-page extras from scripts/plant-extras.js and scripts/collections.js */
// Tags linking to the "Plants for..." pages this plant appears on.
function plantTags(c, g, port) {
  const on = COLLECTIONS.filter(x => x.ids ? x.ids.includes(c.id) : x.pick(c, g, rowFor(port, c.id)));
  return on.length ? `<p class="plant-tags-h">Also on these lists:</p><ul class="chips plant-tags" aria-label="Also on these lists">${on.map(x => `<li><a href="../../${x.slug}/">${esc(x.tag)}</a></li>`).join("")}</ul>` : "";
}
// Months a "6-9" or "11-3" or "6-7,10" string covers, as indexes 0-11.
function monthSet(spec) {
  const out = new Set();
  (spec || "").split(",").filter(Boolean).forEach(part => {
    const [a, b = a] = part.split("-").map(Number);
    for (let m = a; ; m = m % 12 + 1) { out.add(m - 1); if (m === b) break; }
  });
  return out;
}
const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const monthOf = n => { n = ((n - 1) % 365 + 365) % 365 + 1; let m = 11; while (n <= MONTH_START[m]) m--; return m; };
function windowMonths(ws) {
  const out = new Set();
  ws.forEach(w => { for (let d = w.start; d <= w.end; d += 7) out.add(monthOf(d)); out.add(monthOf(w.end)); });
  return out;
}
// Month-by-month strip: start indoors, plant, harvest and bloom, around Portland.
function yearStrip(c, ex, port) {
  const r = rowFor(port, c.id);
  const flower = c.cat === "flowers";
  const rows = [
    ["Start indoors", "in", r.indoor ? windowMonths([r.indoor]) : new Set()],
    [c.overwinter ? "Plant (spring or fall)" : "Plant", "plant", windowMonths(r.windows)],
    [flower ? "Cut flowers" : "Harvest", "pick", monthSet(ex.pick || (flower ? ex.bloom : ""))],
    ["In bloom", "bloom", flower ? new Set() : monthSet(ex.bloom)]
  ].filter(([, , set]) => set.size);
  const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const perennial = ["berries-and-perennials", "perennial-vegetables", "fruit-trees", "native-plants"].includes(c.cat);
  return `<h2 id="year">${singular(c.name).replace(/^./, x => x.toUpperCase())} year at a glance</h2>
<div class="table-wrap"><table class="year"><thead><tr><th scope="col"><span class="sr-only">Task</span></th>${M.map(m => `<th scope="col"><abbr title="${m}">${m[0]}</abbr></th>`).join("")}</tr></thead>
<tbody>${rows.map(([label, cls, set]) => `<tr><th scope="row">${label}</th>${M.map((m, i) => set.has(i) ? `<td class="on ${cls}"><span class="sr-only">${m}</span></td>` : "<td></td>").join("")}</tr>`).join("")}</tbody></table></div>
<p class="note">Around Portland. Colder towns, especially east of the Cascades, run a few weeks later; the table above has your town's planting dates.${perennial && ex.pick ? " Harvest months are for an established plant." : ""}</p>`;
}
function howMany(c, ex) {
  const flower = c.cat === "flowers";
  const parts = [["How many to plant", ex.many], ["What to expect", ex.yield], [flower ? "In the vase" : "Storing the harvest", ex.store]].filter(([, t]) => t);
  return `<h2 id="how-many">How much to grow</h2>
<div class="hm-grid">${parts.map(([h, t]) => `<section class="hm-card"><h3>${h}</h3><p>${esc(t)}</p></section>`).join("")}</div>`;
}
function neighbors(c, ex) {
  const fam = FAMILY_OF[c.id];
  const list = (h, xs, cls) => xs && xs.length ? `<section class="nb-card ${cls}"><h3>${h}</h3><ul>${xs.map(([p, why]) => `<li><strong>${esc(p)}.</strong> ${esc(why)}</li>`).join("")}</ul></section>` : "";
  return `<h2 id="neighbors">Good neighbors${fam ? " and crop rotation" : ""}</h2>
<div class="nb-grid">${list(c.cat === "native-plants" ? "Grows well with" : "Good neighbors", ex.good, "nb-good")}${list("Keep apart", ex.avoid, "nb-avoid")}</div>
${fam ? `<p class="care-tip"><strong>${esc(fam.name)}:</strong> ${esc(fam.text)}</p>` : ""}`;
}
function pestCards(c, ex) {
  return phoneFold("pests", "Pests and problems", `<p class="lede-sm">What most often goes wrong with ${lc(c.name)} in Northwest gardens, how to spot it and what to do.</p>
<div class="sci-cards">${ex.pests.map(([h, signs, fix]) => `<section class="sci-card pest-card"><h3>${esc(h)}</h3><p><strong>Signs:</strong> ${esc(signs)}</p><p><strong>What to do:</strong> ${esc(fix)}</p></section>`).join("\n")}</div>`);
}
const faqHtml = qas => `<div class="faq">${qas.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`;
const sideCard = (g, note) => `<aside class="side-card"><h3>Top picks for here</h3><ul class="vars">${g.varieties.map(v => `<li>${esc(v)}</li>`).join("")}</ul>
<h3>Watch out for</h3><p>${esc(g.problem)}</p>${note ? `<p class="note">${esc(note)}</p>` : ""}</aside>`;
// Popular variety cards from scripts/varieties.js, shown on each plant's main page.
function varietyCards(c) {
  const vs = VARIETIES[c.id];
  if (!vs) return "";
  return phoneFold("varieties", `More ${singular(c.name)} varieties`, `<p class="lede-sm">More widely sold picks that do well somewhere in the Northwest. The tag says which side of the mountains suits each one best.</p>
<div class="var-cards">${vs.map(v => `<section class="var-card"><h3>${esc(v.name)}</h3><p class="var-meta">${esc(v.type)}${v.days ? ` <span>&middot; ${esc(v.days)}</span>` : ""}</p><p>${esc(v.note)}</p><p class="var-where">${esc(v.where)}</p></section>`).join("")}</div>`);
}
// Click-to-load how-to video from scripts/videos.js: shows the plant's own photo until clicked, then YouTube's official player.
function videoBox(c) {
  const v = VIDEOS[c.id];
  if (!v) return "";
  const poster = PHOTOS["crop:" + c.id] ? `<img src="../../${photoFile("crop:" + c.id, "bannerSm", "webp")}" width="720" height="300" alt="${esc(PHOTOS["crop:" + c.id].alt)}" loading="lazy" decoding="async">` : "";
  return `
<section class="video" aria-label="How-to video">
<button type="button" class="video-play" data-yt="${v.id}" aria-label="Play video: ${esc(v.title)}">${poster}<span class="video-icon" aria-hidden="true"></span><span class="video-t">${esc(v.title)}</span></button>
<p class="video-meta">${v.note ? `${esc(v.note)} ` : ""}Video by ${esc(v.channel)}. Plays from YouTube when you click it. <a href="https://www.youtube.com/watch?v=${v.id}" rel="noopener" target="_blank">Watch on YouTube</a></p>
<script>document.querySelectorAll(".video-play").forEach(function(b){b.addEventListener("click",function(){var f=document.createElement("iframe");f.src="https://www.youtube-nocookie.com/embed/"+b.dataset.yt+"?autoplay=1&rel=0";f.title=b.getAttribute("aria-label").replace(/^Play video: /,"");f.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";f.allowFullscreen=true;f.referrerPolicy="strict-origin-when-cross-origin";f.className="video-frame";b.replaceWith(f);f.focus()})})</script>
</section>`;
}
function scienceParts(sci, c) {
  const tip = CARE_TIPS[c.id];
  return `<h2 id="numbers">Key numbers</h2>
<ul class="keys">${sci.keys.map(([l, v]) => `<li><span class="k-v">${esc(v)}</span><span class="k-l">${esc(l)}</span></li>`).join("")}</ul>${tip ? `
<p class="care-tip"><strong>Top care tip:</strong> ${esc(tip)}</p>` : ""}
${phoneFold("science", sci.notes ? "Growing notes" : "The plant science", `<p class="lede-sm">${sci.notes ? "What makes the difference in Northwest gardens, in plain language." : "The plant biology behind the advice above, in plain language."}</p>
<div class="sci-cards">${sci.sections.map(([h, ...ps]) => `<section class="sci-card"><h3>${esc(h)}</h3>${ps.map(p => `<p>${esc(p)}</p>`).join("")}</section>`).join("\n")}</div>`)}`;
}
function stepsForHub(c, g, port) {
  return steps(c, rowFor(port, c.id), g).replace(/(Start seeds indoors|Plant them in the garden|Plant seeds|Plant seed potatoes|Plant onion sets|Break bulbs into cloves and plant them|Plant them|Plant again|Plant [A-Za-z -]+?) [A-Z][a-z]{2} \d+(–\d+| – [A-Z][a-z]{2} \d+)/g, "$1 on your city's dates");
}

const WHEN_INDEX = "when-to-plant/";
const catById = id => D.categories.find(k => k.id === id);
const cropCard = (rel, c, href) => `<li><a class="card" href="${href}">${R.icon(c.id, rel, 56)}<span class="card-t">${c.name}</span>${badge(G.crops[c.id].difficulty)}</a></li>`;
function cropGrid(rel, linkFor) {
  return D.categories.map(k => `<h3 class="grid-h"><a href="${rel}${WHEN_INDEX}${k.id}/">${k.name}</a></h3><p class="grid-d">${k.blurb}</p><ul class="cards cards-sm">${k.crops.map(id => cropCard(rel, cropById(id), linkFor(cropById(id)))).join("")}</ul>`).join("");
}
function categoryTiles(rel) {
  return `<ul class="cat-tiles">${D.categories.map(k => `<li><a class="cat-tile" href="${rel}${WHEN_INDEX}${k.id}/">${PHOTOS["cat:" + k.id] ? `<img class="cat-photo" src="${rel}${photoFile("cat:" + k.id, "thumb", "webp")}" width="480" height="240" alt="${esc(PHOTOS["cat:" + k.id].alt)}" aria-hidden="true" loading="lazy" decoding="async">` : ""}<span class="cat-icons">${k.crops.slice(0, 3).map(id => R.icon(id, rel, 40)).join("")}</span><span class="card-t">${k.name}</span><span class="card-s">${k.crops.length} plants</span></a></li>`).join("")}</ul>`;
}

/* Home */
write("", "index.html", layout({
  rel: "", canonical: "", current: "",
  title: "Oregon, Washington & Idaho Planting Calendar | Rainline Garden",
  description: "When to plant vegetables where you live in Oregon, Washington and Idaho. Enter your ZIP for local frost dates and a planting calendar built from NOAA frost data.",
  jsonld: [{ "@context": "https://schema.org", "@type": "WebSite", name: "Rainline Garden", url: CONFIG.siteUrl, publisher: OWNER_LD }],
  body: `
<div class="home-top">
${photo("hero", "", { big: "hero", small: "heroSm", cls: "hero-art", sizes: "(min-width: 70rem) 33rem, (min-width: 900px) 46vw, calc(100vw - 32px)", eager: true })}
<section class="hero">
<p class="eyebrow">Oregon · Washington · Idaho</p>
<h1>Plant on Northwest time.</h1>
<p class="lede">Local frost dates and a year-round planting calendar for your town, on either side of the Cascades.</p>
<form id="finder" class="home-find" novalidate>
  <div class="home-find-box">
    <label class="home-find-in" for="where"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg><span class="sr">ZIP code or town</span><input id="where" name="where" type="text" autocomplete="off" spellcheck="false" enterkeyhint="go" placeholder="ZIP code or town" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="where-list"></label>
    <button class="btn" type="submit">Show my dates</button>
  </div>
  <ul id="where-list" class="where-list" role="listbox" aria-label="Matching towns" hidden></ul>
</form>
<p class="home-find-alt"><button type="button" id="near-me" class="link-btn" hidden><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg><span>Use my location</span></button><a href="frost-dates/">Browse all ${D.places.length} towns</a></p>
<p id="msg" class="msg" role="status" aria-live="polite"></p>
<ul class="trust"><li>${D.places.length} towns</li><li>NOAA frost records</li><li>Free, no sign-up</li></ul>
<p class="home-saved" hidden>Showing dates for <strong></strong>. <button type="button" class="link-btn home-change">Change town</button></p>
</section>
</div>
<section id="result" aria-live="polite"></section>
<section id="season-now" class="home-sec season-now" aria-live="polite" hidden></section>
<section class="home-sec plan-cta"><div><h2>Plan your garden</h2>
<p>Pick your plants, or start from a ready-made plan like a salad bed or a salsa garden, and get a dated to-do list for the year. It warns you when a plant isn't in season, saves as you go and prints on one page.</p></div>
<div class="plan-cta-btns"><a class="btn" href="my-garden/">Make my garden plan</a><a class="btn btn-ghost" href="what-to-grow/">Not sure what to grow? Take the quiz</a></div></section>
<section class="home-sec"><div class="sec-head"><h2>Browse by plant type</h2><a href="${WHEN_INDEX}">All ${D.crops.length} plants</a></div>
${categoryTiles("")}
</section>
<section class="home-sec starter"><div><h2>New to gardening?</h2>
<p>Start with five forgiving crops that are hard to kill, then read the <a href="beginners-guide/">beginner's guide</a>.</p></div>
<ul class="chips">${G.beginner.map(id => `<li><a href="${WHEN_INDEX}${id}/">${R.icon(id, "", 28)}${cropById(id).name}</a></li>`).join("")}</ul></section>
${ad("home-mid")}
<section class="home-sec"><div class="sec-head"><h2>Guides for Northwest gardeners</h2><a href="articles/">All articles</a></div>
${articleCards("", ARTICLES.slice(0, 3))}</section>
<section class="home-sec garden-photos"><h2>From a Northwest garden</h2>
${gardenGrid("", GARDEN_PHOTOS.filter(r => r.home))}</section>
${newsletter()}
<section class="home-sec prose">
<h2>Why Northwest planting dates are different</h2>
<p>National charts key everything off the last frost date. Here that's only half the story: the Portland airport's typical last frost is in mid-March, yet tomatoes planted then sit in cold, wet soil for two months, while the high desert can frost into June. Rainline Garden combines NOAA frost records for each area with regional timing for when the soil is actually ready. <a href="how-it-works/">See how the dates are worked out</a>.</p>
</section>`,
  scripts: ["data.js", "plan.js", "render.js", "near.js", "app.js"]
}), "1.0");

/* Town comparisons for frost-date pages: worked out from the frost data, so each town's page says
   something its neighbors' pages don't. */
const ALL_PLANS = D.places.map(pl => P.plan(D, pl));
const ordinal = n => n + ((n % 100 >= 11 && n % 100 <= 13) ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
const nDays = n => `${n} day${n === 1 ? "" : "s"}`;
const listOf = xs => xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
const SPREADS = ALL_PLANS.map(x => x.frost.spring10 - x.frost.spring50).sort((a, b) => a - b);
const MID_SPREAD = SPREADS[Math.floor(SPREADS.length / 2)];
const inArea = n => /^(Portland area|Willamette|Oregon Coast|Olympic|Columbia Gorge|North Sound|Yakima Valley|Magic Valley)/.test(n) ? `the ${n}` : n;
function townCompare(p) {
  const city = esc(p.place.city), f = p.frost, area = D.areas.find(a => a.id === p.place.area);
  const bySeason = ALL_PLANS.slice().sort((a, b) => b.frost.season - a.frost.season);
  const rank = bySeason.findIndex(x => x.frost.season <= f.season) + 1;
  const top = bySeason[0], low = bySeason[bySeason.length - 1];
  const has = /,| and /.test(p.place.city) ? "have" : "has", out = [];
  out.push(`With ${f.season} frost-free days, ${city} ${has} the ${rank === 1 ? "longest" : rank === bySeason.length ? "shortest" : `${ordinal(rank)}-longest`} season of the ${bySeason.length} Oregon, Washington and Idaho towns we cover. ` +
    (rank === 1 ? `The shortest is ${esc(low.place.city)} at ${low.frost.season} days.` : rank === bySeason.length ? `The longest is ${esc(top.place.city)} at ${top.frost.season} days.` : `They run from ${low.frost.season} days in ${esc(low.place.city)} to ${top.frost.season} days in ${esc(top.place.city)}.`));
  const peers = ALL_PLANS.filter(x => x.place.area === p.place.area && x.place.slug !== p.place.slug);
  if (peers.length) {
    const rel = x => { const d = f.spring50 - x.frost.spring50; return d === 0 ? `the same day as ${esc(x.place.city)}` : `${nDays(Math.abs(d))} ${d < 0 ? "earlier" : "later"} than ${esc(x.place.city)}`; };
    const early = peers.reduce((a, b) => b.frost.spring50 < a.frost.spring50 ? b : a), late = peers.reduce((a, b) => b.frost.spring50 > a.frost.spring50 ? b : a);
    const where = f.spring50 < early.frost.spring50 ? `the earliest of the towns we cover in ${inArea(area.name)}` : f.spring50 > late.frost.spring50 ? `the latest of the towns we cover in ${inArea(area.name)}` : `in the middle of the towns we cover in ${inArea(area.name)}`;
    const comp = early === late ? rel(early) : [rel(early), rel(late)].filter((v, i, a) => a.indexOf(v) === i).join(" and ");
    out.push(`The typical last frost here, ${P.fmtLong(f.spring50)}, is ${where}: ${comp}.`);
  }
  const spread = f.spring10 - f.spring50;
  out.push(spread >= MID_SPREAD + 7 ? `Late frosts are harder to predict here than in most towns. There are ${spread} days between the typical last frost and the date it's over in 9 years out of 10, against ${MID_SPREAD} for a typical town on this site, so keep frost cover handy until ${P.fmtLong(f.spring10)}.`
    : spread <= MID_SPREAD - 5 ? `Spring here is steadier than in most towns: the last frost is over in 9 years out of 10 just ${spread} days after the typical date, against ${MID_SPREAD} for a typical town on this site.`
    : `The gap between the typical last frost and the date it's over in 9 years out of 10 is ${spread} days, about average for the towns on this site. Frost after the typical date still happens about half the time, so plan on covering warm crops until ${P.fmtLong(f.spring10)}.`);
  const short = p.crops.filter(r => r.season === "short").map(r => lc(r.crop.name)), tight = p.crops.filter(r => r.season === "tight").map(r => lc(r.crop.name));
  out.push(short.length ? `The season is too short for ${listOf(short)} to finish from a normal planting date. Grow short-season varieties, start them indoors early, or use a cold frame or row cover to buy time.${tight.length ? ` ${listOf(tight).replace(/^./, c => c.toUpperCase())} also need most of the season.` : ""}`
    : tight.length ? `Even here, ${listOf(tight)} need nearly the whole season, so plant them on time and pick shorter-season varieties when you can.`
    : `The season is long enough for every warm crop on our list, even pumpkins and sweet potatoes, to finish from a normal planting date.`);
  const fallEnd = id => { const w = rowFor(p, id).windows.find(x => x.kind === "fall" && !x.over); return w && P.fmtLong(w.end); };
  const carrots = fallEnd("carrots"), kale = fallEnd("kale");
  if (carrots && kale) out.push(`For a fall and winter garden, sow carrots by ${carrots} and set out kale plants by ${kale}. Fall crops here are timed to the first frost (${P.fmtLong(f.fall50)} on average) and to shortening days.`);
  return phoneFold("compare", `How the season in ${city} compares`, `<div class="prose">${out.map(t => `<p>${t}</p>`).join("\n")}</div>`);
}

// Local advice for the town's area (scripts/area-tips.js), and how far the frost date sits from the tomato date.
function townLocal(p) {
  const city = esc(p.place.city), area = D.areas.find(a => a.id === p.place.area), tip = AREA_TIPS[p.place.area];
  if (!tip) throw new Error(`scripts/area-tips.js has no tip for area ${p.place.area}`);
  const tom = win(rowFor(p, "tomatoes"), "spring"), gap = tom.start - p.frost.spring50;
  const weeks = Math.round(gap / 7);
  const gapLine = weeks >= 3 ? `<p><strong>Frost date isn't planting date.</strong> The typical last frost in ${city} is ${P.fmtLong(p.frost.spring50)}, but tomatoes wait until ${P.fmtLong(tom.start)}, about ${weeks} weeks later, ${p.place.zone === "west" ? "because the soil is still too cold for them to grow" : p.place.zone === "coast" ? "because the soil and nights are still too cold for them" : "for warmer soil and less risk of a late frost"}. <a href="../../articles/soil-temperature/">Why soil temperature matters</a>.</p>` : "";
  return `<div class="local">
<p class="region"><strong>${p.zone.name}.</strong> ${p.zone.blurb}</p>
<p><strong>Gardening in ${inArea(area.name)}.</strong> ${tip}</p>
${gapLine}</div>`;
}

// Where the town's frost dates come from: the station, how far away it is, and why it was picked (scripts/station-check.js).
const AIRPORT = /Airport|Field|Air Terminal|Airpark|Air Station/;
function townNames(place) {
  const inner = place.city.match(/\((.*)\)/);
  return (inner ? inner[1] : place.city).split(/, | and /).filter(Boolean);
}
const milesFrom = (m, dir, town) => m < 1 ? `less than a mile from ${town}` : `about ${Math.round(m)} mile${Math.round(m) === 1 ? "" : "s"} ${dir} of ${town}`;
function stationBox(p) {
  const place = p.place, s = p.station, chk = STATION_CHECK[place.slug];
  if (!chk) throw new Error(`scripts/station-check.js has no entry for ${place.slug}: rerun the station check`);
  const names = townNames(place), city = esc(place.city);
  const where = chk.miles.length === names.length && names.length > 1
    ? chk.miles.map((m, i) => milesFrom(m, chk.dir[i], esc(names[i]))).join(", ").replace(/, ([^,]*)$/, " and $1")
    : milesFrom(chk.miles[0], chk.dir[0], esc(names[0]));
  const ft = (Math.round(s.elev * 3.281 / 10) * 10 || Math.round(s.elev * 3.281)).toLocaleString("en-US");
  const kind = AIRPORT.test(s.name)
    ? "It's an airport station, out on open ground, so a garden in town, on a slope or in a low spot can run a few days earlier or later."
    : "It's a NOAA cooperative station, not an airport station.";
  // The box already names the station, so drop a note's opening "These dates come from..." sentence.
  const note = place.note ? esc(place.note.replace(/^These dates come from [^.]*\.\s*/, "")) : "";
  const inTown = chk.miles[0] < 1 && s.name === names[0];
  const why = chk.closest ? `It's the closest weather station to ${city} with NOAA's 1991–2020 frost records.` : "";
  return `<section class="station-box" id="station"><h2>Where these dates come from</h2>
<p>The frost dates for ${city} come from ${inTown ? `the NOAA weather station in ${esc(s.name)}` : AIRPORT.test(s.name) ? `the NOAA weather station at ${esc(s.name)}, ${where}` : `NOAA's ${esc(s.name)}${/Station/.test(s.name) ? "" : " weather station"}, ${where}`}, at ${ft} feet. ${why} ${note || kind}</p>
<p class="station">They're NOAA's 1991–2020 climate normals: 30-year averages, not a forecast. <a href="../../how-it-works/#stations">How we pick each town's station</a>.</p></section>`;
}

// Which ZIP codes a town page answers for, worked out the same way the planner looks a ZIP up.
function zipNote(place) {
  const rel = "../";
  if (place.zips) return `<p class="zips"><strong>ZIP codes that use these dates:</strong> ${place.zips.join(", ")}. <a href="../../">Look up another ZIP</a>.</p>`;
  if (!place.zip3) return "";
  const own = D.places.filter(x => x !== place && x.zips && x.zips.some(z => place.zip3.includes(z.slice(0, 3))));
  return `<p class="zips"><strong>ZIP codes that use these dates:</strong> any starting with ${listOf(place.zip3)}${own.length ? `, except in towns with their own page (${own.map(x => `<a href="${rel}${x.slug}/">${esc(x.city)}</a>`).join(" · ")})` : ""}. <a href="../../">Look up your ZIP</a>.</p>`;
}

// Short questions and answers about the town's frost dates, also given to search engines as FAQ data.
function townQuestions(p) {
  const city = p.place.city, f = p.frost;
  const tom = rowFor(p, "tomatoes"), sp = win(tom, "spring"), garlic = win(rowFor(p, "garlic"), "fall");
  const rank = ALL_PLANS.slice().sort((a, b) => b.frost.season - a.frost.season).findIndex(x => x.frost.season <= f.season) + 1;
  const where = rank <= 10 ? "one of the longest" : rank > ALL_PLANS.length - 10 ? "one of the shortest" : rank <= ALL_PLANS.length / 2 ? "longer than most" : "shorter than most";
  return [
    [`When is the last frost in ${city}?`, `${P.fmtLong(f.spring50)} in a typical year. Frost is over by ${P.fmtLong(f.spring10)} in 9 years out of 10, Tender plants like tomatoes wait longer than that, for warm soil: see the tomato question below.`],
    [`When is the first frost in ${city}?`, `Around ${P.fmtLong(f.fall50)}. It comes as early as ${P.fmtLong(f.fall10)} in 1 year out of 10.`],
    [`When can I plant tomatoes in ${city}?`, `Set out tomato plants ${P.fmtRange(sp.start, sp.end)}${tom.indoor ? `, after starting seeds indoors ${P.fmtRange(tom.indoor.start, tom.indoor.end)}` : ""}.` +
      (tom.cover ? ` Keep frost cover handy until about ${P.fmt(tom.coverUntil)}.` : "") + (tom.season === "short" || tom.season === "tight" ? " The season is short here, so pick an early variety." : "")],
    [`When should I plant garlic in ${city}?`, `Plant garlic cloves ${P.fmtRange(garlic.start, garlic.end)}, and harvest next summer when the lower leaves turn brown.`],
    [`How long is the growing season in ${city}?`, `About ${f.season} frost-free days, ${where} of the ${ALL_PLANS.length} Oregon, Washington and Idaho towns we cover.`]
  ];
}

/* City pages */
D.places.forEach(place => {
  const p = P.plan(D, place);
  const f = p.frost;
  const nearby = nearbyOf(place);
  const tomato = win(rowFor(p, "tomatoes"), "spring");
  const peas = win(rowFor(p, "peas"), "spring");
  const bc = crumbs("../../", [["Town calendars", "frost-dates/"], [placeLabel(place), null]]);
  const qas = townQuestions(p);
  write("../../", `frost-dates/${place.slug}/index.html`, layout({
    rel: "../../", canonical: `frost-dates/${place.slug}/`, current: "frost-dates/",
    title: fitTitle(`${placeLabel(place)} Last Frost Date and Planting Calendar`, `${placeLabel(place)} Last Frost Date & Planting Calendar`,
      `${placeLabel(place)} Last and First Frost Dates`, `${placeLabel(place)} Last Frost Date`),
    description: fitDesc(`Last frost date in ${placeLabel(place)}: ${P.fmtLong(f.spring50)} on average. First fall frost: ${P.fmtLong(f.fall50)}. When to plant tomatoes, peas, garlic and ${D.crops.length - 3} more crops.`,
      `Last frost date in ${placeLabel(place)}: ${P.fmtLong(f.spring50)} on average. First fall frost: ${P.fmtLong(f.fall50)}. When to plant ${D.crops.length} crops there.`),
    jsonld: [bc.ld, faqLd(qas)],
    body: `${bc.html}
<section class="hero" id="live" data-place="${place.slug}">
<h1>${esc(place.city)}, ${place.state} frost dates and planting calendar</h1>
<p class="lede">The typical last spring frost in ${esc(place.city)} is ${P.fmtLong(f.spring50)}, and the first fall frost is around ${P.fmtLong(f.fall50)}. Plant peas from ${P.fmt(peas.start)}; plant tomatoes from ${P.fmt(tomato.start)}.</p>
</section>
${R.frostFacts(p)}
<section class="risk-card" id="risk">${R.frostRisk(p)}</section>
<h2>What to plant now</h2>
<div id="now"><p class="empty">Turn on JavaScript to see what's in season today. The full calendar is below.</p></div>
<p class="plan-link"><a class="btn btn-ghost" href="../../my-garden/?place=${place.slug}">Make a garden plan for ${esc(place.city)}</a> Pick your plants and get a dated, printable to-do list.</p>
${townLocal(p)}
${townCompare(p)}
${phoneFold("calendar", "Planting calendar", `<div id="chart">${R.chart(p)}</div>`)}
${ad("city-mid")}
<h2>Planting dates for ${esc(place.city)}</h2>
${R.table(p, "../../")}
<p class="station">New to this? Read the <a href="../../beginners-guide/">beginner's guide</a> or look up a term in the <a href="../../glossary/">glossary</a>.</p>
${zipNote(place)}
${stationBox(p)}
<h2 id="faq">Common questions about frost in ${esc(place.city)}</h2>
${faqHtml(qas)}
${newsletter(place.city)}
<h2>Nearby areas with similar weather</h2>
<ul class="places">${nearby.map(x => `<li><a href="../${x.slug}/">${esc(placeLabel(x))}</a></li>`).join("")}</ul>
<p><a href="../">All town calendars</a> or <a href="../../">look up your ZIP</a>.</p>
${PHONE_FOLD_JS}`,
    scripts: SCRIPTS
  }), "0.8");
});

/* Crop guides: one page per crop, and one per crop and city */
function answer(c, r, city) {
  const sp = win(r, "spring"), fa = win(r, "fall");
  const where = city ? ` in ${esc(city)}` : "";
  const g = G.crops[c.id];
  if (g.fall) return `Plant ${g.fall.what}${where} from <strong>${P.fmtRange(fa.start, fa.end)}</strong>. ${g.fall.tail}`;
  let s;
  if (g.plantText) s = `Plant ${g.plantText}${where} <strong>${P.fmtRange(sp.start, sp.end)}</strong>.`;
  else if (r.indoor && c.how === "Plant young plants (starts)")
    s = `Start ${lc(c.name)} from seed indoors <strong>${P.fmtRange(r.indoor.start, r.indoor.end)}</strong>, then plant the young plants in the garden${where} <strong>${P.fmtRange(sp.start, sp.end)}</strong>.`;
  else if (r.indoor)
    s = `Plant ${lc(c.name)} in the garden${where} <strong>${P.fmtRange(sp.start, sp.end)}</strong>, either as seeds or as young plants started indoors <strong>${P.fmtRange(r.indoor.start, r.indoor.end)}</strong>.`;
  else if (c.id === "potatoes") s = `Plant seed potatoes${where} <strong>${P.fmtRange(sp.start, sp.end)}</strong>.`;
  else if (c.id === "onions") s = `Plant onion starts or sets${where} <strong>${P.fmtRange(sp.start, sp.end)}</strong>.`;
  else s = `Plant ${lc(c.name)} from seed, directly in the garden${where}, <strong>${P.fmtRange(sp.start, sp.end)}</strong>.`;
  if (fa && fa.over) s += ` West of the Cascades you can also sow them <strong>${P.fmtRange(fa.start, fa.end)}</strong> to overwinter for an early crop.`;
  else if (fa) s += ` For a fall harvest, plant again <strong>${P.fmtRange(fa.start, fa.end)}</strong>.`;
  return s;
}

function steps(c, r, g) {
  const sp = win(r, "spring"), fa = win(r, "fall");
  const out = [];
  if (g.fall) {
    g.fall.steps.forEach(t => out.push(t.replace("{when}", P.fmtRange(fa.start, fa.end)).replace("{depth}", g.depth.charAt(0).toLowerCase() + g.depth.slice(1)).replace("{spacing}", g.spacing)));
  } else if (g.plantText) {
    out.push(g.site || `Pick a sunny spot with soil that drains well, and mix in an inch or two of compost.`);
    out.push(`Plant ${g.plantText} ${P.fmtRange(sp.start, sp.end)}, ${g.spacing}. ${g.depth}.`);
    out.push(g.care);
  } else if (r.indoor) {
    out.push(`Start seeds indoors ${P.fmtRange(r.indoor.start, r.indoor.end)} in trays or small pots under a grow light or in your sunniest window. Or skip this step and buy young plants (starts) at a garden center.`);
    out.push(`Harden off the young plants: about a week before planting, set them outside for a few hours a day, a little longer each day.`);
    out.push(`Plant them in the garden ${P.fmtRange(sp.start, sp.end)}, ${g.spacing}. ${/^[\d¼½]/.test(g.depth) ? `If you plant seeds instead, sow them ${g.depth}.` : g.depth + "."}`);
    out.push(`Water deeply once or twice a week rather than a little every day, and mulch once the soil is warm.`);
  } else {
    out.push(`Prepare the bed: loosen the soil and mix in an inch or two of compost.`);
    if (c.id === "potatoes") out.push(`Plant seed potatoes ${P.fmtRange(sp.start, sp.end)}, ${g.depth}, ${g.spacing}. Cut large ones into pieces with at least two eyes each.`);
    else if (c.id === "onions") out.push(`Plant onion starts or sets ${P.fmtRange(sp.start, sp.end)}, ${g.spacing}, ${g.depth.charAt(0).toLowerCase() + g.depth.slice(1)}.`);
    else out.push(`Plant seeds ${P.fmtRange(sp.start, sp.end)}, ${g.depth}, ${g.spacing}.`);
    out.push(c.id === "potatoes" ? `As plants grow, pile soil or straw around the stems so the potatoes stay covered.` : c.id === "onions" ? `Water regularly and keep the bed weeded; onions don't compete well.` : `Keep the soil evenly moist until sprouts appear, which can take one to three weeks in cool soil.`);
  }
  out.push(`<strong>Harvest:</strong> ${g.harvest}`);
  if (fa && !g.fall) out.splice(out.length - 1, 0, `Plant again ${P.fmtRange(fa.start, fa.end)} for a fall harvest.`);
  return `<ol class="steps">${out.map(s => `<li>${s}</li>`).join("")}</ol>`;
}

// Plant page intro: one town per state on each side of the Cascades (Portland, Seattle west; Spokane, Boise, Bend east).
// Neighbors in the list with the same dates share one entry ("Portland and Seattle May 15 – Jun 12").
function hubLede(c, towns, kind = "spring") {
  const spring = p => { const w = win(rowFor(p, c.id), kind); return w ? P.fmtRange(w.start, w.end) : ""; };
  const parts = [];
  towns.filter(([, p]) => spring(p)).forEach(([n, p]) => {
    const last = parts[parts.length - 1];
    if (last && last.d === spring(p)) last.n.push(n); else parts.push({ n: [n], d: spring(p) });
  });
  return `${kind === "fall" ? "Plant in fall" : "Plant in the garden"}: ${parts.map(x => `${listOf(x.n)} ${x.d}`).join("; ")}.`;
}

function quickFacts(c, g) {
  const rows = [["Difficulty", badge(g.difficulty)], ["Sun", g.sun], ["Spacing", g.spacing], ["Planting depth", g.depth],
    ["Frost", g.frost ? g.frost : c.group === "warm" ? "Killed by frost" : c.group === "fall" ? "Very hardy; grows through winter" : c.group === "berry" ? "Hardy perennial; comes back every year" : "Handles light frost"]];
  if (g.firstHarvest) rows.push([c.cat === "flowers" ? "Flowers" : "First harvest", g.firstHarvest]);
  else if (c.days) rows.push(["First harvest", `About ${c.days} days after planting`]);
  return `<dl class="qf">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
}

D.crops.forEach(c => {
  const g = G.crops[c.id];
  const plans = D.places.map(pl => P.plan(D, pl));

  /* Crop hub */
  const cols = [["Start seeds indoors", r => r.indoor, "indoor"], ["Plant in the garden", r => win(r, "spring"), "garden"], [g.fall ? "Plant in fall" : c.overwinter ? "Sow to overwinter" : "Plant again for fall", r => win(r, "fall"), "fall"]]
    .filter(([, get]) => plans.some(p => get(rowFor(p, c.id))));
  const head = `<tr><th scope="col">Towns</th>${cols.map(([l]) => `<th scope="col">${l}</th>`).join("")}</tr>`;
  const dates = p => { const r = rowFor(p, c.id); return cols.map(([l, get, k]) => { const w = get(r); return w ? `<td data-label="${l}" data-k="${k}" data-s="${w.start}" data-e="${w.end}">${P.fmtRange(w.start, w.end)}</td>` : `<td data-label="${l}"><span class="none">—</span></td>`; }).join(""); };
  const sorted = plans.slice().sort((a, b) => a.place.state.localeCompare(b.place.state) || a.place.city.localeCompare(b.place.city));
  const port = plans.find(p => p.place.slug === "portland-or"), bend = plans.find(p => p.place.slug === "bend-or");
  const sea = plans.find(p => p.place.slug === "seattle-wa"), spo = plans.find(p => p.place.slug === "spokane-wa");
  const boi = plans.find(p => p.place.slug === "boise-id");
  const ledeTowns = [["Portland", port], ["Seattle", sea], ["Spokane", spo], ["Boise", boi], ["Bend", bend]];
  const hb = crumbs("../../", [["When to plant", WHEN_INDEX], [catById(c.cat).name, `${WHEN_INDEX}${c.cat}/`], [c.name, null]]);
  const sci = SCIENCE[c.id] || NOTES[c.id];
  write("../../", `when-to-plant/${c.id}/index.html`, layout({
    rel: "../../", canonical: `when-to-plant/${c.id}/`, current: WHEN_INDEX,
    title: fitTitle(`When to Plant ${titleCase(c.name)} in Oregon, Washington and Idaho`, `When to Plant ${titleCase(c.name)} in Oregon, Washington & Idaho`, `When to Plant ${titleCase(c.name)} in the Pacific Northwest`, `When to Plant ${titleCase(c.name)} in the Northwest`),
    description: fitDesc(`When to plant ${lc(c.name)} in Oregon, Washington and Idaho. ${portDates(c, port)}Dates for ${D.places.length} towns from Seattle to Boise, plus a growing guide.`,
      `When to plant ${lc(c.name)} in Oregon, Washington and Idaho. ${portDates(c, port)}Dates for ${D.places.length} towns, plus a growing guide.`,
      `When to plant ${lc(c.name)} in Oregon, Washington and Idaho: dates for ${D.places.length} towns from Portland and Seattle to Boise, plus a growing guide.`,
      `When to plant ${lc(c.name)} in Oregon, Washington and Idaho: dates for ${D.places.length} towns, plus a growing guide.`),
    image: PHOTOS["crop:" + c.id] && photoFile("crop:" + c.id, "banner"),
    jsonld: sci ? [hb.ld, faqLd(sci.faq)] : [hb.ld],
    body: `${hb.html}
${banner("crop:" + c.id, "../../")}
<section class="hero hero-crop">${PHOTOS["crop:" + c.id] ? "" : R.icon(c.id, "../../", 120)}<div>
<h1>When to plant ${lc(c.name)} in Oregon, Washington and Idaho</h1>
<p class="lede">${g.fall ? hubLede(c, ledeTowns, "fall") : hubLede(c, ledeTowns)} <a href="#your-town">Find your town</a></p></div></section>
${sci ? scienceBody(c, g, sci, { head, dates, plans: sorted, port }) : `${quickFacts(c, g)}
<p class="callout">${esc(c.note)}</p>
<h2>${singular(c.name).replace(/^./, x => x.toUpperCase())} planting dates</h2>
${areaTables(head, dates, plans)}
${ad("crop-mid")}
<h2>How to grow ${lc(c.name)}</h2>
${stepsForHub(c, g, port)}
<h2>Varieties that do well in the Northwest</h2>
<ul class="vars">${g.varieties.map(v => `<li>${esc(v)}</li>`).join("")}</ul>
<h2>Watch out for</h2><p>${esc(g.problem)}</p>
${cropGarden("../../", c)}${gearBox(g.gear)}
${relatedArticles("../../", c.id)}`}
${newsletter()}
<h2>More ${catById(c.cat).name.toLowerCase()}</h2>
<ul class="chips">${catById(c.cat).crops.filter(id => id !== c.id).map(id => `<li><a href="../${id}/">${R.icon(id, "../../", 24)}${cropById(id).name}</a></li>`).join("")}</ul>
<p><a href="../">See all ${D.crops.length} plants</a></p>`
  }), "0.8");

});

/* When-to-plant index */
const wb = crumbs("../", [["When to plant", null]]);
write("../", "when-to-plant/index.html", layout({
  rel: "../", canonical: WHEN_INDEX, current: WHEN_INDEX,
  title: "When to Plant Vegetables in Oregon, Washington and Idaho",
  description: `Planting dates for ${D.crops.length} vegetables, herbs, berries and flowers in ${D.places.length} Oregon, Washington and Idaho towns, with difficulty ratings and beginner-friendly growing guides.`,
  jsonld: [wb.ld],
  body: `${wb.html}
<section class="hero"><h1>When to plant vegetables, herbs and berries in the Northwest</h1>
<p class="lede">${D.crops.length} plants in ${D.categories.length} groups. Pick one for its planting dates in every Oregon, Washington and Idaho town we cover, plus how to grow it. New to this? Start with the ones marked Easy.</p></section>
${categoryTiles("../")}
<h2>Plants for your conditions</h2>
${collectionChips("../")}
${cropGrid("../", c => `${c.id}/`)}
${ad("index-bottom")}`
}), "0.9");

/* Category pages */
// Links to the "Plants for..." pages, shown on the plant index and each plant-type page.
function collectionChips(rel) { return `<ul class="chips">${COLLECTIONS.map(x => `<li><a href="${rel}${x.slug}/">${esc(x.label)}</a></li>`).join("")}</ul>`; }
const SEASONS = [["Late winter", 1, 59], ["Early spring", 60, 105], ["Late spring", 106, 151], ["Summer", 152, 243], ["Fall", 244, 334], ["Early winter", 335, 365]];
// When each plant in a group first goes in at Portland, grouped by season, so the page reads as a planting order.
function plantingOrder(list, port, rel) {
  const first = c => { const r = rowFor(port, c.id), g = G.crops[c.id]; const w = g.fall ? win(r, "fall") : r.indoor || win(r, "spring") || win(r, "fall"); return w && w.start; };
  const rows = SEASONS.map(([label, a, b]) => [label, list.filter(c => { const d = first(c); return d >= a && d <= b; })]).filter(([, cs]) => cs.length);
  return `<dl class="order">${rows.map(([label, cs]) => `<div><dt>${label}</dt><dd>${cs.map(c => `<a href="${rel}${WHEN_INDEX}${c.id}/">${esc(c.name)}</a>`).join(", ")}</dd></div>`).join("")}</dl>`;
}
D.categories.forEach(k => {
  const rel = "../../";
  const x = CATEGORY_EXTRAS[k.id] || {};
  const kb = crumbs(rel, [["When to plant", WHEN_INDEX], [k.name, null]]);
  const refs = ["portland-or", "seattle-wa", "bend-or", "spokane-wa", "boise-id"].map(slug => P.plan(D, P.findPlace(D, slug)));
  const first = (pl, id) => { const r = rowFor(pl, id); const w = win(r, "spring") || win(r, "fall"); return P.fmtRange(w.start, w.end); };
  const list = k.crops.map(cropById);
  const cards = x.groups
    ? x.groups.map(([h, d, ids]) => `<h2>${esc(h)}</h2>\n<p class="grid-d">${esc(d)}</p>\n<ul class="cards cards-sm">${ids.map(id => cropCard(rel, cropById(id), `../${id}/`)).join("")}</ul>`).join("\n")
    : `<ul class="cards cards-sm">${list.map(c => cropCard(rel, c, `../${c.id}/`)).join("")}</ul>`;
  if (x.groups) { const ids = x.groups.flatMap(gr => gr[2]); if (ids.length !== k.crops.length || k.crops.some(id => !ids.includes(id))) throw new Error(`Groups on ${k.id} must list each plant once`); }
  write(rel, `${WHEN_INDEX}${k.id}/index.html`, layout({
    rel, canonical: `${WHEN_INDEX}${k.id}/`, current: WHEN_INDEX,
    title: x.title || fitTitle(`When to Plant ${titleCase(k.name)} in Oregon, Washington and Idaho`, `When to Plant ${titleCase(k.name)} in Oregon, Washington & Idaho`, `When to Plant ${titleCase(k.name)} in the Pacific Northwest`, `When to Plant ${titleCase(k.name)} in the Northwest`),
    description: fitDesc(`When to plant ${listOf(list.map(c => lc(c.name)))} in Oregon, Washington and Idaho, with dates for every town and growing guides.`,
      `When to plant ${listOf(list.slice(0, 5).map(c => lc(c.name)))} and more in Oregon, Washington and Idaho, with dates for every town.`,
      `When to plant ${listOf(list.slice(0, 3).map(c => lc(c.name)))} and more in Oregon, Washington and Idaho, with dates for every town.`),
    jsonld: [kb.ld],
    image: PHOTOS["cat:" + k.id] && photoFile("cat:" + k.id, "banner"),
    body: `${kb.html}
${banner("cat:" + k.id, rel)}
<section class="hero"><h1>${esc(x.h1 || `When to plant ${k.name.toLowerCase()} in Oregon, Washington and Idaho`)}</h1>
<p class="lede">${k.blurb} Pick a plant for its dates in every town we cover and a step-by-step growing guide.</p></section>
<p class="cat-now" data-crops="${k.crops.join(" ")}" hidden></p>
${cards}
<h2>Planting order</h2>
<p class="note">When each one first goes in around Portland, starting indoors where that comes first. Colder towns run later.</p>
${plantingOrder(list, refs[0], rel)}
<h2>Planting windows at a glance</h2>
<p class="note">Main planting window in five reference towns. Each plant's page has every town.</p>
<div class="table-wrap"><table class="plan"><thead><tr><th scope="col">Plant</th>${refs.map(r => `<th scope="col">${esc(r.place.city)}</th>`).join("")}</tr></thead><tbody>${list.map(c => `<tr><th scope="row"><a href="../${c.id}/">${c.name}</a></th>${refs.map(r => `<td data-label="${esc(r.place.city)}">${first(r, c.id)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
<h2>Growing ${k.name.toLowerCase()} in the Northwest</h2>
<div class="prose">${CATEGORY_GUIDES[k.id].map(t => `<p>${esc(t)}</p>`).join("\n")}</div>
${x.faq ? `<h2>Common questions</h2>\n${faqHtml(x.faq)}` : ""}
${ad("category-bottom")}
<h2>Other plant types</h2>
<ul class="chips">${D.categories.filter(o => o.id !== k.id).map(o => `<li><a href="../${o.id}/">${R.icon(o.crops[0], rel, 24)}${o.name}</a></li>`).join("")}</ul>
<h2>Plants for your conditions</h2>
${collectionChips(rel)}`,
    scripts: ["data.js", "plan.js", "catnow.js"]
  }), "0.8");
});

/* "Plants for..." pages (scripts/collections.js) */
COLLECTIONS.forEach(x => {
  const rel = "../";
  const port = P.plan(D, P.findPlace(D, "portland-or"));
  const ids = x.ids || D.crops.filter(c => x.pick(c, G.crops[c.id], rowFor(port, c.id))).map(c => c.id);
  ids.forEach(id => { if (!cropById(id)) throw new Error(`${x.slug} lists unknown plant ${id}`); });
  const note = c => { if (!x.fallNote) return x.note(c, G.crops[c.id]);
    const r = rowFor(port, c.id), w = win(r, "fall"); return `${fallPre(c)} ${P.fmtRange(w.start, w.end)} in Portland.`; };
  const fallPre = c => G.crops[c.id].fall ? "Plant" : c.overwinter ? "Sow to overwinter" : "Sow or plant for fall";
  const groups = D.categories.map(k => [k, k.crops.filter(id => ids.includes(id)).map(cropById)]).filter(([, cs]) => cs.length);
  const cb = crumbs(rel, [["When to plant", WHEN_INDEX], [x.label, null]]);
  write(rel, `${x.slug}/index.html`, layout({
    rel, canonical: `${x.slug}/`, current: WHEN_INDEX,
    title: x.title, description: x.description, jsonld: [cb.ld],
    body: `${cb.html}
<section class="hero"><h1>${esc(x.h1)}</h1>
<p class="lede">${esc(x.intro[0])}</p></section>
<div class="prose">${x.intro.slice(1).map(t => `<p>${esc(t)}</p>`).join("\n")}</div>
${x.fallNote ? `<p class="town-line" hidden><label for="fall-town">Dates below are for</label> <select id="fall-town"></select></p>` : ""}
${groups.map(([k, cs]) => `<h2>${esc(k.name)}</h2>\n<ul class="pick-list">${cs.map(c => `<li><a href="${rel}${WHEN_INDEX}${c.id}/">${R.icon(c.id, rel, 44)}<span><span class="card-t">${esc(c.name)}</span><span class="card-s"${x.fallNote ? ` data-fall="${c.id}" data-pre="${fallPre(c)}"` : ""}>${esc(note(c))}</span></span></a></li>`).join("")}</ul>`).join("\n")}
${ad("collection-mid")}
<h2>Common questions</h2>
${faqHtml(x.faq)}
<h2>More ways to choose</h2>
${collectionChips(rel)}
<p><a href="${rel}${WHEN_INDEX}">See all ${D.crops.length} plants</a></p>`,
    scripts: x.fallNote ? ["data.js", "plan.js", "falltown.js"] : undefined
  }), "0.8");
});

/* My garden plan */
const gpb = crumbs("../", [["My garden plan", null]]);
write("../", "my-garden/index.html", layout({
  rel: "../", canonical: "my-garden/", current: "my-garden/",
  title: "My Garden Plan: Free Planner for Oregon, Washington & Idaho",
  description: "Pick your town and the plants you want to grow. Get a dated to-do list for the next 12 months, a cheat sheet for each plant and space for notes. Saves on your device, prints cleanly and adds the dates to your calendar.",
  jsonld: [gpb.ld],
  body: `${gpb.html}
<section class="hero"><h1>My garden plan</h1>
<p class="lede">Pick your town and what you want to grow. You get a dated to-do list for the next 12 months, a cheat sheet for each plant and room for notes. It saves on this device as you go, and you can print it or add the dates to your phone's calendar.</p></section>
<h2 class="gp-step"><span class="gp-step-n" aria-hidden="true">1</span>Your town</h2>
<form id="gp-form" class="finder gp-finder" novalidate>
  <div class="field"><label for="gp-zip">ZIP code</label><input id="gp-zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" pattern="[0-9]{5}" placeholder="e.g. 97214"></div>
  <span class="or">or</span>
  <div class="field field-select"><label for="gp-place">Town</label><select id="gp-place"><option value="">Choose a town</option></select></div>
  <button class="btn" type="submit">Use this town</button>
  <button type="button" id="near-me" class="btn btn-ghost near-btn" hidden>Use my location</button>
</form>
<p id="gp-msg" class="msg" role="status" aria-live="polite"></p>
<section id="gp-share" class="gp-share" hidden aria-live="polite"></section>
<details id="gp-pick" class="gp-pick" open><summary><span class="gp-step-n" aria-hidden="true">2</span><span>What do you want to grow?</span> <span id="gp-count" class="gp-count"></span></summary>
<div id="gp-starters" class="gp-starters"></div>
<p class="gp-pick-help">Or pick plants one by one. Once you choose a town, each plant shows <em>Plant now</em>, or the month its next step starts. Not sure what suits you? <a href="../what-to-grow/">Take the plant quiz</a>.</p>
<p id="gp-pick-note" class="gp-pick-note" role="status" aria-live="polite" hidden></p>
<div class="gp-find"><label for="gp-find" class="sr">Find a plant</label><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg><input id="gp-find" type="search" autocomplete="off" spellcheck="false" placeholder="Find a plant, like beans or basil"></div>
<p id="gp-find-none" class="gp-find-none" role="status" hidden>No plants match that. Try another name, or <a href="../what-to-grow/">take the plant quiz</a>.</p>
${D.categories.map(k => `<fieldset><legend>${k.name}</legend><div class="gp-opts">${k.crops.map(id => `<label class="gp-opt"><input type="checkbox" value="${id}">${R.icon(id, "../", 28)}<span>${cropById(id).name}</span></label>`).join("")}</div></fieldset>`).join("")}
<p class="gp-pick-foot"><button type="button" class="linkish" id="gp-clear">Clear my plan</button> · Your plan stays in this browser. Nothing is sent to us.</p>
</details>
<section id="gp-out" class="gp-out" aria-live="polite"><p class="empty gp-empty">Choose your town and pick some plants to see your plan.</p></section>
<div class="guide prose">
<h2>What's in your plan</h2>
<p><strong>A dated to-do list.</strong> Every job for the next 12 months, in order: when to start seeds indoors, when to plant in the garden, when to sow again for fall, and when frost is still a risk. The dates come from your town's frost records and the same planting windows as the <a href="../frost-dates/">town calendars</a>, so a Spokane plan and a Seattle plan can be weeks apart.</p>
<p><strong>A cheat sheet for each plant.</strong> Sun, spacing, planting depth, when and how to harvest, and the main problem to watch for, taken from each plant's growing guide, so you don't have to keep a dozen tabs open.</p>
<p><strong>Notes and a harvest log.</strong> Note the variety and where you planted it, log each harvest, and rate how each plant did. Next year your plan shows how it went last time, and that record is worth more than any chart.</p>
<h2>Using it through the season</h2>
<p>Pick a town first, then start small: five to eight plants is plenty for one raised bed. The ready-made plans above are a quick way in; the salad bed and the five easy crops both suit a first garden. Check the list once a week in spring, when jobs come quickly, and once a month in summer.</p>
<p>Print the plan or save it as a PDF to keep by the back door, or add the dates to your phone's calendar so reminders come to you. Your plan saves in this browser as you go, and nothing is sent to us, so it stays private. If you use more than one device, print it or share the link to copy it across.</p>
<p>Not sure what to grow? The <a href="../what-to-grow/">plant quiz</a> suggests plants for your space, sun and time, and the <a href="../beginners-guide/">beginner's guide</a> covers the basics.</p>
</div>${CONFIG.newsletterAction ? `
<template id="gp-alert-tpl"><form action="${esc(CONFIG.newsletterAction)}" method="post" target="_blank" class="gp-alert-form">
<p>Or get an email when frost is on the way in {town}.</p>
<input type="hidden" name="${esc(CONFIG.newsletterTagField)}" value="frost-alert"><input type="hidden" name="${esc(CONFIG.newsletterTagField)}" value="frost-{slug}">
<label for="gp-alert-email" class="sr">Email address</label><input id="gp-alert-email" type="email" name="${esc(CONFIG.newsletterField)}" placeholder="you@example.com" required autocomplete="email">
<button class="btn" type="submit">Email me</button></form></template>` : ""}`,
  scripts: ["data.js", "plan.js", "render.js", "guide-data.js", "near.js", "garden.js"]
}), "0.8");

/* Plant quiz */
const chipList = ids => `<ul class="chips">${ids.map(id => `<li><a href="../when-to-plant/${id}/">${R.icon(id, "../", 24)}${cropById(id).name}</a></li>`).join("")}</ul>`;
const qzb = crumbs("../", [["Plant quiz", null]]);
write("../", "what-to-grow/index.html", layout({
  rel: "../", canonical: "what-to-grow/", current: "what-to-grow/",
  title: "What Should I Grow? Quiz for Oregon, Washington & Idaho",
  description: "Answer eight quick questions about your town, space, sun and time, and get the vegetables, herbs, fruit and flowers that suit your Northwest garden, with local planting dates.",
  jsonld: [qzb.ld],
  body: `${qzb.html}
<section class="hero"><h1>What should I grow?</h1>
<p class="lede">Eight quick questions about your town, space, sun and time. You get the plants that suit you, whether each one can go in now, and a one-tap garden plan.</p></section>
<section id="quiz" class="quiz" aria-live="polite"><noscript><p>The quiz needs JavaScript. You can still <a href="../when-to-plant/">browse every plant</a> or read the <a href="../beginners-guide/">beginner's guide</a>.</p></noscript></section>
<div class="guide prose">
<h2>How the quiz picks plants</h2>
<p><strong>Your town</strong> sets the dates and the length of your summer. In short-season places like Bend or Burns, long-season crops such as winter squash and melons get flagged, and in mild west-side towns more crops can go in for fall.</p>
<p><strong>Space</strong> rules out plants that won't fit: trees and big berry bushes need a yard, and sprawling vines need more than a single raised bed. <strong>Sun</strong> matters most for fruiting crops like tomatoes, squash and beans, which need six hours or more; leafy greens and a few herbs manage with less.</p>
<p><strong>Time and experience</strong> push forgiving, low-fuss plants to the top. <strong>Goals</strong> such as salads, herbs, food that stores or flowers to cut decide what you see first. <strong>When you want to start</strong> shows what can go in this month, and the last question drops plants that deer or slugs go for first.</p>
<h2>Good starting points</h2>
<h3>For pots on a patio or balcony</h3>
${chipList(["lettuce", "basil", "parsley", "chives", "thyme", "strawberries", "tomatoes", "peppers"])}
<h3>For a spot with only part-day sun</h3>
<p>Leafy crops and a few herbs cope with three to six hours of sun.</p>
${chipList(["lettuce", "spinach", "kale", "chard", "arugula", "parsley", "chives", "mint"])}
<h3>If you only have a few minutes a week</h3>
${chipList(["garlic", "kale", "chard", "summer-squash", "chives", "rhubarb"])}
<h3>If deer visit your yard</h3>
<p>Strong-smelling herbs and the onion family are usually left alone, though no plant is fully deer-proof.</p>
${chipList(["garlic", "onions", "chives", "rosemary", "lavender", "oregano", "daffodils", "rhubarb"])}
</div>`,
  scripts: ["data.js", "plan.js", "render.js", "guide-data.js", "near.js", "quiz.js"]
}), "0.7");

/* Beginner's guide */
const bgb = crumbs("../", [["Beginner's guide", null]]);
const starter = [["Raised bed kit (4 × 8 feet)", "raised garden bed kit 4x8"], ["Bagged compost", "organic compost for vegetable garden"], ["Soil thermometer", "soil thermometer garden"], ["Hand trowel and cultivator set", "garden hand tool set"], ["Soaker hose or drip kit", "soaker hose garden"], ["Iron phosphate slug bait", "iron phosphate slug bait"], ["Floating row cover", "floating row cover garden"]];
write("../", "beginners-guide/index.html", layout({
  rel: "../", canonical: "beginners-guide/", current: "beginners-guide/",
  title: "Vegetable Gardening for Beginners in the Pacific Northwest | Rainline Garden",
  description: "A plain-language guide to starting your first vegetable garden in Oregon, Washington or Idaho: where to put it, what to grow first, when to plant and how to keep slugs away.",
  jsonld: [bgb.ld],
  body: `${bgb.html}
<section class="hero"><h1>Your first Northwest vegetable garden</h1>
<p class="lede">Everything a first-timer needs, in plain language. You don't need a big yard or any experience: one small bed and five easy crops is a great first year.</p></section>
<div class="guide prose">
<h2><span class="num">1</span> Pick the sunniest spot you have</h2>
<p>Most vegetables need at least six hours of direct sun a day; tomatoes, squash and peppers want eight or more. Watch your yard on a sunny day and note where the light lasts longest. Leafy crops like lettuce, kale and chard can get by with a little less.</p>
<h2><span class="num">2</span> Start small</h2>
<p>A single 4 × 8 foot raised bed, or a few large containers on a patio, is plenty for a first year. Raised beds suit the Northwest well: they drain after heavy rain and warm up faster in spring than the ground does.</p>
<h2><span class="num">3</span> Feed the soil</h2>
<p>Fill the bed with a mix of garden soil and compost, or loosen existing soil and mix in two to three inches of compost. Most Northwest soils run acidic, so a soil test (your county Extension office can help) tells you whether to add lime.</p>
<h2><span class="num">4</span> Grow easy crops first</h2>
<p>Radishes, lettuce, bush beans, zucchini and kale are forgiving and quick. Leave peppers and big pumpkins for year two.</p>
</div>
${beginnerBox("../", null, null, true)}
<div class="guide prose">
<h2><span class="num">5</span> Plant on your local dates</h2>
<p>The biggest beginner mistake here is planting warm-season crops too early. A sunny April week doesn't mean the soil is warm, and tomatoes or beans planted into cold soil sit and sulk or rot. <a href="../">Enter your ZIP on the home page</a> to get dates for where you live.</p>
<h2><span class="num">6</span> Water deeply, not daily</h2>
<p>Once summer dries out, give the garden about an inch of water a week (more east of the Cascades) in one or two deep soakings. A soaker hose or drip line on a timer makes this nearly automatic, and keeping leaves dry helps prevent disease.</p>
<h2><span class="num">7</span> Stay ahead of slugs</h2>
<p>Slugs are the Northwest gardener's number one pest, especially for seedlings and lettuce. Check after rain and at dusk, and use iron phosphate bait, which is safe around pets and food crops.</p>
<h2><span class="num">8</span> Keep notes</h2>
<p>Jot down what you planted and when, and what did well. By your second spring you'll know your own garden better than any chart.</p>
<p>Stuck on a word? The <a href="../glossary/">glossary</a> explains terms like hardening off, bolting and row cover.</p>
</div>
${gearBox(starter, "A simple starter kit")}
${newsletter()}`
}), "0.9");

/* Articles */
const frostFor = slug => { const f = P.plan(D, P.findPlace(D, slug)).frost; return { last: P.fmtLong(f.spring50), first: P.fmtLong(f.fall50), season: f.season }; };
ARTICLES.forEach(a => {
  const rel = "../../";
  const ab = crumbs(rel, [["Articles", "articles/"], [a.title, null]]);
  const others = ARTICLES.filter(x => x.slug !== a.slug);
  write(rel, `articles/${a.slug}/index.html`, layout({
    rel, canonical: `articles/${a.slug}/`, current: "articles/",
    title: `${a.title} | Rainline Garden`, description: a.description,
    image: PHOTOS["article:" + a.slug] && photoFile("article:" + a.slug, "banner"),
    jsonld: [ab.ld, { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, datePublished: a.published, dateModified: CONFIG.updated,
      image: CONFIG.siteUrl + (PHOTOS["article:" + a.slug] ? photoFile("article:" + a.slug, "banner") : "assets/img/og.png"), author: byLd(a.author || DEFAULT_AUTHOR), publisher: OWNER_LD, mainEntityOfPage: CONFIG.siteUrl + `articles/${a.slug}/` }],
    body: `${ab.html}
<article class="article">
${banner("article:" + a.slug, rel)}
<header class="hero hero-crop">${articleIcon(a, rel, 120)}<div><h1>${esc(a.title)}</h1><p class="lede">${esc(a.description)}</p>
<p class="byline">${byAvatar(rel, a.author || DEFAULT_AUTHOR)}<span>By ${byName(rel, a.author || DEFAULT_AUTHOR)}<br><span class="byline-d">Updated ${stamp(CONFIG.updated)}</span></span></p></div></header>
<div class="prose">${a.body({ D, P, frost: frostFor, link: p => rel + p, fig: n => inlinePhoto(a, n, rel) })}</div>
${a.gardenPhoto ? gardenGrid(rel, GARDEN_PHOTOS.filter(r => r.img === a.gardenPhoto)) : ""}
${byBox(rel, a.author || DEFAULT_AUTHOR)}
</article>
${ad("article-bottom")}
<h2>Plants in this article</h2>
<ul class="chips">${a.crops.map(id => `<li><a href="${rel}when-to-plant/${id}/">${R.icon(id, rel, 24)}${cropById(id).name}</a></li>`).join("")}</ul>
${newsletter()}
<h2>More guides</h2>
${articleCards(rel, others.slice(0, 3))}`
  }), "0.7");
});
const ib = crumbs("../", [["Articles", null]]);
write("../", "articles/index.html", layout({
  rel: "../", canonical: "articles/", current: "articles/",
  title: "Northwest Gardening Articles | Rainline Garden",
  description: "Practical guides for vegetable gardening in Oregon, Washington and Idaho: varieties that ripen here, winter gardens, short seasons, slugs and soil temperature.",
  jsonld: [ib.ld],
  body: `${ib.html}
<section class="hero"><h1>Guides for Northwest gardeners</h1>
<p class="lede">Practical advice for the things that make gardening here different: cool summers, wet winters, short high-desert seasons and a lot of slugs.</p></section>
<nav class="topic-nav" aria-label="Article topics"><ul class="chips">${ARTICLE_TOPICS.map(([id, name]) => `<li><a href="#${id}">${name} <span class="count">${ARTICLES.filter(a => a.topic === id).length}</span></a></li>`).join("")}</ul></nav>
${ARTICLE_TOPICS.map(([id, name, blurb]) => `<section class="topic-sec" id="${id}"><h2>${name}</h2><p class="topic-blurb">${blurb}</p>
${articleCards("../", ARTICLES.filter(a => a.topic === id))}</section>`).join("\n")}`
}), "0.7");

/* Glossary */
const glb = crumbs("../", [["Glossary", null]]);
write("../", "glossary/index.html", layout({
  rel: "../", canonical: "glossary/", current: "glossary/",
  title: "Vegetable Gardening Terms Explained | Rainline Garden Glossary",
  description: "Plain-language definitions of gardening terms like last frost date, hardening off, starts, bolting and row cover.",
  jsonld: [glb.ld, { "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Rainline Garden glossary", hasDefinedTerm: G.glossary.map(([t, , d]) => ({ "@type": "DefinedTerm", name: t, description: d })) }],
  body: `${glb.html}
<section class="hero"><h1>Gardening terms, explained</h1>
<p class="lede">The words you'll see on seed packets and planting charts, in plain language.</p></section>
<dl class="glossary prose">${G.glossary.map(([t, id, d]) => `<div id="${id}"><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("")}</dl>`
}), "0.5");

/* Frost dates index */
const placeItem = x => {
  const st = D.stations[x.station];
  return `<li data-q="${esc((x.city + " " + x.state).toLowerCase())}"><a href="${x.slug}/">${esc(x.city)}</a> <span>last frost ${P.fmt(P.doy(st.spring50))}, first frost ${P.fmt(P.doy(st.fall50))}</span></li>`;
};
// Areas are open in the HTML and folded on phones by the script below, so the page is a short list of areas there.
const areaLists = s => P.byArea(D).filter(g => g.area.state === s).map(g => `<details class="area-list" open><summary><h3>${esc(g.area.name)}</h3><span>${g.places.length} ${g.places.length === 1 ? "town" : "towns"}</span></summary><ul class="places">${g.places.map(placeItem).join("")}</ul></details>`).join("");
// "Use my location": town points for picking the nearest town in the browser. The location never leaves the page.
const NEAR_PTS = JSON.stringify(P.nearPoints(D));
write("../", "frost-dates/index.html", layout({
  rel: "../", canonical: "frost-dates/", current: "frost-dates/",
  title: "Oregon, Washington and Idaho Frost Dates by Town",
  description: `Typical last spring and first fall frost dates for ${D.places.length} Oregon, Washington and Idaho towns, from 1991-2020 NOAA climate normals, with a planting calendar for each.`,
  body: `
<section class="hero"><h1>Town calendars: frost and planting dates</h1>
<p class="lede">Typical last spring and first fall frost dates for Oregon, Washington and Idaho, from NOAA's 1991–2020 climate normals. Pick a town for its full calendar: frost dates, what to plant now and every planting date for the year.</p></section>
<div class="town-find"><div class="field town-filter"><label for="town-q">Find a town</label><input id="town-q" type="search" autocomplete="off" placeholder="Start typing, like Hood River"></div>
<button type="button" id="near-me" class="btn btn-ghost near-btn" hidden>Use my location</button></div>
<p id="near-out" class="near-out" aria-live="polite" hidden></p>
<p id="town-none" class="empty" hidden>No town by that name yet. Try the nearest bigger town, or <a href="../">use your ZIP code</a>.</p>
<div id="town-lists">
<h2 data-state>Oregon</h2>${areaLists("OR")}
<h2 data-state>Washington</h2>${areaLists("WA")}
<h2 data-state>Idaho</h2>${areaLists("ID")}
</div>
<script>(function(){var q=document.getElementById("town-q"),none=document.getElementById("town-none");if(!q)return;var secs=document.querySelectorAll("#town-lists .area-list"),saved=null;
if(matchMedia("(max-width: 40rem)").matches)secs.forEach(function(d){d.open=false});
q.addEventListener("input",function(){var v=q.value.trim().toLowerCase(),any=false;if(v&&!saved)saved=[].map.call(secs,function(d){return d.open});
secs.forEach(function(sec,i){var n=0;sec.querySelectorAll("li").forEach(function(li){var m=!v||li.dataset.q.indexOf(v)>=0;li.hidden=!m;if(m)n++});sec.hidden=!n;if(n)any=true;if(v)sec.open=true;else if(saved)sec.open=saved[i]});if(!v)saved=null;
document.querySelectorAll("#town-lists [data-state]").forEach(function(h){var e=h.nextElementSibling,vis=false;while(e&&!e.hasAttribute("data-state")){if(!e.hidden)vis=true;e=e.nextElementSibling}h.hidden=!vis});none.hidden=any})})();
addEventListener("DOMContentLoaded",function(){RainlineNear(document.getElementById("near-me"),document.getElementById("near-out"),${NEAR_PTS},function(slug){location.href=slug+"/"})});</script>
<h2>How to use these dates</h2>
<div class="prose">
<p>"Typical" means the median: in half of years the last spring frost comes later. Each town page also shows the date when frost is over in 9 years out of 10. Tender plants like tomatoes and basil need that, and warm soil too, so they often go out weeks later: each town page gives their dates.</p>
<p>Each town's dates come from one weather station, usually an airport. Gardens in cold hollows or at higher elevation can frost later in spring and earlier in fall; city gardens and warm, south-facing spots often run a week or so ahead. If your garden is in a frost pocket, add a week to spring dates and take a week off fall ones.</p>
<p>Dates are a guide, not a guarantee. Check the soil before planting: cool-season crops need it workable and not soggy, and warm-season crops need it warm. A $10 soil thermometer pays for itself.</p>
</div>`,
  scripts: ["near.js"]
}), "0.9");

/* Monthly calendar */
const CHORES = require("./chores.js");
const MONTH_ICONS = ["potatoes", "onions", "peas", "lettuce", "tomatoes", "beans", "cucumbers", "corn", "winter-squash", "garlic", "cabbage", "kale"];
const CHORE_KINDS = [["plant", "Plant and sow"], ["indoor", "Start indoors"], ["harvest", "Harvest"], ["care", "Garden care"], ["pests", "Pests and problems"], ["perennial", "Fruit, berries and flowers"]];
const REGION_TAGS = { west: "West-side valleys", coast: "Coast", east: "East-side valleys", high: "High desert and Inland Northwest" };
// One town stands in for each climate region in the "planting by region" lists.
const REGION_TOWNS = [["west", "portland-or", D.zones.west.name], ["coast", "astoria-or", D.zones.coast.name], ["east", "pendleton-or", D.zones.east.name], ["high", "bend-or", D.zones.high.name], ["high", "spokane-wa", D.zones.inland.name]];
function monthPlanting(m) {
  const a = P.CUM[m - 1] + 1, b = m < 12 ? P.CUM[m] : 365;
  const overlaps = w => w.start <= b && w.end >= a;
  return REGION_TOWNS.map(([r, slug, label]) => {
    const p = P.plan(D, P.findPlace(D, slug));
    return { r, label, out: p.crops.filter(x => x.windows.some(overlaps)).map(x => x.crop), indoor: p.crops.filter(x => x.indoor && overlaps(x.indoor)).map(x => x.crop) };
  });
}
const articleBySlug = Object.fromEntries(ARTICLES.map(a => [a.slug, a]));
const chip = (c, rel = "../") => `<a class="mp-crop" href="${rel}when-to-plant/${c.id}/">${R.icon(c.id, rel, 22)}${esc(c.name)}</a>`;
const monthSlug = m => P.MONTHS_LONG[m - 1].toLowerCase();
const choreMonth = c => {
  const name = P.MONTHS_LONG[c.m - 1], count = Object.values(c.tasks).reduce((n, t) => n + t.length, 0);
  return `<section class="cm" id="${name.toLowerCase()}" data-m="${c.m}" aria-labelledby="cm-h-${c.m}">
<header class="cm-head">${R.icon(MONTH_ICONS[c.m - 1], "../", 44)}<div><h2 id="cm-h-${c.m}">${name}</h2><p>${esc(c.intro)} <a href="${monthSlug(c.m)}/">What to plant in ${name}</a></p></div><span class="cm-prog" data-total="${count}"></span></header>
<div class="cm-grid">${CHORE_KINDS.filter(([k]) => c.tasks[k] && c.tasks[k].length).map(([k, label]) => `<div class="cm-card cm-${k}"><h3>${label}</h3><ul>${c.tasks[k].map(([t, r], i) =>
    `<li${r ? ` data-r="${r}"` : ""}><label><input type="checkbox" data-id="${c.m}-${k}-${i}" disabled><span>${esc(t)}${r ? ` <span class="cm-tag cm-tag-${r}">${REGION_TAGS[r]}</span>` : ""}</span></label></li>`).join("")}</ul></div>`).join("")}</div>
<details class="cm-byregion"><summary>What can be planted in ${name}, by region</summary><div class="cm-plant-body">${monthPlanting(c.m).map(x => `<div class="cm-region" data-r="${x.r}"><h4>${x.label}</h4>
${x.out.length ? `<p><span class="cm-k">Outside</span>${x.out.map(chip).join("")}</p>` : `<p class="cm-none">Nothing outside this month.</p>`}
${x.indoor.length ? `<p><span class="cm-k">Indoors</span>${x.indoor.map(chip).join("")}</p>` : ""}</div>`).join("")}
<p class="station">Based on typical frost dates for one town in each region. <a href="../">Look up your town</a> for your exact dates.</p></div></details>
${c.articles.length ? `<p class="cm-reads"><span>Read next:</span> ${c.articles.filter(s => articleBySlug[s]).map(s => `<a href="../articles/${s}/">${articleIcon(articleBySlug[s], "../", 22)}${esc(articleBySlug[s].title)}</a>`).join("")}</p>` : ""}
</section>`;
};
write("../", "garden-calendar/index.html", layout({
  rel: "../", canonical: "garden-calendar/", current: "garden-calendar/",
  title: "Monthly Garden Chores for Oregon, Washington and Idaho",
  description: "Month-by-month garden chores for Oregon, Washington and Idaho: what to plant, start indoors, harvest, prune and watch for, with notes for the coast, west side, east side and high desert.",
  body: `
<section class="hero"><h1>Monthly garden chores</h1>
<p class="lede">What to do in a Northwest garden each month: what to plant and start indoors, what to harvest, and the care, pest and pruning jobs that keep things going. Tick jobs off as you go. For exact planting dates where you live, <a href="../">look up your town</a>.</p></section>
<div class="cm-filter" role="group" aria-label="Show jobs for"><span>Show jobs for</span>${[["all", "All jobs"], ...Object.entries(REGION_TAGS)].map(([v, l]) => `<button type="button" data-region="${v}" aria-pressed="${v === "all"}">${l}</button>`).join("")}</div>
<div class="cm-tools">
<nav class="cm-months" aria-label="Months">${P.MONTHS.map((m, i) => `<a href="#${P.MONTHS_LONG[i].toLowerCase()}" data-m="${i + 1}">${m}</a>`).join("")}</nav>
</div>
<div id="cm-mine" class="cm-mine" hidden></div>
<div class="cm-list">${CHORES.map(choreMonth).join("")}</div>
<h2>What to plant each month</h2>
<ul class="cm-month-links">${CHORES.map(c => `<li><a href="${monthSlug(c.m)}/">What to plant in ${P.MONTHS_LONG[c.m - 1]}</a></li>`).join("")}</ul>
<p class="station cm-foot">Region tags: <strong>West-side valleys</strong> are the Willamette Valley, Puget Sound and southern Oregon valleys; <strong>Coast</strong> is the outer coast; <strong>East-side valleys</strong> are the Columbia Basin, Yakima Valley, Boise's Treasure Valley, Lewiston and other low valleys east of the Cascades; <strong>High desert and Inland Northwest</strong> covers Central Oregon, the Klamath Basin, the cold eastern valleys, Spokane, north Idaho, the Magic Valley, eastern Idaho and Idaho's mountain towns. Each town calendar names its region. Jobs without a tag apply everywhere, a few weeks later the colder your garden is.</p>
${ad("calendar-bottom")}`,
  scripts: ["data.js", "plan.js", "chores.js"]
}), "0.8");

/* One page per month: what to plant there, with dates by region, and that month's jobs. */
CHORES.forEach(c => {
  const rel = "../../", name = P.MONTHS_LONG[c.m - 1], slug = monthSlug(c.m);
  const prev = CHORES[(c.m + 10) % 12], next = CHORES[c.m % 12];
  const a = P.CUM[c.m - 1] + 1, b = c.m < 12 ? P.CUM[c.m] : 365;
  const overlaps = w => w && w.start <= b && w.end >= a;
  const regions = monthPlanting(c.m);
  const plans = REGION_TOWNS.map(([, s]) => P.plan(D, P.findPlace(D, s)));
  // Every crop that can go in somewhere this month, with its dates in each region's town.
  const ids = D.crops.map(x => x.id).filter(id => regions.some(r => r.out.concat(r.indoor).some(x => x.id === id)));
  const cell = (pl, id) => { const r = rowFor(pl, id), out = r.windows.filter(overlaps), parts = [];
    if (r.indoor && overlaps(r.indoor)) parts.push(`Start indoors ${P.fmtRange(r.indoor.start, r.indoor.end)}`);
    out.forEach(w => parts.push(`Plant ${P.fmtRange(w.start, w.end)}`));
    return parts.length ? parts.join("<br>") : '<span class="none">—</span>'; };
  const table = ids.length ? `<div class="table-wrap"><table class="plan"><thead><tr><th scope="col">Plant</th>${REGION_TOWNS.map(([, , l]) => `<th scope="col">${l}</th>`).join("")}</tr></thead><tbody>
${ids.map(id => { const cr = cropById(id); return `<tr><th scope="row"><div class="crop-cell">${R.icon(id, rel, 32)}<div><a href="${rel}when-to-plant/${id}/">${esc(cr.name)}</a></div></div></th>${plans.map((pl, i) => `<td data-label="${REGION_TOWNS[i][2]}">${cell(pl, id)}</td>`).join("")}</tr>`; }).join("\n")}
</tbody></table></div>` : "";
  const sentence = x => { const town = P.findPlace(D, REGION_TOWNS.find(t => t[2] === x.label)[1]).city;
    const out = x.out.map(cr => lc(cr.name)), ind = x.indoor.map(cr => lc(cr.name));
    if (!out.length && !ind.length) return `<p><strong>${x.label}</strong> (${esc(town)}): nothing goes in this month.</p>`;
    return `<p><strong>${x.label}</strong> (${esc(town)}): ${out.length ? `plant ${listOf(out)} outside` : "nothing goes outside yet"}${ind.length ? `${out.length ? ", and" : ", but you can"} start ${listOf(ind)} indoors` : ""}.</p>`; };
  const count = regions.reduce((n, x) => Math.max(n, x.out.length), 0);
  const bc = crumbs(rel, [["Monthly chores", "garden-calendar/"], [name, null]]);
  write(rel, `garden-calendar/${slug}/index.html`, layout({
    rel, canonical: `garden-calendar/${slug}/`, current: "garden-calendar/",
    title: fitTitle(`What to Plant in ${name} in Oregon, Washington and Idaho`, `What to Plant in ${name} in Oregon, Washington & Idaho`),
    description: fitDesc(`What to plant in ${name} in Oregon, Washington and Idaho, with dates for the west side, coast, east side and high desert, plus ${name}'s garden jobs.`,
      `What to plant in ${name} in Oregon, Washington and Idaho, with dates by region and ${name}'s garden jobs.`),
    jsonld: [bc.ld],
    body: `${bc.html}
<section class="hero"><h1>What to plant in ${name} in Oregon, Washington and Idaho</h1>
<p class="lede">${esc(c.intro)}${count ? ` Up to ${count} of our plants can go in somewhere in the Northwest this month.` : ""}</p></section>
<h2>What to plant in ${name}, by region</h2>
<div class="prose">${regions.map(sentence).join("\n")}</div>
${table ? `<h2>${name} planting dates</h2>\n<p>Dates are for one typical town in each region. Colder gardens run later; <a href="${rel}">look up your own town</a>.</p>\n${table}` : ""}
<h2>${name} garden jobs</h2>
<div class="cm-grid">${CHORE_KINDS.filter(([k]) => c.tasks[k] && c.tasks[k].length).map(([k, label]) => `<div class="cm-card cm-${k}"><h3>${label}</h3><ul>${c.tasks[k].map(([t, r]) =>
    `<li class="cm-plain">${esc(t)}${r ? ` <span class="cm-tag cm-tag-${r}">${REGION_TAGS[r]}</span>` : ""}</li>`).join("")}</ul></div>`).join("")}</div>
${ad("month-mid")}
${c.articles.length ? `<h2>Read next</h2>\n${articleCards(rel, c.articles.filter(s => articleBySlug[s]).map(s => articleBySlug[s]))}` : ""}
<nav class="cm-pager" aria-label="Other months"><a href="../${monthSlug(prev.m)}/">← ${P.MONTHS_LONG[prev.m - 1]}</a><a href="../">All months</a><a href="../${monthSlug(next.m)}/">${P.MONTHS_LONG[next.m - 1]} →</a></nav>`
  }), "0.7");
});

/* How it works */
const HOW_AIRPORTS = D.places.filter(x => AIRPORT.test(D.stations[x.station].name)).length;
const HOW_CLOSEST = D.places.filter(x => STATION_CHECK[x.slug].closest).length;
const STATE_NAMES = { OR: "Oregon", WA: "Washington", ID: "Idaho" };
const HOW_STATES = listOf(["OR", "WA", "ID"].map(st => `${D.places.filter(x => x.state === st).length} in ${STATE_NAMES[st]}`));
const z = D.zones;
const zoneRows = Object.keys(z).map(k => `<tr><th scope="row">${z[k].name}</th><td>${P.fmt(P.doy(z[k].anchors.coolEarly))}</td><td>${P.fmt(P.doy(z[k].anchors.coolTrans))}</td><td>${P.fmt(P.doy(z[k].anchors.warmSeed))}</td><td>${P.fmt(P.doy(z[k].anchors.warmTrans))}</td><td>${P.fmt(P.doy(z[k].anchors.hotTrans))}</td><td>${P.fmtRange(P.doy(z[k].anchors.garlicStart), P.doy(z[k].anchors.garlicEnd))}</td></tr>`).join("");
const stationRows = D.places.map(x => { const s = D.stations[x.station]; return `<tr><th scope="row">${esc(placeLabel(x))}</th><td>${esc(s.name)} (${x.station})</td><td>${P.fmt(P.doy(s.spring50))}</td><td>${P.fmt(P.doy(s.spring10))}</td><td>${P.fmt(P.doy(s.fall50))}</td><td>${P.fmt(P.doy(s.fall10))}</td></tr>`; }).join("");
write("../", "how-it-works/index.html", layout({
  rel: "../", canonical: "how-it-works/", current: "how-it-works/",
  title: "How Rainline Garden Works: Data and Sources",
  description: "The NOAA frost data and regional growing guidance behind Rainline Garden's planting dates, and exactly how each date is calculated.",
  body: `
<section class="hero prose"><h1>How it works</h1>
<p class="lede">Every date on this site comes from public data and a rule you can check. Here are both.</p></section>
<div class="prose">
<h2>Frost dates</h2>
<p>Frost dates are from the <a href="${SOURCES.noaa}">NOAA U.S. Climate Normals for 1991–2020</a>, which give the probability of a 32°F freeze at each weather station. We use:</p>
<ul><li><strong>Typical last spring frost:</strong> the date after which there's a 50% chance of another freeze.</li>
<li><strong>9-in-10 safe date:</strong> the date after which there's only a 10% chance.</li>
<li><strong>Typical first fall frost:</strong> the date by which there's a 50% chance of the first freeze.</li></ul>
<p>A frost here means 32°F, which damages tender crops like tomatoes and basil. A hard freeze, about 28°F or colder, is what finally stops hardy crops like kale and cabbage.</p>
<p>${HOW_AIRPORTS} of the ${D.places.length} towns use a station at an airport. Airports in valley bottoms can run colder than nearby hillsides, and city centers can run warmer. Your own garden may differ by a week or more.</p>
<h2 id="stations">How we pick each town's station</h2>
<p>Rainline Garden covers ${D.places.length} towns: ${HOW_STATES}. Each one gets its own NOAA weather station rather than a state or regional average, and its page names that station, how far it is from town and how high it sits.</p>
<ul><li><strong>Closest first.</strong> ${HOW_CLOSEST} of the ${D.places.length} towns use the closest weather station that has NOAA's 1991–2020 frost records. We checked every station within 20 miles of each town.</li>
<li><strong>Sometimes another one.</strong> The other ${D.places.length - HOW_CLOSEST} use a different station nearby, and their pages say how far away it is.</li>
<li><strong>Local quirks noted.</strong> Where a nearby station is known to run warmer or colder than town, such as the airports at Portland and Pocatello, the town's page says so.</li>
<li><strong>No guessing.</strong> Where no station has frost records close enough, such as the Wood River Valley around Hailey and Ketchum, we leave the area out rather than borrow dates from a town with different weather.</li></ul>
<h2 id="rain-line">West and east of the rain line</h2>
<p>The Cascades split the region in two. West of the mountains (the coast, the Willamette Valley, Puget Sound and the southern Oregon valleys), winters are wet and mild and summers are dry, usually from July until the fall rains return in October. East of the mountains, in the rain shadow that stretches across eastern Oregon and Washington and on into Idaho, rain is scarce all year, summers are hot and winters are colder. My garden plan uses your side of the line for its watering reminders: west-side plans get a reminder to start watering in early July and to ease off in mid October; east-side plans get one in early June and another at the end of September.</p>
<h2>Planting dates</h2>
<p>Each crop gets the <em>later</em> of two dates:</p>
<ol><li><strong>A regional date</strong> for when the soil is usually ready, based on typical soil warming in each climate region (the table below lists them). Washington and Idaho towns use the closest matching region.</li>
<li><strong>A frost check</strong> against your local typical last frost: hardy early crops up to 6 weeks before it, frost-tolerant transplants up to 4 weeks before, warm-season transplants not before it, warm-season seeds and heat lovers like peppers, eggplant, melons and basil a week after it.</li></ol>
<p>Seed-starting dates count back from the outdoor date (for example, tomatoes 6–8 weeks ahead). Fall planting dates count back from your typical first fall frost, capped at October 15 because fall crops need daylight to grow, not just mild weather. Warm-season crops are flagged when planting at the window's start leaves too few days before fall frost for a typical variety to produce.</p>
</div>
<h2>Regional dates used</h2>
<div class="table-wrap"><table class="plan"><thead><tr><th scope="col">Region</th><th scope="col">Hardy early crops</th><th scope="col">Cool transplants</th><th scope="col">Warm seeds</th><th scope="col">Warm transplants</th><th scope="col">Heat lovers</th><th scope="col">Garlic</th></tr></thead><tbody>${zoneRows}</tbody></table></div>
<h2>Station data</h2>
<details class="area-group"><summary>All ${D.places.length} towns and their NOAA stations</summary>
<div class="table-wrap"><table class="plan"><thead><tr><th scope="col">Area</th><th scope="col">NOAA station</th><th scope="col">Last frost (50%)</th><th scope="col">Last frost (10%)</th><th scope="col">First frost (50%)</th><th scope="col">First frost (10%)</th></tr></thead><tbody>${stationRows}</tbody></table></div></details>
<p class="station">Spotted something that looks wrong? Email <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p>`
}), "0.5");

/* About */
write("../", "about/index.html", layout({
  rel: "../", canonical: "about/", current: "about/",
  title: "About Rainline Garden",
  description: "Rainline Garden is a free planting calendar made for gardeners in Oregon, Washington and Idaho.",
  jsonld: [{ "@context": "https://schema.org", "@type": "AboutPage", name: "About Rainline Garden", url: CONFIG.siteUrl + "about/", publisher: OWNER_LD, mainEntity: Object.keys(AUTHORS).map(id => ({ ...authorLd(id), description: AUTHORS[id].bio })) }],
  body: `<section class="hero prose"><h1>About Rainline Garden</h1>
<p class="lede">A free planting calendar built for Pacific Northwest gardens, not adapted from a national chart.</p></section>
<div class="prose"><p>National planting guides treat the whole country the same way. The Northwest doesn't cooperate: coastal gardens rarely frost but never get hot, west-side valleys have long seasons and cold spring soil, and the high desert can frost in July. Rainline Garden gives each area its own dates, built from NOAA weather records and regional growing research.</p>
<h2 id="towns">${D.places.length} towns, each with its own dates</h2>
<p>Rainline Garden covers only the Northwest, and covers it closely, with ${HOW_STATES}, from Astoria to Idaho Falls. Every town gets its own NOAA frost dates and planting calendar, with notes on the local soil, weather and pests, so Hillsboro, Bend and Pocatello each get dates that fit them instead of a state average. <a href="../frost-dates/">Find your town</a>.</p>
<h2 id="name">Why "Rainline"?</h2>
<p>The Cascade Mountains draw a line through Oregon and Washington. West of it, Pacific storms drop their rain: winters are wet and mild, summers are dry, and the soil stays cold into May. East of it sits the rain shadow, with little rain, hot summers and hard winters, and it runs on across Idaho: Boise's hot valley, the short seasons of the Snake River Plain and north Idaho's cooler lake country. That rain line is the biggest reason a planting date for Portland is wrong for Bend, and it's why this site gives every town its own dates. The rain also sets the garden's rhythm on both sides: when the spring rains ease, when the summer dry spell means watering, and when the fall rains return.</p>
<h2>Who writes Rainline Garden</h2>
<p>Two Oregon gardeners with different strengths: Jigmey covers vegetables and planting dates, and Elaine covers soil, perennials, herbs and native plants.</p>
${authorCard("../", "jigmey-dorjee", "Vegetables and planting dates")}
${authorCard("../", "elaine-holloway", "Soil, perennials and native plants")}
<h2 id="contributors">Contributors</h2>
<p>Local gardeners who share photos from their own gardens.</p>
${Object.keys(CONTRIBUTORS).map(id => contributorCard("../", id)).join("\n")}
<h2>How we make this site</h2>
<ul>
<li><strong>Frost dates</strong> come from NOAA's 1991–2020 climate normals for a weather station picked for each town. Each town page names its station and how far away it is; <a href="../how-it-works/#stations">here's how we pick them</a>.</li>
<li><strong>Planting windows</strong> follow regional timing for when the soil is ready for each kind of crop, checked against those frost dates.</li>
<li><strong>Articles</strong> combine that research with hands-on growing experience. Each one is checked against the sources before it's published and updated when the guidance changes.</li>
<li><strong>Corrections</strong> are welcome. If a date doesn't match your garden, <a href="../contact/">tell us</a> and we'll check it.</li>
</ul>
<h2>Who owns the site</h2>
<p>Rainline Garden is owned and operated by ${CONFIG.owner}. The site is free and supported by advertising and affiliate links, which never decide what we recommend. It isn't affiliated with NOAA or any university.</p>
<p>Questions or corrections: <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p></div>`
}), "0.3");

/* Privacy */
write("../", "privacy/index.html", layout({
  rel: "../", canonical: "privacy/", current: "privacy/",
  title: "Privacy Policy | Rainline Garden",
  description: "How Rainline Garden handles your information.",
  body: `<section class="hero prose"><h1>Privacy policy</h1><p class="lede">Last updated ${monthYear(CONFIG.updated)}.</p></section>
<div class="prose">
<p>Rainline Garden is owned and operated by ${CONFIG.owner} ("we", "us"). This policy explains what happens to your information when you use the site.</p>
<h2>What we collect</h2>
<p>Rainline Garden has no accounts.${CONFIG.newsletterAction ? " If you sign up for the monthly email or frost alerts, your address goes to our email provider and is used only to send that email; every message has an unsubscribe link." : ""} The ZIP code you enter is matched to a town inside your browser and is never sent to our server. Your browser's local storage keeps a few things on your own device: the last town you chose, your light or dark display choice, the jobs you tick off and the region you pick on the monthly chores page, and your garden plan if you make one on the My garden plan page (the town, the plants you picked, tasks you checked off, bed sizes, your harvest log and your notes). None of it is sent to us. The plant quiz runs in your browser too: your answers are kept in the page address so you can share your results, and are never sent to us. You can clear it by clearing site data in your browser or with the "Clear my plan" link on the plan page.</p>
<h2>Advertising</h2>
<p>This site uses Google AdSense to show ads. Google and its partners use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads">Google Ads Settings</a>, and learn more at <a href="https://policies.google.com/technologies/ads">How Google uses information from sites that use its services</a>.</p>
<h2>Affiliate links</h2>
<p>Some links to products go to Amazon.${CONFIG.amazonTag ? " As an Amazon Associate, Rainline Garden earns from qualifying purchases, at no extra cost to you." : ""} Amazon may set its own cookies when you follow them.</p>
${CONFIG.goatcounterCode ? `<h2>Visitor statistics</h2>
<p>We count page views with GoatCounter, which doesn't use cookies or track you across sites. It records the page, referring site, browser type, screen size and country, never personal information.</p>` : ""}
<h2>Hosting and fonts</h2>
<p>The site is hosted on GitHub Pages, which may log visitor IP addresses for security. Fonts are served from this site, not from a third-party font service.</p>
<h2>Contact</h2>
<p>Questions about this policy: <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p></div>`
}), "0.2");

/* Contact */
write("../", "contact/index.html", layout({
  rel: "../", canonical: "contact/", current: "contact/",
  title: "Contact | Rainline Garden",
  description: "How to reach Rainline Garden with questions, corrections or suggestions.",
  body: `<section class="hero prose"><h1>Contact</h1>
<p class="lede">Questions, corrections and suggestions are welcome.</p></section>
<div class="prose"><p>Email <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>. We read every message and usually answer within a few days.</p>
<p>The most helpful notes are corrections: a frost date that doesn't match your experience, a town we should add, or advice that doesn't fit your part of the Northwest. If you write about a date, tell us your town or ZIP code so we can check it against the nearest weather station.</p>
<p>For advertising or partnership questions, use the same address.</p></div>`
}), "0.3");

/* Terms */
write("../", "terms/index.html", layout({
  rel: "../", canonical: "terms/", current: "terms/",
  title: "Terms of Use | Rainline Garden",
  description: "Terms of use and gardening disclaimer for Rainline Garden.",
  body: `<section class="hero prose"><h1>Terms of use</h1><p class="lede">Last updated ${monthYear(CONFIG.updated)}.</p></section>
<div class="prose">
<p>Rainline Garden is owned and operated by ${CONFIG.owner}. By using the site you agree to these terms.</p>
<h2>Gardening information</h2>
<p>Planting dates on Rainline Garden are estimates based on 30-year weather averages and university extension guidance. Weather in any given year can be earlier or later, so check your local forecast before planting tender crops. We can't guarantee results and aren't responsible for crop losses.</p>
<h2>Using the site</h2>
<p>You're welcome to use the calendars, garden plan and guides for your own garden, and to link to any page. Please don't copy the site's text, illustrations or data tables wholesale onto another website.</p>
<h2>Links and ads</h2>
<p>The site shows ads and links to other websites, including affiliate links to stores. We don't control those sites and aren't responsible for their content or products. See the <a href="../privacy/">privacy policy</a> for how ads and links use cookies.</p>
<h2>Changes</h2>
<p>We may update these terms; the date above shows the latest version. Questions: <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p></div>`
}), "0.2");

/* 404 (absolute links because it can be served at any path) */
const B = CONFIG.basePath;
write(B, "404.html", layout({
  rel: B, canonical: "", current: null,
  title: "Page not found | Rainline Garden", description: "That page doesn't exist.",
  body: `<section class="hero prose"><h1>That page doesn't exist.</h1><p class="lede">Try the <a href="${B}">home page</a>, the <a href="${B}what-to-grow/">plant quiz</a>, the <a href="${B}when-to-plant/">plant guides</a> or the <a href="${B}frost-dates/">town calendars</a>.</p></section>
<script>/* Old one-plant-one-town pages were folded into the plant guides; send visitors to the guide with their town picked. */
(function(){var m=location.pathname.match(/when-to-plant[/]([a-z-]+)[/]([a-z-]+-(?:or|wa))[/]?$/);if(m)location.replace("${B}when-to-plant/"+m[1]+"/?town="+m[2]+"#your-town")})()</script>`
}), null);

/* Custom domain: GitHub Pages reads the CNAME file. */
const cname = path.join(ROOT, "CNAME");
if (CONFIG.customDomain) fs.writeFileSync(cname, CONFIG.customDomain + "\n");
else if (fs.existsSync(cname)) fs.unlinkSync(cname);

/* Guide facts My garden plan reads (sun, spacing, harvest and so on). */
const guideData = {
  crops: Object.fromEntries(Object.entries(G.crops).map(([id, g]) => [id, Object.fromEntries(
    ["difficulty", "sun", "spacing", "depth", "plantText", "firstHarvest", "harvest", "problem", "varieties", "care", "frost"]
      .filter(k => g[k] !== undefined).map(k => [k, g[k]]))])),
};
fs.writeFileSync(path.join(ROOT, "assets/guide-data.js"),
  `/* Generated by scripts/build.js from scripts/guide.js. Do not edit by hand. */\nwindow.RainlineGuideData = ${JSON.stringify(guideData)};\n`);

/* Header search index: plants, towns, articles and pages. Loaded by assets/nav.js the first time search opens. */
const searchIndex = [
  ...D.crops.map(c => ({ t: c.name, s: "Plant · " + (D.categories.find(k => k.crops.includes(c.id)) || {}).name, u: "when-to-plant/" + c.id + "/", k: "crop", c: c.id, i: "assets/img/crops/" + c.id + ".webp" })),
  ...D.places.map(p => ({ t: p.city + ", " + p.state, s: "Town calendar: frost and planting dates", u: "frost-dates/" + p.slug + "/", k: "town", p: p.slug })),
  ...D.categories.map(k => ({ t: k.name, s: k.crops.length + " plants", u: "when-to-plant/" + k.id + "/", k: "group", i: "assets/img/crops/" + k.crops[0] + ".webp" })),
  ...ARTICLES.map(a => ({ t: a.title, s: "Article", u: "articles/" + a.slug + "/", k: "article", i: a.icon ? "assets/img/topics/" + a.icon + ".svg" : a.crops && a.crops[0] ? "assets/img/crops/" + a.crops[0] + ".webp" : "" })),
  ...G.glossary.map(g => ({ t: g[0], s: "Glossary", u: "glossary/#" + g[1], k: "term" })),
  ...[["", "Home", "Look up your town's planting dates"], ["my-garden/", "My garden plan", "Plan, track and print your garden"], ["what-to-grow/", "Plant quiz", "Find the plants that suit your space and time"], ["frost-dates/", "Town calendars", "Frost and planting dates for every town"],
    ["beginners-guide/", "Beginner's guide", "Start your first garden"], ["garden-calendar/", "Monthly chores", "What to do each month"], ["about/", "About", "Who writes Rainline Garden"], ["contact/", "Contact", "Questions and corrections"]]
    .map(([u, t, sub]) => ({ t, s: sub, u, k: "page" }))
];
fs.writeFileSync(path.join(ROOT, "assets/search-index.js"),
  `/* Generated by scripts/build.js. Do not edit by hand. */\nwindow.RainlineSearch = ${JSON.stringify(searchIndex)};\n`);

/* sitemap, robots */
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${CONFIG.siteUrl}${p.loc}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`).join("\n")}
</urlset>
`);
/* Web app manifest: the icon phones use when someone adds the site to their home screen. */
fs.writeFileSync(path.join(ROOT, "site.webmanifest"), JSON.stringify({
  name: CONFIG.siteName, short_name: "Rainline", start_url: CONFIG.basePath, display: "standalone", background_color: "#FAF7F0", theme_color: "#173B2E",
  icons: [{ src: "assets/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "assets/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }]
}, null, 2) + "\n");
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.siteUrl}sitemap.xml\n`);
fs.writeFileSync(path.join(ROOT, ".nojekyll"), "");
/* ads.txt: AdSense checks it at the root of the domain, so it only works with a custom domain. */
const adsTxt = path.join(ROOT, "ads.txt");
if (CONFIG.adsenseClient) fs.writeFileSync(adsTxt, `google.com, ${CONFIG.adsenseClient.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`);
else if (fs.existsSync(adsTxt)) fs.unlinkSync(adsTxt);
console.log(`Built ${pages.length} pages.`);
