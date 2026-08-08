"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  const [activeContextHref, setActiveContextHref] = useState("");
  const prefix = home ? "" : "/";
  const breadcrumbSchema = breadcrumbList(breadcrumbs);
  const globalLinks: Array<{ href: Route; label: string; section: NavSection }> = [
    { href: `${prefix}#expertise`, label: "What we do", section: "what" },
    { href: `${prefix}#method`, label: "How we work", section: "method" },
    { href: "/practice", label: "The practice", section: "practice" },
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
        </div>
      )}
    </div>
  );
}
