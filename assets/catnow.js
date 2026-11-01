/* Plant-type pages: one line saying which plants in this group can go in now, for the visitor's saved town
 * (or Portland until they pick one), with "Change town" opening the shared town box. Uses the same planting
 * windows as the rest of the site. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan;
  var el = document.querySelector(".cat-now"), boxEl = document.getElementById("cat-box");
  if (!el || !boxEl || !D || !P || !window.RainlineTownBox) return;
  var slug = ""; try { slug = localStorage.getItem("rainline-place") || ""; } catch (e) { /* private mode */ }
  var place = (slug && P.findPlace(D, slug)) || P.findPlace(D, "portland-or");
  var now = new Date(), today = P.CUM[now.getMonth()] + now.getDate();
  var ids = el.getAttribute("data-crops").split(" ");
  var base = document.documentElement.getAttribute("data-base") || "";
  var box = RainlineTownBox(boxEl, { onPick: function (p) { place = p; show(); } });
  function show() {
    var list = P.nowList(P.plan(D, place), today);
    var seen = {}, names = [];
    list.sow.concat(list.indoor).forEach(function (x) {
      var c = x.r.crop;
      if (ids.indexOf(c.id) < 0 || seen[c.id]) return;
      seen[c.id] = true;
      names.push('<a href="' + base + "when-to-plant/" + c.id + '/">' + c.name + "</a>");
    });
    box.collapse(place, "In season now in <strong>" + place.city + ", " + place.state + "</strong>: " +
      (names.length ? names.join(", ") + "." : "nothing from this group goes in right now. See the planting order below."));
  }
  show();
})();
