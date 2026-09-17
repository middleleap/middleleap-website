"use client";

import { useState } from "react";
import styles from "./LoomMark.module.css";

/*
  The pivot mark drawing the Loom.

  A settled bone square leaps 45° into an ember diamond (Discovery), a second
  pivot at its tip opens Delivery, warp threads run level into operation, and a
  single ember thread returns beneath both diamonds to the square (feedback).

  All motion lives in LoomMark.module.css on one 14s cycle; every element's
  base style is the finished loop, so `prefers-reduced-motion` simply shows the
  closed loop with every label lit.
*/

const SIZE = 64;
const HALF = SIZE / 2;
const RADIUS = SIZE * 0.16; // --r-mark: pivot glyphs only
const HALF_DIAGONAL = Math.SQRT1_2 * SIZE;
const Y = 140;

const SQUARE_X = 72;
const DISCOVERY_X = 196;
const GATE_X = DISCOVERY_X + HALF_DIAGONAL;
const DELIVERY_X = GATE_X + HALF_DIAGONAL;
const RUN_START_X = DELIVERY_X + HALF_DIAGONAL;
const RUN_END_X = 600;
const RETURN_Y = Y + 96;

const THREADS = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;

type Point = readonly [number, number];

const distance = (a: Point, b: Point) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const fixed = (value: number) => value.toFixed(2);

function thread(k: number) {
  const points: Point[] = [
    [SQUARE_X + HALF, Y + k * 3],
    [DISCOVERY_X, Y + k * 9],
    [GATE_X, Y],
    [DELIVERY_X, Y + k * 9],
    [RUN_START_X, Y],
    [RUN_END_X, Y + k * 5],
  ];

  const discovery = distance(points[0], points[1]) + distance(points[1], points[2]);
  const delivery = distance(points[2], points[3]) + distance(points[3], points[4]);
  const run = distance(points[4], points[5]);
  const total = discovery + delivery + run;

  return {
    d: points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${fixed(x)} ${fixed(y)}`).join(" "),
    // stroke-dashoffset (pathLength=100) at the end of Discovery and of Delivery
    afterDiscovery: fixed(100 - (100 * discovery) / total),
    afterDelivery: fixed((100 * run) / total),
  };
}

const threads = THREADS.map((k) => ({ k, ...thread(k) }));

const feedbackPath = [
  `M ${fixed(RUN_START_X)} ${Y}`,
  `L ${fixed(RUN_START_X)} ${RETURN_Y}`,
  `L ${SQUARE_X} ${RETURN_Y}`,
  `L ${SQUARE_X} ${Y + HALF}`,
].join(" ");

const beats = [
  { className: "beatDiscovery", number: "01", title: "Discovery", detail: "Diverge on evidence, converge on one problem." },
  { className: "beatGate", number: "02", title: "Gate", detail: "One gate-green hand-off into delivery." },
  { className: "beatDelivery", number: "03", title: "Delivery", detail: "Develop solutions, deliver under control." },
  { className: "beatRun", number: "04", title: "Run", detail: "Deploy, observe, triage in operation." },
  { className: "beatFeedback", number: "05", title: "Feedback", detail: "Signal returns to discovery as evidence." },
] as const;

export function LoomMark() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`${styles.loom} ${paused ? styles.paused : ""}`}
      role="group"
      aria-label="The Loom: a strategic mandate pivots into discovery, passes one gate into delivery, runs in operation, and returns signal to discovery"
    >
      <div className={styles.header}>
        <span>The Loom / closed loop</span>
        <button
          type="button"
          className={styles.pause}
          aria-pressed={paused}
          onClick={() => setPaused((state) => !state)}
        >
          {paused ? "Resume loop" : "Pause loop"}
        </button>
      </div>

      <svg
        className={styles.field}
        viewBox="0 70 640 190"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="loom-ember" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F0722E" />
            <stop offset="1" stopColor="#CE451B" />
          </linearGradient>
        </defs>

        <rect
          className={styles.square}
          x={SQUARE_X - HALF}
          y={Y - HALF}
          width={SIZE}
          height={SIZE}
          rx={RADIUS}
        />

        <g className={styles.discovery}>
          <rect x={-HALF} y={-HALF} width={SIZE} height={SIZE} rx={RADIUS} fill="url(#loom-ember)" />
        </g>
        <g className={styles.delivery}>
          <rect x={-HALF} y={-HALF} width={SIZE} height={SIZE} rx={RADIUS} fill="url(#loom-ember)" />
        </g>

        {threads.map(({ k, d, afterDiscovery, afterDelivery }) => (
          <path
            key={k}
            className={styles.thread}
            d={d}
            pathLength={100}
            style={{ "--after-discovery": afterDiscovery, "--after-delivery": afterDelivery } as React.CSSProperties}
          />
        ))}

        <path className={styles.feedback} d={feedbackPath} pathLength={100} />
      </svg>

      <ol className={styles.beats}>
        {beats.map((beat) => (
          <li key={beat.className} className={styles[beat.className]}>
            <b aria-hidden="true" />
            <span>{beat.number}</span>
            <strong>{beat.title}</strong>
          </li>
        ))}
      </ol>

      <div className={styles.output}>
        <span>Closed loop</span>
        <p>
          {beats.map((beat) => (
            <em key={beat.className} className={styles[beat.className]}>{beat.detail}</em>
          ))}
        </p>
      </div>
    </div>
  );
}
