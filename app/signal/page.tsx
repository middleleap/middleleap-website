import type { Metadata } from "next";
import Link from "next/link";
import SignalList from "@/components/SignalList";
import { getAllPosts, toMeta } from "@/lib/signal";

export const metadata: Metadata = {
  title: "The Signal — Essays from the frontier of the 20× company",
  description:
    "Essays, case studies, and technical dispatches on AI-native engineering, the AI-DLC, and the 20× company — from MiddleLeap.",
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function SignalIndex() {
  const posts = getAllPosts().map(toMeta);

  return (
    <main className="signal-page">
      <div className="container">
        <p className="sig-back">
          <Link href="/">← MiddleLeap</Link>
        </p>
        <div className="sec-label">{"// The Signal"}</div>
        <h1 className="sec-title">Stay sharp.</h1>
        <p className="sec-desc">
          Essays, case studies, and dispatches from the frontier of the 20×
          company.{" "}
          <a href="/rss.xml" className="sig-rss-link">
            RSS
          </a>
        </p>

        <SignalList posts={posts} />
      </div>
    </main>
  );
}
