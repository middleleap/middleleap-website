const repos = [
  {
    name: "agent-factory-framework",
    desc: "Multi-agent orchestration with spec-driven contracts. Claude Code native.",
    tags: ["TypeScript", "MCP"],
    href: "https://github.com/middleleap/agent-factory-framework",
  },
  {
    name: "ai-dlc-toolkit",
    desc: "CLI and templates for the Adaptive Development Lifecycle. Spec engine included.",
    tags: ["Python", "CLI"],
    href: "https://github.com/middleleap/ai-dlc-toolkit",
  },
  {
    name: "steering-files-library",
    desc: "Battle-tested steering files, system prompts, and CLAUDE.md templates.",
    tags: ["Markdown"],
    href: "https://github.com/middleleap/steering-files-library",
  },
  {
    name: "spec-validator-mcp",
    desc: "Validates specifications against quality gates before agent execution.",
    tags: ["MCP Server"],
    href: "https://github.com/middleleap/spec-validator-mcp",
  },
  {
    name: "control-tower-dashboard",
    desc: "Real-time visibility into agent fleet activity, routing, and cost.",
    tags: ["React"],
    href: "https://github.com/middleleap/control-tower-dashboard",
  },
  {
    name: "open-finance-agents",
    desc: "Domain-specific agents for financial services \u2014 compliance, integration, reporting.",
    tags: ["Domain-Specific"],
    href: "https://github.com/middleleap/open-finance-agents",
  },
];

export default function Lab() {
  return (
    <section id="lab" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 09 — The Lab"}</div>
        <h2 className="sec-title rv">
          Open source. <em>Open methodology.</em>
        </h2>
        <p className="sec-desc rv rv-d1">
          The tools that power the 20× company. We build in public — every
          framework, template, and steering file that makes agent-native delivery
          work.
        </p>

        <div className="rv rv-d2">
          {repos.map((r) => (
            <a href={r.href} target="_blank" rel="noopener noreferrer" className="repo" key={r.name}>
              <div className="repo-name">{r.name}</div>
              <div className="repo-desc">{r.desc}</div>
              <div className="repo-tags">
                {r.tags.map((t) => (
                  <span className="repo-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
