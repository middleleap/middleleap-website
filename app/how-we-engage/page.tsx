import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { bookingLinkProps, mailtoHref } from "@/lib/contact";
import { engagementModels } from "@/lib/engagements";
import { practiceFacts } from "@/lib/practice";
import { pageMetadata } from "@/lib/seo";
import styles from "./engage.module.css";

const description =
  "Executive advisory, strategy sprints and transformation mobilisation. MiddleLeap assembles senior regulatory, strategy, product, technology and delivery expertise around the mandate rather than bringing a fixed bench.";

export const metadata = pageMetadata({
  title: "How We Engage",
  description,
  path: "/how-we-engage",
  socialTitle: "How We Engage | MiddleLeap",
});

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
          <a className={styles.primaryAction} {...bookingLinkProps}>
            Book a conversation
          </a>
          <a className={styles.secondaryAction} href="#models">See the models</a>
        </div>
      </section>

      <section className={styles.section} id="models" tabIndex={-1}>
        <p className={styles.eyebrow}>The three models</p>
        <h2>Three ways to start, <em>scoped to the decision.</em></h2>
        <p className={styles.sectionLede}>
          The models are entry points. Which one fits depends on how much of the mandate is
          already settled and how quickly the institution needs to move. Scope, fees and
          responsibilities are agreed for each engagement.
        </p>
        <div className={styles.modelList}>
          {engagementModels.map((model, index) => (
            <article key={model.key} id={model.key} tabIndex={-1}>
              <span>0{index + 1}</span>
              <div>
                <h3><small>{model.label}</small>{model.title}</h3>
                <p>{model.detail}</p>
              </div>
              <dl>
                <div><dt>When it fits</dt><dd>{model.fits}</dd></div>
                <div><dt>You bring</dt><dd>{model.youBring}</dd></div>
                <div><dt>You get</dt><dd>{model.youGet}</dd></div>
                <div><dt>How long</dt><dd>{model.duration}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="staffing" tabIndex={-1}>
        <p className={styles.eyebrow}>How we staff</p>
        <h2>A senior lead stays accountable. The rest is assembled around the work.</h2>
        <p className={styles.sectionLede}>
          Every model is led by the same senior lead from framing to execution. Specialists
          in regulation, strategy, product, technology and delivery join where the mandate
          needs them, and your leaders stay inside the working team so the decisions and
          the capability remain with you.
        </p>
        <div className={styles.staffingLinks}>
          <Link className={styles.evidenceLink} href="/practice#model">
            See how the practice is staffed →
          </Link>
          <Link className={styles.evidenceLink} href="/practice#evidence">
            See the experience carried into the practice →
          </Link>
        </div>
      </section>

      <section className={styles.start} id="start" tabIndex={-1}>
        <p className={styles.eyebrow}>Start with the mandate in front of you</p>
        <h2>Bring the right senior expertise to the problem.</h2>
        <p>
          Book a call directly, or email{" "}
          <a href={mailtoHref("Strategic mandate")}>{practiceFacts.contactEmail}</a> if you prefer.
        </p>
        <div className={styles.startActions}>
          <a {...bookingLinkProps}>Book a conversation ↗</a>
          <a href={mailtoHref("Strategic mandate")}>Discuss your mandate by email →</a>
          <Link href="/practice">Meet the practice →</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
