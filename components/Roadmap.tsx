export default function Roadmap() {
  return (
    <section id="roadmap" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 04 — The Roadmap"}</div>
        <h2 className="sec-title rv">
          From bolt-on to <em>20× company.</em>
        </h2>
        <p className="sec-desc rv rv-d1">
          You don&apos;t leap in one jump. Four stages, each unlocking the next.
          This model comes from observing — and leading — transformation across
          fintech startups, tier-1 banks, and global telcos. Every stage is a
          pattern we&apos;ve seen work.
        </p>

        <div className="rv rv-d2">
          <div className="mat-step">
            <div className="mat-n">1</div>
            <div>
              <div className="mat-label">
                The Bolt-On Era — where 95% of companies are today
              </div>
              <div className="mat-name">AI-Assisted</div>
              <div className="mat-text">
                Ad-hoc tools. Individual usage. Copilot in the IDE, ChatGPT in
                the browser. No organizational integration. No compounding.
                You&apos;re getting 15% and calling it transformation.
              </div>
            </div>
          </div>
          <div className="mat-step">
            <div className="mat-n">2</div>
            <div>
              <div className="mat-label">Standardization Begins</div>
              <div className="mat-name">Templates &amp; Scaffolds</div>
              <div className="mat-text">
                Standardized prompts. MCP servers introduced. Reusable templates.
                First steering files appear. Knowledge persists between sessions.
              </div>
            </div>
          </div>
          <div className="mat-step">
            <div className="mat-n">3</div>
            <div>
              <div className="mat-label">Institutional Memory</div>
              <div className="mat-name">System Knowledge Plane</div>
              <div className="mat-text">
                Agents access proprietary knowledge graphs. Architecture
                decisions, compliance rules, and domain expertise become
                machine-readable.
              </div>
            </div>
          </div>
          <div className="mat-step apex" style={{ position: "relative" }}>
            <div className="mat-n">4</div>
            <div>
              <div className="mat-label">The 20× Company</div>
              <div className="mat-name">The Agent Factory</div>
              <div className="mat-text">
                The destination YC is betting on: tiny teams, outsized output.
                Autonomous agent fleets. Compounding engineering at scale.
                Leadership directs outcomes, not tasks. A 10-person team that
                ships like 200. The middle leap is complete.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
