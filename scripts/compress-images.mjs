// One-off image compression pass (run with: node scripts/compress-images.mjs)
//
// - On-page display images -> WebP q80 (browsers all support it; ~50% smaller).
// - Social/OG image (wedding-hero) -> ALSO kept as a recompressed JPEG, because
//   some link-preview scrapers still don't render WebP reliably.
// Originals remain recoverable via git history.

import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const IMG = path.join(process.cwd(), "public", "images");

// Images that appear on-page and should become WebP (the .jpg is removed).
const TO_WEBP = [
  "about-photo.jpg",
  "commercial.jpg",
  "services-midshot.jpg",
];

async function toWebp(absJpg) {
  const out = absJpg.replace(/\.jpe?g$/i, ".webp");
  await sharp(absJpg).webp({ quality: 80, effort: 6 }).toFile(out);
  await unlink(absJpg);
  return out;
}

async function kb(p) {
  return Math.round((await stat(p)).size / 1024);
}

let before = 0;
let after = 0;

// 1) Standalone on-page images -> WebP
for (const name of TO_WEBP) {
  const abs = path.join(IMG, name);
  before += await kb(abs);
  const out = await toWebp(abs);
  after += await kb(out);
  console.log(`webp  ${name} -> ${path.basename(out)}`);
}

// 2) All portrait gallery images -> WebP
const portraitsDir = path.join(IMG, "portraits");
for (const f of (await readdir(portraitsDir)).filter((f) => /\.jpe?g$/i.test(f))) {
  const abs = path.join(portraitsDir, f);
  before += await kb(abs);
  const out = await toWebp(abs);
  after += await kb(out);
  console.log(`webp  portraits/${f} -> ${path.basename(out)}`);
}

// 3) wedding-hero: keep a recompressed JPEG (for OG/social) AND make a WebP (for display)
const hero = path.join(IMG, "wedding-hero.jpg");
before += await kb(hero);
await sharp(hero).jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toFile(hero + ".tmp");
const { rename } = await import("node:fs/promises");
await rename(hero + ".tmp", hero);
await sharp(hero).webp({ quality: 80, effort: 6 }).toFile(path.join(IMG, "wedding-hero.webp"));
after += await kb(hero);
after += await kb(path.join(IMG, "wedding-hero.webp"));
console.log("jpeg  wedding-hero.jpg (recompressed, for OG) + wedding-hero.webp (for display)");

console.log(`\nUsed-image payload: ${before}KB -> ${after}KB  (saved ${before - after}KB, ${Math.round((1 - after / before) * 100)}%)`);
