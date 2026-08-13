"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type ReactNode } from "react";
import { breadcrumbList, type Breadcrumb } from "@/lib/structured-data";
import { BrandLockup } from "./BrandLockup";
import { JsonLd } from "./JsonLd";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteChrome.module.css";

type NavSection = "what" | "method" | "ventures" | "practice";

export type ContextLink = {
  href: Route;
  label: string;
  current?: boolean;
};

type SiteHeaderProps = {
  active?: NavSection;
  breadcrumbs?: Breadcrumb[];
  contextLabel?: string;
  contextLinks?: ContextLink[];
  home?: boolean;
};

type GlobalNavChild = {
  href: Route;
  label: string;
  description: string;
};

type GlobalNavItem = {
  section: NavSection;
  label: string;
  href?: Route;
  children?: GlobalNavChild[];
};

type ChildNavState = {
  active: boolean;
  current?: "page" | "location";
};

const portfolioDetailPaths = new Set([
  "/ventures/backoffice",
  "/ventures/hivemind",
  "/ventures/parqo",
]);

function HeaderLink({
  href,
  children,
  current,
  active,
  className,
  onClick,
}: {
  href: Route;
  children: ReactNode;
  current?: "page" | "location";
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  if (href.startsWith("#")) {
    return <a className={className} href={href} aria-current={current} data-active={active || undefined} onClick={onClick}>{children}</a>;
  }

  return <Link className={className} href={href} aria-current={current} data-active={active || undefined} onClick={onClick}>{children}</Link>;
}

export function SiteHeader({
  active,
  breadcrumbs = [],
  contextLabel,
  contextLinks = [],
  home = false,
}: SiteHeaderProps) {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const globalNavRef = useRef<HTMLElement>(null);
  const openNavReasonRef = useRef<"hover" | "click" | null>(null);
  const [activeContextHref, setActiveContextHref] = useState("");
  const [activeHomeSection, setActiveHomeSection] = useState<NavSection | null>(null);
  const [openNavSection, setOpenNavSection] = useState<NavSection | null>(null);
  const pathname = usePathname();
  const prefix = home ? "" : "/";
  const breadcrumbSchema = breadcrumbList(breadcrumbs);
  const globalNav: GlobalNavItem[] = [
    {
      label: "What we do",
      section: "what",
      children: [
        {
          href: `${prefix}#expertise`,
          label: "Capabilities overview",
          description: "The four capabilities that connect mandate to execution.",
        },
        {
          href: "/open-finance",
          label: "Open Finance",
          description: "Market position, propositions, platforms and operating models.",
        },
      ],
    },
    {
      label: "How we work",
      section: "method",
      children: [
        {
          href: `${prefix}#method`,
          label: "Our approach",
          description: "Frame, design, mobilise, deliver and codify.",
        },
        {
          href: "/how-we-engage",
          label: "Engagement models",
          description: "Executive advisory, strategy sprint and mobilisation.",
        },
        {
          href: "/the-loom",
          label: "The Loom",
          description: "Governed discovery, delivery and operational learning.",
        },
        {
          href: "/ai-dlc",
          label: "The Loom Toolkit",
          description: "The installable system for institutional AI delivery.",
        },
      ],
    },
    { href: "/practice", label: "The practice", section: "practice" },
    {
      label: "Ventures",
      section: "ventures",
      children: [
        {
          href: "/ventures",
          label: "Ventures overview",
          description: "How working assets return evidence to the practice.",
        },
        {
          href: "/ventures#portfolio",
          label: "Portfolio",
          description: "Regulated proof and venture experiments.",
        },
        {
          href: "/ventures/studio",
          label: "Venture Studio",
          description: "Bring us a problem worth building around.",
        },
      ],
    },
  ];
  const effectiveActive = active ?? activeHomeSection ?? undefined;

  const childNavState = (item: GlobalNavItem, child: GlobalNavChild): ChildNavState => {
    const [targetPathPart, targetFragmentPart] = child.href.split("#");
    const targetPath = targetPathPart || pathname;
    const targetHash = targetFragmentPart ? `#${targetFragmentPart}` : "";
    const homeSectionHash = item.section === "what" ? "#expertise" : item.section === "method" ? "#method" : "";

    if (home && targetHash && targetHash === homeSectionHash) {
      const isCurrentSection = activeHomeSection === item.section;
      return { active: isCurrentSection, current: isCurrentSection ? "location" : undefined };
    }

    if (targetPath === pathname) {
      if (targetHash) {
        const isCurrentLocation = activeContextHref === targetHash;
        return { active: isCurrentLocation, current: isCurrentLocation ? "location" : undefined };
      }

      const hasCurrentAnchorSibling = item.children?.some((sibling) => {
        const [siblingPath, siblingFragment] = sibling.href.split("#");
        return siblingPath === pathname && Boolean(siblingFragment) && activeContextHref === `#${siblingFragment}`;
      });
      return hasCurrentAnchorSibling ? { active: false } : { active: true, current: "page" };
    }

    if (item.section === "ventures" && child.label === "Portfolio" && portfolioDetailPaths.has(pathname)) {
      return { active: true };
    }

    if (child.label === "Venture Studio" && pathname === "/venture-submission-terms") {
      return { active: true };
    }

    return { active: false };
  };
  const closeMobileMenu = () => {
    if (!mobileMenuRef.current) return;

    mobileMenuRef.current
      .querySelectorAll<HTMLDetailsElement>("details[open]")
      .forEach((details) => { details.open = false; });
    mobileMenuRef.current.open = false;
  };

  const closeDesktopMenu = (restoreFocus = false) => {
    const section = openNavSection;
    openNavReasonRef.current = null;
    setOpenNavSection(null);
    if (!restoreFocus || !section) return;

    window.requestAnimationFrame(() => {
      globalNavRef.current
        ?.querySelector<HTMLButtonElement>(`button[data-section="${section}"]`)
        ?.focus();
    });
  };

  const handleNavGroupBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      openNavReasonRef.current = null;
      setOpenNavSection(null);
    }
  };

  const openDesktopMenuFromHover = (section: NavSection) => {
    if (openNavSection === section && openNavReasonRef.current === "click") return;
    openNavReasonRef.current = "hover";
    setOpenNavSection(section);
  };

  const closeDesktopMenuFromHover = () => {
    if (openNavReasonRef.current !== "hover") return;
    openNavReasonRef.current = null;
    setOpenNavSection(null);
  };

  const toggleDesktopMenu = (section: NavSection) => {
    if (openNavSection === section && openNavReasonRef.current === "click") {
      closeDesktopMenu();
      return;
    }

    openNavReasonRef.current = "click";
    setOpenNavSection(section);
  };

  const handleMobileMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !mobileMenuRef.current?.open) return;
    event.preventDefault();
    closeMobileMenu();
    mobileMenuRef.current.querySelector<HTMLElement>(":scope > summary")?.focus();
  };

  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return;

      const target = document.querySelector(window.location.hash);
      if (!target) return;

      target.scrollIntoView({ block: "start" });
    };
    const scheduleHashScroll = () => {
      scrollToHash();
      window.requestAnimationFrame(scrollToHash);
    };
    const settleTimer = window.setTimeout(scrollToHash, 350);

    scheduleHashScroll();
    document.fonts?.ready.then(scrollToHash);
    window.addEventListener("load", scrollToHash);
    window.addEventListener("resize", scheduleHashScroll);
    window.addEventListener("hashchange", scheduleHashScroll);
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("load", scrollToHash);
      window.removeEventListener("resize", scheduleHashScroll);
      window.removeEventListener("hashchange", scheduleHashScroll);
    };
  }, []);

  useEffect(() => {
    if (!home) return;

    const targets: Array<{ section: NavSection; element: Element | null }> = [
      { section: "what", element: document.querySelector("#expertise") },
      { section: "method", element: document.querySelector("#method") },
    ];
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const visibleThreshold = 180;
      const current = targets.find(({ element }) => {
        if (!element) return false;
        const bounds = element.getBoundingClientRect();
        return bounds.top <= visibleThreshold && bounds.bottom > visibleThreshold;
      });
      setActiveHomeSection(current?.section ?? null);
    };
    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [home]);

  useEffect(() => {
    if (!openNavSection) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!globalNavRef.current?.contains(event.target as Node)) {
        openNavReasonRef.current = null;
        setOpenNavSection(null);
      }
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      const section = openNavSection;
      openNavReasonRef.current = null;
      setOpenNavSection(null);
      window.requestAnimationFrame(() => {
        globalNavRef.current
          ?.querySelector<HTMLButtonElement>(`button[data-section="${section}"]`)
          ?.focus();
      });
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openNavSection]);

  // Pages pass contextLinks as inline array literals, so key the effect on the
  // hrefs themselves rather than the (unstable) array identity.
  const localContextHrefs = contextLinks
    .filter((link) => link.href.startsWith("#"))
    .map((link) => link.href)
    .join(" ");

  useEffect(() => {
    if (!localContextHrefs) return;

    const targets = localContextHrefs
      .split(" ")
      .map((href) => ({ href, element: document.querySelector(href) }))
      .filter((entry): entry is { href: string; element: Element } => entry.element !== null);
    if (targets.length === 0) return;

    let frame = 0;
    const updateActiveContext = () => {
      frame = 0;
      const visibleThreshold = 180;
      let activeHref = "";

      for (const target of targets) {
        if (target.element.getBoundingClientRect().top <= visibleThreshold) {
          activeHref = target.href;
        }
      }

      setActiveContextHref(activeHref);
    };
    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateActiveContext);
    };

    updateActiveContext();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [localContextHrefs]);

  return (
    <div className={styles.headerWrap}>
      {/*
        Generated from the same `breadcrumbs` array rendered visibly below, so the
        markup and the trail a user sees cannot drift. Kept outside `.utilityRow`
        (a two-column grid) so it can never become a grid item.
      */}
      {breadcrumbSchema && <JsonLd node={breadcrumbSchema} />}
      <header className={styles.header}>
        <BrandLockup />
        <nav
          className={styles.globalNav}
          aria-label="Primary navigation"
          ref={globalNavRef}
        >
          {globalNav.map((item) => item.children ? (
            <div
              className={styles.navGroup}
              data-open={openNavSection === item.section || undefined}
              key={item.section}
              onMouseEnter={() => openDesktopMenuFromHover(item.section)}
              onMouseLeave={closeDesktopMenuFromHover}
              onBlur={handleNavGroupBlur}
            >
              <button
                className={styles.navTrigger}
                type="button"
                aria-expanded={openNavSection === item.section}
                aria-controls={`nav-panel-${item.section}`}
                data-active={effectiveActive === item.section || undefined}
                data-section={item.section}
                onClick={() => toggleDesktopMenu(item.section)}
              >
                {item.label}
                <span aria-hidden="true" className={styles.navChevron}>⌄</span>
              </button>
              <div
                className={styles.navPanel}
                id={`nav-panel-${item.section}`}
                hidden={openNavSection !== item.section}
              >
                <div className={styles.navPanelHeader}>
                  <span>{item.label}</span>
                  <b>{String(item.children.length).padStart(2, "0")} destinations</b>
                </div>
                <div className={styles.navPanelLinks}>
                  {item.children.map((child, index) => {
                    const childState = childNavState(item, child);
                    return (
                      <HeaderLink
                        active={childState.active}
                        className={styles.navPanelLink}
                        current={childState.current}
                        href={child.href}
                        key={child.href}
                        onClick={() => closeDesktopMenu()}
                      >
                        <span aria-hidden="true">0{index + 1}</span>
                        <span>
                          <strong>{child.label}</strong>
                          <small>{child.description}</small>
                        </span>
                      </HeaderLink>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <HeaderLink
              className={styles.globalNavLink}
              key={item.section}
              href={item.href!}
              current={effectiveActive === item.section ? "page" : undefined}
              active={effectiveActive === item.section}
            >
              {item.label}
            </HeaderLink>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <HeaderLink className={styles.cta} href={`${prefix}#engage`}>Discuss a mandate</HeaderLink>
          <ThemeToggle />
        </div>

        <details className={styles.mobileMenu} ref={mobileMenuRef}>
          <summary onKeyDown={handleMobileMenuKeyDown}>Menu</summary>
          <nav className={styles.mobileLinks} aria-label="Mobile navigation">
            {globalNav.map((item) => item.children ? (
              <details className={styles.mobileNavGroup} key={item.section}>
                <summary data-active={effectiveActive === item.section || undefined}>
                  <span>{item.label}</span>
                  <i aria-hidden="true">+</i>
                </summary>
                <div className={styles.mobileSubLinks}>
                  {item.children.map((child, index) => {
                    const childState = childNavState(item, child);
                    return (
                      <HeaderLink
                        active={childState.active}
                        current={childState.current}
                        href={child.href}
                        key={child.href}
                        onClick={closeMobileMenu}
                      >
                        <span aria-hidden="true">0{index + 1}</span>
                        {child.label}
                      </HeaderLink>
                    );
                  })}
                </div>
              </details>
            ) : (
              <HeaderLink
                key={item.section}
                href={item.href!}
                current={effectiveActive === item.section ? "page" : undefined}
                active={effectiveActive === item.section}
                onClick={closeMobileMenu}
              >
                {item.label}
              </HeaderLink>
            ))}
            <HeaderLink href={`${prefix}#engage`} onClick={closeMobileMenu}>Discuss a mandate</HeaderLink>
            {breadcrumbs.length > 0 && (
              <>
                <span className={styles.mobileContextLabel}>You are here</span>
                <div className={styles.mobileBreadcrumbs}>
                  {breadcrumbs.map((crumb, index) => (
                    <span key={`${crumb.label}-${index}`}>
                      {index > 0 && <i aria-hidden="true">/</i>}
                      {crumb.href ? <Link href={crumb.href} onClick={closeMobileMenu}>{crumb.label}</Link> : <b>{crumb.label}</b>}
                    </span>
                  ))}
                </div>
              </>
            )}
            {contextLinks.length > 0 && <span className={styles.mobileContextLabel}>On this page</span>}
            {contextLinks.map((link) => (
              <HeaderLink
                key={link.href}
                href={link.href}
                current={link.current || link.href === activeContextHref ? "location" : undefined}
                onClick={() => {
                  if (link.href.startsWith("#")) setActiveContextHref(link.href);
                  closeMobileMenu();
                }}
              >
                {link.label}
              </HeaderLink>
            ))}
          </nav>
        </details>
      </header>

      {(breadcrumbs.length > 0 || contextLinks.length > 0) && (
        <div className={styles.utilityRow}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`}>
                {index > 0 && <i aria-hidden="true">/</i>}{" "}
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
              </span>
            ))}
          </nav>
          {contextLinks.length > 0 && (
            <nav className={styles.contextNav} aria-label={contextLabel ?? "On this page"}>
              {contextLinks.map((link) => (
                <HeaderLink
                  key={link.href}
                  href={link.href}
                  current={link.current || link.href === activeContextHref ? "location" : undefined}
                >
                  {link.label}
                </HeaderLink>
              ))}
            </nav>
          )}
        </div>
      )}
    </div>
  );
}
