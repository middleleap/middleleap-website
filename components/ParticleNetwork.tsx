"use client";

import { useEffect, useRef } from "react";

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    if (!cx) return;

    // Canvas sized to viewport only (fixed position), not full scroll height
    function resize() {
      cv!.width = innerWidth;
      cv!.height = innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Particles move within viewport-sized space
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
    }));

    let animId: number;
    let visible = true;
    let lastFrame = 0;
    const frameInterval = 1000 / 30;

    const draw = (now: number) => {
      if (!visible) return;
      animId = requestAnimationFrame(draw);

      const delta = now - lastFrame;
      if (delta < frameInterval) return;
      lastFrame = now - (delta % frameInterval);

      // Read theme colors once per frame
      const styles = getComputedStyle(document.documentElement);
      const particleFill = styles.getPropertyValue("--particle-fill").trim() || "rgba(224,90,43,.12)";
      const particleRgb = styles.getPropertyValue("--particle-rgb").trim() || "224, 90, 43";

      cx!.clearRect(0, 0, cv!.width, cv!.height);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > cv!.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv!.height) p.vy *= -1;

        cx!.beginPath();
        cx!.arc(p.x, p.y, p.r, 0, 6.28);
        cx!.fillStyle = particleFill;
        cx!.fill();
      }

      // Batch line drawing with single style set
      cx!.lineWidth = 0.5;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 19600) { // 140^2
            const d = Math.sqrt(d2);
            cx!.beginPath();
            cx!.moveTo(pts[i].x, pts[i].y);
            cx!.lineTo(pts[j].x, pts[j].y);
            cx!.strokeStyle = `rgba(${particleRgb},${0.04 * (1 - d / 140)})`;
            cx!.stroke();
          }
        }
      }
    };
    animId = requestAnimationFrame(draw);

    const onVisibilityChange = () => {
      if (document.hidden) {
        visible = false;
        cancelAnimationFrame(animId);
      } else {
        visible = true;
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="bgCanvas" />;
}
