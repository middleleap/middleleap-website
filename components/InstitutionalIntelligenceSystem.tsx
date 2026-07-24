import Link from "next/link";
import styles from "@/app/page.module.css";

const intelligenceInputs = [
  ["01", "Market", "Mandate, proposition and ecosystem"],
  ["02", "Architecture", "Systems, interfaces and constraints"],
  ["03", "Decisions", "Rationale, rights and precedent"],
  ["04", "Controls", "Policy, evidence and assurance"],
] as const;

export function InstitutionalIntelligenceSystem() {
  return (
    <div
      className={styles.intelligenceSystem}
      role="img"
      aria-label="A strategic mandate becomes working capability through an institution-owned BrainKit and The Loom, with operating evidence returning to the institution"
    >
      <div className={styles.intelligenceHeader}>
        <span>Institutional intelligence / 04</span>
        <b>Owned by the institution</b>
      </div>

      <div className={styles.intelligenceInputs}>
        {intelligenceInputs.map(([number, title, detail]) => (
          <div key={number}>
            <span>{number}</span>
            <strong>{title}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </div>

      <div className={styles.intelligenceFlow}>
        <article>
          <span>Private institutional asset</span>
          <h3>BrainKit</h3>
          <p>Captures approved context, decisions, architecture and policy.</p>
          <Link href="/brainkit">Examine the asset →</Link>
        </article>
        <i aria-hidden="true">→</i>
        <article>
          <span>Governed operating method</span>
          <h3>The Loom</h3>
          <p>Applies institutional context through discovery, delivery and assurance.</p>
          <Link href="/the-loom">Examine the method →</Link>
        </article>
        <i aria-hidden="true">→</i>
        <article className={styles.intelligenceOutcome}>
          <span>Engagement outcome</span>
          <h3>Working capability</h3>
          <p>A market, platform or operating capability the institution can run.</p>
          <Link href="/institutional-intelligence">See the full model →</Link>
        </article>
      </div>

      <div className={styles.intelligenceReturn}>
        <span>Operating evidence returns</span>
        <b aria-hidden="true">↶</b>
        <strong>Every governed decision makes the next mandate less dependent on remembered context.</strong>
      </div>
    </div>
  );
}
