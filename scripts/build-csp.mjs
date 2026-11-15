// Replaces the inline-script placeholder in out/_headers with the SHA-256 hash
// of every inline script the exported pages actually contain, so the Content
// Security Policy allows exactly those scripts and no other inline code.
//
// The hashes change with every build (the React payload scripts embed content
// and chunk names), so they cannot be written by hand. Runs from the build
// adapter (scripts/markdown-adapter.mjs) at the end of every `next build`.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const inlineScriptPlaceholder = "__INLINE_SCRIPT_HASHES__";

// Cloudflare Pages ignores a _headers line longer than this.
export const headerLineLimit = 2000;

const dataBlock = /\stype\s*=\s*["']?(?:application\/(?:ld\+)?json|text\/plain)/i;

/**
 * The CSP hash sources for every inline script a browser would execute.
 * JSON-LD and other data blocks are skipped: they are never executed, so the
 * policy is not consulted for them.
 * @param {string} html
 * @returns {string[]} sources such as 'sha256-…', in document order
 */
export function inlineScriptHashes(html) {
  const sources = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const [, attributes, body] = match;
    if (/\ssrc\s*=/i.test(attributes) || dataBlock.test(attributes) || body === "") continue;
    sources.push(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
  return sources;
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "_next" ? [] : htmlFiles(entryPath);
    return entry.name.endsWith(".html") ? [entryPath] : [];
  }));
  return nested.flat();
}

/**
 * Every distinct inline-script hash across the exported pages, sorted so the
 * header is stable for a given build.
 * @param {string} outputDirectory
 */
export async function collectInlineScriptHashes(outputDirectory) {
  const sources = new Set();
  for (const file of await htmlFiles(outputDirectory)) {
    for (const source of inlineScriptHashes(await readFile(file, "utf8"))) sources.add(source);
  }
  return [...sources].sort();
}

/**
 * Writes the hashes into out/_headers.
 * @param {string} outputDirectory
 * @returns {Promise<number>} how many hashes the policy now allows
 */
export async function buildCsp(outputDirectory = path.resolve("out")) {
  const headersPath = path.join(outputDirectory, "_headers");
  const headers = await readFile(headersPath, "utf8");
  if (!headers.includes(inlineScriptPlaceholder)) {
    throw new Error(`${headersPath} has no ${inlineScriptPlaceholder} placeholder for the inline-script hashes`);
  }
  const sources = await collectInlineScriptHashes(outputDirectory);
  if (sources.length === 0) throw new Error(`No inline scripts found under ${outputDirectory}; refusing to write a policy that blocks the theme script`);

  const written = headers.replaceAll(inlineScriptPlaceholder, sources.join(" "));
  const tooLong = written.split("\n").find((line) => line.length > headerLineLimit);
  if (tooLong) {
    throw new Error(
      `A _headers line is ${tooLong.length} characters; Cloudflare Pages ignores lines over ${headerLineLimit}. ` +
      "The inline-script hash list has outgrown one header: split the policy into per-path rules.",
    );
  }
  await writeFile(headersPath, written);
  return sources.length;
}
