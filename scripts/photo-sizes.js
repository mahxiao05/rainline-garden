/* Crop sizes for the photos in scripts/photos.js, shared by fetch-photos.js and build.js. */
const SIZES = {
  hero: { w: 1600, h: 600 }, heroSm: { w: 800, h: 300 },
  banner: { w: 1200, h: 500 }, bannerSm: { w: 720, h: 300 },
  thumb: { w: 480, h: 240 },
  inline: { w: 1200, h: 750 }, inlineSm: { w: 720, h: 450 },
  // Full-bleed page headers (plant, category and article pages): a wide crop for screens over 720px
  // and a tall crop for phones, each at 1x and about 2x so high-DPI screens are not upscaled.
  wide: { w: 1600, h: 600 }, wideXl: { w: 2400, h: 900 },
  tall: { w: 720, h: 960, file: "720x960" }, tallXl: { w: 1080, h: 1440, file: "1080x1440" },
  // Plant photo cards (3:2 tiles on plant group pages, Plant now and the planner)
  card: { w: 720, h: 480, file: "720x480" },
  // Square plant cards (Plant now)
  square: { w: 480, h: 480, file: "480x480" }
};
const fileBase = key => key.replace(":", "-");
// File name suffix for a size: its width, or "WxH" where the width alone would clash with another size.
const sizeTag = s => SIZES[s].file || String(SIZES[s].w);
const HEADER = ["wide", "wideXl", "tall", "tallXl"];
// Header sizes only need WebP: every browser that can't show WebP falls back to the banner JPEG.
const formatsFor = s => HEADER.includes(s) || s === "card" || s === "square" ? ["webp"] : ["webp", "jpg"];
const sizesFor = key => key === "hero" ? ["hero", "heroSm", "tall", "tallXl"] : key.startsWith("cat:") ? ["banner", "bannerSm", "thumb", ...HEADER]
  : key.startsWith("inline:") ? ["inline", "inlineSm"] : key.startsWith("crop:") ? ["banner", "bannerSm", "card", "square", ...HEADER] : ["banner", "bannerSm", ...HEADER];
module.exports = { SIZES, fileBase, sizesFor, sizeTag, formatsFor };
