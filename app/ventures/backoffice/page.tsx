import type { Metadata } from "next";
import Link from "next/link";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { RelatedPortfolio } from "@/components/RelatedPortfolio";
import styles from "./project.module.css";

export const metadata: Metadata = {
  title: "Open Finance Backoffice",
  description:
    "How the Open Finance Back Office was designed and built: architecture, AI delivery harness, technology stack, quality controls and development maturity.",
  alternates: { canonical: "/ventures/backoffice" },
  openGraph: {
    title: "Open Finance Backoffice | MiddleLeap Ventures",
    description:
      "An evidence-backed build record for the bank-neutral UAE Open Finance operations platform.",
    url: "https://www.middleleap.com/ventures/backoffice",
  },
};

const buildStages = [
  { number: "01", name: "Discover", detail: "Evidence, problem framing and data-governance gates" },
  { number: "02", name: "Develop", detail: "Parallel solution directions and a recorded decision" },
  { number: "03", name: "Specify", detail: "PRD, OpenAPI contract, ADRs and failing acceptance tests" },
  { number: "04", name: "Implement", detail: "One story, one worktree, one human-reviewed PR" },
  { number: "05", name: "Verify", detail: "Contract, security, lineage, E2E and release evidence" },
];

const harnessCapabilities = [
  {
    label: "Build agent",
    title: "Claude Code",
    detail: "The documented autonomous build loop is /loop /next-story. Commits retain Claude session and build-model provenance.",
  },
  {
    label: "Domain skills",
    title: "Seven repository skills",
    detail: "discovery, brand-render, develop, next-story, implement-story, spec-change and run-ofbo encode the delivery method.",
  },
  {
    label: "Review agents",
    title: "Four bounded reviewers",
    detail: "Contract conformance, regulatory hard stops, data governance and discovery-boundary checks remain separate judgements.",
  },
  {
    label: "Pre-action controls",
    title: "Four Claude Code hooks",
    detail: "Worktree policy at session start; PII, spec and test-integrity tripwires before file mutations.",
  },
  {
    label: "Product interface",
    title: "OFBO MCP gateway",
    detail: "A contract-derived MCP layer exposes governed BFF operations without creating a second auth or approval path.",
  },
  {
    label: "Design evidence",
    title: "Stitch MCP",
    detail: "The build log records Stitch MCP use to verify the institutional UI tokens and reference screens.",
  },
];

const stack = [
  "TypeScript",
  "Next.js 15 + React 19",
  "Hono BFF",
  "OpenAPI-generated contracts",
  "PostgreSQL + RLS",
  "MCP SDK",
  "Cloudflare Workers",
  "OpenNext",
  "Railway",
  "Vitest + Playwright + axe",
  "Semgrep + StrykerJS",
  "Terraform",
];

const phases = [
  { number: "M0", title: "Foundation", state: "done" },
  { number: "M1", title: "Substrate + demo", state: "done" },
  { number: "M2", title: "Customer care", state: "done" },
  { number: "M3", title: "Reconciliation", state: "done" },
  { number: "M4", title: "Analytics", state: "done" },
  { number: "M5", title: "Hardening", state: "done" },
  { number: "M6", title: "Bank adoption", state: "next" },
];

const sources = [
  ["R1", "Repository overview and status", "https://github.com/openfinance-os/ofbo/blob/99ab0dd/README.md"],
  ["R2", "Binding build conventions", "https://github.com/openfinance-os/ofbo/blob/99ab0dd/CLAUDE.md"],
  ["R3", "Claude Code hooks", "https://github.com/openfinance-os/ofbo/blob/99ab0dd/.claude/settings.json"],
  ["R4", "Product MCP configuration", "https://github.com/openfinance-os/ofbo/blob/99ab0dd/.mcp.json"],
  ["R5", "Architecture overview", "https://github.com/openfinance-os/ofbo/blob/99ab0dd/docs/architecture-overview.md"],
  ["R6", "Quality-gate workflow", "https://github.com/openfinance-os/ofbo/blob/99ab0dd/.github/workflows/ci.yml"],
  ["R7", "Development backlog", "https://github.com/openfinance-os/ofbo/blob/99ab0dd/docs/backlog.yaml"],
  ["R8", "Agentic build record", "https://github.com/openfinance-os/ofbo/blob/99ab0dd/docs/build-log.md"],
];

export default function BackofficeProjectPage() {
  return (
    <main className={styles.shell} id="problem">
      <SiteHeader
        active="ventures"
        breadcrumbs={[
          { href: "/ventures", label: "Ventures" },
          { href: "/ventures#portfolio", label: "Portfolio" },
          { label: "Backoffice" },
        ]}
        contextLabel="Backoffice navigation"
        contextLinks={[
          { href: "#problem", label: "Overview" },
          { href: "#architecture", label: "Architecture" },
          { href: "#delivery", label: "Delivery" },
          { href: "#development", label: "Current boundary" },
          { href: "#technical-record", label: "Technical record" },
          { href: "#outcome", label: "What it proves" },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Portfolio · Regulated reference build</p>
          <h1>Open Finance<br /><em>Backoffice.</em></h1>
          <p className={styles.lede}>
            A bank-neutral operations platform for running UAE Open Finance in
            both roles: LFI for inbound third-party traffic and TPP-of-record
            for outbound platform services.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="https://backoffice.openfinance-os.org/" target="_blank" rel="noreferrer">Open the live Backoffice ↗</a>
            <Link className={styles.secondaryAction} href="/the-loom">Read The Loom method →</Link>
            <a className={styles.secondaryAction} href="https://github.com/openfinance-os/ofbo" target="_blank" rel="noreferrer">View repository ↗</a>
          </div>
          <p className={styles.snapshot}>Evidence snapshot · repository main at 99ab0dd · reviewed 11 July 2026</p>
        </div>

        <aside className={styles.statusPanel} aria-label="Backoffice project status">
          <div className={styles.statusHeader}><span>Project record / OFBO</span><b>Operating demo</b></div>
          <dl>
            <div><dt>Current phase</dt><dd>M5 complete · M6 adoption next</dd></div>
            <div><dt>MiddleLeap role</dt><dd>Builder and Commons contributor</dd></div>
            <div><dt>Delivery posture</dt><dd>Demo-operational, enterprise-portable</dd></div>
            <div><dt>Data posture</dt><dd>Synthetic only · permanently non-production</dd></div>
            <div><dt>Remaining boundary</dt><dd>Per-bank enterprise adapters and gateway configuration</dd></div>
          </dl>
        </aside>
      </section>

      <ExecutiveSummary
        title="A regulated operating model made tangible."
        intro="Backoffice is MiddleLeap's flagship delivery proof: a synthetic-only reference platform showing how Open Finance obligations can become governed workflows, architecture and evidence."
        items={[
          { label: "Problem", title: "Operations, not APIs", detail: "Banks need one operating layer for consent, servicing, reconciliation, approvals, audit and lineage across LFI and TPP roles." },
          { label: "For whom", title: "Banks and platforms", detail: "Relevant to institutions turning a regulatory mandate into an operable platform and accountable control model." },
          { label: "Evidence", title: "Demo-complete", detail: "A working reference implementation, quality gates and repository evidence demonstrate the designed control chain." },
          { label: "Boundary", title: "Not production proof", detail: "The build remains synthetic and has not yet cleared bank integration, live data, production scale or regulator examination." },
          { label: "Advisory value", title: "Controls become architecture", detail: "The work makes implementation trade-offs visible early enough to shape strategy, operating model and investment." },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.sectionLabel}><span>01</span><p>Why it exists</p></div>
        <div>
          <h2>Open Finance is a regulated operation—not only an API programme.</h2>
          <p className={styles.sectionLede}>
            The platform joins consent operations, billing, reconciliation, risk,
            compliance and audit into one controlled operating surface. A single
            event can become a care dispute, finance break, risk signal,
            operational case and four-eyes approval without losing lineage.
          </p>
          <div className={styles.outcomeGrid}>
            <article><span>Problem</span><h3>Fragmented controls</h3><p>Banks need to evidence obligations across two participant roles and multiple internal functions.</p></article>
            <article><span>Proposition</span><h3>One operating layer</h3><p>A role-scoped back office over the Nebras scheme surfaces, with consistent approvals, audit and lineage.</p></article>
            <article><span>Learning</span><h3>Controls are architecture</h3><p>Four-eyes, RLS, secure egress and provenance cannot be retrofitted after product delivery.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="architecture" tabIndex={-1}>
        <div className={styles.sectionLabel}><span>02</span><p>Product architecture</p></div>
        <div>
          <h2>One contract, multiple governed surfaces.</h2>
          <p className={styles.sectionLede}>
            The portal and agent interface reuse the same BFF contract. External
            systems sit behind P1–P9 ports, each with demo and enterprise adapters,
            so bank adoption replaces edges without branching the application core.
          </p>
          <div className={styles.architectureMap} role="img" aria-label="OFBO architecture: operators and agents use the portal and MCP gateway, which share a Hono BFF and OpenAPI contract connected through ports to bank and Nebras systems, with PostgreSQL audit and lineage beneath">
            <div className={`${styles.archNode} ${styles.archUsers}`}><span>Users</span><strong>Bank operators</strong><small>Care · Finance · Risk · Ops</small></div>
            <div className={`${styles.archNode} ${styles.archAgents}`}><span>Agents</span><strong>MCP clients</strong><small>Governed admin tools</small></div>
            <div className={`${styles.archNode} ${styles.archPortal}`}><span>Experience</span><strong>Next.js portal</strong><small>Scope-gated institutional UI</small></div>
            <div className={`${styles.archNode} ${styles.archMcp}`}><span>Agent interface</span><strong>MCP gateway</strong><small>Contract-derived catalogue</small></div>
            <div className={`${styles.archNode} ${styles.archBff}`}><span>Control core</span><strong>Hono BFF + OpenAPI</strong><small>Auth · scopes · approvals · idempotency</small></div>
            <div className={`${styles.archNode} ${styles.archPorts}`}><span>Boundary</span><strong>Ports P1–P9</strong><small>sim ↔ enterprise adapters</small></div>
            <div className={`${styles.archNode} ${styles.archData}`}><span>Evidence</span><strong>PostgreSQL + RLS</strong><small>Insert-only audit · BCBS 239 lineage</small></div>
            <div className={`${styles.archNode} ${styles.archExternal}`}><span>External</span><strong>Nebras + bank estate</strong><small>Secure egress · no direct bypass</small></div>
            <svg viewBox="0 0 760 430" aria-hidden="true">
              <path d="M118 82 C190 82 208 138 285 138" />
              <path d="M642 82 C570 82 552 138 475 138" />
              <path d="M285 176 C285 215 320 215 352 235" />
              <path d="M475 176 C475 215 440 215 408 235" />
              <path d="M380 285 L380 320" />
              <path d="M330 275 C260 286 220 335 180 366" />
              <path d="M470 360 L570 360" />
            </svg>
          </div>
        </div>
      </section>

      <section className={styles.section} id="delivery">
        <div className={styles.sectionLabel}><span>03</span><p>The Loom · reference implementation</p></div>
        <div>
          <h2>The first cloth off The Loom: a governed double diamond feeding a spec-first delivery loop.</h2>
          <p className={styles.sectionLede}>
            The Open Finance Backoffice is the first evidenced implementation of
            <Link href="/the-loom"> The Loom</Link>. Its autonomous loop carried 134 of
            approximately 139 backlog stories to done under quality gates, synthetic-data
            constraints and human four-eyes merge. The method is reusable; the Open Finance
            regulation, brand, contracts and controls are this implementation&apos;s pattern.
          </p>
          <div className={styles.buildFlow}>
            {buildStages.map((stage) => (
              <article key={stage.number}>
                <span>{stage.number}</span><h3>{stage.name}</h3><p>{stage.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <details className={styles.technicalDetails} id="technical-record">
        <summary><span>Technical build record</span><strong>AI build system · Technology · Quality controls</strong><i aria-hidden="true">+</i></summary>
        <div className={styles.technicalDetailsBody}>
      <section className={styles.section}>
        <div className={styles.sectionLabel}><span>04</span><p>AI build system</p></div>
        <div>
          <h2>The model proposes. The harness constrains. Humans decide.</h2>
          <p className={styles.sectionLede}>
            The repository documents Claude Code as the build agent. No Codex
            build provenance was found in the reviewed repository snapshot. Product
            MCP and build-time MCP are deliberately reported separately.
          </p>
          <div className={styles.harnessGrid}>
            {harnessCapabilities.map((capability) => (
              <article key={capability.title}>
                <span>{capability.label}</span><h3>{capability.title}</h3><p>{capability.detail}</p>
              </article>
            ))}
          </div>
          <div className={styles.controlLine} role="group" aria-label="Agent delivery controls">
            <span>Worktree isolation</span><i>→</i><span>Spec + test tripwires</span><i>→</i><span>Bounded reviewers</span><i>→</i><span>Human merge</span><i>→</i><span>Sealed provenance</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}><span>05</span><p>Technology</p></div>
        <div>
          <h2>A portable TypeScript platform with regulated-data controls.</h2>
          <div className={styles.stackGrid}>
            {stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionLabel}><span>06</span><p>Quality system</p></div>
        <div>
          <h2>Green means more than tests passed.</h2>
          <div className={styles.gateGrid}>
            <article><span>Q1 / Q1b</span><h3>Build integrity</h3><p>Build, unit tests, generated-artifact drift and anti-reward-hacking controls.</p></article>
            <article><span>D1–D9</span><h3>Discovery gates</h3><p>Evidence, governance, prototype boundaries, stakeholder reaction and delivery traceability.</p></article>
            <article><span>Q2 / Q2b</span><h3>Static integrity</h3><p>Lint, typecheck, SAST, secrets scanning and documentation-drift detection.</p></article>
            <article><span>Q3</span><h3>Runtime integrity</h3><p>Postgres integration, contract verification and Playwright portal journeys.</p></article>
            <article><span>Q4 / Q4.5</span><h3>Regulatory integrity</h3><p>Dependency review, security controls and BCBS 239 lineage validation.</p></article>
            <article><span>Q5</span><h3>Human release</h3><p>Manual approval backed by a SHA-256-sealed release-evidence and agent-provenance bundle.</p></article>
          </div>
        </div>
      </section>
        </div>
      </details>

      <section className={styles.section} id="development" tabIndex={-1}>
        <div className={styles.sectionLabel}><span>07</span><p>Development record</p></div>
        <div>
          <h2>Demo-complete. Enterprise adoption is the next boundary.</h2>
          <div className={styles.phaseTrack}>
            {phases.map((phase) => (
              <article className={phase.state === "next" ? styles.nextPhase : styles.donePhase} key={phase.number}>
                <span>{phase.number}</span><h3>{phase.title}</h3><p>{phase.state === "done" ? "Delivered" : "Per-bank engagement"}</p>
              </article>
            ))}
          </div>
          <div className={styles.evidenceGrid}>
            <article><strong>89</strong><span>OpenAPI paths in the reviewed contract</span></article>
            <article><strong>29</strong><span>PostgreSQL migrations in the repository</span></article>
            <article><strong>254</strong><span>Tracked test/spec files across the monorepo</span></article>
            <article><strong>M0–M5</strong><span>Delivered and demonstrable before enterprise port swaps</span></article>
          </div>
          <div className={styles.boundaryNote}>
            <span>Known boundary</span>
            <p>
              The public environment is synthetic-only and permanently non-production.
              M6 requires an adopting bank&apos;s enterprise systems, credentials, gateway
              posture and port-by-port contract acceptance. Service-to-service mTLS is
              therefore tracked as an enterprise gateway responsibility, not simulated
              in application code.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sources} id="evidence">
        <div className={styles.sectionLabel}><span>08</span><p>Evidence register</p></div>
        <div>
          <h2>Claims trace back to the repository.</h2>
          <div className={styles.sourceList}>
            {sources.map(([id, label, href]) => (
              <a href={href} target="_blank" rel="noreferrer" key={id}>
                <span>{id}</span><strong>{label}</strong><b>Open ↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.engage} id="outcome">
        <p className={styles.eyebrow}>What this venture proves</p>
        <h2>Regulated operating controls can be designed into the platform from day one.</h2>
        <p>Bring the architecture, operating-model and AI-delivery learning into your Open Finance mandate.</p>
        <a href="mailto:contact@middleleap.com?subject=Open%20Finance%20Back%20Office">Discuss the mandate →</a>
      </section>

      <RelatedPortfolio currentPath="/ventures/backoffice" />
      <SiteFooter />
    </main>
  );
}
