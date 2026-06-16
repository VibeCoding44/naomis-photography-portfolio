import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getSessions } from "@/lib/sessions";

// Required for `output: "export"` (static HTML export).
export const dynamic = "force-static";

// Static export-friendly sitemap. Static routes are listed here; session/story
// posts are appended automatically from content/sessions at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/portfolio", "/sessions", "/about", "/services", "/contact", "/privacy"];

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" || path === "/sessions" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }));

  const sessionEntries: MetadataRoute.Sitemap = getSessions().map((post) => ({
    url: `${SITE_URL}/sessions/${post.slug}`,
    lastModified: post.date || undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...sessionEntries];
}
