import type { Metadata } from "next";

export const siteOrigin = "https://www.middleleap.com";

type PageOpenGraphInput = {
  title: string;
  description: string;
  path: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  socialDescription?: string;
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

/**
 * Build every route-level signal together. This prevents a child page from
 * inheriting the homepage's Twitter copy or dropping shared Open Graph fields.
 */
export function pageMetadata(input: PageMetadataInput): Metadata {
  const socialTitle = input.socialTitle ?? `${input.title} | MiddleLeap`;
  const socialDescription = input.socialDescription ?? input.description;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: pageOpenGraph({
      title: socialTitle,
      description: socialDescription,
      path: input.path,
    }),
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: ["/twitter-image"],
    },
  };
}
