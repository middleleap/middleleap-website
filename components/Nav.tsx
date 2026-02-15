"use client";

export default function Nav() {
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
        <div className="nav-mark">&gt;&gt;</div>
        Middle<span>Leap</span>
      </a>
      <div className="nav-links">
        <a href="#problem" onClick={handleClick}>Manifesto</a>
        <a href="#mechanics" onClick={handleClick}>Mechanics</a>
        <a href="#roadmap" onClick={handleClick}>Roadmap</a>
        <a href="#lab" onClick={handleClick}>Lab</a>
        <a href="#toolkit" onClick={handleClick}>Toolkit</a>
      </div>
      <a href="#cta" className="nav-cta" onClick={handleClick}>
        Get Started
      </a>
    </nav>
  );
}
