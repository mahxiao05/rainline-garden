/* Rainline Garden plant quiz (/what-to-grow/): eight quick questions, then the plants that suit your town, space,
 * sun, time and goals, with a one-tap "make my garden plan" that adds them to My garden plan. Everything runs in
 * the browser from the site's own plant data; answers live in the page address so results can be shared.
 */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan, R = window.RainlineRender, H = window.RainlineGuideData;
  var root = document.getElementById("quiz");
  if (!root) return;
  var base = document.documentElement.getAttribute("data-base") || "";
  var PLAN_KEY = "rainline-garden-plan";

  // Plant traits the quiz filters on. Plants not listed in POT need a bed or the ground.
  var POT = ["lettuce", "spinach", "arugula", "chard", "kale", "radishes", "bok-choy", "peas", "beans", "carrots", "beets", "onions", "garlic",
    "shallots", "tomatoes", "peppers", "eggplant", "basil", "cilantro", "parsley", "dill", "chives", "mint", "rosemary", "thyme", "oregano",
    "lavender", "strawberries", "blueberries", "figs", "zinnias", "sweet-peas", "tulips", "daffodils", "kohlrabi", "turnips", "collards", "ground-cherries", "celery", "mustard-greens", "mache", "radicchio", "sorrel", "sage", "lemon-balm", "tarragon", "nasturtiums", "marigolds", "calendula", "ranunculus", "snapdragons", "western-columbine", "kinnikinnick"];
  // Too big for a single raised bed: trees, big shrubs and long-lived spreading plants.
  var BIG = ["apples", "pears", "plums", "cherries", "peaches", "figs", "hazelnuts", "blackberries", "grapes", "hardy-kiwi", "serviceberry",
    "red-flowering-currant", "oregon-grape", "huckleberries", "blueberries", "raspberries", "asparagus", "rhubarb", "artichokes", "peonies", "honeyberries", "currants", "gooseberries", "elderberries", "thimbleberry", "salmonberry", "pacific-ninebark", "persimmons", "asian-pears", "quince", "mulberries"];
  var TREES = ["apples", "pears", "plums", "cherries", "peaches", "figs", "hazelnuts", "persimmons", "asian-pears", "quince", "mulberries"];
  var SPRAWL = ["winter-squash", "melons", "summer-squash", "cucumbers", "blackberries", "hardy-kiwi", "grapes", "pumpkins", "sweet-potatoes"];
  var PERENNIAL = ["strawberries", "blueberries", "raspberries", "blackberries", "grapes", "hardy-kiwi", "asparagus", "rhubarb", "artichokes",
    "chives", "mint", "rosemary", "thyme", "oregano", "lavender", "apples", "pears", "plums", "cherries", "peaches", "figs", "hazelnuts",
    "huckleberries", "oregon-grape", "red-flowering-currant", "serviceberry", "camas", "daffodils", "peonies", "tulips", "honeyberries", "currants", "gooseberries", "elderberries", "sorrel", "horseradish", "sage", "lemon-balm", "tarragon", "persimmons", "asian-pears", "quince", "mulberries", "thimbleberry", "salmonberry", "salal", "kinnikinnick", "western-columbine", "douglas-aster", "oregon-sunshine", "pacific-ninebark", "sword-fern", "oregon-iris"];
  // Plants deer usually leave alone (strong-smelling, bitter or poisonous). No plant is fully deer-proof.
  var DEER_OK = ["garlic", "onions", "leeks", "shallots", "chives", "rosemary", "thyme", "oregano", "lavender", "mint", "dill", "daffodils",
    "rhubarb", "oregon-grape", "peonies", "potatoes", "fava-beans", "sage", "lemon-balm", "tarragon", "horseradish", "sword-fern", "oregon-iris", "kinnikinnick", "snapdragons", "marigolds"];
  // Plants slugs go for first in wet Northwest springs.
  var SLUG = ["lettuce", "spinach", "chard", "bok-choy", "cabbage", "celery", "beans", "pole-beans", "basil", "strawberries", "dahlias", "zinnias", "sunflowers", "cucumbers", "mustard-greens", "mache", "radicchio", "marigolds", "cosmos"];
  var GOALS = [
    ["salad", "Salads and greens", ["lettuce", "spinach", "arugula", "chard", "kale", "collards", "bok-choy", "radishes", "peas", "mustard-greens", "mache", "radicchio", "sorrel"]],
    ["summer", "Summer favorites", ["tomatoes", "summer-squash", "cucumbers", "beans", "pole-beans", "peppers", "corn", "basil", "tomatillos", "eggplant", "melons", "ground-cherries", "sweet-potatoes"]],
    ["herbs", "Cooking herbs", ["basil", "cilantro", "parsley", "dill", "chives", "mint", "rosemary", "thyme", "oregano", "sage", "tarragon", "lemon-balm"]],
    ["pantry", "Food that stores", ["garlic", "onions", "shallots", "potatoes", "winter-squash", "carrots", "beets", "leeks", "pumpkins", "parsnips", "sweet-potatoes", "horseradish"]],
    ["fruit", "Fruit and berries", ["strawberries", "blueberries", "raspberries", "blackberries", "grapes", "hardy-kiwi", "apples", "pears", "plums", "cherries", "peaches", "figs", "huckleberries", "melons", "rhubarb", "honeyberries", "currants", "gooseberries", "elderberries", "ground-cherries", "persimmons", "asian-pears", "quince", "mulberries", "thimbleberry", "salmonberry", "salal"]],
    ["flowers", "Flowers to cut", ["dahlias", "sunflowers", "zinnias", "sweet-peas", "tulips", "daffodils", "peonies", "lavender", "cosmos", "snapdragons", "ranunculus", "calendula", "nasturtiums", "marigolds"]],
    ["bees", "Feeding bees and birds", ["lavender", "sunflowers", "zinnias", "oregano", "thyme", "rosemary", "dill", "chives", "red-flowering-currant", "camas", "serviceberry", "oregon-grape", "huckleberries", "blueberries", "raspberries", "elderberries", "western-columbine", "douglas-aster", "oregon-sunshine", "pacific-ninebark", "salmonberry", "kinnikinnick", "calendula", "cosmos", "sage"]],
    ["kids", "A project with kids", ["radishes", "peas", "beans", "sunflowers", "strawberries", "carrots", "pumpkins", "ground-cherries", "potatoes", "nasturtiums"]]
  ];

  var QUESTIONS = [
    { id: "town", q: "Where's your garden?", help: "Your town sets the dates: what can go in now and how long your summer is." },
    { id: "space", q: "How much room do you have?", opts: [["pots", "A few pots", "Balcony, patio or doorstep"], ["bed", "One raised bed", "About 4 × 8 feet"], ["beds", "A few beds", "A small vegetable garden"], ["yard", "A big yard", "Room for trees and berry rows"]] },
    { id: "sun", q: "How much direct sun does the spot get?", opts: [["full", "6 hours or more", "Full sun most of the day"], ["part", "3 to 6 hours", "Sun for part of the day"], ["shade", "Under 3 hours", "Mostly shade"]] },
    { id: "time", q: "How much time can you give it each week?", opts: [["little", "About 15 minutes", "Water and pick"], ["some", "An hour or so", "Weeding and tidying too"], ["lots", "A few hours", "I enjoy the work"]] },
    { id: "exp", q: "Have you grown food before?", opts: [["new", "This is my first garden", ""], ["some", "I've grown a few things", ""], ["pro", "I've gardened for years", ""]] },
    { id: "goals", q: "What do you want from your garden?", help: "Pick as many as you like.", multi: true, need: 1, opts: GOALS.map(function (g) { return [g[0], g[1], ""]; }) },
    { id: "start", q: "When do you want to start?", opts: [["now", "Right now", "Show what can go in this month"], ["spring", "Next spring", "I'm planning ahead"], ["any", "No rush", "Show me the best fits"]] },
    { id: "avoid", q: "Anything else we should know?", help: "Pick any that apply, or skip.", multi: true, need: 0, opts: [["deer", "Deer visit my yard", ""], ["slugs", "Slugs are bad here", ""], ["nosprawl", "No room for sprawling vines", ""], ["perennial", "Only plants that come back every year", ""]] }
  ];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function has(list, id) { return list.indexOf(id) >= 0; }
  function lc(n) { return n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels").replace(/^(oregon|douglas|pacific|asian)/, function (w) { return w[0].toUpperCase() + w.slice(1); }); }
  function shadeOk(id) { return /part shade|light shade|full shade|afternoon shade/.test((H.crops[id] || {}).sun || ""); }
  function deepShadeOk(id) { return /part shade|full shade/.test((H.crops[id] || {}).sun || ""); }

  var now = new Date();
  var today = P.CUM[now.getMonth()] + Math.min(now.getDate(), now.getMonth() === 1 ? 28 : 31);
  var answers = {}, step = 0;

  // Answers saved in the address, so a results link opens straight to the results.
  function fromUrl() {
    var qs = new URLSearchParams(location.search), a = {};
    QUESTIONS.forEach(function (q) { var v = qs.get(q.id); if (v != null) a[q.id] = q.multi ? v.split(",").filter(Boolean) : v; });
    return a;
  }
  function toQuery(a) {
    return "?" + QUESTIONS.map(function (q) { var v = a[q.id]; return q.id + "=" + encodeURIComponent(q.multi ? (v || []).join(",") : v || ""); }).join("&");
  }
  function complete(a) {
    return !!P.findPlace(D, a.town) && QUESTIONS.every(function (q) {
      if (q.id === "town") return true;
      if (q.multi) return (a[q.id] || []).length >= q.need;
      return q.opts.some(function (o) { return o[0] === a[q.id]; });
    });
  }

  /* Scoring */
  function score(a) {
    var place = P.findPlace(D, a.town), p = P.plan(D, place), goals = a.goals || [], avoid = a.avoid || [], out = [];
    p.crops.forEach(function (r) {
      var id = r.crop.id, g = H.crops[id] || {}, d = g.difficulty || 2, s = P.season(r, today), why = [], pts = 0;
      // Hard limits first: space, sun and the "anything else" answers.
      if (a.space === "pots" && !has(POT, id)) return;
      if (a.space === "bed" && has(BIG, id)) return;
      if (a.space === "beds" && has(TREES, id)) return;
      if (a.sun === "part" && !shadeOk(id)) return;
      if (a.sun === "shade" && !deepShadeOk(id)) return;
      if (has(avoid, "nosprawl") && has(SPRAWL, id)) return;
      if (has(avoid, "perennial") && !has(PERENNIAL, id)) return;
      var hits = GOALS.filter(function (x) { return has(goals, x[0]) && has(x[2], id); });
      if (hits.length) { pts += 4 + hits.length - 1; why.push(hits[0][1].toLowerCase()); } else pts -= 3;
      if (a.exp === "new") pts += d === 1 ? 2 : d === 3 ? -4 : 0;
      else if (a.exp === "some") pts += d === 3 ? -1 : 1;
      else if (d === 3) pts += 1;
      if (a.time === "little") { if (d === 3) pts -= 3; if (has(PERENNIAL, id)) pts += 1; }
      if (d === 1 && a.exp !== "pro") why.push("easy to grow");
      if (a.space === "pots" && has(POT, id)) why.push("happy in a pot");
      if (a.sun !== "full" && shadeOk(id)) why.push("copes with some shade");
      if (has(PERENNIAL, id)) why.push("comes back every year");
      if (has(avoid, "deer")) { if (has(DEER_OK, id)) { pts += 2; why.push("deer usually leave it alone"); } else pts -= 4; }
      if (has(avoid, "slugs") && has(SLUG, id)) pts -= 3;
      if (a.start === "now") pts += s.k === "now" || s.k === "last" || s.k === "indoor" ? 3 : s.k === "soon" ? 1 : -3;
      if (r.season === "short") pts -= 4; else if (r.season === "tight") pts -= 1;
      out.push({ r: r, c: r.crop, d: d, s: s, pts: pts, why: why });
    });
    out.sort(function (x, y) { return y.pts - x.pts || x.d - y.d || x.c.name.localeCompare(y.c.name); });
    var top = out.filter(function (x) { return x.pts > -2 && (x.d < 3 || a.exp === "pro"); }).slice(0, 6);
    var stretch = a.exp === "pro" ? null : out.filter(function (x) { return x.d === 3 && top.indexOf(x) < 0 && x.why.length && x.r.season !== "short" && GOALS.some(function (gl) { return has(goals, gl[0]) && has(gl[2], x.c.id); }); })[0] || null;
    // "Right now" but little of it can go in this month: offer what can, even outside their goals.
    var nowOk = function (x) { return (x.s.k === "now" || x.s.k === "last" || x.s.k === "indoor") && !x.r.season; };
    var plantNow = a.start === "now" && top.filter(nowOk).length < 3 ? out.filter(function (x) { return nowOk(x) && top.indexOf(x) < 0 && x !== stretch; }).slice(0, 4) : [];
    var more = out.filter(function (x) { return top.indexOf(x) < 0 && x !== stretch && plantNow.indexOf(x) < 0 && x.pts > -2; }).slice(0, 6);
    return { place: place, top: top, stretch: stretch, plantNow: plantNow, more: more };
  }

  var TAG = { now: "Plant now", last: "Last chance", indoor: "Start indoors now", soon: "Coming up" };
  function when(x, place) {
    var s = x.s;
    if (x.r.season === "short") return { k: "later", t: "Hard to ripen in " + place.city + "'s short season" };
    if (TAG[s.k]) return { k: s.k, t: s.k === "soon" ? "Plant from " + P.fmt(s.next.w.start) : TAG[s.k] };
    return { k: "later", t: (s.next.kind === "indoor" ? "Start indoors " : "Plant from ") + P.fmt(s.next.w.start) };
  }

  /* Screens */
  function progress() {
    return '<div class="quiz-prog" aria-hidden="true"><i style="width:' + Math.round(step / QUESTIONS.length * 100) + '%"></i></div>' +
      '<p class="quiz-count">Question ' + (step + 1) + ' of ' + QUESTIONS.length + '</p>';
  }
  function showQuestion() {
    var q = QUESTIONS[step], h = progress() + '<h2 class="quiz-q" tabindex="-1">' + esc(q.q) + '</h2>' + (q.help ? '<p class="quiz-help">' + esc(q.help) + '</p>' : '');
    if (q.id === "town") {
      h += '<form class="finder quiz-town" id="quiz-town" novalidate>' +
        '<div class="field"><label for="quiz-zip">ZIP code</label><input id="quiz-zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" pattern="[0-9]{5}" placeholder="e.g. 97214"></div>' +
        '<span class="or">or</span><div class="field field-select"><label for="quiz-place">Town</label><select id="quiz-place"><option value="">Choose a town</option></select></div>' +
        '<button class="btn" type="submit">Next</button>' +
        '<button type="button" id="near-me" class="btn btn-ghost near-btn" hidden>Use my location</button></form><p id="quiz-msg" class="msg" role="status" aria-live="polite"></p>';
    } else {
      var cur = answers[q.id] || (q.multi ? [] : "");
      h += '<div class="quiz-opts' + (q.multi ? ' is-multi' : '') + '" role="group" aria-label="' + esc(q.q) + '">' + q.opts.map(function (o) {
        var on = q.multi ? has(cur, o[0]) : cur === o[0];
        return '<button type="button" class="quiz-opt" data-v="' + o[0] + '" aria-pressed="' + on + '"><strong>' + esc(o[1]) + '</strong>' + (o[2] ? '<span>' + esc(o[2]) + '</span>' : '') + '</button>';
      }).join("") + '</div>';
      h += '<div class="quiz-nav"><button type="button" class="btn btn-ghost" data-go="back">Back</button>' +
        (q.multi ? '<button type="button" class="btn" data-go="next"' + (cur.length < q.need ? ' disabled' : '') + '>' + (step === QUESTIONS.length - 1 ? 'See my plants' : 'Next') + '</button>' : '') + '</div>';
    }
    root.innerHTML = h;
    if (q.id === "town") {
      var sel = document.getElementById("quiz-place");
      P.fillPlaceSelect(sel, D);
      var saved = answers.town; if (!saved) { try { saved = localStorage.getItem("rainline-place"); } catch (e) { /* ignore */ } }
      if (saved && P.findPlace(D, saved)) sel.value = saved;
      if (window.RainlineNear) RainlineNear(document.getElementById("near-me"), document.getElementById("quiz-msg"), D.places.map(function (x) { return [x.slug].concat(x.ll); }), function (slug) {
        answers.town = slug; started = true; step++; show();
      });
    }
    var hq = root.querySelector(".quiz-q"); if (hq && started) hq.focus({ preventScroll: true });
  }
  var started = false;

  function card(x, place, cls) {
    var w = when(x, place), diff = { 1: ["Easy", "easy"], 2: ["Moderate", "moderate"], 3: ["Tricky here", "tricky"] }[x.d];
    var why = x.why.slice(0, 3);
    return '<li class="quiz-card' + (cls ? " " + cls : "") + '">' + R.icon(x.c.id, base, 48) +
      '<div><h3><a href="' + base + 'when-to-plant/' + x.c.id + '/">' + esc(x.c.name) + '</a></h3>' +
      '<p class="quiz-tags"><span class="badge badge-' + diff[1] + '">' + diff[0] + '</span> <span class="gp-st gp-st-' + w.k + '">' + esc(w.t) + '</span></p>' +
      (why.length ? '<p>' + esc(why.join(", ").replace(/^./, function (c) { return c.toUpperCase(); })) + '.</p>' : '') + '</div></li>';
  }
  function showResults() {
    var res = score(answers), place = res.place;
    try { localStorage.setItem("rainline-place", place.slug); } catch (e) { /* ignore */ }
    if (history.replaceState) history.replaceState(null, "", location.pathname + toQuery(answers));
    var h = '<div class="quiz-result"><p class="quiz-count">Your results</p><h2 class="quiz-q" tabindex="-1">' + (res.top.length ? 'Your best plants for ' + esc(place.city) : 'Nothing fits all of that') + '</h2>';
    if (!res.top.length) {
      h += '<p>Those answers rule out every plant we cover. Try a sunnier spot, more space, or fewer limits on the last question.</p>';
    } else {
      h += '<p class="quiz-help">Picked from the ' + D.crops.length + ' plants we cover, using ' + esc(place.city) + '\'s dates and your answers. A starting point, not a rule.</p>' +
        (answers.sun === "shade" ? '<p class="quiz-note">With under 3 hours of sun, even these grow slowly. Leafy greens and native shrubs cope best.</p>' : '') +
        '<ul class="quiz-cards">' + res.top.map(function (x) { return card(x, place); }).join("") + '</ul>';
      if (res.plantNow.length) h += '<h3 class="quiz-sub">Want to plant this month?</h3><p class="quiz-help">Most of your picks wait for spring in ' + esc(place.city) + '. These can go in now:</p><ul class="quiz-cards">' + res.plantNow.map(function (x) { return card(x, place); }).join("") + '</ul>';
      if (res.stretch) h += '<h3 class="quiz-sub">Want a challenge?</h3><ul class="quiz-cards">' + card(res.stretch, place, "is-stretch") + '</ul>';
      h += '<div class="quiz-actions"><button type="button" class="btn" data-go="plan">Make my garden plan with these</button>' +
        '<button type="button" class="btn btn-ghost" data-go="link">Copy link to my results</button>' +
        '<button type="button" class="btn btn-ghost" data-go="again">Take the quiz again</button></div><p class="gp-saved quiz-flash" role="status"></p>';
      if (res.more.length) h += '<h3 class="quiz-sub">Also worth a look</h3><ul class="chips">' + res.more.map(function (x) {
        return '<li><a href="' + base + 'when-to-plant/' + x.c.id + '/">' + R.icon(x.c.id, base, 28) + esc(x.c.name) + '</a></li>'; }).join("") + '</ul>';
    }
    if (!res.top.length) h += '<div class="quiz-actions"><button type="button" class="btn" data-go="again">Take the quiz again</button></div>';
    root.innerHTML = h + '</div>';
    root.dataset.picks = res.top.concat(res.plantNow, res.stretch ? [res.stretch] : []).map(function (x) { return x.c.id; }).join(",");
    var hq = root.querySelector(".quiz-q"); if (hq && started) hq.focus({ preventScroll: true });
  }
  function show() { if (step >= QUESTIONS.length) showResults(); else showQuestion(); if (started) root.scrollIntoView({ behavior: "smooth", block: "start" }); }

  function flash(t) { var f = root.querySelector(".quiz-flash"); if (f) { f.textContent = t; f.classList.add("is-on"); } }

  root.addEventListener("submit", function (e) {
    if (e.target.id !== "quiz-town") return;
    e.preventDefault();
    var zip = document.getElementById("quiz-zip").value.trim(), sel = document.getElementById("quiz-place"), msg = document.getElementById("quiz-msg");
    if (zip) { var r = P.placeForZip(D, zip); if (r.error) { msg.textContent = r.error; return; } answers.town = r.place.slug; }
    else if (sel.value) answers.town = sel.value;
    else { msg.textContent = "Enter a ZIP code or choose a town."; return; }
    started = true; step++; show();
  });
  root.addEventListener("click", function (e) {
    var o = e.target.closest(".quiz-opt"), g = e.target.closest("[data-go]");
    if (o) {
      var q = QUESTIONS[step];
      if (q.multi) {
        var cur = answers[q.id] = answers[q.id] || [], v = o.dataset.v, i = cur.indexOf(v);
        if (i >= 0) cur.splice(i, 1); else cur.push(v);
        o.setAttribute("aria-pressed", String(i < 0));
        var nx = root.querySelector('[data-go="next"]'); if (nx) nx.disabled = cur.length < q.need;
      } else { answers[q.id] = o.dataset.v; started = true; step++; show(); }
      return;
    }
    if (!g) return;
    var go = g.dataset.go;
    started = true;
    if (go === "back") { step = Math.max(0, step - 1); show(); }
    else if (go === "next") { if (QUESTIONS[step].multi && !answers[QUESTIONS[step].id]) answers[QUESTIONS[step].id] = []; step++; show(); }
    else if (go === "again") { answers = { town: answers.town }; step = 0; if (history.replaceState) history.replaceState(null, "", location.pathname); show(); }
    else if (go === "link") {
      var url = location.origin + location.pathname + toQuery(answers);
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { flash("Link copied"); }, function () { prompt("Copy this link:", url); });
      else prompt("Copy this link:", url);
    }
    else if (go === "plan") {
      var picks = (root.dataset.picks || "").split(",").filter(Boolean), plan = {};
      try { plan = JSON.parse(localStorage.getItem(PLAN_KEY)) || {}; } catch (err) { plan = {}; }
      var had = (plan.crops || []).length, fresh = picks.filter(function (id) { return !has(plan.crops || [], id); });
      if (had && !confirm("Add " + (fresh.length === 1 ? "this plant" : "these " + fresh.length + " plants") + " to your garden plan? The " + had + " already there will stay.")) return;
      plan.crops = (plan.crops || []).concat(picks.filter(function (id) { return !has(plan.crops || [], id); }));
      plan.place = answers.town;
      try { localStorage.setItem(PLAN_KEY, JSON.stringify(plan)); location.href = base + "my-garden/"; }
      catch (err) { location.href = base + "my-garden/?place=" + answers.town + "&plants=" + picks.join(","); }
    }
  });

  answers = fromUrl();
  if (complete(answers)) step = QUESTIONS.length;
  else { answers = {}; step = 0; }
  show();
})();
