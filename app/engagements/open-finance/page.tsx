import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./engagement.module.css";

export const metadata = createPageMetadata({
  title: "Open Finance Engagement Record",
  description:
    "An anonymised account of moving a dual LFI and TPP Open Finance mandate from institutional position to certification and live participation.",
  path: "/engagements/open-finance",
  socialTitle: "From Open Finance mandate to live participation | MiddleLeap",
  socialDescription:
    "The mandate, constraints, decisions and retained institutional outputs behind a MENA Open Finance programme.",
});

const path = [
  ["01", "Frame the institutional role", "Resolve what the institution would own as an LFI, what it would operate as a TPP and where partner dependency changed the sequence."],
  ["02", "Connect regulation to proposition", "Turn framework obligations and permissions into a position that product, risk, technology and operations could use."],
  ["03", "Sequence certification and delivery", "Treat certification, partner readiness and platform capability as one dependency system rather than separate workstreams."],
  ["04", "Move through accountable decisions", "Keep judgement calls visible, name the executive owner and expose the next unresolved dependency early."],
  ["05", "Reach live participation", "Carry the programme through first-bank certification and the country’s first live transactions with a licensed TPP."],
] as const;

const retainedArtifacts = [
  ["Strategic position", "The chosen LFI and TPP role, the value it should create and the boundaries leadership approved."],
  ["Platform capability model", "The consent, data, API, partner and control capabilities required to operate the position."],
  ["Certification dependency map", "The evidence, external dependencies, owners and decision points on the route to certification."],
  ["Decision register", "The material choices, rationale, accountable owners and conditions that should trigger review."],
  ["Operating-model blueprint", "Product, technology, risk, compliance, operations and partner responsibilities aligned around execution."],
  ["Mobilisation roadmap", "The sequenced workstreams, governance and evidence loops needed to move from direction into operation."],
] as const;

export default function OpenFinanceEngagementPage() {
  return (
    <div className={styles.shell}>
      <SiteHeader
        active="open-finance"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/open-finance", label: "Open Finance" },
          { label: "Engagement record" },
        ]}
        contextLabel="Engagement record navigation"
        contextLinks={[
          { href: "#mandate", label: "Mandate" },
          { href: "#constraint", label: "Constraint" },
          { href: "#path", label: "Path" },
          { href: "#retained", label: "What remained" },
        ]}
      />

      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Experience narrative · anonymised</p>
            <h1>From a national Open Finance framework to <em>live participation.</em></h1>
            <p className={styles.lede}>
              A dual LFI and TPP programme had to connect institutional position,
              certification, platform delivery and partner readiness without letting any
              one workstream become the programme by itself.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#mandate">Read the mandate</a>
              <Link className={styles.secondaryAction} href="/open-finance">Explore the advisory capability</Link>
            </div>
          </div>
          <aside className={styles.disclosure}>
            <span>Disclosure boundary</span>
            <p>
              This record draws only on claims already public on MiddleLeap. It describes
              experience from a prior executive role, not a client engagement contracted by
              MiddleLeap. Client identity, dates, documents and confidential operating detail
              remain excluded.
            </p>
          </aside>
        </section>

        <section className={styles.metrics} aria-label="Engagement evidence">
          <article><strong>2</strong><span>regulated roles · LFI and TPP</span></article>
          <article><strong>5</strong><span>connected decision movements</span></article>
          <article><strong>1st</strong><span>bank certification under the framework</span></article>
          <article><strong>1st</strong><span>live national transactions with a licensed TPP</span></article>
        </section>

        <section className={styles.movement} id="mandate">
          <p className={styles.eyebrow}>01 · The mandate as it arrived</p>
          <div>
            <h2>Turn a framework into an institutional position that could operate.</h2>
            <p>
              The institution was not solving an API release in isolation. It had to decide
              what role to play in the emerging value chain, align two regulated participation
              models, establish a certification path and connect the resulting position to a
              proposition, platform and operating model.
            </p>
            <blockquote>
              The unresolved question was not “can the interface be built?” It was “what must
              the institution become to participate credibly on both sides of the market?”
            </blockquote>
          </div>
        </section>

        <section className={`${styles.movement} ${styles.constraint}`} id="constraint">
          <p className={styles.eyebrow}>02 · The constraint that made it hard</p>
          <div>
            <h2>Certification, partner readiness and dual-role complexity moved together.</h2>
            <p>
              LFI and TPP responsibilities created different control, product and operating
              questions. Certification depended on evidence outside a single delivery team.
              Live participation depended on a licensed counterparty. A local optimisation in
              one workstream could move the institution further away from the actual outcome.
            </p>
            <ul>
              <li>Two regulated roles with different obligations and value propositions</li>
              <li>A certification dependency that had to remain visible to leadership</li>
              <li>External partner readiness on the path to live participation</li>
              <li>Product, risk, technology and operations decisions that could not be sequenced independently</li>
            </ul>
          </div>
        </section>

        <section className={styles.pathSection} id="path">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>03 · The path</p>
            <div>
              <h2>Sequence the decisions—not a methodology diagram.</h2>
              <p>
                The work moved through five connected decision movements. Senior leaders held
                the institutional position; accountable product, risk, technology and
                operations owners resolved the evidence inside their domain.
              </p>
            </div>
          </div>
          <ol className={styles.path}>
            {path.map(([number, title, detail]) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.retained} id="retained">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>04 · What the institution keeps</p>
            <div>
              <h2>The retained value is a usable decision system, not a closing deck.</h2>
              <p>
                The artifact set below describes what MiddleLeap now expects a mandate of this
                shape to leave under institutional ownership. It does not reproduce the former
                employer&apos;s confidential documents.
              </p>
            </div>
          </div>
          <div className={styles.artifactGrid}>
            {retainedArtifacts.map(([title, detail], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className={styles.retainedLink}>
            <Link href="/institutional-intelligence">
              See how MiddleLeap turns retained outputs into institutional intelligence →
            </Link>
          </div>
        </section>

        <section className={styles.cta} id="engage">
          <p className={styles.eyebrow}>Bring the unresolved decision</p>
          <h2>Start with the mandate that must move across the boardroom and delivery floor.</h2>
          <p>
            MiddleLeap shapes the smallest credible path from institutional position to
            evidence, accountable execution and retained operating knowledge.
          </p>
          <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Open%20Finance%20mandate">
            Discuss an Open Finance mandate
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
