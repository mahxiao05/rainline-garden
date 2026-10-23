/* "Use my location": finds the nearest town in the browser. The location never leaves the page.
 * RainlineNear(button, out, points, found): points are [slug, lat, lon, lat, lon...]; found(slug) runs with the nearest town. */
window.RainlineNear = function (b, out, T, found) {
  if (!b || !navigator.geolocation) return;
  b.hidden = false;
  var hides = out.hidden;
  function km(a, o, c, p) { var r = Math.PI / 180, x = (p - o) * r * Math.cos((a + c) / 2 * r), y = (c - a) * r; return 6371 * Math.sqrt(x * x + y * y); }
  function done(text) { b.disabled = false; b.textContent = "Use my location"; if (text) { out.textContent = text; out.hidden = false; } }
  b.addEventListener("click", function () {
    b.disabled = true; b.textContent = "Finding you…"; out.textContent = ""; if (hides) out.hidden = true;
    navigator.geolocation.getCurrentPosition(function (pos) {
      var la = pos.coords.latitude, lo = pos.coords.longitude, best = null, bd = 1 / 0;
      T.forEach(function (t) { for (var i = 1; i < t.length; i += 2) { var d = km(la, lo, t[i], t[i + 1]); if (d < bd) { bd = d; best = t[0]; } } });
      if (bd > 150) return done("That looks like it's outside Oregon and Washington, so we don't have a town near you yet.");
      done(); found(best);
    }, function (err) {
      done(err.code === 1
        ? "Location is turned off for this site. Allow it in your browser or phone settings, or pick your town instead."
        : "We couldn't get your location just now. Try again, or pick your town instead.");
    }, { timeout: 15000, maximumAge: 600000 });
  });
};
