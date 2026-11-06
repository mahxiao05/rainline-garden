/* When to plant: tap a plant-type tile to open its plant list under that row. */
(function () {
  var grid = document.querySelector(".cat-tiles-drop");
  if (!grid) return;
  var tiles = [].slice.call(grid.querySelectorAll(".cat-tile[data-drop]"));
  var open = null;
  tiles.forEach(function (a, i) {
    a.setAttribute("aria-expanded", "false");
    a.parentNode.style.order = i * 2;
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      toggle(a);
    });
  });
  // Put the open list straight after the last tile in the tapped tile's row.
  function place() {
    if (!open) return;
    var d = document.getElementById(open.getAttribute("data-drop"));
    d.hidden = true; // measure the rows without the open list in the way
    var top = open.parentNode.offsetTop, last = 0;
    tiles.forEach(function (t, i) { if (Math.abs(t.parentNode.offsetTop - top) < 4) last = i; });
    d.style.order = last * 2 + 1;
    d.hidden = false;
  }
  function toggle(a) {
    var was = open;
    if (open) {
      open.setAttribute("aria-expanded", "false");
      document.getElementById(open.getAttribute("data-drop")).hidden = true;
      open = null;
    }
    if (was === a) return;
    var d = document.getElementById(a.getAttribute("data-drop"));
    a.setAttribute("aria-expanded", "true");
    open = a;
    place();
    var r = d.getBoundingClientRect();
    if (r.bottom > window.innerHeight) window.scrollBy({ top: Math.min(r.bottom - window.innerHeight + 16, a.getBoundingClientRect().top - 80), behavior: "smooth" });
  }
  grid.addEventListener("catdrop:close", function () { if (open) toggle(open); });
  window.addEventListener("resize", place);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) { var a = open; toggle(a); a.focus(); } });
})();
