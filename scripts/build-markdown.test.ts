import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { buildMarkdown, htmlToMarkdown } from "./build-markdown.mjs";

const page = `<!DOCTYPE html><html lang="en"><head>
<title>Open Finance | MiddleLeap</title>
<meta name="description" content="Open Finance advisory &amp; strategy."/>
<meta property="og:image" content="https://www.middleleap.com/opengraph-image"/>
<link rel="canonical" href="https://www.middleleap.com/open-finance"/>
<script src="/_next/static/chunks/main.js"></script>
</head><body><a href="#main" class="skip-link">Skip to content</a>
<main id="main"><script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage"}</script>
<header><nav aria-label="Primary navigation"><a href="/practice">The practice</a></nav></header>
<span>Advisory</span><h1>From mandate<br/>to <em>execution.</em></h1>
<p>We help <a href="/ventures">ventures</a> and <a href="#engage">clients</a>.</p>
<div><span aria-hidden="true">01</span><strong>Frame</strong><span>the mandate</span></div>
<img src="/founder/portrait.webp" alt="Founder portrait"/><img src="/founder/portrait-light.webp" alt=""/>
<div hidden="">Hidden menu</div><button type="button">Menu</button>
<form><label>Name<input name="name"/></label></form>
<footer><p>© MiddleLeap</p></footer></main></body></html>`;

describe("htmlToMarkdown", () => {
  const markdown = htmlToMarkdown(page);

  it("starts with YAML frontmatter from the page metadata", () => {
    expect(markdown.startsWith(`---
title: "Open Finance | MiddleLeap"
description: "Open Finance advisory & strategy."
image: "https://www.middleleap.com/opengraph-image"
url: "https://www.middleleap.com/open-finance"
---
`)).toBe(true);
  });

  it("keeps headings on one line and makes links and images absolute", () => {
    expect(markdown).toContain("# From mandate to *execution.*");
    expect(markdown).toContain("We help [ventures](https://www.middleleap.com/ventures) and clients.");
    expect(markdown).toContain("![Founder portrait](https://www.middleleap.com/founder/portrait.webp)");
    expect(markdown).not.toContain("portrait-light");
  });

  it("separates adjacent inline labels", () => {
    expect(markdown).toContain("**Frame** the mandate");
  });

  it("drops site chrome, controls, hidden and decorative content", () => {
    for (const text of ["Skip to content", "The practice", "Hidden menu", "Menu", "Name", "© MiddleLeap", "01", "main.js"]) {
      expect(markdown).not.toContain(text);
    }
  });

  it("appends JSON-LD as a fenced block", () => {
    expect(markdown.trimEnd().endsWith('```json\n{"@context":"https://schema.org","@type":"WebPage"}\n```')).toBe(true);
  });
});

describe("buildMarkdown", () => {
  let directory = "";
  afterEach(async () => {
    if (directory) await rm(directory, { recursive: true, force: true });
  });

  it("writes a Markdown twin per exported page, skipping error pages and Next.js assets", async () => {
    directory = await mkdtemp(path.join(tmpdir(), "markdown-"));
    await mkdir(path.join(directory, "ventures"));
    await mkdir(path.join(directory, "_next"));
    await writeFile(path.join(directory, "index.html"), page);
    await writeFile(path.join(directory, "ventures", "parqo.html"), page);
    await writeFile(path.join(directory, "404.html"), page);
    await writeFile(path.join(directory, "_next", "chunk.html"), page);

    const routes = await buildMarkdown(directory);

    expect(routes).toEqual(["/", "/ventures/parqo"]);
    expect(await readFile(path.join(directory, "ventures", "parqo.md"), "utf8")).toContain("# From mandate");
    await expect(readFile(path.join(directory, "404.md"), "utf8")).rejects.toThrow();
    await expect(readFile(path.join(directory, "_next", "chunk.md"), "utf8")).rejects.toThrow();
  });
});
