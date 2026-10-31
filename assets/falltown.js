/* Fall planting page: the list is built with Portland's dates. This swaps in the visitor's own town
 * (saved or picked here), using the same planting windows as the rest of the site. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan;
  var line = document.querySelector(".town-line"), sel = document.getElementById("fall-town");
  if (!line || !sel || !D || !P) return;
  var items = document.querySelectorAll("[data-fall]");
  P.fillPlaceSelect(sel, D);
  function show(place) {
    var plan = P.plan(D, place);
    sel.value = place.slug;
    Array.prototype.forEach.call(items, function (el) {
      var r = plan.crops.filter(function (x) { return x.crop.id === el.getAttribute("data-fall"); })[0];
      var w = r && r.windows.filter(function (x) { return x.kind === "fall"; })[0];
      el.textContent = w ? el.getAttribute("data-pre") + " " + P.fmtRange(w.start, w.end) + " in " + place.city + "."
        : "No fall planting window in " + place.city + "; the season is too short.";
    });
  }
  var slug = ""; try { slug = localStorage.getItem("rainline-place") || ""; } catch (e) { /* private mode */ }
  var start = (slug && P.findPlace(D, slug)) || P.findPlace(D, "portland-or");
  sel.addEventListener("change", function () {
    var p = P.findPlace(D, sel.value);
    if (!p) return;
    try { localStorage.setItem("rainline-place", p.slug); } catch (e) { /* private mode */ }
    show(p);
  });
  show(start);
  line.hidden = false;
})();
