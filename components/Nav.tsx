"use client";

import { useCallback, useSyncExternalStore } from "react";

function getTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export default function Nav() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as const);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("middleleap-theme", next);
  }, [theme]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav>
      <a href="#" className="nav-logo" onClick={handleClick}>
        Middle<div className="nav-mark">&gt;&gt;</div><span>Leap</span>
      </a>
      <div className="nav-links">
        <a href="#problem" onClick={handleClick}>Manifesto</a>
        <a href="#mechanics" onClick={handleClick}>Mechanics</a>
        <a href="#roadmap" onClick={handleClick}>Roadmap</a>
        <a href="#lab" onClick={handleClick}>Lab</a>
        <a href="#toolkit" onClick={handleClick}>Toolkit</a>
      </div>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? "\u25D0" : "\u25D1"}
      </button>
      <a href="#cta" className="nav-cta" onClick={handleClick}>
        Get Started
      </a>
    </nav>
  );
}
