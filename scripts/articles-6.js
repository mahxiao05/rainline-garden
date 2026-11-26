/* Articles bylined to Rainline Garden itself (author: "site"), late November 2026 batch: three winter articles.
 * Same fields as scripts/articles.js. Checked against the other article files so they don't repeat them:
 * the planning piece links to crop rotation, seed starting and the seasons guide instead of retelling them,
 * and the freeze piece is about short cold snaps, not the fall cleanup in "putting the garden to bed".
 */
module.exports = [
  {
    slug: "protecting-plants-in-a-hard-freeze",
    topic: "problems", icon: "frost",
    author: "site",
    title: "Protecting Your Garden from a Hard Freeze in the Northwest",
    seoTitle: "Protecting Plants in a Hard Freeze (Northwest Guide) | Rainline Garden",
    description: "When an arctic cold snap is on the way: what to water, what to cover, which pots to move, and what to leave alone until spring.",
    crops: ["kale", "lettuce", "chard", "garlic", "leeks", "rosemary", "figs"],
    published: "2026-11-26",
    quick: () => [
      ["Before", "Water dry soil and pots a day or two ahead, then cover tender plants right down to the ground."],
      ["Pots", "Roots in pots freeze first. Push them against the house, group them, or move them into a garage."],
      ["After", "Don't cut back damaged plants until new growth shows in spring."]
    ],
    body: ({ frost, link }) => {
      const pdx = frost("portland-or"), sea = frost("seattle-wa"), spo = frost("spokane-wa");
      return `
<p>West of the Cascades, frost comes late. Portland's typical first fall frost isn't until ${pdx.first} and Seattle's is around ${sea.first}, and most winter nights after that hover near freezing, so kale, leeks and garlic keep plugging along. Every few winters, though, cold air from Canada pours south through the Fraser River valley and out of the Columbia Gorge, and nights drop into the teens or lower for several days. That's the kind of cold that kills plants that would shrug off an ordinary frost. The east wind and freezing rain that often come with it make things worse, as anyone who lived through Portland's January 2024 ice storm will remember.</p>
<p>East of the mountains, in places like Spokane (first frost around ${spo.first}), deep cold is a normal part of winter and the garden is mostly asleep by then. The advice below is mainly for west-side gardens with plants still growing, but the parts about pots, mulch and waiting before you prune apply everywhere.</p>
<p>You usually get a few days of warning from the forecast. Here's what's worth doing with them.</p>
<h2>A day or two before: water</h2>
<p>If the ground or your pots are dry, water them well. It sounds backward, but moist soil holds more heat than dry soil and gives it back slowly overnight. Plants also keep losing water through their leaves in cold, windy weather, and once the ground freezes they can't pull any more up. Evergreens, broadleaf shrubs and anything in a container suffer most from going into a freeze thirsty.</p>
<p>Do this before the cold arrives. Watering while it's below freezing just makes ice.</p>
<h2>The day before: cover what's tender</h2>
<p>A cover doesn't make heat. It traps the warmth coming up out of the soil overnight. That's why it needs to reach the ground and be held down at the edges. A sheet draped over the top of a plant and flapping in the wind does very little.</p>
<ul>
<li><strong>Frost cloth (row cover).</strong> The white fabric sold at garden centers. Lightweight cover gives a few degrees; heavier frost blanket gives more but blocks light, so pull it off once the cold breaks.</li>
<li><strong>Old sheets, blankets or burlap.</strong> These work fine. Keep plastic from resting on leaves, because the cold goes straight through it. If plastic is all you have, put a sheet or a frame under it.</li>
<li><strong>Weigh the edges down</strong> with bricks, boards or a few shovels of soil, especially if the forecast says east wind.</li>
<li><strong>Double up for a deep freeze.</strong> Two layers of fabric, or fabric plus an upside-down cardboard box over small plants, holds noticeably more heat.</li>
</ul>
<p>For a plant you really want to save, a string of old-style incandescent holiday lights under the cover adds a little warmth. Use outdoor-rated lights and keep the bulbs from touching dry leaves or fabric. LED lights give off almost no heat, so they won't help.</p>
<h2>What actually needs covering</h2>
<p>You don't need to wrap the whole garden. <a href="${link("when-to-plant/kale/")}">Kale</a>, collards, leeks, garlic and overwintering onions handle the teens, and even when the leaves look terrible afterward, the plants usually grow back. Spend your covers on the tender stuff:</p>
<ul>
<li><strong>In the vegetable bed:</strong> <a href="${link("when-to-plant/lettuce/")}">lettuce</a>, chard, young broccoli and cauliflower, and anything you planted in the last few weeks. Overwintering peas and fava beans vary. Small plants often come through better than big, soft ones.</li>
<li><strong>Herbs and borderline shrubs:</strong> <a href="${link("when-to-plant/rosemary/")}">rosemary</a>, some lavenders, young <a href="${link("when-to-plant/figs/")}">figs</a>, and potted citrus or palms. Anything sold as hardy only to zone 8 or 9 belongs on this list. Check <a href="${link("hardiness-zones/")}">your town's hardiness zone</a> if you're not sure how close to the edge you are.</li>
</ul>
<h2>Pots: move them or wrap them</h2>
<p>Roots are far less cold-hardy than the tops of the same plant. In the ground, the soil around them buffers the cold. In a pot, the roots are exposed on every side, so a plant that would be fine in the ground can die in a container at the same temperature.</p>
<p>Move pots into a garage, shed or unheated porch for the cold spell, or push them tight against the south side of the house. If they're too heavy, group them together, pack leaves or straw around them, and wrap the whole cluster in burlap or bubble wrap. Lifting pots off concrete onto boards or pot feet also helps, since concrete pulls heat away fast.</p>
<h2>Mulch the roots and crowns</h2>
<p>A few inches of straw, shredded leaves or evergreen boughs over garlic, strawberries, perennial herbs and the crowns of perennials keeps the soil from freezing as deep. If you already mulched in fall (see <a href="${link("articles/putting-the-garden-to-bed/")}">putting the garden to bed</a>), you've done most of this. Just top up anything that's thin.</p>
<h2>During the freeze: hands off</h2>
<p>It's tempting to knock ice off branches, but frozen wood is brittle and snaps more easily than it bends back. Let ice melt on its own. Heavy, wet snow is different: if it's bending a shrub to the ground, brush it off gently with a broom, pushing upward from below.</p>
<p>Stay off frozen lawns and beds as much as you can, and don't prune anything until the cold has passed.</p>
<h2>After the cold: wait before you judge</h2>
<p>A day after a hard freeze, damaged leaves often go dark and mushy, and the garden can look like a total loss. Most of it isn't. Many plants that look dead in January push out new shoots from lower down in April. Leave the dead-looking growth in place for now (it also shields the buds underneath), and cut back to live growth once you can see where it is in spring.</p>
<p>A few things are worth doing right away. Take the covers off on the first mild day so plants get light again. Pull off slimy leaves on kale, lettuce and cabbage so rot doesn't spread. Check that pots didn't crack, and water them if they dried out.</p>
<p>Then jot down what made it and what didn't. After a couple of winters, that list tells you which plants suit your yard and which ones will always need babysitting.</p>
<p>For the bigger picture of how cold your winters get, look up <a href="${link("frost-dates/")}">your town's frost dates</a>.</p>`;
    }
  },
  {
    slug: "planning-next-years-vegetable-garden",
    topic: "timing", icon: "seed-tray",
    author: "site",
    title: "Planning Next Year's Vegetable Garden in the Northwest",
    seoTitle: "Planning Next Year's Vegetable Garden (Winter To-Do List) | Rainline Garden",
    description: "Winter is the best time to plan a Northwest vegetable garden. What to do in November, December, January and February so spring goes smoothly.",
    crops: ["tomatoes", "peppers", "onions", "lettuce", "melons"],
    published: "2026-11-26",
    quick: () => [
      ["Now", "Write down what worked and what didn't this year while you still remember."],
      ["December", "Sketch your beds, mark the sunny spots and move crop families around."],
      ["January", "Order seed early, checking days to maturity against your frost-free season."]
    ],
    body: ({ frost, link }) => {
      const sea = frost("seattle-wa"), spo = frost("spokane-wa"), idf = frost("idaho-falls-id"), med = frost("medford-or");
      return `
<p>A lot of what goes wrong in a vegetable garden in July was really decided in January. The tomato that never ripened, the bed that turned out to be shady once the maple leafed out, the seed you wanted that sold out by March: those are planning problems, not growing problems. Northwest winters give you a long, dark, wet stretch from November to February when there isn't much to do outside, which makes it the right time to sort them out.</p>
<p>None of this takes long. An hour or two spread over the winter is plenty.</p>
<h2>Start with this year, while you remember it</h2>
<p>Before you open a seed catalog, write down how this season went. A page in a notebook or a note on your phone is fine. A few questions get you most of the way:</p>
<ul>
<li>What did you eat a lot of, and what ended up given away or in the compost?</li>
<li>What didn't produce, and do you have a guess why? Late start, too much shade, slugs, a cold June?</li>
<li>Which beds stayed soggy longest in spring, and which ones dried out first in August?</li>
<li>What did you run out of too soon, like garlic by February or salad greens by July?</li>
</ul>
<p>These answers will shape next year more than any catalog. If a third of the zucchini went to the compost, plant one next year instead of three. If the peppers were still green in October, you might need a faster variety, a warmer spot, or an earlier start indoors.</p>
<h2>November: put things away and sort your seed</h2>
<p>Drain hoses and bring them in before a hard freeze, and empty anything that holds water. Then go through your leftover seed packets. Seed doesn't keep forever, and some kinds fade fast. Onion, leek and parsnip seed is usually only good for a year or two. Tomato, squash and cucumber seed often lasts four or five years if it's kept cool and dry.</p>
<p>If you're not sure about an old packet, test it. Roll ten seeds up in a damp paper towel, put it in a plastic bag, and leave it somewhere warm, like the top of the fridge. Check after a week or so. If seven or more sprout, the seed is fine. If only two or three do, either sow it thickly or buy fresh.</p>
<h2>December: draw the garden</h2>
<p>Sketch your beds roughly to scale and mark where the sun falls in summer, not in winter. Northwest yards often get less summer sun than people think once the trees leaf out and the neighbor's house shades the back fence by mid-afternoon. Put the fruiting crops (tomatoes, peppers, squash, beans) in the sunniest spots. Leafy greens and root crops can make do with a bit of shade.</p>
<p>Then shuffle things around so the same crop family isn't in the same bed two years running. Tomatoes and potatoes are related, and so are cabbage, kale and broccoli. Our <a href="${link("articles/crop-rotation-for-small-gardens/")}">crop rotation guide</a> has a simple system that works even with two or three beds. If you'd rather not draw by hand, the free <a href="${link("my-garden/")}">garden planner</a> lays out your beds and fills in your town's planting dates.</p>
<h2>January: order seed early</h2>
<p>Seed companies, especially the small regional ones, sell out of popular varieties by late winter. Ordering in January gets you first pick.</p>
<p>As you choose, look at the "days to maturity" on each variety and compare it with your frost-free season, the stretch between the last spring frost and the first fall frost. From NOAA records, that's about ${sea.season} days in Seattle (${sea.last} to ${sea.first}), ${med.season} in Medford, ${spo.season} in Spokane (${spo.last} to ${spo.first}) and ${idf.season} in Idaho Falls (${idf.last} to ${idf.first}). A 90-day melon is an easy bet in Medford's long, hot summer and much tighter in Idaho Falls. On the west side, the length of the season usually isn't the problem; cool summer nights are, which is why fast, cool-tolerant varieties win there. Look up <a href="${link("frost-dates/")}">your town's frost dates</a> before you fall for a catalog photo.</p>
<p>A few habits that save money and disappointment:</p>
<ul>
<li><strong>Buy what you'll actually eat.</strong> Catalogs are very good at making you want purple carrots.</li>
<li><strong>Try one or two new things, not ten.</strong> Keep most of the garden to varieties you know do well for you.</li>
<li><strong>Look for varieties bred or trialed in the Northwest.</strong> Regional seed companies often say so in the description, and those varieties tend to cope better with cool springs and nights.</li>
</ul>
<p>If you're stuck on tomatoes, our <a href="${link("articles/best-tomatoes-for-the-northwest/")}">best tomatoes for the Northwest</a> list is a good place to start.</p>
<h2>February: get ready to start seeds</h2>
<p>Wash old seed trays and pots in soapy water. Check that your grow lights still work. Buy fresh seed-starting mix, not garden soil, which is too heavy for small seedlings and can carry disease.</p>
<p>Then make a simple calendar that counts back from your last frost, so you know which week to start each crop indoors. Onions and leeks come first, often in late January or February, then peppers, then tomatoes. Our <a href="${link("articles/starting-seeds-indoors/")}">seed-starting guide</a> explains how far ahead to start each one.</p>
<p>On the west side, late winter is also when to sharpen pruners for <a href="${link("articles/winter-pruning-apple-and-pear-trees/")}">pruning apple and pear trees</a>, and to plant <a href="${link("articles/planting-bare-root-fruit-trees/")}">bare-root trees and berries</a> whenever the ground isn't frozen or waterlogged.</p>
<h2>A short winter checklist</h2>
<ul>
<li>Write down what worked and what didn't this year</li>
<li>Test old seed with the paper-towel method</li>
<li>Sketch your beds and mark summer sun and shade</li>
<li>Move each crop family to a new bed</li>
<li>Check days to maturity against your frost-free season</li>
<li>Order seed in January</li>
<li>Have trays, mix and lights ready by February</li>
</ul>
<p>For a look at what each season asks of a Northwest garden, see <a href="${link("articles/gardening-through-the-seasons/")}">how the seasons change what you grow</a>.</p>`;
    }
  },
  {
    slug: "growing-onions-in-the-northwest",
    topic: "crops",
    author: "site",
    title: "Growing Onions in Oregon, Washington and Idaho",
    seoTitle: "Growing Onions in Oregon, Washington & Idaho | Rainline Garden",
    description: "Small onions usually come down to the wrong type or a late start. How to pick long-day onions, choose seeds, sets or starts, and grow bulbs that keep.",
    crops: ["onions", "leeks", "garlic"],
    published: "2026-11-26",
    quick: () => [
      ["Type", "Long-day onions. Short-day kinds bulb too early this far north and stay small."],
      ["When", "Early spring, a few weeks before your last frost. Start seeds indoors in January or February."],
      ["Harvest", "When most tops have flopped over. Cure them somewhere dry and airy for 2 to 3 weeks."]
    ],
    body: ({ D, P, frost, link }) => {
      const onionWin = slug => { const r = P.plan(D, P.findPlace(D, slug)).crops.find(r => r.crop.id === "onions"); const w = r.windows.find(w => w.kind === "spring"); return P.fmtRange(w.start, w.end); };
      const pdx = frost("portland-or");
      return `
<p>Onions look like the easiest thing in the garden. You push a little bulb into the soil in spring and dig up a big one in August. Plenty of Northwest gardeners end up with onions the size of a golf ball instead, or a row that sends up flower stalks in June. Nearly every time, the cause is one of two things: the wrong type of onion, or planting too late.</p>
<h2>Why "long-day" matters</h2>
<p>An onion doesn't start making a bulb when it reaches a certain size. It starts when the days get long enough. From then on it stops making new leaves and puts its energy into swelling the bulb.</p>
<p>Onion varieties fall into three groups by the day length that sets them off:</p>
<ul>
<li><strong>Short-day</strong> onions start bulbing at roughly 10 to 12 hours of daylight. They're bred for the southern U.S.</li>
<li><strong>Intermediate</strong> (sometimes sold as day-neutral) onions start at roughly 12 to 14 hours.</li>
<li><strong>Long-day</strong> onions wait for 14 hours or more.</li>
</ul>
<p>Oregon, Washington and Idaho are far enough north that summer days run well past 15 hours, so long-day onions are the right choice. Short-day onions planted here start bulbing in spring while the plant is still small, and you get small bulbs. Intermediate types can work, but long-day ones usually do best. Most seed catalogs and onion-start sellers list the type. If a packet doesn't say, look it up before you buy.</p>
<h2>Why early planting matters</h2>
<p>The other half of the story is timing. How big the bulb gets depends on how many healthy leaves the plant has grown before bulbing kicks in. Growers often put it as one leaf for each ring of the onion. An onion planted in May has only a few weeks to grow leaves before the long days of June switch it over, so it ends up smaller.</p>
<p>That's why onions go in early. They're one of the first things planted in spring, a few weeks before the last frost, and they don't mind cold. On our calendars the window is about ${onionWin("portland-or")} in Portland and Seattle, ${onionWin("boise-id")} in Boise, ${onionWin("spokane-wa")} in Spokane and ${onionWin("bend-or")} around Bend. Check <a href="${link("when-to-plant/onions/")}">onion planting dates for your town</a>.</p>
<h2>Seeds, sets or starts?</h2>
<p><strong>Seeds</strong> give you the most varieties to choose from and cost the least. They're also the slowest. Start them indoors in January or February, about 8 to 10 weeks before you plan to set them out. Give the seedlings a haircut to 3 or 4 inches whenever they get floppy; they'll grow back sturdier. Our guide to <a href="${link("articles/starting-seeds-indoors/")}">starting seeds indoors</a> covers lights and trays.</p>
<p><strong>Sets</strong> are small dry bulbs grown the summer before. They're the easiest to plant and the most forgiving. The catch is that big sets are more likely to bolt, meaning they send up a flower stalk and stop growing the bulb. Pick sets about the size of a marble or smaller. Sets often aren't labeled by day length, so you have less control over what you're getting.</p>
<p><strong>Starts</strong>, sold as bundles of young plants, are a good middle ground. Garden centers and mail-order seed companies sell them in early spring, usually labeled by day length, and they can make full-size bulbs without the wait of growing from seed.</p>
<h2>Planting</h2>
<ul>
<li>Pick a sunny spot with loose soil that drains. On heavy, wet ground, a <a href="${link("articles/raised-beds-for-rainy-gardens/")}">raised bed</a> makes a big difference.</li>
<li>Mix in compost first. Onions have small, shallow roots and need steady food and moisture close to the surface.</li>
<li>Plant sets about an inch deep and starts just deep enough to stand up. Space them 4 to 6 inches apart for full-size bulbs. You can plant closer and pull every other one early as green onions.</li>
<li>Keep the bed weeded. Onion leaves are thin and upright and shade almost nothing, so weeds overtake them fast.</li>
</ul>
<h2>Through the summer</h2>
<p>Water steadily, about an inch a week, through June and July while the bulbs are swelling. West of the Cascades, spring rain covers this for a while, but by July you'll be watering. Uneven watering can split bulbs. Once the tops start falling over on their own, usually in late July or August, stop watering so the bulbs can firm up.</p>
<p>If a plant sends up a flower stalk, pull it and use it in the kitchen soon. A bolted onion has a hard core and won't store.</p>
<h2>Onion maggots</h2>
<p>In much of the Northwest, the onion maggot is the main pest. A small fly lays eggs at the base of the plants in spring, and the white maggots tunnel into the bulbs and can kill young plants outright. The most reliable fix is to cover the bed with row cover right after planting and keep it sealed at the edges through late spring. It also helps to plant onions somewhere other than where any onion-family crop grew last year, and to pull and toss damaged plants, which draw more flies.</p>
<h2>Harvesting and curing</h2>
<p>When most of the tops have flopped over and started to yellow, pull the onions on a dry day. Then cure them: spread them out in a single layer somewhere warm, dry and airy, like a covered porch, carport or garage with the door open, for two to three weeks. They're ready when the necks are dry and tight and the skins rustle. In a damp late summer, curing them under cover matters a lot. Onions that go into storage with moist necks tend to rot.</p>
<p>Store cured onions somewhere cool and dry, in mesh bags or with the tops braided. Pungent storage onions keep for months. Sweet onions don't last nearly as long, so eat those first.</p>
<h2>A word on Walla Walla Sweets</h2>
<p>Walla Walla Sweets are the Northwest's own famous onion, and commercial growers raise them differently from most onions: they're sown in late summer, spend the winter in the field and are pulled in early summer. Home gardeners can grow them that way too, or plant spring starts and harvest them later in summer. Either way they're mild and juicy but don't keep long, so plan to eat them within a few weeks.</p>
<p>If you're also growing garlic, our guide to <a href="${link("articles/planting-garlic-in-the-northwest/")}">planting garlic in the Northwest</a> covers fall planting. With Portland's last frost around ${pdx.last}, onions and garlic are two of the earliest jobs of the year.</p>`;
    }
  }
];
