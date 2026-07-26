export type Theme = "dark" | "light";
export type ThemeMode = "auto" | Theme;

export const themeStorageKey = "middleleap-theme";

export function parseThemeMode(value: string | null): ThemeMode {
  return value === "auto" || value === "light" || value === "dark"
    ? value
    : "dark";
}

export function resolveTheme(
  mode: ThemeMode,
  systemPrefersLight: boolean,
): Theme {
  if (mode !== "auto") return mode;
  return systemPrefersLight ? "light" : "dark";
}
