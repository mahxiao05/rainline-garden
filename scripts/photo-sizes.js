/* Crop sizes for the photos in scripts/photos.js, shared by fetch-photos.js and build.js. */
const SIZES = {
  hero: { w: 1600, h: 600 }, heroSm: { w: 800, h: 300 },
  banner: { w: 1200, h: 500 }, bannerSm: { w: 720, h: 300 },
  thumb: { w: 480, h: 240 }
};
const fileBase = key => key.replace(":", "-");
const sizesFor = key => key === "hero" ? ["hero", "heroSm"] : key.startsWith("cat:") ? ["banner", "bannerSm", "thumb"] : ["banner", "bannerSm"];
module.exports = { SIZES, fileBase, sizesFor };
