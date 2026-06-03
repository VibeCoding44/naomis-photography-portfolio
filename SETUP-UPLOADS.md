# Photo Upload Portal — How It Works

Your site has a photo-upload portal at **`/admin`** where invited photographers log in,
upload a photo, and submit it for **your approval**. Once you approve it, the photo
appears on the Portfolio page automatically.

```
Photographer logs in at /admin   (DecapBridge account — one login)
   → uploads a photo (committed into this repo under public/images/uploads/)
   → it becomes a PENDING entry (a pull request) — not yet live
   → YOU open /admin → Workflow tab → review → Publish
   → Netlify rebuilds from GitHub → photo shows on the Portfolio page (~1–2 min)
```

No server, no database, no Cloudinary — it rides entirely on GitHub → Netlify.

---

## The moving parts (all configured already)

| Piece | What it does | Where |
|---|---|---|
| **Decap CMS** | the `/admin` upload UI | `public/admin/` |
| **DecapBridge** | login for invited photographers (PKCE) | https://decapbridge.com |
| **GitHub** | stores photos + photo entries | `VibeCoding44/naomis-photography-portfolio` |
| **Netlify** | builds & hosts the site on every push | site `naomis-photography-portfolio-v1` |

Photos are stored **in the repo** (`public/images/uploads/`), so photographers only need
their **DecapBridge login** — no second account anywhere.

---

## Inviting photographers

1. Go to **https://decapbridge.com** → your site → **Collaborators**.
2. Click **Invite**, enter the photographer's **email** (up to 10 on the free tier).
3. They get an email to set up their login.
4. Send them the portal link:

   ```
   https://cutecompanyphotography.com/admin/
   ```

Tell them: *"Click the DecapBridge invite email to set your password, then go to
cutecompanyphotography.com/admin/ to upload your photos."*

## Approving an upload (your job)

1. Go to **https://cutecompanyphotography.com/admin/** and log in.
2. Open the **Workflow** tab — pending uploads sit there.
3. Review one, then move it to **Published** (or click Publish).
4. Netlify rebuilds; the photo appears on the Portfolio page in ~1–2 minutes.

## Uploading (what photographers do)

`/admin/` → **Portfolio Photos → New Photo** → choose the image, optional caption +
category → **Save**. It goes to the pending queue for your approval.

---

## How the portfolio data is stored

- Each photo is a small JSON file in **`content/portfolio/`** (image path, caption,
  category, sort order, date).
- Your original **19 portraits** live there too (`portrait-01.json` … `portrait-19.json`),
  pointing at `public/images/portraits/`. You can reorder or delete them from `/admin`.
- New uploads point at `public/images/uploads/`.
- The Portfolio page (`src/app/portfolio/page.tsx`) reads every entry at build time via
  `src/lib/portfolio.ts`, sorted by the **order** field (lower = first).

## Keeping the repo healthy

Because photos are committed to the repo, ask photographers to upload **reasonably sized
JPEGs** (e.g. long edge ≤ 2500px, a few MB max) rather than full 40MP RAW exports. That
keeps Netlify builds fast. If the repo ever gets large, the fix is to move storage to an
external host — ask and I can wire that up.

## Categories

Photos carry a category (Portraits / Weddings / Commercial / Events). It's stored but not
yet used to filter the gallery — adding filter tabs is a small follow-up if you want it.
