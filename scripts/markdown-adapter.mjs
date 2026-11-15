// Next.js build adapter (next.config.ts `adapterPath`). Its onBuildComplete
// hook runs inside `next build` after the static export is written, so the
// Markdown twins are generated whichever command runs the build: CI uses
// `npm run build`, while Cloudflare Pages may invoke `next build` directly.
import { access } from "node:fs/promises";
import path from "node:path";
import { buildCsp } from "./build-csp.mjs";
import { buildMarkdown } from "./build-markdown.mjs";

/** @type {import("next").NextAdapter} */
const markdownAdapter = {
  name: "middleleap-markdown-for-agents",
  async onBuildComplete({ projectDir }) {
    const routes = await buildMarkdown(path.join(projectDir, "out"));
    console.log(`Wrote Markdown for ${routes.length} pages`);
    // The Content Security Policy in public/_headers carries a placeholder for
    // the inline-script hashes; a build without _headers (a unit fixture) has
    // nothing to fill in.
    const outputDirectory = path.join(projectDir, "out");
    try {
      await access(path.join(outputDirectory, "_headers"));
    } catch {
      return;
    }
    const hashes = await buildCsp(outputDirectory);
    console.log(`Content Security Policy allows ${hashes} inline scripts by hash`);
  },
};

export default markdownAdapter;
