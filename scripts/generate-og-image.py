#!/usr/bin/env python3
"""
Generate the branded 1200x630 Open Graph share image.

Composites the business name / tagline / URL over a real wedding photo with a
dark bottom gradient for legibility. Output: public/images/og-image.jpg (JPEG,
kept as JPEG because some link-preview scrapers render WebP unreliably).

Run: python3 scripts/generate-og-image.py
Fonts (Playfair Display + Inter, OFL) are fetched to /tmp/ogfonts if missing.
"""

import os
import urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "images", "wedding-hero.jpg")
OUT = os.path.join(ROOT, "public", "images", "og-image.jpg")

FONT_DIR = "/tmp/ogfonts"
FONTS = {
    "PlayfairDisplay.ttf": "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf",
    "Inter.ttf": "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf",
}


def ensure_fonts():
    os.makedirs(FONT_DIR, exist_ok=True)
    for name, url in FONTS.items():
        p = os.path.join(FONT_DIR, name)
        if not os.path.exists(p):
            urllib.request.urlretrieve(url, p)
    return FONT_DIR


def cover(img, w, h):
    """Scale + center-crop to exactly w x h (CSS object-fit: cover)."""
    img_orig_w = img.width
    src_ratio = img.width / img.height
    if src_ratio > w / h:
        new_h = h
        new_w = round(h * src_ratio)
    else:
        new_w = w
        new_h = round(w / src_ratio)
    img = img.resize((new_w, new_h), Image.LANCZOS)
    # The site's source is only 1024px wide, so reaching 1200px means a mild
    # upscale that softens detail. An unsharp mask restores apparent crispness.
    if new_w > img_orig_w:
        img = img.filter(ImageFilter.UnsharpMask(radius=2.2, percent=140, threshold=2))
    left = (new_w - w) // 2
    top = (new_h - h) // 2
    return img.crop((left, top, left + w, top + h))


def main():
    fdir = ensure_fonts()
    base = cover(Image.open(SRC).convert("RGB"), W, H)

    # Slight overall darken so white text always pops.
    base = Image.blend(base, Image.new("RGB", (W, H), (0, 0, 0)), 0.12)

    # Bottom-up dark gradient scrim (transparent at top -> ~80% black at bottom).
    grad = Image.new("L", (1, H), 0)
    for y in range(H):
        t = y / (H - 1)
        # ease-in so the top half stays clear, bottom gets dark
        alpha = int(205 * (t ** 1.6))
        grad.putpixel((0, y), alpha)
    grad = grad.resize((W, H))
    scrim = Image.new("RGB", (W, H), (8, 8, 10))
    base = Image.composite(scrim, base, grad)

    draw = ImageDraw.Draw(base)

    playfair = ImageFont.truetype(os.path.join(fdir, "PlayfairDisplay.ttf"), 76)
    try:
        playfair.set_variation_by_axes([600])
    except Exception:
        pass
    inter = ImageFont.truetype(os.path.join(fdir, "Inter.ttf"), 32)
    inter_url = ImageFont.truetype(os.path.join(fdir, "Inter.ttf"), 27)

    margin = 72
    name = "Cute Company Photography"
    tagline = "Fine Art Weddings · Portraits · Tampa"
    url = "cutecompanyphotography.com"

    # Stack from the bottom up.
    y = H - margin
    y -= inter_url.getbbox(url)[3]
    draw.text((margin, y), url, font=inter_url, fill=(212, 180, 131))  # soft gold accent
    y -= 18
    y -= inter.getbbox(tagline)[3]
    draw.text((margin, y), tagline, font=inter, fill=(235, 235, 235))
    y -= 14
    y -= playfair.getbbox(name)[3]
    draw.text((margin, y), name, font=playfair, fill=(255, 255, 255))

    # Thin gold rule above the name for a refined editorial feel.
    draw.rectangle([margin, y - 22, margin + 80, y - 19], fill=(212, 180, 131))

    base.save(OUT, "JPEG", quality=86, progressive=True, optimize=True)
    size_kb = os.path.getsize(OUT) // 1024
    print(f"wrote {OUT} ({W}x{H}, {size_kb}KB)")


if __name__ == "__main__":
    main()
