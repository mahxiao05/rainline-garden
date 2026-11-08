/* Articles bylined to Rainline Garden itself (author: "site"), November 2026 batch.
 * Same fields as scripts/articles.js. Checked against the other article files so they don't repeat them:
 * the seasons guide is an overview that links out to the detailed articles instead of retelling them.
 */
module.exports = [
  {
    slug: "gardening-through-the-seasons",
    topic: "timing", icon: "succession",
    author: "site",
    title: "How the Seasons Change What You Grow in the Northwest",
    seoTitle: "Northwest Garden Seasons: What to Grow and Do | Rainline Garden",
    description: "Spring, summer, fall and winter each ask for different crops and different jobs in an Oregon, Washington or Idaho garden. A season-by-season guide with tips.",
    crops: ["peas", "lettuce", "tomatoes", "beans", "kale", "garlic"],
    published: "2026-11-08",
    body: ({ frost, link }) => {
      const pdx = frost("portland-or"), sea = frost("seattle-wa"), spo = frost("spokane-wa"), boi = frost("boise-id"), bend = frost("bend-or");
      return `
<p>If you're new to gardening here, or new to the region, the year can feel confusing. People talk about planting in February, harvesting in December and doing nothing in August except watering. Once you see the pattern, though, it makes sense, and it's a big part of what makes gardening in the Northwest so rewarding.</p>
<p>A Northwest garden doesn't run on one calendar. The same week can be planting time in Seattle and still frost season in Bend, and a crop that thrives in April can sulk in July. Knowing what each season does to your plants, and what it asks of you, is most of the skill. This guide walks through the year and points to the detailed articles for each job.</p>
<h2>How long your season really is</h2>
<p>The frost-free season, from the typical last spring frost to the typical first fall frost, is the backbone of every planting date. From NOAA records it runs about ${sea.season} days in Seattle and ${pdx.season} in Portland, but about ${boi.season} in Boise, ${spo.season} in Spokane and only ${bend.season} around Bend and Redmond. That gap is why one region's advice can be wrong in another. Our article on <a href="${link("articles/frost-dates-explained/")}">what your last frost date really means</a> explains how to read these numbers, and your <a href="${link("frost-dates/")}">town calendar</a> has your own.</p>
<p>Plants sort into two camps. Cool-season crops (peas, lettuce, spinach, kale, cabbage, carrots, radishes) grow best in mild weather and handle light frost. Warm-season crops (tomatoes, peppers, beans, squash, corn, basil) need warm soil and warm nights and are killed by frost. Most seasonal planning is just putting each camp in the weather it likes.</p>
<h2>Spring: cool crops first, warm crops wait</h2>
<p>Spring is when the garden fills up, and when most mistakes happen. A sunny week tempts people to plant everything at once, but cold, wet soil is what holds Northwest gardens back, especially west of the Cascades.</p>
<ul>
<li><strong>Early spring:</strong> sow <a href="${link("when-to-plant/peas/")}">peas</a>, spinach and radishes, and set out <a href="${link("when-to-plant/lettuce/")}">lettuce</a>, onions and cabbage-family transplants. These go in weeks before the last frost.</li>
<li><strong>Indoors:</strong> start tomatoes and peppers on schedule (see <a href="${link("articles/starting-seeds-indoors/")}">starting seeds indoors</a>) and give them a week or so of <a href="${link("articles/hardening-off-seedlings/")}">hardening off</a> before they go out.</li>
<li><strong>Late spring:</strong> warm crops go out only after your last frost and once the soil has warmed. <a href="${link("articles/soil-temperature/")}">Soil temperature</a> is a better guide than the calendar.</li>
</ul>
<p><strong>Spring tips:</strong> keep row cover or old sheets handy for frosty nights, start slug control early (<a href="${link("articles/slugs/")}">here's how</a>), and don't dig or walk on beds while the soil is sticky: squeeze a handful, and if it stays in a muddy ball, wait a few days.</p>
<h2>Summer: heat, water and the second planting</h2>
<p>Summers here are dry almost everywhere, even west of the Cascades, where July and August get little rain. Warm crops finally take off, and cool crops planted in spring start to bolt (go to seed) as days get long and hot.</p>
<ul>
<li><strong>Water deeply, not daily.</strong> Mulch the beds once the soil is warm and see <a href="${link("articles/watering-vegetables-in-dry-summers/")}">how much to water in a dry summer</a>.</li>
<li><strong>Replace what bolts.</strong> Pull spent lettuce and peas and resow with beans, or keep small sowings going all summer with <a href="${link("articles/succession-planting/")}">succession planting</a>.</li>
<li><strong>Plant for fall and winter in midsummer.</strong> It feels early, but kale, broccoli, carrots and other winter crops have to be sized up before the days shorten. In short-season towns the window comes even sooner.</li>
</ul>
<p><strong>Summer tips:</strong> water in the morning so leaves dry before evening, pick beans, zucchini and cucumbers often so plants keep producing, and watch tomatoes for late blight once the late-summer dews return (<a href="${link("articles/tomato-late-blight/")}">what to look for</a>).</p>
<h2>Fall: harvest, plant and protect</h2>
<p>Fall is the busiest harvest season and a planting season at the same time. Typical first frosts are around ${spo.first} in Spokane, ${boi.first} in Boise and ${pdx.first} in Portland, so the east side has to wrap up warm crops weeks before the west.</p>
<ul>
<li><strong>Harvest warm crops before frost.</strong> Pick tomatoes, peppers, squash and beans ahead of the first cold night, and bring in winter squash once the skin is hard.</li>
<li><strong>Plant for next year.</strong> Fall is the time for <a href="${link("articles/planting-garlic-in-the-northwest/")}">garlic</a>, spring bulbs and many perennials, which root in over the cool, damp months.</li>
<li><strong>Cover the soil.</strong> Sow a <a href="${link("articles/winter-cover-crops/")}">winter cover crop</a> or spread leaves over empty beds so winter rain doesn't wash the soil away. <a href="${link("articles/putting-the-garden-to-bed/")}">Putting the garden to bed</a> has the full checklist.</li>
</ul>
<p><strong>Fall tips:</strong> save your fallen leaves for <a href="${link("articles/leaf-mold-from-fall-leaves/")}">leaf mold</a>, write down what did well and what didn't while you still remember, and clear out diseased plants rather than composting them.</p>
<h2>Winter: rest, plan and pick what's still standing</h2>
<p>West of the Cascades, winter is mild enough that kale, leeks, chard, collards and other hardy crops keep standing in the garden for picking; our <a href="${link("articles/fall-and-winter-vegetable-garden/")}">fall and winter vegetable garden</a> guide covers which ones and how. East of the Cascades and in the high desert, the ground freezes and most of the garden rests.</p>
<ul>
<li><strong>Plan next year.</strong> Sketch your beds, move crop families to new spots with a simple <a href="${link("articles/crop-rotation-for-small-gardens/")}">crop rotation</a>, and order seed early. A <a href="${link("my-garden/")}">free garden plan</a> gives you a dated to-do list for your town.</li>
<li><strong>Prune and plant fruit.</strong> Late winter is the time for <a href="${link("articles/winter-pruning-apple-and-pear-trees/")}">pruning apples and pears</a> and <a href="${link("articles/planting-bare-root-fruit-trees/")}">planting bare-root trees</a>.</li>
<li><strong>Look after your tools.</strong> Clean and sharpen them, and drain hoses before hard freezes.</li>
</ul>
<p><strong>Winter tips:</strong> stay off wet beds so the soil doesn't compact, check stored potatoes, squash and onions every few weeks for soft spots, and get a soil test done before spring so you know whether you need lime (<a href="${link("articles/soil-ph-and-lime/")}">soil pH explained</a>).</p>
<h2>Shift the advice for where you live</h2>
<p>West of the Cascades, the season is long but cool, so the challenge is warmth: pick early-ripening varieties and use the long fall and winter for cool crops. East of the Cascades and in Idaho, summers are hot and the season is shorter, so the challenge is timing: get warm crops in as soon as it's safe and be ready to cover them at both ends. In the high desert, every week counts; <a href="${link("articles/short-season-gardening-central-oregon/")}">short-season gardening in Central Oregon</a> has the playbook. For a month-by-month list of jobs, see the <a href="${link("garden-calendar/")}">garden calendar</a>.</p>`;
    }
  },
  {
    slug: "composting-in-a-rainy-climate",
    topic: "soil", icon: "leaves",
    author: "site",
    title: "Making Compost in a Rainy Northwest Garden",
    seoTitle: "How to Make Compost in the Northwest | Rainline Garden",
    description: "Wet winters and dry summers both make home compost harder. How to build a pile that breaks down here, what to put in, and how to fix one that's slimy or stuck.",
    crops: ["tomatoes", "summer-squash", "kale", "lettuce"],
    published: "2026-11-08",
    body: ({ link }) => `
<p>If you've ever tried composting and ended up with a slimy, smelly heap in February, or a dry pile of leaves that looked exactly the same in August as it did in October, you're in good company. Composting is simple in principle, but the Northwest's weather has a way of tripping people up.</p>
<p>Compost is decomposed plant material that feeds soil life, loosens clay, helps sandy soil hold water and slowly releases nutrients. Almost every bed on this site starts with "mix in an inch or two of compost." Making your own is cheap and uses up kitchen scraps and garden waste, but the Northwest's weather makes it a little different from the textbook. West of the Cascades, piles get soaked all winter. East of the Cascades, they dry out all summer.</p>
<h2>Greens, browns, air and water</h2>
<p>A compost pile needs four things in balance:</p>
<ul>
<li><strong>Greens</strong> are fresh, moist and rich in nitrogen: vegetable scraps, coffee grounds, fresh grass clippings, green plant trimmings.</li>
<li><strong>Browns</strong> are dry and carbon-rich: fallen leaves, straw, shredded cardboard and paper, wood chips in small amounts.</li>
<li><strong>Air</strong>, because the microbes that make good compost need oxygen. Without it, a pile turns slimy and sour.</li>
<li><strong>Water</strong>, about as damp as a wrung-out sponge.</li>
</ul>
<p>A rough rule is two to three buckets of browns for every bucket of greens. You don't need to measure: if the pile smells bad, add browns; if nothing is happening, add greens and water.</p>
<h2>What to leave out</h2>
<ul>
<li>Meat, fish, bones and dairy, which attract rats, raccoons and dogs.</li>
<li>Diseased plants, such as tomatoes with late blight, and weeds that have gone to seed. A home pile rarely gets hot enough to kill them, so bag them for the yard-waste bin.</li>
<li>Pet waste from dogs and cats, and charcoal ashes.</li>
<li>Roots of spreading weeds like bindweed and quackgrass, which can resprout.</li>
</ul>
<h2>Choosing a bin</h2>
<p>You don't need anything fancy, and the right choice depends mostly on how much material you have.</p>
<p>A simple open bin made of wire fencing, pallets or boards, about 3 feet on each side, handles a typical yard's leaves and garden waste and is easy to turn with a fork. Many cities and counties in the region sell or give away plastic bins with lids, which keep rain off and look tidier in a small yard. Tumblers, barrels on a stand that you rotate, are easy to turn and keep rats out, but they hold less than people expect and work best when filled in batches rather than a little at a time.</p>
<p>If you don't have a yard at all, a worm bin is worth a look. A plastic tote with holes drilled for air, some shredded newspaper bedding and a pound or so of red wiggler worms (not garden earthworms) will turn kitchen scraps into rich worm castings under a sink or on a balcony. Keep it out of hard frost and summer heat, and don't overfeed it.</p>
<h2>West of the Cascades: keep the rain off</h2>
<p>A wet Northwest winter can turn an open pile into a cold, soggy, smelly mass. The fix is simple:</p>
<ul>
<li><strong>Use a lid or a cover.</strong> A closed bin, or a tarp over a heap, keeps out the worst of the rain. Lift it during dry spells if the pile needs moisture.</li>
<li><strong>Add extra browns in winter.</strong> Store a few bags of fall leaves next to the bin. Every time you add kitchen scraps, cover them with a layer of leaves. It soaks up excess water and stops smells.</li>
<li><strong>Put the bin on soil, not concrete,</strong> so extra water drains away and worms can move in.</li>
<li><strong>Expect slow going.</strong> Piles barely work through cold winter months. They pick up again in spring, so don't worry if nothing seems to change from November to March.</li>
</ul>
<h2>East of the Cascades: keep the water in</h2>
<p>In the drier summers of eastern Oregon and Washington and southern Idaho, the opposite happens: piles dry out and stop. Water the pile when you water the garden, soak dry browns before adding them, and choose a shady or partly shaded spot. A closed bin or a covered pile holds moisture far better than an open heap.</p>
<h2>Turning and timing</h2>
<p>Turning the pile with a fork every few weeks mixes in air and speeds things up, and a well-tended pile can be ready in a few months. A pile you never turn still becomes compost, but it can take a year or more. Either works; it's a trade between your time and the pile's.</p>
<p>A big, well-balanced pile can heat up to 130 to 150°F in the middle within a few days of building it. That's hot composting, and it's fast, and it kills most weed seeds and many disease organisms. It needs a pile at least about 3 feet across and high, built all at once with a good mix of greens and browns, and turned when it starts to cool. Most home piles, built a bucket at a time, never get that hot. That's cold composting: slower, and you shouldn't count on it to kill weed seeds, but it still makes perfectly good compost.</p>
<p>Compost is ready when it's dark, crumbly and smells like earth, and you can't pick out most of what went in. Sift out any lumps and toss them back in the bin to finish.</p>
<h2>Fixing a pile that isn't working</h2>
<ul>
<li><strong>Smells rotten or looks slimy:</strong> too wet or too many greens. Mix in dry leaves or shredded cardboard and turn it.</li>
<li><strong>Dry and not breaking down:</strong> too dry or too many browns. Water it as you turn it and add fresh greens.</li>
<li><strong>Fruit flies:</strong> bury fresh scraps under a few inches of browns.</li>
<li><strong>Rats or raccoons:</strong> stop adding cooked food, keep scraps buried, and use a bin with a lid and a wire mesh bottom.</li>
</ul>
<h2>Using it</h2>
<p>Spread an inch or two over beds in spring or fall and work it lightly into the top few inches, mix it into planting holes for vegetables and flowers, or use it as a thin mulch. It's especially useful in <a href="${link("articles/raised-beds-for-rainy-gardens/")}">raised beds</a>, where the soil level drops each year, and around hungry crops like <a href="${link("when-to-plant/tomatoes/")}">tomatoes</a> and <a href="${link("when-to-plant/summer-squash/")}">squash</a>. Fallen leaves on their own make a different, slower product; see <a href="${link("articles/leaf-mold-from-fall-leaves/")}">turning fall leaves into leaf mold</a>.</p>`
  },
  {
    slug: "harvesting-and-preserving-herbs",
    topic: "crops",
    author: "site",
    title: "Harvesting, Drying and Freezing Kitchen Herbs",
    seoTitle: "How to Harvest, Dry and Freeze Herbs | Rainline Garden",
    description: "When and how to cut basil, parsley, thyme and other kitchen herbs so they keep growing, plus the best way to dry or freeze each one before a Northwest frost.",
    crops: ["basil", "parsley", "thyme", "rosemary", "oregano", "sage", "chives", "mint", "cilantro", "dill"],
    published: "2026-11-08",
    body: ({ link }) => `
<p>There's no easier way to make your cooking taste better than walking outside with a pair of scissors. A few pots of herbs by the back door save you buying sad little plastic packs at the store, and in a good summer you'll have far more than you can use fresh.</p>
<p>Most kitchen herbs grow better the more you cut them, as long as you cut them the right way. A basil plant picked properly all summer turns bushy and keeps going; one that's left alone grows tall, flowers and quits. This guide covers how to harvest each common herb so it keeps producing, and how to save the extra before frost. For when to plant each one in your town, see the <a href="${link("when-to-plant/herbs/")}">herbs planting guide</a>.</p>
<h2>When to pick</h2>
<ul>
<li><strong>Morning is best.</strong> Pick after the dew has dried but before the afternoon sun. Leaves are full of water and flavor then.</li>
<li><strong>Before flowering, for leafy herbs.</strong> Basil, cilantro, parsley and mint taste best before they bloom. Once flowers form, many get bitter or stop making new leaves.</li>
<li><strong>Take no more than a third.</strong> Cutting more than about a third of a plant at once slows it down, especially perennials.</li>
</ul>
<h2>How to cut each herb</h2>
<ul>
<li><strong><a href="${link("when-to-plant/basil/")}">Basil</a>:</strong> pinch or cut each stem just above a pair of leaves. Two new shoots grow from that spot, so the plant branches. Pinch off flower buds as soon as they appear.</li>
<li><strong><a href="${link("when-to-plant/parsley/")}">Parsley</a> and <a href="${link("when-to-plant/cilantro/")}">cilantro</a>:</strong> cut the outer stems at the base and leave the center to keep growing.</li>
<li><strong><a href="${link("when-to-plant/chives/")}">Chives</a>:</strong> cut a clump down to an inch or two above the ground. It regrows within a few weeks.</li>
<li><strong><a href="${link("when-to-plant/mint/")}">Mint</a> and <a href="${link("when-to-plant/oregano/")}">oregano</a>:</strong> cut stems back by a third to a half. A hard trim in midsummer brings a fresh flush of tender leaves.</li>
<li><strong><a href="${link("when-to-plant/thyme/")}">Thyme</a>, <a href="${link("when-to-plant/rosemary/")}">rosemary</a> and <a href="${link("when-to-plant/sage/")}">sage</a>:</strong> snip soft green tips. Avoid cutting into old, bare wood, which often doesn't resprout.</li>
<li><strong><a href="${link("when-to-plant/dill/")}">Dill</a>:</strong> snip leaves as needed. If you want seeds, leave a few plants to flower and cut the heads once the seeds turn brown.</li>
</ul>
<h2>Before the first frost</h2>
<p>Basil is the first to go: it blackens after even a light frost, and often looks unhappy as soon as fall nights turn cool. Pick the whole crop before your first frost date, which your <a href="${link("frost-dates/")}">town calendar</a> shows. Parsley, chives, sage, thyme and oregano handle cold much better, and west of the Cascades many keep going into winter. Rosemary is hardy in milder west-side gardens but often dies in colder east-side and high desert winters, so many gardeners there keep it in a pot and bring it into a cool, bright spot.</p>
<p>Stop cutting perennial herbs hard about a month before your first frost, so the plants aren't pushing soft new growth into the cold.</p>
<h2>Drying</h2>
<p>Drying works best for herbs with tougher leaves and strong oils: oregano, thyme, rosemary, sage, mint and dill. Tie small bunches with string and hang them upside down somewhere warm, dark and airy. In a damp Northwest fall, a spare room or a spot near (not on) a heat source works better than a garage or porch, where they can mold. They're ready when the leaves crumble, usually in one to two weeks. Strip the leaves, keep them whole if you can, and store them in a sealed jar away from light.</p>
<p>A dehydrator on its lowest setting, or an oven at its lowest temperature with the door cracked, is faster. Keep the heat low; high heat drives off flavor.</p>
<h2>Freezing</h2>
<p>Soft, leafy herbs lose most of their flavor when dried. Freeze them instead:</p>
<ul>
<li><strong>Basil:</strong> blend with olive oil, or make pesto, and freeze in ice cube trays. Plain basil leaves turn black in the freezer, so the oil helps.</li>
<li><strong>Parsley, cilantro, chives and dill:</strong> chop, pack into ice cube trays, cover with water or oil and freeze. Pop out the cubes and store them in a freezer bag.</li>
<li><strong>Any herb:</strong> a thin layer of chopped herbs in a flat freezer bag lets you snap off what you need.</li>
</ul>
<h2>Herb salt, butter and vinegar</h2>
<p>A few old-fashioned methods are worth trying with the last of the harvest. For herb salt, blend a packed cup of fresh herbs (rosemary, sage, thyme and parsley are a good mix) with about half a cup of coarse salt, spread it on a tray to dry for a few days, then store it in a jar. For herb butter, mix finely chopped herbs into soft butter, roll it into a log in parchment and freeze it; slice off a coin whenever you need it. Herb vinegar, made by steeping clean sprigs of tarragon, thyme or rosemary in white wine vinegar in the fridge for a couple of weeks, keeps the flavor for salad dressings all winter. Always use fresh, clean, dry herbs, and keep homemade herb oils in the fridge and use them within a few days, since garlic and herbs in oil at room temperature can grow harmful bacteria.</p>
<h2>Keeping fresh herbs</h2>
<p>Treat cut basil, parsley and cilantro like flowers: trim the stems and stand them in a glass of water. Basil stays happier on the counter than in the fridge. Parsley and cilantro last longer in the fridge with a loose bag over the top. Woody herbs keep well wrapped in a slightly damp paper towel in the fridge.</p>
<p>Herbs are also one of the easiest things to grow in pots by the kitchen door; see <a href="${link("articles/container-vegetable-gardening/")}">growing vegetables in containers</a> for soil and watering tips.</p>`
  }
];
