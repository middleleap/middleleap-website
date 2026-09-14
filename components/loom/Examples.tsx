import { sourceRoot } from "@/lib/loom-product";
import styles from "./loom.module.css";
const examples = [
  { id: "intake", title: "Institutional intake", status: "Illustrative draft · review pending", lines: [["Institution", "Fictional example institution"], ["Architecture principles", "Source reference requested"], ["Decision rights", "Accountable owner to confirm"]], description: "Capture answers and source references. Supplied answers remain claims until checked; an intake is not approval.", source: "intake/handoff.md", link: "Read the intake handoff" },
  { id: "configuration", title: "Team configuration", status: "Illustrative checklist · inputs pending", lines: [["CODEOWNERS", "Platform administrator"], ["Control catalog", "Governance owner to confirm"], ["Identities", "Platform administrator"]], description: "The configuration inventory names required inputs and roles to involve. These labels do not appoint people or establish readiness.", source: "core/configuration-tasks.json", link: "Inspect the configuration inventory" },
  { id: "release", title: "Release evidence", status: "Source example · deliberately refusable", lines: [["Manifest", "Artifact hashes and chain"], ["Review & test records", "Linked supporting evidence"], ["Release commit / signer", "Fictional / demo — not a live release"]], description: "The committed example demonstrates the evidence structure. Its fictional commit and demo signer deliberately prevent acceptance as a live release.", source: "evidence-example/README.md", link: "Inspect the evidence example" },
];
export function Examples() {
  return <div className={styles.examples}>{examples.map(example => <article key={example.id}>
    <span className={styles.label}>{example.status}</span><h3>{example.title}</h3>
    <dl>{example.lines.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <p>{example.description}</p><a href={`${sourceRoot}/${example.source}`} target="_blank" rel="noopener noreferrer">{example.link} ↗</a>
  </article>)}</div>;
}
