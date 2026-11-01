/* Map projection for the Town calendars map: an Albers equal-area conic (standard parallels 42.5 and 47.5, centered on
 * 45N 118W), scaled so Oregon, Washington and Idaho fill a 640-wide grid. xy(lat, lon) returns [x, y] in that grid. */
const rad = Math.PI / 180, p1 = 42.5 * rad, p2 = 47.5 * rad, l0 = -118 * rad, f0 = 45 * rad;
const n = (Math.sin(p1) + Math.sin(p2)) / 2, C = Math.cos(p1) ** 2 + 2 * n * Math.sin(p1), r0 = Math.sqrt(C - 2 * n * Math.sin(f0)) / n;
const W = 640, H = 462, PAD = 8, MIN_X = -0.08376726560478753, MAX_Y = 0.07169500318217081, S = 3589.013750308725;
function xy(lat, lon) {
  const r = Math.sqrt(C - 2 * n * Math.sin(lat * rad)) / n, t = n * (lon * rad - l0);
  const x = r * Math.sin(t), y = r0 - r * Math.cos(t);
  return [+(PAD + (x - MIN_X) * S).toFixed(1), +(PAD + (MAX_Y - y) * S).toFixed(1)];
}
module.exports = { W, H, xy };
