"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandLockup } from "./BrandLockup";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteChrome.module.css";

type NavSection = "advisory" | "intelligence" | "open-finance" | "ventures";

export type ContextLink = {
  href: string;
  label: string;
  current?: boolean;
};

type Breadcrumb = {
  href?: string;
  label: string;
};

type SiteHeaderProps = {
  active?: NavSection;
  breadcrumbs?: Breadcrumb[];
  contextLabel?: string;
  contextLinks?: ContextLink[];
  home?: boolean;
  priority?: boolean;
};

function HeaderLink({
  href,
  children,
  current,
  active,
  className,
  onClick,
}: {
  href: string;
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
  priority = false,
}: SiteHeaderProps) {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const [activeContextHref, setActiveContextHref] = useState("");
  const prefix = home ? "" : "/";
  const globalLinks: Array<{ href: string; label: string; section: NavSection }> = [
    { href: home ? "#expertise" : "/#expertise", label: "Advisory", section: "advisory" },
    { href: "/institutional-intelligence", label: "Institutional Intelligence", section: "intelligence" },
    { href: "/open-finance", label: "Open Finance", section: "open-finance" },
    { href: "/ventures", label: "Ventures", section: "ventures" },
  ];
  const closeMobileMenu = () => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
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
    const localLinks = contextLinks.filter((link) => link.href.startsWith("#"));
    if (localLinks.length === 0) return;

    const updateActiveContext = () => {
      const visibleThreshold = 180;
      let activeHref = "";

      for (const link of localLinks) {
        const target = document.querySelector(link.href);
        if (target && target.getBoundingClientRect().top <= visibleThreshold) {
          activeHref = link.href;
        }
      }

      setActiveContextHref(activeHref);
    };

    updateActiveContext();
    window.addEventListener("scroll", updateActiveContext, { passive: true });
    window.addEventListener("hashchange", updateActiveContext);
    return () => {
      window.removeEventListener("scroll", updateActiveContext);
      window.removeEventListener("hashchange", updateActiveContext);
    };
  }, [contextLinks]);

  return (
    <div className={styles.headerWrap}>
      <header className={styles.header}>
        <BrandLockup priority={priority} />
        <nav className={styles.globalNav} aria-label="Primary navigation">
          {globalLinks.map((link) => (
            <HeaderLink
              key={link.section}
              href={link.href}
              current={active === link.section ? "location" : undefined}
              active={active === link.section}
            >
              {link.label}
            </HeaderLink>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <HeaderLink className={styles.cta} href={`${prefix}#engage`}>Discuss a mandate</HeaderLink>
          <ThemeToggle />
        </div>

        <details className={styles.mobileMenu} ref={mobileMenuRef}>
          <summary>Menu</summary>
          <nav className={styles.mobileLinks} aria-label="Mobile navigation">
            {globalLinks.map((link) => (
              <HeaderLink
                key={link.section}
                href={link.href}
                current={active === link.section ? "location" : undefined}
                active={active === link.section}
                onClick={closeMobileMenu}
              >
                {link.label}
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
