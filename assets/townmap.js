/* Town calendars map: pick an area (or tap a dot) and the map zooms to that area's towns, names them and lists their dates.
 * Tapping a town that is already in view opens its calendar. Without this script the dots are still plain links. */
(function () {
  var root = document.querySelector(".town-map");
  if (!root) return;
  var svg = root.querySelector(".tm-svg"), labels = root.querySelector(".tm-labels"), panel = document.getElementById("tm-panel");
  var select = document.getElementById("tm-area"), chips = root.querySelectorAll(".tm-chips button");
  var NS = "http://www.w3.org/2000/svg", vb0 = svg.viewBox.baseVal, W = vb0.width, H = vb0.height, FULL = [0, 0, W, H], vb = FULL.slice();
  var areaNames = {};
  if (select) Array.prototype.forEach.call(select.options, function (o) { if (o.value) areaNames[o.value] = o.textContent; });
  var towns = Array.prototype.map.call(root.querySelectorAll(".tm-dots a"), function (a) {
    var c = a.querySelector("circle");
    return { a: a, c: c, slug: a.getAttribute("data-slug"), area: a.getAttribute("data-area"), name: a.getAttribute("data-name"),
      dates: a.getAttribute("data-dates"), last: +a.getAttribute("data-last"), first: +a.getAttribute("data-first"), days: +a.getAttribute("data-days"), href: a.getAttribute("href"), x: +c.getAttribute("cx"), y: +c.getAttribute("cy") };
  });
  var area = null, sel = null, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.querySelector(".tm-pick").hidden = false;
  root.classList.add("is-live");
  // The panel beside the map lists the picked area's towns, so the long lists below are only for readers without JavaScript.
  var lists = document.getElementById("town-lists");
  if (lists) lists.hidden = true;
  var fact = panel.querySelector(".tm-fact"), factHtml = fact ? fact.outerHTML : "";
  var CUM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], now = new Date(), today = CUM[now.getMonth()] + now.getDate();
  function pct(n) { return (Math.max(0, Math.min(365, n - 1)) / 365 * 100).toFixed(2) + "%"; }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(n, attrs, parent) { var e = document.createElementNS(NS, n); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function setVB(v) { vb = v; svg.setAttribute("viewBox", v.map(function (n) { return n.toFixed(1); }).join(" ")); }

  // A box around the area's towns with room for labels, kept to the map's shape and inside the map.
  function boxFor(list) {
    var xs = list.map(function (t) { return t.x; }), ys = list.map(function (t) { return t.y; });
    var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys);
    var pad = svg.getBoundingClientRect().width < 500 ? 1.5 : 1.9, w = Math.max(x1 - x0, 60) * pad, h = Math.max(y1 - y0, 60) * pad, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    if (w / h < W / H) w = h * W / H; else h = w * H / W;
    if (w > W) { w = W; h = H; }
    return [Math.min(Math.max(cx - w / 2, 0), W - w), Math.min(Math.max(cy - h / 2, 0), H - h), w, h];
  }
  function zoomTo(target, now) {
    var from = vb.slice(), t0 = null, dur = now || reduce ? 0 : 450;
    if (!dur) { setVB(target); draw(); return; }
    requestAnimationFrame(function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur); k = 1 - Math.pow(1 - k, 3);
      setVB(from.map(function (f, i) { return f + (target[i] - f) * k; })); draw();
      if (k < 1) requestAnimationFrame(step);
    });
  }

  // Dots keep the same size on screen at any zoom; labels go right of the dot, or the first nearby spot that is free.
  function draw() {
    // k = map units per screen pixel; sizes stay readable on phones, where the whole map is only ~350px wide.
    var k = vb[2] / (svg.getBoundingClientRect().width || W), z = vb[2] / W, fs = Math.max(12.5 * z, 13 * k), r = Math.max(5.5 * z, 4.5 * k);
    towns.forEach(function (t) {
      var on = t === sel;
      t.c.setAttribute("r", on ? r * 1.45 : r);
      t.c.setAttribute("stroke-width", (on ? 2.2 : 1.2) * Math.max(z, k));
      t.a.classList.toggle("is-dim", !!area && t.area !== area);
      t.a.classList.toggle("is-on", on);
    });
    while (labels.firstChild) labels.removeChild(labels.firstChild);
    if (!area) return;
    var mine = towns.filter(function (t) { return t.area === area; });
    // On phones labels use the first town's name only (the list below the map has the full names).
    var taken = mine.map(function (t) { return [t.x - r, t.y - r, 2 * r, 2 * r]; }), g = fs / 12.5, narrow = svg.getBoundingClientRect().width < 500;
    mine.slice().sort(function (a, b) { return a.y - b.y; }).forEach(function (t) {
      var link = el("a", { href: t.href }, labels), text = el("text", { "font-size": fs, "stroke-width": 3 * g }, link);
      text.textContent = narrow ? t.name.replace(/ \(.*\)/, "").split(/,| and /)[0] : t.name;
      // On wider screens a second, smaller line gives the town's frost dates.
      var sub = narrow ? null : el("text", { "class": "tm-d", "font-size": fs * 0.82, "stroke-width": 3 * g }, link);
      if (sub) sub.textContent = t.dates;
      var w = Math.max(text.getComputedTextLength() || text.textContent.length * fs * 0.58, sub ? sub.getComputedTextLength() || 0 : 0) + 4 * g, h = fs * (sub ? 2.15 : 1.15), spot = null, best = Infinity, nDots = mine.length;
      [[9, 4, "start"], [-9, 4, "end"], [9, 16, "start"], [9, -8, "start"], [-9, 16, "end"], [-9, -8, "end"], [0, 20, "middle"], [0, -12, "middle"], [0, 32, "middle"], [0, -24, "middle"]].forEach(function (c, i) {
        var x0 = c[2] === "start" ? t.x + c[0] * g : c[2] === "end" ? t.x + c[0] * g - w : t.x - w / 2, y0 = t.y + c[1] * g - fs * 0.92;
        // Covering a dot is worse than touching another label; running off the map is worst. Ties go to the earlier spot.
        var score = i * 0.01 + (x0 < vb[0] || x0 + w > vb[0] + vb[2] ? 100 : 0);
        taken.forEach(function (b, j) { if (x0 < b[0] + b[2] && x0 + w > b[0] && y0 < b[1] + b[3] && y0 + h > b[1]) score += j < nDots ? 10 : 5; });
        if (score < best) { best = score; spot = [c, x0, y0]; }
      });
      taken.push([spot[1], spot[2], w, h]);
      text.setAttribute("x", t.x + spot[0][0] * g); text.setAttribute("y", t.y + spot[0][1] * g); text.setAttribute("text-anchor", spot[0][2]);
      if (sub) { sub.setAttribute("x", t.x + spot[0][0] * g); sub.setAttribute("y", t.y + spot[0][1] * g + fs * 1.05); sub.setAttribute("text-anchor", spot[0][2]); }
    });
  }

  // One card per town in the picked area: its frost-free season on a year bar, with today marked.
  function card(t) {
    return '<li><a class="tc' + (t === sel ? " is-on" : "") + '" href="' + t.href + '" data-slug="' + t.slug + '"><span class="tc-top"><b>' + esc(t.name) + '</b><small>' + t.days + ' frost-free days</small></span>' +
      '<span class="tc-trk" aria-hidden="true"><i style="left:' + pct(t.last) + ';width:' + ((Math.min(t.first, 366) - t.last) / 365 * 100).toFixed(2) + '%"></i><i class="tc-now" style="left:' + pct(today) + '"></i></span>' +
      '<span class="tc-mo" aria-hidden="true">' + "JFMAMJJASOND".split("").map(function (m) { return "<span>" + m + "</span>"; }).join("") + '</span>' +
      '<span class="tc-dates"><span>Last frost <b>' + t.dates.split(" – ")[0] + '</b></span><span>First frost <b>' + t.dates.split(" – ")[1] + '</b></span></span></a></li>';
  }
  function showPanel() {
    if (!area) { panel.innerHTML = '<p class="tm-hint">Pick an area to zoom in and see its towns, or tap a dot. Tap a town in view to open its calendar.</p>' + factHtml; return; }
    var list = towns.filter(function (t) { return t.area === area; }).sort(function (a, b) { return a.last - b.last || (a.name < b.name ? -1 : 1); });
    var days = list.map(function (t) { return t.days; }), lo = Math.min.apply(0, days), hi = Math.max.apply(0, days);
    panel.innerHTML = '<h3>' + esc(areaNames[area] || "") + '</h3><p class="tm-sub">' + list.length + (list.length === 1 ? " town" : " towns") + " · " + (lo === hi ? lo : lo + "–" + hi) + ' frost-free days</p><ul class="tc-list">' +
      list.map(card).join("") + '</ul><ul class="tc-legend"><li><i class="tc-k-free"></i>Frost-free season</li><li><i class="tc-k-frost"></i>Frost likely</li><li><i class="tc-k-now"></i>Today</li></ul>';
  }

  function setArea(id, opts) {
    opts = opts || {};
    area = id || null; sel = opts.sel || null;
    root.classList.toggle("is-zoomed", !!area);
    if (select) select.value = area || "";
    Array.prototype.forEach.call(chips, function (b) { b.setAttribute("aria-pressed", (b.getAttribute("data-area") || null) === area ? "true" : "false"); });
    zoomTo(area ? boxFor(towns.filter(function (t) { return t.area === area; })) : FULL, opts.now);
    showPanel();
  }

  Array.prototype.forEach.call(chips, function (b) { b.addEventListener("click", function () { setArea(b.getAttribute("data-area")); }); });
  if (select) select.addEventListener("change", function () { setArea(select.value); });

  // Taps go to the nearest dot within reach, so small dots are easy to hit on phones. A town outside the current area
  // zooms to its area first; a town already in view opens its calendar.
  svg.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a");
    if (link && link.parentNode === labels) return;
    var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    var p = pt.matrixTransform(svg.getScreenCTM().inverse()), best = null, bd = Infinity;
    towns.forEach(function (t) { var d = (t.x - p.x) * (t.x - p.x) + (t.y - p.y) * (t.y - p.y); if (d < bd) { bd = d; best = t; } });
    var reach = 24 * vb[2] / svg.getBoundingClientRect().width;
    e.preventDefault();
    if (!best || bd > reach * reach) return;
    if (best.area === area) { location.href = best.href; return; }
    setArea(best.area, { sel: best });
  });

  // Open on the reader's saved town, if they have one.
  var saved = null;
  try { saved = localStorage.getItem("rainline-place"); } catch (e) {}
  var mine = saved && towns.filter(function (t) { return t.slug === saved; })[0];
  if (mine) setArea(mine.area, { sel: mine, now: true }); else showPanel();
})();
