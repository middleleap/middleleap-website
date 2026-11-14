/**
 * The three engagement models, consumed by `/`, `/open-finance` and
 * `/how-we-engage` so the copies cannot drift.
 *
 * `duration` values are indicative public statements, not contract terms; change
 * them only with the founder's sign-off.
 *
 * Three is the shipped commitment — every existing source says three
 * (public/llms.txt, the homepage, /open-finance). Adding a fourth is a public
 * commitment and a founder decision, not an engineering one.
 */
export const engagementModels = [
  {
    key: "executive-advisory",
    href: "/how-we-engage#executive-advisory",
    label: "Executive advisory",
    title: "Hold the strategic line",
    detail:
      "Senior support for boards, executives and programme sponsors making regulatory, proposition and ecosystem decisions.",
    short: "Senior guidance for regulatory, platform and transformation mandates.",
    fits: "A board, executive or programme sponsor has regulatory, proposition or ecosystem decisions to make and wants a senior counterpart through them.",
    youBring: "A named sponsor, the decisions on the table and access to the people who own them.",
    youGet: "Regular working sessions with the senior lead, written positions on the decisions in play and challenge on papers before they reach the board.",
    duration: "Ongoing, typically reviewed each quarter",
  },
  {
    key: "strategy-sprint",
    href: "/how-we-engage#strategy-sprint",
    label: "Strategy sprint",
    title: "Resolve the critical choices",
    detail:
      "A focused engagement to establish position, priority propositions, platform implications and an execution roadmap.",
    short: "Define the proposition, ecosystem, commercial model and execution roadmap.",
    fits: "The direction is still open: which role to play, which propositions to back and what the platform must do.",
    youBring: "An executive sponsor, a small working group and the existing strategy, market and technology material.",
    youGet: "A stated market position, priority propositions, platform implications and an execution roadmap that leadership can decide on.",
    duration: "Typically four to six weeks",
  },
  {
    key: "mobilisation",
    href: "/how-we-engage#mobilisation",
    label: "Mobilisation",
    title: "Turn direction into movement",
    detail:
      "Programme leadership that aligns product, technology, risk, operations and external partners around delivery.",
    short:
      "Programme leadership from agreed direction into delivery, with The Loom where software is in scope.",
    fits: "The direction is agreed and delivery has to start across product, technology, risk, operations and partners.",
    youBring: "An accountable owner, the teams who will deliver and the authority to set governance.",
    youGet: "Programme leadership, accountable workstreams and executive governance. Where the mandate includes software, The Loom is adopted around one bounded outcome and a governed repository capability stays with your teams.",
    duration: "Typically three to six months",
  },
] as const;

export type EngagementModel = (typeof engagementModels)[number];
