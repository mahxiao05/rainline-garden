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
    topic: "crops",
    author: "jigmey-dorjee",
    title: "When and How to Plant Garlic in Oregon, Washington and Idaho",
    description: "Garlic goes in around October and comes out the next July. Planting dates by region, hardneck or softneck, and curing the harvest.",
    crops: ["garlic", "shallots"],
    published: "2026-10-14",
    body: ({ D, P, link, fig }) => {
      const pdx = win(D, P, "portland-or", "garlic", "fall"), spo = win(D, P, "spokane-wa", "garlic", "fall"), bend = win(D, P, "bend-or", "garlic", "fall"), boi = win(D, P, "boise-id", "garlic", "fall");
      return `
<p>Garlic is one of the easiest and most rewarding crops in a Northwest garden, and it runs on a different schedule from almost everything else. You plant it in fall, it grows roots and a few leaves before winter, sits through the cold, and then bulks up in spring. By early summer you're digging heads of garlic out of a bed you haven't thought about since October.</p>
<p>It's also one of the few crops where the hardest part is remembering to do it. Most of us think about the garden in spring, and by then it's too late for a full-sized garlic harvest. If you're reading this in the fall, you're right on time.</p>
<h2>How much to plant</h2>
<p>Each clove you plant grows into one whole head. So count backward from how much garlic you use. If you go through a head a week, that's about 50 heads a year, plus some extra to replant next fall. A typical head breaks into 6 to 10 planting cloves depending on the variety, so a pound of seed garlic usually plants somewhere around 40 to 80 cloves. At 6 inches apart, a 4 by 8 foot bed holds roughly 100 to 120 plants.</p>
<h2>When to plant</h2>
<p>Plant garlic in fall, after the soil has cooled but a few weeks before it freezes hard, so the cloves can root in. That timing varies a lot across the region:</p>
<ul>
<li><strong>Portland and the west side:</strong> ${pdx.range}. <a href="${link("when-to-plant/garlic/?town=portland-or#your-town")}">See Portland's garlic page</a>.</li>
<li><strong>Spokane and the inland Northwest:</strong> ${spo.range}.</li>
<li><strong>Boise and the Treasure Valley:</strong> ${boi.range}.</li>
<li><strong>Bend and the high desert:</strong> ${bend.range}.</li>
</ul>
<p>If you miss the window, you can still plant in early spring as soon as the soil can be worked, but the heads will be smaller.</p>
<h2>Hardneck or softneck?</h2>
<p>Hardneck garlic grows a stiff center stalk and sends up a curly flower stem called a scape in early summer. The cloves are bigger and easier to peel, and it handles cold winters well. Softneck garlic has no stiff stalk, stores longer and is the kind you can braid. Both grow well west of the Cascades; hardnecks are the safer choice where winters are cold.</p>
<p>Within each group there are dozens of varieties, and part of the fun is trying a few. Porcelain hardnecks such as Music and German Extra Hardy have big, easy-to-peel cloves, usually four to six per head. Rocambole types are known for rich flavor but don't store as long. Among softnecks, Inchelium Red, a heirloom found on the Colville Reservation in northeastern Washington, is a popular Northwest choice that stores well. Silverskins keep the longest of all. Plant two or three varieties side by side and you'll soon find the ones you like best in your soil.</p>
<p>Buy seed garlic from a garden center or seed company rather than planting grocery-store bulbs. Store garlic is often a variety grown for a mild climate, and it may have been treated to slow sprouting.</p>
${fig(1)}
<h2>How to plant</h2>
<ol>
<li>Pick a sunny spot with soil that drains. Garlic rots in soggy ground, so a raised bed is ideal in rainy areas.</li>
<li>Loosen the soil and mix in an inch or two of compost.</li>
<li>Break the heads into cloves just before planting. Save the biggest cloves for planting; they grow the biggest heads.</li>
<li>Plant each clove pointed end up, about 2 inches deep and 6 inches apart.</li>
<li>Cover the bed with a few inches of straw or shredded leaves. Mulch keeps the soil from heaving in freeze-thaw cycles and smothers spring weeds.</li>
</ol>
<h2>Spring and early summer care</h2>
<p>When green shoots start growing strongly in late winter or early spring, garlic benefits from a little nitrogen. Side-dress with a nitrogen fertilizer or a dose of blood meal or feather meal once in early spring and again a few weeks later. Stop feeding by about mid-May, when the bulbs start to swell; late fertilizer delays bulbing and can hurt storage.</p>
<p>Pull weeds as they appear, because garlic doesn't compete well. Water during dry spells in spring. On hardneck garlic, snap off the scapes when they curl; they're delicious sautéed, and removing them helps the plant put its energy into the bulb. Stop watering once the leaves start to yellow in early summer.</p>
<h2>Harvesting and curing</h2>
<p>Dig garlic when the lower third or so of the leaves have turned brown but the upper leaves are still green. Each green leaf is a wrapper around the bulb, so waiting too long leaves the heads with thin skins that split. Loosen the soil with a garden fork and lift the plants rather than pulling them.</p>
<p>Cure the whole plants in a shady, dry, airy place for two to three weeks, then trim the roots and stems. Keep the biggest, best heads to plant again in fall.</p>
<p>Once cured, store garlic somewhere cool, dark and dry with some air movement, not in the fridge and not in a sealed bag. Softnecks usually keep the longest, often six months or more. Hardnecks generally keep for a few months, so eat those first and save the softnecks for late winter.</p>
<h2>Problems to watch for</h2>
<p><strong>Rust</strong> shows up as small orange spots on the leaves, usually in late spring. It's common in wet Northwest springs. Light cases rarely do much harm; in bad years it can shrink the bulbs. Space plants for airflow, water at the soil rather than over the leaves, and don't plant garlic or onions in the same spot every year.</p>
<p><strong>White rot</strong> is much more serious. Plants yellow and wilt from the outer leaves in, and the base of the bulb is covered with fluffy white fungus and tiny black specks. Those specks can survive in the soil for many years, which makes the bed unusable for garlic, onions and leeks. The best protection is not bringing it in: buy seed garlic from a reputable source, and never plant cloves from a crop that showed these signs. If you find it, remove the plants with the soil around them and put them in the trash.</p>
<p>Onion maggots and thrips sometimes bother garlic too, though usually less than they bother onions. Row cover in spring and rotating where you plant help with both.</p>
<p>Shallots grow on the same schedule. <a href="${link("when-to-plant/shallots/")}">See shallot planting dates</a>.</p>`;
    }
  },
  {
    slug: "starting-seeds-indoors",
    topic: "timing", icon: "seed-tray",
    author: "jigmey-dorjee",
    title: "Starting Vegetable Seeds Indoors: A Northwest Timeline",
    description: "Onions in late winter, peppers next, tomatoes last. A Northwest seed-starting timeline and the light setup that keeps seedlings stocky.",
    crops: ["tomatoes", "peppers", "eggplant", "broccoli", "cabbage", "lettuce", "kale"],
    published: "2026-10-14",
    body: ({ D, P, link, fig }) => {
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
<p>Starting too early is the most common mistake. Seedlings that wait too long indoors get tall, weak and rootbound. It's hard to resist when you're itching to garden in February, but a tomato started in early April and planted out in May will usually outgrow one started in February that sat in a pot for three months.</p>
<h2>What's worth starting yourself (and what isn't)</h2>
<p>Not everything needs a head start. Tomatoes, peppers, eggplant, onions and leeks benefit the most, because they're slow. Broccoli, cabbage, cauliflower, kale and lettuce are easy to start indoors and give you a few weeks' jump on slugs. Squash, cucumbers and melons can be started indoors, but only about three to four weeks ahead; their roots resent being disturbed, so sow them in individual pots.</p>
<p>Some crops are better sown straight into the garden. Carrots, beets, radishes, parsnips and other root crops don't transplant well, and the roots fork or stunt if moved. Peas, beans and corn grow so fast from seed outdoors that starting them indoors rarely gains much.</p>
<p>If you only have room for one tray, fill it with tomatoes and peppers. Those are the varieties where nursery choice is most limited, and where starting your own lets you pick ones bred for short, cool seasons.</p>
<h2>What you need</h2>
<ul>
<li><strong>Seed-starting mix.</strong> It's lighter and cleaner than garden soil or regular potting soil, which helps prevent seedling diseases.</li>
<li><strong>Containers with drainage.</strong> Cell trays, small pots or recycled yogurt cups with holes punched in the bottom all work.</li>
<li><strong>Light.</strong> A sunny Northwest window in March isn't enough, and seedlings stretch toward it. Simple LED shop lights hung a few inches above the seedlings, on for about 14 to 16 hours a day, grow far sturdier plants. Raise the lights as the plants grow.</li>
<li><strong>Warmth for sprouting.</strong> Tomatoes and especially peppers sprout faster in warm soil. A seedling heat mat helps a lot in a cool house. Take trays off the mat once most seeds are up.</li>
</ul>
${fig(1)}
<h2>Sowing and growing on</h2>
<ol>
<li>Moisten the mix before filling containers. It should feel like a wrung-out sponge.</li>
<li>Sow two or three seeds per cell at the depth on the packet, usually two to three times the seed's width.</li>
<li>Cover with a clear lid or plastic wrap until seeds sprout, then remove it so air can move.</li>
<li>Thin to the strongest seedling by snipping the others with scissors.</li>
<li>Water from the bottom when the surface feels dry, and keep a small fan nearby on low. Moving air makes stems stronger and helps prevent damping off, a fungus that makes seedlings collapse at the soil line.</li>
<li>Move tomatoes and peppers to bigger pots when they have a couple of true leaves. Tomatoes can be buried up to their first leaves; they'll grow roots along the buried stem.</li>
</ol>
<h2>Feeding seedlings</h2>
<p>Seed-starting mix contains very little fertilizer, which is good for sprouting but means seedlings start to go hungry after a few weeks. Once they have their first true leaves (the second set of leaves, which look like the plant's real leaves), water them every week or so with a liquid fertilizer mixed at half the label strength. When you move them up to bigger pots, use a potting mix that contains some fertilizer.</p>
<h2>When seedlings don't look right</h2>
<p><strong>Tall, pale and floppy</strong> almost always means not enough light. Lower the lights so they're just a few inches above the leaves, or add a second light. Leggy tomatoes can be rescued by burying the stem deeper when you transplant them. Leggy peppers and brassicas can't, so it's better to prevent it.</p>
<p><strong>Collapsing at the soil line</strong> is damping off. Once a seedling falls over, it won't recover. Remove the affected ones, let the surface dry out a bit between waterings, keep the fan running, and next time start with fresh mix and clean containers.</p>
<p><strong>Yellowing lower leaves</strong> after a few weeks usually means they need food. <strong>Purple undersides</strong> on tomato leaves often mean the room or the roots are too cold. <strong>White, crispy patches</strong> after a day outdoors are sunscald from skipping hardening off; the plant usually grows past it.</p>
<p>Keep a simple note of when you sowed, when they came up, and when you planted out. By your second or third year, you'll have your own timeline that fits your house and your garden better than any chart.</p>
<h2>Harden them off</h2>
<p>Seedlings raised indoors have never felt sun, wind or a cool night. About a week before planting out, set them outside in a sheltered spot for an hour or two, then a little longer each day, until they're out all day and night. Skipping this step is how good seedlings get scorched or stunted in their first week in the garden. The <a href="${link("glossary/#hardening-off")}">glossary</a> has more.</p>`;
    }
  },
  {
    slug: "growing-blueberries-in-the-northwest",
    topic: "crops",
    author: "elaine-holloway",
    title: "Growing Blueberries in the Pacific Northwest",
    description: "Acidic, rainy west-side soil is close to what blueberries want. Choosing two varieties that pollinate each other, planting, and pruning.",
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
<li><strong>Feed lightly in spring</strong> with a fertilizer made for acid-loving plants such as rhododendrons and azaleas. Blueberries take up nitrogen best in the ammonium form found in these fertilizers (ammonium sulfate is the classic one), and too much fertilizer of any kind can burn their fine roots. Split the amount into two or three small feedings between bud break and early June rather than one big one.</li>
<li><strong>Net the bushes</strong> as berries start to color. Birds find ripe blueberries fast.</li>
</ul>
<h2>Pruning</h2>
<p>After the first few years, prune in late winter while the plants are dormant. Remove dead or damaged wood, crossing branches and a few of the oldest, thickest canes at the base. Younger canes produce the best fruit, so the goal is a steady supply of new ones.</p>
<p>A useful rule of thumb from university fruit guides: on a mature bush, canes older than about six years produce less and smaller fruit. Each winter, cut one or two of the oldest canes right down to the ground, and keep a few strong new ones that come up from the base to replace them. Thin out short, twiggy growth in the center so light gets into the bush. Fruit forms on last year's growth, so the plump, rounded buds near branch tips are next summer's flowers; the small, pointed buds are leaf buds.</p>
<h2>Picking: wait a few more days</h2>
<p>The most common harvest mistake is picking too soon. A berry turns fully blue several days before it reaches full sweetness, and the flavor keeps improving while it stays on the bush. Look for berries with no red or green left around the stem, and roll a cluster gently with your thumb: ripe berries drop into your hand and unripe ones hang on. Pick every few days through the season, since a bush ripens its berries gradually over several weeks rather than all at once. With early, mid and late varieties planted together, picking can run from early summer well into August west of the Cascades.</p>
<h2>Common problems</h2>
<ul>
<li><strong>Yellow leaves with green veins.</strong> Usually a sign that the soil pH is too high, so the plant can't take up iron. It's common in east-side and alkaline soils. A soil test confirms it; sulfur and an acidic mulch fix it slowly.</li>
<li><strong>Shriveled, gray, hard berries.</strong> This is often mummy berry, a fungal disease that's common in wet Northwest springs. The mummified berries fall and carry the fungus over winter. Rake them up or bury them under fresh mulch before spring, and remove any you see on the bush.</li>
<li><strong>Soft, leaking berries with tiny holes.</strong> Spotted wing drosophila, a small fruit fly that arrived in the Northwest around 2009, lays eggs in ripening fruit. Pick often and promptly, don't leave overripe or fallen berries lying around, and refrigerate what you pick.</li>
<li><strong>Few berries on a healthy-looking bush.</strong> Too much shade, too much nitrogen, heavy pruning that removed last year's growth, or a young plant that just needs another year or two.</li>
</ul>
<h2>Growing blueberries in pots</h2>
<p>If your soil is alkaline, heavy clay or just full of tree roots, a large container works well. Use a pot of at least 15 to 20 gallons (a half barrel is ideal) and fill it with a potting mix made for acid-loving plants, or one with plenty of peat or bark. Compact varieties bred for containers stay smaller, but a standard highbush will also grow in a big pot for years. Container plants dry out fast in summer, so water often, and in a hard freeze move the pot against the house or wrap it, since roots in a pot are much less protected than roots in the ground.</p>
<p>See <a href="${link("when-to-plant/blueberries/")}">blueberry planting times for your town</a>.</p>`
  },
  {
    slug: "growing-strawberries-in-the-northwest",
    topic: "crops",
    author: "elaine-holloway",
    title: "Growing Strawberries in the Pacific Northwest",
    description: "June-bearers give one big crop, everbearers a trickle all summer. Planting, mulching against rot, and renewing an old patch.",
    crops: ["strawberries"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>Northwest strawberries have a reputation, and they've earned it. The mild summers and cool nights produce berries with deep flavor, and Northwest plant breeders have developed varieties suited to this climate for decades. A small patch is easy to start and, with a little care, keeps producing for several years.</p>
<h2>Choose your type</h2>
<ul>
<li><strong>June-bearing</strong> plants produce one big crop over a few weeks in early summer. They're the classic choice for jam and freezing. Hood, an older Oregon-bred variety, is famous for flavor; Shuksan and Tillamook are other Northwest-bred options.</li>
<li><strong>Day-neutral</strong> plants, often sold as everbearing, produce smaller flushes from early summer into fall. Albion and Seascape are common choices. They're good for snacking and for small spaces like containers.</li>
</ul>
<p>Many gardeners grow some of each: June-bearers for a big harvest and day-neutrals to keep berries coming.</p>
<h2>Planting</h2>
<p>Plant in early spring, in full sun, in soil that drains well. Strawberries hate wet feet, so raised beds or raised rows are a big help in rainy areas. Space plants about 12 to 18 inches apart.</p>
<p>Depth matters more than with most plants. Set each plant so the crown, the thick point where the leaves meet the roots, sits right at the soil surface. Buried crowns rot; crowns set too high dry out.</p>
<p>Most strawberries are sold two ways: as bare-root bundles in late winter and early spring, or as potted plants later on. Bare-root plants are cheaper and establish well if you plant them promptly. Soak the roots in a bucket of water for an hour, trim very long roots back to about 5 inches so they don't bend upward in the hole, and spread them out in a fan before you firm the soil around them. Potted plants are easier to handle and can go in later, but cost more.</p>
<p>Avoid planting where tomatoes, potatoes, peppers or eggplant grew in the last few years. Those crops can carry verticillium wilt, a soil-borne disease that also attacks strawberries and makes plants wilt and collapse in summer.</p>
<h2>The first year</h2>
<p>On June-bearers, pinch off all the flowers the first year. On day-neutrals, pinch flowers until about early July, then let them fruit. Both feel painful, but plants that put their first season into roots and leaves produce far more afterward.</p>
<h2>Mulch and keep the berries clean</h2>
<p>Gray mold, a fuzzy gray rot on the berries, is the main strawberry problem in wet Northwest springs. A layer of straw under the plants keeps berries off the soil and dries out faster after rain. Pick ripe berries every couple of days, remove any moldy ones from the patch, and give plants enough space for air to move through.</p>
<p>Slugs love strawberries too. Check our <a href="${link("articles/slugs/")}">guide to Northwest slugs</a> for safe ways to control them.</p>
<h2>Picking for the best flavor</h2>
<p>Pick berries when they're red all over, including the shoulders near the cap. Unlike some fruit, strawberries don't keep sweetening after they're picked. Harvest in the cool of the morning, pinch the stem rather than pulling the berry, and leave the green cap on, which helps them keep. Don't wash them until you're about to eat them. A June-bearing patch usually ripens over two to three weeks, so pick every day or two at the peak.</p>
<h2>Other pests and problems</h2>
<ul>
<li><strong>Notched leaf edges and plants that wilt or stop growing.</strong> Root weevils are common in Northwest gardens. The adults chew notches in leaf edges at night, while the grubs eat roots underground. Beneficial nematodes applied to moist soil in spring or late summer can help, and a badly damaged patch is best replaced in a new spot.</li>
<li><strong>Soft, collapsing berries in late summer.</strong> Spotted wing drosophila, a small fruit fly, lays eggs in ripening fruit. It hits day-neutral varieties more than June-bearers because they fruit later in the season. Pick often and don't leave overripe berries on the plants.</li>
<li><strong>Birds.</strong> A light net over hoops keeps robins and other birds off when berries start to color.</li>
</ul>
<h2>Runners and renewing the patch</h2>
<p>Strawberries send out runners, long stems that root into new plants. Let some fill gaps in the row, but cut most of them off so the bed doesn't turn into a crowded mat. After June-bearers finish fruiting, many gardeners renew the bed: mow or cut the old leaves, thin out crowded plants, weed, and feed lightly so the plants regrow for next year.</p>
<p>Even well-kept patches slow down after three or four years. Start a fresh bed in a new spot with healthy new plants, and the cycle continues.</p>
<h2>Winter care</h2>
<p>West of the Cascades, strawberries usually need little help in winter beyond good drainage. In colder areas east of the Cascades and in the high desert, cover the plants with a few inches of loose straw once they've gone dormant after several hard frosts in late fall. It protects the crowns from deep cold and from freezing and thawing that can push them out of the ground. Pull the straw back into the paths in spring when new leaves start to grow, and keep some handy to throw back over the plants if a late frost is forecast while they're blooming.</p>
<h2>Strawberries in containers</h2>
<p>Day-neutral varieties do well in pots, window boxes and hanging baskets, which keep the berries off the ground and away from many slugs. Use a pot at least 8 inches deep with good drainage, a quality potting mix, and two or three plants per foot of space. Containers dry out fast in summer, so water often, and feed lightly every few weeks while they're fruiting, since frequent watering washes nutrients out.</p>
<p>See <a href="${link("when-to-plant/strawberries/")}">strawberry planting times for your town</a>.</p>`
  },
  {
    slug: "native-pollinator-garden",
    topic: "flowers", icon: "bee",
    author: "elaine-holloway",
    title: "Native Plants for a Northwest Pollinator Garden",
    description: "Red-flowering currant in March, asters in October: Northwest natives that keep bees and hummingbirds fed from late winter to fall.",
    crops: ["sunflowers", "dahlias"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>A garden full of pollinators is a garden full of fruit. Bees, flies, butterflies and hummingbirds move pollen for squash, berries, apples and many other crops. The Northwest is home to hundreds of native bee species, and native plants are what they evolved with. Even a small border of natives next to the vegetable bed makes a difference.</p>
<h2>Who's actually visiting your garden</h2>
<p>When people picture a pollinator they usually think of honeybees, but in a Northwest garden much of the work is done by native bees you may never have noticed. Bumble bees are some of the most valuable. They can fly in cool, cloudy weather that keeps honeybees in the hive, which matters a lot in a drizzly west-side spring when fruit trees and blueberries are blooming. They also "buzz pollinate," shaking pollen loose by vibrating their flight muscles, which is especially good for blueberries and tomatoes.</p>
<p>The blue orchard mason bee, a small, shiny, dark blue native bee, flies for just a few weeks in early spring and is an excellent pollinator of apples, pears and cherries. Add sweat bees, mining bees, leafcutter bees, hover flies (the small striped flies that hover in place over flowers) and butterflies, and a single garden can host dozens of species over a season. Many are tiny, and most are solitary and gentle; they don't defend a hive the way honeybees and wasps do.</p>
<h2>Plan for bloom from late winter to fall</h2>
<p>Pollinators need food all season, not just in June, so pick plants that flower at different times. Here are reliable natives, roughly in bloom order:</p>
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
</ul>
<p>If you put up a mason bee house, keep it clean. Nesting tubes reused year after year build up mites, fungus and parasitic wasps that can wipe out the bees. Use paper tube liners or removable wooden trays that you replace or clean each year, hang the house facing east or south under an overhang so it gets morning sun and stays dry, and make sure there's bare, damp mud nearby: mason bees use it to seal each egg chamber.</p>
<h2>No room for a border?</h2>
<p>A pollinator garden doesn't need to be big. A few large pots of yarrow, Oregon sunshine or annual flowers on a balcony will feed bees all summer. In the vegetable garden, let a few herbs flower: oregano, thyme, chives and cilantro in bloom draw in small bees and hover flies, and the hover fly larvae eat aphids. Let a couple of kale or broccoli plants bolt in spring and the yellow flowers will be covered in bees.</p>
<p>The lawn can help too. Letting clover and other low flowers bloom, and mowing a little less often, adds a surprising amount of food in a season. A shallow dish of water with a few stones for bees to land on gets plenty of visitors in a dry August.</p>
<h2>A note on "bee-friendly" plants from the store</h2>
<p>Some nursery plants are labeled as good for pollinators but are double-flowered varieties bred for extra petals. Many double flowers have little or no pollen or nectar that bees can reach. When choosing ornamentals, look for single flowers with an open center where you can see the pollen, like single dahlias, cosmos and asters. And if you can, ask the nursery whether plants were treated with systemic insecticides, which can end up in the pollen and nectar.</p>`
  },
  {
    slug: "winter-cover-crops",
    topic: "soil", icon: "cover-crop",
    author: "elaine-holloway",
    title: "Winter Cover Crops for Northwest Vegetable Beds",
    description: "Crimson clover, fava beans or cereal rye sown in early fall hold bare soil through the winter rain and feed it by spring.",
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
<h2>How much seed, and how to sow it</h2>
<p>Cover crop seed is sold by the pound at farm stores and many garden centers, and some seed companies sell small bags of mixes for home gardens. Seeding rates are printed on the bag, and it's worth following them, but as a rough guide small-seeded crops like crimson clover go on thinly, a few ounces per 100 square feet, while large seeds like favas and peas need several times that by weight. A 4 by 8 foot raised bed doesn't need much of anything.</p>
<p>Legume seed often comes with, or can be bought with, an "inoculant": a powder containing the soil bacteria that form nodules on legume roots and capture nitrogen from the air. In beds where peas, beans or clover have grown before, the bacteria are usually already there. In a new bed, inoculating is cheap insurance. Dampen the seed slightly, toss it with the powder and sow right away.</p>
<h2>How much nitrogen do you really get?</h2>
<p>Legumes don't make nitrogen from nothing. The bacteria in their root nodules pull it from the air, and the plant stores it in its leaves and stems. If you dig up a healthy fava or pea plant in spring, the little pink nodules on the roots are a good sign the bacteria are working. Most of the nitrogen is in the green growth, not the roots, so it only reaches next year's crops if you turn the tops back into the soil or compost them. Let the plants grow as long as you can before cutting them; a cover crop cut in February has much less to give than one cut in April.</p>
<h2>Turning it under in spring</h2>
<p>Cut or turn the cover crop under in spring, ideally when legumes start to flower and before any of it sets seed. Chop it with a spade or cut it at the base, then dig or fork it into the top few inches of soil. Give it two to three weeks to break down before planting. Fresh green material can tie up nitrogen and get in the way of small seeds for a short time, and rotting plant matter attracts seedcorn maggots, which tunnel into bean, corn and squash seeds.</p>
<p>If digging a whole bed sounds like too much work, there's a no-dig option. Cut the cover crop at ground level, leave the cut plants lying on the surface as mulch, and plant transplants through it. This works best with crops that don't regrow after cutting, like favas and peas cut in flower. Cereal rye regrows if cut too early, so cut it once it has headed out, or pull it.</p>
<p>Be ready to deal with it on time. Cereal rye left too long gets chest-high and woody, and crimson clover that goes to seed will come back as a weed. In a wet Northwest spring the soil can stay too soggy to dig for weeks, so many gardeners cut their cover crop in March or early April and let it lie, then dig it in once the soil dries.</p>
<p>No room for a cover crop? A thick layer of shredded leaves or straw over the bed also protects the soil through winter. Garlic, which goes in each fall, can share space with mulch too. See <a href="${link("articles/planting-garlic-in-the-northwest/")}">how to plant garlic</a>.</p>`
  },
  {
    slug: "watering-vegetables-in-dry-summers",
    topic: "soil", icon: "watering",
    author: "elaine-holloway",
    title: "How Much to Water Vegetables in a Dry Northwest Summer",
    description: "Northwest summers are close to rainless from July to September. How much vegetables need each week, and drip, soaker hose or hand watering.",
    crops: ["tomatoes", "summer-squash", "beans", "lettuce", "cucumbers"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>If you've just moved to the Northwest, summer is a surprise. You spend November to May wondering if it will ever stop raining, and then sometime in early July it just does. July and August are usually among the driest months of the year, west of the Cascades and even more so east of them, and your vegetables are growing their fastest exactly when the rain disappears.</p>
<p>If you've gardened here a while, you probably know the other side of it too: the tomato that cracked after a heavy soak, the lettuce that bolted in a week of heat, the squash leaves flopping at 4 p.m. and perking up by morning. Most of those come down to how, and how evenly, the garden gets watered.</p>
<h2>How much</h2>
<p>A common rule of thumb is about an inch of water a week for an established vegetable garden, from rain and watering combined. Hot spells, sandy soil, windy sites and the dry east side all push that number up. Large, fruiting plants like squash and tomatoes drink more than small leafy crops.</p>
<p>Don't rely on the rule alone. Push a finger or a trowel two or three inches into the soil next to your plants. If it's dry at that depth, it's time to water.</p>
<h2>What does "an inch" look like?</h2>
<p>Most of us have no idea how much water our sprinkler or hose actually puts down, and it's easy to find out. Set a few empty tuna cans or other straight-sided containers around the bed, run your sprinkler as usual, and time how long it takes for them to fill to an inch. You may be surprised: many people find their usual 15-minute evening watering puts down only a fraction of that.</p>
<p>For soaker hoses and drip lines, the can trick doesn't work, so check the soil instead. Water as usual, wait an hour, then dig a small hole a few inches from a plant. If the soil is moist 6 inches down, you watered deeply enough. If it's dry below the top inch or two, run it longer next time. Once you know, write the time down, and you won't have to guess again.</p>
<p>As a rough guide, an inch of water over a 4 by 8 foot bed is about 20 gallons.</p>
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
<h2>Reading your plants</h2>
<p>Plants tell you a lot if you look at the right time of day. Big-leaved crops like squash, cucumbers and even tomatoes often droop in hot afternoon sun even when the soil is moist; the leaves are just losing water faster than the roots can take it up. If they've perked up by the next morning, they're fine. If they're still drooping at breakfast time, they need water.</p>
<p>Overwatering is less common in summer but it does happen, especially in heavy clay soil or pots without good drainage. Yellowing lower leaves, soil that stays soggy for days, and plants that wilt even though the soil is wet all point to roots that are short of air. Let the soil dry out a bit between waterings.</p>
<h2>Pots and containers</h2>
<p>Containers are the exception to "water less often." The small amount of soil in a pot dries out quickly, and in a July heat wave a tomato in a pot may need water every day, sometimes twice. Water until it runs out the bottom. Bigger pots dry out more slowly, so go for the largest you have room for, and group pots together so they shade each other. Our <a href="${link("articles/container-vegetable-gardening/")}">container gardening guide</a> has more.</p>
<h2>When a heat wave hits</h2>
<p>Northwest heat waves can push temperatures well past 100°F, even west of the Cascades. Before one arrives, give the whole garden a deep soak and top up the mulch. Water early in the morning during the hot spell, not in the heat of the afternoon. Shade cloth, an old sheet on stakes, or even a patio umbrella can protect lettuce, young transplants and anything newly planted from the worst of the afternoon sun. Expect tomatoes and peppers to drop some flowers when it's very hot; they'll set fruit again when it cools down.</p>
<p>Watering is one job in the <a href="${link("garden-calendar/")}">monthly garden calendar</a>, along with everything else to do each summer month.</p>`
  },
  {
    slug: "raised-beds-for-rainy-gardens",
    topic: "soil", icon: "raised-bed",
    author: "elaine-holloway",
    title: "Raised Beds for Rainy Northwest Gardens",
    description: "Raised beds drain after winter rain and warm up sooner in spring. Sizes, depth, what to fill them with, and lumber choices.",
    crops: ["tomatoes", "carrots", "lettuce", "garlic", "strawberries"],
    published: "2026-10-14",
    gardenPhoto: "janelle-raised-beds",
    body: ({ link }) => `
<p>Ask Northwest gardeners for one piece of advice and many will say: build raised beds. If you've ever tried to dig a vegetable bed in April and pulled up a spadeful of cold, gray clay that stuck to your boots, you already know why. Our long, wet winters and springs leave ordinary garden soil soggy and cold for weeks. A raised bed drains faster and warms sooner, which can mean planting earlier and losing fewer seeds to rot.</p>
<p>They're also just easier on you. Less bending, fewer weeds, a clear edge between "garden" and "lawn," and soil that stays loose enough to plant with your hands.</p>
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
<p>Pressure-treated lumber is a common question. The old arsenic-based treatment (CCA) was phased out of wood sold for home use in the early 2000s, and today's treated lumber uses copper-based preservatives instead. Many university Extension services consider modern treated wood acceptable for vegetable beds, though some gardeners still prefer to avoid it or line the inside with heavy plastic. If you're reusing old lumber of unknown age, leave it out of the vegetable garden.</p>
<h2>Before you fill: what goes underneath</h2>
<p>Set the bed where you want it, then deal with what's under it. If it's sitting on lawn, lay flattened cardboard (tape and labels removed) over the grass inside the frame and soak it. It smothers the grass and breaks down within a season. Avoid landscape fabric under vegetable beds; it stops roots from going deeper and gets tangled in your spade later.</p>
<p>If moles or gophers are a problem in your area, staple galvanized hardware cloth (a stiff wire mesh, not chicken wire) across the bottom of the frame before filling. It's far easier to do now than after the bed is full.</p>
<p>If you can, loosen the native soil under the bed with a garden fork first, even in clay. Roots will go down into it over time, and it helps the bed drain.</p>
<h2>What to fill them with</h2>
<p>A blend of good topsoil and compost works well. Many garden suppliers in the region sell a ready-made "vegetable garden mix." Avoid filling beds with pure compost or with bagged potting mix alone: pure compost can be too rich and settles a lot, and potting mix is made for containers and gets expensive in volume.</p>
<p>Expect the soil level to drop a few inches in the first year as it settles. Top up with compost each spring or fall.</p>
<h2>How much soil will you need?</h2>
<p>More than most people expect. Multiply length by width by depth in feet to get cubic feet. A 4 by 8 foot bed filled 1 foot deep holds 32 cubic feet, a bit more than a cubic yard. Bagged soil usually comes in 1 or 1.5 cubic foot bags, so that's 20 to 30 bags for one bed. If you're filling more than one or two beds, it's usually much cheaper to order bulk soil by the cubic yard (27 cubic feet) from a local landscape supply and have it delivered or pick it up in a truck.</p>
<p>Ask the supplier what's in their vegetable mix and whether it's been screened. A good mix looks dark and crumbly and doesn't smell sour. If it's mostly fine bark or wood, it may tie up nitrogen for the first season, so add a balanced fertilizer when you plant.</p>
<h2>Common mistakes</h2>
<ul>
<li><strong>Too wide.</strong> If you have to step in the bed to reach the middle, you'll compact the soil you built it to protect.</li>
<li><strong>Too shady.</strong> Most vegetables need at least six hours of direct sun; tomatoes and squash want eight or more.</li>
<li><strong>Forgetting water.</strong> Raised beds drain well, which also means they dry out faster in summer. Lay a soaker hose or drip line before you plant. See <a href="${link("articles/watering-vegetables-in-dry-summers/")}">how much to water</a>.</li>
</ul>
<h2>Taller beds</h2>
<p>If kneeling or bending is hard on your back or knees, consider beds 24 to 30 inches tall, with a ledge wide enough to sit on. You won't need to fill the whole depth with expensive garden soil: many people fill the bottom third with cheaper fill soil, then top with a foot or more of good vegetable mix. Tall beds dry out even faster than low ones in summer, so plan for drip irrigation from the start.</p>
<p>New to all this? The <a href="${link("beginners-guide/")}">beginner's guide</a> walks through a first raised-bed garden step by step.</p>`
  },
  {
    slug: "growing-potatoes-in-the-northwest",
    topic: "crops",
    author: "jigmey-dorjee",
    title: "Growing Potatoes in Oregon, Washington and Idaho",
    description: "Seed potatoes, cutting and curing them, hilling, and digging both new potatoes and keepers in Oregon, Washington and Idaho.",
    crops: ["potatoes"],
    published: "2026-10-14",
    body: ({ D, P, link }) => {
      const pdx = win(D, P, "portland-or", "potatoes"), spo = win(D, P, "spokane-wa", "potatoes"), bend = win(D, P, "bend-or", "potatoes"), boi = win(D, P, "boise-id", "potatoes");
      return `
<p>Potatoes are one of the most productive crops you can grow in a small space, and they like the Northwest's cool spring weather. Digging them up is like a treasure hunt, which makes them a favorite with kids. And if you've only ever eaten store-bought potatoes, a freshly dug new potato boiled with a little butter and salt is a revelation.</p>
<p>The Northwest knows potatoes. Idaho is famous for them, and Washington and Oregon grow huge crops too, mostly in the irrigated, sunny basins east of the Cascades. You don't need a farm, though. A single raised bed, or even a few big grow bags on a patio, can give you a surprising amount.</p>
<h2>Early, mid or late?</h2>
<p>Seed potato catalogs sort varieties by how long they take. Early varieties are ready in roughly 70 to 90 days and are the ones to grow for new potatoes in June and July, or where summers are short. Midseason and late varieties take longer, but give bigger yields and usually store better through winter.</p>
<p>Texture matters too. Yukon Gold and other yellow-fleshed potatoes are all-purpose, good boiled, roasted or mashed. Russets are dry and fluffy, the classic baker and fry potato. Red-skinned and fingerling potatoes are waxy and hold their shape in potato salad. If you have the room, plant a couple of kinds; homegrown fingerlings and colored varieties are expensive in the store.</p>
<h2>When to plant</h2>
<p>Potatoes go in during spring, a few weeks before the last frost, once the soil can be worked and isn't soggy. The shoots can be nipped by a late frost, but the plants usually regrow from below ground.</p>
<ul>
<li><strong>Portland:</strong> ${pdx.range}. <a href="${link("when-to-plant/potatoes/?town=portland-or#your-town")}">Details</a>.</li>
<li><strong>Spokane:</strong> ${spo.range}.</li>
<li><strong>Boise:</strong> ${boi.range}.</li>
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
<p>Let storage potatoes cure in a dark, airy spot for a week or two, then store them somewhere cool, dark and humid. Around 40 to 45°F is ideal: an unheated garage or basement often works through a Northwest winter. Colder than that, as in a fridge, and potatoes slowly turn some of their starch to sugar, which makes them taste sweet and brown too much when fried. Keep them away from onions and out of the light, and check them every few weeks for any that are going soft.</p>
<h2>Problems you might see</h2>
<p><strong>Late blight</strong>, the same disease that hits tomatoes, can turn potato leaves brown and slimy almost overnight in wet weather, and can spread to the tubers. If the tops get it, cut them off and bag them, wait two weeks, then dig. See <a href="${link("articles/tomato-late-blight/")}">late blight</a> for how to spot it.</p>
<p><strong>Scab</strong> leaves rough, corky patches on the skin. The potatoes are still fine to eat once peeled. It's worse in alkaline and dry soil, which is one reason not to lime a potato bed. Even watering while tubers form helps.</p>
<p><strong>Wireworms</strong>, thin, shiny, orange-brown larvae, drill narrow holes through tubers. They're especially common in beds that were lawn in the last couple of years. If you're turning grass into a garden, plant something else there for a year or two first, and dig potatoes promptly once they're ready.</p>
<p><strong>Flea beetles</strong> chew tiny holes in the leaves in early summer. Established plants usually shrug them off.</p>
<h2>Potatoes in bags and containers</h2>
<p>No bed space? Fabric grow bags of 10 gallons or more work well. Put a few inches of potting mix in the bottom, set two or three seed pieces on top, and cover with a few more inches. As the plants grow, add more mix to hill them, until the bag is nearly full. Water often, since bags dry out quickly. At harvest, just tip the bag out onto a tarp. It's the easiest potato digging you'll ever do, and there are no missed potatoes sprouting in the bed next year.</p>
<p>Rotate where you plant potatoes each year, and avoid following tomatoes, peppers or eggplant, which share some of the same diseases.</p>`;
    }
  },
  {
    slug: "container-vegetable-gardening",
    topic: "soil", icon: "container",
    author: "jigmey-dorjee",
    title: "Growing Vegetables in Containers on a Northwest Balcony or Patio",
    seoTitle: "Growing Vegetables in Pots on a Northwest Balcony or Patio",
    description: "A balcony is enough for herbs, greens and cherry tomatoes. Pot sizes, potting mix and the summer watering that pots need.",
    crops: ["tomatoes", "lettuce", "basil", "peppers", "strawberries", "kale"],
    published: "2026-10-14",
    body: ({ link }) => `
<p>You don't need a yard to grow food. If you live in an apartment in Seattle, a townhouse in Portland or a rental where you can't dig up the lawn, a sunny balcony, a patio or a strip of driveway can still produce a surprising amount of salad greens, herbs and tomatoes. There's something about stepping outside your door and cutting lettuce for dinner that never gets old.</p>
<p>Containers even have some advantages in the Northwest: they drain well in a wet spring, dark pots warm up faster than garden soil, and you can move them to follow the sun or dodge a cold night.</p>
<h2>Start with sun</h2>
<p>Sun matters more than anything else. Fruiting crops like tomatoes, peppers and cucumbers need at least six to eight hours of direct sun. Leafy greens and many herbs get by with four to six. A south- or west-facing balcony is ideal; a north-facing one is best for lettuce, parsley and mint.</p>
<p>Before you buy anything, spend a sunny day noting when sun actually reaches your space. Balconies are tricky: the floor above can shade the back half, railings cast shadows on low pots, and a building across the street can block the afternoon. Put sun-lovers right at the front edge or up on a stand, and keep the shadier spots for greens and herbs. In midsummer, a west-facing balcony with light walls can also get very hot in late afternoon, and that's when lettuce bolts and pots dry out fastest.</p>
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
<p>A few words on what pots are made of. Terracotta looks lovely but dries out fast, which is fine for rosemary and thyme but hard on tomatoes in August. Plastic and glazed pots hold water longer. Dark pots warm up in spring sun, which helps in May and can cook roots on a hot July afternoon, so shade the sides of dark pots in summer, or group them so they shade each other. If you're on a balcony, also think about weight: a big pot of wet soil is heavy, and some buildings have rules about it. Fabric bags and plastic are much lighter than ceramic.</p>
<h2>Use potting mix, not garden soil</h2>
<p>Garden soil packs down in a pot, drains poorly and can carry weeds and disease. Use a good-quality bagged potting mix. Refresh it each year by mixing in some compost, or replace it if plants struggled.</p>
<h2>Water and feed more often</h2>
<p>Containers dry out much faster than the ground, especially in July and August, and a big tomato in a pot may need water every day during a heat wave. Water until it runs out the bottom, then check again the next day. A saucer under the pot helps, but empty it after rain so roots don't sit in water.</p>
<p>Because frequent watering washes nutrients out of the pot, feed container vegetables regularly through the season with a balanced fertilizer, following the label.</p>
<h2>What a small space can actually grow</h2>
<p>It helps to be realistic. A balcony won't keep you in potatoes or winter squash, which need lots of room for a small harvest. Where containers shine is with crops you use a little of often and that are expensive or wilt quickly from the store: salad greens, herbs, cherry tomatoes, a few peppers. A couple of pots of basil and parsley will save you buying those little plastic clamshells all summer. One healthy cherry tomato in a big pot can give you a handful of tomatoes a day at the peak of summer.</p>
<p>Think vertically too. Pole beans, peas and cucumbers climb a trellis or the balcony railing and take very little floor space. Hanging baskets work for strawberries and trailing herbs.</p>
<h2>Through the seasons</h2>
<p>West of the Cascades, a container garden can run most of the year. Start lettuce, spinach and peas in pots in March, when the ground is still soggy. Move to tomatoes, peppers and basil after the soil warms in May. In late summer, sow kale, chard and more salad greens for fall, and they'll often keep going into winter in a sheltered spot against the house. In a hard freeze, push pots together against a wall or bring them into a garage for a few days, because roots in a pot get much colder than roots in the ground.</p>
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
