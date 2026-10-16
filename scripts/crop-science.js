/* In-depth, science-based growing notes for the most-searched Northwest crops, shown on the crop hub
 * pages (/when-to-plant/{crop}/) only. Every other crop has shorter notes in scripts/crop-notes.js.
 * Per crop: keys ([label, value] numbers to scan at a glance), sections ([heading, ...paragraphs]) and faq ([question, answer]); the FAQ is also emitted
 * as FAQPage structured data. Plain text only (escaped when rendered). Keep numbers to well-established
 * horticultural research, and keep them consistent with scripts/guide.js. */
module.exports = {
  tomatoes: {
    keys: [["Soil to sprout", "75–85°F"], ["Plant out when", "Nights stay above 50°F"], ["Best fruit set", "Nights 60–70°F"], ["Soil pH", "6.2–6.8"], ["Water", "1+ inch a week, steady"], ["Biggest risk", "Late blight in fall rain"]],
    sections: [
      ["Soil and feeding",
        "Tomatoes do best in loose, well-drained soil with a pH of about 6.2 to 6.8. Work in a couple of inches of compost before planting and add a balanced vegetable fertilizer. Go easy on nitrogen: too much grows big, leafy plants that flower late and set less fruit, which is the last thing you want in a short Northwest summer.",
        "Planting deep works because tomato stems grow roots wherever they're buried. A leggy transplant set in a trench or a deep hole ends up with a much larger root system, which helps it find water in August."],
      ["Why temperature matters so much",
        "Tomato seeds sprout best in soil around 75 to 85°F and barely at all below 50°F. Once planted out, growth stalls whenever nights drop below about 50°F, which is why transplants set out in cold April soil often sit still for weeks and get passed by plants set out later.",
        "Fruit set is the bigger issue here. Tomato pollen develops poorly when nights fall below about 55°F (and also when they stay above about 75°F or days top 90°F), so early flowers simply drop off. That's not a disease; it's the weather. Nights of 60 to 70°F give the best set. Varieties like Stupice and Oregon Spring were picked because they set fruit in cooler nights than most.",
        "West of the Cascades, the easiest gains come from warming things up: plant against a south-facing wall, use black plastic mulch or wall-o-water protectors early, and wait to mulch with straw until the soil has warmed, since straw keeps cold soil cold."],
      ["Water, and what causes blossom-end rot",
        "Water deeply and on a regular schedule, roughly an inch or more a week in summer, at the base of the plant. Blossom-end rot, the leathery black patch on the bottom of the fruit, is a calcium shortage inside the fruit, but it's almost always caused by uneven watering rather than a lack of calcium in the soil. Calcium moves to the fruit with water, so dry spells interrupt the supply. Steady watering and mulch fix it; adding calcium rarely does.",
        "Cracked fruit has a similar cause: a heavy watering or rain after a dry spell makes the fruit swell faster than the skin can stretch."],
      ["Late blight, the big Northwest risk",
        "Late blight is caused by Phytophthora infestans, a water mold (the pathogen behind the Irish potato famine). It thrives in cool, wet weather, roughly 60 to 70°F with leaves that stay wet for hours, which is exactly what arrives with the first fall rains. Spores blow in from nearby tomatoes and potatoes, and there's no cure once a plant is infected: dark, greasy blotches spread over leaves and stems, and fruit turns brown and firm.",
        "Prevention is about keeping leaves dry. Water at the soil, space plants for airflow, remove the lowest leaves, and, if you can, grow under a simple rain cover or in a greenhouse. Varieties bred for resistance, such as Mountain Magic, Defiant PhR and Iron Lady, hold up noticeably better. Bag and throw out infected plants rather than composting them, and pull up volunteer potatoes, which can carry the disease."],
      ["Ripening and storage",
        "Ripening is driven by ethylene, a natural plant hormone, and the red pigment (lycopene) forms best at about 68 to 77°F. Above about 85°F it barely forms, which is why fruit can stall orange in a heat wave, and in cool fall weather ripening slows to a crawl.",
        "A tomato picked once it shows its first blush of color will ripen indoors with nearly the same flavor as one left on the vine. Before fall rains or frost, pick full-size green fruit (glossy, with a lighter color starting at the blossom end) and ripen it at room temperature. Keep ripe tomatoes on the counter: the fridge, below about 55°F, dulls their flavor and turns the texture mealy."]
    ],
    faq: [
      ["Why are my tomato flowers falling off without making fruit?", "Usually temperature. Tomato pollen develops poorly when nights drop below about 55°F or days go above about 90°F, so the flowers drop. It's common in June west of the Cascades and during heat waves east of them. Fruit set picks up on its own once nights settle between 60 and 70°F."],
      ["What causes blossom-end rot?", "A shortage of calcium in the developing fruit, almost always caused by uneven watering rather than a lack of calcium in the soil. Water deeply on a steady schedule and mulch once the soil is warm. The first fruits of the season are most affected, and later ones are usually fine."],
      ["Should I remove tomato suckers?", "It's optional. On tall, indeterminate varieties, removing some suckers improves airflow (which helps against blight here) and can speed ripening of the fruit that's left, at the cost of a smaller total crop. Don't remove suckers from bush (determinate) varieties; that just cuts the harvest."],
      ["How do I ripen green tomatoes at the end of the season?", "Pick full-size green tomatoes that are glossy and starting to lighten at the bottom, and keep them at room temperature, out of the sun. They'll ripen over one to three weeks. Small, hard, dull-green fruit won't ripen well and is best for fried green tomatoes or chutney."]
    ]
  },

  garlic: {
    keys: [["Winter cold needed", "6–8 weeks below 40°F"], ["Soil pH", "6.0–7.0"], ["Feed", "Early spring, stop by late May"], ["Stop watering", "2 weeks before harvest"], ["Dig when", "3–4 lower leaves are brown"], ["Store", "Cool room, not the fridge"]],
    sections: [
      ["Why garlic is planted in fall",
        "A garlic clove needs a long spell of cold before it will divide into a new bulb with cloves. This is called vernalization, and it takes roughly six to eight weeks of temperatures below about 40°F, with hardneck types needing the most. Northwest winters provide that easily. Garlic planted in spring, or kept somewhere warm, often grows into a single round bulb with no cloves at all.",
        "Fall planting also gives cloves time to grow roots before the ground gets cold. Aim for a few weeks of rooting before a hard freeze; the green shoots may poke up in fall, and that's fine."],
      ["Leaves now, bulb later",
        "Bulb size is set mostly by how much leaf the plant grows before it starts bulbing. Lengthening days and warming weather in late spring switch the plant from making leaves to filling the bulb, and each leaf becomes one of the papery wrappers around it. Anything that grows bigger, healthier leaves by early June, like good soil, steady moisture and spring feeding, means bigger heads.",
        "Feed with a nitrogen fertilizer when growth picks up in early spring and again a few weeks later, then stop by late May. Late nitrogen keeps the plant leafy and delays bulbing."],
      ["Soil and water",
        "Garlic wants loose, well-drained soil with a pH of about 6.0 to 7.0 and plenty of compost. Cloves sitting in waterlogged winter soil rot, so raised beds help on heavy clay. Keep the soil moist in dry springs, roughly an inch of water a week, and stop watering about two weeks before harvest so the wrappers dry and tighten."],
      ["Scapes",
        "Hardneck garlic sends up a curly flower stalk, the scape, in late spring. Snapping it off once it curls redirects energy into the bulb and generally gives noticeably bigger heads. Scapes are also good to eat, with a mild garlic flavor."],
      ["Diseases worth knowing",
        "Rust shows up as orange spots on leaves in wet springs and is mostly cosmetic. The serious one is white rot, a soil fungus that turns roots and bulbs to white, fluffy mush. Its resting bodies survive in soil for 20 years or more, and once a bed has it, garlic and onions can't be grown there. It arrives on infected cloves or in soil carried on tools and boots, so start with clean seed garlic from a reputable grower, and never plant cloves from a bulb that looked soft or moldy."],
      ["Harvest, curing and storage",
        "Dig when the lowest three or four leaves have turned brown but five or six are still green, usually late June to mid-July. Each green leaf is a wrapper still protecting the bulb. Wait too long and the wrappers break down and the cloves start to separate, which shortens storage.",
        "Cure whole plants in a shady, airy spot for two to four weeks until the necks are dry and tight, then trim. Store at cool room temperature with moderate humidity. Avoid the fridge: temperatures around 40 to 50°F tell cloves that winter is over and trigger sprouting. Softnecks usually keep six to nine months, hardnecks three to six."]
    ],
    faq: [
      ["Can I plant garlic from the grocery store?", "It may grow, but it's a gamble. Store garlic is usually a softneck variety grown for a mild climate, may be treated to slow sprouting, and can carry diseases like white rot into your soil, where they last for decades. Seed garlic from a garden center or grower is a better bet."],
      ["Why didn't my garlic form cloves?", "A single round bulb usually means the clove didn't get enough cold, which happens when garlic is planted in spring. It can also happen with very small cloves or crowded plants. Replant the round in fall and it will usually divide the following year."],
      ["Should I cut garlic scapes?", "Yes, if you're growing hardneck garlic for bulbs. Snap them off once they curl; removing them generally gives noticeably bigger heads. Leave them on only if you plan to store the garlic a long time, since some growers find it keeps slightly better."],
      ["When is garlic ready to dig?", "When the lowest three or four leaves are brown and five or six are still green, usually late June to mid-July in the Northwest. Dig a test bulb first: the cloves should fill the wrappers but still be tightly covered."]
    ]
  },

  blueberries: {
    keys: [["Soil pH", "4.5–5.5"], ["Nitrogen type", "Ammonium, not nitrate"], ["Mulch", "2–4 inches sawdust or bark"], ["Water", "1–2 inches a week in summer"], ["Most fruitful canes", "3–6 years old"], ["Full crops", "By year 5"]],
    sections: [
      ["Acidic soil is the whole game",
        "Blueberries need acidic soil, with a pH of about 4.5 to 5.5. Many Northwest soils west of the Cascades are already close, but soils east of the mountains are often neutral or alkaline. Test before you plant. At the wrong pH, blueberries can't take up iron and other nutrients, and the classic symptom is yellow leaves with green veins.",
        "To lower pH, mix elemental sulfur into the soil. Soil bacteria slowly turn it into acid, which takes months, so ideally add it the season before planting and retest. Avoid aluminum sulfate, which acts faster but can build up to levels that harm the roots. If your soil is alkaline, growing in large containers or raised beds of acidic mix is often easier than fighting it."],
      ["Shallow, fussy roots",
        "Blueberry roots are fine, shallow, and have no root hairs. Instead they rely on partnerships with soil fungi to absorb water and nutrients, and those fungi do best in soil rich in organic matter. That's why growers work peat or acidic compost into the planting area and keep 2 to 4 inches of sawdust or bark mulch over the roots. The mulch keeps them cool and moist and slowly adds organic matter.",
        "Shallow roots also dry out fast. Give them about an inch or two of water a week in summer, especially while berries are swelling, ideally through drip irrigation."],
      ["Feeding",
        "Blueberries take up nitrogen best as ammonium, so use a fertilizer made for acid-loving plants or ammonium sulfate rather than nitrate fertilizers. Split it into two or three small doses from early to late spring. Too much at once burns the shallow roots. Skip fresh manure, which is salty and tends to raise pH."],
      ["Pollination and pruning",
        "Northern highbush blueberries are partly self-fertile, but planting two or more varieties that bloom at the same time gives bigger berries and heavier crops through cross-pollination. They also need a winter chill of roughly 800 to 1,000 hours below 45°F, which Northwest winters easily provide.",
        "Fruit forms on wood that grew the previous summer, and canes are most productive at about three to six years old. Each winter after the plants are established, remove a few of the oldest, grayest canes at the base and thin out weak, twiggy growth. That keeps young, fruitful canes coming."],
      ["Pests and diseases",
        "Birds are the biggest loss, so net bushes as berries begin to color. Spotted wing drosophila, a small fruit fly that arrived in the Northwest around 2009, lays eggs in ripening berries, especially later in summer. Picking every few days and refrigerating berries promptly limits the damage. Mummy berry, a fungus that turns berries into shriveled gray mummies, overwinters in fallen fruit; rake up mummies and refresh the mulch in late winter."],
      ["Harvest and storage",
        "Blueberries don't get sweeter after picking. Wait several days after they turn fully blue; they keep sweetening on the bush and drop easily into your hand when ripe. Refrigerate them unwashed, and rinse just before eating. They also freeze well spread on a tray before bagging."]
    ],
    faq: [
      ["Why are my blueberry leaves turning yellow?", "Yellow leaves with green veins usually mean the soil pH is too high, so the plant can't take up iron. Test the soil; if it's above about 5.5, work in elemental sulfur and switch to an acid-plant fertilizer. Overall pale leaves can also mean the plant simply needs nitrogen."],
      ["Do I need two blueberry bushes?", "One bush will fruit, but two or more varieties that bloom at the same time give bigger berries and heavier crops through cross-pollination. Choosing early, mid and late varieties also spreads the harvest over the summer."],
      ["Do coffee grounds make soil acidic enough for blueberries?", "Not reliably. Brewed grounds are close to neutral and change soil pH very little. They're fine as mulch or compost, but use elemental sulfur to actually lower pH, and test to confirm."],
      ["How long until blueberries produce?", "Expect small crops in the second or third year and full crops by about year five. Picking off the flowers in the first year helps the plant build roots, and a healthy bush can produce for decades."]
    ]
  },

  strawberries: {
    keys: [["Soil pH", "5.5–6.5"], ["Crown depth", "Right at the soil surface"], ["Feed June-bearers", "After harvest"], ["Day-neutrals slow", "Above 85°F"], ["Replace plants", "Every 3–4 years"], ["Biggest risk", "Gray mold at bloom"]],
    sections: [
      ["June-bearers, everbearers and day-neutrals",
        "The kind of strawberry decides when you get fruit. June-bearing varieties, like Hood and Shuksan, form next year's flower buds in late summer and fall, when days shorten and nights cool, and they fruit once, in a big flush in early summer.",
        "Day-neutral varieties, like Albion and Seascape, form flowers regardless of day length as long as temperatures are moderate, so they fruit from early summer into fall. They slow down in hot spells above about 85°F, which is rarely a problem near the coast or in Puget Sound. Everbearers fall in between, with a summer crop and a fall crop."],
      ["Soil and planting",
        "Strawberries want well-drained soil with a pH of about 5.5 to 6.5 and plenty of compost. Raised rows help a lot in wet winters, since crowns rot in soggy ground. Avoid beds where tomatoes, potatoes, peppers or eggplant grew in the last few years, since they share Verticillium wilt, a soil fungus that also kills strawberries.",
        "Planting depth matters more than with most plants. The crown, where the leaves meet the roots, has to sit right at the soil surface. Buried crowns rot, and exposed roots dry out."],
      ["Feeding and water",
        "For June-bearers, the main feeding comes after harvest, because that's when the plant builds the buds for next year's crop. A lot of nitrogen in spring mostly grows leaves and soft fruit that's more prone to rot. Day-neutrals fruit all season, so give them small, regular feedings instead.",
        "Keep the soil evenly moist, about an inch of water a week while plants flower and fruit, and water at the base in the morning so leaves and berries dry quickly."],
      ["Gray mold and other problems",
        "Gray mold (Botrytis) is the main strawberry disease in the Northwest. It infects the flowers during wet weather at bloom, then sits quietly until the fruit ripens and turns to gray fuzz. Straw mulch to keep berries off the soil, spacing for airflow, picking often and removing moldy fruit right away all help.",
        "Slugs eat ripe berries, root weevils notch leaf edges and their larvae feed on roots, and spotted wing drosophila can infest day-neutral berries in late summer. Picking ripe fruit promptly limits all three."],
      ["Keeping a bed productive",
        "Strawberry plants are most productive in their second and third years, then decline as viruses and root diseases build up. Plan to replace them every three or four years with new, certified virus-free plants in a fresh spot rather than replanting runners from an old bed.",
        "Renovate June-bearers right after harvest: cut the leaves off about an inch above the crowns, thin crowded plants, remove weeds, feed and water. The plants regrow clean foliage and build strong buds for next year."],
      ["Harvest",
        "Strawberries stop ripening once picked, so harvest them fully red. Pick in the cool of the morning with the cap attached, refrigerate right away, and wash only just before eating. They keep a few days at most."]
    ],
    faq: [
      ["Why do my strawberries only fruit in June?", "You probably have a June-bearing variety. They form flower buds as days shorten in late summer and fall, and fruit once the next spring. For berries into fall, add a day-neutral variety like Albion or Seascape."],
      ["Should I cut off strawberry runners?", "In the first year, yes for June-bearers, so the plants build strong crowns. After that, let a few root to fill gaps and remove the rest. Day-neutral varieties make fewer runners, and pinching them keeps fruit coming."],
      ["How long do strawberry plants last?", "Usually three to four good years. After that, yields drop as viruses and root diseases build up. Replace them with new certified plants, ideally in a different bed."],
      ["Why are my strawberries rotting before they ripen?", "Gray mold, which infects the flowers in wet weather and shows up as the fruit ripens. Mulch with straw, space plants for airflow, water at the base in the morning, and pick and discard moldy berries promptly."]
    ]
  },

  raspberries: {
    keys: [["Soil pH", "5.6–6.2"], ["Raised row", "10–12 inches high"], ["Each cane lives", "2 years"], ["Water", "1–2 inches a week in fruit"], ["Root-rot resistant", "Cascade Bounty, Cascade Delight"], ["Picked berries keep", "2–3 days"]],
    sections: [
      ["How raspberry canes work",
        "Raspberry roots live for many years, but each cane lives only two. In its first year a cane (a primocane) grows leaves; in its second year (as a floricane) it fruits and then dies. Summer-bearing varieties like Meeker and Tulameen fruit only on second-year canes. Fall-bearing varieties like Heritage also fruit at the tips of first-year canes in late summer and fall.",
        "That's the key to pruning. For summer-bearers, cut the canes that just fruited to the ground after harvest, and thin the new canes to the sturdiest ones, about 6 inches apart. For fall-bearers, the simplest method is to cut every cane to the ground in late winter for one large crop in late summer."],
      ["Drainage, and root rot",
        "Phytophthora root rot is the most common reason raspberries die in the Northwest. This water mold thrives in soil that stays saturated, which describes much of the region in winter. Infected plants send up weak new canes that wilt and die, and the roots turn reddish-brown inside.",
        "Plant in a raised row or bed at least 10 to 12 inches high, and never in a low spot where water collects. Variety matters too: Cascade Bounty and Cascade Delight are very resistant, while Meeker is moderately so. Avoid beds where tomatoes or potatoes grew recently, since they share Verticillium wilt."],
      ["Soil, water and feeding",
        "Raspberries prefer a slightly acidic soil, with a pH of about 5.6 to 6.2, rich in organic matter. Give them an inch or two of water a week while fruit is forming, through drip lines or soaker hoses, so the canes and berries stay dry. Feed in early spring, when new growth starts."],
      ["Pests",
        "Spotted wing drosophila, a small fruit fly, lays eggs in ripening raspberries, and fall-bearing crops are hit hardest. Pick every two days, collect any overripe fruit, and chill berries quickly. Root weevils and cane diseases also show up, but good airflow from thinning and trellising prevents most cane problems."],
      ["Harvest",
        "A ripe raspberry pulls cleanly off its core with a gentle tug. Berries don't ripen after picking and are among the most perishable fruits, so pick into shallow containers, refrigerate right away and eat within two or three days, or freeze them on a tray."]
    ],
    faq: [
      ["Why are my raspberry canes dying?", "If they're canes that fruited last summer, that's normal: each cane dies after its second year. If new canes are wilting and dying, suspect root rot from soggy soil. Move the planting to a raised bed and choose a resistant variety like Cascade Bounty or Cascade Delight."],
      ["How do I prune summer-bearing vs. fall-bearing raspberries?", "For summer-bearers, cut canes that just fruited to the ground after harvest and thin the new canes. For fall-bearers, mow or cut all canes to the ground in late winter for a single late-summer crop."],
      ["How long do raspberry plants last?", "A well-drained planting can produce for ten years or more, since the roots keep sending up new canes. Plantings in wet soil often decline within a few years because of root rot."]
    ]
  },

  lettuce: {
    keys: [["Soil to sprout", "35–80°F (best 75°F)"], ["Sow depth", "¼ inch max; needs light"], ["Seeds go dormant", "Soil above 80°F"], ["Soil pH", "6.0–7.0"], ["Hardy types take", "Mid-20s °F"], ["Keeps", "1–2 weeks near 32°F"]],
    sections: [
      ["Getting seeds to sprout",
        "Lettuce sprouts in soil as cool as 35 to 40°F and does best around 75°F. Many varieties also need some light to germinate, so sow seeds no more than about a quarter inch deep and keep the surface moist.",
        "In summer, soil above about 80°F can make lettuce seeds go dormant, and they simply won't come up. To sow in July or August, water the bed to cool it, sow in the evening, shade the row with a board or shade cloth until seeds sprout, or start seeds indoors where it's cooler."],
      ["Bolting and bitterness",
        "Lettuce bolts (sends up a flower stalk) in response to heat and long days. As it does, the leaves fill with a milky sap containing bitter compounds. Once the center starts to stretch up, the bitterness can't be reversed.",
        "To delay it, grow slow-bolting varieties for summer, give afternoon shade, keep the soil moist, and sow small batches every two to three weeks so there's always a young planting coming along."],
      ["Soil and water",
        "Lettuce has shallow roots and grows fast, so it needs steady moisture and fertile soil with a pH of about 6.0 to 7.0. Mix in compost before planting. Dry spells make leaves tough and bitter, and uneven watering can cause tipburn, the brown, crispy leaf edges caused by a short supply of calcium during fast growth."],
      ["Cold tolerance",
        "Most lettuces handle light frost, and hardy types like Winter Density and Arctic King take nights into the mid-20s. West of the Cascades, fall-sown lettuce under a cold frame or row cover can keep going through much of winter. Leaves that freeze solid will thaw fine if left alone; don't pick them while frozen."],
      ["Harvest and storage",
        "Pick in the morning, when leaves are fully hydrated and crisp. Lettuce keeps best right above freezing with high humidity, so store it in a bag or container in the coldest part of the fridge, where it lasts one to two weeks."]
    ],
    faq: [
      ["Why won't my lettuce seeds sprout in summer?", "Soil above about 80°F makes many lettuce seeds go dormant. Sow in the evening, water to cool the soil, shade the row until seedlings appear, or start seeds indoors and transplant."],
      ["Why is my lettuce bitter?", "Bitterness comes as the plant starts to bolt in heat and long days, or after dry spells. Harvest before the center stretches up, grow slow-bolting varieties in summer, and keep the soil evenly moist."],
      ["Can lettuce survive frost?", "Yes, most varieties handle light frost, and hardy types take nights into the mid-20s. With a cold frame or row cover, lettuce often lasts through much of winter west of the Cascades."]
    ]
  },

  kale: {
    keys: [["Soil pH", "6.0–7.5"], ["Hardy to", "Low teens °F"], ["Frost", "Makes leaves sweeter"], ["Clubroot fix", "Lime to pH 7.2"], ["Leave on plant", "Top 5–6 leaves"], ["Keeps", "1–2 weeks cold"]],
    sections: [
      ["Why frost makes kale sweeter",
        "As temperatures drop, kale converts some of its starch into sugars, which act as a natural antifreeze in its cells. The result is noticeably sweeter, milder leaves after a few frosts. Hardy varieties like Winterbor and Red Russian survive into the low teens or below, and west of the Cascades kale often produces all winter."],
      ["Soil and clubroot",
        "Kale grows best in fertile soil with a pH of about 6.0 to 7.5. In the Northwest, the main soil threat is clubroot, a soilborne disease of the whole cabbage family that causes swollen, distorted roots and wilting plants. It thrives in acidic, wet soil, and its spores survive in the ground for many years.",
        "If clubroot has shown up before, raise the pH to about 7.2 with lime at least a month before planting, improve drainage, and don't plant any cabbage-family crops in that spot for several years. Start with clean transplants and don't move soil from infected beds."],
      ["Feeding and water",
        "Kale is a leaf crop, so it responds well to nitrogen. Mix compost and a balanced fertilizer into the bed, then side-dress with a little more nitrogen a month or so after planting. Keep the soil evenly moist; drought makes leaves tough and strong-flavored."],
      ["Pests",
        "Cabbage aphids form gray, waxy colonies, often under leaves and in the growing tip. Blast them off with water, remove badly infested leaves, and let ladybugs and parasitic wasps do the rest. The green caterpillars are imported cabbageworms, the larvae of the white butterflies seen over gardens in summer. Row cover from planting day keeps the butterflies from laying eggs; Bt, a bacterial spray that affects only caterpillars, controls them if they're already there."],
      ["Flowering in spring",
        "Kale is a biennial. After a winter of cold, it flowers the next spring. Before the flowers open, the tender shoots (often sold as kale raab) are sweet and good to eat. Once flowers open, pull the plant and compost it."],
      ["Harvest and storage",
        "Pick the lowest, oldest leaves first and leave at least five or six leaves on top so the plant keeps growing. Kale stores best near freezing with high humidity, so keep it bagged in the fridge, where it lasts one to two weeks."]
    ],
    faq: [
      ["Does frost make kale sweeter?", "Yes. In cold weather kale turns some of its starches into sugars, which protect its cells from freezing. Leaves picked after a few frosts taste noticeably sweeter and milder."],
      ["Why is my kale flowering in spring?", "Kale is a biennial, so after a winter of cold it goes to flower the next spring. Eat the tender flower shoots before they open, then pull the plant and start new kale for the year."],
      ["How do I get rid of aphids on kale?", "Spray them off with a strong stream of water, remove badly infested leaves, and leave the ladybugs and tiny parasitic wasps that feed on them. Plants that are watered and fed well tolerate aphids better."]
    ]
  },

  chard: {
    keys: [["Soil to sprout", "50–85°F"], ["Takes frost to", "Low 20s °F"], ["Soil pH", "6.0–7.0"], ["Each seed", "Several seedlings"], ["Cut stalks at", "8–12 inches"], ["Bolts", "Spring after a winter"]],
    sections: [
      ["A beet grown for its leaves",
        "Swiss chard is the same species as beets, Beta vulgaris, bred for big leaves and stems instead of a swollen root. That's why it shares beets' pests and much of their care. Its seeds are actually dried fruit clusters holding several seeds each, so one seed often produces a small clump of seedlings. Thin to the strongest one."],
      ["Soil and water",
        "Chard grows best in fertile soil with a pH of about 6.0 to 7.0 and steady moisture. It's more tolerant of salty or slightly alkaline soil than most leafy greens, which helps east of the Cascades. Give it compost at planting and a little extra nitrogen in midsummer to keep new leaves coming."],
      ["Heat and cold",
        "Chard seeds sprout in soil from about 50 to 85°F, and plants handle summer heat far better than spinach or lettuce, without bolting. They also take frost into the low 20s. West of the Cascades, a planting often survives mild winters and produces again in early spring."],
      ["Why chard bolts",
        "As a biennial, chard flowers after a period of cold. Plants that came through winter will bolt the next spring, and spring plantings that hit a long cold spell soon after sprouting can bolt early too. Once a flower stalk forms, the leaves get smaller and tougher, so start a new planting."],
      ["Pests and diseases",
        "Leaf miners leave pale, winding tunnels and blotches in leaves. Pick off affected leaves early and use row cover over young plants. Cercospora leaf spot causes small round spots with reddish-purple edges in warm, humid weather. Remove spotted leaves and water at the base. Slugs are a constant in the Northwest."],
      ["Harvest and kitchen notes",
        "Cut the outer stalks near the base when they're 8 to 12 inches tall, and leave the center to keep growing. Like spinach, chard contains oxalates, which give it a slightly mineral bite; cooking reduces them. Bagged in the fridge, it keeps about a week."]
    ],
    faq: [
      ["Why do several chard seedlings come up from one seed?", "Each chard \"seed\" is really a dried fruit cluster with several seeds inside, the same as beets. Thin each clump to the strongest seedling; the extras are good in salads."],
      ["Will Swiss chard survive winter?", "Often, west of the Cascades. Chard handles frost into the low 20s, and a mulch or row cover helps it through colder snaps. Plants that survive produce again in early spring before they bolt."],
      ["Why is my chard going to seed?", "Chard is a biennial and flowers after a period of cold, so overwintered plants bolt in spring. A long cold spell right after a spring sowing can also trigger it. Sow a fresh planting to replace them."]
    ]
  },

  spinach: {
    keys: [["Bolts when days pass", "14 hours (late April)"], ["Soil to sprout", "35–75°F; poor above 85°F"], ["Soil pH", "6.5–7.5"], ["Hardy to", "The teens °F, with cover"], ["Best crop", "Fall and overwintered"], ["Keeps", "10–14 days cold"]],
    sections: [
      ["Why spinach bolts",
        "Spinach is a long-day plant: once the days get longer than about 14 hours, it starts making flowers instead of leaves. In Portland and Seattle that happens around late April, and warm weather speeds it up. That's why spring spinach has a short window, and why fall and overwintered crops are often the best ones here.",
        "Sow as early in spring as the soil can be worked, choose slow-bolting varieties, and harvest whole plants once they start to stretch upward."],
      ["Germination and temperature",
        "Spinach sprouts in soil as cool as 35 to 45°F, best around 70°F, and very poorly above about 85°F. For a fall crop, sow in late summer once the soil has cooled, or water and shade the seedbed to keep it cool. Established plants are very cold hardy, surviving temperatures into the teens with some cover, and fall-sown spinach often grows again in February west of the Cascades."],
      ["Soil pH matters more than for most greens",
        "Spinach is unusually sensitive to acidic soil. Below a pH of about 6.0, seedlings tend to grow slowly and turn yellow. It grows best at a pH of 6.5 to 7.5. Many west-side soils are acidic, so if spinach has struggled before, test the soil and add lime as needed. It also likes plenty of nitrogen and steady moisture."],
      ["Pests and diseases",
        "Downy mildew causes yellow patches on top of leaves with grayish-purple fuzz underneath, especially in cool, damp weather. Many newer varieties are bred to resist it. Leaf miners tunnel through leaves; row cover keeps the flies out. And slugs love young spinach."],
      ["Harvest and storage",
        "Pick outer leaves once plants have five or six, or cut the whole plant an inch above the soil and let it regrow. Spinach keeps best near freezing with high humidity, bagged in the fridge, where it lasts about 10 to 14 days."]
    ],
    faq: [
      ["Why does my spinach bolt so quickly?", "Spinach starts flowering once days get longer than about 14 hours, which happens in late April in Portland and Seattle, and warm weather speeds it up. Sow very early in spring, choose slow-bolting varieties, and grow your main crop in fall."],
      ["Can spinach grow through the winter?", "Yes, west of the Cascades. Spinach sown in late summer or early fall survives temperatures into the teens with a little cover, slows down in midwinter, and grows again in late winter."],
      ["Why are my spinach seedlings yellow?", "Acidic soil is a common cause. Spinach grows best at a pH of 6.5 to 7.5, and many Northwest soils are lower. Test your soil and lime if needed. Waterlogged soil and a lack of nitrogen can also cause it."]
    ]
  },

  "summer-squash": {
    keys: [["Soil to sprout", "60°F min, 70–95°F best"], ["Chill damage", "Below 50°F"], ["Soil pH", "6.0–7.5"], ["Water", "1 inch a week"], ["Each flower opens", "One morning only"], ["Pick at", "6–8 inches"]],
    sections: [
      ["Warm soil first",
        "Squash seeds need soil of at least 60°F to sprout, and they come up fastest at 70 to 95°F. In cold, wet soil they rot before they emerge, which is why squash sown too early in the Northwest often fails. Plants are also damaged by long spells below about 50°F. Wait for warm soil, or start seeds indoors two to three weeks before planting out."],
      ["Male and female flowers",
        "Squash plants make separate male and female flowers. Males usually appear first, often for a week or more, and those early blossoms fall off without producing anything. That's normal. Female flowers have a tiny squash at their base.",
        "Each flower opens for one morning only, and bees have to carry pollen from a male to a female. In cool or rainy weather, few bees fly. Poorly pollinated fruit starts to grow, then turns yellow and shrivels from the tip. If that's happening, hand-pollinate: early in the morning, pick a male flower, peel back its petals and brush its pollen onto the center of an open female flower."],
      ["Soil, water and feeding",
        "Squash are heavy feeders. Grow them in soil rich in compost with a pH of about 6.0 to 7.5, and give them about an inch of water a week, at the base of the plant. Big leaves often wilt in afternoon heat even when the soil is moist; if they recover by evening, the plant is fine."],
      ["Powdery mildew",
        "The white, powdery coating on older leaves in late summer is powdery mildew. Unlike most fungal diseases, it doesn't need wet leaves to spread; it thrives with warm days, cool nights and humid air, which is typical of a Northwest August. Plant mildew-resistant varieties, space plants for airflow and remove the worst leaves. Late in the season it's mostly a sign the plant is winding down."],
      ["Harvest and storage",
        "Zucchini is eaten unripe, so pick it at 6 to 8 inches, when the skin is glossy and seeds are still tiny. Letting fruit grow huge signals the plant to slow down, so frequent picking keeps it producing. Store it in the fridge's crisper drawer and use within about a week; it gets pitted and soft if kept cold for too long."]
    ],
    faq: [
      ["Why are my zucchini rotting at the tip?", "Usually poor pollination. When fruit isn't fully pollinated it starts to grow, then yellows and rots from the blossom end. Cool, rainy weather keeps bees away. Hand-pollinate in the morning with a male flower, or wait for warmer weather."],
      ["Why does my squash have flowers but no fruit?", "Squash produce male flowers first, often for a week or more, and those don't make fruit. Female flowers, with a tiny squash at the base, follow. If both are present and fruit still doesn't set, there may not be enough bees, and hand-pollinating helps."],
      ["What is the white powder on my squash leaves?", "Powdery mildew, which is common in late summer. Remove the worst leaves, keep watering at the base, and choose resistant varieties next year. Plants usually keep producing for weeks."]
    ]
  },

  "winter-squash": {
    keys: [["Days to ripen", "85–110"], ["Soil to sprout", "60°F+"], ["Last useful flowers", "Mid-August"], ["Soil pH", "6.0–7.5"], ["Cure", "10 days at about 80°F"], ["Store", "50–55°F, dry"]],
    sections: [
      ["Racing the season",
        "Winter squash needs a long, warm season, often 85 to 110 days from sowing, and the fruit has to mature fully before fall rains and frost. Seeds need soil of at least 60°F to sprout, and plants stall below about 50°F. In the Northwest, that makes the choice of variety and an early, warm start the deciding factors.",
        "Faster varieties like Delicata and small pie pumpkins ripen far more reliably here than big storage squash or giant pumpkins. Start seeds indoors two to three weeks before planting out, and lay black plastic mulch to warm the soil several degrees."],
      ["Pollination",
        "Like zucchini, winter squash has separate male and female flowers, and bees carry the pollen. The first flowers are usually male and drop without fruiting. In cool weather, hand-pollinating in the morning helps fruit set early enough to ripen."],
      ["Focusing the plant",
        "Flowers that open after about mid-August rarely have time to mature into ripe squash here. Once each vine has set two or three fruits, pinching off the vine tips and new flowers sends the plant's energy into ripening the squash you already have."],
      ["Soil, water and disease",
        "Grow winter squash in rich, well-drained soil with a pH of about 6.0 to 7.5 and plenty of compost. Water deeply, about an inch a week, at the base of the plant. Powdery mildew shows up in late summer; resistant varieties and good spacing help, and squash that's already mature is rarely affected."],
      ["Ripeness, curing and storage",
        "A ripe winter squash has a hard rind you can't dent with a fingernail, a dry, corky stem, and a spot where it rested on the soil that has turned cream or orange. Harvest before a hard frost, leaving a few inches of stem on.",
        "Most types, including butternut, kabocha, buttercup and pumpkins, store better after curing for about 10 days somewhere warm, around 80°F. That hardens the skin and heals small wounds. Acorn and delicata don't need curing. Store squash at 50 to 55°F in a dry spot. Butternut and kabocha get sweeter for several weeks after harvest as starches turn to sugar; delicata and acorn are best eaten within a couple of months."]
    ],
    faq: [
      ["How do I know when winter squash is ripe?", "The rind is hard enough that a fingernail won't dent it, the stem is dry and corky, and the spot where it rested on the ground has turned cream or orange. Harvest before a hard frost."],
      ["Do I need to cure winter squash?", "For most types, yes. Ten days somewhere warm, around 80°F, hardens the skin and helps them store for months. Acorn and delicata don't need it and are best eaten within a couple of months."],
      ["Why didn't my squash ripen before fall?", "The variety was likely too slow for the season, or plants went out late. Choose fast varieties like Delicata, start seeds indoors, warm the soil with black plastic, and pinch off flowers that appear after mid-August."]
    ]
  },

  cucumbers: {
    keys: [["Soil to sprout", "60°F+"], ["Chill damage", "Below 50°F"], ["Fruit is", "About 95% water"], ["Soil pH", "6.0–7.0"], ["Pick slicers at", "6–8 inches"], ["Store", "50–55°F"]],
    sections: [
      ["Warmth is everything",
        "Cucumbers are a tropical crop. Seeds need soil of at least 60°F to sprout and do best much warmer, and long spells below about 50°F damage plants. In much of the Northwest, transplants or seeds go out only once nights are reliably warm. Black plastic mulch, a south-facing spot and row cover early in the season help."],
      ["Flowers and fruit set",
        "Most cucumbers make separate male and female flowers, and bees carry pollen between them. Fruit from poorly pollinated flowers grows misshapen, narrow or curled at one end.",
        "Some modern varieties set fruit with no pollination at all. These parthenocarpic varieties, such as Diva, produce seedless fruit and are a smart choice for greenhouses and for cool, cloudy summers when bees are scarce. Other hybrids are mostly female and come with a few marked seeds of a pollinator variety; plant those too."],
      ["Water and bitterness",
        "Cucumbers are about 95 percent water, so they need steady moisture, about an inch a week, more in hot weather. Bitter cucumbers come from natural compounds called cucurbitacins, which increase when plants are stressed by heat, drought or uneven watering. The bitterness concentrates near the stem end and in the skin. Even watering prevents most of it, and burpless varieties are bred to be low in these compounds."],
      ["Soil and disease",
        "Grow them in rich, well-drained soil with a pH of about 6.0 to 7.0. Trellising keeps fruit clean and straight and improves airflow, which slows powdery mildew in late summer. Resistant varieties like Marketmore 76 hold up longer. Slugs are the main threat to seedlings here."],
      ["Harvest and storage",
        "Pick slicers at 6 to 8 inches and picklers at 2 to 4, checking every day or two. Leaving a mature, yellowing cucumber on the vine signals the plant to stop setting new ones. Cucumbers are chill-sensitive, so they keep best around 50 to 55°F; in the fridge, use them within a few days before they soften and pit."]
    ],
    faq: [
      ["Why are my cucumbers bitter?", "Bitterness comes from natural compounds called cucurbitacins, which build up when plants are stressed by heat, drought or uneven watering. Water deeply and regularly, and try burpless varieties. Peeling and trimming the stem end removes most of it."],
      ["Why are my cucumbers curled or misshapen?", "Usually incomplete pollination, often in cool or cloudy weather when bees aren't active. Uneven watering contributes too. Parthenocarpic varieties, which set fruit without pollination, avoid the problem."],
      ["Can I grow cucumbers in a cool summer?", "Yes. Wait for warm soil, use black plastic mulch and row cover early, trellis the vines in your sunniest spot, and choose parthenocarpic or fast-maturing varieties. A greenhouse or hoop house makes them very reliable."]
    ]
  },

  beans: {
    keys: [["Soil to sprout", "60°F min, 80°F ideal"], ["Soak seeds?", "No"], ["Nitrogen", "Makes its own"], ["Flowers drop", "Above 90°F or dry"], ["Soil pH", "6.0–7.0"], ["Pick at", "Pencil-thick"]],
    sections: [
      ["Why cold soil kills bean seeds",
        "Bean seeds need soil of at least 60°F to sprout, and about 80°F is ideal. In cold, wet soil, dry seeds absorb water so quickly that their tissues are damaged, and soil fungi then rot them before they emerge. That's the most common bean failure in the Northwest. Use a soil thermometer and wait for 60°F. Don't soak bean seeds before planting, since that can cause the same injury. Provider is noted for sprouting better in cooler soil."],
      ["Beans make their own nitrogen",
        "Beans partner with soil bacteria called rhizobia, which live in small nodules on the roots and turn nitrogen from the air into a form the plant can use. Active nodules are pink inside. Because of this, beans need little nitrogen fertilizer, and heavy feeding mostly produces leaves at the expense of pods.",
        "In a bed that hasn't grown beans before, coating seeds with a bean inoculant (a powder containing the right bacteria) at planting time helps nodules form."],
      ["Soil and water",
        "Beans grow best in loose, well-drained soil with a pH of about 6.0 to 7.0. Keep the soil evenly moist once flowering starts. Drought or heat above about 90°F during bloom causes flowers and small pods to drop, which is more common east of the Cascades."],
      ["Disease",
        "Bacterial blights and white mold spread easily on wet leaves. Water at the base, give plants room for airflow, and avoid working among them or picking while the leaves are wet, since you can carry bacteria from plant to plant on your hands."],
      ["Harvest and storage",
        "Pick snap beans when pods are about as thick as a pencil and before seeds bulge. Once seeds start to mature, the plant slows down, so frequent picking keeps it producing for weeks. Store in the fridge and use within about a week."]
    ],
    faq: [
      ["Should I soak bean seeds before planting?", "No. Bean seeds that take up water too fast, especially in cold soil, can be damaged and rot. Plant dry seed in moist soil that's at least 60°F, and water once."],
      ["Do beans need fertilizer?", "Very little. Beans work with soil bacteria that supply nitrogen from the air, so too much nitrogen just produces leaves. Mix in compost and use an inoculant in beds that haven't grown beans before."],
      ["Why are my bean flowers falling off?", "Usually heat or drought while flowering, especially with days above about 90°F. Keep the soil evenly moist through bloom, and new flowers will set pods once temperatures ease."]
    ]
  },

  peas: {
    keys: [["Soil to sprout", "40°F+, faster near 60°F"], ["Best days", "60–70°F"], ["Slows down", "Above 80°F"], ["Soil pH", "6.0–7.5"], ["Seedlings take", "Light frost"], ["Sweetness fades", "Within hours of picking"]],
    sections: [
      ["A crop built for cool weather",
        "Peas sprout in soil as cool as 40°F, though they come up much faster as it warms toward 60°F, and they grow best when days are 60 to 70°F. Seedlings tolerate light frost. Production drops once temperatures regularly top about 80°F, which is why peas go in early, from February to April depending on where you live.",
        "The biggest early risk isn't cold but wet. Seeds sitting in cold, waterlogged soil rot, so plant into soil that crumbles in your hand rather than forming a muddy ball."],
      ["Nitrogen from the air",
        "Like beans, peas host rhizobia bacteria in root nodules that turn nitrogen from the air into fertilizer for the plant. They need little added nitrogen, and an inoculant helps in beds that haven't grown peas recently.",
        "A common belief is that peas leave lots of nitrogen in the soil. In fact, most of it ends up in the seeds you harvest. Cutting the vines and leaving the roots in the ground adds organic matter, but only a modest amount of nitrogen."],
      ["Soil and water",
        "Peas like well-drained soil with a pH of about 6.0 to 7.5. Keep the soil moist once flowering starts, since dry spells during bloom and pod fill cut yields. A trellis gives better airflow and easier picking, even for shorter varieties."],
      ["Diseases",
        "Powdery mildew shows up as peas wind down in summer heat. Pea enation mosaic virus, spread by aphids, causes stunted, deformed plants and is a particular problem for later plantings in the Northwest. Early planting and resistant varieties like Oregon Sugar Pod II help with both."],
      ["Why fresh peas taste sweeter",
        "Pea sugars start converting to starch as soon as the pods are picked, and the conversion is fastest when they're warm. That's why homegrown peas taste so much sweeter than store-bought ones. Pick in the cool morning, refrigerate right away, and eat or blanch and freeze them within a day or two.",
        "Pick snap and snow peas when pods are plump but crisp, and shelling peas when the peas fill the pod but the pod is still bright green. Frequent picking keeps plants producing."]
    ],
    faq: [
      ["How cold can peas handle?", "Peas sprout in soil as cool as 40°F and seedlings tolerate light frost. Hard freezes can damage flowers and pods, so cover plants if a cold snap is forecast once they're blooming."],
      ["Do pea roots add nitrogen to the soil?", "A little. Most of the nitrogen peas fix goes into the seeds you harvest. Leaving the roots in the ground adds organic matter and a modest amount of nitrogen, so it's still worth doing."],
      ["Why are my pea plants turning yellow from the bottom?", "Late in the season, it's natural aging as summer heat arrives. Earlier, yellowing can mean waterlogged soil, root rot, or a lack of nitrogen-fixing nodules. Check the roots for pink nodules and make sure the soil drains."]
    ]
  },

  potatoes: {
    keys: [["Plant when soil is", "45°F+"], ["Tubers form best", "Soil 60–70°F"], ["Soil pH", "5.0–6.5 (scab drops at 5.2)"], ["Seed pieces", "1½–2 oz, 1–2 eyes"], ["Water", "1–2 inches a week, even"], ["Store", "Dark, 40–45°F"]],
    sections: [
      ["Start with certified seed potatoes",
        "Potatoes are grown from pieces of tubers, so diseases and viruses travel with them. Certified seed potatoes are inspected and tested for these problems. Grocery potatoes may carry diseases, and some are treated to slow sprouting.",
        "Cut large seed potatoes into pieces of about 1½ to 2 ounces, each with at least one or two eyes, and let them dry a day or two before planting. Pre-sprouting them in a bright, cool room for two to four weeks (called chitting) gives a faster, earlier crop."],
      ["Soil pH and scab",
        "Potatoes tolerate acidic soil, with a pH of about 5.0 to 6.5. Common scab, the rough, corky patches on the skin, is caused by soil bacteria that are much less active at a pH of 5.2 or below. So don't lime before potatoes, and avoid fresh manure, which also encourages scab. Keeping the soil moist for the first several weeks after tubers start forming also reduces it."],
      ["Temperature and tuber formation",
        "Plant when the soil is at least about 45°F; seed pieces sit idle or rot in colder, wet soil. Tubers form best when the soil is about 60 to 70°F and slow down when it's much warmer. Mulch helps keep the soil cool in hot summers east of the Cascades."],
      ["Hilling and green potatoes",
        "Potatoes form on underground stems along the buried part of the plant. Hilling soil or mulch up around the stems as they grow gives more room for tubers and keeps them covered. Tubers exposed to light turn green. The green is harmless chlorophyll, but it signals that solanine, a bitter natural toxin, is building up too. Cut away green parts, and discard potatoes that are heavily green or taste bitter."],
      ["Water and late blight",
        "Give potatoes about an inch or two of water a week, as evenly as possible. Uneven watering causes knobby, cracked or hollow tubers. Late blight, the same disease that hits tomatoes, can sweep through potatoes in cool, wet weather. Water at the soil, and if blight appears, cut and bag the tops and wait two weeks before digging so spores on the soil don't infect the tubers."],
      ["Harvest and storage",
        "Dig new potatoes once the plants flower. For storage, wait until about two weeks after the tops die back so the skins thicken. Cure them for a week or two somewhere dark and humid at 50 to 60°F, then store them dark at about 40 to 45°F. Colder than that, potatoes turn some of their starch into sugar, which makes them taste sweet and brown too much when fried."]
    ],
    faq: [
      ["Can I plant grocery store potatoes?", "They may grow, but they can carry diseases and viruses into your soil, and some are treated to slow sprouting. Certified seed potatoes are tested and grow more reliably."],
      ["What causes scab on potatoes?", "Soil bacteria that are most active in neutral or alkaline soil. Don't lime before potatoes, skip fresh manure, keep the soil moist after tubers start forming, and grow scab-resistant varieties. Scab is only skin deep; the potatoes are fine to eat once peeled."],
      ["Are green potatoes safe to eat?", "Cut away the green parts and any sprouts. The green signals that solanine, a bitter natural toxin, has built up from exposure to light. Discard potatoes that are heavily green or taste bitter."],
      ["Should I store potatoes in the fridge?", "No. Below about 40°F, potatoes convert starch to sugar, which makes them taste sweet and darken when fried. Store them dark, around 40 to 45°F, like a cool garage or basement."]
    ]
  },

  carrots: {
    keys: [["Days to sprout", "7–21"], ["Soil to sprout", "40–45°F min"], ["Thin to", "2 inches"], ["Soil pH", "6.0–6.8"], ["Rust fly flights", "Mid-April–June, Aug–Sept"], ["Pull at", "¾-inch shoulders"]],
    sections: [
      ["Getting carrots to come up",
        "Carrot seeds are slow, often taking one to three weeks to sprout, and they need the soil surface to stay moist the whole time. They'll sprout in soil as cool as 40 to 45°F, but come up much faster in warmer soil. In the Northwest, the common failure is a crust: rain or watering packs the surface into a crust the tiny seedlings can't push through.",
        "Cover the seeds with a quarter inch of fine compost or vermiculite instead of garden soil, water gently every day or two, and lay a board or burlap over the row until the first seedlings appear. Then remove it right away."],
      ["Straight roots",
        "Carrots fork and twist when the taproot hits rocks, clods or hard soil, or when the tip is damaged. Grow them in deep, loose, stone-free soil or a raised bed, and avoid fresh manure. Don't transplant carrots, since damage to the taproot causes forking. Thin seedlings to about 2 inches apart; crowded carrots stay small and tangled."],
      ["Flavor, sweetness and frost",
        "Carrots develop their best color and sweetness at about 60 to 70°F. Heat and drought increase the compounds that make carrots taste bitter or soapy. Cool fall weather and light frost make them sweeter as the roots store more sugar. That's why fall carrots taste so good here."],
      ["Carrot rust fly",
        "The carrot rust fly is the main carrot pest in the Northwest. The adult is a small fly; its larvae tunnel through roots, leaving rusty brown trails. There are two or three generations a year: the first flies appear from about mid-April to June and a second wave in August and September.",
        "Insect netting or row cover, laid over the bed from sowing until harvest and sealed at the edges, is the most reliable defense. Sowing after the first generation, in early June, also avoids much of the damage. Move carrots to a new bed each year."],
      ["Water and soil",
        "Carrots grow best in sandy or loamy soil with a pH of about 6.0 to 6.8. Water evenly. A heavy soak after a dry spell can split the roots. Keep the shoulders covered with soil so they don't turn green in the sun."],
      ["Harvest and storage",
        "Pull carrots when the shoulders are about ¾ inch across. Cut the tops off right away, since leaves draw moisture from the root. In the fridge, carrots keep for weeks; in a cold, humid spot near 32°F, they last for months. West of the Cascades you can also leave fall carrots in the ground under a thick mulch and dig them through winter, as long as voles and rust fly aren't a problem."]
    ],
    faq: [
      ["Why are my carrots forked?", "The taproot hit something, like rocks, clods or compacted soil, or the tip was damaged. Grow carrots in deep, loose, stone-free soil, skip fresh manure, and sow them directly rather than transplanting."],
      ["Why won't my carrot seeds come up?", "Usually the soil surface dried out or formed a crust. Cover seeds with fine compost or vermiculite, keep the surface moist daily, and lay a board or burlap over the row until seedlings appear. Be patient; they can take up to three weeks."],
      ["Can I leave carrots in the ground over winter?", "West of the Cascades, often yes. Cover the bed with a thick layer of straw or leaves and dig as needed. In colder areas, or where voles or rust flies are a problem, harvest and store them in the fridge or a cold, humid spot instead."]
    ]
  },

  onions: {
    keys: [["Type for here", "Long-day"], ["Bulbing starts at", "14–16 hour days"], ["Sets", "Smaller than ¾ inch"], ["Soil pH", "6.0–7.0"], ["Harvest when", "Half the tops fall"], ["Cure", "2–3 weeks"]],
    sections: [
      ["Day length decides the bulb",
        "Onions start forming bulbs when days reach a certain length, and varieties are grouped by that trigger. Long-day onions bulb when days reach about 14 to 16 hours and are the right choice for the Northwest's long summer days. Short-day onions, bred for the South, bulb too early here and stay small. Check the packet or set label for long-day or day-neutral varieties."],
      ["Leaves now, bulb later",
        "Each onion leaf becomes one ring of the bulb, so bulb size depends on how many large, healthy leaves the plant grows before bulbing starts in early summer. That's why onions go in early and benefit from a head start as transplants or sets. Feed with nitrogen early and stop once bulbs start to swell. Keep the bed weeded too: onions' thin, upright leaves shade out very little and lose badly to competing weeds."],
      ["Why onions bolt",
        "Onions are biennials, normally flowering in their second year. But a plant that has reached a certain size and then sits through a long cold spell can be tricked into flowering early. Large onion sets, more than about ¾ inch across, are most prone to it. Choose small sets, and pull any that bolt to use first, since they won't store."],
      ["Sweet vs. storage onions",
        "Sweet onions like Walla Walla Sweet taste mild because they're low in the sulfur compounds that make onions pungent and high in water. Those same traits make them store poorly, for only a month or two. Pungent storage onions like Copra keep for months. Grow some of each."],
      ["Soil and water",
        "Onions have shallow roots, so they need loose, fertile soil with a pH of about 6.0 to 7.0 and steady moisture, about an inch a week, until the bulbs size up. Stop watering once the tops start to fall over. Onion thrips, tiny insects that leave silvery streaks on the leaves, are worst in hot, dry weather east of the Cascades."],
      ["Harvest, curing and storage",
        "When about half the tops have flopped over, pull the onions. Cure them in a dry, airy, shaded spot for two to three weeks, until the necks are completely dry and tight. A properly dried neck seals out neck rot, the main cause of onions rotting in storage. Store storage onions cool and dry, ideally just above freezing with low humidity."]
    ],
    faq: [
      ["Why are my onions so small?", "Usually the plants had too few leaves when bulbing started, because they went in late, were crowded or had to compete with weeds. The wrong day-length type can also cause it: grow long-day varieties in the Northwest."],
      ["Why did my onions bolt?", "A long cold spell after plants reached a certain size tricked them into flowering. Large sets are especially prone to it. Use small sets, and use bolted onions first, since they won't store."],
      ["Should I grow onions from sets, transplants or seed?", "Sets are the easiest and earliest, but large ones may bolt. Transplants give bigger bulbs and a wider choice of varieties. Seed is cheapest and has the most variety, but it needs an early start indoors, about 10 to 12 weeks before planting out."]
    ]
  },

  beets: {
    keys: [["Seeds per cluster", "2–4"], ["Thin to", "3 inches"], ["Soil pH", "6.0–7.5"], ["Soil to sprout", "50–85°F"], ["Pull at", "Golf to tennis ball size"], ["Keeps", "2–4 months cold"]],
    sections: [
      ["One seed, several seedlings",
        "A beet \"seed\" is actually a dried fruit cluster containing two to four seeds, so seedlings come up in small clumps. Thin to one plant every 3 inches once they're a couple of inches tall; crowded beets grow leaves instead of roots. Monogerm varieties have one seed per cluster and need less thinning."],
      ["Soil, pH and boron",
        "Beets grow best in loose soil with a pH of about 6.0 to 7.5 and don't do well in acidic soil. They also need more boron than most vegetables. A shortage causes black, corky spots inside the root and dying leaf centers. If that's happened before, test the soil; if boron is low, add it in very small amounts, since too much is toxic to plants."],
      ["Temperature",
        "Beet seeds sprout in soil from about 50 to 85°F. Plants grow best in cool weather. Beets are biennials, and a long cold spell after planting can make spring plantings bolt, so wait until the soil has warmed a bit. White rings inside the root usually come from fluctuating temperatures or heat stress and don't affect flavor much."],
      ["Water",
        "Keep the soil evenly moist. Dry spells make roots woody and tough, and a sudden soak after drought can split them. A light mulch helps once seedlings are up."],
      ["Pests",
        "Leaf miners tunnel through the leaves, leaving pale, papery blotches. Pick off affected leaves early and cover young plants with row cover. Slugs go after seedlings."],
      ["Harvest and storage",
        "Pull beets at golf ball to tennis ball size, when they're most tender. Leave an inch of stem when trimming the tops so the roots don't bleed. The red color comes from betalains, water-soluble pigments that stain; golden beets are less messy. The greens are edible too. Stored cold and humid, in the fridge or a root cellar, trimmed beets keep two to four months."]
    ],
    faq: [
      ["Why do several beet seedlings grow from one seed?", "Each beet \"seed\" is a cluster of two to four seeds. Thin to one plant every 3 inches, or grow monogerm varieties, which have one seed per cluster."],
      ["Why are my beets all leaves and no root?", "Most often crowding: beets need about 3 inches each. Too much nitrogen, too much shade, or uneven watering can also cause it."],
      ["What are the black spots inside my beets?", "Usually boron deficiency, which causes black, corky spots inside the root. Test your soil and, if boron is low, add a very small amount. Too much boron is toxic, so don't add it without testing."]
    ]
  },

  basil: {
    keys: [["Chill damage", "Below 50°F"], ["Soil to sprout", "70–85°F"], ["Plant out", "Nights above 50°F"], ["Pinch at", "6 inches tall"], ["Store", "Counter, not the fridge"], ["Mildew resistant", "Prospera, Amazel"]],
    sections: [
      ["A tropical plant in a cool climate",
        "Basil is a tropical plant, and cold damages it even without frost. Below about 50°F the leaves can develop dark spots and blacken a few days later, and growth stalls. Seeds sprout best in soil around 70 to 85°F. In the Northwest, that means waiting until nights stay above 50°F, usually June west of the Cascades, or growing it in a greenhouse or a warm, sheltered spot."],
      ["Pinching and flowering",
        "Pinch off the top pair of leaves above a pair of side shoots when plants are 6 inches tall, and keep pinching. Each pinch makes two new shoots and a bushier plant. Once basil flowers, it shifts energy to seeds, leaf production slows and the flavor changes, so pinch off flower buds as soon as they appear."],
      ["Soil and water",
        "Basil likes rich, well-drained soil with a pH of about 6.0 to 7.0, full sun and steady moisture. Water at the base in the morning. Wet leaves overnight encourage disease. In containers, use a large pot so the soil doesn't dry out by afternoon."],
      ["Downy mildew",
        "Basil downy mildew spread across North America in the late 2000s. Leaves yellow between the veins, and a gray-purple fuzz forms on the undersides, especially in humid weather. Classic Genovese is very susceptible. Resistant varieties like Prospera and Amazel hold up much better, and the Rutgers DMR varieties are moderately resistant. Pull infected plants promptly."],
      ["Harvest and storage",
        "Harvest by cutting stems just above a pair of leaves. Don't refrigerate fresh basil: cold blackens it. Keep cut stems in a glass of water on the counter like flowers, or blend it into pesto or oil and freeze it."]
    ],
    faq: [
      ["Why is my basil turning black?", "Cold. Basil is damaged below about 50°F, even without frost, and the leaves blacken a few days later. Keep it outside only when nights are warm, and never store fresh basil in the fridge."],
      ["Why are my basil leaves yellow with fuzz underneath?", "That's basil downy mildew. Pull infected plants, water at the base in the morning, and grow resistant varieties like Prospera or Amazel next time."],
      ["Can I keep basil alive over winter?", "Basil is grown as an annual and usually declines indoors in winter's low light. You can root cuttings in water in late summer and grow them on a sunny windowsill or under a grow light, but new seedlings in spring usually do better."]
    ]
  },

  rosemary: {
    keys: [["Top killer", "Wet winter soil"], ["Most types hurt at", "15–20°F"], ["Hardiest", "Arp, Madeline Hill"], ["Fertilizer", "None needed"], ["Prune", "Only into green growth"], ["In pots", "Terracotta, gritty mix"]],
    sections: [
      ["Wet soil kills more rosemary than cold",
        "Rosemary comes from dry, rocky hillsides around the Mediterranean. Its roots rot when they sit in cold, soggy soil, which is why more rosemary dies in a wet Northwest winter than in a cold, dry one. Plant it in fast-draining soil, on a slope or in a raised bed, and never in a spot where water pools. Mixing gravel into heavy clay helps."],
      ["Cold hardiness",
        "Most rosemary varieties are damaged somewhere around 15 to 20°F. Hardier selections like Arp and Madeline Hill (also sold as Hill Hardy) survive colder winters, especially in well-drained soil. Cold, drying winds make damage worse, so a spot near a south-facing wall is ideal. In colder eastern areas, grow rosemary in a pot and move it to a cool, bright spot for winter."],
      ["Soil and feeding",
        "Rosemary grows best in lean, well-drained soil and tolerates neutral to slightly alkaline pH. It doesn't need fertilizer. Rich soil and extra water make it grow fast and soft, with less of the aromatic oil that gives it flavor. Once established, water only during long dry spells."],
      ["Pruning",
        "Rosemary has very few dormant buds on old, bare wood, so cuts into leafless stems usually don't regrow. Prune lightly, within the green, leafy part of each stem, right after flowering in spring. Regular light trims keep it compact and stop it from getting leggy."],
      ["In containers",
        "Use a terracotta pot, which dries out faster, and a gritty mix like cactus potting soil. Water when the top inch or two is dry. Indoors in winter, rosemary needs a cool, very bright spot; warm rooms and low light lead to powdery mildew and leaf drop."]
    ],
    faq: [
      ["Why did my rosemary die over winter?", "Most often from wet, cold soil rather than cold alone. The roots rot in waterlogged ground. Replant in fast-draining soil or a raised bed, and choose a hardier variety like Arp."],
      ["Can I leave potted rosemary outside in winter?", "West of the Cascades, usually yes, if the pot drains well and sits against a sheltered wall. In colder areas, roots in pots freeze more easily than in the ground, so move the pot into an unheated garage or other cool, bright spot during hard freezes."],
      ["How do I fix leggy rosemary?", "Prune lightly within the green growth after flowering, and repeat every year. Cuts into old, bare wood rarely regrow, so very woody plants are often best replaced."]
    ]
  },

  mint: {
    keys: [["Spreads by", "Underground rhizomes"], ["From seed", "Unreliable flavor"], ["Soil pH", "6.0–7.0"], ["Light", "Sun to part shade"], ["Best flavor", "Just before flowering"], ["Divide", "Every few years"]],
    sections: [
      ["Why mint takes over",
        "Mint spreads by underground stems called rhizomes, plus runners above ground. Each piece can root and start a new plant, so it quickly spreads through a bed. Grow it in a container, or sink a bottomless pot or bucket into the ground with the rim a couple of inches above the soil, and trim runners that creep over the edge."],
      ["Growing from seed doesn't work well",
        "Peppermint is a natural hybrid between watermint and spearmint and rarely produces viable seed. Many mint seed packets produce plants with weak or unpredictable flavor. Buy plants or take cuttings from a mint whose smell and taste you like. Cuttings root easily in water."],
      ["Flavor",
        "Peppermint's cool bite comes mainly from menthol; spearmint's sweeter flavor comes from carvone. Plants grown in full sun and harvested just before flowering have the most oil. Oregon and Washington, especially the Willamette Valley and the Columbia Basin, grow a large share of the country's peppermint oil."],
      ["Soil and water",
        "Mint likes moist, fertile soil with a pH of about 6.0 to 7.0 and grows in sun or part shade. Containers dry out fast in summer, so water them often. Cut plants back hard in midsummer for a fresh flush of tender leaves."],
      ["Mint rust and other problems",
        "Mint rust causes orange pustules on the undersides of leaves. Cut infected stems to the ground and throw them out, which removes the spores. Over the years, the center of a clump tends to die out. Divide and replant the healthy outer pieces every few years in fresh soil."]
    ],
    faq: [
      ["Can I grow mint from seed?", "Not reliably. Peppermint rarely makes viable seed, and many seed-grown mints have weak flavor. Buy a plant you've smelled or tasted, or root a cutting in water."],
      ["What are the orange spots on my mint?", "Mint rust, a fungal disease. Cut the plant to the ground, throw out the clippings, and let it regrow. Good airflow and watering at the base help."],
      ["How do I stop mint from spreading?", "Grow it in a pot, or in a bottomless container sunk into the ground with the rim a couple of inches above the soil. Trim any runners that grow over the edge."]
    ]
  },

  dahlias: {
    keys: [["Plant when soil is", "60°F"], ["First water", "Once shoots appear"], ["Pinch at", "3–4 leaf pairs"], ["Fertilizer", "Low nitrogen"], ["Store tubers", "40–50°F"], ["Frozen tubers", "Die"]],
    sections: [
      ["What you're planting",
        "Dahlias grow from tuberous roots, native to the highlands of Mexico. New shoots come only from the crown, the old stem where the tubers attach, so a tuber with no piece of crown and no eye will never sprout. Look for firm tubers with a visible eye or a bit of crown tissue."],
      ["Warm soil and dry feet",
        "Tubers rot in cold, wet soil, so plant once the soil has warmed to about 60°F, usually late April or May in the Northwest. Don't water after planting until shoots appear; the tuber has all the moisture it needs, and extra water just invites rot. Once plants are growing, water deeply about once a week."],
      ["Pinching for more flowers",
        "When a young plant has three or four pairs of leaves, pinch out the central growing tip. The plant then branches into several stems, giving more flowers on longer stems. Deadhead regularly: spent blooms are cone-shaped and pointed, while buds are round. Removing spent flowers keeps the plant from setting seed, so it keeps blooming until frost."],
      ["Feeding",
        "Use a fertilizer that's low in nitrogen and higher in phosphorus and potassium. Too much nitrogen grows lush leaves, weak stems, fewer flowers, and tubers that store poorly over winter."],
      ["Winter: dig or leave?",
        "Frozen tubers die. West of the Cascades, dahlias in well-drained soil often survive winter in the ground under a thick layer of mulch. In heavy, wet clay or in colder areas, dig them after frost blackens the leaves. Let the clumps dry a few days, then store them at 40 to 50°F in barely damp wood shavings, peat or vermiculite. Check them monthly for rot or shriveling."],
      ["Pests and problems",
        "Slugs and earwigs chew young shoots and petals. Powdery mildew shows up late in the season. Plants with mottled, streaked or crinkled leaves and stunted growth may have a virus. There's no cure, so discard them to keep it from spreading. Dahlias grown from seed don't come true, which is why named varieties are sold as tubers."]
    ],
    faq: [
      ["Do I have to dig up dahlias every fall?", "Not always. West of the Cascades, dahlias in well-drained soil often survive under a thick mulch. In heavy, wet clay or colder areas, dig them after the first frost and store them at 40 to 50°F."],
      ["Why aren't my dahlia tubers sprouting?", "Either the tuber has no eye or piece of crown, or it rotted in cold, wet soil. Plant firm tubers with a visible eye once the soil reaches about 60°F, and don't water until shoots appear."],
      ["Why are my dahlias blooming so late?", "Tubers planted in cold soil grow slowly, and plants given too much nitrogen put on leaves first. Start tubers in pots indoors in April to get ahead, and use a low-nitrogen fertilizer."]
    ]
  },

  tulips: {
    keys: [["Winter cold needed", "12–16 weeks below 48°F"], ["Plant", "October–November"], ["Depth", "6–8 inches (3× bulb)"], ["Keep leaves", "About 6 weeks"], ["Return best", "Darwin hybrids, species"], ["Pre-chill?", "Not needed here"]],
    sections: [
      ["Why tulips need winter",
        "Tulip bulbs need a long cold period, roughly 12 to 16 weeks below about 48°F, before the flower stem will grow properly. Northwest winters provide that naturally, so there's no need to chill bulbs in the fridge. Plant in fall once the soil has cooled, usually October to November, so roots grow before winter."],
      ["Depth and drainage",
        "Plant bulbs about three times as deep as they are tall, typically 6 to 8 inches. Deeper planting helps keep bulbs from splitting into small, non-flowering bulbs and makes it harder for squirrels to dig them up. Bulbs rot in soggy soil, so choose a well-drained spot or a raised bed."],
      ["Why tulips often don't come back",
        "After blooming, a tulip bulb is used up and is replaced by new daughter bulbs. These are often too small to flower the next year, so blooms dwindle. Many modern hybrids are bred for one strong show. Darwin hybrids and species tulips return much more reliably, especially in a sunny spot with a dry summer and no summer watering, which mimics their native habitat in Central Asia."],
      ["Leaves feed next year's bulb",
        "After flowering, leave the leaves until they turn yellow, usually about six weeks. They're making the food that rebuilds the bulb. Snap off spent flower heads so the plant doesn't put energy into seeds. Bulbs come with their own food supply, so they need no fertilizer at planting; for bulbs you want to keep, a light feeding in fall helps."],
      ["Tulip fire and pests",
        "Tulip fire is a fungal disease that causes twisted, spotted, scorched-looking leaves and gray mold in cool, wet springs. Dig out and throw away affected plants and bulbs, and don't plant tulips in that spot for at least three years. Squirrels, voles and deer love tulips, so wire cages or planting among daffodils, which animals avoid, can help. Tulips, especially the bulbs, are toxic to cats and dogs."],
      ["As cut flowers",
        "Cut tulips when buds show color but are still closed. They keep growing in the vase, often several inches, and bend toward the light, so trim stems and turn the vase as needed."]
    ],
    faq: [
      ["Will my tulips come back next year?", "Many modern hybrids bloom well only once, because the bulbs split into smaller ones that don't flower. Darwin hybrids and species tulips return much better, especially in sunny, well-drained spots that stay dry in summer."],
      ["When can I cut back tulip leaves?", "Once they turn yellow, usually about six weeks after flowering. The leaves are making the food the bulb needs for next year."],
      ["Do I need to chill tulip bulbs before planting?", "Not in the Northwest. Winters here provide the 12 to 16 weeks of cold tulips need. Pre-chilling is only needed in mild-winter climates like Southern California."]
    ]
  }
};
