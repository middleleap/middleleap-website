import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import styles from "./loom.module.css";

export const metadata: Metadata = {
  title: "The Loom | Regulated AI Delivery Method",
  description:
    "The Loom is MiddleLeap's method for building regulated software with AI: gated discovery, governed delivery, continuous assurance and human accountability.",
  alternates: { canonical: "/the-loom" },
  openGraph: {
    title: "The Loom | How a Regulated Entity Builds with AI",
    description:
      "Two governed harnesses turn an ambiguous mandate into audit-ready software while accountable people retain approval.",
    url: "https://middleleap.com/the-loom",
  },
};

const proofPoints = [
  ["134 / ~139", "Stories to done in the first build"],
  ["9 + 5", "Discovery gates and primary quality gates"],
  ["100%", "Merges approved by human four-eyes"],
  ["0", "Real customer records used"],
] as const;

const loomParts = [
  ["Warp", "Always-on controls", "Four-eyes, audit, lineage, quality gates and residency remain under tension throughout."],
  ["Harnesses", "Discovery + delivery", "One harness finds the right problem. The other ships the chosen solution under control."],
  ["Shuttle", "AI agents", "Specialised agents move through the harness to research, build, review, test and evidence."],
  ["Pattern", "The context brain", "Regulation, solution-domain knowledge and institutional DNA determine what gets woven."],
  ["Cloth", "Audit-ready software", "The output is a working solution with controls and evidence constructed into the line."],
] as const;

const discoveryGates = [
  ["D1", "Framing", "A falsifiable problem, target user and success measure."],
  ["D2", "Evidence", "Claims trace to logged signals rather than opinion."],
  ["D3", "Scope", "Stakeholders and in/out boundaries are named."],
  ["D4", "No solutioning", "Discovery does not leak into production design."],
  ["D5", "Synthesis", "Themes trace to signals and prioritisation is explicit."],
  ["D6", "Data governance", "Risks and regulatory drivers resolve against the register."],
  ["D7", "Brand", "Stakeholder artifacts render through the mounted brand profile."],
  ["D8", "Tangibility", "A disposable, low-fidelity prototype makes the direction visible."],
  ["D9", "Validation", "Named stakeholders react and the evidence loop closes."],
] as const;

const deliverySteps = [
  ["01", "Pick", "Take the first eligible item. The waist gate rejects untraced features."],
  ["02", "Isolate", "One story, one branch, one session; concurrent work uses isolated worktrees."],
  ["03", "Specify", "Contract, generated types and acceptance tests precede implementation."],
  ["04", "Implement", "Build to green with synthetic data, audit and lineage in the same change."],
  ["05", "Review", "Bounded reviewers judge hard stops and contract conformance."],
  ["06", "Human merge", "A protected control plane requires accountable four-eyes approval."],
  ["07", "Deploy", "Promotion, live smoke checks and rollback remain governed."],
  ["08", "Evidence", "Release gates rerun at the shipped commit and seal the evidence bundle."],
] as const;

const brainDimensions = [
  ["Regulated context", "What must be obeyed", "Mandates, deadlines, security posture, risk taxonomy and controls."],
  ["Solution domain", "What is being built", "Contracts, data models, personas, scopes and synthetic datasets."],
  ["Institutional DNA", "How the entity works", "Approval routes, architecture, approved technology, terminology, brand and voice."],
] as const;

const assuranceSteps = [
  ["01", "Watch", "Regulatory and risk horizon scan"],
  ["02", "Assess", "Risk and impact review"],
  ["03", "Check", "Contract and hard-stop conformance"],
  ["04", "Test", "Controls and quality gates"],
  ["05", "Evidence", "Audit trail and lineage capture"],
  ["06", "Confirm", "Agent-prepared reporting plus human four-eyes"],
] as const;

const governanceDecisions = [
  ["HG-0001", "No self-merge", "Human-approved merges through enforced branch protection."],
  ["HG-0002", "Immutable controls", "Guardrails, gates and CI sit outside the agent's write scope."],
  ["HG-0003", "Sealed evidence", "Traceability is externally anchored and tamper-evident."],
  ["HG-0004", "Least privilege", "The agent uses a bounded identity and vaulted secrets."],
  ["HG-0005", "Governed promotion", "Staged release, a human production gate and rehearsed rollback."],
  ["HG-0006", "Model risk", "The harness itself is governed as an AI system."],
  ["HG-0007", "Discovery first", "A gate-green hand-off is the entry condition for delivery."],
  ["HG-0008", "Mounted seams", "Risk registers and brand profiles are mounted, not hard-coded."],
  ["HG-0009", "Diverge, then decide", "Delivery explores several directions before converging."],
  ["HG-0010", "Cease use", "A kill switch and named accountable officer are mandatory."],
  ["HG-0011", "Residency control", "Model traffic passes through governed gateways and DLP."],
  ["HG-0012", "Derive, do not retrieve", "A sealed runtime distinguishes reasoning from answer mining."],
] as const;

const limits = [
  ["Demo-proven, not production-proven", "The first proof is permanently synthetic and has not cleared live production scale or a regulator examination."],
  ["One domain is early evidence", "Legacy integration, real data and organisational change remain the true cost curve for other institutions."],
  ["The brain must be curated", "Bad context compounds as quickly as good context, so ownership and quality control are part of the method."],
  ["AI model risk is real", "Agents require validation, monitoring and independent challenge; automation does not remove accountability."],
] as const;

export default function LoomPage() {
  return (
    <main className={styles.shell} id="problem">
      <header className={styles.nav}>
        <BrandLockup priority />
        <nav className={styles.navLinks} aria-label="The Loom navigation">
          <a href="#method">Method</a>
          <a href="#brain">Context brain</a>
          <a href="#assurance">Assurance</a>
          <a href="#governance">Governance</a>
          <Link href="/ai-dlc">AI-DLC</Link>
        </nav>
        <Link className={styles.navCta} href="/#engage">Discuss adoption</Link>
        <Link className={styles.mobileNavLink} href="/">Advisory</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The Loom · regulated AI delivery</p>
          <h1>A way for a regulated entity to build with <em>AI.</em></h1>
          <p className={styles.lede}>
            Set it up once, then weave any solution on it. Discovery finds the right
            problem. Delivery ships it under control. Always-on controls and governed
            institutional context run through both.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#method">Explore the method</a>
            <Link className={styles.secondaryAction} href="/ai-dlc">Adopt through AI-DLC</Link>
          </div>
        </div>

        <div className={styles.loomFigure} role="img" aria-label="The Loom maps always-on controls, discovery and delivery harnesses, institutional context and AI agents to shipped audit-ready software">
          <div className={styles.figureHeader}><span>The Loom / method frame</span><b>Controls under tension</b></div>
          <div className={styles.warp}><span>Four-eyes</span><span>Audit</span><span>Lineage</span><span>Gates</span><span>Residency</span></div>
          <div className={styles.harnesses}>
            <article><small>Harness 01</small><strong>Discovery</strong><span>Find the right problem · D1—D9</span></article>
            <i aria-hidden="true">→</i>
            <article><small>Harness 02</small><strong>Delivery</strong><span>Ship under control · Q1—Q5</span></article>
          </div>
          <div className={styles.pattern}><small>The pattern</small><strong>Institutional context brain</strong><span>Regulation · Domain · Institutional DNA</span></div>
          <div className={styles.shuttle}><i aria-hidden="true" /><span>AI agents weave continuously</span></div>
          <div className={styles.cloth}><small>The cloth</small><strong>Live, audit-ready software</strong></div>
        </div>
      </section>

      <section className={styles.proof} aria-label="Evidence from the first Loom build">
        {proofPoints.map(([value, label]) => <article key={value}><strong>{value}</strong><span>{label}</span></article>)}
      </section>

      <section className={styles.section} id="method">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The idea</p>
          <div><h2>The metaphor is exact.</h2><p>Every part of a physical loom maps to a durable part of the operating method.</p></div>
        </div>
        <div className={styles.partGrid}>
          {loomParts.map(([part, title, detail]) => <article key={part}><span>{part}</span><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The two harnesses</p>
          <div><h2>A double diamond: find the right problem, then deliver it.</h2><p>The diamonds meet at one enforced waist: a gate-green hand-off. Discovery may stop a weak problem early; delivery evidence may legitimately send the work back.</p></div>
        </div>
        <div className={styles.diamondFlow}>
          <article><span>01</span><strong>Discover</strong><small>Diverge around evidence</small></article>
          <article><span>02</span><strong>Define</strong><small>Converge on one problem</small></article>
          <div><span>Waist gate</span><strong>Agreed hand-off</strong></div>
          <article><span>03</span><strong>Develop</strong><small>Diverge across solutions</small></article>
          <article><span>04</span><strong>Deliver</strong><small>Converge under control</small></article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.splitIntro}>
          <div><p className={styles.eyebrow}>Diamond 01</p><h2>Discovery: evidence in, problem out.</h2><p>Before code, every claim, boundary, data-risk decision, prototype and stakeholder reaction becomes a traceable artifact.</p></div>
          <div className={styles.prototypeRule}><span>Prototype boundary</span><strong>Brand-real. Behaviour-hollow.</strong><p>A disposable wireframe tests the framing. It never binds the production solution.</p></div>
        </div>
        <div className={styles.gateGrid}>
          {discoveryGates.map(([id, title, detail]) => <article key={id}><span>{id}</span><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Diamond 02</p>
          <div><h2>Delivery: an autonomous loop that proposes, never disposes.</h2><p>One loop takes one eligible item end to end. The agent authors and verifies; a protected control plane reserves approval for people.</p></div>
        </div>
        <ol className={styles.deliveryLoop}>
          {deliverySteps.map(([id, title, detail]) => <li key={id}><span>{id}</span><h3>{title}</h3><p>{detail}</p></li>)}
        </ol>
        <div className={styles.tripwires}><span>PII guard</span><i>+</i><span>Spec tripwire</span><i>+</i><span>Test-integrity tripwire</span><strong>Controls apply at the moment of edit.</strong></div>
      </section>

      <section className={`${styles.section} ${styles.brainSection}`} id="brain">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The pattern</p>
          <div><h2>The context brain is why the method compounds.</h2><p>A generic harness becomes institutional capability when context is governed as an owned, versioned and auditable asset.</p></div>
        </div>
        <div className={styles.brainGrid}>
          {brainDimensions.map(([title, label, detail], index) => <article key={title}><span>0{index + 1}</span><small>{label}</small><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
        <div className={styles.moat}><span>The moat test</span><p>If a competitor copied the codebase tomorrow, it would still lack the accumulated, governed context that makes the software belong to the institution.</p></div>
      </section>

      <section className={styles.section} id="assurance">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Always-on</p>
          <div><h2>Continuous assurance: agents do the recurring work, people retain judgement.</h2><p>The harness re-runs on changes, schedules and regulatory events, keeping evidence current to the last trigger instead of the last meeting.</p></div>
        </div>
        <ol className={styles.assuranceFlow}>
          {assuranceSteps.map(([id, title, detail]) => <li key={id}><span>{id}</span><h3>{title}</h3><p>{detail}</p></li>)}
        </ol>
      </section>

      <section className={styles.section} id="governance">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Who assures the AI?</p>
          <div><h2>AI proposes. Humans and a protected control plane dispose.</h2><p>The governance catalogue closes the gaps that let an ungoverned agent self-review, self-merge, deploy and edit its own guardrails.</p></div>
        </div>
        <div className={styles.governanceGrid}>
          {governanceDecisions.map(([id, title, detail]) => <article key={id}><span>{id}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Proof and limits</p>
          <div><h2>Proven on Open Finance. Stated plainly.</h2><p>The first build demonstrates a real gated system and a reusable method. It does not justify claims the evidence cannot yet carry.</p></div>
        </div>
        <div className={styles.limitGrid}>
          {limits.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
        <div className={styles.caseLink}><span>First implementation</span><strong>Open Finance Back Office</strong><p>A bank-neutral, synthetic-only operating platform and the first cloth off The Loom.</p><Link href="/ventures/backoffice">Read the evidenced build record →</Link></div>
      </section>

      <section className={styles.engage}>
        <p className={styles.eyebrow}>Adopt the method</p>
        <h2>Start with one real mandate and leave a reusable capability behind.</h2>
        <p>Mount the institution&apos;s controls and context, run one gated discovery, and deliver one bounded outcome with human accountability intact.</p>
        <div className={styles.actions}>
          <Link className={styles.primaryAction} href="/#engage">Discuss a Loom pilot</Link>
          <Link className={styles.darkAction} href="/ai-dlc">See the installable package</Link>
        </div>
      </section>

      <footer className={styles.footer}><span>MiddleLeap · The Loom · Regulated AI delivery</span><Link href="/">Advisory home</Link></footer>
    </main>
  );
}
