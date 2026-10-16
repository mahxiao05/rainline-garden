/* Crop guide pages: "Your dates" for the town you picked on any page (saved on this device). */
(function () {
  var box = document.querySelector(".my-dates");
  if (!box) return;
  var D = window.RainlineData, P = window.RainlinePlan, R = window.RainlineRender;
  var base = document.documentElement.getAttribute("data-base") || "";
  var id = box.getAttribute("data-crop"), crop = D.crops.filter(function (c) { return c.id === id; })[0];
  if (!crop) return;
  var now = new Date(), today = P.CUM[now.getMonth()] + Math.min(now.getDate(), now.getMonth() === 1 ? 28 : 31);
  function get() { try { return localStorage.getItem("rainline-place"); } catch (e) { return null; } }
  function put(v) { try { localStorage.setItem("rainline-place", v); } catch (e) { /* private mode */ } }
  function lc(n) { return n === "Swiss chard" ? n : n.toLowerCase().replace(/^brussels/, "Brussels"); }
  function picker() {
    var h = '<label for="md-place">Your town</label> <select id="md-place"><option value="">Choose a town</option>';
    ["OR", "WA"].forEach(function (s) {
      h += '<optgroup label="' + (s === "OR" ? "Oregon" : "Washington") + '">' + D.places.filter(function (x) { return x.state === s; })
        .sort(function (a, b) { return a.city.localeCompare(b.city); })
        .map(function (x) { return '<option value="' + x.slug + '">' + x.city + ', ' + x.state + '</option>'; }).join("") + '</optgroup>';
    });
    return h + '</select>';
  }
  function show() {
    var place = P.findPlace(D, get());
    if (!place) {
      box.innerHTML = '<p class="md-ask"><strong>See your own dates.</strong> ' + picker() + '</p>';
    } else {
      var p = P.plan(D, place), r = p.crops.filter(function (x) { return x.crop.id === id; })[0], s = R.status(r, today);
      var jobs = [];
      if (r.indoor) jobs.push("start indoors " + P.fmtRange(r.indoor.start, r.indoor.end));
      r.windows.forEach(function (w) { jobs.push((w.kind === "fall" ? (r.windows.length > 1 ? "plant again for fall " : "plant ") : "plant outside ") + P.fmtRange(w.start, w.end)); });
      box.innerHTML = '<div class="md-head"><span class="st-dot md-' + s.kind + '"></span><div><p class="md-k">Your dates in ' + place.city + ', ' + place.state + '</p>' +
        '<p class="md-v">' + (s.kind === "later" ? "Next: " + s.text.charAt(0).toLowerCase() + s.text.slice(1) : s.text) + '</p><p class="md-j">' + jobs.join(" · ").replace(/^./, function (c) { return c.toUpperCase(); }) + '</p></div></div>' +
        '<p class="md-links"><a class="btn" href="' + base + 'my-garden/?add=' + id + '&amp;place=' + place.slug + '">Add ' + lc(crop.name) + ' to my garden plan</a>' +
        '<a href="' + R.cropUrl(id, place.slug, base) + '">Full guide for ' + place.city + '</a>' +
        '<button type="button" class="linkish md-change">Change town</button></p>';
    }
    box.hidden = false;
    var sel = box.querySelector("select");
    if (sel) sel.addEventListener("change", function () { if (sel.value) { put(sel.value); show(); } });
    var ch = box.querySelector(".md-change");
    if (ch) ch.addEventListener("click", function () { box.innerHTML = '<p class="md-ask">' + picker() + '</p>'; var s2 = box.querySelector("select"); s2.value = get() || ""; s2.focus(); s2.addEventListener("change", function () { if (s2.value) { put(s2.value); show(); } }); });
  }
  show();
})();
