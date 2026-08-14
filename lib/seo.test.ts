import { describe, expect, it } from "vitest";
import robots from "../app/robots";
import { pageMetadata, pageOpenGraph, siteOrigin } from "./seo";

describe("route metadata", () => {
  it("builds complete page-specific canonical and social metadata", () => {
    const metadata = pageMetadata({
      title: "The Practice",
      description: "A representative route description.",
      path: "/practice",
      socialTitle: "The Practice | MiddleLeap",
    });

    expect(metadata).toMatchObject({
      title: "The Practice",
      description: "A representative route description.",
      alternates: { canonical: "/practice" },
      openGraph: {
        title: "The Practice | MiddleLeap",
        description: "A representative route description.",
        url: `${siteOrigin}/practice`,
        siteName: "MiddleLeap",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "The Practice | MiddleLeap",
        description: "A representative route description.",
      },
    });
  });

  it("keeps the generated social image and organization fields together", () => {
    expect(
      pageOpenGraph({
        title: "Route title",
        description: "Route description",
        path: "/route",
      }),
    ).toMatchObject({
      url: `${siteOrigin}/route`,
      siteName: "MiddleLeap",
      images: [expect.objectContaining({ width: 1200, height: 630 })],
    });
  });
});

describe("crawler policy", () => {
  it("explicitly allows current AI search and user-retrieval agents", () => {
    const serialized = JSON.stringify(robots().rules);

    for (const agent of [
      "OAI-SearchBot",
      "ChatGPT-User",
      "Claude-SearchBot",
      "Claude-User",
      "PerplexityBot",
      "Perplexity-User",
    ]) {
      expect(serialized).toContain(agent);
    }
  });

  it("keeps model-development crawlers in a separate rule", () => {
    const rules = robots().rules;
    expect(rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userAgent: ["GPTBot", "ClaudeBot"], allow: "/" }),
      ]),
    );
  });
});
