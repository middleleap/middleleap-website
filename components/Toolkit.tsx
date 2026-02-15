const groups = [
  {
    label: "AI Agents & Code",
    badges: ["Claude Code", "Claude + Skills", "Cursor", "Copilot", "v0"],
  },
  {
    label: "Design & Prototyping",
    badges: ["Magic Patterns", "Bolt.new", "Lovable", "Figma", "Vercel"],
  },
  {
    label: "Protocols & Infrastructure",
    badges: ["MCP", "NotebookLM", "GitHub Actions", "Codex CLI", "Linear"],
  },
];

export default function Toolkit() {
  return (
    <section id="toolkit" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 08 — The Toolkit"}</div>
        <h2 className="sec-title rv">Curated stack.</h2>
        <p className="sec-desc rv rv-d1">
          The stack behind the 20× company. Battle-tested across real production
          workloads in regulated industries.
        </p>
        <div className="rv rv-d2">
          {groups.map((g) => (
            <div className="tk-group" key={g.label}>
              <div className="tk-label">{g.label}</div>
              <div className="tk-badges">
                {g.badges.map((b) => (
                  <span className="tk-badge" key={b}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
