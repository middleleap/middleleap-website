"use client";
import { useSyncExternalStore, useId, useState } from "react";
import styles from "./loom.module.css";
const subscribe = () => () => {};
const stages = [
  ["Discover", "Find the problem worth solving.", "Explore people, constraints and evidence before committing to a solution. Challenge assumptions and identify the outcome that matters.", "An evidenced problem frame"],
  ["Define", "Make the next decision clear.", "Test the framing, surface risks and make the direction tangible. A gated hand-off connects discovery evidence to the work entering delivery.", "A reviewed discovery hand-off"],
  ["Develop", "Give agents a controlled loop.", "Explore solution directions, then implement against agreed contracts and acceptance criteria. Bounded reviewers challenge the work within institutional controls.", "Tested changes and review evidence"],
  ["Deliver", "Keep the release accountable.", "Assemble evidence and route authorization to accountable humans. Installation and passing repository checks do not establish production readiness.", "A release package for human authorization"],
];
export function Walkthrough() {
  const [active, setActive] = useState(0);
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false);
  const id = useId();
  return <div className={styles.walkthrough}>
    {enhanced && <div className={styles.tabs} role="tablist" aria-label="Loom stages">{stages.map(([name], i) => <button key={name} id={`${id}-tab-${i}`} role="tab" aria-selected={active === i} aria-controls={`${id}-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => {
      let next: number;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % 4;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i + 3) % 4;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = 3;
      else return;
      e.preventDefault(); setActive(next); document.getElementById(`${id}-tab-${next}`)?.focus();
    }}><span>0{i + 1}</span>{name}</button>)}</div>}
    {stages.map(([name, title, body, output], i) => <div key={name} id={`${id}-panel-${i}`} className={styles.panel} role={enhanced ? "tabpanel" : undefined} aria-labelledby={enhanced ? `${id}-tab-${i}` : undefined} hidden={enhanced && active !== i} tabIndex={enhanced ? 0 : undefined}>
      <span className={styles.label}>{name} / {i < 2 ? "Discovery harness" : "Delivery harness"}</span><h3>{title}</h3><p>{body}</p><p className={styles.output}>Output / {output}</p>
    </div>)}
    <div className={styles.feedback}><strong>Run / Operations ↶</strong><p>Observe outcomes, incidents and change. Route fixes to delivery; return evidence that challenges the problem to Discovery.</p></div>
  </div>;
}
