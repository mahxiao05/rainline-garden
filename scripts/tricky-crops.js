/* Deeper help for the crops that are hard to ripen in the Northwest (demo: tomatoes, peppers, melons).
 * Three parts per crop, shown on its plant page right after the regional notes:
 *   why:     short reasons it's tricky here (list, one line each)
 *   stretch: season stretchers in the order you'd do them, as [when, what], one sentence each
 *   stages:  "signs something's going wrong", as [stage, [[what you see, cause, fix], ...]]
 * Every fact comes from Oregon State, Washington State or University of Idaho extension guides, or repeats what the
 * page already says. Leave a point out rather than guess, and don't repeat what Pests and problems already covers.
 * Plain text only (escaped when rendered), and never cite sources by name, same as scripts/crop-notes.js. */
module.exports = {
  tomatoes: {
    why: [
      "Flowers drop without setting fruit when nights fall below about 55°F or days top 90°F.",
      "West of the Cascades, fall rain and late blight often arrive while most of the crop is still green.",
      "Big heirlooms need a long, warm summer. Varieties that ripen in 60 to 70 days are safer here."
    ],
    stretch: [
      ["Start indoors", "Hang the grow light 2 to 4 inches above the seedlings, on 12 to 16 hours a day."],
      ["1 to 2 weeks before planting", "Lay black plastic tight against smooth soil; loose plastic keeps the soil cooler."],
      ["Planting day", "Wait for 60°F soil. In cold gardens, a wall-o-water protects down to about 20°F."],
      ["Mid-August", "Pinch off new flowers and tiny fruit so the plant ripens what's already on the vine."],
      ["A month before first frost", "Cut off the tips of the main stems and stop fertilizing."],
      ["When fall rain starts", "Cover plants with clear plastic, or pick full-size green fruit to ripen indoors at 65 to 70°F."]
    ],
    stages: [
      ["Seedlings", [
        ["Tall, thin seedlings that flop over", "not enough light", "lower the light to 2 to 4 inches and add a small fan."],
        ["Purple undersides on the leaves", "cold roots can't take up phosphorus", "keep them warm; leaves green up once the soil warms."]
      ]],
      ["First weeks in the ground", [
        ["Plant sits still for weeks", "cold soil or nights below 50°F", "black plastic and a wall-o-water, or plant later next year."]
      ]],
      ["Flowering", [
        ["Flowers dry up and fall off", "nights below 55°F, days above 90°F, or dry soil", "water steadily; in cool spells, shake the flower clusters at midday."]
      ]],
      ["Fruit", [
        ["Fruit stalls at orange in a heat wave", "red color barely forms above 85°F", "pick at first blush and ripen on the counter."]
      ]],
      ["Fall", [
        ["Lots of green fruit, frost on the way", "fruit set too late", "ripen the big ones indoors; next year pinch flowers in mid-August."]
      ]]
    ]
  },
  peppers: {
    why: [
      "Peppers want nights of 60 to 70°F. Some varieties won't flower below 60°F.",
      "Flowers drop when nights fall below about 58°F or days top 85°F.",
      "Each pepper needs 45 to 55 days from flower to harvest, and 15 to 20 more in cool areas."
    ],
    stretch: [
      ["Start indoors", "Hang the grow light 2 to 4 inches above the seedlings, on 12 to 16 hours a day."],
      ["The week before planting", "Harden plants off for a full week so the leaves don't scald."],
      ["1 to 2 weeks before planting", "Lay black plastic tight against smooth soil."],
      ["Planting day", "Wait for 70°F soil 3 to 4 inches down, then cover the row with low hoops and row cover."],
      ["Hot days under cover", "Open the tunnel ends once it's above 90°F inside."],
      ["East of the Cascades", "Use shade cloth or a spot with late-afternoon shade so fruit doesn't scald."]
    ],
    stages: [
      ["First weeks in the ground", [
        ["Plants sit still and look pale", "cold soil and nights", "black plastic and a row cover tunnel."],
        ["White, papery patches on the leaves", "sunscald, skipped hardening off", "new growth will be fine; harden off longer next time."]
      ]],
      ["Flowering", [
        ["Flowers drop off", "nights below 58°F, days above 85°F, dry soil or wind", "even watering and a row cover."],
        ["Few or no flowers", "below 60°F, or under six hours of sun", "move pots to your sunniest, warmest spot."]
      ]],
      ["Fruit", [
        ["Pale, papery patch on the sunny side", "sunscald", "afternoon shade cloth; don't strip leaves that shade fruit."],
        ["Dark, sunken patch at the bottom", "blossom-end rot from uneven water or too much nitrogen", "water evenly and ease off nitrogen."]
      ]],
      ["Fall", [
        ["Peppers stay green for weeks", "cool weather", "pick them full size; ones with some color finish on the counter."]
      ]]
    ]
  },
  melons: {
    why: [
      "Seeds rot in cold soil. Melons need 65°F soil and nights above 55°F, often not until June on the west side.",
      "Roots don't like being disturbed, so a rough transplant can stunt a plant all summer.",
      "Bees must reach each female flower, so covers have to come off just when you'd like plants warm."
    ],
    stretch: [
      ["Pick the variety", "Choose ones that ripen in 75 to 100 days unless you're in a hot east-side valley."],
      ["About 4 weeks before planting", "Start seeds in individual pots so roots aren't torn at planting."],
      ["1 to 2 weeks before planting", "Lay black plastic tight against smooth soil."],
      ["Planting day", "Sow at 65°F soil or transplant at 70°F, then cover with row cover or a clear tunnel."],
      ["When female flowers open", "Take the covers off so bees can pollinate, usually 4 to 6 weeks after planting."],
      ["Summer", "Water with drip or a soaker hose under the plastic to keep leaves dry."]
    ],
    stages: [
      ["Sowing and first weeks", [
        ["Seeds never come up", "cold soil rotted them", "wait for 65°F soil or start in pots."],
        ["Plants look stunted", "root damage at transplanting, or cold", "plant young, from single pots, and keep covered until flowering."]
      ]],
      ["Flowering", [
        ["Lots of flowers, no little melons", "the first flowers are all male", "normal; female flowers follow in a week or so."],
        ["Tiny melons turn yellow and drop", "not fully pollinated", "make sure covers are off once female flowers open."]
      ]],
      ["Fall", [
        ["Melons still unripe in September", "too many set too late", "keep only a few melons per vine, and grow earlier varieties."]
      ]]
    ]
  }
};
