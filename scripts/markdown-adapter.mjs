// Next.js build adapter (next.config.ts `adapterPath`). Its onBuildComplete
// hook runs inside `next build` after the static export is written, so the
// Markdown twins are generated whichever command runs the build: CI uses
// `npm run build`, while Cloudflare Pages may invoke `next build` directly.
import path from "node:path";
import { buildMarkdown } from "./build-markdown.mjs";

/** @type {import("next").NextAdapter} */
const markdownAdapter = {
  name: "middleleap-markdown-for-agents",
  async onBuildComplete({ projectDir }) {
    const routes = await buildMarkdown(path.join(projectDir, "out"));
    console.log(`Wrote Markdown for ${routes.length} pages`);
  },
};

export default markdownAdapter;
