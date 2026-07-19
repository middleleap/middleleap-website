"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "dark" | "light";

const storageKey = "middleleap-theme";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme, persist: boolean) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  if (persist) localStorage.setItem(storageKey, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(storageKey)) return;
      const nextTheme = event.matches ? "light" : "dark";
      applyTheme(nextTheme, false);
      setTheme(nextTheme);
    };

    media.addEventListener("change", followSystemTheme);
    return () => media.removeEventListener("change", followSystemTheme);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      role="switch"
      suppressHydrationWarning
      aria-checked={theme === "light"}
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={() => {
        applyTheme(nextTheme, true);
        setTheme(nextTheme);
      }}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.darkIcon}>D</span>
        <span className={styles.lightIcon}>L</span>
        <span className={styles.thumb} />
      </span>
    </button>
  );
}
