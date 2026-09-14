"use client";
import { useSyncExternalStore, useId, useState } from "react";
import Link from "next/link";
import { meridianCase, meridianStages, meridianDomainChecks } from "@/lib/meridian-case";
import styles from "./loom.module.css";
const subscribe = () => () => {};
const stages = meridianStages;
export function Walkthrough() {
  const [active, setActive] = useState(0);
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false);
  const id = useId();
  return <div className={styles.walkthrough}>
    <div className={styles.caseBrief}><span className={styles.label}>{meridianCase.status}</span><h3>{meridianCase.name}: {meridianCase.question}</h3><p>{meridianCase.brief}</p><p><strong>Mandate → evidence → intervention → outcome → next decision.</strong> Each stage below follows the same fictional case.</p></div>
    {enhanced && <div className={styles.tabs} role="tablist" aria-label="Loom stages">{stages.map(({ name }, i) => <button key={name} id={`${id}-tab-${i}`} role="tab" aria-selected={active === i} aria-controls={`${id}-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => {
      let next: number;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % 4;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i + 3) % 4;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = 3;
      else return;
      e.preventDefault(); setActive(next); document.getElementById(`${id}-tab-${next}`)?.focus();
    }}><span>0{i + 1}</span>{name}</button>)}</div>}
    {stages.map(({ name, title, body, output, questions, decision }, i) => <div key={name} id={`${id}-panel-${i}`} className={styles.panel} role={enhanced ? "tabpanel" : undefined} aria-labelledby={enhanced ? `${id}-tab-${i}` : undefined} hidden={enhanced && active !== i} tabIndex={enhanced ? 0 : undefined}>
      <span className={styles.label}>{name} / {i < 2 ? "Discovery harness" : "Delivery harness"}</span><h3>{title}</h3><p>{body}</p><dl className={styles.caseQuestions}>{questions.map(([label, detail]) => <div key={label}><dt>{label}</dt><dd>{detail}</dd></div>)}</dl><p className={styles.caseDecision}>{decision}</p><p className={styles.output}>Output / {output}</p>
    </div>)}
    <div className={styles.feedback}><strong>Run / Operations ↶</strong><p>After a separately authorized launch, observe customer usefulness, consent completion, data freshness, pending payments, complaints and cost to serve. In the simulated learning branch, customers still cannot tell whether a transfer completed: investigate status and support first, then revisit the proposition if payments add complexity without value.</p><p><strong>M05 · Outcome review → new intervention.</strong> Operational ownership continues while evidence reopens the relevant discovery or delivery decision. No live operating results are claimed.</p></div>
    <details className={styles.caseScope}><summary>What Meridian must consider across the intervention</summary><dl className={styles.caseQuestions}>{meridianDomainChecks.map(([label, detail]) => <div key={label}><dt>{label}</dt><dd>{detail}</dd></div>)}</dl></details>
    <div className={styles.caseSources}><p>The optional Open Finance pack supplies domain guidance. The Loom structures the evidence and decisions; Meridian retains accountability.</p><Link href="/ai-dlc#examples">Inspect Meridian’s three example artifacts →</Link><p>Domain references: <a href="https://rulebook.centralbank.ae/en/rulebook/article-4-limitations-0" target="_blank" rel="noopener noreferrer">CBUAE activity boundaries ↗</a> · <a href="https://www.nebras-open-finance.com/tech/tpp-standards/v2.1/consent" target="_blank" rel="noopener noreferrer">UAE consent guidance ↗</a>. Requirements and deployed platform capabilities must be verified for the actual mandate.</p></div>
  </div>;
}
