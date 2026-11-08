/* Where the plant sits in each "crop:<id>" photo of scripts/photos.js, so every cut (headers, cards, phone crops and the
 * round icon) centers on the plant instead of the middle of the frame. [x, y, icon]: x and y are the plant's center as
 * 0-1 fractions of the source width and height; icon is the round icon's size as a fraction of the photo's short side
 * (smaller = closer in). Header and card cuts take the biggest crop of their shape that the photo allows, centered as
 * close to x, y as the edges let them, so they never zoom in more than they must.
 * Set by eye from the source photos on 2026-11-08. After changing, run `node scripts/fetch-photos.js --force`. */
module.exports = {
  apples: [0.36, 0.45, 0.6], artichokes: [0.5, 0.42, 0.95], arugula: [0.5, 0.5, 0.8], "asian-pears": [0.5, 0.5, 0.7],
  asparagus: [0.6, 0.62, 0.8], basil: [0.6, 0.45, 0.8], beans: [0.25, 0.5, 0.95], beets: [0.62, 0.5, 0.9],
  blackberries: [0.48, 0.62, 0.7], blueberries: [0.65, 0.4, 0.7], "bok-choy": [0.55, 0.6, 0.9], broccoli: [0.55, 0.45, 0.7],
  "brussels-sprouts": [0.5, 0.5, 0.6], cabbage: [0.48, 0.45, 0.9], calendula: [0.5, 0.55, 0.6], camas: [0.5, 0.45, 0.95],
  carrots: [0.55, 0.6, 0.9], cauliflower: [0.53, 0.5, 0.5], celery: [0.5, 0.5, 0.8], chard: [0.5, 0.45, 0.8],
  cherries: [0.52, 0.5, 0.6], chives: [0.5, 0.75, 0.5], cilantro: [0.5, 0.6, 0.8], collards: [0.55, 0.55, 0.9],
  corn: [0.52, 0.5, 0.9], cosmos: [0.65, 0.55, 0.6], cucumbers: [0.5, 0.5, 0.8], currants: [0.55, 0.45, 0.8],
  daffodils: [0.5, 0.45, 0.8], dahlias: [0.45, 0.45, 0.75], dill: [0.5, 0.4, 0.75], "douglas-aster": [0.5, 0.45, 0.55],
  eggplant: [0.5, 0.5, 0.8], elderberries: [0.45, 0.3, 0.7], "fava-beans": [0.5, 0.5, 0.8], figs: [0.45, 0.45, 0.6],
  garlic: [0.5, 0.5, 0.7], gooseberries: [0.45, 0.45, 0.7], grapes: [0.58, 0.5, 0.8], "ground-cherries": [0.5, 0.5, 0.75],
  hazelnuts: [0.5, 0.55, 0.8], honeyberries: [0.48, 0.45, 0.5], horseradish: [0.5, 0.5, 0.8], huckleberries: [0.6, 0.55, 0.75],
  kale: [0.5, 0.5, 0.8], kohlrabi: [0.4, 0.7, 0.7], lavender: [0.5, 0.5, 0.7], leeks: [0.6, 0.6, 0.8],
  "lemon-balm": [0.5, 0.5, 0.8], lettuce: [0.5, 0.75, 0.7], mache: [0.5, 0.5, 0.8], marigolds: [0.4, 0.5, 0.6],
  melons: [0.42, 0.62, 0.55], mint: [0.5, 0.5, 0.8], mulberries: [0.45, 0.55, 0.6], "mustard-greens": [0.5, 0.5, 0.9],
  nasturtiums: [0.6, 0.55, 0.8], onions: [0.5, 0.6, 0.8], oregano: [0.5, 0.5, 0.8], "oregon-grape": [0.55, 0.55, 0.55],
  "pacific-ninebark": [0.48, 0.55, 0.6], parsley: [0.6, 0.45, 0.9], parsnips: [0.55, 0.6, 0.8], peaches: [0.48, 0.65, 0.65],
  pears: [0.55, 0.55, 0.7], peas: [0.6, 0.55, 0.75], peonies: [0.45, 0.55, 0.8], peppers: [0.5, 0.72, 0.75],
  persimmons: [0.62, 0.6, 0.7], plums: [0.47, 0.5, 0.6], "pole-beans": [0.6, 0.6, 0.8], potatoes: [0.65, 0.55, 0.6],
  pumpkins: [0.5, 0.5, 0.8], quince: [0.7, 0.68, 0.5], radicchio: [0.82, 0.35, 0.55], radishes: [0.4, 0.5, 0.65],
  ranunculus: [0.5, 0.5, 0.7], raspberries: [0.5, 0.5, 0.7], "red-flowering-currant": [0.5, 0.55, 0.8], rhubarb: [0.5, 0.5, 0.8],
  rosemary: [0.5, 0.55, 0.85], sage: [0.5, 0.5, 0.8], salmonberry: [0.38, 0.55, 0.45], serviceberry: [0.5, 0.5, 0.8],
  shallots: [0.5, 0.55, 0.7], snapdragons: [0.58, 0.45, 0.7], spinach: [0.55, 0.45, 0.75], strawberries: [0.5, 0.6, 0.7],
  "summer-squash": [0.3, 0.4, 0.55], sunflowers: [0.5, 0.38, 0.55], "sweet-peas": [0.5, 0.55, 0.7], "sweet-potatoes": [0.5, 0.5, 0.7],
  thyme: [0.55, 0.55, 0.75], tomatillos: [0.5, 0.5, 0.7], tomatoes: [0.5, 0.5, 0.55], tulips: [0.5, 0.5, 0.8],
  turnips: [0.62, 0.5, 0.8], "western-columbine": [0.4, 0.55, 0.95], "winter-squash": [0.5, 0.5, 0.9], zinnias: [0.5, 0.45, 0.7],
  kinnikinnick: [0.55, 0.45, 0.75], tarragon: [0.5, 0.4, 0.6]
};
