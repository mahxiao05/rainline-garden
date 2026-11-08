/* How each plant does in different parts of the Northwest, shown on its plant page under "Growing it in your part of the Northwest".
 * Keys: west (west-side valleys: Willamette Valley, Puget Sound, southern Oregon valleys), coast (Oregon and Washington coast),
 * east (valleys and plateaus east of the Cascades: Columbia Basin, Yakima, Treasure Valley, Spokane, north Idaho, Magic Valley),
 * high (central Oregon, the high valleys of eastern Oregon, Idaho mountain towns).
 * Each note is one to three sentences of well-established, practical advice that differs by region. Leave a region out when
 * there is nothing solid and specific to say; never pad. Plain text only (escaped when rendered). Never cite sources by name. */
module.exports = {
  /* Cool-season vegetables */
  peas: {
    west: "Wet, cold clay can rot pea seed before it sprouts, so sow into raised beds or wait for a dry spell in late February or March. Late sowings are the ones pea enation virus hits hardest, which is why resistant varieties like Oregon Sugar Pod II and Cascadia are popular here.",
    coast: "Cool summers suit peas better than almost anywhere else in the region. You can keep sowing into early summer and sow again in July for a fall crop.",
    east: "Heat in late June shuts pea plants down quickly, so sow as soon as the soil can be worked and pick early varieties. Water steadily once flowers appear; dry soil during bloom means few pods.",
    high: "Peas are one of the most reliable crops here because they shrug off spring frosts. Sow as soon as the soil thaws and drains."
  },
  radishes: {
    west: "Cabbage root maggots are at their worst in the cool, wet soil of April and May, so cover spring sowings from day one. Fall radishes sown in late August usually grow cleaner and milder than spring ones.",
    coast: "Cool summers let you keep sowing small rows later into summer than inland gardeners can, though long June days still push some plants to bolt.",
    east: "Spring warms up fast, so the window for crisp radishes is short: sow as early as the soil allows. Flea beetles love hot, dry weather, so keep row cover on.",
    high: "Radishes handle the frosts of a high desert spring and stay mild in the cool nights. Keep the soil moist; the dry air and loose pumice or sandy soil dry out quickly."
  },
  spinach: {
    west: "Spinach sown in late August or September often keeps going through a mild winter, especially under row cover, and gives the best harvests of the year in early spring. Downy mildew shows up in long cool, wet spells; give plants room for air.",
    coast: "Mild summers stretch the spring harvest a bit longer than inland, but long days in June still trigger bolting. Fall sowings do especially well.",
    east: "Spring is short before heat and long days make spinach bolt, so sow as soon as the ground can be worked. A late-summer sowing for fall, kept under cover, is often more productive.",
    high: "Spinach is cold hardy enough for early spring sowing here. Sow again in late summer; plants under cover can sometimes be overwintered for a very early spring crop."
  },
  lettuce: {
    west: "Slugs are the main enemy in spring and fall. July heat in the valleys can turn lettuce bitter, so use shade cloth or switch to heat-tolerant types for summer.",
    coast: "Cool summers mean you can grow lettuce nearly all season without it bolting. It is one of the best crops for coastal gardens.",
    east: "Hot, dry summers make lettuce bolt and go bitter, and tipburn is common. Grow it in spring and fall, and give summer sowings afternoon shade and steady water.",
    high: "Cool nights keep lettuce sweet well into summer, and young plants handle light frost. Watch for wind and hail damage on tender leaves."
  },
  onions: {
    west: "Choose long-day varieties, which form bulbs as Northwest days lengthen in June. Onions grow slowly in cold, wet spring soil, so raised beds help, and cure the harvest under cover if August turns wet.",
    coast: "Damp, foggy weather favors downy mildew and neck rot. Give plants good spacing, and cure bulbs indoors or under a roof rather than in the garden.",
    east: "Southwest Idaho and eastern Oregon's Treasure Valley is one of the country's big onion regions, so the climate suits them. Water evenly to avoid split bulbs, watch for thrips in hot weather, and stop watering when the tops fall over.",
    high: "The season is short, so start from sets or transplants rather than seed. Long-day types still bulb well here."
  },
  carrots: {
    west: "Heavy clay makes carrots fork and stunt, so grow them in raised beds or loosened, compost-rich soil. Carrot rust fly is common; row cover keeps it out. Many west-side gardeners leave carrots in the ground under mulch and dig them through winter.",
    coast: "Sandy coastal soils grow straight, smooth carrots. Carrot rust fly is a problem here too, so cover the rows.",
    east: "Dry wind and sun can bake the soil surface into a crust that seedlings can't push through. Keep the seedbed moist with light daily watering or a board or burlap over the row until they sprout.",
    high: "Loose pumice and sandy soils suit carrots well, and fall frosts sweeten the roots. Keep the seedbed moist in the dry air."
  },
  beets: {
    west: "Beets do well in spring and as a fall crop sown in July. Leaf miners make tunnels in the leaves; pick off affected leaves and cover the rows if you eat the greens.",
    coast: "Cool summers suit beets, and you can sow them from spring into midsummer.",
    east: "The soil surface crusts quickly in dry wind, which keeps seedlings from emerging, so keep it moist until they sprout. Curly top virus, spread by the beet leafhopper in dry interior valleys, can stunt plants; row cover in early summer helps.",
    high: "Beets handle cold well and grow steadily in the cool nights. Sow after the soil warms a little in spring and again in early summer."
  },
  kale: {
    west: "Kale is a year-round crop here. Plants set out in summer keep producing through most winters, and frost makes the leaves sweeter. Aphids and cabbage worms are the usual pests.",
    coast: "Kale loves the cool, moist climate and can be picked almost all year.",
    east: "Summer heat makes leaves tough and brings aphids, so focus on spring and fall crops. In colder winters, a row cover or low tunnel keeps plants going longer.",
    high: "Kale is one of the hardiest crops here and is fine through summer thanks to cool nights. Plants survive hard frosts, though a deep cold snap ends the season."
  },
  broccoli: {
    west: "Grow a spring crop and a summer-planted fall crop, which is often the better one. Clubroot can show up in acidic west-side soils; liming to about pH 7 helps. Overwintering sprouting broccoli planted in summer can give spears in early spring.",
    coast: "Cool summers suit broccoli. Heads form slowly and evenly, and side shoots keep coming for weeks.",
    east: "Heat makes heads loose and quick to flower, so time plantings to mature before July or after the heat breaks in fall. Set out transplants rather than sowing seed for spring.",
    high: "Broccoli grows well through summer here because nights stay cool. Harden off transplants well; young plants that sit in long cold spells can form tiny button heads."
  },
  cabbage: {
    west: "Cabbage grows almost year round here, and hardy varieties planted in summer can stand in the garden into winter. Slugs, aphids and cabbage worms are the main pests.",
    coast: "Cool summers suit cabbage well. Heads form slowly and stay firm.",
    east: "Heat and uneven watering make heads split, so plant early spring and late summer crops and water deeply and evenly.",
    high: "Cabbage handles frost and grows well through the cool summers. Choose earlier varieties so heads form before hard fall freezes."
  },
  chard: {
    west: "Chard often survives mild winters and starts growing again in early spring. Slugs and leaf miners are the main problems.",
    coast: "Chard grows steadily through the cool summers and keeps going through most winters.",
    east: "Chard handles summer heat better than spinach or lettuce, so it fills the summer greens gap. Water deeply in hot spells.",
    high: "Chard tolerates frosts in spring and fall. A row cover extends the harvest into late fall."
  },
  potatoes: {
    west: "Late blight is the big risk in wet late summers, so water at the soil, not over the leaves, and dig the crop once vines die back. Wireworms are common where lawn was recently dug up.",
    coast: "Potatoes grow well in the cool climate, but the damp, foggy weather favors late blight. Choose blight-tolerant varieties and give plants good spacing.",
    east: "Irrigated Columbia Basin and southern Idaho soils grow much of the country's potatoes. Water evenly to avoid knobby or hollow tubers, and watch for Colorado potato beetles, which are common east of the Cascades but rare west of them.",
    high: "Late frosts can nip emerging shoots, so hill soil over them if frost is forecast. Early and mid-season varieties fit the short season best."
  },
  cauliflower: {
    west: "Cauliflower needs steady growth, so stress from drought or cold can make it button up. Overwintering varieties planted in summer can head up in spring.",
    coast: "The cool, even climate is close to ideal for cauliflower. Spring and fall crops both do well.",
    east: "Heat during heading ruins curds, so aim for a fall harvest from a summer planting. Water deeply and evenly.",
    high: "Cauliflower can be grown through summer here, but cold spells right after transplanting can make tiny heads. Wait until spring frosts ease a bit."
  },
  "brussels-sprouts": {
    west: "Brussels sprouts are well suited to the west side: plants set out in early summer stand through fall frosts, which sweeten the sprouts, and keep producing into winter. Aphids hide in the sprouts, so check early.",
    coast: "The long, cool season suits Brussels sprouts, and harvest often runs well into winter.",
    east: "Summer heat stresses young plants and brings aphids. Set out transplants in early summer so sprouts form during cooler fall weather.",
    high: "The season can be too short for late varieties, so choose early ones. Plants handle hard frosts in fall."
  },
  leeks: {
    west: "Leeks stand in the garden through most west-side winters, so you can dig them as needed from fall to spring. Plant them where drainage is good.",
    coast: "The mild climate suits leeks, and they can be harvested through winter.",
    east: "Leeks handle frost well, but very cold snaps can damage them. Mulch heavily or harvest before deep winter cold.",
    high: "Start from transplants because the season is short. Harvest before the ground freezes hard."
  },
  arugula: {
    west: "Arugula is easy in spring and fall, and fall sowings often keep going into winter. Flea beetles chew holes in spring, so use row cover.",
    coast: "Cool summers let arugula keep growing longer before it bolts.",
    east: "Heat makes arugula bolt and turn very peppery, so sow early in spring and again in late summer. Flea beetles are worst in hot, dry weather.",
    high: "Arugula handles frost and grows well in the cool summers. Sow small amounts often."
  },
  "bok-choy": {
    west: "Spring sowings tend to bolt as days lengthen, so the late-summer sowing for fall is usually more reliable. Slugs and flea beetles are the main pests.",
    coast: "Cool summers suit bok choy, though spring plantings still bolt quickly in long June days.",
    east: "Heat and long days make bok choy bolt fast. Sow for fall harvest in late summer and keep it watered.",
    high: "Grow it in early summer or late summer. A sudden cold spell can make young plants bolt, so cover them on cold nights."
  },
  turnips: {
    west: "Root maggots are a problem in cool, wet soil, so cover spring sowings. Turnips sown in late summer are sweeter after the first frosts.",
    coast: "Turnips grow well in the cool climate and can be sown from spring through late summer.",
    east: "Spring heat makes turnips woody, so sow early or grow them as a fall crop. Water evenly.",
    high: "Turnips handle frost and grow well here. Fall frosts sweeten the roots."
  },
  kohlrabi: {
    west: "Kohlrabi grows fast in spring and fall. Pick it at tennis-ball size before it turns woody.",
    coast: "Cool summers keep kohlrabi tender over a longer harvest window.",
    east: "Hot weather makes kohlrabi tough and woody, so time it for spring and fall and water steadily.",
    high: "Kohlrabi tolerates frost and grows well in the cool summers."
  },
  "fava-beans": {
    west: "Fava beans sown in October usually survive the winter and give a crop in late spring, weeks ahead of spring-sown ones. They also make a good winter cover crop.",
    coast: "Mild winters make fall-sown fava beans especially reliable on the coast.",
    east: "Winters are usually too cold for fall sowing, so sow as early as possible in spring. Heat in early summer stops pods from setting.",
    high: "Sow in early spring. Favas handle frost, but the plants slow down in hot, dry spells."
  },
  collards: {
    west: "Collards handle cold and keep producing through most west-side winters. Pick lower leaves often.",
    coast: "Collards grow well in the cool, wet climate and can be picked almost all year.",
    east: "Collards take summer heat better than most cabbage-family crops. Keep them watered and watch for aphids.",
    high: "Collards handle hard frost. Plant in spring for harvests from summer into late fall."
  },
  parsnips: {
    west: "Parsnips are slow to sprout, so keep the soil moist for up to three weeks. Many gardeners leave them in the ground and dig through winter, since frost sweetens them.",
    coast: "Parsnips grow well in the long, cool season, and sandy soils give straight roots.",
    east: "Dry wind crusts the soil surface, so keep the seedbed moist until seedlings appear. Mulch the row heavily if you leave roots in over winter.",
    high: "Parsnips handle cold well and get sweeter after frost. Mulch them if you plan to harvest after the ground starts freezing."
  },
  celery: {
    west: "Celery needs steady water all summer, which means regular irrigation from July onward. Young plants exposed to a long cold spell can bolt, so set them out after spring warms a bit.",
    coast: "Cool summers suit celery as long as plants get steady water.",
    east: "Celery is thirsty in hot, dry summers. Give it rich soil, steady irrigation and some afternoon shade.",
    high: "Celery is hard in the short season and cold nights. Start early indoors and protect young plants from cold snaps."
  },
  "mustard-greens": {
    west: "Mustard greens are easy in spring and fall. Fall sowings often hold through winter in mild years.",
    coast: "Cool summers let mustard greens grow longer before bolting.",
    east: "Heat makes mustard greens bolt and taste harsh, so sow early or for fall.",
    high: "Mustard greens handle frost and grow well in the cool summers."
  },
  mache: {
    west: "Mâche is a true winter salad here. Sow it in September and pick it from late fall through early spring.",
    coast: "Mild winters let mâche grow slowly through the coldest months.",
    east: "Sow in late summer and cover plants in winter; mâche is very cold hardy but won't grow in summer heat.",
    high: "Sow in late summer under row cover, or in early spring as soon as the soil thaws."
  },
  radicchio: {
    west: "Radicchio is traditionally a fall and winter crop. Plants set out in summer form heads in fall, and cold weather mellows the bitterness.",
    coast: "Cool summers suit radicchio, and fall heads are often excellent.",
    east: "Summer heat makes radicchio bitter and bolt-prone, so plant in midsummer for fall heads.",
    high: "Plant in early summer for fall heads. Plants handle light frost."
  },

  /* Warm-season vegetables */
  beans: {
    west: "Bean seed rots in cold, wet soil, so wait until the soil is warm in mid to late May, even if the frost date has passed. Slugs and cutworms take young seedlings.",
    coast: "Cool summers slow beans down. Sow in a warm, sheltered spot, and choose bush beans, which produce sooner than pole beans.",
    east: "Beans grow fast in the heat, but very hot, dry spells make blossoms drop. Water deeply and mulch. Curly top virus, spread by leafhoppers in dry interior valleys, can stunt plants.",
    high: "Late spring frosts and cold nights make beans a gamble. Sow after the last frost, choose quick bush varieties, and keep row cover handy."
  },
  "pole-beans": {
    west: "Pole beans do well once the soil warms in late May and give a longer harvest than bush beans. Older varieties like Blue Lake have long been grown in Oregon.",
    coast: "Pole beans can struggle to ripen in cool, foggy summers. Plant against a warm, sunny wall or fence, or grow bush beans instead.",
    east: "Pole beans love the heat but drop blossoms in very hot, dry spells. Set trellises sturdy enough for summer wind, and water deeply.",
    high: "The season is often too short and cool for pole beans to give much. Bush beans are more reliable."
  },
  corn: {
    west: "Sweet corn needs warm soil to sprout, so wait until late May. Pick early to mid-season varieties; very late ones may not ripen in a cool summer.",
    coast: "Cool summers make sweet corn hard to ripen. Choose the earliest varieties and plant in your warmest spot.",
    east: "Hot summers suit corn well, and it is one of the classic east-side garden crops. Water deeply when tassels and silks appear, since drought then gives poorly filled ears.",
    high: "Frost risk and cool nights shorten the season, so plant the earliest varieties after the last frost. Black plastic warms the soil and speeds things up."
  },
  cucumbers: {
    west: "Cucumbers sulk in cold soil, so plant them out in late May or early June. Powdery mildew often shows up in August; resistant varieties help.",
    coast: "Cool summers make cucumbers slow. Grow them in a greenhouse, cold frame or sunny, sheltered spot, or choose quick, cool-tolerant varieties.",
    east: "Heat suits cucumbers, but they need deep, steady water or the fruit turns bitter and misshapen. Spider mites can build up in hot, dry weather.",
    high: "Cool nights slow cucumbers down. Start them indoors or under cover, and plant after frost danger passes."
  },
  "summer-squash": {
    west: "Zucchini grows well once nights warm in June. Powdery mildew coats leaves by late summer, and slugs chew young plants.",
    coast: "Summer squash is one of the easier warm crops on the coast, though plants grow more slowly and mildew comes early in damp weather.",
    east: "Summer squash grows fast in the heat. Water deeply and watch for squash bugs, which are more common east of the Cascades.",
    high: "Plant after the last frost and cover young plants on cold nights. Zucchini usually still produces well in a short season."
  },
  "winter-squash": {
    west: "Most winter squash ripens here if planted by early June. Bring it in before the fall rains set in, and cure it somewhere warm and dry.",
    coast: "Cool summers make big, long-season squash hard to ripen. Choose smaller, quicker types like delicata, acorn or small kabocha.",
    east: "Winter squash ripens easily in the hot summers. Water deeply and check for squash bugs.",
    high: "Pick quick-maturing varieties and give them the warmest spot. Pick everything before a hard frost."
  },
  pumpkins: {
    west: "Pumpkins planted by early June usually ripen by October. Lift the fruit off wet soil on a board or straw to prevent rot.",
    coast: "Large pumpkins rarely ripen in cool coastal summers. Small pie pumpkins are a better bet.",
    east: "Hot summers suit pumpkins. Water deeply at the roots and keep an eye out for squash bugs.",
    high: "Grow small, quick varieties and plant after the last frost. Harvest before hard frost."
  },
  tomatoes: {
    west: "Cool nights into June slow tomatoes down, and late blight can strike in wet Septembers. Early varieties like Stupice and Early Girl, a sunny spot and covering plants from rain all help.",
    coast: "Cool, foggy summers are the main challenge. Grow cherry and early varieties, use a greenhouse or hoop house, or plant against a south-facing wall.",
    east: "Hot summers ripen tomatoes easily, and late blight is rare in the dry air. Water evenly to prevent blossom-end rot and cracking. Curly top virus, spread by leafhoppers, can stunt plants; shade cloth early in summer helps.",
    high: "Frost can come in June or August, so use wall-o-water, cloches or row cover and choose short-season varieties."
  },
  peppers: {
    west: "Peppers need warmth, so wait until nights stay above 50°F, usually early June. Black plastic, a sunny wall or a hoop house helps fruit ripen.",
    coast: "Peppers are tough outdoors on the coast. Grow them in a greenhouse or large pots in the warmest spot you have.",
    east: "Peppers grow well in the heat. Fruit can get sunscald in intense afternoon sun, so let leaves shade it or use light shade cloth.",
    high: "Peppers need protection from cold nights. Use wall-o-water or row cover, and choose quick-maturing varieties."
  },
  eggplant: {
    west: "Eggplant needs warm nights and is slow here. Plant in early June, use black plastic or a hoop house, and choose small-fruited, early varieties.",
    coast: "Eggplant rarely does well outdoors on the coast. A greenhouse or large pot in a sheltered, sunny spot is your best chance.",
    east: "Hot summers suit eggplant well. Flea beetles chew young leaves, so cover transplants at first.",
    high: "Cool nights make eggplant very hard to grow here. Grow it under cover if at all."
  },
  melons: {
    west: "Melons are a stretch west of the Cascades. Choose early varieties, use black plastic, and plant in June. A hot summer gives a good crop.",
    coast: "Cool summers are rarely warm enough to ripen melons outdoors. Use a greenhouse.",
    east: "Melons thrive in the hot east-side valleys; Hermiston is known for its watermelons. Cut back watering as fruit ripens for the sweetest flavor.",
    high: "Cold nights make melons a gamble. Use black plastic, row cover and the earliest varieties."
  },
  tomatillos: {
    west: "Tomatillos tolerate cooler weather better than tomatoes and set fruit freely once summer warms. Grow at least two plants so they cross-pollinate.",
    coast: "Tomatillos may ripen on the coast if planted in a sunny, sheltered spot, though yields are lower in cool summers.",
    east: "Tomatillos love the heat and often produce more than you need. Plants sprawl, so give them space and support.",
    high: "Start indoors and plant out after frost. Tomatillos often self-seed in warmer spots."
  },
  "ground-cherries": {
    west: "Ground cherries ripen more reliably than most tomatoes in a cool west-side summer. Collect fruit as it drops in its papery husk.",
    coast: "One of the warm-season crops most likely to ripen on the coast. Give it the sunniest spot.",
    east: "Ground cherries grow easily in the heat and often self-seed for next year.",
    high: "Start indoors and plant out after frost; the short season still usually gives a crop."
  },
  "sweet-potatoes": {
    west: "Sweet potatoes are a challenge but possible with black plastic, a short-season variety like Georgia Jet or Beauregard, and planting in early June.",
    coast: "Coastal summers are usually too cool for sweet potatoes outdoors. A greenhouse is needed.",
    east: "The hot east-side valleys can grow good sweet potatoes. Plant slips in late May into warm soil and dig before the soil cools in fall.",
    high: "Cold nights and the short season make sweet potatoes very hard to grow here."
  },

  /* Herbs */
  basil: {
    west: "Basil stalls and blackens when nights drop below 50°F, so wait until June to plant it out. Slugs love young basil.",
    coast: "Basil struggles outdoors in cool, foggy summers. Grow it in pots on a sunny, sheltered patio or in a greenhouse.",
    east: "Basil loves the heat. Keep pinching flower buds to keep the leaves coming.",
    high: "Frost can come any month, so keep basil in pots you can bring in, or cover it on cold nights."
  },
  cilantro: {
    west: "Cilantro bolts quickly in summer, so sow in spring and again in late summer. Fall sowings sometimes overwinter.",
    coast: "Cool summers stretch the harvest, but long days still trigger bolting. Sow small batches every few weeks.",
    east: "Heat makes cilantro bolt within weeks. Sow in early spring and late summer, and grow slow-bolting varieties.",
    high: "Cilantro grows well through the cool summers. It handles light frost."
  },
  parsley: {
    west: "Parsley often lasts through winter and goes to seed the next spring. Sow fresh every year for a steady supply.",
    coast: "Parsley grows well year round in the mild climate.",
    east: "Parsley handles heat with steady water. Mulch over winter to help plants survive cold.",
    high: "Parsley is slow to sprout, so start indoors. It tolerates frost in spring and fall."
  },
  dill: {
    west: "Dill grows easily and self-seeds. Sow in spring after the soil warms a bit.",
    coast: "Wind can topple tall dill, so stake it or choose compact varieties.",
    east: "Dill goes to seed fast in heat, so sow every few weeks. Wind topples tall stalks.",
    high: "Dill grows well in cool summers. Sow after the last frost."
  },
  chives: {
    west: "Chives are hardy and easy here. Divide clumps every few years.",
    east: "Chives handle cold winters and hot summers. Water during dry spells.",
    high: "Chives are hardy enough for the coldest winters in the region and come up as soon as snow melts."
  },
  mint: {
    west: "Mint spreads aggressively in moist west-side soil, so grow it in a pot or a bed with buried edging. Mint rust shows as orange spots; cut back affected stems.",
    east: "Mint likes some afternoon shade and steady water in hot summers."
  },
  rosemary: {
    west: "Rosemary usually survives west-side winters if drainage is good; wet clay kills more plants than cold does. A hard freeze can still kill it, so hardier varieties like Arp help.",
    coast: "The mild coastal climate suits rosemary well, as long as it's in well-drained soil.",
    east: "Rosemary rarely survives winter outdoors east of the Cascades. Grow it in a pot and bring it inside for winter.",
    high: "Grow rosemary in a pot and bring it in before the first frost."
  },
  thyme: {
    west: "Thyme rots in wet, heavy soil, so plant in raised beds, rock gardens or pots with good drainage.",
    coast: "Give thyme the sunniest, best-drained spot; constant damp is its biggest enemy here.",
    east: "Thyme is well suited to the dry, sunny climate and handles cold winters.",
    high: "Thyme is hardy and drought tolerant; it is one of the best herbs for the high desert."
  },
  oregano: {
    west: "Oregano is easy if the soil drains well. Cut it back after flowering to keep it bushy.",
    east: "Oregano handles heat, drought and cold winters well.",
    high: "Common oregano is hardy here; Greek oregano may need winter mulch."
  },
  sage: {
    west: "Sage dislikes wet, heavy soil in winter, so plant in raised beds or well-drained spots.",
    coast: "Damp winters can rot sage; good drainage and full sun are key.",
    east: "Sage likes the dry, sunny climate. It is hardy through most winters.",
    high: "Common garden sage is hardy and drought tolerant here, as long as the soil drains well."
  },
  "lemon-balm": {
    west: "Lemon balm grows easily and self-seeds freely. Cut off flowers to stop it spreading.",
    east: "Lemon balm likes afternoon shade and steady water in hot summers."
  },
  tarragon: {
    west: "French tarragon rots in wet winter soil, so give it good drainage. Grow it from cuttings or divisions, since it doesn't set seed.",
    east: "Tarragon handles cold winters and dry summers well. Divide every few years.",
    high: "French tarragon is hardy here with good drainage."
  },
  sorrel: {
    west: "Sorrel greens up very early in spring and keeps going into fall. Cut off flower stalks so it keeps making leaves.",
    east: "Sorrel likes afternoon shade and steady water in hot summers.",
    high: "Sorrel is very hardy and one of the first greens of spring."
  },
  horseradish: {
    west: "Horseradish is easy and spreads. Grow it in its own corner or a large container.",
    east: "Horseradish handles cold winters and is easy to grow. Water in dry spells for the best roots."
  },

  /* Flowers */
  dahlias: {
    west: "Many Portland and Seattle gardeners leave dahlia tubers in the ground with a thick mulch, but tubers often rot in wet clay. Lifting them in fall is safer in heavy soil. Slugs and earwigs chew new shoots.",
    coast: "Dahlias bloom well in cool coastal summers. Stake them firmly against wind.",
    east: "Dig tubers after the first frost and store them indoors, since the ground freezes too deep for them to survive. Spider mites and hot afternoon sun can stress plants; water deeply.",
    high: "Plant after frost danger passes and dig tubers in fall. The short season means fewer blooms before frost, so start tubers in pots indoors in April."
  },
  sunflowers: {
    west: "Slugs often eat sunflower seedlings, so start them in pots or protect young plants. Birds go for seeds in fall.",
    coast: "Wind and cool summers can stunt tall sunflowers; choose shorter, branching varieties.",
    east: "Sunflowers love the hot, sunny east-side summers and handle dry soil once established.",
    high: "Sow after the last frost. Shorter, quicker varieties finish before fall frost."
  },
  "sweet-peas": {
    west: "Sweet peas love the cool, moist spring. Sow in late winter or early spring for blooms from late May into July.",
    coast: "The long, cool season suits sweet peas, and they often keep blooming well into summer.",
    east: "Heat ends sweet pea bloom by midsummer, so sow as early as possible and mulch to keep roots cool.",
    high: "Sweet peas bloom through the cool summers. Sow as soon as the soil can be worked."
  },
  tulips: {
    west: "Wet summer soil makes many tulips fade after the first year. Plant in well-drained beds or treat them as annuals. Skagit Valley's tulip fields show how well they bloom here in spring.",
    coast: "Tulips bloom well, but wet soil can rot bulbs; plant in raised beds or pots.",
    east: "Dry, hot summers are what tulips need to rebloom year after year. Plant them deep, about 8 inches.",
    high: "Tulips are hardy here and bloom later in spring. Deer and rodents eat them, so protect bulbs."
  },
  daffodils: {
    west: "Daffodils naturalize well in west-side gardens and return every spring. Deer and rodents leave them alone.",
    coast: "Daffodils handle the wet coastal winters and bloom reliably.",
    east: "Daffodils are hardy and need little water in summer.",
    high: "Daffodils are hardy and deer resistant, a good choice for high-desert gardens."
  },
  zinnias: {
    west: "Zinnias need warm weather, so plant them out in June. Powdery mildew is common by late summer; choose resistant varieties.",
    coast: "Cool, damp summers make zinnias slow and prone to mildew. Choose a sunny, sheltered spot.",
    east: "Zinnias like the heat and bloom until frost.",
    high: "Start indoors and plant after frost; zinnias bloom from midsummer until the first frost."
  },
  peonies: {
    west: "Peony botrytis blight browns buds in wet springs; clean up stems in fall and give plants good airflow.",
    east: "Peonies need winter cold and do very well east of the Cascades. Water deeply in hot summers.",
    high: "Peonies are hardy enough for the coldest winters in the region and bloom reliably."
  },
  cosmos: {
    west: "Cosmos is easy here once the soil warms. Don't feed it too much or it grows tall and floppy.",
    coast: "Cosmos blooms well in cool summers. Wind can topple tall plants.",
    east: "Cosmos handles heat and dry soil well and blooms all summer.",
    high: "Sow after the last frost. Cosmos blooms from midsummer until frost."
  },
  nasturtiums: {
    west: "Nasturtiums are easy here. Aphids often cluster on them, so check the undersides of leaves.",
    coast: "Nasturtiums do well in the cool, mild climate and often self-seed.",
    east: "Heat slows nasturtium blooming; give them afternoon shade.",
    high: "Nasturtiums are frost tender. Sow after the last frost."
  },
  marigolds: {
    west: "Marigolds need warm weather and are a slug favorite when young. Plant out in late May or June.",
    coast: "Marigolds bloom in cool summers but grow more slowly than inland.",
    east: "Marigolds handle heat well. Watch for spider mites in hot, dry weather.",
    high: "Marigolds are frost tender. Plant after the last frost."
  },
  calendula: {
    west: "Calendula blooms from spring through fall and sometimes into winter in mild years. Powdery mildew shows up late in the season.",
    coast: "Calendula does well in the cool coastal climate and self-seeds freely.",
    east: "Summer heat stops calendula blooming. Sow in early spring and again in late summer for fall flowers.",
    high: "Calendula blooms through the cool summers and handles light frost."
  },
  ranunculus: {
    west: "Ranunculus corms rot in cold, wet soil, so plant in late winter under cover or in well-drained beds. Protect from slugs.",
    coast: "Mild winters suit ranunculus planted in fall with some protection.",
    east: "Plant in early spring; heat ends bloom by early summer.",
    high: "Plant in spring after hard freezes pass. Cool nights help ranunculus bloom longer."
  },
  snapdragons: {
    west: "Snapdragons like cool weather and sometimes survive mild winters. Rust can be a problem in damp weather.",
    coast: "Snapdragons bloom well in cool coastal summers.",
    east: "Snapdragons bloom best in spring and fall; summer heat slows them down.",
    high: "Snapdragons bloom through the cool summers and handle light frost."
  },
  lavender: {
    west: "Wet, heavy soil kills more lavender than cold. Plant in raised beds or slopes with gravel mixed in. English lavender is the hardiest type.",
    coast: "Winter wet is the challenge on most of the coast, but the dry Olympic rain shadow around Sequim is famous for lavender farms.",
    east: "Lavender is right at home in the dry, sunny east-side climate and handles alkaline soil.",
    high: "English lavender is hardy here. Plant in well-drained soil and full sun."
  },

  /* Berries, perennial vegetables and fall-planted bulbs */
  strawberries: {
    west: "Gray mold (botrytis) rots berries in rainy Junes; mulch with straw to keep fruit off wet soil. Root weevils can damage plants.",
    coast: "Damp weather makes gray mold worse, so give plants good spacing and pick often.",
    east: "Strawberries need steady water in hot, dry summers. Mulch with straw in winter to protect crowns from cold.",
    high: "Late spring frosts can kill blossoms, so cover plants on cold nights. Mulch heavily in winter."
  },
  blueberries: {
    west: "West-side acidic soils suit blueberries naturally, and the region grows many commercially. Mummy berry and spotted wing drosophila are the main pests.",
    coast: "Blueberries grow well in the acidic coastal soils. Choose varieties that ripen before fall rains.",
    east: "Alkaline soil and water make blueberries hard east of the Cascades. Grow them in raised beds with acidic mix or large containers, and watch for yellow leaves, a sign of iron deficiency.",
    high: "Alkaline soil and cold winters make blueberries challenging. Use half-high varieties in containers or acidified beds."
  },
  raspberries: {
    west: "Raspberries grow well here, but root rot kills plants in heavy, wet soil; plant in raised rows. Spotted wing drosophila attacks ripe fruit.",
    coast: "Raspberries grow well in the cool climate. Pick often in wet weather to prevent mold.",
    east: "Raspberries need steady water and some protection from hot afternoon sun. Spider mites can build up in dry heat.",
    high: "Choose cold-hardy varieties. Fall-bearing types may be cut short by early frost, so summer-bearing ones are more dependable."
  },
  blackberries: {
    west: "Trailing blackberries like Marion grow well in the Willamette Valley. Avoid Himalayan blackberry; it is invasive.",
    coast: "Blackberries grow well in the mild climate. Himalayan blackberry is invasive here too.",
    east: "Trailing types often die back in cold winters. Choose hardier erect varieties.",
    high: "Most blackberries struggle with cold winters. Choose the hardiest erect varieties and mulch."
  },
  grapes: {
    west: "Choose early-ripening varieties; powdery mildew is the main disease. Prune hard in winter.",
    coast: "Cool summers make grapes hard to ripen. Grow early varieties against a warm wall.",
    east: "The Columbia Valley is a major wine region, and Concord grapes grow in Yakima. Hard winters below about -5°F can damage European varieties; American hybrids are hardier.",
    high: "Choose the hardiest early varieties. Late spring frosts can damage new shoots."
  },
  "hardy-kiwi": {
    west: "Hardy kiwi grows vigorously. Late spring frosts can damage new shoots, so avoid low frost pockets.",
    east: "Hardy kiwi needs steady water in hot summers and protection from late frosts.",
    high: "Late frosts can damage new growth. Plant in a sheltered spot."
  },
  honeyberries: {
    west: "Honeyberries bloom very early, sometimes in February in mild winters. Birds love the fruit; net plants.",
    east: "Honeyberries are very hardy and do well in cold winters. Water in dry spells.",
    high: "Honeyberries are among the hardiest fruits and handle the coldest winters in the region."
  },
  currants: {
    west: "Currants grow well in the cool climate. Imported currantworm (a sawfly) can strip leaves in spring.",
    east: "Currants like afternoon shade in hot summers and need steady water.",
    high: "Currants are very hardy and do well here."
  },
  gooseberries: {
    west: "Powdery mildew is the main problem in damp weather; choose resistant varieties.",
    east: "Gooseberries like afternoon shade in hot summers.",
    high: "Gooseberries are very cold hardy and fruit well in short seasons."
  },
  elderberries: {
    west: "Blue elderberry is native and easy; red elderberry is also native but its raw fruit is toxic.",
    east: "Blue elderberry is native to dry east-side areas and handles heat."
  },
  huckleberries: {
    west: "Evergreen huckleberry is native to the west side and coast and grows well in gardens.",
    coast: "Evergreen huckleberry is at home in coastal soils and shade.",
    east: "Mountain huckleberries grow wild in east-side and Idaho mountains but are notoriously hard to grow in gardens. They need acidic, well-drained soil and rarely fruit much outside the forest."
  },
  asparagus: {
    west: "Asparagus crowns rot in wet, heavy soil; plant in raised beds. Slugs damage spears.",
    east: "The Columbia Basin grows asparagus commercially. Asparagus beetles are the main pest.",
    high: "Asparagus is very cold hardy. Late frosts can blacken early spears, but new ones keep coming."
  },
  rhubarb: {
    west: "Rhubarb needs winter chill, which the west side provides. Crown rot can occur in waterlogged soil.",
    east: "Rhubarb likes cold winters. Summer heat can make it stall; water deeply.",
    high: "Rhubarb is very hardy and grows well in cold winters."
  },
  artichokes: {
    west: "Artichokes often survive Willamette and Puget Sound winters with mulch. A hard freeze can kill them.",
    coast: "Mild winters and cool summers suit artichokes.",
    east: "Winters usually kill artichokes; grow them as annuals with varieties like Imperial Star."
  },
  garlic: {
    west: "Garlic rust and white rot are the main diseases. Plant in October or November in well-drained soil.",
    coast: "Garlic rust, which shows as orange spots on leaves, is common in damp weather; good spacing and drainage help.",
    east: "Hardneck garlic grows very well. Water until scapes appear, then cut back.",
    high: "Plant in September or October so roots form before the ground freezes, and mulch with straw. Hardneck types handle the cold best."
  },
  shallots: {
    west: "Shallots grow well; plant in fall or early spring in well-drained soil.",
    east: "Shallots handle cold winters; mulch fall plantings."
  },
  camas: {
    west: "Common camas is native to Willamette Valley prairies and grows in soil that is wet in spring and dry in summer.",
    east: "Camas grows in Idaho's Camas Prairie and other wet spring meadows. It goes dormant in summer."
  },

  /* Fruit and nut trees */
  apples: {
    west: "Apple scab spots leaves and fruit in wet springs, so scab-resistant varieties like Liberty and Enterprise save a lot of spraying. Codling moth and apple maggot are the main fruit pests; bagging young fruit works for a backyard tree.",
    coast: "Scab and other leaf diseases thrive in the damp, so scab-resistant varieties are close to essential. Early and mid-season apples ripen more reliably than late ones in the cool summers.",
    east: "Wenatchee and Yakima are among the country's biggest apple regions, so the climate suits apples well. Codling moth is the main pest, and winter sun can split young trunks on the southwest side; painting them with diluted white latex paint prevents it.",
    high: "Late spring frosts often kill blossoms, so plant on a slope rather than in a low spot, and choose very cold-hardy varieties."
  },
  pears: {
    west: "Pear scab and fire blight are the main diseases in wet, mild springs. Cut fire-blighted shoots well below the dead wood in dry weather.",
    east: "Hood River and the Wenatchee valley are major pear regions. Pear psylla and fire blight are the main problems; fire blight spreads fastest when warm spring rain falls during bloom.",
    high: "Pears bloom early, so late frosts often take the crop. European pears are generally hardier than Asian pears here."
  },
  plums: {
    west: "Italian prune plums have been grown in the Willamette Valley for over a century. Brown rot spreads in wet weather near harvest; pick off and throw away rotting fruit.",
    east: "Plums grow well with irrigation, but they bloom early, and a late spring frost can wipe out the crop.",
    high: "European and Japanese plums often lose blossoms to frost. Hardy American and hybrid plums are more dependable."
  },
  cherries: {
    west: "Rain near harvest splits ripe sweet cherries, and bacterial canker and brown rot are common. Crack-resistant varieties and covering the tree before ripe fruit gets rained on help. Spotted wing drosophila lays eggs in ripening fruit.",
    east: "Wenatchee, Yakima and The Dalles are major sweet cherry regions. Western cherry fruit fly is the main pest, and backyard trees near orchards need it controlled.",
    high: "Sweet cherries rarely crop because blossoms freeze. Tart cherries are hardier and bloom a little later."
  },
  figs: {
    west: "Desert King gives a reliable early (breba) crop in summer from buds formed the year before. The main crop needs a long, warm summer and often doesn't ripen before fall rain.",
    coast: "The main crop rarely ripens in cool summers. Desert King's early breba crop, on a sunny wall, is the best chance of fruit.",
    east: "Summers are hot enough to ripen figs, but winter cold often kills them to the ground. The warmest valleys, like Lewiston and Boise, give the best chance, with heavy mulch or a pot that comes inside for winter.",
    high: "Figs don't survive winter outdoors here; grow one in a pot that winters in a garage."
  },
  peaches: {
    west: "Peach leaf curl, which puckers and reddens spring leaves, is the main problem in wet springs. Spray copper as leaves drop in fall and again before buds swell, or plant resistant varieties like Frost.",
    coast: "Peach leaf curl and cool summers make peaches very hard on most of the coast.",
    east: "Yakima, Wenatchee and the Treasure Valley grow peaches commercially. Peaches bloom early, so late spring frosts are the main risk to the crop.",
    high: "Peaches bloom so early that late frosts usually kill the flowers. A tree may only fruit in occasional years."
  },
  hazelnuts: {
    west: "The Willamette Valley grows nearly all of the country's hazelnuts. Eastern filbert blight, which kills branches, is the main disease, so plant blight-resistant varieties like Jefferson or Yamhill."
  },
  persimmons: {
    west: "Fuyu persimmons, the kind you can eat crisp, grow around Portland and the Willamette Valley and ripen in late October or November, often after the leaves drop.",
    coast: "Coastal summers are usually too cool to ripen Asian persimmons.",
    east: "Cold winters limit Asian persimmons to the warmest valleys. American persimmons are much hardier."
  },
  "asian-pears": {
    west: "Asian pears grow well on the west side. Fire blight is the main disease, and thinning fruit to one per cluster gives larger pears.",
    east: "Asian pears grow well with steady irrigation. Thin fruit early and keep leaves healthy so they shade fruit from sunburn."
  },
  quince: {
    west: "Quince is easy in west-side gardens. Fire blight and leaf blight are the main diseases in wet springs."
  },
  mulberries: {
    west: "Mulberries grow well here and ripen over several weeks in summer. Birds love them, and dropped fruit stains paths and patios.",
    east: "Mulberries handle heat and dry spells well once established."
  },

  /* Native plants */
  "oregon-grape": {
    west: "Tall Oregon grape is common in west-side woods and gardens, and handles shade, clay and summer drought once established.",
    east: "Oregon grape also grows wild east of the Cascades. In hot, open sites, part shade keeps the leaves from scorching."
  },
  "red-flowering-currant": {
    west: "Red-flowering currant is native to the west side and blooms in March, about when hummingbirds return. It handles dry summers once established.",
    east: "It is mostly a west-side native, so east of the Cascades give it afternoon shade and water through summer."
  },
  serviceberry: {
    west: "Serviceberry grows well in west-side gardens. Rust can spot leaves and fruit in wet springs.",
    east: "Western serviceberry grows wild across the dry east side and handles heat, cold and alkaline soil."
  },
  thimbleberry: {
    west: "Thimbleberry is common in west-side woods and spreads into patches in part shade.",
    east: "Thimbleberry grows wild along forest edges and streams east of the Cascades; give it some shade and summer water in gardens."
  },
  salmonberry: {
    west: "Salmonberry is native to wet west-side woods and stream banks and wants moist soil all year.",
    coast: "Salmonberry grows wild in the wet coastal climate and spreads quickly.",
    east: "Salmonberry is a poor fit for dry east-side gardens unless it gets steady water and shade."
  },
  salal: {
    west: "Salal is native to west-side forests and slowly forms a dense evergreen groundcover in shade.",
    coast: "Salal grows tall and dense on the coast, in sun or shade.",
    east: "Salal needs acidic, moist soil and shelter, which makes it hard in dry, alkaline east-side gardens."
  },
  kinnikinnick: {
    west: "Kinnikinnick needs sun and lean, well-drained soil; it struggles in heavy, wet clay.",
    coast: "Kinnikinnick grows naturally on coastal bluffs and dunes.",
    east: "Kinnikinnick also grows wild east of the Cascades in pine forests and handles cold winters."
  },
  "western-columbine": {
    west: "Western columbine grows in part shade and moist soil, and its red-and-yellow flowers draw hummingbirds in spring.",
    east: "It grows wild east of the Cascades too, usually in moist, shady spots; give it afternoon shade in gardens."
  },
  "douglas-aster": {
    west: "Douglas aster is native to moist west-side meadows and stream banks and blooms in late summer when little else does. It spreads, so give it room."
  },
  "oregon-sunshine": {
    west: "Oregon sunshine wants full sun and very well-drained soil; it rots in wet winter clay.",
    east: "Oregon sunshine grows wild on dry, sunny east-side slopes and needs little or no summer water."
  },
  "pacific-ninebark": {
    west: "Pacific ninebark grows naturally in moist west-side spots and handles soggy winter soil.",
    east: "Mallow ninebark is the ninebark native to dry east-side slopes. Pacific ninebark needs summer water there."
  },
  "sword-fern": {
    west: "Sword fern is one of the most common west-side forest plants and handles dry summer shade once established.",
    coast: "Sword fern grows easily in the coastal climate and can take more sun there.",
    east: "Sword fern needs shade and regular water east of the Cascades; hot sun burns the fronds."
  },
  "oregon-iris": {
    west: "Oregon iris is native to west-side meadows and open woods and needs no summer water once established.",
    east: "Rocky Mountain iris is the iris native to east-side meadows and is the better choice there."
  }
};
