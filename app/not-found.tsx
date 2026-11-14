import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { mailtoHref } from "@/lib/contact";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className={styles.shell} id="problem" tabIndex={-1}>
      <SiteHeader />
      <article className={styles.content}>
        <p className={styles.eyebrow}>Error 404</p>
        <h1>Page not found.</h1>
        <section>
          <h2>This address does not match a page on the site.</h2>
          <p>
            The page may have moved or the link may be mistyped. Start again from the{" "}
            <Link href="/">advisory homepage</Link>, or go straight to{" "}
            <Link href="/open-finance">Open Finance</Link>, <Link href="/the-loom">The Loom</Link>,{" "}
            <Link href="/ventures">Ventures</Link> or the <Link href="/founder">founder profile</Link>.
          </p>
          <p>
            If a link on this site brought you here, tell us at{" "}
            <a href={mailtoHref("Broken link on middleleap.com")}>contact@middleleap.com</a>.
          </p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
