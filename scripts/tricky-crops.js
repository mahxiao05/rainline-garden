/* Deeper help for the vegetables, flowers and fruit rated moderate or tricky in scripts/guide.js.
 * Shown on each plant page right after the regional notes:
 *   why:         short reasons it's tricky here (list, one line each)
 *   pollination: fruit only, optional: which trees or vines need a partner
 *   steps:       optional title for the step list
 *   stretch:     steps in the order you'd do them, as [when, what] or [when, what, icon], one or two sentences each
 *   stages:      "signs something's going wrong", as [stage, [[what you see, cause, fix], ...]]
 * Every fact was checked against Oregon State, Washington State or University of Idaho extension guides (November 2026).
 * Leave a point out rather than guess, and don't repeat what Pests and problems already covers: a fix ending in "#pests"
 * links there instead. Celery, snapdragons, ranunculus, quince and huckleberries are left out until extension sources turn up.
 * Plain text only (escaped when rendered), and never cite sources by name, same as scripts/crop-notes.js. */
module.exports = {
  tomatoes: {
    why: [
      "Nights below about 55°F can keep the pollen from forming properly, so flowers drop or the fruit comes out misshapen. That's common east of the Cascades and in high towns.",
      "Late blight is a common tomato disease here, and wet fall weather helps it spread.",
      "Full-size tomatoes take about 60 to 85 days from transplanting. The early ones are the safe bet in most of the Northwest."
    ],
    stretch: [
      ["Start indoors","Keep the grow light on 12 to 16 hours a day, as close to the seedlings as you can, and raise it as they grow."],
      ["Before planting","Lay black plastic tight against smooth soil. Loose plastic shades the soil and keeps it cooler."],
      ["Planting day","Tomatoes do best once the soil is 65°F or warmer. In cold gardens, a wall-o-water around each plant soaks up the day's heat and gives it back at night."],
      ["Mid-August","On large-fruited plants, pinch off new flowers and small fruit. They won't ripen in time, and removing them helps the rest ripen."],
      ["A month before first frost","Cut off the tips of the main stems so the plant puts its energy into ripening the fruit it has."],
      ["Fall","A clear plastic tent over the plants extends the harvest. Or pick full-size green fruit and ripen it indoors at 65 to 70°F."]
    ],
    stages: [
      ["Seedlings", [
        ["Tall, thin seedlings that flop over","not enough light","move the light as close to the seedlings as you can."]
      ]],
      ["First weeks in the ground", [
        ["Plants grow slowly and the lower leaves look sickly","cool, wet weather after an early-May planting","row covers help, and the plants usually recover fast once it warms up."]
      ]],
      ["Flowering", [
        ["Flowers dry up and fall off","dry soil and dry wind, a sudden cold spell, heavy rain or too much nitrogen","water deeply and regularly. Another set of flowers usually follows."]
      ]],
      ["Fruit", [
        ["Fruit is slow to color during a heat wave","ripening slows above about 85°F","wait for cooler weather, or pick fruit at first color and let it finish indoors."]
      ]],
      ["Fall", [
        ["Lots of green fruit with frost on the way","flowers set too late to ripen","bring in full-size green fruit to ripen at 65 to 70°F, and next year pinch new flowers from mid-August."]
      ]]
    ]
  },
  peppers: {
    why: [
      "Peppers want nights of 60 to 70°F. Some varieties won't flower at all below 60°F.",
      "Flowers and small fruit drop when it's too cold, when the soil dries out, or on a dry, windy day.",
      "Each pepper needs at least 45 to 55 days from flower to harvest, and 15 to 20 more where nights are cool."
    ],
    stretch: [
      ["Start indoors","Keep the grow light on 12 to 16 hours a day, as close to the seedlings as you can, and raise it as they grow."],
      ["Before planting","Harden plants off well. Leaves that skip this step can scald in their first days outside.","sun"],
      ["Before planting","Lay black plastic. It warms both the soil and the air around the plants."],
      ["Planting day","Wait until frost danger is past and the soil is at least 60°F. Plant in the evening or on a cloudy day."],
      ["Under low hoops","Keep a thermometer inside and open the cover once it's above 90°F."],
      ["Midsummer","Shade cloth, or a spot with shade late in the day, keeps the hot afternoon sun from scalding the fruit."]
    ],
    stages: [
      ["After planting", [
        ["White, papery patches on the leaves","sunscald from skipping hardening off","new growth will be fine. Harden off longer next time."]
      ]],
      ["Flowering", [
        ["Flowers and tiny peppers drop","cold, dry soil, or a hot, dry, windy day","keep the soil evenly moist and use a row cover for warmth and wind protection."],
        ["Few or no flowers","temperatures below 60°F","a row cover, or move pots to your warmest spot."]
      ]],
      ["Fruit", [
        ["Light brown or white patches on the sunny side","sunscald","shade cloth in the late afternoon, and don't strip leaves that shade the fruit."],
        ["Dark, sunken patch at the bottom","blossom-end rot from wet-dry swings or too much nitrogen","water evenly and go easy on nitrogen."]
      ]],
      ["Fall", [
        ["Peppers stay green for weeks","cool weather slows ripening","green peppers are fine to eat. Pick them full-size and firm."]
      ]]
    ]
  },
  cucumbers: {
    why: [
      "Seed sprouts poorly in cold soil. It does best once the soil is about 65°F.",
      "Bees carry pollen from male to female flowers. Below about 50°F or in rain they barely fly, so fruit doesn't set.",
      "Stress turns the fruit bitter: temperatures below 60°F or above 90°F, dry soil, or poor feeding."
    ],
    stretch: [
      ["Before planting","Lay black plastic. It warms the soil and keeps weeds down."],
      ["Planting day","Wait until frost danger is past and the soil is about 65°F. Row cover or a tunnel adds warmth."],
      ["First female flowers","Take the cover off so bees can reach them. Female flowers have a tiny cucumber at the base."],
      ["Early summer","Train the vines up a trellis or fence. It keeps fruit off the ground and leaves dry faster."],
      ["Harvest season","Pick every other day, before any cucumber starts to turn yellow."]
    ],
    stages: [
      ["Flowering", [
        ["The first flowers fall off","they're male flowers","normal. Female flowers follow."],
        ["Tiny cucumbers turn yellow and shrivel","not pollinated","get covers off once female flowers open. Cold or rainy weeks keep bees away."]
      ]],
      ["Fruit", [
        ["The vine stops making new cucumbers","an old, yellowing cucumber left on the vine","pick it, and keep picking every other day."]
      ]]
    ]
  },
  melons: {
    why: [
      "Melons need warm soil and warm nights. Transplants shouldn't go out until the soil stays above 70°F.",
      "A start left too long in its pot can be stunted for good, so timing the indoor start matters.",
      "Bees have to reach the flowers, so covers must come off at bloom, just when you'd like the plants warm."
    ],
    stretch: [
      ["Pick the variety","Where summers are short or cool, choose short-season, bush or small-vine varieties."],
      ["3 to 4 weeks before planting","Start seeds indoors in individual pots so the roots aren't disturbed at planting."],
      ["Before planting","Lay black plastic tight against the soil to warm it."],
      ["Planting day","Plant once the soil stays above 70°F, then cover with row cover."],
      ["At bloom","Take the covers off so bees can pollinate. That's usually 4 to 6 weeks after planting."],
      ["Short-season gardens","Once two or three melons have set on a vine, pick off the rest so the plant ripens those."]
    ],
    stages: [
      ["Sowing and first weeks", [
        ["Seeds never come up","the soil was too cold","wait for warm soil, or start in pots."],
        ["Plants sit stunted all summer","a root-bound or roughly handled transplant","start seeds 3 to 4 weeks ahead in single pots and plant them young."]
      ]],
      ["Flowering", [
        ["Tiny melons turn yellow and drop","the flowers weren't pollinated","make sure covers are off once flowers open."]
      ]],
      ["Fall", [
        ["Melons still unripe in September","too many set too late","keep only the first two or three per vine. A ripe melon slips off the vine easily."]
      ]]
    ]
  },
  eggplant: {
    why: [
      "Eggplant is frost-tender and needs real heat. In short-season areas, small or miniature varieties do best.",
      "Transplants shouldn't go out until the soil stays above 70°F."
    ],
    stretch: [
      ["8 to 10 weeks before planting","Start seeds indoors."],
      ["Before planting","Lay black plastic to warm the soil."],
      ["Planting day","Wait until the soil stays above 70°F. A wall-o-water around each plant protects it in cold gardens."],
      ["Right after planting","Put row cover over the plants before flea beetles show up, and seal the edges."],
      ["Harvest","Pick eggplants once they're a usable size, while the skin is still shiny."]
    ],
    stages: [
      ["First weeks in the ground", [
        ["Tiny pits and holes all over the leaves","flea beetles","row cover from planting day, sealed on all sides."]
      ]],
      ["Fruit", [
        ["The skin has gone dull","picked too late","pick while the skin is still glossy."]
      ]]
    ]
  },
  cauliflower: {
    why: [
      "Plants that are too big at transplanting, or hit by cold or heat while small, often don't form a proper head.",
      "Like its cabbage-family cousins, young cauliflower doesn't handle cold soil well.",
      "It likes cool weather, so the best heads come from a spring or fall harvest."
    ],
    stretch: [
      ["About 6 weeks before planting","Start seeds indoors, or buy young starts rather than big ones."],
      ["Before planting","Harden plants off over a week or two so the move outside doesn't stall them.","sun"],
      ["Planting day","Cover with floating row cover right away and leave it on until harvest. It keeps off cabbageworms and loopers."],
      ["Once plants are 4 inches tall","Feed with a balanced fertilizer every 3 to 4 weeks and keep the soil evenly moist.","feed"],
      ["Head starts to form","Pull the outer leaves together over it and clip them shut so the sun doesn't discolor it.","calendar"]
    ],
    stages: [
      ["First weeks in the ground", [
        ["Young plants wilt during the day","often root maggots feeding on the roots","put row cover or stem collars on from planting day."]
      ]],
      ["Heading", [
        ["A small head forms on a small plant","the start was too big, or cold or heat hit it while young","pick it now. Next time plant younger starts at the right time."],
        ["The head turns yellowish or uneven in color","sun on the head","tie or clip the outer leaves over it as it forms."]
      ]]
    ]
  },
  broccoli: {
    why: [
      "Hot weather, above about 80°F, makes broccoli send up flower stalks. Once that happens it can taste bitter.",
      "Like the rest of the cabbage family, young broccoli doesn't handle cold soil well.",
      "It likes cool weather, so time it for a spring or fall harvest."
    ],
    stretch: [
      ["About 6 weeks before planting","Start seeds indoors, or buy a start."],
      ["Before planting","Harden plants off over a week or two.","sun"],
      ["Planting day","Cover with floating row cover right away against cabbageworms and loopers."],
      ["Once plants are 4 inches tall","Feed with a balanced fertilizer every 3 to 4 weeks and keep the soil evenly moist.","feed"],
      ["Head full, buds tight","Cut the stem below the head. Many varieties keep making side shoots for a few more weeks.","basket"],
      ["Summer (west side)","Plant more starts for fall. West-side valleys can transplant broccoli as late as August."]
    ],
    stages: [
      ["Heading", [
        ["The head loosens and opens into yellow flowers","hot weather or waiting too long","cut while the buds are small and tight, and time plantings to head in cool weather."]
      ]]
    ]
  },
  cabbage: {
    why: [
      "Cabbage is a biennial. A long cold spell can switch it to flowering, so it bolts instead of heading.",
      "A mature head only holds for a while before it splits or bolts. How long depends on the variety.",
      "Cabbageworms, loopers and cabbage aphids all go after it, and aphids can get right into the head."
    ],
    stretch: [
      ["5 to 7 weeks before planting","Start seeds indoors."],
      ["Before planting","Harden plants off over a week or two.","sun"],
      ["Planting day","Cover with floating row cover right away and leave it on until harvest."],
      ["While heads form","Cabbage needs plenty of nitrogen. Side-dress and keep the soil evenly moist.","feed"],
      ["Late July to early August (west side)","Plant again for fall and winter heads. Savoy types are especially cold hardy.","sprout"],
      ["Firm head","Harvest before it starts to split."]
    ],
    stages: [
      ["Spring", [
        ["A seed stalk instead of a head","a long cold spell set off flowering","use what you can now and plant later next time."]
      ]],
      ["Heading", [
        ["The head splits open","it's past mature and starting to flower","cut heads as soon as they're firm."],
        ["Gray aphids packed between the leaves","cabbage aphids","hose them off every few days."]
      ]]
    ]
  },
  "brussels-sprouts": {
    steps: "Step by step through the season",
    why: [
      "They take a long time, about 80 to 105 days in the ground, so they go in by early summer for a fall and winter crop.",
      "Cold weather brings out their sweetness, so the best sprouts come late in the year.",
      "Cabbage aphids get into the sprouts themselves, where they're hard to wash out."
    ],
    stretch: [
      ["6 to 8 weeks before planting","Start seeds indoors."],
      ["Late spring to early summer","Set plants out 16 to 18 inches apart.","spade"],
      ["Planting day","Cover with floating row cover against cabbageworms and loopers."],
      ["Summer","Brussels sprouts need plenty of nitrogen. Check under leaves and between sprouts for aphids.","feed"]
    ],
    stages: [
      ["Summer", [
        ["Young plants wilt during the day","often root maggots feeding on the roots","put row cover or stem collars on from planting day."]
      ]]
    ]
  },
  "sweet-potatoes": {
    why: [
      "Sweet potatoes need a lot of heat and humidity, more than most Northwest summers give them.",
      "The slips go into soil warmed to about 80°F, so the bed has to be heated first with clear plastic.",
      "Fresh-dug roots aren't sweet yet. They need curing somewhere warm and humid to turn starch into sugar."
    ],
    stretch: [
      ["Before planting","Mix about 1 part compost into 2 parts soil and mound a slight ridge 12 to 24 inches wide. Skip commercial fertilizer.","spade"],
      ["Warming the bed","Cover the ridge with clear plastic pulled smooth and tight, and wait until the soil is about 80°F."],
      ["Planting day","Cut slits about 15 inches apart and plant a slip in each. Filling the holes with sand helps drainage and holds heat.","spade"],
      ["Summer","Water late in the day when the soil is warmest, ideally with a soaker hose under the plastic."],
      ["Fall","Dig carefully once temperatures drop into the 60s, without bruising or scratching the roots."],
      ["Right after digging","Cure them 5 to 7 days somewhere warm and humid, 85 to 90°F."]
    ],
    stages: [
      ["Summer", [
        ["Big, lush vines","too much nitrogen","skip nitrogen-rich fertilizer. It feeds leaves, not roots."]
      ]],
      ["Harvest", [
        ["Only a few small roots","the soil never got warm enough","clear plastic over the bed next year, and on the coast a spot against a south-facing wall."],
        ["Roots taste starchy and bland","not cured","cure them warm and humid for 5 to 7 days."]
      ]]
    ]
  },
  corn: {
    why: [
      "Corn seed needs warm soil. It won't sprout below about 50°F and comes up best at 60°F or more.",
      "Corn planted in one long row often pollinates poorly. Blocks of several rows do better.",
      "Different types of sweet corn can cross with each other, so they need to be kept apart."
    ],
    stretch: [
      ["Picking seed","In short-season areas, choose early varieties of about 70 days, like Early Sunglow or Sundance."],
      ["Planting day","Sow once the soil is 60°F or warmer, in a block of several short rows."],
      ["Growing more than one type","Keep types apart, for example white corn away from yellow or bicolor, so they don't cross."],
      ["Every 2 weeks","Sow another block of an early variety for a longer harvest.","sprout"],
      ["Harvest","Pick when the silks have turned brown and a pierced kernel gives milky juice. Eat it soon after picking."]
    ],
    stages: [
      ["Sprouting", [
        ["Patchy rows with gaps","seed sat in cold soil and failed","resow the gaps once the soil warms."]
      ]],
      ["Harvest", [
        ["Ears with missing kernels","poor pollination, often from a single long row","plant in blocks of several rows."],
        ["Kernels are tough and starchy","picked past the milky stage","check ears as the silks brown and pick while the juice is still milky."]
      ]]
    ]
  },
  "winter-squash": {
    why: [
      "Winter squash needs 85 to 135 days depending on type, which is longer than some parts of the Northwest allow.",
      "Bees carry pollen from male to female flowers, and cold or rainy weather keeps them from flying.",
      "Cool summers slow everything down, so in high or cool gardens it needs extra warmth at night."
    ],
    stretch: [
      ["Picking seed","Check the days to harvest and choose a variety that fits your season.","sprout"],
      ["3 to 4 weeks before planting","Start seeds indoors in pots, if you want a head start."],
      ["Planting day","Plant in hills 4 to 5 feet apart, two plants per hill. Rocks, a wall or row cover help hold heat at night.","spade"],
      ["At bloom","Take covers off so bees can reach the flowers, and avoid spraying insecticides."],
      ["Harvest","Pick once the skin is hard and you can't dent it with a fingernail. Leave about 3 inches of stem and cure it in a warm, dry spot before storing.","basket"]
    ],
    stages: [
      ["Sprouting", [
        ["Seeds don't come up, or come up unevenly","cold soil, planted too deep, or old seed","resow in warm soil about an inch deep."]
      ]],
      ["Flowering", [
        ["Baby squash turn yellow and drop","the female flower wasn't fully pollinated","help the bees: covers off at bloom and no insecticide sprays."],
        ["Big, healthy vines but no flowers or fruit","too much fertilizer","ease off feeding."]
      ]]
    ]
  },
  pumpkins: {
    why: [
      "Big pumpkins may not ripen in short-season or high gardens. Small, bush or compact types are safer there.",
      "Several days over 90°F can make flower buds drop or block pollination, and bees are slow in cool, wet weather."
    ],
    stretch: [
      ["About 4 weeks before planting","Start seeds indoors in pots for a head start in a cool spring."],
      ["Before planting","Lay plastic mulch to warm the soil.","plastic"],
      ["Planting day","Plant one or two plants in a hill of mounded soil, which warms up sooner. Space hills about 4 to 6 feet apart."],
      ["At bloom","Take covers off so bees can reach the flowers. If few bees are around, hand-pollinate."],
      ["Before a hard frost","Bring them all in and cure them somewhere warm and dry."]
    ],
    stages: [
      ["Flowering", [
        ["Young pumpkins shrivel and drop","the flower wasn't fully pollinated","hand-pollinate, and keep covers off during bloom."],
        ["Flowers drop during a heat wave","several days over 90°F","it picks up again when it cools. Hand-pollinating helps."]
      ]],
      ["Fall", [
        ["Pumpkins still green in late September","planted late, or a large, slow variety","pick before a hard frost. Next year plant by early June or grow a smaller type."]
      ]]
    ]
  },
  onions: {
    steps: "Step by step through the season",
    why: [
      "The long-day onions grown here start forming bulbs at about 14 hours of daylight, whatever their size. A plant that's still small then makes a small bulb.",
      "Sets bigger than a dime can flower early and never finish their bulb.",
      "Onion roots are shallow. If the soil dries out, bulbs form early and stay small."
    ],
    stretch: [
      ["Picking sets or seed","Choose bulbing varieties suited to the north. Bunching onions never make bulbs."],
      ["March to early April","Plant firm sets smaller than a dime 1 inch deep and 3 to 4 inches apart. Use bigger sets for green onions.","spade"],
      ["Or from seed","Start seed indoors 4 to 8 weeks ahead and plant out when seedlings are 3 inches tall."],
      ["Spring and summer","Keep the soil evenly moist and weed often, since onions compete poorly with weeds. Mulch helps with both."],
      ["Feeding","Onions need plenty of nitrogen, but too much gives soft bulbs, thick necks and poor storage.","feed"],
      ["Most tops have fallen over","Pull them and dry them in the shade with good airflow. Don't knock the tops down yourself; it bruises the neck."]
    ],
    stages: [
      ["Early summer", [
        ["A flower stalk shoots up","a set that was too big","use that onion soon as a green onion. Plant smaller sets next time."],
        ["Bulbs stay small","dry soil, or planted too late to grow enough before bulbing","plant early and keep the soil evenly moist."],
        ["No bulbs at all","a bunching variety","grow a bulbing variety for your region."]
      ]],
      ["Storage", [
        ["Necks turn soft, yellow and water-soaked, then gray mold","neck rot","let tops mature on their own and cure 6 to 10 days before storing."]
      ]]
    ]
  },
  carrots: {
    steps: "Step by step through the season",
    why: [
      "Many western Oregon soils form a crust after rain or sprinkling, and tiny carrot seedlings can't push through it.",
      "Carrot rust fly larvae tunnel into the roots, and they lay eggs in mid to late summer, when fall carrots are sown."
    ],
    stretch: [
      ["Before sowing","Carrots grow best in loose, well-drained soil or a raised bed."],
      ["Sowing day","Sow ¼ to ½ inch deep and cover the seed with light potting mix instead of garden soil, so it doesn't crust."],
      ["Until sprouts appear","Keep the seedbed moist. Row cover over the row helps prevent crusting too.","water"],
      ["Summer sowings","Keep row cover on to stop rust flies laying eggs."],
      ["Seedlings up","Thin so each carrot is at least 2 inches from the next.","pinch"],
      ["Harvest","Most are ready once the shoulder is about ½ inch across. Loosen the soil with a fork when it's damp."],
      ["Fall (east side)","Mulch a late bed heavily and dig carrots as needed until the soil threatens to freeze."]
    ],
    stages: [
      ["Sowing", [
        ["Nothing comes up, or only a few","the seedbed dried out or crusted","resow, cover with potting mix and keep it moist."]
      ]],
      ["Roots", [
        ["Split, forked or hairy roots","too much nitrogen","go easy on fertilizer. Root crops need little nitrogen."]
      ]]
    ]
  },
  beets: {
    steps: "Step by step through the season",
    why: [
      "Beet seed takes 10 to 15 days to come up, and it does best when the soil stays evenly moist instead of drying out and getting wet again.",
      "Seedlings need thinning so each root has room to form.",
      "Large beets left in the ground get tough and stringy."
    ],
    stretch: [
      ["Sowing day","Sow seed straight into the garden at a shallow depth, which helps seedlings come up fast."],
      ["Until sprouts appear","Keep the soil evenly moist; don't let it dry out and rewet."],
      ["Spring","Use floating row cover to keep leafminer flies from laying eggs on the leaves."],
      ["A few leaves up","Thin so each root has room, and eat the thinnings in salads.","pinch"],
      ["Mid-July to early August (west side)","Sow again for a fall harvest.","sprout"]
    ],
    stages: [
      ["Seedlings", [
        ["Seedlings fall over and die at the soil line","damping off","sow shallow so seedlings come up fast, and don't overwater."]
      ]],
      ["Leaves", [
        ["Pale, papery tunnels and blotches in the leaves","leafminers","floating row cover in spring."]
      ]],
      ["Roots", [
        ["Tough, stringy roots","left too long, or uneven watering","pick sooner next time and keep moisture even."]
      ]]
    ]
  },
  parsnips: {
    steps: "Step by step through the season",
    why: [
      "The seed only keeps about a year. Old seed often doesn't come up at all.",
      "Seedlings are slow and don't compete with weeds."
    ],
    stretch: [
      ["Before sowing","Buy fresh seed each year. Prepare the bed a week or more early and remove the first flush of weeds before sowing."],
      ["Sowing day","Sow into a fine seedbed. The best soil temperature for sprouting is about 50 to 70°F."],
      ["Until sprouts appear","Water lightly and often so the surface stays moist and cool and doesn't crust."],
      ["Mid to late summer","Row cover keeps carrot rust flies from laying eggs on young plants."],
      ["Fall and winter","Dig roots as needed. They keep in the ground well into winter west of the Cascades."]
    ],
    stages: [
      ["Sowing", [
        ["Few or no seedlings after a month","old seed, or the bed dried out","resow with fresh seed and keep the surface moist."]
      ]],
      ["Roots", [
        ["Reddish-brown to black cankers at the top of the root","a fungus called Itersonilia canker","rotate where you grow parsnips, keep drainage good, hill soil at the base and choose resistant varieties."],
        ["Forked or hairy roots","too much nitrogen","go easy on fertilizer. Root crops need little nitrogen."]
      ]]
    ]
  },
  spinach: {
    steps: "Step by step through the season",
    why: [
      "Spinach sends up a seed stalk as the days get longer, so spring plantings run out of time quickly.",
      "It needs soil of at least pH 6.0 to 6.5, higher than many vegetables.",
      "Seed sprouts best in cool soil, about 45 to 75°F, so late-summer sowings in warm soil are slow."
    ],
    stretch: [
      ["Spring","Sow as soon as the soil can be worked. For late spring and summer harvests, choose slow-bolting varieties.","sprout"],
      ["August to September","Sow again for fall. Fast-growing varieties suit fall, winter and early spring harvests.","sprout"],
      ["Winter","Row cover, a cloche or a cold frame helps fall plants through cold spells."]
    ],
    stages: [
      ["Seedlings", [
        ["Seedlings grow slowly and turn yellow","acidic soil","test the soil and lime it before the next sowing."]
      ]],
      ["Growing", [
        ["Plants stretch tall and leaves get small","bolting as days lengthen","harvest everything now, and sow again for fall."]
      ]]
    ]
  },
  radicchio: {
    steps: "Step by step through the season",
    why: [
      "Radicchio does best in cool weather, so it's grown for early spring or late fall harvests.",
      "Some types only turn red or pink once the weather cools, so summer plants can look green for months.",
      "Varieties differ a lot in how long they take, so the same sowing date can give heads anywhere from October to February."
    ],
    stretch: [
      ["June","Sow outdoors, or start in trays to transplant."],
      ["July (west side)","Set out transplants for fall and winter heads.","spade"],
      ["Fall and winter","Harvest heads as they firm up. A hard freeze can kill the outer leaves, but the head inside is fine once trimmed."]
    ],
    stages: [
      ["Fall", [
        ["Heads still green in September","some types only color up once nights turn cool","wait for cooler weather."],
        ["Outer leaves blackened after a freeze","frost damage to the wrapper leaves","peel them off. The head inside is usually fine."]
      ]]
    ]
  },
  basil: {
    why: [
      "Basil's flavor goes downhill once temperatures start dropping below 50°F.",
      "Downy mildew spores blow in on the wind and infect leaves that stay wet.",
      "Unlike most herbs, basil wants rich soil, regular water and feeding."
    ],
    stretch: [
      ["Before planting","Work compost into the bed. Basil needs richer soil than most herbs.","spade"],
      ["All summer","Water when the soil is dry to your first knuckle, at the base rather than over the leaves."],
      ["Once plants are growing","Mulch 2 to 3 inches deep with straw, compost or grass clippings to hold moisture.","spade"],
      ["When flower clusters form","Cut the stem back at least 6 leaf nodes. Pinching just the tip only makes way for the next flower stalk."],
      ["Fall","Cover plants with row cover on cool nights to stretch the season a little."]
    ],
    stages: [
      ["Summer", [
        ["Square clusters of leaves stacked at the stem tips","the plant is getting ready to flower","cut back at least 6 leaf nodes for a flush of new leaves."]
      ]],
      ["Fall", [
        ["Leaves lose their flavor","nights below 50°F","harvest heavily before cold nights, or use row cover."]
      ]]
    ]
  },
  dahlias: {
    steps: "Step by step through the season",
    why: [
      "Tubers rot easily in wet soil, especially between planting and the first leaves.",
      "Slugs love young dahlia shoots, and earwigs chew the blooms later in summer.",
      "Over winter, wet soil is more dangerous to tubers than cold, so they need excellent drainage or digging and storing."
    ],
    stretch: [
      ["February or March (optional)","Start a tuber early in a 1-gallon pot of fresh potting soil, with plenty of light so it doesn't get leggy.","sprout"],
      ["Planting day","Wait until the soil has stayed around 60°F for several days, usually late April to the end of May. Plant the tuber eye up, 4 to 6 inches deep, with a stake beside it."],
      ["Until two leaves show","Don't water. The tuber is most likely to rot now."],
      ["Two weeks after planting","Start slug bait or traps and keep it up all season."],
      ["Young plants","Pinch out the sprout between the top pair of leaves so the plant branches."],
      ["Summer","Keep the soil evenly moist but never soggy. Stop feeding by mid-August."],
      ["After frost","Dig the clumps, wash and dry them, and store them somewhere dark that won't freeze, ideally 34 to 40°F."]
    ],
    stages: [
      ["Spring", [
        ["Tubers never sprout and turn mushy","watered too soon, or soggy soil","hold off watering until two leaves show, and improve drainage in clay."],
        ["Shoots chewed off overnight","slugs","bait or trap from two weeks after planting."]
      ]],
      ["Summer", [
        ["Weak stems and few flowers","too much nitrogen","switch to a low-nitrogen fertilizer such as 5-10-10."],
        ["Stunted plant with yellow streaks or spots on the leaves","likely a virus","there's no cure. Remove the plant and tuber so it doesn't spread."],
        ["Ragged holes in the blooms","earwigs","set out earwig traps and clear away debris."]
      ]],
      ["Storage", [
        ["Tubers rot or shrivel over winter","too much nitrogen during the season, or stored wet","feed less nitrogen and store tubers dry and cool."]
      ]]
    ]
  },
  "sweet-peas": {
    steps: "Step by step through the season",
    why: [
      "Sweet peas have to grow in the cool part of the year. West of the Cascades, that means sowing before mid-March.",
      "Slugs go after the seedlings as they come up.",
      "Powdery mildew hits damp, crowded plantings, and pea enation virus shows up in hot weather."
    ],
    stretch: [
      ["Before sowing","Pick a sunny, well-drained spot with good airflow. Dig a trench about 10 inches deep, half fill it with compost or rotted manure and top it with soil.","spade"],
      ["Sowing day","Soak the seeds for 24 hours, then sow them ¾ to 1 inch deep and 2 inches apart. East of the Cascades and at higher elevations, sow a little later."],
      ["Seedlings up","Protect them from slugs with traps or barriers, and from frost. Thin to 5 to 6 inches apart."],
      ["About 4 inches tall","Pinch off the tips above the top leaves for a bushier plant with more flowering stems."],
      ["Late spring","Mulch around the base to keep the soil cool, and water in dry spells."],
      ["In bloom","Pick or remove spent flowers before pods form to keep them blooming."]
    ],
    stages: [
      ["Spring", [
        ["Seedlings chewed or gone overnight","slugs","traps or barriers around young plants."]
      ]],
      ["Summer", [
        ["White powder on the leaves","powdery mildew in damp, crowded spots","give plants more room and sun, and choose resistant varieties."],
        ["Blooming slows down","pods are forming","remove spent flowers before they set pods."]
      ]]
    ]
  },
  cherries: {
    steps: "Care through the year",
    why: [
      "Rain near harvest splits ripe sweet cherries, and cracked fruit draws spotted wing drosophila.",
      "Bacterial canker kills branches and can girdle the trunk. It's a problem throughout the Northwest.",
      "Sweet cherries don't tolerate wet or clay soil, and birds eat much of the fruit on a lone tree.",
      "West of the Cascades, brown rot and cherry leaf spot are common; east of the Cascades, powdery mildew is."
    ],
    pollination: [
      "Bing, Lambert and Royal Ann won't pollinate each other. Van, Corum and Bada are good partners for them.",
      "Stella, Lapins and Sweetheart are self-fruitful, so one tree is enough.",
      "Sour cherries such as Montmorency don't need a partner, and they have fewer disease problems."
    ],
    stretch: [
      ["Late winter","While the tree is bare, dormant oil helps with aphid and mite eggs and scale.","calendar"],
      ["About Memorial Day","Cherry fruit flies come out about now. Hang traps so you know when they arrive."],
      ["As fruit starts to color","Put netting over the tree, or just the lower limbs, before birds find it. Spotted wing drosophila starts laying eggs now too.","net"],
      ["After harvest, in dry weather","Cut out branches with canker and get rid of the wood.","pinch"],
      ["Leaf fall","Rake up and destroy fallen leaves and any shriveled fruit. Don't use them as mulch near the tree.","calendar"]
    ],
    stages: [
      ["Spring", [
        ["Branches die back","bacterial canker or Cytospora canker","cut out the infected wood after harvest, in dry weather."]
      ]],
      ["Summer", [
        ["Fruit rots on the tree as harvest nears","brown rot, worst when it rains in the last two weeks before picking","pick promptly and clear away rotten fruit."]
      ]],
      ["Fall", [
        ["Spotted leaves that drop early","cherry leaf spot, mostly west of the Cascades","rake and destroy fallen leaves; don't use them as mulch near the tree."]
      ]]
    ]
  },
  peaches: {
    steps: "Care through the year",
    why: [
      "Peaches bloom early, when it's often too cool and wet for good pollination, and clear nights bring frost.",
      "Wet weather brings peach leaf curl, shothole and brown rot. In cool, wet climates, unsprayed trees soon die.",
      "They need heavy feeding and pruning. They're one of the hardest fruits to grow, though many home gardeners manage it.",
      "Frost and Rosydawn resist leaf curl, which takes much of the work out of it."
    ],
    pollination: [
      "Peaches don't need a second tree.",
      "Nectarines bloom even earlier and get more disease than peaches."
    ],
    stretch: [
      ["Mid-December, then again before January 15","Two leaf curl sprays (fixed copper or chlorothalonil) while the tree is dormant.","calendar"],
      ["Late February","One more leaf curl spray. Dormant oil for aphid and mite eggs and scale goes on separately, not mixed in.","calendar"],
      ["Before buds open","Remove any shriveled fruit left in or under the tree.","calendar"],
      ["Bloom","Brown rot can blight the blossoms in wet springs. The usual control is a spray once a week from first pink to petal fall.","flower"],
      ["Early July","Check the base of the trunk for peach tree borers. Young trees are hit hardest.","calendar"],
      ["Until harvest","Pick up fallen or rotting fruit often so brown rot doesn't spread.","basket"],
      ["As leaves start to fall","Leaf curl spray again. West of the Cascades, do every one of these spray timings.","calendar"]
    ],
    stages: [
      ["Bloom", [
        ["Blossoms wilt and the rot moves into the shoots","brown rot blossom blight","spray once a week from first pink to petal fall next spring, and clear out shriveled fruit in winter."]
      ]],
      ["Summer", [
        ["Branches die back","Cytospora canker or bacterial canker","cut out and destroy infected wood in winter."],
        ["Larvae in fruit left to ripen on the tree","spotted wing drosophila","pick as soon as fruit is ripe."]
      ]]
    ]
  },
  apples: {
    steps: "Care through the year",
    why: [
      "Codling moth is in every apple-growing area here and gives wormy apples unless you control it.",
      "West of the Cascades, apple scab is common in wet springs. Delicious is especially prone; Liberty, Prima, Akane and Chehalis resist it."
    ],
    pollination: [
      "Most apples need pollen from another tree, often a different variety, blooming nearby.",
      "Akane, Chehalis and Lodi are self-compatible, so a second tree of the same variety works as the partner."
    ],
    stretch: [
      ["Late winter","Prune to open the tree to light and air. Remove diseased branches, fallen leaves and any shriveled fruit still hanging.","pinch"],
      ["Before bloom","Hang codling moth pheromone traps in the upper third of the tree to see when the moths start flying.","calendar"],
      ["Within about 20 days of petal fall","Leave one apple per spur, about one every 6 inches of branch, before they reach the size of a dime.","pinch"],
      ["Right after thinning","Slip mesh bags over young apples to keep out codling moth, apple maggot and stink bugs.","net"],
      ["Late July to harvest","Where apple maggot is found, hang sticky traps to catch and track the flies.","calendar"],
      ["Fall","Rake up fallen leaves so scab has less to start from next spring.","calendar"]
    ],
    stages: [
      ["Spring", [
        ["White, powdery shoot tips","powdery mildew; most scab-resistant varieties are prone to it","prune off infected shoots regularly."],
        ["Blossoms and shoots blacken and die","fire blight, which is rare in the Willamette Valley and Coast Range","cut 12 inches below the damage and dip pruners in 10% bleach or 70% alcohol between cuts."]
      ]],
      ["Summer", [
        ["Lots of small apples, then few flowers next spring","too much fruit left on the tree","thin earlier next year, one apple per spur."]
      ]]
    ]
  },
  figs: {
    steps: "Care through the year",
    why: [
      "Only a few varieties, like Desert King, Lattarula and Brown Turkey, reliably ripen a crop here.",
      "Temperatures around 0°F kill parts of the tree, and a hard winter can freeze the first crop.",
      "They need the hottest spot you have, ideally against a south-facing wall, and soil near pH 6.5 to 7. Many west-side soils need lime."
    ],
    pollination: [
      "The figs grown here set fruit without a second tree.",
      "Desert King, Lattarula and White Kadota can give two harvests a year."
    ],
    stretch: [
      ["January or February","Prune while dormant to open up the middle and keep the tree under about 8 feet.","pinch"],
      ["Spring, as leaves come out","Check last year's small figs. Black ones are dead; cut those tips back to push new growth for the second crop.","pinch"],
      ["Each year","Top-dress with compost instead of synthetic fertilizer, and don't feed in summer.","feed"],
      ["Dry spells","Once the tree is established, about 1 inch of water every couple of weeks is plenty.","water"]
    ],
    stages: [
      ["Spring", [
        ["Overwintered fruit has turned black","the first crop froze","cut those tips off early so the second crop has time to ripen."],
        ["Branches dead back toward the base","a cold snap near 0°F","cut out the dead wood; trees regrow to fruiting size in two or three years."]
      ]]
    ]
  },
  grapes: {
    steps: "Care through the year",
    why: [
      "They need 150 to 180 frost-free days. On the coast and in cooler parts of the Willamette Valley, choose early to mid-season varieties; late ones like Concord may not ripen.",
      "New shoots in April and May are easily hurt by frost.",
      "Cool, wet falls bring bunch rot, and powdery mildew is worst on European varieties."
    ],
    stretch: [
      ["January to early March","Prune while dormant. Expect to cut off about 90% of last year's growth, leaving 20 to 60 buds per vine.","pinch"],
      ["Frosty sites","Leave a few extra-long canes when you prune to hold back bud break, then trim the extra once frost risk passes.","frost"],
      ["Shoots about 6 inches long","Snap off the extra shoots so one remains at each bud.","pinch"],
      ["Just before bloom","On young vines, leave one cluster per shoot.","pinch"],
      ["By late June, when grapes are pea-size","Pull 2 to 4 leaves per shoot around the clusters, on the morning-sun side only.","sun"],
      ["As grapes change color (about mid-August)","Net the vines against birds and set wasp traps in the row.","net"],
      ["Harvest","Very early varieties are ready about early September in the Willamette Valley; Concord may take until mid-October.","basket"]
    ],
    stages: [
      ["Spring", [
        ["Twisted leaves and shoot tips","weed killer drift, especially 2,4-D","don't spray weed killer near grapes, and never on hot or windy days."],
        ["Stunted shoots that grow in a zig-zag","zinc or boron shortage, weed killer, frost or mites","test the soil and look for nearby spraying."]
      ]],
      ["Summer", [
        ["Fuzzy spots under the leaves","grape erineum mite","nothing to do; it doesn't hurt the vine or the fruit."]
      ]],
      ["Fall and winter", [
        ["Berries emptied out to a hard shell","wasps and hornets","set traps in the row."],
        ["Bark chewed at the base of the trunk","voles and mice","keep tall grass and mulch away from the trunk."]
      ]]
    ]
  },
  "hardy-kiwi": {
    steps: "Care through the year",
    why: [
      "Vines are male or female, and you can't tell which until they bloom. Without a male nearby, most females won't fruit.",
      "They leaf out early, as soon as late February west of the Cascades, and 30 minutes at 30°F can kill the new shoots.",
      "Soggy soil raises the risk of root rot.",
      "The first crop comes in the third year."
    ],
    pollination: [
      "Plant a female and a male of the same species, and label them. Buyers sometimes end up with two males or two females.",
      "Issai is partly self-fertile and fruits without a male, though its fruit is smaller than Ananasnaya's."
    ],
    stretch: [
      ["Winter","Prune the female vines while they're dormant. Leave the males alone for now.","pinch"],
      ["Late winter to spring","When frost is forecast after buds open, put row cover over the vine the afternoon before and leave it until the cold passes.","cover"],
      ["March","Feed established vines: two-thirds of the year's fertilizer now, the rest in May or June.","feed"],
      ["Right after bloom (about late June)","Prune the male vines.","pinch"],
      ["Summer","Water so the top foot of soil stays moist but never waterlogged. Stop feeding young vines after July.","water"],
      ["September","Taste kiwiberries once they start to soften. When they taste good, start picking.","basket"]
    ],
    stages: [
      ["Spring", [
        ["New shoots blacken after a cold night","frost on the early shoots","wait; buds that hadn't opened yet usually grow in and still fruit."]
      ]],
      ["Bloom", [
        ["Flowers but no fruit","no male nearby, or two vines of the same sex","check the flowers: male flowers have only pollen-bearing stamens, females have a branched center."]
      ]],
      ["Summer", [
        ["Leaves start to fold or wilt","dry soil","water right away, wetting the soil a foot deep."],
        ["Scarred fruit","wind rubbing fruit together, or hail","give the vine shelter from strong wind."]
      ]]
    ]
  },
  raspberries: {
    steps: "Care through the year",
    why: [
      "They're very sensitive to poor drainage. Roots need soil at least 2 feet, ideally 3, above the water table, which usually means a raised bed.",
      "They like soil pH 5.6 to 6.5, often higher than native soils on the coast."
    ],
    stretch: [
      ["Before planting","Skip spots where strawberries, potatoes, tomatoes, peppers or eggplant grew in the last 5 years. They carry verticillium wilt.","spade"],
      ["December to February","Summer-bearing kinds: remove weak, broken or damaged canes, keep the row 6 to 12 inches wide, and cut the rest to about 6 feet.","pinch"],
      ["March","Fall-bearing kinds grown for one crop: cut every cane to just above the ground.","pinch"],
      ["Harvest","Pick at least every 3 to 4 days, into shallow containers so the berries don't crush.","basket"],
      ["After the summer crop","Cut the canes that fruited at the base. Do it right away if they look diseased; otherwise you can wait until fall.","pinch"]
    ],
    stages: [

    ]
  },
  persimmons: {
    steps: "Care through the year",
    why: [
      "Some years there aren't enough warm days to ripen the fruit, which comes in November.",
      "Most persimmons are very astringent until they're soft-ripe. Fuyu is much less so.",
      "The good news: Japanese persimmons have few pests here."
    ],
    pollination: [
      "Fuyu and other Japanese types that ripen west of the Cascades are seedless and fruit without a partner.",
      "American persimmons need two or more varieties or seedlings planted together."
    ],
    stretch: [
      ["Planting","Give it your warmest, sunniest spot, and choose an early variety.","sun"],
      ["After fruit sets","Thin the fruit; persimmons respond well to it.","pinch"],
      ["November","Harvest. Fruit that isn't soft yet can finish ripening in a box in a clean, dry place like a garage.","basket"]
    ],
    stages: [
      ["Fall", [
        ["Fruit puckers your mouth","an astringent type that isn't soft-ripe yet","let it get fully soft before eating, or grow Fuyu."],
        ["Fruit still hard as frost arrives","too few warm days this year","pick it and let it ripen in a box in the garage."]
      ]]
    ]
  },
  "asian-pears": {
    steps: "Care through the year",
    why: [
      "You need at least two or three varieties for cross-pollination.",
      "Fire blight is a serious threat in southern and eastern areas, though it's not common in the Willamette Valley or Coast Range.",
      "Codling moth and bacterial blossom blast turn up everywhere."
    ],
    pollination: [
      "Plant at least two or three varieties, such as Shinseiki, Kosui, Hosui, Chojuro and Nijisseiki."
    ],
    stretch: [
      ["Late winter","Remove diseased branches, fallen leaves and any fruit left from last year.","pinch"],
      ["Before buds open","A fixed copper spray helps prevent blossom blast.","calendar"],
      ["Before bloom","Hang codling moth pheromone traps in the upper third of the tree.","calendar"],
      ["Within about 20 days of petal fall","Leave one fruit per spur, about one every 6 inches of branch.","pinch"],
      ["Summer","Light summer pruning helps cut branch dieback from blossom blast.","pinch"]
    ],
    stages: [
      ["Spring", [
        ["Blossoms and young shoots blacken and die back","bacterial blossom blast (Pseudomonas)","copper before buds open next year, and summer pruning."]
      ]],
      ["Summer", [
        ["Worms tunneling to the core","codling moth","use pheromone traps before bloom to time control, and pick up damaged fruit."]
      ]]
    ]
  }
};
