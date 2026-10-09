import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/*
  A dead-CSS sweep once removed whole `prefers-reduced-motion` blocks because one
  member of a grouped selector was dead, silently dropping the motion opt-out for
  the live members. Nothing else catches that: it is invisible to lint, to axe and
  to Lighthouse, and only affects users who have asked for reduced motion.

  Rule: any stylesheet that declares transitions or animations must also declare a
  reduced-motion opt-out.
*/
function collectStylesheets(directory: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...collectStylesheets(entryPath));
    else if (entry.name.endsWith(".css")) found.push(entryPath);
  }
  return found;
}

describe("reduced-motion coverage", () => {
  const stylesheets = ["app", "components", "brand-kit"].flatMap(collectStylesheets);

  it("finds the project stylesheets", () => {
    expect(stylesheets.length).toBeGreaterThan(5);
  });

  it("every stylesheet that animates also honours prefers-reduced-motion", () => {
    const offenders = stylesheets.filter((file) => {
      const css = readFileSync(file, "utf8");
      const animates = /(?:^|[;{\s])(?:transition|animation)(?:-duration|-name)?\s*:/.test(css);
      return animates && !css.includes("prefers-reduced-motion");
    });

    expect(offenders).toEqual([]);
  });
});
