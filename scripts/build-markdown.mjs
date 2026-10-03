// Post-build step: writes a Markdown twin of every exported page.
//
//   out/<route>.html  ->  out/<route>.md   (out/index.html -> out/index.md)
//
// functions/_middleware.ts serves these files when a request prefers
// `Accept: text/markdown`, so agents get clean text at the canonical URL while
// browsers keep the HTML. The output follows the shape of Cloudflare's
// Markdown for Agents: YAML frontmatter from the page meta tags, the page body
// without site chrome, then any JSON-LD in a fenced block.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import TurndownService from "turndown";

export const siteUrl = "https://www.middleleap.com";

// Exported HTML that is not a page an agent would ask for.
const skippedPages = new Set(["404.html", "_not-found.html"]);

function decode(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function metaContent(html, attribute, name) {
  const tag = new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="([^"]*)"`).exec(html);
  return tag ? decode(tag[1]).trim() : "";
}

function yamlString(value) {
  return JSON.stringify(value);
}

function absoluteUrl(href) {
  if (!href || href.startsWith("#")) return "";
  try {
    return new URL(href, `${siteUrl}/`).toString();
  } catch {
    return "";
  }
}

const inlineContainers = new Set(["H1", "H2", "H3", "H4", "H5", "H6", "STRONG", "B", "EM", "I", "A", "SMALL"]);

function hasInlineAncestor(node) {
  for (let parent = node.parentNode; parent; parent = parent.parentNode) {
    if (inlineContainers.has(parent.nodeName)) return true;
  }
  return false;
}

// Labels, stats and calls to action are often sibling inline elements laid
// out by CSS (`<span>01</span><strong>Frame</strong>`). Without a space
// between them the text runs together in Markdown.
const adjacentInlineElements =
  /(<\/(?:a|abbr|b|code|em|i|small|span|strong|time)>)(?=<(?:a|abbr|b|code|em|i|small|span|strong|time)[\s>])/g;

function createConverter() {
  const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
  });

  // Site chrome, interactive controls and decorative markup carry no content.
  turndown.remove(["script", "style", "noscript", "template", "svg", "header", "footer", "nav", "form", "button"]);
  turndown.remove(
    (node) =>
      node.nodeType === 1 &&
      (node.getAttribute("aria-hidden") === "true" || node.hasAttribute("hidden")),
  );

  // Agents read the Markdown outside the site, so links and images must be
  // absolute. In-page anchors keep their text and drop the link.
  turndown.addRule("absoluteLinks", {
    filter: (node) => node.nodeName === "A" && node.getAttribute("href") !== null,
    replacement: (content, node) => {
      const text = content.trim();
      const href = absoluteUrl(node.getAttribute("href"));
      if (!text) return "";
      return href ? `[${text}](${href})` : text;
    },
  });
  // An empty alt marks a decorative image, such as the alternate-theme copy
  // of the founder portrait.
  turndown.addRule("absoluteImages", {
    filter: "img",
    replacement: (_content, node) => {
      const src = absoluteUrl(node.getAttribute("src"));
      const alt = (node.getAttribute("alt") ?? "").replace(/[[\]]/g, "").trim();
      return src && alt ? `![${alt}](${src})` : "";
    },
  });

  // Line breaks in display headings and emphasised labels are visual only; a
  // Markdown hard break there would split the heading or the emphasis.
  turndown.addRule("inlineBreaks", {
    filter: (node) => node.nodeName === "BR" && hasInlineAncestor(node),
    replacement: () => " ",
  });

  return turndown;
}

const converter = createConverter();

/**
 * Converts one exported page to Markdown.
 * @param {string} html the full exported HTML document
 * @returns {string}
 */
export function htmlToMarkdown(html) {
  const frontmatter = [];
  const title = decode(/<title>(.*?)<\/title>/s.exec(html)?.[1] ?? "").trim();
  const description =
    metaContent(html, "name", "description") || metaContent(html, "property", "og:description");
  const image = metaContent(html, "property", "og:image");
  const canonical = decode(/<link rel="canonical" href="([^"]*)"/.exec(html)?.[1] ?? "");
  if (title) frontmatter.push(`title: ${yamlString(title)}`);
  if (description) frontmatter.push(`description: ${yamlString(description)}`);
  if (image) frontmatter.push(`image: ${yamlString(image)}`);
  if (canonical) frontmatter.push(`url: ${yamlString(canonical)}`);

  const main = /<main\b[^>]*>([\s\S]*)<\/main>/.exec(html)?.[1];
  const body = /<body\b[^>]*>([\s\S]*)<\/body>/.exec(html)?.[1] ?? html;
  const content = converter
    .turndown((main ?? body).replace(adjacentInlineElements, "$1 "))
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => {
      try {
        return JSON.stringify(JSON.parse(match[1]));
      } catch {
        return "";
      }
    })
    .filter(Boolean);

  const parts = [];
  if (frontmatter.length) parts.push(`---\n${frontmatter.join("\n")}\n---`);
  parts.push(content);
  if (jsonLd.length) parts.push("```json\n" + jsonLd.join("\n") + "\n```");
  return parts.join("\n\n") + "\n";
}

async function htmlFiles(directory, root = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") files.push(...(await htmlFiles(fullPath, root)));
    } else if (entry.name.endsWith(".html") && !skippedPages.has(path.relative(root, fullPath))) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

/** "out/index.html" -> "/", "out/ventures/parqo.html" -> "/ventures/parqo" */
function routeFor(outputDirectory, file) {
  const relative = path.relative(outputDirectory, file).split(path.sep).join("/");
  const route = `/${relative.replace(/\.html$/, "")}`;
  return route === "/index" ? "/" : route;
}

export async function buildMarkdown(outputDirectory = path.resolve("out")) {
  const routes = [];
  for (const file of await htmlFiles(outputDirectory)) {
    const html = await readFile(file, "utf8");
    await writeFile(file.replace(/\.html$/, ".md"), htmlToMarkdown(html));
    routes.push(routeFor(outputDirectory, file));
  }

  return routes;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const routes = await buildMarkdown();
  console.log(`Wrote Markdown for ${routes.length} pages`);
}
