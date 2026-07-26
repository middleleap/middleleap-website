import Link from "next/link";
import { InstitutionalIntelligenceSystem } from "@/components/InstitutionalIntelligenceSystem";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./proposition.module.css";

export const metadata = createPageMetadata({
  title: "Institutional Intelligence",
  description:
    "Build governed institutional intelligence that captures decisions, architecture, controls and operating knowledge through real delivery.",
  path: "/institutional-intelligence",
});

const contents = [
  ["01", "Identity & language", "Purpose, principles, terminology, customers and the vocabulary the institution has approved."],
  ["02", "Architecture & policy", "System boundaries, technology choices, control policy and the constraints delivery must respect."],
  ["03", "Decisions & rights", "What was decided, why it was decided, who owns the decision and what would trigger a review."],
  ["04", "Evidence & gaps", "Sources, assurance records, operating signals and the unknowns that must remain visible."],
] as const;

const publicModel = [
  [
    "01",
    "The Institutional Brain",
    "Institution-owned intelligence",
    "The private, governed body of collective understanding that makes the institution distinctive.",
    "/institutional-brain",
    "Examine the Brain",
  ],
  [
    "02",
    "The Loom",
    "Governed delivery method",
    "The method that applies institutional intelligence to discovery, delivery and assurance.",
    "/the-loom",
    "Examine the method",
  ],
] as const;

const cycle = [
  ["Mandate", "Resolve the decision, evidence, scope and accountable owners."],
  ["Delivery", "Build a working product, platform or operating capability."],
  ["Operation", "Observe what performs, fails, changes and requires intervention."],
  ["Institution", "Approve durable learning and make it available to the next mandate."],
] as const;

export default function InstitutionalIntelligencePage() {
  return (
    <div className={styles.shell}>
      <SiteHeader
        active="intelligence"
        priority
        breadcrumbs={[{ href: "/", label: "Advisory" }, { label: "Institutional Intelligence" }]}
        contextLinks={[
          { href: "#overview", label: "Overview" },
          { href: "#model", label: "The model" },
          { href: "#architecture", label: "Brain & Loom" },
          { href: "#ownership", label: "Ownership" },
        ]}
      />

      <main id="main-content" tabIndex={-1}>
      <section className={styles.hero} id="overview">
        <div>
          <p className={styles.eyebrow}>The proposition</p>
          <h1>
            The capability your institution <em>owns.</em>
          </h1>
          <p>
            Institutional intelligence is the governed context an organisation uses to make,
            explain and repeat good decisions. It is the collective understanding of what makes
            the institution distinctive and how it decides, builds and operates. MiddleLeap builds
            it through real mandates so it stays connected to operating evidence.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Institutional%20intelligence">
              Discuss the proposition
            </a>
            <Link className={styles.secondaryAction} href="/institutional-brain">Examine the Institutional Brain</Link>
          </div>
        </div>
        <aside className={styles.heroAside}>
          <span>Two outcomes / every mandate</span>
          <div>
            <small>01</small>
            <strong>Working capability</strong>
            <p>The product, platform, operating model or market position the mandate requires.</p>
          </div>
          <b>+</b>
          <div>
            <small>02</small>
            <strong>Institutional intelligence</strong>
            <p>The approved context, decisions, controls and evidence that make the next mandate stronger.</p>
          </div>
        </aside>
      </section>

      <section className={styles.section} id="model">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>What the institution retains</p>
          <div>
            <h2>More than documents. Less than a claim to know everything.</h2>
            <p>
              The model captures what the institution has evidenced and approved. Unknowns stay
              visible. Human owners decide what becomes institutional context.
            </p>
          </div>
        </div>
        <div className={styles.contentGrid}>
          {contents.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <aside className={styles.implementationNote}>
          <span>Engagement evidence</span>
          <div>
            <h3>See how a regulated mandate moves from institutional position to live participation.</h3>
            <p>
              The anonymised Open Finance record shows the mandate, the constraints, the
              sequence of decisions and the named outputs an institution should retain.
            </p>
            <Link href="/engagements/open-finance">Read the engagement record →</Link>
          </div>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The operating model</p>
          <div>
            <h2>Context feeds delivery. Evidence improves context.</h2>
            <p>
              The Institutional Brain sits outside the delivery loop: it informs the work,
              receives approved learning and remains controlled by the institution.
            </p>
          </div>
        </div>
        <InstitutionalIntelligenceSystem />
      </section>

      <section className={styles.section} id="architecture">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>One asset. One method.</p>
          <div>
            <h2>The Brain holds what the institution knows. The Loom applies it.</h2>
            <p>
              The public proposition has two named elements. Repository controls, initializers
              and distribution mechanisms sit underneath as implementation details.
            </p>
          </div>
        </div>
        <div className={styles.stack}>
          {publicModel.map(([number, title, label, detail, href, action]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <small>{label}</small>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
              <Link href={href}>{action} →</Link>
            </article>
          ))}
        </div>
        <aside className={styles.implementationNote}>
          <span>Technical implementation</span>
          <div>
            <h3>Repository machinery remains visible without becoming another proposition.</h3>
            <p>
              The Loom&apos;s controls, templates and assurance are distributed through AI-DLC.
              BrainKit is the initializer used to draft and validate the Brainstem inside an
              institution&apos;s private context release.
            </p>
            <Link href="/toolkit">View the technical implementation →</Link>
          </div>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The compounding loop</p>
          <div>
            <h2>Every cycle should reduce avoidable rediscovery.</h2>
            <p>
              Compounding does not mean freezing decisions. It means preserving their evidence
              and review conditions so the institution can change deliberately.
            </p>
          </div>
        </div>
        <ol className={styles.cycle}>
          {cycle.map(([title, detail], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} id="ownership">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The ownership boundary</p>
          <div>
            <h2>The institution approves the intelligence and operates the controls.</h2>
            <p>
              MiddleLeap can frame, draft, structure and validate. Accountable institutional
              owners approve private context, production controls and changes to policy.
            </p>
          </div>
        </div>
        <div className={styles.boundaryGrid}>
          <article>
            <span>MiddleLeap contributes</span>
            <ul>
              <li>Mandate framing and evidence synthesis</li>
              <li>Draft context structures and visible gap registers</li>
              <li>Governed delivery method and repository controls</li>
              <li>Adoption reports and validation evidence</li>
            </ul>
          </article>
          <article>
            <span>The institution owns</span>
            <ul>
              <li>Approval of institutional identity and policy</li>
              <li>Decision rights and accountable context owners</li>
              <li>Production IAM, monitoring and incident response</li>
              <li>Operational evidence and future releases</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>Start with a live mandate</p>
        <h2>Build institutional intelligence through work that already matters.</h2>
        <p>
          Choose one bounded regulatory, platform or operating-model outcome. Use it to prove
          both the delivery result and the ownership model.
        </p>
        <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Institutional%20intelligence%20mandate">
          Discuss a mandate
        </a>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
}
