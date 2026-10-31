/* Plant-type pages: one line saying which plants in this group can go in now, for the visitor's saved town
 * (or Portland), with a town picker so nobody is stuck on Portland's dates. Uses the same planting windows as the rest of the site. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan;
  var el = document.querySelector(".cat-now");
  if (!el || !D || !P) return;
  var slug = ""; try { slug = localStorage.getItem("rainline-place") || ""; } catch (e) { /* private mode */ }
  var place = (slug && P.findPlace(D, slug)) || P.findPlace(D, "portland-or");
  var now = new Date(), today = P.CUM[now.getMonth()] + now.getDate();
  var ids = el.getAttribute("data-crops").split(" ");
  var base = document.documentElement.getAttribute("data-base") || "";
  el.innerHTML = '<label for="cat-town">In season now in</label> <select id="cat-town"></select> <span class="cat-now-out"></span>';
  var sel = el.querySelector("select"), out = el.querySelector(".cat-now-out");
  P.fillPlaceSelect(sel, D);
  function show() {
    var list = P.nowList(P.plan(D, place), today);
    var seen = {}, names = [];
    list.sow.concat(list.indoor).forEach(function (x) {
      var c = x.r.crop;
      if (ids.indexOf(c.id) < 0 || seen[c.id]) return;
      seen[c.id] = true;
      names.push('<a href="' + base + "when-to-plant/" + c.id + '/">' + c.name + "</a>");
    });
    sel.value = place.slug;
    out.innerHTML = names.length ? names.join(", ") + "." : "Nothing from this group goes in right now. See the planting order below.";
  }
  sel.addEventListener("change", function () {
    var p = P.findPlace(D, sel.value);
    if (!p) return;
    place = p;
    try { localStorage.setItem("rainline-place", p.slug); } catch (e) { /* private mode */ }
    show();
  });
  show();
  el.hidden = false;
})();
