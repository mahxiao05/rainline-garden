/* Rainline Garden header: the Learn menu, the phone menu and site search. */
(function () {
  var doc = document, html = doc.documentElement, base = html.getAttribute("data-base") || "";
  var head = doc.querySelector(".site-head");
  if (!head) return;
  var moreBtn = head.querySelector(".nav-more-btn"), more = doc.getElementById("nav-learn");
  var menuBtn = head.querySelector(".menu-btn"), menu = doc.getElementById("site-menu");
  var searchBtn = head.querySelector(".head-search"), pop = doc.getElementById("search-pop");
  var input = doc.getElementById("search-q"), list = doc.getElementById("search-list"), box = pop && pop.querySelector(".search-box");
  var index = null, loading = null, results = [], active = -1;

  function town() { try { return localStorage.getItem("rainline-place"); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // One open panel at a time.
  var panels = [];
  function panel(btn, el, onOpen) {
    if (!btn || !el) return function () {};
    function set(v) {
      if (v) panels.forEach(function (p) { if (p.el !== el) p.set(false); });
      el.hidden = !v; btn.setAttribute("aria-expanded", String(v)); head.classList.toggle("has-" + el.id, v);
      if (v && onOpen) onOpen();
    }
    panels.push({ el: el, btn: btn, set: set });
    btn.addEventListener("click", function () { set(el.hidden); });
    return set;
  }
  var setMore = panel(moreBtn, more);
  var setMenu = panel(menuBtn, menu, fillTown);
  var chip = head.querySelector(".town-chip"), tpop = doc.getElementById("town-pop");
  var setTown = panel(chip, tpop, fillChip);
  var setSearch = panel(searchBtn, pop, function () { load().then(run); input.value = ""; run(); setTimeout(function () { input.focus(); }, 0); });

  doc.addEventListener("click", function (e) {
    panels.forEach(function (p) { if (!p.el.hidden && !p.el.contains(e.target) && !p.btn.contains(e.target)) p.set(false); });
  });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") panels.forEach(function (p) { if (!p.el.hidden) { p.set(false); p.btn.focus(); } });
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); setSearch(true); }
  });

  function load() {
    if (index) return Promise.resolve();
    if (!loading) loading = new Promise(function (ok, fail) {
      var s = doc.createElement("script"); s.src = base + "assets/search-index.js";
      s.onload = function () { index = window.RainlineSearch || []; ok(); }; s.onerror = fail; doc.head.appendChild(s);
    });
    return loading;
  }

  // Phone menu: a shortcut to your own town's calendar if you've picked one.
  function fillTown() {
    var slug = town(), el = menu.querySelector(".menu-town");
    if (!slug || !el) return;
    load().then(function () {
      var t = index.filter(function (x) { return x.p === slug; })[0];
      if (!t) return;
      el.innerHTML = 'Your town: <a href="' + base + t.u + '">' + esc(t.t) + ' calendar</a>';
      el.hidden = false;
    });
  }

  /* Town chip (wide screens): your saved town, with its calendar and a way to change it. The town's name is kept
   * beside its slug ("slug|Salem, OR") so most pages never need to load the search index just to show it. */
  function townName(slug) { try { var c = (localStorage.getItem("rainline-place-name") || "").split("|"); return c[0] === slug ? c[1] : ""; } catch (e) { return ""; } }
  function fillChip() {
    if (!chip) return;
    var slug = town(), name = slug && townName(slug), label = chip.querySelector(".tc-name");
    function draw(n) {
      label.textContent = n || "Set your town";
      chip.setAttribute("aria-label", n ? "Your town: " + n : "Set your town");
      chip.title = n || "";
      var city = n ? n.replace(/, [A-Z]{2}$/, "") : "";
      tpop.innerHTML = n
        ? '<a href="' + base + 'frost-dates/' + slug + '/"><strong>' + esc(city) + ' calendar</strong><span>Frost dates and planting calendar</span></a>' +
          '<a href="' + base + '?change=1#where"><strong>Change town</strong><span>Type a ZIP code or town</span></a>'
        : '<a href="' + base + '#where"><strong>Set your town</strong><span>Type a ZIP code or town for local dates</span></a>' +
          '<a href="' + base + 'frost-dates/"><strong>Browse town calendars</strong><span>Every town on one map</span></a>';
    }
    if (!slug || name) return draw(name);
    draw("");
    load().then(function () {
      var t = index.filter(function (x) { return x.p === slug; })[0];
      if (!t) return;
      try { localStorage.setItem("rainline-place-name", slug + "|" + t.t); } catch (e) { /* private mode */ }
      draw(t.t);
    });
  }
  // Town pickers elsewhere on the page call this after saving a town, so the chip keeps up.
  window.RainlineHeadTown = fillChip;
  fillChip();
  if (tpop) tpop.parentNode.addEventListener("focusout", function (e) { if (!tpop.parentNode.contains(e.relatedTarget)) setTown(false); });

  /* Search */
  var KIND = { crop: "Plant", town: "Town", group: "Plant group", article: "Article", term: "Glossary", page: "Page" };
  var SUGGEST = ["tomatoes", "garlic", "beginners-guide/", "frost-dates/"];
  function norm(s) { return String(s).toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
  function score(item, q) {
    var t = norm(item.t), words = q.split(" "), sc = 0;
    if (t === q) return 1000;
    if (t.indexOf(q) === 0) sc = 500;
    else if ((" " + t).indexOf(" " + q) >= 0) sc = 300;
    else if (t.indexOf(q) >= 0) sc = 150;
    else if (words.every(function (w) { return (" " + t + " " + norm(item.s)).indexOf(" " + w) >= 0; })) sc = 100;
    else return 0;
    return sc + ({ crop: 40, town: 35, group: 30, page: 25, article: 10, term: 5 }[item.k] || 0) - t.length / 100;
  }
  function href(item) {
    var slug = town();
    // With a town saved, a plant goes straight to its dates for that town.
    return base + (item.k === "crop" && slug ? item.u + slug + "/" : item.u);
  }
  function run() {
    if (!index) { list.innerHTML = ""; return; }
    var q = norm(input.value);
    if (!q) results = SUGGEST.map(function (k) { return index.filter(function (x) { return x.c === k || (x.k === "page" && x.u === k); })[0]; }).filter(Boolean);
    else results = index.map(function (x) { return { x: x, s: score(x, q) }; }).filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; }).slice(0, 8).map(function (r) { return r.x; });
    active = results.length ? 0 : -1;
    list.innerHTML = (!q ? '<li class="search-h" role="presentation">Popular</li>' : "") + (results.length ? results.map(function (x, i) {
      var ico = x.i ? '<img src="' + base + x.i + '" width="28" height="28" alt="">' : '<span class="search-ico search-ico-' + x.k + '" aria-hidden="true"></span>';
      return '<li role="option" id="sr-' + i + '" aria-selected="' + (i === active) + '"><a href="' + href(x) + '" tabindex="-1">' + ico +
        '<span class="search-t">' + esc(x.t) + '<small>' + esc(x.k === "crop" && town() ? "Plant · dates for your town" : x.s) + '</small></span><span class="search-k">' + KIND[x.k] + '</span></a></li>';
    }).join("") : '<li class="search-empty" role="presentation">Nothing matches "' + esc(input.value) + '". Try a plant like <em>kale</em> or a town like <em>Bend</em>.</li>');
    box.setAttribute("aria-expanded", String(results.length > 0));
    input.setAttribute("aria-activedescendant", active >= 0 ? "sr-" + active : "");
  }
  function move(d) {
    if (!results.length) return;
    active = (active + d + results.length) % results.length;
    Array.prototype.forEach.call(list.querySelectorAll("[role=option]"), function (li, i) { li.setAttribute("aria-selected", String(i === active)); if (i === active) li.scrollIntoView({ block: "nearest" }); });
    input.setAttribute("aria-activedescendant", "sr-" + active);
  }
  if (input) {
    input.addEventListener("input", run);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter" && active >= 0) { e.preventDefault(); location.href = href(results[active]); }
    });
    list.addEventListener("mousemove", function (e) {
      var li = e.target.closest("[role=option]"); if (!li) return;
      var i = +li.id.slice(3); if (i !== active) { active = i; move(0); }
    });
    pop.querySelector(".search-close").addEventListener("click", function () { setSearch(false); searchBtn.focus(); });
  }
  // Close the Learn menu when focus leaves it, so keyboard users don't leave it hanging open.
  if (more) more.parentNode.addEventListener("focusout", function (e) { if (!more.parentNode.contains(e.relatedTarget)) setMore(false); });
  addEventListener("resize", function () { if (matchMedia("(min-width: 861px)").matches) setMenu(false); });
})();
