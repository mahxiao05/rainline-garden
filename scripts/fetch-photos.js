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
const { SIZES, fileBase, sizesFor } = require("./photo-sizes.js");

const OUT = path.join(__dirname, "..", "assets/img/photos");
const force = process.argv.includes("--force");
fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rainline-photos-"));

function sourceUrl(src) {
  const [site, id] = src.split(":");
  if (site === "pexels") return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2000`;
  if (site === "unsplash") return `https://images.unsplash.com/photo-${id}?w=2000&q=90&fm=jpg`;
  throw new Error(`Unknown photo source ${src}`);
}

const downloaded = {};
for (const [key, p] of Object.entries(PHOTOS)) {
  const base = fileBase(key);
  const outputs = sizesFor(key).flatMap(s => ["webp", "jpg"].map(ext => [s, path.join(OUT, `${base}-${SIZES[s].w}.${ext}`)]));
  if (!force && outputs.every(([, f]) => fs.existsSync(f))) continue;
  if (!downloaded[p.src]) {
    downloaded[p.src] = path.join(tmp, p.src.replace(/[^a-z0-9-]/gi, "_") + ".jpg");
    execFileSync("curl", ["-sSfL", "--retry", "3", "-o", downloaded[p.src], sourceUrl(p.src)]);
  }
  for (const [s, file] of outputs) {
    const { w, h } = SIZES[s];
    const fmt = file.endsWith(".webp") ? ["-quality", "72", "-define", "webp:method=6"] : ["-quality", "78", "-interlace", "Plane", "-sampling-factor", "4:2:0"];
    execFileSync("convert", [downloaded[p.src], "-auto-orient", "-resize", `${w}x${h}^`, "-gravity", p.focus || "Center", "-extent", `${w}x${h}`,
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
