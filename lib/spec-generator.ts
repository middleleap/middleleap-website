export interface SpecResult {
  objective: string;
  acceptanceCriteria: string[];
  constraints: string[];
  dependencies: string[];
  complexity: "low" | "medium" | "high";
  routing: string;
}

export const KEYWORD_MAP: Record<string, { constraints: string[]; deps: string[]; weight: number }> = {
  auth: { constraints: ["Session management must follow OWASP guidelines", "Token expiry < 15 minutes"], deps: ["Identity provider integration"], weight: 2 },
  login: { constraints: ["Brute-force protection required", "MFA support path"], deps: ["Auth service", "Rate limiter"], weight: 2 },
  payment: { constraints: ["PCI DSS compliance required", "Idempotent transactions"], deps: ["Payment gateway SDK", "Audit logging"], weight: 3 },
  checkout: { constraints: ["PCI DSS compliance required", "Cart state persistence"], deps: ["Payment gateway SDK", "Inventory service"], weight: 3 },
  data: { constraints: ["Input validation at boundary", "Error handling for malformed payloads"], deps: ["Schema validation library"], weight: 1 },
  api: { constraints: ["Rate limiting required", "Versioned endpoints", "Error responses follow RFC 7807"], deps: ["API gateway configuration"], weight: 2 },
  dashboard: { constraints: ["Viewport testing across breakpoints", "Accessible contrast ratios"], deps: ["Charting library", "Data aggregation service"], weight: 1 },
  ui: { constraints: ["WCAG 2.1 AA compliance", "Viewport testing 320px–1920px"], deps: ["Design system tokens"], weight: 1 },
  page: { constraints: ["LCP < 2.5s target", "Responsive layout required"], deps: ["Component library"], weight: 1 },
  search: { constraints: ["Query sanitization required", "Result pagination"], deps: ["Search index service"], weight: 2 },
  notification: { constraints: ["User preference opt-out", "Delivery retry logic"], deps: ["Notification service", "Queue infrastructure"], weight: 2 },
  upload: { constraints: ["File size limit enforcement", "Malware scanning"], deps: ["Object storage", "Antivirus service"], weight: 2 },
  realtime: { constraints: ["WebSocket fallback to SSE", "Connection recovery"], deps: ["WebSocket infrastructure"], weight: 3 },
  report: { constraints: ["Async generation for large datasets", "Export format support"], deps: ["Reporting engine", "Queue infrastructure"], weight: 2 },
};

export function generateSpec(input: string): SpecResult {
  const lower = input.toLowerCase();
  const matchedConstraints: string[] = [];
  const matchedDeps: string[] = [];
  let totalWeight = 0;

  for (const [keyword, config] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
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
