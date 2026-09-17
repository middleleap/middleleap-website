import type { Route } from "next";

export type PortfolioProject = {
  name: string;
  type: string;
  summary: string;
  status: string;
  evidence: string;
  portfolioRole: "Flagship regulated proof" | "Venture experiment" | "Regulated proof · Prototype";
  harnessProfile: "Regulated delivery" | "Venture delivery";
  /** Build record on this site. Absent for prototypes that have no build record yet. */
  detailPath?: Route;
  href?: string;
  repository?: string;
  evidenceAccess?: string;
};

export type EcosystemContribution = {
  name: string;
  role: string;
  summary: string;
  status: string;
  href: string;
  repository?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "Open Finance Backoffice",
    type: "Open infrastructure · Regulated platform",
    summary:
      "A bank-neutral, synthetic-only operating platform that turns Open Finance obligations into governed workflows for people and agents.",
    status: "Demo-complete",
    evidence: "Regulated controls designed into a working platform from day one.",
    portfolioRole: "Flagship regulated proof",
    harnessProfile: "Regulated delivery",
    detailPath: "/ventures/backoffice",
    href: "https://backoffice.openfinance-os.org/",
    evidenceAccess: "Private build record · reviewed snapshot",
  },
  {
    name: "Parqo",
    type: "Platform venture",
    summary:
      "A UAE parking marketplace beginning with a live demand-and-supply acquisition wedge in dense business districts.",
    status: "Acquisition wedge live",
    evidence: "Commercial investment is gated by district-level demand and supply evidence.",
    portfolioRole: "Venture experiment",
    harnessProfile: "Venture delivery",
    detailPath: "/ventures/parqo",
    href: "https://parqo.middleleap.com/",
    evidenceAccess: "Private build record · reviewed snapshot",
  },
  {
    name: "HiveMind / Hive Coach",
    type: "AI-enabled service venture",
    summary:
      "A human-led coaching product that turns track evidence into grounded, coach-owned advice for developing drivers.",
    status: "Initial product live",
    evidence: "AI can deepen an expert service without taking authority from the expert.",
    portfolioRole: "Venture experiment",
    harnessProfile: "Venture delivery",
    detailPath: "/ventures/hivemind",
    evidenceAccess: "Private build record · reviewed snapshot",
  },
  {
    // Hackathon prototype on an emulator profile, not a certified participant.
    // The Demo Day result is not recorded here; do not claim an outcome
    // beyond the shortlist until it is confirmed.
    name: "Declare",
    type: "Agentic payments · UAE Open Finance",
    summary:
      "Agentic payments with a regulator's ceiling built in. Conceived by MiddleLeap, built with Ozone × Nebras for the C:\\>DIR Global Agentic Regulator Hackathon; live emulator at declare.middleleap.com.",
    status: "Hackathon prototype · not certified",
    evidence: "AI as a supervised counterparty inside a regulated payments flow, with human oversight and regulator evaluation.",
    portfolioRole: "Regulated proof · Prototype",
    harnessProfile: "Regulated delivery",
    href: "https://declare.middleleap.com/",
    evidenceAccess: "Emulator profile · shortlisted, Agentic Payments, Commerce & their Oversight track",
  },
];

export const ecosystemContributions: EcosystemContribution[] = [
  {
    name: "OpenFinance-OS",
    role: "Community infrastructure",
    summary: "Independent ecosystem visibility, observatory and working knowledge for UAE Open Finance.",
    status: "Active",
    href: "https://openfinance-os.org/",
  },
  {
    name: "Data Sandbox",
    role: "Synthetic infrastructure",
    summary: "Realistic, specification-driven Open Finance payloads and personas for safe testing.",
    status: "Active",
    href: "https://data-sandbox.openfinance-os.org/",
    repository: "https://github.com/openfinance-os/data-sandbox",
  },
  {
    name: "Ecosystem Watcher",
    role: "Agent-run intelligence",
    summary: "Scheduled monitoring of ecosystem change, participant activity and market signals.",
    status: "Active",
    href: "https://ecosystem-watcher.openfinance-os.org/",
  },
];
