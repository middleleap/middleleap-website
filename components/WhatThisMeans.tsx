"use client";

import { useState } from "react";

interface Persona {
  id: string;
  label: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaText: string;
  ctaLink?: string;
}

const personas: Persona[] = [
  {
    id: "cto",
    label: "For the CTO",
    paragraphs: [
      "You\u2019ve already deployed Copilot. Your developers like it. Productivity is up \u2014 maybe 15%, maybe 20% on a good day. But your delivery cadence hasn\u2019t changed. Sprints are still two weeks. Release trains still run monthly. The bottleneck was never typing speed.",
      "The AI-DLC targets the 73% of your value stream that isn\u2019t code: the handoffs, the context switches, the approval queues, the \u201cwaiting for design\u201d blocks. Specification-first delivery means agents can\u2019t build the wrong thing fast \u2014 they operate against contracts, not vibes. Compounding engineering means every feature your team ships makes the next one cheaper to build, because steering files capture institutional knowledge that today lives in Slack threads and senior engineers\u2019 heads.",
      "Run the self-assessment to identify your maturity stage. Pilot specification-first delivery on one team for one sprint. Measure the gap between \u201cagent-assisted\u201d and \u201cagent-native.\u201d The difference is where MiddleLeap lives \u2014 and where the 20\u00d7 company begins.",
    ],
    ctaLabel: "Your first 30 days",
    ctaText:
      "Run the self-assessment to find your stage. Pilot spec-first delivery on one team. Measure the gap between agent-assisted and agent-native.",
    ctaLink: "#roadmap",
  },
  {
    id: "cpo",
    label: "For the CPO",
    paragraphs: [
      "Your roadmap is constrained by delivery capacity. You prioritize ruthlessly because building is expensive and slow. What if the constraint moved?",
      "AI-DLC doesn\u2019t just make your engineers faster \u2014 it changes the economics of experimentation. When a working prototype costs hours instead of sprints, you can test four hypotheses in the time it used to take to test one. Your portfolio strategy shifts from \u201cbig bets with long payback\u201d to \u201crapid validation with compounding learnings.\u201d Failed experiments become cheap. Winning experiments compound faster.",
      "Stakeholder demos go from quarterly to weekly. \u201cCan we build a quick prototype to test this?\u201d stops being a negotiation and starts being a default. Your product intuition gets faster feedback loops.",
    ],
    ctaLabel: "What changes for you",
    ctaText:
      "Demos go weekly. Prototyping becomes a default. Your product intuition gets faster feedback loops.",
  },
  {
    id: "cio",
    label: "For the CIO / CDO",
    paragraphs: [
      "\u201cAutonomous agents\u201d is either exciting or terrifying depending on the governance framework around it. MiddleLeap\u2019s methodology is built on the premise that agent velocity without agent governance is just faster chaos \u2014 a lesson from 20+ years building software inside banking and telco, where governance isn\u2019t optional.",
      "Every stage of the maturity model includes explicit governance gates. Specification-first delivery creates an auditable contract before any agent writes a line of code. The compounding engineering flywheel produces steering files that encode compliance rules, security policies, and architectural standards into machine-readable formats \u2014 meaning agents follow your governance framework by default, not by exception.",
      "Total cost of ownership at each maturity stage. Integration points with your existing ITSM and change management processes. The control framework for agent-generated output. The organizational change implications at each transition.",
    ],
    ctaLabel: "What you need to evaluate",
    ctaText:
      "TCO at each stage. ITSM integration points. The control framework for agent output. Organizational change at each transition.",
  },
];

export default function WhatThisMeans() {
  const [active, setActive] = useState(0);
  const persona = personas[active];

  return (
    <section id="whatthismeans" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 03 — What This Means For You"}</div>
        <h2 className="sec-title rv">
          Different roles.
          <br />
          <em>Same leap.</em>
        </h2>
        <p className="sec-desc rv rv-d1">
          The 20&times; company means something different for every seat at the
          table. Here&apos;s what changes for yours.
        </p>

        <div className="rv rv-d2">
          <div className="persona-tabs">
            {personas.map((p, i) => (
              <button
                key={p.id}
                className={`persona-tab${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="persona-card">
            {persona.paragraphs.map((text, i) => (
              <p className="persona-p" key={i}>
                {text}
              </p>
            ))}
            {persona.ctaLink ? (
              <a href={persona.ctaLink} className="persona-cta-box" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="persona-cta-label">{persona.ctaLabel}</div>
                {persona.ctaText}
              </a>
            ) : (
              <div className="persona-cta-box">
                <div className="persona-cta-label">{persona.ctaLabel}</div>
                {persona.ctaText}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
