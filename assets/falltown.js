/* Fall planting page: the list is built with Portland's dates. This swaps in the visitor's own town
 * (saved, or picked with the shared town box), using the same planting windows as the rest of the site. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan;
  var boxEl = document.getElementById("fall-box");
  if (!boxEl || !D || !P || !window.RainlineTownBox) return;
  var items = document.querySelectorAll("[data-fall]");
  var box = RainlineTownBox(boxEl, { onPick: show });
  function show(place) {
    var plan = P.plan(D, place);
    Array.prototype.forEach.call(items, function (el) {
      var r = plan.crops.filter(function (x) { return x.crop.id === el.getAttribute("data-fall"); })[0];
      var w = r && r.windows.filter(function (x) { return x.kind === "fall"; })[0];
      el.textContent = w ? el.getAttribute("data-pre") + " " + P.fmtRange(w.start, w.end) + " in " + place.city + "."
        : "No fall planting window in " + place.city + "; the season is too short.";
    });
    box.collapse(place, "Dates below are for <strong>" + place.city + ", " + place.state + "</strong>.");
  }
  var slug = ""; try { slug = localStorage.getItem("rainline-place") || ""; } catch (e) { /* private mode */ }
  show((slug && P.findPlace(D, slug)) || P.findPlace(D, "portland-or"));
})();
