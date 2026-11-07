/* Month page "<Month> jobs": one checklist for one town.
 * - Frost watch: the town's NOAA frost dates, only in months they fall in.
 * - Plant and start indoors: built from the town's own planting windows (plan.js), with dates, so the jobs list
 *   can't disagree with the planting calendar. Hand-written planting jobs that name a listed plant are left out
 *   at build time; the rest (cover crops, bare-root trees) stay.
 * - Harvest, care, pests, fruit and flowers: the hand-written jobs for the town's region plus the ones for everyone.
 * Without a saved town it uses each region's example town, switched with the region buttons.
 * Ticks share storage with the Month by month checklist (same ids), so ticking a job on either page shows on both. */
(function () {
  var box = document.getElementById("mj");
  var D = window.RainlineData, P = window.RainlinePlan;
  if (!box || !D || !P) return;
  var base = document.documentElement.getAttribute("data-base") || "";
  var m = +box.dataset.m, year = new Date().getFullYear();
  var a = P.CUM[m - 1] + 1, b = m < 12 ? P.CUM[m] : 365, monthName = P.MONTHS_LONG[m - 1];
  var jobs = JSON.parse(box.dataset.jobs), tags = JSON.parse(box.dataset.tags);
  var samples = box.dataset.samples.split(";").map(function (x) { x = x.split("|"); return { z: x[0], slug: x[1] }; });
  var KEY = "rainline-chores-" + year;
  function get(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  var done = {}; try { done = JSON.parse(get(KEY, "{}")) || {}; } catch (e) { done = {}; }
  var saved = P.findPlace(D, get("rainline-place", "")) || null;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // A window touches this month (windows can run past Dec 31).
  function hit(w) { return w && ((w.start <= b && w.end >= a) || (w.start - 365 <= b && w.end - 365 >= a)); }
  function when(w) {
    var s = w.start > 365 ? w.start - 365 : w.start, e = w.end > 365 ? w.end - 365 : w.end;
    if (s <= a && e >= b) return "all month";
    if (s <= a) return "until " + P.fmt(e);
    if (e >= b) return "from " + P.fmt(s);
    return P.fmtRange(s, e);
  }

  function frostWatch(p) {
    var f = p.frost, out = [], city = esc(p.place.city);
    if (f.spring50 <= b && f.spring10 >= a)
      out.push("Last spring frost in " + city + " is usually around <strong>" + P.fmt(f.spring50) + "</strong>; 9 years out of 10 it's over by <strong>" + P.fmt(f.spring10) + "</strong>. Keep tender plants covered or indoors until then.");
    else if (m >= 2 && m <= 6 && f.spring50 > b && f.spring50 - b <= 75)
      out.push("Frost is still likely in " + city + " this month: the last spring frost is usually around <strong>" + P.fmt(f.spring50) + "</strong>, and 9 years out of 10 it's over by <strong>" + P.fmt(f.spring10) + "</strong>.");
    var f50 = f.fall50 > 365 ? f.fall50 - 365 : f.fall50;
    if (f.fall10 <= b && f50 >= a)
      out.push("First fall frost in " + city + " comes as early as <strong>" + P.fmt(f.fall10) + "</strong> in 1 year out of 10, and usually by <strong>" + P.fmt(f50) + "</strong>. Pick or cover tender crops before then.");
    else if (m >= 9 && f50 < a && a - f50 <= 45)
      out.push("Frost season has started in " + city + ": the first fall frost usually comes by " + P.fmt(f50) + ".");
    return out;
  }

  function item(id, html, sub) {
    var on = !!done[id];
    return '<li' + (on ? ' class="is-done"' : '') + '><label><input type="checkbox" data-id="' + id + '"' + (on ? " checked" : "") + '><span>' + html + (sub ? ' <small>' + sub + '</small>' : '') + '</span></label></li>';
  }
  function group(title, k, rows, extra) {
    return rows.length ? '<div class="mj-g mj-' + k + '"><h3>' + title + '</h3><ul>' + rows.join("") + '</ul>' + (extra || "") + '</div>' : "";
  }

    function render(place, isSample) {
    var p = P.plan(D, place), tag = tags[place.zone] || "west", city = esc(place.city);
    var cal = base + "frost-dates/" + place.slug + "/";
    // Dated planting jobs, closing soonest first.
    var outs = [], ins = [];
    p.crops.forEach(function (r) {
      r.windows.forEach(function (w) { if (hit(w)) outs.push({ r: r, w: w }); });
      if (hit(r.indoor)) ins.push({ r: r, w: r.indoor });
    });
    function byEnd(x, y) { return x.w.end - y.w.end || x.w.start - y.w.start; }
    outs.sort(byEnd); ins.sort(byEnd);
    // Plants that share the same dates go on one line ("Until Nov 15: garlic, shallots, tulips"), so a month
    // with 40 plants is a handful of rows, not 40.
    var NAMES_MAX = 10;
    function rows(list, kind) {
      var groups = [], byKey = {};
      list.forEach(function (x) {
        var k = when(x.w);
        if (!byKey[k]) { byKey[k] = { when: k, end: x.w.end, xs: [] }; groups.push(byKey[k]); }
        if (!byKey[k].xs.some(function (y) { return y.r.crop.id === x.r.crop.id; })) byKey[k].xs.push(x);
      });
      return groups.map(function (g) {
        var names = g.xs.slice(0, NAMES_MAX).map(function (x) { return '<a href="' + base + 'when-to-plant/' + x.r.crop.id + '/">' + esc(x.r.crop.name) + '</a>'; });
        var more = g.xs.length > NAMES_MAX ? ' <a class="mj-more" href="' + cal + '">+' + (g.xs.length - NAMES_MAX) + ' more</a>' : "";
        var label = g.when.charAt(0).toUpperCase() + g.when.slice(1);
        return item("p" + m + "-" + kind + "-" + place.slug + "-" + g.when.replace(/\W+/g, ""), '<strong class="mj-when">' + label + '</strong> ' + names.join(", ") + more);
      });
    }
    var mine = jobs.filter(function (j) { return !j[3] || j[3] === tag; });
    function hand(k) { return mine.filter(function (j) { return j[0] === k; }).map(function (j) { return item(m + "-" + j[0] + "-" + j[1], esc(j[2])); }); }
    var o = [rows(outs, "out")], i = [rows(ins, "in")];
    var frost = frostWatch(p);

    var h = '<div class="mj-head"><label class="mj-town"><span>' + (isSample ? 'Example town' : 'Your town') + '</span><select aria-label="Town for these jobs"></select></label>' +
      '<span class="cm-prog mj-prog"></span></div>' +
      (isSample ? '<p class="mj-note">Showing ' + city + ' as an example. Pick your town for your own dates.</p>' : '');
    if (frost.length) h += '<div class="mj-frost"><h3>Frost watch</h3>' + frost.map(function (t) { return '<p>' + t + '</p>'; }).join("") + '</div>';
    h += '<div class="mj-cols">' +
      group("Plant outside", "plant", o[0].concat(hand("plant"))) +
      group("Start indoors", "indoor", i[0].concat(hand("indoor"))) +
      group("Harvest", "harvest", hand("harvest")) +
      group("Garden care", "care", hand("care")) +
      group("Pests and problems", "pests", hand("pests")) +
      group("Fruit, berries and flowers", "perennial", hand("perennial")) + '</div>';
    if (!outs.length && !ins.length) h = h.replace('<div class="mj-cols">', '<p class="mj-none">Nothing on our planting list goes in around ' + city + ' in ' + monthName + '. <a href="' + cal + '">See what\'s next</a>.</p><div class="mj-cols">');
    box.innerHTML = h;
    var sel = box.querySelector("select");
    P.fillPlaceSelect(sel, D);
    sel.value = place.slug;
    box.hidden = false;
    progress();
  }
  function progress() {
    var bs = box.querySelectorAll("input[data-id]"), n = 0;
    Array.prototype.forEach.call(bs, function (x) { if (x.checked) n++; });
    var el = box.querySelector(".mj-prog");
    if (el) { el.textContent = n + " of " + bs.length + " done"; el.classList.toggle("is-all", n === bs.length && n > 0); }
  }
  box.addEventListener("change", function (e) {
    var x = e.target; if (!x.dataset.id) return;
    if (x.checked) done[x.dataset.id] = 1; else delete done[x.dataset.id];
    x.closest("li").classList.toggle("is-done", x.checked);
    put(KEY, JSON.stringify(done));
    progress();
  });
  // Picking a town here saves it like every other town picker on the site.
  box.addEventListener("change", function (e) {
    if (e.target.tagName !== "SELECT") return;
    var pl = P.findPlace(D, e.target.value); if (!pl) return;
    saved = pl;
    put("rainline-place", pl.slug); put("rainline-place-name", pl.slug + "|" + pl.city + ", " + pl.state);
    if (window.RainlineHeadTown) window.RainlineHeadTown();
    render(pl, false);
  });
  var old = document.querySelector(".mb-jobs"); if (old) old.hidden = true;
  var oldF = document.querySelector(".mb-filter"); if (oldF) oldF.hidden = true;
  render(saved || P.findPlace(D, samples[1].slug), !saved);
})();
