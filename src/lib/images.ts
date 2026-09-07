/**
 * Responsive image helpers.
 *
 * This site is a static export with no image CDN, so `next/image` optimisation
 * is unavailable and a plain <img> ships its full-size file to every device.
 * `scripts/generate-srcset.mjs` writes smaller siblings next to each source as
 * `<name>-<width>w.webp`; this builds the matching srcset string.
 *
 * The widths here must stay in sync with WIDTHS in that script.
 */

const VARIANT_WIDTHS = [320, 480, 640, 960, 1280];

/**
 * Build a srcset for an image that has generated variants.
 *
 * `naturalWidth` is the source width: variants are only generated below it, so
 * passing it keeps us from advertising files that were never written. The
 * original is always included as the largest candidate.
 */
export function srcSet(src: string, naturalWidth: number): string {
  const base = src.replace(/\.webp$/, "");
  const candidates = VARIANT_WIDTHS.filter((w) => w < naturalWidth).map(
    (w) => `${base}-${w}w.webp ${w}w`,
  );
  return [...candidates, `${src} ${naturalWidth}w`].join(", ");
}
