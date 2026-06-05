import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Required for `output: "export"` (static HTML export).
export const dynamic = "force-static";

// Static export-friendly sitemap. Add new routes here as pages are created.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/portfolio", "/about", "/services", "/contact"];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
