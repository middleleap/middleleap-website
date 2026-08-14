import { ProjectPage, type ProjectPageData } from "@/components/ProjectPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "HiveMind / Hive Coach",
  description:
    "How HiveMind built Hive Coach: product architecture, runtime AI pipeline, delivery harness, technology stack, quality controls and development maturity.",
  path: "/ventures/hivemind",
  socialTitle: "HiveMind / Hive Coach | MiddleLeap Ventures",
  socialDescription:
    "An evidence-backed build record for human-led, AI-amplified karting coaching.",
});

const data: ProjectPageData = {
  currentPath: "/ventures/hivemind",
  breadcrumbLabel: "HiveMind",
  contextLabel: "HiveMind navigation",
  hero: {
    eyebrow: "Portfolio · AI-enabled service venture",
    title: <>HiveMind.<br /><em>Human-led coaching.</em></>,
    lede:
      "HiveMind is the venture; Hive Coach is its product. It turns track-day evidence into a coach-owned debrief: AI accelerates the analysis, while the coach retains judgement, voice and final sign-off.",
    actions: [
      { label: "See how it works ↓", href: "#architecture", kind: "primary" },
      { label: "Review the evidence boundary ↓", href: "#evidence", kind: "secondary" },
    ],
    snapshot: "Private evidence snapshot · repository main at 7e23cfe · reviewed 11 July 2026",
  },
  status: {
    ariaLabel: "HiveMind project status",
    headerLabel: "Project record / Hive Coach",
    headerValue: "Phase 0 live",
    rows: [
      { term: "Current phase", detail: "Core debrief loop live · post-Phase-0 build active" },
      { term: "Ownership", detail: "LHM Media · Michael and Louis Ryberg Hartmann" },
      { term: "Product posture", detail: "Working pilot product, not an autonomous coach" },
      { term: "AI posture", detail: "Server-side analysis · mandatory human review" },
      { term: "Remaining boundary", detail: "Live credentials, noisy trackside trials and wider pilot evidence" },
    ],
  },
  executiveSummary: {
    title: "A service experiment in preserving expert authority.",
    intro:
      "HiveMind is deliberately outside MiddleLeap's regulated core. Its relevance is the operating principle: AI may increase the reach and consistency of an expert service without becoming the accountable expert.",
    items: [
      { label: "Question", title: "Can expertise scale safely?", detail: "Turn fragmented track evidence into useful coaching while preserving the coach's judgement, voice and customer relationship." },
      { label: "Evidence", title: "Core loop live", detail: "The product can assemble evidence, draft a grounded debrief and return it to a coach for review." },
      { label: "Authority", title: "The coach decides", detail: "AI cannot issue final advice; human edit and sign-off remain the customer-facing boundary." },
      { label: "Practice value", title: "Human-in-the-loop design", detail: "The experiment informs service propositions where AI assists perception and synthesis but cannot own the decision." },
      { label: "Next gate", title: "Wider pilot evidence", detail: "Test credentials, noisy trackside inputs, repeat usage and coach validation before expanding the service." },
    ],
  },
  why: {
    heading: "Elite coaching insight should not depend on an elite coaching budget.",
    lede:
      "Karting produces rich evidence—timing sheets, video, photographs, voice notes and weather—but turning it into useful, personal feedback is slow. Hive Coach makes that synthesis repeatable without replacing the coach.",
    cards: [
      { tag: "Problem", title: "Evidence is scattered", detail: "Track-day observations arrive in different formats and often disappear before they become actionable learning." },
      { tag: "Proposition", title: "One coached debrief", detail: "Capture once, assemble the session record, draft a grounded debrief and return it to the coach for judgement." },
      { tag: "Principle", title: "The coach is the product", detail: "AI supports perception and synthesis; it cannot send the final advice or claim facts outside the evidence." },
    ],
  },
  architecture: {
    label: "Product architecture",
    heading: "A traceable path from track evidence to coach-owned advice.",
    lede:
      "The runtime is deliberately staged. Vision, transcription and synthesis create structured evidence before final prose is produced. Grounding and confidentiality checks sit before the coach review and PDF delivery boundary.",
    mapAriaLabel:
      "Hive Coach architecture: drivers and coaches capture media and timing evidence into Supabase; server-side Claude vision and Whisper produce structured inputs; Claude synthesis and final prose pass through grounding checks to coach review, PDF and delivery",
    nodes: [
      { slot: "users", tag: "People", title: "Driver + coach", small: "Capture · context · judgement" },
      { slot: "agents", tag: "Evidence", title: "Media + timing", small: "Photo · video · voice · weather" },
      { slot: "portal", tag: "Experience", title: "Next.js PWA", small: "Trackside capture and review" },
      { slot: "mcp", tag: "Stage 1", title: "Vision + Whisper", small: "Server-side extraction" },
      { slot: "bff", tag: "Stages 2–3", title: "Synthesis + prose", small: "Claude · coach voice · grounded facts" },
      { slot: "ports", tag: "Human gate", title: "Coach edit + sign-off", small: "Mandatory before delivery" },
      { slot: "data", tag: "System of record", title: "Supabase + RLS", small: "Profiles · evidence · consent" },
      { slot: "external", tag: "Output", title: "PDF + WhatsApp", small: "Approved debrief delivery" },
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
      { number: "03", name: "Design", detail: "Stitch-assisted screens and a capture-to-debrief architecture" },
      { number: "04", name: "Build", detail: "Claude Code loops with server-side AI and repository tripwires" },
      { number: "05", name: "Evaluate", detail: "Gold-set scoring, RLS checks and mandatory coach sign-off" },
    ],
  },
  technical: {
    summary: "AI systems · Technology · Quality controls",
    ai: {
      label: "AI systems",
      heading: "Delivery AI and product AI are different systems.",
      lede:
        "Claude Code, skills, hooks, reviewers and Stitch MCP shape how the product is built. Claude and Whisper power the server-side customer workflow. The repository contains no Codex build provenance in the reviewed snapshot.",
      cards: [
        { label: "Build agent", title: "Claude Code", detail: "The repository documents autonomous /loop delivery with explicit acceptance checks and stop conditions." },
        { label: "Runtime models", title: "Claude + Whisper", detail: "Claude Sonnet handles vision and synthesis, Opus drafts final prose, and OpenAI Whisper transcribes voice notes." },
        { label: "Repository skills", title: "Two focused skills", detail: "eval runs the quality harness; new-migration creates database changes with the project conventions." },
        { label: "Build controls", title: "Three hooks", detail: "Pre-write checks block client-side AI and protected-file changes; post-edit checks run targeted validation." },
        { label: "Review agents", title: "Two bounded reviewers", detail: "Grounding and RLS security are reviewed as separate concerns rather than folded into generation." },
        { label: "Design tool", title: "Stitch MCP", detail: "Google Stitch is documented as build-time design tooling. It is not part of the customer-facing runtime." },
      ],
      controlLine: ["Server-only AI", "Structured evidence", "Gold-set evaluation", "Coach edit", "Human send"],
    },
    technology: {
      heading: "A trackside PWA backed by a secure, observable AI pipeline.",
      stack: [
        "TypeScript", "Next.js 15 + React 19", "PWA", "Supabase Postgres", "Supabase Auth + RLS",
        "Supabase Storage", "Anthropic Claude", "OpenAI Whisper", "Puppeteer PDF", "WhatsApp Cloud API",
        "PostHog", "Sentry", "Vitest + Playwright", "pgTAP", "Vercel",
      ],
    },
    quality: {
      label: "Quality system",
      heading: "Quality is measured at the advice boundary.",
      cards: [
        { tag: "CI", title: "Build integrity", detail: "Types, lint, unit tests and the offline evaluation harness run together." },
        { tag: "Guardrails", title: "AI containment", detail: "Repository checks prevent browser-side model calls and committed secrets; gitleaks adds a separate scan." },
        { tag: "Database", title: "RLS integrity", detail: "Supabase migrations and pgTAP policies are exercised in a dedicated database workflow." },
        { tag: "Evaluation", title: "Grounded output", detail: "A gold set scores whether the generated debrief stays faithful, useful and appropriately confidential." },
        { tag: "Journey", title: "Product confidence", detail: "Playwright covers user journeys, AI-tagged scenarios and row-level security boundaries." },
        { tag: "Release", title: "Coach authority", detail: "The product requires a coach edit and sign-off before a debrief becomes customer-facing advice." },
      ],
    },
  },
  development: {
    heading: "The core loop is live; expansion remains evidence-led.",
    phases: [
      { number: "P0", title: "One-loop proof", state: "done", label: "Proven" },
      { number: "P1", title: "Core debrief", state: "done", label: "Phase 0 live" },
      { number: "P2", title: "Operations spine", state: "done", label: "Substantial build" },
      { number: "P3", title: "Personalisation", state: "next", label: "Active" },
      { number: "P4", title: "Delivery integrations", state: "next", label: "Human-gated" },
      { number: "P5", title: "Pilot expansion", state: "later", label: "Roadmap" },
    ],
    evidence: [
      { stat: "303", caption: "Tracked test/spec files in the application" },
      { stat: "71", caption: "Supabase migrations in the reviewed repository" },
      { stat: "25", caption: "Next.js API route handlers" },
      { stat: "2 + 3 + 2", caption: "Repository skills, hooks and bounded review agents" },
    ],
    boundary:
      "Phase 0 is a working application, but production confidence still depends on real coach inputs, noisy trackside trials, live delivery credentials and wider pilot evidence. Parent consent and coach authority remain human responsibilities, not model decisions.",
  },
  sources: [
    { id: "R1", label: "Repository overview and product principles" },
    { id: "R2", label: "Binding Claude Code conventions" },
    { id: "R3", label: "Technical architecture" },
    { id: "R4", label: "Phase 0 build plan" },
    { id: "R5", label: "Post-Phase-0 roadmap" },
    { id: "R6", label: "Claude Code hooks and plugins" },
    { id: "R7", label: "Continuous-integration workflow" },
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
