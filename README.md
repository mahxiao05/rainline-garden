# Rainline Garden

Free planting calendars and frost dates for Oregon and Washington gardens.

Live site: https://mahxiao05.github.io/rainline-garden/

## How it's built

Plain HTML, CSS and JavaScript, with no framework and no build tools to install beyond Node.

- `assets/data.js`: all the data (NOAA frost dates, regional planting anchors, crops, cities, monthly chores), with sources noted at the top.
- `assets/plan.js`: the planting-date rules.
- `assets/render.js`: turns a plan into HTML (used by both the browser and the builder).
- `assets/app.js`: the ZIP/city planner, the live "plant now" lists and the frost warning. The warning asks the National Weather Service forecast (api.weather.gov, public domain) for each town's `lat`/`lon` in `assets/data.js`, and shows only in the gardening season when a night in the next three days is forecast at 34°F or colder.
- `assets/crop.js`: "Your dates" on crop guides, for the town saved on this device.
- `assets/glossary.js`: glossary search and topic buttons. Terms live in `scripts/guide.js` with a topic; `GLOSSARY_SEE` in `scripts/build.js` links a term to a guide.
- `assets/img/`: the crop and topic illustrations, all drawn for this site, and the social share image (`og.jpg`: the homepage photo with the logo).
- Logo and icons: `assets/icon.svg` is the logo. `favicon.ico`, `apple-touch-icon.png` and `assets/icon-{96,192,512}.png` are PNG copies of it for Google results, phones and home screens; redraw them if the logo changes.
- `assets/img/photos/`: real photos for the homepage, category pages, crop guide pages and article headers, all from Pexels or Unsplash (free licenses). The list lives in `scripts/photos.js`; after changing it run `node scripts/fetch-photos.js` (needs curl and ImageMagick) to download and resize them, then rebuild.
- `scripts/articles.js`: the hand-written articles. Add one by copying an entry; it gets its own page, a spot on the articles page and links from related crop pages.
- `scripts/guide.js`: growing-guide text per crop (difficulty, spacing, varieties, gear), the beginner picks and the glossary.
- `scripts/build.js`: generates every page (home, 30 city pages, 28 crop guides, 840 crop-by-city pages, articles, beginner's guide, glossary, monthly chores, how it works, about, privacy, sitemap).
- `data/noaa_freeze_normals.csv`: the raw NOAA 1991-2020 freeze normals used.

## Author and owner

Authors (Jigmey Dorjee, Elaine Holloway) live in `AUTHORS` in `scripts/build.js`; each article picks one with its `author` field in `scripts/articles.js`. Only list credentials the person actually holds. The footer, policies and structured data name `CONFIG.owner` (X Ventures LLC).

## Plants and categories

Crops are in `assets/data.js` (timing) and `scripts/guide.js` (growing guide). Every crop must belong to one entry in `categories` in `assets/data.js`, and needs an icon at `assets/img/crops/{id}.svg`. Crop-by-city pages are marked noindex and left out of the sitemap because they mostly repeat the crop guide with local dates; the crop, category and city pages are what search engines index.

## Making changes

1. Edit `assets/data.js` (or the page text in `scripts/build.js`).
2. Run `node scripts/build.js`.
3. Commit and push. GitHub Pages republishes in a minute or two.

## Turning on ads

1. Set up the custom domain first (see below). AdSense won't approve a `github.io` project address because it can't check `ads.txt` at the domain root. Then add the domain in AdSense.
2. Put your publisher ID in `CONFIG.adsenseClient` in `scripts/build.js` (looks like `ca-pub-...`) and rebuild. The build also writes `ads.txt` with your publisher ID.
3. Auto ads will place ads on their own. To use fixed spots, paste AdSense ad unit code into the empty `<div class="ad-slot">` blocks (they're hidden until they contain something).
4. In AdSense, open Privacy & messaging and turn on the European regulations (GDPR) consent message. Google requires a certified consent banner for visitors in the EEA, UK and Switzerland, and this one is free.

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
