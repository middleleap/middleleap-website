import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { buildCsp, headerLineLimit, inlineScriptHashes, inlineScriptPlaceholder } from "./build-csp.mjs";

const sourceFor = (body: string) => `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`;

describe("Content Security Policy inline-script hashes", () => {
  let directory = "";
  afterEach(async () => {
    if (directory) await rm(directory, { recursive: true, force: true });
  });

  it("hashes executable inline scripts and skips external scripts and data blocks", () => {
    const html = [
      '<script id="theme">document.documentElement.dataset.theme="light"</script>',
      '<script src="/_next/static/chunks/main.js" async=""></script>',
      '<script type="application/ld+json">{"@type":"Organization"}</script>',
      "<script>self.__next_f.push([1,\"x\"])</script>",
    ].join("");

    expect(inlineScriptHashes(html)).toEqual([
      sourceFor('document.documentElement.dataset.theme="light"'),
      sourceFor('self.__next_f.push([1,"x"])'),
    ]);
  });

  it("writes every page's hashes into _headers in place of the placeholder", async () => {
    directory = await mkdtemp(path.join(tmpdir(), "csp-"));
    await mkdir(path.join(directory, "ventures"));
    await writeFile(path.join(directory, "index.html"), "<script>one()</script><script>shared()</script>");
    await writeFile(path.join(directory, "ventures", "studio.html"), "<script>two()</script><script>shared()</script>");
    await writeFile(
      path.join(directory, "_headers"),
      `/*\n  Content-Security-Policy: script-src 'self' ${inlineScriptPlaceholder}\n`,
    );

    expect(await buildCsp(directory)).toBe(3);

    const headers = await readFile(path.join(directory, "_headers"), "utf8");
    expect(headers).not.toContain(inlineScriptPlaceholder);
    for (const body of ["one()", "two()", "shared()"]) expect(headers).toContain(sourceFor(body));
  });

  it("fails the build when the hash list outgrows one header line", async () => {
    directory = await mkdtemp(path.join(tmpdir(), "csp-"));
    const scripts = Array.from({ length: 60 }, (_, index) => `<script>page${index}()</script>`).join("");
    await writeFile(path.join(directory, "index.html"), scripts);
    await writeFile(path.join(directory, "_headers"), `/*\n  Content-Security-Policy: script-src ${inlineScriptPlaceholder}\n`);

    await expect(buildCsp(directory)).rejects.toThrow(String(headerLineLimit));
  });

  it("fails rather than write a policy when there is nothing to allow or nowhere to write it", async () => {
    directory = await mkdtemp(path.join(tmpdir(), "csp-"));
    await writeFile(path.join(directory, "index.html"), "<p>no scripts</p>");
    await writeFile(path.join(directory, "_headers"), `/*\n  Content-Security-Policy: script-src ${inlineScriptPlaceholder}\n`);
    await expect(buildCsp(directory)).rejects.toThrow(/No inline scripts/);

    await writeFile(path.join(directory, "_headers"), "/*\n  X-Frame-Options: DENY\n");
    await expect(buildCsp(directory)).rejects.toThrow(/placeholder/);
  });
});
