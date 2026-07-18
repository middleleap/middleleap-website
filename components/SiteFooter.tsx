import Link from "next/link";
import styles from "./SiteChrome.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerIdentity}>
        <strong>MiddleLeap</strong>
        <p>Independent advisory firm and venture studio · Dubai, UAE</p>
      </div>
      <div className={styles.footerLinks}>
        <nav className={styles.footerGroup} aria-label="Advisory links">
          <span>Advisory</span>
          <Link href="/#expertise">What we do</Link>
          <Link href="/#method">How we work</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#engage">Discuss a mandate</Link>
        </nav>
        <nav className={styles.footerGroup} aria-label="Execution links">
          <span>Execution</span>
          <Link href="/the-loom">The Loom</Link>
          <Link href="/ai-dlc">The Loom Toolkit</Link>
        </nav>
        <nav className={styles.footerGroup} aria-label="Venture links">
          <span>Ventures</span>
          <Link href="/ventures#portfolio">Portfolio</Link>
          <Link href="/ventures/studio">Venture Studio</Link>
          <Link href="/ventures/backoffice">Backoffice</Link>
          <Link href="/ventures/parqo">Parqo</Link>
          <Link href="/ventures/hivemind">HiveMind</Link>
        </nav>
        <nav className={styles.footerGroup} aria-label="Company links">
          <span>Company</span>
          <a href="mailto:contact@middleleap.com">Contact</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/venture-submission-terms">Submission terms</Link>
        </nav>
      </div>
    </footer>
  );
}
