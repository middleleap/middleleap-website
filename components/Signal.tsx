import Link from "next/link";

const reading = [
  {
    source: "Anthropic",
    title: "Claude Code: Best practices for agentic coding",
    href: "https://www.anthropic.com/engineering/claude-code-best-practices",
  },
  {
    source: "Simon Willison",
    title: "AI-assisted development and the future of software engineering",
    href: "https://simonwillison.net/2025/Mar/19/ai-assisted-search/",
  },
  {
    source: "Andrej Karpathy",
    title: "Software in the era of AI",
    href: "https://karpathy.ai/blog/software-in-2025.html",
  },
  {
    source: "Sequoia Capital",
    title: "AI\u2019s $600B question",
    href: "https://www.sequoiacap.com/article/ais-600b-question/",
  },
  {
    source: "a16z",
    title: "The AI-native developer",
    href: "https://a16z.com/ai-native-developer/",
  },
];

const articles = [
  {
    slug: "agent-factory-stuck-at-15",
    persona: "Essay \u00b7 For CTOs",
    title: "The 20\u00d7 Company: Why Your AI Strategy is Stuck at 15%",
    excerpt:
      "The evidence is clear: 10-person teams can outproduce 200. Most organizations bolt AI onto existing processes and wonder why transformation never arrives.",
    meta: "12 min read",
  },
  {
    slug: "product-leader-4-hypotheses-week",
    persona: "Case Study \u00b7 For CPOs",
    title: "4 Hypotheses in a Week: A Product Leader\u2019s AI-DLC Playbook",
    excerpt:
      "When prototypes cost hours instead of sprints, your portfolio strategy changes fundamentally.",
    meta: "8 min read",
  },
  {
    slug: "agent-governance-control-framework",
    persona: "Governance \u00b7 For CIOs",
    title: "Agent Governance: The Control Framework Your CAB Needs",
    excerpt:
      "Agent velocity without agent governance is just faster chaos. Here\u2019s the framework.",
    meta: "12 min read",
  },
];

export default function Signal() {
  return (
    <section id="signal" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 11 \u2014 The Signal"}</div>
        <h2 className="sec-title rv">Stay sharp.</h2>
        <p className="sec-desc rv rv-d1">
          Essays, case studies, and dispatches from the frontier of the 20&times;
          company.
        </p>

        <div className="sig-grid rv rv-d2">
          {articles.map((a) => (
            <Link href={`/signal/${a.slug}`} className="sig-card" key={a.title}>
              <div className="sig-persona">{a.persona}</div>
              <div className="sig-title">{a.title}</div>
              <div className="sig-excerpt">{a.excerpt}</div>
              <div className="sig-meta">
                {a.meta} &middot; <span className="sig-soon">Coming soon</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="rv rv-d2">
          <Link href="/signal" className="sig-readall">
            Read all essays &rarr;
          </Link>
        </div>

        <div className="sig-reading rv rv-d3">
          <div className="sig-reading-label">{"// What We're Reading"}</div>
          {reading.map((r) => (
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sig-reading-link"
              key={r.title}
            >
              <span className="sig-reading-source">{r.source}</span>
              <span className="sig-reading-title">{r.title}</span>
              <span className="sig-reading-arrow">&rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
