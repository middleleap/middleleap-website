"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { BrandLockup } from "./BrandLockup";
import styles from "./SiteChrome.module.css";

type NavSection = "what" | "method" | "ventures" | "experience";

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
  const prefix = home ? "" : "/";
  const globalLinks: Array<{ href: string; label: string; section: NavSection }> = [
    { href: `${prefix}#expertise`, label: "What we do", section: "what" },
    { href: `${prefix}#method`, label: "How we work", section: "method" },
    { href: "/ventures", label: "Ventures", section: "ventures" },
    { href: `${prefix}#experience`, label: "Experience", section: "experience" },
  ];
  const closeMobileMenu = () => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
  };

  return (
    <div className={styles.headerWrap}>
      <header className={styles.header}>
        <BrandLockup priority={priority} />
        <nav className={styles.globalNav} aria-label="Primary navigation">
          {globalLinks.map((link) => (
            <HeaderLink
              key={link.section}
              href={link.href}
              active={active === link.section}
            >
              {link.label}
            </HeaderLink>
          ))}
        </nav>
        <HeaderLink className={styles.cta} href={`${prefix}#engage`}>Discuss a mandate</HeaderLink>

        <details className={styles.mobileMenu} ref={mobileMenuRef}>
          <summary>Menu</summary>
          <nav className={styles.mobileLinks} aria-label="Mobile navigation">
            {globalLinks.map((link) => (
              <HeaderLink key={link.section} href={link.href} onClick={closeMobileMenu}>{link.label}</HeaderLink>
            ))}
            <HeaderLink href={`${prefix}#engage`} onClick={closeMobileMenu}>Discuss a mandate</HeaderLink>
            {contextLinks.length > 0 && <span className={styles.mobileContextLabel}>On this page</span>}
            {contextLinks.map((link) => (
              <HeaderLink key={link.href} href={link.href} onClick={closeMobileMenu}>{link.label}</HeaderLink>
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
                current={link.current ? "location" : undefined}
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
