/**
 * Content for /open-finance/go-live-decisions.
 *
 * A practitioner's list, not regulatory guidance. Statements about the scheme
 * (who must participate, where consent is held, what certification covers, how
 * versions change, who pays which fees) were checked against the MiddleLeap
 * Open Finance reference pack on `reviewedOn`, and the errata level against the
 * published register. Re-check them, and update the date, whenever the
 * Standards move to a new version or errata level. Figures that change (fees,
 * compensation amounts, service levels) are deliberately not quoted.
 */
export const goLiveReview = {
  reviewedOn: "2026-11-15",
  reviewedLabel: "15 Nov 2026",
  standards: "Standards v2.1 with errata 3",
} as const;

export const goLiveDecisions = [
  {
    number: "01",
    title: "Role",
    question: "Will you only comply as a data holder, or also compete as a third party?",
    body:
      "Every licensed bank must take part as a Licensed Financial Institution and serve data and payments to others. Acting as a third-party provider yourself is a choice. A bank needs no separate licence for it, but it must notify the Central Bank and have approval before it starts. The choice decides whether Open Finance is a cost you carry or a channel you use.",
    leftOpen:
      "The programme is scoped and funded as compliance. The commercial case then arrives after the architecture, the budget and the team are fixed.",
    owner: "The executive committee, with a business-line sponsor.",
  },
  {
    number: "02",
    title: "Proposition",
    question: "What will customers and partners get that they could not get before?",
    body:
      "The Standards say what data and payment capabilities exist. They do not say what you will build with them. One priority proposition, with a named owner and a test of whether it is working, is enough to start.",
    leftOpen:
      "You pay the cost of participation and earn none of the upside, while others build propositions on your customers' data.",
    owner: "The head of the business line the proposition serves.",
  },
  {
    number: "03",
    title: "Consent experience",
    question: "Will you build the consent journey yourself or use the central one, and who owns it either way?",
    body:
      "Consent is always held centrally by the scheme's API Hub. How the customer gives it is your choice. You can build the journey in your own channels, where the customer authenticates with you, your screens are certified against the scheme's customer-experience rules and you provide the place where customers view and revoke consents. Or you can adopt the scheme's centralised authentication service, which runs the journey and the consent view for you while you build the services behind it.",
    leftOpen:
      "The route is chosen by default, by whoever is building. If it is your own journey, the screens are designed at the end of the build and first judged by the certifier and a confused customer.",
    owner: "The head of digital channels, with compliance.",
  },
  {
    number: "04",
    title: "Version and change",
    question: "Which version are you building to, and who tracks what changes next?",
    body:
      "A published version of the Standards changes only through recorded errata, and new versions arrive on a roadmap. When a new major version arrives, a bank has to run it alongside the previous one for a period. Changes to function or customer experience can trigger re-certification. Someone has to read the register and decide what each change means for you.",
    leftOpen:
      "The build targets a version that has already moved on, and every correction lands as an unplanned change request.",
    owner: "The head of architecture, with one named person reading the register.",
  },
  {
    number: "05",
    title: "Operations",
    question: "Who runs this the day after go-live?",
    body:
      "Participation carries service levels for availability and response time, and planned maintenance counts against the availability target. It also brings a service desk relationship with the scheme operator, and incident and change processes with notice periods. These are run-the-bank duties, and they start on day one.",
    leftOpen:
      "The project team disbands, and the first incident has no owner, no runbook and no route to the operator.",
    owner: "The head of operations or technology operations.",
  },
  {
    number: "06",
    title: "Liability, fraud and disputes",
    question: "Who answers when a consent, a payment or a control fails?",
    body:
      "The scheme has a liability model with set compensation for defined failures, such as a consent that is not honoured or a payment executed outside its service level. The participant that holds the customer relationship, usually the bank, compensates the customer first and recovers from the party at fault afterwards. On payments the bank answers payee-name checks, makes the final fraud decision using the risk information the third party sends, and keeps its existing duty to report suspicious activity.",
    leftOpen:
      "Claims and disputes arrive in a queue nobody staffed or budgeted, and fraud controls are discovered to belong to no one.",
    owner: "The chief risk officer, with operations and financial crime.",
  },
  {
    number: "07",
    title: "Commercials",
    question: "Who owns the profit and loss of taking part?",
    body:
      "The commercial model works differently for each role. As a data holder you earn fees from third parties on the payments they initiate, and you pay the Central Bank's licence fees. API Hub usage fees are charged to third parties, so you pay them only if you act as one. Add the cost of running the service and the value of your own propositions, and participation has a profit and loss. It needs an owner who is measured on it.",
    leftOpen:
      "Fees paid become a cost-centre line, fees earned go unmeasured, and nobody can say whether participation pays.",
    owner: "The chief financial officer, with the business-line sponsor.",
  },
] as const;

/**
 * Decision patterns shown on /open-finance. They describe a decision and what
 * resolving it should leave behind. They are not case studies and must not be
 * worded as client engagements unless the founder supplies one.
 */
export const decisionPatterns = [
  {
    key: "role",
    title: "LFI only, or TPP as well?",
    situation:
      "The compliance programme is funded and running. Whether the bank should also compete as a third party has no owner and no date.",
    decision:
      "The role the bank will play for each customer segment, with the economics of each option set side by side.",
    leftBehind:
      "A role statement the board has approved, a shortlist of propositions it enables and a list of what the platform must do differently.",
  },
  {
    key: "proposition",
    title: "A mandate without a proposition",
    situation:
      "The go-live date is fixed and the build is on track. Nobody can say what the bank will sell once it is live.",
    decision:
      "One priority proposition, the customer need behind it and the evidence that would justify building it.",
    leftBehind:
      "A named owner, a proposition brief with its assumptions stated and a 90-day sequence to test it.",
  },
] as const;
