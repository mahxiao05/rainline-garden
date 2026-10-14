/* Rainline Garden "My garden plan" page: pick a town and plants, get a dated to-do list,
 * a plant cheat sheet and notes. Saved in this browser (localStorage); printable; exports .ics.
 */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan, R = window.RainlineRender, H = window.RainlineHelperData;
  var KEY = "rainline-garden-plan";
  var base = document.documentElement.getAttribute("data-base") || "";
  var form = document.getElementById("gp-form");
  if (!form) return;
  var zip = document.getElementById("gp-zip"), sel = document.getElementById("gp-place"), msg = document.getElementById("gp-msg");
  var out = document.getElementById("gp-out"), pick = document.getElementById("gp-pick");

  var MONTHS = P.MONTHS_LONG, DAY = 864e5;
  var HOW = { "Plant seeds in the ground": "from seed", "Plant seeds or young plants": "from seed or as starts", "Plant small onion bulbs (sets)": "as sets",
    "Plant young plants (starts)": "as starts", "Plant seed potatoes": "using seed potatoes", "Plant young plants": "as young plants" };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lc(n) { return n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels"); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode: plan still works, just not saved */ } }

  var state = load();
  state.crops = state.crops || []; state.done = state.done || {}; state.cropNotes = state.cropNotes || {}; state.notes = state.notes || "";
  var qs = new URLSearchParams(location.search);
  if (qs.get("place") && P.findPlace(D, qs.get("place"))) state.place = qs.get("place");
  if (qs.get("plants")) state.crops = qs.get("plants").split(",").filter(function (id) { return D.crops.some(function (c) { return c.id === id; }); });
  if (!state.place) { try { state.place = localStorage.getItem("rainline-place") || ""; } catch (e) { /* ignore */ } }

  // Town picker.
  ["OR", "WA"].forEach(function (s) {
    var g = document.createElement("optgroup");
    g.label = s === "OR" ? "Oregon" : "Washington";
    D.places.filter(function (x) { return x.state === s; })
      .sort(function (a, b) { return a.city.localeCompare(b.city); })
      .forEach(function (x) { var o = document.createElement("option"); o.value = x.slug; o.textContent = x.city + ", " + x.state; g.appendChild(o); });
    sel.appendChild(g);
  });

  var now = new Date(); now.setHours(0, 0, 0, 0);
  // Turns a day-of-year into a real date so the list rolls forward 12 months. A job moves to next year only once
  // it ended more than two weeks ago, so a planting window that's open right now stays in this year.
  function realDate(n, endN) {
    var y = now.getFullYear();
    if (new Date(y, 0, endN || n) < new Date(+now - 14 * DAY)) y++;
    return new Date(y, 0, n);
  }
  function short(d) { return MONTHS[d.getMonth()].slice(0, 3) + " " + d.getDate(); }

  function tasks(p) {
    var list = [], warm = [];
    function add(c, kind, doy, endDoy, text) {
      var d = realDate(doy, endDoy), e = endDoy ? new Date(+d + (endDoy - doy) * DAY) : null;
      list.push({ key: (c ? c.id : "all") + ":" + kind + ":" + d.getFullYear(), date: d, end: e, text: text, crop: c, kind: kind });
    }
    p.crops.forEach(function (r) {
      var c = r.crop, name = lc(c.name), g = H.crops[c.id] || {}, spring = null;
      if (state.crops.indexOf(c.id) < 0) return;
      if (c.group === "warm") warm.push(lc(c.name));
      r.windows.forEach(function (w) { if (w.kind === "spring") spring = w; });
      if (r.indoor) add(c, "indoor", r.indoor.start, r.indoor.end, "Start seeds indoors for " + name);
      if (r.indoor && spring) add(c, "harden", spring.start - 7, null, "Start hardening off " + name + " (set seedlings outside a few hours a day)");
      r.windows.forEach(function (w) {
        var how = HOW[c.how] ? " " + HOW[c.how] : "";
        if (w.kind === "spring") add(c, "plant", w.start, w.end, "Plant " + (g.plantText || name + how));
        else if (c.anchor === "garlic") add(c, "plant", w.start, w.end, "Plant " + (g.plantText || name) + " for next year");
        else add(c, "fall", w.start, w.end, "Plant " + name + " again for a fall harvest");
      });
      if (spring && c.days) add(c, "harvest", spring.start + c.days, null, "First harvest of " + name + " is about due");
    });
    var f = p.frost;
    if (warm.length) {
      add(null, "lastfrost", f.spring50, f.spring10, "Typical last frost. Keep covers handy for tender plants until " + P.fmtLong(f.spring10));
      add(null, "firstfrost", f.fall10, f.fall50, "First fall frost is getting close. Harvest " + (warm.length > 3 ? "frost-tender crops" : warm.join(" and ").replace(/ and (?=.* and )/g, ", ")) + " before " + P.fmtLong(f.fall50));
    }
    list.sort(function (a, b) { return a.date - b.date || a.text.localeCompare(b.text); });
    return list;
  }

  function taskLi(t) {
    var done = !!state.done[t.key], soon = t.date - now <= 14 * DAY && (t.end || t.date) >= now;
    return '<li class="gp-task' + (done ? " is-done" : "") + (soon && !done ? " is-soon" : "") + '"><label>' +
      '<input type="checkbox" data-key="' + esc(t.key) + '"' + (done ? " checked" : "") + '>' +
      '<span class="gp-date">' + short(t.date) + (t.end && t.end - t.date > DAY ? "–" + short(t.end) : "") + '</span>' +
      '<span class="gp-text">' + (t.crop ? R.icon(t.crop.id, base, 22) : "") + esc(t.text) + '</span></label></li>';
  }

  function cheat(c) {
    var g = H.crops[c.id] || {};
    var rows = [["Sun", g.sun], ["Spacing", g.spacing], ["Depth", g.depth], ["Harvest", g.harvest], ["Watch for", g.problem]];
    return '<article class="gp-card"><h3>' + R.icon(c.id, base, 32) + '<a href="' + base + 'when-to-plant/' + c.id + '/">' + esc(c.name) + '</a></h3>' +
      '<dl>' + rows.filter(function (r) { return r[1]; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join("") + '</dl>' +
      '<label class="gp-mini">Variety and where I planted it<input type="text" data-crop="' + c.id + '" value="' + esc(state.cropNotes[c.id]) + '" maxlength="140"></label></article>';
  }

  function render() {
    var place = P.findPlace(D, state.place);
    sel.value = place ? place.slug : "";
    Array.prototype.forEach.call(pick.querySelectorAll("input[type=checkbox]"), function (b) { b.checked = state.crops.indexOf(b.value) >= 0; });
    var count = document.getElementById("gp-count");
    if (count) count.textContent = state.crops.length ? state.crops.length + " picked" : "";
    if (!place || !state.crops.length) {
      out.innerHTML = '<p class="empty gp-empty">' + (!place ? "Choose your town" : "Pick at least one plant") + ' to see your plan.</p>';
      return;
    }
    var p = P.plan(D, place), list = tasks(p);
    var chosen = D.crops.filter(function (c) { return state.crops.indexOf(c.id) >= 0; });
    var sub = { place: p.place, station: p.station, zone: p.zone, frost: p.frost, crops: p.crops.filter(function (r) { return state.crops.indexOf(r.crop.id) >= 0; }) };
    var groups = [], cur = null;
    list.forEach(function (t) {
      var label = MONTHS[t.date.getMonth()] + " " + t.date.getFullYear();
      if (!cur || cur.label !== label) { cur = { label: label, items: [] }; groups.push(cur); }
      cur.items.push(t);
    });
    var doneCount = list.filter(function (t) { return state.done[t.key]; }).length;
    var today = P.CUM[now.getMonth()] + Math.min(now.getDate(), now.getMonth() === 1 ? 28 : 31);
    out.innerHTML =
      '<div class="gp-bar"><button type="button" class="btn" data-act="print">Print or save as PDF</button>' +
      '<button type="button" class="btn btn-ghost" data-act="ics">Add dates to my calendar</button>' +
      '<button type="button" class="btn btn-ghost" data-act="link">Copy link to this plan</button>' +
      '<span class="gp-saved" role="status">Saved on this device</span></div>' +
      '<header class="gp-title"><h2>Garden plan for ' + esc(place.city) + ', ' + place.state + '</h2>' +
      '<p>' + chosen.length + ' plants · ' + doneCount + ' of ' + list.length + ' jobs done · made ' + short(now) + ', ' + now.getFullYear() + ' at rainlinegarden.org</p></header>' +
      R.frostFacts(p) +
      '<h2>Your to-do list</h2><p class="station">Tick jobs off as you go. Jobs due in the next two weeks are highlighted. Dates are a guide: check the soil and the forecast too.</p>' +
      groups.map(function (g) { return '<h3 class="gp-month">' + g.label + '</h3><ul class="gp-tasks">' + g.items.map(taskLi).join("") + '</ul>'; }).join("") +
      '<h2>Season at a glance</h2><div class="reveal">' + R.chart(sub, today) + '</div>' +
      '<h2>Plant cheat sheet</h2><div class="gp-cards">' + chosen.map(cheat).join("") + '</div>' +
      '<h2>Notes</h2><label class="sr-only" for="gp-notes">Garden notes</label><textarea id="gp-notes" class="gp-notes" rows="6" placeholder="What did well, what to change next year, where the sun hits...">' + esc(state.notes) + '</textarea>';
  }

  function ics(list, place) {
    function d8(d) { return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0"); }
    function fold(s) { return s.replace(/[\\;,]/g, function (c) { return "\\" + c; }); }
    var stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Rainline Garden//Garden plan//EN", "CALSCALE:GREGORIAN", "X-WR-CALNAME:Garden plan (" + fold(place.city) + ")"];
    list.filter(function (t) { return (t.end || t.date) >= now; }).forEach(function (t) {
      var desc = (t.end && t.end - t.date > DAY ? "Window: " + short(t.date) + " to " + short(t.end) + ". " : "") +
        (t.crop ? "Guide: https://rainlinegarden.org/when-to-plant/" + t.crop.id + "/" + place.slug + "/" : "Rainline Garden plan for " + place.city);
      lines.push("BEGIN:VEVENT", "UID:" + t.key + "-" + place.slug + "@rainlinegarden.org", "DTSTAMP:" + stamp,
        "DTSTART;VALUE=DATE:" + d8(t.date), "DTEND;VALUE=DATE:" + d8(new Date(+t.date + DAY)),
        "SUMMARY:" + fold(t.text), "DESCRIPTION:" + fold(desc), "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" }));
    a.download = "garden-plan-" + place.slug + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
  }

  function flash(text) {
    var s = out.querySelector(".gp-saved"); if (!s) return;
    s.textContent = text; s.classList.add("is-on");
    setTimeout(function () { s.textContent = "Saved on this device"; s.classList.remove("is-on"); }, 2500);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (zip.value.trim()) {
      var r = P.placeForZip(D, zip.value);
      if (r.error) { msg.textContent = r.error; return; }
      state.place = r.place.slug; msg.textContent = "";
    }
    save(); render();
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  sel.addEventListener("change", function () { zip.value = ""; state.place = sel.value; save(); render(); });
  pick.addEventListener("change", function (e) {
    var b = e.target; if (b.type !== "checkbox") return;
    state.crops = state.crops.filter(function (id) { return id !== b.value; });
    if (b.checked) state.crops.push(b.value);
    save(); render();
  });
  out.addEventListener("change", function (e) {
    var t = e.target;
    if (t.dataset.key) {
      if (t.checked) state.done[t.dataset.key] = 1; else delete state.done[t.dataset.key];
      t.closest(".gp-task").classList.toggle("is-done", t.checked);
      save();
    }
  });
  out.addEventListener("input", function (e) {
    var t = e.target;
    if (t.dataset.crop) state.cropNotes[t.dataset.crop] = t.value;
    else if (t.id === "gp-notes") state.notes = t.value;
    else return;
    save();
  });
  out.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]"); if (!b) return;
    var place = P.findPlace(D, state.place);
    if (b.dataset.act === "print") window.print();
    if (b.dataset.act === "ics") { ics(tasks(P.plan(D, place)), place); flash("Calendar file downloaded"); }
    if (b.dataset.act === "link") {
      var url = location.origin + location.pathname + "?place=" + place.slug + "&plants=" + state.crops.join(",");
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { flash("Link copied"); }, function () { prompt("Copy this link:", url); });
      else prompt("Copy this link:", url);
    }
  });
  document.getElementById("gp-clear").addEventListener("click", function () {
    if (!confirm("Clear your plants, ticks and notes?")) return;
    state = { place: state.place, crops: [], done: {}, cropNotes: {}, notes: "" };
    save(); render();
  });

  if (state.place && state.crops.length) pick.open = false;
  render();
})();
