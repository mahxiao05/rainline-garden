/* Plant now (/plant-now/): what can go in this week in the visitor's saved town, what's coming up, and a few of this
 * month's jobs for their region. Uses the same planting windows as the town calendars (plan.js) and the monthly
 * jobs (window.RainlineJobs, written by the build from scripts/chores.js). Without a saved town it shows the town box. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan, R = window.RainlineRender;
  var hero = document.getElementById("pn-hero"), pick = document.getElementById("pn-pick"), out = document.getElementById("pn-out");
  var boxEl = document.getElementById("pn-box");
  if (!D || !P || !R || !hero || !out || !boxEl || !window.RainlineTownBox) return;
  var base = document.documentElement.getAttribute("data-base") || "";
  var photos = (out.getAttribute("data-photos") || "").split(" ");
  var TAG = { coast: "coast", west: "west", east: "east", high: "high", inland: "high" };
  var now = new Date(), today = P.CUM[now.getMonth()] + now.getDate(), month = P.MONTHS_LONG[now.getMonth()];

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function wrap(d) { return d > 365 ? d - 365 : d; }
  function hasPhoto(id) { return photos.indexOf(id) >= 0; }
  function pic(id, size) {
    return hasPhoto(id) ? '<img src="' + base + 'assets/img/photos/crop-' + id + '-720.webp" alt="" loading="lazy" decoding="async">' : R.icon(id, base, size);
  }
  function url(id, slug) { return R.cropUrl(id, slug, base); }

  var box = RainlineTownBox(boxEl, { onPick: function (p) { show(p); window.scrollTo(0, 0); } });
  // Popular-town buttons: switch Plant now (and the saved town in the menu bar) to that town instead of leaving the page.
  // Without JavaScript they still open the town's calendar.
  pick.querySelectorAll(".pnf-popular a[data-slug]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var pl = P.findPlace(D, a.getAttribute("data-slug"));
      if (!pl) return;
      e.preventDefault();
      try { localStorage.setItem("rainline-place", pl.slug); localStorage.setItem("rainline-place-name", pl.slug + "|" + pl.city + ", " + pl.state); } catch (err) { /* private mode */ }
      if (window.RainlineHeadTown) window.RainlineHeadTown();
      show(pl); window.scrollTo(0, 0);
    });
  });

  function show(place, example) {
    var p = P.plan(D, place), n = P.nowList(p, today), f = p.frost, slug = place.slug, city = place.city;
    var seen = {}, inNow = n.sow.concat(n.indoor).filter(function (x) { return !seen[x.r.crop.id] && (seen[x.r.crop.id] = 1); });
    var empty = !inNow.length;
    var x = P.fromDoy(today), tag = (x.d <= 10 ? "Early " : x.d <= 20 ? "Mid " : "Late ") + month;

    // Header: town, season and the two frost dates that frame the year.
    // example: no town saved yet, so Portland is shown as a sample (like the home page) with a clear way to pick yours.
    hero.innerHTML = '<p class="eyebrow">Plant now · ' + (example ? 'Showing ' : '') + esc(city + ", " + place.state) + ' <button type="button" class="link-btn pn-change">' + (example ? 'Pick your town' : 'Change') + '</button></p>' +
      '<h1>Plant now in ' + esc(city) + '</h1><ul class="pnf-facts"><li class="tag">' + tag + '</li><li>Last spring frost <strong>' + P.fmt(f.spring50) +
      '</strong></li><li>First fall frost <strong>' + P.fmt(wrap(f.fall50)) + '</strong></li></ul>';
    document.title = "Plant Now in " + city + ", " + place.state + " | Rainline Garden";
    pick.hidden = true;

    // Right now: picture cards, or one line saying nothing goes in (and what just closed).
    var right;
    if (!empty) {
      right = '<div class="pnf-cards">' + inNow.map(function (y) {
        var s = P.season(y.r, today), left = y.w.end - today, indoor = y.w === y.r.indoor;
        return '<a class="pnf-card" href="' + url(y.r.crop.id, slug) + '">' + (hasPhoto(y.r.crop.id) ? pic(y.r.crop.id) : '<span class="ph-ico">' + R.icon(y.r.crop.id, base, 56) + '</span>') +
          '<span class="t"><strong>' + esc(y.r.crop.name) + '</strong><span>' + (indoor ? "Start seeds indoors" : esc(y.r.crop.how)) + '</span><em' + (s.k === "last" ? ' class="last"' : "") + '>' +
          (left <= 0 ? "Last day today" : left === 1 ? "1 day left" : left + " days left") + '</em></span></a>';
      }).join("") + '</div>';
    } else {
      var missed = [];
      p.crops.forEach(function (r) { var s = P.season(r, today); if (s.missed && s.missed.since <= 21) missed.push({ r: r, w: s.missed.w }); });
      var closed = missed.length ? missed.reduce(function (m, y) { return Math.max(m, y.w.end); }, 0) : 0;
      right = '<div class="pnf-empty"><div><p class="big">Nothing to plant or start indoors in ' + esc(city) + ' this week.</p>' +
        (missed.length ? '<p class="small">The last planting window here closed on ' + P.fmtLong(closed) + ' for:</p>' : '') + '</div>' +
        (missed.length ? '<div class="chips">' + missed.map(function (y) { return '<a href="' + url(y.r.crop.id, slug) + '">' + R.icon(y.r.crop.id, base, 18) + esc(y.r.crop.name) + '</a>'; }).join("") + '</div>' : '') + '</div>';
    }

    // Coming up: each plant's next window, grouped by date (the next four dates).
    var next = p.crops.map(function (r) { var s = P.season(r, today); return s.next ? { r: r, w: s.next.w, kind: s.next.kind, d: s.next.d } : null; })
      .filter(Boolean).filter(function (y) { return !seen[y.r.crop.id]; }).sort(function (a, b) { return a.d - b.d; });
    var groups = [];
    next.forEach(function (y) {
      var key = y.w.start + "|" + y.kind, g = groups.filter(function (g) { return g.key === key; })[0];
      if (!g) { if (groups.length >= 4) return; g = { key: key, start: y.w.start, kind: y.kind, items: [] }; groups.push(g); }
      g.items.push(y);
    });
    var up = '<section class="pnf-sec"><div class="pnf-head"><h2>Coming up</h2><p>Next planting dates</p></div><div class="pnf-box"><ol class="pnf-tl">' +
      groups.map(function (g) {
        return '<li><span class="d">' + P.fmt(g.start) + '<small>' + (g.kind === "indoor" ? "Indoors" : g.kind === "fall" ? "For fall" : "Outside") + '</small></span><div class="row">' +
          g.items.slice(0, 6).map(function (y) { return '<a href="' + url(y.r.crop.id, slug) + '">' + pic(y.r.crop.id, 22) + esc(y.r.crop.name) + '</a>'; }).join("") +
          (g.items.length > 6 ? '<a href="' + base + 'frost-dates/' + slug + '/">+' + (g.items.length - 6) + ' more</a>' : '') + '</div></li>';
      }).join("") + '</ol></div><p class="pnf-links"><a href="' + base + 'frost-dates/' + slug + '/">Full ' + esc(city) + ' calendar</a><a href="' + base + 'my-garden/?place=' + slug + '">Make a garden plan</a></p></section>';

    // A few of this month's jobs: region-specific ones first, skipping any that repeat a plant card.
    var t = TAG[place.zone], names = inNow.map(function (y) { return y.r.crop.name.toLowerCase(); });
    var jobs = (window.RainlineJobs && window.RainlineJobs[now.getMonth()] || []).filter(function (j) {
      return (!j[2] || j[2] === t) && !names.some(function (nm) { return j[1].toLowerCase().indexOf(nm) >= 0; });
    }).sort(function (a, b) { return (b[2] ? 1 : 0) - (a[2] ? 1 : 0); }).slice(0, empty ? 4 : 3);
    var monthUrl = base + "garden-calendar/" + month.toLowerCase() + "/";
    var jb = '<section class="pnf-sec"><div class="pnf-head"><h2>' + (empty ? "Do these instead" : "Also this month") + '</h2><p>' + esc(D.zones[place.zone].name) + ' jobs for ' + month + '</p></div>' +
      (jobs.length ? '<div class="pnf-box"><ul class="pnf-jobs">' + jobs.map(function (j) { return '<li><span><small>' + j[0] + '</small>' + esc(j[1]) + '</span></li>'; }).join("") + '</ul></div>' : '') +
      '<p class="pnf-links"><a href="' + monthUrl + '">All ' + month + ' jobs</a></p></section>';

    out.innerHTML = '<section class="pnf-sec"><div class="pnf-head"><h2>Right now</h2>' + (empty ? '' : '<p>' + inNow.length + (inNow.length === 1 ? ' plant can' : ' plants can') + ' go in this week</p>') + '</div>' + right + '</section>' +
      '<div class="pnf-cols">' + (empty ? jb + up : up + jb) + '</div>' +
      '<p class="pnf-src">Dates from NOAA 1991–2020 frost normals, ' + esc(p.station.name) + ' station. <a href="' + base + 'how-it-works/">How the dates work</a> · <a href="' + monthUrl + '">' + month + ' in the garden: every region</a> · <a href="' + base + 'garden-calendar/">See every month</a></p>';
    out.hidden = false;
    hero.querySelector(".pn-change").addEventListener("click", function () {
      pick.hidden = false; box.expand(); var i = boxEl.querySelector("input"); if (i) { i.value = ""; i.focus(); }
      pick.scrollIntoView({ block: "center" });
    });
  }

  var slug = ""; try { slug = localStorage.getItem("rainline-place") || ""; } catch (e) { /* private mode */ }
  var place = slug && P.findPlace(D, slug);
  if (place) show(place);
  else if ((place = P.findPlace(D, "portland-or"))) show(place, true);
})();
