/* Rainline Garden page behavior. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan, R = window.RainlineRender;
  var now = new Date();
  var month = now.getMonth();
  var today = P.CUM[month] + Math.min(now.getDate(), month === 1 ? 28 : 31);
  var base = document.documentElement.getAttribute("data-base") || "";

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // Live frost warning from the National Weather Service forecast (public domain, free to use).
  // Shown only in the gardening season, when a night in the next three days is forecast at 34°F or colder.
  function frostWatch(el, place) {
    if (!el || !place || !place.lat || !window.fetch) return;
    var f = P.plan(D, place).frost;
    if (today < f.spring50 - 30 || today > Math.min(f.fall50, 365) + 14) return;
    var key = "rainline-nws-" + place.slug, cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(key)); } catch (e) { /* ignore */ }
    var got = cached && Date.now() - cached.t < 36e5 ? Promise.resolve(cached.periods)
      : fetch("https://api.weather.gov/points/" + place.lat + "," + place.lon, { headers: { Accept: "application/geo+json" } })
        .then(function (r) { if (!r.ok) throw r; return r.json(); })
        .then(function (j) { return fetch(j.properties.forecast, { headers: { Accept: "application/geo+json" } }); })
        .then(function (r) { if (!r.ok) throw r; return r.json(); })
        .then(function (j) {
          var periods = j.properties.periods.slice(0, 7).map(function (x) { return { n: x.name, d: x.isDaytime, t: x.temperature, u: x.temperatureUnit }; });
          try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), periods: periods })); } catch (e) { /* ignore */ }
          return periods;
        });
    got.then(function (periods) {
      var cold = periods.filter(function (x) { return !x.d && x.u === "F" && x.t <= 34; })[0];
      if (!cold) return;
      el.innerHTML = '<strong>Frost possible ' + (cold.n.toLowerCase() === "tonight" ? "tonight" : cold.n) + ' in ' + place.city + '.</strong> ' +
        'The forecast low is ' + cold.t + '°F. Cover tender plants or bring pots inside, and hold off on planting warm-season crops. ' +
        '<span class="fw-src">Forecast from the National Weather Service.</span>';
      el.hidden = false;
    }).catch(function () { /* no forecast, no warning */ });
  }

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
      frostWatch(document.querySelector(".frost-watch"), place);
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

  ["OR", "WA"].forEach(function (s) {
    var g = document.createElement("optgroup");
    g.label = s === "OR" ? "Oregon" : "Washington";
    D.places.filter(function (x) { return x.state === s; })
      .sort(function (a, b) { return a.city.localeCompare(b.city); })
      .forEach(function (x) { var o = document.createElement("option"); o.value = x.slug; o.textContent = x.city + ", " + x.state; g.appendChild(o); });
    sel.appendChild(g);
  });

  function show(place, viaZip) {
    var p = P.plan(D, place);
    sel.value = place.slug;
    store("rainline-place", place.slug);
    msg.textContent = "";
    out.innerHTML =
      '<div class="result-head"><h2>' + place.city + ', ' + place.state + '</h2>' +
      '<a href="' + base + 'frost-dates/' + place.slug + '/">Printable page for ' + place.city + '</a></div>' +
      (viaZip ? '<p class="station">Using the nearest NOAA station we have for that ZIP. If another city on the list is closer to you, pick it instead.</p>' : '') +
      R.frostFacts(p, base) + '<div class="frost-watch" hidden></div>' +
      '<h2>What to plant now</h2>' + R.nowBlock(p, today, base) +
      '<p class="plan-link"><a class="btn btn-ghost" href="' + base + 'my-garden/?place=' + place.slug + '">Pick my plants and make a plan</a> Only growing a few things? Get dates for just those, on one printable page.</p>' +
      '<details class="year"><summary>See the whole year: chart and all ' + p.crops.length + ' planting dates</summary>' +
      R.regionNote(p) + '<div class="reveal">' + R.chart(p, today) + '</div>' + R.table(p, base) + '</details>';
    frostWatch(out.querySelector(".frost-watch"), place);
    if (history.replaceState) history.replaceState(null, "", "?place=" + place.slug);
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
})();
