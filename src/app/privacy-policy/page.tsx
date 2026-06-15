import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UnitConverter",
  description: "Privacy policy for UnitConverter.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="prose prose-slate max-w-3xl mx-auto py-12">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last Updated: {currentDate}</p>

      <p>
        At UnitConverter (part of the alfo.online ecosystem), we take your privacy seriously.
        This Privacy Policy explains how we collect, use, disclose, and safeguard your
        information when you visit our website.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We do not collect any personal data directly through the use of our core conversion
        features. Our tools perform calculations entirely client-side.
      </p>

      <h2>2. Analytics and Tracking</h2>
      <p>
        We use Google Analytics (GA4) and Google AdSense to monitor website traffic and
        provide relevant advertising. These third-party services may use cookies and
        similar tracking technologies to collect information about your interaction with
        our website.
      </p>

      <h2>3. GDPR & CCPA Compliance</h2>
      <p>
        If you are a resident of the European Economic Area (EEA) or California, you have
        certain data protection rights. We aim to take reasonable steps to allow you to
        correct, amend, delete, or limit the use of your Personal Data.
      </p>

      <h2>4. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any
        changes by posting the new Privacy Policy on this page.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have questions or comments about this Privacy Policy, please contact us
        through our <a href="/contact">Contact Page</a>.
      </p>
    </article>
  );
}
