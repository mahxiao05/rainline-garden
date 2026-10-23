/* Articles bylined to Rainline Garden itself (author: "site"): general guides no one person wrote or checked.
 * Same fields as scripts/articles.js. Before adding one, check the other article files so it doesn't repeat them.
 */
module.exports = [
  {
    slug: "putting-the-garden-to-bed",
    topic: "soil", icon: "winter",
    author: "site",
    title: "Putting the Vegetable Garden to Bed for a Northwest Winter",
    description: "A fall cleanup list for wet western gardens and cold eastern ones: what to pull, what to leave standing, and how to protect the soil until spring.",
    crops: ["tomatoes", "potatoes", "dahlias", "rhubarb", "asparagus", "strawberries"],
    published: "2026-10-23",
    body: ({ frost, link }) => {
      const pdx = frost("portland-or"), spo = frost("spokane-wa");
      return `
<p>The first fall frost usually reaches Portland around ${pdx.first} and Spokane around ${spo.first}. Once it does, the summer crops are done, and a few hours of work in the garden pays back in spring: fewer diseases, fewer slugs and soil that's ready to plant.</p>
<p>Fall cleanup in the Northwest is mostly about one thing: the rain. West of the Cascades, bare soil spends the winter being pounded flat and washed of nutrients. East of the mountains the problem is cold and wind. Either way, the goal is the same. Clear out what spreads disease, leave what helps, and cover the ground.</p>
<h2>Pull out anything that was sick</h2>
<p>Tomato and potato plants that had late blight, squash leaves white with powdery mildew, and beans with rust or mold are the first to go. Many diseases spend the winter on dead leaves and stems, then splash back onto new plants in spring. Bag them for the yard-waste bin rather than your compost pile; a home pile rarely gets hot enough to kill them.</p>
<p>Dig every potato you can find, too. Small tubers left in the ground sprout next year as "volunteers" and can carry blight straight into the new season.</p>
<h2>Leave the healthy stuff standing</h2>
<p>A spotless garden isn't the goal. Healthy flower stalks, seed heads and hollow stems shelter native bees and other beneficial insects over winter, and birds pick through the seed heads. Sunflowers, zinnias, herbs gone to seed and perennial stalks can all wait until spring. Healthy vegetable plants can be chopped up and left on the bed as mulch, or added to the compost.</p>
<h2>Cover the soil</h2>
<p>Bare soil is the one thing to avoid. Rain crusts and compacts it, washes nutrients down past the roots, and invites weeds. Give every empty bed one of these:</p>
<ul>
<li><strong>Shredded leaves.</strong> Free, and the best winter blanket there is. Run a mower over them first so they don't mat into a slick layer. A few inches deep is plenty.</li>
<li><strong>Straw.</strong> Easy to rake off in spring. Look for weed-free straw, not hay, which is full of seeds.</li>
<li><strong>Compost.</strong> A thin layer on top, left for worms to pull in over winter. No digging needed.</li>
<li><strong>A cover crop,</strong> if you sow by early fall. Our <a href="${link("articles/winter-cover-crops/")}">cover crop guide</a> covers which ones and when.</li>
</ul>
<p>One caution for wet gardens: thick mulch also shelters slugs. On beds where you'll plant early lettuce or peas, pull the mulch back a few weeks before planting so the soil can dry and warm.</p>
<h2>Don't dig wet soil</h2>
<p>It's tempting to turn the beds over in fall, but working soggy Northwest clay squeezes out the air and leaves hard clods that last for months. If a handful of soil sticks together in a wet ball, stay off it. Most beds don't need fall digging at all; mulch and worms do the work.</p>
<h2>Perennials and tender plants</h2>
<ul>
<li><strong>Dahlias:</strong> wait until the first frost blackens the leaves, then cut the stems back. In well-drained beds in milder west-side gardens, many people leave the tubers in the ground under a thick mulch. In heavy clay, or anywhere the ground freezes hard, dig them, let them dry for a day or two, and store them somewhere cool and frost-free.</li>
<li><strong>Asparagus and rhubarb:</strong> cut back the dead foliage once it has yellowed and top the bed with compost.</li>
<li><strong>Strawberries:</strong> pull weeds and runners you don't want. In cold eastern and high desert gardens, a few inches of loose straw over the plants after the ground starts to freeze protects the crowns.</li>
<li><strong>East of the Cascades:</strong> if fall has been dry, water trees, shrubs and perennials deeply before the ground freezes. Dry roots are more easily killed by winter cold.</li>
</ul>
<h2>Small jobs before the cold</h2>
<ul>
<li>Drain and coil hoses, and shut off or insulate outdoor taps before the first hard freeze.</li>
<li>Empty clay and ceramic pots or move them under cover; wet pots crack when they freeze.</li>
<li>Clean tools, sharpen the shovel and wipe metal with a little oil.</li>
<li>Send off a soil test. Fall is a good time to add lime if a test says you need it, because it takes months to work.</li>
<li>Write down what grew well and what didn't, while you still remember.</li>
</ul>
<p>And if there's still room in a bed, it isn't too late to plant <a href="${link("when-to-plant/garlic/")}">garlic</a>. It's the one crop that goes in just as everything else comes out.</p>`;
    }
  },
  {
    slug: "planting-bare-root-fruit-trees",
    topic: "crops",
    author: "site",
    title: "How to Plant Bare-Root Fruit Trees in the Northwest",
    description: "Late winter is fruit tree season. How to choose, store and plant a bare-root apple, pear, plum or cherry so it gets off to a strong start.",
    crops: ["apples", "pears", "plums", "cherries", "peaches"],
    published: "2026-10-23",
    body: ({ link }) => `
<p>Every late winter, nurseries across Oregon and Washington fill with bundles of leafless young trees with their roots wrapped in damp sawdust. These bare-root trees are the cheapest way to start an orchard, there's a far bigger choice of varieties than in summer, and they often establish faster than potted trees because their roots go straight into your soil.</p>
<p>The catch is timing. A bare-root tree has to be planted while it's dormant, so the season is short: roughly late January to March west of the Cascades, and from when the ground thaws until early spring east of the mountains.</p>
<h2>Before you buy</h2>
<ul>
<li><strong>Pick disease-resistant varieties.</strong> Wet Northwest springs spread scab on apples, leaf curl on peaches and brown rot on stone fruit. Each tree's page lists varieties that hold up here, such as <a href="${link("when-to-plant/apples/")}">Liberty apples</a> and <a href="${link("when-to-plant/peaches/")}">curl-resistant peaches</a>.</li>
<li><strong>Check pollination.</strong> Many apples, pears, sweet cherries and plums need a second, compatible variety flowering at the same time nearby. A neighbor's tree within a block or so often counts. Self-fertile varieties fix the problem if you only have room for one.</li>
<li><strong>Choose the rootstock.</strong> The rootstock decides how big the tree gets. Dwarf and semi-dwarf trees can be pruned, netted and picked from the ground, and they start bearing sooner. Full-size trees need a lot of room and a ladder.</li>
<li><strong>Look at the roots.</strong> They should be firm, plentiful and moist, not dried out, slimy or broken. A good tree has more roots than you'd expect.</li>
</ul>
<h2>Bringing it home</h2>
<p>Never let bare roots dry out, even for an hour in the wind. If you can't plant right away, keep the roots wrapped and damp in a cool, shaded spot, or "heel in" the tree: lay it at an angle in a shallow trench and cover the roots with soil or mulch. It will keep that way for a few weeks.</p>
<p>Just before planting, soak the roots in a bucket of water for a few hours. Trim off any broken or damaged root ends with clean pruners.</p>
<h2>Planting step by step</h2>
<ol>
<li><strong>Choose the spot.</strong> Full sun, good air movement and soil that drains. A tree standing in winter-wet clay often declines and dies within a few years. If water sits in the hole after rain, plant on a low, wide mound instead.</li>
<li><strong>Wait for workable soil.</strong> Not frozen, and not so wet it smears. A week's delay is better than planting in mud.</li>
<li><strong>Dig wide, not deep.</strong> Make the hole about twice as wide as the spread roots and only as deep as they need. Rough up the sides so roots can push out into the surrounding soil.</li>
<li><strong>Set the height.</strong> Build a small cone of soil in the bottom, spread the roots over it, and check that the graft union (the knobby bend low on the trunk) sits a few inches above the soil line. Buried, the top variety can root and the dwarfing effect is lost.</li>
<li><strong>Backfill with the soil you dug out.</strong> Skip rich compost or potting mix in the hole: roots tend to stay in the soft pocket instead of spreading. Firm the soil gently as you go to remove air pockets.</li>
<li><strong>Water it in</strong> slowly and deeply, even if the ground is already damp. This settles soil around the roots.</li>
<li><strong>Mulch</strong> a wide circle with wood chips or leaves, keeping it a hand's width away from the trunk.</li>
</ol>
<h2>After planting</h2>
<p>Stake only if the site is windy or the tree is top-heavy, with a loose, flexible tie, and remove the stake after a year. Many growers cut a young unbranched tree (a "whip") back to about knee to waist height at planting to encourage low branches; a branched tree only needs any damaged or crossing branches removed.</p>
<p>The first summer is the hardest. A new tree has a small root system and needs a deep soaking about once a week through dry spells, especially in the long rainless stretch from July to September. In sunny eastern and high desert gardens, painting the trunk with white latex paint diluted half and half with water helps prevent winter sunscald.</p>
<p>Expect a few years before a real harvest: often two to four for dwarf apples and longer for full-size trees. Picking off the first fruits in the first year or two lets the tree put its energy into roots and branches.</p>`
  },
  {
    slug: "growing-raspberries-in-the-northwest",
    topic: "crops",
    author: "site",
    title: "Growing Raspberries in the Northwest",
    description: "Summer-bearing or fall-bearing, how to plant canes so they don't drown in winter, and the pruning that keeps a raspberry patch productive for years.",
    crops: ["raspberries"],
    published: "2026-10-23",
    body: ({ link }) => `
<p>Raspberries love the Northwest. Cool nights, mild summers and long days suit them so well that northwest Washington grows a large share of the country's red raspberries. A home patch planted well can produce for ten years or more.</p>
<p>The two things that decide success are drainage and pruning. Get those right and raspberries are one of the most rewarding fruits you can grow here.</p>
<h2>Summer-bearing or fall-bearing?</h2>
<p>Raspberry canes live for two years. In the first year a new cane grows tall and leafy; in the second it fruits and then dies. That cycle gives two main types:</p>
<ul>
<li><strong>Summer-bearing</strong> (floricane) raspberries fruit once, in late June and July, on last year's canes. They give the biggest single crop. Meeker and Tulameen are long-time Northwest favorites, and Cascade Delight was bred to handle wetter soils.</li>
<li><strong>Fall-bearing</strong> (primocane or everbearing) raspberries fruit in late summer and fall on the tips of this year's canes. Heritage and Caroline are common picks. They're simpler to prune, and the late crop misses the July glut. In the coolest coastal and mountain gardens, fall rain and early frost can cut the harvest short.</li>
</ul>
<p>Many gardeners plant some of each to stretch the season from early summer to the first frost.</p>
<h2>Drainage comes first</h2>
<p>The main killer of raspberries in western Oregon and Washington is root rot, a soil-borne disease that thrives in roots sitting in wet, heavy soil over winter. Canes wilt and die in patches, often in the second or third year.</p>
<p>The fix is to plant where water never stands, and to raise the rows. A mounded row or raised bed 8 to 12 inches high, with plenty of compost mixed in, keeps the crowns out of the winter wet. If you've lost raspberries before in the same spot, start a new row somewhere else.</p>
<h2>Planting</h2>
<p>Plant bare-root canes or potted plants in early spring, about 2 to 3 feet apart in a row, with rows 6 to 8 feet apart so you can walk and pick between them. Set them at the same depth they grew in the nursery, water well, and cut bare-root canes back to about 6 inches to push new growth from the roots. Raspberries spread by underground runners, so give the row an edge you can mow along. Full sun gives the sweetest berries.</p>
<h2>A simple trellis</h2>
<p>Canes flop when they're loaded with fruit. Two wires running down each side of the row, held about 3 to 4 feet up on posts or crossbars, keep canes upright and berries off the ground. Put the trellis in when you plant; it's much harder to add later.</p>
<h2>Pruning, the easy way</h2>
<p><strong>Summer-bearing:</strong> right after harvest, cut every cane that just fruited down to the ground. They're easy to spot: grayer, with dried fruiting stems. Leave the green new canes. In late winter, thin those to the strongest canes, about 4 to 6 inches apart, and trim tips that have grown above the trellis.</p>
<p><strong>Fall-bearing:</strong> in late winter, cut all canes to the ground. You'll get one fall crop on the new growth, with no sorting of old and new canes. (You can instead leave the lower parts of the canes for a small early-summer crop too, but most home growers prefer the simple mow-down.)</p>
<h2>Feeding, watering and pests</h2>
<p>Spread compost along the row each spring. Raspberries are shallow-rooted, so they need steady water from flowering through harvest: a soaker hose or drip line under mulch is ideal, and keeping the leaves dry helps prevent fruit mold.</p>
<p>The main fruit pest is spotted wing drosophila, a tiny fruit fly that lays eggs in ripening berries. Pick every day or two during harvest, don't leave overripe or fallen berries in the patch, and refrigerate what you pick straight away. Birds are the other thieves; light netting over the row helps in heavy years.</p>
<p>See the <a href="${link("when-to-plant/raspberries/")}">raspberry planting guide</a> for planting dates in your town.</p>`
  },
  {
    slug: "cabbage-worms-and-aphids",
    topic: "problems",
    author: "site",
    title: "Cabbage Worms and Aphids on Kale, Broccoli and Cabbage",
    description: "The two pests that chew and crowd Northwest cabbage-family crops, how to spot them early, and how to keep them off without harsh sprays.",
    crops: ["kale", "broccoli", "cabbage", "brussels-sprouts", "collards", "cauliflower"],
    published: "2026-10-23",
    body: ({ link }) => `
<p>Kale, broccoli, cabbage and their relatives are some of the easiest crops in a Northwest garden, and two pests know it. Green caterpillars chew holes through the leaves in summer, and gray aphids pack the undersides of leaves and the inside of Brussels sprouts by fall. Both are easy to manage if you catch them early.</p>
<h2>Cabbage worms</h2>
<p>If small white butterflies are flitting around your garden in summer, they're almost certainly cabbage whites, and they're laying eggs on your cabbage-family plants. The eggs hatch into velvety green caterpillars that match the leaves so well you'll usually see the damage first: ragged holes, chewed edges and small dark green droppings in the leaf joints and broccoli heads. Cabbage loopers, pale green caterpillars that arch their backs as they move, cause the same kind of damage.</p>
<p><strong>What works:</strong></p>
<ul>
<li><strong>Row cover from day one.</strong> A lightweight fabric row cover laid over the plants at planting and tucked in at the edges keeps the butterflies from ever laying eggs. Cabbage-family crops don't need bees to pollinate them, so the cover can stay on all season. This one step prevents most of the problem.</li>
<li><strong>Look and pick.</strong> Check the undersides of leaves and the centers of plants once or twice a week. Squash the caterpillars and the tiny pale yellow, bullet-shaped eggs.</li>
<li><strong>Bt if needed.</strong> Sprays of Bt (<em>Bacillus thuringiensis</em>, kurstaki strain) are a bacterium that only affects caterpillars that eat treated leaves. It's widely used by organic growers. Spray the leaf undersides, and reapply after rain.</li>
</ul>
<h2>Aphids</h2>
<p>The cabbage aphid is a small, gray-green insect with a powdery, waxy coat. It lives in dense colonies on the undersides of leaves and in the growing tips, and leaves curl and pucker around it. It's at its worst in late summer and fall, just as winter kale and Brussels sprouts are sizing up, and a bad colony can work its way into every sprout.</p>
<p><strong>What works:</strong></p>
<ul>
<li><strong>Catch it early.</strong> Turn over leaves every week from midsummer. A single colony is easy to deal with; a plant-wide outbreak isn't. Pull off and bag heavily infested leaves.</li>
<li><strong>A hard spray of water</strong> knocks aphids off and many don't make it back. Repeat every few days.</li>
<li><strong>Let the predators work.</strong> Ladybugs and their larvae, lacewings, hoverfly larvae and tiny parasitic wasps all eat aphids. If you see bloated, tan "mummy" aphids, the wasps are already on the job. Broad-spectrum insecticides kill these helpers along with the pests and often make aphids worse a few weeks later.</li>
<li><strong>Insecticidal soap</strong> works on contact, so it has to hit the aphids directly, including under leaves. Several applications may be needed. Avoid spraying in hot sun.</li>
<li><strong>Go easy on nitrogen.</strong> Lush, heavily fertilized growth is exactly what aphids like best.</li>
</ul>
<h2>Plan around them</h2>
<p>Spring plantings often finish before either pest builds up, which is one more reason to plant on time; see the <a href="${link("when-to-plant/broccoli/")}">broccoli</a> and <a href="${link("when-to-plant/kale/")}">kale</a> guides for your dates. For summer-planted fall and winter crops, put row cover on at planting. At the end of the season, pull out spent cabbage-family plants rather than leaving them all winter, since aphids can overwinter on old stems, especially in mild west-side gardens.</p>
<p>And don't panic over a few holes. Kale with some chewed leaves still tastes the same, and a quick soak in salty water before cooking draws out any caterpillars hiding in broccoli heads.</p>`
  }
];
