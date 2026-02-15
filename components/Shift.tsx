"use client";

import { useEffect, useRef } from "react";

interface TimelineRow {
  stage: string;
  sdlcLabel: string;
  sdlcWidth: string;
  aidlcLabel: string;
  aidlcWidth: string;
  deadZones: { left: string; width: string }[];
}

const rows: TimelineRow[] = [
  {
    stage: "Business Case",
    sdlcLabel: "SDLC — 4 weeks",
    sdlcWidth: "100%",
    aidlcLabel: "AI-DLC — 4 hours",
    aidlcWidth: "6%",
    deadZones: [
      { left: "15%", width: "20%" },
      { left: "55%", width: "15%" },
      { left: "80%", width: "10%" },
    ],
  },
  {
    stage: "Prototype",
    sdlcLabel: "SDLC — 3 weeks",
    sdlcWidth: "75%",
    aidlcLabel: "AI-DLC — same day",
    aidlcWidth: "4%",
    deadZones: [
      { left: "10%", width: "25%" },
      { left: "60%", width: "15%" },
    ],
  },
  {
    stage: "Architecture",
    sdlcLabel: "SDLC — 2 weeks",
    sdlcWidth: "50%",
    aidlcLabel: "AI-DLC — 2 hours",
    aidlcWidth: "3%",
    deadZones: [{ left: "20%", width: "30%" }],
  },
  {
    stage: "Security",
    sdlcLabel: "SDLC — 1 week",
    sdlcWidth: "25%",
    aidlcLabel: "AI-DLC — at commit",
    aidlcWidth: "2%",
    deadZones: [{ left: "40%", width: "35%" }],
  },
  {
    stage: "Deployment",
    sdlcLabel: "SDLC — 2 weeks",
    sdlcWidth: "50%",
    aidlcLabel: "AI-DLC — auto-merge",
    aidlcWidth: "3%",
    deadZones: [
      { left: "5%", width: "20%" },
      { left: "50%", width: "25%" },
    ],
  },
];

export default function Shift() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("tl-animated");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return (
    <section id="shift" style={{ padding: "8rem 0" }}>
      <div className="container">
        <div className="sec-label rv">{"// 02 — The Shift"}</div>
        <h2 className="sec-title rv">SDLC → AI-DLC</h2>
        <p className="sec-desc rv rv-d1">
          The Adaptive Development Lifecycle doesn&apos;t speed up each step. It
          eliminates the wait between them. This is the operating model behind the
          20× company — and the red zones below are why you&apos;re stuck at 15%.
        </p>

        <div id="tlSection" className="rv rv-d2" ref={sectionRef}>
          {rows.map((row) => (
            <div className="tl-row" key={row.stage}>
              <div className="tl-stage">{row.stage}</div>
              <div className="tl-bars">
                <div className="tl-bar-wrap">
                  <div className="tl-bar-label">{row.sdlcLabel}</div>
                  <div className="tl-bar">
                    <div
                      className="tl-fill sdlc"
                      style={{ "--w": row.sdlcWidth } as React.CSSProperties}
                    />
                    {row.deadZones.map((dz, i) => (
                      <div
                        key={i}
                        className="tl-dead"
                        style={{ left: dz.left, width: dz.width }}
                      />
                    ))}
                  </div>
                </div>
                <div className="tl-bar-wrap">
                  <div className="tl-bar-label active">{row.aidlcLabel}</div>
                  <div className="tl-bar">
                    <div
                      className="tl-fill aidlc"
                      style={{ "--w": row.aidlcWidth } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rv rv-d3"
          style={{
            borderLeft: "2px solid var(--signal)",
            paddingLeft: "1.5rem",
            marginTop: "3rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
              fontSize: "1.8rem",
              color: "var(--paper)",
            }}
          >
            Weeks → Hours.
          </div>
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
              fontSize: "0.8rem",
              color: "var(--fog)",
              marginTop: "0.25rem",
            }}
          >
            This is how a 10-person team outproduces 200. Not by working harder —
            by eliminating the dead time between every step.
          </div>
        </div>
      </div>
    </section>
  );
}
