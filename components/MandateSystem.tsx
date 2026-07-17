"use client";

import { useState } from "react";
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

  const current = dimensions[active];

  return (
    <div
      className={styles.mandateSystem}
      aria-label="Interactive view of a strategic mandate becoming a market-ready capability"
    >
      <div className={styles.systemHeader}>
        <span>Mandate model / 04</span>
        <span><i aria-hidden="true" /> Select a dimension</span>
      </div>

      <div className={styles.systemField}>
        <div className={styles.systemMandate}>
          <div className={styles.systemPivot} aria-hidden="true">
            <i />
            <b />
          </div>
          <div>
            <span>Strategic mandate</span>
            <strong>Turn market change into a governed platform position.</strong>
          </div>
        </div>

        <div className={styles.systemDimensions}>
          {dimensions.map((dimension, index) => (
            <button
              type="button"
              key={dimension.number}
              className={`${styles.systemNode} ${active === index ? styles.activeNode : ""}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <i aria-hidden="true" />
              <span>{dimension.number}</span>
              <strong>{dimension.title}</strong>
              <small>{dimension.detail}</small>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.systemOutput}>
        <span>Market-ready capability</span>
        <strong>{current.outcome}</strong>
        <b>{current.number}</b>
      </div>
    </div>
  );
}
