import type { Metadata } from "next";

const SITE_ORIGIN = "https://www.middleleap.com";
const SOCIAL_IMAGE_ALT =
  "MiddleLeap — Every engagement should leave the institution smarter";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  socialDescription?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle = title,
  socialDescription = description,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: `${SITE_ORIGIN}${path}`,
      siteName: "MiddleLeap",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: ["/twitter-image"],
    },
  };
}
