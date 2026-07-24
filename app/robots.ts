import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot"],
        allow: "/",
      },
    ],
    sitemap: "https://www.middleleap.com/sitemap.xml",
    host: "https://www.middleleap.com",
  };
}
