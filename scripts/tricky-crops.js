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
        ["Purple undersides on the leaves", "cold, wet soil keeps roots from taking up phosphorus", "keep them warm and use a seedling fertilizer with phosphorus."]
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
      ["Your town's start-indoors dates", "Start seeds indoors under a light, kept warm."],
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
        ["Fruit looks dull and tastes bitter and seedy", "picked too late", "pick while the skin is still glossy and springs back when pressed."]
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
      "The seed is tiny and slow: it has to be started indoors two months or more ahead, and can take 2 to 3 weeks just to sprout."
    ],
    stretch: [
      ["Your town's start-indoors dates", "Press seed onto the surface of the mix without covering it, and keep it at about 70°F."],
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
      ["3 to 4 weeks before planting", "Start seeds indoors in individual pots."],
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
      "Vines run 10 to 20 feet, so they need a lot of room and steady water.",
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
      "Seed rots in cold, wet soil. Regular sweet corn needs soil of about 60°F, and supersweet types about 65°F.",
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
        ["Lower leaves yellow in a V from the tip back", "not enough nitrogen; young plants can show it briefly in cold, wet weather", "side-dress now; corn is a heavy feeder."]
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
  },
  "brussels-sprouts": {
    steps: "Step by step through the season",
    why: [
      "They need about 100 days in the ground, so a late start means small sprouts by winter.",
      "Sprouts taste best when they firm up in cool fall weather; summer heat gives loose, leafy ones.",
      "Gray aphids hide between the sprouts in late summer, where they're hard to see and hard to wash off."
    ],
    stretch: [
      ["6 to 8 weeks before planting", "Start seeds indoors."],
      ["Late May to June (west side)", "Set plants out, firm the soil well around them and stake them in windy spots. This timing gives sprouts from October through winter."],
      ["Summer", "Side-dress once or twice and keep the soil evenly moist under mulch. Check under leaves for aphids every few days."],
      ["Late summer", "Go easy on nitrogen from here on; too much late gives loose sprouts."],
      ["About a month before picking", "Pinch out the growing tip so the sprouts size up evenly."],
      ["Fall and winter", "Pick from the bottom up when sprouts are firm and about an inch across."]
    ],
    stages: [
      ["Summer", [
        ["Plants lean or blow over", "tall, top-heavy stalks in loose soil", "firm the soil around the base and tie the stalk to a stake."]
      ]],
      ["Fall", [
        ["Sprouts stay small and uneven", "the plant is still putting energy into height", "pinch out the top about a month before you want to pick."]
      ]]
    ]
  },
  onions: {
    steps: "Step by step through the season",
    why: [
      "Bulbing starts when days reach about 14 to 16 hours in June, no matter how big the plant is. A small plant then makes a small bulb.",
      "Sets bigger than about ¾ inch, or a cold snap at the wrong time, can make onions flower instead of bulb.",
      "In wet Augusts west of the Cascades, bulbs can rot at the neck if they aren't dried well."
    ],
    stretch: [
      ["Picking seed or sets", "Choose long-day or day-neutral varieties. Short-day onions bulb too early here and stay small."],
      ["Early spring", "Plant early so each plant grows plenty of leaves before June; each leaf becomes one ring of the bulb. Pick small sets, and use any big ones for green onions."],
      ["Spring to early summer", "Feed with nitrogen, weed often and water about an inch a week."],
      ["Bulbs start to swell", "Stop feeding."],
      ["Tops start to fall over", "Stop watering. Pull them when about half the tops are down."],
      ["After harvest", "Cure 2 to 3 weeks in a dry, airy, shaded spot, under a roof if August is wet, until the necks are dry and tight."]
    ],
    stages: [
      ["Spring", [
        ["Plants wilt and yellow, with white maggots in the base", "onion maggots", "row cover on young plants, and a new bed next year."]
      ]],
      ["Early summer", [
        ["A flower stalk shoots up", "bolting from a big set or a cold snap", "use that onion soon, since it won't store; plant smaller sets next time."],
        ["Bulbs stay small", "too few leaves before June", "plant earlier next year, from transplants or small sets."]
      ]],
      ["Storage", [
        ["Bulbs go soft and gray at the top", "neck rot", "dry the necks completely before storing, and eat thick-necked ones first."]
      ]]
    ]
  },
  carrots: {
    steps: "Step by step through the season",
    why: [
      "Seed can take one to three weeks to come up, and the soil surface has to stay moist that whole time.",
      "Rain or watering packs the surface into a crust tiny seedlings can't break through.",
      "Carrot rust fly larvae tunnel through the roots, and they're common across the Northwest."
    ],
    stretch: [
      ["Before sowing", "Loosen the soil deeply and pick out stones and clods, or use a raised bed. Skip fresh manure."],
      ["Sowing day", "Cover the seed with a quarter inch of fine compost or vermiculite, not garden soil, then lay a board or burlap over the row."],
      ["Until sprouts appear", "Water gently every day or two, and lift the cover the moment you see green."],
      ["Right after sowing", "Seal insect netting over the bed and leave it on until harvest, or sow in early June after the first rust fly flight."],
      ["Seedlings a couple of inches tall", "Thin to 2 inches apart."],
      ["Fall", "Pull when the shoulders are about ¾ inch across, or mulch thickly and dig through winter west of the Cascades."]
    ],
    stages: [
      ["Sowing", [
        ["Nothing comes up, or only a few", "a crust formed or the surface dried out", "resow, cover with compost or vermiculite, and keep a board over the row until sprouts show."]
      ]],
      ["Roots", [
        ["Forked or stubby roots", "stones, hard soil or fresh manure", "loose, stone-free soil or a raised bed next time."],
        ["Green shoulders", "the tops of the roots were in the sun", "pull soil up over the shoulders."],
        ["Split roots", "a heavy soak after a dry spell", "water evenly."]
      ]]
    ]
  },
  beets: {
    steps: "Step by step through the season",
    why: [
      "Each seed is a cluster of 2 to 4 seeds, so seedlings come up crowded and grow leaves instead of roots unless you thin them.",
      "A long cold spell after a spring planting can make beets bolt.",
      "East of the Cascades, dry wind crusts the soil before seedlings come up."
    ],
    stretch: [
      ["Sowing day", "Wait until the soil has warmed a little; seeds sprout in soil from about 50 to 85°F."],
      ["Until sprouts appear", "Keep the surface moist so it doesn't crust."],
      ["A couple of inches tall", "Thin to one plant every 3 inches and eat the thinnings as greens."],
      ["While roots grow", "Keep the soil evenly moist and add a light mulch."],
      ["July (west side)", "Sow again for a fall crop."],
      ["Golf ball to tennis ball size", "Pull them, leaving an inch of stem when you trim the tops."]
    ],
    stages: [
      ["Roots", [
        ["Black, corky spots inside the root", "not enough boron", "test the soil; if boron is low, add only a tiny amount, since too much is toxic."],
        ["White rings inside the root", "swings in temperature or heat stress", "nothing to fix; the flavor is fine."],
        ["Woody, tough roots", "dry spells", "water evenly, especially while roots are sizing up."]
      ]]
    ]
  },
  parsnips: {
    steps: "Step by step through the season",
    why: [
      "Most failures happen before seedlings appear. Seed sprouts in 2 to 4 weeks, and the bed has to stay moist the whole time.",
      "The seed only lasts about a year, so old seed often doesn't come up at all.",
      "The root grows 8 to 12 inches long and forks in rocky or lumpy soil."
    ],
    stretch: [
      ["Before sowing", "Buy fresh seed and dig the bed deep, or use a raised bed in heavy clay."],
      ["Sowing day", "Sow a few radish seeds in the same row to mark it and break the crust."],
      ["Until sprouts appear", "Keep a board or burlap over the row and the soil moist; lift it as soon as you see green."],
      ["From sowing", "Cover with insect netting against carrot rust fly."],
      ["After a few frosts", "Start digging; frost turns starch to sugar. East of the Cascades, mulch heavily so the ground doesn't freeze solid."]
    ],
    stages: [
      ["Sowing", [
        ["Few or no seedlings after a month", "old seed, or the bed dried out", "resow with fresh seed and keep it covered and moist."]
      ]],
      ["Handling", [
        ["Rash or blisters after weeding", "the leaves' sap reacts with sunlight on skin", "wear gloves and long sleeves around the leaves on sunny days."]
      ]]
    ]
  },
  spinach: {
    steps: "Step by step through the season",
    why: [
      "Once days pass about 14 hours, around late April in Portland and Seattle, spinach starts flowering instead of making leaves.",
      "It's unusually fussy about acidic soil, and many west-side soils are acidic.",
      "Seed barely sprouts in soil above about 85°F, which makes late-summer sowing tricky."
    ],
    stretch: [
      ["Before sowing", "If spinach has struggled before, test the soil and lime it toward a pH of 6.5 to 7.5."],
      ["As soon as the soil can be worked", "Sow a slow-bolting variety for spring."],
      ["Late April onward", "Pick outer leaves often; once plants start to stretch upward, harvest them whole."],
      ["Late August to September", "Sow again for fall. Water and shade the seedbed to keep it cool."],
      ["Winter", "Row cover helps fall plants through cold spells, and they often start growing again in February."]
    ],
    stages: [
      ["Seedlings", [
        ["Seedlings grow slowly and turn yellow", "acidic soil", "test and lime the soil before the next sowing."]
      ]],
      ["Growing", [
        ["Yellow patches on top, gray-purple fuzz underneath", "downy mildew", "space plants for airflow and choose resistant varieties."],
        ["Plants stretch tall and leaves turn small", "bolting from long days", "harvest everything now, and sow for fall."]
      ]]
    ]
  },
  basil: {
    why: [
      "Cold hurts basil even without frost. Below about 50°F the leaves spot and blacken and growth stops.",
      "That usually means waiting until June to plant out west of the Cascades.",
      "Downy mildew can wipe out classic Genovese basil in humid weather."
    ],
    stretch: [
      ["Picking seed", "Choose a mildew-resistant variety like Prospera or Amazel."],
      ["Indoors", "Sow in warm soil, about 70 to 85°F."],
      ["Planting day", "Wait until nights stay above 50°F. On the coast or in high towns, use a large pot you can move or bring in."],
      ["6 inches tall", "Pinch off the top pair of leaves, and keep pinching for bushier plants."],
      ["All summer", "Water at the base in the morning, and pinch off flower buds as soon as they show."]
    ],
    stages: [
      ["After planting", [
        ["Black spots on the leaves after chilly nights", "cold damage below 50°F", "cover plants or bring pots in on cold nights, and plant later next year."],
        ["Holes in young leaves", "slugs", "slug bait around young plants."]
      ]],
      ["Summer", [
        ["Leaves yellow between the veins, gray fuzz underneath", "downy mildew", "pull infected plants and grow a resistant variety."],
        ["Fewer leaves and a changed flavor", "the plant is flowering", "pinch off the flower buds."]
      ]]
    ]
  },
  radicchio: {
    steps: "Step by step through the season",
    why: [
      "Plants sown in spring often send up a flower stalk in summer instead of making a head.",
      "Heads only form as nights cool in fall, so summer plants look like loose green leaves for months.",
      "Summer heat makes it bitter, especially east of the Cascades."
    ],
    stretch: [
      ["Picking seed", "Modern hybrids like Indigo head up more reliably than older types."],
      ["June or July", "Sow ¼ inch deep, or start in trays and transplant at about 4 weeks old, 8 to 12 inches apart."],
      ["Summer", "Water evenly so the plants keep growing."],
      ["Fall", "Leave the loose outer leaves; they protect the head forming in the center."],
      ["September to late fall", "Cut heads at the base when they feel firm."]
    ],
    stages: [
      ["Fall", [
        ["No head by early fall", "sown too early, or the plant stalled in summer", "cut it back to an inch or two; it may regrow a small head."],
        ["Slugs inside the heads", "wet fall weather", "slug bait, and harvest promptly."]
      ]]
    ]
  },
  dahlias: {
    steps: "Step by step through the season",
    why: [
      "Tubers rot in cold, wet soil, which is common in Northwest spring clay.",
      "Slugs and earwigs eat the new shoots just as they come up.",
      "Frozen tubers die, so in wet clay or cold areas they have to be dug and stored over winter."
    ],
    stretch: [
      ["February or March (optional)", "Start tubers in 1-gallon pots of fresh potting mix indoors, with plenty of light so shoots don't get weak."],
      ["Planting day", "Wait until the soil stays around 60°F, usually late April to May. Don't water until shoots appear."],
      ["Two weeks after planting", "Put out slug bait, or as soon as the first shoots show."],
      ["3 or 4 pairs of leaves", "Pinch out the center tip so the plant branches."],
      ["Summer", "Water deeply about once a week, feed with low-nitrogen fertilizer, and cut flowers often."],
      ["After frost blackens the leaves", "Dig the clumps, dry them a few days, and store at 40 to 50°F in barely damp shavings or peat."]
    ],
    stages: [
      ["Spring", [
        ["Tubers never sprout and turn mushy", "cold, wet soil or watering too soon", "plant into warm soil and hold off watering until shoots show."],
        ["Shoots chewed off overnight", "slugs or earwigs", "slug bait early, and rolled-up newspaper traps for earwigs."]
      ]],
      ["Summer", [
        ["Lots of leaves, few flowers", "too much nitrogen", "switch to a low-nitrogen fertilizer."],
        ["Mottled, streaked or crinkled leaves on a stunted plant", "likely a virus", "there's no cure; remove the plant so it doesn't spread."]
      ]]
    ]
  },
  "sweet-peas": {
    steps: "Step by step through the season",
    why: [
      "Hot weather ends the bloom, so plants need to flower in the cool weeks before summer.",
      "As soon as a pod forms, the plant slows down flowering.",
      "Slugs go after seedlings in cool, damp springs."
    ],
    stretch: [
      ["Late winter or early spring", "Soak the seeds overnight, then sow as early as the soil can be worked."],
      ["Seedlings up", "Watch for slugs."],
      ["3 or 4 pairs of leaves", "Pinch off the top for more stems, and guide the vines onto netting."],
      ["Late spring", "Mulch to keep roots cool and water steadily."],
      ["In bloom", "Cut flowers every day or two and snip off any pods."]
    ],
    stages: [
      ["Spring", [
        ["Buds drop off", "a cold, cloudy spell", "nothing to do; they recover when the weather brightens."]
      ]],
      ["Summer", [
        ["Blooming slows down", "pods forming, or heat", "pick every day or two and snip pods; in heat, the season is ending."]
      ]]
    ]
  },
  snapdragons: {
    steps: "Step by step through the season",
    why: [
      "The seed is tiny and needs light to sprout, so it's easy to bury too deep.",
      "Rust spreads in damp weather, and infected plants have to be pulled.",
      "They bloom best in cool weather, and summer heat slows them east of the Cascades."
    ],
    stretch: [
      ["8 to 10 weeks before your last frost", "Press seed onto moist mix without covering it. It takes one to two weeks to sprout."],
      ["A few weeks before the last frost", "Harden off and plant out; they handle light frost."],
      ["Young plants", "Pinch above the third set of leaves for more stems, or leave them for one tall spike."],
      ["Before they get tall", "Stretch netting over the bed so tall types grow up through it."],
      ["In bloom", "Cut when the lower third of the flowers are open, and cut low for a second flush."]
    ],
    stages: [
      ["Summer", [
        ["Orange-brown spots under the leaves", "rust in damp weather", "water at the soil, give plants space, and bin infected plants."],
        ["Few flowers in midsummer", "heat", "they pick up again as the weather cools in fall."]
      ]]
    ]
  },
  ranunculus: {
    steps: "Step by step through the season",
    why: [
      "The corms rot in cold, soggy soil, which is common in a Northwest spring.",
      "Young plants handle light frost but are damaged below about 25°F.",
      "Summer heat ends the bloom, so they have to flower in late spring."
    ],
    stretch: [
      ["Planting time", "Soak corms 3 to 4 hours in room-temperature water until they plump up."],
      ["Optional head start", "Pre-sprout them in a tray of damp potting mix in a cool spot for 10 to 14 days, and skip any that rot."],
      ["Early spring", "Plant 2 inches deep, claws down, in a raised bed or well-drained soil. Water once."],
      ["Until leaves appear", "Don't water again."],
      ["Cold nights", "Cover with frost cloth when it's forecast to drop below about 25°F."],
      ["In bloom", "Cut when the buds are colored and feel soft like a marshmallow."]
    ],
    stages: [
      ["Spring", [
        ["Corms turn mushy and never sprout", "cold, soggy soil", "raised beds, and no water until leaves show."],
        ["Leaves blacken after a cold night", "a hard frost", "frost cloth on cold nights."]
      ]]
    ]
  }
};
