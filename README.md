# Rainline Garden

Free planting calendars and frost dates for Oregon and Washington gardens.

Live site: https://mahxiao05.github.io/rainline-garden/

## How it's built

Plain HTML, CSS and JavaScript, with no framework and no build tools to install beyond Node.

- `assets/data.js`: all the data (NOAA frost dates, regional planting anchors, crops, cities, monthly chores), with sources noted at the top.
- `assets/plan.js`: the planting-date rules.
- `assets/render.js`: turns a plan into HTML (used by both the browser and the builder).
- `assets/app.js`: the ZIP/city planner and live "plant now" lists.
- `assets/img/`: the crop illustrations, homepage scene and social share image (`og.png`), all drawn for this site.
- `scripts/articles.js`: the hand-written articles. Add one by copying an entry; it gets its own page, a spot on the articles page and links from related crop pages.
- `scripts/guide.js`: growing-guide text per crop (difficulty, spacing, varieties, gear), the beginner picks and the glossary.
- `scripts/build.js`: generates every page (home, 30 city pages, 28 crop guides, 840 crop-by-city pages, articles, beginner's guide, glossary, monthly chores, how it works, about, privacy, sitemap).
- `data/noaa_freeze_normals.csv`: the raw NOAA 1991-2020 freeze normals used.

## Making changes

1. Edit `assets/data.js` (or the page text in `scripts/build.js`).
2. Run `node scripts/build.js`.
3. Commit and push. GitHub Pages republishes in a minute or two.

## Turning on ads

1. In AdSense, add the site (`mahxiao05.github.io/rainline-garden` or your custom domain).
2. Put your publisher ID in `CONFIG.adsenseClient` in `scripts/build.js` (looks like `ca-pub-...`) and rebuild.
3. Auto ads will place ads on their own. To use fixed spots, paste AdSense ad unit code into the empty `<div class="ad-slot">` blocks (they're hidden until they contain something).

## Affiliate links

Product links ("What you'll need") go to Amazon search results. To earn commission, join Amazon Associates, put your tracking ID in `CONFIG.amazonTag` in `scripts/build.js` (looks like `rainline-20`) and rebuild. The site then adds Amazon's required disclosure automatically.

## Email signup

Signup boxes stay hidden until an email provider is connected. With Buttondown (free to start): create an account, then set `CONFIG.newsletterAction` to `https://buttondown.com/api/emails/embed-subscribe/YOUR-USERNAME` and rebuild. Other providers work too; set `CONFIG.newsletterField` if their form uses a field name other than `email`.

## Visitor stats

Sign up at goatcounter.com (free, no cookies), pick a code such as `rainline`, put it in `CONFIG.goatcounterCode` in `scripts/build.js` and rebuild. Stats then show at https://YOUR-CODE.goatcounter.com, and the privacy page updates itself.

## Custom domain

1. Buy the domain (for example rainlinegarden.com).
2. Set `CONFIG.customDomain` in `scripts/build.js` and rebuild. This writes the `CNAME` file and switches canonical links and the sitemap to the new domain.
3. Commit and push, then add the DNS records GitHub lists under Settings → Pages.
