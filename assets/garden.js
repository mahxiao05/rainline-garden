/* Rainline Garden "My garden plan" page: pick a town and plants, get a dated to-do list, a "this week" card,
 * a bed planner, a plant cheat sheet, a harvest log and notes. Saved in this browser (localStorage); printable;
 * exports .ics with reminders. A shared link opens as a read-only preview until you save it as your own plan.
 * Starter plans fill the picker in one tap, and a season check warns about plants that aren't in season right now.
 * The plan leads with this week's jobs, the season check and your beds (a square-foot grid you can drag, trim and optimize);
 * the harvest log, frost alerts and notes fold under "More tools".
 */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan, R = window.RainlineRender, H = window.RainlineGuideData;
  var KEY = "rainline-garden-plan";
  var base = document.documentElement.getAttribute("data-base") || "";
  var form = document.getElementById("gp-box");
  if (!form || !window.RainlineTownBox) return;
  var msg = document.getElementById("gp-msg"), changing = false, box;
  var out = document.getElementById("gp-out"), pick = document.getElementById("gp-pick"), share = document.getElementById("gp-share");
  var emptyArt = out.querySelector(".gp-empty-art"); emptyArt = emptyArt ? emptyArt.outerHTML : ""; // illustration for the empty plan, from the page
  var alertTpl = document.getElementById("gp-alert-tpl");
  var starters = document.getElementById("gp-starters"), pickNote = document.getElementById("gp-pick-note");

  var MONTHS = P.MONTHS_LONG, DAY = 864e5;
  var HOW = { "Plant seeds in the ground": "from seed", "Plant seeds or young plants": "from seed or as starts", "Plant young plants or sets": "as starts or sets",
    "Plant young plants (starts)": "as starts", "Plant seed potatoes": "using seed potatoes", "Plant young plants": "as young plants" };
  // Quick crops that do best sown a little at a time.
  var REPEAT = ["radishes", "lettuce", "spinach", "beans", "carrots", "beets", "arugula", "cilantro", "bok-choy", "turnips", "kohlrabi", "dill", "mustard-greens"];
  // Working spacing in inches for the bed planner (the middle of the range on each plant's guide).
  var SPACE = { peas: 3, radishes: 2, spinach: 4, lettuce: 9, onions: 4, carrots: 3, beets: 4, kale: 18, broccoli: 18, cabbage: 18, chard: 10,
    potatoes: 12, beans: 4, corn: 12, cucumbers: 12, "summer-squash": 36, "winter-squash": 48, tomatoes: 24, peppers: 18, basil: 12, dahlias: 21,
    cilantro: 4, parsley: 8, dill: 12, strawberries: 15, blueberries: 54, raspberries: 30, garlic: 6, cauliflower: 21, "brussels-sprouts": 24,
    leeks: 6, arugula: 4, "bok-choy": 8, turnips: 4, kohlrabi: 6, eggplant: 21, melons: 30, "pole-beans": 5, "fava-beans": 6, shallots: 7,
    asparagus: 15, rhubarb: 42, chives: 10, mint: 18, rosemary: 30, thyme: 12, oregano: 15, sunflowers: 15, "sweet-peas": 5, tulips: 5, daffodils: 5,
    apples: 120, pears: 150, plums: 150, cherries: 120, figs: 144, peaches: 144, hazelnuts: 180, blackberries: 60, grapes: 84,
    "hardy-kiwi": 144, artichokes: 42, huckleberries: 48, "oregon-grape": 48, "red-flowering-currant": 60, serviceberry: 96, camas: 5,
    lavender: 27, tomatillos: 36, zinnias: 10, peonies: 36,
    collards: 21, parsnips: 4, celery: 11, "ground-cherries": 30, "sweet-potatoes": 15, pumpkins: 60, honeyberries: 54, currants: 54,
    gooseberries: 54, elderberries: 84,
    "mustard-greens": 9, mache: 4, radicchio: 10, sorrel: 12, horseradish: 21, sage: 21, "lemon-balm": 21, tarragon: 21,
    cosmos: 12, nasturtiums: 11, marigolds: 10, calendula: 11, ranunculus: 8, snapdragons: 10,
    persimmons: 210, "asian-pears": 162, quince: 162, mulberries: 270, thimbleberry: 42, salmonberry: 60, salal: 30, kinnikinnick: 18,
    "western-columbine": 15, "douglas-aster": 21, "oregon-sunshine": 15, "pacific-ninebark": 84, "sword-fern": 30, "oregon-iris": 15 };
  var RATINGS = [["good", "Did well"], ["ok", "OK"], ["poor", "Struggled"]];
  // One-tap starting points: plants plus bed sizes in feet.
  var STARTERS = [
    { id: "salad", name: "First salad bed", crops: ["lettuce", "spinach", "arugula", "radishes", "chard", "kale", "peas"], beds: [{ w: 4, l: 8 }] },
    { id: "easy", name: "Five easy crops", crops: ["radishes", "lettuce", "beans", "summer-squash", "kale"], beds: [{ w: 4, l: 8 }] },
    { id: "salsa", name: "Salsa garden", crops: ["tomatoes", "peppers", "tomatillos", "onions", "cilantro"], beds: [{ w: 4, l: 8 }] },
    { id: "kids", name: "Kids' garden", crops: ["radishes", "peas", "beans", "sunflowers", "strawberries", "carrots"], beds: [{ w: 4, l: 8 }] },
    { id: "pots", name: "Patio pots", crops: ["basil", "parsley", "chives", "mint", "thyme", "lettuce", "strawberries"], beds: [{ w: 2, l: 6 }] },
    { id: "winter", name: "Fall and winter garden", crops: ["garlic", "kale", "fava-beans", "spinach", "leeks", "shallots"], beds: [{ w: 4, l: 8 }] },
    { id: "bees", name: "Pollinator patch", crops: ["lavender", "sunflowers", "zinnias", "dill", "oregano", "red-flowering-currant", "camas"], beds: [{ w: 4, l: 10 }] }
  ];
  var STEP3 = '<span class="gp-step-n" aria-hidden="true">3</span>';
  var openNotes = {}; // which plant cards have "My notes" open, so a re-render keeps them open
  var TAG = { now: "Plant now", last: "Last chance", indoor: "Start indoors", soon: "Coming up", later: "Not in season" };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lc(n) { return n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels").replace(/^(oregon|douglas|pacific|asian)/, function (w) { return w[0].toUpperCase() + w.slice(1); }); }
  function cropOf(id) { for (var i = 0; i < D.crops.length; i++) if (D.crops[i].id === id) return D.crops[i]; return null; }
  function fresh(s) {
    s = s || {};
    s.crops = (s.crops || []).filter(cropOf); s.done = s.done || {}; s.cropNotes = s.cropNotes || {}; s.notes = s.notes || "";
    s.repeat = s.repeat || {}; s.beds = s.beds && s.beds.length ? s.beds : [{ w: 4, l: 8 }]; s.bedOf = s.bedOf || {}; s.sq = s.sq || {}; s.manual = s.manual || {};
    // Older plans saved square feet per plant, then a plant count. Both become squares (small crops) or plants (big ones).
    if (s.space) { Object.keys(s.space).forEach(function (id) { if (s.space[id] > 0 && !(s.sq[id] > 0) && SPACE[id]) s.sq[id] = Math.max(1, Math.round(s.space[id] / sqPer(id))); }); delete s.space; }
    if (s.count) { Object.keys(s.count).forEach(function (id) { if (s.count[id] > 0 && !(s.sq[id] > 0) && SPACE[id]) s.sq[id] = perSq(id) ? Math.max(1, Math.ceil(s.count[id] / perSq(id))) : +s.count[id]; }); delete s.count; }
    s.harvests = s.harvests || []; s.rating = s.rating || {};
    return s;
  }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() {
    if (preview) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode: plan still works, just not saved */ }
  }

  var mine = fresh(load()), state = mine, preview = false;
  var qs = new URLSearchParams(location.search);
  var qPlace = qs.get("place") && P.findPlace(D, qs.get("place")) ? qs.get("place") : "";
  if (qs.get("plants")) {
    // A shared plan. If it's the same as yours, or you have no plan yet, just use it; otherwise preview it read-only.
    var shared = fresh({ place: qPlace, crops: qs.get("plants").split(",") });
    var same = shared.place === mine.place && shared.crops.slice().sort().join() === mine.crops.slice().sort().join();
    if (same) clearQuery();
    else if (!mine.crops.length) { mine.place = shared.place || mine.place; mine.crops = shared.crops; clearQuery(); }
    else { state = shared; preview = true; }
  } else if (qPlace) mine.place = qPlace;
  if (!state.place) { try { state.place = localStorage.getItem("rainline-place") || ""; } catch (e) { /* ignore */ } }
  if (!preview) save();

  function clearQuery() { if (history.replaceState) history.replaceState(null, "", location.pathname); }

  // Town picker: the shared town box. Once a town is chosen it tucks away behind "Change town".
  box = RainlineTownBox(form, {
    onPick: function (p) { changing = false; msg.textContent = ""; state.place = p.slug; save(); render(); out.scrollIntoView({ behavior: "smooth", block: "start" }); },
    onChange: function () { changing = true; }
  });

  var now = new Date(); now.setHours(0, 0, 0, 0);
  var YEAR = now.getFullYear();
  // Turns a day-of-year into a real date so the list rolls forward 12 months. A job moves to next year only once
  // it ended more than two weeks ago, so a planting window that's open right now stays in this year.
  function realDate(n, endN) {
    var y = YEAR;
    if (new Date(y, 0, endN || n) < new Date(+now - 14 * DAY)) y++;
    return new Date(y, 0, n);
  }
  function short(d) { return MONTHS[d.getMonth()].slice(0, 3) + " " + d.getDate(); }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function fromIso(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { return P.CUM[now.getMonth()] + Math.min(now.getDate(), now.getMonth() === 1 ? 28 : 31); }
  function ordinal(n) { return ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh"][n] || n + "th"; }

  function tasks(p) {
    var list = [], warm = [];
    function add(c, kind, doy, endDoy, text) {
      var d = realDate(doy, endDoy), e = endDoy ? new Date(+d + (endDoy - doy) * DAY) : null;
      list.push({ key: (c ? c.id : "all") + ":" + kind + ":" + d.getFullYear(), date: d, end: e, text: text, crop: c, kind: kind });
    }
    p.crops.forEach(function (r) {
      var c = r.crop, name = lc(c.name), g = H.crops[c.id] || {}, spring = null, every = state.repeat[c.id] || 0;
      if (state.crops.indexOf(c.id) < 0) return;
      if (c.group === "warm") warm.push(lc(c.name));
      r.windows.forEach(function (w) { if (w.kind === "spring") spring = w; });
      if (r.indoor) add(c, "indoor", r.indoor.start, r.indoor.end, "Start seeds indoors for " + name);
      if (r.indoor && spring) add(c, "harden", spring.start - 7, null, "Start hardening off " + name + " (set seedlings outside a few hours a day)");
      r.windows.forEach(function (w) {
        var how = HOW[c.how] ? " " + HOW[c.how] : "";
        if (w.kind === "spring") add(c, "plant", w.start, w.end, "Plant " + (g.plantText || name + how));
        else if (c.anchor === "garlic") add(c, "plant", w.start, w.end, "Plant " + (g.plantText || name) + " for next year");
        else add(c, "fall", w.start, w.end, "Plant " + name + (w.over ? " again to overwinter for an early crop" : " again for a fall harvest"));
        // Repeat sowings: a short row every few weeks while the window is open.
        if (every) for (var k = 1, n = 2; w.start + k * every <= w.end && k < 7; k++, n++)
          add(c, w.kind + "-sow" + n, w.start + k * every, null, "Sow a " + ordinal(n) + " row of " + name + (w.kind === "fall" ? " for fall" : ""));
      });
      if (spring && c.days) add(c, "harvest", spring.start + c.days, null, "First harvest of " + name + " is about due");
    });
    // Watering follows the rain: west of the Cascades summers turn dry in July and the rains return in October;
    // to the east, summer rain is rare from June on.
    var west = p.place.zone === "west" || p.place.zone === "coast";
    if (list.length) {
      if (west) {
        add(null, "water-start", P.doy("07-01"), null, "Dry season starts. Water deeply once or twice a week, about an inch in all, more in hot spells");
        add(null, "water-end", P.doy("10-15"), null, "Fall rains usually return about now. Ease off watering once the soil stays damp");
      } else {
        add(null, "water-start", P.doy("06-01"), null, "Summer is dry east of the Cascades. Water deeply two or three times a week in hot weather");
        add(null, "water-end", P.doy("09-30"), null, "Days are cooling. Water less as plants slow down, but give trees and perennials a deep soak before the ground freezes");
      }
    }
    var f = p.frost;
    if (warm.length) {
      add(null, "lastfrost", f.spring50, f.spring10, "Typical last frost. Keep covers handy for tender plants until " + P.fmtLong(f.spring10));
      add(null, "firstfrost", f.fall10, f.fall50, "First fall frost is getting close. Harvest " + (warm.length > 3 ? "frost-tender crops" : warm.join(" and ").replace(/ and (?=.* and )/g, ", ")) + " before " + P.fmtLong(f.fall50));
    }
    list.sort(function (a, b) { return a.date - b.date || a.text.localeCompare(b.text); });
    return list;
  }

  function isSoon(t, days) { return t.date - now <= days * DAY && (t.end || t.date) >= now; }
  function dateLabel(t) { var nb = function (d) { return short(d).replace(" ", "&nbsp;"); }; return nb(t.date) + (t.end && t.end - t.date > DAY ? "–<wbr>" + nb(t.end) : ""); }
  function taskLi(t) {
    var done = !!state.done[t.key], soon = isSoon(t, 14);
    return '<li class="gp-task' + (done ? " is-done" : "") + (soon && !done ? " is-soon" : "") + '"><label>' +
      '<input type="checkbox" data-key="' + esc(t.key) + '"' + (done ? " checked" : "") + (preview ? " disabled" : "") + '>' +
      '<span class="gp-date">' + dateLabel(t) + '</span>' +
      '<span class="gp-text">' + (t.crop ? R.icon(t.crop.id, base, 22) : "") + esc(t.text) + '</span></label></li>';
  }

  // The few jobs that matter right now: due in the next 7 days, or open and not done yet.
  function thisWeek(list) {
    var due = list.filter(function (t) { return isSoon(t, 7) && !state.done[t.key]; });
    var next = list.filter(function (t) { return t.date > now && !state.done[t.key] && due.indexOf(t) < 0; })[0];
    var h = '<section class="gp-week" id="gp-week" aria-labelledby="gp-week-h"><div class="gp-week-head"><h2 id="gp-week-h">This week</h2>' +
      '<span>' + short(now) + ' – ' + short(new Date(+now + 6 * DAY)) + '</span></div>';
    if (due.length) h += '<ul class="gp-tasks gp-week-list">' + due.map(taskLi).join("") + '</ul>';
    else {
      h += '<p class="gp-week-empty">Nothing due this week.' + (next ? ' Your next job:' : '') + '</p>';
      if (next) h += '<p class="gp-next"><span class="gp-date">' + short(next.date) + '</span><span class="gp-text">' + (next.crop ? R.icon(next.crop.id, base, 22) : "") +
        '<span>' + esc(next.text) + ' <span class="gp-away">' + away(Math.round((next.date - now) / DAY)) + '</span></span></span></p>';
    }
    return h + '</section>';
  }

  /* Bed planner helpers */
  function spTxt(id) { var s = SPACE[id] || 12; return s >= 12 && s % 12 === 0 ? s / 12 + " ft" : s + " in"; }
  // A typical patch to start with: a 2 × 2 ft patch of small crops, or a couple of big plants.
  function typical(id) { var s = SPACE[id] || 12, per = s * s / 144; return Math.max(4, Math.ceil(per * (s >= 24 ? 2 : 4))); }
  /* Bed planner: a square-foot grid. Each bed is drawn as 1 ft squares. Small plants: how many fit in one square
     (from spacing). Big plants: how many squares one plant needs. Trees, shrubs, bushes, vines and canes go "in the ground". */
  var SIZES = [[4, 8], [4, 4], [3, 6], [2, 4]];
  function inGround(c) { return /tree|shrub|bush|vine|cane/.test(c.how || ""); }
  // Plants up to 17 in apart: how many fit in one 1 ft square. Bigger plants take a k × k ft spot (k = spacing in feet, rounded).
  function sp(id) { return SPACE[id] || 12; }
  function perSq(id) { return sp(id) <= 17 ? Math.max(1, Math.pow(Math.floor(12 / sp(id)), 2)) : 0; }
  function spot(id) { return sp(id) <= 17 ? 1 : Math.round(sp(id) / 12); }
  function sqPer(id) { return spot(id) * spot(id); }
  function bedSq(b) { return Math.round(+b.w || 0) * Math.round(+b.l || 0); }
  function capOf(id) { return perSq(id) ? 4 : Math.max(1, Math.round(typical(id) / sqPer(id))); }
  // Suggestions: everyone starts with one square or one plant, then each gets one more in turn while it still fits, up to a typical patch.
  function sqAuto(list) {
    var out = {}, done = {};
    list.forEach(function (c) { if (!(state.sq[c.id] > 0)) out[c.id] = 1; });
    var grow = list.filter(function (c) { return out[c.id]; }), more = true;
    if (sqLayout(list, out, true).loose.length) return out;
    while (more) {
      more = false;
      grow.forEach(function (c) {
        if (done[c.id] || out[c.id] >= capOf(c.id)) return;
        out[c.id]++;
        if (sqLayout(list, out, true).loose.length) { out[c.id]--; done[c.id] = 1; } else more = true;
      });
    }
    return out;
  }
  function units(c, auto) { return state.sq[c.id] > 0 ? +state.sq[c.id] : auto[c.id] || 1; }
  function blockFree(G, r, c, k, ignore) {
    if (r < 0 || c < 0 || r + k > G.rows || c + k > G.cols) return false;
    for (var dr = 0; dr < k; dr++) for (var dc = 0; dc < k; dc++) { var v = G.g[(r + dr) * G.cols + c + dc]; if (v && v !== ignore) return false; }
    return true;
  }
  function occupy(G, r, c, k, tag) { for (var dr = 0; dr < k; dr++) for (var dc = 0; dc < k; dc++) G.g[(r + dr) * G.cols + c + dc] = tag; }
  // First free k × k spot, top to bottom then left to right.
  function firstFree(G, k) { for (var c = 0; c <= G.cols - k; c++) for (var r = 0; r <= G.rows - k; r++) if (blockFree(G, r, c, k)) return { r: r, c: c }; return null; }
  function grids() { return state.beds.map(function (b) { var rows = Math.round(Math.min(+b.w, +b.l)) || 1, cols = Math.round(Math.max(+b.w, +b.l)) || 1; return { rows: rows, cols: cols, g: new Array(rows * cols) }; }); }
  // Lays out every bed. Spots people placed (or that were placed for them before) stay put; anything new goes in the first free spot.
  // dry = true only measures (for suggestions) and doesn't remember the layout.
  function sqLayout(list, auto, dry) {
    var G = grids(), ids = {}, need = {}, have = {}, cells = state.beds.map(function () { return {}; }), loose = [], man = state.manual || {};
    list.forEach(function (c) { ids[c.id] = c; need[c.id] = units(c, auto); have[c.id] = 0; });
    var put = function (b, id, r, c) { var k = spot(id); occupy(G[b], r, c, k, id + "@" + r + "," + c); (cells[b][id] = cells[b][id] || []).push({ r: r, c: c, k: k }); have[id]++; };
    G.forEach(function (g, b) { (man[b] || []).forEach(function (pl) { if (ids[pl.id] && have[pl.id] < need[pl.id] && blockFree(g, pl.r, pl.c, spot(pl.id))) put(b, pl.id, pl.r, pl.c); }); });
    list.slice().sort(function (a, b) { return spot(b.id) - spot(a.id) || need[b.id] * sqPer(b.id) - need[a.id] * sqPer(a.id); }).forEach(function (c) {
      var order = G.map(function (x, j) { return j; }), pref = state.bedOf[c.id];
      order.sort(function (a, b) { return (cells[b][c.id] ? 2 : 0) + (b === pref ? 1 : 0) - (cells[a][c.id] ? 2 : 0) - (a === pref ? 1 : 0); });
      while (have[c.id] < need[c.id]) {
        var ok = false;
        for (var t = 0; t < order.length && !ok; t++) { var f = firstFree(G[order[t]], spot(c.id)); if (f) { put(order[t], c.id, f.r, f.c); ok = true; } }
        if (!ok) break;
      }
      if (have[c.id] < need[c.id]) loose.push({ c: c, sq: (need[c.id] - have[c.id]) * sqPer(c.id), n: need[c.id] - have[c.id] });
    });
    var groups = G.map(function (g, b) {
      return list.filter(function (c) { return cells[b][c.id]; }).sort(function (x, y) { return spot(y.id) - spot(x.id); })
        .map(function (c) { return { c: c, n: cells[b][c.id].length, cells: cells[b][c.id], sq: cells[b][c.id].length * sqPer(c.id) }; });
    });
    if (!dry && !preview) {
      state.manual = {};
      groups.forEach(function (gr, b) { state.manual[b] = []; gr.forEach(function (it) { it.cells.forEach(function (x) { state.manual[b].push({ id: it.c.id, r: x.r, c: x.c }); }); }); });
      list.forEach(function (c) { if (have[c.id]) state.sq[c.id] = have[c.id] + (need[c.id] - have[c.id]); });
    }
    return { groups: groups, loose: loose, grids: G };
  }
  function eico(id, size) { return R.icon(id, base, size).replace(' loading="lazy"', ''); }
  function sqBody(chosen) {
    var list = chosen.filter(function (c) { return !inGround(c); }), ground = chosen.filter(inGround), auto = sqAuto(list), L = sqLayout(list, auto);
    var total = state.beds.reduce(function (s, b) { return s + bedSq(b); }, 0), used = 0;
    L.groups.forEach(function (g) { g.forEach(function (it) { used += it.sq; }); });
    var head = '<p class="sq-sum">' + (L.loose.length ? '<span class="sq-warn">' + L.loose.length + (L.loose.length === 1 ? ' plant doesn\'t' : ' plants don\'t') + ' fit yet</span>'
      : (total - used ? '<strong>' + (total - used) + '</strong> of ' + total + ' squares free' : 'Your beds are full: <strong>' + total + '</strong> squares planted')) +
      (preview ? '' : '<span class="sq-hint"> · Drag a plant to move it</span>') + '</p>';
    var cards = state.beds.map(function (b, i) {
      var W = L.grids[i].rows, Lg = L.grids[i].cols, cellsH = [], items = L.groups[i], G = L.grids[i];
      for (var ci = 0; ci < W * Lg; ci++) if (!G.g[ci]) cellsH.push('<div class="sq sq-free" style="grid-area:' + (Math.floor(ci / Lg) + 1) + ' / ' + (ci % Lg + 1) + '"></div>');
      items.forEach(function (it) {
        it.cells.forEach(function (x) {
          cellsH.push('<div class="sq sq-plant' + (x.k > 1 ? ' sq-big' : '') + '" style="grid-area:' + (x.r + 1) + ' / ' + (x.c + 1) + ' / span ' + x.k + ' / span ' + x.k + '"' +
            (preview ? '' : ' data-drag="' + it.c.id + '" data-b="' + i + '" data-r="' + x.r + '" data-c="' + x.c + '"') + ' title="' + esc(it.c.name) + '">' +
            eico(it.c.id, x.k > 1 ? 40 : 24) + (perSq(it.c.id) > 1 ? '<b>' + perSq(it.c.id) + '</b>' : '') + '</div>');
        });
      });
      var sizeChips = SIZES.map(function (z) { var on = W === z[0] && Lg === z[1]; return '<button type="button" class="sq-size' + (on ? ' is-on' : '') + '" data-act="size" data-i="' + i + '" data-w="' + z[0] + '" data-l="' + z[1] + '" aria-pressed="' + on + '"' + (preview ? ' disabled' : '') + '>' + z[0] + '×' + z[1] + '</button>'; }).join("");
      var custom = !SIZES.some(function (z) { return W === z[0] && Lg === z[1]; });
      var pl = function (n) { return n + (n === 1 ? ' plant' : ' plants'); }, sqs = function (n) { return n + (n === 1 ? ' square' : ' squares'); };
      return '<article class="sq-card"><header class="sq-head"><h3>Bed ' + (i + 1) + ' <span>' + W + ' × ' + Lg + ' ft</span></h3>' +
        (state.beds.length > 1 && !preview ? '<button type="button" class="gp-x" data-act="rmbed" data-i="' + i + '" aria-label="Remove bed ' + (i + 1) + '" title="Remove this bed">×</button>' : '') + '</header>' +
        '<div class="sq-main"><div class="sq-left"><div class="sq-sizes" role="group" aria-label="Bed ' + (i + 1) + ' size in feet">' + sizeChips +
        '<span class="sq-own' + (custom ? ' is-on' : '') + '"><input type="number" min="1" max="30" inputmode="numeric" data-bed="' + i + '" data-dim="w" value="' + W + '" aria-label="Width in feet"' + (preview ? ' disabled' : '') + '><span aria-hidden="true">×</span><input type="number" min="1" max="30" inputmode="numeric" data-bed="' + i + '" data-dim="l" value="' + Lg + '" aria-label="Length in feet"' + (preview ? ' disabled' : '') + '></span></div>' +
        '<div class="sq-grid" data-bed-grid="' + i + '" style="grid-template-columns:repeat(' + Lg + ',1fr);grid-template-rows:repeat(' + W + ',auto)" aria-hidden="true">' + cellsH.join("") + '</div>' +
        '<p class="sq-cap">Each square is 1 × 1 ft. A number means that many plants share the square.</p></div><div class="sq-right">' +
        (items.length ? '<ul class="sq-list">' + items.map(function (it) {
          var c = it.c, ps = perSq(c.id), tot = units(c, auto);
          var how = ps > 1 ? sqs(it.n) + ' · ' + ps + ' plants in each' : ps === 1 ? sqs(it.n) + ' · one plant in each' : 'each plant needs a ' + spot(c.id) + ' × ' + spot(c.id) + ' ft spot';
          return '<li>' + eico(c.id, 32) + '<span class="bd-pn"><strong>' + esc(c.name) + '</strong><span>' + how + '</span></span>' +
            (preview ? '<span class="sq-n">' + pl(it.n * (ps || 1)) + '</span>' :
            '<span class="bd-step"><button type="button" data-act="sq" data-id="' + c.id + '" data-b="' + i + '" data-d="-1" aria-label="Less ' + esc(lc(c.name)) + ' in bed ' + (i + 1) + '"' + (tot <= 1 ? ' disabled' : '') + '>−</button>' +
            '<output>' + it.n * (ps || 1) + '</output><button type="button" data-act="sq" data-id="' + c.id + '" data-b="' + i + '" data-d="1" aria-label="More ' + esc(lc(c.name)) + ' in bed ' + (i + 1) + '">+</button></span>' +
            '<button type="button" class="gp-x" data-act="sqrm" data-crop="' + c.id + '" aria-label="Remove ' + esc(lc(c.name)) + ' from my plan" title="Remove from my plan">×</button>') + '</li>';
        }).join("") + '</ul>' : '<p class="bd-empty">Nothing in this bed yet. Drag a plant here, or tap “Optimize my beds”.</p>') + '</div></div></article>';
    }).join("");
    var loose = L.loose.length ? '<div class="sq-loose"><h3>Doesn\'t fit yet</h3><ul>' + L.loose.map(function (it) {
      return '<li>' + eico(it.c.id, 28) + '<span><strong>' + esc(it.c.name) + '</strong> needs ' + it.sq + (it.sq === 1 ? ' more square' : ' more squares') + '. Add a bed, use less of something else, or take it out.</span>' +
        (preview ? '' : '<button type="button" class="gp-x" data-act="sqrm" data-crop="' + it.c.id + '" aria-label="Remove ' + esc(lc(it.c.name)) + ' from my plan" title="Remove from my plan">×</button>') + '</li>'; }).join("") + '</ul></div>' : '';
    var gr = ground.length ? '<div class="sq-ground"><h3>Plant in the ground</h3><p>Trees, shrubs, bushes, vines and canes get too big for a raised bed. Give each one this much room:</p><ul>' + ground.map(function (c) {
      return '<li>' + eico(c.id, 28) + '<span><strong>' + esc(c.name) + '</strong> ' + spTxt(c.id) + ' apart</span>' +
        (preview ? '' : '<button type="button" class="gp-x" data-act="sqrm" data-crop="' + c.id + '" aria-label="Remove ' + esc(lc(c.name)) + ' from my plan" title="Remove from my plan">×</button>') + '</li>'; }).join("") + '</ul></div>' : '';
    return head + '<div class="sq-cards">' + cards + '</div>' + loose + gr;
  }
  /* Optimize: Builds a few layouts from the same spacing data and shows them side by side. */
  function withState(tmp, fn) {
    var keep = { sq: state.sq, manual: state.manual, bedOf: state.bedOf };
    state.sq = tmp.sq; state.manual = tmp.manual; state.bedOf = tmp.bedOf || {};
    try { return fn(); } finally { state.sq = keep.sq; state.manual = keep.manual; state.bedOf = keep.bedOf; }
  }
  function manualOf(L) { var m = {}; L.groups.forEach(function (gr, b) { m[b] = []; gr.forEach(function (it) { it.cells.forEach(function (x) { m[b].push({ id: it.c.id, r: x.r, c: x.c }); }); }); }); return m; }
  function goesIn(place) {
    var p = P.plan(D, place), out = {};
    p.crops.forEach(function (r) { if (r.windows.length) out[r.crop.id] = r.windows[0].start; });
    return out;
  }
  function optCandidates(list, place) {
    var bal = withState({ sq: {}, manual: {} }, function () { return sqAuto(list); });
    var cands = [];
    var L1 = withState({ sq: bal, manual: {} }, function () { return sqLayout(list, {}, true); });
    cands.push({ key: "even", title: "Even mix", why: "A fair share of room for every plant.", sq: bal, manual: manualOf(L1), L: L1 });
    // Grow one group as far as it fits (everyone keeps at least one), then top up the rest.
    var grow = function (first) {
      var sq = {}; list.forEach(function (c) { sq[c.id] = 1; });
      var pass = function (pick) {
        var more = true;
        while (more) {
          more = false;
          list.filter(pick).sort(function (a, b) { return sq[a.id] * sqPer(a.id) - sq[b.id] * sqPer(b.id); }).some(function (c) {
            sq[c.id]++;
            if (!withState({ sq: sq, manual: {} }, function () { return sqLayout(list, {}, true); }).loose.length) { more = true; return true; }
            sq[c.id]--; return false;
          });
        }
      };
      pass(first); pass(function () { return true; });
      return sq;
    };
    [["big", "More big plants", "More tomatoes, squash and other big plants; small crops fill the gaps.", function (c) { return !perSq(c.id); }],
     ["small", "More small crops", "One of each big plant, and the rest of the room for small crops like carrots and lettuce.", function (c) { return !!perSq(c.id); }]].forEach(function (o) {
      if (!list.some(o[3])) return;
      var sq = grow(o[3]), L = withState({ sq: sq, manual: {} }, function () { return sqLayout(list, {}, true); });
      if (cands.some(function (x) { return JSON.stringify(x.sq) === JSON.stringify(sq); })) return;
      cands.push({ key: o[0], title: o[1], why: o[2], sq: sq, manual: manualOf(L), L: L });
    });
    // By planting time: plants that go in first sit together at the left of Bed 1.
    var when = goesIn(place), byDate = list.slice().sort(function (a, b) { return (when[a.id] || 999) - (when[b.id] || 999); });
    var G = grids(), man = {}, okAll = true;
    G.forEach(function (g, b) { man[b] = []; });
    byDate.forEach(function (c) {
      for (var u = 0; u < (bal[c.id] || 1); u++) {
        var done = false;
        for (var b = 0; b < G.length && !done; b++) { var f = firstFree(G[b], spot(c.id)); if (f) { occupy(G[b], f.r, f.c, spot(c.id), c.id); man[b].push({ id: c.id, r: f.r, c: f.c }); done = true; } }
        if (!done) okAll = false;
      }
    });
    var L3 = withState({ sq: bal, manual: man }, function () { return sqLayout(list, {}, true); });
    var months = [];
    byDate.forEach(function (c) { if (!when[c.id]) return; var m = P.fmt(when[c.id]).split(" ")[0], last = months[months.length - 1];
      if (last && last.m === m) last.n.push(lc(c.name.replace(/ and summer squash/, ""))); else months.push({ m: m, n: [lc(c.name.replace(/ and summer squash/, ""))] }); });
    cands.push({ key: "time", title: "Plant together", why: "Plants that go in the same month sit side by side, left to right. " + months.map(function (x) { return x.m + ": " + x.n.join(", "); }).join(" · "), sq: bal, manual: man, L: L3 });
    return cands;
  }
  function miniGrids(L) {
    return L.groups.map(function (items, b) {
      var G = L.grids[b], h = [];
      for (var ci = 0; ci < G.rows * G.cols; ci++) if (!G.g[ci]) h.push('<i class="sq-free" style="grid-area:' + (Math.floor(ci / G.cols) + 1) + ' / ' + (ci % G.cols + 1) + '"></i>');
      items.forEach(function (it) { it.cells.forEach(function (x) { h.push('<i class="sq-plant" style="grid-area:' + (x.r + 1) + ' / ' + (x.c + 1) + ' / span ' + x.k + ' / span ' + x.k + '">' + eico(it.c.id, x.k > 1 ? 22 : 14) + '</i>'); }); });
      return '<div class="sq-mini" style="grid-template-columns:repeat(' + G.cols + ',1fr)">' + h.join("") + '</div>';
    }).join("");
  }
  function optPanel(chosen, place) {
    var list = chosen.filter(function (c) { return !inGround(c); });
    if (!list.length) return '';
    var cands = optCandidates(list, place);
    optPanel.cands = cands;
    return '<div class="sq-opt" id="sq-opt"><div class="sq-opt-head"><h3>Pick a layout</h3><button type="button" class="gp-x" data-act="optclose" aria-label="Close layouts">×</button></div>' +
      '<div class="sq-opt-list">' + cands.map(function (c, i) {
        var used = 0, plants = 0, total = state.beds.reduce(function (s, b) { return s + bedSq(b); }, 0);
        c.L.groups.forEach(function (g) { g.forEach(function (it) { used += it.sq; plants += it.n * (perSq(it.c.id) || 1); }); });
        return '<article class="sq-opt-card"><h4>' + c.title + '</h4><p>' + esc(c.why) + '</p>' + miniGrids(c.L) +
          '<p class="sq-opt-stat">' + used + ' of ' + total + ' squares · about ' + plants + ' plants' + (c.L.loose.length ? ' · ' + c.L.loose.length + ' don\'t fit' : '') + '</p>' +
          '<button type="button" class="btn btn-sm" data-act="optuse" data-i="' + i + '">Use this</button></article>';
      }).join("") + '</div></div>';
  }
  function sqBeds(chosen) {
    return '<section class="gp-sec gp-beds2" id="gp-beds-sec" aria-labelledby="gp-beds-h"><h2 id="gp-beds-h">Your beds</h2>' +
      '<p class="station">' + (preview ? 'How these plants fit in the beds, using each plant\'s spacing.' : 'Pick a bed size and we\'ll fill it for you, using each plant\'s spacing. Drag plants to move them; tap × to take one out.') + '</p>' +
      '<div id="sq-optwrap"></div><div id="sq-wrap">' + sqBody(chosen) + '</div>' +
      (preview ? '' : '<div class="sq-actions"><button type="button" class="btn btn-sm" data-act="optimize">Optimize my beds</button><button type="button" class="btn btn-ghost btn-sm" data-act="addbed">+ Add a bed</button></div>') +
      '<div class="sq-trash" id="sq-trash" hidden><span aria-hidden="true">×</span> Drop here to take it out</div></section>';
  }
  function beds(chosen) { return sqBeds(chosen); }
  // Redraws the beds in place (after +/−, a drag or while someone types a bed size), keeping their cursor in the box.
  function refreshBeds() {
    var w = document.getElementById("sq-wrap"), a = document.activeElement, kp = a && a.dataset && a.dataset.bed ? [a.dataset.bed, a.dataset.dim] : null;
    if (w) w.innerHTML = sqBody(chosenCrops());
    if (kp) { var e2 = out.querySelector('[data-bed="' + kp[0] + '"][data-dim="' + kp[1] + '"]'); if (e2) e2.focus(); }
  }

  /* Cheat sheet, ratings and harvest log */
  function harvestsOf(id) { return state.harvests.filter(function (h) { return h.crop === id; }); }
  function cheat(c) {
    var g = H.crops[c.id] || {}, rows = [["Sun", g.sun], ["Spacing", g.spacing], ["Depth", g.depth], ["Harvest", g.harvest], ["Watch for", g.problem]];
    var rate = state.rating[c.id] || {}, past = Object.keys(rate).filter(function (y) { return +y < YEAR; }).sort().reverse()[0];
    var hs = harvestsOf(c.id).filter(function (h) { return h.date.slice(0, 4) === String(YEAR); });
    var label = { good: "did well", ok: "was OK", poor: "struggled" };
    var h = '<article class="gp-card"><h3>' + R.icon(c.id, base, 32) + '<a href="' + base + 'when-to-plant/' + c.id + '/">' + esc(c.name) + '</a></h3>';
    if (past) h += '<p class="gp-past gp-past-' + rate[past] + '">In ' + past + ' it ' + label[rate[past]] + '.</p>';
    h += '<dl>' + rows.filter(function (r) { return r[1]; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join("") + '</dl>';
    // Sowing, variety, rating and harvests fold away so the card leads with the growing tips; the summary says what's filled in.
    var ev = state.repeat[c.id] || 0, mineBits = [];
    if (ev) mineBits.push("sow every " + ev / 7 + " weeks");
    if (rate[YEAR]) mineBits.push(label[rate[YEAR]]);
    if (hs.length) mineBits.push(hs.length + (hs.length === 1 ? " harvest" : " harvests"));
    if (!mineBits.length && state.cropNotes[c.id]) mineBits.push("variety noted");
    var hasMine = REPEAT.indexOf(c.id) >= 0 || !preview;
    if (hasMine) h += '<details class="gp-mine" data-mine="' + c.id + '"' + (openNotes[c.id] ? " open" : "") + '><summary>' + (preview ? "Sowing" : "My notes") +
      '<span>' + esc(mineBits.length ? mineBits.join(" · ") : preview ? "" : "variety, rating, harvests") + '</span></summary>';
    if (REPEAT.indexOf(c.id) >= 0) {
      h += '<label class="gp-mini">Sowing<select data-repeat="' + c.id + '"' + (preview ? " disabled" : "") + '>' +
        [[0, "Sow once"], [14, "Sow again every 2 weeks"], [21, "Sow again every 3 weeks"]].map(function (o) { return '<option value="' + o[0] + '"' + (ev === o[0] ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select></label>';
    }
    if (!preview) {
      h += '<label class="gp-mini">Variety and where I planted it<input type="text" data-crop="' + c.id + '" value="' + esc(state.cropNotes[c.id]) + '" maxlength="140"></label>' +
        '<div class="gp-rate" role="group" aria-label="How did ' + esc(lc(c.name)) + ' do in ' + YEAR + '?"><span>How did it do this year?</span><div>' +
        RATINGS.map(function (r) { return '<button type="button" class="gp-chip gp-chip-' + r[0] + '" data-act="rate" data-crop="' + c.id + '" data-v="' + r[0] + '" aria-pressed="' + (rate[YEAR] === r[0]) + '">' + r[1] + '</button>'; }).join("") +
        '</div></div>' +
        '<p class="gp-hcount">' + (hs.length ? hs.length + (hs.length === 1 ? " harvest" : " harvests") + " logged this year, last on " + short(fromIso(hs[hs.length - 1].date)) : "No harvests logged yet") +
        ' · <button type="button" class="linkish" data-act="loghere" data-crop="' + c.id + '">Log one</button></p>';
    }
    if (hasMine) h += '</details>';
    return h + '</article>';
  }

  function harvestLog(chosen) {
    var ids = chosen.map(function (c) { return c.id; });
    var extra = state.harvests.map(function (h) { return h.crop; }).filter(function (id, i, a) { return ids.indexOf(id) < 0 && a.indexOf(id) === i && cropOf(id); });
    var opts = ids.concat(extra);
    var list = state.harvests.slice().sort(function (a, b) { return b.date < a.date ? -1 : b.date > a.date ? 1 : 0; });
    var byYear = {};
    list.forEach(function (h) { var y = h.date.slice(0, 4); (byYear[y] = byYear[y] || []).push(h); });
    return '<section class="gp-sec" id="gp-log-sec" aria-labelledby="gp-log-h"><h2 id="gp-log-h">Harvest log</h2>' +
      '<p class="station">Write down what you pick and how much. Next year this shows you what did well.</p>' +
      '<form class="gp-logform" id="gp-logform">' +
      '<div class="field"><label for="gp-log-crop">Plant</label><select id="gp-log-crop">' + opts.map(function (id) { return '<option value="' + id + '">' + esc(cropOf(id).name) + '</option>'; }).join("") + '</select></div>' +
      '<div class="field"><label for="gp-log-date">Date</label><input id="gp-log-date" type="date" value="' + iso(now) + '" max="' + iso(now) + '"></div>' +
      '<div class="field gp-log-note"><label for="gp-log-note">How much</label><input id="gp-log-note" type="text" maxlength="80" placeholder="2 lb, a big bowl, first ripe one…"></div>' +
      '<button class="btn" type="submit">Add</button></form>' +
      (list.length ? Object.keys(byYear).sort().reverse().map(function (y) {
        return '<h3 class="gp-month">' + y + ' <span class="gp-count">' + byYear[y].length + (byYear[y].length === 1 ? " harvest" : " harvests") + '</span></h3><ul class="gp-log">' +
          byYear[y].map(function (h) {
            var c = cropOf(h.crop);
            return '<li><span class="gp-date">' + short(fromIso(h.date)) + '</span><span class="gp-text">' + (c ? R.icon(c.id, base, 22) + esc(c.name) : "") + (h.note ? ' <span class="gp-log-n">' + esc(h.note) + '</span>' : '') + '</span>' +
              '<button type="button" class="gp-x" data-act="rmlog" data-id="' + esc(h.id) + '" aria-label="Remove this harvest">×</button></li>';
          }).join("") + '</ul>';
      }).join("") : '<p class="empty">No harvests yet.</p>') + '</section>';
  }

  function frostAlerts(place, p) {
    var f = p.frost;
    var h = '<section class="gp-sec gp-alert" id="gp-alert-sec" aria-labelledby="gp-alert-h"><h2 id="gp-alert-h">Frost alerts</h2>' +
      '<p>In ' + esc(place.city) + ', frost usually ends around <strong>' + P.fmtLong(f.spring50) + '</strong> and comes back around <strong>' + P.fmtLong(f.fall50) + '</strong>. ' +
      'Get a heads-up a week before each, plus a reminder on the risky dates.</p>' +
      '<div class="gp-alert-row"><button type="button" class="btn" data-act="frostics">Add frost alerts to my calendar</button>' +
      '<span class="gp-saved">Works with Apple, Google and Outlook calendars</span></div>';
    if (alertTpl) h += alertTpl.innerHTML.replace(/\{town\}/g, esc(place.city)).replace(/\{slug\}/g, place.slug);
    return h + '</section>';
  }

  /* Season check */
  function when(n) { return P.fmtLong(n.w.start); }
  function away(d) { return d <= 21 ? "in " + d + (d === 1 ? " day" : " days") : d < 60 ? "in about " + Math.round(d / 7) + " weeks" : "in about " + Math.round(d / 30.4) + " months"; }
  function seasonText(r, s, place) {
    var name = lc(r.crop.name), t;
    if (s.k === "now") t = "In season now. Plant any time until " + P.fmtLong(s.w.end) + ".";
    else if (s.k === "last") t = "Last chance this year: the window closes " + P.fmtLong(s.w.end) + ", so plant this week if you can.";
    else if (s.k === "indoor") {
      var out = r.windows.filter(function (w) { return w.kind === "spring"; })[0];
      t = "Too early to plant outside, but it's time to start seeds indoors (until " + P.fmtLong(s.w.end) + ")." + (out ? " Plant them out from about " + P.fmtLong(out.start) + "." : "");
    } else {
      var n = s.next, step = n.kind === "indoor" ? "start seeds indoors from " + when(n) : (n.kind === "fall" && r.crop.anchor !== "garlic" ? "plant again for fall from " : "plant from ") + when(n);
      if (s.k === "soon") t = "Coming up: " + step + " (" + away(n.d) + ").";
      else if (s.missed) t = "Just missed it: the window closed " + P.fmtLong(s.missed.w.end) + ". Next chance: " + step + ", " + away(n.d) + ".";
      else t = "Not the season for " + name + " in " + place.city + " yet. Next chance: " + step + ", " + away(n.d) + ".";
    }
    if (r.season === "short") t += " Heads up: the frost-free season in " + place.city + " is usually too short for " + name + " to ripen, so use the fastest variety you can find and cover plants on cold nights.";
    else if (r.season === "tight") t += " The season here is tight for " + name + ", so pick a fast variety.";
    return t;
  }
  // One short line per plant for the season check; the full sentence (seasonText) is for the picker.
  function shortWhen(r, s) {
    if (s.k === "now") return "Plant any time until " + P.fmt(s.w.end);
    if (s.k === "last") return "Last chance: plant by " + P.fmt(s.w.end);
    if (s.k === "indoor") return "Start seeds indoors now, until " + P.fmt(s.w.end);
    var n = s.next, step = n.kind === "indoor" ? "Start seeds indoors" : n.kind === "fall" && r.crop.anchor !== "garlic" ? "Plant again for fall" : "Plant";
    return (s.missed ? "Missed it (closed " + P.fmt(s.missed.w.end) + "). Next: " + step.toLowerCase() : step) + " from " + P.fmt(n.w.start) + ", " + away(n.d);
  }
  function shortSeasonNote(r, place) {
    if (r.season === "short") return "The frost-free season in " + place.city + " is usually too short for it. Pick the fastest variety and cover plants on cold nights.";
    if (r.season === "tight") return "The season here is tight for it, so pick a fast variety.";
    return "";
  }
  function seasonCheck(p, place) {
    var t = today(), rows = p.crops.filter(function (r) { return state.crops.indexOf(r.crop.id) >= 0; }).map(function (r) { return { r: r, s: P.season(r, t) }; });
    var order = { last: 0, now: 1, indoor: 2, soon: 3, later: 4 };
    var ready = rows.filter(function (x) { return (x.s.k === "now" || x.s.k === "last") && x.r.season !== "short"; });
    var warn = rows.filter(function (x) { return ready.indexOf(x) < 0; })
      .sort(function (a, b) { return order[a.s.k] - order[b.s.k] || (a.s.next ? a.s.next.d : 0) - (b.s.next ? b.s.next.d : 0); });
    var lastOnes = ready.filter(function (x) { return x.s.k === "last"; });
    var swaps = p.crops.filter(function (r) { return state.crops.indexOf(r.crop.id) < 0 && P.season(r, t).k === "now" && !r.season; })
      .sort(function (a, b) { return ((H.crops[a.crop.id] || {}).difficulty || 2) - ((H.crops[b.crop.id] || {}).difficulty || 2) || a.crop.name.localeCompare(b.crop.name); }).slice(0, 6);
    var h = '<section class="gp-sec gp-season" id="gp-season-sec" aria-labelledby="gp-season-h"><h2 id="gp-season-h">Season check</h2>' +
      '<p>It\'s ' + MONTHS[now.getMonth()] + ' in ' + esc(place.city) + '. ' + (ready.length ? '<strong>' + ready.length + ' of your ' + rows.length + ' plants</strong> can go in now' +
      (warn.length ? '; here\'s when the ' + (warn.length === 1 ? 'other one starts' : 'other ' + warn.length + ' start') + '.' : '. Everything you picked is in season.')
      : '<strong>None of your ' + (rows.length === 1 ? 'plants' : rows.length + ' plants') + '</strong> go in right now. Here\'s when each one starts.') + '</p>';
    if (ready.length) h += '<p class="gp-ready"><span class="gp-st gp-st-now">' + TAG.now + '</span> ' + ready.map(function (x) { return esc(x.r.crop.name) + (x.s.k === "last" ? ' <span class="gp-st gp-st-last">closes ' + P.fmt(x.s.w.end) + '</span>' : ''); }).join(", ") + '</p>';
    if (lastOnes.length || warn.length) h += '<ul class="gp-warns">' + lastOnes.concat(warn).map(function (x) {
      var k = x.r.season === "short" && (x.s.k === "now" || x.s.k === "last") ? "later" : x.s.k;
      var note = shortSeasonNote(x.r, place);
      return '<li class="gp-warn-' + k + '">' + R.icon(x.r.crop.id, base, 28) + '<div><p><strong>' + esc(x.r.crop.name) + '</strong> <span class="gp-st gp-st-' + k + '">' + (x.r.season === "short" ? "Hard here" : TAG[x.s.k]) + '</span></p>' +
        '<p class="gp-when">' + esc(shortWhen(x.r, x.s)) + '</p>' + (note ? '<p class="gp-when-note">' + esc(note) + '</p>' : '') + '</div>' +
        (k === "later" && !preview ? '<button type="button" class="gp-x" data-act="rmcrop" data-crop="' + x.r.crop.id + '" aria-label="Remove ' + esc(lc(x.r.crop.name)) + ' from my plan" title="Remove from my plan">×</button>' : '') + '</li>';
    }).join("") + '</ul>' +
      (warn.some(function (x) { return x.s.k === "later"; }) && !preview ? '<p class="gp-warn-act">Plants that aren\'t in season keep their dates in your to-do list. Tap × to take one out.</p>' : '');
    if (swaps.length && !preview) h += '<div class="gp-swaps"><p>In season now in ' + esc(place.city) + ':</p><div>' + swaps.map(function (r) {
      return '<button type="button" class="gp-swap" data-act="addcrop" data-crop="' + r.crop.id + '">' + R.icon(r.crop.id, base, 24) + '<span>+ ' + esc(r.crop.name) + '</span></button>';
    }).join("") + '</div></div>';
    return h + '</section>';
  }
  // Small season tags on the plant picker, so people see what's in season before they tick it.
  function tagPicker(p) {
    var t = today(), by = {};
    if (p) p.crops.forEach(function (r) { by[r.crop.id] = r; });
    Array.prototype.forEach.call(pick.querySelectorAll(".gp-opt"), function (lab) {
      var inp = lab.querySelector("input"), tag = lab.querySelector(".gp-st"), r = by[inp.value];
      if (!r) { if (tag) tag.remove(); return; }
      var s = P.season(r, t), k = r.season === "short" ? "later" : s.k;
      if (!tag) { tag = document.createElement("span"); lab.appendChild(tag); }
      tag.className = "gp-st gp-st-" + k;
      tag.textContent = r.season === "short" ? "Hard here" : k === "later" && s.next ? P.MONTHS[P.fromDoy(s.next.w.start).m] : TAG[k];
      tag.title = seasonText(r, s, p.place);
    });
  }
  function noteFor(id) {
    var place = P.findPlace(D, state.place); if (!place || !pickNote) return;
    var p = P.plan(D, place), r = p.crops.filter(function (x) { return x.crop.id === id; })[0]; if (!r) return;
    var s = P.season(r, today());
    if ((s.k === "now" || s.k === "last" || s.k === "indoor") && !r.season) { pickNote.textContent = ""; pickNote.hidden = true; return; }
    pickNote.hidden = false;
    pickNote.textContent = r.crop.name + ": " + seasonText(r, s, place) + (s.k === "soon" ? "" : " It stays in your plan with its dates.");
  }

  function chosenCrops() { return D.crops.filter(function (c) { return state.crops.indexOf(c.id) >= 0; }); }

  function shareBanner() {
    if (!preview) { share.hidden = true; share.innerHTML = ""; return; }
    var place = P.findPlace(D, state.place);
    share.hidden = false;
    share.innerHTML = '<div><strong>You\'re looking at a shared plan</strong><span>' + state.crops.length + ' plants' + (place ? ' for ' + esc(place.city) : '') +
      '. Your own plan (' + mine.crops.length + ' plants) is safe until you choose.</span></div>' +
      '<div class="gp-share-btns"><button type="button" class="btn" data-act="adopt">Save as my plan</button><button type="button" class="btn btn-ghost" data-act="mine">Back to my plan</button></div>';
  }

  function render() {
    shareBanner();
    var place = P.findPlace(D, state.place);
    if (place && !changing) box.collapse(place, "Your town: <strong>" + place.city + ", " + place.state + "</strong>.");
    else if (!place) box.expand(false);
    form.hidden = preview; pick.hidden = preview;
    Array.prototype.forEach.call(pick.querySelectorAll("input[type=checkbox]"), function (b) { b.checked = state.crops.indexOf(b.value) >= 0; });
    groupCounts();
    var count = document.getElementById("gp-count");
    if (count) count.textContent = state.crops.length ? state.crops.length + " picked" : "";
    tagPicker(place ? P.plan(D, place) : null);
    if (!place || !state.crops.length) {
      out.innerHTML = '<h2 class="gp-step">' + STEP3 + 'Your plan</h2><div class="gp-empty-wrap">' + emptyArt + '<p class="empty gp-empty">' + (!place ? "Choose your town" : "Pick at least one plant") + ' to see your plan.</p></div>';
      return;
    }
    var p = P.plan(D, place), list = tasks(p), chosen = chosenCrops();
    var sub = { place: p.place, station: p.station, zone: p.zone, frost: p.frost, crops: p.crops.filter(function (r) { return state.crops.indexOf(r.crop.id) >= 0; }) };
    var groups = [], cur = null;
    list.forEach(function (t) {
      var label = MONTHS[t.date.getMonth()] + " " + t.date.getFullYear();
      if (!cur || cur.label !== label) { cur = { label: label, items: [] }; groups.push(cur); }
      cur.items.push(t);
    });
    var doneCount = list.filter(function (t) { return state.done[t.key]; }).length;
    var side = place.zone === "coast" ? "On the coast, west of the rain line: mild, wet winters and cool, foggy summers."
      : place.zone === "west" ? "West of the rain line: wet winters, dry summers and a long, mild season."
      : "East of the rain line: little rain, hot summers and colder winters, so watering matters most.";
    var jump = [["gp-week", "This week"], ["gp-season-sec", "Season check"], ["gp-beds-sec", "Beds"], ["gp-todo-h", "To-do list"], ["gp-chart-h", "Chart"], ["gp-cards-h", "Plants"]].concat(preview ? [] : [["gp-more", "More tools"]]);
    out.innerHTML =
      (preview ? '' : '<div class="gp-bar"><button type="button" class="btn" data-act="print">Print or save as PDF</button>' +
      '<button type="button" class="btn btn-ghost" data-act="ics">Add dates to my calendar</button>' +
      '<button type="button" class="btn btn-ghost" data-act="link">Copy link to this plan</button>' +
      '<button type="button" class="btn btn-ghost gp-reset" data-act="reset">Reset plan</button>' +
      '<span class="gp-saved" role="status">Saved on this device</span></div>') +
      '<header class="gp-title"><h2 class="gp-step">' + (preview ? '' : STEP3) + 'Garden plan for ' + esc(place.city) + ', ' + place.state + '</h2>' +
      '<p>' + chosen.length + ' plants · ' + doneCount + ' of ' + list.length + ' jobs done · made ' + short(now) + ', ' + YEAR + ' at rainlinegarden.org</p>' +
      '<p class="gp-rain"><a href="' + base + 'how-it-works/#rain-line">' + side + '</a></p></header>' +
      '<nav class="gp-jump" aria-label="Plan sections">' + jump.map(function (j) { return '<a href="#' + j[0] + '">' + j[1] + '</a>'; }).join("") + '</nav>' +
      thisWeek(list) +
      seasonCheck(p, place) +
      beds(chosen) +
      '<h2 id="gp-todo-h">Your to-do list</h2><p class="station">Tick jobs off as you go. Jobs due in the next two weeks are highlighted. Dates are a guide: check the soil and the forecast too.</p>' +
      groups.map(function (g) { return '<h3 class="gp-month">' + g.label + '</h3><ul class="gp-tasks">' + g.items.map(taskLi).join("") + '</ul>'; }).join("") +
      '<h2 id="gp-chart-h">Season at a glance</h2><div class="reveal">' + R.chart(sub, today()) + '</div>' +
      R.frostFacts(p) +
      '<h2 id="gp-cards-h">Plant cheat sheet</h2><div class="gp-cards">' + chosen.map(cheat).join("") + '</div>' +
      // A shared plan you're only previewing has nothing under More tools, so it's left out.
      (preview ? '' : '<details class="gp-more" id="gp-more"' + (state.moreOpen ? " open" : "") + '><summary><span class="gp-more-t">More tools</span><span class="gp-more-s">' +
        'Harvest log, frost alerts and notes</span></summary>' +
      harvestLog(chosen) + frostAlerts(place, p) +
      '<section class="gp-sec" aria-labelledby="gp-notes-h"><h2 id="gp-notes-h">Notes</h2><label class="sr-only" for="gp-notes">Garden notes</label><textarea id="gp-notes" class="gp-notes" rows="6" placeholder="What did well, what to change next year, where the sun hits...">' + esc(state.notes) + '</textarea></section>' +
      '</details>');
  }

  /* Calendar files */
  function d8(d) { return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0"); }
  function escIcs(s) { return String(s).replace(/[\\;,]/g, function (c) { return "\\" + c; }); }
  // iCalendar lines longer than 75 bytes must wrap onto continuation lines that start with a space.
  function fold(line) {
    var outL = [], cur = "", bytes = 0;
    Array.from(line).forEach(function (ch) {
      var b = unescape(encodeURIComponent(ch)).length;
      if (bytes + b > (outL.length ? 74 : 75)) { outL.push(cur); cur = ""; bytes = 0; }
      cur += ch; bytes += b;
    });
    outL.push(cur);
    return outL.join("\r\n ");
  }
  function download(name, events, calName) {
    var stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Rainline Garden//Garden plan//EN", "CALSCALE:GREGORIAN", "X-WR-CALNAME:" + escIcs(calName)];
    events.forEach(function (e) {
      lines.push("BEGIN:VEVENT", "UID:" + e.uid + "@rainlinegarden.org", "DTSTAMP:" + stamp,
        "DTSTART;VALUE=DATE:" + d8(e.date), "DTEND;VALUE=DATE:" + d8(new Date(+e.date + DAY)),
        "SUMMARY:" + escIcs(e.summary), "DESCRIPTION:" + escIcs(e.desc));
      // Pop-up reminder; triggers are measured from midnight at the start of the all-day event.
      (e.alarms || ["PT8H"]).forEach(function (tr) {
        lines.push("BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + escIcs(e.summary), "TRIGGER;RELATED=START:" + tr, "END:VALARM");
      });
      lines.push("END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([lines.map(fold).join("\r\n") + "\r\n"], { type: "text/calendar" }));
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
  }
  function ics(list, place) {
    download("garden-plan-" + place.slug + ".ics", list.filter(function (t) { return (t.end || t.date) >= now && !state.done[t.key]; }).map(function (t) {
      return { uid: t.key + "-" + place.slug, date: t.date, summary: t.text,
        desc: (t.end && t.end - t.date > DAY ? "Window: " + short(t.date) + " to " + short(t.end) + ". " : "") +
          (t.crop ? "Guide: https://rainlinegarden.org/when-to-plant/" + t.crop.id + "/?town=" + place.slug : "Rainline Garden plan for " + place.city) };
    }), "Garden plan (" + place.city + ")");
  }
  function frostIcs(place) {
    var f = P.plan(D, place).frost, cal = "https://rainlinegarden.org/frost-dates/" + place.slug + "/";
    function ev(key, doy, summary, desc, alarms) { var d = realDate(doy); return { uid: "frost-" + key + "-" + d.getFullYear() + "-" + place.slug, date: d, summary: summary, desc: desc + " " + cal, alarms: alarms }; }
    var evs = [
      ev("spring", f.spring50, "Typical last frost in " + place.city, "Half of years still see a frost after today. Keep covers handy for tender plants until " + P.fmtLong(f.spring10) + ".", ["-P7DT0H", "PT8H"]),
      ev("spring-safe", f.spring10, "Frost risk is low now in " + place.city, "Only 1 year in 10 has a frost after today. Tender crops like tomatoes and squash still wait for warm soil, so go by their dates in your plan.", ["PT8H"]),
      ev("fall-early", f.fall10, "Early frost possible in " + place.city, "1 year in 10 has its first fall frost by today. Watch the forecast and have covers ready.", ["-P7DT0H", "PT8H"]),
      ev("fall", f.fall50, "Typical first fall frost in " + place.city, "Pick tomatoes, squash, beans and basil before tonight if frost is forecast.", ["-P7DT0H", "PT8H"])
    ].sort(function (a, b) { return a.date - b.date; });
    download("frost-alerts-" + place.slug + ".ics", evs, "Frost alerts (" + place.city + ")");
  }

  /* Take a plant out of the plan (with Undo), and drag plants around the beds. */
  var undoBar;
  function takeOut(id) {
    var c = cropOf(id), before = JSON.stringify({ crops: state.crops, sq: state.sq, manual: state.manual, bedOf: state.bedOf });
    state.crops = state.crops.filter(function (x) { return x !== id; }); delete state.sq[id];
    save(); render();
    showUndo(c.name + " taken out of your plan", before);
  }
  function showUndo(text, before) {
    if (!undoBar) { undoBar = document.createElement("div"); undoBar.className = "sq-undo"; undoBar.setAttribute("role", "status"); document.body.appendChild(undoBar); }
    undoBar.innerHTML = '<span>' + esc(text) + '</span><button type="button">Undo</button>';
    undoBar.classList.add("is-on");
    clearTimeout(undoBar.t); undoBar.t = setTimeout(function () { undoBar.classList.remove("is-on"); }, 6000);
    undoBar.querySelector("button").onclick = function () {
      var o = JSON.parse(before); state.crops = o.crops; state.sq = o.sq; state.manual = o.manual; state.bedOf = o.bedOf;
      save(); render(); undoBar.classList.remove("is-on");
    };
  }
  function dropTarget(x, y, id) {
    var el = document.elementFromPoint(x, y), trash = document.getElementById("sq-trash");
    if (trash && el && trash.contains(el)) return { trash: true };
    var grid = el && el.closest && el.closest("[data-bed-grid]"); if (!grid) return null;
    var b = +grid.dataset.bedGrid, G = grids()[b], rect = grid.getBoundingClientRect(), pad = 6, gap = 3, k = spot(id);
    var cw = (rect.width - pad * 2 - gap * (G.cols - 1)) / G.cols, ch = (rect.height - pad * 2 - gap * (G.rows - 1)) / G.rows;
    var c = Math.floor((x - rect.left - pad) / (cw + gap)) - Math.floor((k - 1) / 2), r = Math.floor((y - rect.top - pad) / (ch + gap)) - Math.floor((k - 1) / 2);
    c = Math.max(0, Math.min(G.cols - k, c)); r = Math.max(0, Math.min(G.rows - k, r));
    return { b: b, r: r, c: c, k: k, grid: grid, cw: cw, ch: ch };
  }
  // Can the dragged plant go there? Free spot = move. Same-size plant sitting exactly there = swap.
  function moveCheck(from, to) {
    if (to.r + to.k > grids()[to.b].rows) return null;
    var G = grids()[to.b], me = null, other = null;
    (state.manual[to.b] || []).forEach(function (pl, i) {
      var k = spot(pl.id);
      if (to.b === from.b && pl.r === from.r && pl.c === from.c && pl.id === from.id) { me = i; return; }
      occupy(G, pl.r, pl.c, k, "x" + i);
    });
    if (blockFree(G, to.r, to.c, to.k)) return { kind: "move" };
    var hit = G.g[to.r * G.cols + to.c];
    if (hit) { var j = +hit.slice(1), pl = state.manual[to.b][j]; if (spot(pl.id) === to.k && pl.r === to.r && pl.c === to.c) other = j; }
    return other != null ? { kind: "swap", j: other } : null;
  }
  var drag = null;
  out.addEventListener("pointerdown", function (e) {
    var t = e.target.closest("[data-drag]"); if (!t || preview || e.button > 0) return;
    drag = { t: t, id: t.dataset.drag, b: +t.dataset.b, r: +t.dataset.r, c: +t.dataset.c, x0: e.clientX, y0: e.clientY, on: false };
    t.setPointerCapture(e.pointerId);
  });
  out.addEventListener("pointermove", function (e) {
    if (!drag) return;
    if (!drag.on) {
      if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) < 6) return;
      drag.on = true;
      var r = drag.t.getBoundingClientRect();
      drag.ghost = drag.t.cloneNode(true); drag.ghost.className += " sq-ghost"; drag.ghost.removeAttribute("style");
      drag.ghost.style.width = r.width + "px"; drag.ghost.style.height = r.height + "px"; drag.dx = e.clientX - r.left; drag.dy = e.clientY - r.top;
      document.body.appendChild(drag.ghost); drag.t.classList.add("is-lifted");
      var tr = document.getElementById("sq-trash"); if (tr) tr.hidden = false;
    }
    e.preventDefault();
    drag.ghost.style.transform = "translate(" + (e.clientX - drag.dx) + "px," + (e.clientY - drag.dy) + "px) scale(1.06)";
    var tg = dropTarget(e.clientX, e.clientY, drag.id), mark = document.getElementById("sq-mark");
    var trash = document.getElementById("sq-trash"); if (trash) trash.classList.toggle("is-hot", !!(tg && tg.trash));
    if (!tg || tg.trash) { if (mark) mark.remove(); drag.to = tg; return; }
    var ok = moveCheck(drag, { b: tg.b, r: tg.r, c: tg.c, k: tg.k, id: drag.id });
    if (!mark || mark.parentNode !== tg.grid) { if (mark) mark.remove(); mark = document.createElement("div"); mark.id = "sq-mark"; tg.grid.appendChild(mark); }
    mark.className = ok ? "is-ok" : "is-no";
    mark.style.gridArea = (tg.r + 1) + " / " + (tg.c + 1) + " / span " + tg.k + " / span " + tg.k;
    drag.to = tg; drag.ok = ok;
  });
  function endDrag() {
    if (!drag) return;
    var d = drag; drag = null;
    if (!d.on) return;
    if (d.ghost) d.ghost.remove(); d.t.classList.remove("is-lifted");
    var tr = document.getElementById("sq-trash"); if (tr) { tr.hidden = true; tr.classList.remove("is-hot"); }
    var mark = document.getElementById("sq-mark"); if (mark) mark.remove();
    var man = state.manual[d.b] || [], idx = -1;
    man.forEach(function (pl, i) { if (pl.id === d.id && pl.r === d.r && pl.c === d.c) idx = i; });
    if (d.to && d.to.trash) {
      var total = 0; Object.keys(state.manual).forEach(function (k) { state.manual[k].forEach(function (pl) { if (pl.id === d.id) total++; }); });
      if (total <= 1) { takeOut(d.id); return; }
      man.splice(idx, 1); state.sq[d.id] = total - 1; save(); refreshBeds(); flash("One " + lc(cropOf(d.id).name) + " spot taken out"); return;
    }
    if (!d.to || !d.ok || idx < 0) { refreshBeds(); return; }
    var to = d.to, moving = man[idx];
    if (d.ok.kind === "swap") { var o = state.manual[to.b][d.ok.j]; o.r = d.r; o.c = d.c; if (to.b !== d.b) { state.manual[to.b].splice(d.ok.j, 1); man.push(o); } }
    man.splice(man.indexOf(moving), 1);
    (state.manual[to.b] = state.manual[to.b] || []).push({ id: d.id, r: to.r, c: to.c });
    save(); refreshBeds();
  }
  out.addEventListener("pointerup", endDrag);
  out.addEventListener("pointercancel", function () { if (drag) { drag.to = null; endDrag(); } });

  function flash(text) {
    var s = out.querySelector(".gp-saved"); if (!s) return;
    s.textContent = text; s.classList.add("is-on");
    setTimeout(function () { s.textContent = "Saved on this device"; s.classList.remove("is-on"); }, 2500);
  }

  pick.addEventListener("change", function (e) {
    var b = e.target; if (b.type !== "checkbox") return;
    state.crops = state.crops.filter(function (id) { return id !== b.value; });
    if (b.checked) state.crops.push(b.value);
    save(); render();
    if (b.checked) noteFor(b.value); else if (pickNote) pickNote.hidden = true;
  });
  if (starters) {
    starters.innerHTML = '<p>Not sure where to start? Pick a ready-made plan, then change it however you like.</p><div class="gp-starter-list">' +
      STARTERS.map(function (st) { return '<button type="button" class="gp-starter" data-starter="' + st.id + '">' + R.icon(st.crops[0], base, 26) + '<span>' + esc(st.name) + '<small>' + st.crops.length + ' plants</small></span></button>'; }).join("") + '</div>';
    starters.addEventListener("click", function (e) {
      var b = e.target.closest("[data-starter]"); if (!b) return;
      var st = STARTERS.filter(function (x) { return x.id === b.dataset.starter; })[0];
      if (state.crops.length && !confirm("Swap your " + state.crops.length + " plants for the " + st.name + " plan? Your harvest log and notes stay.")) return;
      state.crops = st.crops.slice(); state.beds = st.beds.map(function (x) { return { w: x.w, l: x.l }; }); state.sq = {}; state.manual = {}; state.bedOf = {}; state.done = {};
      save(); render();
      if (pickNote) pickNote.hidden = true;
      if (state.place) { pick.open = false; out.scrollIntoView({ behavior: "smooth", block: "start" }); }
      else { msg.textContent = "Now choose your town to see your plan."; form.querySelector("input").focus(); }
    });
  }
  out.addEventListener("change", function (e) {
    var t = e.target;
    if (t.dataset.key) {
      if (t.checked) state.done[t.dataset.key] = 1; else delete state.done[t.dataset.key];
      // The same job can sit in "This week" and the full list: keep both boxes in step.
      Array.prototype.forEach.call(out.querySelectorAll('[data-key="' + t.dataset.key + '"]'), function (b) { b.checked = t.checked; b.closest(".gp-task").classList.toggle("is-done", t.checked); });
      save();
    } else if (t.dataset.repeat) {
      if (+t.value) state.repeat[t.dataset.repeat] = +t.value; else delete state.repeat[t.dataset.repeat];
      save(); render();
      var s = out.querySelector('[data-repeat="' + t.dataset.repeat + '"]'); if (s) s.focus();
      flash("Sowing dates added to your to-do list");
    } else if (t.dataset.bed && !(parseFloat(t.value) > 0)) {
      t.value = state.beds[+t.dataset.bed][t.dataset.dim]; // an emptied size box goes back to the saved size
    }
  });
  out.addEventListener("input", function (e) {
    var t = e.target;
    if (t.dataset.crop && t.type === "text") state.cropNotes[t.dataset.crop] = t.value;
    else if (t.id === "gp-notes") state.notes = t.value;
    else if (t.dataset.bed) { var v = parseFloat(t.value); if (v > 0) { state.beds[+t.dataset.bed][t.dataset.dim] = Math.min(v, 100); refreshBeds(); } }
    else return;
    save();
  });
  out.addEventListener("submit", function (e) {
    if (e.target.id !== "gp-logform") return;
    e.preventDefault();
    var crop = document.getElementById("gp-log-crop").value, date = document.getElementById("gp-log-date").value || iso(now);
    var note = document.getElementById("gp-log-note").value.trim();
    if (!crop) return;
    state.harvests.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), crop: crop, date: date, note: note });
    save(); render();
    var c = document.getElementById("gp-log-crop"); if (c) { c.value = crop; c.focus(); }
    flash("Harvest logged");
  });
  share.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]"); if (!b) return;
    if (b.dataset.act === "adopt") {
      if (mine.crops.length && !confirm("Replace your plan (" + mine.crops.length + " plants) with this one? Your harvest log stays.")) return;
      mine.place = state.place || mine.place; mine.crops = state.crops; mine.done = {}; mine.repeat = {}; mine.sq = {}; mine.manual = {}; mine.bedOf = {};
    }
    state = mine; preview = false; clearQuery(); save(); render();
    pick.open = !state.crops.length;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  out.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]"); if (!b) return;
    var place = P.findPlace(D, state.place), act = b.dataset.act;
    if (act === "print") window.print();
    else if (act === "ics") { ics(tasks(P.plan(D, place)), place); flash("Calendar file downloaded"); }
    else if (act === "frostics") { frostIcs(place); flash("Frost alerts downloaded"); }
    else if (act === "link") {
      var url = location.origin + location.pathname + "?place=" + place.slug + "&plants=" + state.crops.join(",");
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { flash("Link copied"); }, function () { prompt("Copy this link:", url); });
      else prompt("Copy this link:", url);
    }
    else if (act === "addbed") { state.beds.push({ w: 4, l: 8 }); save(); render(); var ins = out.querySelectorAll("[data-bed]"); if (ins.length) ins[ins.length - 2].focus(); }
    else if (act === "rmbed") {
      // Plants in the removed bed get placed again; plants in later beds keep their bed as its number shifts down.
      var gone = +b.dataset.i; state.beds.splice(gone, 1);
      Object.keys(state.bedOf).forEach(function (id) { var j = state.bedOf[id]; if (j === gone) delete state.bedOf[id]; else if (j > gone) state.bedOf[id] = j - 1; });
      if (state.manual) { var nm = {}; Object.keys(state.manual).forEach(function (k) { k = +k; if (k < gone) nm[k] = state.manual[k]; else if (k > gone) nm[k - 1] = state.manual[k]; }); state.manual = nm; }
      save(); render();
    }
    else if (act === "sq") {
      // + puts one more in this bed's first free spot; − takes this bed's last one out.
      var c2 = cropOf(b.dataset.id), bi = +b.dataset.b, list2 = chosenCrops().filter(function (c) { return !inGround(c); });
      var tot = units(c2, sqAuto(list2)), man = state.manual[bi] = state.manual[bi] || [];
      if (+b.dataset.d > 0) {
        var G2 = grids()[bi]; man.forEach(function (pl) { if (blockFree(G2, pl.r, pl.c, spot(pl.id))) occupy(G2, pl.r, pl.c, spot(pl.id), pl.id); });
        var f = firstFree(G2, spot(c2.id));
        if (!f) { flash("No room left in Bed " + (bi + 1)); return; }
        man.push({ id: c2.id, r: f.r, c: f.c }); state.sq[c2.id] = tot + 1;
      } else {
        if (tot <= 1) return;
        for (var mi = man.length - 1; mi >= 0; mi--) if (man[mi].id === c2.id) { man.splice(mi, 1); break; }
        state.sq[c2.id] = tot - 1;
      }
      save(); refreshBeds();
      var ag = out.querySelector('[data-act="sq"][data-id="' + c2.id + '"][data-b="' + bi + '"][data-d="' + b.dataset.d + '"]'); if (ag && !ag.disabled) ag.focus();
    }
    else if (act === "sqrm") { takeOut(b.dataset.crop); }
    else if (act === "optimize") {
      var ow = document.getElementById("sq-optwrap"); ow.innerHTML = optPanel(chosenCrops(), P.findPlace(D, state.place));
      ow.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    else if (act === "optclose") { document.getElementById("sq-optwrap").innerHTML = ""; }
    else if (act === "optuse") {
      var cd = optPanel.cands[+b.dataset.i], prev = JSON.stringify({ crops: state.crops, sq: state.sq, manual: state.manual, bedOf: state.bedOf });
      state.sq = JSON.parse(JSON.stringify(cd.sq)); state.manual = JSON.parse(JSON.stringify(cd.manual)); state.bedOf = {};
      save(); document.getElementById("sq-optwrap").innerHTML = ""; refreshBeds();
      showUndo(cd.title + " layout in place", prev);
      document.getElementById("gp-beds-sec").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    else if (act === "size") { state.beds[+b.dataset.i] = { w: +b.dataset.w, l: +b.dataset.l }; save(); refreshBeds(); }
    else if (act === "rate") {
      var r = state.rating[b.dataset.crop] = state.rating[b.dataset.crop] || {};
      if (r[YEAR] === b.dataset.v) delete r[YEAR]; else r[YEAR] = b.dataset.v;
      save();
      Array.prototype.forEach.call(b.parentNode.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(r[YEAR] === x.dataset.v)); });
    }
    else if (act === "loghere") {
      var s = document.getElementById("gp-log-crop"); if (!s) return;
      openMore();
      s.value = b.dataset.crop;
      document.getElementById("gp-log-sec").scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("gp-log-note").focus({ preventScroll: true });
    }
    else if (act === "rmcrop" || act === "addcrop") {
      var id = b.dataset.crop, c = cropOf(id);
      state.crops = state.crops.filter(function (x) { return x !== id; });
      if (act === "addcrop") state.crops.push(id);
      save(); render();
      var sec = document.getElementById("gp-season-sec"); if (sec) sec.scrollIntoView({ block: "nearest" });
      flash(c.name + (act === "addcrop" ? " added to your plan" : " removed from your plan"));
    }
    else if (act === "reset") {
      if (!confirm("Reset your garden plan? This clears your town, plants, ticks, beds, notes and harvest log on this device. It can't be undone.")) return;
      state = mine = fresh({});
      try { localStorage.removeItem("rainline-place"); } catch (err) { /* ignore */ }
      if (window.RainlineHeadTown) window.RainlineHeadTown();
      changing = false; msg.textContent = "";
      save(); render();
      pick.open = true;
      msg.textContent = "Your plan was reset. Choose a town and plants to start a new one.";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else if (act === "rmlog") { state.harvests = state.harvests.filter(function (h) { return h.id !== b.dataset.id; }); save(); render(); flash("Harvest removed"); }
  });
  document.getElementById("gp-clear").addEventListener("click", function () {
    if (!confirm("Clear your plants, ticks, notes and bed sizes? Your harvest log stays.")) return;
    state = mine = fresh({ place: state.place, harvests: state.harvests, rating: state.rating });
    save(); render();
  });

  function openMore() { var m = document.getElementById("gp-more"); if (m && !m.open) m.open = true; }
  // Folds remember their state across re-renders. toggle doesn't bubble, so listen in the capture phase.
  out.addEventListener("toggle", function (e) {
    var d = e.target;
    if (d.id === "gp-more") { if (!!state.moreOpen !== d.open) { state.moreOpen = d.open; save(); } }
    else if (d.dataset && d.dataset.mine) { if (d.open) openNotes[d.dataset.mine] = 1; else delete openNotes[d.dataset.mine]; }
  }, true);
  // The section buttons open "More tools" when they point into it.
  out.addEventListener("click", function (e) {
    var a = e.target.closest(".gp-jump a"); if (!a) return;
    var t = document.getElementById(a.getAttribute("href").slice(1));
    if (t && t.closest("#gp-more")) openMore();
  });
  // Print everything, folded or not, then put the folds back.
  var printOpened = [];
  window.addEventListener("beforeprint", function () {
    printOpened = printOpened.concat(Array.prototype.filter.call(out.querySelectorAll("details:not([open])"), function (d) { d.open = true; return true; }));
  });
  window.addEventListener("afterprint", function () { printOpened.forEach(function (d) { d.open = false; }); printOpened = []; });

  // Plant search in the picker: hides plants and whole groups that don't match.
  var find = document.getElementById("gp-find"), findNone = document.getElementById("gp-find-none");
  function plain(t) { return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").trim(); }
  // Groups start folded; a group with plants in your plan shows how many are picked. While searching, groups with
  // a match open and the rest hide; clearing the search folds them back.
  var groups = pick.querySelectorAll(".gp-group");
  function groupCounts() {
    if (!groups) return;
    Array.prototype.forEach.call(groups, function (g) {
      var n = g.querySelectorAll("input:checked").length, el = g.querySelector(".gp-group-n");
      var total = g.querySelectorAll(".gp-opt").length;
      el.textContent = total + " plants" + (n ? " · " + n + " picked" : "");
    });
  }
  pick.addEventListener("change", groupCounts);
  if (find) find.addEventListener("input", function () {
    var q = plain(find.value), any = false;
    Array.prototype.forEach.call(groups, function (g) {
      var shown = 0;
      Array.prototype.forEach.call(g.querySelectorAll(".gp-opt"), function (lab) {
        var hit = !q || plain(lab.querySelector("span").textContent).indexOf(q) >= 0 || plain(lab.querySelector("input").value).indexOf(q) >= 0;
        lab.hidden = !hit; if (hit) shown++;
      });
      g.hidden = !shown; g.open = !!q && !!shown; if (shown) any = true;
    });
    if (findNone) findNone.hidden = any;
  });
  // The section buttons stick under the site header, so they need its height.
  var head = document.querySelector(".site-head");
  function headH() { if (head) document.documentElement.style.setProperty("--head-h", head.offsetHeight + "px"); }
  headH(); window.addEventListener("resize", headH);

  if (state.place && state.crops.length) pick.open = false;
  render();
  groupCounts();
})();
