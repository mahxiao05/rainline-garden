/* Fall planting page: a timeline of fall planting windows for one town, grouped by the month each window opens.
 * The page is built with Portland's dates (no status, so it never goes stale). In the browser this swaps in the
 * visitor's town (saved, or picked with the shared town box) and tags each plant Open now, Coming up or Missed,
 * with a "Still time" box on top. Same planting windows as the rest of the site (plan.js). Also used by build.js. */
(function (root) {
  var MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // crops: [[id, label]] where label is "Plant", "Sow to overwinter" or "Sow or plant for fall".
  // today: day of year, or null for the static build (no status).
  function render(D, P, R, place, crops, base, today) {
    var plan = P.plan(D, place), rows = [], none = [];
    crops.forEach(function (x) {
      var r = plan.crops.filter(function (y) { return y.crop.id === x[0]; })[0];
      var w = r && r.windows.filter(function (y) { return y.kind === "fall"; })[0];
      if (w) rows.push({ c: r.crop, w: w, pre: x[1] }); else if (r) none.push(r.crop);
    });
    rows.sort(function (a, b) { return a.w.start - b.w.start || a.w.end - b.w.end; });
    if (today != null) {
      rows.forEach(function (x) { x.s = today < x.w.start ? "soon" : today <= x.w.end ? "open" : "past"; });
      // After the last window closes (December), the whole list is next year's.
      if (!rows.some(function (x) { return x.s !== "past"; })) rows.forEach(function (x) { x.s = "soon"; });
    }
    var tag = { open: "Open now", soon: "Coming up", past: "Missed this year" };
    var link = function (x) { return base + "when-to-plant/" + x.c.id + "/?town=" + place.slug + "#your-town"; };
    var row = function (x) {
      return '<li class="fr' + (x.s ? " fr-" + x.s : "") + '"><a href="' + link(x) + '">' + R.icon(x.c.id, base, 36) +
        '<span class="fr-t"><span class="fr-n">' + esc(x.c.name) + '</span><span class="fr-d">' + esc(x.pre) + " " + P.fmtRange(x.w.start, x.w.end) + '</span></span>' +
        (x.s ? '<span class="fr-s">' + tag[x.s] + '</span>' : "") + '</a></li>';
    };
    var months = [];
    rows.forEach(function (x) { var m = P.fromDoy(x.w.start).m, last = months[months.length - 1]; if (last && last.m === m) last.rows.push(x); else months.push({ m: m, rows: [x] }); });
    // Months still to come (or open now) lead; months that have fully closed fold away at the end.
    if (today != null) { var allPast = function (g) { return g.rows.every(function (x) { return x.s === "past"; }); };
      months = months.filter(function (g) { return !allPast(g); }).concat(months.filter(allPast)); }
    var list = months.map(function (g) {
      var head = MONTHS_LONG[g.m], n = g.rows.length + (g.rows.length === 1 ? " plant" : " plants"), body = '<ul class="fall-rows">' + g.rows.map(row).join("") + '</ul>';
      // A month whose windows have all closed folds away, so the page leads with what you can still do.
      if (today != null && g.rows.every(function (x) { return x.s === "past"; }))
        return '<details class="fall-m fall-m-past"><summary><span class="fall-mh">Started in ' + head + '</span><span class="fall-mn">' + n + ' · closed for this year</span></summary>' + body + '</details>';
      return '<section class="fall-m"><h2 class="fall-mh">Starts in ' + head + ' <span class="fall-mn">' + n + '</span></h2>' + body + '</section>';
    }).join("");
    if (none.length) list += '<p class="fall-none">No fall window in ' + esc(place.city) + ' for ' + none.map(function (c) { return esc(c.name.toLowerCase()); }).join(", ") + ': the season is too short.</p>';
    var now = "";
    if (today != null) {
      var open = rows.filter(function (x) { return x.s === "open"; }), soon = rows.filter(function (x) { return x.s === "soon"; });
      var names = open.map(function (x) { return esc(x.c.name.toLowerCase()); }), lastEnd = Math.max.apply(null, open.map(function (x) { return x.w.end; }));
      var listOf = function (a) { return a.length > 1 ? a.slice(0, -1).join(", ") + " and " + a[a.length - 1] : a[0]; };
      now = '<p class="fall-now-h">' + (open.length ? "Still time in " + esc(place.city) : "Nothing to plant for fall right now in " + esc(place.city)) + '</p>' +
        (open.length ? '<p class="fall-now-l">' + listOf(names).replace(/^./, function (c) { return c.toUpperCase(); }) + ' still go in, until ' + P.fmt(lastEnd) + ' at the latest.</p>' : "") +
        (soon.length ? '<p class="fall-next">Next up: <strong>' + esc(soon[0].c.name) + '</strong> from ' + P.fmt(soon[0].w.start) + (soon.length > 1 ? ', then ' + (soon.length - 1) + ' more' : '') + '.</p>' : "");
    }
    return { now: now, list: list };
  }

  if (typeof module !== "undefined" && module.exports) { module.exports = { render: render }; return; }

  var D = root.RainlineData, P = root.RainlinePlan, R = root.RainlineRender;
  var boxEl = document.getElementById("fall-box"), listEl = document.getElementById("fall-list"), nowEl = document.getElementById("fall-now");
  if (!boxEl || !listEl || !D || !P || !R || !root.RainlineTownBox) return;
  var crops = JSON.parse(listEl.getAttribute("data-crops")), base = listEl.getAttribute("data-base") || "../";
  var box = RainlineTownBox(boxEl, { onPick: show });
  function show(place) {
    var d = new Date(), today = P.CUM[d.getMonth()] + d.getDate();
    var out = render(D, P, R, place, crops, base, today);
    listEl.innerHTML = out.list;
    if (nowEl) { nowEl.innerHTML = out.now; nowEl.hidden = !out.now; }
    box.collapse(place, "Dates below are for <strong>" + place.city + ", " + place.state + "</strong>.");
  }
  var slug = ""; try { slug = localStorage.getItem("rainline-place") || ""; } catch (e) { /* private mode */ }
  show((slug && P.findPlace(D, slug)) || P.findPlace(D, "portland-or"));
})(this);
