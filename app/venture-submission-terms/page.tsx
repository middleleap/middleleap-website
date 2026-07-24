import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "../legal.module.css";

export const metadata: Metadata = { title: "Venture Submission Terms", alternates: { canonical: "/venture-submission-terms" } };

export default function VentureSubmissionTermsPage() {
  return (
    <main className={styles.shell} id="problem">
      <SiteHeader
        active="ventures"
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/ventures", label: "Ventures" },
          { href: "/ventures/studio", label: "Venture Studio" },
          { label: "Submission terms" },
        ]}
      />
      <article className={styles.content}>
        <p className={styles.eyebrow}>Venture Studio</p>
        <h1>Submission terms.</h1>
        <p className={styles.updated}>Version effective 18 July 2026</p>
        <section><h2>Do not submit confidential information</h2><p>Initial venture submissions must be non-confidential. MiddleLeap cannot agree to confidentiality obligations merely by receiving or reviewing a submission. If confidential discussion becomes appropriate, the parties can agree suitable terms before that information is shared.</p></section>
        <section><h2>No obligation is created</h2><p>A submission does not create an advisory, investment, employment, partnership, fiduciary or other business relationship. MiddleLeap is not obliged to review, respond to, develop, fund or proceed with a proposal.</p></section>
        <section><h2>Your authority</h2><p>You confirm that you are entitled to provide the submitted material and that doing so does not breach another person&apos;s rights or your contractual, professional or legal obligations.</p></section>
        <section><h2>Ownership and limited assessment permission</h2><p>You retain ownership of material you submit. You give MiddleLeap a non-exclusive, worldwide and royalty-free permission to copy, review and share that material internally or with professional advisers solely to assess the proposal, conduct conflict and fit checks, contact you and decide whether further discussion is appropriate. This permission does not transfer ownership of your proposal to MiddleLeap.</p></section>
        <section><h2>Similar ideas may exist</h2><p>MiddleLeap may already be considering, advising on or developing ideas, technologies or propositions that resemble a submission. Receiving a proposal does not restrict that existing or future activity, provided MiddleLeap does not use protected material beyond the limited assessment permission above.</p></section>
        <section><h2>Personal information</h2><p>Contact details and other personal information in a proposal are handled as described in the <Link href="/privacy">Privacy Notice</Link>. Do not include another person&apos;s personal information unless you are entitled to provide it for this purpose.</p></section>
        <section><h2>Acceptance record</h2><p>The Venture Studio proposal tool adds the applicable terms version and preparation time to the proposal email. Keep a copy of the email for your records. If you do not agree to these terms, do not send the proposal.</p></section>
        <section><h2>Before submitting</h2><p>If your proposal depends on protected intellectual property, regulatory restrictions or confidential commercial information, obtain your own professional advice before sending an initial brief.</p></section>
      </article>
      <SiteFooter />
    </main>
  );
}
