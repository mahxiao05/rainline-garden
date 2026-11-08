/* DRAFTS, not built. Bylined articles stay here until the named author has read and approved them (max's byline rule:
 * a named author only on pieces they wrote or checked). To publish one: move it into an articles-*.js file that build.js
 * loads, set `published` to the day it goes live, and add a photo in scripts/photos.js.
 * No made-up personal stories or quotes: the authors can add their own notes when they review.
 */
module.exports = [
  {
    slug: "improving-clay-soil",
    topic: "soil", icon: "soil-ph",
    author: "elaine-holloway",
    title: "Improving Heavy Clay Soil in a Northwest Garden",
    seoTitle: "How to Improve Clay Soil in the Northwest | Rainline Garden",
    description: "Sticky in winter, hard as brick in August: clay is a common garden soil west of the Cascades. How to tell if you have it, and how to make it easier to grow in.",
    crops: ["kale", "summer-squash", "potatoes", "carrots"],
    published: "DRAFT",
    body: ({ link }) => `
<p>Many Northwest gardens sit on clay, especially in the Willamette Valley and around Puget Sound. Clay stays wet and cold into late spring, turns sticky when you dig it, and bakes hard in a dry summer. It also has real strengths: it holds nutrients and water far better than sandy soil. The goal isn't to replace it, but to open it up so air, water and roots can move through it.</p>
<h2>Do you have clay?</h2>
<ul>
<li><strong>The squeeze test.</strong> Take a handful of moist soil and squeeze it. Clay holds a shape, feels smooth or sticky, and smears when you rub it between your fingers. Sandy soil feels gritty and falls apart.</li>
<li><strong>The ribbon test.</strong> Push moist soil between your thumb and finger into a flat ribbon. The longer the ribbon before it breaks, the more clay you have.</li>
<li><strong>The drainage test.</strong> Dig a hole about a foot deep, fill it with water, let it drain, then fill it again. If the second filling is still there hours later, drainage is poor.</li>
</ul>
<h2>Add organic matter, every year</h2>
<p>Organic matter is the one fix that works. Compost, leaf mold and aged manure coat clay particles and feed the worms and soil life that build crumbly structure. Spread 2 to 3 inches over the bed and mix it into the top several inches when the soil is workable, then add an inch or so each year after that as a top layer. See <a href="${link("articles/composting-in-a-rainy-climate/")}">making compost in a rainy garden</a> and <a href="${link("articles/leaf-mold-from-fall-leaves/")}">leaf mold from fall leaves</a> for free sources.</p>
<p><strong>Skip the sand.</strong> Adding a little sand to clay can make it denser, not lighter. It would take a very large amount to change the texture, and organic matter does the job better.</p>
<h2>Work it only when it's ready</h2>
<p>Digging or walking on wet clay squeezes the air out and leaves hard clods that can last for months. Before you dig in spring, squeeze a handful: if it stays in a sticky ball, wait; if it crumbles when you poke it, go ahead. Lay boards or stepping stones in beds you have to reach into, and keep paths separate from growing areas so the same soil isn't packed down year after year.</p>
<h2>Keep it covered</h2>
<p>Bare clay crusts over in winter rain and cracks in summer sun. Keep a layer on it all year: mulch around plants in summer and a <a href="${link("articles/winter-cover-crops/")}">winter cover crop</a> or a layer of leaves in fall. Cover crop roots also open channels through the soil as they grow and rot.</p>
<h2>Raise the beds where water stands</h2>
<p>If water sits on the surface after winter rain, plant above it. Mounded rows or <a href="${link("articles/raised-beds-for-rainy-gardens/")}">raised beds</a> drain sooner and warm up earlier in spring. Loosen the clay underneath before filling a raised bed, so roots and water can keep going down instead of hitting a hard layer.</p>
<h2>Choose plants that cope</h2>
<p>Many plants do well in improved clay: kale, cabbage, broccoli, <a href="${link("when-to-plant/summer-squash/")}">squash</a>, beans and most fruit once drainage is sorted. Root crops like <a href="${link("when-to-plant/carrots/")}">carrots</a> and parsnips struggle in heavy soil and grow forked or stunted; grow shorter varieties or put them in a raised bed. <a href="${link("when-to-plant/potatoes/")}">Potatoes</a> are often planted in a new clay bed because digging them up loosens the soil.</p>
<p>Clay improves slowly, over a few seasons, not one. Each year of added organic matter, covered soil and careful digging makes it darker, looser and easier to plant.</p>`
  },
  {
    slug: "growing-peppers-in-the-northwest",
    topic: "crops",
    author: "jigmey-dorjee",
    title: "Growing Peppers in a Cool Northwest Summer",
    seoTitle: "How to Grow Peppers in the Pacific Northwest | Rainline Garden",
    description: "Peppers want more heat than most Northwest summers give. How to time them, which kinds ripen here, and the tricks that get a real crop west and east of the Cascades.",
    crops: ["peppers", "tomatoes"],
    published: "DRAFT",
    body: ({ frost, link }) => {
      const pdx = frost("portland-or"), sea = frost("seattle-wa"), boi = frost("boise-id");
      return `
<p>Peppers are one of the trickier crops in the Northwest. They need warm soil and warm nights even more than tomatoes, and a cool, cloudy June can stop them in their tracks. East of the Cascades and in southern Idaho, hot summers suit them well. West of the Cascades, they need good timing, the right varieties and some extra warmth.</p>
<h2>Start them early, plant them late</h2>
<p>Peppers are slow from seed, so start them indoors about 8 to 10 weeks before they'll go outside. They germinate best on a heat mat; on a cool windowsill seeds can take weeks to sprout. See <a href="${link("articles/starting-seeds-indoors/")}">starting seeds indoors</a> for the setup.</p>
<p>The bigger mistake is planting out too early. The typical last frost is ${pdx.last} in Portland, ${sea.last} in Seattle and ${boi.last} in Boise, but peppers want more than frost-free nights. Wait until nights stay above about 50°F and the soil has warmed, which is often weeks after the last frost west of the Cascades. A pepper chilled after planting can sit for weeks without growing. <a href="${link("articles/hardening-off-seedlings/")}">Harden them off</a> first. Check <a href="${link("when-to-plant/peppers/")}">pepper dates for your town</a>.</p>
<h2>Pick varieties that ripen in time</h2>
<ul>
<li><strong>Smaller fruit ripens sooner.</strong> Small and medium peppers, including many hot peppers, turn color faster than big blocky bell peppers.</li>
<li><strong>Read the days to maturity.</strong> The number on the seed packet is counted from transplanting. West of the Cascades, choose ones listed as early.</li>
<li><strong>Green is an option.</strong> Every pepper is edible green. If fall comes before they turn red, pick them green.</li>
</ul>
<h2>Give them extra heat</h2>
<ul>
<li><strong>Plant in your warmest spot,</strong> such as against a south- or west-facing wall or fence, where reflected heat adds up.</li>
<li><strong>Warm the soil first.</strong> Laying black plastic or landscape fabric over the bed a week or two before planting raises soil temperature.</li>
<li><strong>Use covers early on.</strong> Row cover, cloches or a mini hoop tunnel for the first few weeks protects young plants from cold nights and wind.</li>
<li><strong>Try containers.</strong> Dark pots on a sunny patio warm up quickly, and peppers do well in them (see <a href="${link("articles/container-vegetable-gardening/")}">growing in containers</a>).</li>
</ul>
<h2>Watering and feeding</h2>
<p>Keep the soil evenly moist; peppers stressed by drought can drop flowers and get dark sunken spots on the fruit's bottom (blossom end rot). Mulch once the soil is warm. Go easy on nitrogen fertilizer, which gives big leafy plants with few peppers. Very hot spells in eastern gardens can also make plants drop flowers; they usually set fruit again when it cools.</p>
<h2>Harvest before the cold</h2>
<p>Pick peppers with a knife or pruners rather than pulling, which can break branches. As fall approaches, pinch off new flowers about a month before your first frost so the plant puts its energy into fruit already set. Pick everything before the first frost; peppers are damaged by temperatures near freezing.</p>`;
    }
  }
];
