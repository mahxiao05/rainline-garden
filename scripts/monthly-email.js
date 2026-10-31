#!/usr/bin/env node
/* Builds the monthly "what to plant now" email for each climate region, from the site's own data.
 *
 *   node scripts/monthly-email.js            # this month (Pacific time)
 *   node scripts/monthly-email.js --month 3  # March
 *
 * Writes the markdown issue body to stdout. The monthly-email GitHub Action posts it as an issue
 * so the drafts can be pasted into MailerLite and sent (the free MailerLite plan can't send custom
 * content through its API).
 *
 * Everything in the email comes from assets/data.js (NOAA frost dates and the regional planting
 * windows) and scripts/chores.js. One town stands in for each region, the same towns the
 * "what can be planted, by region" lists on the monthly chores page use.
 */
const D = require("../assets/data.js");
const P = require("../assets/plan.js");
const CHORES = require("./chores.js");

const SITE = "https://rainlinegarden.org/";

// MailerLite group name (= the site's climate region name), stand-in town, and chores tag.
const REGIONS = [
  { zone: "west", town: "portland-or", tag: "west" },
  { zone: "coast", town: "astoria-or", tag: "coast" },
  { zone: "east", town: "pendleton-or", tag: "east" },
  { zone: "inland", town: "spokane-wa", tag: "high" },
  { zone: "high", town: "bend-or", tag: "high" }
];
const KINDS = [["harvest", "Harvest"], ["care", "Garden care"], ["pests", "Pests and problems"], ["perennial", "Fruit, berries and flowers"]];

function pacificMonth() {
  return +new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", month: "numeric" }).format(new Date());
}

function regionEmail(m, r) {
  const place = P.findPlace(D, r.town);
  const zone = D.zones[r.zone];
  const month = P.MONTHS_LONG[m - 1];
  const a = P.CUM[m - 1] + 1, b = m < 12 ? P.CUM[m] : 365;
  const overlaps = w => w.start <= b && w.end >= a;
  const p = P.plan(D, place);
  const out = p.crops.filter(x => x.windows.some(overlaps)).map(x => x.crop);
  const indoor = p.crops.filter(x => x.indoor && overlaps(x.indoor)).map(x => x.crop);
  const chores = CHORES.find(c => c.m === m);
  const forRegion = list => (list || []).filter(([, tag]) => !tag || tag === r.tag).map(([t]) => t);
  const crop = c => `${c.name} (${SITE}when-to-plant/${c.id}/)`;

  const lines = [];
  lines.push(`Hi! Here's your ${month} planting reminder for the ${zone.name} region.`, "");
  if (chores) lines.push(chores.intro, "");
  lines.push(`PLANT OR SOW OUTSIDE IN ${month.toUpperCase()}`);
  lines.push(...(out.length ? out.map(c => `- ${crop(c)}`) : ["- Nothing goes in the ground outside this month."]), "");
  if (indoor.length) lines.push(`START INDOORS IN ${month.toUpperCase()}`, ...indoor.map(c => `- ${crop(c)}`), "");
  if (chores) {
    KINDS.forEach(([k, label]) => {
      const t = forRegion(chores.tasks[k]);
      if (t.length) lines.push(label.toUpperCase(), ...t.map(x => `- ${x}`), "");
    });
  }
  lines.push(`These dates use typical frost dates for ${place.city}, ${place.state} from NOAA climate normals. Dates in your own town can be different, so look up your town for exact dates: ${SITE}`);
  lines.push(`All of ${month}'s garden jobs: ${SITE}garden-calendar/${month.toLowerCase()}/`);
  return { group: zone.name, subject: `What to plant in ${month}: ${zone.name}`, text: lines.join("\n") };
}

function issueBody(m) {
  const month = P.MONTHS_LONG[m - 1];
  const emails = REGIONS.map(r => regionEmail(m, r));
  const parts = [
    `@mahxiao05 here are the ${month} planting emails, one per MailerLite group.`,
    "",
    "**To send each one:** in MailerLite go to Campaigns, Create campaign, Regular. Paste the subject, pick the group named below as the recipients, add a text block in the editor, paste the email text, and send. On github.com, each grey box has a copy button in its corner. Close this issue when all " + emails.length + " are sent.",
    ""
  ];
  emails.forEach(e => {
    parts.push(`### Group: ${e.group}`, "", "Subject:", "```text", e.subject, "```", "Email text:", "```text", e.text, "```", "");
  });
  parts.push("_Built from the site's NOAA frost data and monthly chores list by scripts/monthly-email.js._");
  return parts.join("\n");
}

if (require.main === module) {
  const i = process.argv.indexOf("--month");
  const m = i > 0 ? +process.argv[i + 1] : pacificMonth();
  if (!(m >= 1 && m <= 12)) { console.error("--month must be 1-12"); process.exit(1); }
  process.stdout.write(issueBody(m) + "\n");
}

module.exports = { regionEmail, issueBody, REGIONS };
