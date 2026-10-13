# Rainline Garden

Free planting calendars and frost dates for Oregon and Washington gardens.

Live site: https://mahxiao05.github.io/rainline-garden/

## How it's built

Plain HTML, CSS and JavaScript, with no framework and no build tools to install beyond Node.

- `assets/data.js`: all the data (NOAA frost dates, regional planting anchors, crops, cities, monthly chores), with sources noted at the top.
- `assets/plan.js`: the planting-date rules.
- `assets/render.js`: turns a plan into HTML (used by both the browser and the builder).
- `assets/app.js`: the ZIP/city planner and live "plant now" lists.
- `scripts/build.js`: generates every page (home, 30 city pages, frost-date index, monthly chores, how it works, about, privacy, sitemap).
- `data/noaa_freeze_normals.csv`: the raw NOAA 1991-2020 freeze normals used.

## Making changes

1. Edit `assets/data.js` (or the page text in `scripts/build.js`).
2. Run `node scripts/build.js`.
3. Commit and push. GitHub Pages republishes in a minute or two.

## Turning on ads

1. In AdSense, add the site (`mahxiao05.github.io/rainline-garden` or your custom domain).
2. Put your publisher ID in `CONFIG.adsenseClient` in `scripts/build.js` (looks like `ca-pub-...`) and rebuild.
3. Auto ads will place ads on their own. To use fixed spots, paste AdSense ad unit code into the empty `<div class="ad-slot">` blocks (they're hidden until they contain something).

## Custom domain

Add a `CNAME` file with the domain, set the DNS records GitHub lists, then update `CONFIG.siteUrl` in `scripts/build.js` and rebuild so canonical links and the sitemap use the new domain.
