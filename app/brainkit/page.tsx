import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "../institutional-intelligence/proposition.module.css";

export const metadata: Metadata = {
  title: "Institutional BrainKit",
  description:
    "A private, human-approved package of institutional context used to ground governed discovery and delivery.",
  alternates: { canonical: "/brainkit" },
};

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
  ["04", "Pin and apply", "Repositories mount a digest-pinned private release alongside the public Loom Toolkit."],
  ["05", "Validate in delivery", "CI checks canonical sections, digests, declared files, grounding and artifact provenance."],
  ["06", "Evolve deliberately", "Operating evidence proposes change; accountable owners approve the next release."],
] as const;

export default function BrainKitPage() {
  return (
    <main className={styles.shell} id="overview">
      <SiteHeader
        active="intelligence"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/institutional-intelligence", label: "Institutional Intelligence" },
          { label: "BrainKit" },
        ]}
        contextLinks={[
          { href: "#overview", label: "Overview" },
          { href: "#contents", label: "Contents" },
          { href: "#lifecycle", label: "Lifecycle" },
          { href: "#boundary", label: "Boundary" },
        ]}
      />

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>The institution-owned asset</p>
          <h1>
            Governed context. <em>Not borrowed memory.</em>
          </h1>
          <p>
            The Institutional BrainKit is a private, human-approved package of institutional
            language, architecture, policy, decisions and evidence. It gives delivery systems
            context without giving them authority.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Institutional%20BrainKit">
              Discuss a BrainKit pilot
            </a>
            <Link className={styles.secondaryAction} href="/institutional-intelligence">See the full proposition</Link>
          </div>
        </div>
        <aside className={styles.heroAside}>
          <span>BrainKit boundary / private</span>
          <div>
            <small>What it is</small>
            <strong>Approved institutional context</strong>
            <p>Evidence-grounded, versioned, digest-pinned and controlled by accountable owners.</p>
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
          <p className={styles.eyebrow}>What lives inside</p>
          <div>
            <h2>The minimum context required to act like this institution.</h2>
            <p>
              Each section has a source and an accountable owner. The package records what is
              approved, what is provisional and what remains unknown.
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
              The BrainKit changes through accountable review, not silent agent memory. Every
              release can be identified, mounted and validated.
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
      </section>

      <section className={styles.section} id="boundary">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Human authority remains explicit</p>
          <div>
            <h2>The agent can assemble the draft. The institution approves the truth.</h2>
            <p>
              BrainKit governance separates useful automation from decision authority. That
              boundary is a feature of the operating model, not a limitation to conceal.
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
              <li>Authorise each private BrainKit release</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>Start narrow</p>
        <h2>Build the first BrainKit around one mandate with real owners.</h2>
        <p>
          A credible pilot uses approved sources, a bounded scope and named context owners. It
          proves whether the institution can govern the asset before trying to scale it.
        </p>
        <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=BrainKit%20pilot">
          Shape a BrainKit pilot
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
