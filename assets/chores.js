/* Monthly chores page: tick jobs off (saved per year on this device), filter by region,
 * mark this month, and show what to plant this month in your own town. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan;
  var list = document.querySelector(".cm-list");
  if (!list) return;
  var base = document.documentElement.getAttribute("data-base") || "";
  var now = new Date(), month = now.getMonth() + 1, year = now.getFullYear();
  var KEY = "rainline-chores-" + year;
  function get(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  var done = {}; try { done = JSON.parse(get(KEY, "{}")) || {}; } catch (e) { done = {}; }
  var slug = get("rainline-place", ""), place = slug && P.findPlace(D, slug);
  var ZONE = { west: "west", coast: "coast", east: "east", inland: "high", high: "high" };

  // This month.
  var cur = list.querySelector('.cm[data-m="' + month + '"]');
  if (cur) cur.classList.add("is-now");
  var tab = document.querySelector('.cm-months a[data-m="' + month + '"]');
  if (tab) {
    tab.classList.add("is-now"); tab.setAttribute("aria-current", "date");
    var strip = tab.parentNode; strip.scrollLeft = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
  }

  // One month at a time so the page isn't a year of lists: the month strip switches months,
  // and "Show all months" lists the whole year again.
  var months = list.querySelectorAll(".cm"), links = document.querySelectorAll(".cm-months a");
  var all = document.createElement("a");
  all.href = "#"; all.className = "cm-all";
  list.parentNode.insertBefore(all, list);
  function showMonth(m) {
    list.classList.toggle("one-month", m > 0);
    Array.prototype.forEach.call(months, function (s) { s.classList.toggle("is-shown", +s.dataset.m === m); });
    Array.prototype.forEach.call(links, function (a) { a.classList.toggle("is-shown", +a.dataset.m === m); });
    all.textContent = m > 0 ? "Show all months" : "Show one month at a time";
  }
  Array.prototype.forEach.call(links, function (a) {
    a.addEventListener("click", function (e) {
      if (!list.classList.contains("one-month")) return;
      e.preventDefault(); showMonth(+a.dataset.m);
      if (history.replaceState) history.replaceState(null, "", a.getAttribute("href"));
    });
  });
  all.addEventListener("click", function (e) {
    e.preventDefault(); showMonth(list.classList.contains("one-month") ? 0 : month);
  });
  var start = location.hash && list.querySelector(".cm" + location.hash.replace(/[^#a-z]/g, ""));
  showMonth(start ? +start.dataset.m : month);
  window.addEventListener("hashchange", function () {
    var s = list.querySelector(".cm" + location.hash.replace(/[^#a-z]/g, ""));
    if (s && list.classList.contains("one-month")) showMonth(+s.dataset.m);
  });

  // Checkboxes and progress.
  function progress(sec) {
    var boxes = sec.querySelectorAll("li:not([hidden]) input"), n = 0;
    Array.prototype.forEach.call(boxes, function (b) { if (b.checked) n++; });
    var el = sec.querySelector(".cm-prog");
    el.textContent = n + " of " + boxes.length + " done";
    el.classList.toggle("is-all", n === boxes.length && n > 0);
  }
  Array.prototype.forEach.call(list.querySelectorAll("input[data-id]"), function (b) {
    b.disabled = false; b.checked = !!done[b.dataset.id];
    b.closest("li").classList.toggle("is-done", b.checked);
  });
  list.addEventListener("change", function (e) {
    var b = e.target; if (!b.dataset.id) return;
    if (b.checked) done[b.dataset.id] = 1; else delete done[b.dataset.id];
    b.closest("li").classList.toggle("is-done", b.checked);
    put(KEY, JSON.stringify(done));
    progress(b.closest(".cm"));
  });

  // Region filter: tagged jobs for other regions are hidden; untagged jobs always show.
  var btns = document.querySelectorAll(".cm-filter button");
  function filter(r) {
    Array.prototype.forEach.call(btns, function (b) { b.setAttribute("aria-pressed", String(b.dataset.region === r)); });
    Array.prototype.forEach.call(list.querySelectorAll("li[data-r]"), function (li) { li.hidden = r !== "all" && li.dataset.r !== r; });
    // A card whose jobs are all for other regions disappears instead of showing an empty box.
    Array.prototype.forEach.call(list.querySelectorAll(".cm-card"), function (c) { c.hidden = !c.querySelector("li:not([hidden])"); });
    Array.prototype.forEach.call(list.querySelectorAll(".cm-region"), function (el) { el.hidden = r !== "all" && el.dataset.r !== r; });
    Array.prototype.forEach.call(list.querySelectorAll(".cm"), progress);
    put("rainline-chores-region", r);
  }
  Array.prototype.forEach.call(btns, function (b) { b.addEventListener("click", function () { filter(b.dataset.region); }); });
  filter(get("rainline-chores-region", place ? ZONE[place.zone] || "all" : "all"));

  // Your town this month.
  if (place) {
    var p = P.plan(D, place), a = P.CUM[month - 1] + 1, z = month < 12 ? P.CUM[month] : 365;
    function overlaps(w) { return w.start <= z && w.end >= a; }
    var out = [], indoor = [];
    p.crops.forEach(function (r) {
      if (r.windows.some(overlaps)) out.push(r.crop);
      if (r.indoor && overlaps(r.indoor)) indoor.push(r.crop);
    });
    function chips(cs) { return cs.map(function (c) { return '<a class="mp-crop" href="' + base + 'when-to-plant/' + c.id + '/?town=' + place.slug + '#your-town"><img class="ico" src="' + base + 'assets/img/crops/' + c.id + '.webp" width="22" height="22" alt="">' + c.name + '</a>'; }).join(""); }
    var el = document.getElementById("cm-mine");
    el.innerHTML = '<div class="cm-mine-head"><h2>' + P.MONTHS_LONG[month - 1] + ' in ' + place.city + '</h2><a href="' + base + 'frost-dates/' + place.slug + '/">Full ' + place.city + ' calendar</a></div>' +
      (out.length ? '<p><span class="cm-k">Plant outside</span>' + chips(out) + '</p>' : '<p class="cm-none">Nothing goes in the ground this month in ' + place.city + '.</p>') +
      (indoor.length ? '<p><span class="cm-k">Start indoors</span>' + chips(indoor) + '</p>' : '') +
      '<p class="station">Typical last frost ' + P.fmtLong(p.frost.spring50) + ', first fall frost ' + P.fmtLong(p.frost.fall50) + '. <a href="' + base + 'my-garden/">Make a garden plan</a> for a dated to-do list.</p>';
    el.hidden = false;
  }
})();
