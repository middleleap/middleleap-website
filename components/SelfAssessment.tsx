"use client";

import { useState, useCallback } from "react";

interface Question {
  text: string;
  options: string[];
}

interface StageResult {
  name: string;
  gap: string;
  action: string;
}

const questions: Question[] = [
  {
    text: "How do your engineers currently use AI tools?",
    options: [
      "Individually, ad-hoc \u2014 whatever each person prefers",
      "Some team standards and shared prompts exist",
      "Connected to internal knowledge bases and systems",
      "Autonomous agents handle routine tasks end-to-end",
    ],
  },
  {
    text: "What happens to knowledge gained from AI-assisted tasks?",
    options: [
      "Nothing \u2014 it stays in the session and disappears",
      "Sometimes captured in templates or shared docs",
      "Systematically encoded in steering files and knowledge graphs",
      "Automatically compounds \u2014 each task makes the next one smarter",
    ],
  },
  {
    text: "How is AI-generated output reviewed before production?",
    options: [
      "Standard code review \u2014 same as human-written code",
      "Template-based review with AI-specific checklists",
      "Automated quality gates with human review for exceptions",
      "Risk-based routing \u2014 low-risk auto-approved, high-risk escalated",
    ],
  },
  {
    text: "Who decides how AI is used in your engineering process?",
    options: [
      "Individual developers make their own choices",
      "Team leads or a designated AI champion",
      "A dedicated platform team with clear standards",
      "Organizational policy with automated enforcement",
    ],
  },
  {
    text: "How would you describe leadership\u2019s relationship with AI?",
    options: [
      "\u201CLet engineers figure it out\u201D",
      "\u201CWe\u2019re standardizing and piloting\u201D",
      "\u201CPart of our platform strategy\u201D",
      "\u201CIt\u2019s how we organize work\u201D",
    ],
  },
];

const stageResults: Record<number, StageResult> = {
  1: {
    name: "AI-Assisted",
    gap: "No organizational integration \u2014 knowledge doesn\u2019t compound. Every AI session starts from zero.",
    action:
      "Pilot specification-first delivery on one team for one sprint. Measure what changes when agents work against contracts, not vibes.",
  },
  2: {
    name: "Templates & Scaffolds",
    gap: "Knowledge capture is inconsistent \u2014 agents lack institutional context. You\u2019re standardizing but not compounding.",
    action:
      "Systematize steering files and connect agents to your knowledge systems. Make institutional memory machine-readable.",
  },
  3: {
    name: "System Knowledge Plane",
    gap: "Agents still require significant human oversight on routine decisions. You have the knowledge layer but not the autonomy layer.",
    action:
      "Implement risk-based routing to auto-approve low-risk agent output. Free your engineers to focus on high-judgment decisions.",
  },
  4: {
    name: "Agent Factory",
    gap: "You\u2019re at the frontier \u2014 the challenge is now scaling and governance across the fleet.",
    action:
      "Optimize fleet economics and expand autonomous coverage across domains. The 20\u00d7 company is within reach.",
  },
};

function computeStage(answers: number[]): number {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const a of answers) {
    counts[a]++;
  }
  let maxCount = 0;
  let result = 1;
  // Iterate 1-4; on ties, lower stage wins (checked first)
  for (let stage = 1; stage <= 4; stage++) {
    if (counts[stage] > maxCount) {
      maxCount = counts[stage];
      result = stage;
    }
  }
  return result;
}

export default function SelfAssessment() {
  const [step, setStep] = useState(0); // 0 = intro, 1-5 = questions
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    setStep(1);
    setAnswers([]);
    setResult(null);
    setSelected(null);
  }, []);

  const handleSelect = useCallback(
    (stage: number) => {
      setSelected(stage);
      const newAnswers = [...answers, stage];

      setTimeout(() => {
        setAnswers(newAnswers);
        setSelected(null);

        if (step >= 5) {
          setResult(computeStage(newAnswers));
          setStep(0);
        } else {
          setStep(step + 1);
        }
      }, 300);
    },
    [answers, step]
  );

  const handleRestart = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setSelected(null);
  }, []);

  // Result state
  if (result !== null) {
    const stage = stageResults[result];
    return (
      <div className="assess-result rv vis">
        <div className="assess-result-label">Your maturity stage</div>
        <div className="assess-result-header">
          <div className="assess-result-stage">{result}</div>
          <div className="assess-result-name">
            Stage {result} &mdash; {stage.name}
          </div>
        </div>

        <div className="assess-result-gap">
          <div className="assess-result-gap-label">Key gap</div>
          <div className="assess-result-gap-text">{stage.gap}</div>
        </div>

        <div className="assess-result-action-label">Recommended next step</div>
        <div className="assess-result-action">{stage.action}</div>

        <div>
          <a href="#cta" className="assess-cta">
            Schedule a diagnostic session &rarr;
          </a>
          <button className="assess-restart" onClick={handleRestart}>
            Retake assessment
          </button>
        </div>
      </div>
    );
  }

  // Intro state
  if (step === 0) {
    return (
      <div className="assess-intro rv vis">
        <div className="assess-intro-label">Self-Assessment</div>
        <div className="assess-intro-title">Find your stage</div>
        <div className="assess-intro-desc">
          Five questions. Two minutes. Discover where your organization sits on
          the AI-DLC maturity model &mdash; and what it takes to reach the next
          stage.
        </div>
        <button className="assess-start" onClick={handleStart}>
          Start assessment &rarr;
        </button>
      </div>
    );
  }

  // Question state
  const question = questions[step - 1];
  const progress = ((step - 1) / 5) * 100;

  return (
    <div className="assess-quiz">
      <div className="assess-progress">
        <div className="assess-step-label">
          Question {step} of 5
        </div>
        <div className="assess-progress-bar">
          <div
            className="assess-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="assess-question">{question.text}</div>

      <div className="assess-options">
        {question.options.map((option, i) => {
          const stage = i + 1;
          return (
            <button
              key={i}
              className={`assess-option${selected === stage ? " selected" : ""}`}
              onClick={() => selected === null && handleSelect(stage)}
              disabled={selected !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
