"use client";

import { useSyncExternalStore } from "react";
import styles from "./loom.module.css";

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
function currentTheme() { return document.documentElement.dataset.theme ?? null; }
function serverTheme() { return null; }

export function Artwork({ kind = "sculpture", priority = false }: { kind?: "sculpture" | "weave"; priority?: boolean }) {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, serverTheme);
  const src = `/images/loom/${kind}-1440.webp`;
  const sources = (variant: string) => [640, 960, 1440].map(width => `/images/loom/${kind}${variant}-${width}.webp ${width}w`).join(", ");
  const sizes = "(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 700px";
  // The server-rendered picture follows the device; hydration applies an explicit
  // preference and observes the shared theme switch, including automatic changes.
  // Fetch priority lets the browser discover the selected hero without preloading
  // an unconditional dark asset on light devices.
  const lightMedia = theme === null ? "(prefers-color-scheme: light)" : theme === "light" ? "all" : "not all";
  return <figure className={styles.artwork}>
    <picture>
      <source media={lightMedia} srcSet={sources("-light")} sizes={sizes} />
      {/* Static export has no image optimizer; local WebP sizes are generated ahead of time. */}
      <img src={src} srcSet={sources("")} sizes={sizes} width={1440} height={kind === "sculpture" ? 960 : 720} alt={kind === "sculpture" ? "A sculptural loom weaving ivory and copper threads into flowing fabric" : "Individual ivory and copper threads joining into a coherent woven structure"} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
    </picture>
    <figcaption><span>{kind === "sculpture" ? "Context becomes craft" : "Many threads. One coherent practice."}</span><span>AI-generated concept</span></figcaption>
  </figure>;
}
