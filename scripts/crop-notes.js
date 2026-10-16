/* Growing notes for every crop that has no in-depth entry in scripts/crop-science.js. Shorter than those:
 * 4 key numbers, 3 sections and 3 questions per crop, shown with the same layout under "Growing notes".
 * Plain text only (escaped when rendered). Keep it consistent with scripts/guide.js, and never cite sources by name. */
const notes = {
  radishes: {
    keys: [["Soil to sprout","45–85°F"], ["Soil pH","6.0–7.0"], ["Water","1 inch a week, evenly"], ["Biggest risk","Root maggots"]],
    sections: [
      ["Soil and steady growth",
        "Radishes want loose, crumbly soil with no rocks or clods, and a pH of about 6.0 to 7.0. They grow so fast that they rarely need extra fertilizer; too much nitrogen gives you big leaves and skinny roots. The real secret is quick, even growth. Keep the top few inches of soil moist from sowing to harvest. A radish that dries out and then gets soaked tends to crack, and one that grows slowly in dry soil turns hot and tough."],
      ["Why radishes go woody or bolt",
        "Radishes are a cool-weather crop. As days get long and warm in early summer, plants switch from making a root to making a flower stalk, and the root turns pithy and sharp. That is why the guide suggests short rows every two weeks rather than one big sowing. In the Northwest, sow from early spring into May, skip midsummer, and start again in late August for a fall crop. East of the Cascades, spring heat arrives fast, so get the first sowings in as soon as the soil can be worked."],
      ["Keeping root maggots out",
        "Cabbage root maggots are the larvae of a small gray fly that lays eggs at the base of young radishes. They do the most damage in cool, wet spring soil, which is exactly what western Oregon and Washington have in April and May. Row cover works because it blocks the fly before eggs are laid, so lay it on the day you sow and tuck the edges into the soil. Rotate where you plant radishes, turnips and cabbage-family crops each year so maggots don't build up in one bed."]
    ],
    faq: [
      ["Why are my radishes all leaves and no root?", "Usually the plants are too crowded, too shaded, or getting too much nitrogen. Thin seedlings to about 2 inches apart and give them full sun. Hot weather can also push plants to flower before they form a root."],
      ["Why are my radishes so spicy?", "Heat and dry soil make radishes hotter. Spring and fall radishes grown in cool weather with steady water are the mildest. Pick them on time, since older radishes get sharper and woodier."],
      ["Can I grow radishes in summer in the Northwest?", "You can try, but most varieties bolt and turn pithy in long, warm summer days. It's easier to take a break from June to mid-August and sow again for fall. Fall radishes are often the best of the year here."]
    ]
  },

  broccoli: {
    keys: [["Plant out","Soil 50°F or warmer"], ["Soil pH","6.0–7.0"], ["Water","1–1.5 inches a week"], ["Biggest risk","Cabbage worms"]],
    sections: [
      ["Soil and feeding",
        "Broccoli is a hungry plant. Give it rich soil with a few inches of compost and a balanced vegetable fertilizer at planting, then a light side-dressing of nitrogen about a month later as heads begin to form. Aim for a pH of 6.0 to 7.0. Many Northwest soils west of the Cascades are naturally acidic, and liming toward the upper end of that range also helps discourage clubroot, a soil disease that causes swollen, knotted roots and wilting plants."],
      ["Why broccoli flowers early or makes tiny heads",
        "Broccoli heads are flower buds, so anything that pushes the plant to bloom early ruins the crop. Stress is the usual cause: transplants left too long in small pots, a hard cold snap right after planting, or dry soil. The plant gives up on growing big and makes a small, early head that quickly opens into yellow flowers. Plant young, healthy starts, keep them watered, and harvest as soon as the head looks full with buds still tight. Fall crops planted in mid to late summer often give the best heads in the Northwest, because they mature in cool weather."],
      ["Worms, aphids, and harvest",
        "The green caterpillars on broccoli come from the small white butterflies seen all summer. Insect netting stops them from laying eggs, and that's easier than picking worms out of the florets later. Gray aphids hide in the heads in late summer; check often and spray them off with water. After cutting the main head, leave the plant in place, since side shoots keep coming for weeks. Purple Sprouting is planted in summer and overwinters west of the Cascades for a spring harvest. Store broccoli unwashed in a bag in the fridge for about a week."]
    ],
    faq: [
      ["Why is my broccoli flowering before the head gets big?", "The plant was stressed, usually by heat, dry soil, or being root-bound in its pot before planting. Once the yellow flowers open, the head won't improve, so cut it and eat what you can. Next time plant younger starts and keep the soil evenly moist."],
      ["Does broccoli grow back after you cut it?", "Not a new main head, but most varieties send up smaller side shoots for several weeks. Cut the main head with a slanted cut, leaving the plant and its leaves in place. Keep watering and the shoots will keep coming."],
      ["How do I get rid of worms in my broccoli?", "Soak cut heads in cool salty water for 15 minutes and the caterpillars float out. To prevent them, cover plants with insect netting from planting day. Organic sprays made from Bt (Bacillus thuringiensis) also work on small caterpillars without harming people or pets."]
    ]
  },

  cabbage: {
    keys: [["Plant out","Soil 50°F or warmer"], ["Soil pH","6.0–7.5"], ["Water","1–1.5 inches a week, evenly"], ["Biggest risk","Split heads, root maggots"]],
    sections: [
      ["Soil and feeding",
        "Cabbage needs fertile soil and steady nitrogen to build a big head. Mix compost and a balanced vegetable fertilizer into the bed before planting, and side-dress once the plants start to fill out. A pH around 6.0 to 7.5 suits it, and keeping the soil from getting too acidic helps prevent clubroot. Mulch after the soil warms to hold moisture and keep weeds down. Like broccoli, set transplants at the depth they grew in the pot and give each one the full 18 inches."],
      ["Why heads split",
        "A cabbage head splits when it takes up a lot of water fast, often after a heavy rain or deep soaking that follows a dry spell. The inside grows faster than the outer leaves can stretch. Even watering is the best prevention. If a firm head is ready and big rain is coming, either harvest it or give the plant a twist to break some of its roots, which slows water uptake. Early Jersey Wakefield and Golden Acre are quick, small-headed types for spring, while January King is grown for fall and winter harvest west of the Cascades."],
      ["Pests, harvest and storage",
        "Cabbage worms, root maggots and gray aphids all go after cabbage in the Northwest. Row cover from planting day handles the first two, and a strong spray of water knocks aphids back. Slugs also hide between the outer leaves in wet weather. Cut heads when they feel solid when squeezed. A whole, dry head keeps for weeks, even a couple of months, in a cold fridge or cool root cellar. Leave the stump in the ground in mild areas and it may sprout a few small bonus heads."]
    ],
    faq: [
      ["Why did my cabbage split open?", "A sudden rush of water, from rain or a big watering after dry soil, made the inside grow faster than the outer leaves. Water evenly and harvest heads soon after they firm up. A split head is still fine to eat if you use it soon."],
      ["Why isn't my cabbage forming a head?", "Common causes are too little nitrogen, too much heat, crowding, or stressed transplants. Give plants rich soil, full sun, 18 inches of space and even water. Fall crops often head more reliably here because they mature in cool weather."],
      ["How do I know when cabbage is ready to pick?", "Squeeze the head: when it feels firm and solid all the way through, it's ready. Don't wait long after that, since mature heads can split. Cut it at the base with a sharp knife."]
    ]
  },

  corn: {
    keys: [["Soil to sprout","60°F or warmer"], ["Soil pH","5.8–7.0"], ["Water","1+ inch a week at silking"], ["Biggest risk","Cold soil, crows"]],
    sections: [
      ["Soil, warmth and feeding",
        "Corn is a warm-season grass that sprouts poorly in soil below about 60°F, and seed often rots in cold, wet ground. West of the Cascades that usually means waiting until mid to late May, while hot eastern valleys can plant a bit earlier. Supersweet types are even fussier about cold soil. Corn is a heavy nitrogen feeder: work in compost and fertilizer before planting, then side-dress when plants are about knee high. A pH of roughly 5.8 to 7.0 is fine."],
      ["Pollination and why ears are half empty",
        "Each kernel forms only if a grain of pollen lands on its own silk strand. Pollen falls from the tassels on top and drifts on the wind, which is why corn is planted in a block of short rows instead of one long row. Gappy ears usually mean poor pollination from too few plants, hot dry weather at silking, or drought. Water deeply when tassels and silks appear. Also keep sweet corn types apart: if a supersweet crosses with a regular sweet corn, the kernels can turn starchy."],
      ["Harvest, storage, and east vs west",
        "Sweet corn's sugar starts turning to starch the moment you pick it, so harvest right before cooking or chill ears quickly in the fridge. Check ears about three weeks after silking: brown silks, a full rounded tip and milky juice in the kernels mean ready. West of the Cascades, choose quicker varieties like Early Sunglow and Golden Bantam that finish before cool fall weather. East of the Cascades, longer-season types like Bodacious ripen easily, but watch for raccoons as ears near ripeness."]
    ],
    faq: [
      ["Why are there missing kernels on my corn?", "Those kernels weren't pollinated. Plant in blocks of at least four short rows so pollen falls onto neighboring silks, and water well when plants tassel. Heat and drought at silking also cause gaps."],
      ["When should I plant corn in western Oregon or Washington?", "Wait until the soil is at least 60°F, which is usually mid to late May. Seed planted earlier in cold, wet soil often rots before it sprouts. Black plastic or a clear cover for a week can warm the bed faster."],
      ["Why isn't my sweet corn sweet?", "It may have been picked too late, stored too long, or crossed with another type of corn growing nearby. Pick at the milky stage and eat or chill it right away. Keep different sweet corn types apart or plant them to tassel at different times."]
    ]
  },

  peppers: {
    keys: [["Soil to sprout","75–85°F"], ["Plant out when","Nights stay above 55°F"], ["Soil pH","6.0–6.8"], ["Biggest risk","Cool nights"]],
    sections: [
      ["Soil and feeding",
        "Peppers like warm, well-drained soil with compost worked in and a pH of about 6.0 to 6.8. Use a balanced fertilizer and go light on nitrogen, which grows leafy plants with few peppers. A modest feeding when the first fruit sets keeps them going. Water deeply and evenly, about an inch a week, since dry spells can cause blossom-end rot on peppers just as on tomatoes. Wait to add straw mulch until summer, because it keeps cool soil cool."],
      ["Why warmth decides everything",
        "Peppers barely grow when nights drop below about 55°F, and transplants set out into cold May soil can sit still for weeks. Flowers also tend to drop off when nights are cool or days are very hot. West of the Cascades, black plastic mulch to warm the soil, row cover for the first weeks, and a spot against a south-facing wall make a big difference. Early, smaller-fruited varieties like Gypsy, Ace, Early Jalapeño and Lunchbox snacking peppers ripen in a short, mild summer. East of the Cascades, heat is plentiful, but midsummer sun can scald exposed fruit, so leafy plants help."],
      ["Harvest and color",
        "Every pepper starts green and changes color as it ripens. Green peppers are simply unripe, which is why red, yellow and orange ones are sweeter. In the Northwest, full color can take weeks, so pick some green to keep plants producing and leave others to ripen. When fall rain or frost threatens, pick everything full size. Peppers keep about a week or two in the fridge, and extras freeze well chopped with no blanching needed."]
    ],
    faq: [
      ["Why are my pepper plants not growing?", "Cold soil and cool nights are the most common reason in the Northwest. Peppers stall until nights stay above about 55°F. Black plastic mulch and row cover help, and plants usually take off once summer warmth arrives."],
      ["Why are my pepper flowers falling off?", "Flowers drop when nights are too cool or days are very hot, and also when plants are dry. It usually stops on its own when the weather evens out. Keep watering steady and avoid heavy nitrogen."],
      ["How long does it take for green peppers to turn red?", "Often about three more weeks after they reach full size, and longer in cool weather. Warmth speeds it up. Near the end of the season, pick peppers with some color and they'll often finish ripening on the counter."]
    ]
  },

  cilantro: {
    keys: [["Soil to sprout","55–70°F"], ["Soil pH","6.2–6.8"], ["Days to harvest","About 50 for leaves"], ["Biggest risk","Bolting in heat"]],
    sections: [
      ["Soil and sowing",
        "Cilantro grows best in fertile, well-drained soil with a pH of about 6.2 to 6.8 and steady moisture. It has a taproot and doesn't transplant well, so sow it directly where it will grow. Each round \"seed\" is actually a husk holding two seeds; gently cracking them before sowing can speed sprouting. Keep the soil damp until seedlings appear, usually within one to three weeks."],
      ["Why cilantro bolts",
        "Cilantro is programmed to flower once days grow long and warm. Heat, dry soil and crowding all speed it up. Once a tall flower stalk rises, the leaves turn thin and feathery and the flavor changes. You can't stop it, but you can work around it: sow a short row every three weeks, give summer sowings afternoon shade, and grow slow-bolt varieties like Calypso, Santo and Leisure. In the Northwest, the most reliable crops come from early spring and late summer sowings. East of the Cascades, summer heat ends spring cilantro quickly, so early sowing matters even more."],
      ["Harvest, coriander, and winter",
        "Cut leaves once plants are about 6 inches tall, taking the outer stems and leaving the center to regrow. Fresh cilantro keeps a week or so in the fridge with stems in a glass of water and a bag over the top. If plants bolt, let them flower: the blooms feed beneficial insects, and the seeds become coriander. Harvest when the seeds turn tan and dry them in a paper bag. West of the Cascades, a late summer sowing often survives mild winters and gives a spring harvest."]
    ],
    faq: [
      ["Why does my cilantro keep going to seed?", "Cilantro naturally bolts as days lengthen and warm up. Sow small batches every few weeks, grow slow-bolt varieties, and give summer plantings some shade. Spring and fall crops last much longer than summer ones."],
      ["Can I grow cilantro from coriander seeds?", "Yes. Coriander is cilantro seed, and whole seeds from the spice aisle often sprout. Seed packets sold for growing are more reliable and may be slow-bolting types."],
      ["How do I harvest cilantro so it keeps growing?", "Cut the outer stems near the base and leave the young center stems in place. Take no more than about a third of the plant at once. It will keep producing until it starts to bolt."]
    ]
  },

  parsley: {
    keys: [["Soil to sprout","50–85°F"], ["Days to sprout","2–4 weeks"], ["Soil pH","6.0–7.0"], ["Life span","Two years (biennial)"]],
    sections: [
      ["Soil, sowing and slow sprouting",
        "Parsley likes rich, moist, well-drained soil with a pH of about 6.0 to 7.0. Its seeds contain natural compounds that slow sprouting, which is why they can take three weeks or more to come up. Soaking seeds overnight in warm water helps, and so does keeping the soil surface damp the whole time. Many Northwest gardeners skip the wait and buy young plants. Feed lightly with compost or a balanced fertilizer, and water during dry spells."],
      ["Why parsley flowers in its second year",
        "Parsley is a biennial. It grows leaves the first year, survives winter, then sends up a flower stalk the next spring and finishes. West of the Cascades, plants often keep going through a mild winter and give you fresh leaves into early spring. Once they bolt, the leaves get tough and bitter, so sow or plant fresh parsley each spring. East of the Cascades, colder winters may kill plants outright, so mulch them or treat parsley as an annual."],
      ["Pests and harvest",
        "Parsley is mostly trouble-free. You may find striped green and black caterpillars on it: those become swallowtail butterflies, and many gardeners plant a little extra to share. Slugs can chew young plants in wet weather. Harvest by cutting outer stems at the base and letting the center keep growing. Flat-leaf types like Italian Flat Leaf and Giant of Italy have stronger flavor for cooking, while Moss Curled is the frilly garnish type. Store stems in water in the fridge, or freeze chopped leaves."]
    ],
    faq: [
      ["Why won't my parsley seeds sprout?", "Parsley is naturally slow, often taking two to four weeks. Soak seeds overnight and keep the soil constantly moist, since a dry crust stops them. If you need it sooner, buy young plants."],
      ["Does parsley come back every year?", "Not exactly. Parsley lives two years, flowering and dying in its second summer. West of the Cascades it often lasts through winter, but plant new parsley each spring for a steady supply."],
      ["What are the caterpillars eating my parsley?", "Green caterpillars with black stripes and yellow dots are usually swallowtail butterfly larvae. They rarely eat enough to harm a healthy patch. You can move them to a spare plant if you want to save your harvest."]
    ]
  },

  dill: {
    keys: [["Soil to sprout","60–70°F"], ["Soil pH","5.8–6.8"], ["Days to harvest","About 40 for leaves"], ["Biggest risk","Flopping in wind"]],
    sections: [
      ["Soil and sowing",
        "Dill grows in average, well-drained soil with a pH around 5.8 to 6.8 and doesn't need much fertilizer. Rich soil makes soft, floppy plants. It has a long taproot and sulks after transplanting, so sow seed where it will grow, about a quarter inch deep, after the soil has warmed a bit. Keep the soil moist until seedlings appear. Sow a few more seeds every three or four weeks through early summer for a steady supply of leaves."],
      ["Why dill bolts and how to time it",
        "Dill naturally heads for flowering as summer days get long and warm, and after that it makes few new leaves. If you grow it mainly for leaves, choose Fernleaf or Bouquet and sow several times. If you want flower heads for pickles, time one sowing about two months before cucumbers start producing, since the two are harvested together. Dill and fennel can cross, which spoils the flavor of saved seed, so keep them apart. West of the Cascades, stake taller types or grow compact Fernleaf to handle rain and wind."],
      ["Insects, harvest and seed",
        "Dill flowers are excellent for beneficial insects like ladybugs, lacewings and tiny parasitic wasps that help control aphids on nearby crops. Aphids sometimes cluster on dill itself; a spray of water clears them. Snip leaves any time. They wilt fast, so use them quickly or freeze them. For seed, let flower heads turn brown, then cut them into a paper bag to dry. Dill self-sows readily, so expect volunteer seedlings next spring."]
    ],
    faq: [
      ["Why is my dill flowering so soon?", "Long, warm days push dill to flower. Sow small batches every few weeks and choose leafy types like Fernleaf. Letting some plants flower is fine; they feed beneficial insects."],
      ["Can I transplant dill?", "Dill has a taproot and usually stalls or bolts after being moved. Sow it directly in the garden instead. If you do buy starts, plant them young and disturb the roots as little as possible."],
      ["When do I harvest dill for pickles?", "Cut the flower heads just as they open, when they are still bright yellow. Plan a sowing about two months before your cucumbers are ready so both crops line up."]
    ]
  },

  cauliflower: {
    keys: [["Plant out","Soil 50°F or warmer"], ["Soil pH","6.0–7.0"], ["Water","1–1.5 inches a week, evenly"], ["Biggest risk","Button heads"]],
    sections: [
      ["Soil and feeding",
        "Cauliflower needs rich, moisture-holding soil with plenty of compost and a pH of about 6.0 to 7.0. It is sensitive to a shortage of boron, a trace nutrient, which can cause hollow stems and brown heads; a good compost or a complete vegetable fertilizer usually covers it. Side-dress with nitrogen about a month after planting. Above all, keep growth steady. Cauliflower has little tolerance for a check in growth, so water evenly and mulch once the soil is warm."],
      ["Why cauliflower makes tiny heads",
        "If young plants are stressed by cold, drought, crowding or being root-bound, they can form a small \"button\" head early instead of a full one. That's why the guide warns against rushing spring planting. Set out young, healthy starts after the worst cold has passed, and don't let them dry out. In the Northwest, fall crops planted in mid-summer are often the most reliable, because heads form in cool, even weather. East of the Cascades, hot early summer weather can also cause loose, ricey heads, which is another reason fall crops shine there."],
      ["Blanching, harvest and storage",
        "Sunlight turns white heads yellowish and stronger tasting. When the head is about the size of an egg, pull the outer leaves over it and tie them loosely, or snap a few leaves over the top. Purple types like Graffiti don't need this. Check under the leaves every few days, since heads go from ready to overripe quickly. Cut while the curds are tight and smooth. Cauliflower keeps about a week in the fridge, and blanched florets freeze well."]
    ],
    faq: [
      ["Why is my cauliflower head so small?", "Stress early in life, from cold snaps, dry soil, or pot-bound transplants, makes plants form small button heads. Plant young starts, keep the soil evenly moist and feed well. Fall crops usually do better in the Northwest."],
      ["Why is my cauliflower turning yellow or purple?", "Sun exposure discolors white heads. Tie the outer leaves over the head when it's small to keep it pale. The color change is harmless, though the flavor gets a bit stronger."],
      ["When should I plant fall cauliflower?", "Set out starts in mid-summer so heads form in the cool weather of fall. Keep young plants well watered through late summer heat. Check the planting calendar for your area's dates."]
    ]
  },

  "brussels-sprouts": {
    keys: [["Days to harvest","About 100 from planting"], ["Soil pH","6.0–7.5"], ["Water","1–1.5 inches a week"], ["Biggest risk","Gray cabbage aphids"]],
    sections: [
      ["Soil and long-season feeding",
        "Brussels sprouts stand in the garden for months, so they need deep, rich soil with plenty of compost and a pH of about 6.0 to 7.5. Feed at planting and side-dress once or twice during summer, but don't overdo the nitrogen late in the season, since that can give loose sprouts. Plants grow tall and top-heavy, so firm the soil well around transplants and stake them in windy spots. Mulch to keep soil evenly moist through the dry Northwest summer."],
      ["Timing and topping",
        "Sprouts taste best when they mature in cool fall weather, because frost converts starches into sugars. Plant starts in late spring or early summer so the main harvest comes in fall and winter. About a month before you want to pick, you can pinch out the growing tip at the top of the stalk. This \"topping\" stops the plant growing taller and sends energy into the sprouts, so they size up more evenly. West of the Cascades, plants keep producing into winter. East of the Cascades, harvest before the deepest cold, though plants handle hard frost well."],
      ["Aphids and harvest",
        "Gray cabbage aphids are the main pest. They hide between the sprouts and in leaf folds in late summer, protected by a waxy coating. Spray them off with water every few days, and remove badly infested leaves. Beneficial insects often catch up by fall. Pick sprouts from the bottom up when they are firm and about an inch across, snapping off the yellowing leaves below them as you go. Sprouts keep a week or two in the fridge, or longer if you cut the whole stalk and keep it cool."]
    ],
    faq: [
      ["Why are my Brussels sprouts loose and leafy?", "Hot weather while sprouts form, too much late nitrogen, or uneven watering can all cause loose sprouts. Time planting so they mature in cool fall weather. Topping the plant a month before harvest also helps them firm up."],
      ["Should I cut the top off my Brussels sprouts?", "You can. Pinching out the top growing tip about a month before harvest makes the sprouts mature more evenly. If you prefer a longer harvest over winter, leave the top on."],
      ["Do Brussels sprouts need frost?", "They don't need it, but a few light frosts make them noticeably sweeter. That's why fall and winter harvests are the best. Mature plants tolerate hard frosts well."]
    ]
  },

  leeks: {
    keys: [["Days to harvest","About 120 from planting"], ["Soil pH","6.0–7.5"], ["Water","1 inch a week"], ["Winter-hardy","Yes, west of the Cascades"]],
    sections: [
      ["Soil and feeding",
        "Leeks like deep, loose, fertile soil with a pH of about 6.0 to 7.5. They are heavy feeders over a long season, so work in compost before planting and side-dress with nitrogen a couple of times through summer. Their roots are shallow and their leaves don't shade out weeds, so keep the bed weeded and mulched. Even moisture matters: dry spells slow growth and make stems tough."],
      ["Growing long, white stems",
        "The white part of a leek is simply stem that grew in the dark. Setting seedlings in a 6-inch-deep hole, as the guide describes, starts the process. Don't fill the hole; water settles soil around the plant over time. As leeks grow, you can hill soil or mulch up around the stems for more white length. Keep soil out of the leaf folds, where it is hard to wash out. King Richard is a quick summer and fall leek, while Bandit and American Flag hold up through winter."],
      ["Winter harvest and problems",
        "West of the Cascades, hardy leeks stand in the garden all winter and can be dug as needed, which makes them one of the best winter vegetables in the region. East of the Cascades, harsh cold may damage them, so harvest before the deep freeze or cover them heavily with straw. Rust, small orange spots on the leaves, sometimes appears in late summer. It looks bad but rarely ruins the stems; pick off affected leaves and give plants more space. Onion thrips can silver the leaves in hot, dry eastern summers."]
    ],
    faq: [
      ["How do I get long white leeks?", "Plant seedlings deep, in holes about 6 inches deep, and hill soil or mulch around the stems as they grow. The part kept from light stays white and tender. Rich soil and steady water help them grow thick."],
      ["Can I leave leeks in the ground over winter?", "West of the Cascades, yes: winter-hardy varieties like Bandit can be dug all winter. East of the Cascades, mulch them heavily or harvest before hard freezes. Dig them before they send up flower stalks in spring."],
      ["What are the orange spots on my leek leaves?", "That's rust, a fungal disease common in late summer. It's mostly cosmetic and the stems are still good to eat. Remove the worst leaves, avoid crowding, and don't plant leeks or garlic in the same spot next year."]
    ]
  },

  arugula: {
    keys: [["Soil to sprout","40–85°F"], ["Soil pH","6.0–7.0"], ["Days to harvest","About 3–5 weeks"], ["Biggest risk","Flea beetles"]],
    sections: [
      ["Soil and sowing",
        "Arugula isn't fussy. Ordinary garden soil with a little compost and a pH of about 6.0 to 7.0 grows it well. It sprouts in cool soil, often within a week, so it's one of the first crops you can sow in spring. Scatter seed thinly, cover lightly, and keep the soil moist. Thin plants to about 4 inches apart and eat the thinnings. Steady moisture keeps leaves tender and mild; dry soil makes them tough and peppery."],
      ["Why arugula bolts and gets spicy",
        "Arugula is a cool-season green that flowers as days get long and warm. Heat and drought speed this up and make the leaves sharper. Sow small batches every two or three weeks in spring, take a break in midsummer or give it afternoon shade, then sow again in late summer for fall. Fall arugula is often the best, and west of the Cascades it can last well into winter under row cover. Wild arugula (Sylvetta) grows slower, handles heat better and often comes back from the roots."],
      ["Flea beetles and harvest",
        "Flea beetles are tiny black beetles that jump like fleas and chew small round holes in leaves, especially in warm spring weather. Lay row cover on right after sowing and seal the edges; damage drops off once plants grow fast or the weather cools. Pick leaves when 2 to 3 inches long, cutting outer leaves or shearing the whole patch an inch above the soil to regrow. If plants bolt, the small white flowers are edible and mild. Store leaves in a sealed container in the fridge for several days."]
    ],
    faq: [
      ["What is making tiny holes in my arugula?", "Flea beetles. They're worst in spring. Cover seedlings with floating row cover from sowing day, and keep plants growing quickly with steady water."],
      ["Why is my arugula so bitter?", "Heat, dry soil, and age all make arugula stronger. Pick leaves young and keep the soil moist. Spring and fall crops are mildest."],
      ["Does arugula grow back after cutting?", "Yes, if you cut an inch or so above the crown, it will regrow for a few more harvests. Production slows once the plant starts to bolt. Sow a fresh batch every few weeks for a steady supply."]
    ]
  },

  "bok-choy": {
    keys: [["Soil to sprout","45–85°F"], ["Soil pH","6.0–7.5"], ["Days to harvest","About 30–45"], ["Biggest risk","Bolting, flea beetles"]],
    sections: [
      ["Soil and feeding",
        "Bok choy grows fast and wants rich, moist soil with compost and a pH of about 6.0 to 7.5. Leafy crops like it need nitrogen, so mix in a balanced fertilizer at planting. Keep the soil evenly moist; dry soil makes stems stringy and pushes plants toward flowering. Space according to the size you want: closer for baby bok choy like Toy Choy, wider for full heads like Joi Choi."],
      ["What makes bok choy bolt",
        "Two things push bok choy to flower: long days and a spell of chilly weather while plants are young. A week or more of nights below about 50°F after transplanting can trigger bolting later, even if the plant looks fine. That's why spring crops in the Northwest are tricky and why the guide calls fall crops the easiest. Sow or transplant spring bok choy once the worst cold is past, protect it with row cover, and harvest early. For fall, sow in mid to late summer so plants mature in shortening, cool days. Mei Qing Choi is known for holding well."],
      ["Pests and harvest",
        "Flea beetles riddle young leaves in spring, and slugs hide in the stems during wet Northwest weather. Row cover from sowing day and iron phosphate slug bait handle both, and cabbage worms are kept out by the same cover. Harvest baby plants at about 6 inches tall, or cut full heads at the base before a flower stalk appears. You can also pick outer leaves over time. Bok choy keeps about a week in the fridge in a bag."]
    ],
    faq: [
      ["Why is my bok choy bolting?", "Long spring days and chilly nights after planting both trigger flowering. Plant in late summer for fall harvest, or wait for milder spring weather and harvest young. Steady watering helps too."],
      ["What is eating holes in my bok choy?", "Small round holes are usually flea beetles; bigger ragged holes and slime trails mean slugs. Row cover keeps out flea beetles, and iron phosphate bait controls slugs safely."],
      ["Can I harvest bok choy more than once?", "Yes. Pick outer leaves as needed, or cut the whole plant an inch above the soil and it may regrow smaller leaves. Harvest before it starts to flower."]
    ]
  },

  turnips: {
    keys: [["Soil to sprout","50–85°F"], ["Soil pH","6.0–7.5"], ["Days to harvest","About 35–55"], ["Biggest risk","Root maggots"]],
    sections: [
      ["Soil and sowing",
        "Turnips grow best in loose, well-drained soil with a pH of about 6.0 to 7.5. Mix in some compost, but avoid heavy nitrogen, which grows leaves instead of roots. Sow seeds directly, keep the soil moist until they sprout, and thin early so each plant has room. Crowded turnips stay small and lopsided. Steady watering keeps roots sweet and smooth; dry soil makes them hot and woody."],
      ["Spring vs fall, and why fall is sweeter",
        "Turnips are a cool-season crop. In spring, warm weather and long days can make roots tough and plants bolt, so sow as early as the soil allows and pick young. Fall crops, sown in mid to late summer, mature as the weather cools, and a light frost turns some of their starches to sugar. West of the Cascades, fall turnips often hold in the ground into early winter. East of the Cascades, harvest before the soil freezes hard. Hakurei is a quick, mild salad turnip, while Purple Top White Globe is the classic for cooking and storage."],
      ["Root maggots, harvest and storage",
        "Cabbage root maggots tunnel into turnips in cool, wet soil, leaving brown trails. Row cover laid on at sowing keeps the egg-laying flies away, and rotating where you plant cabbage-family crops helps too. Pull roots at 2 to 3 inches across for the most tender texture. Twist off the greens, which are good cooked, and store roots in a bag in the fridge for several weeks. Larger fall turnips can keep for months in a cold, damp root cellar."]
    ],
    faq: [
      ["Why are my turnips woody or bitter?", "They were probably left in the ground too long, grew in hot weather, or dried out. Pick turnips small, about 2 to 3 inches across, and keep the soil moist. Fall crops are usually the sweetest."],
      ["Can you eat turnip greens?", "Yes, turnip greens are tasty cooked like spinach or collards. Young greens are the most tender. Take a few leaves from each plant if you still want good roots."],
      ["When should I plant turnips for fall?", "Sow in mid to late summer so roots mature in the cool fall weather. Keep the seedbed moist during the heat of August. Check your local calendar for exact dates."]
    ]
  },

  kohlrabi: {
    keys: [["Soil to sprout","45–85°F"], ["Soil pH","6.0–7.5"], ["Harvest size","2–3 inches across"], ["Biggest risk","Cabbage worms"]],
    sections: [
      ["Soil and steady growth",
        "Kohlrabi is in the cabbage family, and the bulb is actually a swollen stem that sits above the soil. It wants fertile soil with compost, a pH of about 6.0 to 7.5, and steady moisture. Feed lightly at planting. The key to a tender bulb is fast, uninterrupted growth: dry spells or heat make the flesh fibrous. Mulch once plants are up to keep the soil evenly moist."],
      ["Timing and why bulbs get woody",
        "Kohlrabi is quick, about two months from seed, and prefers cool weather. Spring crops should go in early, and starts set out too early into a long cold spell may bolt instead of forming a bulb. In the Northwest, fall crops sown in midsummer are especially reliable. Bulbs turn woody when left too long or when grown in hot weather, so pick at tennis-ball size. Kossak is an exception: it's bred to grow large while staying tender, and it stores well. East of the Cascades, get spring crops in early to beat the heat."],
      ["Pests, harvest and storage",
        "Cabbage worms chew the leaves; insect netting keeps the white butterflies from laying eggs. Root maggots and flea beetles can also show up, and the same cover helps. Cut the stem just below the bulb when it reaches 2 to 3 inches across. Remove the leaves (young ones are good cooked), peel the tough outer skin, and eat it raw or cooked. Bulbs keep several weeks in a bag in the fridge, and longer for large storage types."]
    ],
    faq: [
      ["Why is my kohlrabi woody?", "It was likely left to grow too big, grown in hot weather, or short on water. Pick at about tennis-ball size and keep the soil evenly moist. Cool-season crops are the most tender."],
      ["How do you know when kohlrabi is ready?", "When the bulb is 2 to 3 inches across, usually about two months after sowing. Cut it at the base. Don't wait too long, since bigger bulbs toughen quickly."],
      ["What part of kohlrabi do you eat?", "Mainly the round bulb, which is a swollen stem. Peel off the tough skin and eat it raw like an apple-crisp radish or cooked. The young leaves can be cooked like kale."]
    ]
  },

  eggplant: {
    keys: [["Soil to sprout","75–90°F"], ["Plant out when","Nights stay above 55°F"], ["Soil pH","5.8–6.8"], ["Biggest risk","Flea beetles, cool nights"]],
    sections: [
      ["Soil, warmth and feeding",
        "Eggplant loves heat even more than peppers. Give it well-drained soil rich in compost with a pH of about 5.8 to 6.8, and wait to plant until nights stay above about 55°F and the soil has warmed. Plants set out into cold soil stall and often never recover their pace. Feed with a balanced fertilizer at planting and lightly again when fruit sets. Water deeply and evenly, about an inch a week."],
      ["Growing it east vs west of the Cascades",
        "West of the Cascades, eggplant is a challenge because summers are mild and nights are cool. Choose small-fruited, early varieties like Hansel, Fairy Tale and Orient Express, plant them in your hottest spot, and use black plastic mulch and row cover early in the season. Growing in a large dark container against a south wall also works well. East of the Cascades, hot valleys grow eggplant easily. Flowers can drop in extreme heat, though, so steady water and mulch help there."],
      ["Flea beetles, wilt and harvest",
        "Flea beetles chew many tiny holes in young leaves and can stunt small plants. Keep row cover on until plants grow strongly, then remove it so bees can reach the flowers. Verticillium wilt, a soil disease shared with tomatoes and potatoes, causes leaves to yellow and wilt on one side; rotate so eggplant doesn't follow those crops. Pick fruit when the skin is glossy and springs back when pressed. Eggplant doesn't store long: keep it a few days in a cool spot, since the fridge can cause brown spots and pitting."]
    ],
    faq: [
      ["Why isn't my eggplant producing fruit?", "Cool nights are the most common cause in the Northwest, and extreme heat can do the same in eastern valleys. Plants also need pollinators, so remove row cover once flowers open. Small, early varieties set fruit most reliably here."],
      ["What are the tiny holes in my eggplant leaves?", "Flea beetles. They're worst on young plants in spring. Use row cover until plants are growing strongly, and older plants usually outgrow the damage."],
      ["How do I know when eggplant is ripe?", "Look for glossy skin that springs back when pressed gently. Dull skin and brown seeds mean it's overripe. Cut the stem with pruners rather than pulling, since the stems are tough and sometimes spiny."]
    ]
  },

  melons: {
    keys: [["Soil to sprout","75–95°F"], ["Soil pH","6.0–7.0"], ["Water","1–2 inches a week"], ["Biggest risk","Cool soil and nights"]],
    sections: [
      ["Heat is everything",
        "Melons come from hot climates, and their seeds rot rather than sprout in cold soil. Growth crawls whenever nights drop into the 50s, which is normal for June west of the Cascades. That's why black plastic mulch matters so much here: it warms the soil several degrees and keeps it warm overnight. Lay it a week or two before planting, then cover the plants with floating row cover.",
        "Melon roots resent being disturbed, so if you start seeds indoors, use individual pots and transplant them young, before they get root-bound."],
      ["Flowers, bees and sweetness",
        "Melons make male flowers first and female flowers, the ones with a tiny melon at the base, a week or so later. Bees have to carry pollen between them, so take the row cover off once female flowers open. Poorly pollinated fruit tends to be small or misshapen.",
        "Sugar is made in the leaves, so healthy foliage means sweet fruit. Water deeply while vines grow and fruit swells, then ease off as melons near ripeness. Heavy watering at the end dilutes flavor and can split the fruit."],
      ["East vs west of the Cascades",
        "Eastern valleys like the Yakima and Walla Walla areas have long, hot summers, and melons grow there with little fuss, including larger, longer-season varieties. West of the mountains, pick short-season varieties such as Sugar Baby, Minnesota Midget or Halona, and use every warming trick: the sunniest spot, black plastic, row cover, and a south-facing wall if you have one. Limit each vine to a few fruits so they ripen before cool September nights slow everything down."]
    ],
    faq: [
      ["Why aren't my homegrown melons sweet?", "Usually the vines ran out of warm weather or healthy leaves before the fruit ripened. Picking too early, heavy watering near harvest and disease on the leaves also lower sugar. Short-season varieties, black plastic and fewer fruits per vine all help."],
      ["Can you grow watermelon in Portland or Seattle?", "Yes, with small, early varieties like Sugar Baby and plenty of help from black plastic mulch and row cover. Expect a few modest fruits per plant rather than a big harvest, and expect better results in a hot summer than a cool one."],
      ["Why are my melon flowers falling off?", "The first flowers are usually male, and they drop after a day or so by design. If female flowers (the ones with a tiny fruit behind them) also shrivel, they weren't pollinated. Remove row covers at bloom so bees can reach them."]
    ]
  },

  "pole-beans": {
    keys: [["Soil to sprout","70–80°F, not below 60°F"], ["Soil pH","6.0–7.0"], ["Trellis height","6–8 feet"], ["Biggest risk","Seed rot in cold soil"]],
    sections: [
      ["Wait for warm soil",
        "Bean seeds soak up water fast as they sprout, and in soil below about 60°F they swell but sit still, which gives rot fungi time to move in. In much of the west side that means waiting until late May or early June. A soil thermometer takes the guessing out of it.",
        "Sow dry seed into moist soil instead of soaking it first, which can crack the seeds. If a spring is cold and wet, it's better to sow a week late than to resow a rotted row."],
      ["Trellis and feeding",
        "Pole beans climb 6 to 8 feet, so build a sturdy trellis, teepee or fence before sowing; adding one later tramples seedlings. Beans twine on their own and just need something thin to wrap around, like string or netting.",
        "Beans partner with soil bacteria that fix nitrogen from the air, so they need little fertilizer. Compost at planting is usually enough. Too much nitrogen gives lush vines with few pods. Steady water while flowering matters more, since dry spells make flowers drop."],
      ["Pests and problems",
        "Slugs and bean seed flies attack seedlings in cool, damp springs; warm soil helps plants race past both. Aphids sometimes cluster on tips, and a strong spray of water knocks them back. In hot, dry eastern gardens, spider mites can speckle leaves yellow in midsummer, and keeping plants watered helps. White mold can show up in crowded, wet plantings, so give vines room and water at the base. Rotate beans to a new spot each year."]
    ],
    faq: [
      ["Are pole beans better than bush beans?", "Pole beans produce over a longer season, often for many weeks, and take up less ground since they grow up. Bush beans produce sooner and need no trellis, but give most of their crop in a couple of weeks. Many gardeners grow both."],
      ["Why are my bean flowers falling off?", "Usually stress: hot spells above about 90°F, dry soil, or very cool nights. Keep the soil evenly moist and the plants will set pods again when the weather settles."],
      ["Why are my pole beans tough and stringy?", "They were picked too late. Once the seeds inside bulge, the pods turn fibrous. Pick every few days while pods are pencil-thick; Blue Lake FM-1K and Fortex stay tender longer than many."]
    ]
  },

  "fava-beans": {
    keys: [["Soil to sprout","40–75°F"], ["Soil pH","6.0–7.0"], ["Fall sowing","October, west side"], ["Biggest risk","Black aphids"]],
    sections: [
      ["A bean that likes cool weather",
        "Unlike common beans, favas sprout in cool soil and grow best in mild weather, which suits Northwest springs perfectly. Sow as soon as the soil can be worked in late winter or early spring. Hot weather makes them stop flowering, so early sowing is the key to a good crop.",
        "West of the Cascades, you can also sow hardy varieties like Aquadulce Claudia in October. They grow a little, sit through winter and take off early, giving the earliest harvest. In cold eastern areas, stick to spring sowing."],
      ["Soil and feeding",
        "Favas aren't fussy. Any reasonably drained soil works, and like other beans they fix their own nitrogen, so skip the fertilizer. They're also grown as a cover crop for this reason: chopping the plants into the soil before they set seed adds organic matter and nitrogen.",
        "Tall varieties can flop in wind and heavy rain. A string run along each side of the row, tied to stakes, keeps them upright."],
      ["Aphids and chocolate spot",
        "Black bean aphids crowd onto the soft growing tips in late spring. Pinching off the top few inches once the lowest pods form removes most of them and pushes the plant's energy into the pods. The tips are tasty cooked like spinach.",
        "Chocolate spot is a fungus that causes small brown spots on leaves during long wet spells. It's rarely serious on well-spaced plants in sun. Give rows room for airflow and don't crowd fall plantings."]
    ],
    faq: [
      ["Can you plant fava beans in the fall?", "Yes, west of the Cascades. Sow hardy types like Aquadulce Claudia in October for an early harvest the next spring. Very cold snaps can still damage them, so east of the mountains spring sowing is safer."],
      ["Do I have to peel fava beans?", "Young, small beans can be eaten with their skins. Larger beans have a tough pale skin, so blanch them for a minute, cool them, and pinch the bright green bean out. It's extra work but makes them much sweeter."],
      ["Are fava beans safe for everyone?", "Most people eat them without trouble. People with an inherited condition called G6PD deficiency can have a serious reaction to eating favas, and sometimes even to the pollen. If you or your family have that condition, skip this crop."]
    ]
  },

  shallots: {
    keys: [["Plant","Fall or earliest spring"], ["Soil pH","6.0–7.0"], ["Cure","2 weeks, shady and airy"], ["Stores","6 months or more"]],
    sections: [
      ["Soil and feeding",
        "Shallots grow best in loose, well-drained soil with plenty of compost. Heavy, soggy soil rots bulbs over a wet Northwest winter, so raised beds help west of the Cascades. Feed with a little nitrogen in early spring when growth resumes, and stop by late spring. Once bulbs start forming, extra nitrogen just delays them and hurts storage.",
        "Keep beds weeded. Shallots have thin, upright leaves that can't shade out competition, and weeds steal water and nutrients from the forming cluster."],
      ["Pests and diseases",
        "Onion maggots, the larvae of a small fly, tunnel into bulbs in cool, wet soil. Rotating to a new spot each year and covering spring plantings with row cover help. Rust shows up as orange spots on leaves in damp weather but usually doesn't hurt the harvest much.",
        "White rot is the serious one: a white fuzzy rot at the base with tiny black specks. It lives in soil for many years, so never plant onion-family crops in an infected spot again, and only plant clean bulbs from a trusted source."],
      ["Harvest and storage",
        "Dig shallots when most of the tops have yellowed and fallen over, usually early to midsummer. Lift the clusters gently, shake off soil and leave the tops on while they cure in a dry, shady, airy place for about two weeks. Then trim the tops and roots, separate the bulbs, and store them in a mesh bag in a cool, dry spot. Well-cured shallots often keep longer than onions. Save some of the best, firmest bulbs to replant in fall."]
    ],
    faq: [
      ["Can I plant shallots from the grocery store?", "Sometimes they grow, but they may be treated to stop sprouting or carry disease into your soil. Bulbs sold for planting are a safer bet and come in varieties suited to the Northwest, like French Gray."],
      ["Why are my shallots flowering?", "Stress such as a cold snap after spring growth begins or a dry spell can trigger flowering. Snap off the flower stalk as soon as you see it. The bulbs are still usable but use flowered ones first, since they don't store as well."],
      ["How many shallots grow from one bulb?", "Each planted bulb divides into a cluster of several new bulbs, often around five to ten depending on variety and soil. Bigger planting bulbs and wider spacing usually give bigger clusters."]
    ]
  },

  asparagus: {
    keys: [["Soil pH","6.5–7.5"], ["Bed lasts","15–20 years"], ["Full harvest","6–8 weeks, from year 3"], ["Biggest risk","Weeds and beetles"]],
    sections: [
      ["Start with the right bed",
        "An asparagus bed stays put for a couple of decades, so preparation pays off. Choose full sun and soil that drains well, since crowns rot in waterlogged ground. Asparagus likes a near-neutral pH of about 6.5 to 7.5; many west-side soils are more acidic and benefit from lime worked in before planting. Clear out perennial weeds like quackgrass and bindweed completely first; they're almost impossible to remove once crowns are in.",
        "All-male varieties like Jersey Knight and Millennium produce more spears because they don't spend energy on seeds."],
      ["Why the ferns matter",
        "Every spear you pick is food the crown stored the year before. After the harvest window ends, the spears grow into tall ferns that make food through summer and send it down to the roots for next spring. That's why you don't pick the first year, pick only a couple of weeks the second year, and why you leave ferns standing until they turn brown in fall.",
        "Feed with compost or a balanced fertilizer after harvest ends, when the ferns are building next year's crop."],
      ["Beetles, east and west",
        "Asparagus beetles, small blue-black and orange insects, chew spears and lay dark eggs on them, and their gray larvae strip the ferns. Hand-pick adults in cool mornings, rub off eggs and cut brown ferns in fall to remove their winter cover.",
        "Asparagus does especially well in eastern Washington and Oregon, where hot summers grow strong ferns and cold winters give a full dormancy. West-side beds produce well too, just a little later, and good drainage matters more there."]
    ],
    faq: [
      ["Why are my asparagus spears so thin?", "Thin spears usually mean a young bed, a crown that was over-picked, or weak ferns the previous summer. Stop picking when spears drop to pencil-thickness, feed after harvest and let the ferns grow freely to rebuild the crowns."],
      ["When should I cut back asparagus ferns?", "Wait until they turn yellow or brown in fall, after the plant has moved its stored food down to the crowns. Cutting them green weakens next year's harvest. Removing old ferns also takes away a winter hiding place for asparagus beetles."],
      ["Can I harvest asparagus the first year?", "It's best not to. First-year crowns need every spear to grow ferns and build roots. Pick lightly for about two weeks in year two, then harvest fully for six to eight weeks from year three on."]
    ]
  },

  rhubarb: {
    keys: [["Soil pH","6.0–6.8"], ["Pull stalks at","10–15 inches long"], ["Divide","Every 5–10 years"], ["Biggest risk","Crown rot in wet soil"]],
    sections: [
      ["Soil and feeding",
        "Rhubarb is a hungry perennial that grows huge leaves every spring, so it rewards rich soil. Dig plenty of compost or aged manure into a wide area before planting, and spread a couple of inches of compost around the plant each spring, keeping it off the crown itself. Good drainage is essential: crowns rot in soggy winter soil, which is why west-side gardeners often plant on a low mound.",
        "Rhubarb needs a cold winter to rest, which every part of the Northwest provides."],
      ["Harvest without weakening the plant",
        "Pull stalks with a twist instead of cutting them, which leaves no stub to rot. Take no more than a third of the stalks at a time and stop in early summer, so the leaves that remain can rebuild the crown for next year. Thin, spindly stalks are a sign to stop sooner.",
        "The leaves contain high levels of oxalic acid and are poisonous to eat, so cut them off and use only the stalks. Leaves are fine to put in the compost pile."],
      ["Care over the years",
        "Cut flower stalks off at the base as soon as they appear; seed-making takes energy away from new leaves. Older plants flower more, and so do stressed ones.",
        "After five to ten years, clumps get crowded and stalks get thinner. In early spring, just as buds swell, dig the crown and split it with a sharp spade into pieces that each have at least one or two buds and a good chunk of root. Replant them in fresh, enriched soil."]
    ],
    faq: [
      ["Why is my rhubarb flowering?", "Mature plants flower naturally, and stress from heat, drought or poor soil makes it more likely. Cut the flower stalk off at the base right away. If a plant flowers heavily every year, it may be time to divide it."],
      ["Why are my rhubarb stalks green instead of red?", "Color depends on the variety, not ripeness. Victoria is mostly green with red at the base, while Canada Red and Crimson Red are redder. Green stalks taste just as good, though they make paler pies and jam."],
      ["Can I put rhubarb leaves in my compost?", "Yes. The oxalic acid that makes the leaves poisonous to eat breaks down during composting and doesn't harm the pile or your soil. Just don't feed them to people or animals."]
    ]
  },

  chives: {
    keys: [["Soil to sprout","60–70°F"], ["Soil pH","6.0–7.0"], ["Divide","Every 3–4 years"], ["Hardy to","Well below 0°F"]],
    sections: [
      ["Getting started",
        "Chives grow easily from seed, but they're slow at first, so many gardeners start seeds indoors or buy a small plant. A friend's clump is even better: a few bulbs dug from an established plant take off right away. Chives like ordinary garden soil with some compost, steady moisture and at least half a day of sun.",
        "They're fully hardy everywhere in the Northwest. The leaves die back in a hard freeze and return early in spring, often the first fresh herb of the year."],
      ["Cutting and flowers",
        "Cut leaves near the base rather than snipping the tips; tip-cut leaves turn brown and ragged. After the purple flowers fade in early summer, shear the whole clump to a couple of inches above the soil. It regrows fresh, tender leaves within a few weeks.",
        "Removing spent flowers also stops self-seeding. Common chives seed around a bit, and garlic chives, with their flat leaves and white late-summer flowers, can seed aggressively if left alone."],
      ["Keeping chives for winter",
        "Chives lose most of their flavor when dried. Freezing works much better: chop fresh leaves, spread them on a tray to freeze, then store them in a jar or bag in the freezer and use them straight from frozen. A pot of chives on a bright windowsill also gives small cuttings through winter.",
        "Pests are rare, though onion thrips can cause silvery streaks on leaves in hot, dry eastern summers. A spray of water helps."]
    ],
    faq: [
      ["Should I let my chives flower?", "You can. The flowers are edible and loved by bees. Cut them off once they fade, though, to keep the plant from seeding all over and to get a fresh flush of leaves."],
      ["What's the difference between chives and garlic chives?", "Common chives have hollow, round leaves, purple spring flowers and a mild onion flavor. Garlic chives have flat leaves, white late-summer flowers and a garlicky taste. Both are hardy perennials grown the same way."],
      ["How do I preserve fresh chives?", "Freeze them. Chop the leaves, freeze them spread out on a tray, then bag them. Dried chives keep their color but lose most of their flavor."]
    ]
  },

  thyme: {
    keys: [["Soil pH","6.0–8.0"], ["Water","Only in long dry spells"], ["Replace plants","Every 3–5 years"], ["Biggest risk","Wet winter soil"]],
    sections: [
      ["Drainage beats everything",
        "Thyme comes from dry, rocky Mediterranean hillsides. It handles cold well, but sitting in cold, wet soil all winter rots its roots, and that kills more thyme in western Oregon and Washington than frost ever does. Plant it in a raised bed, at the edge of a rock wall, on a slope or in a pot with gritty mix. Mixing some fine gravel into heavy soil helps.",
        "Skip rich compost and fertilizer. Lean, dry soil keeps plants compact and makes the leaves more flavorful."],
      ["Harvesting and drying",
        "Flavor is strongest just before the plant flowers in late spring, which is the best time for a big harvest. Cut the soft, leafy tips, never into old woody stems. Thyme is one of the herbs that dries really well: bundle stems loosely and hang them in a dry, shady spot for a week or two, then strip the leaves and store them in a jar.",
        "Lemon thyme keeps its citrus scent best when used fresh or added at the end of cooking."],
      ["Pruning and winter",
        "Trim plants lightly after flowering to keep them dense; unpruned thyme sprawls and turns woody in the middle. Even with good care, plants decline after a few years, so take cuttings or buy a new plant to replace tired ones.",
        "English thyme is very cold hardy and does well on both sides of the Cascades. Lemon and French thyme are a bit more tender; in the coldest eastern areas, grow them in a pot that can move to a sheltered spot."]
    ],
    faq: [
      ["Why is my thyme dying in the middle?", "Thyme naturally gets woody in the center as it ages, especially if it isn't trimmed. Wet soil can also kill the center first. Trim lightly each year after flowering and replace old plants every few years."],
      ["Can I grow thyme from seed?", "Yes, but the seed is tiny and the seedlings are slow, so most gardeners buy small plants or root cuttings instead. Plants grown from seed can also vary in flavor, while cuttings match the parent."],
      ["When should I prune thyme?", "Lightly after it flowers in summer, removing spent flowers and a little leafy growth. Avoid heavy pruning in fall, and don't cut into old bare wood, which may not sprout again."]
    ]
  },

  oregano: {
    keys: [["Soil pH","6.0–8.0"], ["Fertilizer","Rarely, if ever"], ["Best flavor","Just before flowering"], ["Divide","Every 3–4 years"]],
    sections: [
      ["Lean soil, strong flavor",
        "Oregano's flavor comes from aromatic oils in the leaves, and plants make the most of them in full sun and lean, well-drained soil. Rich soil, fertilizer and lots of water grow big, leafy plants with a milder taste. Once established, water only in long dry spells.",
        "Like most Mediterranean herbs, it dislikes soggy winter soil, so give it a raised or well-drained spot west of the Cascades. It's hardy across the Northwest, though Greek oregano is a little less cold-tolerant in the harshest eastern winters."],
      ["Pick the right plant",
        "The word oregano covers plants with very different flavors. Greek oregano has the strong, peppery taste most cooks want. Many seed packets labeled simply oregano grow a mild, ornamental type with little flavor. The safest approach is to buy a plant and rub a leaf before you buy: good culinary oregano should smell sharp and taste almost spicy.",
        "Golden oregano is milder and grown mostly for its bright foliage."],
      ["Harvesting, drying and dividing",
        "Cut stems just as flower buds form, when flavor peaks, and dry bunches upside down in a shady, airy spot. Unlike many herbs, dried oregano keeps much of its flavor. Cutting back by half in early summer gives a second flush of leaves for a later harvest.",
        "After three or four years, clumps get woody in the middle. In spring, dig the clump, cut it into a few pieces with healthy roots and shoots, and replant the strongest ones."]
    ],
    faq: [
      ["Why does my oregano have no flavor?", "Either it's a mild ornamental type, or it's growing in rich, damp soil or shade. Greek oregano in full sun and lean soil has the strongest taste. Harvest just before it flowers for the best flavor."],
      ["Is oregano the same as marjoram?", "They're close relatives in the same plant group. Marjoram is sweeter and milder and less cold hardy, while oregano is more pungent and a tough perennial in most of the Northwest."],
      ["Should I let oregano flower?", "For the best leaves, harvest before it flowers. But the flowers are a favorite of bees and other pollinators, so many gardeners let part of the plant bloom and cut the rest for the kitchen."]
    ]
  },

  sunflowers: {
    keys: [["Soil to sprout","70–85°F best"], ["Soil pH","6.0–7.5"], ["Days to bloom","60–90"], ["Biggest risk","Slugs and birds"]],
    sections: [
      ["Timing and sowing",
        "Sunflowers sprout fastest in warm soil, so sow after the soil has warmed in late spring. In cold, wet soil, seeds sit for days and seedlings get eaten before they grow. Sow directly where they'll grow, since their long taproot makes transplanting hard.",
        "For a steady supply of cut flowers, sow a short row every two weeks into early July. Single-stem cutting varieties like ProCut bloom once, then they're done, so succession sowing keeps flowers coming. Branching types bloom over a longer stretch."],
      ["Wind, soil and support",
        "Sunflowers aren't fussy about soil as long as it drains, but giants like Mammoth Grey Stripe need extra compost and steady water to reach full height. They also catch a lot of wind. Plant tall varieties in a sheltered spot, mound soil around the base of the stems as they grow, and stake them before late-summer storms.",
        "Dwarf types like Teddy Bear are a good choice for windy sites and containers."],
      ["Harvesting seeds",
        "For seeds, the head is ready when the back turns from green to yellow-brown and the petals have dropped. Birds and squirrels know before you do, so cover heads with paper bags or mesh once seeds start to fill. Cut the head with a foot of stem and hang it in a dry, airy place to finish. West of the Cascades, fall rain can mold heads left outside, so bring them in early."]
    ],
    faq: [
      ["Do sunflowers really follow the sun?", "Young plants do: their buds and leaves turn from east to west during the day and reset overnight. Once the flowers open, most mature heads stop moving and stay facing roughly east."],
      ["Why are my sunflower heads empty of seeds?", "Poor pollination is the usual cause, from too few bees or cool, wet weather at bloom. Some cutting varieties like ProCut are bred to be pollenless so they don't shed on tables, and they make few seeds."],
      ["Can I transplant sunflower seedlings?", "It's possible if you move them very young and keep the root ball intact, but they often stall. Sowing directly in the garden usually gives stronger, faster plants."]
    ]
  },

  "sweet-peas": {
    keys: [["Soil to sprout","55–65°F"], ["Soil pH","6.5–7.5"], ["Climbs","Up to 6–8 feet"], ["Biggest risk","Summer heat"]],
    sections: [
      ["Soil and sowing",
        "Sweet peas grow deep roots and bloom best in rich, well-drained soil with plenty of compost dug in. Soak the hard seeds overnight before sowing so they take up water and sprout evenly. Slugs love the seedlings, so watch closely in cool, damp springs.",
        "When seedlings have three or four pairs of leaves, pinch off the top. The plant responds with several strong side shoots, which means more stems and more flowers. Guide young vines onto the trellis; their tendrils grab netting easily once started."],
      ["Keep them blooming",
        "A sweet pea plant's goal is to make seeds. As soon as a pod forms, the plant slows down flowering, so cutting flowers every couple of days, and snipping off any pods you miss, keeps buds coming. Steady watering and mulch to keep roots cool help them last into summer.",
        "Hot weather ends the show. That's why early sowing matters: plants that bloom in the cool weeks of June have a long season before heat arrives. East of the Cascades, the window is shorter, so sow as early as the soil allows."],
      ["Common problems",
        "Aphids cluster on new growth, and a spray of water usually handles them. Powdery mildew shows up as white powder on leaves late in the season, a sign the plants are winding down. Buds sometimes drop in cold, cloudy spells; they recover when the weather brightens.",
        "Remember that sweet pea seeds and pods are toxic, so keep them away from children and pets, and never plant them where you grow edible peas."]
    ],
    faq: [
      ["Why don't my sweet peas smell?", "Fragrance depends heavily on variety. Many modern varieties were bred for large flowers and lost some scent, while old types like Cupani are very fragrant. Flowers also smell strongest on warm days."],
      ["Can I sow sweet peas in fall?", "In the mildest coastal and Puget Sound gardens some gardeners do, but hard freezes can kill young plants. Late winter or very early spring sowing is more reliable in most of the Northwest."],
      ["Why are my sweet peas turning yellow and done by July?", "Heat and the end of their season. Plants decline as temperatures rise and once they're allowed to form pods. Sow earlier next year, pick constantly and keep the roots cool with mulch."]
    ]
  },

  daffodils: {
    keys: [["Plant","Fall, after soil cools"], ["Soil pH","6.0–7.0"], ["Leave leaves","About 6 weeks after bloom"], ["Divide","When blooms dwindle"]],
    sections: [
      ["Why daffodils are so easy",
        "Daffodil bulbs, leaves and flowers contain toxic compounds, so deer, voles and squirrels leave them alone. That makes them the go-to spring bulb where animals eat tulips. They need a winter chill to bloom, which the whole Northwest provides.",
        "Their one weakness is soggy soil. Bulbs sitting in cold, waterlogged ground over a wet west-side winter can rot. Plant on a slope, in a raised bed or anywhere water doesn't puddle after rain."],
      ["Let the leaves work",
        "After flowering, the leaves keep making food and sending it down to the bulb for next year's bloom. Leave them in place until they yellow, usually about six weeks. Cutting them early, tying them in knots or braiding them shades and weakens the leaves and leads to fewer flowers.",
        "A sprinkle of bulb fertilizer or compost as shoots come up in late winter helps older plantings. Snap off spent flowers so the plant doesn't spend energy on seed."],
      ["Dividing and problems",
        "Daffodil bulbs multiply, and after several years clumps can get so crowded that they produce lots of leaves but few flowers. When that happens, dig the clump once the leaves have died back in early summer, separate the bulbs and replant them right away or in fall.",
        "Narcissus bulb fly larvae can hollow out bulbs, leaving soft, empty ones. Firm the soil around the leaves as they fade so the flies can't reach the bulbs, and discard any soft bulbs you dig up."]
    ],
    faq: [
      ["Why didn't my daffodils bloom this year?", "Common reasons are leaves cut off too early last year, crowded clumps, too much shade or bulbs planted too shallow. Let the leaves die back on their own, divide crowded clumps and make sure they get some spring sun."],
      ["Can I cut back daffodil leaves after flowering?", "Wait until they turn yellow, usually about six weeks after bloom. Until then they're feeding the bulb for next year. Plant them among perennials whose new growth hides the fading leaves."],
      ["Can I plant daffodil bulbs in spring?", "Bulbs sold in fall should go in by late fall or early winter. If you find unplanted bulbs in spring, plant them anyway; they may bloom late or skip a year, but firm bulbs often recover."]
    ]
  },

  apples: {
    keys: [["Years to fruit","2–4 (dwarf)"], ["Pollination","Needs a partner"], ["Soil pH","6.0–7.0"], ["Biggest risk","Apple scab"]],
    sections: [
      ["Choosing a variety and rootstock",
        "The rootstock decides how big your tree gets and how soon it fruits. Dwarfing rootstocks such as M9 or M26 keep trees small enough to prune and pick from the ground, and they bear sooner, but they have weak roots and need a permanent stake. Semi-dwarf rootstocks like M7 make a sturdier, freestanding tree that takes a few more years to start.",
        "West of the Cascades, scab resistance matters more than anything else. Liberty shrugs off scab in wet springs, and Akane holds up well too. Honeycrisp and Gravenstein are worth growing for flavor, but expect more spraying or more spotted fruit in rainy years."],
      ["Pollination partners",
        "Almost every apple needs pollen from a different variety that blooms at the same time, carried by bees. A neighbor's tree or a crabapple within a few hundred feet often does the job, but planting two compatible varieties is the sure way. Gravenstein produces poor pollen, so it needs two other varieties nearby: one to pollinate it and one to pollinate the partner. Liberty, Akane and Honeycrisp all bloom in the middle of the season and work well together."],
      ["Northwest pests and how to stay ahead",
        "Apple scab is a fungus that spreads from last year's fallen leaves during spring rain, so raking and composting leaves in fall cuts the next year's infection a lot. Codling moth larvae tunnel to the core in summer; hang traps in May to see when the moths fly, and bag young fruit in paper or nylon sleeves if you want clean apples without spraying.",
        "Apple maggot also attacks fruit in parts of the region, and some eastern growing areas restrict moving homegrown apples. Picking up dropped fruit every week helps with both maggots and moths."]
    ],
    faq: [
      ["Do I need two apple trees?", "Usually, yes. Most apples won't set much fruit without pollen from a different variety that blooms at the same time. If a neighbor has an apple or crabapple close by, one tree may be enough, but planting two is the reliable choice."],
      ["When should I plant an apple tree in the Northwest?", "Plant bare-root trees in late winter and early spring while they're dormant, as soon as the soil isn't soggy. Potted trees can go in later, but they'll need more summer water the first year."],
      ["Why are my apples covered in black spots?", "That's most likely apple scab, a fungus that thrives in wet Northwest springs. The fruit is still edible once peeled. Rake up fallen leaves each fall and consider a resistant variety like Liberty next time you plant."]
    ]
  },

  pears: {
    keys: [["Years to fruit","3–5"], ["Pollination","Plant two varieties"], ["Pick European pears","Mature but still hard"], ["Biggest risk","Pear scab, fire blight"]],
    sections: [
      ["Choosing varieties that pollinate each other",
        "Pears are some of the most forgiving fruit trees for west-side gardens: they tolerate heavy, damp soil better than most fruit trees and need little spraying. Most European pears need a second variety that blooms at the same time. Bartlett, Comice and Seckel can pollinate each other, though Bartlett and Seckel are a poor match. Asian pears like Shinseiki bloom early, but they often overlap enough with early European pears to help with pollination as well.",
        "Choose a rootstock suited to your space. Dwarfing pear rootstocks still make fairly large trees, so leave room as guide spacing suggests."],
      ["Why European pears ripen off the tree",
        "A European pear left on the tree ripens from the inside out and turns gritty or mushy at the core. Pick them when they reach full size and the stem snaps off with a gentle lift, while the flesh is still firm. Bartlett ripens at room temperature in about a week. Comice and Anjou-type pears ripen better after a few weeks in the refrigerator, then a few days on the counter. Check ripeness by pressing gently near the stem: when it gives, it's ready."],
      ["Pests and diseases in the Northwest",
        "Pear scab works like apple scab and spreads from fallen leaves in wet springs, so rake leaves each fall. Fire blight is a bacterial disease that thrives in warm, humid weather during bloom; it's more common east of the Cascades. Prune out blackened shoots in dry weather, cutting 8 to 12 inches below the damage and wiping your shears with disinfectant between cuts.",
        "West of the Cascades, pear trellis rust causes bright orange spots on leaves. It spends part of its life on junipers, so it's worse near juniper hedges, and it's mostly cosmetic."]
    ],
    faq: [
      ["Why are my pears gritty or brown in the middle?", "They were left on the tree too long. European pears should be picked while still hard and ripened indoors. Pick when the fruit reaches full size and lifts off the branch easily."],
      ["Do I need two pear trees?", "For most European pears, yes. Plant two varieties that bloom at the same time, such as Bartlett and Comice. A neighbor's pear tree nearby can also do the job."],
      ["How long can you store homegrown pears?", "Bartlett keeps for a few weeks in the refrigerator, while Comice and other winter pears can keep for a couple of months. Bring them out a few days before you want to eat them so they can soften."]
    ]
  },

  plums: {
    keys: [["Years to fruit","3–5"], ["European plums","Self-fertile"], ["When to prune","Summer, in dry weather"], ["Biggest risk","Brown rot"]],
    sections: [
      ["European or Japanese plums",
        "European plums, including Italian prune and Stanley, bloom later and fruit on their own, which makes them the easiest choice for most Northwest gardens. Their dense, sweet flesh is great fresh, dried or baked. Japanese plums such as Shiro and Methley bloom earlier, have juicier fruit and ripen in mid-summer. Shiro sets a much better crop with another Japanese plum nearby, and Methley is a popular partner because it's partly self-fertile. In frost-prone spots, the earlier bloom of Japanese plums can get caught by a cold snap."],
      ["Why plums are pruned in summer",
        "Plums and other stone fruits are prone to silver leaf and bacterial canker, which enter through pruning cuts in cool, wet weather. Cuts made in dry summer weather heal fast and stay clean. Prune lightly after harvest or in July, removing dead wood, crossing branches and tall upright shoots.",
        "Heavy crops are common. Thin young fruit to 3 to 4 inches apart in early summer: the remaining plums grow bigger, brown rot spreads less between touching fruit, and branches are less likely to snap."],
      ["Harvest and brown rot",
        "Brown rot is the main Northwest plum problem. It blights blossoms in rainy springs and turns ripening fruit into fuzzy gray balls that dry into mummies. Those mummies carry the fungus into next year, so pick them off the tree and the ground. Good airflow and thinning help a lot.",
        "Italian prunes are sweetest when left to hang until they wrinkle slightly at the stem. Japanese plums soften quickly once ripe, so check every couple of days."]
    ],
    faq: [
      ["Do plum trees need a pollinator?", "European plums like Italian prune and Stanley are self-fertile and fruit fine alone. Japanese plums such as Shiro do much better with another Japanese plum nearby."],
      ["What's the difference between a prune and a plum?", "A prune plum is a European plum with dense, sweet flesh that dries well without fermenting at the pit. Italian prune is the classic Northwest variety, and it's just as good eaten fresh."],
      ["Why are my plums rotting on the tree?", "That's usually brown rot, a fungus spread by wet weather. Thin the fruit so plums don't touch, remove any shriveled mummies from the tree and the ground, and pick promptly when ripe."]
    ]
  },

  cherries: {
    keys: [["Years to fruit","3–5"], ["Dwarf rootstock","Gisela, 8–10 ft apart"], ["Self-fertile picks","Lapins, Stella"], ["Biggest risk","Rain cracking, birds"]],
    sections: [
      ["Choosing a variety and rootstock",
        "Sweet cherries on standard rootstock grow into big trees that are impossible to net, so most backyard growers choose a dwarfing Gisela rootstock. These trees stay small enough to cover with bird netting and fruit sooner. They do need good soil, steady water and usually a stake.",
        "Self-fertile varieties like Lapins and Stella fruit on their own and can also pollinate Rainier, which needs a partner. Sour cherries such as Montmorency are self-fertile, bloom later, resist cracking and make the best pies, which makes them a reliable choice for rainy west-side gardens."],
      ["East vs west of the Cascades",
        "Cherries love the dry, sunny summers east of the Cascades, which is why the region's commercial orchards are there. West of the mountains, a rainy spell near harvest lets ripe cherries absorb water through their skins until they split. Crack-resistant varieties like Lapins help, as does a tree small enough to cover with a tarp before rain.",
        "Bacterial canker is also more common on the wet side. It shows up as oozing gum and dying branches in spring. Prune only in dry summer weather, never in winter."],
      ["Pests and harvest",
        "Birds are the biggest cherry thief. Net the whole tree just as fruit starts to color, and tuck the netting closed underneath. Cherry fruit fly and spotted wing drosophila lay eggs in ripening fruit; picking promptly and cleaning up fallen fruit both help.",
        "Cherries don't ripen after picking, so taste a few before harvesting. Pick with the stems attached and refrigerate right away: they keep about a week cold, and much less on the counter."]
    ],
    faq: [
      ["Why do my cherries split before they're ripe?", "Rain on ripening cherries is soaked up through the skin until the fruit bursts. Grow crack-resistant varieties like Lapins, keep the tree small enough to cover before rain, or grow sour cherries, which crack less."],
      ["Do I need two cherry trees?", "Not if you plant a self-fertile variety like Lapins or Stella. Many other sweet cherries, including Rainier, need a different variety nearby that blooms at the same time."],
      ["How do I keep birds off my cherry tree?", "Drape bird netting over the whole tree as the fruit begins to color and close it at the bottom. That's why a dwarf rootstock like Gisela is so useful: you can actually reach over the tree."]
    ]
  },

  figs: {
    keys: [["Cold hardiness","10–15°F, established"], ["Pollination","Not needed"], ["Best spot","South or west wall"], ["Reliable crop (west)","Breba, early summer"]],
    sections: [
      ["Two crops a year, and why it matters here",
        "Many figs make two crops. The breba crop forms on last year's wood and ripens in early to mid summer. The main crop forms on this year's new growth and ripens in late summer and fall. In cool west-side summers, the main crop often runs out of warmth before it finishes, so varieties that set a good breba crop, like Desert King, are the most dependable choice.",
        "Lattarula, Brown Turkey and Chicago Hardy can ripen a main crop in warm spots or in warmer years. Common figs like these set fruit without pollination, so one tree is plenty."],
      ["Planting and winter protection",
        "Plant figs where they'll get the most heat: against a south or west wall, a fence or pavement that holds warmth. They aren't fussy about soil as long as it drains. Water deeply through the first summer, then occasionally in dry spells.",
        "Young trees are the most vulnerable to hard freezes. Mulch the base well in fall and wrap the tree in frost cloth when temperatures head toward the teens. Even if the top dies, figs usually regrow from the roots, though you'll lose a year or two of fruit. In cold eastern areas, grow figs in large pots and move them into an unheated garage for winter."],
      ["Pruning and harvest",
        "Figs need little pruning. Remove dead and crossing wood in late winter once the worst cold is past. Avoid cutting back every branch, since the breba crop grows on last year's wood and heavy pruning removes it.",
        "Pick figs when they droop on the stem, feel soft and the skin starts to crack slightly. An unripe fig will not ripen on the counter. Birds and wasps find ripe figs quickly, so check daily during harvest."]
    ],
    faq: [
      ["Can figs grow in Seattle or Portland?", "Yes. Figs do well west of the Cascades when planted in a warm, sunny spot. Choose a variety with a reliable early crop like Desert King, and protect young trees in hard freezes."],
      ["Why do my figs fall off before they ripen?", "Small green figs that form in late summer are main-crop figs that run out of heat in a cool fall. They drop or stay hard over winter. This is normal west of the Cascades; the breba crop the next summer is the one to count on."],
      ["Do figs need a pollinator?", "No. The common figs sold for home gardens set fruit without pollination, so a single tree will bear on its own."]
    ]
  },

  peaches: {
    keys: [["Years to fruit","2–4"], ["Pollination","Self-fertile"], ["Thin fruit to","6–8 inches apart"], ["Biggest risk","Peach leaf curl"]],
    sections: [
      ["Peach leaf curl and how to beat it",
        "Peach leaf curl is a fungus that infects swelling buds during cool, wet weather in late winter. The leaves come out red, thick and puckered, then drop, and repeated attacks weaken the tree. It's the main reason peaches struggle west of the Cascades.",
        "Planting a curl-resistant variety like Frost, Q-1-8 or Charlotte is the easiest answer. Many growers also spray copper fungicide once leaves have fallen in late fall and again before buds swell in late winter. Keeping winter and spring rain off the tree, with a roof overhang or a simple cover, works too, because the fungus needs wet buds to infect."],
      ["Pruning for fruit every year",
        "Peaches fruit only on shoots that grew the previous summer. A tree that isn't pruned produces less new wood each year, and the fruit moves out to the tips of the branches. Prune every late winter to an open, vase-like shape, removing about a third to half of last year's growth so new shoots keep coming.",
        "Peaches set far more fruit than they can size up. Thin young peaches to 6 to 8 inches apart when they're about the size of a marble. The crop looks smaller, but the peaches are bigger, sweeter and less likely to break branches."],
      ["East vs west of the Cascades",
        "Peaches need summer heat to grow sweet fruit. The hot valleys east of the Cascades grow excellent peaches, including Redhaven, but cold winters and spring frosts can kill buds, so avoid low frost pockets. West of the mountains, put peaches in your hottest, sunniest spot and stick to curl-resistant varieties. Peach tree borers, which tunnel into the base of the trunk and leave gummy sawdust, are a pest on both sides."]
    ],
    faq: [
      ["Why are my peach leaves red and curled?", "That's peach leaf curl, a fungus that infected the buds during wet weather the previous late winter. Spraying now won't fix it; the tree will usually push out a second set of healthy leaves. Prevent it next year with a resistant variety, copper spray in late fall and late winter, or a cover over the tree."],
      ["Do I need two peach trees?", "No. Most peaches are self-fertile, so a single tree will produce fruit on its own."],
      ["Can you grow peaches west of the Cascades?", "Yes, if you choose a curl-resistant variety like Frost, Q-1-8 or Charlotte and plant it in your warmest, sunniest spot. Fruit is often smaller and less sweet than east-side peaches, but still very good."]
    ]
  },

  hazelnuts: {
    keys: [["Years to nuts","3–5"], ["Pollination","Two compatible types"], ["Bloom time","Midwinter, by wind"], ["Biggest risk","Eastern filbert blight"]],
    sections: [
      ["Pollination and variety choice",
        "Hazelnuts bloom in midwinter, long before most plants wake up. The long, dangling catkins are the male flowers, and the female flowers are tiny red tufts on the buds. Pollen moves by wind, not bees, and a tree can't pollinate itself, so you need at least two compatible varieties within about 50 feet.",
        "Jefferson, Yamhill and McDonald resist eastern filbert blight, the disease that wiped out many older Northwest orchards. Theta is often planted as a pollinizer alongside them. Ask the nursery which varieties pair well, since compatibility depends on the specific types."],
      ["Eastern filbert blight",
        "This fungus spreads by spores in wet spring weather and causes rows of black, football-shaped bumps along branches. Over a few years it girdles and kills limbs, and eventually whole trees. Older varieties like Barcelona are very susceptible, which is why blight-resistant varieties are the only sensible choice for new plantings.",
        "If you see cankers on an older tree, cut the branch off in dry weather several feet below the visible damage and burn or bag it."],
      ["Bush or tree, and harvest",
        "Hazelnuts naturally grow as multi-stemmed bushes. If you want a single-trunk tree that's easier to rake under, pull suckers from the base every year. The Northwest also has a native beaked hazelnut, which grows wild in woods west of the Cascades and makes a good wildlife shrub.",
        "Nuts drop from late August to October. Rake them up every few days before squirrels and jays get them, then spread them in a single layer somewhere dry and airy for a couple of weeks, until the kernels snap cleanly."]
    ],
    faq: [
      ["Do I need two hazelnut trees?", "Yes. Hazelnuts can't pollinate themselves, so plant at least two compatible varieties, such as Jefferson with Yamhill or Theta. They should be within about 50 feet of each other."],
      ["Are filberts and hazelnuts the same thing?", "Yes. Filbert is the older name used by many Northwest growers, and hazelnut is the common name elsewhere. They're the same nut."],
      ["How do I keep squirrels from taking my hazelnuts?", "Pick up fallen nuts every few days during harvest so squirrels and jays don't get to them first. Spreading a tarp under the tree makes gathering faster."]
    ]
  },

  blackberries: {
    keys: [["First full crop","Year 3"], ["Canes fruit in","Their second year"], ["Trailing hardiness","Less cold-hardy"], ["Biggest risk","Spotted wing drosophila"]],
    sections: [
      ["Trailing, semi-erect or upright",
        "Trailing blackberries like Marion and Black Diamond have long, flexible canes that need a trellis, and they're known for rich flavor. They're the least cold-hardy, so they do best in mild west-side gardens. Semi-erect types like Triple Crown are thornless and vigorous with big, sweet berries. Upright and hardier types like Chester handle colder eastern and higher-elevation gardens better.",
        "Never plant Himalayan blackberry. It's an invasive weed that already smothers roadsides and creeks across the region."],
      ["How the two-year cane cycle works",
        "Blackberry roots live for many years, but each cane lives for only two. In its first year a cane grows long and leafy; in its second year it flowers, fruits and dies. Once you see this, pruning is simple: after harvest, cut the canes that just fruited to the ground and tie the new canes onto the trellis for next year.",
        "With trailing types, let new canes run along the ground under the trellis during summer, then lift and tie them in late winter. This keeps them out of the way of pickers and protects them from cold."],
      ["Picking and spotted wing drosophila",
        "Spotted wing drosophila is a small fruit fly that lays eggs inside ripening berries, unlike common fruit flies that only go after damaged fruit. Within days the berries turn soft and leaky. Pick every two or three days in season, remove overripe and damaged berries, and chill your harvest right away, which slows any larvae inside.",
        "Ripe blackberries turn from shiny to slightly dull black and come off with almost no tug."]
    ],
    faq: [
      ["Is Marionberry a blackberry?", "Yes. Marion is a trailing blackberry variety developed in Oregon and is the region's best-known blackberry. It's thorny and needs a trellis, but its flavor is hard to beat."],
      ["Why are my blackberries mushy with tiny worms?", "That's usually spotted wing drosophila, a fruit fly that lays eggs in ripe berries. Pick every two or three days, clear out any overripe fruit, and refrigerate berries right after picking."],
      ["How do I get rid of wild Himalayan blackberry?", "Cut canes to the ground and dig out the root crowns, then keep pulling or cutting regrowth for a few seasons. It spreads by both roots and bird-dropped seeds, so persistent removal is the key."]
    ]
  },

  grapes: {
    keys: [["First bunches","Year 3"], ["Spacing","6–8 ft on a trellis"], ["Prune","Late winter, hard"], ["Biggest risk","Powdery mildew"]],
    sections: [
      ["Choosing grapes that ripen here",
        "The biggest mistake with grapes in a cool climate is choosing a variety that needs more summer heat than you have. West of the Cascades, early seedless table grapes like Interlaken, Himrod and Canadice ripen reliably by September. Late wine grapes rarely sweeten up in a backyard on the wet side.",
        "East of the Cascades, hot summers ripen Concord and many wine grapes easily. Cold winters there can injure European wine grapes, so choose hardy varieties for the coldest areas and keep some spare canes in case one gets frozen."],
      ["Pruning, and why it's so severe",
        "Grapes fruit on new green shoots that grow from one-year-old canes. Wood older than that won't fruit, so a grapevine left alone turns into a tangle with little fruit. Each late winter, remove most of last year's growth, leaving either a few short spurs of two buds each or one or two long canes tied along the trellis wire.",
        "Pruning off 80 to 90 percent of the vine feels drastic but is normal. Cut vines sometimes drip sap in spring; it looks alarming but does no harm."],
      ["Powdery mildew, birds and wasps",
        "Powdery mildew is the main grape disease in the Northwest. It shows up as a white, dusty coating and can split young grapes. Good airflow is the best defense: thin crowded shoots in late spring and pull a few leaves around the bunches in early summer so sun and air reach the fruit. Resistant varieties help a lot.",
        "As grapes sweeten, birds and yellowjackets move in. Net vines or slip mesh bags over individual bunches a few weeks before harvest."]
    ],
    faq: [
      ["What grapes grow best in western Oregon and Washington?", "Early seedless table grapes like Interlaken, Himrod and Canadice ripen reliably in cool west-side summers. Plant them in your warmest, sunniest spot on a sturdy trellis."],
      ["When should I prune grapevines?", "Prune in late winter while the vines are dormant. Remove most of last year's growth, keeping a few spurs or canes that will produce this year's fruiting shoots."],
      ["How do I know when grapes are ripe?", "Taste them, since grapes don't sweeten after picking. Ripe grapes taste sweet, their seeds turn brown and the stems start to look woody."]
    ]
  },

  "hardy-kiwi": {
    keys: [["Years to fruit","3–5"], ["Males needed","1 per up to 8 females"], ["Harvest","September"], ["Biggest risk","Late spring frost"]],
    sections: [
      ["Males, females and Issai",
        "Hardy kiwi plants are either male or female. Only females bear fruit, but they need pollen from a male that blooms at the same time, so plant one male, such as Meader, for up to eight females like Ananasnaya or Ken's Red. Nurseries label plants by sex because you can't tell them apart until they flower.",
        "Issai is self-fertile, so a single vine can fruit on its own. It's smaller and less vigorous than other hardy kiwis, which suits small gardens, but it's also a bit less cold-hardy."],
      ["A strong support and regular pruning",
        "Hardy kiwis are enormous, vigorous vines that can grow 20 feet in a season. They need a sturdy arbor, pergola or T-bar trellis built before planting; a light trellis will collapse under a mature vine.",
        "Fruit grows on new shoots that sprout from last year's wood. In winter, cut back the previous summer's growth and remove tangled, old or weak canes. Then in summer, trim long, whippy shoots that aren't bearing fruit to keep the vine manageable. Young vines can be attractive to cats, so a wire cage around the base the first year helps."],
      ["Frost, harvest and storage",
        "The dormant vines are very cold-hardy, but tender new shoots and flower buds are killed by late spring frost. Avoid low spots where cold air settles, and cover young vines on frosty spring nights. A vine that loses its first flush of shoots usually regrows but won't fruit much that year.",
        "Pick in September when a few fruits soften on the vine. The firm ones ripen at room temperature in a few days or keep for weeks in the refrigerator, so you can ripen small batches as you go."]
    ],
    faq: [
      ["Do you need a male and female hardy kiwi?", "Yes, for most varieties. Plant one male for up to eight females. Issai is the exception: it's self-fertile and fruits on its own."],
      ["Can you eat hardy kiwi skin?", "Yes. Hardy kiwis are grape-sized and fuzzless, with smooth, thin skin you eat along with the fruit. They taste like a sweet, intense version of a grocery-store kiwi."],
      ["Why isn't my hardy kiwi fruiting?", "Young vines often take three to five years to start. Other common causes are a missing male plant, a late frost that killed the flower buds, or a male plant that blooms at a different time from the females."]
    ]
  },

  artichokes: {
    keys: [["Crown hardiness","About 15°F, mulched"], ["Spacing","3–4 feet"], ["First buds","Year 1 (Imperial Star)"], ["Biggest risk","Crown rot in winter"]],
    sections: [
      ["Perennial or annual",
        "Artichokes are large perennial thistles from the Mediterranean. In mild gardens west of the Cascades, a well-mulched crown can come back for several years, with the biggest harvests from year two on. In colder areas, where crowns freeze, grow them as annuals.",
        "Imperial Star was bred to bud in its first year. Artichokes need a spell of cool weather, roughly ten days or more below 50°F, to switch from making leaves to making buds. Set young plants out in spring while nights are still cool and they'll bud by late summer. Green Globe and Violetto usually wait until year two."],
      ["Getting crowns through a wet winter",
        "Cold alone is rarely what kills artichokes here; cold plus soggy soil is. Water sitting around the crown rots it. Plant in a raised bed or a spot that drains well, and in fall cut the plants down to about a foot and pile a thick layer of straw or leaves over the crowns. Pull the mulch back in early spring as new growth appears.",
        "Every few years, crowns get crowded. Dig and split off rooted side shoots in spring to replant or share."],
      ["Feeding, pests and harvest",
        "Artichokes are big, hungry plants. Work plenty of compost into the bed and water deeply, since drought stress makes buds tough. Aphids gather under leaves and in buds; a strong spray of water knocks them off. Slugs and earwigs sometimes hide between the scales.",
        "Cut buds while the scales are tight, with an inch or two of stem. If a bud opens, leave it: the purple thistle flower is beautiful and bees love it."]
    ],
    faq: [
      ["Can artichokes grow in the Pacific Northwest?", "Yes. West of the Cascades they often survive as perennials if the crowns are mulched and the soil drains well. In colder areas, grow Imperial Star as an annual for a first-year harvest."],
      ["When is an artichoke ready to pick?", "When the bud is full size but the scales are still tight and closed. Once the scales start to spread, the bud becomes tough, though you can let it bloom for the flower."],
      ["How do I overwinter artichokes?", "In fall, cut the plants down to about a foot and cover the crowns with a thick layer of straw or leaves. Good drainage matters as much as warmth, since soggy soil rots the crowns."]
    ]
  },

  huckleberries: {
    keys: [["Soil pH","4.5–5.5 (acidic)"], ["First light crop","2–3 years"], ["Harvest","Late August into fall"], ["Biggest risk","Heavy or alkaline soil"]],
    sections: [
      ["Which huckleberry to grow",
        "Evergreen huckleberry is the native that thrives in gardens west of the Cascades. It's a handsome shrub with glossy leaves, pink bell-shaped flowers in spring and small, dark, sweet-tart berries from late August into fall. Thunderbird is a compact selection for smaller spaces.",
        "Red huckleberry grows wild in shady forests, often sprouting from old stumps and logs, and has bright red, tart berries in summer. The mountain huckleberries people pick in the Cascades grow at higher elevations and rarely do well in lowland gardens."],
      ["Planting like a forest floor",
        "Huckleberries are relatives of blueberries and want the same conditions: acidic, well-drained soil full of organic matter. In the wild they grow in loose, needle-covered soil under conifers. Mix bark fines or compost into the planting area, and mulch with bark or fir needles to keep roots cool and moist.",
        "They're slow to establish, so be patient. Water through the first two dry seasons, and feed lightly with fertilizer for acid-loving plants in spring. Heavy clay or alkaline soil is the main reason they stall."],
      ["Wildlife value",
        "Evergreen huckleberry is a favorite with birds, which eat the berries well into winter, and the spring flowers feed native bees and hummingbirds. Its year-round foliage gives cover for small birds. It works well as an informal hedge or under tall trees in light shade, and it needs almost no pruning beyond the occasional shaping. If you share the berries, plant a few shrubs so there's enough for both you and the birds."]
    ],
    faq: [
      ["Can you grow huckleberries in your yard?", "Yes, especially evergreen huckleberry west of the Cascades. Give it acidic, well-drained soil rich in organic matter, part shade to sun, and water for the first two summers. Mountain huckleberries are much harder to grow at low elevation."],
      ["Are huckleberries the same as blueberries?", "They're close relatives in the same plant family and like the same acidic soil. Huckleberries are usually smaller and more intensely flavored."],
      ["When are evergreen huckleberries ripe?", "From late August into fall, when the berries are fully dark and come off easily. They hang on the shrub for weeks, so you can pick a little at a time."]
    ]
  },

  "oregon-grape": {
    keys: [["Light","Full sun to full shade"], ["Bloom","Early spring, yellow"], ["Summer water","None once established"], ["Berries","Tart, best as jelly"]],
    sections: [
      ["Where it grows wild",
        "Oregon grape is Oregon's state flower and one of the most common native shrubs in Northwest woods and forest edges. Tall Oregon grape grows upright to about six feet and handles sun or shade. Low Oregon grape, also called dull Oregon grape, stays under two feet and carpets shady forest floors under Douglas firs.",
        "Despite the name, it isn't related to grapes. The spiny, holly-like leaves stay green all year and often turn reddish or bronze in winter."],
      ["Easy care",
        "Oregon grape is about as low-maintenance as shrubs get. It grows in most soils, takes sun or deep shade, and once settled in it needs no summer water at all. Water through the first summer, mulch, then leave it alone. Every few years, cut a few of the oldest stems to the ground in late winter to keep it full and leafy at the base.",
        "Leaf spot and rust can appear in crowded, damp spots. Giving plants room for airflow is usually enough."],
      ["Wildlife value",
        "The bright yellow flower clusters open in early spring, when few other plants are blooming, and are a key early food for native bumblebees and hummingbirds. Birds eat the berries in summer, and the evergreen, prickly leaves make safe cover for small birds. It's a great choice for a shady wildlife hedge or a planting under trees where little else grows."]
    ],
    faq: [
      ["Can you eat Oregon grape berries?", "Yes. They're edible but very tart and seedy. Most people cook them with sugar and strain out the seeds to make jelly, or mix them with sweeter fruit."],
      ["Is Oregon grape related to grapes?", "No. It's in the barberry family; the name comes from the dusty-blue berry clusters that look a little like small grapes."],
      ["Does Oregon grape grow in shade?", "Yes. Both types tolerate shade, and low Oregon grape is especially good as a groundcover under trees. Tall Oregon grape flowers and fruits more in sun but still grows well in shade."]
    ]
  },

  "red-flowering-currant": {
    keys: [["Bloom","Late winter–early spring"], ["Height","6–10 feet"], ["Summer water","Little once established"], ["Best for","Hummingbirds"]],
    sections: [
      ["Where it grows wild",
        "Red-flowering currant grows naturally in open woods, forest edges and clearings, mostly west of the Cascades from British Columbia into California. It's a deciduous shrub that usually reaches 6 to 10 feet tall and a bit narrower. The hanging clusters of pink to deep red flowers appear in late winter or early spring, often before the leaves are fully out, which makes it one of the first native shrubs to bloom."],
      ["Planting and pruning",
        "Plant in full sun to part shade in soil that drains reasonably well. More sun means more flowers and less powdery mildew. West of the Cascades, fall planting is ideal because winter rain settles the roots before summer. Water through the first two summers, then only during long droughts.",
        "Prune right after flowering, since next year's blooms form on this year's growth. Cut a few of the oldest, woodiest stems to the base every year or two to keep the shrub young and full of flowers. King Edward VII stays a little more compact."],
      ["Wildlife value",
        "The flowers open just as rufous hummingbirds return from the south in early spring, and they're one of the birds' most important early nectar sources. Native bees, including bumblebee queens, visit the flowers too. The small blue-black berries ripen in summer and get eaten by birds. Planting red-flowering currant is one of the easiest ways to bring hummingbirds into a Northwest garden."]
    ],
    faq: [
      ["When does red-flowering currant bloom?", "From late winter into early spring, usually around March, depending on the year and location. It's one of the first native shrubs to flower."],
      ["Are red-flowering currant berries edible?", "Yes, but they're small, seedy and bland. Most gardeners leave them for the birds."],
      ["Does red-flowering currant attract hummingbirds?", "Yes, it's one of the best plants for them in the Northwest. It blooms right as rufous hummingbirds arrive in spring."]
    ]
  },

  serviceberry: {
    keys: [["Years to fruit","2–4"], ["Pollination","Self-fertile"], ["Harvest","June–July"], ["Cold hardiness","Very hardy"]],
    sections: [
      ["Where it grows wild",
        "Western serviceberry, also called Saskatoon, grows on both sides of the Cascades, from dry eastern slopes and canyons to open woods and forest edges in the west. It's a shrub or small tree with clouds of white flowers in spring, sweet purple-blue fruit in early summer, and orange to red fall color.",
        "Because it handles cold winters and dry summers, it's one of the few fruiting natives that does well almost anywhere in the region. Regent is a compact selection, and Smoky is known for sweet fruit."],
      ["Planting, pruning and pests",
        "Serviceberry adapts to most well-drained soils in full sun to part shade, with more fruit in sun. Water through the first two summers. In late winter, remove a few of the oldest stems and any suckers you don't want, or train one strong stem as a small tree.",
        "Rust, leaf spot and pear slug (small, slimy larvae that skeletonize leaves) show up in some years. Most are minor, and good airflow helps."],
      ["Harvest and wildlife value",
        "Berries ripen in June or July and taste like a cross between a blueberry and an almond-scented cherry. Pick when they're dark purple-blue and sweet. They're delicious fresh, in pies or frozen.",
        "Birds love them, which makes serviceberry a great wildlife plant and a frustrating fruit plant. Net the shrub just before the berries color if you want a full harvest. The spring flowers feed native bees early in the season."]
    ],
    faq: [
      ["What does serviceberry fruit taste like?", "Sweet and mild, like a blueberry with a hint of almond from the small soft seeds. They're good fresh, baked into pies or made into jam."],
      ["Is serviceberry the same as Saskatoon?", "Yes. Saskatoon is another common name for western serviceberry, Amelanchier alnifolia, the species native to the Northwest."],
      ["How do I keep birds from eating my serviceberries?", "Cover the shrub with bird netting before the berries start to color. Smaller, compact varieties like Regent are easier to net."]
    ]
  },

  camas: {
    keys: [["Plant bulbs","Fall, 4 inches deep"], ["Bloom","April–May"], ["Winter-wet soil","Tolerates it"], ["Summer water","None needed"]],
    sections: [
      ["Where camas grows wild",
        "Camas once turned Northwest prairies and wet meadows blue each spring, from the Willamette Valley and Puget Sound prairies to mountain meadows east of the Cascades. These meadows are soggy in winter and spring, then bake dry in summer, and camas is built for exactly that cycle: it grows and blooms while the soil is wet and goes dormant underground by midsummer.",
        "Camas bulbs were a major food for Native peoples across the region, who tended and harvested camas meadows for generations. Many of those meadows have since been lost to farming and development."],
      ["Growing camas in a garden",
        "Plant bulbs in fall in groups, in sun or light shade. Common camas grows 1 to 2 feet tall; great camas and its selection Blue Danube grow taller and make a bolder show. Camas is a good choice for low, damp spots where tulips would rot, as long as the spot dries out in summer.",
        "After blooming, let the leaves yellow before you cut them back. In a meadow or lawn planting, wait to mow until June. Let some seed heads ripen and scatter: seedlings take a few years to bloom, but plantings slowly spread."],
      ["Wildlife value and a safety note",
        "Camas flowers feed native bees and other early pollinators, and restoring camas helps rebuild a habitat that has mostly disappeared. Voles and gophers sometimes eat the bulbs.",
        "Never dig and eat wild camas bulbs. Death camas grows in the same meadows, looks nearly identical without flowers and is highly poisonous. Its flowers are white or cream, but the bulbs can't be safely told apart. Enjoy garden camas for its flowers."]
    ],
    faq: [
      ["Is camas poisonous?", "Blue camas itself isn't, but death camas, a different plant that grows in the same places, is highly poisonous and looks almost identical when not in bloom. Never eat wild bulbs; grow camas for its flowers."],
      ["When do you plant camas bulbs?", "Plant them in fall, about 4 inches deep and 4 to 6 inches apart in groups. They root over winter and bloom the next April and May."],
      ["Does camas spread?", "Yes, slowly. Bulbs multiply over time and plants reseed if you let the seed heads ripen. Seedlings take a few years to reach blooming size."]
    ]
  },

  lavender: {
    keys: [["Soil pH","6.5–8.0"], ["Water","First summer only"], ["Prune","After bloom, by a third"], ["Biggest risk","Wet winter soil"]],
    sections: [
      ["Drainage and soil",
        "Lavender grows wild on dry, rocky hillsides, and its roots need air as much as water. In the heavy, wet soils common west of the Cascades, roots rot over winter. Plant on a mound, slope or raised bed with gravelly soil, and use gravel instead of bark mulch, which holds moisture against the crown.",
        "Lavender likes neutral to slightly alkaline soil and very little fertilizer. Rich soil grows soft, floppy plants that are less fragrant and more likely to die in winter. Water through the first summer, then only in long droughts."],
      ["English lavender vs lavandin",
        "English lavenders like Hidcote and Munstead are compact, very cold hardy and the best choice for cooking, with a sweet scent. Lavandins like Grosso are hybrids that grow larger, bloom a bit later and have a stronger, more camphor-like scent. They're the classic choice for drying, sachets and oil, but they're slightly less cold hardy.",
        "Spanish lavender, with its rabbit-ear petals, is the least hardy and often dies in cold eastern winters."],
      ["Pruning and lifespan",
        "Lavender turns woody as it ages, and it won't sprout from old, bare wood. The fix is regular pruning: right after flowering, cut each plant back by about a third, leaving green, leafy growth below the cut. Plants pruned this way every year stay rounded and full for many years.",
        "East of the Cascades, dry summers and well-drained soils suit lavender well, but cold winter winds can dry out plants; a sheltered spot helps."]
    ],
    faq: [
      ["Why is my lavender dying?", "Most often it's wet roots, from heavy soil, poor drainage, overwatering or bark mulch against the crown. Old, woody plants that were never pruned also decline. Replant in a mound of gravelly soil and prune yearly after bloom."],
      ["Can I cook with any lavender?", "English lavenders like Hidcote and Munstead have the sweetest flavor and are the usual culinary choice. Lavandins like Grosso taste stronger and more bitter. Use a light hand, since a little goes a long way."],
      ["When should I prune lavender?", "Right after the main bloom in summer, cutting back by about a third into leafy growth. A light tidy in spring is fine, but never cut into bare wood with no leaves, which won't regrow."]
    ]
  },

  tomatillos: {
    keys: [["Soil to sprout","70–85°F"], ["Plant out when","Nights above 50°F"], ["Plants needed","At least 2"], ["Ripe when","Fruit fills the husk"]],
    sections: [
      ["Why you need two plants",
        "Tomatillo flowers can't pollinate themselves, so pollen has to come from a different plant, carried by bees. A lone plant blooms happily but sets few or no fruit, leaving empty papery husks. Plant at least two, close enough for bees to visit both. Toma Verde, Grande Rio Verde and Purple all cross with each other.",
        "Tomatillos handle cool Northwest summers better than tomatoes, setting fruit in weather that would stall a tomato."],
      ["Planting and support",
        "Start seeds indoors six to eight weeks before your last frost, and plant out once nights stay above about 50°F. Like tomatoes, they root along buried stems, so plant deep. Plants grow wide and floppy, often 3 to 4 feet tall and across, so give them the full 3 feet of spacing and a large cage or sturdy stakes.",
        "Average garden soil with some compost is enough. Too much nitrogen grows leaves at the expense of fruit."],
      ["Harvest and use",
        "Pick when the fruit fills the husk and the husk starts to split or turn papery. Green types are best slightly underripe for tart salsa verde; purple ones turn deep purple and sweeter as they ripen.",
        "Tomatillos keep two weeks or more in their husks in the fridge, and they freeze well whole after husking and rinsing. Fruit that drops and rots in the bed often leaves volunteer seedlings next spring, so clean up fallen fruit if you don't want them."]
    ],
    faq: [
      ["Why are my tomatillo husks empty?", "The flowers weren't pollinated, almost always because there's only one plant, or because bees were scarce. Grow at least two plants near each other and the husks should fill."],
      ["Why are tomatillos sticky inside the husk?", "That's a natural coating on the fruit skin. It's harmless; just rinse it off under warm water after removing the husk."],
      ["Can you freeze tomatillos?", "Yes. Remove the husks, rinse off the sticky coating, dry them and freeze whole on a tray before bagging. They soften when thawed, which is fine for salsa and sauces."]
    ]
  },

  zinnias: {
    keys: [["Soil to sprout","70–80°F"], ["Soil pH","5.5–7.5"], ["Days to bloom","60–75"], ["Biggest risk","Powdery mildew"]],
    sections: [
      ["Wait for warm weather",
        "Zinnias come from hot, dry regions and do nothing in cold soil. Seeds sown too early west of the Cascades often rot, and seedlings sit stunted and yellow. Sow once the soil is warm and nights are mild, usually late May to early June on the west side. They catch up fast: a sowing in early June often blooms by midsummer.",
        "You can start them indoors a few weeks early, but transplant them young, since older seedlings don't like root disturbance."],
      ["Pinching and cutting",
        "When a young plant is about a foot tall with three or four pairs of leaves, pinch out the top just above a leaf pair. The plant branches, and those branches give more stems and longer ones for cutting.",
        "Cut flowers often and cut deep, down to a leaf pair low on the stem, so new branches have room to grow. Check for ripeness with the wiggle test: a stem that stays stiff just below the flower will last in the vase, while a floppy one wilts quickly."],
      ["Mildew, and east vs west",
        "Powdery mildew coats leaves with white powder in late summer, when warm days and cool, damp nights alternate, a typical west-side pattern. Space plants for airflow, water the soil instead of the leaves and choose resistant varieties like Zahara. It looks bad but rarely stops flowering.",
        "East of the Cascades, zinnias thrive in the heat and mildew is less of a problem, though steady water keeps them blooming. Slugs on young seedlings are the bigger west-side issue."]
    ],
    faq: [
      ["Should I pinch my zinnias?", "Yes, for cut flowers. Pinch the top when plants are about a foot tall; they'll branch and give many more long stems. Skip pinching on dwarf bedding types."],
      ["What is the white powder on my zinnia leaves?", "Powdery mildew, a fungus common in late summer. Remove the worst leaves, water at the base and give plants more room. Next year, try resistant varieties like Zahara."],
      ["Why don't my zinnias last in a vase?", "They were likely cut too early. Use the wiggle test, cut in the cool of the morning, strip the lower leaves and change the water often. Zinnias prefer clean water without much floral preservative."]
    ]
  },

  peonies: {
    keys: [["Eye depth","1–2 inches, no deeper"], ["Soil pH","6.0–7.0"], ["Sun","6+ hours"], ["Biggest risk","Botrytis in wet springs"]],
    sections: [
      ["Planting it right",
        "Peonies can live for decades in one spot, and how you plant them decides whether they bloom. Set the pink or red buds, called eyes, no more than 2 inches below the soil. Buried deeper, plants grow leaves but few or no flowers. Choose full sun and well-drained soil enriched with compost; soggy ground rots the roots in wet west-side winters.",
        "Peonies need winter chill to form flower buds, which the whole Northwest provides. Skip high-nitrogen fertilizer, which grows leaves instead of blooms."],
      ["Botrytis and ants",
        "Botrytis, or gray mold, thrives in the cool, wet springs common west of the Cascades. Buds turn black and fail to open, and young stems wilt at the base. Cut all stems to the ground in fall and throw them out, remove infected buds as soon as you see them, and avoid crowding.",
        "Ants crawling on buds are harmless. They're feeding on sugary nectar the buds produce and don't help or hurt the flowers. Just shake them off cut stems before bringing them indoors."],
      ["Care over the years and dividing",
        "Established peonies need little: a ring support in spring for heavy-headed types, a little compost, and water in long dry spells. They resent being moved, so most plants never need dividing.",
        "If an old clump declines, divide it in fall. Dig carefully, cut the root into pieces with three to five eyes each, and replant at the right depth. Expect divided plants to take a year or two to bloom well again. Itoh types like Bartzella have sturdier stems and rarely need staking."]
    ],
    faq: [
      ["Why won't my peonies bloom?", "The most common cause is planting too deep: the eyes should be only 1 to 2 inches below the soil. Too much shade, a recent move or division, young plants and high-nitrogen fertilizer also cut down on flowers. Fix the depth in fall and be patient."],
      ["Are ants bad for peonies?", "No. Ants visit the buds for their sugary nectar and do no harm. You don't need to spray them; just shake cut flowers before taking them inside."],
      ["When should I cut back peonies?", "In fall, after the leaves have yellowed or been hit by frost. Cut stems to the ground and throw them out rather than composting, to reduce botrytis next spring. Itoh peonies are cut back to just above their short woody base."]
    ]
  }
};
Object.values(notes).forEach(n => { n.notes = true; });
module.exports = notes;
