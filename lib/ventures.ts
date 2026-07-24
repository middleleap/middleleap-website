export type PortfolioProject = {
  name: string;
  type: string;
  summary: string;
  status: string;
  evidence: string;
  nextGate: string;
  portfolioRole: "Flagship regulated proof" | "Venture experiment";
  harnessProfile: "Regulated delivery" | "Venture delivery";
  detailPath: string;
  href?: string;
  repository: string;
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
    nextGate: "Enterprise adoption",
    portfolioRole: "Flagship regulated proof",
    harnessProfile: "Regulated delivery",
    detailPath: "/ventures/backoffice",
    href: "https://backoffice.openfinance-os.org/",
    repository: "https://github.com/openfinance-os/ofbo",
  },
  {
    name: "Parqo",
    type: "Platform venture",
    summary:
      "A UAE parking marketplace beginning with a live demand-and-supply acquisition wedge in dense business districts.",
    status: "Acquisition wedge live",
    evidence: "Commercial investment is gated by district-level demand and supply evidence.",
    nextGate: "District-level commercial proof",
    portfolioRole: "Venture experiment",
    harnessProfile: "Venture delivery",
    detailPath: "/ventures/parqo",
    href: "https://parqo.co/",
    repository: "https://github.com/middleleap/parqo",
  },
  {
    name: "HiveMind / Hive Coach",
    type: "AI-enabled service venture",
    summary:
      "A human-led coaching product that turns track evidence into grounded, coach-owned advice for developing drivers.",
    status: "Initial product live",
    evidence: "AI can deepen an expert service without taking authority from the expert.",
    nextGate: "Repeat usage and coach validation",
    portfolioRole: "Venture experiment",
    harnessProfile: "Venture delivery",
    detailPath: "/ventures/hivemind",
    repository: "https://github.com/middleleap/hivemind",
  },
];

export const ecosystemContributions: EcosystemContribution[] = [
  {
    name: "OpenFinance-OS",
    role: "Community infrastructure",
    summary: "Independent ecosystem visibility, observatory and working knowledge for UAE Open Finance.",
    status: "Active",
    href: "https://openfinance-os.org/",
    repository: "https://github.com/openfinance-os/community-website",
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
