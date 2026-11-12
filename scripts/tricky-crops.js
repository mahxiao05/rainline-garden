/* Deeper help for the vegetables and flowers rated moderate or tricky in scripts/guide.js (fruit gets its own format later).
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
  },
  eggplant: {
    why: [
      "Eggplant wants warm nights even more than peppers, and cool nights are what hold it back west of the Cascades.",
      "Plants set into cold soil stall and often never catch up.",
      "Flea beetles hit young plants hardest, right when they're small and growing slowly."
    ],
    stretch: [
      ["About 9 weeks before planting", "Start seeds indoors under a light, kept warm."],
      ["1 to 2 weeks before planting", "Lay black plastic tight against smooth soil. Clear plastic warms soil faster but lets weeds grow underneath."],
      ["Planting day", "Wait until the soil stays above 70°F and nights above 55°F, then cover the plants with row cover right away."],
      ["When flowers open", "Take the row cover off so bees can reach the flowers."],
      ["Midsummer", "Add straw mulch only now, once the soil is warm, and water about an inch a week."],
      ["No warm bed?", "Grow one or two plants in a big dark pot against a south-facing wall."]
    ],
    stages: [
      ["First weeks in the ground", [
        ["Tiny holes all over the leaves", "flea beetles", "row cover until plants grow strongly; bigger plants can usually take some damage without losing fruit."],
        ["Plant barely grows for weeks", "cold soil and cool nights", "black plastic and row cover, and plant a week or two later next year."]
      ]],
      ["Flowering", [
        ["Flowers drop off", "cool nights, or extreme heat east of the Cascades", "water evenly and mulch; it usually stops when the weather settles."]
      ]],
      ["Fruit", [
        ["Fruit looks dull and feels hard", "left on the plant too long", "pick while the skin is glossy and springs back when pressed."]
      ]]
    ]
  },
  cauliflower: {
    why: [
      "It handles any check in growth badly. Cold, drought, crowding or a root-bound start can give you a tiny button head.",
      "Plants that are too big at transplanting, or hit by cold or heat while small, often don't head properly.",
      "Heat while heads form makes them loose and grainy, so east-side gardens do best with a fall crop."
    ],
    stretch: [
      ["Picking starts", "Choose stocky plants with stems about as thick as a pencil, not tall ones crowded in their pots."],
      ["The week before planting", "Harden them off for 4 to 7 days, then plant in the late afternoon or on a cool, cloudy day."],
      ["First 1 to 2 weeks", "Keep row cover over them against wind, hard frost and root maggot flies."],
      ["About a month after planting", "Side-dress with nitrogen and keep watering evenly, 1 to 1½ inches a week."],
      ["Head the size of an egg", "Pull the outer leaves over it and tie them loosely to keep it white."],
      ["Midsummer", "Plant again for fall. Heads that form in cool, even weather are the most reliable here."]
    ],
    stages: [
      ["First weeks in the ground", [
        ["Young plants wilt, stall and turn bluish", "root maggots", "row cover or stem collars from planting day."]
      ]],
      ["Heading", [
        ["A small head forms while the plant is still small", "stress from cold, drought or a root-bound start", "pick it now; next time plant younger starts and keep them watered."],
        ["Brown patches on the head, hollow stems", "too little boron, a trace nutrient", "work in compost or a complete vegetable fertilizer before the next crop."],
        ["Loose, grainy or fuzzy head", "heat while the head was forming", "cut it right away, and grow a fall crop if summers are hot."]
      ]]
    ]
  },
  celery: {
    why: [
      "Several weeks of cool weather can make young plants flower instead of making stalks.",
      "Its roots are shallow and it needs 1 to 2 inches of water every week of summer.",
      "The seed is tiny and slow: it needs 10 to 12 weeks indoors and can take 2 to 3 weeks just to sprout."
    ],
    stretch: [
      ["10 to 12 weeks before planting", "Press seed onto the surface of the mix without covering it, and keep it at about 70°F."],
      ["The week before planting", "Harden seedlings off gradually."],
      ["Planting day", "Wait until nights stay above about 50°F. If a cold snap comes after planting, cover the plants with row cover."],
      ["Summer", "Mulch and run a soaker hose so the soil never dries out."],
      ["Last two weeks (optional)", "Wrap the stalks in paper or cardboard for paler, milder celery."]
    ],
    stages: [
      ["Seedlings", [
        ["Nothing has come up after a week", "celery is just slow", "keep the surface moist and wait; 2 to 3 weeks is normal."]
      ]],
      ["Summer", [
        ["Young leaves in the center turn black or brown", "blackheart: calcium can't reach the center during dry spells", "water steadily every week so calcium keeps moving into the new growth."],
        ["A flower stalk shoots up", "bolting after a cold spell when young", "it won't make good stalks now; next year plant out after nights stay above 50°F."]
      ]]
    ]
  },
  "sweet-potatoes": {
    why: [
      "They're tropical, and roots only form when the soil and nights are warm.",
      "They need 90 to 120 days, which is a stretch for most of the Northwest outside the hot east-side valleys.",
      "Cold soil in fall damages the roots, so you have to dig before it cools."
    ],
    stretch: [
      ["About 2 months before planting", "Order slips, or sprout your own from a stored sweet potato."],
      ["1 to 2 weeks before planting", "Cover the bed with plastic. Clear plastic warms soil more than black but lets weeds grow underneath."],
      ["Planting day", "Wait for soil above 65°F, usually a week or two after tomatoes. Plant slips deep in loose, raised rows."],
      ["First two weeks", "Water well while the slips root."],
      ["After that", "Water only in dry spells and skip fertilizer, so the plant makes roots, not vines."],
      ["Before the soil cools", "Dig carefully with a fork, then cure at 80 to 85°F for one to two weeks."]
    ],
    stages: [
      ["Summer", [
        ["Big, lush vines", "too much water or nitrogen", "cut back on both; vines don't mean roots."]
      ]],
      ["Harvest and storage", [
        ["Only a few small roots", "a cool summer or cool soil", "next year use the warmest bed, plastic and a short-season variety like Georgia Jet."],
        ["Roots taste starchy and bland", "not cured yet", "cure warm and humid for one to two weeks; they sweeten as they cure."],
        ["Hard core and an off taste", "stored too cold", "keep them at 55 to 60°F, never in the fridge."]
      ]]
    ]
  },
  cucumbers: {
    why: [
      "Seeds need soil of at least 60°F, and long spells below about 50°F damage the plants.",
      "Bees carry pollen from male to female flowers. In cool, wet weather they stay home, and fruit comes out tapered or not at all.",
      "Stress makes the fruit bitter: nights under 60°F, days over 90°F, or dry soil."
    ],
    stretch: [
      ["Picking seed", "For a greenhouse or a cloudy coastal summer, choose a variety that sets fruit without bees, like Diva."],
      ["1 to 2 weeks before planting", "Lay black plastic tight against smooth soil."],
      ["Planting day", "Wait until the soil stays above 70°F for transplants, then cover with row cover. It also keeps cucumber beetles off."],
      ["First female flowers", "Take the cover off. Female flowers have a tiny cucumber behind them."],
      ["Cool spell at bloom", "Hand-pollinate early in the morning, brushing pollen from a male flower into a female one with a small paintbrush."],
      ["Summer", "Trellis the vines, water at the base and pick every day or two."]
    ],
    stages: [
      ["Seedlings", [
        ["Seedlings chewed off overnight", "slugs", "slug bait around young plants, or set out bigger transplants."]
      ]],
      ["Flowering", [
        ["The first flowers fall off", "they're male flowers", "normal; female flowers follow."],
        ["Tiny cucumbers turn yellow and shrivel", "not pollinated", "hand-pollinate in the morning, and get the cover off once female flowers open."]
      ]],
      ["Fruit", [
        ["The vine stops making new cucumbers", "a big, yellowing cucumber left on the vine", "pick it, and keep picking every day or two."]
      ]]
    ]
  },
  "winter-squash": {
    why: [
      "Most types need 85 to 110 days, and the fruit has to mature before fall rain and frost.",
      "The first flowers are all male, and in cool weather bees are slow to pollinate the female ones.",
      "Flowers that open after about mid-August rarely have time to make a ripe squash here."
    ],
    stretch: [
      ["Picking seed", "Faster types like delicata, acorn and small kabocha ripen far more reliably than big storage squash."],
      ["2 to 3 weeks before planting", "Start seeds indoors in individual pots."],
      ["1 to 2 weeks before planting", "Lay black plastic tight against smooth soil."],
      ["Cool spell at bloom", "Squash flowers open at dawn and close by midday, so hand-pollinate early in the morning."],
      ["Mid-August", "Once a vine has 2 or 3 squash, pinch off the vine tips and new flowers."],
      ["Before a hard frost", "Harvest with a few inches of stem, then cure about 10 days at around 80°F."]
    ],
    stages: [
      ["Flowering", [
        ["Baby squash turn yellow and rot", "not pollinated", "hand-pollinate early in the morning in cool or wet weather."],
        ["Flowers drop during a heat wave", "several days over 90°F", "water deeply; it picks up again when it cools."]
      ]],
      ["Fruit", [
        ["Squash rots on the underside", "sitting on wet soil", "slip a board or some straw under it."],
        ["Rind dents with a fingernail", "not ripe yet", "leave it on the vine; a ripe one has a hard rind and a dry, corky stem."]
      ]]
    ]
  },
  pumpkins: {
    why: [
      "Carving pumpkins need 90 to 110 days, so for Halloween they need to be in the ground by late May or early June.",
      "Vines run 10 to 20 feet and each plant needs 25 to 50 square feet.",
      "Bees have to carry pollen to each female flower, and they're slow in cool, wet weather."
    ],
    stretch: [
      ["3 to 4 weeks before planting", "Start seeds indoors in individual pots for a head start in a cool spring."],
      ["1 to 2 weeks before planting", "Lay black plastic tight against smooth soil."],
      ["Planting day", "Plant into a hill of soil mixed with plenty of compost once the soil is warm."],
      ["Cool spell at bloom", "Hand-pollinate early in the morning: brush pollen from a male flower onto the center of a female one, the flower with a tiny pumpkin behind it."],
      ["Fruit swelling", "Water deeply once or twice a week at the base, and set each pumpkin on a board or straw."],
      ["Before a hard frost", "Cut with a few inches of stem and cure in a warm spot for about a week."]
    ],
    stages: [
      ["Flowering", [
        ["Young pumpkins shrivel and drop", "pollination failed", "hand-pollinate early in the morning."],
        ["Flowers drop during a heat wave", "several days over 90°F", "water deeply; it picks up again when it cools."]
      ]],
      ["Fall", [
        ["Pumpkins still green in late September", "planted too late or a large, slow variety", "pick before hard frost; next year plant by early June or grow a smaller type."]
      ]]
    ]
  },
  corn: {
    why: [
      "Seed rots in cold, wet soil. Regular sweet corn needs about 55 to 60°F soil, and supersweet types about 65°F.",
      "Each kernel forms only if pollen lands on its own silk, so corn needs to grow in a block, not one long row.",
      "Supersweet corn that crosses with other sweet corn can turn starchy."
    ],
    stretch: [
      ["Picking seed", "West of the Cascades and in high towns, choose early varieties like Early Sunglow."],
      ["High desert gardens", "Lay black plastic a week or two before planting to warm the soil."],
      ["Planting day", "Sow in a block of at least four short rows, and cover with netting or row cover until plants are about 4 inches tall."],
      ["Growing two types", "Plant supersweet and regular sweet corn about two weeks apart so they don't flower together."],
      ["Knee high", "Side-dress with nitrogen."],
      ["Tassels and silks", "Water deeply, an inch or more a week."],
      ["About 3 weeks after silking", "Check ears: brown silks, a full rounded tip and milky juice mean ready."]
    ],
    stages: [
      ["Sprouting", [
        ["Patchy rows with gaps", "seed rotted in cold soil", "replant the gaps once the soil warms."]
      ]],
      ["Growing", [
        ["Pale, yellowing lower leaves", "not enough nitrogen", "side-dress now; corn is a heavy feeder."]
      ]],
      ["Harvest", [
        ["Kernels taste starchy, not sweet", "picked late, or a supersweet crossed with other corn", "pick on time and cook right away, and keep types apart."]
      ]]
    ]
  },
  broccoli: {
    why: [
      "The head is a cluster of flower buds, so stress makes a small head that opens into flowers fast.",
      "A hard cold snap right after planting, dry soil or a start left too long in its pot can all cause that stress.",
      "Broccoli doesn't like heat, so east-side gardens need to time it around July."
    ],
    stretch: [
      ["Picking starts", "Choose young, stocky plants that aren't crowded in their pots."],
      ["The week before planting", "Harden them off for 4 to 7 days, then plant in the late afternoon or on a cool, cloudy day."],
      ["First 1 to 2 weeks", "Cover with row cover against wind, frost and root maggot flies."],
      ["About a month after planting", "Side-dress with nitrogen as heads begin to form."],
      ["Head full, buds still tight", "Cut the main head and leave the plant; side shoots keep coming for weeks."],
      ["Midsummer", "Plant a fall crop. It often gives the best heads because they form in cool weather."]
    ],
    stages: [
      ["Heading", [
        ["A tiny head forms early", "stress from cold, drought or a root-bound start", "pick it, and plant younger starts next time."],
        ["Head turns yellow and loose", "waited too long, or hot weather", "cut as soon as the head looks full; the side shoots are still good."]
      ]]
    ]
  },
  cabbage: {
    why: [
      "Large transplants can bolt to seed after several weeks of 40 to 50°F weather.",
      "A few spells over 80°F can also make some varieties bolt.",
      "A dry spell followed by a soaking splits heads."
    ],
    stretch: [
      ["Picking seed", "Choose bolt-resistant varieties: quick, small types like Golden Acre for spring, January King for fall and winter west of the Cascades."],
      ["Picking starts", "Choose young, stocky plants rather than big ones."],
      ["The week before planting", "Harden them off for 4 to 7 days."],
      ["Planting day", "Row cover or stem collars right away, against root maggots and cabbage worms."],
      ["Plants filling out", "Side-dress, mulch, and water about an inch a week, evenly."],
      ["Firm head, big rain coming", "Harvest it, or twist the plant a quarter turn to slow water uptake."]
    ],
    stages: [
      ["Spring", [
        ["A seed stalk instead of a head", "big transplants hit by weeks of 40 to 50°F weather", "plant smaller starts, or wait until the cold eases."]
      ]],
      ["Summer", [
        ["Plants bolt in a heat wave", "heat over 80°F", "harvest what you can, and choose bolt-resistant varieties next time."]
      ]]
    ]
  }
};
