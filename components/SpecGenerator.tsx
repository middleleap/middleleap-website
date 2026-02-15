"use client";

import { useState, useCallback } from "react";

interface SpecResult {
  objective: string;
  acceptanceCriteria: string[];
  constraints: string[];
  dependencies: string[];
  complexity: "low" | "medium" | "high";
  routing: string;
}

const KEYWORD_MAP: Record<string, { constraints: string[]; deps: string[]; weight: number }> = {
  auth: { constraints: ["Session management must follow OWASP guidelines", "Token expiry < 15 minutes"], deps: ["Identity provider integration"], weight: 2 },
  login: { constraints: ["Brute-force protection required", "MFA support path"], deps: ["Auth service", "Rate limiter"], weight: 2 },
  payment: { constraints: ["PCI DSS compliance required", "Idempotent transactions"], deps: ["Payment gateway SDK", "Audit logging"], weight: 3 },
  checkout: { constraints: ["PCI DSS compliance required", "Cart state persistence"], deps: ["Payment gateway SDK", "Inventory service"], weight: 3 },
  data: { constraints: ["Input validation at boundary", "Error handling for malformed payloads"], deps: ["Schema validation library"], weight: 1 },
  api: { constraints: ["Rate limiting required", "Versioned endpoints", "Error responses follow RFC 7807"], deps: ["API gateway configuration"], weight: 2 },
  dashboard: { constraints: ["Viewport testing across breakpoints", "Accessible contrast ratios"], deps: ["Charting library", "Data aggregation service"], weight: 1 },
  ui: { constraints: ["WCAG 2.1 AA compliance", "Viewport testing 320px\u20131920px"], deps: ["Design system tokens"], weight: 1 },
  page: { constraints: ["LCP < 2.5s target", "Responsive layout required"], deps: ["Component library"], weight: 1 },
  search: { constraints: ["Query sanitization required", "Result pagination"], deps: ["Search index service"], weight: 2 },
  notification: { constraints: ["User preference opt-out", "Delivery retry logic"], deps: ["Notification service", "Queue infrastructure"], weight: 2 },
  upload: { constraints: ["File size limit enforcement", "Malware scanning"], deps: ["Object storage", "Antivirus service"], weight: 2 },
  realtime: { constraints: ["WebSocket fallback to SSE", "Connection recovery"], deps: ["WebSocket infrastructure"], weight: 3 },
  report: { constraints: ["Async generation for large datasets", "Export format support"], deps: ["Reporting engine", "Queue infrastructure"], weight: 2 },
};

function generateSpec(input: string): SpecResult {
  const lower = input.toLowerCase();
  const matchedConstraints: string[] = [];
  const matchedDeps: string[] = [];
  let totalWeight = 0;
  let matchCount = 0;

  for (const [keyword, config] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      matchCount++;
      totalWeight += config.weight;
      config.constraints.forEach((c) => {
        if (!matchedConstraints.includes(c)) matchedConstraints.push(c);
      });
      config.deps.forEach((d) => {
        if (!matchedDeps.includes(d)) matchedDeps.push(d);
      });
    }
  }

  if (matchedConstraints.length === 0) {
    matchedConstraints.push("Standard code review required", "Unit test coverage > 80%");
  }
  if (matchedDeps.length === 0) {
    matchedDeps.push("Existing codebase conventions", "CI/CD pipeline");
  }

  const complexity: "low" | "medium" | "high" =
    totalWeight >= 5 ? "high" : totalWeight >= 2 ? "medium" : "low";

  const routing =
    complexity === "low"
      ? "Fast-Track Agent"
      : complexity === "medium"
        ? "Standard Agent + QA Gate"
        : "Senior Agent + Human Review";

  const objective = input.charAt(0).toUpperCase() + input.slice(1) + (input.endsWith(".") ? "" : ".");

  const acceptanceCriteria = [
    `Feature delivers: ${input.toLowerCase()}`,
    "All acceptance tests pass on CI",
    "No regression in existing test suite",
    complexity === "high" ? "Security review sign-off required" : "Code review approved",
  ];

  return {
    objective,
    acceptanceCriteria,
    constraints: matchedConstraints.slice(0, 4),
    dependencies: matchedDeps.slice(0, 4),
    complexity,
    routing,
  };
}

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
