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
    description: "A last frost date isn't a promise. Here's what the number on a planting chart actually measures, and how to use it without losing your tomatoes.",
    crops: ["tomatoes", "peppers", "basil", "beans"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const pdx = frostAt(D, P, "portland-or"), oly = frostAt(D, P, "olympia-wa"), bend = frostAt(D, P, "bend-or"), sea = frostAt(D, P, "seattle-wa");
      return `
<p>Almost every planting chart is built around one number: your last frost date. Seed packets say "sow 2 weeks after last frost" and "start indoors 6 weeks before last frost." But that date is easy to misread, and the misreading is how a lot of tomato plants die in May.</p>
<h2>It's an average, not a deadline</h2>
<p>The frost dates on Rainline Garden come from NOAA's U.S. Climate Normals, which summarize 30 years of daily temperature records (1991 to 2020) at official weather stations. For each station, NOAA works out the odds of a freeze, meaning 32°F or colder, after each day in spring.</p>
<p>The date most charts call the "last frost date" is the median. In half of years the last spring freeze comes before it, and in half of years it comes after. Planting tender crops on that exact day is a coin flip.</p>
<p>That's why Rainline Garden also shows a safer date: the day after which there's only a 10% chance of another freeze. At Portland International Airport, for example:</p>
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
<h2>Frost can form above 32°F</h2>
<p>Official air temperatures are measured about five feet above the ground. On clear, still nights the ground and the leaves of low plants lose heat fast and can be several degrees colder than that. So a forecast low of 35°F can still leave frost on your lettuce. When the forecast is in the mid-30s, cover tender plants anyway.</p>
<h2>Frost-free doesn't mean warm enough</h2>
<p>The last frost date only tells you when freezing becomes unlikely. Tomatoes, peppers, basil, beans and squash also need warm soil and mild nights, which in the Northwest often arrive weeks later. That's why Rainline Garden's planting windows for warm crops start after the frost date, not on it. Read more in <a href="${link("articles/soil-temperature/")}">why to plant by soil temperature</a>.</p>
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
    description: "Seedlings raised indoors need a week or two to adjust to sun, wind and cool nights. Here's a simple day-by-day schedule that works in a Northwest spring.",
    crops: ["tomatoes", "peppers", "broccoli", "cabbage", "lettuce", "basil"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const tom = win(D, P, "portland-or", "tomatoes");
      return `
<p>Seedlings grown on a windowsill or under lights have lived an easy life: steady temperatures, no wind and gentle light. Move them straight into the garden and many will scorch, wilt or stall for weeks. Hardening off is the process of getting them used to outdoor conditions a little at a time.</p>
<h2>What can go wrong if you skip it</h2>
<ul>
<li><strong>Sunscald.</strong> Leaves that have never seen direct sun can turn white or papery in a single afternoon.</li>
<li><strong>Wind damage.</strong> Soft stems bend, snap or dry out.</li>
<li><strong>Cold shock.</strong> Warm-season plants like tomatoes, peppers and basil stop growing for a while after a cold night, and can be badly set back.</li>
</ul>
<h2>A 7 to 10 day schedule</h2>
<p>Start about a week to ten days before you plan to plant. Rainline Garden's window for planting tomatoes out in Portland is ${tom.range}, so Portland gardeners would begin hardening off tomato seedlings around the start of May.</p>
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
<p>Seeds sown straight into the garden don't need hardening off; they grow up outdoors from the start. For when to start seeds indoors in the first place, see <a href="${link("articles/starting-seeds-indoors/")}">starting seeds indoors</a>.</p>`;
    }
  },
  {
    slug: "soil-ph-and-lime",
    author: "elaine-holloway",
    topic: "soil", icon: "soil-ph",
    title: "Soil pH in the Northwest: Testing, Lime and When to Leave It Alone",
    description: "Heavy rain makes many west-side soils acidic, while east-side soils lean the other way. Here's how to find out what you have and what to do about it.",
    crops: ["blueberries", "potatoes", "broccoli", "cabbage", "kale", "beans"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>Soil pH is a measure of how acidic or alkaline your soil is, on a scale from 0 to 14 where 7 is neutral. It matters because pH controls how easily plants can take up nutrients. A soil can be full of nutrients and still grow pale, slow plants if the pH is far off.</p>
<h2>Why Northwest soils differ</h2>
<p>West of the Cascades, decades of heavy winter rain wash calcium, magnesium and other basic minerals down through the soil. Over time that leaves many gardens on the acidic side. Soils in Portland, Seattle and the Willamette Valley often test below the range most vegetables prefer.</p>
<p>East of the Cascades, where rainfall is low, those minerals stay put. Soils there are more often neutral or alkaline, and adding lime would make things worse.</p>
<p>That's why the first step is always a test, not a bag of lime.</p>
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
<h2>Raising pH with lime</h2>
<ul>
<li><strong>Use the amount your test recommends.</strong> The right rate depends on your soil type and how far off it is, and too much is harder to fix than too little.</li>
<li><strong>Garden lime</strong> (calcium carbonate) is the usual choice. <strong>Dolomite lime</strong> also adds magnesium, so use it when the test shows magnesium is low.</li>
<li><strong>Apply in fall.</strong> Lime works slowly and takes months to change the pH. Spreading it in fall and mixing it into the top few inches gives it the winter to work before spring planting.</li>
<li><strong>Wood ash</strong> from a fireplace also raises pH and adds potassium, but it acts faster and is easy to overdo. Use it lightly, and not on blueberries or potatoes.</li>
</ul>
<h2>Lowering pH</h2>
<p>To make soil more acidic, mainly for blueberries, gardeners use elemental sulfur, which soil bacteria slowly turn into acid over a season or more. Again, let a soil test guide the amount. Mixing in plenty of organic matter like compost helps buffer pH swings in either direction.</p>`
  },
  {
    slug: "growing-peas-in-the-northwest",
    author: "jigmey-dorjee",
    topic: "crops",
    title: "Growing Peas in Oregon and Washington",
    description: "Peas love a cool Northwest spring. Here's when to sow them where you live, which kind to grow, and how to keep them producing until summer heat arrives.",
    crops: ["peas", "sweet-peas", "fava-beans"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const pdx = win(D, P, "portland-or", "peas"), spo = win(D, P, "spokane-wa", "peas"), bend = win(D, P, "bend-or", "peas");
      return `
<p>Peas are one of the first crops into the ground each spring and one of the best suited to the Northwest. They like cool weather, handle light frost, and stop producing once summer turns hot. A long, mild spring like ours gives them plenty of time.</p>
<h2>When to plant</h2>
<p>Pea seeds sprout in cool soil, from about 40°F, though they come up faster once the soil reaches the 50s. Rainline Garden's planting windows for peas:</p>
<ul>
<li><strong>Portland and the west side:</strong> ${pdx.range}. <a href="${link("when-to-plant/peas/portland-or/")}">See Portland's pea page</a>.</li>
<li><strong>Spokane and the inland Northwest:</strong> ${spo.range}.</li>
<li><strong>Bend and the high desert:</strong> ${bend.range}.</li>
</ul>
<p>The earlier part of each window is better. Peas sown late run into heat just as they start to flower.</p>
<h2>Which kind to grow</h2>
<ul>
<li><strong>Shelling peas</strong> (also called English or garden peas) are grown for the round peas inside. You shell them and eat the peas.</li>
<li><strong>Snap peas</strong> have thick, sweet pods you eat whole, peas and all.</li>
<li><strong>Snow peas</strong> are picked flat, before the peas swell, and are common in stir-fries. Oregon Sugar Pod II is an Oregon-bred snow pea that's widely grown here.</li>
</ul>
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
<p>Once summer heat arrives, production slows and powdery mildew often coats the leaves. That's the natural end of the season. Cut the plants off at the ground and leave the roots in the soil, then use the space for a <a href="${link("articles/succession-planting/")}">second crop</a>.</p>`;
    }
  },
  {
    slug: "tomato-late-blight",
    author: "jigmey-dorjee",
    topic: "problems", icon: "blight",
    title: "Late Blight on Tomatoes: How to Spot It and Keep It Away",
    description: "Cool, wet weather makes late blight a real threat to Northwest tomatoes and potatoes. Learn the signs, how it differs from other leaf spots, and how to prevent it.",
    crops: ["tomatoes", "potatoes"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>Late blight is the disease behind the Irish potato famine, and it still destroys tomato and potato plants in home gardens today. It loves exactly the weather the Northwest is known for: cool temperatures, rain and long, damp nights. West of the Cascades it most often shows up in late summer and early fall, when rain and heavy dew return.</p>
<h2>What causes it</h2>
<p>Late blight is caused by <em>Phytophthora infestans</em>, a water mold. It spreads by spores that travel on the wind and need wet leaves to infect a plant. In cool, wet weather it moves very fast and can kill whole plants within a week or two.</p>
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
<p>Some protective sprays labeled for late blight can slow it if they're applied before symptoms appear and repeated as the label directs. They don't cure plants that are already infected.</p>
<h2>If your plants get it</h2>
<ol>
<li>Remove infected leaves and stems right away, on a dry day.</li>
<li>If most of the plant is affected, pull the whole plant. Bag it or put it in the yard-debris bin rather than leaving it in the garden, where it keeps releasing spores.</li>
<li>Pick any unblemished green tomatoes. Many will ripen indoors.</li>
<li>For potatoes, cut down and remove infected vines, then wait about two weeks before digging so the tubers aren't infected on the way out of the ground.</li>
</ol>
<p>Choosing early varieties also helps, since they ripen most of their crop before fall rains arrive. See <a href="${link("articles/best-tomatoes-for-the-northwest/")}">the best tomatoes for the Northwest</a>.</p>`
  },
  {
    slug: "succession-planting",
    author: "jigmey-dorjee",
    topic: "timing", icon: "succession",
    title: "Succession Planting: Steady Harvests Instead of All at Once",
    description: "Sow small amounts every few weeks and follow early crops with later ones. Here's how to time it with Northwest planting windows.",
    crops: ["lettuce", "radishes", "beans", "cilantro", "carrots", "peas"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const let1 = win(D, P, "portland-or", "lettuce"), letF = win(D, P, "portland-or", "lettuce", "fall"), bean = win(D, P, "portland-or", "beans");
      return `
<p>Plant a whole packet of lettuce in one day and you'll have more salad than you can eat for two weeks, then none at all. Succession planting fixes that. Instead of planting everything at once, you sow a little at a time, or follow one crop with another, so the garden keeps producing all season.</p>
<h2>Method 1: Small sowings every few weeks</h2>
<p>For fast crops that are best picked young, sow a short row on a regular schedule:</p>
<ul>
<li><strong>Radishes:</strong> every one to two weeks. They're ready in about four weeks.</li>
<li><strong>Lettuce and salad greens:</strong> every two to three weeks.</li>
<li><strong>Cilantro:</strong> every three weeks. It goes to seed quickly in warm weather.</li>
<li><strong>Bush beans:</strong> every two to three weeks while the planting window is open.</li>
</ul>
<p>Keep each sowing inside the crop's planting window. In Portland, for example, Rainline Garden's spring window for lettuce runs ${let1.range}, with a second fall window of ${letF.range}. Bush beans run ${bean.range}, which leaves room for about three sowings. Your own windows are on your <a href="${link("")}">planting calendar</a>.</p>
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
    description: "Dahlias thrive in Northwest summers if you get the timing and drainage right. Here's when to plant tubers, how to care for them, and what to do in winter.",
    crops: ["dahlias", "sunflowers", "sweet-peas"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const pdx = win(D, P, "portland-or", "dahlias"), spo = win(D, P, "spokane-wa", "dahlias"), bend = win(D, P, "bend-or", "dahlias");
      return `
<p>Dahlias are some of the most popular flowers in Northwest gardens, and for good reason. Our mild summers suit them, and they bloom from midsummer until the first frost. They come in nearly every color and in sizes from small pompons to blooms as wide as a dinner plate.</p>
<h2>When to plant</h2>
<p>Dahlias grow from tubers, which rot easily in cold, wet soil. Wait until the soil has warmed, about the same time you'd plant tomatoes. Rainline Garden's planting windows:</p>
<ul>
<li><strong>Portland and the west side:</strong> ${pdx.range}. <a href="${link("when-to-plant/dahlias/portland-or/")}">See Portland's dahlia page</a>.</li>
<li><strong>Spokane and the inland Northwest:</strong> ${spo.range}.</li>
<li><strong>Bend and the high desert:</strong> ${bend.range}.</li>
</ul>
<h2>How to plant</h2>
<ol>
<li><strong>Pick a sunny spot.</strong> Dahlias need at least six hours of sun and bloom best with more.</li>
<li><strong>Make sure it drains.</strong> In heavy clay, plant in a raised bed or mix in plenty of compost.</li>
<li><strong>Put in a stake first</strong> for varieties that grow over about 3 feet tall. Placing it now avoids spearing the tuber later.</li>
<li><strong>Plant the tuber 4 to 6 inches deep,</strong> lying on its side with the old stem or any sprouting eyes facing up. Space plants about 18 inches to 2 feet apart, more for the biggest varieties.</li>
<li><strong>Hold off on water.</strong> Unless the soil is very dry, don't water until shoots appear. A wet tuber with no leaves to use the water is the one most likely to rot.</li>
</ol>
<h2>Summer care</h2>
<ul>
<li><strong>Protect the shoots from slugs.</strong> Young dahlia shoots are a favorite. See <a href="${link("articles/slugs/")}">dealing with slugs</a>.</li>
<li><strong>Pinch for more flowers.</strong> When the plant is about a foot tall, pinch out the center tip just above a set of leaves. It branches out and produces more stems.</li>
<li><strong>Water deeply</strong> once plants are growing, about once or twice a week in dry weather.</li>
<li><strong>Tie stems to the stake</strong> as they grow.</li>
<li><strong>Cut often.</strong> Cutting flowers and removing spent blooms keeps new buds coming. Cut in the cool of the morning, and pick blooms that are almost fully open, since dahlias don't open much more once cut.</li>
</ul>
<h2>What to do in winter</h2>
<p>A frost blackens dahlia foliage and ends the season. What comes next depends on where you live.</p>
<ul>
<li><strong>West of the Cascades:</strong> in well-drained soil, many gardeners cut the stems down and leave the tubers in the ground under a thick layer of mulch. In heavy or soggy soil, they often rot over a wet winter, so digging them up is safer.</li>
<li><strong>East of the Cascades:</strong> winters are too cold for tubers in the ground. Dig them after the first frost.</li>
</ul>
<p>To store dug tubers, shake off the soil, let them dry for a few days somewhere sheltered, then pack them in slightly damp wood shavings, peat or vermiculite. Keep them somewhere cool but frost-free, around 40 to 50°F, and check them during winter for any that are rotting or shriveling.</p>
<p>Dahlias also feed bees late in the season, especially the open-centered single types. For more on that, see <a href="${link("articles/native-pollinator-garden/")}">planting for pollinators</a>.</p>`;
    }
  }
];
