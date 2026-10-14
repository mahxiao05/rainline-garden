/* Second batch of hand-written articles (same fields as articles.js). */
const win = (D, P, slug, id, kind) => {
  const p = P.plan(D, P.findPlace(D, slug));
  const r = p.crops.find(x => x.crop.id === id);
  const w = r.windows.find(x => x.kind === (kind || "spring")) || r.windows[0];
  return { range: P.fmtRange(w.start, w.end), indoor: r.indoor ? P.fmtRange(r.indoor.start, r.indoor.end) : null };
};

module.exports = [
  {
    slug: "planting-garlic-in-the-northwest",
    author: "jigmey-dorjee",
    title: "When and How to Plant Garlic in Oregon and Washington",
    description: "Garlic goes in during fall and comes out the next summer. Here's when to plant it where you live, which kind to buy, and how to harvest and cure it.",
    crops: ["garlic", "shallots"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const pdx = win(D, P, "portland-or", "garlic", "fall"), spo = win(D, P, "spokane-wa", "garlic", "fall"), bend = win(D, P, "bend-or", "garlic", "fall");
      return `
<p>Garlic is one of the easiest and most rewarding crops in a Northwest garden, and it runs on a different schedule from almost everything else. You plant it in fall, it grows roots and a few leaves before winter, sits through the cold, and then bulks up in spring. By early summer you're digging heads of garlic out of a bed you haven't thought about since October.</p>
<h2>When to plant</h2>
<p>Plant garlic in fall, after the soil has cooled but a few weeks before it freezes hard, so the cloves can root in. That timing varies a lot across the region:</p>
<ul>
<li><strong>Portland and the west side:</strong> ${pdx.range}. <a href="${link("when-to-plant/garlic/portland-or/")}">See Portland's garlic page</a>.</li>
<li><strong>Spokane and the inland Northwest:</strong> ${spo.range}.</li>
<li><strong>Bend and the high desert:</strong> ${bend.range}.</li>
</ul>
<p>If you miss the window, you can still plant in early spring as soon as the soil can be worked, but the heads will be smaller.</p>
<h2>Hardneck or softneck?</h2>
<p>Hardneck garlic grows a stiff center stalk and sends up a curly flower stem called a scape in early summer. The cloves are bigger and easier to peel, and it handles cold winters well. Softneck garlic has no stiff stalk, stores longer and is the kind you can braid. Both grow well west of the Cascades; hardnecks are the safer choice where winters are cold.</p>
<p>Buy seed garlic from a garden center or seed company rather than planting grocery-store bulbs. Store garlic is often a variety grown for a mild climate, and it may have been treated to slow sprouting.</p>
<h2>How to plant</h2>
<ol>
<li>Pick a sunny spot with soil that drains. Garlic rots in soggy ground, so a raised bed is ideal in rainy areas.</li>
<li>Loosen the soil and mix in an inch or two of compost.</li>
<li>Break the heads into cloves just before planting. Save the biggest cloves for planting; they grow the biggest heads.</li>
<li>Plant each clove pointed end up, about 2 inches deep and 6 inches apart.</li>
<li>Cover the bed with a few inches of straw or shredded leaves. Mulch keeps the soil from heaving in freeze-thaw cycles and smothers spring weeds.</li>
</ol>
<h2>Spring and early summer care</h2>
<p>Pull weeds as they appear, because garlic doesn't compete well. Water during dry spells in spring. On hardneck garlic, snap off the scapes when they curl; they're delicious sautéed, and removing them helps the plant put its energy into the bulb. Stop watering once the leaves start to yellow in early summer.</p>
<h2>Harvesting and curing</h2>
<p>Dig garlic when the lower third or so of the leaves have turned brown but the upper leaves are still green. Each green leaf is a wrapper around the bulb, so waiting too long leaves the heads with thin skins that split. Loosen the soil with a garden fork and lift the plants rather than pulling them.</p>
<p>Cure the whole plants in a shady, dry, airy place for two to three weeks, then trim the roots and stems. Keep the biggest, best heads to plant again in fall.</p>
<p>Shallots grow on the same schedule. <a href="${link("when-to-plant/shallots/")}">See shallot planting dates</a>.</p>`;
    }
  },
  {
    slug: "starting-seeds-indoors",
    author: "jigmey-dorjee",
    title: "Starting Vegetable Seeds Indoors: A Northwest Timeline",
    description: "When to start tomatoes, peppers and other seeds indoors in Oregon and Washington, plus the simple setup that grows strong seedlings.",
    crops: ["tomatoes", "peppers", "eggplant", "broccoli", "cabbage", "lettuce", "kale"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const t = win(D, P, "portland-or", "tomatoes"), pe = win(D, P, "portland-or", "peppers"), b = win(D, P, "portland-or", "broccoli");
      const tb = win(D, P, "bend-or", "tomatoes"), ts = win(D, P, "seattle-wa", "tomatoes");
      return `
<p>Some crops need more time than a Northwest summer gives them. Tomatoes, peppers and eggplant are the big three: if you sow them outside, they won't ripen before fall. Starting seeds indoors gives them a head start of six to ten weeks, and it opens up hundreds of varieties you'll never find as nursery starts.</p>
<h2>When to start</h2>
<p>Count back from the date you'll plant outside, not from the last frost. Rainline Garden works this out for each town. For Portland:</p>
<ul>
<li><strong>Peppers:</strong> start indoors ${pe.indoor}, plant out ${pe.range}.</li>
<li><strong>Tomatoes:</strong> start indoors ${t.indoor}, plant out ${t.range}.</li>
<li><strong>Broccoli:</strong> start indoors ${b.indoor}, plant out ${b.range}.</li>
</ul>
<p>Other towns shift a lot. Tomatoes start indoors ${ts.indoor} in Seattle and ${tb.indoor} in Bend. Check your own dates on the <a href="${link("")}">planner</a>, or build a dated list with <a href="${link("my-garden/")}">My garden plan</a>.</p>
<p>Starting too early is the most common mistake. Seedlings that wait too long indoors get tall, weak and rootbound.</p>
<h2>What you need</h2>
<ul>
<li><strong>Seed-starting mix.</strong> It's lighter and cleaner than garden soil or regular potting soil, which helps prevent seedling diseases.</li>
<li><strong>Containers with drainage.</strong> Cell trays, small pots or recycled yogurt cups with holes punched in the bottom all work.</li>
<li><strong>Light.</strong> A sunny Northwest window in March isn't enough, and seedlings stretch toward it. Simple LED shop lights hung a few inches above the seedlings, on for about 14 to 16 hours a day, grow far sturdier plants. Raise the lights as the plants grow.</li>
<li><strong>Warmth for sprouting.</strong> Tomatoes and especially peppers sprout faster in warm soil. A seedling heat mat helps a lot in a cool house. Take trays off the mat once most seeds are up.</li>
</ul>
<h2>Sowing and growing on</h2>
<ol>
<li>Moisten the mix before filling containers. It should feel like a wrung-out sponge.</li>
<li>Sow two or three seeds per cell at the depth on the packet, usually two to three times the seed's width.</li>
<li>Cover with a clear lid or plastic wrap until seeds sprout, then remove it so air can move.</li>
<li>Thin to the strongest seedling by snipping the others with scissors.</li>
<li>Water from the bottom when the surface feels dry, and keep a small fan nearby on low. Moving air makes stems stronger and helps prevent damping off, a fungus that makes seedlings collapse at the soil line.</li>
<li>Move tomatoes and peppers to bigger pots when they have a couple of true leaves. Tomatoes can be buried up to their first leaves; they'll grow roots along the buried stem.</li>
</ol>
<h2>Harden them off</h2>
<p>Seedlings raised indoors have never felt sun, wind or a cool night. About a week before planting out, set them outside in a sheltered spot for an hour or two, then a little longer each day, until they're out all day and night. Skipping this step is how good seedlings get scorched or stunted in their first week in the garden. The <a href="${link("glossary/#hardening-off")}">glossary</a> has more.</p>`;
    }
  },
  {
    slug: "growing-blueberries-in-the-northwest",
    author: "elaine-holloway",
    title: "Growing Blueberries in the Pacific Northwest",
    description: "Blueberries love the Northwest's acidic soil and wet winters. How to plant them, which varieties to pair, and how to get a big harvest for decades.",
    crops: ["blueberries"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>If there's one fruit made for Northwest gardens, it's the blueberry. Many of our soils are naturally acidic, winters are mild enough west of the Cascades, and summer brings the long, bright days the berries need to ripen. Oregon and Washington are among the country's biggest blueberry-growing states for good reason. A few well-placed bushes can feed a family for 30 years or more.</p>
<h2>Get the soil right first</h2>
<p>Blueberries need acidic soil, ideally with a pH of about 4.5 to 5.5. That's more acidic than most vegetables like. A soil test tells you where you're starting; many west-side soils are already close, while east-side soils are often too alkaline and need more work or a raised bed.</p>
<ul>
<li>Mix peat moss or acidic compost into a wide planting area, not just the hole.</li>
<li>If the pH is too high, elemental sulfur lowers it slowly. Add it months ahead of planting if you can, and follow the amount your soil test suggests.</li>
<li>Blueberry roots are shallow and fine, and they rot in standing water. In heavy clay, plant in a raised bed or a broad mound.</li>
</ul>
<h2>Pick two or more varieties</h2>
<p>Northern highbush blueberries, the type grown across the Northwest, can set fruit on their own, but planting two or more varieties that bloom around the same time usually gives you bigger berries and more of them. Mixing early, mid and late varieties also stretches the harvest over the whole summer. Good choices here include:</p>
<ul>
<li><strong>Duke</strong>, an early variety.</li>
<li><strong>Bluecrop</strong>, a dependable midseason standard.</li>
<li><strong>Chandler</strong>, a late variety known for very large berries.</li>
</ul>
<h2>Planting and mulch</h2>
<p>Plant in fall or early spring, in full sun, about 4 to 5 feet apart. Set the plant at the same depth it grew in the pot. Then mulch with 2 to 3 inches of sawdust, bark or wood chips and keep that mulch topped up every year. It holds moisture around the shallow roots, keeps weeds down, and slowly adds organic matter.</p>
<p>For the first year, pinch off the flowers. It feels wasteful, but it lets the plant build roots and branches, and you'll get much bigger harvests in the years that follow.</p>
<h2>Water, feed and protect</h2>
<ul>
<li><strong>Water through the dry summer.</strong> Shallow roots dry out fast. Drip irrigation or a soaker hose under the mulch is ideal.</li>
<li><strong>Feed lightly in spring</strong> with a fertilizer made for acid-loving plants such as rhododendrons and azaleas. Too much fertilizer can burn the roots.</li>
<li><strong>Net the bushes</strong> as berries start to color. Birds find ripe blueberries fast.</li>
</ul>
<h2>Pruning</h2>
<p>After the first few years, prune in late winter while the plants are dormant. Remove dead or damaged wood, crossing branches and a few of the oldest, thickest canes at the base. Younger canes produce the best fruit, so the goal is a steady supply of new ones.</p>
<p>See <a href="${link("when-to-plant/blueberries/")}">blueberry planting times for your town</a>.</p>`
  },
  {
    slug: "growing-strawberries-in-the-northwest",
    author: "elaine-holloway",
    title: "Growing Strawberries in Oregon and Washington",
    description: "June-bearing or everbearing? How to plant strawberries, keep them out of the mud, and keep a patch productive for years.",
    crops: ["strawberries"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>Northwest strawberries have a reputation, and they've earned it. The mild summers and cool nights produce berries with deep flavor, and local breeding programs at Oregon State University and Washington State University have developed varieties suited to this climate for decades. A small patch is easy to start and, with a little care, keeps producing for several years.</p>
<h2>Choose your type</h2>
<ul>
<li><strong>June-bearing</strong> plants produce one big crop over a few weeks in early summer. They're the classic choice for jam and freezing. Hood, an older variety from Oregon's breeding program, is famous for flavor; Shuksan and Tillamook are other Northwest-bred options.</li>
<li><strong>Day-neutral</strong> plants, often sold as everbearing, produce smaller flushes from early summer into fall. Albion and Seascape are common choices. They're good for snacking and for small spaces like containers.</li>
</ul>
<p>Many gardeners grow some of each: June-bearers for a big harvest and day-neutrals to keep berries coming.</p>
<h2>Planting</h2>
<p>Plant in early spring, in full sun, in soil that drains well. Strawberries hate wet feet, so raised beds or raised rows are a big help in rainy areas. Space plants about 12 to 18 inches apart.</p>
<p>Depth matters more than with most plants. Set each plant so the crown, the thick point where the leaves meet the roots, sits right at the soil surface. Buried crowns rot; crowns set too high dry out.</p>
<h2>The first year</h2>
<p>On June-bearers, pinch off all the flowers the first year. On day-neutrals, pinch flowers until about early July, then let them fruit. Both feel painful, but plants that put their first season into roots and leaves produce far more afterward.</p>
<h2>Mulch and keep the berries clean</h2>
<p>Gray mold, a fuzzy gray rot on the berries, is the main strawberry problem in wet Northwest springs. A layer of straw under the plants keeps berries off the soil and dries out faster after rain. Pick ripe berries every couple of days, remove any moldy ones from the patch, and give plants enough space for air to move through.</p>
<p>Slugs love strawberries too. Check our <a href="${link("articles/slugs/")}">guide to Northwest slugs</a> for safe ways to control them.</p>
<h2>Runners and renewing the patch</h2>
<p>Strawberries send out runners, long stems that root into new plants. Let some fill gaps in the row, but cut most of them off so the bed doesn't turn into a crowded mat. After June-bearers finish fruiting, many gardeners renew the bed: mow or cut the old leaves, thin out crowded plants, weed, and feed lightly so the plants regrow for next year.</p>
<p>Even well-kept patches slow down after three or four years. Start a fresh bed in a new spot with healthy new plants, and the cycle continues.</p>
<p>See <a href="${link("when-to-plant/strawberries/")}">strawberry planting times for your town</a>.</p>`
  },
  {
    slug: "native-pollinator-garden",
    author: "elaine-holloway",
    title: "Native Plants for a Northwest Pollinator Garden",
    description: "Native shrubs and flowers that feed bees, butterflies and hummingbirds from late winter to fall, and how to plant for pollinators in Oregon and Washington.",
    crops: ["sunflowers", "dahlias"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>A garden full of pollinators is a garden full of fruit. Bees, flies, butterflies and hummingbirds move pollen for squash, berries, apples and many other crops. The Northwest is home to hundreds of native bee species, and native plants are what they evolved with. Even a small border of natives next to the vegetable bed makes a difference.</p>
<h2>Plan for bloom from late winter to fall</h2>
<p>Pollinators need food all season, not just in June. The trick is to pick plants that flower at different times. Here are reliable natives, roughly in bloom order:</p>
<ul>
<li><strong>Red-flowering currant</strong> (<em>Ribes sanguineum</em>). A shrub with hanging pink flowers in late winter and early spring. One of the first hummingbird foods of the year.</li>
<li><strong>Oregon grape</strong> (<em>Mahonia aquifolium</em>). Oregon's state flower. Bright yellow spring flowers that native bees love, followed by tart blue berries.</li>
<li><strong>Camas</strong> (<em>Camassia</em>). Spring bulbs with tall spikes of blue flowers. They grow well in spots that are wet in winter.</li>
<li><strong>Western columbine</strong> (<em>Aquilegia formosa</em>). Red and yellow spring flowers for hummingbirds, happy in part shade.</li>
<li><strong>Mock orange</strong> (<em>Philadelphus lewisii</em>). A shrub covered in fragrant white flowers in early summer.</li>
<li><strong>Oregon sunshine</strong> (<em>Eriophyllum lanatum</em>). A tough, drought-tolerant perennial with yellow daisy flowers through early summer.</li>
<li><strong>Yarrow</strong> (<em>Achillea millefolium</em>). Flat clusters of small flowers that suit many small bees and beneficial insects. Very drought tolerant once established.</li>
<li><strong>Goldenrod</strong> (<em>Solidago</em>) and <strong>Douglas aster</strong> (<em>Symphyotrichum subspicatum</em>). Late summer and fall flowers when little else is blooming.</li>
</ul>
<p>Garden sunflowers and single-flowered dahlias are also great additions near the vegetables. <a href="${link("when-to-plant/flowers/")}">See flower planting times</a>.</p>
<h2>Planting tips</h2>
<ul>
<li><strong>Plant in fall.</strong> Northwest fall and winter rain settles natives in without much watering, and they're ready to grow in spring.</li>
<li><strong>Group the same plant together.</strong> A patch of one kind of flower is easier for bees to find and work than single plants scattered around.</li>
<li><strong>Water the first summer.</strong> Even drought-tolerant natives need regular water in their first dry season. After that, most need little or none.</li>
<li><strong>Buy from native plant nurseries or native plant sales,</strong> which often carry local forms of these species.</li>
</ul>
<h2>Leave room for nests</h2>
<p>Flowers are only half of what pollinators need. Most native bees nest in the ground, in small patches of bare, undisturbed soil. Others, like the mason bees that pollinate fruit trees in spring, nest in hollow stems and holes in wood.</p>
<ul>
<li>Leave a sunny patch of bare soil unmulched.</li>
<li>In fall, leave some flower stalks standing instead of cutting everything down. Many insects overwinter in them.</li>
<li>Avoid insecticides on or near flowering plants. If you must treat a pest, spray in the evening when bees aren't flying, and never on open flowers.</li>
</ul>`
  },
  {
    slug: "winter-cover-crops",
    author: "elaine-holloway",
    title: "Winter Cover Crops for Northwest Vegetable Beds",
    description: "Why to sow cover crops in empty beds each fall, which ones grow well in Oregon and Washington, and how to turn them under in spring.",
    crops: ["fava-beans", "garlic"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>West of the Cascades, a bare vegetable bed spends the winter getting pounded by rain. That rain compacts the surface, washes away fine soil and leaches nutrients down past where roots can reach. A cover crop sown in early fall protects that bed all winter, and in spring you turn it into food for the soil.</p>
<h2>What a cover crop does</h2>
<ul>
<li><strong>Protects the soil</strong> from heavy rain and erosion.</li>
<li><strong>Adds organic matter</strong> when you turn it under, which improves drainage in clay and water-holding in sandy soil.</li>
<li><strong>Holds onto nutrients</strong> that would otherwise wash away over winter.</li>
<li><strong>Adds nitrogen</strong>, if you grow a legume such as clover, peas or favas.</li>
<li><strong>Smothers winter weeds.</strong></li>
</ul>
<h2>Good choices for Northwest gardens</h2>
<ul>
<li><strong>Crimson clover.</strong> A legume with striking red flowers in spring. Easy for home gardens and fixes nitrogen.</li>
<li><strong>Austrian winter peas.</strong> A cold-hardy legume, often sown mixed with a grain for support.</li>
<li><strong>Fava beans.</strong> Large-seeded and easy to sow by hand. Grow them as a cover crop, or let some mature for a spring harvest. <a href="${link("when-to-plant/fava-beans/")}">See fava bean timing</a>.</li>
<li><strong>Cereal rye.</strong> Very hardy and great at holding soil and smothering weeds, but it grows tall and tough in spring. Cut it early.</li>
</ul>
<p>A mix of a legume and a grain, like peas with cereal rye, combines nitrogen with lots of organic matter.</p>
<h2>When to sow</h2>
<p>Sow as early in fall as you can clear a bed, ideally from late summer through about early October west of the Cascades. Legumes in particular need time to establish before the cold. Late sowings still help, but give less growth. In colder east-side areas, sow earlier, and choose very hardy options like cereal rye.</p>
<p>Scatter the seed over loosened soil, rake it in lightly, and water if the fall rains haven't started. Covering seed with a thin layer of soil also keeps birds from eating it.</p>
<h2>Turning it under in spring</h2>
<p>Cut or turn the cover crop under in spring, ideally when legumes start to flower and before any of it sets seed. Chop it with a spade or cut it at the base, then dig or fork it into the top few inches of soil. Give it two to three weeks to break down before planting. Fresh green material can tie up nitrogen and get in the way of small seeds for a short time.</p>
<p>No room for a cover crop? A thick layer of shredded leaves or straw over the bed also protects the soil through winter. Garlic, which goes in each fall, can share space with mulch too. See <a href="${link("articles/planting-garlic-in-the-northwest/")}">how to plant garlic</a>.</p>`
  },
  {
    slug: "watering-vegetables-in-dry-summers",
    author: "elaine-holloway",
    title: "How Much to Water Vegetables in a Dry Northwest Summer",
    description: "The Northwest is rainy for nine months and bone dry for three. How much water vegetables need in summer, when to water, and how to waste less of it.",
    crops: ["tomatoes", "summer-squash", "beans", "lettuce", "cucumbers"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>People who move to the Northwest are often surprised by summer. After months of rain, the tap shuts off: July and August are usually among the driest months of the year, west of the Cascades and even more so east of them. Vegetables are growing their fastest just as the rain stops, so watering well makes a big difference.</p>
<h2>How much</h2>
<p>A common rule of thumb is about an inch of water a week for an established vegetable garden, from rain and watering combined. Hot spells, sandy soil, windy sites and the dry east side all push that number up. Large, fruiting plants like squash and tomatoes drink more than small leafy crops.</p>
<p>Don't rely on the rule alone. Push a finger or a trowel two or three inches into the soil next to your plants. If it's dry at that depth, it's time to water.</p>
<h2>Water deeply, less often</h2>
<p>A long soak once or twice a week is better than a quick sprinkle every day. Deep watering pushes moisture down where roots can follow it, so plants handle hot days better. Light daily watering keeps the roots near the surface, where they dry out first.</p>
<p>Seeds and newly planted seedlings are the exception. Keep the top inch moist until they're established, which can mean watering every day in warm weather.</p>
<h2>Water at the base, in the morning</h2>
<ul>
<li><strong>Soaker hoses and drip lines</strong> put water right at the roots, waste very little to evaporation and keep leaves dry. Keeping leaves dry helps prevent diseases like powdery mildew and tomato blight. Add a simple timer and the garden nearly waters itself.</li>
<li><strong>Morning is the best time.</strong> Less water evaporates than at midday, and any splashed leaves dry quickly.</li>
<li><strong>If you hand-water,</strong> aim at the soil, not the leaves, and go slowly so the water soaks in instead of running off.</li>
</ul>
<h2>Mulch keeps the water in</h2>
<p>Once the soil has warmed in late spring, spread 2 to 3 inches of straw, shredded leaves or compost around your plants. Mulch slows evaporation, keeps the soil cooler and more even, and smothers weeds that would compete for water. It's the single cheapest way to cut your watering.</p>
<h2>Crop by crop</h2>
<ul>
<li><strong>Tomatoes:</strong> keep watering even, since swings between dry and soaked can cause cracked fruit and blossom end rot. Ease off a little in late summer to encourage ripening.</li>
<li><strong>Squash and cucumbers:</strong> heavy drinkers once they're fruiting. Bitter cucumbers are often a sign of drought stress.</li>
<li><strong>Beans:</strong> water is most important when they're flowering and setting pods.</li>
<li><strong>Lettuce and leafy greens:</strong> shallow roots need frequent water, and drought stress makes them bolt and turn bitter.</li>
</ul>
<p>Watering is one job in the <a href="${link("garden-calendar/")}">monthly garden calendar</a>, along with everything else to do each summer month.</p>`
  },
  {
    slug: "raised-beds-for-rainy-gardens",
    author: "elaine-holloway",
    title: "Raised Beds for Rainy Northwest Gardens",
    description: "Why raised beds suit the Northwest so well, how big and deep to build them, what to fill them with, and the mistakes to avoid.",
    crops: ["tomatoes", "carrots", "lettuce", "garlic", "strawberries"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>Ask Northwest gardeners for one piece of advice and many will say: build raised beds. Our long, wet winters and springs leave ordinary garden soil soggy and cold for weeks. A raised bed drains faster and warms sooner, which can mean planting earlier and losing fewer seeds to rot.</p>
<h2>Why they work here</h2>
<ul>
<li><strong>Drainage.</strong> Excess water runs out of the bed instead of sitting around the roots. That matters for garlic, strawberries and anything that rots in wet soil.</li>
<li><strong>Warmer soil.</strong> Soil above ground level warms up faster in spring, which helps tomatoes, beans and squash. See <a href="${link("articles/soil-temperature/")}">why soil temperature matters</a>.</li>
<li><strong>Better soil from day one.</strong> Many Northwest yards have heavy clay or rocky fill. A raised bed lets you start with good soil.</li>
<li><strong>No walking on the soil.</strong> Soil you never step on stays loose, so roots and water move through it easily.</li>
</ul>
<h2>How big</h2>
<p>Make beds no wider than about 4 feet, so you can reach the middle from either side without stepping in. Length is up to you; 8 feet is common because lumber comes in that length. Leave paths at least 2 feet wide, wider if you'll use a wheelbarrow.</p>
<p>About 10 to 12 inches deep is enough for most vegetables, especially if you loosen the soil underneath before filling. Go deeper if you have very poor soil below or want to garden with less bending.</p>
<h2>What to build them from</h2>
<ul>
<li><strong>Untreated cedar</strong> is the Northwest favorite. It resists rot naturally and lasts many years.</li>
<li><strong>Metal beds</strong> last a long time and warm up quickly in spring.</li>
<li><strong>Avoid old railroad ties</strong> and any wood treated with creosote around food crops.</li>
</ul>
<h2>What to fill them with</h2>
<p>A blend of good topsoil and compost works well. Many garden suppliers in the region sell a ready-made "vegetable garden mix." Avoid filling beds with pure compost or with bagged potting mix alone: pure compost can be too rich and settles a lot, and potting mix is made for containers and gets expensive in volume.</p>
<p>Expect the soil level to drop a few inches in the first year as it settles. Top up with compost each spring or fall.</p>
<h2>Common mistakes</h2>
<ul>
<li><strong>Too wide.</strong> If you have to step in the bed to reach the middle, you'll compact the soil you built it to protect.</li>
<li><strong>Too shady.</strong> Most vegetables need at least six hours of direct sun; tomatoes and squash want eight or more.</li>
<li><strong>Forgetting water.</strong> Raised beds drain well, which also means they dry out faster in summer. Lay a soaker hose or drip line before you plant. See <a href="${link("articles/watering-vegetables-in-dry-summers/")}">how much to water</a>.</li>
</ul>
<p>New to all this? The <a href="${link("beginners-guide/")}">beginner's guide</a> walks through a first raised-bed garden step by step.</p>`
  },
  {
    slug: "growing-potatoes-in-the-northwest",
    author: "jigmey-dorjee",
    title: "Growing Potatoes in Oregon and Washington",
    description: "When to plant potatoes in the Northwest, how to cut and plant seed potatoes, hilling, and when to dig for new potatoes and storage potatoes.",
    crops: ["potatoes"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const pdx = win(D, P, "portland-or", "potatoes"), spo = win(D, P, "spokane-wa", "potatoes"), bend = win(D, P, "bend-or", "potatoes");
      return `
<p>Potatoes are one of the most productive crops you can grow in a small space, and they like the Northwest's cool spring weather. Digging them up is like a treasure hunt, which makes them a favorite with kids.</p>
<h2>When to plant</h2>
<p>Potatoes go in during spring, a few weeks before the last frost, once the soil can be worked and isn't soggy. The shoots can be nipped by a late frost, but the plants usually regrow from below ground.</p>
<ul>
<li><strong>Portland:</strong> ${pdx.range}. <a href="${link("when-to-plant/potatoes/portland-or/")}">Details</a>.</li>
<li><strong>Spokane:</strong> ${spo.range}.</li>
<li><strong>Bend:</strong> ${bend.range}.</li>
</ul>
<h2>Start with certified seed potatoes</h2>
<p>Buy certified seed potatoes from a garden center or seed company. They're grown to be free of the diseases that can build up in soil, and they haven't been treated to stop sprouting the way many grocery-store potatoes have.</p>
<p>Small seed potatoes can go in whole. Cut larger ones into chunks about the size of a golf ball or a bit bigger, each with at least one or two eyes (the small buds). Let the cut pieces sit for a day or two so the cut surfaces dry before planting.</p>
<h2>Planting</h2>
<ol>
<li>Choose a sunny spot with loose soil. Heavy, wet soil can rot seed pieces in a cold spring.</li>
<li>Dig a trench about 4 inches deep.</li>
<li>Set the pieces cut side down, about 12 inches apart, with rows 2 to 3 feet apart.</li>
<li>Cover with soil.</li>
</ol>
<p>Avoid adding fresh manure or lime right before planting. Both can encourage potato scab, a disease that leaves rough, corky patches on the skin.</p>
<h2>Hilling</h2>
<p>New potatoes form along the buried stem, above the seed piece. When plants are 6 to 8 inches tall, pull soil, compost or straw up around the stems, leaving the top few inches of leaves showing. Repeat once or twice as they grow. Hilling gives the potatoes more room to form and keeps them covered. Potatoes exposed to light turn green, and green skin should be cut away before eating.</p>
<p>Water regularly once plants are up, especially while they're flowering, when the tubers are forming.</p>
<h2>When to dig</h2>
<ul>
<li><strong>New potatoes:</strong> start gently digging around the edges of plants a couple of weeks after they flower. Take a few and leave the rest to grow.</li>
<li><strong>Storage potatoes:</strong> wait until the vines have yellowed and died back, then leave the potatoes in the ground about two more weeks so their skins toughen. Dig on a dry day, and handle them gently.</li>
</ul>
<p>Let storage potatoes cure in a dark, airy spot for a week or two, then store them somewhere cool, dark and humid. Keep them away from onions and out of the light.</p>
<p>Rotate where you plant potatoes each year, and avoid following tomatoes, peppers or eggplant, which share some of the same diseases.</p>`;
    }
  },
  {
    slug: "container-vegetable-gardening",
    author: "jigmey-dorjee",
    title: "Growing Vegetables in Containers on a Northwest Balcony or Patio",
    description: "No yard? Herbs, greens, tomatoes and more grow well in pots. Container sizes, soil, watering and the best crops for small Northwest spaces.",
    crops: ["tomatoes", "lettuce", "basil", "peppers", "strawberries", "kale"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>You don't need a yard to grow food. A sunny balcony, a patio or a strip of driveway can produce a surprising amount of salad greens, herbs and tomatoes. Containers even have some advantages in the Northwest: they drain well in a wet spring, and dark pots warm up faster than garden soil.</p>
<h2>Start with sun</h2>
<p>Sun matters more than anything else. Fruiting crops like tomatoes, peppers and cucumbers need at least six to eight hours of direct sun. Leafy greens and many herbs get by with four to six. A south- or west-facing balcony is ideal; a north-facing one is best for lettuce, parsley and mint.</p>
<h2>Pot sizes that work</h2>
<ul>
<li><strong>Tomatoes:</strong> at least 5 gallons per plant, and bigger is better for tall varieties. Choose compact, bush or "patio" types, or cherry tomatoes.</li>
<li><strong>Peppers and eggplant:</strong> about 3 to 5 gallons each.</li>
<li><strong>Zucchini:</strong> a large pot of 10 gallons or more for one plant.</li>
<li><strong>Lettuce, spinach, arugula and other greens:</strong> a wide pot or window box at least 6 to 8 inches deep.</li>
<li><strong>Herbs:</strong> 1 to 2 gallons each. Give mint its own pot, because it spreads aggressively.</li>
<li><strong>Strawberries:</strong> hanging baskets, window boxes or strawberry pots, especially day-neutral varieties.</li>
</ul>
<p>Every container needs drainage holes. Fabric grow bags are inexpensive, light and drain well.</p>
<h2>Use potting mix, not garden soil</h2>
<p>Garden soil packs down in a pot, drains poorly and can carry weeds and disease. Use a good-quality bagged potting mix. Refresh it each year by mixing in some compost, or replace it if plants struggled.</p>
<h2>Water and feed more often</h2>
<p>Containers dry out much faster than the ground, especially in July and August, and a big tomato in a pot may need water every day during a heat wave. Water until it runs out the bottom, then check again the next day. A saucer under the pot helps, but empty it after rain so roots don't sit in water.</p>
<p>Because frequent watering washes nutrients out of the pot, feed container vegetables regularly through the season with a balanced fertilizer, following the label.</p>
<h2>Easy crops to start with</h2>
<ul>
<li>Leaf lettuce and other salad greens, which you can cut again and again</li>
<li>Herbs like basil, parsley, chives, thyme and mint</li>
<li>Cherry tomatoes</li>
<li>Bush beans</li>
<li>Kale and Swiss chard</li>
<li>Radishes</li>
</ul>
<p>Planting dates are the same in pots as in the ground. <a href="${link("")}">Enter your ZIP</a> to see when to plant each crop, or build a plan with <a href="${link("my-garden/")}">My garden plan</a>.</p>`
  }
];
