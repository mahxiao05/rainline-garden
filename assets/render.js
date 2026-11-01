/* Rainline Garden HTML renderers. Shared by the browser and the static page builder. */
(function (root) {
  var P = (typeof module !== "undefined" && module.exports) ? require("./plan.js") : root.RainlinePlan;
  var D = (typeof module !== "undefined" && module.exports) ? require("./data.js") : root.RainlineData;

  function pct(n) { return (Math.max(0, Math.min(365, n - 1)) / 365 * 100).toFixed(2) + "%"; }
  function span(a, b) { return "left:" + pct(a) + ";width:" + (Math.max(1, Math.min(365, b) - a) / 365 * 100).toFixed(2) + "%"; }

  // Icons sit beside the plant's name, so they carry alt text for crawlers but stay hidden from screen readers.
  function icon(id, base, size) {
    size = size || 28;
    var c = D.crops.filter(function (x) { return x.id === id; })[0];
    return '<img class="ico" src="' + (base || "") + 'assets/img/crops/' + id + '.webp" width="' + size + '" height="' + size + '" alt="' + (c ? c.name : id) + '" aria-hidden="true" loading="lazy">';
  }
  function cropUrl(id, slug, base) { return (base || "") + 'when-to-plant/' + id + '/?town=' + slug + '#your-town'; }

  function frostFacts(p) {
    var f = p.frost;
    return '<div class="facts">' +
      '<div class="fact"><span class="fact-k">Last spring frost</span><span class="fact-v">' + P.fmtLong(f.spring50) + '</span>' +
      '<span class="fact-s">Typical date. Frost is over by ' + P.fmt(f.spring10) + ' in 9 years out of 10.</span></div>' +
      '<div class="fact"><span class="fact-k">First fall frost</span><span class="fact-v">' + P.fmtLong(f.fall50) + '</span>' +
      '<span class="fact-s">Typical date. Comes as early as ' + P.fmt(f.fall10) + ' in 1 year out of 10.</span></div>' +
      '<div class="fact"><span class="fact-k">Frost-free season</span><span class="fact-v">' + f.season + ' days</span>' +
      '<span class="fact-s">Your growing season for frost-tender crops like tomatoes and squash.</span></div>' +
      '</div>';
  }

  // brief leaves out the general microclimate advice (the frost-dates index says it once for every town).
  function regionNote(p, brief) {
    return '<p class="region"><strong>' + p.zone.name + '.</strong> ' + p.zone.blurb + '</p>' +
      '<p class="station">Frost dates are 1991–2020 NOAA climate normals for ' + p.station.name +
      ' (' + (Math.round(p.station.elev * 3.281 / 10) * 10 || Math.round(p.station.elev * 3.281)).toLocaleString('en-US') + ' ft elevation).' + (brief ? '' : ' Gardens in cold hollows or at higher elevation can frost later in spring and earlier in fall; city gardens and warm, south-facing spots often run a week or so ahead.') +
      (p.place.note ? ' ' + p.place.note : '') + '</p>';
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
    if (r.cover) out.push('<span class="flag' + (r.coverDays > 14 ? ' flag-warn' : '') + '">Frost possible until about ' + P.fmt(r.coverUntil) + ': keep frost cover handy</span>');
    return out.join(" ");
  }

  // Planting dates for every crop, one collapsed table per plant type so 80-odd rows don't make one very long list.
  function table(p, base) {
    var row = function (r) {
      var spring = r.windows.filter(function (w) { return w.kind === "spring"; })[0];
      var fall = r.windows.filter(function (w) { return w.kind === "fall"; })[0];
      return '<tr><th scope="row"><div class="crop-cell">' + icon(r.crop.id, base, 32) + '<div><a href="' + cropUrl(r.crop.id, p.place.slug, base) + '">' + r.crop.name + '</a><span class="how">' + r.crop.how + '</span></div></div></th>' +
        '<td data-label="Start seeds indoors">' + (r.indoor ? P.fmtRange(r.indoor.start, r.indoor.end) : '<span class="none">—</span>') + '</td>' +
        '<td data-label="Plant in the garden">' + (spring ? P.fmtRange(spring.start, spring.end) : '<span class="none">—</span>') + (flags(r) ? '<div>' + flags(r) + '</div>' : '') + '</td>' +
        '<td data-label="Plant again for fall">' + (fall ? P.fmtRange(fall.start, fall.end) : '<span class="none">—</span>') + '</td></tr>';
    };
    var head = '<thead><tr><th scope="col">Crop</th><th scope="col">Start seeds indoors</th><th scope="col">Plant in the garden</th><th scope="col">Plant again for fall</th></tr></thead>';
    return '<div class="area-groups">' + D.categories.map(function (cat) {
      var rows = p.crops.filter(function (r) { return r.crop.cat === cat.id; });
      if (!rows.length) return "";
      return '<details class="area-group"><summary>' + cat.name + ' <span>' + rows.length + (rows.length === 1 ? ' plant' : ' plants') + '</span></summary>' +
        '<div class="table-wrap"><table class="plan">' + head + '<tbody>' + rows.map(row).join("") + '</tbody></table></div></details>';
    }).join("") + '</div>';
  }

  // Town-page planting calendar: one photo tile per plant group, and a card per plant with a small
  // year bar and its dates. Without JavaScript every group shows; the page script turns the tiles
  // into a picker and adds the search and today's marker.
  function calDates(r) {
    var out = [];
    if (r.indoor) out.push('<li><i class="bar-in"></i>Indoors <b>' + P.fmtRange(r.indoor.start, r.indoor.end) + '</b></li>');
    r.windows.forEach(function (w) {
      out.push('<li><i class="bar-' + w.kind + '"></i>' + (w.kind === "fall" ? (r.windows.length > 1 ? "Again for fall" : "Fall") : "Plant") + ' <b>' + P.fmtRange(w.start, w.end) + '</b></li>');
    });
    return out.join("");
  }
  function calFlag(r) {
    if (r.season === "short") return "Short season here: use transplants, a fast variety and row cover.";
    if (r.season === "tight") return "Tight season: choose an early variety.";
    if (r.cover) return "Frost possible until about " + P.fmt(r.coverUntil) + ": keep frost cover handy.";
    return "";
  }
  function calCard(p, r, base) {
    var bars = (r.indoor ? '<i class="bar bar-in" style="' + span(r.indoor.start, r.indoor.end) + '"></i>' : "") +
      r.windows.map(function (w) { return '<i class="bar bar-' + w.kind + '" style="' + span(w.start, w.end) + '"></i>'; }).join("");
    var f = calFlag(r);
    return '<li class="pc-card" data-n="' + r.crop.name + '">' + icon(r.crop.id, base, 44) +
      '<div class="pc-name"><a href="' + cropUrl(r.crop.id, p.place.slug, base) + '">' + r.crop.name + '</a><span>' + r.crop.how + '</span></div>' +
      '<div class="pc-yr" aria-hidden="true"><div class="pc-trk">' + bars + '</div><div class="pc-mo">' +
      P.MONTHS.map(function (m) { return '<span>' + m.charAt(0) + '</span>'; }).join("") + '</div></div>' +
      '<ul class="pc-dates">' + calDates(r) + '</ul>' + (f ? '<p class="pc-flag">' + f + '</p>' : '') + '</li>';
  }
  function townCal(p, base, photo) {
    var f = p.frost;
    var groups = D.categories.map(function (k) {
      return { k: k, rows: p.crops.filter(function (r) { return r.crop.cat === k.id; }) };
    }).filter(function (g) { return g.rows.length; });
    var plants = function (n) { return n + (n === 1 ? " plant" : " plants"); };
    return '<div class="pc-tools" hidden><label class="pc-find" for="pc-q"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>' +
      '<span class="sr">Find a plant</span><input id="pc-q" type="search" autocomplete="off" spellcheck="false" placeholder="Find a plant, like beans or basil"></label>' +
      '<ul class="pc-tabs" aria-label="Plant groups">' + groups.map(function (g, i) {
        var src = photo ? photo(g.k.id) : "";
        return '<li><button type="button" class="pc-tab" data-g="' + g.k.id + '" aria-pressed="' + (i === 0) + '">' +
          (src ? '<img src="' + src + '" width="480" height="240" alt="" loading="lazy" decoding="async">' : "") +
          '<b>' + g.k.name + '</b><small>' + plants(g.rows.length) + '</small></button></li>';
      }).join("") + '</ul></div>' +
      '<div class="pc-frost"><span>Frost</span><div class="pc-ftrk">' +
      '<i class="band frost-hard" style="' + span(1, f.spring50) + '"></i>' +
      '<i class="band frost-risk" style="' + span(f.spring50, f.spring10) + '"></i>' +
      '<i class="band frost-free" style="' + span(f.spring10, Math.min(f.fall10, 366)) + '"></i>' +
      (f.fall10 < 366 ? '<i class="band frost-risk" style="' + span(f.fall10, Math.min(f.fall50, 366)) + '"></i>' : "") +
      (f.fall50 < 366 ? '<i class="band frost-hard" style="' + span(f.fall50, 366) + '"></i>' : "") +
      '</div></div>' +
      groups.map(function (g, i) {
        return '<div class="pc-group' + (i === 0 ? ' is-on' : '') + '" data-g="' + g.k.id + '"><h3 class="pc-gh">' + g.k.name + ' <span>' + plants(g.rows.length) + '</span></h3>' +
          '<ul class="pc-cards">' + g.rows.map(function (r) { return calCard(p, r, base); }).join("") + '</ul></div>';
      }).join("") +
      '<p class="pc-none" role="status" aria-live="polite"></p>' +
      '<ul class="legend pc-legend"><li><i class="key bar-in"></i>Start seeds indoors</li><li><i class="key bar-spring"></i>Plant in the garden</li><li><i class="key bar-fall"></i>Plant again for fall</li>' +
      '<li class="pc-key-now" hidden><i class="key key-today"></i>Today</li><li><i class="key frost-risk"></i>Frost possible</li><li><i class="key frost-hard"></i>Frost likely</li></ul>';
  }
  // Marks today on each card's year bar.
  function calToday(el, today) {
    var cur = -1;
    for (var c = 0; c < 12; c++) if (today > P.CUM[c]) cur = c;
    el.querySelectorAll(".pc-trk").forEach(function (t) {
      if (!t.querySelector(".pc-now")) t.insertAdjacentHTML("beforeend", '<span class="pc-now" style="left:' + pct(today) + '"></span>');
    });
    el.querySelectorAll(".pc-mo").forEach(function (m) { if (m.children[cur]) m.children[cur].className = "is-now"; });
    var k = el.querySelector(".pc-key-now"); if (k) k.hidden = false;
  }

  function nowBlock(p, today, base) {
    var n = P.nowList(p, today);
    // Three empty columns read like a broken page, so say it once and point to the next job.
    if (!n.sow.length && !n.indoor.length && !n.soon.length) {
      var next = nextJob(p, today);
      return '<p class="empty now-none">Nothing to plant or start indoors in ' + p.place.city + ' for the next three weeks.' +
        (next ? ' Next up: ' + next + '.' : '') + ' It\'s a good time to plan, order seeds and tend your beds.</p>';
    }
    var item = function (x, verb) {
      return '<li>' + icon(x.r.crop.id, base) + '<div><a href="' + cropUrl(x.r.crop.id, p.place.slug, base) + '"><strong>' + x.r.crop.name + '</strong></a> <span>' + verb + ' through ' + P.fmt(x.w.end) + '</span></div></li>';
    };
    var h = '<div class="now">';
    h += '<div class="now-col"><h3>Plant in the garden now</h3>';
    h += n.sow.length ? '<ul>' + n.sow.map(function (x) { return item(x, x.r.crop.how); }).join("") + '</ul>'
      : '<p class="empty">Nothing goes in the ground right now. ' + (n.soon.length ? 'Next up: ' + n.soon[0].r.crop.name + ' on ' + P.fmt(n.soon[0].w.start) + '.' : 'Use the time to plan, order seeds and tend beds.') + '</p>';
    h += '</div><div class="now-col"><h3>Start seeds indoors now</h3>';
    h += n.indoor.length ? '<ul>' + n.indoor.map(function (x) { return item(x, "Sow in trays"); }).join("") + '</ul>'
      : '<p class="empty">No seeds to start indoors right now.</p>';
    h += '</div><div class="now-col"><h3>Coming up in the next 3 weeks</h3>';
    h += n.soon.length ? '<ul>' + n.soon.slice(0, 6).map(function (x) {
      return '<li>' + icon(x.r.crop.id, base) + '<div><a href="' + cropUrl(x.r.crop.id, p.place.slug, base) + '"><strong>' + x.r.crop.name + '</strong></a> <span>' + (x.w.kind === "fall" ? "plant for fall" : "plant in the garden") + ' from ' + P.fmt(x.w.start) + '</span></div></li>';
    }).join("") + '</ul>' : '<p class="empty">Nothing new starts in the next three weeks.</p>';
    h += '</div></div>';
    return h;
  }

  // Chance of a frost on day x, from the NOAA 10/50/90% dates. Each side is a straight line between those points,
  // running out to certain frost and to none at the same slope as the nearest step. Winter is covered by both ends.
  function frostChance(f, x) {
    var s90 = f.spring90 != null ? f.spring90 : 2 * f.spring50 - f.spring10;
    var f90 = f.fall90 != null ? f.fall90 : 2 * f.fall50 - f.fall10;
    var line = function (pts, x) {
      if (x <= pts[0][0]) return pts[0][1];
      for (var i = 1; i < pts.length; i++) if (x <= pts[i][0]) {
        var a = pts[i - 1], b = pts[i];
        return b[0] === a[0] ? b[1] : a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
      }
      return pts[pts.length - 1][1];
    };
    var spring = [[s90 - (f.spring50 - s90) / 4, 1], [s90, .9], [f.spring50, .5], [f.spring10, .1], [f.spring10 + (f.spring10 - f.spring50) / 4, 0]];
    var fall = [[f.fall10 - (f.fall50 - f.fall10) / 4, 0], [f.fall10, .1], [f.fall50, .5], [f90, .9], [f90 + (f90 - f.fall50) / 4, 1]];
    return Math.max(line(spring, x), line(fall, x));
  }
  var RISK = [["k1", "Unlikely"], ["k2", "Possible"], ["k3", "Likely"], ["k4", "Very likely"]];

  // Frost being over isn't the same as tomato time: the soil has to warm too. Name the real window so nobody plants on the frost date.
  function tomatoLine(p) {
    var r = (p.crops || []).filter(function (x) { return x.crop.id === "tomatoes"; })[0];
    var w = r && r.windows.filter(function (x) { return x.kind === "spring"; })[0];
    if (!w) return "";
    return '<br>Tomatoes go out <strong>' + P.fmtRange(w.start, w.end) + '</strong>' + (r.cover ? ', under frost cover at first' : ', once the soil is warm');
  }

  // One cell per week, coloured by the chance of frost that week, with today's marker in the browser.
  function frostRisk(p, today) {
    var f = p.frost, h = "";
    for (var w = 0; w < 52; w++) {
      var c = frostChance(f, w * 7 + 4);
      h += '<i class="' + RISK[c >= .9 ? 3 : c >= .5 ? 2 : c >= .1 ? 1 : 0][0] + '"></i>';
    }
    if (today) h += '<b class="risk-today" style="left:' + ((today - .5) / 365 * 100).toFixed(2) + '%"><em>Today</em></b>';
    var months = "";
    for (var m = 0; m < 12; m++) months += '<span style="left:' + (P.CUM[m] / 365 * 100).toFixed(2) + '%">' + P.MONTHS[m] + '</span>';
    return '<div class="risk-head"><h2>Chance of frost through the year</h2>' +
      '<p class="risk-safe">Frost over in 9 years out of 10: <strong>after ' + P.fmt(f.spring10) + '</strong>' + tomatoLine(p) + '</p></div>' +
      '<div class="risk-bar" role="img" aria-label="Chance of frost by week in ' + p.place.city + ': likely until about ' + P.fmt(f.spring50) +
      ', possible until ' + P.fmt(f.spring10) + ', and possible again from ' + P.fmt(f.fall10) + '.">' + h + '</div>' +
      '<div class="risk-months" aria-hidden="true">' + months + '</div>' +
      '<ul class="risk-key">' + RISK.slice().reverse().map(function (k) { return '<li><i class="' + k[0] + '"></i>' + k[1] + '</li>'; }).join("") + '</ul>' +
      '<p class="risk-note">In 9 years out of 10, the last spring frost has passed by ' + P.fmt(f.spring10) +
      ' and the first fall frost holds off until ' + P.fmt(f.fall10) + '.</p>';
  }

  var lc = function (n) { return n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels").replace(/^(oregon|douglas|pacific|asian)/, function (w) { return w[0].toUpperCase() + w.slice(1); }); };
  var listOf = function (xs) { return xs.length < 2 ? xs.join("") : xs.slice(0, -1).join(", ") + " and " + xs[xs.length - 1]; };
  var some = function (xs) {
    var names = xs.map(function (x) { return lc(x.r.crop.name); }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    return names.length > 3 ? names.slice(0, 3).join(", ") + " and " + (names.length - 3) + " more" : listOf(names);
  };

  // The soonest job that hasn't opened yet, for when nothing is in season.
  function nextJob(p, today) {
    var best = null;
    p.crops.forEach(function (r) {
      var s = P.season(r, today);
      if (s.next && (!best || s.next.d < best.d)) best = { r: r, w: s.next.w, kind: s.next.kind, d: s.next.d };
    });
    if (!best) return "";
    return best.kind === "indoor" ? 'start ' + lc(best.r.crop.name) + ' indoors from ' + P.fmt(best.w.start)
      : 'plant ' + lc(best.r.crop.name) + ' from ' + P.fmt(best.w.start);
  }

  // The opening paragraph on a town page, written for today's date: where the town is in its frost year and what to do now.
  function seasonLede(p, today) {
    var f = p.frost, city = p.place.city, x = P.fromDoy(today);
    var tag = (x.d <= 10 ? "Early " : x.d <= 20 ? "Mid " : "Late ") + P.MONTHS_LONG[x.m];
    var t = today;
    var s;
    if (t < f.spring50 - 21) s = 'Frost is still likely in ' + city + '. The last spring frost usually comes around ' + P.fmtLong(f.spring50) + '.';
    else if (t < f.spring50) s = 'The last spring frost is getting close in ' + city + ': usually around ' + P.fmtLong(f.spring50) + ', and over by ' + P.fmtLong(f.spring10) + ' in 9 years out of 10.';
    else if (t < f.spring10) s = 'The typical last frost in ' + city + ' (' + P.fmtLong(f.spring50) + ') has passed, but some years still bring one until about ' + P.fmtLong(f.spring10) + '. Keep cover handy for tender plants.';
    else if (t < f.fall10 - 30) s = 'It\'s the frost-free season in ' + city + '. The first fall frost usually comes around ' + P.fmtLong(f.fall50) + '.';
    else if (t < f.fall10) s = 'Frost is still unlikely in ' + city + ', but the first fall frost is on its way: usually around ' + P.fmtLong(f.fall50) + '.';
    else if (t < f.fall50) s = 'The first fall frost could come any week now in ' + city + '. It usually arrives around ' + P.fmtLong(f.fall50) + '.';
    else s = 'Frost season has started in ' + city + ': the first fall frost usually comes around ' + P.fmtLong(f.fall50) + '. Next spring\'s last frost is around ' + P.fmtLong(f.spring50) + '.';
    var n = P.nowList(p, today), next;
    if (n.sow.length) s += ' Good to plant now: ' + some(n.sow) + '.';
    else if (n.indoor.length) s += ' Start seeds indoors now: ' + some(n.indoor) + '.';
    else if ((next = nextJob(p, today))) s += ' Next up: ' + next + '.';
    return '<span class="season-tag">' + tag + '</span> ' + s;
  }

  var API = { icon: icon, cropUrl: cropUrl, frostFacts: frostFacts, regionNote: regionNote, chart: chart, table: table, townCal: townCal, calToday: calToday, nowBlock: nowBlock,
    frostRisk: frostRisk, seasonLede: seasonLede, nextJob: nextJob };
  if (typeof module !== "undefined" && module.exports) module.exports = API; else root.RainlineRender = API;
})(this);
