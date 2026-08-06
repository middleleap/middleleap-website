import type { Metadata } from "next";
import Link from "next/link";
import { ProjectPage, type ProjectPageData } from "@/components/ProjectPage";
import { loomProof } from "@/lib/proof";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Open Finance Backoffice",
  description:
    "How the Open Finance Back Office was designed and built: architecture, AI delivery harness, technology stack, quality controls and development maturity.",
  alternates: { canonical: "/ventures/backoffice" },
  openGraph: pageOpenGraph({
    title: "Open Finance Backoffice | MiddleLeap Ventures",
    description:
      "An evidence-backed build record for the bank-neutral UAE Open Finance operations platform.",
    path: "/ventures/backoffice",
  }),
};

const data: ProjectPageData = {
  currentPath: "/ventures/backoffice",
  breadcrumbLabel: "Backoffice",
  contextLabel: "Backoffice navigation",
  hero: {
    eyebrow: "Portfolio · Regulated reference build",
    title: <>Open Finance<br /><em>Backoffice.</em></>,
    lede:
      "A bank-neutral operations platform for running UAE Open Finance in both roles: LFI for inbound third-party traffic and TPP-of-record for outbound platform services.",
    actions: [
      { label: "Open the live Backoffice ↗", href: "https://backoffice.openfinance-os.org/", kind: "primary", external: true },
      { label: "Read The Loom method →", href: "/the-loom", kind: "secondary" },
      { label: "View repository ↗", href: "https://github.com/openfinance-os/ofbo", kind: "secondary", external: true },
    ],
    snapshot: "Evidence snapshot · repository main at 99ab0dd · reviewed 11 July 2026",
  },
  status: {
    ariaLabel: "Backoffice project status",
    headerLabel: "Project record / OFBO",
    headerValue: "Operating demo",
    rows: [
      { term: "Current phase", detail: "M5 complete · M6 adoption next" },
      { term: "MiddleLeap role", detail: "Builder and Commons contributor" },
      { term: "Delivery posture", detail: "Demo-operational, enterprise-portable" },
      { term: "Data posture", detail: "Synthetic only · permanently non-production" },
      { term: "Remaining boundary", detail: "Per-bank enterprise adapters and gateway configuration" },
    ],
  },
  executiveSummary: {
    title: "A regulated operating model made tangible.",
    intro:
      "Backoffice is MiddleLeap's flagship delivery proof: a synthetic-only reference platform showing how Open Finance obligations can become governed workflows, architecture and evidence.",
    items: [
      { label: "Problem", title: "Operations, not APIs", detail: "Banks need one operating layer for consent, servicing, reconciliation, approvals, audit and lineage across LFI and TPP roles." },
      { label: "For whom", title: "Banks and platforms", detail: "Relevant to institutions turning a regulatory mandate into an operable platform and accountable control model." },
      { label: "Evidence", title: "Demo-complete", detail: "A working reference implementation, quality gates and repository evidence demonstrate the designed control chain." },
      { label: "Boundary", title: "Not production proof", detail: "The build remains synthetic and has not yet cleared bank integration, live data, production scale or regulator examination." },
      { label: "Advisory value", title: "Controls become architecture", detail: "The work makes implementation trade-offs visible early enough to shape strategy, operating model and investment." },
    ],
  },
  why: {
    heading: "Open Finance is a regulated operation—not only an API programme.",
    lede:
      "The platform joins consent operations, billing, reconciliation, risk, compliance and audit into one controlled operating surface. A single event can become a care dispute, finance break, risk signal, operational case and four-eyes approval without losing lineage.",
    cards: [
      { tag: "Problem", title: "Fragmented controls", detail: "Banks need to evidence obligations across two participant roles and multiple internal functions." },
      { tag: "Proposition", title: "One operating layer", detail: "A role-scoped back office over the Nebras scheme surfaces, with consistent approvals, audit and lineage." },
      { tag: "Learning", title: "Controls are architecture", detail: "Four-eyes, RLS, secure egress and provenance cannot be retrofitted after product delivery." },
    ],
  },
  architecture: {
    label: "Product architecture",
    heading: "One contract, multiple governed surfaces.",
    lede:
      "The portal and agent interface reuse the same BFF contract. External systems sit behind P1–P9 ports, each with demo and enterprise adapters, so bank adoption replaces edges without branching the application core.",
    mapAriaLabel:
      "OFBO architecture: operators and agents use the portal and MCP gateway, which share a Hono BFF and OpenAPI contract connected through ports to bank and Nebras systems, with PostgreSQL audit and lineage beneath",
    nodes: [
      { slot: "users", tag: "Users", title: "Bank operators", small: "Care · Finance · Risk · Ops" },
      { slot: "agents", tag: "Agents", title: "MCP clients", small: "Governed admin tools" },
      { slot: "portal", tag: "Experience", title: "Next.js portal", small: "Scope-gated institutional UI" },
      { slot: "mcp", tag: "Agent interface", title: "MCP gateway", small: "Contract-derived catalogue" },
      { slot: "bff", tag: "Control core", title: "Hono BFF + OpenAPI", small: "Auth · scopes · approvals · idempotency" },
      { slot: "ports", tag: "Boundary", title: "Ports P1–P9", small: "sim ↔ enterprise adapters" },
      { slot: "data", tag: "Evidence", title: "PostgreSQL + RLS", small: "Insert-only audit · BCBS 239 lineage" },
      { slot: "external", tag: "External", title: "Nebras + bank estate", small: "Secure egress · no direct bypass" },
    ],
  },
  delivery: {
    label: "The Loom · reference implementation",
    heading: "The first cloth off The Loom: a governed double diamond feeding a spec-first delivery loop.",
    lede: (
      <>
        The Open Finance Backoffice is the first evidenced implementation of
        <Link href="/the-loom"> The Loom</Link>
        {`. Its autonomous loop carried ${loomProof.storiesDone} of approximately ${loomProof.storiesTotalApprox} backlog stories to done under quality gates, synthetic-data constraints and human four-eyes merge. The method is reusable; the Open Finance regulation, brand, contracts and controls are this implementation's pattern.`}
      </>
    ),
    stages: [
      { number: "01", name: "Discover", detail: "Evidence, problem framing and data-governance gates" },
      { number: "02", name: "Develop", detail: "Parallel solution directions and a recorded decision" },
      { number: "03", name: "Specify", detail: "PRD, OpenAPI contract, ADRs and failing acceptance tests" },
      { number: "04", name: "Implement", detail: "One story, one worktree, one human-reviewed PR" },
      { number: "05", name: "Verify", detail: "Contract, security, lineage, E2E and release evidence" },
    ],
  },
  technical: {
    summary: "AI build system · Technology · Quality controls",
    ai: {
      label: "AI build system",
      heading: "The model proposes. The harness constrains. Humans decide.",
      lede:
        "The repository documents Claude Code as the build agent. No Codex build provenance was found in the reviewed repository snapshot. Product MCP and build-time MCP are deliberately reported separately.",
      cards: [
        { label: "Build agent", title: "Claude Code", detail: "The documented autonomous build loop is /loop /next-story. Commits retain Claude session and build-model provenance." },
        { label: "Domain skills", title: "Seven repository skills", detail: "discovery, brand-render, develop, next-story, implement-story, spec-change and run-ofbo encode the delivery method." },
        { label: "Review agents", title: "Four bounded reviewers", detail: "Contract conformance, regulatory hard stops, data governance and discovery-boundary checks remain separate judgements." },
        { label: "Pre-action controls", title: "Four Claude Code hooks", detail: "Worktree policy at session start; PII, spec and test-integrity tripwires before file mutations." },
        { label: "Product interface", title: "OFBO MCP gateway", detail: "A contract-derived MCP layer exposes governed BFF operations without creating a second auth or approval path." },
        { label: "Design evidence", title: "Stitch MCP", detail: "The build log records Stitch MCP use to verify the institutional UI tokens and reference screens." },
      ],
      controlLine: ["Worktree isolation", "Spec + test tripwires", "Bounded reviewers", "Human merge", "Sealed provenance"],
    },
    technology: {
      heading: "A portable TypeScript platform with regulated-data controls.",
      stack: [
        "TypeScript", "Next.js 15 + React 19", "Hono BFF", "OpenAPI-generated contracts",
        "PostgreSQL + RLS", "MCP SDK", "Cloudflare Workers", "OpenNext", "Railway",
        "Vitest + Playwright + axe", "Semgrep + StrykerJS", "Terraform",
      ],
    },
    quality: {
      label: "Quality system",
      heading: "Green means more than tests passed.",
      cards: [
        { tag: "Q1 / Q1b", title: "Build integrity", detail: "Build, unit tests, generated-artifact drift and anti-reward-hacking controls." },
        { tag: "D1–D9", title: "Discovery gates", detail: "Evidence, governance, prototype boundaries, stakeholder reaction and delivery traceability." },
        { tag: "Q2 / Q2b", title: "Static integrity", detail: "Lint, typecheck, SAST, secrets scanning and documentation-drift detection." },
        { tag: "Q3", title: "Runtime integrity", detail: "Postgres integration, contract verification and Playwright portal journeys." },
        { tag: "Q4 / Q4.5", title: "Regulatory integrity", detail: "Dependency review, security controls and BCBS 239 lineage validation." },
        { tag: "Q5", title: "Human release", detail: "Manual approval backed by a SHA-256-sealed release-evidence and agent-provenance bundle." },
      ],
    },
  },
  development: {
    heading: "Demo-complete. Enterprise adoption is the next boundary.",
    phases: [
      { number: "M0", title: "Foundation", state: "done", label: "Delivered" },
      { number: "M1", title: "Substrate + demo", state: "done", label: "Delivered" },
      { number: "M2", title: "Customer care", state: "done", label: "Delivered" },
      { number: "M3", title: "Reconciliation", state: "done", label: "Delivered" },
      { number: "M4", title: "Analytics", state: "done", label: "Delivered" },
      { number: "M5", title: "Hardening", state: "done", label: "Delivered" },
      { number: "M6", title: "Bank adoption", state: "next", label: "Per-bank engagement" },
    ],
    evidence: [
      { stat: "89", caption: "OpenAPI paths in the reviewed contract" },
      { stat: "29", caption: "PostgreSQL migrations in the repository" },
      { stat: "254", caption: "Tracked test/spec files across the monorepo" },
      { stat: "M0–M5", caption: "Delivered and demonstrable before enterprise port swaps" },
    ],
    boundary:
      "The public environment is synthetic-only and permanently non-production. M6 requires an adopting bank's enterprise systems, credentials, gateway posture and port-by-port contract acceptance. Service-to-service mTLS is therefore tracked as an enterprise gateway responsibility, not simulated in application code.",
  },
  sources: [
    { id: "R1", label: "Repository overview and status", href: "https://github.com/openfinance-os/ofbo/blob/99ab0dd/README.md" },
    { id: "R2", label: "Binding build conventions", href: "https://github.com/openfinance-os/ofbo/blob/99ab0dd/CLAUDE.md" },
    { id: "R3", label: "Claude Code hooks", href: "https://github.com/openfinance-os/ofbo/blob/99ab0dd/.claude/settings.json" },
    { id: "R4", label: "Product MCP configuration", href: "https://github.com/openfinance-os/ofbo/blob/99ab0dd/.mcp.json" },
    { id: "R5", label: "Architecture overview", href: "https://github.com/openfinance-os/ofbo/blob/99ab0dd/docs/architecture-overview.md" },
    { id: "R6", label: "Quality-gate workflow", href: "https://github.com/openfinance-os/ofbo/blob/99ab0dd/.github/workflows/ci.yml" },
    { id: "R7", label: "Development backlog", href: "https://github.com/openfinance-os/ofbo/blob/99ab0dd/docs/backlog.yaml" },
    { id: "R8", label: "Agentic build record", href: "https://github.com/openfinance-os/ofbo/blob/99ab0dd/docs/build-log.md" },
  ],
  engage: {
    heading: "Regulated operating controls can be designed into the platform from day one.",
    detail: "Bring the architecture, operating-model and AI-delivery learning into your Open Finance mandate.",
    mailtoSubject: "Open%20Finance%20Back%20Office",
  },
};

export default function BackofficeProjectPage() {
  return <ProjectPage data={data} />;
}
