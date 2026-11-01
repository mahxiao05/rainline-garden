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
      var cal = document.getElementById("calendar");
      if (cal) { R.calToday(cal, today); calendarPicker(cal); }
    }
  }

  // Town pages: the plant-group tiles show one group at a time, and the search looks through every group.
  function calendarPicker(cal) {
    var tools = cal.querySelector(".pc-tools"), q = document.getElementById("pc-q"), none = cal.querySelector(".pc-none");
    var tabs = cal.querySelectorAll(".pc-tab"), groups = cal.querySelectorAll(".pc-group");
    if (!tools || !q) return;
    tools.hidden = false;
    cal.classList.add("pc-on");
    function n(t) { return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
    function pick(g) {
      groups.forEach(function (d) { d.classList.toggle("is-on", d.getAttribute("data-g") === g); });
      tabs.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-g") === g ? "true" : "false"); });
    }
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        if (q.value) { q.value = ""; search(); }
        pick(b.getAttribute("data-g"));
      });
    });
    function search() {
      var v = n(q.value), any = false;
      cal.classList.toggle("pc-searching", !!v);
      groups.forEach(function (d) {
        var c = 0;
        d.querySelectorAll(".pc-card").forEach(function (li) {
          var m = !v || (" " + n(li.getAttribute("data-n"))).indexOf(" " + v) >= 0;
          li.hidden = !m; if (m) c++;
        });
        d.classList.toggle("has-hit", !!v && c > 0);
        if (c) any = true;
      });
      none.textContent = v && !any ? "No plant by that name yet. Try another name, or pick a group above." : "";
    }
    q.addEventListener("input", search);
  }

  // Monthly calendar: highlight this month.
  var m = document.querySelector('.month[data-m="' + (month + 1) + '"]');
  if (m) m.classList.add("is-now");

  // Home page finder: the shared town box (assets/townbox.js).
  var boxEl = document.getElementById("where");
  if (!boxEl) return;
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

  // Collapsible result sections: open on desktop, closed on phones, and the reader's last choice wins.
  function fold(key, title, body) {
    var saved = store("rainline-fold-" + key);
    var open = saved ? saved === "1" : !matchMedia("(max-width: 720px)").matches;
    return '<details class="fold" data-fold="' + key + '"' + (open ? " open" : "") + '><summary><h2>' + title + '</h2></summary>' + body + '</details>';
  }

  function show(place, viaZip) {
    var p = P.plan(D, place);
    store("rainline-place", place.slug);
    store("rainline-place-name", place.slug + "|" + place.city + ", " + place.state);
    if (window.RainlineHeadTown) window.RainlineHeadTown();
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

  var box = RainlineTownBox(boxEl, { onPick: go });

  var params = new URLSearchParams(location.search);
  var q = params.get("place") || store("rainline-place");
  var start = q && P.findPlace(D, q);
  // A town already picked on an earlier visit (or linked with ?place=) shows straight away, with the box tucked behind "Change town".
  // The header's "Change town" link (?change=1) leaves the box open and ready to type in instead.
  if (start) { show(start, false); if (params.has("change")) box.expand(true); else box.collapse(start); }
  else seasonNow(P.findPlace(D, "portland-or"));
})();
