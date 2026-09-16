import { describe, expect, it } from "vitest";
import { installationCommands, sourceRoot, toolkitSource } from "./loom-product";
import { loomRelease } from "./proof";

describe("toolkit provenance", () => {
  it("keeps release metadata and pinned example links aligned", () => {
    expect(loomRelease.version).toBe(toolkitSource.loomVersion);
    expect(sourceRoot).toContain(`/tree/${toolkitSource.commit}/`);
    expect(toolkitSource.commit).toMatch(/^[a-f0-9]{40}$/);
    expect(loomRelease.evidenceDetail).toContain("not version-specific qualification");
  });
  it("copies only installation commands, not adoption or approval actions", () => {
    expect(installationCommands.split("\n")).toEqual([
      "/plugin marketplace add middleleap/ai-dlc",
      "/plugin install middleleap-loom@middleleap-ai-dlc",
      "/plugin install middleleap-ai-sdlc@middleleap-ai-dlc",
    ]);
  });
});
