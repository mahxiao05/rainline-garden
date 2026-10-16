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
const G = require("./guide.js");
const PHOTOS = require("./photos.js");
const SCIENCE = require("./crop-science.js");
const NOTES = require("./crop-notes.js");
const { SIZES, fileBase, sizesFor } = require("./photo-sizes.js");
const ARTICLES = require("./articles-3.js").concat(require("./articles-2.js"), require("./articles.js")); // newest first

const CONFIG = {
  siteName: "Rainline Garden",
  customDomain: "rainlinegarden.org", // e.g. "rainlinegarden.com"; set after buying the domain, then rebuild (see README)
  contactEmail: "info@rainlinegarden.org",
  owner: "X Ventures LLC", // the company that owns and runs the site
  // Article authors are in AUTHORS below. Only list credentials the person actually holds.
  adsenseClient: "ca-pub-7867146450299069", // AdSense publisher ID; also written to ads.txt
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
    short: "Elaine Holloway was born and raised in the Portland area, has gardened all her life and studied environmental science at Portland State. She writes about soil, moisture, perennials and native and pollinator-friendly plants for Northwest gardens."
  }
};
const DEFAULT_AUTHOR = "jigmey-dorjee";
// Drop a square photo at assets/img/authors/{id}.jpg and it replaces the initials badge.
const authorPhoto = id => fs.existsSync(path.join(ROOT, "assets/img/authors", id + ".jpg")) ? `assets/img/authors/${id}.jpg` : null;
const avatar = (rel, id, cls) => authorPhoto(id)
  ? `<img class="avatar ${cls || ""}" src="${rel}${authorPhoto(id)}" alt="${AUTHORS[id].name}" width="96" height="96">`
  : `<span class="avatar ${cls || ""}${id === "elaine-holloway" ? " avatar-alt" : ""}" aria-hidden="true">${initials(AUTHORS[id].name)}</span>`;
const authorLd = id => ({ "@type": "Person", name: AUTHORS[id].name, url: `${CONFIG.siteUrl}about/#${id}` });
const authorCard = (rel, id, heading) => { const a = AUTHORS[id]; return `<section class="profile" id="${id}">
<div class="profile-cover"><img src="${rel}assets/img/${a.cover}" alt="" width="1200" height="320" loading="lazy"></div>
<div class="profile-body">
${avatar(rel, id, "avatar-xl")}
<p class="profile-kicker">${heading}</p>
<h2 class="profile-name">${a.name}</h2>
<p class="profile-role">${a.role}</p>
<ul class="profile-facts">${a.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
<p>${esc(a.bio)}</p>
</div></section>`; };
const initials = n => n.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();

function layout({ rel, title, description, canonical, current, body, scripts, jsonld, noindex, image }) {
  const base = rel; // relative prefix back to the site root, e.g. "../../"
  const cur = href => current === href ? ' aria-current="page"' : "";
  const LEARN = [["beginners-guide/", "Beginner's guide", "Start your first Northwest garden"], ["garden-calendar/", "Monthly chores", "What to do in the garden each month"],
    ["articles/", "Articles", "Growing guides for Northwest weather"], ["glossary/", "Glossary", "Gardening words in plain language"], ["how-it-works/", "How it works", "Where our dates come from"]];
  const learnOn = LEARN.some(([href]) => href === current);
  const ICON = {
    search: '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plan: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="4" y="3.5" width="16" height="17" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="m8 9 1.5 1.5L12 8M8 15l1.5 1.5L12 14M14.5 9.5H17M14.5 15.5H17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path class="m1" d="M4 7h16"/><path class="m2" d="M4 12h16"/><path class="m3" d="M4 17h16"/></svg>'
  };
  const MAIN = [["", "Planner"], ["when-to-plant/", "When to plant"], ["frost-dates/", "Frost dates"]];
  const nav = MAIN.map(([href, label]) => `<a href="${base}${href}"${cur(href)}>${label}</a>`).join("") +
    `<div class="nav-more"><button type="button" class="nav-more-btn${learnOn ? " is-current" : ""}" aria-expanded="false" aria-controls="nav-learn">Learn${ICON.chev}</button>` +
    `<div class="nav-menu" id="nav-learn" hidden>${LEARN.map(([href, label, sub]) => `<a href="${base}${href}"${cur(href)}><strong>${label}</strong><span>${sub}</span></a>`).join("")}</div></div>`;
  const menu = `<div class="site-menu" id="site-menu" hidden><div class="wrap">
<p class="menu-town" hidden></p>
<div class="menu-cols"><div><p class="menu-h">Plan</p>${MAIN.concat([["my-garden/", "My garden plan"]]).map(([href, label]) => `<a href="${base}${href}"${cur(href)}>${label}</a>`).join("")}</div>
<div><p class="menu-h">Learn</p>${LEARN.map(([href, label]) => `<a href="${base}${href}"${cur(href)}>${label}</a>`).join("")}</div></div>
</div></div>`;
  const search = `<div class="search-pop" id="search-pop" hidden><div class="wrap"><div class="search-box" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-owns="search-list">
${ICON.search}<label for="search-q" class="sr">Search plants, towns and guides</label><input id="search-q" type="search" autocomplete="off" spellcheck="false" placeholder="Search plants, towns and guides" aria-autocomplete="list" aria-controls="search-list">
<button type="button" class="search-close" aria-label="Close search">Esc</button></div>
<ul id="search-list" class="search-list" role="listbox" aria-label="Results"></ul></div></div>`;
  const ld = (jsonld || []).map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n");
  const ads = CONFIG.adsenseClient
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CONFIG.adsenseClient}" crossorigin="anonymous"></script>` : "";
  return `<!doctype html>
<html lang="en" data-base="${base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">\n' : ""}<link rel="canonical" href="${CONFIG.siteUrl}${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${CONFIG.siteUrl}${canonical}">
<meta property="og:image" content="${CONFIG.siteUrl}${image || "assets/img/og.png"}">
<meta property="og:site_name" content="Rainline Garden">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F2F4F6">
<script>try{var t=localStorage.getItem("rainline-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="icon" href="${base}assets/icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${base}assets/fonts/fonts.css">
<link rel="stylesheet" href="${base}assets/style.css">
${ads}
${CONFIG.goatcounterCode ? `<script data-goatcounter="https://${CONFIG.goatcounterCode}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>` : ""}
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head"><div class="wrap">
<a class="brand" href="${base}"><img src="${base}assets/icon.svg" width="30" height="30" alt="">Rainline Garden</a>
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
<p><strong class="foot-brand">Rainline Garden</strong><br>Free planting calendars for Oregon and Washington gardens.<br>Frost data from NOAA climate normals. Updated ${CONFIG.updated}.${CONFIG.amazonTag ? "<br>As an Amazon Associate, Rainline Garden earns from qualifying purchases." : ""}</p>
<nav aria-label="Footer"><a href="${base}glossary/">Glossary</a><a href="${base}how-it-works/">How it works</a><a href="${base}about/">About</a><a href="${base}contact/">Contact</a><a href="${base}privacy/">Privacy</a><a href="${base}terms/">Terms</a></nav>
<p class="owner">&copy; ${YEAR} ${CONFIG.owner}. Rainline Garden is owned and operated by ${CONFIG.owner}.</p>
</div></footer>
<script>(function(){var r=document.documentElement,b=document.querySelector(".theme-btn");if(!b)return;function cur(){return r.dataset.theme==="dark"?"dark":"light"}function sync(){b.setAttribute("aria-label",cur()==="dark"?"Switch to light mode":"Switch to dark mode")}sync();b.addEventListener("click",function(){var n=cur()==="dark"?"light":"dark";r.dataset.theme=n;try{localStorage.setItem("rainline-theme",n)}catch(e){}sync()})})();</script>
${(scripts || []).map(s => `<script src="${base}assets/${s}"></script>`).join("\n")}
<script src="${base}assets/nav.js" defer></script>
<script src="${base}assets/helper.js" defer></script>
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

/* Shared pieces */
const lc = n => n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels").replace(/^oregon/, "Oregon");
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

function beginnerBox(rel, slug, where) {
  const cards = G.beginner.map(id => {
    const c = cropById(id);
    const href = slug ? `${rel}when-to-plant/${id}/${slug}/` : `${rel}when-to-plant/${id}/`;
    return `<li><a class="card" href="${href}">${R.icon(id, rel, 64)}<span class="card-t">${c.name}</span><span class="card-s">${G.beginnerWhy[id]}</span></a></li>`;
  }).join("");
  return `<section class="beginner"><h2>New to gardening? Start with these 5 easy crops</h2>
<p>They're forgiving, quick and hard to kill${where ? ` in ${esc(where)}` : ""}. Tap one for planting dates and step-by-step instructions, or read the <a href="${rel}beginners-guide/">beginner's guide</a>.</p>
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
  const list = ARTICLES.filter(a => a.crops.includes(cropId)).slice(0, max || Infinity);
  if (!list.length) return "";
  return `<aside class="reads"><h2>Read more</h2><ul>${list.map(a => `<li><a href="${rel}articles/${a.slug}/">${esc(a.title)}</a><span>${esc(a.description)}</span></li>`).join("")}</ul></aside>`;
}

// Topics for grouping the articles page. Articles about one crop use that crop's icon;
// general articles set `icon` to a drawing in assets/img/topics/.
const ARTICLE_TOPICS = [
  ["crops", "Crop guides", "How to grow specific vegetables, fruit and flowers here."],
  ["timing", "Timing and seasons", "Frost dates, soil temperature, seed starting and planning the year."],
  ["soil", "Beds, soil and water", "Raised beds, containers, soil care and summer watering."],
  ["problems", "Pests and diseases", "Slugs, blight and the other troubles of a wet climate."],
  ["flowers", "Flowers and pollinators", "Cut flowers and plantings for bees and butterflies."]
];
ARTICLES.forEach(a => {
  if (!ARTICLE_TOPICS.some(t => t[0] === a.topic)) throw new Error(`Article ${a.slug} needs a topic`);
  if (a.icon && !fs.existsSync(path.join(ROOT, "assets/img/topics", a.icon + ".svg"))) throw new Error(`Missing topic icon ${a.icon}`);
});
const articleIcon = (a, rel, size) => a.icon
  ? `<img class="ico" src="${rel}assets/img/topics/${a.icon}.svg" width="${size}" height="${size}" alt="" loading="lazy">`
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
function photoCredit(src) {
  const [site, id] = src.split(":");
  return site === "pexels" ? `<a href="https://www.pexels.com/photo/${id}/" rel="nofollow">Pexels</a>` : `<a href="https://unsplash.com/" rel="nofollow">Unsplash</a>`;
}
function photo(key, rel, { big, small, cls, sizes, eager }) {
  const p = PHOTOS[key];
  if (!p) return "";
  const set = ext => `${rel}${photoFile(key, big, ext)} ${SIZES[big].w}w, ${rel}${photoFile(key, small, ext)} ${SIZES[small].w}w`;
  return `<figure class="${cls}"><picture><source type="image/webp" srcset="${set("webp")}" sizes="${sizes}">
<img src="${rel}${photoFile(key, big)}" srcset="${set("jpg")}" sizes="${sizes}" width="${SIZES[big].w}" height="${SIZES[big].h}" alt="${esc(p.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>
<figcaption>Photo: ${photoCredit(p.src)}</figcaption></figure>`;
}
const banner = (key, rel) => photo(key, rel, { big: "banner", small: "bannerSm", cls: "photo-banner", sizes: "(min-width: 70rem) 66rem, calc(100vw - 32px)", eager: true });

function articleCards(rel, list) {
  return `<ul class="reads-grid">${list.map(a => `<li><a class="card" href="${rel}articles/${a.slug}/">${articleIcon(a, rel, 48)}<span class="card-t">${esc(a.title)}</span><span class="card-s">${esc(a.description)}</span></a></li>`).join("")}</ul>`;
}

function faqLd(qas) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qas.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}

// Cleaner layout for crops with notes in scripts/crop-science.js (in depth) or scripts/crop-notes.js (shorter).
const FEATURED_CITIES = ["portland-or", "seattle-wa", "eugene-or", "spokane-wa", "bend-or", "tri-cities-wa"];
function scienceBody(c, g, sci, { head, rowHtml, plans, port }) {
  const featured = FEATURED_CITIES.map(slug => plans.find(p => p.place.slug === slug));
  return `${quickFacts(c, g)}
${jump(sci)}
<p class="callout">${esc(c.note)}</p>
<h2 id="dates">${c.name} planting dates</h2>
<div class="table-wrap"><table class="plan"><thead>${head}</thead><tbody>${featured.map(rowHtml).join("")}</tbody></table></div>
<details class="more-cities"><summary>All ${plans.length} Oregon and Washington cities</summary><div class="table-wrap"><table class="plan"><thead>${head}</thead><tbody>${plans.map(rowHtml).join("")}</tbody></table></div></details>
${ad("crop-mid")}
<h2 id="grow">How to grow ${lc(c.name)}</h2>
<div class="grow-grid"><div>${stepsForHub(c, g, port)}</div>
${sideCard(g)}</div>
${scienceParts(sci)}
${gearBox(g.gear)}
<h2 id="faq">Common questions about growing ${lc(c.name)}</h2>
${faqHtml(sci.faq)}
${relatedArticles("../../", c.id, 4)}`;
}
const jump = sci => `<nav class="jump" aria-label="On this page"><a href="#dates">Planting dates</a><a href="#grow">How to grow</a><a href="#numbers">Key numbers</a><a href="#science">${sci.notes ? "Growing notes" : "How it works"}</a><a href="#faq">Questions</a></nav>`;
const faqHtml = qas => `<div class="faq">${qas.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`;
const sideCard = (g, note) => `<aside class="side-card"><h3>Varieties that do well here</h3><ul class="vars">${g.varieties.map(v => `<li>${esc(v)}</li>`).join("")}</ul>
<h3>Watch out for</h3><p>${esc(g.problem)}</p>${note ? `<p class="note">${esc(note)}</p>` : ""}</aside>`;
function scienceParts(sci) {
  return `<h2 id="numbers">Key numbers</h2>
<ul class="keys">${sci.keys.map(([l, v]) => `<li><span class="k-v">${esc(v)}</span><span class="k-l">${esc(l)}</span></li>`).join("")}</ul>
<h2 id="science">${sci.notes ? "Growing notes" : "How it works"}</h2>
<p class="lede-sm">${sci.notes ? "What makes the difference in Northwest gardens, in plain language." : "The plant biology behind the advice above, in plain language."}</p>
<div class="sci-cards">${sci.sections.map(([h, ...ps]) => `<section class="sci-card"><h3>${esc(h)}</h3>${ps.map(p => `<p>${esc(p)}</p>`).join("")}</section>`).join("\n")}</div>`;
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
  return `<ul class="cat-tiles">${D.categories.map(k => `<li><a class="cat-tile" href="${rel}${WHEN_INDEX}${k.id}/">${PHOTOS["cat:" + k.id] ? `<img class="cat-photo" src="${rel}${photoFile("cat:" + k.id, "thumb", "webp")}" width="480" height="240" alt="" loading="lazy" decoding="async">` : ""}<span class="cat-icons">${k.crops.slice(0, 3).map(id => R.icon(id, rel, 40)).join("")}</span><span class="card-t">${k.name}</span><span class="card-s">${k.crops.length} plants</span></a></li>`).join("")}</ul>`;
}

/* Home */
write("", "index.html", layout({
  rel: "", canonical: "", current: "",
  title: "Rainline Garden: Planting Calendar and Frost Dates for Oregon and Washington",
  description: "When to plant vegetables where you live in Oregon and Washington. Enter your ZIP for local frost dates and a planting calendar built from NOAA frost data and regional growing guidance.",
  jsonld: [{ "@context": "https://schema.org", "@type": "WebSite", name: "Rainline Garden", url: CONFIG.siteUrl, publisher: OWNER_LD }],
  body: `
${photo("hero", "", { big: "hero", small: "heroSm", cls: "hero-art", sizes: "(min-width: 70rem) 66rem, calc(100vw - 32px)", eager: true })}
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
<section class="home-sec"><div class="sec-head"><h2>Browse by plant type</h2><a href="${WHEN_INDEX}">All ${D.crops.length} plants</a></div>
${categoryTiles("")}
</section>
<section class="home-sec plan-cta"><div><h2>Plan your garden</h2>
<p>Pick your plants and get a dated to-do list for the year, with a cheat sheet for each plant. It saves as you go and prints on one page.</p></div>
<a class="btn" href="my-garden/">Make my garden plan</a></section>
<section class="home-sec starter"><div><h2>New to gardening?</h2>
<p>Start with five forgiving crops that are hard to kill, then read the <a href="beginners-guide/">beginner's guide</a>.</p></div>
<ul class="chips">${G.beginner.map(id => `<li><a href="${WHEN_INDEX}${id}/">${R.icon(id, "", 28)}${cropById(id).name}</a></li>`).join("")}</ul></section>
${ad("home-mid")}
<section class="home-sec"><div class="sec-head"><h2>Guides for Northwest gardeners</h2><a href="articles/">All articles</a></div>
${articleCards("", ARTICLES.slice(0, 3))}</section>
${newsletter()}
<section class="home-sec prose">
<h2>Why Northwest planting dates are different</h2>
<p>National charts key everything off the last frost date. Here that's only half the story: Portland's typical last frost is in mid-March, yet tomatoes planted then sit in cold, wet soil for two months, while the high desert can frost into June. Rainline Garden combines NOAA frost records for each area with regional timing for when the soil is actually ready. <a href="how-it-works/">See how the dates are worked out</a>.</p>
</section>`,
  scripts: SCRIPTS
}), "1.0");

/* City pages */
const byState = s => D.places.filter(p => p.state === s).sort((a, b) => a.city.localeCompare(b.city));
D.places.forEach(place => {
  const p = P.plan(D, place);
  const f = p.frost;
  const nearby = D.places.filter(x => x.zone === place.zone && x.slug !== place.slug).slice(0, 6);
  const tomato = win(rowFor(p, "tomatoes"), "spring");
  const peas = win(rowFor(p, "peas"), "spring");
  const bc = crumbs("../../", [["Frost dates", "frost-dates/"], [placeLabel(place), null]]);
  write("../../", `frost-dates/${place.slug}/index.html`, layout({
    rel: "../../", canonical: `frost-dates/${place.slug}/`, current: "frost-dates/",
    title: `${placeLabel(place)} Frost Dates and Planting Calendar | Rainline Garden`,
    description: `The typical last spring frost in ${placeLabel(place)} is ${P.fmtLong(f.spring50)} and the first fall frost is ${P.fmtLong(f.fall50)}. See when to plant tomatoes, peas, garlic and ${D.crops.length - 3} more crops.`,
    jsonld: [bc.ld],
    body: `${bc.html}
<section class="hero" id="live" data-place="${place.slug}">
<h1>${esc(place.city)}, ${place.state} frost dates and planting calendar</h1>
<p class="lede">The typical last spring frost in ${esc(place.city)} is ${P.fmtLong(f.spring50)}, and the first fall frost is around ${P.fmtLong(f.fall50)}. Plant peas from ${P.fmt(peas.start)}; plant tomatoes from ${P.fmt(tomato.start)}.</p>
</section>
${R.frostFacts(p)}
${R.regionNote(p)}
<h2>What to plant now</h2>
<div id="now"><p class="empty">Turn on JavaScript to see what's in season today. The full calendar is below.</p></div>
${beginnerBox("../../", place.slug, place.city)}
<p class="plan-link"><a class="btn btn-ghost" href="../../my-garden/?place=${place.slug}">Make a garden plan for ${esc(place.city)}</a> Pick your plants and get a dated, printable to-do list.</p>
<h2>Planting calendar</h2>
<div id="chart">${R.chart(p)}</div>
${ad("city-mid")}
<h2>Planting dates for ${esc(place.city)}</h2>
${R.table(p, "../../")}
<p class="station">Dates are a guide, not a guarantee. Check the soil before planting: cool-season crops need it workable and not soggy; warm-season crops need it warm. A $10 soil thermometer pays for itself. Unfamiliar terms are explained in the <a href="../../glossary/">glossary</a>.</p>
${newsletter(place.city)}
<h2>Nearby areas with similar weather</h2>
<ul class="places">${nearby.map(x => `<li><a href="../${x.slug}/">${esc(placeLabel(x))}</a></li>`).join("")}</ul>
<p><a href="../">All Oregon and Washington cities</a> or <a href="../../">use the planner with your ZIP</a>.</p>`,
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
  else if (c.id === "onions") s = `Plant onion sets${where} <strong>${P.fmtRange(sp.start, sp.end)}</strong>.`;
  else s = `Plant ${lc(c.name)} from seed, directly in the garden${where}, <strong>${P.fmtRange(sp.start, sp.end)}</strong>.`;
  if (fa) s += ` For a fall harvest, plant again <strong>${P.fmtRange(fa.start, fa.end)}</strong>.`;
  return s;
}

function why(c, r, p) {
  const f = p.frost, sp = win(r, "spring"), city = esc(p.place.city);
  if (G.crops[c.id].fall) return `${G.crops[c.id].fall.why} In ${city} the first fall frost usually comes around ${P.fmtLong(f.fall50)}.`;
  const last = `${city}'s typical last spring frost is ${P.fmtLong(f.spring50)}.`;
  const anchor = P.doy(p.zone.anchors[c.anchor]);
  if (c.group === "cool" || c.group === "berry") {
    const hardy = c.group === "berry" ? "As a hardy perennial" : "As a cool-season crop that handles light frost";
    const weeks = Math.round((f.spring50 - sp.start) / 7);
    if (sp.start === anchor) return last + (sp.start < f.spring50
      ? ` ${hardy}, this crop doesn't need to wait for that date. ${ZONE_IN[p.place.zone]}, though, the soil usually isn't ready to work until about ${P.fmtLong(sp.start)}.`
      : ` ${ZONE_IN[p.place.zone]}, the soil is usually ready for ${lc(c.name)} around ${P.fmtLong(sp.start)}.`);
    return last + ` ${hardy}, this crop can go in about ${weeks} week${weeks === 1 ? "" : "s"} before that.`;
  }
  return last + (sp.start - f.spring50 > 10
    ? ` Frost kills ${lc(c.name)}, and warm-season crops also need warm soil. Soil here stays cold for weeks after the last frost, so planting waits until about ${P.fmtLong(sp.start)}.`
    : ` Frost kills ${lc(c.name)}, so planting starts once frost risk drops, around ${P.fmtLong(sp.start)}.`)
    + (r.cover ? " Keep row cover or a frost blanket handy for the first couple of weeks, since a late frost is still possible." : "")
    + (r.season === "short" && c.id === "dahlias" ? ` The season here is short for dahlias: start tubers in pots indoors about a month early, choose smaller early-blooming varieties, and cover plants on cool nights.` : r.season === "short" ? ` The season here is short for this crop: use young plants rather than seeds, choose the fastest variety you can find, and cover plants on cool nights.` : r.season === "tight" ? " The season is a little tight here, so an early variety is the safer choice." : "");
}

function steps(c, r, g) {
  const sp = win(r, "spring"), fa = win(r, "fall");
  const out = [];
  if (g.fall) {
    g.fall.steps.forEach(t => out.push(t.replace("{when}", P.fmtRange(fa.start, fa.end)).replace("{depth}", g.depth.charAt(0).toLowerCase() + g.depth.slice(1)).replace("{spacing}", g.spacing)));
  } else if (g.plantText) {
    out.push(`Pick a sunny spot with soil that drains well, and mix in an inch or two of compost.`);
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
    else if (c.id === "onions") out.push(`Plant onion sets ${P.fmtRange(sp.start, sp.end)}, ${g.spacing}, ${g.depth.charAt(0).toLowerCase() + g.depth.slice(1)}.`);
    else out.push(`Plant seeds ${P.fmtRange(sp.start, sp.end)}, ${g.depth}, ${g.spacing}.`);
    out.push(c.id === "potatoes" ? `As plants grow, pile soil or straw around the stems so the potatoes stay covered.` : c.id === "onions" ? `Water regularly and keep the bed weeded; onions don't compete well.` : `Keep the soil evenly moist until sprouts appear, which can take one to three weeks in cool soil.`);
  }
  out.push(`<strong>Harvest:</strong> ${g.harvest}`);
  if (fa && !g.fall) out.splice(out.length - 1, 0, `Plant again ${P.fmtRange(fa.start, fa.end)} for a fall harvest.`);
  return `<ol class="steps">${out.map(s => `<li>${s}</li>`).join("")}</ol>`;
}

function quickFacts(c, g) {
  const rows = [["Difficulty", badge(g.difficulty)], ["Sun", g.sun], ["Spacing", g.spacing], ["Planting depth", g.depth],
    ["Frost", g.frost ? g.frost : c.group === "warm" ? "Killed by frost" : c.group === "fall" ? "Very hardy; grows through winter" : c.group === "berry" ? "Hardy perennial; comes back every year" : "Handles light frost"]];
  if (g.firstHarvest) rows.push([c.cat === "flowers" ? "Flowers" : "First harvest", g.firstHarvest]);
  else if (c.days) rows.push(["First harvest", `About ${c.days} days after planting`]);
  return `<dl class="qf">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
}

const ZONE_IN = { coast: "On the coast", west: "In the west-side valleys", east: "In the Columbia Basin and low eastern valleys", inland: "In the Inland Northwest", high: "In the high desert and mountains" };
const ZONE_FOR = { coast: "the Northwest coast", west: "west-side valleys", east: "the Columbia Basin", inland: "the Inland Northwest", high: "the high desert" };
D.crops.forEach(c => {
  const g = G.crops[c.id];
  const plans = D.places.map(pl => P.plan(D, pl));

  /* Crop hub */
  const cols = [["Start seeds indoors", r => r.indoor], ["Plant in the garden", r => win(r, "spring")], [g.fall ? "Plant in fall" : "Plant again for fall", r => win(r, "fall")]]
    .filter(([, get]) => plans.some(p => get(rowFor(p, c.id))));
  const head = `<tr><th scope="col">City</th>${cols.map(([l]) => `<th scope="col">${l}</th>`).join("")}</tr>`;
  const rowHtml = p => {
    const r = rowFor(p, c.id);
    return `<tr><th scope="row"><a href="${p.place.slug}/">${esc(placeLabel(p.place))}</a></th>${cols.map(([l, get]) => { const w = get(r); return `<td data-label="${l}">${w ? P.fmtRange(w.start, w.end) : '<span class="none">—</span>'}</td>`; }).join("")}</tr>`;
  };
  const sorted = plans.slice().sort((a, b) => a.place.state.localeCompare(b.place.state) || a.place.city.localeCompare(b.place.city));
  const rows = sorted.map(rowHtml).join("");
  const port = plans.find(p => p.place.slug === "portland-or"), bend = plans.find(p => p.place.slug === "bend-or");
  const hb = crumbs("../../", [["When to plant", WHEN_INDEX], [catById(c.cat).name, `${WHEN_INDEX}${c.cat}/`], [c.name, null]]);
  const sci = SCIENCE[c.id] || NOTES[c.id];
  write("../../", `when-to-plant/${c.id}/index.html`, layout({
    rel: "../../", canonical: `when-to-plant/${c.id}/`, current: WHEN_INDEX,
    title: `When to Plant ${c.name} in Oregon and Washington, by City | Rainline Garden`,
    description: `${c.name} planting dates for 30 Oregon and Washington cities, from Portland and Seattle to Bend and Spokane, plus a beginner-friendly growing guide.`,
    image: PHOTOS["crop:" + c.id] && photoFile("crop:" + c.id, "banner"),
    jsonld: sci ? [hb.ld, faqLd(sci.faq)] : [hb.ld],
    body: `${hb.html}
${banner("crop:" + c.id, "../../")}
<section class="hero hero-crop">${R.icon(c.id, "../../", 120)}<div>
<h1>When to plant ${lc(c.name)} in Oregon and Washington</h1>
<p class="lede">${g.fall ? g.fall.lede : `In Portland: ${answer(c, rowFor(port, c.id), null).replace(/<\/?strong>/g, "")} In Bend: ${P.fmtRange(win(rowFor(bend, c.id), "spring").start, win(rowFor(bend, c.id), "spring").end)}.`} Find your city below.</p></div></section>
${sci ? scienceBody(c, g, sci, { head, rowHtml, plans: sorted, port }) : `${quickFacts(c, g)}
<p class="callout">${esc(c.note)}</p>
<h2>${c.name} planting dates by city</h2>
<div class="table-wrap"><table class="plan"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
${ad("crop-mid")}
<h2>How to grow ${lc(c.name)}</h2>
${stepsForHub(c, g, port)}
<h2>Varieties that do well in the Northwest</h2>
<ul class="vars">${g.varieties.map(v => `<li>${esc(v)}</li>`).join("")}</ul>
<h2>Watch out for</h2><p>${esc(g.problem)}</p>
${gearBox(g.gear)}
${relatedArticles("../../", c.id)}`}
${newsletter()}
<h2>More ${catById(c.cat).name.toLowerCase()}</h2>
<ul class="chips">${catById(c.cat).crops.filter(id => id !== c.id).map(id => `<li><a href="../${id}/">${R.icon(id, "../../", 24)}${cropById(id).name}</a></li>`).join("")}</ul>
<p><a href="../">See all ${D.crops.length} plants</a></p>`
  }), "0.8");

  /* Crop + city */
  plans.forEach(p => {
    const place = p.place, r = rowFor(p, c.id), sp = win(r, "spring"), fa = win(r, "fall"), f = p.frost;
    const city = place.city;
    const rel = "../../../";
    const qas = [[`When is the last frost in ${city}, ${place.state}?`, `Typically ${P.fmtLong(f.spring50)}. In 9 years out of 10, frost is over by ${P.fmtLong(f.spring10)}. These are 1991–2020 NOAA climate normals for ${p.station.name}.`]];
    if (g.fall) qas.push([g.fall.qa[0].replace("{city}", city), `${g.fall.qa[1]} ${g.harvest}`]);
    else qas.push([`Is it too late to plant ${lc(c.name)} in ${city}?`, `The spring planting window runs through ${P.fmtLong(sp.end)}. ` + (fa ? `If you miss it, plant again for fall from ${P.fmtLong(fa.start)} to ${P.fmtLong(fa.end)}.` : c.group === "warm" ? `Later plantings may not have time to ${c.cat === "flowers" ? "bloom well" : "produce"} before the first fall frost, which usually arrives around ${P.fmtLong(f.fall50)}.` : c.group === "berry" ? `Potted plants can still go in later if you water them faithfully through their first summer.${place.zone === "west" || place.zone === "coast" ? " Fall planting also works well here." : ""}` : `Later plantings tend to struggle in summer heat.`)]);
    if (r.indoor) qas.push([`When should I start ${lc(c.name)} from seed indoors in ${city}?`, `${P.fmtLong(r.indoor.start)} to ${P.fmtLong(r.indoor.end)}, which is ${c.indoor[0]} to ${c.indoor[1]} weeks before the ${P.fmtLong(sp.start)} planting date. Or buy young plants at a garden center instead.`]);
    else if (g.firstHarvest) qas.push([c.cat === "flowers" ? `When do ${lc(c.name)} bloom?` : `How long until I can pick ${lc(c.name)}?`, `${g.firstHarvest}. ${g.harvest}`]);
    else if (c.days) qas.push([`How long until I can harvest ${lc(c.name)}?`, `About ${c.days} days after planting. ${g.harvest}`]);
    const ref = g.fall ? fa : sp;
    const same = p.crops.filter(x => x.crop.id !== c.id && x.windows.some(w => w.kind === ref.kind && w.start <= ref.end && w.end >= ref.start)).slice(0, 8);
    const near = plans.filter(x => x.place.zone === place.zone && x.place.slug !== place.slug).slice(0, 6);
    const cb = crumbs(rel, [["When to plant", WHEN_INDEX], [c.name, `when-to-plant/${c.id}/`], [city, null]]);
    const plain = answer(c, r, city).replace(/<\/?strong>/g, "");
    write(rel, `when-to-plant/${c.id}/${place.slug}/index.html`, layout({
      rel, canonical: `when-to-plant/${c.id}/${place.slug}/`, current: WHEN_INDEX, noindex: true,
      title: `When to Plant ${c.name} in ${placeLabel(place)} (${YEAR}) | Rainline Garden`,
      description: `${plain} Local frost dates, step-by-step instructions and the best varieties for ${ZONE_FOR[place.zone]}.`.slice(0, 300),
      image: PHOTOS["crop:" + c.id] && photoFile("crop:" + c.id, "banner"),
      jsonld: [cb.ld, faqLd(sci ? qas.concat(sci.faq) : qas)],
      body: `${cb.html}
${banner("crop:" + c.id, rel)}
<section class="hero hero-crop">${R.icon(c.id, rel, 120)}<div>
<h1>When to plant ${lc(c.name)} in ${esc(city)}, ${place.state}</h1>
<p class="answer">${answer(c, r, city)}</p>
<p class="meta">${badge(g.difficulty)} <span>${esc(c.how)}</span></p></div></section>
${sci ? `${quickFacts(c, g)}
${jump(sci)}
<h2 id="dates">Why these dates</h2>
<p class="prose">${why(c, r, p)}</p>
<p class="region prose"><strong>${p.zone.name}.</strong> ${p.zone.blurb}</p>
<h2 id="grow">How to grow ${lc(c.name)} in ${esc(city)}</h2>
<div class="grow-grid"><div>${steps(c, r, g)}</div>
${sideCard(g, c.note)}</div>
${ad("cropcity-mid")}
${scienceParts(sci)}
${gearBox(g.gear)}
<h2 id="faq">Common questions</h2>
${faqHtml(qas.concat(sci.faq))}
${relatedArticles(rel, c.id, 4)}` : `<h2>Why these dates</h2>
<p class="prose">${why(c, r, p)}</p>
<p class="region prose"><strong>${p.zone.name}.</strong> ${p.zone.blurb}</p>
${quickFacts(c, g)}
<h2>Step by step</h2>
${steps(c, r, g)}
${ad("cropcity-mid")}
<div class="two">
<section><h2>Varieties that do well here</h2><ul class="vars">${g.varieties.map(v => `<li>${esc(v)}</li>`).join("")}</ul>
<h2>Watch out for</h2><p>${esc(g.problem)}</p><p class="note">${esc(c.note)}</p></section>
${gearBox(g.gear)}
</div>
<h2>Common questions</h2>
<div class="faq">${qas.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
${relatedArticles(rel, c.id)}`}
${newsletter(city)}
${same.length ? `<h2>Also plant in ${esc(city)} around the same time</h2><ul class="chips">${same.map(x => `<li><a href="../../${x.crop.id}/${place.slug}/">${R.icon(x.crop.id, rel, 24)}${x.crop.name}</a></li>`).join("")}</ul>` : ""}
<h2>Planting dates for ${lc(c.name)} in nearby areas</h2>
<ul class="places">${near.map(x => { const w = g.fall ? win(rowFor(x, c.id), "fall") : win(rowFor(x, c.id), "spring"); return `<li><a href="../${x.place.slug}/">${esc(placeLabel(x.place))}</a> <span>${P.fmtRange(w.start, w.end)}</span></li>`; }).join("")}</ul>
<p><a href="../../../frost-dates/${place.slug}/">Full planting calendar for ${esc(city)}</a> · <a href="../">${c.name} in every city</a></p>`
    }), null); // kept for visitors but out of search: these pages mostly repeat the crop guide with local dates
  });
});

/* When-to-plant index */
const wb = crumbs("../", [["When to plant", null]]);
write("../", "when-to-plant/index.html", layout({
  rel: "../", canonical: WHEN_INDEX, current: WHEN_INDEX,
  title: "When to Plant Vegetables, Herbs and Berries in Oregon and Washington | Rainline Garden",
  description: `Planting dates for ${D.crops.length} vegetables, herbs, berries and flowers in 30 Oregon and Washington cities, with difficulty ratings and beginner-friendly growing guides.`,
  jsonld: [wb.ld],
  body: `${wb.html}
<section class="hero"><h1>When to plant vegetables, herbs and berries in the Northwest</h1>
<p class="lede">${D.crops.length} plants in ${D.categories.length} groups. Pick one for its planting dates in every Oregon and Washington city we cover, plus how to grow it. New to this? Start with the ones marked Easy.</p></section>
${categoryTiles("../")}
${cropGrid("../", c => `${c.id}/`)}
${ad("index-bottom")}`
}), "0.9");

/* Category pages */
D.categories.forEach(k => {
  const rel = "../../";
  const kb = crumbs(rel, [["When to plant", WHEN_INDEX], [k.name, null]]);
  const refs = ["portland-or", "seattle-wa", "bend-or", "spokane-wa"].map(slug => P.plan(D, P.findPlace(D, slug)));
  const first = (pl, id) => { const r = rowFor(pl, id); const w = win(r, "spring") || win(r, "fall"); return P.fmtRange(w.start, w.end); };
  const list = k.crops.map(cropById);
  write(rel, `${WHEN_INDEX}${k.id}/index.html`, layout({
    rel, canonical: `${WHEN_INDEX}${k.id}/`, current: WHEN_INDEX,
    title: `When to Plant ${k.name} in Oregon and Washington | Rainline Garden`,
    description: `Planting dates and growing guides for ${list.map(c => lc(c.name)).join(", ")} in Oregon and Washington.`.slice(0, 300),
    jsonld: [kb.ld],
    image: PHOTOS["cat:" + k.id] && photoFile("cat:" + k.id, "banner"),
    body: `${kb.html}
${banner("cat:" + k.id, rel)}
<section class="hero"><h1>When to plant ${k.name.toLowerCase()} in the Northwest</h1>
<p class="lede">${k.blurb} Pick a plant for its dates in every city we cover and a step-by-step growing guide.</p></section>
<ul class="cards cards-sm">${list.map(c => cropCard(rel, c, `../${c.id}/`)).join("")}</ul>
<h2>Planting windows at a glance</h2>
<p class="note">Main planting window in four reference cities. Each plant's page has every city.</p>
<div class="table-wrap"><table class="plan"><thead><tr><th scope="col">Plant</th>${refs.map(r => `<th scope="col">${esc(r.place.city)}</th>`).join("")}</tr></thead><tbody>${list.map(c => `<tr><th scope="row"><a href="../${c.id}/">${c.name}</a></th>${refs.map(r => `<td data-label="${esc(r.place.city)}">${first(r, c.id)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
${ad("category-bottom")}
<h2>Other plant types</h2>
<ul class="chips">${D.categories.filter(x => x.id !== k.id).map(x => `<li><a href="../${x.id}/">${R.icon(x.crops[0], rel, 24)}${x.name}</a></li>`).join("")}</ul>`
  }), "0.8");
});

/* My garden plan */
const gpb = crumbs("../", [["My garden plan", null]]);
write("../", "my-garden/index.html", layout({
  rel: "../", canonical: "my-garden/", current: "my-garden/",
  title: "My Garden Plan: Free Planting Planner for Oregon and Washington | Rainline Garden",
  description: "Pick your town and the plants you want to grow. Get a dated to-do list for the next 12 months, a cheat sheet for each plant and space for notes. Saves on your device, prints cleanly and adds the dates to your calendar.",
  jsonld: [gpb.ld],
  body: `${gpb.html}
<section class="hero"><h1>My garden plan</h1>
<p class="lede">Pick your town and what you want to grow. You get a dated to-do list for the next 12 months, a cheat sheet for each plant and room for notes. It saves on this device as you go, and you can print it or add the dates to your phone's calendar.</p></section>
<form id="gp-form" class="finder" novalidate>
  <div class="field"><label for="gp-zip">ZIP code</label><input id="gp-zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" pattern="[0-9]{5}" placeholder="97214"></div>
  <span class="or">or</span>
  <div class="field field-select"><label for="gp-place">Town</label><select id="gp-place"><option value="">Choose a town</option></select></div>
  <button class="btn" type="submit">Use this town</button>
</form>
<p id="gp-msg" class="msg" role="status" aria-live="polite"></p>
<section id="gp-share" class="gp-share" hidden aria-live="polite"></section>
<details id="gp-pick" class="gp-pick" open><summary><span>What do you want to grow?</span> <span id="gp-count" class="gp-count"></span></summary>
${D.categories.map(k => `<fieldset><legend>${k.name}</legend><div class="gp-opts">${k.crops.map(id => `<label class="gp-opt"><input type="checkbox" value="${id}">${R.icon(id, "../", 28)}<span>${cropById(id).name}</span></label>`).join("")}</div></fieldset>`).join("")}
<p class="gp-pick-foot"><button type="button" class="linkish" id="gp-clear">Clear my plan</button> · Your plan stays in this browser. Nothing is sent to us.</p>
</details>
<section id="gp-out" class="gp-out" aria-live="polite"><p class="empty gp-empty">Choose your town and pick some plants to see your plan.</p></section>${CONFIG.newsletterAction ? `
<template id="gp-alert-tpl"><form action="${esc(CONFIG.newsletterAction)}" method="post" target="_blank" class="gp-alert-form">
<p>Or get an email when frost is on the way in {town}.</p>
<input type="hidden" name="${esc(CONFIG.newsletterTagField)}" value="frost-alert"><input type="hidden" name="${esc(CONFIG.newsletterTagField)}" value="frost-{slug}">
<label for="gp-alert-email" class="sr">Email address</label><input id="gp-alert-email" type="email" name="${esc(CONFIG.newsletterField)}" placeholder="you@example.com" required autocomplete="email">
<button class="btn" type="submit">Email me</button></form></template>` : ""}`,
  scripts: ["data.js", "plan.js", "render.js", "helper-data.js", "garden.js"]
}), "0.8");

/* Beginner's guide */
const bgb = crumbs("../", [["Beginner's guide", null]]);
const starter = [["Raised bed kit (4 × 8 feet)", "raised garden bed kit 4x8"], ["Bagged compost", "organic compost for vegetable garden"], ["Soil thermometer", "soil thermometer garden"], ["Hand trowel and cultivator set", "garden hand tool set"], ["Soaker hose or drip kit", "soaker hose garden"], ["Iron phosphate slug bait", "iron phosphate slug bait"], ["Floating row cover", "floating row cover garden"]];
write("../", "beginners-guide/index.html", layout({
  rel: "../", canonical: "beginners-guide/", current: "beginners-guide/",
  title: "Vegetable Gardening for Beginners in the Pacific Northwest | Rainline Garden",
  description: "A plain-language guide to starting your first vegetable garden in Oregon or Washington: where to put it, what to grow first, when to plant and how to keep slugs away.",
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
${beginnerBox("../", null)}
<div class="guide prose">
<h2><span class="num">5</span> Plant on your local dates</h2>
<p>The biggest beginner mistake here is planting warm-season crops too early. A sunny April week doesn't mean the soil is warm, and tomatoes or beans planted into cold soil sit and sulk or rot. <a href="../">Enter your ZIP in the planner</a> to get dates for where you live.</p>
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
      image: CONFIG.siteUrl + (PHOTOS["article:" + a.slug] ? photoFile("article:" + a.slug, "banner") : "assets/img/og.png"), author: authorLd(a.author || DEFAULT_AUTHOR), publisher: OWNER_LD, mainEntityOfPage: CONFIG.siteUrl + `articles/${a.slug}/` }],
    body: `${ab.html}
<article class="article">
${banner("article:" + a.slug, rel)}
<header class="hero hero-crop">${articleIcon(a, rel, 120)}<div><h1>${esc(a.title)}</h1><p class="lede">${esc(a.description)}</p>
<p class="byline">${avatar(rel, a.author || DEFAULT_AUTHOR)}<span>By <a href="${rel}about/#${a.author || DEFAULT_AUTHOR}">${AUTHORS[a.author || DEFAULT_AUTHOR].name}</a><br><span class="byline-d">Updated <time datetime="${CONFIG.updated}">${new Date(CONFIG.updated + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time></span></span></p></div></header>
<div class="prose">${a.body({ D, P, frost: frostFor, link: p => rel + p })}</div>
${(au => `<aside class="author-box">${avatar(rel, au, "avatar-lg")}<div><h2>About the author</h2><p>${esc(AUTHORS[au].short)}</p><a href="${rel}about/#${au}">More about ${AUTHORS[au].name.split(" ")[0]}</a></div></aside>`)(a.author || DEFAULT_AUTHOR)}
</article>
${ad("article-bottom")}
<h2>Crops in this article</h2>
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
  description: "Practical guides for vegetable gardening in Oregon and Washington: varieties that ripen here, winter gardens, short seasons, slugs and soil temperature.",
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
const CHORES = require("./chores.js");
const MONTH_ICONS = ["potatoes", "onions", "peas", "lettuce", "tomatoes", "beans", "cucumbers", "corn", "winter-squash", "garlic", "cabbage", "kale"];
const CHORE_KINDS = [["plant", "Plant and sow"], ["indoor", "Start indoors"], ["harvest", "Harvest"], ["care", "Garden care"], ["pests", "Pests and problems"], ["perennial", "Fruit, berries and flowers"]];
const REGION_TAGS = { west: "West side", coast: "Coast", east: "East side", high: "High desert and inland" };
// One town stands in for each climate region in the "planting by region" lists.
const REGION_TOWNS = [["west", "portland-or", "West-side valleys"], ["coast", "astoria-or", "Coast"], ["east", "pendleton-or", "Columbia Basin and eastern valleys"], ["high", "bend-or", "High desert"], ["high", "spokane-wa", "Inland Northwest"]];
function monthPlanting(m) {
  const a = P.CUM[m - 1] + 1, b = m < 12 ? P.CUM[m] : 365;
  const overlaps = w => w.start <= b && w.end >= a;
  return REGION_TOWNS.map(([r, slug, label]) => {
    const p = P.plan(D, P.findPlace(D, slug));
    return { r, label, out: p.crops.filter(x => x.windows.some(overlaps)).map(x => x.crop), indoor: p.crops.filter(x => x.indoor && overlaps(x.indoor)).map(x => x.crop) };
  });
}
const articleBySlug = Object.fromEntries(ARTICLES.map(a => [a.slug, a]));
const chip = c => `<a class="mp-crop" href="../when-to-plant/${c.id}/">${R.icon(c.id, "../", 22)}${esc(c.name)}</a>`;
const choreMonth = c => {
  const name = P.MONTHS_LONG[c.m - 1], count = Object.values(c.tasks).reduce((n, t) => n + t.length, 0);
  return `<section class="cm" id="${name.toLowerCase()}" data-m="${c.m}" aria-labelledby="cm-h-${c.m}">
<header class="cm-head">${R.icon(MONTH_ICONS[c.m - 1], "../", 44)}<div><h2 id="cm-h-${c.m}">${name}</h2><p>${esc(c.intro)}</p></div><span class="cm-prog" data-total="${count}"></span></header>
<div class="cm-grid">${CHORE_KINDS.filter(([k]) => c.tasks[k] && c.tasks[k].length).map(([k, label]) => `<div class="cm-card cm-${k}"><h3>${label}</h3><ul>${c.tasks[k].map(([t, r], i) =>
    `<li${r ? ` data-r="${r}"` : ""}><label><input type="checkbox" data-id="${c.m}-${k}-${i}" disabled><span>${esc(t)}${r ? ` <span class="cm-tag cm-tag-${r}">${REGION_TAGS[r]}</span>` : ""}</span></label></li>`).join("")}</ul></div>`).join("")}</div>
<details class="cm-byregion"><summary>What can be planted in ${name}, by region</summary><div class="cm-plant-body">${monthPlanting(c.m).map(x => `<div class="cm-region" data-r="${x.r}"><h4>${x.label}</h4>
${x.out.length ? `<p><span class="cm-k">Outside</span>${x.out.map(chip).join("")}</p>` : `<p class="cm-none">Nothing outside this month.</p>`}
${x.indoor.length ? `<p><span class="cm-k">Indoors</span>${x.indoor.map(chip).join("")}</p>` : ""}</div>`).join("")}
<p class="station">Based on typical frost dates for one town in each region. <a href="../">Use the planner</a> for your exact dates.</p></div></details>
${c.articles.length ? `<p class="cm-reads"><span>Read next:</span> ${c.articles.filter(s => articleBySlug[s]).map(s => `<a href="../articles/${s}/">${articleIcon(articleBySlug[s], "../", 22)}${esc(articleBySlug[s].title)}</a>`).join("")}</p>` : ""}
</section>`;
};
write("../", "garden-calendar/index.html", layout({
  rel: "../", canonical: "garden-calendar/", current: "garden-calendar/",
  title: "Pacific Northwest Garden Calendar: Monthly Chores | Rainline Garden",
  description: "Month-by-month garden chores for Oregon and Washington: what to plant, start indoors, harvest, prune and watch for, with notes for the coast, west side, east side and high desert.",
  body: `
<section class="hero"><h1>Monthly garden chores</h1>
<p class="lede">What to do in a Northwest garden each month: what to plant and start indoors, what to harvest, and the care, pest and pruning jobs that keep things going. Tick jobs off as you go. For exact planting dates where you live, <a href="../">use the planner</a>.</p></section>
<div class="cm-filter" role="group" aria-label="Show jobs for"><span>Show jobs for</span>${[["all", "Everywhere"], ["west", "West side"], ["coast", "Coast"], ["east", "East side"], ["high", "High desert and inland"]].map(([v, l]) => `<button type="button" data-region="${v}" aria-pressed="${v === "all"}">${l}</button>`).join("")}</div>
<div class="cm-tools">
<nav class="cm-months" aria-label="Months">${P.MONTHS.map((m, i) => `<a href="#${P.MONTHS_LONG[i].toLowerCase()}" data-m="${i + 1}">${m}</a>`).join("")}</nav>
</div>
<div id="cm-mine" class="cm-mine" hidden></div>
<div class="cm-list">${CHORES.map(choreMonth).join("")}</div>
<p class="station cm-foot">Region tags: <strong>West side</strong> is the Willamette Valley, Puget Sound and southern Oregon valleys; <strong>Coast</strong> is the outer coast; <strong>East side</strong> is the Columbia Basin and low eastern valleys; <strong>High desert and inland</strong> is Central Oregon, the Klamath Basin and Spokane. Jobs without a tag apply everywhere, a few weeks later the colder your garden is.</p>
${ad("calendar-bottom")}`,
  scripts: ["data.js", "plan.js", "chores.js"]
}), "0.8");

/* How it works */
const z = D.zones;
const zoneRows = Object.keys(z).map(k => `<tr><th scope="row">${z[k].name}</th><td>${P.fmt(P.doy(z[k].anchors.coolEarly))}</td><td>${P.fmt(P.doy(z[k].anchors.coolTrans))}</td><td>${P.fmt(P.doy(z[k].anchors.warmSeed))}</td><td>${P.fmt(P.doy(z[k].anchors.warmTrans))}</td><td>${P.fmtRange(P.doy(z[k].anchors.garlicStart), P.doy(z[k].anchors.garlicEnd))}</td></tr>`).join("");
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
<p>Most stations are at airports. Airports in valley bottoms can run colder than nearby hillsides, and city centers can run warmer. Your own garden may differ by a week or more.</p>
<h2>Planting dates</h2>
<p>Each crop gets the <em>later</em> of two dates:</p>
<ol><li><strong>A regional date</strong> for when the soil is usually ready, based on typical soil warming in each climate region (the table below lists them). Washington areas use the closest matching region.</li>
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
  jsonld: [{ "@context": "https://schema.org", "@type": "AboutPage", name: "About Rainline Garden", url: CONFIG.siteUrl + "about/", publisher: OWNER_LD, mainEntity: Object.keys(AUTHORS).map(id => ({ ...authorLd(id), description: AUTHORS[id].bio })) }],
  body: `<section class="hero prose"><h1>About Rainline Garden</h1>
<p class="lede">A free planting calendar built for Pacific Northwest gardens, not adapted from a national chart.</p></section>
<div class="prose"><p>National planting guides treat the whole country the same way. The Northwest doesn't cooperate: coastal gardens rarely frost but never get hot, west-side valleys have long seasons and cold spring soil, and the high desert can frost in July. Rainline Garden gives each area its own dates, built from NOAA weather records and regional growing research.</p>
<h2>Who writes Rainline Garden</h2>
<p>Two Oregon gardeners with different strengths: Jigmey covers vegetables and planting dates, and Elaine covers soil, perennials, herbs and native plants.</p>
${authorCard("../", "jigmey-dorjee", "Vegetables and planting dates")}
${authorCard("../", "elaine-holloway", "Soil, perennials and native plants")}
<h2>How we make this site</h2>
<ul>
<li><strong>Frost dates</strong> come from NOAA's 1991–2020 climate normals for the weather station nearest each town.</li>
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
  body: `<section class="hero prose"><h1>Privacy policy</h1><p class="lede">Last updated ${CONFIG.updated}.</p></section>
<div class="prose">
<p>Rainline Garden is owned and operated by ${CONFIG.owner} ("we", "us"). This policy explains what happens to your information when you use the site.</p>
<h2>What we collect</h2>
<p>Rainline Garden has no accounts.${CONFIG.newsletterAction ? " If you sign up for the monthly email or frost alerts, your address goes to our email provider and is used only to send that email; every message has an unsubscribe link." : ""} The ZIP code you enter is matched to a city inside your browser and is never sent to our server. Your browser's local storage keeps a few things on your own device: the last city you chose in the planner, your light or dark display choice, the jobs you tick off and the region you pick on the monthly chores page, and your garden plan if you make one on the My garden plan page (the city, the plants you picked, tasks you checked off, bed sizes, your harvest log and your notes). None of it is sent to us. You can clear it by clearing site data in your browser or with the "Clear my plan" link on the plan page.</p>
<p>The plant question helper also runs entirely in your browser. Questions you type into it are answered from data already loaded on the page and are not sent to us or stored.</p>
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
  body: `<section class="hero prose"><h1>Terms of use</h1><p class="lede">Last updated ${CONFIG.updated}.</p></section>
<div class="prose">
<p>Rainline Garden is owned and operated by ${CONFIG.owner}. By using the site you agree to these terms.</p>
<h2>Gardening information</h2>
<p>Planting dates on Rainline Garden are estimates based on 30-year weather averages and university extension guidance. Weather in any given year can be earlier or later, so check your local forecast before planting tender crops. We can't guarantee results and aren't responsible for crop losses.</p>
<h2>Using the site</h2>
<p>You're welcome to use the planner and guides for your own garden, and to link to any page. Please don't copy the site's text, illustrations or data tables wholesale onto another website.</p>
<h2>Links and ads</h2>
<p>The site shows ads and links to other websites, including affiliate links to stores. We don't control those sites and aren't responsible for their content or products. See the <a href="../privacy/">privacy policy</a> for how ads and links use cookies.</p>
<h2>Changes</h2>
<p>We may update these terms; the date above shows the latest version. Questions: <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p></div>`
}), "0.2");

/* 404 (absolute links because it can be served at any path) */
const B = CONFIG.basePath;
fs.writeFileSync(path.join(ROOT, "404.html"), layout({
  rel: B, canonical: "", current: null,
  title: "Page not found | Rainline Garden", description: "That page doesn't exist.",
  body: `<section class="hero prose"><h1>That page doesn't exist.</h1><p class="lede">Try the <a href="${B}">planner</a>, the <a href="${B}when-to-plant/">crop guides</a> or the <a href="${B}frost-dates/">list of cities</a>.</p></section>`
}));

/* Custom domain: GitHub Pages reads the CNAME file. */
const cname = path.join(ROOT, "CNAME");
if (CONFIG.customDomain) fs.writeFileSync(cname, CONFIG.customDomain + "\n");
else if (fs.existsSync(cname)) fs.unlinkSync(cname);

/* Plant helper data: the guide facts the in-browser question box answers from. */
const helperData = {
  crops: Object.fromEntries(Object.entries(G.crops).map(([id, g]) => [id, Object.fromEntries(
    ["difficulty", "sun", "spacing", "depth", "plantText", "firstHarvest", "harvest", "problem", "varieties", "care", "frost"]
      .filter(k => g[k] !== undefined).map(k => [k, g[k]]))])),
  glossary: G.glossary, beginner: G.beginner, beginnerWhy: G.beginnerWhy
};
fs.writeFileSync(path.join(ROOT, "assets/helper-data.js"),
  `/* Generated by scripts/build.js from scripts/guide.js. Do not edit by hand. */\nwindow.RainlineHelperData = ${JSON.stringify(helperData)};\n`);

/* Header search index: plants, towns, articles and pages. Loaded by assets/nav.js the first time search opens. */
const searchIndex = [
  ...D.crops.map(c => ({ t: c.name, s: "Plant · " + (D.categories.find(k => k.crops.includes(c.id)) || {}).name, u: "when-to-plant/" + c.id + "/", k: "crop", c: c.id, i: "assets/img/crops/" + c.id + ".webp" })),
  ...D.places.map(p => ({ t: p.city + ", " + p.state, s: "Frost dates and planting calendar", u: "frost-dates/" + p.slug + "/", k: "town", p: p.slug })),
  ...D.categories.map(k => ({ t: k.name, s: k.crops.length + " plants", u: "when-to-plant/" + k.id + "/", k: "group", i: "assets/img/crops/" + k.crops[0] + ".webp" })),
  ...ARTICLES.map(a => ({ t: a.title, s: "Article", u: "articles/" + a.slug + "/", k: "article", i: a.icon ? "assets/img/topics/" + a.icon + ".svg" : a.crops && a.crops[0] ? "assets/img/crops/" + a.crops[0] + ".webp" : "" })),
  ...G.glossary.map(g => ({ t: g[0], s: "Glossary", u: "glossary/#" + g[1], k: "term" })),
  ...[["", "Planner", "Your local planting calendar"], ["my-garden/", "My garden plan", "Plan, track and print your garden"], ["frost-dates/", "Frost dates by city", "Every town we cover"],
    ["beginners-guide/", "Beginner's guide", "Start your first garden"], ["garden-calendar/", "Monthly chores", "What to do each month"], ["about/", "About", "Who writes Rainline Garden"], ["contact/", "Contact", "Questions and corrections"]]
    .map(([u, t, sub]) => ({ t, s: sub, u, k: "page" }))
];
fs.writeFileSync(path.join(ROOT, "assets/search-index.js"),
  `/* Generated by scripts/build.js. Do not edit by hand. */\nwindow.RainlineSearch = ${JSON.stringify(searchIndex)};\n`);

/* sitemap, robots */
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${CONFIG.siteUrl}${p.loc}</loc><lastmod>${CONFIG.updated}</lastmod><priority>${p.priority}</priority></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.siteUrl}sitemap.xml\n`);
fs.writeFileSync(path.join(ROOT, ".nojekyll"), "");
/* ads.txt: AdSense checks it at the root of the domain, so it only works with a custom domain. */
const adsTxt = path.join(ROOT, "ads.txt");
if (CONFIG.adsenseClient) fs.writeFileSync(adsTxt, `google.com, ${CONFIG.adsenseClient.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`);
else if (fs.existsSync(adsTxt)) fs.unlinkSync(adsTxt);
console.log(`Built ${pages.length} pages.`);
