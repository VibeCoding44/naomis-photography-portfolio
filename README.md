# Naomi's Photography Portfolio

A beautiful, modern photography portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- **Responsive Design**: Looks great on both desktop and mobile devices.
- **Image Gallery**: A masonry grid layout for showcasing magnificent photography work.
- **Custom UI Components**: Reusable components built with Tailwind CSS.
- **Next.js App Router**: Utilizing the latest Next.js features for optimal performance.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Analytics

Google Analytics 4 is wired up via [`@next/third-parties`](https://nextjs.org/docs/app/guides/third-party-libraries#google-analytics). It only loads when a measurement ID is provided:

- Set the environment variable `NEXT_PUBLIC_GA_ID` to your GA4 measurement ID (e.g. `G-XXXXXXXXXX`).
- For production, add it under **Netlify → Site settings → Environment variables**, then redeploy.
- For local testing: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX npm run build`.

Without the variable set, no analytics scripts are emitted. The `googletagmanager.com` and `google-analytics.com` domains are already allow-listed in the `netlify.toml` Content-Security-Policy.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (if applicable)
- [Lucide React](https://lucide.dev/) (for icons)
