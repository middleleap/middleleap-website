import { ProjectPage, type ProjectPageData } from "@/components/ProjectPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Setbay",
  description:
    "How Setbay is being built: the live acquisition platform, approved marketplace design, AI-assisted delivery controls, technology stack and validation roadmap.",
  path: "/ventures/setbay",
  socialTitle: "Setbay | MiddleLeap Ventures",
  socialDescription:
    "An evidence-backed build record for a UAE reserved employee-parking marketplace.",
});

// "Reserved", not "guaranteed": Setbay's own brand rules hold the stronger
// claim back until hotel supply is signed. Parqo was the working codename and
// is mentioned once, in the lede, so earlier links and searches still resolve.
const data: ProjectPageData = {
  currentPath: "/ventures/setbay",
  breadcrumbLabel: "Setbay",
  contextLabel: "Setbay navigation",
  hero: {
    eyebrow: "Portfolio · Platform venture",
    title: <>Setbay.<br /><em>Your space, set.</em></>,
    lede:
      "Setbay™ is a UAE marketplace proposition that turns underused premium parking—starting with idle weekday hotel bays—into reserved monthly spaces for companies and their employees. Formerly the working codename Parqo.",
    actions: [
      { label: "Open setbay.ae ↗", href: "https://setbay.ae/", kind: "primary", external: true },
      { label: "Review the evidence boundary ↓", href: "#evidence", kind: "secondary" },
    ],
    snapshot: "Private evidence snapshot · repository main at b32a45b · reviewed 4 October 2026",
  },
  status: {
    ariaLabel: "Setbay project status",
    headerLabel: "Project record / Setbay",
    headerValue: "Collecting demand",
    rows: [
      { term: "Current phase", detail: "Demand collection in five Dubai districts before an operational pilot" },
      { term: "MiddleLeap role", detail: "Venture builder and operator" },
      { term: "Product posture", detail: "Production acquisition platform and staff console · marketplace specified, not built" },
      { term: "Delivery posture", detail: "Claude Code-assisted, founder-authorised" },
      { term: "Remaining boundary", detail: "Signed hotel supply, a paying employer and access operations" },
    ],
  },
  executiveSummary: {
    title: "A marketplace experiment designed to earn the next investment.",
    intro:
      "Setbay is not presented as regulated-platform proof. It tests a transferable platform question: can fragmented demand and idle supply become reliable contracted capacity in one dense district?",
    items: [
      { label: "Question", title: "Can density compound?", detail: "The venture tests whether qualified employer demand and dependable hotel supply can meet repeatedly in one operating district." },
      { label: "Evidence", title: "Acquisition platform live", detail: "Employer, hotel and employee journeys across five district pages feed one operator console with enrichment, follow-up and retention built in." },
      { label: "Boundary", title: "Not yet a marketplace", detail: "No facility is contracted and no employer is paying. Subscriptions, allocation, access and payments remain specified, not built." },
      { label: "Practice value", title: "Evidence before scale", detail: "The experiment sharpens marketplace strategy by tying each build decision to a commercial learning target." },
      { label: "Next gate", title: "A first contracted district", detail: "Sign supply, convert one employer and prove access reliability before funding broader platform surface area." },
    ],
  },
  why: {
    heading: "Parking scarcity and parking waste exist on the same street.",
    lede:
      "Employees in dense districts struggle to find dependable parking while nearby hotel bays sit empty on weekdays. Setbay tests whether these two fragmented markets can become a reliable, contracted capacity network—one district at a time.",
    cards: [
      { tag: "Problem", title: "Two invisible markets", detail: "Employers lack reserved capacity; hotels lack a simple route to monetise predictable idle inventory without giving up guest priority." },
      { tag: "Wedge", title: "Qualify every side", detail: "District pages, calculators and separate employer, hotel and employee intakes create structured demand and supply evidence." },
      { tag: "Thesis", title: "Density before scale", detail: "One operating district must prove supply, access reliability and employer willingness before wider platform investment." },
    ],
  },
  architecture: {
    label: "Current architecture",
    heading: "The live platform is an evidence machine—not yet the full marketplace.",
    lede:
      "The production surface acquires, enriches and qualifies all three sides of the market. Next.js route handlers validate submissions into Supabase; a database-backed queue drives notifications and opt-in follow-up; a private staff console runs the operator loop. The employer dashboard, employee app, subscriptions, access provisioning and payments remain intentionally outside this build.",
    mapAriaLabel:
      "Setbay acquisition architecture: employers, employees and hotels use setbay.ae district pages, calculators and intake forms; lead APIs validate and enrich submissions into Supabase; a queue sends notifications and follow-up; a private staff console runs next actions; PostHog and Sentry measure conversion and errors",
    nodes: [
      { slot: "users", tag: "Demand", title: "Employers + employees", small: "Team needs · district · individual interest" },
      { slot: "agents", tag: "Supply", title: "Hotels", small: "Capacity · permits · access method" },
      { slot: "portal", tag: "Acquisition", title: "setbay.ae", small: "Five district pages · calculators · three intakes" },
      { slot: "mcp", tag: "Enrichment", title: "Company lookup", small: "Places · public business registries" },
      { slot: "bff", tag: "Intake", title: "Lead API + queue", small: "Validate · enrich · notify · follow up" },
      { slot: "ports", tag: "Operator loop", title: "Staff console", small: "Next actions · activity log · Cal.com · WhatsApp" },
      { slot: "data", tag: "System of record", title: "Supabase + RLS", small: "Intake tables · 12-month anonymisation" },
      { slot: "external", tag: "Measurement", title: "PostHog EU + Sentry", small: "Funnel events · error tracking" },
    ],
  },
  delivery: {
    label: "Loom-informed delivery",
    heading: "Make the next investment conditional on real market evidence.",
    lede:
      "Setbay applies the Loom's evidence, specification and human-authority principles to venture building. This is disciplined use of the method's ideas—not a claim of full regulated-harness adoption.",
    stages: [
      { number: "01", name: "Research", detail: "Market evidence, competition, risks and district economics" },
      { number: "02", name: "Specify", detail: "PRD, v0.4 design, data model, contracts and decision gates" },
      { number: "03", name: "Ship wedge", detail: "A production acquisition site with demand and supply intake" },
      { number: "04", name: "Brand + harden", detail: "Codename retired, Setbay brand system, CI and an operator console" },
      { number: "05", name: "Validate", detail: "Lead quality and signed supply before marketplace build-out" },
    ],
  },
  technical: {
    summary: "AI delivery · Technology · Quality posture",
    ai: {
      label: "AI build system",
      heading: "AI shortens the learning loop. It does not own the business decision.",
      lede:
        "AI is used to build Setbay, not inside the product. The repository evidences Claude Code as the implementation partner under founder review, and makes a disciplined claim: generated code is not the moat. Distribution, contracts, reliable access operations and proprietary network data are.",
      cards: [
        { label: "Build agent", title: "Claude Code", detail: "Delivery since the July snapshot is Claude Code-assisted, with co-authored commits merged through reviewed pull requests." },
        { label: "Delivery model", title: "AI-native, human-authorised", detail: "AI can scaffold code, tests, research and documentation; founders retain commercial and production authority." },
        { label: "Prohibited actions", title: "Deterministic operations", detail: "AI cannot activate capacity, alter access, set payouts, issue final finance documents or change privacy policy." },
        { label: "Brand context", title: "A repository brand skill", detail: "Naming, claims and tone rules live beside the code, so generated copy says “reserved” until supply is signed." },
        { label: "Runtime AI", title: "None, deliberately", detail: "The enquiry concierge is a form and is not presented as an assistant. Nothing customer-facing depends on a model." },
        { label: "Operating intelligence", title: "Staff console", detail: "Leads, next actions, an activity log and an outreach link builder live in a private, authenticated console." },
      ],
      controlLine: ["Evidence", "Claude Code-assisted build", "CI gates", "Human review", "Commercial gate"],
    },
    technology: {
      heading: "A deliberately small stack for a commercial validation problem.",
      stack: [
        "TypeScript", "Next.js 16 + React 19", "Vercel + Cron", "Supabase Postgres + RLS",
        "Supabase Auth", "Resend", "PostHog EU", "Sentry EU", "Cal.com", "WhatsApp", "Google Places",
        "Vitest + Playwright", "pgTAP", "GitHub Actions",
      ],
    },
    quality: {
      label: "Quality posture",
      heading: "The hardening gap from the first snapshot is closed for the live surface.",
      cards: [
        { tag: "CI", title: "Gated merges", detail: "Lint, types, unit tests, build and a browser smoke test run on every change, with a separate database job." },
        { tag: "Database", title: "RLS under test", detail: "Migrations are replayed and pgTAP suites exercise intake, operator and row-level security policies." },
        { tag: "Input", title: "Validated intake", detail: "Separate employer, hotel and employee endpoints validate before storage, enrichment and notification." },
        { tag: "Privacy", title: "Retention by default", detail: "Idle leads are anonymised after twelve months; follow-up is opt-in with one-click unsubscribe." },
        { tag: "Edge", title: "Abuse controls", detail: "Lead endpoints are rate-limited, bot-screened and idempotent; the booking webhook is signature-verified." },
        { tag: "Next hardening", title: "Marketplace surfaces", detail: "Subscriptions, capacity allocation and access provisioning need their own tests before an operational pilot." },
      ],
    },
  },
  development: {
    heading: "The next milestone is commercial proof, not more surface area.",
    phases: [
      { number: "P0", title: "Thesis + evidence", state: "done", label: "Complete" },
      { number: "P1", title: "Approved v0.4 design", state: "done", label: "Complete" },
      { number: "P2", title: "Acquisition wedge", state: "done", label: "Complete" },
      { number: "P3", title: "Setbay platform", state: "done", label: "Live" },
      { number: "P4", title: "District pilot", state: "next", label: "Current gate" },
      { number: "P5", title: "Platform scale", state: "later", label: "Later" },
    ],
    evidence: [
      { stat: "3", caption: "Intake pathways: employer, hotel and employee" },
      { stat: "5", caption: "Dubai district pages collecting demand" },
      { stat: "35", caption: "Unit test files, plus three pgTAP suites" },
      { stat: "17", caption: "Supabase migrations in the reviewed repository" },
    ],
    boundary:
      "Setbay is not yet an operating parking marketplace. The live production asset acquires and qualifies demand and supply; no facility is contracted and no employer is paying. The approved v0.4 design describes the next product: employer dashboard, employee app, subscriptions, capacity allocation, access handoff and billing remain future work gated by district-level evidence.",
  },
  sources: [
    { id: "R1", label: "Repository overview and shipped scope" },
    { id: "R2", label: "Setbay brand system" },
    { id: "R3", label: "Approved v0.4 specification" },
    { id: "R4", label: "Conversion plan" },
    { id: "R5", label: "AI-native delivery controls" },
    { id: "R6", label: "Continuous-integration workflow" },
    { id: "R7", label: "Operations runbook" },
    { id: "R8", label: "Risk register" },
  ],
  engage: {
    heading: "Platform strategy gets sharper when every build step has a commercial learning target.",
    detail: "Bring the marketplace, district-density and AI-native delivery learning into your platform mandate.",
    mailtoSubject: "Setbay%20venture%20learning",
  },
};

export default function SetbayProjectPage() {
  return <ProjectPage data={data} />;
}
