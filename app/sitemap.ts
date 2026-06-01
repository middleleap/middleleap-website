import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/signal";

export const dynamic = "force-static";

const SITE_URL = "https://middleleap.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts().map((p) => ({
    url: `${SITE_URL}/signal/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/signal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
  ];
}
