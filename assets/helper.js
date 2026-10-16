/* Rainline Garden plant helper: a small question box that answers from the site's own data.
 * No AI and no server. It spots a plant, a town and the kind of question in what someone types,
 * then answers from assets/data.js (dates) and assets/helper-data.js (built from scripts/guide.js).
 */
(function (root) {
  var MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

  // Extra names people use for a plant, on top of its own name.
  var ALIASES = {
    "summer-squash": ["zucchini", "zucchinis", "courgette", "summer squash", "yellow squash", "squash"],
    "winter-squash": ["pumpkin", "winter squash", "butternut", "butternut squash", "acorn squash", "delicata", "spaghetti squash"],
    beans: ["bean", "green beans", "bush beans", "string beans", "snap beans"],
    "pole-beans": ["pole bean", "runner beans", "climbing beans"],
    "fava-beans": ["fava", "favas", "broad beans"],
    corn: ["corn", "sweet corn"],
    chard: ["chard", "swiss chard", "rainbow chard"],
    peppers: ["pepper", "bell pepper", "bell peppers", "jalapeno", "jalapenos", "chili", "chilies", "chile", "chiles", "hot peppers"],
    tomatoes: ["tomato", "cherry tomatoes", "cherry tomato"],
    cucumbers: ["cucumber", "cukes"],
    melons: ["melon", "cantaloupe", "watermelon", "watermelons", "muskmelon"],
    eggplant: ["eggplants", "aubergine"],
    "bok-choy": ["bok choy", "pak choi", "pac choi", "bok choi"],
    "brussels-sprouts": ["brussels sprouts", "brussel sprouts", "sprouts"],
    potatoes: ["potato", "spuds"],
    onions: ["onion", "onion sets", "green onions", "scallions"],
    cilantro: ["coriander"],
    arugula: ["rocket"],
    "sweet-peas": ["sweet peas", "sweet pea", "sweetpeas"],
    lettuce: ["lettuces", "salad greens", "salad"],
    strawberries: ["strawberry"],
    blueberries: ["blueberry"],
    raspberries: ["raspberry"],
    dahlias: ["dahlia tubers"],
    tulips: ["tulip bulbs"],
    daffodils: ["narcissus", "daffodil bulbs"],
    garlic: ["garlic cloves"],
    sunflowers: ["sunflower"],
    apples: ["apple", "apple tree", "apples", "honeycrisp"],
    pears: ["pear", "pear tree", "pears", "asian pear"],
    plums: ["plum", "plum tree", "plums", "prune plum", "italian prune"],
    cherries: ["cherry", "cherry tree", "cherries", "sweet cherry", "sour cherry"],
    figs: ["fig", "fig tree", "figs"],
    peaches: ["peach", "peach tree", "peaches", "nectarine", "nectarines"],
    hazelnuts: ["hazelnut", "hazelnuts", "filbert", "filberts", "hazelnut tree"],
    blackberries: ["blackberry", "marionberry", "marionberries", "boysenberry", "boysenberries", "thornless blackberry"],
    grapes: ["grape", "grape vine", "grapevine", "grapes"],
    "hardy-kiwi": ["kiwi", "kiwis", "kiwiberry", "kiwiberries", "hardy kiwi"],
    artichokes: ["artichoke"],
    huckleberries: ["huckleberry", "evergreen huckleberry", "red huckleberry"],
    "oregon-grape": ["oregon grape", "mahonia"],
    "red-flowering-currant": ["currant", "flowering currant", "red flowering currant", "ribes"],
    serviceberry: ["serviceberries", "saskatoon", "saskatoons", "juneberry", "amelanchier"],
    camas: ["camas lily", "camassia"],
    lavender: ["lavenders"],
    tomatillos: ["tomatillo"],
    zinnias: ["zinnia"],
    peonies: ["peony"]
  };

  var INTENTS = [
    ["define", /\b(what is|what s|whats|what are|what does|define|meaning of|mean by)\b/],
    ["problem", /\b(pests?|bugs?|problems?|slugs?|snails?|disease|diseased|aphids?|yellow(ing)?|dying|died|wilt(ing)?|holes|rot(ting)?|mildew|blight|rust|eating|mold|moles?|deer)\b/],
    ["spacing", /\b(apart|spacing|space|how close|how far|how many per|distance)\b/],
    ["depth", /\b(deep|depth)\b/],
    ["varieties", /\b(variet(y|ies)|which kind|what kind|which type|what type|best kind|best type|cultivars?|recommend)\b/],
    ["care", /\b(water(ing)?|fertili[sz]e(r)?|feed(ing)?|prune|pruning|mulch|care|stake|staking)\b/],
    ["harvest", /\b(harvest(ing)?|pick(ing)?|ready|ripe|how long|days to|mature|maturity)\b/],
    ["indoor", /\b(indoors?|inside|start(ing)? (the )?seeds?|seedlings?|grow lights?)\b/],
    ["frost", /\b(frost|freeze|freezing)\b/],
    ["sun", /\b(sun|sunny|shade|shady|light)\b/],
    ["easy", /\b(easy|easiest|beginners?|first time|hard|difficult|simple)\b/],
    ["now", /\b(now|today|right now|this week|this month|currently|what (can|should) i plant)\b/],
    ["when", /\b(when|what time|what month|plant(ing)?|sow(ing)?|put (in|out)|transplant|start|time to)\b/]
  ];

  function norm(s) { return " " + String(s || "").toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, " ").trim() + " "; }
  // Rough singular form, applied to the question and to names alike so they line up.
  function stem(s) {
    return norm(s).replace(/([a-z]+)/g, function (w) {
      if (w.length <= 3) return w;
      if (/ies$/.test(w)) return w.slice(0, -3) + "y";
      if (/(sh|ch|o)es$/.test(w)) return w.slice(0, -2);
      if (/[^s]s$/.test(w)) return w.slice(0, -1);
      return w;
    });
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lc(n) { return n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels").replace(/^oregon/, "Oregon"); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function pl(c) { return /s$| and /.test(c.name) && c.id !== "asparagus" && c.id !== "camas"; }
  var HOW = { "Plant seeds in the ground": " from seed", "Plant seeds or young plants": " from seed or as starts", "Plant small onion bulbs (sets)": " as sets (small bulbs)",
    "Plant young plants (starts)": " as starts (young plants)", "Plant seed potatoes": " using seed potatoes", "Plant young plants": " as young plants" };
  function list(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]; }

  // Finds the longest name in `entries` ([key, stemmed name]) that appears in the stemmed question.
  function longest(q, entries) {
    var best = null;
    entries.forEach(function (e) {
      if (q.indexOf(e[1]) >= 0 && (!best || e[1].length > best[1].length)) best = e;
    });
    return best && best[0];
  }

  function create(D, P, H) {
    var cropNames = [], placeNames = [], termNames = [];
    D.crops.forEach(function (c) {
      var names = [c.name, c.id.replace(/-/g, " ")].concat(c.name.split(/ and /i), ALIASES[c.id] || []);
      names.forEach(function (n) { cropNames.push([c.id, stem(n)]); });
    });
    D.places.forEach(function (p) {
      p.city.split(/ and |,|\(|\)/).concat([p.city]).forEach(function (n) {
        if (n.trim()) placeNames.push([p.slug, stem(n)]);
      });
    });
    (H.glossary || []).forEach(function (g) {
      var t = g[0].toLowerCase(), names = [t].concat(t.split(/ and |\(|\)/));
      names.forEach(function (n) { if (n.trim().length > 3) termNames.push([g[1], stem(n)]); });
    });
    var cropById = {}, placeBySlug = {};
    D.crops.forEach(function (c) { cropById[c.id] = c; });
    D.places.forEach(function (p) { placeBySlug[p.slug] = p; });

    function cropLink(c, base, place) {
      return place ? base + "when-to-plant/" + c.id + "/" + place.slug + "/" : base + "when-to-plant/" + c.id + "/";
    }
    function link(href, text) { return '<a class="hb-link" href="' + href + '">' + esc(text) + '<span aria-hidden="true"> &rsaquo;</span></a>'; }

    function timing(c, place, today) {
      var p = P.plan(D, place), r = null;
      p.crops.forEach(function (x) { if (x.crop.id === c.id) r = x; });
      var city = place.city, name = lc(c.name), parts = [];
      var g = H.crops[c.id] || {};
      r.windows.forEach(function (w) {
        var range = P.fmtRange(w.start, w.end);
        var state = today >= w.start && today <= w.end ? " That's now." : "";
        if (w.kind === "fall" && c.anchor === "garlic") parts.push("In " + city + ", plant " + name + " in fall, <strong>" + range + "</strong>." + state);
        else if (w.kind === "fall") parts.push("There's a second planting for a fall harvest, <strong>" + range + "</strong>." + state);
        else parts.push("In " + city + ", plant " + esc(g.plantText || name + (HOW[c.how] || "")) + " <strong>" + range + "</strong>." + state);
      });
      if (r.indoor) parts.push("To grow your own starts, sow seeds indoors " + P.fmtRange(r.indoor.start, r.indoor.end) + ".");
      if (r.season === "short") parts.push("The season here is short for " + name + ", so pick early varieties or use a cover.");
      else if (r.season === "tight") parts.push("The season is a little tight here, so early varieties are safest.");
      if (r.cover) parts.push("A late frost is still possible then, so keep a cover handy.");
      return parts.join(" ");
    }

    function frostAnswer(place) {
      var p = P.plan(D, place), f = p.frost;
      return "In " + place.city + ", the typical last spring frost is <strong>" + P.fmtLong(f.spring50) + "</strong> and the first fall frost is <strong>" +
        P.fmtLong(f.fall50) + "</strong>, about " + f.season + " frost-free days. To be safer, wait until " + P.fmtLong(f.spring10) + " for tender plants.";
    }

    function nowAnswer(place, day, label, base) {
      var n = P.nowList(P.plan(D, place), day);
      var names = function (a) { var seen = {}; return a.filter(function (x) { if (seen[x.r.crop.id]) return false; seen[x.r.crop.id] = 1; return true; }).map(function (x) { return lc(x.r.crop.name); }); };
      var sow = names(n.sow), indoor = names(n.indoor), soon = names(n.soon);
      var out = [];
      if (sow.length) out.push(cap(label) + " in " + place.city + " you can plant " + (sow.length > 12 ? sow.slice(0, 12).join(", ") + " and " + (sow.length - 12) + " more" : list(sow)) + ".");
      else out.push("Not much goes in the ground " + label + " in " + place.city + ".");
      if (indoor.length) out.push("Start seeds indoors for " + list(indoor) + ".");
      if (!sow.length && soon.length) out.push("Coming up soon: " + list(soon.slice(0, 8)) + ".");
      out.push(link(base + "frost-dates/" + place.slug + "/", "Full " + place.city + " calendar"));
      return out.join(" ");
    }

    // ctx: { base, today (day of year), place (slug), crop (id) } remembered between questions.
    function answer(text, ctx) {
      ctx = ctx || {};
      var base = ctx.base || "", today = ctx.today || 1;
      var q = stem(text), raw = norm(text);
      var cropId = longest(q, cropNames), slug = longest(q, placeNames), termId = longest(q, termNames);
      var zip = raw.match(/ (\d{5}) /);
      var note = "";
      if (zip) {
        var z = P.placeForZip(D, zip[1]);
        if (z.place) slug = z.place.slug; else return { html: esc(z.error) };
      }
      var intent = null;
      for (var i = 0; i < INTENTS.length; i++) if (INTENTS[i][1].test(raw)) { intent = INTENTS[i][0]; break; }
      var month = null;
      MONTHS.forEach(function (m, k) { if (raw.indexOf(" " + m + " ") >= 0 || (m.length > 4 && raw.indexOf(" " + m.slice(0, 3) + " ") >= 0)) month = k; });
      if (month !== null && intent === "when" && !cropId) intent = "now";

      // A question with no plant can lean on the last one ("how far apart?" after "tomatoes").
      var followUp = !cropId && ctx.crop && intent && ["spacing", "depth", "sun", "varieties", "care", "harvest", "problem", "indoor", "when"].indexOf(intent) >= 0 && !termId;
      if (followUp) cropId = ctx.crop;
      if (slug) ctx.place = slug;
      if (cropId) ctx.crop = cropId;

      var place = placeBySlug[ctx.place];
      if (!place) { place = placeBySlug["portland-or"]; note = ' <span class="hb-note">Using Portland. Add your town or ZIP for local dates.</span>'; }
      var c = cropById[cropId], g = c ? H.crops[c.id] || {} : null;

      if (intent === "define" && termId && !(cropId && !followUp && q.indexOf(stem(c.name)) >= 0 && !termId)) {
        var t = H.glossary.filter(function (x) { return x[1] === termId; })[0];
        return { html: "<strong>" + esc(t[0]) + ".</strong> " + esc(t[2]) + " " + link(base + "glossary/#" + t[1], "Glossary") };
      }
      if (!c) {
        if (/^ (thanks|thank you|thx|ty)\b/.test(raw)) return { html: "You're welcome. Happy planting!" };
        if (/^ (hi|hello|hey)\b/.test(raw) && !slug && !termId) return { html: "Hi! Ask me about a plant, like when to plant it, how far apart, or when to harvest. Add your town for local dates.", unknown: true };
        if (intent === "frost" || (slug && !intent)) return { html: frostAnswer(place) + " " + link(base + "frost-dates/" + place.slug + "/", place.city + " calendar") + note };
        if (intent === "now" || intent === "when" || month !== null) {
          var day = today, label = "right now";
          if (month !== null) { day = P.CUM[month] + 15; label = "in mid " + cap(MONTHS[month]); }
          return { html: nowAnswer(place, day, label, base) + note };
        }
        if (intent === "easy") {
          return { html: "Good first crops for the Northwest:<ul>" + H.beginner.map(function (id) { return "<li><strong>" + esc(cropById[id].name) + ".</strong> " + esc(H.beginnerWhy[id]) + "</li>"; }).join("") + "</ul>" + link(base + "beginners-guide/", "Beginner's guide") };
        }
        if (termId) {
          var t2 = H.glossary.filter(function (x) { return x[1] === termId; })[0];
          return { html: "<strong>" + esc(t2[0]) + ".</strong> " + esc(t2[2]) + " " + link(base + "glossary/#" + t2[1], "Glossary") };
        }
        return { html: "Sorry, I didn't catch that. I know planting dates, spacing, sun, harvest and common problems for " + D.crops.length +
          " plants in Oregon and Washington towns. Try one of these:", after: link(base + "when-to-plant/", "Browse every plant"), unknown: true };
      }

      var name = lc(c.name), out;
      switch (intent) {
        case "spacing": out = cap(name) + ": " + esc(g.spacing) + "."; break;
        case "depth": out = cap(name) + ": " + esc(g.depth) + "."; break;
        case "sun": out = cap(name) + (pl(c) ? " want " : " wants ") + esc(g.sun.charAt(0).toLowerCase() + g.sun.slice(1)) + "."; break;
        case "varieties": out = "Varieties of " + name + " that do well in the Northwest: " + esc(list(g.varieties)) + "."; break;
        case "harvest": out = (g.firstHarvest ? esc(g.firstHarvest) + " " : c.days && c.anchor !== "garlic" ? "First harvest comes roughly " + c.days + " days after planting. " : "") + esc(g.harvest); break;
        case "problem": out = "The usual Northwest problem with " + name + ": " + esc(g.problem); break;
        case "care": out = g.care ? esc(g.care) : "I don't have care notes for " + name + " beyond this: " + esc(g.problem); break;
        case "easy": out = cap(name) + (pl(c) ? " are " : " is ") + ["", "easy", "moderate", "tricky"][g.difficulty] + " to grow here" + (g.difficulty === 3 ? ", mainly because of the short, cool summers." : "."); break;
        case "frost": out = (g.frost ? esc(g.frost) + ". " : c.group === "warm" ? cap(name) + (pl(c) ? " are" : " is") + " killed by frost. " : cap(name) + (pl(c) ? " handle" : " handles") + " light frost. ") + frostAnswer(place); break;
        case "indoor":
          var row = P.plan(D, place).crops.filter(function (x) { return x.crop.id === c.id; })[0];
          out = row.indoor ? "In " + place.city + ", start " + name + " from seed indoors " + P.fmtRange(row.indoor.start, row.indoor.end) + ", then plant them out " + P.fmtRange(row.windows[0].start, row.windows[0].end) + "." + note
            : cap(name) + (pl(c) ? " are" : " is") + " usually planted straight in the garden, not started indoors. " + timing(c, place, today) + note;
          break;
        default: out = timing(c, place, today) + note + (intent === "when" ? "" : " Space them " + esc(g.spacing.replace(/^Thin to /, "")) + " in " + esc(g.sun.toLowerCase()) + ".");
      }
      return { html: out + " " + link(cropLink(c, base, intent === "when" || !intent ? place : null), "More on " + name) };
    }

    return { answer: answer };
  }

  var API = { create: create, stem: stem };
  if (typeof module !== "undefined" && module.exports) { module.exports = API; return; }
  root.RainlineHelper = API;

  /* Browser: the floating "Ask" button and chat panel. */
  var doc = root.document, html = doc.documentElement, base = html.getAttribute("data-base") || "";
  var EXAMPLES = [["tomatoes", "When do I plant tomatoes?"], ["", "What can I plant now?"], ["carrots", "How far apart are carrots?"], ["garlic", "When does garlic go in?"]];
  var engine = null, ctx = { base: base }, loading = null;

  function today() { var d = new Date(), m = d.getMonth(); return [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][m] + Math.min(d.getDate(), m === 1 ? 28 : 31); }
  function pagePlace() {
    var live = doc.getElementById("live");
    if (live) return live.getAttribute("data-place");
    var m = location.pathname.match(/\/(?:when-to-plant\/[^/]+|frost-dates)\/([a-z-]+-(?:or|wa))\/?$/);
    if (m) return m[1];
    try { return localStorage.getItem("rainline-place"); } catch (e) { return null; }
  }
  // On a plant's page, follow-ups like "how far apart?" mean that plant.
  function pageCrop() {
    var m = location.pathname.match(/\/when-to-plant\/([a-z-]+)\//);
    return m && root.RainlineData.crops.some(function (c) { return c.id === m[1]; }) ? m[1] : null;
  }
  function load(src) {
    return new Promise(function (ok, fail) { var s = doc.createElement("script"); s.src = base + "assets/" + src; s.onload = ok; s.onerror = fail; doc.head.appendChild(s); });
  }
  function ready() {
    if (engine) return Promise.resolve();
    if (!loading) {
      loading = (root.RainlineData ? Promise.resolve() : load("data.js"))
        .then(function () { return root.RainlinePlan ? null : load("plan.js"); })
        .then(function () { return root.RainlineHelperData ? null : load("helper-data.js"); })
        .then(function () { engine = create(root.RainlineData, root.RainlinePlan, root.RainlineHelperData); });
    }
    return loading;
  }

  var LOGO = '<img src="' + base + 'assets/icon.svg" width="22" height="22" alt="">';
  var CAL = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="15" r="1.8" fill="currentColor"/></svg>';
  function chipHtml(e) { return '<button type="button" class="hb-sug" data-q="' + e[1] + '"><span class="hb-sug-i">' + (e[0] ? '<img src="' + base + 'assets/img/crops/' + e[0] + '.svg" width="26" height="26" alt="">' : CAL) + '</span><span>' + e[1] + '</span></button>'; }
  var btn = doc.createElement("button");
  btn.type = "button"; btn.className = "hb-btn"; btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "hb-panel");
  btn.innerHTML = '<span class="hb-btn-ico">' + LOGO + '</span><span class="hb-btn-t">Ask Rainline</span><kbd class="hb-kbd">/</kbd>';
  var panel = doc.createElement("section");
  panel.id = "hb-panel"; panel.className = "hb-panel"; panel.hidden = true; panel.setAttribute("aria-label", "Rainline garden assistant");
  panel.innerHTML = '<header class="hb-head"><span class="hb-logo">' + LOGO + '</span><div class="hb-title"><strong>Rainline Assistant</strong><span><i class="hb-dot"></i>Instant answers for OR and WA gardens</span></div>' +
    '<button type="button" class="hb-icon hb-reset" aria-label="New chat" title="New chat"><svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
    '<button type="button" class="hb-icon hb-close" aria-label="Close" title="Close"><svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button></header>' +
    '<div class="hb-log" aria-live="polite"></div>' +
    '<form class="hb-form"><label class="sr-only" for="hb-q">Your question</label><div class="hb-input"><input id="hb-q" type="text" autocomplete="off" maxlength="200" placeholder="Ask about a plant, a town or a ZIP">' +
    '<button type="submit" class="hb-send" aria-label="Send" disabled><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>' +
    '<p class="hb-foot">Answers come from Rainline Garden\'s planting data and NOAA frost records.</p></form>';
  doc.body.appendChild(panel); doc.body.appendChild(btn);

  var log = panel.querySelector(".hb-log"), input = panel.querySelector("input"), send = panel.querySelector(".hb-send");
  var reduce = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function welcome() {
    log.innerHTML = '<div class="hb-welcome"><span class="hb-logo hb-logo-lg">' + LOGO + '</span><h2>What are you growing?</h2>' +
      '<p>Ask when to plant, how far apart, how much sun, when to harvest, or your frost dates. Mention your town or ZIP for local dates.</p>' +
      '<div class="hb-sugs">' + EXAMPLES.map(chipHtml).join("") + '</div></div>';
  }
  function add(cls, content, isHtml) {
    var d = doc.createElement("div"); d.className = "hb-msg " + cls;
    if (cls.indexOf("hb-bot") >= 0) {
      d.innerHTML = '<span class="hb-logo hb-logo-sm" aria-hidden="true">' + LOGO + '</span><div class="hb-body"></div>';
      var b = d.querySelector(".hb-body"); if (isHtml) b.innerHTML = content; else b.textContent = content;
    } else d.textContent = content;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
    return d;
  }
  function open(v) {
    panel.hidden = !v; btn.setAttribute("aria-expanded", String(v)); btn.classList.toggle("is-open", v);
    if (v) { ready(); input.focus(); } else btn.focus();
  }
  function ask(text) {
    text = text.trim(); if (!text) return;
    var w = log.querySelector(".hb-welcome"); if (w) w.remove();
    add("hb-you", text, false); input.value = ""; send.disabled = true;
    var typing = add("hb-bot hb-typing", '<i></i><i></i><i></i>', true);
    ready().then(function () {
      if (!ctx.place) ctx.place = pagePlace();
      if (!ctx.crop) ctx.crop = pageCrop();
      ctx.today = today();
      var r = engine.answer(text, ctx);
      setTimeout(function () {
        typing.remove();
        add("hb-bot", r.html + (r.unknown ? '<div class="hb-sugs hb-sugs-inline">' + EXAMPLES.map(chipHtml).join("") + '</div>' + (r.after || "") : ""), true);
      }, reduce ? 0 : 380);
    }, function () { typing.remove(); add("hb-bot", "Sorry, the assistant couldn't load. Please refresh the page.", false); });
  }
  welcome();
  input.addEventListener("input", function () { send.disabled = !input.value.trim(); });
  panel.querySelector(".hb-reset").addEventListener("click", function () { ctx = { base: base }; welcome(); input.focus(); });
  log.addEventListener("click", function (e) { var b = e.target.closest(".hb-sug"); if (b) ask(b.getAttribute("data-q")); });
  doc.addEventListener("keydown", function (e) {
    var t = e.target, typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
    if (e.key === "/" && !typing && panel.hidden) { e.preventDefault(); open(true); }
  });
  btn.addEventListener("click", function () { open(panel.hidden); });
  panel.querySelector(".hb-close").addEventListener("click", function () { open(false); });
  panel.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) open(false); });
})(this);
