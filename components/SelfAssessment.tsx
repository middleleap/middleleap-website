"use client";

import { useState, useCallback } from "react";
import { questions, stageResults, computeStage } from "@/lib/self-assessment";

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
