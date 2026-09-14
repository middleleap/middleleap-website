// Editorial scenario, not an executed customer project or regulatory assessment.
export const meridianCase = {
  name: "Meridian Trust",
  status: "Fictional case · illustrative decisions · no live customers or payments",
  question: "Could Open Finance help customers understand their money—and act on it?",
  brief: "Meridian Trust wants to explore a personal finance management app with payment initiation as a third-party provider (TPP). The starting point is its strategic interest and the customer's problem. An app, a payment feature and a TPP operating model are hypotheses to test, not an approved solution.",
} as const;

export const meridianStages = [
  {
    name: "Discover", title: "Find the problem worth solving.",
    body: "Meridian's sponsor wants a more useful everyday customer relationship. The working hypothesis: people with accounts at several banks struggle to see upcoming commitments and move money in time. Research must establish whether this problem exists, for whom and how much it matters.",
    questions: [
      ["Strategic interest", "Compare customer value, adoption, retention and a viable revenue model; do not assume that API access creates a business."],
      ["Customer evidence", "Interview and observe customers, map current workarounds and test willingness to share financial data. Record evidence and counter-evidence separately from sponsor assumptions."],
      ["Intervention options", "Compare a consolidated view, spending insights, reminders, payment initiation and improvements to existing channels. Open Finance is one solution domain to investigate."],
    ],
    output: "M01 · Mandate and problem brief → research plan, alternatives, evidence gaps and accountable sponsor.",
    decision: "Illustrative decision: authorize discovery only. No app build or TPP launch is approved.",
  },
  {
    name: "Define", title: "Make the next decision clear.",
    body: "Use a disposable prototype to test whether seeing finances and initiating a transfer belong in the same journey. Compare PFM alone with PFM plus customer-initiated payments; narrow the scope only when the customer, commercial and feasibility evidence supports it.",
    questions: [
      ["Proposition and economics", "Test comprehension and usefulness. Model acquisition, consent completion, data refresh, platform charges and support costs; leave unverified prices and demand as open inputs."],
      ["TPP feasibility", "Establish Meridian's legal entity, jurisdiction and existing permissions. Determine the applicable licensing or approval route, permitted activities, onboarding, certification and participating-bank coverage."],
      ["Bounded hypothesis", "For the worked branch, explore an account overview and a customer-initiated domestic transfer. Defer automated sweeps, product recommendations and additional payment types pending separate assessment."],
    ],
    output: "M02 · Reviewed discovery hand-off → prototype, business case, scope, risks, success measures and stop conditions.",
    decision: "Illustrative decision: proceed to a synthetic prototype, with regulatory scope unresolved. Narrow, investigate or stop if the evidence does not support the proposition.",
  },
  {
    name: "Develop", title: "Give agents a controlled loop.",
    body: "Turn the bounded proposition into reviewable increments: connect accounts, explain freshness and spending, then initiate a transfer with a clear outcome. The prototype uses synthetic accounts and a simulated API Hub and bank; it has no production connectivity.",
    questions: [
      ["Consent and data", "Separate account-data permissions from payment authorization. Design revocation, expiry, minimum data access, freshness indicators, retention and deletion; review insight accuracy and misleading financial recommendations."],
      ["Payment journey", "Model Meridian TPP → API Hub → bank, with the bank executing the payment. Include payee verification, customer authorization, repeated submissions, delayed responses and reconciliation."],
      ["Controlled implementation", "Bind specifications to acceptance tests and accountable reviewers. Assess security, fraud, privacy and outsourced services; test rejected consent, stale data, unknown payment outcomes and support escalation."],
    ],
    output: "M03 · Delivery evidence → versioned contracts, synthetic test cases, reviewed changes and unresolved controls.",
    decision: "Illustrative decision: do not treat a timeout as a failed payment or encourage an unchecked retry. Resolve the existing payment outcome first.",
  },
  {
    name: "Deliver", title: "Keep the release accountable.",
    body: "Assemble a release decision that joins product acceptance with legal scope, security, participant onboarding and operational readiness. A working demo and green code checks cannot establish that Meridian may launch a live TPP service.",
    questions: [
      ["Readiness evidence", "Review applicable regulatory approvals, platform onboarding and certification, bank capability verification, security findings and customer-journey validation."],
      ["Operating ownership", "Name accountable owners for consent, data incidents, fraud, complaints, payment-status investigation and reconciliation. Exercise recovery, rollback and customer communication."],
      ["Release decision", "In this fictional pack, delayed-payment reconciliation remains unproven and the regulatory route remains unresolved. The accountable release owner withholds production authorization."],
    ],
    output: "M04 · Release pack → evidence links, open blockers, decision owner and explicit authorization state.",
    decision: "Illustrative outcome: PRODUCTION BLOCKED. Synthetic demonstration only; no executed test results, certification or customer launch is claimed.",
  },
] as const;

export const meridianDomainChecks = [
  ["Authority and responsibility", "Confirm legal status, applicable permissions, governance, insurance and partner responsibilities. Assess the boundaries around financial advice and customer funds; the example assumes neither fund custody nor automatic authority to operate."],
  ["Customer value and economics", "Validate the target segment, customer problem, revenue assumptions, costs and distribution. Set measurable outcomes and explicit reasons to stop before committing to a build."],
  ["Consent and information", "Specify purposes, data permissions, consent management, withdrawal, freshness, categorization quality, privacy, retention and deletion. Confirm customer communications and accessibility needs."],
  ["Platform and payments", "Verify deployed standards and bank capabilities. Plan Trust Framework registration, secure communication and credentials, Hub-mediated access, payee checks, payment status, duplicate prevention and reconciliation."],
  ["Assurance and launch", "Establish threat and fraud controls, independent review, functional and customer-experience certification, security evidence and live-proving prerequisites appropriate to the approved scope."],
  ["Operations and learning", "Define monitoring, incident and dispute handling, complaints, recovery, supplier responsibilities and change management. Feed customer outcomes and control failures back into the mandate."],
] as const;
