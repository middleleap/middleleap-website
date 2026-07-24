import { describe, expect, it } from "vitest";
import { parseThemeMode, resolveTheme } from "./theme";

describe("theme preference", () => {
  it("defaults missing and unknown preferences to auto", () => {
    expect(parseThemeMode(null)).toBe("auto");
    expect(parseThemeMode("auto")).toBe("auto");
    expect(parseThemeMode("unknown")).toBe("auto");
  });

  it("preserves explicit light and dark preferences", () => {
    expect(parseThemeMode("light")).toBe("light");
    expect(parseThemeMode("dark")).toBe("dark");
  });

  it("resolves auto from the operating-system preference", () => {
    expect(resolveTheme("auto", true)).toBe("light");
    expect(resolveTheme("auto", false)).toBe("dark");
  });

  it("keeps manual overrides independent of the system preference", () => {
    expect(resolveTheme("light", false)).toBe("light");
    expect(resolveTheme("dark", true)).toBe("dark");
  });
});
