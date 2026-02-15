import Flywheel from "./Flywheel";
import SpecGenerator from "./SpecGenerator";

export default function Mechanics() {
  return (
    <section id="mechanics" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 04 — The Mechanics"}</div>
        <h2 className="sec-title rv">
          Three mechanisms
          <br />
          <em>that build a 20× company.</em>
        </h2>
        <p className="sec-desc rv rv-d1">
          The 20× company isn&apos;t a vibe — it&apos;s an architecture. Each
          mechanism feeds the next. The system gets smarter with every cycle. This
          is how 10 people outproduce 200.
        </p>

        <div className="mech-card rv rv-d1">
          <div className="mech-num">Mechanism 01</div>
          <div className="mech-title">Specification-First Delivery</div>
          <div className="mech-desc">
            Rigorous specifications force alignment before execution. You cannot
            delegate to an agent without a contract. This eliminates the most
            expensive waste: building the wrong thing fast. We learned this the
            hard way — two decades of regulated delivery in banking and telco
            taught us that ambiguity is the real cost driver, not velocity.
          </div>
          <div className="mech-flow">
            <span className="step">Prompt</span>
            <span className="arrow">→</span>
            <span className="step">Requirement</span>
            <span className="arrow">→</span>
            <span className="step">Design</span>
            <span className="arrow">→</span>
            <span className="step lit">Plan</span>
          </div>
        </div>

        <div className="mech-card rv rv-d2">
          <div className="mech-num">Mechanism 02</div>
          <div className="mech-title">Compounding Engineering</div>
          <div className="mech-desc">
            The Knowledge Flywheel. Every feature generates new steering files —
            reusable instruction sets that encode your architecture, standards,
            and domain rules. This is the mechanism that separates a 20× company
            from a team using ChatGPT. The system doesn&apos;t just remember. It
            learns. Each cycle makes the next one faster, cheaper, and more
            reliable.
          </div>
          <Flywheel />
          <div className="mech-flow">
            <span className="step lit">Plan</span>
            <span className="arrow">→</span>
            <span className="step">Delegate</span>
            <span className="arrow">→</span>
            <span className="step">Assess</span>
            <span className="arrow">→</span>
            <span className="step lit">Codify</span>
            <span className="arrow">↻</span>
          </div>
        </div>

        <div className="mech-card rv rv-d3">
          <div className="mech-num">Mechanism 03</div>
          <div className="mech-title">Adaptive Workflows</div>
          <div className="mech-desc">
            The AI-DLC routes intelligently. Simple fixes flow through fast-track
            automation. Complex features get full specification cycles. Process
            weight matches problem weight. This is how a 10-person team handles
            the throughput of 200 — not by cutting corners, but by matching
            effort to risk.
          </div>
          <div className="risk-row">
            <div className="risk-badge">
              <div className="risk-dot lo" />
              Low-risk → Auto
            </div>
            <div className="risk-badge">
              <div className="risk-dot md" />
              Medium → Review
            </div>
            <div className="risk-badge">
              <div className="risk-dot hi" />
              High → Full spec
            </div>
          </div>
        </div>

        <SpecGenerator />
      </div>
    </section>
  );
}
