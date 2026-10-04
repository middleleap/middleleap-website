import { siteOrigin } from "./seo";

type CrawlerRule = {
  userAgent: string[];
  allow: string;
};

// Content Signals (https://contentsignals.org/) declare how crawled content may
// be used once accessed. The values mirror the open-crawl posture below: search
// indexing, answer grounding (ai-input) and model training are all permitted.
export const contentSignals = {
  search: "yes",
  "ai-input": "yes",
  "ai-train": "yes",
} as const;

// The same policy as a Content-Signal header value, shared by robots.txt and
// the Markdown responses in functions/_middleware.ts.
export const contentSignal = Object.entries(contentSignals)
  .map(([key, value]) => `${key}=${value}`)
  .join(", ");

export const crawlerRules: CrawlerRule[] = [
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
    userAgent: ["*"],
    allow: "/",
  },
];

// Next's MetadataRoute.Robots has no field for Content-Signal, so robots.txt is
// serialized here and served from a static route handler instead.
export function renderRobotsTxt(): string {
  const preamble = [
    "# As a condition of accessing this website, you agree to abide by the",
    "# following content signals (https://contentsignals.org/):",
    "#   search:   building a search index and providing search results.",
    "#   ai-input: inputting content into AI models (e.g. retrieval, grounding).",
    "#   ai-train: training or fine-tuning AI models.",
  ].join("\n");

  const groups = crawlerRules.map((rule) =>
    [
      ...rule.userAgent.map((agent) => `User-Agent: ${agent}`),
      `Content-Signal: ${contentSignal}`,
      `Allow: ${rule.allow}`,
    ].join("\n"),
  );

  return `${[preamble, ...groups, `Host: ${siteOrigin}\nSitemap: ${siteOrigin}/sitemap.xml`].join("\n\n")}\n`;
}
