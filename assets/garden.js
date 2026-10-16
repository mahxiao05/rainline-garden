/* Rainline Garden "My garden plan" page: pick a town and plants, get a dated to-do list, a "this week" card,
 * a bed planner, a plant cheat sheet, a harvest log and notes. Saved in this browser (localStorage); printable;
 * exports .ics with reminders. A shared link opens as a read-only preview until you save it as your own plan.
 */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan, R = window.RainlineRender, H = window.RainlineHelperData;
  var KEY = "rainline-garden-plan";
  var base = document.documentElement.getAttribute("data-base") || "";
  var form = document.getElementById("gp-form");
  if (!form) return;
  var zip = document.getElementById("gp-zip"), sel = document.getElementById("gp-place"), msg = document.getElementById("gp-msg");
  var out = document.getElementById("gp-out"), pick = document.getElementById("gp-pick"), share = document.getElementById("gp-share");
  var alertTpl = document.getElementById("gp-alert-tpl");

  var MONTHS = P.MONTHS_LONG, DAY = 864e5;
  var HOW = { "Plant seeds in the ground": "from seed", "Plant seeds or young plants": "from seed or as starts", "Plant small onion bulbs (sets)": "as sets",
    "Plant young plants (starts)": "as starts", "Plant seed potatoes": "using seed potatoes", "Plant young plants": "as young plants" };
  // Quick crops that do best sown a little at a time.
  var REPEAT = ["radishes", "lettuce", "spinach", "beans", "carrots", "beets", "arugula", "cilantro", "bok-choy", "turnips", "kohlrabi", "dill"];
  // Working spacing in inches for the bed planner (the middle of the range on each plant's guide).
  var SPACE = { peas: 3, radishes: 2, spinach: 4, lettuce: 9, onions: 4, carrots: 3, beets: 4, kale: 18, broccoli: 18, cabbage: 18, chard: 10,
    potatoes: 12, beans: 4, corn: 12, cucumbers: 12, "summer-squash": 36, "winter-squash": 48, tomatoes: 24, peppers: 18, basil: 12, dahlias: 21,
    cilantro: 4, parsley: 8, dill: 12, strawberries: 15, blueberries: 54, raspberries: 30, garlic: 6, cauliflower: 21, "brussels-sprouts": 24,
    leeks: 6, arugula: 4, "bok-choy": 8, turnips: 4, kohlrabi: 6, eggplant: 21, melons: 30, "pole-beans": 5, "fava-beans": 6, shallots: 7,
    asparagus: 15, rhubarb: 42, chives: 10, mint: 18, rosemary: 30, thyme: 12, oregano: 15, sunflowers: 15, "sweet-peas": 5, tulips: 5, daffodils: 5 };
  var RATINGS = [["good", "Did well"], ["ok", "OK"], ["poor", "Struggled"]];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lc(n) { return n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels"); }
  function cropOf(id) { for (var i = 0; i < D.crops.length; i++) if (D.crops[i].id === id) return D.crops[i]; return null; }
  function fresh(s) {
    s = s || {};
    s.crops = (s.crops || []).filter(cropOf); s.done = s.done || {}; s.cropNotes = s.cropNotes || {}; s.notes = s.notes || "";
    s.repeat = s.repeat || {}; s.beds = s.beds && s.beds.length ? s.beds : [{ w: 4, l: 8 }]; s.space = s.space || {};
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
  // "Add to my garden plan" links from crop pages: ?add=tomatoes (with &place= from a city page).
  var qAdd = qs.get("add");
  if (qAdd && !qs.get("plants") && cropOf(qAdd)) {
    if (mine.crops.indexOf(qAdd) < 0) mine.crops.push(qAdd);
    clearQuery();
    if (msg) msg.textContent = "Added " + lc(cropOf(qAdd).name) + " to your plan." + (mine.place ? "" : " Pick your town to see the dates.");
  }
  if (!state.place) { try { state.place = localStorage.getItem("rainline-place") || ""; } catch (e) { /* ignore */ } }
  if (!preview) save();

  function clearQuery() { if (history.replaceState) history.replaceState(null, "", location.pathname); }

  // Town picker.
  ["OR", "WA"].forEach(function (s) {
    var g = document.createElement("optgroup");
    g.label = s === "OR" ? "Oregon" : "Washington";
    D.places.filter(function (x) { return x.state === s; })
      .sort(function (a, b) { return a.city.localeCompare(b.city); })
      .forEach(function (x) { var o = document.createElement("option"); o.value = x.slug; o.textContent = x.city + ", " + x.state; g.appendChild(o); });
    sel.appendChild(g);
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
        else add(c, "fall", w.start, w.end, "Plant " + name + " again for a fall harvest");
        // Repeat sowings: a short row every few weeks while the window is open.
        if (every) for (var k = 1, n = 2; w.start + k * every <= w.end && k < 7; k++, n++)
          add(c, w.kind + "-sow" + n, w.start + k * every, null, "Sow a " + ordinal(n) + " row of " + name + (w.kind === "fall" ? " for fall" : ""));
      });
      if (spring && c.days) add(c, "harvest", spring.start + c.days, null, "First harvest of " + name + " is about due");
    });
    var f = p.frost;
    if (warm.length) {
      add(null, "lastfrost", f.spring50, f.spring10, "Typical last frost. Keep covers handy for tender plants until " + P.fmtLong(f.spring10));
      add(null, "firstfrost", f.fall10, f.fall50, "First fall frost is getting close. Harvest " + (warm.length > 3 ? "frost-tender crops" : warm.join(" and ").replace(/ and (?=.* and )/g, ", ")) + " before " + P.fmtLong(f.fall50));
    }
    list.sort(function (a, b) { return a.date - b.date || a.text.localeCompare(b.text); });
    return list;
  }

  function isSoon(t, days) { return t.date - now <= days * DAY && (t.end || t.date) >= now; }
  function dateLabel(t) { return short(t.date) + (t.end && t.end - t.date > DAY ? "–" + short(t.end) : ""); }
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
    else h += '<p class="gp-week-empty">Nothing due this week.' + (next ? ' Next up, ' + short(next.date) + ': ' + esc(next.text.charAt(0).toLowerCase() + next.text.slice(1)) + '.' : '') + '</p>';
    return h + '</section>';
  }

  /* Bed planner */
  function bedArea() { return state.beds.reduce(function (s, b) { return s + (+b.w || 0) * (+b.l || 0); }, 0); }
  // A sensible starting amount of room: a 2 × 2 ft patch of small crops, or a few plants of big ones.
  function typical(id) { var s = SPACE[id] || 12, per = s * s / 144; return Math.max(4, Math.ceil(per * (s >= 24 ? 2 : 4))); }
  // Suggested room for each plant you haven't sized yourself: the leftover space shared evenly, but never more than typical.
  function autoSpace(chosen) {
    var set = chosen.filter(function (c) { return !(state.space[c.id] > 0); });
    var used = chosen.reduce(function (s, c) { return s + (state.space[c.id] > 0 ? +state.space[c.id] : 0); }, 0);
    var share = set.length ? Math.floor(Math.max(0, bedArea() - used) / set.length * 2) / 2 : 0, out = {};
    set.forEach(function (c) { out[c.id] = Math.min(share, typical(c.id)); });
    return out;
  }
  function spaceFor(c, auto) { return state.space[c.id] > 0 ? +state.space[c.id] : auto[c.id] || 0; }
  function fitHtml(id, sq) {
    var f = fit(id, sq);
    return f.n ? "about <strong>" + f.n + "</strong> " + (f.n === 1 ? "plant" : "plants") : '<span class="gp-warn">needs ' + (Math.round(f.per * 10) / 10) + ' sq ft for one</span>';
  }
  function fit(id, sqft) {
    var s = SPACE[id] || 12, n = Math.floor(sqft * 144 / (s * s) + 1e-9);
    return { n: n, per: s * s / 144 };
  }
  function bedRows(chosen) {
    var auto = autoSpace(chosen);
    return chosen.map(function (c) {
      var mineSq = state.space[c.id] > 0 ? +state.space[c.id] : 0, g = H.crops[c.id] || {};
      return '<tr><th scope="row">' + R.icon(c.id, base, 24) + '<span>' + esc(c.name) + '</span></th>' +
        '<td class="gp-sp">' + (SPACE[c.id] >= 12 && SPACE[c.id] % 12 === 0 ? SPACE[c.id] / 12 + ' ft' : SPACE[c.id] + ' in') + (/trellis/.test(g.spacing || "") ? ' <span class="gp-tag">trellis</span>' : '') + '</td>' +
        '<td><label class="sr-only" for="gp-sq-' + c.id + '">Square feet for ' + esc(c.name) + '</label><input id="gp-sq-' + c.id + '" class="gp-num" type="number" inputmode="decimal" min="0" step="0.5" data-space="' + c.id + '" value="' + (mineSq || "") + '" placeholder="' + (auto[c.id] || 0) + '"' + (preview ? " disabled" : "") + '></td>' +
        '<td class="gp-fit" data-fit="' + c.id + '">' + fitHtml(c.id, spaceFor(c, auto)) + '</td></tr>';
    }).join("");
  }
  function bedSummary(chosen) {
    var area = bedArea(), auto = autoSpace(chosen);
    var used = chosen.reduce(function (s, c) { return s + spaceFor(c, auto); }, 0);
    var pct = area ? Math.min(100, used / area * 100) : 100, over = used > area + 1e-9, r1 = function (n) { return Math.round(n * 10) / 10; };
    return '<div class="gp-meter' + (over ? " is-over" : "") + '"><div class="gp-meter-bar"><i style="width:' + pct.toFixed(1) + '%"></i></div>' +
      '<p>' + (over ? "Over by <strong>" + r1(used - area) + " sq ft</strong>. Give some plants less room or add a bed."
        : "Using <strong>" + r1(used) + "</strong> of " + r1(area) + " sq ft" + (area - used >= 1 ? " · " + r1(area - used) + " sq ft free" : "")) + '</p></div>';
  }
  function beds(chosen) {
    var bedsHtml = state.beds.map(function (b, i) {
      return '<div class="gp-bed"><span class="gp-bed-n">Bed ' + (i + 1) + '</span>' +
        '<label><span class="sr-only">Bed ' + (i + 1) + ' width in feet</span><input class="gp-num" type="number" inputmode="decimal" min="1" max="100" step="0.5" data-bed="' + i + '" data-dim="w" value="' + esc(b.w) + '"' + (preview ? " disabled" : "") + '></label>' +
        '<span aria-hidden="true">×</span>' +
        '<label><span class="sr-only">Bed ' + (i + 1) + ' length in feet</span><input class="gp-num" type="number" inputmode="decimal" min="1" max="100" step="0.5" data-bed="' + i + '" data-dim="l" value="' + esc(b.l) + '"' + (preview ? " disabled" : "") + '></label>' +
        '<span class="gp-unit">ft</span>' +
        (state.beds.length > 1 && !preview ? '<button type="button" class="gp-x" data-act="rmbed" data-i="' + i + '" aria-label="Remove bed ' + (i + 1) + '">×</button>' : '') + '</div>';
    }).join("");
    return '<section class="gp-sec" id="gp-beds-sec" aria-labelledby="gp-beds-h"><h2 id="gp-beds-h">Bed planner</h2>' +
      '<p class="station">Enter your beds and how much room to give each plant. Spacing comes from each plant\'s guide. Grey numbers are suggestions; type your own to change them.</p>' +
      '<div class="gp-beds">' + bedsHtml + (preview ? '' : '<button type="button" class="btn btn-ghost btn-sm" data-act="addbed">+ Add a bed</button>') + '</div>' +
      '<div id="gp-meter">' + bedSummary(chosen) + '</div>' +
      '<div class="gp-table-wrap"><table class="gp-bedtable"><thead><tr><th scope="col">Plant</th><th scope="col">Spacing</th><th scope="col">Sq ft</th><th scope="col">Fits</th></tr></thead>' +
      '<tbody id="gp-bedrows">' + bedRows(chosen) + '</tbody></table></div></section>';
  }
  // Updates the bed numbers in place while someone types, so the box they're in keeps focus.
  function refreshBeds() {
    var chosen = chosenCrops(), auto = autoSpace(chosen);
    var m = document.getElementById("gp-meter"); if (m) m.innerHTML = bedSummary(chosen);
    chosen.forEach(function (c) {
      var inp = out.querySelector('[data-space="' + c.id + '"]'), cell = out.querySelector('[data-fit="' + c.id + '"]');
      if (!inp || !cell) return;
      inp.placeholder = auto[c.id] || 0;
      cell.innerHTML = fitHtml(c.id, spaceFor(c, auto));
    });
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
    if (REPEAT.indexOf(c.id) >= 0) {
      var ev = state.repeat[c.id] || 0;
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
    sel.value = place ? place.slug : "";
    form.hidden = preview; pick.hidden = preview;
    Array.prototype.forEach.call(pick.querySelectorAll("input[type=checkbox]"), function (b) { b.checked = state.crops.indexOf(b.value) >= 0; });
    var count = document.getElementById("gp-count");
    if (count) count.textContent = state.crops.length ? state.crops.length + " picked" : "";
    if (!place || !state.crops.length) {
      out.innerHTML = '<p class="empty gp-empty">' + (!place ? "Choose your town" : "Pick at least one plant") + ' to see your plan.</p>';
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
    var today = P.CUM[now.getMonth()] + Math.min(now.getDate(), now.getMonth() === 1 ? 28 : 31);
    var jump = [["gp-week", "This week"], ["gp-todo-h", "To-do list"], ["gp-beds-sec", "Beds"], ["gp-cards-h", "Plants"]]
      .concat(preview ? [] : [["gp-log-sec", "Harvests"], ["gp-alert-sec", "Frost alerts"], ["gp-notes-h", "Notes"]]);
    out.innerHTML =
      (preview ? '' : '<div class="gp-bar"><button type="button" class="btn" data-act="print">Print or save as PDF</button>' +
      '<button type="button" class="btn btn-ghost" data-act="ics">Add dates to my calendar</button>' +
      '<button type="button" class="btn btn-ghost" data-act="link">Copy link to this plan</button>' +
      '<span class="gp-saved" role="status">Saved on this device</span></div>') +
      '<header class="gp-title"><h2>Garden plan for ' + esc(place.city) + ', ' + place.state + '</h2>' +
      '<p>' + chosen.length + ' plants · ' + doneCount + ' of ' + list.length + ' jobs done · made ' + short(now) + ', ' + YEAR + ' at rainlinegarden.org</p></header>' +
      '<nav class="gp-jump" aria-label="Plan sections">' + jump.map(function (j) { return '<a href="#' + j[0] + '">' + j[1] + '</a>'; }).join("") + '</nav>' +
      thisWeek(list) +
      R.frostFacts(p, base) +
      '<h2 id="gp-todo-h">Your to-do list</h2><p class="station">Tick jobs off as you go. Jobs due in the next two weeks are highlighted. Dates are a guide: check the soil and the forecast too.</p>' +
      groups.map(function (g) { return '<h3 class="gp-month">' + g.label + '</h3><ul class="gp-tasks">' + g.items.map(taskLi).join("") + '</ul>'; }).join("") +
      '<h2>Season at a glance</h2><div class="reveal">' + R.chart(sub, today) + '</div>' +
      beds(chosen) +
      '<h2 id="gp-cards-h">Plant cheat sheet</h2><div class="gp-cards">' + chosen.map(cheat).join("") + '</div>' +
      (preview ? '' : harvestLog(chosen) + frostAlerts(place, p) +
      '<h2 id="gp-notes-h">Notes</h2><label class="sr-only" for="gp-notes">Garden notes</label><textarea id="gp-notes" class="gp-notes" rows="6" placeholder="What did well, what to change next year, where the sun hits...">' + esc(state.notes) + '</textarea>');
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
          (t.crop ? "Guide: https://rainlinegarden.org/when-to-plant/" + t.crop.id + "/" + place.slug + "/" : "Rainline Garden plan for " + place.city) };
    }), "Garden plan (" + place.city + ")");
  }
  function frostIcs(place) {
    var f = P.plan(D, place).frost, cal = "https://rainlinegarden.org/frost-dates/" + place.slug + "/";
    function ev(key, doy, summary, desc, alarms) { var d = realDate(doy); return { uid: "frost-" + key + "-" + d.getFullYear() + "-" + place.slug, date: d, summary: summary, desc: desc + " " + cal, alarms: alarms }; }
    var evs = [
      ev("spring", f.spring50, "Typical last frost in " + place.city, "Half of years still see a frost after today. Keep covers handy for tender plants until " + P.fmtLong(f.spring10) + ".", ["-P7DT0H", "PT8H"]),
      ev("spring-safe", f.spring10, "Frost risk is low now in " + place.city, "Only 1 year in 10 has a frost after today. Safe to plant tomatoes, squash and other tender crops.", ["PT8H"]),
      ev("fall-early", f.fall10, "Early frost possible in " + place.city, "1 year in 10 has its first fall frost by today. Watch the forecast and have covers ready.", ["-P7DT0H", "PT8H"]),
      ev("fall", f.fall50, "Typical first fall frost in " + place.city, "Pick tomatoes, squash, beans and basil before tonight if frost is forecast.", ["-P7DT0H", "PT8H"])
    ].sort(function (a, b) { return a.date - b.date; });
    download("frost-alerts-" + place.slug + ".ics", evs, "Frost alerts (" + place.city + ")");
  }

  function flash(text) {
    var s = out.querySelector(".gp-saved"); if (!s) return;
    s.textContent = text; s.classList.add("is-on");
    setTimeout(function () { s.textContent = "Saved on this device"; s.classList.remove("is-on"); }, 2500);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (zip.value.trim()) {
      var r = P.placeForZip(D, zip.value);
      if (r.error) { msg.textContent = r.error; return; }
      state.place = r.place.slug;
    }
    msg.textContent = "";
    save(); render();
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  sel.addEventListener("change", function () { zip.value = ""; msg.textContent = ""; state.place = sel.value; save(); render(); });
  pick.addEventListener("change", function (e) {
    var b = e.target; if (b.type !== "checkbox") return;
    state.crops = state.crops.filter(function (id) { return id !== b.value; });
    if (b.checked) state.crops.push(b.value);
    save(); render();
  });
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
    else if (t.dataset.space) { var n = parseFloat(t.value); if (n > 0) state.space[t.dataset.space] = n; else delete state.space[t.dataset.space]; refreshBeds(); }
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
      mine.place = state.place || mine.place; mine.crops = state.crops; mine.done = {}; mine.repeat = {}; mine.space = {};
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
    else if (act === "rmbed") { state.beds.splice(+b.dataset.i, 1); save(); render(); }
    else if (act === "rate") {
      var r = state.rating[b.dataset.crop] = state.rating[b.dataset.crop] || {};
      if (r[YEAR] === b.dataset.v) delete r[YEAR]; else r[YEAR] = b.dataset.v;
      save();
      Array.prototype.forEach.call(b.parentNode.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(r[YEAR] === x.dataset.v)); });
    }
    else if (act === "loghere") {
      var s = document.getElementById("gp-log-crop"); if (!s) return;
      s.value = b.dataset.crop;
      document.getElementById("gp-log-sec").scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("gp-log-note").focus({ preventScroll: true });
    }
    else if (act === "rmlog") { state.harvests = state.harvests.filter(function (h) { return h.id !== b.dataset.id; }); save(); render(); flash("Harvest removed"); }
  });
  document.getElementById("gp-clear").addEventListener("click", function () {
    if (!confirm("Clear your plants, ticks, notes and bed sizes? Your harvest log stays.")) return;
    state = mine = fresh({ place: state.place, harvests: state.harvests, rating: state.rating });
    save(); render();
  });

  if (state.place && state.crops.length) pick.open = false;
  render();
})();
