import Link from "next/link";
import styles from "@/app/page.module.css";

export function InstitutionalIntelligenceSystem() {
  return (
    <div className={styles.intelligenceSystem}>
      <div className={styles.intelligenceHeader}>
        <span>Institutional intelligence / one asset</span>
        <b>Owned by the institution</b>
      </div>

      <div className={styles.decisionArtifact}>
        <div className={styles.artifactHeader}>
          <span>Illustrative output / governed decision record</span>
          <b>Example record · OF-DR-014</b>
        </div>
        <div className={styles.artifactDecision}>
          <small>Decision</small>
          <strong>Adopt a dual LFI / TPP participation model</strong>
          <span>Approved example</span>
        </div>
        <div className={styles.artifactFields}>
          <div>
            <small>Evidence attached</small>
            <p>Regulatory framework · certification dependency · partner readiness</p>
          </div>
          <div>
            <small>Accountable owner</small>
            <p>Executive sponsor</p>
          </div>
          <div>
            <small>Review trigger</small>
            <p>Framework, certification or operating evidence changes</p>
          </div>
        </div>
      </div>

      <div className={styles.intelligenceFlow}>
        <article>
          <span>Institution-owned intelligence</span>
          <h3>Institutional Brain</h3>
          <p>Where the institution&apos;s approved understanding lives, so the next decision starts from the last one.</p>
          <Link href="/institutional-brain">Examine the Brain →</Link>
        </article>
        <i aria-hidden="true">→</i>
        <article>
          <span>Governed operating method</span>
          <h3>The Loom</h3>
          <p>Captures the decision through discovery and delivery while accountable people retain authority.</p>
          <Link href="/the-loom">Examine the method →</Link>
        </article>
        <i aria-hidden="true">→</i>
        <article className={styles.intelligenceOutcome}>
          <span>Engagement outcome</span>
          <h3>Working capability</h3>
          <p>The product, platform or operating model the institution runs once the engagement ends.</p>
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
