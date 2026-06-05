// Optimize photos uploaded through Decap CMS.
//
// When a photographer publishes a photo in Decap, the original file (often a
// multi-MB phone photo) is committed to public/images/uploads/ and referenced
// by a content/portfolio/*.json entry. This script, run by
// .github/workflows/optimize-uploads.yml on every change to that folder:
//
//   1. Converts each non-WebP upload to WebP (quality 80), capping the longest
//      edge at 2000px (huge phone photos shrink dramatically; no upscaling).
//   2. Rewrites any portfolio entry that referenced the original to point at the
//      new .webp file.
//   3. Deletes the original.
//
// It only touches non-WebP files, so re-runs on an already-optimized folder are
// a no-op (this is what stops the workflow's own commit from looping forever).
// Anything sharp can't decode (e.g. HEIC on a runner without libheif) is left
// untouched and logged — we never break an upload.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const UPLOADS_DIR = "public/images/uploads";
const ENTRIES_DIR = "content/portfolio";
const PUBLIC_PREFIX = "/images/uploads/";
const MAX_EDGE = 2000;
const QUALITY = 80;

// Source formats we convert. WebP is intentionally excluded (already optimal).
const CONVERTIBLE = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp"]);

async function convertOne(file) {
  const abs = path.join(UPLOADS_DIR, file);
  const ext = path.extname(file).toLowerCase();
  const outName = path.basename(file, path.extname(file)) + ".webp";
  const outAbs = path.join(UPLOADS_DIR, outName);

  // Don't clobber an existing webp of the same name.
  if (fs.existsSync(outAbs)) {
    console.error(`Skip ${file}: ${outName} already exists`);
    return null;
  }

  await sharp(abs)
    .rotate() // respect EXIF orientation before stripping metadata
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outAbs);

  fs.rmSync(abs);
  console.log(`webp  ${file} -> ${outName}`);
  return { from: PUBLIC_PREFIX + file, to: PUBLIC_PREFIX + outName };
}

// Point every portfolio entry that used an old path at its new .webp path.
function rewriteEntries(mapping) {
  if (!fs.existsSync(ENTRIES_DIR)) return 0;
  let changed = 0;
  for (const file of fs.readdirSync(ENTRIES_DIR)) {
    if (!file.endsWith(".json")) continue;
    const p = path.join(ENTRIES_DIR, file);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(p, "utf8"));
    } catch (err) {
      console.error(`Could not parse ${file}: ${err.message}`);
      throw err; // fail safe — don't half-rewrite entries
    }
    if (typeof data.image === "string" && mapping.has(data.image)) {
      data.image = mapping.get(data.image);
      fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
      console.log(`entry ${file}: image -> ${data.image}`);
      changed++;
    }
  }
  return changed;
}

async function main() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    console.log("No uploads directory; nothing to optimize.");
    return;
  }

  const mapping = new Map();
  for (const file of fs.readdirSync(UPLOADS_DIR)) {
    if (file === ".gitkeep") continue;
    const abs = path.join(UPLOADS_DIR, file);
    if (!fs.statSync(abs).isFile()) continue;
    if (!CONVERTIBLE.has(path.extname(file).toLowerCase())) continue;
    try {
      const result = await convertOne(file);
      if (result) mapping.set(result.from, result.to);
    } catch (err) {
      // Leave the original in place and keep going — never break an upload.
      console.error(`Could not optimize ${file}: ${err.message}`);
    }
  }

  if (mapping.size === 0) {
    console.log("No uploads needed optimizing.");
    return;
  }
  const entriesChanged = rewriteEntries(mapping);
  console.log(`Optimized ${mapping.size} upload(s); rewrote ${entriesChanged} entr(y/ies).`);
}

main();
