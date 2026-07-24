import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
    url: "https://www.middleleap.com/ventures",
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
      <SiteHeader
        active="ventures"
        priority
        breadcrumbs={[{ href: "/", label: "Advisory" }, { label: "Ventures" }]}
        contextLabel="Ventures navigation"
        contextLinks={[
          { href: "#portfolio", label: "Portfolio" },
          { href: "#ecosystem", label: "Ecosystem" },
          { href: "/ventures/studio", label: "Venture Studio" },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>MiddleLeap Ventures</p>
          <h1>We build what<br />we <em>advise.</em></h1>
          <p className={styles.lede}>
            MiddleLeap creates focused ventures and contributes selectively to open
            ecosystems. Each initiative turns a strategic proposition into operating
            and commercial evidence.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#portfolio">Explore the portfolio</a>
            <Link className={styles.secondaryAction} href="/">Return to advisory</Link>
          </div>
        </div>

        <div className={styles.heroSystem} role="img" aria-label="Venture learning system">
          <div className={styles.systemHeader}>
            <span>Venture intelligence system / 03</span>
            <span><i aria-hidden="true" /> Operating</span>
          </div>
          <div className={styles.systemBody}>
            <div className={styles.systemOrbit} aria-hidden="true">
              <span className={styles.orbitOne}>Backoffice</span>
              <span className={styles.orbitTwo}>Parqo</span>
              <span className={styles.orbitThree}>HiveMind</span>
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
          <h2>Advisory identifies mandates. Ventures test propositions. The Studio opens the door to the next one.</h2>
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
          <h2>One flagship regulated proof. Two venture experiments. One compounding body of evidence.</h2>
        </div>
        <VenturesPortfolio />
      </section>

      <section className={styles.studioCallout} id="studio">
        <div>
          <p className={styles.eyebrow}>MiddleLeap Venture Studio</p>
          <h2>Bring us a problem worth building around.</h2>
        </div>
        <div>
          <p>
            We work with operators, domain experts and potential partners to test focused
            propositions in regulated markets, platform businesses and financial infrastructure.
          </p>
          <Link href="/ventures/studio">Propose a venture →</Link>
        </div>
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
            MiddleLeap-owned ventures and independent ecosystem contributions are
            identified separately, with maturity, role and operating status made visible.
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

      <SiteFooter />
    </main>
  );
}
