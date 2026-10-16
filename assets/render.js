/* Rainline Garden HTML renderers. Shared by the browser and the static page builder. */
(function (root) {
  var P = (typeof module !== "undefined" && module.exports) ? require("./plan.js") : root.RainlinePlan;
  var D = (typeof module !== "undefined" && module.exports) ? require("./data.js") : root.RainlineData;

  function pct(n) { return (Math.max(0, Math.min(365, n - 1)) / 365 * 100).toFixed(2) + "%"; }
  function span(a, b) { return "left:" + pct(a) + ";width:" + (Math.max(1, Math.min(365, b) - a) / 365 * 100).toFixed(2) + "%"; }

  function icon(id, base, size) {
    size = size || 28;
    return '<img class="ico" src="' + (base || "") + 'assets/img/crops/' + id + '.svg" width="' + size + '" height="' + size + '" alt="" loading="lazy">';
  }
  function cropUrl(id, slug, base) { return (base || "") + 'when-to-plant/' + id + '/' + slug + '/'; }

  // Plain-word dates: "early April", "mid April", "late April".
  function soft(n) { var x = P.fromDoy(n); return (x.d <= 10 ? "early " : x.d <= 20 ? "mid " : "late ") + P.MONTHS_LONG[x.m]; }
  function softRange(a, b) {
    var x = P.fromDoy(a), y = P.fromDoy(b);
    if (x.m === y.m) { var s1 = soft(a).split(" ")[0], s2 = soft(b).split(" ")[0]; return s1 === s2 ? soft(a) : s1 + " to " + s2 + " " + P.MONTHS_LONG[x.m]; }
    return soft(a) + " to " + soft(b);
  }
  function weeks(d) { return d < 10 ? "about a week" : "about " + Math.round(d / 7) + " weeks"; }

  function frostFacts(p, base) {
    var f = p.frost;
    return '<div class="facts">' +
      '<div class="fact"><span class="fact-k">Last spring frost</span><span class="fact-v">' + P.fmt(f.spring50) + '</span>' +
      '<span class="fact-s">Typical date</span></div>' +
      '<div class="fact"><span class="fact-k">First fall frost</span><span class="fact-v">' + P.fmt(f.fall50) + '</span>' +
      '<span class="fact-s">Typical date</span></div>' +
      '<div class="fact"><span class="fact-k">Growing season</span><span class="fact-v">' + f.season + ' days</span>' +
      '<span class="fact-s">Frost-free</span></div>' +
      '</div>' + frostNote(p, base);
  }

  // Frost dates are averages; say how far off they can be, using this town's own spread.
  function frostNote(p, base) {
    var f = p.frost;
    return '<p class="frost-note"><strong>These are averages, not promises.</strong> In ' + p.place.city + ', the last frost is over by ' +
      P.fmt(f.spring10) + ' in 9 years out of 10, ' + weeks(f.spring10 - f.spring50) + ' after the typical date. ' +
      (f.fall10 < 366 ? 'In fall, the first frost can come as early as ' + P.fmt(f.fall10) + '. ' : '') +
      'Any single year can be earlier or later, so check the forecast before planting tender crops. ' +
      '<a href="' + (base || "") + 'articles/frost-dates-explained/">What frost dates really mean</a></p>';
  }

  function regionNote(p) {
    return '<p class="region"><strong>' + p.zone.name + '.</strong> ' + p.zone.blurb + '</p>' +
      '<p class="station">Frost dates are 1991–2020 NOAA climate normals for ' + p.station.name +
      ' (' + p.station.elev + ' m elevation). Gardens in cold hollows or at higher elevation can frost later in spring and earlier in fall.</p>';
  }

  function chart(p, today) {
    var f = p.frost, h = "";
    h += '<div class="chart" role="img" aria-label="Planting calendar chart for ' + p.place.city + '. The table below lists the same dates.">';
    var cur = -1;
    if (today) for (var c = 0; c < 12; c++) if (today > P.CUM[c]) cur = c;
    // Tint this month's column so you can read straight down to what's due.
    if (cur >= 0) h += '<i class="month-now" style="--a:' + (P.CUM[cur] / 365).toFixed(4) + ';--w:' + (((cur < 11 ? P.CUM[cur + 1] : 365) - P.CUM[cur]) / 365).toFixed(4) + '"></i>';
    h += '<div class="row row-head"><div class="lbl"></div><div class="track months">';
    for (var m = 0; m < 12; m++) h += '<span' + (m === cur ? ' class="is-now"' : '') + ' style="left:' + pct(P.CUM[m] + 1) + '" data-s="' + P.MONTHS[m].charAt(0) + '">' + P.MONTHS[m] + '</span>';
    h += '</div></div>';
    // Frost band.
    h += '<div class="row row-frost"><div class="lbl">Frost</div><div class="track">' +
      '<i class="band frost-hard" style="' + span(1, f.spring50) + '"></i>' +
      '<i class="band frost-risk" style="' + span(f.spring50, f.spring10) + '"></i>' +
      '<i class="band frost-free" style="' + span(f.spring10, Math.min(f.fall10, 366)) + '"></i>' +
      (f.fall10 < 366 ? '<i class="band frost-risk" style="' + span(f.fall10, Math.min(f.fall50, 366)) + '"></i>' : "") +
      (f.fall50 < 366 ? '<i class="band frost-hard" style="' + span(f.fall50, 366) + '"></i>' : "") +
      '</div></div>';
    D.categories.forEach(function (k) {
      if (!p.crops.some(function (r) { return r.crop.cat === k.id; })) return;
      h += '<div class="row row-group"><div class="lbl">' + k.name + '</div></div>';
      p.crops.filter(function (r) { return r.crop.cat === k.id; }).forEach(function (r) {
        h += '<div class="row"><div class="lbl">' + r.crop.name + '</div><div class="track">';
        if (r.indoor) h += '<i class="bar bar-in" style="' + span(r.indoor.start, r.indoor.end) + '" title="Start seeds indoors ' + P.fmtRange(r.indoor.start, r.indoor.end) + '"></i>';
        r.windows.forEach(function (w) {
          h += '<i class="bar bar-' + w.kind + '" style="' + span(w.start, w.end) + '" title="' + (w.kind === "fall" ? (r.windows.length > 1 ? "Plant again for fall " : "Plant in fall ") : "Plant in the garden ") + P.fmtRange(w.start, w.end) + '"></i>';
        });
        h += '</div></div>';
      });
    });
    if (today) h += '<div class="today" style="--f:' + ((today - 1) / 365).toFixed(4) + '"></div>';
    h += '</div>';
    h += '<ul class="legend">' +
      '<li><i class="key bar-in"></i>Start seeds indoors</li>' +
      '<li><i class="key bar-spring"></i>Plant in the garden</li>' +
      '<li><i class="key bar-fall"></i>Plant again for fall</li>' +
      '<li><i class="key frost-risk"></i>Frost possible</li>' +
      '<li><i class="key frost-hard"></i>Frost likely</li>' +
      (today ? '<li><i class="key key-today"></i>Today, ' + P.fmt(today) + '</li>' : '') + '</ul>' +
      '<p class="howto">How to read this: each bar shows when to do that job. Dashed bars are for starting seeds indoors in trays; solid bars are for planting in the garden.</p>';
    return h;
  }

  function flags(r) {
    var out = [];
    if (r.season === "short") out.push('<span class="flag flag-warn">Season is short here: use transplants, a fast variety and row cover</span>');
    else if (r.season === "tight") out.push('<span class="flag">Tight season: choose an early variety</span>');
    if (r.cover) out.push('<span class="flag">Keep frost cover handy at first</span>');
    return out.join(" ");
  }

  function table(p, base) {
    var h = '<div class="table-wrap"><table class="plan"><thead><tr><th scope="col">Crop</th><th scope="col">Start seeds indoors</th>' +
      '<th scope="col">Plant in the garden</th><th scope="col">Plant again for fall</th></tr></thead><tbody>';
    p.crops.forEach(function (r) {
      var spring = r.windows.filter(function (w) { return w.kind === "spring"; })[0];
      var fall = r.windows.filter(function (w) { return w.kind === "fall"; })[0];
      h += '<tr><th scope="row"><div class="crop-cell">' + icon(r.crop.id, base, 32) + '<div><a href="' + cropUrl(r.crop.id, p.place.slug, base) + '">' + r.crop.name + '</a><span class="how">' + r.crop.how + '</span></div></div></th>' +
        '<td data-label="Start seeds indoors">' + (r.indoor ? P.fmtRange(r.indoor.start, r.indoor.end) : '<span class="none">—</span>') + '</td>' +
        '<td data-label="Plant in the garden">' + (spring ? P.fmtRange(spring.start, spring.end) : '<span class="none">—</span>') + (flags(r) ? '<div>' + flags(r) + '</div>' : '') + '</td>' +
        '<td data-label="Plant again for fall">' + (fall ? P.fmtRange(fall.start, fall.end) : '<span class="none">—</span>') + '</td></tr>';
    });
    return h + '</tbody></table></div>';
  }

  // One plain answer per plant for a given day: plant now, start indoors now, wait, or later in the year.
  function status(r, today) {
    var jobs = [];
    if (r.indoor) jobs.push({ kind: "indoor", start: r.indoor.start, end: r.indoor.end });
    r.windows.forEach(function (w) { jobs.push({ kind: w.kind === "fall" ? "fall" : "plant", start: w.start, end: w.end }); });
    var open = jobs.filter(function (j) { return j.kind !== "indoor" && today >= j.start && today <= j.end; })[0];
    if (open) return { kind: "now", job: open, text: "Plant now, through " + soft(open.end) };
    var inside = jobs.filter(function (j) { return j.kind === "indoor" && today >= j.start && today <= j.end; })[0];
    if (inside) return { kind: "indoor", job: inside, text: "Start seeds indoors now, plant out " + soft(r.windows[0].start) };
    var next = jobs.map(function (j) { return { kind: j.kind, start: j.start > today ? j.start : j.start + 365, end: j.end }; })
      .sort(function (a, b) { return a.start - b.start; })[0];
    var verb = next.kind === "indoor" ? "Start indoors" : next.kind === "fall" ? "Plant for fall" : "Plant";
    var d = next.start - today;
    return { kind: d <= 42 ? "soon" : "later", job: next, wait: d,
      text: d <= 42 ? verb + " in " + weeks(d) + ", " + soft(next.start) : verb + " " + soft(next.start) };
  }

  var GROUPS = [
    ["now", "Plant now", "These can go in the garden today."],
    ["indoor", "Start seeds indoors now", "Sow these in trays inside, then plant them out later."],
    ["soon", "Coming up in the next 6 weeks", "Get seeds or starts ready."]
  ];
  function nowBlock(p, today, base) {
    var all = p.crops.map(function (r) { return { r: r, s: status(r, today) }; });
    var card = function (x) {
      return '<li class="st st-' + x.s.kind + '"><a href="' + cropUrl(x.r.crop.id, p.place.slug, base) + '">' + icon(x.r.crop.id, base, 36) +
        '<span><strong>' + x.r.crop.name + '</strong><span class="st-t">' + x.s.text + '</span></span></a></li>';
    };
    var h = '<div class="now-groups">';
    GROUPS.forEach(function (g) {
      var list = all.filter(function (x) { return x.s.kind === g[0]; });
      if (!list.length && g[0] !== "now") return;
      if (g[0] === "soon") list.sort(function (a, b) { return a.s.wait - b.s.wait; });
      h += '<section class="st-group st-group-' + g[0] + '"><h3><i class="st-dot"></i>' + g[1] + ' <span class="st-n">' + list.length + '</span></h3>';
      h += list.length ? '<ul class="st-list">' + list.map(card).join("") + '</ul>'
        : '<p class="empty">' + (g[0] === "now" ? "Nothing goes in the ground right now. Use the time to plan, order seeds and tend beds." : g[0] === "indoor" ? "No seeds to start indoors right now." : "Nothing new starts in the next six weeks.") + '</p>';
      h += '</section>';
    });
    var later = all.filter(function (x) { return x.s.kind === "later"; }).sort(function (a, b) { return a.s.wait - b.s.wait; });
    if (later.length) h += '<details class="st-later"><summary>Later in the year <span class="st-n">' + later.length + '</span></summary><ul class="st-list">' + later.map(card).join("") + '</ul></details>';
    return h + '</div>';
  }

  var API = { icon: icon, cropUrl: cropUrl, soft: soft, softRange: softRange, status: status, frostFacts: frostFacts, frostNote: frostNote, regionNote: regionNote, chart: chart, table: table, nowBlock: nowBlock };
  if (typeof module !== "undefined" && module.exports) module.exports = API; else root.RainlineRender = API;
})(this);
