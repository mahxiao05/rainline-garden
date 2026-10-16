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

  P.fillPlaceSelect(sel, D);

  // Collapsible result sections: open on desktop, closed on phones, and the reader's last choice wins.
  function fold(key, title, body) {
    var saved = store("rainline-fold-" + key);
    var open = saved ? saved === "1" : !matchMedia("(max-width: 720px)").matches;
    return '<details class="fold" data-fold="' + key + '"' + (open ? " open" : "") + '><summary><h2>' + title + '</h2></summary>' + body + '</details>';
  }

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
      fold("year", "Your year at a glance", '<div class="reveal">' + R.chart(p, today) + '</div>') +
      fold("dates", "Planting dates", R.table(p, base));
    out.querySelectorAll("details.fold").forEach(function (d) {
      d.addEventListener("toggle", function () { store("rainline-fold-" + d.getAttribute("data-fold"), d.open ? "1" : "0"); });
    });
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
