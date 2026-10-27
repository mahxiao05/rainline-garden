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
    description: "Which tomato varieties actually ripen in Portland, Seattle and the coast, and how to give them the heat they need.",
    crops: ["tomatoes"],
    published: "2026-10-13",
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
<h2>Beat late blight in a wet fall</h2>
<p>When fall rains arrive, late blight can turn leaves and fruit brown almost overnight. Space plants for airflow, water at the base, and in September pinch off new flowers so the plant puts its energy into fruit that can still ripen. If rain sets in with green fruit on the vine, pick it: mature green tomatoes ripen fine on a kitchen counter.</p>
<p>Ready to plan? <a href="${link("when-to-plant/tomatoes/")}">Find tomato planting dates for your city</a>.</p>`;
    }
  },
  {
    slug: "fall-and-winter-vegetable-garden",
    topic: "timing", icon: "winter",
    author: "jigmey-dorjee",
    title: "Fall and Winter Vegetable Gardening West of the Cascades",
    description: "How to keep harvesting kale, carrots, garlic and greens through a mild Northwest winter, and when to plant for it.",
    crops: ["kale", "carrots", "garlic", "spinach", "broccoli", "cabbage", "lettuce"],
    published: "2026-10-13",
    body: ({ frost, link }) => {
      const pdx = frost("portland-or"), sea = frost("seattle-wa");
      return `
<p>Most of the country puts the garden to bed in October. West of the Cascades you don't have to. Portland's typical first fall frost isn't until ${pdx.first}, Seattle's is around ${sea.first}, and winters are usually mild enough that hardy crops keep growing slowly or simply hold in the ground until you're ready to pick them.</p>
<p>The catch is timing. Fall and winter crops have to be planted in mid to late summer, while it still feels like the middle of the growing season.</p>
<h2>The key idea: grow it before the light goes</h2>
<p>Plants grow very little once days get short in November. A winter garden isn't really growing in winter; it's a garden that grew to full size by early fall and then stands in the cold like a refrigerator you can walk out to. So the planting dates count back from fall, not forward from spring.</p>
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
<li><strong>Kale.</strong> The champion. Frost actually sweetens the leaves, and plants often produce from fall into spring.</li>
<li><strong>Carrots and beets.</strong> Leave them in the ground and dig as needed. Fall carrots are noticeably sweeter.</li>
<li><strong>Leeks.</strong> Stand all winter without fuss.</li>
<li><strong>Spinach.</strong> Slow in December, then one of the first things to take off in February.</li>
<li><strong>Purple sprouting broccoli and overwintering cauliflower.</strong> Planted in summer, they sit through winter and crop in early spring when little else is ready.</li>
<li><strong>Garlic.</strong> Planted in fall, harvested the next July.</li>
</ul>
<h2>Protecting the garden through winter</h2>
<p>A layer of floating row cover adds a few degrees of protection on nights in the low 20s, and it keeps heavy rain from battering leaves. Mulch root crops with straw or leaves. Most important of all, make sure beds drain. Plants handle cold far better than they handle sitting in waterlogged soil, which is why raised beds shine in Northwest winters.</p>
<p>See what's in season this month on the <a href="${link("garden-calendar/")}">monthly chores page</a>.</p>`;
    }
  },
  {
    slug: "short-season-gardening-central-oregon",
    topic: "timing", icon: "mountain",
    author: "jigmey-dorjee",
    title: "Gardening in Bend and Central Oregon's Short Season",
    description: "How to grow vegetables where frost can come almost any month: what to plant, when, and how to protect it.",
    crops: ["tomatoes", "peas", "lettuce", "potatoes", "kale", "summer-squash"],
    published: "2026-10-13",
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
    description: "Practical, pet-safe ways to protect seedlings, lettuce and strawberries from the Pacific Northwest's most famous garden pest.",
    crops: ["lettuce", "strawberries", "beans", "dahlias"],
    published: "2026-10-13",
    body: ({ link, fig }) => `
<p>If you garden west of the Cascades, you will meet slugs. The mild, damp climate that makes the Northwest so green is perfect for them, and they are most active exactly when your seedlings are smallest: on cool, wet spring nights.</p>
<p>You won't get rid of them entirely, but you can easily keep the damage down.</p>
<h2>Know when they strike</h2>
<p>Slugs feed at night and on overcast, drizzly days, then hide under boards, mulch, pots and dense leaves. They go after tender seedlings, lettuce, beans, strawberries and dahlia shoots first. Damage shows up as ragged holes in leaves and shiny slime trails. A seedling can vanish overnight.</p>
<h2>What works</h2>
<ul>
<li><strong>Iron phosphate bait.</strong> Sold under several brand names, it's the go-to choice: effective, and considered safe around pets, wildlife and food crops when used as directed. Scatter it lightly around plants after rain. Avoid older baits containing metaldehyde, which are toxic to dogs.</li>
<li><strong>Hand-picking.</strong> Head out with a flashlight an hour after dark, or check under a board laid on the soil each morning. It's surprisingly effective in a small garden.</li>
<li><strong>Beer traps.</strong> A shallow container sunk to its rim and filled with beer attracts and drowns slugs. Empty and refill it every few days.</li>
<li><strong>Copper tape</strong> around the top edge of raised beds and containers deters them from climbing in.</li>
<li><strong>Bigger transplants.</strong> Starting seedlings indoors and planting them when they're larger helps them survive a little nibbling.</li>
</ul>
<h2>Make the garden less welcoming</h2>
<p>Water in the morning instead of the evening, so the soil surface is drier at night. Keep a strip of bare ground around beds, and hold off on thick mulch until the weather warms. Clear out boards, weeds and debris where slugs hide during the day. And encourage their predators: ground beetles, garter snakes and birds all eat slugs.</p>
<h2>What doesn't work as well as you'd hope</h2>
<ul>
<li><strong>Eggshells and coffee grounds.</strong> Popular, but slugs cross them without much trouble, especially once rain softens them.</li>
<li><strong>Diatomaceous earth.</strong> It works only while dry, which in a Northwest spring is rarely for long.</li>
<li><strong>Salt.</strong> It kills slugs, but it also damages your soil and plants. Keep it out of the garden.</li>
</ul>
${fig(1)}
<h2>Is it really slugs?</h2>
<p>Holes in leaves have other causes too. Slime trails and damage at night point to slugs or snails. Lots of tiny round pits in young leaves of radishes, arugula or eggplant are flea beetles. Ragged holes with small green droppings in kale or broccoli are caterpillars; see <a href="${link("articles/cabbage-worms-and-aphids/")}">cabbage worms and aphids</a>. Earwigs chew irregular holes at night too, and often hide in dahlia and lettuce leaves by day.</p>
<h2>A simple spring routine</h2>
<ol>
<li>Before you plant, lay a few boards or upturned pots near the bed. Check under them each morning for a week and remove what you find.</li>
<li>Sprinkle iron phosphate bait lightly around the bed the day you sow or transplant.</li>
<li>Refresh the bait after heavy rain, and check seedlings on damp evenings.</li>
<li>Once plants have a few sets of true leaves, they can usually outgrow light damage, and you can ease off.</li>
<li>Do it again in late summer for fall crops, when the rain returns.</li>
</ol>
<p>Spring is the critical time. Start checking and baiting as soon as you sow, especially for <a href="${link("when-to-plant/lettuce/")}">lettuce</a> and <a href="${link("when-to-plant/beans/")}">beans</a>.</p>`
  },
  {
    slug: "soil-temperature",
    topic: "timing", icon: "thermometer",
    author: "elaine-holloway",
    title: "Why Northwest Gardeners Should Plant by Soil Temperature",
    description: "The air warms up long before the soil does here. A $10 soil thermometer tells you when it's really time to plant beans, squash and tomatoes.",
    crops: ["tomatoes", "beans", "corn", "summer-squash", "cucumbers", "peppers"],
    published: "2026-10-13",
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
<h2>How to measure it</h2>
<p>Push a soil thermometer about 4 inches into the bed in the morning, when soil is coolest, and check it for several days in a row. Once it holds at the target for about a week, you're ready. Soil thermometers cost around $10 at garden centers, and it's the cheapest garden tool that pays for itself.</p>
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
<h2>East of the Cascades</h2>
<p>In the drier inland valleys, soil warms faster in spring than on the west side, so the gap between frost dates and planting dates is shorter. But frost comes later and nights stay cold, so a warm afternoon reading can mislead. Check in the morning there, too, and keep frost cover handy after planting.</p>
<p>Rainline Garden's planting dates already build in this soil-temperature delay for each region. <a href="${link("")}">Enter your ZIP</a> to see yours.</p>`;
    }
  }
];
