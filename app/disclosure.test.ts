import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { founderCareer, founderPerson } from "@/lib/founder";
import { practiceEvidence } from "@/lib/practice";

const contentRoots = ["app", "components", "lib", "public", "docs", "brand-kit"] as const;
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

// The founder's public record must never claim a personal seat on the governing body of the
// national Open Finance platform operator. The claim exists in earlier draft
// copy and the CV; it stays off every public surface by the founder's decision.
// Patterns are assembled from fragments so this file cannot match itself.
const restrictedClaims = [
  new RegExp(["nebras", "board"].join(" "), "i"),
  new RegExp(["board", "seat"].join(" "), "i"),
  new RegExp(["board of", "nebras"].join(" "), "i"),
  new RegExp(["on the", "board"].join(" "), "i"),
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
  it("never claims a governing-body seat for the founder", async () => {
    const files = (await Promise.all(contentRoots.map(collectTextFiles))).flat();
    const findings: string[] = [];

    for (const file of files) {
      const content = await readFile(file, "utf8");
      for (const claim of restrictedClaims) {
        if (claim.test(content)) findings.push(`${file}: ${claim}`);
      }
    }

    expect(findings).toEqual([]);
  });

  it("names the institution consistently across the practice copy, the founder record and llms.txt", async () => {
    const llms = await readFile("public/llms.txt", "utf8");
    const openFinance = practiceEvidence.find((item) => item.label.includes("Open Finance"));

    expect(openFinance?.detail).toContain("ADCB Group");
    expect(founderCareer.some((role) => role.title.includes("ADCB Group"))).toBe(true);
    expect(founderPerson.alumniOf.some((org) => org.name === "Abu Dhabi Commercial Bank")).toBe(true);
    expect(llms).toContain("ADCB Group");
    expect(llms).not.toContain("a leading UAE bank");
  });

  it("keeps prior-role work dated so it cannot read as a MiddleLeap engagement", () => {
    for (const role of founderCareer) {
      expect(role.years).toMatch(/^\d{4} – (\d{4}|now)$/);
    }
  });
});
