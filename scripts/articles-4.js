/* Articles bylined to Rainline Garden itself (author: "site"): general guides no one person wrote or checked.
 * Same fields as scripts/articles.js. Before adding one, check the other article files so it doesn't repeat them.
 */
module.exports = [
  {
    slug: "leaf-mold-from-fall-leaves",
    topic: "soil", icon: "leaves",
    author: "site",
    title: "Turning Fall Leaves into Leaf Mold and Mulch",
    description: "The leaves piling up in your yard every October are the best free soil builder there is. How to make leaf mold, which leaves to use, and where to put it.",
    crops: ["blueberries", "garlic", "rhubarb", "lettuce"],
    published: "2026-10-23",
    body: ({ link, fig }) => `
<p>If you have a big tree in your yard, you know the routine. Sometime in late October you rake for an afternoon, fill the yard-waste bin, rake some more, and wonder where you'll put the rest. Here's a better idea: keep them.</p>
<p>Every fall, Northwest yards and streets fill with maples, oaks and alders dropping their leaves, and plenty of them end up in yard-waste bins. That's a lot of free organic matter leaving the garden. With a little patience, those same leaves turn into leaf mold: a dark, crumbly, earthy-smelling material that holds water like a sponge and makes heavy soil easier to work.</p>
<p>Leaf mold isn't the same as compost. Compost is made mostly by bacteria, needs a mix of greens and browns, and works best when it heats up. Leaf mold is made slowly by fungi, needs nothing but leaves and water, and never has to be turned. Our wet, mild winters west of the Cascades are close to ideal for it.</p>
<h2>Which leaves to use</h2>
<ul>
<li><strong>Good:</strong> maple, alder, birch, ash, cherry, linden and fruit tree leaves break down fastest. Oak and beech leaves work too, but take a year or two longer.</li>
<li><strong>Use sparingly:</strong> bigleaf maple leaves are huge and mat into a waterproof layer unless shredded first.</li>
<li><strong>Leave out:</strong> black walnut leaves, which carry a compound that stunts tomatoes and other plants; laurel and holly, which are thick and waxy and take years; and any leaves that were sprayed or came from beside a busy road. Conifer needles break down very slowly, so keep them to a small share of the pile.</li>
<li><strong>Diseased leaves:</strong> apple and pear leaves spotted with scab, and fallen fruit, are better bagged for the yard-waste bin, where commercial composting runs hot enough to kill disease.</li>
</ul>
<h2>Making leaf mold</h2>
<ol>
<li><strong>Shred if you can.</strong> Running a mower over a pile of leaves, with the bag on, cuts the time roughly in half and stops matting. Whole leaves work too; they just take longer.</li>
<li><strong>Pile them up.</strong> A ring of wire fencing or chicken wire about 3 to 4 feet across makes a tidy bin. In a small yard, fill a few black garbage bags, poke a dozen holes in each with a garden fork, and tuck them behind a shed.</li>
<li><strong>Get them wet.</strong> Leaves need to stay damp to rot. West of the Cascades, winter rain handles this for you. In drier eastern and high desert gardens, soak the pile as you build it and check it again in spring, when it should feel like a wrung-out sponge.</li>
<li><strong>Wait.</strong> Shredded leaves give a rough, usable leaf mold in about 6 to 12 months. Whole leaves take one to two years to become fine, dark and crumbly. You don't need to turn the pile, though mixing it once in spring speeds things up a little.</li>
</ol>
<p>A heap of leaves left in a cold, dry corner can sit unchanged for years. If yours isn't breaking down, it's almost always too dry.</p>
<p>The opposite problem is rarer but does happen west of the Cascades: a pile of whole, unshredded leaves can pack down into a soggy, airless mat that smells sour instead of earthy. Fork it over once to let some air in, mix in a few armfuls of drier leaves or a little straw, and it will sort itself out.</p>
<h2>Will oak leaves make my soil acidic?</h2>
<p>It's a common worry, and mostly a myth. Fresh oak leaves are a bit acidic, but as they break down into leaf mold the result ends up much closer to neutral, and a few inches a year won't noticeably change the pH of your garden soil. Leaf mold from any mix of leaves is safe to use on vegetable beds. If you're curious about your soil, a test tells you far more than the type of leaves on the pile; our <a href="${link("articles/soil-ph-and-lime/")}">soil pH guide</a> explains how.</p>
<h2>Need more leaves?</h2>
<p>Once you start making leaf mold, you'll probably want more than your own yard produces. Neighbors are often happy to let you take their bagged leaves, and some will gladly drop them off. Leaves swept from quiet residential streets are usually fine; skip anything from busy roads, parking lots or yards you know are sprayed. If a bag contains a lot of trash, twigs or walnut leaves, pass on it.</p>
${fig(1)}
<h2>Where to use it</h2>
<ul>
<li><strong>As mulch.</strong> Half-rotted leaf mold makes a good mulch around perennials, shrubs and <a href="${link("when-to-plant/blueberries/")}">blueberries</a>, which like the slightly acidic, woodland-style layer it makes. Keep it a few inches back from stems.</li>
<li><strong>Worked into beds.</strong> Spread an inch or two over vegetable beds in spring and fork it lightly into the top few inches. It improves how sandy soil holds water and how clay soil drains, though it adds few nutrients, so keep feeding your crops as usual.</li>
<li><strong>In seed and potting mixes.</strong> Fine, two-year leaf mold sifted through a screen is a classic replacement for peat in homemade seed-starting mix. Mix it about half and half with compost or bagged potting soil.</li>
<li><strong>On top of fall plantings.</strong> A loose layer over a freshly planted <a href="${link("when-to-plant/garlic/")}">garlic</a> bed or a dormant <a href="${link("when-to-plant/rhubarb/")}">rhubarb</a> crown keeps winter rain from crusting the soil.</li>
</ul>
<h2>Fresh leaves as a winter blanket</h2>
<p>You don't have to wait a year to get some use out of your leaves. Shredded fresh leaves spread a few inches deep over empty vegetable beds protect the soil all winter, and by spring much of the layer will have been pulled in by worms. Rake back whatever is left a few weeks before sowing so the soil can dry and warm, especially where you'll sow <a href="${link("when-to-plant/lettuce/")}">lettuce</a> or other early crops that slugs love.</p>
<p>Our guide to <a href="${link("articles/putting-the-garden-to-bed/")}">putting the garden to bed</a> covers the rest of the fall cleanup, and <a href="${link("articles/winter-cover-crops/")}">winter cover crops</a> are the other good way to keep beds covered until spring.</p>`
  },
  {
    slug: "winter-pruning-apple-and-pear-trees",
    topic: "crops",
    author: "site",
    title: "Winter Pruning for Apple and Pear Trees",
    description: "Late winter is the time to prune apples and pears. Which cuts to make, how much to take off, and why cherries, plums and peaches wait for a different season.",
    crops: ["apples", "pears", "cherries", "plums", "peaches"],
    published: "2026-10-23",
    body: ({ link, fig }) => `
<p>Maybe you inherited an apple tree with your house. It's tall, tangled and full of upright shoots, and every fall it drops a few small, spotty apples you can't reach. Or maybe you planted a young pear a couple of years ago and aren't sure whether to cut anything at all. Either way, late winter is your chance, and it's less intimidating than it looks.</p>
<p>Apples and pears are pruned while they're dormant, after the leaves fall and before the buds start to swell. A bare tree is easy to read: you can see every branch, where it's crowded and where it's heading. A little pruning each winter keeps a tree a size you can pick from, lets light and air into the middle, and helps the fruit ripen and stay healthy through our damp springs.</p>
<h2>When to prune</h2>
<p>Late winter is best, roughly February to early March. Pruning in fall or early winter isn't harmful in mild west-side gardens, but cuts made just before a hard freeze can be damaged by the cold, so most growers wait until the worst of winter has passed. East of the Cascades and in the high desert, wait until the severe cold is over, then finish before the buds open.</p>
<p>Pick a dry day if you can. Wet weather spreads some diseases from cut to cut, and you'll be climbing around on slippery bark.</p>
<h2>Tools</h2>
<ul>
<li><strong>Bypass hand pruners</strong> (scissor-style, not anvil) for twigs up to about a half inch.</li>
<li><strong>Loppers</strong> for branches up to about an inch and a half.</li>
<li><strong>A folding pruning saw</strong> for anything bigger.</li>
</ul>
<p>Sharp blades make clean cuts that seal faster. Wipe them with rubbing alcohol between trees, and between cuts if you're removing diseased wood.</p>
<h2>What to remove, in order</h2>
<ol>
<li><strong>Dead, broken and diseased wood.</strong> Cut back to healthy wood. On west-side apples, look for sunken, cracked cankers on young branches; on pears east of the mountains, look for blackened, "scorched" shoot tips from fire blight, and cut at least 8 to 12 inches below any visible damage.</li>
<li><strong>Suckers and water sprouts.</strong> Suckers come up from the roots or the base of the trunk. Water sprouts are the straight, whippy shoots that shoot up vertically from branches. Both shade the tree and rarely fruit well.</li>
<li><strong>Crossing and rubbing branches.</strong> Where two branches rub, keep the better-placed one.</li>
<li><strong>Branches growing into the center or straight down.</strong> The goal is an open tree where light reaches the inner fruit.</li>
<li><strong>Height control, last.</strong> If the tree is getting too tall, cut a tall upright limb back to a side branch that's heading outward.</li>
</ol>
${fig(1)}
<h2>Two kinds of cuts</h2>
<p><strong>Thinning cuts</strong> remove a whole branch back to where it joins a larger one. They open up the tree without causing a flush of new growth, and they should make up most of your pruning. Cut just outside the slightly swollen ring at the base of the branch, called the branch collar. Don't cut flush with the trunk, and don't leave a long stub. Wound paint isn't needed; the tree seals the cut itself.</p>
<p><strong>Heading cuts</strong> shorten a branch partway along, just above a bud. They make the tree push several new shoots below the cut, which is useful on a young tree you're shaping but turns into a thicket on a mature one. Use them sparingly.</p>
<p>For any branch thicker than your wrist, use three cuts so the bark doesn't tear: an undercut a foot out from the trunk, a top cut just beyond it to drop the weight, then the final cut at the collar.</p>
<h2>How much to take off</h2>
<p>Take no more than about a quarter of the live wood in one winter. Heavy pruning doesn't shrink a tree; it triggers a forest of water sprouts the next summer and fewer flowers. An overgrown, neglected tree is best brought back over three winters, a third of the work each year.</p>
<p>Look for fruiting spurs before you cut. On apples and pears, most fruit grows on short, stubby, knobbly twigs an inch or two long, often on wood that's two years or older. Leave them. Plump, fuzzy buds at the tips of the spurs are flower buds; slim, pointed buds will make leaves.</p>
<h2>Your first session, step by step</h2>
<p>If you're standing in front of a tree feeling unsure, try this. First, walk all the way around it and just look for a few minutes. Then remove everything that's clearly dead or broken; that alone often makes the tree easier to read. Next, take out the suckers at the base and the most obvious water sprouts. Step back again. Now pick out the two or three worst problems, such as a big branch growing into the center or two limbs rubbing, and deal with those. Stop there for this year. You'll learn more from watching how the tree responds next summer than from any amount of reading, and you can do a little more next winter.</p>
<h2>A second, lighter trim in summer</h2>
<p>Water sprouts always come back after winter pruning; it's the tree's response to losing wood. In early to mid summer, while they're still soft and green, you can rub or snap many of them off by hand. Removing them in summer, rather than waiting for winter, tends to slow the regrowth instead of encouraging it, and it lets more light reach the ripening fruit. It's a quick job: ten minutes with your hands and a pair of pruners.</p>
<h2>Cleaning up</h2>
<p>Pick up the prunings when you're done. Branches with cankers or fire blight should go in the yard-waste bin or the trash, not in your compost or a brush pile near the tree. Healthy twigs can be chipped for mulch or stacked in a corner as shelter for birds and beneficial insects.</p>
<h2>Safety, and when to get help</h2>
<p>Most home pruning accidents involve ladders. A three-legged orchard ladder is much steadier on soft ground than a regular stepladder; if you're on a stepladder, keep it fully open on level ground and don't reach past your shoulders. For big trees, branches you can't reach from the ground or a short ladder, or anything near power lines, hire a certified arborist. It's also worth asking whether they're familiar with fruit trees, since pruning for fruit is different from pruning a shade tree.</p>
<h2>Young trees</h2>
<p>For the first three or four years, pruning is mostly about shape. Most apples and pears are trained to a central leader: one main upright trunk with three or four well-spaced scaffold branches coming off it in a loose spiral, the lowest at about knee to waist height. Choose branches that leave the trunk at a wide angle, since narrow, V-shaped crotches split under fruit later. Our guide to <a href="${link("articles/planting-bare-root-fruit-trees/")}">planting bare-root fruit trees</a> covers the first cut at planting.</p>
<h2>Why cherries, plums and peaches wait</h2>
<p>Don't take the saw to stone fruit in winter. In the Northwest, cherries and plums are prone to bacterial canker and silver leaf, diseases that get into fresh cuts during cool, wet weather. Prune <a href="${link("when-to-plant/cherries/")}">cherries</a> and <a href="${link("when-to-plant/plums/")}">plums</a> in summer, during a dry spell, usually right after harvest. <a href="${link("when-to-plant/peaches/")}">Peaches</a> are usually pruned in early spring, around bloom, once the risk of a hard freeze is low.</p>
<p>See the <a href="${link("when-to-plant/apples/")}">apple</a> and <a href="${link("when-to-plant/pears/")}">pear</a> guides for varieties that hold up to Northwest diseases.</p>`
  },
  {
    slug: "crop-rotation-for-small-gardens",
    topic: "timing", icon: "rotation",
    author: "site",
    title: "Crop Rotation for a Small Northwest Vegetable Garden",
    description: "Winter is the time to plan next year's beds. A simple way to rotate vegetable families in a few raised beds, and the soil diseases it helps you avoid.",
    crops: ["tomatoes", "potatoes", "broccoli", "cabbage", "peas", "beans", "garlic", "onions"],
    published: "2026-10-23",
    gardenPhoto: "janelle-raised-beds",
    body: ({ link }) => `
<p>A rainy winter evening is a good time to sketch next year's garden. Before you decide what goes where, think about what grew in each bed this year. Planting the same family of vegetables in the same spot year after year lets their soil pests and diseases build up. Moving them around, called crop rotation, is one of the simplest ways to keep a garden healthy without sprays.</p>
<h2>Rotate by family, not by crop</h2>
<p>Pests and diseases usually attack a whole plant family, so moving tomatoes to where the potatoes were doesn't help: they're relatives. The families that matter most in a vegetable garden are:</p>
<ul>
<li><strong>Cabbage family:</strong> broccoli, cabbage, kale, cauliflower, Brussels sprouts, collards, kohlrabi, bok choy, radishes, turnips and arugula.</li>
<li><strong>Tomato family:</strong> tomatoes, potatoes, peppers, eggplant, tomatillos and ground cherries.</li>
<li><strong>Peas and beans:</strong> peas, bush and pole beans, and fava beans.</li>
<li><strong>Onion family:</strong> onions, garlic, leeks, shallots and chives.</li>
<li><strong>Squash family:</strong> zucchini, winter squash, pumpkins, cucumbers and melons.</li>
<li><strong>Carrot family:</strong> carrots, parsnips, celery, parsley, dill and cilantro.</li>
<li><strong>Beet family:</strong> beets, chard and spinach.</li>
</ul>
<p>Lettuce, corn and most herbs can fill gaps wherever there's room.</p>
<h2>What it actually prevents</h2>
<p>Rotation works on problems that live in the soil. Several are common in wet, acidic Northwest gardens:</p>
<ul>
<li><strong>Clubroot</strong> swells and distorts the roots of cabbage-family plants, which wilt on warm afternoons and stay stunted. Its spores can survive in soil for many years, so once you have it, keep cabbage relatives out of that bed as long as you can. Acidic soil makes it worse; our <a href="${link("articles/soil-ph-and-lime/")}">soil pH guide</a> covers liming.</li>
<li><strong>Cabbage root maggots</strong> spend the winter in the soil as pupae under last year's broccoli and cabbage, then emerge right where this spring's transplants go in.</li>
<li><strong>Onion white rot</strong>, a fluffy white fungus on garlic and onion bulbs, can last in the soil for decades. If you see it, stop growing the onion family in that bed.</li>
<li><strong>Potato scab and Verticillium wilt</strong> build up where potatoes and their relatives grow year after year.</li>
</ul>
<p>Rotation does little against problems that blow in on the wind. <a href="${link("articles/tomato-late-blight/")}">Late blight</a> spores travel for miles, and powdery mildew on squash arrives every late summer no matter where you plant. Those need resistant varieties and good spacing instead. Do dig every last potato, though: leftover tubers sprout next year and can carry blight back in.</p>
<h2>A simple four-bed plan</h2>
<p>If you have four beds, or one bed split into four sections, group the families so each bed holds a set that grows well together, then move each set one bed along every year:</p>
<ol>
<li><strong>Tomato family</strong>, with squash family alongside if there's room.</li>
<li><strong>Peas and beans</strong>, followed in late summer by fall greens.</li>
<li><strong>Cabbage family.</strong></li>
<li><strong>Roots and onions:</strong> carrots, beets, onions and the fall-planted <a href="${link("when-to-plant/garlic/")}">garlic</a>.</li>
</ol>
<p>Next year the tomatoes move to bed 2, peas to bed 3, and so on. Each family comes back to the same soil every fourth year. The order has a logic: the heavy-feeding cabbage family follows peas and beans, and roots follow cabbage on the leftover fertility. Don't worry about getting it perfect; any gap of two or three years is far better than none.</p>
<h2>When you only have one or two beds</h2>
<ul>
<li><strong>Rotate within the bed.</strong> Split it into halves or quarters and shift the families around them each year. Even a few feet helps.</li>
<li><strong>Use containers.</strong> Grow tomatoes or potatoes in large pots of fresh mix on alternate years, which gives the bed a break. Our <a href="${link("articles/container-vegetable-gardening/")}">container guide</a> has sizes.</li>
<li><strong>Use the off-season.</strong> A <a href="${link("articles/winter-cover-crops/")}">winter cover crop</a> or a layer of compost between crops keeps the soil healthy, and its life works against soil-borne diseases.</li>
<li><strong>Know your trouble spots.</strong> If one family has struggled in a bed, that's the one to move first.</li>
</ul>
<h2>What it looks like over four years</h2>
<p>It's easier to see on paper. Say you have four raised beds, A to D, and start like this: tomatoes and squash in A, peas and beans in B, broccoli and kale in C, carrots, onions and garlic in D. The next year, everything slides one bed along: tomatoes in B, peas in C, broccoli in D, roots and onions in A. The year after that, tomatoes are in C, and so on. In year five, the tomatoes are back in A, which hasn't seen a tomato family plant for three full seasons.</p>
<p>Real gardens are messier than that, and that's fine. Maybe you grow twice as many tomatoes as anything else, so the tomato family takes two beds. Maybe the garlic goes in the bed that's emptiest in October rather than the one the plan says. The rule that matters most is simple: don't put the same family in the same spot two years running, and try to give the tomato, cabbage and onion families the longest breaks, since they carry the most persistent soil problems.</p>
<h2>Where perennials fit</h2>
<p>Asparagus, rhubarb, strawberries and perennial herbs stay put for years, so give them their own beds outside the rotation. Strawberries are the exception worth planning for: they share verticillium wilt with the tomato family, so don't start a new strawberry bed where tomatoes or potatoes have grown recently, and move the patch every three or four years.</p>
<h2>Write it down</h2>
<p>The hardest part of rotation is remembering what grew where. A quick sketch of your beds with this year's crops, kept with your seed packets, solves it. When you're ready, the <a href="${link("my-garden/")}">garden planner</a> builds next year's planting dates for your town.</p>`
  },
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
<p>There's a moment every fall when you look at the garden and realize it's over. The tomato vines are black after a cold night, the squash leaves have collapsed, and the beans are hanging limp on the trellis. It's tempting to just shut the back door until March. But a few hours now makes next spring noticeably easier.</p>
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
<h2>A realistic weekend plan</h2>
<p>You don't have to do it all at once. If you only have one Saturday, do it in this order. First, pull and bag anything diseased, and dig up the last potatoes. Second, cover every empty bed with leaves, straw or compost. Third, drain the hoses and empty the pots that could crack. Everything else, from sharpening tools to cutting back perennials, can wait for a dry day in December or February. Those first three jobs are the ones that save you real trouble in spring.</p>
<h2>Keep the compost going</h2>
<p>Fall is the best time of year for the compost pile, because you suddenly have piles of browns (dry leaves) to balance the greens. Add healthy spent plants, chopped up, along with layers of leaves. West of the Cascades, cover the pile with a tarp or lid through winter so the rain doesn't turn it into a cold, soggy heap and wash the nutrients out. Our guide to <a href="${link("articles/composting-in-a-rainy-climate/")}">composting in a rainy climate</a> has more.</p>
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
    body: ({ link, fig }) => `
<p>Every late winter, nurseries across the Northwest fill with bundles of leafless young trees with their roots wrapped in damp sawdust. These bare-root trees are the cheapest way to start an orchard, there's a far bigger choice of varieties than in summer, and they often establish faster than potted trees because their roots go straight into your soil.</p>
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
${fig(1)}
<h2>After planting</h2>
<p>Stake only if the site is windy or the tree is top-heavy, with a loose, flexible tie, and remove the stake after a year. Many growers cut a young unbranched tree (a "whip") back to about knee to waist height at planting to encourage low branches; a branched tree only needs any damaged or crossing branches removed.</p>
<p>The first summer is the hardest. A new tree has a small root system and needs a deep soaking about once a week through dry spells, especially in the long rainless stretch from July to September. In sunny eastern and high desert gardens, painting the trunk with white latex paint diluted half and half with water helps prevent winter sunscald.</p>
<h2>Protect the trunk</h2>
<p>Young bark is tempting to animals. Voles and mice chew it at ground level under mulch or grass, rabbits gnaw it in winter, and deer browse the new shoots and rub their antlers on young trunks in fall. A cylinder of hardware cloth or a plastic spiral trunk guard around the base protects against the small chewers; keep mulch pulled back from the trunk so voles don't have cover. Where deer are around, a cage of fencing a few feet out from the tree is the only thing that really works until it's tall enough to grow out of reach.</p>
<h2>First-year worries</h2>
<p>Bare-root trees often leaf out later than established trees, sometimes weeks later. As long as a thumbnail scratch on a twig shows green underneath, the tree is alive and just getting its roots settled. Don't overwater a tree that hasn't leafed out yet; soggy soil is more likely to kill it than dryness in early spring.</p>
<p>Watch for shoots coming up from below the graft union or from the roots. These are the rootstock, not the variety you bought, and they'll take over if you let them. Cut them off flush as soon as you see them.</p>
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
    body: ({ link, fig }) => `
<p>If you've ever picked raspberries warm off the cane on a July afternoon, you know why people grow them. Store-bought raspberries are expensive, fragile and often bland. Homegrown ones are none of those things, and a single short row can give you more than you can eat fresh.</p>
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
${fig(1)}
<h2>Picking</h2>
<p>A ripe raspberry slides off its core with the lightest tug. If you have to pull, it isn't ready; give it another day. Pick every day or two at the peak of the season, in the cool of the morning when you can, and use a shallow container so the berries on the bottom don't get crushed. Raspberries don't keep long. Eat them within a day or two, or freeze them: spread them in a single layer on a tray, freeze until hard, then tip them into bags. That way they stay separate instead of freezing into a block.</p>
<h2>Feeding, watering and pests</h2>
<p>Spread compost along the row each spring. Raspberries are shallow-rooted, so they need steady water from flowering through harvest: a soaker hose or drip line under mulch is ideal, and keeping the leaves dry helps prevent fruit mold.</p>
<p>The main fruit pest is spotted wing drosophila, a tiny fruit fly that lays eggs in ripening berries. Pick every day or two during harvest, don't leave overripe or fallen berries in the patch, and refrigerate what you pick straight away. Birds are the other thieves; light netting over the row helps in heavy years.</p>
<h2>When an old patch slows down</h2>
<p>Even a well-kept patch gets crowded and less productive after many years, or picks up root rot or virus problems that make canes weak and berries crumbly. When that happens, the best answer is usually a fresh start: buy new, certified disease-free plants and put them in a new, well-drained spot rather than replanting into the old row. Taking suckers from a tired patch tends to bring its problems along.</p>
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
    gardenPhoto: "janelle-red-cabbage-bed",
    body: ({ link, fig }) => `
<p>You go out to cut a head of broccoli for dinner, rinse it at the sink, and a small green caterpillar floats to the top of the water. Or you pick Brussels sprouts in November and find every one of them packed with gray aphids. Almost everyone who grows cabbage-family crops has a story like this.</p>
<p>Kale, broccoli, cabbage and their relatives are some of the easiest crops in a Northwest garden, and two pests know it. Green caterpillars chew holes through the leaves in summer, and gray aphids pack the undersides of leaves and the inside of Brussels sprouts by fall. Both are easy to manage if you catch them early.</p>
<h2>Cabbage worms</h2>
<p>If small white butterflies are flitting around your garden in summer, they're almost certainly cabbage whites, and they're laying eggs on your cabbage-family plants. The eggs hatch into velvety green caterpillars that match the leaves so well you'll usually see the damage first: ragged holes, chewed edges and small dark green droppings in the leaf joints and broccoli heads. Cabbage loopers, pale green caterpillars that arch their backs as they move, cause the same kind of damage.</p>
<p>Cabbage whites go through several generations a year, from spring into early fall, so a planting that was clean in June can be covered in caterpillars by August. You may also find small, pale green caterpillars that wriggle wildly and drop on a silk thread when you touch them. Those are diamondback moth larvae. They make many small holes rather than big ones, and the same steps below control them.</p>
<p><strong>What works:</strong></p>
<ul>
<li><strong>Row cover from day one.</strong> A lightweight fabric row cover laid over the plants at planting and tucked in at the edges keeps the butterflies from ever laying eggs. Cabbage-family crops don't need bees to pollinate them, so the cover can stay on all season. This one step prevents most of the problem. Leave plenty of slack, or support it on hoops, so the plants can grow underneath, and seal the edges with soil or boards. A single gap is enough for a butterfly to get in, and a covered bed with a caterpillar inside is worse than no cover at all, because the cover also keeps out the birds and wasps that would have eaten it. Lift the cover now and then to check.</li>
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
${fig(1)}
<h2>Plan around them</h2>
<p>Spring plantings often finish before either pest builds up, which is one more reason to plant on time; see the <a href="${link("when-to-plant/broccoli/")}">broccoli</a> and <a href="${link("when-to-plant/kale/")}">kale</a> guides for your dates. For summer-planted fall and winter crops, put row cover on at planting. At the end of the season, pull out spent cabbage-family plants rather than leaving them all winter, since aphids can overwinter on old stems, especially in mild west-side gardens.</p>
<p>And don't panic over a few holes. Kale with some chewed leaves still tastes the same, and a quick soak in salty water before cooking draws out any caterpillars hiding in broccoli heads.</p>`
  }
];
