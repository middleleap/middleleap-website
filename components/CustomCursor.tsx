"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      setIsTouchDevice(true);
      document.body.style.cursor = "auto";
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };

    document.addEventListener("mousemove", onMouseMove);

    let animId: number;
    let lastRing = 0;
    const ringInterval = 1000 / 30;
    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      if (now - lastRing < ringInterval) return;
      lastRing = now;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
    };
    animId = requestAnimationFrame(animate);

    // Use event delegation instead of per-element listeners + MutationObserver
    const interactiveSelector = "a,button,input,.tk-badge,.repo,.sig-card";
    const onOver = (e: Event) => {
      const target = e.target as Element;
      if (target.closest?.(interactiveSelector)) {
        ring.classList.add("active");
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as Element;
      if (target.closest?.(interactiveSelector)) {
        ring.classList.remove("active");
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div className="cur-dot" ref={dotRef} />
      <div className="cur-ring" ref={ringRef} />
    </>
  );
}
