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

const CONFIG = {
  siteName: "Rainline Garden",
  customDomain: "", // e.g. "rainlinegarden.com"; set after buying the domain, then rebuild (see README)
  contactEmail: "xventuresbusiness@gmail.com",
  adsenseClient: "", // e.g. "ca-pub-1234567890123456"; leave empty until AdSense approves the site
  amazonTag: "", // Amazon Associates tracking ID, e.g. "rainline-20"; product links work without it but earn nothing
  newsletterAction: "", // email signup form URL, e.g. "https://buttondown.com/api/emails/embed-subscribe/rainline"; signup boxes stay hidden until set
  newsletterField: "email", // the form field name your email provider expects
  updated: new Date().toISOString().slice(0, 10)
};
CONFIG.siteUrl = CONFIG.customDomain ? `https://${CONFIG.customDomain}/` : "https://mahxiao05.github.io/rainline-garden/";
CONFIG.basePath = new URL(CONFIG.siteUrl).pathname; // "/" on a custom domain, "/rainline-garden/" on GitHub Pages
const YEAR = CONFIG.updated.slice(0, 4);

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

function layout({ rel, title, description, canonical, current, body, scripts, jsonld }) {
  const base = rel; // relative prefix back to the site root, e.g. "../../"
  const nav = [["", "Planner"], ["when-to-plant/", "When to plant"], ["frost-dates/", "Frost dates"], ["garden-calendar/", "Monthly chores"], ["beginners-guide/", "Beginner's guide"]]
    .map(([href, label]) => `<a href="${base}${href}"${current === href ? ' aria-current="page"' : ""}>${label}</a>`).join("");
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
<link rel="canonical" href="${CONFIG.siteUrl}${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${CONFIG.siteUrl}${canonical}">
<meta property="og:image" content="${CONFIG.siteUrl}assets/img/og.png">
<meta property="og:site_name" content="Rainline Garden">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#24374A">
<link rel="icon" href="${base}assets/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@700;800&family=Alegreya+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/style.css">
${ads}
${ld}
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
<p>Rainline Garden: free planting calendars for Oregon and Washington gardens.<br>Frost data from NOAA. Planting timing from OSU Extension guidance. Updated ${CONFIG.updated}.${CONFIG.amazonTag ? "<br>As an Amazon Associate, Rainline Garden earns from qualifying purchases." : ""}</p>
<nav aria-label="Footer"><a href="${base}glossary/">Glossary</a><a href="${base}how-it-works/">How it works</a><a href="${base}about/">About</a><a href="${base}privacy/">Privacy</a></nav>
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

/* Shared pieces */
const lc = n => n === "Swiss chard" ? n : n.toLowerCase();
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

function faqLd(qas) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qas.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}

function cropGrid(rel, linkFor) {
  const groups = [["cool", "Cool-season crops", "Plant in early spring, and many again for fall. They handle light frost."], ["warm", "Warm-season crops", "Plant after the last frost once the soil warms. Frost kills them."], ["fall", "Planted in fall", "Goes in the ground in autumn and is harvested the next summer."]];
  return groups.map(([g, t, d]) => `<h3 class="grid-h">${t}</h3><p class="grid-d">${d}</p><ul class="cards cards-sm">${D.crops.filter(c => c.group === g).map(c =>
    `<li><a class="card" href="${linkFor(c)}">${R.icon(c.id, rel, 56)}<span class="card-t">${c.name}</span>${badge(G.crops[c.id].difficulty)}</a></li>`).join("")}</ul>`).join("");
}

/* Home */
write("", "index.html", layout({
  rel: "", canonical: "", current: "",
  title: "Rainline Garden: Planting Calendar and Frost Dates for Oregon and Washington",
  description: "When to plant vegetables where you live in Oregon and Washington. Enter your ZIP for local frost dates and a planting calendar built from NOAA data and OSU Extension guidance.",
  jsonld: [{ "@context": "https://schema.org", "@type": "WebSite", name: "Rainline Garden", url: CONFIG.siteUrl }],
  body: `
<div class="hero-art"><img src="assets/img/hero.svg" width="1200" height="440" alt="A raised vegetable bed with tomatoes, lettuce and carrots under Northwest mountains and light rain"></div>
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
${beginnerBox("", null)}
${ad("home-mid")}
<section class="browse"><h2>When to plant each crop</h2>
<p>Pick a crop to see its planting dates in all 30 Oregon and Washington cities.</p>
${cropGrid("", c => `when-to-plant/${c.id}/`)}
</section>
${newsletter()}
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
  const tomato = win(rowFor(p, "tomatoes"), "spring");
  const peas = win(rowFor(p, "peas"), "spring");
  const bc = crumbs("../../", [["Frost dates", "frost-dates/"], [placeLabel(place), null]]);
  write("../../", `frost-dates/${place.slug}/index.html`, layout({
    rel: "../../", canonical: `frost-dates/${place.slug}/`, current: "frost-dates/",
    title: `${placeLabel(place)} Frost Dates and Planting Calendar | Rainline Garden`,
    description: `The typical last spring frost in ${placeLabel(place)} is ${P.fmtLong(f.spring50)} and the first fall frost is ${P.fmtLong(f.fall50)}. See when to plant tomatoes, peas, garlic and 18 more crops.`,
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
  if (c.id === "garlic") return `Plant garlic${where} from <strong>${P.fmtRange(fa.start, fa.end)}</strong>. It grows slowly over winter and is ready to dig the next summer.`;
  let s;
  if (r.indoor && c.how === "Plant young plants (starts)")
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
  if (c.id === "garlic") return `Garlic needs a cold winter to form bulbs, so it goes in during fall, after the soil cools but before it freezes hard. In ${city} the first fall frost usually comes around ${P.fmtLong(f.fall50)}.`;
  const last = `${city}'s typical last spring frost is ${P.fmtLong(f.spring50)}.`;
  const anchor = P.doy(p.zone.anchors[c.anchor]);
  if (c.group === "cool") {
    const weeks = Math.round((f.spring50 - sp.start) / 7);
    if (sp.start === anchor) return last + (sp.start < f.spring50
      ? ` As a cool-season crop that handles light frost, this crop doesn't need to wait for that date. ${ZONE_IN[p.place.zone]}, though, the soil usually isn't ready to work until about ${P.fmtLong(sp.start)}.`
      : ` ${ZONE_IN[p.place.zone]}, the soil is usually ready for ${lc(c.name)} around ${P.fmtLong(sp.start)}.`);
    return last + ` As a cool-season crop that handles light frost, this crop can go in about ${weeks} week${weeks === 1 ? "" : "s"} before that.`;
  }
  return last + (sp.start - f.spring50 > 10
    ? ` Frost kills ${lc(c.name)}, and warm-season crops also need warm soil. Soil here stays cold for weeks after the last frost, so planting waits until about ${P.fmtLong(sp.start)}.`
    : ` Frost kills ${lc(c.name)}, so planting starts once frost risk drops, around ${P.fmtLong(sp.start)}.`)
    + (r.cover ? " Keep row cover or a frost blanket handy for the first couple of weeks, since a late frost is still possible." : "")
    + (r.season === "short" ? ` The season here is short for this crop: use young plants rather than seeds, choose the fastest variety you can find, and cover plants on cool nights.` : r.season === "tight" ? " The season is a little tight here, so an early variety is the safer choice." : "");
}

function steps(c, r, g) {
  const sp = win(r, "spring"), fa = win(r, "fall");
  const out = [];
  if (c.id === "garlic") {
    out.push(`Buy seed garlic from a garden center or seed company. Grocery-store garlic is often a variety that doesn't suit Northwest winters.`);
    out.push(`Loosen the soil and mix in an inch or two of compost.`);
    out.push(`Break bulbs into cloves and plant them ${P.fmtRange(fa.start, fa.end)}, ${g.depth}, ${g.spacing}.`);
    out.push(`Cover the bed with a few inches of straw or leaves for winter. Pull weeds in spring and stop watering in early summer when the leaves start to brown.`);
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
  if (fa && c.id !== "garlic") out.splice(out.length - 1, 0, `Plant again ${P.fmtRange(fa.start, fa.end)} for a fall harvest.`);
  return `<ol class="steps">${out.map(s => `<li>${s}</li>`).join("")}</ol>`;
}

function quickFacts(c, g) {
  const rows = [["Difficulty", badge(g.difficulty)], ["Sun", g.sun], ["Spacing", g.spacing], ["Planting depth", g.depth],
    ["Frost", c.group === "warm" ? "Killed by frost" : c.group === "fall" ? "Very hardy; grows through winter" : "Handles light frost"]];
  if (c.days) rows.push(["First harvest", `About ${c.days} days after planting`]);
  return `<dl class="qf">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
}

const WHEN_INDEX = "when-to-plant/";
const ZONE_IN = { coast: "On the coast", west: "In the west-side valleys", east: "In the Columbia Basin and low eastern valleys", inland: "In the Inland Northwest", high: "In the high desert and mountains" };
const ZONE_FOR = { coast: "the Northwest coast", west: "west-side valleys", east: "the Columbia Basin", inland: "the Inland Northwest", high: "the high desert" };
D.crops.forEach(c => {
  const g = G.crops[c.id];
  const plans = D.places.map(pl => P.plan(D, pl));

  /* Crop hub */
  const cols = [["Start seeds indoors", r => r.indoor], ["Plant in the garden", r => win(r, "spring")], [c.id === "garlic" ? "Plant in fall" : "Plant again for fall", r => win(r, "fall")]]
    .filter(([, get]) => plans.some(p => get(rowFor(p, c.id))));
  const head = `<tr><th scope="col">City</th>${cols.map(([l]) => `<th scope="col">${l}</th>`).join("")}</tr>`;
  const rows = plans.slice().sort((a, b) => a.place.state.localeCompare(b.place.state) || a.place.city.localeCompare(b.place.city)).map(p => {
    const r = rowFor(p, c.id);
    return `<tr><th scope="row"><a href="${p.place.slug}/">${esc(placeLabel(p.place))}</a></th>${cols.map(([l, get]) => { const w = get(r); return `<td data-label="${l}">${w ? P.fmtRange(w.start, w.end) : '<span class="none">—</span>'}</td>`; }).join("")}</tr>`;
  }).join("");
  const port = plans.find(p => p.place.slug === "portland-or"), bend = plans.find(p => p.place.slug === "bend-or");
  const hb = crumbs("../../", [["When to plant", WHEN_INDEX], [c.name, null]]);
  write("../../", `when-to-plant/${c.id}/index.html`, layout({
    rel: "../../", canonical: `when-to-plant/${c.id}/`, current: WHEN_INDEX,
    title: `When to Plant ${c.name} in Oregon and Washington, by City | Rainline Garden`,
    description: `${c.name} planting dates for 30 Oregon and Washington cities, from Portland and Seattle to Bend and Spokane, plus a beginner-friendly growing guide.`,
    jsonld: [hb.ld],
    body: `${hb.html}
<section class="hero hero-crop">${R.icon(c.id, "../../", 120)}<div>
<h1>When to plant ${lc(c.name)} in Oregon and Washington</h1>
<p class="lede">${c.id === "garlic" ? "Garlic goes in during fall across the Northwest." : `In Portland: ${answer(c, rowFor(port, c.id), null).replace(/<\/?strong>/g, "")} In Bend: ${P.fmtRange(win(rowFor(bend, c.id), "spring").start, win(rowFor(bend, c.id), "spring").end)}.`} Find your city below.</p></div></section>
${quickFacts(c, g)}
<p class="callout">${esc(c.note)}</p>
<h2>${c.name} planting dates by city</h2>
<div class="table-wrap"><table class="plan"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
${ad("crop-mid")}
<h2>How to grow ${lc(c.name)}</h2>
${steps(c, rowFor(port, c.id), g).replace(/(Start seeds indoors|Plant them in the garden|Plant seeds|Plant seed potatoes|Plant onion sets|Break bulbs into cloves and plant them|Plant again) [A-Z][a-z]{2} \d+(–\d+| – [A-Z][a-z]{2} \d+)/g, "$1 on your city's dates")}
<h2>Varieties that do well in the Northwest</h2>
<ul class="vars">${g.varieties.map(v => `<li>${esc(v)}</li>`).join("")}</ul>
<h2>Watch out for</h2><p>${esc(g.problem)}</p>
${gearBox(g.gear)}
${newsletter()}
<h2>Other crops</h2>
<ul class="chips">${D.crops.filter(x => x.id !== c.id).map(x => `<li><a href="../${x.id}/">${R.icon(x.id, "../../", 24)}${x.name}</a></li>`).join("")}</ul>`
  }), "0.8");

  /* Crop + city */
  plans.forEach(p => {
    const place = p.place, r = rowFor(p, c.id), sp = win(r, "spring"), fa = win(r, "fall"), f = p.frost;
    const city = place.city;
    const rel = "../../../";
    const qas = [[`When is the last frost in ${city}, ${place.state}?`, `Typically ${P.fmtLong(f.spring50)}. In 9 years out of 10, frost is over by ${P.fmtLong(f.spring10)}. These are 1991–2020 NOAA climate normals for ${p.station.name}.`]];
    if (c.id === "garlic") qas.push([`When is garlic ready to harvest in ${city}?`, `Usually in early summer, about eight months after fall planting. ${g.harvest}`]);
    else qas.push([`Is it too late to plant ${lc(c.name)} in ${city}?`, `The spring planting window runs through ${P.fmtLong(sp.end)}. ` + (fa ? `If you miss it, plant again for fall from ${P.fmtLong(fa.start)} to ${P.fmtLong(fa.end)}.` : c.group === "warm" ? `Later plantings may not have time to produce before the first fall frost, which usually arrives around ${P.fmtLong(f.fall50)}.` : `Later plantings tend to struggle in summer heat.`)]);
    if (r.indoor) qas.push([`When should I start ${lc(c.name)} from seed indoors in ${city}?`, `${P.fmtLong(r.indoor.start)} to ${P.fmtLong(r.indoor.end)}, which is ${c.indoor[0]} to ${c.indoor[1]} weeks before the ${P.fmtLong(sp.start)} planting date. Or buy young plants at a garden center instead.`]);
    else if (c.days) qas.push([`How long until I can harvest ${lc(c.name)}?`, `About ${c.days} days after planting. ${g.harvest}`]);
    const ref = c.id === "garlic" ? fa : sp;
    const same = p.crops.filter(x => x.crop.id !== c.id && x.windows.some(w => w.kind === ref.kind && w.start <= ref.end && w.end >= ref.start)).slice(0, 8);
    const near = plans.filter(x => x.place.zone === place.zone && x.place.slug !== place.slug).slice(0, 6);
    const cb = crumbs(rel, [["When to plant", WHEN_INDEX], [c.name, `when-to-plant/${c.id}/`], [city, null]]);
    const plain = answer(c, r, city).replace(/<\/?strong>/g, "");
    write(rel, `when-to-plant/${c.id}/${place.slug}/index.html`, layout({
      rel, canonical: `when-to-plant/${c.id}/${place.slug}/`, current: WHEN_INDEX,
      title: `When to Plant ${c.name} in ${placeLabel(place)} (${YEAR}) | Rainline Garden`,
      description: `${plain} Local frost dates, step-by-step instructions and the best varieties for ${ZONE_FOR[place.zone]}.`.slice(0, 300),
      jsonld: [cb.ld, faqLd(qas)],
      body: `${cb.html}
<section class="hero hero-crop">${R.icon(c.id, rel, 120)}<div>
<h1>When to plant ${lc(c.name)} in ${esc(city)}, ${place.state}</h1>
<p class="answer">${answer(c, r, city)}</p>
<p class="meta">${badge(g.difficulty)} <span>${esc(c.how)}</span></p></div></section>
<h2>Why these dates</h2>
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
${newsletter(city)}
${same.length ? `<h2>Also plant in ${esc(city)} around the same time</h2><ul class="chips">${same.map(x => `<li><a href="../../${x.crop.id}/${place.slug}/">${R.icon(x.crop.id, rel, 24)}${x.crop.name}</a></li>`).join("")}</ul>` : ""}
<h2>Planting dates for ${lc(c.name)} in nearby areas</h2>
<ul class="places">${near.map(x => { const w = c.id === "garlic" ? win(rowFor(x, c.id), "fall") : win(rowFor(x, c.id), "spring"); return `<li><a href="../${x.place.slug}/">${esc(placeLabel(x.place))}</a> <span>${P.fmtRange(w.start, w.end)}</span></li>`; }).join("")}</ul>
<p><a href="../../../frost-dates/${place.slug}/">Full planting calendar for ${esc(city)}</a> · <a href="../">${c.name} in every city</a></p>`
    }), "0.6");
  });
});

/* When-to-plant index */
const wb = crumbs("../", [["When to plant", null]]);
write("../", "when-to-plant/index.html", layout({
  rel: "../", canonical: WHEN_INDEX, current: WHEN_INDEX,
  title: "When to Plant Vegetables in Oregon and Washington | Rainline Garden",
  description: "Planting dates for 21 vegetables in 30 Oregon and Washington cities, with difficulty ratings and beginner-friendly growing guides.",
  jsonld: [wb.ld],
  body: `${wb.html}
<section class="hero"><h1>When to plant vegetables in the Northwest</h1>
<p class="lede">Pick a crop for its planting dates in every Oregon and Washington city we cover, plus how to grow it. New to this? Start with the ones marked Easy.</p></section>
${cropGrid("../", c => `${c.id}/`)}
${ad("index-bottom")}`
}), "0.9");

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
const MONTH_ICONS = ["potatoes", "onions", "peas", "lettuce", "tomatoes", "beans", "cucumbers", "corn", "winter-squash", "garlic", "cabbage", "kale"];
write("../", "garden-calendar/index.html", layout({
  rel: "../", canonical: "garden-calendar/", current: "garden-calendar/",
  title: "Pacific Northwest Garden Calendar: Monthly Chores | Rainline Garden",
  description: "Month-by-month vegetable garden chores for Oregon and Washington, from seed ordering in January to garlic planting in October.",
  body: `
<section class="hero"><h1>Monthly garden chores</h1>
<p class="lede">What to do in a Northwest vegetable garden each month. For exact planting dates where you live, <a href="../">use the planner</a>.</p></section>
<div class="months-list">${D.chores.map(c => `<section class="month" data-m="${c.m}"><h2>${R.icon(MONTH_ICONS[c.m - 1], "../", 40)}${c.title}</h2><ul>${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
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
<p>The site is free and supported by advertising and affiliate links. It isn't affiliated with NOAA, Oregon State University or Washington State University.</p>
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
<p>Rainline Garden has no accounts.${CONFIG.newsletterAction ? " If you sign up for the monthly email, your address goes to our email provider and is used only to send that email; every message has an unsubscribe link." : ""} The ZIP code you enter is matched to a city inside your browser and is never sent to our server. The planner remembers the last city you chose in your browser's local storage so it's ready next time; you can clear it by clearing site data in your browser.</p>
<h2>Advertising</h2>
<p>This site uses Google AdSense to show ads. Google and its partners use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads">Google Ads Settings</a>, and learn more at <a href="https://policies.google.com/technologies/ads">How Google uses information from sites that use its services</a>.</p>
<h2>Affiliate links</h2>
<p>Some links to products go to Amazon.${CONFIG.amazonTag ? " As an Amazon Associate, Rainline Garden earns from qualifying purchases, at no extra cost to you." : ""} Amazon may set its own cookies when you follow them.</p>
<h2>Hosting and fonts</h2>
<p>The site is hosted on GitHub Pages, which may log visitor IP addresses for security. Fonts load from Google Fonts.</p>
<h2>Contact</h2>
<p>Questions about this policy: <a href="mailto:${CONFIG.contactEmail}">${CONFIG.contactEmail}</a>.</p></div>`
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

/* sitemap, robots */
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${CONFIG.siteUrl}${p.loc}</loc><lastmod>${CONFIG.updated}</lastmod><priority>${p.priority}</priority></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.siteUrl}sitemap.xml\n`);
fs.writeFileSync(path.join(ROOT, ".nojekyll"), "");
console.log(`Built ${pages.length} pages.`);
