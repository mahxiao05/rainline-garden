#!/usr/bin/env node
/* Builds the monthly "what to plant now" email as HTML, one file per MailerLite group (climate region).
 * This is the approved format (max, 2026-11-09): site-style header, the month's photo on top,
 * a frost/rain/count row, plant photo tiles with dates, garden job cards, one "Read next" article
 * and a "Find your town" button. No author notes.
 *
 *   node scripts/monthly-email-html.js --month 12 --out /tmp/emails
 *
 * Writes <out>/<month>-<zone>.html plus <out>/<month>-subjects.json. Every fact comes from
 * assets/data.js (NOAA frost dates, planting windows), scripts/climate-normals.js (NOAA rain),
 * scripts/chores.js and the article list. Images load from the live site, so only use photos
 * that are deployed. Nothing here sends email.
 */
const fs = require("fs");
const path = require("path");
const D = require("../assets/data.js");
const P = require("../assets/plan.js");
const CHORES = require("./chores.js");
const CLIMATE = require("./climate-normals.js");
const ARTICLES = require("./articles-5.js").concat(require("./articles-4.js"), require("./articles-3.js"), require("./articles-2.js"), require("./articles.js"));
const { REGIONS } = require("./monthly-email.js");

const S = "https://rainlinegarden.org";
const IMG = S + "/assets/img/photos/";
const PHOTO_DIR = path.join(__dirname, "..", "assets", "img", "photos");

// Header photo for each month = that month's article photo (max approved the set 2026-11-09).
const MONTH_PHOTO = ["winter-pruning-apple-and-pear-trees", "planting-bare-root-fruit-trees", "starting-seeds-indoors",
  "growing-peas-in-the-northwest", "best-tomatoes-for-the-northwest", "growing-strawberries-in-the-northwest",
  "growing-blueberries-in-the-northwest", "harvesting-and-preserving-herbs", "fall-and-winter-vegetable-garden",
  "planting-garlic-in-the-northwest", "leaf-mold-from-fall-leaves", "putting-the-garden-to-bed"];
// "Read next" article for each month (never the same as the header photo's article).
const READ_NEXT = ["crop-rotation-for-small-gardens", "starting-seeds-indoors", "soil-temperature", "hardening-off-seedlings",
  "succession-planting", "watering-vegetables-in-dry-summers", "fall-and-winter-vegetable-garden", "tomato-late-blight",
  "planting-garlic-in-the-northwest", "winter-cover-crops", "composting-in-a-rainy-climate", "raised-beds-for-rainy-gardens"];
const KINDS = [["harvest", "Harvest", "🧺"], ["care", "Garden care", "🍂"], ["pests", "Pests and problems", "🐌"], ["perennial", "Fruit, berries and flowers", "🍓"]];

const FIR = "#173B2E", MOSS = "#1F5C45", INK = "#1B2420", MUTED = "#58625C", LINE = "#DED9CC", BG = "#FAF7F0", OCHRE = "#C2603A", LIME = "#C6F06A", SAND = "#F5EEDF";
const DISP = "'Cormorant Garamond',Georgia,'Times New Roman',serif", SANS = "Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const hasPhoto = f => fs.existsSync(path.join(PHOTO_DIR, f));

function range(a, b) {
  const fa = P.fmt(a), fb = P.fmt(b);
  const [ma, da] = fa.split(" "), [mb, db] = fb.split(" ");
  return ma === mb ? `${ma} ${da}–${db}` : `${fa} – ${fb}`;
}

function tiles(list, verb) {
  const cell = x => {
    const photo = `crop-${x.crop.id}-720.jpg`;
    const img = hasPhoto(photo) ? `<tr><td><img src="${IMG}${photo}" width="262" alt="${esc(x.crop.name)}" style="display:block;width:100%;height:auto;border-radius:10px 10px 0 0"></td></tr>` : `<tr><td style="background:${MOSS};height:8px;border-radius:10px 10px 0 0;font-size:0;line-height:0">&nbsp;</td></tr>`;
    return `<td width="50%" valign="top" style="padding:6px">
<a href="${S}/when-to-plant/${x.crop.id}/" style="text-decoration:none;color:${INK}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid ${LINE};border-radius:10px;overflow:hidden">
${img}
<tr><td style="padding:10px 12px 12px;font-family:${SANS}"><div style="font-size:16px;font-weight:700;color:${FIR}">${esc(x.crop.name)}</div>
<div style="font-size:13px;color:${MUTED};margin-top:2px">${verb} ${x.dates}</div></td></tr></table></a></td>`;
  };
  let rows = "";
  for (let i = 0; i < list.length; i += 2) rows += `<tr>${cell(list[i])}${list[i + 1] ? cell(list[i + 1]) : `<td width="50%" style="padding:6px"></td>`}</tr>`;
  return `<tr><td style="padding:4px 18px 10px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>`;
}

const sectionTitle = (t, sub) => `<tr><td class="pad" style="padding:0 24px 8px"><div style="font-family:${DISP};font-size:28px;font-weight:600;color:${FIR}">${t}</div>${sub ? `
<div style="font-family:${SANS};font-size:14px;color:${MUTED};margin-top:4px">${sub}</div>` : ""}</td></tr>`;

function jobCard(label, icon, items) {
  const li = items.map(x => `<tr><td valign="top" style="padding:0 10px 8px 0;color:${MOSS};font-size:15px">•</td><td style="padding:0 0 8px;font-size:15px;line-height:1.5;color:${INK}">${esc(x)}</td></tr>`).join("");
  return `<tr><td style="padding:0 24px 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid ${LINE};border-radius:10px">
<tr><td style="padding:16px 18px 8px;font-family:${SANS}"><div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${OCHRE};margin-bottom:10px">${icon}&nbsp; ${label}</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:${SANS}">${li}</table></td></tr></table></td></tr>`;
}

const stat = (big, small) => `<td width="33%" align="center" style="padding:14px 6px;font-family:${SANS}"><div style="font-family:${DISP};font-size:30px;font-weight:600;color:${FIR};line-height:1">${big}</div><div style="font-size:12px;color:${MUTED};margin-top:6px">${small}</div></td>`;

function regionHtml(m, r) {
  const place = P.findPlace(D, r.town);
  const zone = D.zones[r.zone];
  const month = P.MONTHS_LONG[m - 1];
  const a = P.CUM[m - 1] + 1, b = m < 12 ? P.CUM[m] : 365;
  const overlaps = w => w.start <= b && w.end >= a;
  const p = P.plan(D, place);
  const out = p.crops.filter(x => x.windows.some(overlaps)).map(x => { const w = x.windows.find(overlaps); return { crop: x.crop, dates: range(w.start, w.end) }; });
  const indoor = p.crops.filter(x => x.indoor && overlaps(x.indoor)).map(x => ({ crop: x.crop, dates: range(x.indoor.start, x.indoor.end) }));
  const chores = CHORES.find(c => c.m === m);
  const forRegion = list => (list || []).filter(([, tag]) => !tag || tag === r.tag).map(([t]) => t);

  // Headline = the chores intro's first sentence; the rest is the lede, unless it talks about only
  // the west-side valleys, in which case other regions get their own town's frost date instead.
  const intro = chores ? chores.intro : "";
  const cut = intro.indexOf(". ");
  const headline = cut > 0 ? intro.slice(0, cut) : month;
  let lede = cut > 0 ? intro.slice(cut + 2) : intro;
  if (/west-side valleys/i.test(lede) && r.zone !== "west") {
    const f = p.frost, inMonth = d => d >= a && d <= b;
    lede = inMonth(f.fall50) ? `In ${place.city} the first fall frost usually comes around ${P.fmt(f.fall50)}, so finish harvesting tender crops.`
      : f.fall50 < a ? `${place.city}'s first fall frost usually comes around ${P.fmt(f.fall50)}, so tender crops are done for the year.`
      : `${place.city}'s first fall frost usually comes around ${P.fmt(f.fall50)}.`;
  }

  // Stat row: plant count, the frost date that matters this month, the month's rain (NOAA normals).
  const f = p.frost, cl = CLIMATE[place.station] || {};
  // Show whichever frost comes next from the start of this month (spring's last frost, then fall's first).
  const springNext = a <= f.spring50 || a > f.fall50;
  const frostStat = springNext ? stat(P.fmt(f.spring50), `${esc(place.city)}'s last spring frost`) : stat(P.fmt(f.fall50), `${esc(place.city)}'s first fall frost`);
  const rain = cl.mprcp ? stat(`${cl.mprcp[m - 1].toFixed(1)} in`, `${month} rain`) : "";
  const count = out.length ? stat(String(out.length), "things to plant now") : indoor.length ? stat(String(indoor.length), "to start indoors") : "";

  const photoSlug = MONTH_PHOTO[m - 1];
  const rn = ARTICLES.find(x => x.slug === READ_NEXT[m - 1]);
  const rnPhoto = `article-${rn.slug}-720.jpg`;

  const jobs = chores ? KINDS.map(([k, label, icon]) => { const t = forRegion(chores.tasks[k]); return t.length ? jobCard(label, icon, t) : ""; }).join("\n") : "";
  const preheader = `${headline}: ${out.length ? `${out.length} things to plant now` : "what to start and do now"}, plus your ${month} garden jobs.`;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>What to plant in ${month}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Inter:wght@400;700&display=swap" rel="stylesheet">
<style>@media (max-width:520px){.col{display:block!important;width:100%!important}.pad{padding-left:16px!important;padding-right:16px!important}.h1{font-size:34px!important}}</style></head>
<body style="margin:0;padding:0;background:${BG}">
<div style="display:none;max-height:0;overflow:hidden">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}"><tr><td align="center" style="padding:20px 10px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
<tr><td style="background:${FIR};border-radius:14px 14px 0 0;padding:14px 24px" class="pad">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td valign="middle"><a href="${S}/" style="text-decoration:none"><img src="${S}/assets/icon-192.png" width="34" height="34" alt="" style="vertical-align:middle;border-radius:8px"> <span style="font-family:${DISP};font-size:24px;font-weight:600;color:#fff;vertical-align:middle">&nbsp;Rainline Garden</span></a></td>
<td align="right" valign="middle" style="font-family:${SANS};font-size:12px;color:#BFDCCB">${esc(zone.name)}</td></tr></table></td></tr>
<tr><td style="background:${FIR}"><img src="${IMG}article-${photoSlug}-1200.jpg" width="600" alt="" style="display:block;width:100%;height:auto"></td></tr>
<tr><td class="pad" style="background:${FIR};padding:22px 24px 26px;font-family:${SANS}">
<div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${LIME}">Your ${month} planting guide</div>
<div class="h1" style="font-family:${DISP};font-size:40px;font-weight:600;line-height:1.05;color:#fff;margin:8px 0 10px">${esc(headline)}</div>
<div style="font-size:16px;line-height:1.55;color:#DCEBE2">${esc(lede)}</div></td></tr>
<tr><td style="background:#fff;border-left:1px solid ${LINE};border-right:1px solid ${LINE}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${LINE}"><tr>
${count}${frostStat}${rain}</tr></table></td></tr>
<tr><td style="background:${SAND};border-left:1px solid ${LINE};border-right:1px solid ${LINE};padding:22px 0 8px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${out.length ? sectionTitle("Plant this month", "Tap a plant for spacing, depth and dates for your own town.") + tiles(out, "Plant") : sectionTitle("Plant this month", "Nothing goes in the ground outside this month.")}
${indoor.length ? sectionTitle("Start indoors") + tiles(indoor, "Start") : ""}
</table></td></tr>
${jobs ? `<tr><td style="background:${BG};border-left:1px solid ${LINE};border-right:1px solid ${LINE};padding:22px 0 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td class="pad" style="padding:0 24px 14px"><div style="font-family:${DISP};font-size:28px;font-weight:600;color:${FIR}">${month} garden jobs</div></td></tr>
${jobs}
</table></td></tr>` : ""}
<tr><td class="pad" style="background:#fff;border:1px solid ${LINE};border-bottom:0;padding:22px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
${hasPhoto(rnPhoto) ? `<td class="col" width="160" valign="top" style="padding:0 16px 10px 0"><a href="${S}/articles/${rn.slug}/"><img src="${IMG}${rnPhoto}" width="150" alt="" style="display:block;width:100%;max-width:150px;border-radius:8px"></a></td>` : ""}
<td class="col" valign="top" style="font-family:${SANS}"><div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${OCHRE}">Read next</div>
<a href="${S}/articles/${rn.slug}/" style="display:block;font-family:${DISP};font-size:22px;font-weight:600;color:${FIR};text-decoration:none;margin:4px 0">${esc(rn.title)}</a>
<div style="font-size:14px;line-height:1.5;color:${MUTED}">${esc(rn.description)}</div></td></tr></table></td></tr>
<tr><td class="pad" align="center" style="background:${FIR};padding:26px 24px;font-family:${SANS}">
<div style="font-family:${DISP};font-size:24px;font-weight:600;color:#fff;margin-bottom:6px">Dates for your own town</div>
<div style="font-size:14px;color:#BFDCCB;margin-bottom:16px">These use ${esc(place.city)}'s NOAA frost dates. Dates in your own town can be different.</div>
<a href="${S}/" style="display:inline-block;background:${LIME};color:${FIR};font-family:${SANS};font-size:15px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px">Find your town</a>&nbsp;&nbsp;<a href="${S}/garden-calendar/${month.toLowerCase()}/" style="display:inline-block;background:#2A5A47;color:#fff;font-family:${SANS};font-size:15px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px">All ${month} jobs</a></td></tr>
<tr><td class="pad" align="center" style="padding:18px 24px 6px;font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED}">
Frost and rain from NOAA 1991–2020 climate normals.<br>You get this because you signed up at <a href="${S}/" style="color:${MUTED}">rainlinegarden.org</a>. <a href="{$unsubscribe}" style="color:${MUTED}">Unsubscribe</a></td></tr>
</table></td></tr></table></body></html>`;
  return { zone: r.zone, group: zone.name, subject: out.length || indoor.length ? `${headline}: what to plant in ${month}` : `${headline}: your ${month} garden`, html };
}

if (require.main === module) {
  const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
  const m = +(arg("--month") || new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", month: "numeric" }).format(new Date()));
  const outDir = arg("--out") || ".";
  if (!(m >= 1 && m <= 12)) { console.error("--month must be 1-12"); process.exit(1); }
  fs.mkdirSync(outDir, { recursive: true });
  const all = REGIONS.map(r => regionHtml(m, r));
  all.forEach(e => fs.writeFileSync(path.join(outDir, `${String(m).padStart(2, "0")}-${e.zone}.html`), e.html));
  fs.writeFileSync(path.join(outDir, `${String(m).padStart(2, "0")}-subjects.json`), JSON.stringify(all.map(({ zone, group, subject }) => ({ zone, group, subject })), null, 2));
  console.log(all.map(e => `${e.group}: ${e.subject}`).join("\n"));
}

module.exports = { regionHtml };
