/* Town calendars map: pick an area (or tap a dot) and the map zooms to that area's towns, names them and lists their dates.
 * The map can also be dragged, pinched or Ctrl/⌘-scrolled, zoomed with the + and − buttons, and opened full screen.
 * Tapping a town that is already in view opens its calendar. Without this script the dots are still plain links. */
(function () {
  var root = document.querySelector(".town-map");
  if (!root) return;
  var svg = root.querySelector(".tm-svg"), labels = root.querySelector(".tm-labels"), panel = document.getElementById("tm-panel");
  var select = document.getElementById("tm-area"), chips = root.querySelectorAll(".tm-chips button");
  var NS = "http://www.w3.org/2000/svg", vb0 = svg.viewBox.baseVal, W = vb0.width, H = vb0.height, vb = [0, 0, W, H];
  var areaNames = {};
  if (select) Array.prototype.forEach.call(select.options, function (o) { if (o.value) areaNames[o.value] = o.textContent; });
  var towns = Array.prototype.map.call(root.querySelectorAll(".tm-dots a"), function (a) {
    var c = a.querySelector("circle");
    return { a: a, c: c, slug: a.getAttribute("data-slug"), area: a.getAttribute("data-area"), name: a.getAttribute("data-name"),
      dates: a.getAttribute("data-dates"), last: +a.getAttribute("data-last"), first: +a.getAttribute("data-first"), days: +a.getAttribute("data-days"), href: a.getAttribute("href"), x: +c.getAttribute("cx"), y: +c.getAttribute("cy") };
  });
  var area = null, sel = null, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, anim = 0;
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

  // Map controls: zoom in, zoom out, whole map, full screen. The SVG sits in a stage so the buttons can float over it.
  var stage = document.createElement("div"); stage.className = "tm-stage";
  svg.parentNode.insertBefore(stage, svg); stage.appendChild(svg);
  stage.insertAdjacentHTML("beforeend", '<div class="tm-ctrl"><button type="button" data-z="in" aria-label="Zoom in" title="Zoom in">+</button><button type="button" data-z="out" aria-label="Zoom out" title="Zoom out">−</button>' +
    '<button type="button" data-z="all" aria-label="Show the whole map" title="Whole map"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 9.5 10 3.5l7 6M5 8v8.5h10V8"/></svg></button></div>' +
    '<button type="button" class="tm-full" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 8V3h5M12 3h5v5M17 12v5h-5M8 17H3v-5"/></svg><span>Full screen</span></button>' +
    '<p class="tm-tip" hidden></p>');
  var fullBtn = stage.querySelector(".tm-full"), tip = stage.querySelector(".tm-tip"), tipTimer = 0;

  // The visible box keeps the SVG's own shape (it is taller in full screen on a phone), never zooms out past the whole map
  // or in past a tenth of it, and stays over the map.
  function ratio() { var r = svg.getBoundingClientRect(); return r.width && r.height ? r.height / r.width : H / W; }
  function maxW() { return Math.max(W, H / ratio()); }
  function fit(v) {
    var a = ratio(), w = Math.min(Math.max(v[2], W / 10), maxW()), h = w * a, cx = v[0] + v[2] / 2, cy = v[1] + v[3] / 2;
    var x = w >= W ? (W - w) / 2 : Math.min(Math.max(cx - w / 2, 0), W - w), y = h >= H ? (H - h) / 2 : Math.min(Math.max(cy - h / 2, 0), H - h);
    return [x, y, w, h];
  }
  function full() { return fit([0, 0, maxW(), maxW() * ratio()]); }
  // A box around the area's towns with room for labels.
  function boxFor(list) {
    var xs = list.map(function (t) { return t.x; }), ys = list.map(function (t) { return t.y; });
    var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys);
    var pad = svg.getBoundingClientRect().width < 500 ? 1.5 : 1.9, w = Math.max(x1 - x0, 60) * pad, h = Math.max(y1 - y0, 60) * pad, a = ratio();
    if (h / w > a) w = h / a;
    return fit([(x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - w * a / 2, w, w * a]);
  }
  function zoomTo(target, instant) {
    var from = vb.slice(), t0 = null, dur = instant || reduce ? 0 : 400, id = ++anim;
    if (!dur) { setVB(target); draw(); return; }
    requestAnimationFrame(function step(ts) {
      if (id !== anim) return;
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur); k = 1 - Math.pow(1 - k, 3);
      setVB(from.map(function (f, i) { return f + (target[i] - f) * k; })); draw();
      if (k < 1) requestAnimationFrame(step);
    });
  }
  // Zoom by a factor (more than 1 zooms in) keeping the map point (px, py) under the same spot on screen.
  function zoomBy(f, px, py, animate) {
    var w = Math.min(Math.max(vb[2] / f, W / 10), maxW()), s = w / vb[2];
    if (px == null) { px = vb[0] + vb[2] / 2; py = vb[1] + vb[3] / 2; }
    var t = fit([px - (px - vb[0]) * s, py - (py - vb[1]) * s, w, w * ratio()]);
    if (animate) zoomTo(t); else { anim++; setVB(t); queueDraw(); }
  }
  function toMap(cx, cy) { var pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
  var drawQueued = false, peaks = svg.querySelector("#tm-peaks");
  function queueDraw() { if (!drawQueued) { drawQueued = true; requestAnimationFrame(function () { drawQueued = false; draw(); }); } }

  // Dots keep the same size on screen at any zoom. Zoomed in, every town in view gets a label (the picked area's first);
  // a label goes right of its dot, or the first nearby spot that is free.
  function draw() {
    var rw = svg.getBoundingClientRect().width || W, k = vb[2] / rw, z = vb[2] / W, fs = Math.max(12.5 * Math.min(z, 1), 13 * k), r = Math.max(5.5 * Math.min(z, 1), 4.5 * k);
    var zoomed = vb[2] < maxW() * 0.97;
    root.classList.toggle("is-zoomed", vb[2] < W * 0.75);
    root.classList.toggle("is-panned", zoomed);
    // The Cascades' peak marks keep their size on screen instead of growing as the map zooms in.
    if (peaks) peaks.setAttribute("patternTransform", "scale(" + Math.min(1, z).toFixed(3) + ")");
    towns.forEach(function (t) {
      var on = t === sel;
      t.c.setAttribute("r", on ? r * 1.45 : r);
      t.c.style.strokeWidth = (on ? 2.2 : 1.2) * Math.max(Math.min(z, 1), k);
      t.a.classList.toggle("is-dim", !!area && t.area !== area);
      t.a.classList.toggle("is-on", on);
    });
    while (labels.firstChild) labels.removeChild(labels.firstChild);
    var inView = function (t) { return t.x > vb[0] && t.x < vb[0] + vb[2] && t.y > vb[1] && t.y < vb[1] + vb[3]; };
    var mine = towns.filter(function (t) { return t.area === area && inView(t); });
    if (vb[2] < W * 0.6) mine = mine.concat(towns.filter(function (t) { return t.area !== area && inView(t); }));
    if (!mine.length) return;
    // On phones labels use the first town's name only (the panel has the full names).
    var taken = mine.map(function (t) { return [t.x - r, t.y - r, 2 * r, 2 * r]; }), g = fs / 12.5, narrow = rw < 500, nDots = mine.length;
    mine.forEach(function (t) {
      var other = !!area && t.area !== area, link = el("a", { href: t.href, "class": other ? "is-dim" : "" }, labels), text = el("text", { "font-size": fs, "stroke-width": 3 * g }, link);
      text.textContent = narrow ? t.name.replace(/ \(.*\)/, "").split(/,| and /)[0] : t.name;
      // On wider screens a second, smaller line gives the picked area's frost dates.
      var sub = narrow || other ? null : el("text", { "class": "tm-d", "font-size": fs * 0.82, "stroke-width": 3 * g }, link);
      if (sub) sub.textContent = t.dates;
      var w = Math.max(text.getComputedTextLength() || text.textContent.length * fs * 0.58, sub ? sub.getComputedTextLength() || 0 : 0) + 4 * g, h = fs * (sub ? 2.15 : 1.15), spot = null, best = Infinity;
      [[9, 4, "start"], [-9, 4, "end"], [9, 16, "start"], [9, -8, "start"], [-9, 16, "end"], [-9, -8, "end"], [0, 20, "middle"], [0, -12, "middle"], [0, 32, "middle"], [0, -24, "middle"]].forEach(function (c, i) {
        var x0 = c[2] === "start" ? t.x + c[0] * g : c[2] === "end" ? t.x + c[0] * g - w : t.x - w / 2, y0 = t.y + c[1] * g - fs * 0.92;
        // Covering a dot is worse than touching another label; running off the map is worst. Ties go to the earlier spot.
        var score = i * 0.01 + (x0 < vb[0] || x0 + w > vb[0] + vb[2] ? 100 : 0);
        taken.forEach(function (b, j) { if (x0 < b[0] + b[2] && x0 + w > b[0] && y0 < b[1] + b[3] && y0 + h > b[1]) score += j < nDots ? 10 : 5; });
        if (score < best) { best = score; spot = [c, x0, y0]; }
      });
      // Outside a picked area, a town whose label would cover something is left unlabeled rather than crowding the map.
      if ((other || !area) && best >= 5) { labels.removeChild(link); return; }
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
    if (!area) { panel.innerHTML = '<p class="tm-hint">Pick an area to zoom in and see its towns, or tap a dot. Drag or pinch to move around. Tap a town in view to open its calendar.</p>' + factHtml; return; }
    var list = towns.filter(function (t) { return t.area === area; }).sort(function (a, b) { return a.last - b.last || (a.name < b.name ? -1 : 1); });
    var days = list.map(function (t) { return t.days; }), lo = Math.min.apply(0, days), hi = Math.max.apply(0, days);
    panel.innerHTML = '<h3>' + esc(areaNames[area] || "") + '</h3><p class="tm-sub">' + list.length + (list.length === 1 ? " town" : " towns") + " · " + (lo === hi ? lo : lo + "–" + hi) + ' frost-free days</p><ul class="tc-list">' +
      list.map(card).join("") + '</ul><ul class="tc-legend"><li><i class="tc-k-free"></i>Frost-free season</li><li><i class="tc-k-frost"></i>Frost likely</li><li><i class="tc-k-now"></i>Today</li></ul>';
  }

  function setArea(id, opts) {
    opts = opts || {};
    area = id || null; sel = opts.sel || null;
    if (select) select.value = area || "";
    Array.prototype.forEach.call(chips, function (b) { b.setAttribute("aria-pressed", (b.getAttribute("data-area") || null) === area ? "true" : "false"); });
    zoomTo(area ? boxFor(towns.filter(function (t) { return t.area === area; })) : full(), opts.now);
    showPanel();
  }

  Array.prototype.forEach.call(chips, function (b) { b.addEventListener("click", function () { setArea(b.getAttribute("data-area")); }); });
  if (select) select.addEventListener("change", function () { setArea(select.value); });
  stage.querySelector(".tm-ctrl").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var z = b.getAttribute("data-z");
    if (z === "in") zoomBy(1.8, null, null, true); else if (z === "out") zoomBy(1 / 1.8, null, null, true); else setArea(null);
  });

  // Full screen: the map section covers the page (this works on phones too, where the browser's own full screen
  // isn't available for a map). Esc or the same button closes it.
  function setFull(on) {
    var c = [vb[0] + vb[2] / 2, vb[1] + vb[3] / 2], w = vb[2];
    root.classList.toggle("is-full", on);
    document.documentElement.classList.toggle("tm-lock", on);
    fullBtn.setAttribute("aria-pressed", on ? "true" : "false");
    fullBtn.querySelector("span").textContent = on ? "Close" : "Full screen";
    var a = ratio(); setVB(fit([c[0] - w / 2, c[1] - w * a / 2, w, w * a])); draw();
    if (!on) root.scrollIntoView({ block: "nearest" });
  }
  fullBtn.addEventListener("click", function () { setFull(!root.classList.contains("is-full")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && root.classList.contains("is-full")) setFull(false); });
  addEventListener("resize", function () { setVB(fit(vb)); queueDraw(); });

  function showTip(msg) {
    tip.textContent = msg; tip.hidden = false; clearTimeout(tipTimer);
    tipTimer = setTimeout(function () { tip.hidden = true; }, 1400);
  }

  // Ctrl/⌘ + scroll (and a trackpad pinch, which browsers send the same way) zooms; a plain scroll keeps scrolling
  // the page, with a tip, except in full screen where there is no page to scroll.
  var mac = /Mac|iPhone|iPad/.test(navigator.platform || "");
  svg.addEventListener("wheel", function (e) {
    if (!(e.ctrlKey || e.metaKey || root.classList.contains("is-full"))) { showTip((mac ? "⌘" : "Ctrl") + " + scroll to zoom the map"); return; }
    e.preventDefault();
    var d = e.deltaY * (e.deltaMode === 1 ? 16 : 1), p = toMap(e.clientX, e.clientY);
    zoomBy(Math.min(2, Math.max(0.5, Math.exp(-d * (Math.abs(d) < 40 ? 0.01 : 0.002)))), p.x, p.y);
  }, { passive: false });

  // Drag to move, two fingers to pinch. On a phone one finger scrolls the page until the map is zoomed in.
  var ptrs = {}, gesture = null, moved = false;
  function pts() { return Object.keys(ptrs).map(function (k) { return ptrs[k]; }); }
  function startGesture() {
    var p = pts(); if (!p.length) { gesture = null; return; }
    var cx = p.reduce(function (s, q) { return s + q.x; }, 0) / p.length, cy = p.reduce(function (s, q) { return s + q.y; }, 0) / p.length;
    gesture = { vb: vb.slice(), cx: cx, cy: cy, d: p.length > 1 ? Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) : 0, m: svg.getScreenCTM().inverse(), n: p.length };
  }
  svg.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.pointerType === "touch" && !root.classList.contains("is-panned") && !root.classList.contains("is-full") && !Object.keys(ptrs).length) { ptrs[e.pointerId] = { x: e.clientX, y: e.clientY, wait: true }; return; }
    ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
    if (Object.keys(ptrs).length === 1) moved = false;
    anim++; startGesture();
  });
  addEventListener("pointermove", function (e) {
    var q = ptrs[e.pointerId]; if (!q) return;
    if (q.wait) { q.x = e.clientX; q.y = e.clientY; return; }
    q.x = e.clientX; q.y = e.clientY;
    var p = pts().filter(function (o) { return !o.wait; }); if (!gesture || !p.length) return;
    var cx = p.reduce(function (s, o) { return s + o.x; }, 0) / p.length, cy = p.reduce(function (s, o) { return s + o.y; }, 0) / p.length;
    if (!moved && Math.hypot(cx - gesture.cx, cy - gesture.cy) < 5 && p.length < 2) return;
    moved = true; root.classList.add("is-dragging");
    var s = gesture.vb[2] / (svg.getBoundingClientRect().width || W), f = p.length > 1 && gesture.d ? Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) / gesture.d : 1;
    var w = Math.min(Math.max(gesture.vb[2] / f, W / 10), maxW()), k = w / gesture.vb[2];
    // The map point that started under the fingers' centre stays under it.
    var pt = svg.createSVGPoint(); pt.x = gesture.cx; pt.y = gesture.cy; var m = pt.matrixTransform(gesture.m);
    var x = m.x - (m.x - gesture.vb[0]) * k - (cx - gesture.cx) * s * k, y = m.y - (m.y - gesture.vb[1]) * k - (cy - gesture.cy) * s * k;
    setVB(fit([x, y, w, w * ratio()])); queueDraw();
  });
  function endPtr(e) {
    var q = ptrs[e.pointerId]; if (!q) return;
    delete ptrs[e.pointerId];
    // A second finger joining a one-finger touch on the unzoomed map turns it into a pinch.
    if (!q.wait) { startGesture(); if (!gesture) root.classList.remove("is-dragging"); }
  }
  addEventListener("pointerup", endPtr); addEventListener("pointercancel", endPtr);
  svg.addEventListener("pointerdown", function (e) {
    var w = Object.keys(ptrs).filter(function (k) { return ptrs[k].wait; });
    if (w.length && Object.keys(ptrs).length > 1) {
      w.forEach(function (k) { delete ptrs[k].wait; }); moved = true; anim++; startGesture();
    }
  });
  svg.addEventListener("dblclick", function (e) { var p = toMap(e.clientX, e.clientY); zoomBy(2, p.x, p.y, true); });

  // Taps go to the nearest dot within reach, so small dots are easy to hit on phones. A town outside the current area
  // zooms to its area first; a town already in view opens its calendar. The end of a drag is not a tap.
  svg.addEventListener("click", function (e) {
    if (moved) { e.preventDefault(); moved = false; return; }
    var link = e.target.closest && e.target.closest("a");
    if (link && link.parentNode === labels) return;
    var p = toMap(e.clientX, e.clientY), best = null, bd = Infinity;
    towns.forEach(function (t) { var d = (t.x - p.x) * (t.x - p.x) + (t.y - p.y) * (t.y - p.y); if (d < bd) { bd = d; best = t; } });
    var reach = 24 * vb[2] / svg.getBoundingClientRect().width;
    e.preventDefault();
    if (!best || bd > reach * reach) return;
    if (best.area === area || (!area && vb[2] < W * 0.6)) { location.href = best.href; return; }
    setArea(best.area, { sel: best });
  }, true);

  // Open on the reader's saved town, if they have one.
  var saved = null;
  try { saved = localStorage.getItem("rainline-place"); } catch (e) {}
  var mine = saved && towns.filter(function (t) { return t.slug === saved; })[0];
  setVB(full());
  if (mine) setArea(mine.area, { sel: mine, now: true }); else { draw(); showPanel(); }
})();
