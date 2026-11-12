/* Deeper help for the crops that are hard to ripen in the Northwest (demo: tomatoes, peppers, melons).
 * Three parts per crop, shown on its plant page right after the regional notes:
 *   why:     short reasons it's tricky here (list)
 *   stretch: season stretchers in the order you'd do them, as [when, what]
 *   stages:  "signs something's going wrong", as [stage, [[what you see, likely cause, what to do], ...]]
 * Every fact comes from Oregon State, Washington State or University of Idaho extension guides, or repeats what the
 * page already says. Leave a point out rather than guess. "#pests" in a fix links to the Pests and problems section.
 * Plain text only (escaped when rendered), and never cite sources by name, same as scripts/crop-notes.js. */
module.exports = {
  tomatoes: {
    why: [
      "Flowers fall off without setting fruit when nights drop below about 55°F. West of the Cascades that's normal into June, and on the coast and in high towns it can last most of the summer.",
      "Days over about 90°F stop fruit set too, so east-side gardens can stall in a July heat wave.",
      "West of the Cascades, the fall rains that bring late blight often arrive while most of the crop is still green.",
      "Big heirlooms like Brandywine need a long, warm summer to ripen. Early varieties that mature in 60 to 70 days are the safer bet in most of the region."
    ],
    stretch: [
      ["Start indoors", "Grow seedlings under a light hung 2 to 4 inches above the leaves, on for 12 to 16 hours a day. A sunny window alone usually gives tall, weak plants."],
      ["1 to 2 weeks before planting", "Lay black plastic over the bed. Rake the soil smooth first and pull the plastic tight so it touches the soil. Loose plastic shades the ground and keeps it cooler."],
      ["Planting day", "Wait until the soil is about 60°F. In cold or high-elevation gardens, set a wall-o-water around each plant. Closed up, it protects down to about 20°F. Take it off before the plant gets crowded inside."],
      ["Summer", "In dry or hot weather, soak the soil with at least an inch of water every 7 to 10 days. Steady watering prevents most blossom-end rot and cracking."],
      ["Mid-August", "Pinch off new flowers and tiny fruit. They won't ripen before frost, and removing them sends the plant's energy into the tomatoes already on the vine."],
      ["About a month before your first fall frost", "Cut off the growing tips of the main stems and stop fertilizing. Plants ripen faster once they stop putting out new growth."],
      ["When fall rain starts", "Cover plants with clear plastic to keep the leaves dry, or pick the full-size green tomatoes and ripen them indoors at 65 to 70°F."]
    ],
    stages: [
      ["Seedlings", [
        ["Tall, thin seedlings that flop over", "Not enough light", "Lower the light to 2 to 4 inches above the plants and leave it on 12 to 16 hours. A small fan blowing across them makes stems sturdier."],
        ["Purple undersides on the leaves", "Usually cold roots. In cold soil the plant can't take up phosphorus well", "Keep seedlings warmer and don't plant out early. Leaves usually turn green again once the soil warms."]
      ]],
      ["First weeks in the ground", [
        ["The plant just sits there for weeks", "Cold soil and nights below about 50°F", "Use black plastic and a wall-o-water, and next year plant a little later. A transplant set out in warm soil often catches up with one planted weeks earlier."]
      ]],
      ["Flowering", [
        ["Flowers dry up and fall off", "Nights below about 55°F, days above about 90°F, or dry soil", "Keep watering steady and wait for the weather to even out. In cool spells, tap or gently shake the flower clusters around midday on sunny days to help them pollinate."]
      ]],
      ["Fruit", [
        ["Dark, leathery patch on the bottom", "Blossom-end rot from uneven watering", "See blossom-end rot under Pests and problems.#pests"],
        ["Splits around the top", "Heavy rain or watering after a dry spell", "See cracking under Pests and problems.#pests"],
        ["Fruit stalls at orange in a heat wave", "Red color barely forms above about 85°F", "Nothing is wrong. Pick at first blush and finish ripening on the counter."]
      ]],
      ["Late summer and fall", [
        ["Dark, greasy blotches on leaves and stems after the first rain", "Late blight", "See late blight under Pests and problems.#pests"],
        ["Lots of green fruit and frost on the way", "Fruit set too late in the summer", "Pick the full-size green ones to ripen indoors. Next year, pinch off new flowers in mid-August."]
      ]]
    ]
  },
  peppers: {
    why: [
      "Peppers grow best with days of 70 to 80°F and nights of 60 to 70°F. Some varieties won't even flower when it's below 60°F.",
      "Flowers drop without setting fruit when nights fall below about 58°F or days climb above about 85°F, so both cool west-side nights and east-side heat waves cost you peppers.",
      "Each pepper takes 45 to 55 days from flower to harvest, and 15 to 20 days longer in cool areas. Flowers that open late in summer often don't have time to finish.",
      "On the coast, peppers usually need a cloche, low tunnel or greenhouse to produce well."
    ],
    stretch: [
      ["Start indoors", "Grow seedlings under a light hung 2 to 4 inches above the leaves, on for 12 to 16 hours a day."],
      ["The week before planting", "Harden plants off for a full week, a few more hours outside each day. Plants that skip this often get bleached, scalded leaves in the first sunny spell."],
      ["1 to 2 weeks before planting", "Lay black plastic over smooth, raked soil and pull it tight so it touches the ground. It warms both the soil and the air around the plants."],
      ["Planting day", "Wait until a soil thermometer pushed 3 to 4 inches down reads about 70°F. Cover the row with low hoops and row cover or clear plastic, kept off the leaves."],
      ["Warm days under cover", "Open the ends of the tunnel when it gets above 90°F inside, then close them again in the evening."],
      ["Summer", "Water deeply and evenly so the soil never fully dries out. Go easy on nitrogen; if you feed after fruit sets, calcium nitrate is a good choice because it also helps prevent blossom-end rot."],
      ["East of the Cascades", "Put up shade cloth or plant where the plants get late-afternoon shade, so ripening fruit doesn't scald."],
      ["Late summer", "Pick some peppers green to keep the plants producing, and leave a few to color up."]
    ],
    stages: [
      ["Seedlings", [
        ["Tall, thin seedlings that flop over", "Not enough light", "Lower the light to 2 to 4 inches above the plants and leave it on 12 to 16 hours."]
      ]],
      ["First weeks in the ground", [
        ["Plants sit still and look pale", "Cold soil and cool nights", "Black plastic and a row cover tunnel. Peppers usually take off once nights warm up."],
        ["White or tan papery patches on the leaves", "Sunscald on plants that weren't hardened off", "Give new transplants a week of hardening off. Damaged leaves won't recover, but new growth will be fine."]
      ]],
      ["Flowering", [
        ["Flowers drop off", "Nights below about 58°F, days above about 85°F, dry soil, or wind", "Keep the soil evenly moist. A row cover cuts wind and adds warmth."],
        ["Few or no flowers at all", "Temperatures below 60°F, or less than six hours of sun a day", "Move pots to your sunniest, warmest spot, or try that spot next year."]
      ]],
      ["Fruit", [
        ["Pale, soft or papery patch on the side facing the sun", "Sunscald from hot afternoon sun", "Shade cloth in the afternoon, and avoid pruning leaves that shade the fruit."],
        ["Dark, sunken patch at the bottom", "Blossom-end rot, from uneven watering or too much nitrogen", "Water evenly and cut back on high-nitrogen fertilizer."]
      ]],
      ["Late summer and fall", [
        ["Peppers stay green for weeks", "Cool weather slows ripening", "That's normal here. Pick them full size; green peppers are just unripe, not bad. Ones with some color often finish on the counter."]
      ]]
    ]
  },
  melons: {
    why: [
      "Seeds rot rather than sprout in cold soil. Melons need soil of 65°F or more and nights averaging above 55°F, often not until June west of the Cascades.",
      "Their roots don't like being disturbed, so a rough transplant can stunt a plant for the whole summer.",
      "Bees have to carry pollen to each female flower, and a flower that isn't fully pollinated often drops its fruit. Covers have to come off right when you'd most like to keep plants warm.",
      "The Oregon and Washington coast is usually too cool for melons outdoors."
    ],
    stretch: [
      ["Pick the variety", "Choose short-season varieties that ripen in 75 to 100 days or less. Only grow big, long-season watermelons if you're in a hot east-side valley."],
      ["About 4 weeks before planting", "Start seeds indoors in individual pots, one plant per pot, so the roots aren't torn apart at planting time. Watermelons often do better sown straight in the ground."],
      ["1 to 2 weeks before planting", "Lay black plastic over smooth, raked soil and pull it tight so it touches the ground."],
      ["Planting day", "Sow seeds once the soil is 65°F. For transplants, wait until it's about 70°F, 3 to 4 inches down. Cover with floating row cover or a clear plastic tunnel. With black plastic and a clear cover, you can plant a week or two earlier."],
      ["When female flowers open", "Take the covers off. Female flowers have a tiny melon at the base, and bees need to reach them. This is usually 4 to 6 weeks after planting."],
      ["Summer", "Water with a soaker hose or drip under the plastic so the leaves stay dry, which helps keep mildew down."],
      ["As fruit nears ripe", "Water less. Heavy watering at the end makes melons watery and can split them."]
    ],
    stages: [
      ["Sowing", [
        ["Seeds never come up", "Cold soil; the seed rotted", "Wait for 65°F soil, or start seeds indoors in pots."]
      ]],
      ["First weeks in the ground", [
        ["Plants sit still or look stunted", "Root damage at transplanting, or cold soil", "Plant young seedlings from individual pots without breaking up the roots, and keep them under cover until they flower."]
      ]],
      ["Flowering", [
        ["Lots of flowers but no little melons", "The first flowers are all male", "Normal. Female flowers usually follow a week or so later."],
        ["Tiny melons turn yellow and drop", "Not fully pollinated", "Make sure the covers are off once female flowers open, and grow flowers nearby that bees visit."]
      ]],
      ["Fruit", [
        ["Melons ripen but taste watery", "Too much water near the end", "See bland fruit under Pests and problems.#pests"]
      ]],
      ["Late summer and fall", [
        ["White powder on the leaves", "Powdery mildew", "See powdery mildew under Pests and problems.#pests"],
        ["Melons still unripe in September", "Too many fruits set too late", "Next year, plant earlier varieties and keep only a few melons per vine so they ripen before cool nights."]
      ]]
    ]
  }
};
