"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

const dimensions = [
  {
    number: "01",
    title: "Market position",
    detail: "Role in the value chain",
    outcome: "Clear strategic position",
  },
  {
    number: "02",
    title: "Platform model",
    detail: "Proposition, APIs, economics",
    outcome: "Investable platform model",
  },
  {
    number: "03",
    title: "Ecosystem",
    detail: "Partners and governance",
    outcome: "Aligned partner system",
  },
  {
    number: "04",
    title: "Operating model",
    detail: "People, controls, agents",
    outcome: "Governed execution model",
  },
];

export function MandateSystem() {
  const [active, setActive] = useState(0);
  const [isExploring, setIsExploring] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isExploring || reducedMotion) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % dimensions.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [isExploring, reducedMotion]);

  const current = dimensions[active];

  return (
    <div
      className={styles.mandateSystem}
      aria-label="Interactive view of a strategic mandate becoming a market-ready capability"
      onMouseLeave={() => setIsExploring(false)}
    >
      <div className={styles.systemHeader}>
        <span>Decision system / 04</span>
        <span><i aria-hidden="true" /> Explore the nodes</span>
      </div>

      <div className={styles.systemField}>
        <svg className={styles.systemConnections} viewBox="0 0 520 390" preserveAspectRatio="none" aria-hidden="true">
          <circle cx="260" cy="195" r="116" />
          <circle cx="260" cy="195" r="72" />
          <path className={active === 0 ? styles.activePath : ""} d="M260 195 C210 156 172 119 112 91" />
          <path className={active === 1 ? styles.activePath : ""} d="M260 195 C310 156 348 119 408 91" />
          <path className={active === 2 ? styles.activePath : ""} d="M260 195 C210 234 172 271 112 299" />
          <path className={active === 3 ? styles.activePath : ""} d="M260 195 C310 234 348 271 408 299" />
          {!reducedMotion && (
            <circle key={active} className={styles.systemSignal} r="3">
              <animateMotion
                dur="1.8s"
                repeatCount="indefinite"
                path={[
                  "M260 195 C210 156 172 119 112 91",
                  "M260 195 C310 156 348 119 408 91",
                  "M260 195 C210 234 172 271 112 299",
                  "M260 195 C310 234 348 271 408 299",
                ][active]}
              />
            </circle>
          )}
        </svg>

        <div className={styles.systemCore}>
          <span>Strategic mandate</span>
          <strong>Market shifts<br />into platform<br />advantage</strong>
          <small>Start here</small>
        </div>

        {dimensions.map((dimension, index) => (
          <button
            type="button"
            key={dimension.number}
            className={`${styles.systemNode} ${styles[`systemNode${index + 1}`]} ${active === index ? styles.activeNode : ""}`}
            aria-pressed={active === index}
            onClick={() => { setActive(index); setIsExploring(true); }}
            onMouseEnter={() => { setActive(index); setIsExploring(true); }}
            onFocus={() => { setActive(index); setIsExploring(true); }}
          >
            <span>{dimension.number}</span>
            <strong>{dimension.title}</strong>
            <small>{dimension.detail}</small>
          </button>
        ))}
      </div>

      <div className={styles.systemOutput}>
        <span>Market-ready capability</span>
        <strong>{current.outcome}</strong>
        <b>{current.number} →</b>
      </div>
    </div>
  );
}
