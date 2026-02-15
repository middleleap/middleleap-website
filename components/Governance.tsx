const principles = [
  {
    num: "01",
    title: "Agents operate against contracts, not autonomy.",
    text: "Specification-first delivery means no agent produces output without a defined scope, acceptance criteria, and quality gates.",
  },
  {
    num: "02",
    title: "Human oversight scales with risk.",
    text: "Adaptive workflows route low-risk changes through automation and high-risk changes through human review \u2014 the governance cost is proportional to the governance need.",
  },
  {
    num: "03",
    title: "Institutional knowledge is encoded, not assumed.",
    text: "Steering files capture compliance rules, security policies, and architectural standards so that agents follow governance by default.",
  },
  {
    num: "04",
    title: "Every action is auditable.",
    text: "Agent-generated code, specifications, and decisions produce audit trails that integrate with existing change management and ITSM systems.",
  },
];

const stages = [
  {
    num: "1",
    name: "AI-Assisted",
    dims: [
      { label: "Human Oversight", text: "Developer reviews all AI output manually" },
      { label: "Audit & Compliance", text: "Standard code review logs" },
      { label: "Change Management", text: "No change to existing CAB process" },
    ],
  },
  {
    num: "2",
    name: "Templates & Scaffolds",
    dims: [
      { label: "Human Oversight", text: "Team lead reviews agent output against templates" },
      { label: "Audit & Compliance", text: "Template conformance reports" },
      { label: "Change Management", text: "CAB receives agent-assisted change summaries" },
    ],
  },
  {
    num: "3",
    name: "System Knowledge Plane",
    dims: [
      { label: "Human Oversight", text: "Automated quality gates; human review for exceptions" },
      { label: "Audit & Compliance", text: "Policy-as-code enforcement with violation logging" },
      { label: "Change Management", text: "Agents generate RFC documents; CAB reviews high-risk only" },
    ],
  },
  {
    num: "4",
    name: "Agent Factory",
    dims: [
      { label: "Human Oversight", text: "Human oversight on strategic decisions; agents handle tactical" },
      { label: "Audit & Compliance", text: "Full audit trail: spec \u2192 agent action \u2192 output \u2192 review" },
      { label: "Change Management", text: "Integrated with ITSM: auto-approved low-risk, escalated high-risk" },
    ],
  },
];

const securityControls = [
  {
    title: "Policy zones",
    desc: "Security rules enforced at commit level \u2014 agents cannot bypass defined policy boundaries.",
  },
  {
    title: "Automated threat modeling",
    desc: "Agents generate threat assessments for architectural changes using encoded security standards.",
  },
  {
    title: "Credential management",
    desc: "Agents operate with scoped, time-limited credentials; no persistent access to production environments.",
  },
  {
    title: "Data sovereignty",
    desc: "Steering files can enforce data residency requirements, ensuring agent workflows comply with regional regulations.",
  },
  {
    title: "Incident response",
    desc: "Agent actions are logged with sufficient detail to support forensic analysis; rollback procedures are automated.",
  },
];

const itsmLines = [
  { ln: "1", kw: "stage 1\u20132:", text: " Agents generate change requests following existing templates; CAB unchanged" },
  { ln: "2", kw: "stage 3:   ", text: " Agents produce RFCs with automated risk scoring; CAB reviews flagged only" },
  { ln: "3", kw: "stage 4:   ", text: " Low-risk auto-approved via policy-as-code; high-risk routed to CAB" },
  { ln: "4", cmt: true, text: "// AI-DLC integrates with ITSM \u2014 it does not replace it" },
];

export default function Governance() {
  return (
    <section id="governance" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 05 — Governance & Control"}</div>
        <h2 className="sec-title rv">
          Velocity with <em>guardrails.</em>
        </h2>
        <p className="sec-desc rv rv-d1">
          Agent velocity without agent governance is faster chaos. Every stage
          of the AI-DLC includes explicit controls to ensure that speed does not
          come at the expense of quality, compliance, or accountability.
        </p>

        {/* Principles */}
        <div className="gov-section-title rv rv-d2">Principles</div>
        <div className="gov-principles rv rv-d2">
          {principles.map((p) => (
            <div className="gov-principle" key={p.num}>
              <div className="gov-principle-num">{p.num}</div>
              <div className="gov-principle-title">{p.title}</div>
              <div className="gov-principle-text">{p.text}</div>
            </div>
          ))}
        </div>

        {/* Control Framework */}
        <div className="gov-section-title rv rv-d3">Control Framework by Maturity Stage</div>
        <div className="rv rv-d3">
          {stages.map((s) => (
            <div className="gov-stage" key={s.num}>
              <div className="gov-stage-header">
                <div className="gov-stage-num">{s.num}</div>
                <div className="gov-stage-name">{s.name}</div>
              </div>
              <div className="gov-dims">
                {s.dims.map((d) => (
                  <div key={d.label}>
                    <div className="gov-dim-label">{d.label}</div>
                    <div className="gov-dim-text">{d.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security Controls */}
        <div className="gov-section-title rv rv-d2" style={{ marginTop: "3rem" }}>
          Security Controls
        </div>
        <div className="gov-security-grid rv rv-d2">
          {securityControls.map((c) => (
            <div className="gov-security-item" key={c.title}>
              <div className="gov-security-title">{c.title}</div>
              <div className="gov-security-desc">{c.desc}</div>
            </div>
          ))}
        </div>

        {/* ITSM Integration */}
        <div className="gov-section-title rv rv-d3">ITSM & CAB Integration</div>
        <div className="terminal rv rv-d3">
          {itsmLines.map((l) => (
            <div key={l.ln}>
              <span className="ln">{l.ln}</span>
              {l.cmt ? (
                <span className="cmt">{l.text}</span>
              ) : (
                <>
                  <span className="kw">{l.kw}</span>
                  <span>{l.text}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
