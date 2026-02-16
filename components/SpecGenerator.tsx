"use client";

import { useState, useCallback } from "react";
import { generateSpec, type SpecResult } from "@/lib/spec-generator";

export default function SpecGenerator() {
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<SpecResult | null>(null);

  const handleGenerate = useCallback(() => {
    if (!input.trim() || generating) return;
    setGenerating(true);
    setResult(null);

    setTimeout(() => {
      setResult(generateSpec(input.trim()));
      setGenerating(false);
    }, 1200);
  }, [input, generating]);

  const handleReset = () => {
    setInput("");
    setResult(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleGenerate();
  };

  return (
    <div className="spec-gen-wrapper rv rv-d3">
      <div className="spec-gen-header">
        <div className="spec-gen-label">{"// Try It"}</div>
        <div className="spec-gen-title">Generate a spec in seconds.</div>
      </div>

      <div className="spec-gen-input-row">
        <span className="spec-gen-prompt">&gt;</span>
        <input
          className="spec-gen-input"
          type="text"
          placeholder="Describe your next feature in one sentence"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={generating}
        />
        <button
          className="spec-gen-btn"
          onClick={handleGenerate}
          disabled={!input.trim() || generating}
        >
          Generate
        </button>
      </div>

      {generating && (
        <div className="spec-gen-loading">
          <div className="spec-gen-loading-text">
            Generating specification...
          </div>
        </div>
      )}

      {result && !generating && (
        <div className="spec-output">
          <div className="spec-output-card">
            <div className="spec-output-header">
              <div className="spec-output-title">Feature Specification</div>
              <span className={`spec-output-complexity ${result.complexity}`}>
                {result.complexity} complexity
              </span>
            </div>
            <div className="spec-output-body">
              <div className="spec-output-section">
                <div className="spec-output-section-label">Objective</div>
                <div className="spec-output-section-text">
                  {result.objective}
                </div>
              </div>
              <div className="spec-output-section">
                <div className="spec-output-section-label">
                  Acceptance Criteria
                </div>
                <ul className="spec-output-section-list">
                  {result.acceptanceCriteria.map((ac, i) => (
                    <li key={i}>{ac}</li>
                  ))}
                </ul>
              </div>
              <div className="spec-output-section">
                <div className="spec-output-section-label">Constraints</div>
                <ul className="spec-output-section-list">
                  {result.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="spec-output-section">
                <div className="spec-output-section-label">Dependencies</div>
                <ul className="spec-output-section-list">
                  {result.dependencies.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="spec-output-section">
                <div className="spec-output-section-label">Agent Routing</div>
                <div className="spec-output-routing">
                  <div
                    className={`spec-output-routing-dot ${result.complexity}`}
                  />
                  <span className="spec-output-routing-text">
                    {result.routing}
                  </span>
                </div>
              </div>
            </div>
            <div className="spec-output-footer">
              <div className="spec-output-cta">
                This took <em>8 seconds</em>. Your last PRD took{" "}
                <em>2 weeks</em>. Ready to talk?
              </div>
              <div className="spec-output-actions">
                <button className="spec-output-reset" onClick={handleReset}>
                  Try another
                </button>
                <a className="spec-output-talk" href="#cta">
                  Let&apos;s talk &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
