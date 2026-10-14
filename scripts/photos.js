/* Real photos used on the site. All come from Pexels (Pexels license) or Unsplash (Unsplash license):
 * free for commercial use, no attribution required, though each photo is credited in its caption anyway.
 * Never use a photo of a person to stand in for one of the authors.
 *
 * Fields: src ("pexels:<id>" or "unsplash:<id>"), alt, focus (crop gravity: Center, North, South, East, West...).
 * Keys: "hero", "cat:<category id>", "article:<article slug>".
 * After adding or changing one, run `node scripts/fetch-photos.js` (downloads and resizes into assets/img/photos/)
 * and then `node scripts/build.js`. */
module.exports = {
  "hero": { src: "unsplash:1591857177580-dc82b9ac4e1e", alt: "A raised vegetable bed full of lettuce and flowering chives in a green backyard garden", focus: "Center" },

  "cat:salad-greens": { src: "pexels:12233423", alt: "Heads of butterhead lettuce growing close together" },
  "cat:cabbage-family": { src: "pexels:28669551", alt: "Bok choy plants growing in a garden bed" },
  "cat:root-vegetables": { src: "pexels:1268101", alt: "A hand holding freshly pulled carrots with soil still on them" },
  "cat:onion-family": { src: "pexels:2920402", alt: "Freshly harvested white garlic bulbs with their stems" },
  "cat:peas-and-beans": { src: "pexels:768090", alt: "Open green pea pods on a white wooden table" },
  "cat:summer-vegetables": { src: "pexels:5685910", alt: "Red tomatoes ripening on the vine" },
  "cat:squash-and-melons": { src: "pexels:4750381", alt: "A zucchini plant with yellow flowers and a young squash" },
  "cat:herbs": { src: "pexels:4750311", alt: "Rosemary, curry plant and basil growing in a wooden crate" },
  "cat:berries-and-perennials": { src: "pexels:16678046", alt: "Ripe and unripe strawberries hanging from the plant" },
  "cat:flowers": { src: "unsplash:1597848212624-a19eb35e2651", alt: "A tall sunflower in bloom against a blue sky", focus: "Center" },

  "article:planting-garlic-in-the-northwest": { src: "pexels:10258187", alt: "A pile of cured garlic bulbs" },
  "article:starting-seeds-indoors": { src: "pexels:7728008", alt: "Young seedlings in a black seed-starting tray" },
  "article:growing-blueberries-in-the-northwest": { src: "pexels:5273297", alt: "Blueberries ripening on a leafy bush" },
  "article:growing-strawberries-in-the-northwest": { src: "pexels:6810986", alt: "A ripe strawberry hanging among green leaves" },
  "article:native-pollinator-garden": { src: "pexels:9057698", alt: "A bee feeding on a white coneflower" },
  "article:winter-cover-crops": { src: "pexels:623375", alt: "Clover leaves covering the ground" },
  "article:watering-vegetables-in-dry-summers": { src: "pexels:16229115", alt: "Water spraying from a hose over garden plants in evening light" },
  "article:raised-beds-for-rainy-gardens": { src: "unsplash:1591857177580-dc82b9ac4e1e", alt: "A raised vegetable bed full of lettuce and chives", focus: "Center" },
  "article:growing-potatoes-in-the-northwest": { src: "pexels:10854385", alt: "Two hands holding freshly dug potatoes covered in soil" },
  "article:container-vegetable-gardening": { src: "pexels:1437424", alt: "A basil plant growing in a terracotta pot" },
  "article:frost-dates-explained": { src: "pexels:34425610", alt: "Frost on the leaves of a garden plant on a winter morning" },
  "article:hardening-off-seedlings": { src: "pexels:7728883", alt: "Seedlings growing in a tray of small cells" },
  "article:soil-ph-and-lime": { src: "pexels:15182672", alt: "Hands holding dark garden soil" },
  "article:growing-peas-in-the-northwest": { src: "pexels:8633667", alt: "Hands opening a fresh pea pod" },
  "article:tomato-late-blight": { src: "pexels:5561311", alt: "Green and red tomatoes on a leafy tomato plant" },
  "article:succession-planting": { src: "pexels:89267", alt: "Long rows of lettuce growing in a field" },
  "article:growing-dahlias-in-the-northwest": { src: "pexels:369433", alt: "A pink ball dahlia in bloom" },
  "article:best-tomatoes-for-the-northwest": { src: "pexels:7745029", alt: "Ripe red tomatoes on a tall plant in a greenhouse" },
  "article:fall-and-winter-vegetable-garden": { src: "pexels:9465758", alt: "Wet kale leaves in a cool-season garden" },
  "article:short-season-gardening-central-oregon": { src: "pexels:12276256", alt: "Young plants coming up in long rows of soil" },
  "article:slugs": { src: "pexels:12916722", alt: "An orange slug crawling across a leaf" },
  "article:soil-temperature": { src: "pexels:5277393", alt: "Two sprouts pushing up through dark soil" }
};
