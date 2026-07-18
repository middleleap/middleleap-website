import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VentureProposalForm } from "@/components/VentureProposalForm";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "Venture Studio",
  description:
    "Propose an evidenced platform, regulated-market or financial-infrastructure problem to the MiddleLeap Venture Studio.",
  alternates: { canonical: "/ventures/studio" },
};

const criteria = [
  ["A real problem", "A clear operating, customer or ecosystem problem—not only a product idea."],
  ["Evidence", "Signals beyond the initial concept: observed behaviour, interviews, data or direct experience."],
  ["Access", "A credible route to customers, partners, operators or specialist domain knowledge."],
  ["A bounded test", "A way to learn through a focused wedge before committing to the full platform."],
  ["Strategic fit", "Relevance to regulated markets, platform businesses or financial infrastructure."],
  ["An active role", "A proposer prepared to contribute expertise, access, operating leadership or delivery capacity."],
] as const;

const process = [
  ["01", "Suggest", "Share the problem, evidence and your relationship to it.", "Investigate?"],
  ["02", "Screen", "Test strategic fit, access, boundaries and conflicts.", "Sprint?"],
  ["03", "Evidence sprint", "Pressure-test the problem before shaping the venture thesis.", "Pilot?"],
  ["04", "Bounded pilot", "Build the smallest useful wedge with explicit learning gates.", "Commit?"],
  ["05", "Decide", "Build, partner, contribute to the commons—or pass clearly.", "Path chosen"],
] as const;

export default function VentureStudioPage() {
  return (
    <main className={styles.shell} id="problem">
      <SiteHeader
        active="ventures"
        priority
        breadcrumbs={[
          { href: "/ventures", label: "Ventures" },
          { label: "Venture Studio" },
        ]}
        contextLabel="Venture Studio navigation"
        contextLinks={[
          { href: "#criteria", label: "What we look for" },
          { href: "#process", label: "Process" },
          { href: "#propose", label: "Propose" },
        ]}
      />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>MiddleLeap Venture Studio</p>
        <h1>Bring us a problem<br />worth <em>building around.</em></h1>
        <p className={styles.lede}>
          We work with operators, domain experts and potential partners to test focused
          propositions in regulated markets, platform businesses and financial infrastructure.
        </p>
        <div className={styles.actions}>
          <a href="#propose">Propose a venture</a>
          <Link href="/ventures#portfolio">Explore the portfolio</Link>
        </div>
      </section>

      <section className={styles.section} id="criteria">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>What we look for</p>
          <div><h2>Bring the problem, the evidence and your unfair access.</h2><p>The Studio is selective by design. A strong submission gives us a reason to investigate—not a finished pitch deck.</p></div>
        </div>
        <div className={styles.criteriaGrid}>
          {criteria.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section className={styles.section} id="process">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>How it moves</p>
          <div><h2>Evidence before surface area.</h2><p>Every step has a decision gate. The outcome may be a venture, a partnership, shared infrastructure or a clear decision not to proceed.</p></div>
        </div>
        <div className={styles.processSystem} aria-label="Venture Studio stage-gate process">
          <div className={styles.processHeader}><span>Studio decision system / 05</span><b>Evidence before commitment</b></div>
          <ol className={styles.processGrid}>
            {process.map(([number, title, detail, gate]) => (
              <li key={number}>
                <div className={styles.stageMeta}><span>{number}</span><b>Gate {number}</b></div>
                <h3>{title}</h3>
                <p>{detail}</p>
                <small>{gate}</small>
              </li>
            ))}
          </ol>
          <div className={styles.processOutcomes}>
            <span>Possible decisions</span>
            <div><b>Build</b><b>Partner</b><b>Contribute</b><b>Pass clearly</b></div>
          </div>
        </div>
      </section>

      <section className={styles.propose} id="propose">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Propose a venture</p>
          <div><h2>Start with a concise, non-confidential brief.</h2><p>Submission does not create an investment, confidentiality, partnership or advisory obligation. Please read the terms before preparing the email.</p></div>
        </div>
        <VentureProposalForm />
      </section>

      <SiteFooter />
    </main>
  );
}
