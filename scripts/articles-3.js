/* Third batch of hand-written articles (same fields as articles.js). */
const win = (D, P, slug, id, kind) => {
  const p = P.plan(D, P.findPlace(D, slug));
  const r = p.crops.find(x => x.crop.id === id);
  const w = r.windows.find(x => x.kind === (kind || "spring")) || r.windows[0];
  return { range: P.fmtRange(w.start, w.end), indoor: r.indoor ? P.fmtRange(r.indoor.start, r.indoor.end) : null };
};
const frostAt = (D, P, slug) => {
  const p = P.plan(D, P.findPlace(D, slug));
  const f = p.frost;
  return { median: P.fmtLong(f.spring50), safe: P.fmtLong(f.spring10), fall: P.fmtLong(f.fall50), season: f.season, station: p.station.name };
};

module.exports = [
  {
    slug: "frost-dates-explained",
    author: "jigmey-dorjee",
    topic: "timing", icon: "frost",
    title: "What Your Last Frost Date Really Means",
    description: "A 'last frost date' is an average, and in half of years frost comes later. What the number means and how much margin to give tomatoes.",
    crops: ["tomatoes", "peppers", "basil", "beans"],
    published: "2026-10-14",
    quick: () => [
      ["What it means", "The usual last frost date is a median: in half of years the last freeze comes later."],
      ["Hardy crops", "Peas, spinach and kale can go in around the median date or even before it."],
      ["Tender crops", "Wait for the 10% date and warm soil, with covers handy."]
    ],
    body: ({ D, P, link }) => {
      const pdx = frostAt(D, P, "portland-or"), oly = frostAt(D, P, "olympia-wa"), bend = frostAt(D, P, "bend-or"), sea = frostAt(D, P, "seattle-wa");
      return `
<p>Almost every planting chart is built around one number: your last frost date. Seed packets say "sow 2 weeks after last frost" and "start indoors 6 weeks before last frost." But that date is easy to misread, and the misreading is how a lot of tomato plants die in May.</p>
<p>Maybe you've been there. You looked up your frost date, waited until it had safely passed, planted your tomatoes and basil on a warm weekend, and woke up a week later to blackened leaves. You didn't do anything wrong, exactly. You just trusted a number that was never meant to be a guarantee.</p>
<h2>It's an average, not a deadline</h2>
<p>The frost dates on Rainline Garden come from NOAA's U.S. Climate Normals, which summarize 30 years of daily temperature records (1991 to 2020) at official weather stations. For each station, NOAA works out the odds of a freeze, meaning 32°F or colder, after each day in spring.</p>
<p>The date most charts call the "last frost date" is the median. In half of years the last spring freeze comes before it, and in half of years it comes after. Planting tender crops on that exact day is a coin flip.</p>
<p>So Rainline Garden also shows a safer date: the day after which there's only a 10% chance of another freeze. Put simply, if you plant on that date, you'd expect to get caught by a frost about one spring in ten. At Portland International Airport, for example:</p>
<ul>
<li><strong>Median last freeze:</strong> ${pdx.median}</li>
<li><strong>Only a 10% chance of a freeze after:</strong> ${pdx.safe}</li>
</ul>
<h2>Nearby towns can be weeks apart</h2>
<p>Frost dates change quickly with elevation and terrain. Cold air drains downhill on calm, clear nights and pools in low spots, so a valley floor can freeze when a hillside a mile away doesn't. Compare the median last freeze at a few stations:</p>
<ul>
<li><strong>Seattle-Tacoma airport:</strong> ${sea.median}</li>
<li><strong>Portland airport:</strong> ${pdx.median}</li>
<li><strong>Olympia airport:</strong> ${oly.median}, nearly two months after Seattle even though the two are less than 60 miles apart</li>
<li><strong>Redmond, for the Bend area:</strong> ${bend.median}</li>
</ul>
<p>Your own yard may run earlier or later than the nearest station. A low spot at the bottom of a slope tends to be colder; a bed against a south-facing wall in the city tends to be warmer.</p>
<p>The Olympia number surprises a lot of people. The airport sits on an open, low prairie south of town, away from the warming effect of Puget Sound, and on clear spring nights cold air settles there. Seattle's airport is closer to the water and surrounded by a big city, both of which keep nights milder. Many towns have a story like this, which is why we show you the station your dates come from.</p>
<h2>Find out how your yard compares</h2>
<p>A minimum-maximum thermometer costs about the same as a bag of potting soil, and it's the best way to learn your own garden. Put it in the vegetable bed at about plant height, out of direct sun, and check it each morning through spring. After a few weeks, compare your lows to the forecast and the nearest station. If your yard runs a few degrees colder, push your planting dates later. If it runs warmer, you've earned a head start. Write it down, and next spring you won't have to guess.</p>
<h2>Frost can form above 32°F</h2>
<p>Official air temperatures are measured about five feet above the ground. On clear, still nights the ground and the leaves of low plants lose heat fast and can be several degrees colder than that. So a forecast low of 35°F can still leave frost on your lettuce. When the forecast is in the mid-30s, cover tender plants anyway.</p>
<h2>Not all freezes are equal</h2>
<p>Weather forecasters sometimes talk about a light freeze, a moderate freeze and a hard (or severe) freeze. Roughly, a light freeze is 29 to 32°F, which kills tender plants like basil, beans and tomatoes but barely bothers peas or kale. A moderate freeze, around 25 to 28°F, damages many leafy crops and fruit blossoms. A hard freeze, 24°F and below, does serious damage to most plants that aren't fully hardy. When you see a frost advisory or freeze warning, the number in the forecast tells you what to protect.</p>
<h2>Don't forget the fall date</h2>
<p>The first fall frost works the same way, in reverse. The typical date is a 50/50 point, so in half of years frost arrives earlier. At Portland airport the typical first fall freeze is around ${pdx.fall}; in Bend it's around ${bend.fall}. That's the date to count back from when you plan fall crops, and the date to keep in mind when your tomatoes are still green in September. Frost often comes on the first clear, calm night after a cold front, so watch for those.</p>
<h2>Frost-free doesn't mean warm enough</h2>
<p>The last frost date only tells you when freezing becomes unlikely. Tomatoes, peppers, basil, beans and squash also need warm soil and mild nights, which in the Northwest often arrive weeks later. Rainline Garden's planting windows for warm crops start a while after the frost date for this reason. Read more in <a href="${link("articles/soil-temperature/")}">why to plant by soil temperature</a>.</p>
<h2>How to use your dates</h2>
<ol>
<li>Plant frost-hardy crops like peas, spinach and kale around the median date or even before it.</li>
<li>Plant tender crops after the 10% date, and once the soil has warmed.</li>
<li>Keep row cover or old sheets handy for a few weeks after you plant, in case of a late cold night.</li>
<li>Watch the forecast, not just the calendar. A chart is a starting point; the weather this week is what matters.</li>
</ol>
<p>Look up the dates for your town on the <a href="${link("frost-dates/")}">frost dates page</a>, or <a href="${link("")}">enter your ZIP</a> to get a full planting calendar built on them.</p>`;
    }
  },
  {
    slug: "hardening-off-seedlings",
    author: "jigmey-dorjee",
    topic: "timing", icon: "hardening",
    title: "How to Harden Off Seedlings Before Planting Out",
    description: "Indoor seedlings scorch or stall if they go straight outside. A day-by-day routine for getting them used to sun, wind and cold nights.",
    crops: ["tomatoes", "peppers", "broccoli", "cabbage", "lettuce", "basil"],
    published: "2026-10-14",
    quick: () => [
      ["What", "Getting indoor seedlings used to sun, wind and cool nights over 7 to 10 days."],
      ["How", "Start with an hour or two in shade, then add more time and sun each day."],
      ["Watch out", "Bring tomatoes, peppers and basil in on nights forecast below about 50°F."]
    ],
    body: ({ D, P, link }) => {
      const tom = win(D, P, "portland-or", "tomatoes");
      return `
<p>You've spent two months raising tomato seedlings under lights. They're green, stocky and ready. Then you carry them out on the first sunny day in May, plant them, and by evening the leaves have gone white and papery. It's one of the most disheartening moments in gardening, and it's almost always avoidable.</p>
<p>Seedlings grown on a windowsill or under lights have lived an easy life: steady temperatures, no wind and gentle light. Even bright grow lights are far weaker than the sun. Move them straight into the garden and many will scorch, wilt or stall for weeks. Hardening off is the process of getting them used to outdoor conditions a little at a time.</p>
<h2>What can go wrong if you skip it</h2>
<ul>
<li><strong>Sunscald.</strong> Leaves that have never seen direct sun can turn white or papery in a single afternoon.</li>
<li><strong>Wind damage.</strong> Soft stems bend, snap or dry out.</li>
<li><strong>Cold shock.</strong> Warm-season plants like tomatoes, peppers and basil stop growing for a while after a cold night, and can be badly set back.</li>
</ul>
<h2>A 7 to 10 day schedule</h2>
<p>Start about a week to ten days before you plan to plant. Rainline Garden's window for planting tomatoes out in Portland is ${tom.range}, so Portland gardeners would begin hardening off tomato seedlings in early May.</p>
<ol>
<li><strong>Days 1 and 2:</strong> Set the seedlings outside for an hour or two in a shady spot out of the wind, then bring them back in.</li>
<li><strong>Days 3 and 4:</strong> Leave them out for half the day, with an hour or two of gentle morning sun.</li>
<li><strong>Days 5 and 6:</strong> Most of the day outside, with more sun each day.</li>
<li><strong>Day 7 onward:</strong> Full sun all day. If nights are mild enough for the crop (see below), leave them out overnight for a night or two before planting.</li>
</ol>
<p>Overcast, mild days are ideal, and a Northwest spring usually has plenty. If a cold, windy or very wet day comes along, keep the seedlings in and pick up where you left off.</p>
<h2>Watch the night temperatures</h2>
<p>Cool-season seedlings like broccoli, cabbage, kale and lettuce tolerate cool nights and can go out earlier in spring. Warm-season seedlings like tomatoes, peppers, eggplant and basil are damaged by cold well above freezing, so bring them in on nights forecast to drop below about 50°F.</p>
<h2>Tips</h2>
<ul>
<li><strong>Check water every day.</strong> Small pots dry out fast in sun and wind. Water when the top of the soil is dry, but don't keep them soggy.</li>
<li><strong>Use a tray or box.</strong> It makes moving dozens of pots in and out a one-trip job.</li>
<li><strong>Nursery starts need it too.</strong> Plants from a greenhouse are often just as tender as homegrown ones. Give them a few days of the same routine.</li>
<li><strong>Plant on a cloudy day or in the evening,</strong> and water well right after planting.</li>
</ul>
<h2>Short on time? Use a cold frame or row cover</h2>
<p>If you work all day and can't move trays in and out on a schedule, a <a href="${link("glossary/#cold-frame")}">cold frame</a> makes it much easier. Put the seedlings in the frame, prop the lid open a little more each day, and by the end of the week leave it off entirely. A shady spot under a sheet of row cover on hoops does a similar job: the fabric cuts sun and wind while the plants adjust. Check both on hot days, since a closed frame in the sun overheats quickly.</p>
<p>Even a weekend version helps. Two or three days of gradual exposure is far better than none.</p>
<h2>Planting day</h2>
<ol>
<li>Water the seedlings well an hour or so before planting, so the root ball holds together and the plant goes in fully hydrated.</li>
<li>Dig the hole first, and water it if the soil is dry.</li>
<li>Ease each plant out by tipping the pot and supporting the base of the stem between your fingers. Don't pull by the stem.</li>
<li>Set it at the same depth it grew in the pot, except tomatoes, which can go deeper (up to the first set of leaves) and will root along the buried stem.</li>
<li>Firm the soil gently and water again.</li>
<li>If the next day is forecast to be hot and sunny, shade new transplants with a board, an upturned box or a bit of shade cloth on the sunny side for a day or two.</li>
</ol>
<h2>If the leaves still scorch</h2>
<p>Some white or bleached patches after a sunny day aren't a disaster. The damaged leaves won't recover, but new leaves grow in already adapted to the sun. As long as the growing tip is green, give the plant some shade for a few days, keep it watered and it will usually grow out of it. Leaves that are fully white and crisp can be removed once new growth appears.</p>
<p>Seeds sown straight into the garden don't need hardening off; they grow up outdoors from the start. For when to start seeds indoors in the first place, see <a href="${link("articles/starting-seeds-indoors/")}">starting seeds indoors</a>.</p>`;
    }
  },
  {
    slug: "soil-ph-and-lime",
    author: "elaine-holloway",
    topic: "soil", icon: "soil-ph",
    title: "Soil pH in the Northwest: Testing, Lime and When to Leave It Alone",
    seoTitle: "Northwest Soil pH: How to Test It and When to Lime",
    description: "Rain-washed west-side soils run acidic and east-side soils alkaline. Testing your pH and when lime or sulfur is worth adding.",
    crops: ["blueberries", "potatoes", "broccoli", "cabbage", "kale", "beans"],
    published: "2026-10-14",
    quick: () => [
      ["Test first", "West-side soils often run acidic and east-side soils alkaline. A soil test tells you which you have."],
      ["Target", "Most vegetables like pH 6.0 to 7.0; blueberries 4.5 to 5.5."],
      ["Lime", "Only what the test recommends, in fall, and never on blueberry or potato beds."]
    ],
    body: ({ link }) => `
<p>Many vegetable beds west of the Cascades are acidic enough to benefit from lime, but not all of them, and east of the Cascades most soils don't need it at all. Lime is one of the most common things Northwest gardeners add to their soil, and one of the most common things they add without knowing if it helps. A soil test answers the question for a few dollars.</p>
<p>Soil pH is a measure of how acidic or alkaline your soil is, on a scale from 0 to 14 where 7 is neutral. It matters because pH controls how easily plants can take up nutrients. A soil can be full of nutrients and still grow pale, slow plants if the pH is far off.</p>
<p>The scale is also steeper than it looks. Each whole step is ten times more acidic or alkaline than the next, so soil at pH 5 is ten times more acidic than soil at pH 6. A small change in the number is a big change in the soil, and it takes a fair amount of lime to move it.</p>
<h2>Why Northwest soils differ</h2>
<p>West of the Cascades, decades of heavy winter rain wash calcium, magnesium and other basic minerals down through the soil. Over time that leaves many gardens on the acidic side. Soils in Portland, Seattle and the Willamette Valley often test below the range most vegetables prefer.</p>
<p>East of the Cascades, where rainfall is low, those minerals stay put. Soils there are more often neutral or alkaline, and adding lime would make things worse.</p>
<p>Test before you lime. A soil test from a garden center kit or your county extension office tells you where you stand.</p>
<h2>What plants want</h2>
<ul>
<li><strong>Most vegetables:</strong> slightly acidic to neutral, roughly pH 6.0 to 7.0.</li>
<li><strong>Blueberries:</strong> strongly acidic, roughly 4.5 to 5.5. Never lime a blueberry bed. See <a href="${link("articles/growing-blueberries-in-the-northwest/")}">growing blueberries</a>.</li>
<li><strong>Potatoes:</strong> grow fine in acidic soil, and potato scab, a disease that roughens the skins, is less of a problem at lower pH. Skip the lime where potatoes are going.</li>
<li><strong>Cabbage family:</strong> broccoli, cabbage and kale do best near neutral. Clubroot, a soil disease of this family, is more severe in acidic soil.</li>
</ul>
<h2>How to test</h2>
<p>Home test kits and meters give a rough idea. A lab test is more accurate and also tells you which nutrients are low and how much lime, if any, to add for your soil. To take a sample, dig small amounts from 6 to 8 spots in the bed, about 6 inches deep, mix them in a clean bucket and send in a cup or so of the mix. Test each area you garden differently, for example the vegetable beds separately from the lawn.</p>
<p>Testing every three or four years is plenty for most home gardens.</p>
<p>Oregon State and Washington State University Extension both keep lists of soil testing labs that serve the region, and the University of Idaho does the same for Idaho. Lab tests usually cost less than a couple of bags of fertilizer. Tell the lab you're growing vegetables, and the report will usually include a lime recommendation in pounds per 1,000 square feet, which you can scale down to your beds.</p>
<h2>How to read your results</h2>
<p>A typical report lists pH first, then nutrients like phosphorus, potassium, calcium and magnesium, and often organic matter. Some labs also give a "buffer pH" or "SMP buffer" number. That second number is what they use to work out how much lime your soil needs: two soils with the same pH can need very different amounts, because clay and soils rich in organic matter resist change more than sandy ones. You don't need to understand the chemistry; just follow the lime rate the lab gives.</p>
<p>If your pH comes back between about 6.0 and 7.0, you don't need to do anything to it. Spend the money on compost instead.</p>
<h2>Raising pH with lime</h2>
<ul>
<li><strong>Use the amount your test recommends.</strong> The right rate depends on your soil type and how far off it is, and too much is harder to fix than too little.</li>
<li><strong>Garden lime</strong> (calcium carbonate) is the usual choice. <strong>Dolomite lime</strong> also adds magnesium, so use it when the test shows magnesium is low.</li>
<li><strong>Apply in fall.</strong> Lime works slowly and takes months to change the pH. Spreading it in fall and mixing it into the top few inches gives it the winter to work before spring planting.</li>
<li><strong>Wood ash</strong> from a fireplace also raises pH and adds potassium, but it acts faster and is easy to overdo. Use it lightly, and not on blueberries or potatoes.</li>
</ul>
<h2>Lowering pH</h2>
<p>To make soil more acidic, mainly for blueberries, gardeners use elemental sulfur, which soil bacteria slowly turn into acid over a season or more. Again, let a soil test guide the amount. Mixing in plenty of organic matter like compost helps buffer pH swings in either direction.</p>
<p>Lowering the pH of a whole garden bed is slow and only lasts as long as you keep at it, especially in alkaline east-side soils that contain free lime. There, it's usually easier to grow acid-loving plants like blueberries in raised beds or large containers filled with an acidic mix than to change the native soil.</p>
<h2>Signs your pH may be off</h2>
<p>Plants don't always make it obvious, but a few patterns are worth knowing. In very acidic soil, plants can look generally stunted and pale even after fertilizing, and lime-loving crops like spinach, beets and the cabbage family struggle while potatoes and blueberries do fine. In alkaline soil, the classic sign is yellow new leaves with green veins, called iron chlorosis. It shows up first on blueberries, raspberries, and some trees and shrubs. These symptoms have other causes too, which is one more reason to test before you treat.</p>
<h2>Common mistakes</h2>
<p>The biggest one is liming by habit, a little every spring "because Northwest soil is acidic." Over a few years that can push a bed past neutral, and it's much harder to bring pH down than up. The second is liming right where potatoes or blueberries are going. And the third is expecting lime to work right away. Spread in spring, it may take most of the season to do much, which is why fall is the better time.</p>`
  },
  {
    slug: "growing-peas-in-the-northwest",
    author: "jigmey-dorjee",
    topic: "crops",
    title: "Growing Peas in Oregon, Washington and Idaho",
    description: "Peas go in as soon as the soil can be worked and quit in summer heat. Sowing dates by region, snap vs. shelling, and trellising.",
    crops: ["peas", "sweet-peas", "fava-beans"],
    published: "2026-10-14",
    quick: () => [
      ["When", "Early spring. The earlier part of your town's window is best."],
      ["How", "1 inch deep and 1 to 2 inches apart, at the base of a trellis you put up first."],
      ["Harvest", "Every day or two. The more you pick, the more they flower."]
    ],
    body: ({ D, P, link }) => {
      const pdx = win(D, P, "portland-or", "peas"), spo = win(D, P, "spokane-wa", "peas"), bend = win(D, P, "bend-or", "peas"), boi = win(D, P, "boise-id", "peas");
      return `
<p>Peas are one of the first crops into the ground each spring and one of the best suited to the Northwest. They like cool weather, handle light frost, and stop producing once summer turns hot. A long, mild spring like ours gives them plenty of time.</p>
<p>They're also one of the best crops to grow if you have kids, or if you've never gardened before. The seeds are big and easy to handle, they come up fast, and a snap pea eaten straight off the vine on a cool May morning is about as good as gardening gets. Plenty of homegrown peas never make it to the kitchen.</p>
<h2>When to plant</h2>
<p>Pea seeds sprout in cool soil, from about 40°F, though they come up faster once the soil reaches the 50s. Rainline Garden's planting windows for peas:</p>
<ul>
<li><strong>Portland and the west side:</strong> ${pdx.range}. <a href="${link("when-to-plant/peas/?town=portland-or#your-town")}">See Portland's pea page</a>.</li>
<li><strong>Spokane and the inland Northwest:</strong> ${spo.range}.</li>
<li><strong>Boise and the Treasure Valley:</strong> ${boi.range}.</li>
<li><strong>Bend and the high desert:</strong> ${bend.range}.</li>
</ul>
<p>The earlier part of each window is better. Peas sown late run into heat just as they start to flower.</p>
<h2>Which kind to grow</h2>
<ul>
<li><strong>Shelling peas</strong> (also called English or garden peas) are grown for the round peas inside. You shell them and eat the peas.</li>
<li><strong>Snap peas</strong> have thick, sweet pods you eat whole, peas and all.</li>
<li><strong>Snow peas</strong> are picked flat, before the peas swell, and are common in stir-fries. Oregon Sugar Pod II is an Oregon-bred snow pea that's widely grown here.</li>
</ul>
<p>The Northwest has a long history with peas. Oregon State University's breeding program produced several varieties still sold today, including Oregon Sugar Pod II and the snap pea Cascadia. Many modern varieties are labeled "PMR," for powdery mildew resistance, which is worth looking for if your peas usually turn gray and quit in June.</p>
<p>Each kind comes in tall, vining varieties that need a 5 to 6 foot trellis, and in short bush varieties that grow 2 to 3 feet tall. Bush types still do better with a little support, like a short fence or twiggy branches.</p>
<h2>How to plant</h2>
<ol>
<li>Choose a sunny spot with soil that drains. Pea seeds can rot in cold, waterlogged ground, which is why raised beds help in wet springs.</li>
<li>Put the trellis up first, so you don't disturb the roots later.</li>
<li>Sow seeds about 1 inch deep and 1 to 2 inches apart along the base of the trellis.</li>
<li>Protect seedlings from slugs and birds, both of which go after young pea shoots. See <a href="${link("articles/slugs/")}">dealing with slugs</a>.</li>
</ol>
<p>Peas, like beans, work with soil bacteria that take nitrogen from the air, so they need little or no fertilizer. A pea inoculant, a powder of these bacteria sold next to the seeds, can help in beds where peas haven't grown before.</p>
<h2>Harvest</h2>
<ul>
<li><strong>Shelling peas:</strong> when the pods are plump and still bright green.</li>
<li><strong>Snap peas:</strong> when the pods are round and full but still crisp.</li>
<li><strong>Snow peas:</strong> while the pods are still flat.</li>
</ul>
<p>Pick every day or two. The more you pick, the more the plants keep flowering. Peas lose sweetness quickly after picking, so eat or chill them soon.</p>
<p>Once summer heat arrives, production slows and powdery mildew often coats the leaves. That's the natural end of the season. Cut the plants off at the ground and leave the roots in the soil, then use the space for a <a href="${link("articles/succession-planting/")}">second crop</a>.</p>
<h2>Why didn't my peas come up?</h2>
<p>If you sowed a row and only a few plants appeared, the usual suspects are cold, wet soil that rotted the seed before it sprouted; birds or mice digging up and eating the seed; or slugs eating the shoots the moment they broke the surface, which can look like nothing came up at all. Old seed is another possibility; peas generally keep for a few years, but not forever. Next time, wait for soil that crumbles rather than smears, cover the row with row cover or netting until the seedlings are a few inches tall, and put out slug bait the day you sow.</p>
<h2>A second crop in fall?</h2>
<p>West of the Cascades, you can sow peas again in mid to late summer for a fall harvest. It's less reliable than spring: seeds can struggle to germinate in hot soil, and powdery mildew is more common in late summer. Choose a mildew-resistant variety, sow in a spot with some afternoon shade, keep the row moist until the seedlings are up, and aim to have them flowering before nights get cold in October.</p>
<h2>Pea shoots, all winter</h2>
<p>The tender tips of young pea plants are a delicacy in many kitchens, and they're easy to grow even in winter. Sow pea seeds thickly in a tray of potting mix on a sunny windowsill or under a grow light, and cut the shoots when they're 4 to 6 inches tall. In the garden, you can also pinch a few tips from established plants in spring without hurting the harvest.</p>
<h2>Keeping the harvest</h2>
<p>If you grow more than you can eat fresh, peas freeze well. Shell them, blanch in boiling water for a minute or two, cool quickly in ice water, drain, and freeze in bags. Snap and snow peas can be frozen the same way after trimming the ends. Frozen homegrown peas taste much closer to fresh than canned ones.</p>`;
    }
  },
  {
    slug: "tomato-late-blight",
    author: "jigmey-dorjee",
    topic: "problems", icon: "blight",
    title: "Late Blight on Tomatoes: How to Spot It and Keep It Away",
    description: "Late blight arrives with cool, wet late-summer weather and can kill tomatoes in a week. Spotting it early and keeping it out of next year's garden.",
    crops: ["tomatoes", "potatoes"],
    published: "2026-10-14",
    quick: () => [
      ["Signs", "Large gray-green to brown leaf patches, dark stem lesions and greasy brown blotches on fruit."],
      ["Prevent", "Keep leaves dry with drip watering or a simple rain cover from late August."],
      ["If it hits", "Remove infected parts on a dry day, bag badly hit plants, and pick sound green fruit."]
    ],
    body: ({ link }) => `
<p>Late blight is the disease behind the Irish potato famine, and it still destroys tomato and potato plants in home gardens today. It loves exactly the weather the Northwest is known for: cool temperatures, rain and long, damp nights. West of the Cascades it most often shows up in late summer and early fall, when rain and heavy dew return.</p>
<p>If you've grown tomatoes here for a few years, you may already have watched it happen: a perfectly healthy plant loaded with green fruit in early September, a few days of drizzle, and then brown patches spreading across the leaves faster than seems possible. A week later the plant is a blackened skeleton. It's discouraging, but knowing how it works makes it much easier to beat.</p>
<h2>What causes it</h2>
<p>Late blight is caused by <em>Phytophthora infestans</em>, a water mold. It spreads by spores that travel on the wind and need wet leaves to infect a plant. In cool, wet weather it moves very fast and can kill whole plants within a week or two.</p>
<h2>Why some years are worse</h2>
<p>The spores need water sitting on the leaf for several hours to infect it, and they spread fastest when temperatures are mild, roughly in the 60s, with damp nights. A dry, warm August west of the Cascades usually keeps late blight away, and plants come through fine. An early return of rain in late August, or a stretch of cool nights with heavy dew, gives it the conditions it needs. So one year your tomatoes produce into October and the next year they're gone by mid-September, even though you did the same thing both times.</p>
<h2>How to recognize it</h2>
<ul>
<li><strong>Leaves:</strong> large, irregular patches that look gray-green and water-soaked at first, then turn brown. In damp weather a white, fuzzy growth may appear on the underside around the edges of the patches.</li>
<li><strong>Stems:</strong> dark brown to black lesions that can girdle the stem.</li>
<li><strong>Fruit:</strong> firm, greasy-looking brown blotches, often on the upper half of green tomatoes.</li>
</ul>
<h2>Don't confuse it with these</h2>
<ul>
<li><strong>Early blight</strong> makes brown spots with rings like a target, usually starting on the oldest, lowest leaves and moving up slowly over weeks.</li>
<li><strong>Septoria leaf spot</strong> makes many small, round spots with dark edges and pale centers, also starting low on the plant.</li>
</ul>
<p>Both of those are slower and less destructive. Late blight's big, fast-spreading patches and dark stem lesions are what set it apart.</p>
<h2>How to prevent it</h2>
<ul>
<li><strong>Keep the leaves dry.</strong> This matters most. Water at the base of the plant, ideally with drip or a soaker hose, and avoid sprinklers. Many Northwest gardeners grow tomatoes under a roof overhang, in a hoop house or under a simple rain cover so fall rain never touches the leaves.</li>
<li><strong>Give plants room.</strong> Space and prune so air moves through and leaves dry quickly after rain.</li>
<li><strong>Grow resistant varieties.</strong> Some tomatoes are bred to resist late blight, such as Defiant PhR, Mountain Magic and Iron Lady. Check catalog descriptions for "late blight resistance."</li>
<li><strong>Clean up potatoes.</strong> The disease survives the winter in living potato tissue, like tubers left in the ground or in a cull pile, not in bare soil. Dig every potato at harvest and pull any volunteers that come up next spring.</li>
<li><strong>Buy healthy starts</strong> and check them for spots before planting.</li>
</ul>
<h2>A simple rain cover</h2>
<p>Keeping rain off the leaves is the single most effective step, and it doesn't take a greenhouse. A basic version: set a sturdy post or stake at each end of the tomato row, run a crossbar or tight wire between them a foot or so above the tallest plants, and drape clear plastic sheeting over it like a tent roof, leaving the sides open so air keeps moving. Clip or tie the plastic down so wind doesn't catch it. You only need it from late August to the end of the season. Plants under a roof overhang on the south side of a house get a similar effect for free, and they enjoy the extra warmth.</p>
<p>Some protective sprays labeled for late blight can slow it if they're applied before symptoms appear and repeated as the label directs. They don't cure plants that are already infected.</p>
<h2>If your plants get it</h2>
<ol>
<li>Remove infected leaves and stems right away, on a dry day.</li>
<li>If most of the plant is affected, pull the whole plant. Bag it or put it in the yard-debris bin rather than leaving it in the garden, where it keeps releasing spores.</li>
<li>Pick any unblemished green tomatoes. Many will ripen indoors. Tomatoes with a small blight spot can still be eaten if you cut well around it, but they won't keep, so use them first.</li>
<li>For potatoes, cut down and remove infected vines, then wait about two weeks before digging so the tubers aren't infected on the way out of the ground.</li>
</ol>
<p><h2>Next year</h2>
<p>Because the disease doesn't live in bare soil, a bad year doesn't doom the bed. Clear out every bit of tomato and potato debris, make sure no potatoes are left in the ground to sprout next spring, and you start fresh. It's still a good idea to plant tomatoes somewhere new each year, since <a href="${link("articles/crop-rotation-for-small-gardens/")}">rotating crops</a> helps with the slower leaf diseases that do overwinter in old plant debris.</p>
<p>Choosing early varieties also helps, since they ripen most of their crop before fall rains arrive. See <a href="${link("articles/best-tomatoes-for-the-northwest/")}">the best tomatoes for the Northwest</a>.</p>`
  },
  {
    slug: "succession-planting",
    author: "jigmey-dorjee",
    topic: "timing", icon: "succession",
    title: "Succession Planting: Steady Harvests Instead of All at Once",
    description: "Small sowings of lettuce, beans and carrots every few weeks, and a fall crop after the spring one, keep a small bed producing longer.",
    crops: ["lettuce", "radishes", "beans", "cilantro", "carrots", "peas"],
    published: "2026-10-14",
    quick: () => [
      ["Small sowings", "Radishes every one to two weeks; lettuce every two to three weeks."],
      ["Follow-ons", "Peas then beans, garlic then fall greens, summer crops then a cover crop."],
      ["Last sowing", "Count back from the first fall frost: days to maturity plus about two weeks."]
    ],
    body: ({ D, P, link }) => {
      const let1 = win(D, P, "portland-or", "lettuce"), letF = win(D, P, "portland-or", "lettuce", "fall"), bean = win(D, P, "portland-or", "beans");
      return `
<p>Plant a whole packet of lettuce in one day and you'll have more salad than you can eat for two weeks, then none at all. Succession planting fixes that. Instead of planting everything at once, you sow a little at a time, or follow one crop with another, so the garden keeps producing all season.</p>
<p>It's the difference between a garden that has a big moment in June and a garden you can pick from every week from April to November. And in the Northwest, with a long, mild growing season west of the Cascades, you have more room to do it than gardeners in most of the country.</p>
<h2>Method 1: Small sowings every few weeks</h2>
<p>For fast crops that are best picked young, sow a short row on a regular schedule:</p>
<ul>
<li><strong>Radishes:</strong> every one to two weeks. They're ready in about four weeks.</li>
<li><strong>Lettuce and salad greens:</strong> every two to three weeks.</li>
<li><strong>Cilantro:</strong> every three weeks. It goes to seed quickly in warm weather.</li>
<li><strong>Bush beans:</strong> every two to three weeks while the planting window is open.</li>
</ul>
<p>Keep each sowing inside the crop's planting window. In Portland, for example, Rainline Garden's spring window for lettuce runs ${let1.range}, with a second fall window of ${letF.range}. Bush beans run ${bean.range}, which leaves room for about three sowings. Your own windows are on your <a href="${link("")}">planting calendar</a>.</p>
<p>How much to sow each time? Less than you think. For lettuce, a few plants per person per sowing is usually enough for regular salads. For radishes, a row a foot or two long. The point is a small, steady supply, and if a sowing fails or gets eaten by slugs, the next one is only two weeks behind.</p>
<p>The easiest way to keep it going is to tie it to something you already do. Every other Saturday, or every time you pick the last of one sowing, sow the next. A repeating reminder on your phone works too. Most people who give up on succession planting just forget the third or fourth sowing in the middle of a busy summer.</p>
<h2>Method 2: Follow one crop with another</h2>
<p>When an early crop finishes, plant something new in the same space:</p>
<ul>
<li><strong>Peas, then beans.</strong> Peas finish as summer warms up, which is when the soil is warm enough for beans.</li>
<li><strong>Spring lettuce or spinach, then summer squash or cucumbers.</strong></li>
<li><strong>Garlic, then fall greens.</strong> Garlic comes out in early summer. Where your fall windows allow, that bed can hold fall lettuce, kale or turnips.</li>
<li><strong>Summer crops, then cover crops.</strong> When tomatoes and squash are done, sow a <a href="${link("articles/winter-cover-crops/")}">winter cover crop</a>.</li>
</ul>
<h2>Method 3: Plant fast crops between slow ones</h2>
<p>Radishes sown in the same row as carrots come up quickly, mark the row, and are harvested before the carrots need the space. Lettuce can grow between young tomato or squash plants and be picked before those plants fill in.</p>
<h2>Working out the last sowing date</h2>
<p>For fall harvests, count back from your first fall frost using the days to maturity on the seed packet, then add about two weeks, because plants grow more slowly as days get shorter and cooler. Rainline Garden's fall windows already do this math for the crops that suit fall planting.</p>
<h2>Summer sowings need extra help</h2>
<p>Sowing in July and August is different from sowing in April. The soil surface dries out within hours in the sun, and lettuce and spinach seed germinate poorly when the soil is hot. Sow in the evening, water the row well, and lay a board, a strip of shade cloth or a piece of burlap over it to keep it cool and moist. Check it every day and remove the cover as soon as you see seedlings. For lettuce, choose varieties described as slow-bolting or heat-tolerant for summer sowings, and save the delicate ones for spring and fall. The same goes for cilantro: look for "slow-bolt" types.</p>
<h2>One 4 by 8 foot bed through a west-side year</h2>
<p>To give you an idea, this is roughly what a single raised bed can do in a typical Portland or Seattle year. Your own dates will vary.</p>
<ul>
<li><strong>March:</strong> peas along a trellis on the north side; spinach and radishes in the rest.</li>
<li><strong>April and May:</strong> lettuce sown every few weeks as the radishes come out.</li>
<li><strong>June:</strong> spinach finishes and is replaced with bush beans once the soil is warm.</li>
<li><strong>July:</strong> peas finish; that strip gets kale and broccoli transplants for fall and winter, and a sowing of carrots.</li>
<li><strong>August:</strong> beans keep going; more lettuce, spinach and radishes as the summer lettuce bolts.</li>
<li><strong>October:</strong> beans come out and garlic goes in.</li>
</ul>
<p>That's eight or nine crops from one small bed, instead of the two or three you'd get planting it once in May.</p>
<h2>Keep the soil fed</h2>
<p>A bed that grows two or three crops a year uses more nutrients. Mix in an inch of compost between crops to keep it productive.</p>
<p>The <a href="${link("my-garden/")}">My garden plan</a> page can help you keep track of what goes in when.</p>`;
    }
  },
  {
    slug: "growing-dahlias-in-the-northwest",
    author: "elaine-holloway",
    topic: "flowers",
    title: "Growing Dahlias in the Northwest",
    description: "Dahlia tubers rot in cold, wet soil, so timing matters more than anything. Planting, staking, and digging or mulching in winter.",
    crops: ["dahlias", "sunflowers", "sweet-peas"],
    published: "2026-10-14",
    quick: () => [
      ["When", "Once the soil has warmed, about when you'd plant tomatoes."],
      ["How", "Tubers 4 to 6 inches deep on their side, stake in first, and no water until shoots appear."],
      ["Winter", "West side: leave them in well-drained ground under mulch. East side: dig them after the first frost."]
    ],
    body: ({ D, P, link, fig }) => {
      const pdx = win(D, P, "portland-or", "dahlias"), spo = win(D, P, "spokane-wa", "dahlias"), bend = win(D, P, "bend-or", "dahlias");
      return `
<p>Dahlias are some of the most popular flowers in Northwest gardens, and for good reason. Our mild summers suit them, and they bloom from midsummer until the first frost. They come in nearly every color and in sizes from small pompons to blooms as wide as a dinner plate.</p>
<p>Fair warning: they're addictive. Most people start with three or four tubers and find themselves, a few years later, with a whole bed of them and a box of labeled tubers in the garage every winter. A single plant can give you armfuls of cut flowers from July to October, which is a lot of flowers for the price of one tuber.</p>
<h2>Picking a type</h2>
<p>Catalogs sort dahlias by flower form, and it helps to know the main ones. <strong>Ball</strong> and <strong>pompon</strong> dahlias are tight, round globes, great for cutting. <strong>Decorative</strong> dahlias have broad, flat petals and range from small to the giant "dinnerplate" types. <strong>Cactus</strong> and <strong>semi-cactus</strong> dahlias have narrow, pointed, rolled petals that give a spiky look. <strong>Single</strong>, <strong>collarette</strong> and <strong>anemone</strong> types have an open center, which bees can reach.</p>
<p>The giant dinnerplates are showstoppers but need sturdy staking and tend to produce fewer flowers. Smaller ball, pompon and decorative types usually bloom more, with longer stems for cutting. If you want a lot of flowers for the house, start there.</p>
<h2>When to plant</h2>
<p>Dahlias grow from tubers, which rot easily in cold, wet soil. Wait until the soil has warmed, about the same time you'd plant tomatoes. Rainline Garden's planting windows:</p>
<ul>
<li><strong>Portland and the west side:</strong> ${pdx.range}. <a href="${link("when-to-plant/dahlias/?town=portland-or#your-town")}">See Portland's dahlia page</a>.</li>
<li><strong>Spokane and the inland Northwest:</strong> ${spo.range}.</li>
<li><strong>Bend and the high desert:</strong> ${bend.range}.</li>
</ul>
<p>If you'd like flowers a few weeks earlier, you can start tubers in pots indoors or in a greenhouse about a month before planting time. Use a pot just big enough for the tuber, barely moist potting mix, and a bright spot. Plant them out, sprouts and all, once the soil has warmed. Harden them off first, just as you would vegetable seedlings.</p>
<h2>How to plant</h2>
<ol>
<li><strong>Pick a sunny spot.</strong> Dahlias need at least six hours of sun and bloom best with more.</li>
<li><strong>Make sure it drains.</strong> In heavy clay, plant in a raised bed or mix in plenty of compost.</li>
<li><strong>Put in a stake first</strong> for varieties that grow over about 3 feet tall. Placing it now avoids spearing the tuber later.</li>
<li><strong>Plant the tuber 4 to 6 inches deep,</strong> lying on its side with the old stem or any sprouting eyes facing up. Space plants about 18 inches to 2 feet apart, more for the biggest varieties.</li>
<li><strong>Hold off on water.</strong> Unless the soil is very dry, don't water until shoots appear. A wet tuber with no leaves to use the water is the one most likely to rot.</li>
</ol>
${fig(1)}
<h2>Summer care</h2>
<ul>
<li><strong>Protect the shoots from slugs.</strong> Young dahlia shoots are a favorite. See <a href="${link("articles/slugs/")}">dealing with slugs</a>.</li>
<li><strong>Pinch for more flowers.</strong> When the plant is about a foot tall, pinch out the center tip just above a set of leaves. It branches out and produces more stems.</li>
<li><strong>Water deeply</strong> once plants are growing, about once or twice a week in dry weather.</li>
<li><strong>Tie stems to the stake</strong> as they grow.</li>
<li><strong>Cut often.</strong> Cutting flowers and removing spent blooms keeps new buds coming. Cut in the cool of the morning, and pick blooms that are almost fully open, since dahlias don't open much more once cut.</li>
</ul>
<h2>Pests and problems</h2>
<p>Besides slugs, the most common dahlia pest in the Northwest is the earwig, which chews ragged holes in petals at night and hides inside the flowers by day. Rolled-up newspaper or a short piece of hose laid near the plants traps them; shake them out each morning. In hot, dry spells, especially east of the Cascades, spider mites can make leaves look dull and speckled, with fine webbing underneath. A strong spray of water under the leaves helps. Powdery mildew often coats the leaves late in the season. It looks bad but rarely does much harm that late; give plants space for airflow.</p>
<h2>Making cut flowers last</h2>
<p>Dahlias don't last as long in a vase as some flowers, often several days, but you can help. Cut in the cool of the morning, choosing blooms that are almost fully open. Strip the lower leaves and put the stems straight into water. Many growers then stand the cut ends in a few inches of hot water for about an hour before arranging them, which seems to help the stems take up water. Change the vase water every day or two.</p>
<h2>What to do in winter</h2>
<p>A frost blackens dahlia foliage and ends the season. What comes next depends on where you live.</p>
<ul>
<li><strong>West of the Cascades:</strong> in well-drained soil, many gardeners cut the stems down and leave the tubers in the ground under a thick layer of mulch. In heavy or soggy soil, they often rot over a wet winter, so digging them up is safer.</li>
<li><strong>East of the Cascades:</strong> winters are too cold for tubers in the ground. Dig them after the first frost.</li>
</ul>
<p>To store dug tubers, shake off the soil, let them dry for a few days somewhere sheltered, then pack them in slightly damp wood shavings, peat or vermiculite. Keep them somewhere cool but frost-free, around 40 to 50°F, and check them during winter for any that are rotting or shriveling.</p>
<p>In spring, you can divide large clumps to make more plants. Each piece needs part of the old stem's base (the crown) with at least one eye, a small bump where the new shoot will grow. A tuber without an eye won't sprout, no matter how plump it is. Eyes are easier to see in spring, once they start to swell, than in fall. Use a clean, sharp knife, let the cut surfaces dry for a day, and plant as usual. A single clump often divides into several plants, which is how a few tubers turn into a whole bed.</p>
<p>Label everything. Every dahlia grower has a box of mystery tubers in the garage. A marker on each tuber, or a tag in each bag, saves a lot of guessing next spring.</p>
<p>Dahlias also feed bees late in the season, especially the open-centered single types. For more on that, see <a href="${link("articles/native-pollinator-garden/")}">planting for pollinators</a>.</p>`;
    }
  }
];
