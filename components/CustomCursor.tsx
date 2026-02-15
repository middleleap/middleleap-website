"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const interactiveSelector = "a,button,input,.tk-badge,.repo,.sig-card";
    const onEnter = () => ring.classList.add("active");
    const onLeave = () => ring.classList.remove("active");

    const elements = document.querySelectorAll(interactiveSelector);
    elements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cur-dot" ref={dotRef} />
      <div className="cur-ring" ref={ringRef} />
    </>
  );
}
