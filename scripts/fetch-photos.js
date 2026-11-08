#!/usr/bin/env node
/* Downloads every photo in scripts/photos.js and writes web-sized WebP and JPEG crops to assets/img/photos/,
 * plus a round WebP icon for each crop photo in assets/img/crops/.
 * Needs curl and ImageMagick (`convert`). Existing outputs are skipped; pass --force to redo them.
 * Usage: node scripts/fetch-photos.js [--force] */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const PHOTOS = require("./photos.js");
const FOCUS = require("./photo-focus.js");
// PHOTO_CACHE=<dir>: reuse already-downloaded sources saved there as <src with : as _>.jpg instead of downloading again.
const CACHE = process.env.PHOTO_CACHE;
// PHOTO_ONLY=<prefix>: only redo photos whose key starts with it (e.g. "crop:").
const ONLY = process.env.PHOTO_ONLY || "";
const { SIZES, fileBase, sizesFor, sizeTag, formatsFor } = require("./photo-sizes.js");

const OUT = path.join(__dirname, "..", "assets/img/photos");
const force = process.argv.includes("--force");
fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rainline-photos-"));

function sourceUrl(src) {
  const [site, id] = src.split(":");
  // "pexels:<id>.png" for the few newer Pexels photos stored as PNG.
  if (site === "pexels") { const [n, ext = "jpeg"] = id.split("."); return `https://images.pexels.com/photos/${n}/pexels-photo-${n}.${ext}?auto=compress&cs=tinysrgb&w=3200`; }
  if (site === "unsplash") return `https://images.unsplash.com/photo-${id}?w=3200&q=90&fm=jpg`;
  throw new Error(`Unknown photo source ${src}`);
}

const downloaded = {};
function fetchSrc(src) {
  if (downloaded[src]) return;
  const cached = CACHE && path.join(CACHE, src.replace(/[^a-z0-9-]/gi, "_") + ".jpg");
  if (cached && fs.existsSync(cached)) { downloaded[src] = cached; return; }
  downloaded[src] = path.join(tmp, src.replace(/[^a-z0-9-]/gi, "_") + ".jpg");
  execFileSync("curl", ["-sSfL", "--retry", "3", "-o", downloaded[src], sourceUrl(src)]);
}
// The plant's spot in a crop photo (scripts/photo-focus.js): the biggest w x h cut that the photo allows, centered as
// near that spot as the edges let it, then scaled to size.
const focusOf = key => key.startsWith("crop:") && FOCUS[key.slice(5)];
function focusCut(sw, sh, f, w, h) {
  let cw = sw, ch = Math.round(sw * h / w);
  if (ch > sh) { ch = sh; cw = Math.round(sh * w / h); }
  const x = Math.round(Math.min(Math.max(f[0] * sw - cw / 2, 0), sw - cw)), y = Math.round(Math.min(Math.max(f[1] * sh - ch / 2, 0), sh - ch));
  return ["-crop", `${cw}x${ch}+${x}+${y}`, "+repage", "-resize", `${w}x${h}!`];
}
for (const [key, p] of Object.entries(PHOTOS)) {
  if (!key.startsWith(ONLY)) continue;
  const base = fileBase(key);
  // Only missing files are written (all of them with --force), so adding a size leaves existing files untouched.
  const outputs = sizesFor(key).flatMap(s => formatsFor(s).map(ext => [s, path.join(OUT, `${base}-${sizeTag(s)}.${ext}`)]))
    .filter(([, f]) => force || !fs.existsSync(f));
  if (!outputs.length) continue;
  fetchSrc(p.src);
  const [sw, sh] = execFileSync("convert", [downloaded[p.src], "-auto-orient", "-format", "%w %h", "info:"]).toString().split(" ").map(Number);
  const f = focusOf(key);
  for (const [s, file] of outputs) {
    const { w, h } = SIZES[s];
    if (Math.max(w / sw, h / sh) > 1) console.warn(`  ${base}: source ${sw}x${sh} is upscaled for ${w}x${h}`);
    // Tall phone crops can use their own gravity (tallFocus) when the subject sits off-center.
    const gravity = (s === "tall" || s === "tallXl") && p.tallFocus || p.focus || "Center";
    // Header crops fill the whole screen width, so they get a higher WebP quality than the small cards.
    const q = s.startsWith("wide") || s.startsWith("tall") ? "80" : "72";
    const fmt = file.endsWith(".webp") ? ["-quality", q, "-define", "webp:method=6"] : ["-quality", "78", "-interlace", "Plane", "-sampling-factor", "4:2:0"];
    // tallX (0-100) centers the tall phone crop on that point across the source width, for subjects that sit off-center.
    const tallX = (s === "tall" || s === "tallXl") && typeof p.tallX === "number" ? p.tallX : null;
    const fit = f ? focusCut(sw, sh, f, w, h) : tallX === null ? ["-resize", `${w}x${h}^`, "-gravity", gravity, "-extent", `${w}x${h}`]
      : ["-resize", `${w}x${h}^`, "-gravity", "NorthWest", "-crop", `${w}x${h}+${Math.round(Math.min(Math.max(sw * h / sh * tallX / 100 - w / 2, 0), Math.max(sw * h / sh - w, 0)))}+0`, "+repage"];
    execFileSync("convert", [downloaded[p.src], "-auto-orient", ...fit,
      "-colorspace", "sRGB", "-strip", ...fmt, file]);
  }
  console.log(`${base}: ${outputs.map(([, f]) => Math.round(fs.statSync(f).size / 1024) + "K").join(" ")}`);
}

// Plant icons: every "crop:<id>" photo is also cut into a round 192px WebP at assets/img/crops/<id>.webp.
const ICONS = path.join(__dirname, "..", "assets/img/crops");
for (const [key, p] of Object.entries(PHOTOS)) {
  // drawnIcon: the photo is too dark or busy at icon size, so the drawn icon (assets/img/crops/<id>.svg) stays.
  if (!key.startsWith("crop:") || !key.startsWith(ONLY) || p.drawnIcon) continue;
  const file = path.join(ICONS, key.slice(5) + ".webp");
  if (!force && fs.existsSync(file)) continue;
  fetchSrc(p.src);
  const f = focusOf(key);
  let cut = ["-resize", "192x192^", "-gravity", p.iconFocus || p.focus || "Center", "-extent", "192x192"];
  if (f) {
    const [sw, sh] = execFileSync("convert", [downloaded[p.src], "-auto-orient", "-format", "%w %h", "info:"]).toString().split(" ").map(Number);
    const side = Math.round(Math.min(sw, sh) * f[2]);
    const x = Math.round(Math.min(Math.max(f[0] * sw - side / 2, 0), sw - side)), y = Math.round(Math.min(Math.max(f[1] * sh - side / 2, 0), sh - side));
    cut = ["-crop", `${side}x${side}+${x}+${y}`, "+repage", "-resize", "192x192!"];
  }
  execFileSync("convert", [downloaded[p.src], "-auto-orient", ...cut,
    "-colorspace", "sRGB", "-alpha", "set", "(", "+clone", "-alpha", "transparent", "-fill", "white", "-draw", "circle 96,96 96,2", ")",
    "-compose", "DstIn", "-composite", "-strip", "-quality", "80", "-define", "webp:method=6", file]);
  console.log(`icon ${key.slice(5)}: ${Math.round(fs.statSync(file).size / 1024)}K`);
}
fs.rmSync(tmp, { recursive: true, force: true });
