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
  /** ISO date the build record's evidence snapshot was last reviewed; required with detailPath. */
  reviewedOn?: `${number}-${number}-${number}`;
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
    reviewedOn: "2026-07-11",
    href: "https://backoffice.openfinance-os.org/",
    evidenceAccess: "Private build record · reviewed snapshot",
  },
  {
    // Formerly the working codename Parqo; /ventures/parqo redirects here.
    name: "Setbay",
    type: "Platform venture",
    summary:
      "A UAE marketplace turning idle weekday hotel bays into reserved monthly parking for companies and their employees, collecting demand in five Dubai districts.",
    status: "Collecting demand",
    evidence: "Commercial investment is gated by signed supply and a paying employer in one district.",
    portfolioRole: "Venture experiment",
    harnessProfile: "Venture delivery",
    detailPath: "/ventures/setbay",
    reviewedOn: "2026-10-04",
    href: "https://setbay.ae/",
    evidenceAccess: "Private build record · reviewed snapshot",
  },
  {
    // "HiveMind" is the working name; pilot teams and their brands are not named.
    name: "HiveMind",
    type: "AI-enabled service venture",
    summary:
      "Human-led karting coaching: a coach's voice notes, photos and telemetry become same-day, coach-signed debriefs and a team memory that compounds.",
    status: "In pilot use",
    evidence: "AI can deepen an expert service without taking authority from the expert.",
    portfolioRole: "Venture experiment",
    harnessProfile: "Venture delivery",
    detailPath: "/ventures/hivemind",
    reviewedOn: "2026-10-04",
    evidenceAccess: "Private build record · reviewed snapshot",
  },
  {
    // Kept deliberately brief: no pilot, partner or commercial detail.
    name: "Declare",
    type: "Agentic payments · UAE Open Finance",
    summary: "Agentic payments with a regulator's ceiling built in.",
    status: "Prototype · not certified",
    evidence: "AI as a supervised counterparty inside a regulated payments flow.",
    portfolioRole: "Regulated proof · Prototype",
    harnessProfile: "Regulated delivery",
    href: "https://declare.middleleap.com/",
    evidenceAccess: "Emulator profile · hackathon prototype",
  },
];

export const ecosystemContributions: EcosystemContribution[] = [
  {
    name: "OpenFinance-OS",
    role: "Community infrastructure",
    summary:
      "The independent record of UAE Open Finance: a daily participant observatory, global context, updates and learning, kept neutral by design.",
    status: "Active",
    href: "https://openfinance-os.org/",
  },
  {
    name: "Ecosystem Watcher",
    role: "Agent-run intelligence",
    summary:
      "A weekly, agent-run monitor of API and payment volumes, standards changes and release compliance, published inside the OpenFinance-OS Observatory.",
    status: "Active",
    href: "https://openfinance-os.org/observatory/watch/",
  },
  {
    name: "Data Sandbox",
    role: "Synthetic infrastructure",
    summary:
      "Specification-driven synthetic payloads and personas for bank data sharing, insurance and the ATM directory, with an MCP server for agents. MIT code, CC0 data.",
    status: "Active",
    href: "https://data-sandbox.openfinance-os.org/",
    repository: "https://github.com/openfinance-os/data-sandbox",
  },
];
