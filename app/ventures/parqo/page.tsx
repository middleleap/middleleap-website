import type { Metadata } from "next";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { RelatedPortfolio } from "@/components/RelatedPortfolio";
import styles from "../backoffice/project.module.css";

export const metadata: Metadata = {
  title: "Parqo",
  description:
    "How Parqo is being built: the live acquisition wedge, approved marketplace design, AI-native delivery controls, technology stack and validation roadmap.",
  alternates: { canonical: "/ventures/parqo" },
  openGraph: {
    title: "Parqo | MiddleLeap Ventures",
    description: "An evidence-backed build record for a UAE employee-parking marketplace.",
    url: "https://www.middleleap.com/ventures/parqo",
  },
};

const buildStages = [
  { number: "01", name: "Research", detail: "Market evidence, competition, risks and district economics" },
  { number: "02", name: "Specify", detail: "PRD, v0.4 design, data model, contracts and decision gates" },
  { number: "03", name: "Handoff", detail: "A bounded Codex prompt and an ordered implementation backlog" },
  { number: "04", name: "Ship wedge", detail: "A production acquisition site with demand and supply intake" },
  { number: "05", name: "Validate", detail: "Conversion and lead-quality evidence before marketplace build-out" },
];

const aiControls = [
  { label: "Build agent", title: "Codex", detail: "The repository contains a first Codex build prompt, a Codex handoff package name and Codex-authored delivery history." },
  { label: "Delivery model", title: "AI-native, human-authorised", detail: "AI can scaffold code, tests, research and documentation; founders and engineers retain commercial and production authority." },
  { label: "Prohibited actions", title: "Deterministic operations", detail: "AI cannot activate capacity, alter access, set payouts, issue final finance documents or change privacy policy." },
  { label: "Repository harness", title: "Still deliberately light", detail: "No repository MCP config, hooks, custom skills or CI workflow were found in the reviewed snapshot." },
  { label: "Brand context", title: "Claude guidance only", detail: "A Claude brand-voice guide is present, but it is context documentation rather than evidence of an autonomous build loop." },
  { label: "Operating intelligence", title: "Supabase → Notion", detail: "A founder-run script converts lead data into a Notion page with 12 text-based demand and supply views." },
];

const stack = [
  "TypeScript", "Next.js 16 + React 19", "Vercel", "Supabase Postgres", "Next.js route handlers",
  "Resend", "PostHog EU", "Cal.com", "WhatsApp", "Vercel WAF", "Notion API", "Node.js",
];

const phases = [
  { number: "P0", title: "Thesis + evidence", state: "done", label: "Complete" },
  { number: "P1", title: "Approved v0.4 design", state: "done", label: "Complete" },
  { number: "P2", title: "Acquisition wedge", state: "done", label: "Live" },
  { number: "P3", title: "Lead validation", state: "next", label: "Current gate" },
  { number: "P4", title: "Operational pilot", state: "later", label: "Next" },
  { number: "P5", title: "Platform scale", state: "later", label: "Later" },
];

const sources = [
  ["R1", "Repository overview and shipped scope", "https://github.com/middleleap/parqo/blob/79cd4aa/README.md"],
  ["R2", "Approved v0.4 specification", "https://github.com/middleleap/parqo/blob/79cd4aa/docs/11_v0.4_specification.md"],
  ["R3", "Current acquisition website stack", "https://github.com/middleleap/parqo/blob/79cd4aa/docs/17_acquisition_website_stack.md"],
  ["R4", "AI-native delivery controls", "https://github.com/middleleap/parqo/blob/79cd4aa/docs/16_ai_native_delivery.md"],
  ["R5", "First Codex implementation prompt", "https://github.com/middleleap/parqo/blob/79cd4aa/scripts/first_codex_prompt.md"],
  ["R6", "Ordered implementation backlog", "https://github.com/middleleap/parqo/blob/79cd4aa/docs/08_backlog.md"],
  ["R7", "Operations runbook", "https://github.com/middleleap/parqo/blob/79cd4aa/docs/19_operations_runbook.md"],
  ["R8", "Notion leads dashboard automation", "https://github.com/middleleap/parqo/blob/79cd4aa/docs/20_notion_leads_dashboard.md"],
];

export default function ParqoProjectPage() {
  return (
    <main className={styles.shell} id="problem">
      <SiteHeader
        active="ventures"
        breadcrumbs={[
          { href: "/ventures", label: "Ventures" },
          { href: "/ventures#portfolio", label: "Portfolio" },
          { label: "Parqo" },
        ]}
        contextLabel="Parqo navigation"
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
          <p className={styles.eyebrow}>Portfolio · Platform venture</p>
          <h1>Parqo.<br /><em>Space, put to work.</em></h1>
          <p className={styles.lede}>A B2B marketplace proposition connecting idle hotel parking with employers that need reliable employee parking in dense UAE business districts.</p>
          <div className={styles.actions}><a className={styles.primaryAction} href="https://parqo.co/" target="_blank" rel="noreferrer">Open the live site ↗</a><a className={styles.secondaryAction} href="https://github.com/middleleap/parqo" target="_blank" rel="noreferrer">View repository ↗</a></div>
          <p className={styles.snapshot}>Evidence snapshot · repository main at 79cd4aa · reviewed 11 July 2026</p>
        </div>
        <aside className={styles.statusPanel} aria-label="Parqo project status">
          <div className={styles.statusHeader}><span>Project record / Parqo</span><b>Acquisition wedge live</b></div>
          <dl>
            <div><dt>Current phase</dt><dd>Demand and supply validation before operational pilot</dd></div>
            <div><dt>MiddleLeap role</dt><dd>Venture builder and operator</dd></div>
            <div><dt>Product posture</dt><dd>Production acquisition site · marketplace design approved</dd></div>
            <div><dt>Delivery posture</dt><dd>Codex-assisted, founder-authorised</dd></div>
            <div><dt>Remaining boundary</dt><dd>Facility contracts, access operations and district density</dd></div>
          </dl>
        </aside>
      </section>

      <ExecutiveSummary
        title="A marketplace experiment designed to earn the next investment."
        intro="Parqo is not presented as regulated-platform proof. It tests a transferable platform question: can fragmented demand and idle supply become reliable contracted capacity in one dense district?"
        items={[
          { label: "Question", title: "Can density compound?", detail: "The venture tests whether qualified employer demand and dependable hotel supply can meet repeatedly in one operating district." },
          { label: "Evidence", title: "Acquisition wedge live", detail: "Separate demand and supply journeys now produce structured leads and commercial learning." },
          { label: "Boundary", title: "Not yet a marketplace", detail: "Contracts, access operations, payments and repeatable district economics remain outside the current proof." },
          { label: "Practice value", title: "Evidence before scale", detail: "The experiment sharpens marketplace strategy by tying each build decision to a commercial learning target." },
          { label: "Next gate", title: "District-level proof", detail: "Validate supply, employer willingness and operational reliability before funding broader platform surface area." },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.sectionLabel}><span>01</span><p>Why it exists</p></div>
        <div><h2>Parking scarcity and parking waste exist on the same street.</h2><p className={styles.sectionLede}>Employees struggle to find dependable parking while nearby hotel bays sit underused. Parqo tests whether these two fragmented markets can become a reliable, contracted capacity network—one district at a time.</p>
          <div className={styles.outcomeGrid}>
            <article><span>Problem</span><h3>Two invisible markets</h3><p>Employers lack guaranteed capacity; hotels lack a simple route to monetise predictable idle inventory.</p></article>
            <article><span>Wedge</span><h3>Qualify both sides</h3><p>District pages, calculators and separate intake flows create structured demand and supply evidence.</p></article>
            <article><span>Thesis</span><h3>Density before scale</h3><p>One operating district must prove supply, access reliability and employer willingness before wider platform investment.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="architecture" tabIndex={-1}>
        <div className={styles.sectionLabel}><span>02</span><p>Current architecture</p></div>
        <div><h2>The live wedge is an evidence machine—not yet the full marketplace.</h2><p className={styles.sectionLede}>The production surface acquires and qualifies both sides of the market. Next.js route handlers validate submissions into separate Supabase tables; notifications, analytics and founder follow-up close the loop. The employer dashboard, hotel console, payments and access integrations remain intentionally outside this build.</p>
          <div className={styles.architectureMap} role="img" aria-label="Parqo acquisition architecture: employers and hotels use district landing pages, calculators and intake forms; Next.js lead APIs validate submissions into Supabase; Resend notifies the operator; PostHog measures conversion; WhatsApp and Cal.com support follow-up; a Notion script produces lead intelligence">
            <div className={`${styles.archNode} ${styles.archUsers}`}><span>Demand</span><strong>Employers</strong><small>Team size · district · readiness</small></div>
            <div className={`${styles.archNode} ${styles.archAgents}`}><span>Supply</span><strong>Hotels</strong><small>Capacity · availability · access</small></div>
            <div className={`${styles.archNode} ${styles.archPortal}`}><span>Acquisition</span><strong>Next.js website</strong><small>District pages · calculators · forms</small></div>
            <div className={`${styles.archNode} ${styles.archMcp}`}><span>Measurement</span><strong>PostHog EU</strong><small>Masked funnel events</small></div>
            <div className={`${styles.archNode} ${styles.archBff}`}><span>Intake</span><strong>Lead API routes</strong><small>Validate · classify · notify</small></div>
            <div className={`${styles.archNode} ${styles.archPorts}`}><span>Operator loop</span><strong>Resend + follow-up</strong><small>WhatsApp · Cal.com · founder review</small></div>
            <div className={`${styles.archNode} ${styles.archData}`}><span>System of record</span><strong>Supabase</strong><small>Demand + supply intake tables</small></div>
            <div className={`${styles.archNode} ${styles.archExternal}`}><span>Intelligence</span><strong>Notion dashboard</strong><small>12 lead views · operator-run</small></div>
            <svg viewBox="0 0 760 430" aria-hidden="true"><path d="M118 82 C190 82 208 138 285 138"/><path d="M642 82 C570 82 552 138 475 138"/><path d="M285 176 C285 215 320 215 352 235"/><path d="M475 176 C475 215 440 215 408 235"/><path d="M380 285 L380 320"/><path d="M330 275 C260 286 220 335 180 366"/><path d="M470 360 L570 360"/></svg>
          </div>
        </div>
      </section>

      <section className={styles.section} id="delivery"><div className={styles.sectionLabel}><span>03</span><p>Loom-informed delivery</p></div><div><h2>Make the next investment conditional on real market evidence.</h2><p className={styles.sectionLede}>Parqo applies the Loom&apos;s evidence, specification and human-authority principles to venture building. This is disciplined use of the method&apos;s ideas—not a claim of full regulated-harness adoption.</p><div className={styles.buildFlow}>{buildStages.map((stage) => <article key={stage.number}><span>{stage.number}</span><h3>{stage.name}</h3><p>{stage.detail}</p></article>)}</div></div></section>

      <details className={styles.technicalDetails} id="technical-record">
        <summary><span>Technical build record</span><strong>AI delivery · Technology · Quality posture</strong><i aria-hidden="true">+</i></summary>
        <div className={styles.technicalDetailsBody}>
      <section className={styles.section}>
        <div className={styles.sectionLabel}><span>04</span><p>AI build system</p></div>
        <div><h2>AI shortens the learning loop. It does not own the business decision.</h2><p className={styles.sectionLede}>The repo evidences Codex as an implementation partner and documents a broader AI-native operating model. It also makes a disciplined claim: generated code is not the moat. Distribution, contracts, reliable access operations and proprietary network data are.</p>
          <div className={styles.harnessGrid}>{aiControls.map((item) => <article key={item.title}><span>{item.label}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
          <div className={styles.controlLine}><span>Evidence</span><i>→</i><span>Codex-assisted build</span><i>→</i><span>Human review</span><i>→</i><span>Production wedge</span><i>→</i><span>Commercial gate</span></div>
        </div>
      </section>

      <section className={styles.section}><div className={styles.sectionLabel}><span>05</span><p>Technology</p></div><div><h2>A deliberately small stack for a commercial validation problem.</h2><div className={styles.stackGrid}>{stack.map((item) => <span key={item}>{item}</span>)}</div></div></section>

      <section className={styles.section}><div className={styles.sectionLabel}><span>06</span><p>Quality posture</p></div><div><h2>The live wedge has useful controls—and a visible hardening gap.</h2><div className={styles.gateGrid}>
        <article><span>Input</span><h3>Validated intake</h3><p>Separate hotel and employer endpoints check required fields before storage and notification.</p></article>
        <article><span>Data</span><h3>Server-side storage</h3><p>Supabase secret access stays on the server; anonymous direct reads of intake tables are not granted.</p></article>
        <article><span>Privacy</span><h3>Masked analytics</h3><p>PostHog is used for non-sensitive funnel events with session masking and an EU endpoint.</p></article>
        <article><span>Edge</span><h3>Abuse controls</h3><p>The operations design specifies Vercel WAF rate limiting around the lead endpoints.</p></article>
        <article><span>Current evidence</span><h3>One source test</h3><p>The reviewed repository contains one source-behaviour test and one database migration.</p></article>
        <article><span>Hardening gap</span><h3>No CI workflow found</h3><p>Automated CI, RLS tests and production-like vertical-slice checks belong before the operational pilot.</p></article>
      </div></div></section>
        </div>
      </details>

      <section className={styles.section} id="development" tabIndex={-1}><div className={styles.sectionLabel}><span>07</span><p>Development record</p></div><div><h2>The next milestone is commercial proof, not more surface area.</h2><div className={styles.phaseTrack}>{phases.map((phase) => <article className={phase.state === "next" ? styles.nextPhase : styles.donePhase} key={phase.number}><span>{phase.number}</span><h3>{phase.title}</h3><p>{phase.label}</p></article>)}</div>
        <div className={styles.evidenceGrid}><article><strong>2</strong><span>Lead pathways: employer demand and hotel supply</span></article><article><strong>5</strong><span>Current Next.js page and API route files</span></article><article><strong>12</strong><span>Text-based lead views in the Notion automation</span></article><article><strong>0</strong><span>Repository hooks, custom skills or MCP configs evidenced</span></article></div>
        <div className={styles.boundaryNote}><span>Known boundary</span><p>Parqo is not yet an operating parking marketplace. The live production asset validates acquisition; the approved v0.4 design describes the next product. Facility contracting, access provisioning, staff and employer portals, payments, provider adapters and the employee PWA remain future work gated by district-level demand and supply evidence.</p></div>
      </div></section>

      <section className={styles.sources} id="evidence"><div className={styles.sectionLabel}><span>08</span><p>Evidence register</p></div><div><h2>Claims trace back to the repository.</h2><div className={styles.sourceList}>{sources.map(([id,label,href]) => <a href={href} target="_blank" rel="noreferrer" key={id}><span>{id}</span><strong>{label}</strong><b>Open ↗</b></a>)}</div></div></section>

      <section className={styles.engage} id="outcome"><p className={styles.eyebrow}>What this venture proves</p><h2>Platform strategy gets sharper when every build step has a commercial learning target.</h2><p>Bring the marketplace, district-density and AI-native delivery learning into your platform mandate.</p><a href="mailto:contact@middleleap.com?subject=Parqo%20venture%20learning">Discuss the mandate →</a></section>
      <RelatedPortfolio currentPath="/ventures/parqo" />
      <SiteFooter />
    </main>
  );
}
