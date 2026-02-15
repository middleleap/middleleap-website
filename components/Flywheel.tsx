"use client";

import { useEffect, useRef } from "react";

export default function Flywheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fc = canvasRef.current;
    const wrap = wrapRef.current;
    if (!fc || !wrap) return;
    const fx = fc.getContext("2d");
    if (!fx) return;

    function resize() {
      fc!.width = fc!.parentElement!.offsetWidth;
      fc!.height = 240;
    }
    resize();
    window.addEventListener("resize", resize);

    const fLabels = ["SPEC", "PLAN", "AGENT", "CODE", "TEST", "STEER", "RULE", "KNOW"];
    let ft = 0;
    let animId: number;
    let inViewport = false;
    let tabVisible = true;
    let lastFrame = 0;
    const frameInterval = 1000 / 30; // 30fps

    const drawF = (now: number) => {
      if (!inViewport || !tabVisible) return;
      animId = requestAnimationFrame(drawF);

      const delta = now - lastFrame;
      if (delta < frameInterval) return;
      lastFrame = now - (delta % frameInterval);

      fx!.clearRect(0, 0, fc!.width, fc!.height);
      ft += 0.006;
      const cxf = fc!.width / 2;
      const cyf = fc!.height / 2;
      const r = Math.min(cxf, cyf) * 0.72;

      fx!.beginPath();
      fx!.arc(cxf, cyf, r, 0, 6.28);
      fx!.strokeStyle = "rgba(42,42,42,.6)";
      fx!.lineWidth = 0.5;
      fx!.stroke();

      const nodes = fLabels.map((l, i) => {
        const a = (i / fLabels.length) * 6.28 - 1.57 + ft;
        const x = cxf + Math.cos(a) * r;
        const y = cyf + Math.sin(a) * r;
        const o = 0.35 + Math.sin(ft * 2 + i) * 0.15;

        fx!.beginPath();
        fx!.moveTo(cxf, cyf);
        fx!.lineTo(x, y);
        fx!.strokeStyle = `rgba(224,90,43,${o * 0.25})`;
        fx!.lineWidth = 0.4;
        fx!.stroke();

        fx!.beginPath();
        fx!.arc(x, y, 3.5, 0, 6.28);
        fx!.fillStyle = `rgba(224,90,43,${o})`;
        fx!.fill();

        fx!.font = "500 9px JetBrains Mono";
        fx!.fillStyle = `rgba(212,212,207,${o * 0.8})`;
        fx!.textAlign = "center";
        fx!.fillText(l, x, y - 9);
        return { x, y };
      });

      for (let i = 0; i < nodes.length; i++) {
        const j = (i + 3) % nodes.length;
        fx!.beginPath();
        fx!.moveTo(nodes[i].x, nodes[i].y);
        fx!.lineTo(nodes[j].x, nodes[j].y);
        fx!.strokeStyle = `rgba(224,90,43,${0.04 + Math.sin(ft + i) * 0.02})`;
        fx!.lineWidth = 0.3;
        fx!.stroke();
      }

      const cp = 2.5 + Math.sin(ft * 3) * 0.5;
      fx!.beginPath();
      fx!.arc(cxf, cyf, cp, 0, 6.28);
      fx!.fillStyle = "rgba(224,90,43,.5)";
      fx!.fill();
    };

    const startLoop = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(drawF);
    };

    // Pause when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport && tabVisible) startLoop();
      },
      { threshold: 0 }
    );
    observer.observe(wrap);

    // Pause when tab is hidden
    const onVisibilityChange = () => {
      tabVisible = !document.hidden;
      if (inViewport && tabVisible) startLoop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="flywheel-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} id="flywheelCanvas" />
    </div>
  );
}
