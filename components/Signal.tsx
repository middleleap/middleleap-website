const articles = [
  {
    persona: "Essay \u00b7 For CTOs",
    title: "The 20\u00d7 Company: Why Your AI Strategy is Stuck at 15%",
    excerpt:
      "The evidence is clear: 10-person teams can outproduce 200. Most organizations bolt AI onto existing processes and wonder why transformation never arrives.",
    meta: "12 min read \u2192",
  },
  {
    persona: "Case Study \u00b7 For CPOs",
    title: "4 Hypotheses in a Week: A Product Leader\u2019s AI-DLC Playbook",
    excerpt:
      "When prototypes cost hours instead of sprints, your portfolio strategy changes fundamentally.",
    meta: "8 min read \u2192",
  },
  {
    persona: "Governance \u00b7 For CIOs",
    title: "Agent Governance: The Control Framework Your CAB Needs",
    excerpt:
      "Agent velocity without agent governance is just faster chaos. Here\u2019s the framework.",
    meta: "12 min read \u2192",
  },
];

export default function Signal() {
  return (
    <section id="signal" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 11 — The Signal"}</div>
        <h2 className="sec-title rv">Stay sharp.</h2>
        <p className="sec-desc rv rv-d1">
          Essays, case studies, and dispatches from the frontier of the 20×
          company.
        </p>

        <div className="sig-grid rv rv-d2">
          {articles.map((a) => (
            <a href="#" className="sig-card" key={a.title}>
              <div className="sig-persona">{a.persona}</div>
              <div className="sig-title">{a.title}</div>
              <div className="sig-excerpt">{a.excerpt}</div>
              <div className="sig-meta">{a.meta}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
