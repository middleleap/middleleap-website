import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import { siteOrigin } from "@/lib/seo";
import { parseThemeMode, resolveTheme, themeStorageKey } from "@/lib/theme";
import "./globals.css";

// Analytics is a no-op until a domain is configured. Plausible is
// cookieless and privacy-friendly, matching the PRD's analytics intent.
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || undefined;
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

// Serialized from the tested implementations in lib/theme.ts so the
// FOUC-prevention boot script cannot drift from runtime theme logic.
const themeBootScript = `(()=>{try{const parse=${parseThemeMode.toString()};const resolve=${resolveTheme.toString()};const mode=parse(localStorage.getItem(${JSON.stringify(themeStorageKey)}));const theme=resolve(mode,matchMedia("(prefers-color-scheme: light)").matches);document.documentElement.dataset.theme=theme;document.documentElement.dataset.themeMode=mode;document.documentElement.style.colorScheme=theme}catch{document.documentElement.dataset.theme="dark";document.documentElement.dataset.themeMode="auto"}})();`;

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "MiddleLeap | Platform Strategy & AI-Native Transformation",
    template: "%s | MiddleLeap",
  },
  description:
    "MiddleLeap advises banks, fintechs, financial infrastructure and telecommunications providers on platform strategy and AI-native transformation.",
  keywords: [
    "Open Finance",
    "embedded finance",
    "platform strategy",
    "API strategy",
    "ecosystem strategy",
    "platform monetisation",
    "regulatory readiness",
    "AI-native operating models",
    "The Loom",
    "governed AI delivery method",
    "venture studio",
    "AI governance",
    "AI-DLC",
    "financial services transformation",
    "telecommunications transformation",
  ],
  authors: [{ name: "MiddleLeap" }],
  creator: "MiddleLeap",
  publisher: "MiddleLeap",
  applicationName: "MiddleLeap",
  category: "Business Consulting and Services",
  metadataBase: new URL(siteOrigin),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MiddleLeap | Platform Strategy & AI-Native Transformation",
    description:
      "From strategic mandate to market execution across platforms, ecosystems and AI-native operating models.",
    url: `${siteOrigin}/`,
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
  },
  twitter: {
    card: "summary_large_image",
    title: "MiddleLeap | Platform Strategy & AI-Native Transformation",
    description:
      "From strategic mandate to market execution across platforms, ecosystems and AI-native operating models.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleSiteVerification || bingSiteVerification
    ? {
        verification: {
          ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
          ...(bingSiteVerification
            ? { other: { "msvalidate.01": bingSiteVerification } }
            : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <Script id="middleleap-theme" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="MiddleLeap company information"
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      >
        <a href="#problem" className="skip-link">Skip to content</a>
        <div className="grain" />
        {children}
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
