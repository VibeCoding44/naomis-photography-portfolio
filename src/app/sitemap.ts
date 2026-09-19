import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getSessions } from "@/lib/sessions";

// Required for `output: "export"` (static HTML export).
export const dynamic = "force-static";

// Static export-friendly sitemap. Static routes are listed here; session/story
// posts are appended automatically from content/sessions at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/portfolio", "/sessions", "/offers", "/about", "/services", "/contact", "/privacy"];

  // Static routes carried no <lastmod> at all, which is the one field Google
  // actually leans on when deciding what to (re)crawl - changefreq and priority
  // are largely ignored. /services has been in this sitemap for months and is
  // still "URL is unknown to Google", never crawled once, so it had no freshness
  // signal to act on. Stamped at build time: every deploy is genuinely the last
  // time these pages changed, since they are rebuilt from source each time.
  const builtAt = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: builtAt,
    changeFrequency: path === "" || path === "/sessions" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }));

  // Session posts used `post.date` - the date of the SHOOT, not the date the
  // page last changed. Bonnet Springs was stamped 2026-06-25 and last crawled
  // 2026-06-19, sitting on "Crawled - currently not indexed": every rebuild
  // since (metadata rewrites included) was invisible to Google, because the
  // sitemap kept insisting the page had not changed. Same reasoning as the
  // static routes above - stamp the build time, which is genuinely when the
  // rendered page last changed. Guarded with max() so a post dated in the
  // future (a scheduled shoot) is never back-dated to the build.
  const sessionEntries: MetadataRoute.Sitemap = getSessions().map((post) => {
    const posted = post.date ? new Date(post.date) : undefined;
    const lastModified =
      posted && posted.getTime() > builtAt.getTime() ? posted : builtAt;
    return {
      url: `${SITE_URL}/sessions/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...staticEntries, ...sessionEntries];
}
