import type { Metadata } from "next";
import Link from "next/link";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { engagementModels } from "@/lib/engagements";
import { practiceFacts, practicePrinciples } from "@/lib/practice";
import { pageOpenGraph } from "@/lib/seo";
import styles from "./engage.module.css";

const description =
  "Executive advisory, strategy sprints and transformation mobilisation. MiddleLeap assembles senior regulatory, strategy, product, technology and delivery expertise around the mandate rather than bringing a fixed bench.";

export const metadata: Metadata = {
  title: "How We Engage",
  description,
  alternates: { canonical: "/how-we-engage" },
  openGraph: pageOpenGraph({
    title: "How We Engage | MiddleLeap",
    description,
    path: "/how-we-engage",
  }),
};

export default function HowWeEngagePage() {
  return (
    <main className={styles.shell} id="problem" tabIndex={-1}>
      <SiteHeader
        active="method"
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/#method", label: "How we work" },
          { label: "Engagement models" },
        ]}
        contextLabel="Engagement navigation"
        contextLinks={[
          { href: "#models", label: "Models" },
          { href: "#staffing", label: "How we staff" },
          { href: "#start", label: "Start" },
        ]}
      />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Engagement models</p>
        <h1>Start with the decision that <em>cannot stay unresolved.</em></h1>
        <p className={styles.lede}>
          MiddleLeap assembles senior regulatory, strategy, product, technology and
          delivery expertise around the mandate rather than bringing a fixed bench.
        </p>
        <div className={styles.actions}>
          <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Strategic%20mandate">
            Discuss your mandate
          </a>
          <a className={styles.secondaryAction} href="#models">See the models</a>
        </div>
      </section>

      <ExecutiveSummary
        title="Three ways to start. One accountable lead."
        intro="Every mandate begins with a decision that cannot stay unresolved. The three models differ in scope and pace, not in senior accountability."
        items={[
          {
            label: "01",
            title: engagementModels[0].label,
            detail: engagementModels[0].detail,
          },
          {
            label: "02",
            title: engagementModels[1].label,
            detail: engagementModels[1].detail,
          },
          {
            label: "03",
            title: engagementModels[2].label,
            detail: engagementModels[2].detail,
          },
          {
            label: "Staffing",
            title: practicePrinciples[0].title,
            detail: practicePrinciples[0].detail,
          },
          {
            label: "Ownership",
            title: practicePrinciples[2].title,
            detail: practicePrinciples[2].detail,
          },
        ]}
      />

      <section className={styles.section} id="models" tabIndex={-1}>
        <p className={styles.eyebrow}>The three models</p>
        <h2>Scoped to the decision, not to a <em>calendar.</em></h2>
        <p className={styles.sectionLede}>
          The models are entry points. Which one fits depends on how much of the mandate is
          already settled and how quickly the institution needs to move.
        </p>
        <div className={styles.modelList}>
          {engagementModels.map((model, index) => (
            <article key={model.key}>
              <span>0{index + 1}</span>
              <h3><small>{model.label}</small>{model.title}</h3>
              <p>{model.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="staffing" tabIndex={-1}>
        <p className={styles.eyebrow}>How we staff</p>
        <h2>A senior lead stays accountable. The rest is assembled around the work.</h2>
        <p className={styles.sectionLede}>
          {practiceFacts.model}. That is the difference from a fixed bench: expertise is
          brought in where the mandate requires it, and the client stays inside the working
          system rather than receiving its output.
        </p>
        <div className={styles.staffingGrid}>
          {practicePrinciples.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </article>
          ))}
        </div>
        <Link className={styles.evidenceLink} href="/practice#evidence">
          See the experience carried into the practice →
        </Link>
      </section>

      <section className={styles.start} id="start" tabIndex={-1}>
        <p className={styles.eyebrow}>Start with the mandate in front of you</p>
        <h2>Bring the right senior expertise to the problem.</h2>
        <p>Prefer to use your own email client? Copy {practiceFacts.contactEmail}.</p>
        <div className={styles.startActions}>
          <a href="mailto:contact@middleleap.com?subject=Strategic%20mandate">Discuss your mandate →</a>
          <Link href="/practice">Meet the practice →</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
