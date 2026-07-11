import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Analytics is a no-op until a domain is configured. Plausible is
// cookieless and privacy-friendly, matching the PRD's analytics intent.
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "MiddleLeap | Platform Strategy & AI-Native Transformation",
    template: "%s | MiddleLeap",
  },
  description:
    "MiddleLeap advises banks, fintechs and regulated businesses on platform strategy, Open Finance, ecosystem design and AI-native operating models.",
  keywords: [
    "Open Finance",
    "embedded finance",
    "platform strategy",
    "API strategy",
    "ecosystem strategy",
    "platform monetisation",
    "regulatory readiness",
    "AI-native operating models",
    "AI-DLC",
    "financial services transformation",
  ],
  authors: [{ name: "MiddleLeap" }],
  creator: "MiddleLeap",
  publisher: "MiddleLeap",
  applicationName: "MiddleLeap",
  category: "IT Services and IT Consulting",
  metadataBase: new URL("https://middleleap.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MiddleLeap | Platform Strategy & AI-Native Transformation",
    description:
      "From strategic mandate to market execution across platforms, ecosystems and AI-native operating models.",
    url: "https://middleleap.com/",
    siteName: "MiddleLeap",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MiddleLeap — From strategic mandate to market execution",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
