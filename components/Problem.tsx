export default function Problem() {
  return (
    <section id="problem" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 01 — The Problem"}</div>
        <h2 className="sec-title rv">
          You bolted AI onto a broken process.
          <br />
          <em>It gave you 15%.</em>
        </h2>
        <p className="sec-desc rv rv-d1">
          The next generation of companies won&apos;t win by hiring more
          engineers. They&apos;ll win with 10-person teams that outproduce
          200-person organizations — because AI eliminates the 73% of the value
          stream lost to handoffs, approvals, and waiting. That&apos;s the 20×
          company. And you can&apos;t build one on bolt-on tools.
        </p>

        <div className="problem-grid rv rv-d2">
          <div className="problem-card">
            <div className="problem-num">10–15%</div>
            <div className="problem-label">Efficiency Gain</div>
            <div className="problem-text">
              The average improvement from AI coding assistants. You&apos;re
              optimizing the wrong layer.
            </div>
          </div>
          <div className="problem-card">
            <div className="problem-num">73%</div>
            <div className="problem-label">Value Stream Waste</div>
            <div className="problem-text">
              Time between steps — handoffs, context switches, approval queues —
              dwarfs time spent writing code.
            </div>
          </div>
          <div className="problem-card">
            <div className="problem-num zero">0</div>
            <div className="problem-label">Paradigm Shift</div>
            <div className="problem-text">
              Bolt-on tools don&apos;t change how you work. Meanwhile, AI-native
              startups are building $100B companies with 10-person teams. The
              difference isn&apos;t talent. It&apos;s operating model.
            </div>
          </div>
        </div>

        <div className="terminal rv rv-d3">
          <div>
            <span className="ln">01</span>
            <span className="kw">const</span> currentState = {"{"}
          </div>
          <div>
            <span className="ln">02</span>
            {"  "}model: <span className="str">&quot;Software Factory&quot;</span>,
          </div>
          <div>
            <span className="ln">03</span>
            {"  "}aiUsage: <span className="str">&quot;bolt-on autocomplete&quot;</span>,
          </div>
          <div>
            <span className="ln">04</span>
            {"  "}bottleneck: <span className="str">&quot;handoffs, not keystrokes&quot;</span>,
          </div>
          <div>
            <span className="ln">05</span>
            {"  "}realGain: <span className="val">0.15</span>,
          </div>
          <div>
            <span className="ln">06</span>
            {"  "}potentialGain: <span className="kw">20.0</span>,
          </div>
          <div>
            <span className="ln">07</span>
            {"}"};
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <span className="ln">08</span>
            <span className="cmt">
              {"// ERROR: You're optimizing the wrong variable."}
            </span>
          </div>
          <div>
            <span className="ln">09</span>
            <span className="cmt">
              {"// AI-native teams of 10 are outshipping orgs of 200."}
            </span>
          </div>
          <div>
            <span className="ln">10</span>
            <span className="cmt">
              {"// The gap isn't code generation. It's decision latency."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
