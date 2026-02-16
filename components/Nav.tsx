"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("middleleap-theme");
    if (stored === "light") setTheme("light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("middleleap-theme", next);
  };

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
