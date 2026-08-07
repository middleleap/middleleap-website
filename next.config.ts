import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // trailingSlash is deliberately left at its default. The export emits flat
  // out/<route>.html, every canonical is extensionless and slash-less, and every
  // sitemap <loc> matches its canonical byte-for-byte. Enabling it would re-resolve
  // every canonical to a trailing-slash form, turning already-indexed URLs into
  // redirect hops and desynchronising the root canonical from its sitemap entry.
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
