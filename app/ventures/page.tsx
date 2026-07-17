import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { VenturesPortfolio } from "@/components/VenturesPortfolio";
import styles from "./ventures.module.css";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "Open ecosystem infrastructure, platform ventures and AI-native execution systems built and contributed to by MiddleLeap.",
  alternates: { canonical: "/ventures" },
  openGraph: {
    title: "MiddleLeap Ventures | Building What We Advise",
    description:
      "Working platforms, open infrastructure and AI-native execution systems grounded in regulated markets.",
    url: "https://middleleap.com/ventures",
  },
};

const principles = [
  {
    number: "01",
    title: "Build",
    detail: "Turn propositions, ecosystem needs and delivery methods into working assets.",
  },
  {
    number: "02",
    title: "Learn",
    detail: "Capture market, platform and execution intelligence from operating reality.",
  },
  {
    number: "03",
    title: "Apply",
    detail: "Use the learning to sharpen mandates and de-risk client execution.",
  },
];

export default function VenturesPage() {
  return (
    <main className={styles.shell} id="problem">
      <header className={styles.nav}>
        <BrandLockup />
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <Link href="/#expertise">Expertise</Link>
          <Link href="/#method">How we work</Link>
          <Link href="/the-loom">The Loom</Link>
          <Link href="/ventures" aria-current="page">Ventures</Link>
          <Link href="/#experience">Experience</Link>
        </nav>
        <Link className={styles.navCta} href="/#engage">Discuss a mandate</Link>
        <Link className={styles.mobileNavLink} href="/">Advisory</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>MiddleLeap Ventures</p>
          <h1>We build what<br />we <em>advise.</em></h1>
          <p className={styles.lede}>
            MiddleLeap contributes to open ecosystems, creates focused platform
            ventures and codifies governed AI-native ways of working. Each initiative
            turns strategic ideas into operating evidence.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#portfolio">Explore the portfolio</a>
            <Link className={styles.secondaryAction} href="/">Return to advisory</Link>
          </div>
        </div>

        <div className={styles.heroSystem} aria-label="Venture learning system">
          <div className={styles.systemHeader}>
            <span>Venture intelligence system / 03</span>
            <span><i aria-hidden="true" /> Operating</span>
          </div>
          <div className={styles.systemBody}>
            <div className={styles.systemOrbit} aria-hidden="true">
              <span className={styles.orbitOne}>Open ecosystems</span>
              <span className={styles.orbitTwo}>Platforms</span>
              <span className={styles.orbitThree}>AI-native tooling</span>
              <b>Build<br />Learn<br />Apply</b>
            </div>
          </div>
          <div className={styles.systemOutput}>
            <span>Advisory advantage</span>
            <strong>Evidence grounded in operating reality</strong>
            <b>→</b>
          </div>
        </div>
      </section>

      <section className={styles.thesis}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The portfolio thesis</p>
          <h2>Advisory identifies the mandate. Ventures test the proposition. Tooling compounds the learning.</h2>
        </div>
        <div className={styles.principleGrid}>
          {principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.portfolio} id="portfolio" tabIndex={-1}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The portfolio</p>
          <h2>Three ways of building practical intelligence.</h2>
        </div>
        <VenturesPortfolio />
      </section>

      <section className={styles.boundary}>
        <div>
          <p className={styles.eyebrow}>Clear by design</p>
          <h2>Contribution, ownership and collaboration remain explicit.</h2>
        </div>
        <div className={styles.boundaryCopy}>
          <p>
            OpenFinance-OS is presented as independent, community-led
            infrastructure. MiddleLeap&apos;s role is contribution and stewardship,
            not institutional ownership.
          </p>
          <p>
            MiddleLeap platform ventures and execution systems are identified
            separately, with their maturity and operating status made visible.
          </p>
        </div>
      </section>

      <section className={styles.engage}>
        <p className={styles.eyebrow}>From operating evidence to your mandate</p>
        <h2>Bring platform-building experience into the room.</h2>
        <p>
          Explore how the portfolio&apos;s market, platform and execution intelligence
          can strengthen a regulated transformation mandate.
        </p>
        <a className={styles.engageAction} href="mailto:contact@middleleap.com?subject=Ventures%20and%20strategic%20mandate">
          Discuss your mandate →
        </a>
      </section>

      <footer className={styles.footer}>
        <span>MiddleLeap · Independent advisory firm · Dubai, UAE</span>
        <Link href="/">Advisory home</Link>
      </footer>
    </main>
  );
}
