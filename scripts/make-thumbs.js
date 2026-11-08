// Makes 200 x 200 square WebP thumbnails (assets/img/photos/sq-<key>.webp) for every photo in scripts/small-photos.js.
const { execFileSync } = require("child_process"), fs = require("fs"), path = require("path");
const { glossary, pests, CROP } = require("./small-photos.js"), { fileBase } = require("./photo-sizes.js");
const keys = new Set([...Object.values(glossary), ...pests.map(p => p[1])]);
const dir = path.join(__dirname, "../assets/img/photos");
for (const k of keys) {
  const src = path.join(dir, `${fileBase(k)}-1200.jpg`), out = path.join(dir, `sq-${fileBase(k)}.webp`);
  const [cx, cy, zoom] = CROP[k] || [0.5, 0.5, 1];
  const [w, h] = execFileSync("identify", ["-format", "%w %h", src]).toString().split(" ").map(Number);
  const side = Math.round(h / (zoom || 1)), x = Math.max(0, Math.min(w - side, Math.round(cx * w - side / 2))), y = Math.max(0, Math.min(h - side, Math.round(cy * h - side / 2)));
  execFileSync("convert", [src, "-crop", `${side}x${side}+${x}+${y}`, "+repage", "-resize", "200x200", "-strip", "-quality", "78", out]);
  console.log(out, fs.statSync(out).size);
}
