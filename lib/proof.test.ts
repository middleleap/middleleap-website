import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loomProof } from "./proof";

// public/llms.txt is hand-maintained prose; this guard keeps its copy of the
// proof figures in sync with the lib/proof.ts source of truth used by pages.
describe("proof figure consistency", () => {
  it("llms.txt states the same story figures as lib/proof.ts", () => {
    const llms = readFileSync("public/llms.txt", "utf8");
    expect(llms).toContain(
      `${loomProof.storiesDone} of approximately ${loomProof.storiesTotalApprox} stories`,
    );
  });

  it("ratio string matches its component figures", () => {
    expect(loomProof.storiesRatio).toBe(
      `${loomProof.storiesDone} / ~${loomProof.storiesTotalApprox}`,
    );
  });
});
