/* "Plants for..." pages built from the plant data: shade, deer, pots and fall planting.
 * Each page: a short label for links, search title, heading, description, intro paragraphs, which plants (a list of ids, or `pick`, a rule the
 * build applies), a short note per plant, and three questions. Plain text only (escaped when rendered).
 * Keep the deer and pot lists in step with DEER_OK and POT in assets/quiz.js. */
const DEER = {
  garlic: "Strong-smelling; deer leave it alone.", onions: "Pungent leaves deer avoid.", leeks: "Pungent leaves deer avoid.",
  shallots: "Pungent leaves deer avoid.", chives: "Oniony leaves deer avoid.", rosemary: "Resinous, aromatic leaves.",
  thyme: "Aromatic and low; rarely browsed.", oregano: "Aromatic leaves deer avoid.", lavender: "Strongly scented; one of the most reliable.",
  mint: "Strong scent deer avoid.", sage: "Fuzzy, aromatic leaves.", "lemon-balm": "Lemon-scented leaves deer avoid.",
  tarragon: "Aromatic leaves deer avoid.", dill: "Strong-scented, feathery leaves.", horseradish: "Hot, bitter leaves.",
  daffodils: "Poisonous bulbs and leaves; deer and rodents won't touch them.", peonies: "Rarely browsed.", snapdragons: "Bitter leaves; seldom browsed.",
  marigolds: "Pungent leaves deer usually skip.", rhubarb: "Poisonous leaves.", potatoes: "Leaves are toxic to deer.",
  "fava-beans": "Usually left alone.", "oregon-grape": "Spiny, holly-like leaves.", "sword-fern": "Tough fronds deer rarely eat.",
  "oregon-iris": "Tough, grassy leaves deer pass over.", kinnikinnick: "Leathery leaves; seldom browsed."
};
const POT = ["lettuce", "spinach", "arugula", "chard", "mache", "radicchio", "mustard-greens", "kale", "collards", "bok-choy", "kohlrabi",
  "radishes", "carrots", "beets", "turnips", "onions", "garlic", "shallots", "peas", "beans", "tomatoes", "peppers", "eggplant", "ground-cherries", "celery",
  "basil", "cilantro", "parsley", "dill", "chives", "mint", "rosemary", "thyme", "oregano", "lavender", "sage", "tarragon", "lemon-balm", "sorrel",
  "strawberries", "blueberries", "figs", "zinnias", "sweet-peas", "tulips", "daffodils", "nasturtiums", "marigolds", "calendula", "ranunculus",
  "snapdragons", "western-columbine", "kinnikinnick"];
const POT_SIZE = {
  "salad-greens": "A pot or window box at least 6 inches deep.", "cabbage-family": "A pot at least 12 inches wide and deep.",
  "root-vegetables": "A pot at least 12 inches deep; short varieties for carrots.", "onion-family": "A pot at least 8 inches deep.",
  "peas-and-beans": "A pot at least 12 inches deep, with a trellis for climbers.", "summer-vegetables": "A pot of 5 gallons or more in full sun.",
  herbs: "A pot 8 to 12 inches wide with drainage holes.", "perennial-vegetables": "A pot at least 10 inches wide.",
  flowers: "A pot at least 8 inches deep.", "native-plants": "A pot at least 12 inches wide with fast-draining mix.",
  strawberries: "A pot, strawberry jar or hanging basket about 8 inches deep.", blueberries: "A 15- to 20-gallon pot of acidic potting mix.",
  figs: "A 15- to 25-gallon pot; move it to shelter in hard freezes.", tomatoes: "A pot of 5 gallons or more; bush or cherry types.",
  mint: "A pot of its own, so it can't spread.", "sweet-peas": "A pot at least 12 inches deep, with a trellis."
};

module.exports = [
  {
    slug: "shade-plants",
    label: "Shade plants",
    title: "Shade Plants for Oregon and Washington Gardens",
    h1: "What grows in shade in a Northwest garden",
    description: "Vegetables, herbs, berries and native plants that grow in part or full shade in Oregon and Washington, with planting dates for every town.",
    intro: [
      "Most vegetables want six or more hours of direct sun, but a shady Northwest yard isn't a lost cause. Leafy crops, many herbs and a long list of native plants grow in part shade, which usually means three to six hours of direct sun or bright, dappled light under high branches.",
      "Leaves are the part shade-tolerant crops grow best: lettuce, chard, kale and other greens. Fruit and roots slow down in shade, so expect smaller harvests of berries and root crops. Deep shade under evergreens suits natives like sword fern, salal and Oregon grape far better than any vegetable.",
      "Shade also means slower-drying soil and more slugs, so give shady beds good drainage, space plants for airflow and start slug control early. In hot eastern valleys, afternoon shade is a gift for lettuce, spinach and other greens that bolt in heat."
    ],
    // Shade that only applies east of the mountains (celery, honeyberries) doesn't count.
    pick: (c, g) => /part shade|light shade|full shade|afternoon shade in summer|Part to full shade/i.test(g.sun) && !/east of the Cascades/.test(g.sun),
    note: (c, g) => g.sun,
    faq: [
      ["What vegetables grow in shade?", "Leafy crops are the best bet: lettuce, spinach, chard, kale, collards, arugula and mustard greens grow in part shade. Peas and some herbs manage too. Fruiting crops like tomatoes, squash and peppers need full sun."],
      ["How many hours of sun is part shade?", "Usually three to six hours of direct sun a day, or bright, filtered light all day. Under three hours is full shade, where natives like sword fern and salal do better than vegetables."],
      ["What native plants grow in dry shade under trees?", "Sword fern, salal, Oregon grape and evergreen huckleberry all handle the dry shade under Northwest conifers once established. Water them through their first two summers."]
    ]
  },
  {
    slug: "deer-resistant-plants",
    label: "Deer-resistant plants",
    title: "Deer-Resistant Plants for Oregon and Washington Gardens",
    h1: "Deer-resistant plants for Northwest gardens",
    description: "Vegetables, herbs, flowers and native plants that deer usually leave alone in Oregon and Washington gardens, with planting dates for every town.",
    intro: [
      "Black-tailed deer on the west side and mule deer to the east browse gardens across the Northwest. No plant is truly deer-proof: a hungry deer in a dry August or a hard winter will try almost anything, and young plants are always at more risk. But some plants are reliably low on the menu.",
      "The plants here have strong scents, bitter or toxic leaves, or tough, fuzzy or spiny foliage. Onion-family crops, most Mediterranean herbs, daffodils and several natives fall into that group. Lettuce, beans, peas, tulips, roses and fruit trees are the opposite: deer favorites that need a fence.",
      "For a vegetable garden in deer country, a fence is the only sure protection; deer can clear about 8 feet when they want to. Planting deer-resistant herbs and flowers around the outside of a fenced bed, and in unfenced front yards, gives you a garden deer mostly walk past."
    ],
    ids: Object.keys(DEER),
    note: c => DEER[c.id],
    faq: [
      ["What vegetables won't deer eat?", "Garlic, onions, leeks, shallots and potatoes are rarely eaten, and rhubarb leaves are poisonous to them. Most other vegetables, especially lettuce, beans and peas, need a fence."],
      ["Are any flowers deer-proof?", "None are fully deer-proof, but daffodils come close because every part is poisonous. Lavender, peonies, snapdragons and marigolds are seldom browsed."],
      ["How high does a deer fence need to be?", "About 8 feet for a reliable barrier. Two shorter fences a few feet apart, or a fence that leans outward, can also work because deer avoid jumping into tight spaces."]
    ]
  },
  {
    slug: "container-plants",
    label: "Plants for pots",
    title: "What to Grow in Pots in Oregon and Washington",
    h1: "What to grow in pots in the Northwest",
    description: "Vegetables, herbs, berries and flowers that grow well in containers on a Northwest balcony or patio, with pot sizes and planting dates for every town.",
    intro: [
      "A balcony, patio or doorstep is enough for a real harvest. Herbs, salad greens, strawberries and cherry tomatoes all grow well in pots, and a few larger plants, like blueberries and figs, can live in big containers for years.",
      "Bigger pots are easier: they hold more water and don't swing between soggy and bone-dry. Use potting mix, not garden soil, and make sure every pot has drainage holes. Pots dry out quickly in summer, even in the cool west-side climate, so plan on watering every day or two in July and August.",
      "Put sun-lovers like tomatoes, peppers and basil in your sunniest spot, ideally against a south or west wall that holds heat. Greens and parsley are fine with a few hours of sun. In winter, raise pots on feet so they drain, and group perennial pots against the house in hard freezes."
    ],
    ids: POT,
    note: c => POT_SIZE[c.id] || POT_SIZE[c.cat] || "",
    faq: [
      ["What vegetables are easiest to grow in pots?", "Lettuce, radishes, chard, bush beans, cherry tomatoes and herbs like basil, chives and parsley. Start with one or two and a large pot."],
      ["How big a pot does a tomato need?", "At least 5 gallons, and bigger is better. Choose bush, dwarf or cherry varieties, put the pot in full sun and water often in summer."],
      ["Can I grow blueberries in a pot?", "Yes, in a 15- to 20-gallon pot of acidic potting mix. Compact varieties do best. Water with rainwater when you can, since hard tap water raises the pH over time."]
    ]
  },
  {
    slug: "fall-planting",
    label: "Fall planting",
    title: "What to Plant in Fall in Oregon and Washington",
    h1: "What to plant in fall in Oregon and Washington",
    description: "Garlic, spring bulbs, fall greens and other crops to plant in late summer and fall in Oregon and Washington, with dates for every town.",
    intro: [
      "Fall is the second planting season in the Northwest. Late summer is the time to sow greens, roots and cabbage-family crops that grow through the cool fall, and October and November are the months for garlic, shallots and spring-flowering bulbs that need winter cold.",
      "Fall crops are timed backward from the first frost and the shortening days, not forward from spring. That's why the windows below end earlier than you might expect: a carrot sown in September has too little light left to size up. West of the Cascades, mild winters let many of these crops hold in the garden into winter.",
      "Fall is also the best time to plant many shrubs and native plants on the west side, because winter rain waters them in while the roots grow. East of the Cascades, where the ground freezes hard, spring planting is safer for shrubs and trees."
    ],
    pick: (c, g, port) => port.windows.some(w => w.kind === "fall"),
    fallNote: true,
    faq: [
      ["When should I plant garlic in the Northwest?", "From about October to mid-November on the west side, and a few weeks earlier in the high desert. Plant cloves pointed end up, about 2 inches deep."],
      ["What vegetables can I plant in August?", "Kale, collards, lettuce, spinach, arugula, mustard greens, mâche, radishes and turnips sown or set out in August grow into fall. Carrots and beets need to go in a little earlier, by late July or early August."],
      ["When do I plant tulips and daffodils?", "After the soil cools in fall, usually October and November on the west side. They need weeks of winter chill to bloom in spring."]
    ]
  }
];
