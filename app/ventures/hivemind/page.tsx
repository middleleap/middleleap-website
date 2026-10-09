import { ProjectPage, type ProjectPageData } from "@/components/ProjectPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "HiveMind",
  description:
    "How HiveMind is built: product architecture, the server-side AI pipeline, coach-voice and memory features, quality controls and development maturity.",
  path: "/ventures/hivemind",
  socialTitle: "HiveMind | MiddleLeap Ventures",
  socialDescription:
    "An evidence-backed build record for human-led, AI-amplified karting coaching.",
});

// "HiveMind" is the working name; a final product name precedes wider market
// entry. Pilot organisations and their customer-facing brands are not named.
const data: ProjectPageData = {
  currentPath: "/ventures/hivemind",
  breadcrumbLabel: "HiveMind",
  contextLabel: "HiveMind navigation",
  hero: {
    eyebrow: "Portfolio · AI-enabled service venture",
    title: <>HiveMind.<br /><em>It remembers. You coach.</em></>,
    lede:
      "HiveMind turns a coach's voice notes, photos, telemetry and setups into same-day debriefs for families and a team memory that compounds. AI drafts and remembers; the coach edits, signs off and sends.",
    actions: [
      { label: "Open the live site ↗", href: "https://hivemind.middleleap.com/", kind: "primary", external: true },
      { label: "Review the evidence boundary ↓", href: "#evidence", kind: "secondary" },
    ],
    snapshot: "Private evidence snapshot · repository main at a5b103d · reviewed 4 October 2026",
  },
  status: {
    ariaLabel: "HiveMind project status",
    headerLabel: "Project record / HiveMind",
    headerValue: "In pilot use",
    rows: [
      { term: "Current phase", detail: "Pilot use with a partner coaching team · public website live, guided trials not yet open" },
      { term: "Ownership", detail: "MiddleLeap Ventures · HiveMind is a working name" },
      { term: "Product posture", detail: "Coaching-operations PWA, not an autonomous coach" },
      { term: "AI posture", detail: "Server-side only · deterministic grounding · mandatory coach edit" },
      { term: "Remaining boundary", detail: "Wider pilot evidence, live messaging credentials and a final brand" },
    ],
  },
  executiveSummary: {
    title: "A service experiment in preserving expert authority.",
    intro:
      "HiveMind is deliberately outside MiddleLeap's regulated core. Its relevance is the operating principle: AI may increase the reach, memory and consistency of an expert service without becoming the accountable expert.",
    items: [
      { label: "Question", title: "Can expertise scale safely?", detail: "Turn fragmented track evidence into useful coaching while preserving the coach's judgement, voice and family relationship." },
      { label: "Evidence", title: "In pilot use", detail: "The product assembles evidence, drafts a grounded debrief in the coach's voice and carries each driver's history into the next session." },
      { label: "Authority", title: "The coach decides", detail: "AI cannot issue advice; a coach edit and sign-off are required, and a sent debrief cannot be changed afterwards." },
      { label: "Practice value", title: "Human-in-the-loop design", detail: "The experiment informs service propositions where AI assists perception, synthesis and memory but cannot own the decision." },
      { label: "Next gate", title: "Guided trials", detail: "Open guided, one-driver trials with agreed scope, then prove repeat usage across more coaches and teams before wider launch." },
    ],
  },
  why: {
    heading: "Elite coaching insight should not depend on an elite coaching budget.",
    lede:
      "Karting produces rich evidence—telemetry, video, photographs, voice notes, setups and weather—but turning it into useful, personal feedback is slow, and most of it is forgotten by the next race weekend. HiveMind makes that synthesis repeatable and keeps the memory, without replacing the coach.",
    cards: [
      { tag: "Problem", title: "Evidence is scattered", detail: "Track-day observations arrive in different formats and often disappear before they become actionable learning." },
      { tag: "Proposition", title: "One coached debrief, same day", detail: "Capture once, assemble the day, draft a grounded debrief and return it to the coach for judgement before it reaches the family." },
      { tag: "Principle", title: "The coach is the product", detail: "AI is invisible to the family. It supports perception, synthesis and recall; it cannot send advice or claim facts outside the evidence." },
    ],
  },
  architecture: {
    label: "Product architecture",
    heading: "A traceable path from track evidence to coach-owned advice.",
    lede:
      "The runtime is a staged, durable pipeline. A consent gate runs first; vision, transcription and synthesis then create structured findings, enriched with the driver's own history, before final prose is written. A deterministic grounding and confidentiality check sits before the coach review and delivery boundary.",
    mapAriaLabel:
      "HiveMind architecture: coaches capture media, voice and telemetry into Supabase behind a consent gate; server-side Claude vision and Whisper produce structured inputs; Claude synthesis uses driver memory, and final prose in the coach's voice passes a deterministic grounding check to coach review, then delivery by PDF, email or WhatsApp",
    nodes: [
      { slot: "users", tag: "People", title: "Coach + family", small: "Capture · context · judgement" },
      { slot: "agents", tag: "Evidence", title: "Media + telemetry", small: "Photo · video · voice · setups · weather" },
      { slot: "portal", tag: "Experience", title: "Next.js PWA", small: "Offline trackside capture and review" },
      { slot: "mcp", tag: "Stage 1", title: "Vision + Whisper", small: "Server-side extraction · class-aware terms" },
      { slot: "bff", tag: "Stages 2–3", title: "Findings + prose", small: "Driver memory · coach voice · grounding" },
      { slot: "ports", tag: "Human gate", title: "Coach edit + sign-off", small: "Mandatory · sent debriefs locked" },
      { slot: "data", tag: "System of record", title: "Supabase + RLS", small: "Per-team isolation · consent · memory" },
      { slot: "external", tag: "Output", title: "PDF · email · WhatsApp", small: "Family portal by link, no accounts" },
    ],
  },
  delivery: {
    label: "Loom-informed delivery",
    heading: "Start with the coach's gold standard, then make every AI step answer to it.",
    lede:
      "HiveMind applies the Loom's evidence, specification and human-authority principles to venture building. This is disciplined use of the method's ideas—not a claim of full regulated-harness adoption.",
    stages: [
      { number: "01", name: "Observe", detail: "Coach workflow, track-day evidence and a gold-standard debrief" },
      { number: "02", name: "Frame", detail: "Human-led product principles, consent boundaries and acceptance criteria" },
      { number: "03", name: "Design", detail: "A design-system component library and a capture-to-debrief architecture" },
      { number: "04", name: "Build", detail: "Claude Code loops with server-side AI and repository tripwires" },
      { number: "05", name: "Evaluate", detail: "Gold-set and live evals, RLS checks and mandatory coach sign-off" },
    ],
  },
  technical: {
    summary: "AI systems · Technology · Quality controls",
    ai: {
      label: "AI systems",
      heading: "AI drafts and remembers. The coach decides.",
      lede:
        "Claude Code builds the product; Anthropic Claude and OpenAI Whisper run inside it, server-side only. Each model tier is one switch in a registry, so a model change is verified by the evaluation lane before it reaches a real debrief.",
      cards: [
        { label: "Debrief pipeline", title: "Staged, server-side", detail: "Sonnet reads telemetry and photos, Whisper transcribes voice notes primed with corner and class-specific engine terms, Sonnet structures findings and Opus writes the prose." },
        { label: "Coach voice", title: "Learned from edits", detail: "A voice profile is distilled from each coach's own edits. A coach can direct a rewrite of one section, returned as a proposal and never written automatically." },
        { label: "Memory", title: "Structured, not guessed", detail: "Open and resolved focus threads, milestones, homework follow-through and lap trends feed each debrief, with a recall card when a driver returns to a track." },
        { label: "Grounding", title: "Deterministic check", detail: "Every number and corner in the prose must exist in the structured findings. The check is code, not a model marking its own work." },
        { label: "Confidentiality", title: "Right content, right reader", detail: "Exact setup figures stay with the team, focus areas are capped at three, and tone adapts to the driver's age on the session date." },
        { label: "Model operations", title: "Measured, not captured", detail: "Haiku matches voice notes to drivers. Cost, latency and errors are logged for every call; prompt and completion text are never captured." },
      ],
      controlLine: ["Consent gate", "Server-only AI", "Grounding check", "Coach edit", "Human send"],
    },
    technology: {
      heading: "A trackside PWA backed by a secure, observable AI pipeline.",
      stack: [
        "TypeScript", "Next.js 15 + React 19", "Offline PWA", "Supabase Postgres", "Supabase Auth + RLS",
        "Supabase Storage", "Anthropic Claude", "OpenAI Whisper", "Headless Chromium PDF", "Resend",
        "WhatsApp Cloud API", "PostHog", "Sentry", "Vitest + Playwright", "pgTAP", "Vercel",
      ],
    },
    quality: {
      label: "Quality system",
      heading: "Quality is measured at the advice boundary.",
      cards: [
        { tag: "CI", title: "Build integrity", detail: "Types, lint, unit and component tests, database policies and the offline evaluation harness run on every change." },
        { tag: "Guardrails", title: "AI containment", detail: "Repository checks prevent browser-side model calls and committed secrets; a separate secret scan runs in CI." },
        { tag: "Database", title: "RLS integrity", detail: "Migrations are replayed and pgTAP suites test that each team and coach can only reach its own data." },
        { tag: "Evaluation", title: "Grounded output", detail: "A gold set scores every change; a weekly live eval checks grounding and drift. The gold set is still small and mostly synthetic." },
        { tag: "Production", title: "Synthetic track day", detail: "Each week a whole track day is driven through the real pipeline in an isolated sandbox organisation and verified end to end." },
        { tag: "Release", title: "Coach authority", detail: "A coach edit and sign-off are required before a debrief becomes advice, and the database keeps sent debriefs immutable." },
      ],
    },
  },
  development: {
    heading: "The core loop and memory are live; expansion remains evidence-led.",
    phases: [
      { number: "P0", title: "One-loop proof", state: "done", label: "Proven" },
      { number: "P1", title: "Core debrief", state: "done", label: "Live" },
      { number: "P2", title: "Operations spine", state: "done", label: "Live" },
      { number: "P3", title: "Memory + coach voice", state: "done", label: "Live" },
      { number: "P4", title: "Coach workbench + delivery", state: "next", label: "Built, gated" },
      { number: "P5", title: "Wider market", state: "later", label: "Roadmap" },
    ],
    evidence: [
      { stat: "618", caption: "Unit and component test files in the application" },
      { stat: "57", caption: "Playwright specs, including AI and RLS-isolation journeys" },
      { stat: "174", caption: "Supabase migrations in the reviewed repository" },
      { stat: "12", caption: "CI workflows, including live evaluation and a weekly production check" },
    ],
    boundary:
      "HiveMind is in pilot use, not offered to the wider market. The public website explains the product and its data access, but guided trials are not yet open and trial scope is agreed before any real use. Production confidence still depends on repeat usage across more coaches and teams, live messaging credentials and a larger real-world gold set. Features built behind flags are not claimed as live. Parent consent and coach authority remain human responsibilities, not model decisions.",
  },
  sources: [
    { id: "R1", label: "Repository overview and product principles" },
    { id: "R2", label: "Current-state architecture" },
    { id: "R3", label: "Product requirements" },
    { id: "R4", label: "Technical architecture" },
    { id: "R5", label: "Roadmap" },
    { id: "R6", label: "Model registry and AI pipeline" },
    { id: "R7", label: "Continuous-integration workflows" },
    { id: "R8", label: "Deployment runbook" },
  ],
  engage: {
    heading: "AI can deepen a human service without taking authority away from the expert.",
    detail: "Bring the product, operating-model and governed-AI learning into your service proposition.",
    mailtoSubject: "HiveMind%20venture%20learning",
  },
};

export default function HiveMindProjectPage() {
  return <ProjectPage data={data} />;
}
