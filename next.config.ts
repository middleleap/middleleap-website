import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // trailingSlash is deliberately left at its default. The export emits flat
  // out/<route>.html, every canonical is extensionless and slash-less, and every
  // sitemap <loc> matches its canonical byte-for-byte. Enabling it would re-resolve
  // every canonical to a trailing-slash form, turning already-indexed URLs into
  // redirect hops and desynchronising the root canonical from its sitemap entry.
  output: "export",
  // Writes the Markdown for Agents twins (out/<route>.md) once the export is
  // done, so they exist whichever command runs `next build`.
  adapterPath: require.resolve("./scripts/markdown-adapter.mjs"),
  typedRoutes: true,
  // Keep Next's complete project check enabled through its CLI support.
  // The type-check script also runs TypeScript 7; lint tooling uses the TS 6 API.
  experimental: {
    useTypeScriptCli: true,
  },
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
