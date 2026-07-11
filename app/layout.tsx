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
  title: "MiddleLeap — Regulated Platform Transformation",
  description:
    "MiddleLeap helps banks, fintechs and regulated platform businesses navigate market shifts, design scalable platforms and build AI-native operating models.",
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
  metadataBase: new URL("https://middleleap.com"),
  openGraph: {
    title: "MiddleLeap — From Strategic Mandate to Market Execution",
    description:
      "Regulated platform transformation across strategy, ecosystems, operating models and AI-native execution.",
    url: "https://middleleap.com",
    siteName: "MiddleLeap",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiddleLeap — From Strategic Mandate to Market Execution",
    description:
      "Regulated platform transformation across strategy, ecosystems, operating models and AI-native execution.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
