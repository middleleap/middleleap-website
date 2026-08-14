import { ProjectPage, type ProjectPageData } from "@/components/ProjectPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Parqo",
  description:
    "How Parqo is being built: the live acquisition wedge, approved marketplace design, AI-native delivery controls, technology stack and validation roadmap.",
  path: "/ventures/parqo",
  socialTitle: "Parqo | MiddleLeap Ventures",
  socialDescription:
    "An evidence-backed build record for a UAE employee-parking marketplace.",
});

const data: ProjectPageData = {
  currentPath: "/ventures/parqo",
  breadcrumbLabel: "Parqo",
  contextLabel: "Parqo navigation",
  hero: {
    eyebrow: "Portfolio · Platform venture",
    title: <>Parqo.<br /><em>Space, put to work.</em></>,
    lede:
      "A B2B marketplace proposition connecting idle hotel parking with employers that need reliable employee parking in dense UAE business districts.",
    actions: [
      { label: "Open the live site ↗", href: "https://parqo.co/", kind: "primary", external: true },
      { label: "Review the evidence boundary ↓", href: "#evidence", kind: "secondary" },
    ],
    snapshot: "Private evidence snapshot · repository main at 79cd4aa · reviewed 11 July 2026",
  },
  status: {
    ariaLabel: "Parqo project status",
    headerLabel: "Project record / Parqo",
    headerValue: "Acquisition wedge live",
    rows: [
      { term: "Current phase", detail: "Demand and supply validation before operational pilot" },
      { term: "MiddleLeap role", detail: "Venture builder and operator" },
      { term: "Product posture", detail: "Production acquisition site · marketplace design approved" },
      { term: "Delivery posture", detail: "Codex-assisted, founder-authorised" },
      { term: "Remaining boundary", detail: "Facility contracts, access operations and district density" },
    ],
  },
  executiveSummary: {
    title: "A marketplace experiment designed to earn the next investment.",
    intro:
      "Parqo is not presented as regulated-platform proof. It tests a transferable platform question: can fragmented demand and idle supply become reliable contracted capacity in one dense district?",
    items: [
      { label: "Question", title: "Can density compound?", detail: "The venture tests whether qualified employer demand and dependable hotel supply can meet repeatedly in one operating district." },
      { label: "Evidence", title: "Acquisition wedge live", detail: "Separate demand and supply journeys now produce structured leads and commercial learning." },
      { label: "Boundary", title: "Not yet a marketplace", detail: "Contracts, access operations, payments and repeatable district economics remain outside the current proof." },
      { label: "Practice value", title: "Evidence before scale", detail: "The experiment sharpens marketplace strategy by tying each build decision to a commercial learning target." },
      { label: "Next gate", title: "District-level proof", detail: "Validate supply, employer willingness and operational reliability before funding broader platform surface area." },
    ],
  },
  why: {
    heading: "Parking scarcity and parking waste exist on the same street.",
    lede:
      "Employees struggle to find dependable parking while nearby hotel bays sit underused. Parqo tests whether these two fragmented markets can become a reliable, contracted capacity network—one district at a time.",
    cards: [
      { tag: "Problem", title: "Two invisible markets", detail: "Employers lack guaranteed capacity; hotels lack a simple route to monetise predictable idle inventory." },
      { tag: "Wedge", title: "Qualify both sides", detail: "District pages, calculators and separate intake flows create structured demand and supply evidence." },
      { tag: "Thesis", title: "Density before scale", detail: "One operating district must prove supply, access reliability and employer willingness before wider platform investment." },
    ],
  },
  architecture: {
    label: "Current architecture",
    heading: "The live wedge is an evidence machine—not yet the full marketplace.",
    lede:
      "The production surface acquires and qualifies both sides of the market. Next.js route handlers validate submissions into separate Supabase tables; notifications, analytics and founder follow-up close the loop. The employer dashboard, hotel console, payments and access integrations remain intentionally outside this build.",
    mapAriaLabel:
      "Parqo acquisition architecture: employers and hotels use district landing pages, calculators and intake forms; Next.js lead APIs validate submissions into Supabase; Resend notifies the operator; PostHog measures conversion; WhatsApp and Cal.com support follow-up; a Notion script produces lead intelligence",
    nodes: [
      { slot: "users", tag: "Demand", title: "Employers", small: "Team size · district · readiness" },
      { slot: "agents", tag: "Supply", title: "Hotels", small: "Capacity · availability · access" },
      { slot: "portal", tag: "Acquisition", title: "Next.js website", small: "District pages · calculators · forms" },
      { slot: "mcp", tag: "Measurement", title: "PostHog EU", small: "Masked funnel events" },
      { slot: "bff", tag: "Intake", title: "Lead API routes", small: "Validate · classify · notify" },
      { slot: "ports", tag: "Operator loop", title: "Resend + follow-up", small: "WhatsApp · Cal.com · founder review" },
      { slot: "data", tag: "System of record", title: "Supabase", small: "Demand + supply intake tables" },
      { slot: "external", tag: "Intelligence", title: "Notion dashboard", small: "12 lead views · operator-run" },
    ],
  },
  delivery: {
    label: "Loom-informed delivery",
    heading: "Make the next investment conditional on real market evidence.",
    lede:
      "Parqo applies the Loom's evidence, specification and human-authority principles to venture building. This is disciplined use of the method's ideas—not a claim of full regulated-harness adoption.",
    stages: [
      { number: "01", name: "Research", detail: "Market evidence, competition, risks and district economics" },
      { number: "02", name: "Specify", detail: "PRD, v0.4 design, data model, contracts and decision gates" },
      { number: "03", name: "Handoff", detail: "A bounded Codex prompt and an ordered implementation backlog" },
      { number: "04", name: "Ship wedge", detail: "A production acquisition site with demand and supply intake" },
      { number: "05", name: "Validate", detail: "Conversion and lead-quality evidence before marketplace build-out" },
    ],
  },
  technical: {
    summary: "AI delivery · Technology · Quality posture",
    ai: {
      label: "AI build system",
      heading: "AI shortens the learning loop. It does not own the business decision.",
      lede:
        "The repo evidences Codex as an implementation partner and documents a broader AI-native operating model. It also makes a disciplined claim: generated code is not the moat. Distribution, contracts, reliable access operations and proprietary network data are.",
      cards: [
        { label: "Build agent", title: "Codex", detail: "The repository contains a first Codex build prompt, a Codex handoff package name and Codex-authored delivery history." },
        { label: "Delivery model", title: "AI-native, human-authorised", detail: "AI can scaffold code, tests, research and documentation; founders and engineers retain commercial and production authority." },
        { label: "Prohibited actions", title: "Deterministic operations", detail: "AI cannot activate capacity, alter access, set payouts, issue final finance documents or change privacy policy." },
        { label: "Repository harness", title: "Still deliberately light", detail: "No repository MCP config, hooks, custom skills or CI workflow were found in the reviewed snapshot." },
        { label: "Brand context", title: "Claude guidance only", detail: "A Claude brand-voice guide is present, but it is context documentation rather than evidence of an autonomous build loop." },
        { label: "Operating intelligence", title: "Supabase → Notion", detail: "A founder-run script converts lead data into a Notion page with 12 text-based demand and supply views." },
      ],
      controlLine: ["Evidence", "Codex-assisted build", "Human review", "Production wedge", "Commercial gate"],
    },
    technology: {
      heading: "A deliberately small stack for a commercial validation problem.",
      stack: [
        "TypeScript", "Next.js 16 + React 19", "Vercel", "Supabase Postgres", "Next.js route handlers",
        "Resend", "PostHog EU", "Cal.com", "WhatsApp", "Vercel WAF", "Notion API", "Node.js",
      ],
    },
    quality: {
      label: "Quality posture",
      heading: "The live wedge has useful controls—and a visible hardening gap.",
      cards: [
        { tag: "Input", title: "Validated intake", detail: "Separate hotel and employer endpoints check required fields before storage and notification." },
        { tag: "Data", title: "Server-side storage", detail: "Supabase secret access stays on the server; anonymous direct reads of intake tables are not granted." },
        { tag: "Privacy", title: "Masked analytics", detail: "PostHog is used for non-sensitive funnel events with session masking and an EU endpoint." },
        { tag: "Edge", title: "Abuse controls", detail: "The operations design specifies Vercel WAF rate limiting around the lead endpoints." },
        { tag: "Current evidence", title: "One source test", detail: "The reviewed repository contains one source-behaviour test and one database migration." },
        { tag: "Hardening gap", title: "No CI workflow found", detail: "Automated CI, RLS tests and production-like vertical-slice checks belong before the operational pilot." },
      ],
    },
  },
  development: {
    heading: "The next milestone is commercial proof, not more surface area.",
    phases: [
      { number: "P0", title: "Thesis + evidence", state: "done", label: "Complete" },
      { number: "P1", title: "Approved v0.4 design", state: "done", label: "Complete" },
      { number: "P2", title: "Acquisition wedge", state: "done", label: "Live" },
      { number: "P3", title: "Lead validation", state: "next", label: "Current gate" },
      { number: "P4", title: "Operational pilot", state: "later", label: "Next" },
      { number: "P5", title: "Platform scale", state: "later", label: "Later" },
    ],
    evidence: [
      { stat: "2", caption: "Lead pathways: employer demand and hotel supply" },
      { stat: "5", caption: "Current Next.js page and API route files" },
      { stat: "12", caption: "Text-based lead views in the Notion automation" },
      { stat: "0", caption: "Repository hooks, custom skills or MCP configs evidenced" },
    ],
    boundary:
      "Parqo is not yet an operating parking marketplace. The live production asset validates acquisition; the approved v0.4 design describes the next product. Facility contracting, access provisioning, staff and employer portals, payments, provider adapters and the employee PWA remain future work gated by district-level demand and supply evidence.",
  },
  sources: [
    { id: "R1", label: "Repository overview and shipped scope" },
    { id: "R2", label: "Approved v0.4 specification" },
    { id: "R3", label: "Current acquisition website stack" },
    { id: "R4", label: "AI-native delivery controls" },
    { id: "R5", label: "First Codex implementation prompt" },
    { id: "R6", label: "Ordered implementation backlog" },
    { id: "R7", label: "Operations runbook" },
    { id: "R8", label: "Notion leads dashboard automation" },
  ],
  engage: {
    heading: "Platform strategy gets sharper when every build step has a commercial learning target.",
    detail: "Bring the marketplace, district-density and AI-native delivery learning into your platform mandate.",
    mailtoSubject: "Parqo%20venture%20learning",
  },
};

export default function ParqoProjectPage() {
  return <ProjectPage data={data} />;
}
