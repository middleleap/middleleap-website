import type { Metadata } from "next";
import Link from "next/link";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./loom.module.css";

export const metadata: Metadata = {
  title: "The Loom | Governed AI Delivery for Regulated Institutions",
  description:
    "The Loom is MiddleLeap's reusable way for regulated institutions to find the right problem, deliver software under control and learn from what runs.",
  alternates: { canonical: "/the-loom" },
  openGraph: {
    title: "The Loom | Governed AI Delivery for Regulated Institutions",
    description:
      "Two governed harnesses turn an evidenced mandate into audit-ready software, then route operational signals back into discovery.",
    url: "https://www.middleleap.com/the-loom",
  },
};

const proofPoints = [
  ["134 / ~139", "Stories to done in the first build"],
  ["2 + 1", "Harnesses and the Run feedback arc"],
  ["100%", "Merges approved by people in the regulated build"],
  ["0", "Real customer records used"],
] as const;

const loomParts = [
  ["Warp", "Always-on principles", "Evidence, bounded work, human authority, quality and traceability remain under tension throughout."],
  ["Harnesses", "Discovery + delivery", "One harness finds the right problem. The other ships the chosen solution under control."],
  ["Shuttle", "AI agents", "Specialised agents move through the harness to research, build, review, test and evidence."],
  ["Pattern", "The context brain", "Mandate constraints, solution-domain knowledge and institutional context determine what gets woven."],
  ["Cloth", "Audit-ready software", "The output is a working solution with its controls, lineage and release evidence constructed into the line."],
] as const;

const controlChain = [
  ["01", "Mandate", "Leaders name the outcome, risk posture, constraints and accountable owners."],
  ["02", "Problem", "Discovery tests the framing and produces one gate-green, evidenced hand-off."],
  ["03", "Solution", "Product and architecture assurance shape the direction before autonomous delivery."],
  ["04", "Release", "Quality gates, protected controls and accountable approval govern promotion."],
  ["05", "Outcome", "A fresh product evaluation scores the release against Discovery’s success measures."],
  ["06", "Signal", "Incidents, drift, regulation and customer evidence are triaged back into the loop."],
] as const;

const discoveryGates = [
  ["D1", "Framing", "A falsifiable problem, target user and success measure."],
  ["D2", "Evidence", "Claims trace to logged signals rather than opinion."],
  ["D3", "Scope", "Stakeholders and in/out boundaries are named."],
  ["D4", "No solutioning", "Discovery does not leak into production design."],
  ["D5", "Synthesis", "Themes trace to signals and prioritisation is explicit."],
  ["D6", "Data governance", "Risks and mandate-specific drivers resolve against the register."],
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
  ["06", "Human approval", "A protected control plane requires accountable approval; regulated work can require formal four-eyes."],
  ["07", "Deploy", "Promotion, live smoke checks and rollback remain governed."],
  ["08", "Evidence", "Release gates rerun at the shipped commit and seal the evidence bundle."],
] as const;

const brainDimensions = [
  ["Mandate context", "What must be obeyed", "Commercial goals, regulation where applicable, deadlines, risk posture and controls."],
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
  ["HG-0013", "Graduated autonomy", "A narrow routine-change lane can move approval from each change to a second-line-owned, expiring envelope. Approval is relocated, never removed."],
] as const;

const maturityStates = [
  ["01", "Absent", "No credible control exists."],
  ["02", "Defined", "The decision and owner are documented."],
  ["03", "Mechanically validated", "Repository machinery tests the claim."],
  ["04", "Platform enforced", "The agent cannot bypass the control."],
  ["05", "Organisationally enforced", "Operating evidence proves it works in practice."],
] as const;

const limits = [
  ["Demo-proven, not production-proven", "The first proof is permanently synthetic and has not cleared live production scale or a regulator examination."],
  ["One domain is early evidence", "Legacy integration, real data and organisational change remain the true cost curve for other institutions."],
  ["Spend measured; value unproven", "Token telemetry now measures delivery spend by iteration and milestone. The value half—and any implied ROI—remains unbuilt."],
  ["Comprehension debt remains", "Decision logs make agent reasoning replayable, but they do not prove that human reviewers still understand a growing codebase."],
  ["The brain must be curated", "Bad context compounds as quickly as good context, so ownership and quality control are part of the method."],
  ["AI model risk is real", "Agents require validation, monitoring and independent challenge; automation does not remove accountability."],
] as const;

export default function LoomPage() {
  return (
    <main className={styles.shell} id="problem">
      <SiteHeader
        active="intelligence"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/institutional-intelligence", label: "Institutional Intelligence" },
          { label: "The Loom" },
        ]}
        contextLabel="The Loom navigation"
        contextLinks={[
          { href: "#loop", label: "Core loop" },
          { href: "#control-chain", label: "Control chain" },
          { href: "#assurance", label: "Assurance" },
          { href: "#evidence", label: "Evidence" },
          { href: "/toolkit", label: "Toolkit" },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The Loom · governed AI delivery</p>
          <h1>Find the right problem.<br />Ship it under <em>control.</em></h1>
          <p className={styles.lede}>
            Two harnesses turn an ambiguous mandate into audit-ready software. Run and
            Operations then return evidence to Discovery, so the institution learns from
            what the software actually does.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#loop">Explore the closed loop</a>
            <Link className={styles.secondaryAction} href="/toolkit">View the technical toolkit</Link>
          </div>
        </div>

        <div className={styles.loomFigure} role="img" aria-label="The Loom uses Discovery and Delivery harnesses to turn a mandate into audit-ready software, then routes operational signals back into Discovery">
          <div className={styles.figureHeader}><span>Mandate → outcome / closed loop</span><b>Two harnesses · one feedback arc</b></div>
          <div className={styles.warp}><span>Evidence</span><span>Boundaries</span><span>Authority</span><span>Quality</span><span>Traceability</span></div>
          <div className={styles.harnesses}>
            <article className={styles.harnessDiamond}><small>Harness 01</small><strong>Discovery</strong><span>Discover → Define · D1—D9</span></article>
            <i aria-hidden="true">→</i>
            <article className={styles.harnessDiamond}><small>Harness 02</small><strong>Delivery</strong><span>Develop → Deliver · Q1—Q5</span></article>
          </div>
          <div className={styles.pattern}><small>The pattern</small><strong>Mandate context brain</strong><span>Constraints · Domain · Institutional context</span></div>
          <div className={styles.shuttle}><i aria-hidden="true" /><span>AI agents weave continuously</span></div>
          <div className={styles.runtime}>
            <div className={styles.cloth}><small>The cloth</small><strong>Audit-ready software</strong></div>
            <i aria-hidden="true">→</i>
            <div className={styles.runNode}><small>The third arc</small><strong>Run / Operations</strong><span>Reality tests the framing</span></div>
          </div>
          <div className={styles.feedback}><b aria-hidden="true">↶</b><span>Incidents · drift · regulatory change · customer signals</span><strong>Return to Discovery as evidence</strong></div>
        </div>
      </section>

      <ExecutiveSummary
        title="A governed route from ambiguous mandate to accountable software."
        intro="The Loom is for institutions that want the speed of AI-assisted delivery without giving an agent authority over scope, controls or release."
        items={[
          { label: "Mandate", title: "Start before code", detail: "Frame the outcome, evidence, boundaries and decision rights before implementation begins." },
          { label: "For whom", title: "Regulated leaders", detail: "Built for sponsors, product owners, risk leaders and delivery teams working under real institutional constraints." },
          { label: "Capability", title: "One closed loop", detail: "Discovery, delivery and operations share evidence instead of handing work across disconnected phases." },
          { label: "Evidence", title: "A working reference", detail: "The first regulated build reached demo-complete using synthetic data, explicit gates and human release authority." },
          { label: "Next decision", title: "Pilot one outcome", detail: "Adopt the method around a bounded mandate, then judge it on operating evidence rather than presentation claims." },
        ]}
      />

      <section className={styles.proof} aria-label="Evidence from the first regulated Loom build">
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

      <section className={styles.section} id="control-chain">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Mandate to outcome</p>
          <div>
            <h2>One traceable control chain—not a collection of AI tools.</h2>
            <p>
              The same success measures that justify the problem become the evaluation
              targets for the released product. Every step leaves an owned artifact.
            </p>
          </div>
        </div>
        <div className={styles.controlChain} aria-label="The Loom control chain from mandate to operational signal">
          {controlChain.map(([id, title, detail]) => (
            <article key={id}>
              <span>{id}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
          <div className={styles.controlReturn}>
            <b aria-hidden="true">↶</b>
            <span>Signal routed</span>
            <strong>The next decision starts with evidence from the last one.</strong>
          </div>
        </div>
      </section>

      <section className={styles.section} id="loop">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The two harnesses</p>
          <div><h2>A double diamond: find the right problem, then deliver it.</h2><p>The diamonds meet at one enforced waist: a gate-green hand-off. Discovery may stop a weak problem early; delivery evidence may legitimately send the work back.</p></div>
        </div>
        <div className={styles.diamondFlow} role="img" aria-label="Discovery diverges to discover evidence and converges to define one problem, passes through an agreed waist gate, then delivery diverges to develop solutions and converges to deliver under control">
          <article className={styles.methodDiamond}>
            <div className={styles.diamondStage}><span>01</span><strong>Discover</strong><small>Diverge around evidence</small></div>
            <div className={styles.diamondStage}><span>02</span><strong>Define</strong><small>Converge on one problem</small></div>
          </article>
          <div className={styles.diamondGate}><span>Waist gate</span><strong>Agreed hand-off</strong></div>
          <article className={styles.methodDiamond}>
            <div className={styles.diamondStage}><span>03</span><strong>Develop</strong><small>Diverge across solutions</small></div>
            <div className={styles.diamondStage}><span>04</span><strong>Deliver</strong><small>Converge under control</small></div>
          </article>
        </div>
        <div className={styles.runArc}>
          <span>Run / Operations</span>
          <p><strong>Deploy → observe → triage.</strong> Most signals become a delivery fix or risk-register update. Only evidence that challenges the original framing reopens Discovery.</p>
          <b aria-hidden="true">↶ Feedback edge to D2 evidence</b>
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
          <div><h2>Delivery: an autonomous loop that proposes, never disposes.</h2><p>One loop takes one eligible item end to end. The agent authors and verifies; a protected control plane keeps approval accountable—per change by default, or through a narrowly governed routine envelope.</p></div>
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
        <div className={styles.actions}>
          <Link className={styles.secondaryAction} href="/brainkit">Examine the Institutional BrainKit</Link>
        </div>
      </section>

      <section className={styles.section} id="assurance">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Continuous assurance · always-on</p>
          <div><h2>Agents do the recurring work. People retain judgement.</h2><p>The assurance lifecycle re-runs on changes, schedules and regulatory events, keeping evidence current to the last trigger instead of the last meeting.</p></div>
        </div>
        <ol className={styles.assuranceFlow}>
          {assuranceSteps.map(([id, title, detail]) => <li key={id}><span>{id}</span><h3>{title}</h3><p>{detail}</p></li>)}
        </ol>
      </section>

      <section className={styles.section} id="governance">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Harness governance · who assures the AI?</p>
          <div><h2>AI proposes. Humans and a protected control plane dispose.</h2><p>The regulated reference catalogue closes the gaps that let an ungoverned agent self-review, self-merge, deploy and edit its own guardrails.</p></div>
        </div>
        <div className={styles.governanceGrid}>
          {governanceDecisions.map(([id, title, detail]) => <article key={id}><span>{id}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}
        </div>
        <div className={styles.maturityIntro}>
          <span>Honest self-grade</span>
          <div><h3>A control is not “bank-grade” merely because it is documented.</h3><p>The Loom separates repository mechanics from platform enforcement and real operating evidence.</p></div>
        </div>
        <ol className={styles.maturityScale}>
          {maturityStates.map(([id, title, detail]) => <li key={id}><span>{id}</span><strong>{title}</strong><p>{detail}</p></li>)}
        </ol>
      </section>

      <section className={styles.section} id="evidence">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Proof and limits</p>
          <div><h2>Proven on Open Finance. Stated plainly.</h2><p>The first build demonstrates a real gated system and a reusable method. It does not justify claims the evidence cannot yet carry.</p></div>
        </div>
        <div className={styles.limitGrid}>
          {limits.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
        <div className={styles.caseLink}><span>Reference proof</span><strong>Open Finance Backoffice</strong><p>A bank-neutral, synthetic-only operating platform and the first formal proof of the harness.</p><Link href="/ventures/backoffice">Read the build record →</Link></div>
        <div className={styles.caseLink}><span>Loom-informed ventures</span><strong>Parqo · HiveMind</strong><p>Applications of its evidence, specification and human-authority principles—not claims of full regulated-harness adoption.</p><Link href="/ventures#portfolio">Explore the portfolio →</Link></div>
      </section>

      <section className={styles.engage}>
        <p className={styles.eyebrow}>Adopt the method</p>
        <h2>Start with one real mandate and leave a reusable capability behind.</h2>
        <p>Mount the institution&apos;s controls and context, run one gated discovery, and deliver one bounded outcome with human accountability intact.</p>
        <div className={styles.actions}>
          <Link className={styles.primaryAction} href="/#engage">Discuss a Loom pilot</Link>
          <Link className={styles.darkAction} href="/toolkit">View The Loom Toolkit</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
