import type { Metadata } from "next";

export const siteOrigin = "https://www.middleleap.com";

type PageOpenGraphInput = {
  title: string;
  description: string;
  path: string;
};

// Next.js merges the `openGraph` metadata field shallowly: a page-level
// override replaces the root layout's object entirely, silently dropping
// siteName, locale, type and the generated OG image. Every page-level
// openGraph override must therefore be built through this helper.
export function pageOpenGraph(input: PageOpenGraphInput): Metadata["openGraph"] {
  return {
    title: input.title,
    description: input.description,
    url: `${siteOrigin}${input.path}`,
    siteName: "MiddleLeap",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MiddleLeap — From Strategic Mandate to Market Execution",
      },
    ],
  };
}
