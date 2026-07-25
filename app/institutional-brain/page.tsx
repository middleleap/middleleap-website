import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../institutional-intelligence/proposition.module.css";

export const metadata = createPageMetadata({
  title: "The Institutional Brain",
  description:
    "The institution-owned body of approved collective understanding that grounds governed decisions, delivery and learning.",
  path: "/institutional-brain",
});

const contents = [
  ["01", "Identity", "Purpose, customers, principles and the positions that define the institution."],
  ["02", "Terminology", "Approved language, domain concepts and names that teams and agents must use consistently."],
  ["03", "Architecture", "System landscape, boundaries, interfaces, constraints and recorded technology choices."],
  ["04", "Decision rights", "Accountable owners, review conditions and the precedents behind consequential decisions."],
  ["05", "Technology policy", "Permitted patterns, security expectations, engineering standards and production boundaries."],
  ["06", "Evidence & gaps", "Source records, assurance evidence and explicit unknowns that prevent invented certainty."],
] as const;

const lifecycle = [
  ["01", "Draft from evidence", "Use approved institutional sources. Unsupported decisions become visible gaps."],
  ["02", "Review with owners", "Architecture, risk, product and other accountable owners examine their context."],
  ["03", "Approve the release", "Humans approve institutional context; agents can structure and validate, never self-authorise."],
  ["04", "Pin and apply", "Repositories mount a digest-pinned private release alongside The Loom's repository controls."],
  ["05", "Validate in delivery", "CI checks canonical sections, digests, declared files, grounding and artifact provenance."],
  ["06", "Evolve deliberately", "Operating evidence proposes change; accountable owners approve the next release."],
] as const;

export default function InstitutionalBrainPage() {
  return (
    <div className={styles.shell}>
      <SiteHeader
        active="intelligence"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/institutional-intelligence", label: "Institutional Intelligence" },
          { label: "Institutional Brain" },
        ]}
        contextLinks={[
          { href: "#overview", label: "Overview" },
          { href: "#contents", label: "Brainstem" },
          { href: "#lifecycle", label: "Lifecycle" },
          { href: "#boundary", label: "Boundary" },
        ]}
      />

      <main id="main-content" tabIndex={-1}>
      <section className={styles.hero} id="overview">
        <div>
          <p className={styles.eyebrow}>The institution-owned asset</p>
          <h1>
            Collective understanding. <em>Governed and owned.</em>
          </h1>
          <p>
            The Institutional Brain is the private, human-approved body of understanding that
            makes the institution distinctive: its language, architecture, principles, decisions,
            controls and operating knowledge. It gives delivery systems context without giving
            them authority.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Institutional%20Brain">
              Discuss an Institutional Brain pilot
            </a>
            <Link className={styles.secondaryAction} href="/institutional-intelligence">See the full proposition</Link>
          </div>
        </div>
        <aside className={styles.heroAside}>
          <span>Institutional Brain / private</span>
          <div>
            <small>What it is</small>
            <strong>Collective institutional understanding</strong>
            <p>Evidence-grounded, versioned and controlled by accountable owners.</p>
          </div>
          <b>≠</b>
          <div>
            <small>What it is not</small>
            <strong>An autonomous authority</strong>
            <p>It cannot approve policy, invent institutional decisions or operate production controls.</p>
          </div>
        </aside>
      </section>

      <section className={styles.section} id="contents">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The Brainstem</p>
          <div>
            <h2>The stable foundation every team and agent can inherit.</h2>
            <p>
              At the centre of the Institutional Brain is a governed Brainstem: the minimum
              approved context required to understand how this institution decides, builds and
              operates. Each section has a source and an accountable owner.
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
      </section>

      <section className={styles.section} id="lifecycle">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>From evidence to release</p>
          <div>
            <h2>A governed lifecycle keeps context useful without pretending it is timeless.</h2>
            <p>
              The Institutional Brain changes through accountable review, not silent agent
              memory. Every release can be identified, mounted and validated.
            </p>
          </div>
        </div>
        <div className={styles.stack}>
          {lifecycle.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <small>Lifecycle gate</small>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className={styles.implementationNote}>
          <span>Implementation detail</span>
          <div>
            <h3>BrainKit initializes the Brainstem. It is not the institutional asset.</h3>
            <p>
              In the repository implementation, BrainKit is the technical initializer used to
              draft, validate and release the Brainstem from approved sources.
            </p>
            <Link href="/toolkit">View the technical implementation →</Link>
          </div>
        </aside>
      </section>

      <section className={styles.section} id="boundary">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Human authority remains explicit</p>
          <div>
            <h2>The agent can assemble the draft. The institution approves the truth.</h2>
            <p>
              Institutional Brain governance separates useful automation from decision
              authority. That boundary is a feature of the operating model, not a limitation
              to conceal.
            </p>
          </div>
        </div>
        <div className={styles.boundaryGrid}>
          <article>
            <span>Agents may</span>
            <ul>
              <li>Organise approved source material</li>
              <li>Draft canonical sections and terminology maps</li>
              <li>Expose contradictions and missing decisions</li>
              <li>Validate structure, digests and provenance</li>
            </ul>
          </article>
          <article>
            <span>Accountable humans must</span>
            <ul>
              <li>Approve institutional identity and policy</li>
              <li>Resolve contested architecture and terminology</li>
              <li>Assign context ownership and review conditions</li>
              <li>Authorise each private Institutional Brain release</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>Start narrow</p>
        <h2>Build the first Institutional Brain around one mandate with real owners.</h2>
        <p>
          A credible pilot uses approved sources, a bounded scope and named context owners. It
          proves whether the institution can govern the asset before trying to scale it.
        </p>
        <div className={styles.actions}>
          <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Institutional%20Brain%20pilot">
            Shape an Institutional Brain pilot
          </a>
          <Link className={styles.secondaryAction} href="/the-loom">See how The Loom applies it</Link>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
}
