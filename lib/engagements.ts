/**
 * The three engagement models, consumed by `/`, `/open-finance` and
 * `/how-we-engage` so the copies cannot drift.
 *
 * Three is the shipped commitment — every existing source says three
 * (public/llms.txt, the homepage, /open-finance). Adding a fourth is a public
 * commitment and a founder decision, not an engineering one.
 */
export const engagementModels = [
  {
    key: "executive-advisory",
    label: "Executive advisory",
    title: "Hold the strategic line",
    detail:
      "Senior support for boards, executives and programme sponsors making regulatory, proposition and ecosystem decisions.",
    short: "Senior guidance for regulatory, platform and transformation mandates.",
  },
  {
    key: "strategy-sprint",
    label: "Strategy sprint",
    title: "Resolve the critical choices",
    detail:
      "A focused engagement to establish position, priority propositions, platform implications and an execution roadmap.",
    short: "Define the proposition, ecosystem, commercial model and execution roadmap.",
  },
  {
    key: "mobilisation",
    label: "Mobilisation",
    title: "Turn direction into movement",
    detail:
      "Programme leadership that aligns product, technology, risk, operations and external partners around delivery.",
    short:
      "Adopt The Loom around one real outcome and leave a governed repository capability behind.",
  },
] as const;

export type EngagementModel = (typeof engagementModels)[number];
