/* Rainline Garden page behavior. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan, R = window.RainlineRender;
  var now = new Date();
  var month = now.getMonth();
  var today = P.CUM[month] + Math.min(now.getDate(), month === 1 ? 28 : 31);
  var base = document.documentElement.getAttribute("data-base") || "";

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // City pages: add today's marker and the "what to plant now" list.
  var live = document.getElementById("live");
  if (live) {
    var place = P.findPlace(D, live.getAttribute("data-place"));
    if (place) {
      var p = P.plan(D, place);
      var nowEl = document.getElementById("now");
      if (nowEl) nowEl.innerHTML = R.nowBlock(p, today, base);
      var ledeEl = live.querySelector(".lede");
      if (ledeEl) ledeEl.innerHTML = R.seasonLede(p, today);
      var riskEl = document.getElementById("risk");
      if (riskEl) riskEl.innerHTML = R.frostRisk(p, today);
      var chartEl = document.getElementById("chart");
      if (chartEl) chartEl.innerHTML = R.chart(p, today);
    }
  }

  // Monthly calendar: highlight this month.
  var m = document.querySelector('.month[data-m="' + (month + 1) + '"]');
  if (m) m.classList.add("is-now");

  // Home page finder.
  var form = document.getElementById("finder");
  if (!form) return;
  var where = document.getElementById("where"), list = document.getElementById("where-list"), msg = document.getElementById("msg");
  var hero = form.closest(".hero"), saved = hero.querySelector(".home-saved");
  var out = document.getElementById("result");
  var seasonEl = document.getElementById("season-now");
  // "In season now": the year chart cut down to the plants you can sow, plant or start indoors today.
  var SEASON_ROWS = 8;
  function seasonNow(place, all) {
    if (!seasonEl) return;
    var p = P.plan(D, place), n = P.nowList(p, today), ids = {};
    n.sow.concat(n.indoor).forEach(function (x) { ids[x.r.crop.id] = 1; });
    var rows = p.crops.filter(function (r) { return ids[r.crop.id]; });
    var where = place.city + ', ' + place.state;
    var h = '<div class="sec-head"><h2>In season now</h2><a href="' + base + 'frost-dates/' + place.slug + '/">Full ' + place.city + ' calendar</a></div>';
    if (!rows.length) {
      h += '<p class="season-empty">Nothing is in season to plant in ' + where + ' right now. ' +
        (n.soon.length ? 'Next up: ' + n.soon[0].r.crop.name + ' from ' + P.fmt(n.soon[0].w.start) + '.' : 'It\'s a good time to plan, order seeds and tend your beds.') + '</p>';
    } else {
      var shown = all ? rows : rows.slice(0, SEASON_ROWS);
      h += '<p class="season-sub">' + rows.length + (rows.length === 1 ? ' plant' : ' plants') + ' you can plant or start indoors in ' + where + ' as of ' + P.fmt(today) + '.' +
        (out.innerHTML ? '' : ' Pick your town above to change it.') + '</p>' +
        '<div class="reveal">' + R.chart({ place: p.place, station: p.station, zone: p.zone, frost: p.frost, crops: shown }, today) + '</div>' +
        (rows.length > shown.length ? '<button type="button" class="btn btn-ghost btn-sm season-more">Show all ' + rows.length + ' in season</button>' : '');
    }
    seasonEl.innerHTML = h;
    seasonEl.hidden = false;
    var more = seasonEl.querySelector(".season-more");
    if (more) more.addEventListener("click", function () { seasonNow(place, true); });
  }

  // One box for a ZIP code or a town name, with matching towns listed as you type.
  function norm(t) { return String(t || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  var towns = D.places.map(function (x) { return { p: x, label: x.city + ", " + x.state, key: norm(x.city + " " + x.state), city: norm(x.city) }; });
  function matches(q) {
    q = norm(q);
    if (!q) return [];
    var starts = [], inside = [];
    towns.forEach(function (t) {
      if (t.city.indexOf(q) === 0 || t.key.indexOf(q) === 0) starts.push(t);
      else if (t.key.indexOf(" " + q) > 0) inside.push(t);
    });
    var all = starts.concat(inside);
    all.best = starts.length === 1 ? starts[0] : null; // "bend" means Bend and Redmond, not Coos Bay and North Bend
    return all;
  }
  var shown = [], active = -1;
  function closeList() { list.hidden = true; list.innerHTML = ""; shown = []; active = -1; where.setAttribute("aria-expanded", "false"); where.removeAttribute("aria-activedescendant"); }
  function paint() {
    list.querySelectorAll("li").forEach(function (li, i) { li.setAttribute("aria-selected", i === active ? "true" : "false"); });
    if (active >= 0) where.setAttribute("aria-activedescendant", "where-" + active); else where.removeAttribute("aria-activedescendant");
  }
  function openList() {
    var v = where.value.trim();
    shown = /^\d+$/.test(v) ? [] : matches(v).slice(0, 6);
    if (!shown.length) return closeList();
    list.innerHTML = shown.map(function (t, i) { return '<li id="where-' + i + '" role="option" aria-selected="false">' + t.label + '</li>'; }).join("");
    list.hidden = false; active = -1; where.setAttribute("aria-expanded", "true");
  }
  function pick(t) { where.value = t.label; closeList(); go(t.p, false); }
  where.addEventListener("input", function () { msg.textContent = ""; openList(); });
  where.addEventListener("keydown", function (e) {
    if (list.hidden) return;
    if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % shown.length; paint(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = active <= 0 ? shown.length - 1 : active - 1; paint(); }
    else if (e.key === "Escape") { closeList(); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(shown[active]); }
  });
  ["mousedown", "pointerdown"].forEach(function (t) { list.addEventListener(t, function (e) { e.preventDefault(); }); });
  list.addEventListener("click", function (e) { var li = e.target.closest("li"); if (li) pick(shown[+li.id.slice(6)]); });
  where.addEventListener("blur", function () { setTimeout(closeList, 0); });



  // Collapsible result sections: open on desktop, closed on phones, and the reader's last choice wins.
  function fold(key, title, body) {
    var saved = store("rainline-fold-" + key);
    var open = saved ? saved === "1" : !matchMedia("(max-width: 720px)").matches;
    return '<details class="fold" data-fold="' + key + '"' + (open ? " open" : "") + '><summary><h2>' + title + '</h2></summary>' + body + '</details>';
  }

  function show(place, viaZip) {
    var p = P.plan(D, place);
    store("rainline-place", place.slug);
    msg.textContent = "";
    out.innerHTML =
      '<div class="result-head"><h2>' + place.city + ', ' + place.state + '</h2>' +
      '<a href="' + base + 'frost-dates/' + place.slug + '/">Full ' + place.city + ' calendar</a></div>' +
      (viaZip ? '<p class="station">Using the nearest NOAA station we have for that ZIP. If another town on the list is closer to you, pick it instead.</p>' : '') +
      R.frostFacts(p) + R.regionNote(p) +
      '<h2>What to plant now</h2>' + R.nowBlock(p, today, base) +
      fold("year", "Your year at a glance", '<div class="reveal">' + R.chart(p, today) + '</div>') +
      fold("dates", "Planting dates", R.table(p, base));
    out.querySelectorAll("details.fold").forEach(function (d) {
      d.addEventListener("toggle", function () { store("rainline-fold-" + d.getAttribute("data-fold"), d.open ? "1" : "0"); });
    });
    if (history.replaceState) history.replaceState(null, "", "?place=" + place.slug);
    seasonNow(place);
  }

  function scrollToResult() { out.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); }
  function go(place, viaZip) { show(place, viaZip); scrollToResult(); }

  // A town already picked on an earlier visit (or linked with ?place=) shows straight away, with the box tucked behind "Change town".
  function collapse(place) { hero.classList.add("is-saved"); saved.querySelector("strong").textContent = place.city + ", " + place.state; saved.hidden = false; }
  saved.querySelector(".home-change").addEventListener("click", function () { hero.classList.remove("is-saved"); saved.hidden = true; where.value = ""; where.focus(); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = where.value.trim();
    if (!v) { msg.textContent = "Enter a ZIP code or the name of your town."; where.focus(); return; }
    if (/^\d+$/.test(v)) {
      var r = P.placeForZip(D, v);
      if (r.error) { msg.textContent = r.error; where.focus(); return; }
      closeList(); return go(r.place, true);
    }
    var m = matches(v), exact = m.filter(function (t) { return t.city === norm(v) || t.key === norm(v); });
    var one = exact.length === 1 ? exact[0] : m.length === 1 ? m[0] : m.best;
    if (one) return pick(one);
    if (m.length) { openList(); msg.textContent = "Pick your town from the list."; return; }
    msg.textContent = "We don't have a town called that yet. Try your ZIP code, or browse all " + D.places.length + " towns.";
    where.focus();
  });
  if (window.RainlineNear) RainlineNear(document.getElementById("near-me"), msg, P.nearPoints(D), function (slug) {
    var p = P.findPlace(D, slug); where.value = p.city + ", " + p.state; msg.textContent = ""; go(p, false);
  });

  var q = new URLSearchParams(location.search).get("place") || store("rainline-place");
  var start = q && P.findPlace(D, q);
  if (start) { show(start, false); collapse(start); }
  else seasonNow(P.findPlace(D, "portland-or"));
})();
