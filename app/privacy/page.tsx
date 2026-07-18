import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "../legal.module.css";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <main className={styles.shell} id="problem">
      <SiteHeader breadcrumbs={[{ href: "/", label: "Advisory" }, { label: "Privacy" }]} />
      <article className={styles.content}>
        <p className={styles.eyebrow}>Company information</p>
        <h1>Privacy.</h1>
        <p className={styles.updated}>Effective 18 July 2026</p>
        <section>
          <h2>Who controls your information</h2>
          <p>MiddleLeap, based in Dubai, United Arab Emirates, operates this website and determines why and how personal information submitted through it is used. In that capacity, MiddleLeap is the data controller. Privacy questions and rights requests can be sent to <a href="mailto:contact@middleleap.com">contact@middleleap.com</a>.</p>
        </section>
        <section>
          <h2>Information we receive</h2>
          <p>MiddleLeap receives information that you choose to send by email or prepare through the Venture Studio, including your name, email address, professional background and the content of mandate or venture enquiries. The proposal tool prepares information locally on your device; MiddleLeap receives it only if you send the resulting email.</p>
          <p>Please do not send confidential, regulated, financial, health or other sensitive personal information through an initial enquiry.</p>
        </section>
        <section>
          <h2>Website measurement</h2>
          <p>The website may use privacy-oriented, cookieless analytics when configured. Measurement is limited to aggregate page, device and navigation information used to understand and protect the website. Venture proposal content is not sent to analytics.</p>
        </section>
        <section>
          <h2>Purposes and grounds for use</h2>
          <p>Information is used to assess and respond to your enquiry, take steps you request before a possible engagement or collaboration, conduct appropriate conflict and fit checks, maintain necessary business and legal records, and protect the website and its users. Where consent is required, you may withdraw it by contacting MiddleLeap. Information may also be processed where necessary to establish, exercise or defend legal rights or meet obligations under applicable law.</p>
        </section>
        <section>
          <h2>Recipients and international processing</h2>
          <p>Information is not sold. It may be shared only as necessary with email, hosting, security and business-operations providers, professional advisers, or public authorities where legally required. Some providers or advisers may process information outside the UAE. Where a cross-border transfer occurs, MiddleLeap will use the protections required by applicable UAE data-protection law and limit the information to what is necessary for the stated purpose.</p>
        </section>
        <section>
          <h2>Retention</h2>
          <p>Information is kept only while an enquiry or proposed relationship is being assessed and for any additional period reasonably required for legal obligations, dispute handling, security and appropriate business records. Retention is determined by the purpose, sensitivity, legal requirements and whether the information remains necessary. Information that is no longer required is deleted or anonymised.</p>
        </section>
        <section>
          <h2>Your rights</h2>
          <p>Subject to applicable law and its exceptions, you may ask to receive information about processing, access or transfer your personal information, correct inaccurate information, request erasure, restrict or stop processing, and object to relevant automated decisions. MiddleLeap does not use Venture Studio submissions for solely automated decisions with legal or similarly significant effects.</p>
          <p>Send a request from the email address connected with the information to <a href="mailto:contact@middleleap.com?subject=Privacy%20rights%20request">contact@middleleap.com</a>. MiddleLeap may need to verify your identity before acting. You may also have the right to complain to the UAE Data Office under the federal data-protection framework.</p>
        </section>
        <section>
          <h2>Security and related terms</h2>
          <p>MiddleLeap applies technical and organisational measures appropriate to the nature and risk of the information processed. No email or internet transmission is completely secure, which is why initial enquiries must remain non-confidential.</p>
          <p>Venture proposals are also governed by the <Link href="/venture-submission-terms">Venture Submission Terms</Link>.</p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
