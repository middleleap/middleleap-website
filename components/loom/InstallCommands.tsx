"use client";
import { useSyncExternalStore, useState } from "react";
import { installationCommands } from "@/lib/loom-product";
import styles from "./loom.module.css";
const subscribe = () => () => {};
export function InstallCommands() {
  const [status, setStatus] = useState("");
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false);
  return <div className={styles.commands}>
    <div className={styles.commandHeader}><span>Claude Code / installation</span>{enhanced && <button onClick={async () => {
      try { await navigator.clipboard.writeText(installationCommands); setStatus("Installation commands copied."); }
      catch { setStatus("Copy unavailable. Select and copy the commands below."); }
    }}>Copy commands</button>}</div>
    <pre role="region" tabIndex={0} aria-label="AI-DLC installation commands"><code>{installationCommands}</code></pre><p role="status">{status}</p>
  </div>;
}
