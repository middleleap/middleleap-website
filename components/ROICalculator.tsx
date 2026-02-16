"use client";

import { useState, useMemo } from "react";
import { fmt, calculateROIResults } from "@/lib/roi-calculator";

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [sprintLength, setSprintLength] = useState(10);
  const [releaseFreq, setReleaseFreq] = useState(2);
  const [annualDevCost, setAnnualDevCost] = useState(120000);
  const [aiSpend, setAiSpend] = useState(500);

  const results = useMemo(() => {
    return calculateROIResults({ teamSize, annualDevCost });
  }, [teamSize, annualDevCost]);

  return (
    <div className="roi-wrapper rv rv-d3">
      <div className="roi-header">
        <div className="roi-label">{"// ROI Calculator"}</div>
        <div className="roi-title">Model your transformation.</div>
      </div>

      <div className="roi-inputs">
        <div className="roi-input-group">
          <label className="roi-input-label" htmlFor="roi-team-size">Team Size</label>
          <input
            id="roi-team-size"
            className="roi-input"
            type="number"
            min={1}
            value={teamSize}
            onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="roi-input-group">
          <label className="roi-input-label" htmlFor="roi-sprint-length">Sprint Length (days)</label>
          <input
            id="roi-sprint-length"
            className="roi-input"
            type="number"
            min={1}
            value={sprintLength}
            onChange={(e) => setSprintLength(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="roi-input-group">
          <label className="roi-input-label" htmlFor="roi-release-freq">Releases / Month</label>
          <input
            id="roi-release-freq"
            className="roi-input"
            type="number"
            min={1}
            value={releaseFreq}
            onChange={(e) => setReleaseFreq(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="roi-input-group">
          <label className="roi-input-label" htmlFor="roi-dev-cost">Avg Annual Dev Cost ($)</label>
          <input
            id="roi-dev-cost"
            className="roi-input"
            type="number"
            min={1000}
            step={1000}
            value={annualDevCost}
            onChange={(e) => setAnnualDevCost(Math.max(1000, Number(e.target.value)))}
          />
        </div>
        <div className="roi-input-group">
          <label className="roi-input-label" htmlFor="roi-ai-spend">Current AI Spend ($/mo)</label>
          <input
            id="roi-ai-spend"
            className="roi-input"
            type="number"
            min={0}
            value={aiSpend}
            onChange={(e) => setAiSpend(Math.max(0, Number(e.target.value)))}
          />
        </div>
      </div>

      <div className="roi-results">
        {results.map((r) => (
          <div
            className={`roi-stage-card${r.stage === 4 ? " apex" : ""}`}
            key={r.stage}
          >
            <div className="roi-stage-num">
              Stage {r.stage} &mdash; {r.name}
            </div>
            <div className="roi-metric">
              <div className="roi-metric-value">
                {r.hoursSaved.toLocaleString()}h
              </div>
              <div className="roi-metric-label">Hours saved / month</div>
            </div>
            <div className="roi-metric">
              <div className="roi-metric-value">{fmt(r.annualSavings)}</div>
              <div className="roi-metric-label">Annual cost savings</div>
            </div>
            <div className="roi-metric">
              <div className="roi-metric-value">
                {r.paybackMonths < 1
                  ? "<1 mo"
                  : r.paybackMonths === Infinity
                    ? "\u2014"
                    : `${Math.ceil(r.paybackMonths)} mo`}
              </div>
              <div className="roi-metric-label">Payback period</div>
            </div>
          </div>
        ))}
      </div>

      <div className="roi-cta">
        <a href="#cta">
          Want a detailed model? Schedule a diagnostic &rarr;
        </a>
      </div>
    </div>
  );
}
