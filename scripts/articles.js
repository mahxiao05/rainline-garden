/* Hand-written articles. Each body is a function so it can quote live numbers from the data.
 * Fields: slug, author (id in AUTHORS in build.js), title (page title and H1), description (meta), crops (related crop ids),
 * published (YYYY-MM-DD), body(ctx) returning HTML. ctx = { D, P, frost(slug), link(path), fig(n) }; fig(n) places the "inline:<slug>-<n>" photo from scripts/photos.js.
 */
module.exports = [
  {
    slug: "best-tomatoes-for-the-northwest",
    topic: "crops",
    author: "jigmey-dorjee",
    title: "The Best Tomatoes for Cool Northwest Summers",
    description: "Big slicers often stay green in a cool Northwest summer. These are the tomatoes that do ripen in Portland, Seattle and on the coast.",
    crops: ["tomatoes"],
    published: "2026-10-13",
    quick: () => [
      ["Pick", "Fast varieties that set fruit in cool nights: Stupice, Early Girl, Sungold, Oregon Spring or Legend."],
      ["When", "Once the soil is warm and nights are mild. In Portland that usually means mid-May."],
      ["Help them", "The warmest spot you have, black plastic, wall-o-water rings, and less water in August."]
    ],
    body: ({ frost, link, fig }) => {
      const pdx = frost("portland-or"), sea = frost("seattle-wa"), ast = frost("astoria-or");
      return `
<p>Every spring, Northwest garden centers fill up with tomato starts bred for places like California and the Midwest. Many of them will grow beautifully here and then hang green on the vine in September. The problem isn't frost. Portland's typical last spring frost is ${pdx.last} and Seattle's is ${sea.last}, giving both cities a long frost-free season. The problem is heat. Tomatoes need warm days and, just as important, warm nights to set and ripen fruit, and west of the Cascades summer nights often dip into the low 50s.</p>
<p>The fix is to choose varieties that finish fast and tolerate cool nights, then help them along.</p>
<h2>Varieties that ripen reliably</h2>
<ul>
<li><strong>Stupice.</strong> A Czech heirloom with small, flavorful red fruit. It's one of the earliest tomatoes you can grow and keeps producing until fall.</li>
<li><strong>Early Girl.</strong> A dependable hybrid that ripens medium-sized fruit well ahead of most slicers.</li>
<li><strong>Sungold.</strong> An orange cherry tomato that's sweet, early and heavy-yielding. If you only grow one plant, many Northwest gardeners would pick this one.</li>
<li><strong>Oregon Spring.</strong> Bred in Oregon for exactly this climate. It sets fruit in cool weather and ripens early.</li>
<li><strong>Legend.</strong> Another Oregon-bred variety, with large fruit and some resistance to late blight.</li>
</ul>
<h2>Why cool nights are the real problem</h2>
<p>It helps to know what a tomato is actually waiting for. The flowers need nights that stay above roughly 55°F to make good pollen and set fruit. Below that, blossoms often drop off without forming a tomato, which is why plants can look healthy and flower all through June and still have almost nothing on them by July. Once fruit has set, the red color develops best when days are in the 70s. A Portland or Seattle summer has plenty of days like that, but the run of warm nights is short, so a variety that needs 85 days from transplant is racing the calendar from the start.</p>
<p>East of the Cascades and in southern Oregon the story flips. Medford, Boise and the Tri-Cities have hot days and warm enough nights for almost any tomato, including big heirloom beefsteaks. There, the risk is more often heat: when days run well into the 90s, plants drop blossoms and fruit can ripen unevenly. The varieties below are chosen for the cooler west side, where they make the biggest difference.</p>
<p>In general, cherry and small salad tomatoes are the safest bets, and big beefsteaks are the riskiest. Look at the "days to maturity" on the tag: under 70 days is a good sign for west-side gardens, and under 60 is better on the coast, where Astoria's summers rarely get truly hot.</p>
${fig(1)}
<h2>Give them every bit of heat you can</h2>
<ul>
<li><strong>Plant late, not early.</strong> Wait until the soil has warmed and nights stay mild. Tomatoes set out in cold April soil just sit and sulk. In Portland that usually means mid-May; <a href="${link("when-to-plant/tomatoes/?town=portland-or#your-town")}">see the exact window</a>.</li>
<li><strong>Use the warmest spot.</strong> A south- or west-facing wall stores heat and gives it back at night.</li>
<li><strong>Warm the soil.</strong> Black or red plastic mulch laid a week before planting can raise soil temperature several degrees.</li>
<li><strong>Protect young plants.</strong> Wall-o-water rings or a simple plastic cloche keep nights warmer for the first few weeks.</li>
<li><strong>Don't overwater late in summer.</strong> Easing off water in August encourages plants to ripen what they have.</li>
</ul>
<h2>Determinate or indeterminate?</h2>
<p>Seed packets and plant tags usually say one or the other, and in a short season it matters. <strong>Determinate</strong> (bush) tomatoes grow to a set size, then ripen most of their crop over a few weeks. That's handy on the coast or in a cool year, because the fruit comes in before the weather turns, and it suits canning. <strong>Indeterminate</strong> (vining) tomatoes keep growing and setting fruit until frost or blight stops them. They give a longer harvest but need tall stakes or cages, and their late fruit often never ripens here. Stupice, Sungold and Early Girl are indeterminate; Oregon Spring and Legend are determinate types bred for this region.</p>
<h2>Pruning and topping for a short season</h2>
<p>You don't have to prune tomatoes, but on the west side a little pruning helps fruit ripen. On vining types, pinch off some of the side shoots (suckers) that grow in the joint between a leaf and the main stem, especially low on the plant. Fewer stems means more airflow, which also helps against disease, and more of the plant's energy goes into the fruit you already have.</p>
<p>Then, in late August or early September, "top" the plant: cut off the growing tips and any new flower clusters. Flowers that open in September won't have time to become ripe tomatoes before fall rain and cold arrive, and removing them sends the plant's sugar into the green fruit already hanging there.</p>
<h2>Beat late blight in a wet fall</h2>
<p>When fall rains arrive, late blight can turn leaves and fruit brown almost overnight. Space plants for airflow, water at the base, and in September pinch off new flowers so the plant puts its energy into fruit that can still ripen. If rain sets in with green fruit on the vine, pick it: mature green tomatoes ripen fine on a kitchen counter.</p>
<p>Not every green tomato will ripen indoors, though. A "mature green" fruit has reached full size, has a glossy skin that's starting to turn pale or whitish-green, and when you cut one open the seeds are surrounded by jelly rather than sliced through. Small, hard, dark green fruit usually just shrivels. Keep picked tomatoes at room temperature, out of the fridge and out of direct sun, in a single layer, and check them every few days. They won't taste quite like a vine-ripened August tomato, but they're far better than store-bought in October. Our guide to <a href="${link("articles/tomato-late-blight/")}">late blight</a> covers how to spot it and what to do with infected plants.</p>
<h2>If your tomatoes didn't ripen this year</h2>
<p>Run through the usual causes before you give up. Was the variety rated at more than 75 days? Did plants go out in cold soil in April or early May and stall? Is the spot shaded for part of the afternoon by trees that leafed out after you planted? Did they get a lot of water and fertilizer late in the season, which keeps them growing leaves instead of ripening? Each of those is fixable next year, and fixing two of them usually turns a disappointing year into a good one.</p>
<p>When you're ready, <a href="${link("when-to-plant/tomatoes/")}">look up tomato planting dates for your town</a>.</p>`;
    }
  },
  {
    slug: "fall-and-winter-vegetable-garden",
    topic: "timing", icon: "winter",
    author: "jigmey-dorjee",
    title: "Fall and Winter Vegetable Gardening West of the Cascades",
    description: "West of the Cascades, kale, leeks and carrots keep going through most winters. The catch is planting them in July and August.",
    crops: ["kale", "carrots", "garlic", "spinach", "broccoli", "cabbage", "lettuce"],
    published: "2026-10-13",
    quick: () => [
      ["When", "Mid to late summer. Start broccoli, cabbage and kale in July and set them out in August."],
      ["Best crops", "Kale, carrots, beets, leeks, spinach and fall-planted garlic."],
      ["Protect", "Row cover for nights in the low 20s, and beds that drain."]
    ],
    body: ({ frost, link }) => {
      const pdx = frost("portland-or"), sea = frost("seattle-wa"), spo = frost("spokane-wa");
      return `
<p>Most of the country puts the garden to bed in October. West of the Cascades you don't have to. Portland's typical first fall frost isn't until ${pdx.first}, Seattle's is around ${sea.first}, and winters are usually mild enough that hardy crops keep growing slowly or simply hold in the ground until you're ready to pick them.</p>
<p>The catch is timing. Fall and winter crops have to be planted in mid to late summer, while it still feels like the middle of the growing season.</p>
<h2>The key idea: grow it before the light goes</h2>
<p>Plants grow very little once days get short in November. A winter garden isn't really growing in winter; it's a garden that grew to full size by early fall and then stands in the cold like a refrigerator you can walk out to. So the planting dates count back from fall, not forward from spring.</p>
<h2>How to count back from your first frost</h2>
<p>Here's a simple way to work out your own dates. Take the "days to maturity" on the seed packet, add about two weeks, and count back from your typical first fall frost. The extra two weeks is what gardeners call the fall factor: plants grow more slowly as days shorten and nights cool, so they take longer to reach full size in September than the same crop would in June. Add a couple more weeks if you're transplanting starts you still have to grow from seed.</p>
<p>For example, a kale with 60 days to maturity, plus two weeks, is about 75 days. Count back 75 days from Portland's typical first frost of ${pdx.first} and you land in early September for planting out transplants, which means starting the seeds in a tray in July. Kale doesn't mind frost, so you have some wiggle room. For a tender crop like lettuce you'd want it close to full size before hard cold arrives.</p>
<h2>What to plant, and when</h2>
<ul>
<li><strong>July:</strong> start broccoli, cabbage and kale from seed in trays or a shaded nursery bed, and sow carrots and beets directly in the garden.</li>
<li><strong>August:</strong> set out those starts in the garden, and sow spinach, lettuce and radishes.</li>
<li><strong>Early September:</strong> a last sowing of spinach and hardy lettuce like Winter Density.</li>
<li><strong>October to mid-November:</strong> plant garlic for next summer.</li>
</ul>
<p>Your exact dates depend on where you are. For example, see <a href="${link("when-to-plant/kale/?town=portland-or#your-town")}">kale in Portland</a> or <a href="${link("when-to-plant/carrots/?town=seattle-wa#your-town")}">carrots in Seattle</a>, which include a fall window.</p>
<h2>The most dependable winter crops</h2>
<ul>
<li><strong>Kale.</strong> The champion. Frost actually sweetens the leaves, because the plant turns some of its starch into sugar as it gets cold, and plants often produce from fall into spring.</li>
<li><strong>Carrots and beets.</strong> Leave them in the ground and dig as needed. Fall carrots are noticeably sweeter.</li>
<li><strong>Leeks.</strong> Stand all winter without fuss.</li>
<li><strong>Spinach.</strong> Slow in December, then one of the first things to take off in February.</li>
<li><strong>Purple sprouting broccoli and overwintering cauliflower.</strong> Planted in summer, they sit through winter and crop in early spring when little else is ready.</li>
<li><strong>Garlic.</strong> Planted in fall, harvested the next July.</li>
</ul>
<h2>Protecting the garden through winter</h2>
<p>A layer of floating row cover adds a few degrees of protection on nights in the low 20s, and it keeps heavy rain from battering leaves. Mulch root crops with straw or leaves. Most important of all, make sure beds drain. Plants handle cold far better than they handle sitting in waterlogged soil, which is why <a href="${link("articles/raised-beds-for-rainy-gardens/")}">raised beds</a> shine in Northwest winters.</p>
<p>Most winters bring at least one arctic cold snap, when temperatures can fall into the teens for a few days. Kale, leeks, collards and garlic usually come through looking battered and then regrow. Lettuce, chard and young brassicas are more tender, and are worth covering with a double layer of fabric, or a sheet over the row cover, until the cold passes. A low tunnel of clear plastic over hoops gives even more protection, but open the ends on sunny days so plants don't overheat.</p>
<h2>Picking in winter</h2>
<p>Harvest on mild days, not when the plants are frozen. Frozen leaves bruise and turn to mush if you handle them, but the same leaves are fine once they thaw on the plant. Take the lower, outer leaves of kale, chard and collards and leave the growing center so the plant keeps producing. Pull leeks and dig carrots as you need them rather than all at once: the soil keeps them fresher than your fridge does. If the ground is likely to freeze hard, dig a few days' worth ahead of time.</p>
<h2>Winter pests aren't gone</h2>
<p>Slugs stay active on mild, wet winter nights, and they lay eggs in fall, so a little bait or hand-picking in October and November pays off next spring (see <a href="${link("articles/slugs/")}">controlling slugs</a>). Gray, waxy cabbage aphids can build up on kale and Brussels sprouts in fall; a hard spray of water knocks them back, and frost usually finishes them. Cabbage worms slow down when it gets cold, but check brassicas you plant out in August, when the white butterflies are still laying eggs. Row cover keeps them off.</p>
<h2>East of the Cascades</h2>
<p>Inland, fall gardening is shorter and winter harvesting is harder. Spokane's typical first frost is around ${spo.first}, and the ground can freeze solid in December. You can still grow a good fall crop of kale, carrots, spinach and lettuce by planting a few weeks earlier than the west-side dates above, and carrots and leeks mulched with a thick layer of straw can often be dug into early winter. For greens through the coldest months, a cold frame or a hoop tunnel helps a lot. Check <a href="${link("frost-dates/")}">your town's first frost date</a> and count back from there.</p>
<p>See what's in season this month on the <a href="${link("garden-calendar/")}">monthly chores page</a>.</p>`;
    }
  },
  {
    slug: "short-season-gardening-central-oregon",
    topic: "timing", icon: "mountain",
    author: "jigmey-dorjee",
    title: "Gardening in Bend and Central Oregon's Short Season",
    description: "Bend and Redmond can see frost in June and again in September. What still grows well there, and how gardeners stretch the season.",
    crops: ["tomatoes", "peas", "lettuce", "potatoes", "kale", "summer-squash"],
    published: "2026-10-13",
    quick: () => [
      ["The season", "About 97 frost-free days at Redmond, the station closest to Bend."],
      ["Grow", "Frost-hardy crops like peas, kale, carrots and potatoes as the backbone."],
      ["Warm crops", "Fast transplants (60 days or less) with wall-o-waters and row cover ready."]
    ],
    body: ({ frost, link, fig }) => {
      const bend = frost("bend-or"), kf = frost("klamath-falls-or");
      return `
<p>Gardening in Central Oregon takes a different playbook than the Willamette Valley. At Redmond, the NOAA weather station closest to Bend, the typical last spring frost is ${bend.last} and the first fall frost comes around ${bend.first}. That's a frost-free season of about ${bend.season} days, and in some years frost shows up in July. Klamath Falls is similar, with about ${kf.season} frost-free days.</p>
<p>It's absolutely possible to grow a productive garden here. You just have to pick the right crops and give warm-season ones some help.</p>
<h2>Lean on crops that shrug off frost</h2>
<p>Cool-season crops are the backbone of a high desert garden. Peas, lettuce, spinach, radishes, kale, chard, carrots, beets, onions and potatoes all handle light frost and can go in weeks before the last frost date. See <a href="${link("when-to-plant/peas/?town=bend-or#your-town")}">peas in Bend</a> or <a href="${link("when-to-plant/potatoes/?town=bend-or#your-town")}">potatoes in Bend</a> for exact windows.</p>
<h2>Give warm crops a head start and a blanket</h2>
<ul>
<li><strong>Always use transplants</strong> for tomatoes, peppers and squash. There isn't time to start them from seed outdoors.</li>
<li><strong>Choose the fastest varieties.</strong> Look for 60 days or less to maturity: Stupice or Sungold tomatoes, early zucchini, and short-season corn.</li>
<li><strong>Use wall-o-water rings or cloches</strong> for the first few weeks after planting. They store daytime heat and release it on cold nights.</li>
<li><strong>Keep row cover handy all season.</strong> Watch the forecast and cover tender plants on any night forecast below about 40°F.</li>
</ul>
<h2>Water and wind</h2>
<p>Central Oregon is dry, with intense sun and big temperature swings between day and night. Drip irrigation on a timer, a thick layer of mulch, and a windbreak (a fence, a hedge, or even shade cloth on the windward side) make a bigger difference here than almost anywhere else in the Northwest.</p>
<h2>Raised beds and soil</h2>
<p>Raised beds warm up faster in spring, which buys you time. Many Central Oregon soils are sandy, rocky or low in organic matter, so filling beds with a good soil and compost mix pays off quickly.</p>
<h2>A season in order</h2>
<ul>
<li><strong>Late winter:</strong> start onions and leeks indoors, then tomatoes and peppers about six to eight weeks before you expect to plant them out.</li>
<li><strong>As soon as the soil can be worked:</strong> peas, spinach, lettuce, radishes and onion starts. A light frost won't hurt them.</li>
<li><strong>A few weeks later:</strong> potatoes, carrots, beets, kale and broccoli starts.</li>
<li><strong>After the typical last frost (${bend.last}):</strong> tomatoes, squash and beans, with covers ready. In many years a cold night still arrives after that date.</li>
<li><strong>Midsummer:</strong> a second sowing of lettuce, radishes and spinach for fall, timed to mature before the first frost around ${bend.first}.</li>
<li><strong>September to October:</strong> plant garlic, which overwinters and is one of the most reliable crops in the high desert.</li>
</ul>
${fig(1)}
<h2>Stretch the season at both ends</h2>
<p>A cold frame, a low tunnel of plastic over hoops, or a small hoop house adds weeks in spring and fall, which is a big share of a short season. Even a sheet of row cover laid over plants on a clear, still evening can hold in enough warmth to get them through a light frost. Clear nights are the coldest ones here; cloudy nights are much milder.</p>
<h2>Crops to treat as a bonus</h2>
<p>Some crops are possible here but not dependable, and it's worth growing them knowing that. Peppers and eggplant need a long, warm season and sulk in cold nights; grow them in pots you can move against a sunny wall or into a garage on a cold night, or under a hoop house. Melons and winter squash need a fast variety, black plastic mulch to warm the soil, and row cover until they flower. Sweet corn needs a short-season variety and warm soil before you sow. In a warm year all of these can do well. In a cool year you'll be glad most of the garden was kale, potatoes and peas.</p>
<h2>Common mistakes in a high desert garden</h2>
<ul>
<li><strong>Planting warm crops on the first warm weekend.</strong> A sunny week in May fools people every year. Watch the 10-day forecast for nights, not days.</li>
<li><strong>Watering a little every day.</strong> In sandy soil, short sprinklings stay near the surface and dry out fast in the wind. Longer, less frequent soakings through drip lines push water deeper, and roots follow it. See <a href="${link("articles/watering-vegetables-in-dry-summers/")}">how much to water</a>.</li>
<li><strong>Leaving soil bare.</strong> Sun and wind dry and crust bare ground quickly. Straw or shredded leaves keep moisture in and soil cooler in July.</li>
<li><strong>Forgetting fall.</strong> The first frost can come early, and on a clear September night temperatures can fall much faster than forecast. Pick ripe tomatoes and squash ahead of any cold forecast, and have covers ready from late August on.</li>
</ul>
<h2>Deer, rabbits and ground squirrels</h2>
<p>Gardens near open land in Central Oregon often see more wildlife damage than city gardens on the west side. Deer browse lettuce, beans and fruit trees; rabbits nibble young greens; ground squirrels dig up seeds and young plants. A fence is the only reliable answer to deer, usually around 7 to 8 feet tall, while chicken wire or hardware cloth along the bottom of a fence, buried a few inches, keeps out rabbits. Row cover held down at the edges also hides seedlings from birds and rodents in their first weeks.</p>
<h2>If you garden higher up</h2>
<p>Gardens in Sisters, La Pine and other higher or low-lying spots often run colder than the airport stations. Low spots where cold air drains at night can frost weeks later in spring than a slope a short walk away. Keep a cheap minimum-maximum thermometer in the garden for a season and you'll learn how your own yard compares.</p>
<p>For every crop's dates, see the <a href="${link("frost-dates/bend-or/")}">Bend and Redmond planting calendar</a>.</p>`;
    }
  },
  {
    slug: "slugs",
    topic: "problems", icon: "slug",
    author: "elaine-holloway",
    title: "How to Control Slugs in a Northwest Garden",
    description: "Gray garden slugs do most of the damage in Northwest beds. When they hatch, how to tell their damage apart, and which controls are pet-safe.",
    crops: ["lettuce", "strawberries", "beans", "dahlias"],
    published: "2026-10-13",
    quick: () => [
      ["Best control", "Iron phosphate bait, considered safe around pets, wildlife and food crops when used as directed."],
      ["When", "Spring, from the day you sow, and again when the fall rains bring them back."],
      ["Skip", "Salt. It kills slugs, but it also damages your soil and plants."]
    ],
    body: ({ link, fig }) => `
<p>You sow a row of lettuce on a mild April afternoon. A few days later, little green loops are showing all down the row. The next morning half of them are gone, and all that's left is a few stubs and a silver trail glinting across the soil. If you garden west of the Cascades, you've probably lived some version of this.</p>
<p>The mild, damp climate that makes the Northwest so green suits slugs perfectly, and they're most active exactly when your seedlings are smallest: on cool, wet spring nights. You won't get rid of them. But once you know which slugs you're dealing with and when they breed, you can keep the damage small with surprisingly little effort.</p>
<h2>Meet the slugs (and spare the big yellow one)</h2>
<p>Not every slug in your garden is a problem. The one doing most of the damage is usually the gray garden slug: small, often about an inch long, light gray to tan and sometimes mottled. It came from Europe, breeds fast, and eats seedlings, lettuce, strawberries and almost anything soft. Larger European slugs, some brown, black or orange, turn up in gardens too and eat plenty.</p>
<p>The banana slug, the big yellow-green one you see on forest trails, is native to the Northwest. It mostly eats fallen leaves, fungi and rotting plant matter and is rarely the culprit in a vegetable bed. If you find one in the garden, move it to a shady corner or the compost pile and let it do its job.</p>
<h2>Know when they strike</h2>
<p>Slugs need moisture. They breathe through their skin and dry out in sun and wind, so they feed at night and on overcast, drizzly days, then hide under boards, mulch, pots, dense groundcovers and the lower leaves of lettuce and strawberries. They go after tender seedlings, lettuce, beans, strawberries (often a hollow pit in a ripe berry) and dahlia shoots first. Damage shows up as ragged holes in leaves and shiny slime trails. A seedling can vanish overnight.</p>
<p>They also breed on the Northwest's schedule. Gray garden slugs lay clusters of small, round, pearly eggs in damp soil and under debris, mostly in fall and again in spring when the rain is steady, and one slug can lay hundreds of eggs in a season. Eggs laid in fall hatch over winter and early spring, right when you start planting, so damage in April can seem to come out of nowhere: a new generation has just hatched under your mulch.</p>
<h2>Is it really slugs?</h2>
<p>Holes in leaves have other causes too, so check before you start baiting. Slime trails and damage overnight point to slugs or snails. Lots of tiny round pits in young leaves of radishes, arugula or eggplant are flea beetles. Ragged holes with small green droppings in kale or broccoli are caterpillars; see <a href="${link("articles/cabbage-worms-and-aphids/")}">cabbage worms and aphids</a>. Earwigs chew irregular holes at night too, and often hide in dahlia and lettuce leaves by day. A flashlight walk an hour after dark settles it: you'll see who's eating.</p>
<h2>What works</h2>
<p><strong>Iron phosphate bait</strong> is the go-to choice. It's sold under several brand names and is considered safe around pets, wildlife and food crops when used as directed. It works more slowly than people expect: slugs that eat it stop feeding within hours, then crawl off and die over the next several days, usually out of sight. So don't judge it by whether you find bodies. Judge it by whether your seedlings survive. Scatter it lightly around plants, a thin sprinkle rather than a pile, after rain or watering, when slugs are active. Avoid older baits containing metaldehyde, which are toxic to dogs and cats.</p>
<p><strong>Hand-picking</strong> is surprisingly effective in a small garden. Head out with a flashlight an hour after dark on a damp night, or lay a few boards on the soil and check underneath them each morning. Drop what you find into a jar of soapy water.</p>
<p><strong>Beer traps</strong> attract and drown slugs. Sink a shallow container so its rim sits about half an inch above the soil, which keeps helpful ground beetles from falling in, and fill it with cheap beer. Empty and refill it every few days.</p>
<p><strong>Bigger transplants</strong> survive better. A lettuce or bean plant started indoors and set out with several true leaves can lose a few bites and keep growing. A seedling that has just come up can't.</p>
<p><strong>Copper tape</strong> around the top edge of raised beds and containers discourages slugs from climbing in. It's most useful on pots and beds that are already slug-free inside.</p>
<h2>Make the garden less welcoming</h2>
<p>Water in the morning instead of the evening, so the soil surface is drier at night. Keep a strip of bare ground around beds, and hold off on thick mulch until the soil warms in late spring: a cool mulch layer in April is slug housing. Clear out boards, weeds and debris where slugs hide during the day. And encourage their predators. Ground beetles, garter snakes, frogs and birds all eat slugs, and a bit of leaf litter or a rock pile away from the vegetable beds gives them somewhere to live.</p>
<h2>What doesn't work as well as you'd hope</h2>
<ul>
<li><strong>Eggshells and coffee grounds.</strong> Popular, but slugs cross them without much trouble, especially once rain softens them.</li>
<li><strong>Diatomaceous earth.</strong> It works only while dry, which in a Northwest spring is rarely for long.</li>
<li><strong>Salt.</strong> It kills slugs, but it also damages your soil and plants. Keep it out of the garden.</li>
</ul>
<h2>A slug calendar for the Northwest</h2>
<ol>
<li><strong>Late winter:</strong> lay a few boards or upturned pots near the beds and check under them each morning. You'll catch the first slugs before they breed again.</li>
<li><strong>Spring planting:</strong> sprinkle iron phosphate bait lightly around the bed the day you sow or transplant. Refresh it after heavy rain, and check seedlings on damp evenings.</li>
<li><strong>Late spring:</strong> once plants have a few sets of true leaves, they can usually outgrow light damage, and you can ease off.</li>
<li><strong>Summer:</strong> slugs hide in dry weather. Keep up morning watering, and check under strawberry leaves.</li>
<li><strong>Late summer and fall:</strong> when the rain returns, slugs come back and lay a big batch of eggs. Bait around fall crops and clear debris where eggs would be laid. Every slug you remove in October is one fewer laying eggs that hatch in April.</li>
</ol>
<p>Spring is the critical time. Start checking and baiting as soon as you sow, especially for <a href="${link("when-to-plant/lettuce/")}">lettuce</a> and <a href="${link("when-to-plant/beans/")}">beans</a>.</p>`
  },
  {
    slug: "soil-temperature",
    topic: "timing", icon: "thermometer",
    author: "elaine-holloway",
    title: "Why Northwest Gardeners Should Plant by Soil Temperature",
    description: "Beans and squash rot in cold soil even after the last frost. A cheap soil thermometer settles when it's warm enough to plant.",
    crops: ["tomatoes", "beans", "corn", "summer-squash", "cucumbers", "peppers"],
    published: "2026-10-13",
    quick: () => [
      ["Cool crops", "Peas, spinach and lettuce sprout from about 40°F."],
      ["Warm crops", "Beans and corn at 60°F; tomatoes, peppers and squash at 65 to 70°F."],
      ["Measure", "A soil thermometer 4 inches deep, in the morning, several days in a row."]
    ],
    body: ({ frost, link }) => {
      const pdx = frost("portland-or");
      return `
<p>It happens every year. A sunny, 75-degree weekend arrives in April, garden centers fill with tomato and pepper starts, and everyone plants. Then the weather turns cool and wet again, and those plants sit there for a month, yellowing, or the bean seeds simply rot.</p>
<p>The reason is that, west of the Cascades, the soil warms up weeks after the air does. Portland's typical last frost is ${pdx.last}, but the soil a few inches down often stays cold into May. Frost dates tell you when it's safe from freezing. Soil temperature tells you when warm-season crops will actually grow.</p>
<h2>Soil temperatures to wait for</h2>
<ul>
<li><strong>40°F and up:</strong> peas, spinach, lettuce, radishes and other cool-season crops will sprout, slowly.</li>
<li><strong>50°F and up:</strong> carrots, beets, chard and onions grow well.</li>
<li><strong>60°F and up:</strong> bush beans, sweet corn and cucumbers. Bean seeds planted into colder, wet soil often rot before they sprout.</li>
<li><strong>65 to 70°F:</strong> tomatoes, peppers, squash and basil.</li>
</ul>
<h2>How much difference a few degrees makes</h2>
<p>The numbers above aren't on-off switches. Seeds sprout faster and faster as soil warms, and the change is dramatic. In classic germination studies by the horticulturist J.F. Harrington, still reprinted in university vegetable guides, tomato seed took around six weeks to come up in 50°F soil, about two weeks at 59°F, and about a week at 68°F. Sweet corn took about three weeks at 50°F and under a week at 68°F. Lettuce, a cool-season crop, came up in about a week at 50°F and in just a few days at 60°F.</p>
<p>A seed sitting in cold, wet soil for three weeks has three weeks for fungi, seedcorn maggots and slugs to find it. A row of beans sown into April soil often comes up patchy or not at all, and why the same seed sown two weeks later comes up in a few days.</p>
<h2>Why wet soil stays cold</h2>
<p>Water takes much more energy to warm than dry soil or air does. A bed that's soaked from weeks of spring rain uses up the sun's heat warming the water in it, so it lags behind a well-drained bed next to it. This is the real reason raised beds and sandy soils are ready earlier in the Northwest, and heavy clay that holds water is ready later. Anything that helps a bed drain, from raised beds to adding compost year after year, also helps it warm.</p>
<h2>How to measure it</h2>
<p>Push a soil thermometer about 4 inches into the bed in the morning, when soil is coolest, and check it for several days in a row. For small seeds sown shallowly, a reading at 2 inches is fine too. Once it holds at the target for about a week, you're ready. Soil thermometers cost around $10 at garden centers, and it's the cheapest garden tool that pays for itself. A simple dial probe or a cheap digital cooking thermometer both work; just leave it in for a minute before reading.</p>
<p>Take readings in more than one bed if you can. You'll probably find that a bed against a south-facing wall, or a raised bed in full sun, is ready a week or two before a shady ground-level bed, and you can plan around that: tomatoes in the warm bed, a later sowing of beans in the cool one.</p>
<h2>How to warm soil faster</h2>
<ul>
<li><strong>Raised beds</strong> drain and warm sooner than ground-level beds.</li>
<li><strong>Black plastic</strong> laid over the bed for a week or two before planting raises the temperature several degrees. Cut holes and plant through it.</li>
<li><strong>Clear plastic or a cold frame</strong> warms soil even faster for early sowings.</li>
<li><strong>Wait to mulch.</strong> Straw and leaf mulches keep soil cool, which is great in July and a problem in May. Add them after the soil warms.</li>
</ul>
<h2>What happens if you plant too early</h2>
<p>Cold soil doesn't just slow warm-season crops down. Bean, corn and squash seeds absorb water but can't grow, so they rot. Tomato and pepper transplants stop growing, and their leaves can turn purplish underneath because cold roots struggle to take up phosphorus. Plants set back this way often catch up only weeks after ones planted later into warm soil, so planting early rarely gains anything.</p>
<h2>Too warm matters too</h2>
<p>Soil temperature cuts both ways. Lettuce and spinach seed germinate poorly once soil goes much above about 80°F, which is why late-summer sowings for fall can come up patchy. Sow them in the cool of the evening, water the row well, and shade it with a board or a bit of shade cloth until the seedlings appear.</p>
<h2>A simple spring routine</h2>
<ol>
<li>From March on, take a morning reading once or twice a week in your main beds and write it down.</li>
<li>Sow cool-season crops once soil holds near 40°F and the soil is workable (it crumbles rather than staying in a sticky ball).</li>
<li>Two weeks before you plan to plant warm crops, lay black plastic or set up a cloche or tunnel over that bed.</li>
<li>Plant beans and corn when mornings hold at 60°F, and tomatoes, squash and peppers at 65°F or a little above, with cover ready for cold nights.</li>
<li>Once the soil is warm, mulch to keep moisture in for summer.</li>
</ol>
<h2>East of the Cascades</h2>
<p>In the drier inland valleys, soil warms faster in spring than on the west side, so the gap between frost dates and planting dates is shorter. But frost comes later and nights stay cold, so a warm afternoon reading can mislead. Check in the morning there, too, and keep frost cover handy after planting.</p>
<p>Rainline Garden's planting dates already build in this soil-temperature delay for each region. <a href="${link("")}">Enter your ZIP</a> to see yours.</p>`;
    }
  }
];
