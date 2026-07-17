export type VentureFamilyId = "commons" | "platforms" | "tooling";

export type VentureProject = {
  name: string;
  role: string;
  summary: string;
  status: string;
  detailPath?: string;
  href?: string;
  repository?: string;
};

export type VentureFamily = {
  id: VentureFamilyId;
  number: string;
  eyebrow: string;
  title: string;
  proposition: string;
  intelligence: string;
  projects: VentureProject[];
};

export const ventureFamilies: VentureFamily[] = [
  {
    id: "commons",
    number: "01",
    eyebrow: "Contribute",
    title: "Open Finance Commons",
    proposition:
      "Independent community infrastructure that makes the UAE Open Finance ecosystem visible, testable and easier to navigate.",
    intelligence:
      "Market participation, regulatory signals, API behaviour and ecosystem readiness.",
    projects: [
      {
        name: "OpenFinance-OS",
        role: "Community infrastructure",
        summary: "Website, observatory, updates and ecosystem visibility.",
        status: "Active",
        href: "https://openfinance-os.org/",
        repository: "https://github.com/openfinance-os/community-website",
      },
      {
        name: "Backoffice",
        role: "Operating knowledge",
        summary: "Open working knowledge, methods and ecosystem documentation.",
        status: "Active",
        detailPath: "/ventures/backoffice",
        href: "https://backoffice.openfinance-os.org/",
        repository: "https://github.com/openfinance-os/ofbo",
      },
      {
        name: "Data Sandbox",
        role: "Synthetic infrastructure",
        summary: "Realistic, specification-driven Open Finance payloads and personas.",
        status: "Active",
        href: "https://data-sandbox.openfinance-os.org/",
        repository: "https://github.com/openfinance-os/data-sandbox",
      },
      {
        name: "Ecosystem Watcher",
        role: "Agent-run intelligence",
        summary: "Scheduled monitoring of ecosystem change and market signals.",
        status: "Active",
        href: "https://ecosystem-watcher.openfinance-os.org/",
      },
    ],
  },
  {
    id: "platforms",
    number: "02",
    eyebrow: "Build",
    title: "Platform ventures",
    proposition:
      "Focused propositions built as working platforms, exposing the real choices behind product, ecosystem and operating-model design.",
    intelligence:
      "Platform economics, proposition design, architecture, go-to-market and operating models.",
    projects: [
      {
        name: "Parqo",
        role: "Platform venture",
        summary: "A UAE parking marketplace beginning with a live demand-and-supply acquisition wedge.",
        status: "Acquisition wedge live",
        detailPath: "/ventures/parqo",
        href: "https://parqo.co/",
        repository: "https://github.com/middleleap/parqo",
      },
      {
        name: "HiveMind",
        role: "Platform venture",
        summary: "Human-led, AI-amplified karting coaching delivered through the Hive Coach product.",
        status: "Phase 0 live",
        detailPath: "/ventures/hivemind",
        repository: "https://github.com/middleleap/hivemind",
      },
    ],
  },
  {
    id: "tooling",
    number: "03",
    eyebrow: "Codify",
    title: "AI-native execution systems",
    proposition:
      "Skills, harnesses and governed agent workflows that turn strategic intent into repeatable delivery capability.",
    intelligence:
      "Agent workflows, specifications, controls, verification and reusable delivery methods.",
    projects: [
      {
        name: "Open Finance Skill",
        role: "Nebras collaboration",
        summary: "A technical AI skill for working with Open Finance specifications and tooling.",
        status: "Active collaboration",
        repository: "https://github.com/middleleap/ai-dlc",
      },
      {
        name: "The Loom",
        role: "Ways of working",
        summary: "An emerging harness for governed, agent-enabled delivery.",
        status: "Emerging",
        href: "https://backoffice.openfinance-os.org/the-loom-ways-of-working",
      },
      {
        name: "Agentic tooling",
        role: "Execution layer",
        summary: "Reusable tools connecting specifications, agents and verification.",
        status: "Exploring",
      },
    ],
  },
];
