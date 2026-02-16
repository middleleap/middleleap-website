import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "MiddleLeap — From Process to Product",
  description:
    "MiddleLeap Ventures: The methodology behind the 20× company. Helping engineering leaders transition from the SDLC to the AI-DLC.",
  keywords: [
    "AI development lifecycle",
    "AI-DLC",
    "agent factory",
    "AI-native engineering",
    "specification-first delivery",
    "compounding engineering",
    "steering files",
    "AI maturity model",
    "AI governance framework",
    "agent-native delivery",
    "20x company",
    "engineering transformation",
  ],
  authors: [{ name: "MiddleLeap Ventures" }],
  metadataBase: new URL("https://middleleap.com"),
  openGraph: {
    title: "MiddleLeap — From Process to Product",
    description:
      "The methodology behind the 20× company. Stop optimizing keystrokes. Start optimizing decisions.",
    url: "https://middleleap.com",
    siteName: "MiddleLeap",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiddleLeap — From Process to Product",
    description:
      "The methodology behind the 20× company. 10-person teams, 200-person output.",
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
    <html lang="en">
      <head>
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
      </head>
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      >
        <a href="#problem" className="skip-link">Skip to content</a>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
