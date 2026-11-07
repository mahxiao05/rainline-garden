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
const { SIZES, fileBase, sizesFor, sizeTag, formatsFor } = require("./photo-sizes.js");

const OUT = path.join(__dirname, "..", "assets/img/photos");
const force = process.argv.includes("--force");
fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rainline-photos-"));

function sourceUrl(src) {
  const [site, id] = src.split(":");
  if (site === "pexels") return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=3200`;
  if (site === "unsplash") return `https://images.unsplash.com/photo-${id}?w=3200&q=90&fm=jpg`;
  throw new Error(`Unknown photo source ${src}`);
}

const downloaded = {};
for (const [key, p] of Object.entries(PHOTOS)) {
  const base = fileBase(key);
  // Only missing files are written (all of them with --force), so adding a size leaves existing files untouched.
  const outputs = sizesFor(key).flatMap(s => formatsFor(s).map(ext => [s, path.join(OUT, `${base}-${sizeTag(s)}.${ext}`)]))
    .filter(([, f]) => force || !fs.existsSync(f));
  if (!outputs.length) continue;
  if (!downloaded[p.src]) {
    downloaded[p.src] = path.join(tmp, p.src.replace(/[^a-z0-9-]/gi, "_") + ".jpg");
    execFileSync("curl", ["-sSfL", "--retry", "3", "-o", downloaded[p.src], sourceUrl(p.src)]);
  }
  const [sw, sh] = execFileSync("identify", ["-format", "%w %h", downloaded[p.src]]).toString().split(" ").map(Number);
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
    const fit = tallX === null ? ["-resize", `${w}x${h}^`, "-gravity", gravity, "-extent", `${w}x${h}`]
      : ["-resize", `${w}x${h}^`, "-gravity", "NorthWest", "-crop", `${w}x${h}+${Math.round(Math.min(Math.max(sw * h / sh * tallX / 100 - w / 2, 0), Math.max(sw * h / sh - w, 0)))}+0`, "+repage"];
    execFileSync("convert", [downloaded[p.src], "-auto-orient", ...fit,
      "-colorspace", "sRGB", "-strip", ...fmt, file]);
  }
  console.log(`${base}: ${outputs.map(([, f]) => Math.round(fs.statSync(f).size / 1024) + "K").join(" ")}`);
}

// Plant icons: every "crop:<id>" photo is also cut into a round 192px WebP at assets/img/crops/<id>.webp.
const ICONS = path.join(__dirname, "..", "assets/img/crops");
for (const [key, p] of Object.entries(PHOTOS)) {
  if (!key.startsWith("crop:")) continue;
  const file = path.join(ICONS, key.slice(5) + ".webp");
  if (!force && fs.existsSync(file)) continue;
  if (!downloaded[p.src]) {
    downloaded[p.src] = path.join(tmp, p.src.replace(/[^a-z0-9-]/gi, "_") + ".jpg");
    execFileSync("curl", ["-sSfL", "--retry", "3", "-o", downloaded[p.src], sourceUrl(p.src)]);
  }
  execFileSync("convert", [downloaded[p.src], "-auto-orient", "-resize", "192x192^", "-gravity", p.iconFocus || p.focus || "Center", "-extent", "192x192",
    "-colorspace", "sRGB", "-alpha", "set", "(", "+clone", "-alpha", "transparent", "-fill", "white", "-draw", "circle 96,96 96,2", ")",
    "-compose", "DstIn", "-composite", "-strip", "-quality", "80", "-define", "webp:method=6", file]);
  console.log(`icon ${key.slice(5)}: ${Math.round(fs.statSync(file).size / 1024)}K`);
}
fs.rmSync(tmp, { recursive: true, force: true });
