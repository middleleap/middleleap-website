import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import styles from "../backoffice/project.module.css";

export const metadata: Metadata = {
  title: "HiveMind / Hive Coach",
  description:
    "How HiveMind built Hive Coach: product architecture, runtime AI pipeline, delivery harness, technology stack, quality controls and development maturity.",
  alternates: { canonical: "/ventures/hivemind" },
  openGraph: {
    title: "HiveMind / Hive Coach | MiddleLeap Ventures",
    description: "An evidence-backed build record for human-led, AI-amplified karting coaching.",
    url: "https://middleleap.com/ventures/hivemind",
  },
};

const buildStages = [
  { number: "01", name: "Observe", detail: "Coach workflow, track-day evidence and a gold-standard debrief" },
  { number: "02", name: "Frame", detail: "Human-led product principles, consent boundaries and acceptance criteria" },
  { number: "03", name: "Design", detail: "Stitch-assisted screens and a capture-to-debrief architecture" },
  { number: "04", name: "Build", detail: "Claude Code loops with server-side AI and repository tripwires" },
  { number: "05", name: "Evaluate", detail: "Gold-set scoring, RLS checks and mandatory coach sign-off" },
];

const harnessCapabilities = [
  { label: "Build agent", title: "Claude Code", detail: "The repository documents autonomous /loop delivery with explicit acceptance checks and stop conditions." },
  { label: "Runtime models", title: "Claude + Whisper", detail: "Claude Sonnet handles vision and synthesis, Opus drafts final prose, and OpenAI Whisper transcribes voice notes." },
  { label: "Repository skills", title: "Two focused skills", detail: "eval runs the quality harness; new-migration creates database changes with the project conventions." },
  { label: "Build controls", title: "Three hooks", detail: "Pre-write checks block client-side AI and protected-file changes; post-edit checks run targeted validation." },
  { label: "Review agents", title: "Two bounded reviewers", detail: "Grounding and RLS security are reviewed as separate concerns rather than folded into generation." },
  { label: "Design tool", title: "Stitch MCP", detail: "Google Stitch is documented as build-time design tooling. It is not part of the customer-facing runtime." },
];

const stack = [
  "TypeScript", "Next.js 15 + React 19", "PWA", "Supabase Postgres", "Supabase Auth + RLS",
  "Supabase Storage", "Anthropic Claude", "OpenAI Whisper", "Puppeteer PDF", "WhatsApp Cloud API",
  "PostHog", "Sentry", "Vitest + Playwright", "pgTAP", "Vercel",
];

const phases = [
  { number: "P0", title: "One-loop proof", state: "done", label: "Proven" },
  { number: "P1", title: "Core debrief", state: "done", label: "Phase 0 live" },
  { number: "P2", title: "Operations spine", state: "done", label: "Substantial build" },
  { number: "P3", title: "Personalisation", state: "next", label: "Active" },
  { number: "P4", title: "Delivery integrations", state: "next", label: "Human-gated" },
  { number: "P5", title: "Pilot expansion", state: "later", label: "Roadmap" },
];

const sources = [
  ["R1", "Repository overview and product principles", "https://github.com/middleleap/hivemind/blob/main/README.md"],
  ["R2", "Binding Claude Code conventions", "https://github.com/middleleap/hivemind/blob/main/CLAUDE.md"],
  ["R3", "Technical architecture", "https://github.com/middleleap/hivemind/blob/main/docs/HiveMind_Technical_Architecture.md"],
  ["R4", "Phase 0 build plan", "https://github.com/middleleap/hivemind/blob/main/docs/BUILD_PLAN.md"],
  ["R5", "Post-Phase-0 roadmap", "https://github.com/middleleap/hivemind/blob/main/ROADMAP.md"],
  ["R6", "Claude Code hooks and plugins", "https://github.com/middleleap/hivemind/blob/main/.claude/settings.json"],
  ["R7", "Continuous-integration workflow", "https://github.com/middleleap/hivemind/blob/main/.github/workflows/ci.yml"],
  ["R8", "Deployment runbook", "https://github.com/middleleap/hivemind/blob/main/DEPLOY.md"],
];

export default function HiveMindProjectPage() {
  return (
    <main className={styles.shell} id="problem">
      <header className={styles.nav}>
        <BrandLockup />
        <nav className={styles.navLinks} aria-label="Project navigation">
          <Link href="/ventures">Ventures</Link><a href="#architecture">Architecture</a><a href="#build-system">Build system</a><a href="#development">Development</a>
        </nav>
        <a className={styles.navCta} href="https://github.com/middleleap/hivemind" target="_blank" rel="noreferrer">View repository ↗</a>
        <Link className={styles.mobileNavLink} href="/ventures">All Ventures</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Platform venture · Build record</p>
          <h1>HiveMind.<br /><em>Human-led coaching.</em></h1>
          <p className={styles.lede}>Hive Coach turns track-day evidence into a coach-owned debrief: AI accelerates the analysis, while the coach retains judgement, voice and final sign-off.</p>
          <div className={styles.actions}><a className={styles.primaryAction} href="#architecture">See how it works ↓</a><a className={styles.secondaryAction} href="https://github.com/middleleap/hivemind" target="_blank" rel="noreferrer">View repository ↗</a></div>
          <p className={styles.snapshot}>Evidence snapshot · repository main at 7e23cfe · reviewed 11 July 2026</p>
        </div>
        <aside className={styles.statusPanel} aria-label="HiveMind project status">
          <div className={styles.statusHeader}><span>Project record / Hive Coach</span><b>Phase 0 live</b></div>
          <dl>
            <div><dt>Current phase</dt><dd>Core debrief loop live · post-Phase-0 build active</dd></div>
            <div><dt>Ownership</dt><dd>LHM Media · Michael and Louis Ryberg Hartmann</dd></div>
            <div><dt>Product posture</dt><dd>Working pilot product, not an autonomous coach</dd></div>
            <div><dt>AI posture</dt><dd>Server-side analysis · mandatory human review</dd></div>
            <div><dt>Remaining boundary</dt><dd>Live credentials, noisy trackside trials and wider pilot evidence</dd></div>
          </dl>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}><span>01</span><p>Why it exists</p></div>
        <div><h2>Elite coaching insight should not depend on an elite coaching budget.</h2><p className={styles.sectionLede}>Karting produces rich evidence—timing sheets, video, photographs, voice notes and weather—but turning it into useful, personal feedback is slow. Hive Coach makes that synthesis repeatable without replacing the coach.</p>
          <div className={styles.outcomeGrid}>
            <article><span>Problem</span><h3>Evidence is scattered</h3><p>Track-day observations arrive in different formats and often disappear before they become actionable learning.</p></article>
            <article><span>Proposition</span><h3>One coached debrief</h3><p>Capture once, assemble the session record, draft a grounded debrief and return it to the coach for judgement.</p></article>
            <article><span>Principle</span><h3>The coach is the product</h3><p>AI supports perception and synthesis; it cannot send the final advice or claim facts outside the evidence.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="architecture" tabIndex={-1}>
        <div className={styles.sectionLabel}><span>02</span><p>Product architecture</p></div>
        <div><h2>A traceable path from track evidence to coach-owned advice.</h2><p className={styles.sectionLede}>The runtime is deliberately staged. Vision, transcription and synthesis create structured evidence before final prose is produced. Grounding and confidentiality checks sit before the coach review and PDF delivery boundary.</p>
          <div className={styles.architectureMap} role="img" aria-label="Hive Coach architecture: drivers and coaches capture media and timing evidence into Supabase; server-side Claude vision and Whisper produce structured inputs; Claude synthesis and final prose pass through grounding checks to coach review, PDF and delivery">
            <div className={`${styles.archNode} ${styles.archUsers}`}><span>People</span><strong>Driver + coach</strong><small>Capture · context · judgement</small></div>
            <div className={`${styles.archNode} ${styles.archAgents}`}><span>Evidence</span><strong>Media + timing</strong><small>Photo · video · voice · weather</small></div>
            <div className={`${styles.archNode} ${styles.archPortal}`}><span>Experience</span><strong>Next.js PWA</strong><small>Trackside capture and review</small></div>
            <div className={`${styles.archNode} ${styles.archMcp}`}><span>Stage 1</span><strong>Vision + Whisper</strong><small>Server-side extraction</small></div>
            <div className={`${styles.archNode} ${styles.archBff}`}><span>Stages 2–3</span><strong>Synthesis + prose</strong><small>Claude · coach voice · grounded facts</small></div>
            <div className={`${styles.archNode} ${styles.archPorts}`}><span>Human gate</span><strong>Coach edit + sign-off</strong><small>Mandatory before delivery</small></div>
            <div className={`${styles.archNode} ${styles.archData}`}><span>System of record</span><strong>Supabase + RLS</strong><small>Profiles · evidence · consent</small></div>
            <div className={`${styles.archNode} ${styles.archExternal}`}><span>Output</span><strong>PDF + WhatsApp</strong><small>Approved debrief delivery</small></div>
            <svg viewBox="0 0 760 430" aria-hidden="true"><path d="M118 82 C190 82 208 138 285 138"/><path d="M642 82 C570 82 552 138 475 138"/><path d="M285 176 C285 215 320 215 352 235"/><path d="M475 176 C475 215 440 215 408 235"/><path d="M380 285 L380 320"/><path d="M330 275 C260 286 220 335 180 366"/><path d="M470 360 L570 360"/></svg>
          </div>
        </div>
      </section>

      <section className={styles.section}><div className={styles.sectionLabel}><span>03</span><p>Delivery approach</p></div><div><h2>Start with the coach&apos;s gold standard, then make every AI step answer to it.</h2><div className={styles.buildFlow}>{buildStages.map((stage) => <article key={stage.number}><span>{stage.number}</span><h3>{stage.name}</h3><p>{stage.detail}</p></article>)}</div></div></section>

      <section className={styles.section} id="build-system" tabIndex={-1}>
        <div className={styles.sectionLabel}><span>04</span><p>AI systems</p></div>
        <div><h2>Delivery AI and product AI are different systems.</h2><p className={styles.sectionLede}>Claude Code, skills, hooks, reviewers and Stitch MCP shape how the product is built. Claude and Whisper power the server-side customer workflow. The repository contains no Codex build provenance in the reviewed snapshot.</p>
          <div className={styles.harnessGrid}>{harnessCapabilities.map((item) => <article key={item.title}><span>{item.label}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
          <div className={styles.controlLine}><span>Server-only AI</span><i>→</i><span>Structured evidence</span><i>→</i><span>Gold-set evaluation</span><i>→</i><span>Coach edit</span><i>→</i><span>Human send</span></div>
        </div>
      </section>

      <section className={styles.section}><div className={styles.sectionLabel}><span>05</span><p>Technology</p></div><div><h2>A trackside PWA backed by a secure, observable AI pipeline.</h2><div className={styles.stackGrid}>{stack.map((item) => <span key={item}>{item}</span>)}</div></div></section>

      <section className={styles.section}><div className={styles.sectionLabel}><span>06</span><p>Quality system</p></div><div><h2>Quality is measured at the advice boundary.</h2><div className={styles.gateGrid}>
        <article><span>CI</span><h3>Build integrity</h3><p>Types, lint, unit tests and the offline evaluation harness run together.</p></article>
        <article><span>Guardrails</span><h3>AI containment</h3><p>Repository checks prevent browser-side model calls and committed secrets; gitleaks adds a separate scan.</p></article>
        <article><span>Database</span><h3>RLS integrity</h3><p>Supabase migrations and pgTAP policies are exercised in a dedicated database workflow.</p></article>
        <article><span>Evaluation</span><h3>Grounded output</h3><p>A gold set scores whether the generated debrief stays faithful, useful and appropriately confidential.</p></article>
        <article><span>Journey</span><h3>Product confidence</h3><p>Playwright covers user journeys, AI-tagged scenarios and row-level security boundaries.</p></article>
        <article><span>Release</span><h3>Coach authority</h3><p>The product requires a coach edit and sign-off before a debrief becomes customer-facing advice.</p></article>
      </div></div></section>

      <section className={styles.section} id="development" tabIndex={-1}><div className={styles.sectionLabel}><span>07</span><p>Development record</p></div><div><h2>The core loop is live; expansion remains evidence-led.</h2><div className={styles.phaseTrack}>{phases.map((phase) => <article className={phase.state === "next" ? styles.nextPhase : styles.donePhase} key={phase.number}><span>{phase.number}</span><h3>{phase.title}</h3><p>{phase.label}</p></article>)}</div>
        <div className={styles.evidenceGrid}><article><strong>303</strong><span>Tracked test/spec files in the application</span></article><article><strong>71</strong><span>Supabase migrations in the reviewed repository</span></article><article><strong>25</strong><span>Next.js API route handlers</span></article><article><strong>2 + 3 + 2</strong><span>Repository skills, hooks and bounded review agents</span></article></div>
        <div className={styles.boundaryNote}><span>Known boundary</span><p>Phase 0 is a working application, but production confidence still depends on real coach inputs, noisy trackside trials, live delivery credentials and wider pilot evidence. Parent consent and coach authority remain human responsibilities, not model decisions.</p></div>
      </div></section>

      <section className={styles.sources}><div className={styles.sectionLabel}><span>08</span><p>Evidence register</p></div><div><h2>Claims trace back to the repository.</h2><div className={styles.sourceList}>{sources.map(([id,label,href]) => <a href={href} target="_blank" rel="noreferrer" key={id}><span>{id}</span><strong>{label}</strong><b>Open ↗</b></a>)}</div></div></section>

      <section className={styles.engage}><p className={styles.eyebrow}>What this venture proves</p><h2>AI can deepen a human service without taking authority away from the expert.</h2><p>Bring the product, operating-model and governed-AI learning into your service proposition.</p><a href="mailto:contact@middleleap.com?subject=HiveMind%20venture%20learning">Discuss the mandate →</a></section>
      <footer className={styles.footer}><span>MiddleLeap Ventures · Platform venture</span><Link href="/ventures#family-platforms">Back to Ventures</Link></footer>
    </main>
  );
}
