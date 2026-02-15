"use client";

import { useEffect, useRef, useState } from "react";

const feeds = [
  "agent-07 committed to steering-files-library \u00b7 3m ago",
  "spec-validator passed gate #412 \u00b7 8m ago",
  "steering file codified from engagement \u00b7 22m ago",
  "control-tower: 14 agents active \u00b7 31m ago",
  "ai-dlc-toolkit v2.1.0 released \u00b7 1h ago",
  "knowledge-plane: 847 files indexed \u00b7 2h ago",
];

export default function StatusBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % feeds.length);
        setVisible(true);
      }, 250);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="statusbar">
      <div className="feed">
        <div className="feed-dot" />
        <span
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity .25s",
          }}
        >
          {feeds[index]}
        </span>
      </div>
      <div className="sys">
        <span>
          CPU: <span className="sig-val">OK</span>
        </span>
        <span>
          MEM: <span className="sig-val">OK</span>
        </span>
        <span>V 3.0</span>
      </div>
    </div>
  );
}
