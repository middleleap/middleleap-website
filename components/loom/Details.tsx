"use client";
import { useEffect, type ReactNode } from "react";
import styles from "./loom.module.css";
export function MethodDetails({ title, children }: { title: string; children: ReactNode }) {
  return <details className={styles.details}><summary>{title}</summary><div>{children}</div></details>;
}
export function RevealFragment() {
  useEffect(() => {
    function reveal() {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      let parent = target.parentElement;
      let changed = false;
      while (parent) { if (parent instanceof HTMLDetailsElement && !parent.open) { parent.open = true; changed = true; } parent = parent.parentElement; }
      if (changed) target.scrollIntoView({ block: "start" });
    }
    reveal(); window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  return null;
}
