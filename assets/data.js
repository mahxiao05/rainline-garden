/* Rainline Garden data.
 * Frost dates: NOAA NCEI U.S. Climate Normals 1991-2020, annual/seasonal product,
 *   32°F freeze probabilities (ANN-TMIN-PRBLST-T32FP10/50/90, ANN-TMIN-PRBFST-T32FP10/50/90).
 *   spring50 = median last spring freeze; spring10 = only a 10% chance of a freeze after this date.
 *   fall50 = median first fall freeze; fall10 = only a 10% chance of a freeze before this date.
 * Planting windows: regional timing from OSU Extension monthly garden calendars (April EM 9476,
 *   May EM 9688, March EM 9714), OSU Central Oregon vegetable calendar (EM 9473), and OSU soil
 *   temperature guidance. Washington regions are matched to the closest OSU climate region.
 * To update: edit the values below, then run `node scripts/build.js`.
 */
(function (root) {
  var stations = {
    "USW00024229": { name: "Portland International Airport", spring10: "04-01", spring50: "03-13", fall50: "11-19", fall10: "10-29", elev: 6 },
    "USW00024242": { name: "Portland-Troutdale Airport", spring10: "04-12", spring50: "03-16", fall50: "11-20", fall10: "10-30", elev: 9 },
    "USW00094281": { name: "Aurora State Airport", spring10: "04-07", spring50: "03-16", fall50: "11-14", fall10: "10-27", elev: 60 },
    "USW00024232": { name: "Salem McNary Field", spring10: "04-27", spring50: "04-03", fall50: "11-01", fall10: "10-16", elev: 63 },
    "USW00024221": { name: "Eugene Mahlon Sweet Airport", spring10: "05-09", spring50: "04-11", fall50: "10-23", fall10: "10-06", elev: 108 },
    "USW00024231": { name: "Roseburg Regional Airport", spring10: "04-13", spring50: "03-19", fall50: "11-20", fall10: "10-27", elev: 160 },
    "USW00024225": { name: "Medford Rogue Valley Airport", spring10: "04-30", spring50: "04-08", fall50: "10-29", fall10: "10-14", elev: 395 },
    "USW00094224": { name: "Astoria Regional Airport", spring10: "04-18", spring50: "03-26", fall50: "11-11", fall10: "10-22", elev: 3 },
    "USW00024284": { name: "North Bend Regional Airport", spring10: "03-25", spring50: "02-21", fall50: "12-09", fall10: "11-12", elev: 5 },
    "USW00024230": { name: "Redmond Roberts Field", spring10: "06-26", spring50: "06-09", fall50: "09-14", fall10: "09-01", elev: 928 },
    "USW00094236": { name: "Klamath Falls Airport", spring10: "06-26", spring50: "06-09", fall50: "09-18", fall10: "09-04", elev: 1245 },
    "USW00094185": { name: "Burns Municipal Airport", spring10: "06-28", spring50: "06-11", fall50: "09-06", fall10: "08-21", elev: 1262 },
    "USW00024130": { name: "Baker City Municipal Airport", spring10: "06-16", spring50: "05-25", fall50: "09-15", fall10: "09-02", elev: 1024 },
    "USW00024155": { name: "Pendleton Airport", spring10: "05-10", spring50: "04-26", fall50: "10-16", fall10: "10-01", elev: 462 },
    "USW00024219": { name: "The Dalles Municipal Airport (Dallesport, WA)", spring10: "04-28", spring50: "04-11", fall50: "10-26", fall10: "10-09", elev: 72 },
    "USW00024233": { name: "Seattle-Tacoma International Airport", spring10: "03-23", spring50: "03-02", fall50: "11-23", fall10: "11-06", elev: 113 },
    "USW00024222": { name: "Everett Paine Field", spring10: "03-29", spring50: "03-09", fall50: "11-17", fall10: "10-31", elev: 185 },
    "USW00024227": { name: "Olympia Airport", spring10: "05-15", spring50: "04-29", fall50: "10-14", fall10: "09-28", elev: 57 },
    "USW00024217": { name: "Bellingham International Airport", spring10: "04-18", spring50: "03-31", fall50: "10-30", fall10: "10-12", elev: 45 },
    "USW00094298": { name: "Vancouver Pearson Field", spring10: "04-18", spring50: "03-29", fall50: "11-09", fall10: "10-22", elev: 9 },
    "USW00094225": { name: "Hoquiam Bowerman Airport", spring10: "04-25", spring50: "03-30", fall50: "11-14", fall10: "10-22", elev: 4 },
    "USW00094240": { name: "Quillayute Airport", spring10: "05-10", spring50: "04-20", fall50: "10-26", fall10: "10-02", elev: 56 },
    "USW00024243": { name: "Yakima Air Terminal", spring10: "05-27", spring50: "05-08", fall50: "10-04", fall10: "09-23", elev: 324 },
    "USW00094239": { name: "Wenatchee Pangborn Airport", spring10: "04-23", spring50: "04-08", fall50: "10-24", fall10: "10-12", elev: 375 },
    "USW00024163": { name: "Pasco Tri-Cities Airport", spring10: "05-10", spring50: "04-27", fall50: "10-11", fall10: "09-28", elev: 124 },
    "USW00024160": { name: "Walla Walla Regional Airport", spring10: "04-22", spring50: "03-27", fall50: "10-31", fall10: "10-15", elev: 355 },
    "USW00024110": { name: "Moses Lake Grant County Airport", spring10: "05-11", spring50: "04-27", fall50: "10-08", fall10: "09-29", elev: 365 },
    "USW00024220": { name: "Ellensburg Bowers Field", spring10: "05-12", spring50: "04-28", fall50: "10-07", fall10: "09-26", elev: 538 },
    "USW00024157": { name: "Spokane International Airport", spring10: "05-10", spring50: "04-26", fall50: "10-12", fall10: "09-29", elev: 717 },
    "USW00094197": { name: "Omak Airport", spring10: "05-15", spring50: "04-30", fall50: "10-07", fall10: "09-23", elev: 395 }
  };

  /* Climate regions. Anchors are the earliest sensible dates (MM-DD) for each kind of planting,
   * before the local frost check is applied. */
  var zones = {
    coast: { name: "Coast", blurb: "Mild winters but cool, foggy summers. Frost is rarely the problem; warmth is. Pick early, cool-tolerant varieties of tomatoes and squash.",
      anchors: { coolEarly: "03-25", coolTrans: "04-01", warmSeed: "05-15", warmTrans: "05-20", garlicStart: "10-01", garlicEnd: "11-15" } },
    west: { name: "West-side valleys", blurb: "The Willamette Valley, Puget Sound and southern Oregon valleys. Long frost-free seasons, but soil stays cold and wet into May, so warm crops wait for warm soil, not just the last frost.",
      anchors: { coolEarly: "03-01", coolTrans: "03-15", warmSeed: "05-10", warmTrans: "05-10", garlicStart: "10-01", garlicEnd: "11-15" } },
    east: { name: "Columbia Basin and low eastern valleys", blurb: "Hot, dry summers and quick spring warm-up. Warm crops go in earlier than west of the Cascades, and irrigation matters more than rain.",
      anchors: { coolEarly: "03-20", coolTrans: "04-01", warmSeed: "04-25", warmTrans: "05-01", garlicStart: "10-01", garlicEnd: "11-01" } },
    inland: { name: "Inland Northwest", blurb: "Higher, colder interior valleys. Cold springs and an earlier fall mean a shorter season; quick-maturing varieties pay off.",
      anchors: { coolEarly: "04-01", coolTrans: "04-15", warmSeed: "05-15", warmTrans: "05-20", garlicStart: "09-25", garlicEnd: "10-31" } },
    high: { name: "High desert and mountains", blurb: "Central and high eastern Oregon. Frost is possible almost any month. Use row covers, wall-o-water or cloches for warm crops, and choose short-season varieties.",
      anchors: { coolEarly: "04-20", coolTrans: "04-15", warmSeed: "05-25", warmTrans: "05-25", garlicStart: "10-15", garlicEnd: "11-15" } }
  };

  /* Places people can pick. zip3 = default for 3-digit ZIP prefixes; zips = specific 5-digit overrides. */
  var places = [
    { slug: "portland-or", city: "Portland", state: "OR", station: "USW00024229", zone: "west", zip3: ["970", "971", "972"] },
    { slug: "gresham-or", city: "Gresham", state: "OR", station: "USW00024242", zone: "west", zips: ["97030", "97080", "97060", "97024", "97019"] },
    { slug: "wilsonville-or", city: "Wilsonville and Canby", state: "OR", station: "USW00094281", zone: "west", zips: ["97070", "97013", "97002", "97071", "97032"] },
    { slug: "salem-or", city: "Salem", state: "OR", station: "USW00024232", zone: "west", zip3: ["973"] },
    { slug: "eugene-or", city: "Eugene", state: "OR", station: "USW00024221", zone: "west", zip3: ["974"] },
    { slug: "roseburg-or", city: "Roseburg", state: "OR", station: "USW00024231", zone: "west", zips: ["97470", "97471"] },
    { slug: "medford-or", city: "Medford", state: "OR", station: "USW00024225", zone: "west", zip3: ["975"] },
    { slug: "astoria-or", city: "Astoria", state: "OR", station: "USW00094224", zone: "coast", zips: ["97103", "97138", "97146", "97121", "97110"] },
    { slug: "coos-bay-or", city: "Coos Bay and North Bend", state: "OR", station: "USW00024284", zone: "coast", zips: ["97420", "97459", "97439", "97411", "97458"] },
    { slug: "bend-or", city: "Bend and Redmond", state: "OR", station: "USW00024230", zone: "high", zip3: ["977"] },
    { slug: "klamath-falls-or", city: "Klamath Falls", state: "OR", station: "USW00094236", zone: "high", zip3: ["976"] },
    { slug: "burns-or", city: "Burns", state: "OR", station: "USW00094185", zone: "high", zips: ["97720", "97738"] },
    { slug: "baker-city-or", city: "Baker City", state: "OR", station: "USW00024130", zone: "high", zip3: ["979"] },
    { slug: "pendleton-or", city: "Pendleton", state: "OR", station: "USW00024155", zone: "east", zip3: ["978"] },
    { slug: "the-dalles-or", city: "The Dalles", state: "OR", station: "USW00024219", zone: "east", zips: ["97058", "98617", "97040"] },
    { slug: "seattle-wa", city: "Seattle and Tacoma", state: "WA", station: "USW00024233", zone: "west", zip3: ["980", "981", "983", "984"] },
    { slug: "everett-wa", city: "Everett", state: "WA", station: "USW00024222", zone: "west", zip3: ["982"] },
    { slug: "bellingham-wa", city: "Bellingham", state: "WA", station: "USW00024217", zone: "west", zips: ["98225", "98226", "98227", "98228", "98229", "98248", "98264"] },
    { slug: "olympia-wa", city: "Olympia", state: "WA", station: "USW00024227", zone: "west", zip3: ["985"] },
    { slug: "vancouver-wa", city: "Vancouver", state: "WA", station: "USW00094298", zone: "west", zip3: ["986"] },
    { slug: "aberdeen-wa", city: "Aberdeen and Hoquiam", state: "WA", station: "USW00094225", zone: "coast", zips: ["98520", "98550", "98569", "98563"] },
    { slug: "forks-wa", city: "Forks", state: "WA", station: "USW00094240", zone: "coast", zips: ["98331"] },
    { slug: "yakima-wa", city: "Yakima", state: "WA", station: "USW00024243", zone: "east", zip3: ["989"] },
    { slug: "wenatchee-wa", city: "Wenatchee", state: "WA", station: "USW00094239", zone: "east", zip3: ["988"] },
    { slug: "tri-cities-wa", city: "Tri-Cities (Pasco, Kennewick, Richland)", state: "WA", station: "USW00024163", zone: "east", zip3: ["993"] },
    { slug: "walla-walla-wa", city: "Walla Walla", state: "WA", station: "USW00024160", zone: "east", zip3: ["994"], zips: ["99362"] },
    { slug: "moses-lake-wa", city: "Moses Lake", state: "WA", station: "USW00024110", zone: "east", zips: ["98837"] },
    { slug: "ellensburg-wa", city: "Ellensburg", state: "WA", station: "USW00024220", zone: "inland", zips: ["98926"] },
    { slug: "spokane-wa", city: "Spokane", state: "WA", station: "USW00024157", zone: "inland", zip3: ["990", "991", "992"] },
    { slug: "omak-wa", city: "Omak and Okanogan", state: "WA", station: "USW00094197", zone: "inland", zips: ["98841", "98840", "98856"] }
  ];

  /* Crops.
   * anchor: which regional anchor sets the earliest date.
   * win: length of the spring planting window in days.
   * indoor: [weeks before, weeks before] to start seeds indoors (transplanted crops).
   * fall: [weeks, weeks] before the median first fall freeze for a second sowing/planting.
   * days: rough days from planting outdoors to first harvest (for the season-length check).
   */
  var crops = [
    { id: "peas", name: "Peas", group: "cool", how: "Plant seeds in the ground", anchor: "coolEarly", win: 42, days: 65, note: "Germinate in cool soil (about 40-50°F). Get them in early; they stall in summer heat." },
    { id: "radishes", name: "Radishes", group: "cool", how: "Plant seeds in the ground", anchor: "coolEarly", win: 56, days: 28, fall: [6, 4], note: "Sow a short row every two weeks for a steady supply." },
    { id: "spinach", name: "Spinach", group: "cool", how: "Plant seeds in the ground", anchor: "coolEarly", win: 35, days: 45, fall: [8, 5], note: "Bolts when days get long and warm, so spring sowings should go in early." },
    { id: "lettuce", name: "Lettuce", group: "cool", how: "Plant seeds or young plants", anchor: "coolEarly", win: 56, days: 50, fall: [8, 6], indoor: [6, 4], note: "Tolerates light frost. Sow every two to three weeks; choose heat-tolerant types for later sowings." },
    { id: "onions", name: "Onions", group: "cool", how: "Plant small onion bulbs (sets)", anchor: "coolEarly", win: 35, days: 110, note: "Plant as soon as the soil is dry enough to work. Pick long-day varieties for the Northwest." },
    { id: "carrots", name: "Carrots", group: "cool", how: "Plant seeds in the ground", anchor: "coolTrans", win: 56, days: 70, fall: [12, 10], note: "Keep the seedbed moist until they sprout, which can take two to three weeks in cool soil." },
    { id: "beets", name: "Beets", group: "cool", how: "Plant seeds in the ground", anchor: "coolTrans", win: 56, days: 60, fall: [10, 8], note: "Each seed cluster sprouts several seedlings; thin to 3 inches apart." },
    { id: "kale", name: "Kale", group: "cool", how: "Plant young plants (starts)", anchor: "coolTrans", win: 42, days: 60, fall: [10, 8], indoor: [6, 4], note: "One of the best crops for Northwest winters; frost sweetens the leaves." },
    { id: "broccoli", name: "Broccoli", group: "cool", how: "Plant young plants (starts)", anchor: "coolTrans", win: 35, days: 70, fall: [12, 10], indoor: [7, 5], note: "Harvest the main head while buds are tight; side shoots follow for weeks." },
    { id: "cabbage", name: "Cabbage", group: "cool", how: "Plant young plants (starts)", anchor: "coolTrans", win: 35, days: 75, fall: [12, 10], indoor: [7, 5], note: "Even watering prevents split heads." },
    { id: "chard", name: "Swiss chard", group: "cool", how: "Plant seeds in the ground", anchor: "coolTrans", win: 56, days: 55, fall: [10, 8], note: "Handles both cool spring weather and summer heat; harvest outer leaves for months." },
    { id: "potatoes", name: "Potatoes", group: "cool", how: "Plant seed potatoes", anchor: "coolTrans", win: 42, days: 95, note: "Use certified seed potatoes. Hill soil around stems as they grow." },
    { id: "beans", name: "Bush beans", group: "warm", how: "Plant seeds in the ground", anchor: "warmSeed", win: 42, days: 55, note: "Seeds rot in cold, wet soil. Wait until soil is consistently above 60°F." },
    { id: "corn", name: "Sweet corn", group: "warm", how: "Plant seeds in the ground", anchor: "warmSeed", win: 35, days: 80, note: "Plant in blocks of at least four short rows, not one long row, for good pollination." },
    { id: "cucumbers", name: "Cucumbers", group: "warm", how: "Plant seeds or young plants", anchor: "warmTrans", win: 28, days: 60, indoor: [4, 3], note: "Need warm soil and warm nights. Floating row cover helps in cool springs." },
    { id: "summer-squash", name: "Zucchini and summer squash", group: "warm", how: "Plant seeds or young plants", anchor: "warmTrans", win: 28, days: 55, indoor: [4, 3], note: "Two plants feed most families. Pick fruit small and often." },
    { id: "winter-squash", name: "Winter squash and pumpkins", group: "warm", how: "Plant seeds or young plants", anchor: "warmTrans", win: 21, days: 100, indoor: [4, 3], note: "Long season. Harvest before hard frost and cure in a warm spot for storage." },
    { id: "tomatoes", name: "Tomatoes", group: "warm", how: "Plant young plants (starts)", anchor: "warmTrans", win: 28, days: 75, indoor: [8, 6], note: "OSU Extension advises waiting for soil consistently above 70°F. Early or cherry varieties ripen most reliably here." },
    { id: "peppers", name: "Peppers", group: "warm", how: "Plant young plants (starts)", anchor: "warmTrans", win: 21, days: 75, indoor: [10, 8], note: "Even more heat-hungry than tomatoes. A warm wall or black plastic mulch helps." },
    { id: "basil", name: "Basil", group: "warm", how: "Plant young plants (starts)", anchor: "warmTrans", win: 28, days: 60, indoor: [6, 4], note: "Blackens below about 40°F, so it's the last thing to go out." },
    { id: "dahlias", name: "Dahlias", group: "warm", how: "Plant tubers", anchor: "warmTrans", win: 28, days: 90, note: "Tubers rot in cold, wet soil, so wait until it warms. West of the Cascades many gardeners leave them in the ground over winter under thick mulch; east of the mountains, dig and store them after the first frost." },
    { id: "cilantro", name: "Cilantro", group: "cool", how: "Plant seeds in the ground", anchor: "coolEarly", win: 49, days: 50, fall: [7, 5], note: "Bolts fast in summer heat. Sow a short row every three weeks in spring, and again in late summer for fall." },
    { id: "parsley", name: "Parsley", group: "cool", how: "Plant seeds or young plants", anchor: "coolTrans", win: 49, days: 75, indoor: [8, 6], note: "Slow to sprout (up to three weeks), so many gardeners buy starts. Often keeps going through a mild Northwest winter." },
    { id: "dill", name: "Dill", group: "cool", how: "Plant seeds in the ground", anchor: "coolTrans", win: 63, days: 60, note: "Doesn't like being transplanted; sow it where it will grow. Let a few plants flower to feed beneficial insects." },
    { id: "strawberries", name: "Strawberries", group: "berry", how: "Plant young plants", anchor: "coolTrans", win: 42, days: 0, note: "June-bearers give one big crop; everbearers and day-neutrals give smaller harvests through summer. Oregon and Washington breeding programs have produced many of the best varieties for this climate." },
    { id: "blueberries", name: "Blueberries", group: "berry", how: "Plant potted or bare-root bushes", anchor: "coolTrans", win: 49, days: 0, note: "Need acidic soil (pH 4.5 to 5.5), which much of western Oregon and Washington already has. Plant two varieties for better crops. West of the Cascades, fall planting works well too." },
    { id: "raspberries", name: "Raspberries", group: "berry", how: "Plant bare-root canes", anchor: "coolTrans", win: 42, days: 0, note: "Need well-drained soil; they die in soggy ground. A raised row helps in wet Northwest winters. West of the Cascades, fall planting works well too." },
    { id: "garlic", name: "Garlic", group: "fall", how: "Plant cloves", anchor: "garlic", days: 0, note: "Planted in fall, harvested the next summer when the lower leaves brown." }
  ];

  var chores = [
    { m: 1, title: "January", items: [
      "Order seeds now while catalogs have full stock. Look for short-season and cool-summer varieties.",
      "Prune dormant fruit trees on dry days between rains.",
      "Check stored squash, potatoes and onions, and remove any that are softening.",
      "Sketch this year's beds and rotate crop families so the same family isn't in the same spot two years running." ] },
    { m: 2, title: "February", items: [
      "Start onions and leeks indoors.",
      "West of the Cascades, start broccoli, cabbage and lettuce indoors late in the month.",
      "Clean and sharpen tools, and wash old pots and seed trays.",
      "Stay off wet soil. If a squeezed handful drips or stays in a ball, it's too wet to dig." ] },
    { m: 3, title: "March", items: [
      "West-side valleys: sow peas, radishes, spinach and onions once the soil can be worked.",
      "Start tomatoes and peppers indoors, timed six to ten weeks before your warm-crop planting date.",
      "Spread compost on beds ahead of planting.",
      "Put out slug bait or traps. Northwest slugs wake up hungry in spring." ] },
    { m: 4, title: "April", items: [
      "Set out broccoli, cabbage, kale and lettuce starts in west-side and lower eastern gardens.",
      "Central and high eastern gardens: sow peas, radishes, lettuce and spinach late in the month.",
      "Keep row cover handy; late frosts are common even after your median date.",
      "Begin hardening off seedlings with a few hours outdoors each day." ] },
    { m: 5, title: "May", items: [
      "Plant tomatoes, peppers, squash and beans once the soil is warm. A soil thermometer takes the guesswork out.",
      "Thin carrots and beets sown in spring.",
      "Mulch around plants after the soil warms to hold moisture.",
      "High desert: transplant warm crops late in the month with frost protection ready." ] },
    { m: 6, title: "June", items: [
      "Water deeply and less often; aim for about an inch a week, more in the eastern valleys.",
      "Stake or cage tomatoes before they sprawl.",
      "Harvest peas, lettuce and spinach before summer heat makes them bolt.",
      "Sow a second round of beans and summer squash for late-summer harvests." ] },
    { m: 7, title: "July", items: [
      "Start fall broccoli, cabbage and kale, from seed indoors or in a shaded nursery bed.",
      "Sow fall carrots and beets in west-side and coastal gardens.",
      "Watch for powdery mildew on squash and cucumbers; improve airflow and water at the base.",
      "Harvest garlic when the lower third of the leaves turn brown." ] },
    { m: 8, title: "August", items: [
      "Set out fall and winter crop starts: kale, broccoli, cabbage.",
      "Sow spinach, lettuce and radishes for fall harvest.",
      "Pick summer squash and beans every couple of days to keep plants producing.",
      "Plan for overwintering crops west of the Cascades, like kale, leeks and overwintering cauliflower." ] },
    { m: 9, title: "September", items: [
      "Pinch off new tomato flowers so the plant ripens fruit already on the vine.",
      "Plant a cover crop, such as crimson clover or cereal rye, in emptied beds.",
      "High desert and inland gardens: watch the forecast and cover tender crops on cold nights.",
      "Save seed from open-pollinated beans and tomatoes." ] },
    { m: 10, title: "October", items: [
      "Plant garlic cloves, pointed end up, about 2 inches deep.",
      "Harvest winter squash and pumpkins before a hard frost, then cure them somewhere warm for a week or two.",
      "Rake leaves onto beds or into a compost pile as winter mulch.",
      "Bring in green tomatoes before frost; many will ripen indoors." ] },
    { m: 11, title: "November", items: [
      "Mulch garlic and overwintering crops with straw or leaves.",
      "Clean up diseased plant debris; don't compost blighted tomato vines.",
      "Drain and store hoses in eastern and high-elevation gardens before hard freezes.",
      "Test soil pH this fall. Most Northwest soils run acidic and benefit from lime applied over winter." ] },
    { m: 12, title: "December", items: [
      "Harvest kale, leeks and other hardy crops as needed.",
      "Cover winter greens with row cover on nights below the low 20s.",
      "Review this year's notes: what thrived, what failed, and which varieties to repeat.",
      "Rest. The seed catalogs are coming." ] }
  ];

  var D = { stations: stations, zones: zones, places: places, crops: crops, chores: chores };
  if (typeof module !== "undefined" && module.exports) module.exports = D; else root.RainlineData = D;
})(this);
