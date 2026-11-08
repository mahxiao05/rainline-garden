/* Small square photos (thumbnails) reused from photos the site already has (scripts/photos.js), for glossary terms and
 * pest cards on plant pages. Only map a key when the photo really shows the thing named. Values: [photo key, caption or ""].
 * CROP sets where the square is cut from the 1200px photo: [center x, center y] as 0-1 fractions, and an optional zoom (1 = full height).
 * After changing, run `node scripts/make-thumbs.js` (needs ImageMagick) and rebuild. */
const glossary = {
  "hard-freeze": "article:frost-dates-explained",
  "start-indoors": "inline:starting-seeds-indoors-1",
  "germination": "article:soil-temperature",
  "row-cover": "inline:short-season-gardening-central-oregon-1",
  "mulch": "inline:planting-bare-root-fruit-trees-1",
  "curing": "article:planting-garlic-in-the-northwest",
  "cover-crop": "article:winter-cover-crops",
  "raised-bed": "article:raised-beds-for-rainy-gardens",
  "pruning": "inline:winter-pruning-apple-and-pear-trees-1",
  "pollinator": "article:native-pollinator-garden",
  "slugs": "article:slugs",
  "aphids": "inline:cabbage-worms-and-aphids-1",
  "cabbage-worms": "article:cabbage-worms-and-aphids"
};
// Pest cards: the first rule whose pattern matches the card heading wins.
const pests = [
  [/cabbage worm|cabbageworm/i, "article:cabbage-worms-and-aphids", "The white butterfly that lays cabbage worm eggs"],
  [/slug/i, "article:slugs", ""],
  [/aphid/i, "inline:cabbage-worms-and-aphids-1", "Aphids on a stem, with a ladybug"]
];
const CROP = {
  "article:cabbage-worms-and-aphids": [0.3, 0.5, 1.1],
  "article:native-pollinator-garden": [0.6, 0.6, 1.6],
  "article:slugs": [0.36, 0.7, 1]
};
module.exports = { glossary, pests, CROP };
