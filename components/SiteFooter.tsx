import Link from "next/link";
import styles from "./SiteChrome.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerIdentity}>
        <strong>MiddleLeap</strong>
        <p>Independent advisory practice · Dubai, UAE</p>
        <p>Working capability and institution-owned intelligence.</p>
      </div>
      <div className={styles.footerLinks}>
        <nav className={styles.footerGroup} aria-label="Proposition links">
          <span>Proposition</span>
          <Link href="/institutional-intelligence">Institutional Intelligence</Link>
          <Link href="/brainkit">BrainKit</Link>
          <Link href="/#model">Operating model</Link>
        </nav>
        <nav className={styles.footerGroup} aria-label="Advisory links">
          <span>Advisory</span>
          <Link href="/#expertise">What we do</Link>
          <Link href="/open-finance">Open Finance</Link>
          <Link href="/#practice">The practice</Link>
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
          <Link href="/#practice">Practice &amp; founder</Link>
          <a href="mailto:contact@middleleap.com">contact@middleleap.com</a>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
