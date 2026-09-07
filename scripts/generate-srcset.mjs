// Responsive image variants (run with: node scripts/generate-srcset.mjs)
//
// This is a static export with no image CDN, so `next/image` optimisation is
// unavailable and every <img> ships its full-size file to every device. The
// homepage bento was serving 1333px-wide portraits into 167px slots on mobile
// (8x oversized). This generates smaller siblings so the markup can offer a
// srcset and let the browser pick.
//
// For each source we emit <name>-<width>w.webp next to the original. The
// original file is never modified or deleted, so the largest candidate and
// every existing <img src> keeps working untouched.
//
// Re-running is safe: variants that already exist and are newer than their
// source are skipped.

import sharp from "sharp";
import { stat, readdir } from "node:fs/promises";
import path from "node:path";

const IMG = path.join(process.cwd(), "public", "images");

// Widths worth emitting. Anything >= the source width is skipped, so a 682px
// portrait simply produces fewer variants than a 2000px one.
const WIDTHS = [320, 480, 640, 960, 1280];

// Only images that actually render on a page are worth expanding; the rest
// would just be dead files in the deploy.
const DIRS = ["", "portraits", "uploads"];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function variantsFor(abs) {
  const meta = await sharp(abs).metadata();
  const dir = path.dirname(abs);
  const base = path.basename(abs, ".webp");
  const made = [];

  for (const w of WIDTHS) {
    // No upscaling: a variant is only useful if it is smaller than the source.
    if (w >= meta.width) continue;
    const out = path.join(dir, `${base}-${w}w.webp`);

    if (await exists(out)) {
      const [a, b] = [await stat(out), await stat(abs)];
      if (a.mtimeMs >= b.mtimeMs) {
        made.push(out);
        continue;
      }
    }

    await sharp(abs)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
    made.push(out);
  }
  return made;
}

let total = 0;
for (const d of DIRS) {
  const dir = path.join(IMG, d);
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    continue;
  }

  for (const name of entries) {
    // Skip the variants themselves so re-runs don't cascade.
    if (!name.endsWith(".webp") || /-\d+w\.webp$/.test(name)) continue;
    const abs = path.join(dir, name);
    if (!(await stat(abs)).isFile()) continue;

    const made = await variantsFor(abs);
    if (made.length) {
      total += made.length;
      console.log(`${path.join(d, name)} -> ${made.length} variant(s)`);
    }
  }
}
console.log(`\n${total} variant(s) present.`);
