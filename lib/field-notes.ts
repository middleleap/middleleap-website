export type FieldNote = {
  slug: string;
  number: string;
  title: string;
  dek: string;
  readingTime: string;
  theme: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    points?: string[];
  }>;
  closing: string;
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "decision-grade-evidence",
    number: "01",
    title: "Decision-grade evidence before delivery theatre",
    dek:
      "A programme moves when evidence changes a decision—not when another document describes the programme.",
    readingTime: "4 minute note",
    theme: "Transformation delivery",
    sections: [
      {
        heading: "The unit of progress is a decision",
        paragraphs: [
          "Regulated programmes often report activity with great precision while leaving the decisive question untouched. Workshops happened. Requirements were captured. Architecture was reviewed. None of those facts proves that the institution knows what it will do next.",
          "Decision-grade evidence is specific enough for an accountable owner to choose, reject or bound a path. It connects the mandate, source evidence, rationale, control consequence and next review condition.",
        ],
      },
      {
        heading: "Make the missing evidence visible",
        paragraphs: [
          "An honest gap register is more useful than a confident synthesis that hides uncertainty. Unknowns should remain named, owned and connected to the decision they block.",
        ],
        points: [
          "The mandate and the owner who can change it",
          "The source evidence and its authority",
          "The decision, rationale and alternatives rejected",
          "The control or operating consequence",
          "The event that should trigger review",
        ],
      },
      {
        heading: "Evidence should survive the programme",
        paragraphs: [
          "The decision record belongs with the institution. It should remain usable when the programme team changes, the consultant leaves or the next model enters the delivery environment.",
          "That is the difference between documentation as a project residue and institutional intelligence as an operating asset.",
        ],
      },
    ],
    closing:
      "If a programme cannot name the next decision and the evidence required to make it, the immediate need is not more delivery capacity.",
  },
  {
    slug: "leaders-in-the-loop",
    number: "02",
    title: "Leaders in the loop—not humans around the edges",
    dek:
      "AI can compress the work between decisions. It cannot inherit the mandate, risk appetite or institutional authority.",
    readingTime: "5 minute note",
    theme: "AI-native operating models",
    sections: [
      {
        heading: "Speed changes the control problem",
        paragraphs: [
          "AI-assisted teams can move from evidence to specification and from specification to software faster than conventional governance rhythms expect. If authority remains implicit, faster production creates faster ambiguity.",
          "The answer is not to place a human approval at the end of every machine action. It is to define where institutional judgement is required and bind the work to that decision.",
        ],
      },
      {
        heading: "Keep authority explicit",
        paragraphs: [
          "A leader in the loop owns a bounded decision, understands the evidence and can stop or redirect the system. They are not a ceremonial reviewer asked to approve a large change after its important assumptions have disappeared inside implementation.",
        ],
        points: [
          "People approve scope, policy and release authority",
          "Agents organise evidence, draft options and expose gaps",
          "Controls bind artifacts to decisions and accountable owners",
          "Operating evidence returns to the next discovery cycle",
        ],
      },
      {
        heading: "Govern the transition, not only the output",
        paragraphs: [
          "The critical control point is the hand-off between discovery and delivery. That is where an evidenced problem becomes authorised scope and where policy becomes a build constraint.",
          "A reliable operating model makes this transition inspectable. It records what was approved, what evidence supported it and what remains outside the boundary.",
        ],
      },
    ],
    closing:
      "The institution should become faster because its authority is clearer—not because accountability has been delegated to the tool.",
  },
  {
    slug: "open-finance-operating-model",
    number: "03",
    title: "Open Finance is an operating-model decision",
    dek:
      "The API is visible. The institutional choices that make participation valuable and operable sit underneath it.",
    readingTime: "4 minute note",
    theme: "Open Finance",
    sections: [
      {
        heading: "Start with the role in the market",
        paragraphs: [
          "An Open Finance programme becomes fragmented when regulatory readiness, proposition design and technology delivery run as separate transformations.",
          "The first decision is institutional: where will the organisation lead, participate or partner as data and payment permissions change the value chain?",
        ],
      },
      {
        heading: "Connect four choices",
        paragraphs: [
          "Market position, proposition, platform and operating model move together. A technically compliant interface without a participation thesis is a cost. A proposition without consent, control and partner operations is a slide.",
        ],
        points: [
          "Position: the role and advantage the institution intends to hold",
          "Proposition: the customer or partner value created by permitted capabilities",
          "Platform: consent, data, APIs, partner and control capabilities",
          "Operating model: the rights and responsibilities required to run it",
        ],
      },
      {
        heading: "Treat certification as part of the operating system",
        paragraphs: [
          "Certification is not a technical side quest. It is an external dependency that should shape evidence, sequencing, partner coordination and executive governance.",
          "The programme becomes credible when the certification path and the commercial path reinforce each other rather than compete for priority.",
        ],
      },
    ],
    closing:
      "The strongest Open Finance mandate is not the one with the most use cases. It is the one that makes the institution's role and execution system explicit.",
  },
];

export function getFieldNote(slug: string) {
  return fieldNotes.find((note) => note.slug === slug);
}
