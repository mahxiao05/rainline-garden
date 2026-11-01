/* The town box used across the site: one field that takes a ZIP code or a town name, lists matching towns as you
 * type, and a "Use my location" link. Once a town is picked or saved, the box can tuck away behind a one-line
 * "Showing ... Change town" note.
 *
 * Markup comes from townBox() in scripts/build.js. Pages without assets/data.js list their towns in the box's
 * data-towns attribute ("slug|City, ST;...") and name the scripts to load for ZIP codes and location in data-lazy,
 * so plant pages stay light until someone types a ZIP.
 *
 * RainlineTownBox(el, { onPick: function (place, viaZip) {} }) returns { collapse(place, html), expand(), say(text) }.
 * place is { slug, city, state } (the full town from assets/data.js when it's loaded).
 */
window.RainlineTownBox = function (root, opts) {
  opts = opts || {};
  var form = root.querySelector("form"), input = root.querySelector("input"), list = root.querySelector(".where-list");
  var msg = root.querySelector(".tbox-msg"), saved = root.querySelector(".tbox-saved"), near = root.querySelector(".tbox-near");
  var D = window.RainlineData, P = window.RainlinePlan;

  function norm(t) { return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
  function townsFrom() {
    if (D) return D.places.map(function (x) { return { slug: x.slug, city: x.city, state: x.state }; });
    return (root.getAttribute("data-towns") || "").split(";").filter(Boolean).map(function (s) {
      var a = s.split("|"), m = a[1].match(/^(.*), ([A-Z]{2})$/);
      return { slug: a[0], city: m ? m[1] : a[1], state: m ? m[2] : "" };
    });
  }
  var towns = townsFrom().map(function (t) { return { t: t, label: t.city + ", " + t.state, key: norm(t.city + " " + t.state), city: norm(t.city) }; });
  function full(t) { return (D && P && P.findPlace(D, t.slug)) || t; }

  // Loads data.js, plan.js and near.js on pages that don't have them yet (only when a ZIP or location needs them).
  var loading = null;
  function needData(done) {
    if (window.RainlineData && window.RainlinePlan) { D = window.RainlineData; P = window.RainlinePlan; return done(); }
    if (!loading) {
      loading = [];
      var srcs = (root.getAttribute("data-lazy") || "").split("|").filter(Boolean), i = 0;
      (function next() {
        if (i >= srcs.length) { D = window.RainlineData; P = window.RainlinePlan; var q = loading; loading = true; q.forEach(function (f) { f(); }); return; }
        var s = document.createElement("script"); s.src = srcs[i++]; s.onload = next;
        s.onerror = function () { say("Something went wrong loading the town list. Pick your town by name instead."); };
        document.head.appendChild(s);
      })();
    }
    if (loading === true) done(); else loading.push(done);
  }

  function say(t) { if (msg) msg.textContent = t || ""; }
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

  var shown = [], active = -1, id = list.id;
  function closeList() { list.hidden = true; list.innerHTML = ""; shown = []; active = -1; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); }
  function paint() {
    list.querySelectorAll("li").forEach(function (li, i) { li.setAttribute("aria-selected", i === active ? "true" : "false"); });
    if (active >= 0) input.setAttribute("aria-activedescendant", id + "-" + active); else input.removeAttribute("aria-activedescendant");
  }
  function openList() {
    var v = input.value.trim();
    shown = /^\d+$/.test(v) ? [] : matches(v).slice(0, 6);
    if (!shown.length) return closeList();
    list.innerHTML = shown.map(function (t, i) { return '<li id="' + id + "-" + i + '" role="option" aria-selected="false">' + t.label + "</li>"; }).join("");
    list.hidden = false; active = -1; input.setAttribute("aria-expanded", "true");
  }
  function go(t, viaZip) { input.value = t.city + ", " + t.state; closeList(); say(""); store(t); if (opts.onPick) opts.onPick(full(t), viaZip); }
  function store(t) {
    try { localStorage.setItem("rainline-place", t.slug); localStorage.setItem("rainline-place-name", t.slug + "|" + t.city + ", " + t.state); } catch (e) { /* private mode */ }
    if (window.RainlineHeadTown) window.RainlineHeadTown();
  }

  input.addEventListener("input", function () { say(""); openList(); });
  input.addEventListener("keydown", function (e) {
    if (list.hidden) return;
    if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % shown.length; paint(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = active <= 0 ? shown.length - 1 : active - 1; paint(); }
    else if (e.key === "Escape") { closeList(); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); go(shown[active].t, false); }
  });
  ["mousedown", "pointerdown"].forEach(function (t) { list.addEventListener(t, function (e) { e.preventDefault(); }); });
  list.addEventListener("click", function (e) { var li = e.target.closest("li"); if (li) go(shown[+li.id.slice(id.length + 1)].t, false); });
  input.addEventListener("blur", function () { setTimeout(closeList, 0); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) { say("Enter a ZIP code or the name of your town."); input.focus(); return; }
    if (/^\d+$/.test(v)) {
      return needData(function () {
        var r = P.placeForZip(D, v);
        if (r.error) { say(r.error); input.focus(); return; }
        go(r.place, true);
      });
    }
    var m = matches(v), exact = m.filter(function (t) { return t.city === norm(v) || t.key === norm(v); });
    var one = exact.length === 1 ? exact[0] : m.length === 1 ? m[0] : m.best;
    if (one) return go(one.t, false);
    if (m.length) { openList(); say("Pick your town from the list."); return; }
    say("We don't have a town called that yet. Try your ZIP code, or pick a nearby town.");
    input.focus();
  });

  // "Use my location": wired straight away when the town data is on the page, otherwise on the first tap.
  function wireNear() {
    if (!window.RainlineNear) return false;
    RainlineNear(near, msg, P.nearPoints(D), function (slug) { var p = P.findPlace(D, slug); go({ slug: p.slug, city: p.city, state: p.state }, false); });
    return true;
  }
  if (near && navigator.geolocation) {
    if (D && P && window.RainlineNear) wireNear();
    else {
      near.hidden = false;
      near.addEventListener("click", function first() {
        near.removeEventListener("click", first);
        needData(function () { if (wireNear()) near.click(); });
      });
    }
  }

  function collapse(place, html) {
    if (!saved) return;
    root.classList.add("is-saved");
    saved.querySelector(".tbox-saved-text").innerHTML = html || 'Showing dates for <strong>' + place.city + ", " + place.state + "</strong>.";
    saved.hidden = false;
  }
  function expand(focus) {
    if (root.classList.contains("is-saved")) input.value = "";
    root.classList.remove("is-saved"); if (saved) saved.hidden = true;
    if (focus !== false) input.focus();
  }
  if (saved) saved.querySelector(".tbox-change").addEventListener("click", function () { expand(); if (opts.onChange) opts.onChange(); });
  return { collapse: collapse, expand: expand, say: say };
};
