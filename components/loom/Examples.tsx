import Link from "next/link";
import { sourceRoot } from "@/lib/loom-product";
import { meridianCase } from "@/lib/meridian-case";
import styles from "./loom.module.css";
const examples = [
  { id: "intake", title: "Institutional intake", status: "M01 · Fictional mandate · discovery only", lines: [["Sponsor's interest", "Become useful in customers' everyday money decisions"], ["Problem hypothesis", "Customers cannot see commitments across accounts or act confidently"], ["Proposition to test", "PFM alone versus PFM + customer-initiated transfers"], ["Open decision", "Customer evidence and Meridian's TPP permissions remain unverified"]], description: "Authorize research, not an app build. The problem, commercial case and right to operate must be established before the proposed solution becomes a commitment.", source: "intake/handoff.md", link: "Inspect the intake source structure" },
  { id: "configuration", title: "Team configuration", status: "M03 · Fictional checklist · setup pending", lines: [["Product lead", "Own the scope, acceptance criteria and evidence gaps"], ["Compliance + platform leads", "Establish authority, Hub onboarding and supported bank capabilities"], ["Data + security owners", "Review consent, retention, access and threat controls"], ["Payment operations owner", "Reconciliation procedure and delayed-status handling still pending"]], description: "Work through named responsibilities using synthetic data and simulated Hub/bank connections. These illustrative roles are not appointments; no live credentials, approvals or completed setup are claimed.", source: "core/configuration-tasks.json", link: "Inspect the configuration source structure" },
  { id: "release", title: "Release evidence", status: "M04 · Fictional decision · production blocked", lines: [["Proposed check", "A repeated transfer request must not create a second payment"], ["Open blocker", "Delayed-payment reconciliation has no accepted evidence"], ["Authority", "Regulatory route and launch prerequisites remain unresolved"], ["Release decision", "Withhold production authorization; synthetic demonstration only"]], description: "Illustrative evidence requirements, not results of executed tests. The repository's separate evidence example is deliberately refusable as a live release; Meridian's scenario values are editorial additions.", source: "evidence-example/README.md", link: "Inspect the release evidence source structure" },
];
export function Examples() {
  return <>
    <div className={styles.exampleIntro}><span className={styles.label}>{meridianCase.status}</span><h3>One mandate. Three connected artifacts.</h3><p>Meridian is exploring PFM with payment initiation through Open Finance. These excerpts connect the problem brief to delivery setup and a blocked release decision. The source links explain the Loom structures; the Meridian story is fictional.</p><Link href="/the-loom#meridian-case">Follow Meridian’s complete Loom intervention →</Link></div>
    <div className={styles.examples}>{examples.map(example => <article key={example.id}>
      <span className={styles.label}>{example.status}</span><h3>{example.title}</h3>
      <dl>{example.lines.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p>{example.description}</p><a href={`${sourceRoot}/${example.source}`} target="_blank" rel="noopener noreferrer">{example.link} ↗</a>
    </article>)}</div>
  </>;
}
