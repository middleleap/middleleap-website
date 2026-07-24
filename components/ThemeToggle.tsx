"use client";

import { useEffect, useState } from "react";
import {
  parseThemeMode,
  resolveTheme,
  themeStorageKey,
  type Theme,
  type ThemeMode,
} from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

const modes: Array<{ value: ThemeMode; shortLabel: string; label: string }> = [
  { value: "auto", shortLabel: "A", label: "Automatic theme" },
  { value: "light", shortLabel: "L", label: "Light theme" },
  { value: "dark", shortLabel: "D", label: "Dark theme" },
];

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function applyMode(mode: ThemeMode, systemPrefersLight: boolean) {
  document.documentElement.dataset.themeMode = mode;
  applyTheme(resolveTheme(mode, systemPrefersLight));
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("auto");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    const syncStoredMode = () => {
      const nextMode = parseThemeMode(localStorage.getItem(themeStorageKey));
      applyMode(nextMode, media.matches);
      setMode(nextMode);
    };

    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (parseThemeMode(localStorage.getItem(themeStorageKey)) !== "auto") {
        return;
      }
      applyMode("auto", event.matches);
    };

    const followStoredMode = (event: StorageEvent) => {
      if (event.key && event.key !== themeStorageKey) return;
      syncStoredMode();
    };

    syncStoredMode();
    media.addEventListener("change", followSystemTheme);
    window.addEventListener("storage", followStoredMode);
    return () => {
      media.removeEventListener("change", followSystemTheme);
      window.removeEventListener("storage", followStoredMode);
    };
  }, []);

  const selectMode = (nextMode: ThemeMode) => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    if (nextMode === "auto") {
      localStorage.removeItem(themeStorageKey);
    } else {
      localStorage.setItem(themeStorageKey, nextMode);
    }
    applyMode(nextMode, media.matches);
    setMode(nextMode);
  };

  return (
    <div
      className={styles.toggle}
      role="group"
      aria-label="Theme preference"
    >
      <span className={styles.track} data-mode={mode}>
        <span className={styles.thumb} aria-hidden="true" />
        {modes.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.option}
            aria-label={`Use ${option.label.toLowerCase()}`}
            aria-pressed={mode === option.value}
            title={
              option.value === "auto"
                ? "Auto (follow device)"
                : option.label
            }
            onClick={() => selectMode(option.value)}
          >
            {option.shortLabel}
          </button>
        ))}
      </span>
    </div>
  );
}
