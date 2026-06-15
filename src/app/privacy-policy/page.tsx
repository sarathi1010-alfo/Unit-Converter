import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UnitConverter",
  description: "Privacy policy for UnitConverter.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
      <div className="prose prose-slate">
        <p>This is the privacy policy for UnitConverter. We take your privacy seriously and only collect essential analytics.</p>
        <p>We use standard analytics tools to improve the user experience. All conversions are calculated locally in your browser and are not transmitted to any server.</p>
      </div>
    </div>
  );
}
