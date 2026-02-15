"use client";

import { useState, useMemo } from "react";

const STAGE_SAVINGS_HOURS = [8, 20, 40, 80];
const STAGE_NAMES = ["AI-Assisted", "Templates & Scaffolds", "Knowledge Plane", "Agent Factory"];
const STAGE_INVESTMENT = [5000, 25000, 80000, 200000];

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [sprintLength, setSprintLength] = useState(10);
  const [releaseFreq, setReleaseFreq] = useState(2);
  const [annualDevCost, setAnnualDevCost] = useState(120000);
  const [aiSpend, setAiSpend] = useState(500);

  const results = useMemo(() => {
    const hourlyRate = annualDevCost / 2080;
    return STAGE_SAVINGS_HOURS.map((stageSavings, i) => {
      const monthlyHoursSaved = teamSize * stageSavings;
      const annualCostSavings = monthlyHoursSaved * 12 * hourlyRate;
      const monthlySavings = annualCostSavings / 12;
      const paybackMonths = monthlySavings > 0 ? STAGE_INVESTMENT[i] / monthlySavings : Infinity;
      return {
        stage: i + 1,
        name: STAGE_NAMES[i],
        hoursSaved: monthlyHoursSaved,
        annualSavings: annualCostSavings,
        paybackMonths: paybackMonths,
      };
    });
  }, [teamSize, sprintLength, releaseFreq, annualDevCost, aiSpend]);

  return (
    <div className="roi-wrapper rv rv-d3">
      <div className="roi-header">
        <div className="roi-label">{"// ROI Calculator"}</div>
        <div className="roi-title">Model your transformation.</div>
      </div>

      <div className="roi-inputs">
        <div className="roi-input-group">
          <label className="roi-input-label">Team Size</label>
          <input
            className="roi-input"
            type="number"
            min={1}
            value={teamSize}
            onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="roi-input-group">
          <label className="roi-input-label">Sprint Length (days)</label>
          <input
            className="roi-input"
            type="number"
            min={1}
            value={sprintLength}
            onChange={(e) => setSprintLength(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="roi-input-group">
          <label className="roi-input-label">Releases / Month</label>
          <input
            className="roi-input"
            type="number"
            min={1}
            value={releaseFreq}
            onChange={(e) => setReleaseFreq(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="roi-input-group">
          <label className="roi-input-label">Avg Annual Dev Cost ($)</label>
          <input
            className="roi-input"
            type="number"
            min={1000}
            step={1000}
            value={annualDevCost}
            onChange={(e) => setAnnualDevCost(Math.max(1000, Number(e.target.value)))}
          />
        </div>
        <div className="roi-input-group">
          <label className="roi-input-label">Current AI Spend ($/mo)</label>
          <input
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
