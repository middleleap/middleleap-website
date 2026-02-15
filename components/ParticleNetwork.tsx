"use client";

import { useEffect, useRef } from "react";

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    if (!cx) return;

    function resize() {
      cv!.width = innerWidth;
      cv!.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * document.documentElement.scrollHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3,
    }));

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    let animId: number;
    let visible = true;
    let lastFrame = 0;
    const frameInterval = 1000 / 30; // 30fps

    const draw = (now: number) => {
      if (!visible) return;
      animId = requestAnimationFrame(draw);

      const delta = now - lastFrame;
      if (delta < frameInterval) return;
      lastFrame = now - (delta % frameInterval);

      cx!.clearRect(0, 0, cv!.width, cv!.height);
      const vt = scrollY;
      const vb = scrollY + innerHeight;

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > cv!.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv!.height) p.vy *= -1;
        if (p.y > vt - 200 && p.y < vb + 200) {
          cx!.beginPath();
          cx!.arc(p.x, p.y, p.r, 0, 6.28);
          cx!.fillStyle = "rgba(224,90,43,.12)";
          cx!.fill();
        }
      });

      for (let i = 0; i < pts.length; i++) {
        if (pts[i].y < vt - 200 || pts[i].y > vb + 200) continue;
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            cx!.beginPath();
            cx!.moveTo(pts[i].x, pts[i].y);
            cx!.lineTo(pts[j].x, pts[j].y);
            cx!.strokeStyle = `rgba(224,90,43,${0.04 * (1 - d / 140)})`;
            cx!.lineWidth = 0.5;
            cx!.stroke();
          }
        }
      }
    };
    animId = requestAnimationFrame(draw);

    // Pause animation when tab is not visible
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
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="bgCanvas" />;
}
