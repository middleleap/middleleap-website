const logEntries = [
  { time: "00:00", msg: "Session initialized. Steering files loaded: frontend-design, docx, brand-guidelines" },
  { time: "00:12", msg: "PRD v1.0 generated from prior conversation context" },
  { time: "00:28", msg: "Design system: void/paper/signal palette, Instrument Serif + DM Sans + JetBrains Mono" },
  { time: "00:45", msg: "Hero section built: generative canvas, typewriter, split panel" },
  { time: "01:10", msg: "Sections 01\u201304: Problem, Shift (timeline), Mechanics (flywheel), Roadmap" },
  { time: "01:35", msg: "Sections 05\u201308: Results, Lab, Toolkit, Signal" },
  { time: "02:15", msg: "Executive review applied \u2014 governance, TCO, personas, proof points" },
  { time: "02:50", msg: "v2: particles, flywheel viz, stat counters, cursor, agent feed" },
  { time: "03:20", msg: "v3: complete redesign \u2014 editorial typography, refined layout, cohesive system" },
  { time: "03:47", msg: "Build complete. Zero manual CSS. All agent-generated from specification.", done: true },
];

const buildStats = [
  { num: "3h 47m", label: "Total Time" },
  { num: "3", label: "Steering Files" },
  { num: "12", label: "Sections" },
  { num: "0", label: "Lines Hand-Written" },
];

export default function Built() {
  return (
    <section id="built" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 08 — Built With AI-DLC"}</div>
        <h2 className="sec-title rv">
          This site is <em>its own proof.</em>
        </h2>
        <p className="sec-desc rv rv-d1">
          Everything you see — designed, coded, documented — using the methodology
          above. Not by a team of 20. By practitioners who&apos;ve spent 20+ years
          shipping production software in banking, telco, and enterprise. This is
          what a 20× workflow looks like in practice.
        </p>

        <div className="buildlog rv rv-d2">
          <div className="buildlog-header">
            <div className="buildlog-dot" />
            <div className="buildlog-title">Build Session Log</div>
          </div>
          {logEntries.map((entry) => (
            <div className="bl-row" key={entry.time}>
              <div className="bl-time">{entry.time}</div>
              <div className={`bl-msg${entry.done ? " done" : ""}`}>
                {entry.msg}
              </div>
            </div>
          ))}
          <div className="bl-stats">
            {buildStats.map((s) => (
              <div key={s.label}>
                <div className="bl-stat-num">{s.num}</div>
                <div className="bl-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
