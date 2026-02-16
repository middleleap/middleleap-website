"use client";

import { useState, useEffect, useRef } from "react";

const SEQUENCE = [
  { text: "Loading SDLC", speed: 60 },
  { text: "...", speed: 300 },
  { text: " Error.", speed: 0, pause: 800, className: "tw-error" },
  { text: " Switching to AI-DLC", speed: 50 },
  { text: "...", speed: 200 },
  { text: " [OK]", speed: 0, pause: 0, className: "tw-ok" },
];

export default function HeroTypewriter() {
  const [segments, setSegments] = useState<{ text: string; className?: string }[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let cancelled = false;
    const builtSegments: { text: string; className?: string }[] = [];

    async function run() {
      // Initial pause
      await delay(600);

      for (const step of SEQUENCE) {
        if (cancelled) return;

        if (step.speed === 0) {
          // Instant reveal (with optional pause before)
          if (step.pause) await delay(step.pause);
          if (cancelled) return;
          builtSegments.push({ text: step.text, className: step.className });
          setSegments([...builtSegments]);
        } else {
          // Type character by character
          const currentIdx = builtSegments.length;
          builtSegments.push({ text: "", className: step.className });

          for (let i = 0; i < step.text.length; i++) {
            if (cancelled) return;
            builtSegments[currentIdx] = {
              text: step.text.slice(0, i + 1),
              className: step.className,
            };
            setSegments([...builtSegments]);
            await delay(step.speed + Math.random() * 40);
          }
        }
      }

      // Stop cursor blink after completion
      await delay(1500);
      if (!cancelled) setCursorVisible(false);
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="hero-typewriter" aria-label="Loading SDLC... Error. Switching to AI-DLC... OK">
      {segments.map((seg, i) => (
        <span key={i} className={seg.className || ""}>
          {seg.text}
        </span>
      ))}
      <span className={`tw-cursor${cursorVisible ? "" : " tw-cursor-hidden"}`} />
    </div>
  );
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
