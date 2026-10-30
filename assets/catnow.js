/* Plant-type pages: one line saying which plants in this group can go in now, for the visitor's saved town
 * (or Portland). Uses the same planting windows as the rest of the site. */
(function () {
  var D = window.RainlineData, P = window.RainlinePlan;
  var el = document.querySelector(".cat-now");
  if (!el || !D || !P) return;
  var slug = ""; try { slug = localStorage.getItem("rainline-place") || ""; } catch (e) { /* private mode */ }
  var place = (slug && P.findPlace(D, slug)) || P.findPlace(D, "portland-or");
  var now = new Date(), today = P.CUM[now.getMonth()] + now.getDate();
  var ids = el.getAttribute("data-crops").split(" ");
  var base = document.documentElement.getAttribute("data-base") || "";
  var list = P.nowList(P.plan(D, place), today);
  var seen = {}, names = [];
  list.sow.concat(list.indoor).forEach(function (x) {
    var c = x.r.crop;
    if (ids.indexOf(c.id) < 0 || seen[c.id]) return;
    seen[c.id] = true;
    names.push('<a href="' + base + "when-to-plant/" + c.id + '/">' + c.name + "</a>");
  });
  var where = place.city + ", " + place.state;
  el.innerHTML = names.length
    ? "<strong>In season now in " + where + ":</strong> " + names.join(", ") + "."
    : "<strong>Nothing from this group goes in right now in " + where + ".</strong> See the planting order below.";
  el.hidden = false;
})();
