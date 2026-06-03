# Photo Upload Portal — Setup Guide

Your site now has a photo-upload portal at **`/admin`** where invited photographers
log in, upload a photo, and submit it for **your approval**. Once you approve it,
the photo appears on the Portfolio page automatically (the site rebuilds itself).

How it works under the hood:

```
Photographer logs in at /admin
   → uploads a photo (stored on Cloudinary's image CDN)
   → CMS commits a tiny JSON file to this GitHub repo as a "pending" entry (a pull request)
   → YOU open /admin, review it, click Publish
   → Netlify rebuilds → photo shows on the Portfolio page (~1 min)
```

No server, no database — it all rides on your existing GitHub → Netlify deploy.

There are **three free accounts** to connect. Do them in this order. Budget ~20 minutes.

---

## 1. Cloudinary (where the photos are stored)

1. Sign up free at <https://cloudinary.com/users/register_free>.
2. In the Cloudinary **Console → Dashboard**, copy your **Cloud name** and **API Key**
   (top-left "Product Environment Credentials").
3. Open `public/admin/config.yml` in this repo and replace:
   - `YOUR_CLOUDINARY_CLOUD_NAME` → your cloud name
   - `YOUR_CLOUDINARY_API_KEY` → your API key

   > These two values are **public by design** — Cloudinary's media widget needs them
   > in the browser, and they're safe to commit. (Your API *secret* is never used here.)
4. In Cloudinary, go to **Settings → Security** and make sure
   **"Unsigned uploading"** is enabled (Settings → Upload → Upload presets →
   ensure an unsigned preset exists, or toggle unsigned on). This lets photographers
   upload from the browser.

---

## 2. DecapBridge (the login for invited photographers)

Netlify's old built-in login (Netlify Identity) was deprecated in Feb 2025, so we use
DecapBridge — it's free (up to 3 sites / 10 collaborators) and lets you invite people
by **email**, so your photographers don't need GitHub accounts.

1. Sign up at <https://decapbridge.com> and click **Create Site**.
2. **Link the Git repository**: `VibeCoding44/naomis-photography-portfolio`, branch `main`.
   (DecapBridge will ask you to authorize it on GitHub so it can commit uploads.)
3. DecapBridge generates a **backend config** for you. Copy it and paste it over the
   `backend:` block in `public/admin/config.yml`, replacing:
   - `https://auth.decapbridge.com/sites/YOUR_SITE_ID`
   - `https://gateway.decapbridge.com`

   with the exact URLs it shows (the `YOUR_SITE_ID` part is unique to your site).
4. In DecapBridge → your site → **Collaborators**, click **Invite** and enter each
   photographer's email. They'll get an email to set a password — that's their login.

---

## 3. Commit & deploy

Once steps 1 and 2 are filled into `public/admin/config.yml`:

```bash
git add -A
git commit -m "Add photo upload portal (Decap CMS + Cloudinary)"
git push
```

Netlify auto-builds. When it's live:

- **Photographers** go to **`https://cutecompanyphotography.com/admin`**, log in, and click
  **"Portfolio Photos" → New Photo** to upload.
- **You** go to the same `/admin`, open the **Workflow** tab, review pending uploads, and
  drag them to **Published** (or click Publish). That triggers the rebuild and the photo
  goes live on the Portfolio page.

---

## 4. (Optional) Pretty subdomain: upload.cutecompanyphotography.com

The portal works at `/admin` immediately. If you'd rather hand photographers a clean
`upload.cutecompanyphotography.com` link:

1. In **Netlify → Domain management → Add a domain alias**, add
   `upload.cutecompanyphotography.com`. Netlify gives you a DNS target.
2. In your DNS provider, add a **CNAME** record:
   `upload` → `<your-site>.netlify.app` (Netlify shows the exact value).
3. Photographers then visit **`https://upload.cutecompanyphotography.com/admin`**.

   > It's still the same site, so the portal lives under `/admin` on that subdomain too.
   > If you want the bare `upload.cutecompanyphotography.com` (no `/admin`) to open the
   > portal, add a redirect in `netlify.toml`:
   > ```toml
   > [[redirects]]
   >   from = "https://upload.cutecompanyphotography.com/"
   >   to = "/admin/"
   >   status = 302
   >   force = true
   > ```

---

## How the portfolio data is stored

- Each photo is a small JSON file in **`content/portfolio/`** (e.g. `2026-06-03-sunset.json`)
  holding the Cloudinary image URL, caption, category, sort order, and date.
- Your **19 original portraits** were migrated into this folder (`portrait-01.json` …
  `portrait-19.json`) and still point at the local images in `public/images/portraits/`,
  so nothing was lost — you can now reorder or delete them from `/admin` too.
- The Portfolio page (`src/app/portfolio/page.tsx`) reads every entry at build time via
  `src/lib/portfolio.ts` and sorts by the **order** field (lower = first).

## Categories

Photographers pick a category per photo (Portraits / Weddings / Commercial / Events).
They're stored but not yet used to filter the gallery. If you later want category
filter tabs on the Portfolio page, that's a small follow-up.
