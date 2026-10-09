import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import nextConfig from "../next.config";
import markdownAdapter from "./markdown-adapter.mjs";

describe("Markdown for Agents build adapter", () => {
  let projectDir = "";
  afterEach(async () => {
    if (projectDir) await rm(projectDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it("is registered in next.config so every `next build` writes the twins", () => {
    expect(nextConfig.adapterPath).toBe(path.resolve(__dirname, "markdown-adapter.mjs"));
  });

  it("writes the Markdown twins into out/ when the build completes", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    projectDir = await mkdtemp(path.join(tmpdir(), "adapter-"));
    await mkdir(path.join(projectDir, "out"));
    await writeFile(
      path.join(projectDir, "out", "index.html"),
      '<html><head><title>Home</title></head><body><main><h1>Home</h1></main></body></html>',
    );

    await markdownAdapter.onBuildComplete?.({ projectDir } as never);

    expect(await readFile(path.join(projectDir, "out", "index.md"), "utf8")).toContain("# Home");
  });
});
