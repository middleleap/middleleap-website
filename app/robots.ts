import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Search indexing and user-directed answer retrieval.
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: "/",
      },
      {
        // Model-development crawlers remain allowed, matching the existing
        // open-crawl posture while keeping that policy separate from search.
        userAgent: ["GPTBot", "ClaudeBot"],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.middleleap.com/sitemap.xml",
    host: "https://www.middleleap.com",
  };
}
