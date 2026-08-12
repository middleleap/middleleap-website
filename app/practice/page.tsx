import type { Metadata } from "next";
import Link from "next/link";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  experienceProvenanceNote,
  practiceEvidence,
  practiceFacts,
  practicePrinciples,
} from "@/lib/practice";
import { jsonLdScript } from "@/lib/structured-data";
import { pageOpenGraph, siteOrigin } from "@/lib/seo";
import styles from "./practice.module.css";

const description =
  "MiddleLeap is an intentionally boutique, senior-led advisory practice in Dubai, assembling focused expertise around each mandate rather than maintaining a fixed consulting bench.";

export const metadata: Metadata = {
  title: "The Practice",
  description,
  alternates: { canonical: "/practice" },
  openGraph: pageOpenGraph({
    title: "The Practice | MiddleLeap",
    description,
    path: "/practice",
  }),
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${siteOrigin}/practice#page`,
      url: `${siteOrigin}/practice`,
      name: "The Practice",
      description,
      about: { "@id": `${siteOrigin}/#organization` },
      mainEntity: { "@id": `${siteOrigin}/#organization` },
    },
  ],
};

export default function PracticePage() {
  return (
    <main className={styles.shell} id="problem" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }}
      />

      <SiteHeader
        active="practice"
        breadcrumbs={[{ href: "/", label: "Advisory" }, { label: "The practice" }]}
        contextLabel="Practice navigation"
        contextLinks={[
          { href: "#model", label: "How we staff" },
          { href: "#evidence", label: "Evidence" },
          { href: "#engage", label: "Engage" },
        ]}
      />

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>The practice behind the mandate</p>
          <h1>Senior leadership, <em>assembled around the work.</em></h1>
          <p className={styles.lede}>
            MiddleLeap is an independent advisory practice built for mandates that cross
            strategy, regulation, product, technology and delivery. Each engagement is shaped
            around the work—not a fixed consulting bench.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Strategic%20mandate">
              Discuss a mandate
            </a>
            <Link className={styles.secondaryAction} href="/how-we-engage">
              See how we engage
            </Link>
          </div>
        </div>

        <aside className={styles.dossier} aria-label="Practice record">
          <div className={styles.dossierHeader}>
            <span>Practice record</span>
            <b>Intentionally boutique</b>
          </div>
          <dl>
            <div><dt>Founded</dt><dd>{practiceFacts.foundedYear}</dd></div>
            <div><dt>Base</dt><dd>{practiceFacts.base}</dd></div>
            <div><dt>Primary market</dt><dd>{practiceFacts.primaryMarket}</dd></div>
            <div><dt>Model</dt><dd>{practiceFacts.model}</dd></div>
            <div><dt>Contact</dt><dd>{practiceFacts.contactEmail}</dd></div>
          </dl>
        </aside>
      </section>

      <ExecutiveSummary
        title="Senior-led, and staffed around the problem."
        intro="MiddleLeap is intentionally boutique and networked. Each mandate carries clear senior accountability, specialists assembled around the problem and active client leadership."
        items={[
          { label: "Model", title: "Intentionally boutique and networked", detail: practiceFacts.model + "." },
          { label: "Accountability", title: practicePrinciples[0].title, detail: practicePrinciples[0].detail },
          { label: "Team", title: practicePrinciples[1].title, detail: practicePrinciples[1].detail },
          { label: "Ownership", title: practicePrinciples[2].title, detail: practicePrinciples[2].detail },
          {
            label: "Evidence",
            title: "Carried in from prior roles",
            detail:
              "Open Banking and Open Finance across MENA, business-banking ecosystems and enterprise transformation — built in prior executive roles and distinguished from work contracted directly by MiddleLeap.",
          },
        ]}
      />

      <section className={styles.section} id="model" tabIndex={-1}>
        <p className={styles.eyebrow}>How the practice is staffed</p>
        <h2>One senior lead. Specialists assembled around the <em>problem.</em></h2>
        <p className={styles.sectionLede}>
          Mandates that cross strategy, regulation, product, technology and delivery rarely fit
          one discipline. The practice keeps senior accountability constant and brings the rest
          of the expertise in where the work requires it.
        </p>
        <div className={styles.principleGrid}>
          {practicePrinciples.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="evidence" tabIndex={-1}>
        <p className={styles.eyebrow}>Experience carried into the practice</p>
        <h2>Operating evidence across regulated platforms and transformation.</h2>
        <p className={styles.provenance}>{experienceProvenanceNote}</p>
        <div className={styles.evidenceList}>
          {practiceEvidence.map((item) => (
            <div key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.engage} id="engage" tabIndex={-1}>
        <p className={styles.eyebrow}>Start with the mandate in front of you</p>
        <h2>Bring the right senior expertise to the problem.</h2>
        <p>
          Prefer to use your own email client? Copy {practiceFacts.contactEmail}.
        </p>
        <div className={styles.engageActions}>
          <a href="mailto:contact@middleleap.com?subject=Strategic%20mandate">Discuss your mandate →</a>
          <Link href="/how-we-engage">See how we engage →</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
