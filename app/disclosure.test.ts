import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const contentRoots = ["app", "components", "lib", "public"] as const;
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
]);

const restrictedTerms = [
  ["A", "D", "C", "B"].join(""),
  ["Abu", "Dhabi", "Commercial", "Bank"].join(" "),
] as const;

async function collectTextFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectTextFiles(entryPath);
    return textExtensions.has(path.extname(entry.name)) ? [entryPath] : [];
  }));

  return files.flat();
}

describe("public disclosure boundaries", () => {
  it("does not name the restricted institution", async () => {
    const files = (await Promise.all(contentRoots.map(collectTextFiles))).flat();
    const findings: string[] = [];

    for (const file of files) {
      const content = await readFile(file, "utf8");
      for (const term of restrictedTerms) {
        if (content.toLocaleLowerCase("en").includes(term.toLocaleLowerCase("en"))) {
          findings.push(`${file}: ${term}`);
        }
      }
    }

    expect(findings).toEqual([]);
  });
});
