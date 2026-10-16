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
  var zip = document.getElementById("zip"), sel = document.getElementById("place"), msg = document.getElementById("msg");
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
    var h = '<div class="sec-head"><h2>In season now</h2><a href="' + base + 'frost-dates/' + place.slug + '/">Full calendar for ' + place.city + '</a></div>';
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

  P.fillPlaceSelect(sel, D);

  function show(place, viaZip) {
    var p = P.plan(D, place);
    sel.value = place.slug;
    store("rainline-place", place.slug);
    msg.textContent = "";
    out.innerHTML =
      '<div class="result-head"><h2>' + place.city + ', ' + place.state + '</h2>' +
      '<a href="' + base + 'frost-dates/' + place.slug + '/">Printable page for ' + place.city + '</a></div>' +
      (viaZip ? '<p class="station">Using the nearest NOAA station we have for that ZIP. If another city on the list is closer to you, pick it instead.</p>' : '') +
      R.frostFacts(p) + R.regionNote(p) +
      '<h2>What to plant now</h2>' + R.nowBlock(p, today, base) +
      '<h2>Your year at a glance</h2><div class="reveal">' + R.chart(p, today) + '</div>' +
      '<h2>Planting dates</h2>' + R.table(p, base);
    if (history.replaceState) history.replaceState(null, "", "?place=" + place.slug);
    seasonNow(place);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (zip.value.trim()) {
      var r = P.placeForZip(D, zip.value);
      if (r.error) { msg.textContent = r.error; zip.focus(); return; }
      show(r.place, true);
    } else if (sel.value) {
      show(P.findPlace(D, sel.value), false);
    } else {
      msg.textContent = "Enter a ZIP code or choose a city.";
    }
    out.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });
  sel.addEventListener("change", function () { zip.value = ""; if (sel.value) show(P.findPlace(D, sel.value), false); });

  var q = new URLSearchParams(location.search).get("place") || store("rainline-place");
  var start = q && P.findPlace(D, q);
  if (start) show(start, false);
  else seasonNow(P.findPlace(D, "portland-or"));
})();
