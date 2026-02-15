"use client";

import { useEffect, useRef } from "react";

interface StatItem {
  count: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
}

const stats: StatItem[] = [
  { count: 88, suffix: "%", label: "Modernization Reduction", desc: "Microsoft Platform Engineering" },
  { count: 46, prefix: "~", suffix: "m", label: "Saved Per Task", desc: "New engineer onboarding" },
  { count: 7000, suffix: "+", label: "Autonomous Incidents", desc: "SRE agent resolution" },
  { count: 280, suffix: "\u00d7", label: "Cost per Token Drop", desc: "18-month trajectory" },
];

export default function Results() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll<HTMLElement>("[data-count]").forEach((numEl) => {
              const target = Number(numEl.dataset.count);
              const prefix = numEl.dataset.prefix || "";
              const suffix = numEl.dataset.suffix || "";
              const duration = 1600;
              const start = performance.now();

              const animate = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const value = Math.floor(
                  (1 - Math.pow(1 - progress, 3)) * target
                );
                numEl.textContent =
                  prefix +
                  (value > 999 ? value.toLocaleString() : String(value)) +
                  suffix;
                if (progress < 1) requestAnimationFrame(animate);
              };
              requestAnimationFrame(animate);
            });
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return (
    <section id="results" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 07 — The Evidence"}</div>
        <h2 className="sec-title rv">
          The 20× company <em>isn&apos;t theory.</em>
        </h2>
        <div style={{ height: "2rem" }} />
        <div className="stats-grid rv rv-d1" id="statsGrid" ref={gridRef}>
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div
                className="stat-num"
                data-count={s.count}
                data-prefix={s.prefix || ""}
                data-suffix={s.suffix || ""}
              >
                {(s.prefix || "") + "0" + (s.suffix || "")}
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
