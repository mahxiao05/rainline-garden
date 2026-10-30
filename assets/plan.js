/* Rainline Garden planting logic. Shared by the browser and the static page builder. */
(function (root) {
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var CUM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  // Day of year (1-365) on a non-leap calendar.
  function doy(md) { var p = md.split("-"); return CUM[+p[0] - 1] + +p[1]; }
  function fromDoy(n) {
    n = ((n - 1) % 365 + 365) % 365 + 1;
    for (var m = 11; m >= 0; m--) if (n > CUM[m]) return { m: m, d: n - CUM[m] };
  }
  function fmt(n) { var x = fromDoy(n); return MONTHS[x.m] + " " + x.d; }
  function fmtLong(n) { var x = fromDoy(n); return MONTHS_LONG[x.m] + " " + x.d; }
  function fmtRange(a, b) {
    var x = fromDoy(a), y = fromDoy(b);
    if (x.m === y.m) return MONTHS[x.m] + " " + x.d + "–" + y.d;
    return fmt(a) + " – " + fmt(b);
  }

  // How the local median last frost limits each kind of planting (days relative to median).
  var FROST_FLOOR = { coolEarly: -42, coolTrans: -28, warmSeed: 7, warmTrans: 0, hotTrans: 7 };
  var FALL_CAP = 288; // Oct 15

  function findPlace(D, slug) {
    for (var i = 0; i < D.places.length; i++) if (D.places[i].slug === slug) return D.places[i];
    return null;
  }

  function placeForZip(D, zip) {
    zip = String(zip || "").trim();
    if (!/^\d{5}$/.test(zip)) return { error: "Enter a 5-digit ZIP code." };
    var i, p;
    for (i = 0; i < D.places.length; i++) { p = D.places[i]; if (p.zips && p.zips.indexOf(zip) >= 0) return { place: p }; }
    var z3 = zip.slice(0, 3);
    for (i = 0; i < D.places.length; i++) { p = D.places[i]; if (p.zip3 && p.zip3.indexOf(z3) >= 0) return { place: p }; }
    return { error: "That ZIP isn't in Oregon or Washington. Rainline Garden covers the Pacific Northwest only for now." };
  }

  function plan(D, place) {
    var st = D.stations[place.station], zone = D.zones[place.zone];
    var f = {
      spring50: doy(st.spring50), spring10: doy(st.spring10),
      fall50: doy(st.fall50), fall10: doy(st.fall10)
    };
    // A fall date earlier in the calendar than spring (e.g. a January median) wraps into next year.
    if (f.fall50 < f.spring50) f.fall50 += 365;
    if (f.fall10 < f.spring50) f.fall10 += 365;
    f.season = f.fall50 - f.spring50;
    // The 90% dates frame the frost-chance strip. A December spring90 belongs to the year before; a winter fall90 to the next.
    if (st.spring90) { f.spring90 = doy(st.spring90); if (f.spring90 > f.spring50) f.spring90 -= 365; }
    if (st.fall90) { f.fall90 = doy(st.fall90); if (f.fall90 < f.fall50) f.fall90 += 365; }

    var out = [];
    D.crops.forEach(function (c) {
      var r = { crop: c, windows: [] };
      if (c.anchor === "garlic") {
        r.windows.push({ kind: "fall", start: doy(zone.anchors.garlicStart), end: doy(zone.anchors.garlicEnd) });
        out.push(r); return;
      }
      var start = Math.max(doy(zone.anchors[c.anchor]), f.spring50 + FROST_FLOOR[c.anchor]);
      var end = start + c.win;
      if (c.indoor) r.indoor = { start: start - c.indoor[0] * 7, end: start - c.indoor[1] * 7 };
      r.windows.push({ kind: "spring", start: start, end: end });
      if (c.fall) {
        // Fall crops need daylight to size up, not just frost-free days, so mild coastal and
        // west-side falls are capped at Oct 15 as the effective end of the growing season.
        var fallRef = Math.min(f.fall50, FALL_CAP);
        var fs = fallRef - c.fall[0] * 7, fe = fallRef - c.fall[1] * 7;
        if (fs > end + 14 && fe <= 365) r.windows.push({ kind: "fall", start: fs, end: fe });
      }
      // Overwintering sowings (e.g. fava beans sown in October), only where winters are mild enough.
      if (c.overwinter && c.overwinter.zones.indexOf(place.zone) >= 0)
        r.windows.push({ kind: "fall", over: true, start: doy(c.overwinter.start), end: doy(c.overwinter.end) });
      // Season-length check for warm crops: does planting at the window start leave enough time?
      if (c.group === "warm") {
        var spare = f.fall50 - (start + c.days);
        if (spare < 0) r.season = "short";
        else if (spare < 21) r.season = "tight";
      }
      // Frost cover reminder: warm crops planted before the 90%-safe date.
      if (c.group === "warm" && start < f.spring10) { r.cover = true; r.coverUntil = f.spring10; r.coverDays = f.spring10 - start; }
      out.push(r);
    });
    return { place: place, station: st, zone: zone, frost: f, crops: out };
  }

  // Which crops can be planted (or started indoors) on a given day of year.
  function nowList(p, today) {
    var sow = [], indoor = [], soon = [];
    p.crops.forEach(function (r) {
      r.windows.forEach(function (w) {
        if (today >= w.start && today <= w.end) sow.push({ r: r, w: w });
        else if (w.start > today && w.start - today <= 21) soon.push({ r: r, w: w });
      });
      if (r.indoor && today >= r.indoor.start && today <= r.indoor.end) indoor.push({ r: r, w: r.indoor });
    });
    soon.sort(function (a, b) { return a.w.start - b.w.start; });
    return { sow: sow, indoor: indoor, soon: soon };
  }

  // Days forward from day b to day a, wrapping around the year.
  function ahead(a, b) { return ((a - b) % 365 + 365) % 365; }
  // Where a crop stands on a given day of year: "now" or "last" (window open, closing within a week), "indoor"
  // (time to start seeds inside), "soon" (next step within 3 weeks) or "later". `next` is the next window to open,
  // `missed` a window that closed in the last 45 days.
  function season(r, today) {
    var i, w, len, into, cands = [], missed = null;
    for (i = 0; i < r.windows.length; i++) {
      w = r.windows[i]; len = w.end - w.start; into = ahead(today, w.start);
      if (into <= len) return { k: len - into <= 7 ? "last" : "now", w: w };
    }
    if (r.indoor && ahead(today, r.indoor.start) <= r.indoor.end - r.indoor.start) return { k: "indoor", w: r.indoor };
    r.windows.forEach(function (x) {
      cands.push({ w: x, kind: x.kind, d: ahead(x.start, today) });
      var since = ahead(today, x.end);
      if (since <= 45 && (!missed || since < missed.since)) missed = { w: x, since: since };
    });
    if (r.indoor) cands.push({ w: r.indoor, kind: "indoor", d: ahead(r.indoor.start, today) });
    cands.sort(function (a, b) { return a.d - b.d; });
    return { k: cands[0].d <= 21 ? "soon" : "later", next: cands[0], missed: missed };
  }

  // Towns grouped by area (D.areas order), each group sorted by name.
  function byArea(D) {
    return D.areas.map(function (a) {
      return { area: a, places: D.places.filter(function (x) { return x.area === a.id; })
        .sort(function (x, y) { return x.city.localeCompare(y.city); }) };
    });
  }

  // Fills a town <select> with one group per area so the long list stays scannable.
  function fillPlaceSelect(sel, D) {
    byArea(D).forEach(function (g) {
      var og = document.createElement("optgroup");
      og.label = g.area.name + " (" + g.area.state + ")";
      g.places.forEach(function (x) { var o = document.createElement("option"); o.value = x.slug; o.textContent = x.city + ", " + x.state; og.appendChild(o); });
      sel.appendChild(og);
    });
  }

  var API = { MONTHS: MONTHS, MONTHS_LONG: MONTHS_LONG, CUM: CUM, doy: doy, fromDoy: fromDoy, fmt: fmt, fmtLong: fmtLong,
    fmtRange: fmtRange, plan: plan, nowList: nowList, season: season, findPlace: findPlace, placeForZip: placeForZip,
    byArea: byArea, fillPlaceSelect: fillPlaceSelect };
  if (typeof module !== "undefined" && module.exports) module.exports = API; else root.RainlinePlan = API;
})(this);
