import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { siteOrigin } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    // Keep the root <loc> as the bare origin so it stays byte-identical to the
    // canonical the root layout emits.
    url: route.path === "/" ? siteOrigin : `${siteOrigin}${route.path}`,
    lastModified: route.contentUpdated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
