import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | UnitConverter",
  description: "Terms and conditions for using UnitConverter.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900">Terms and Conditions</h1>
      <div className="prose prose-slate">
        <p>These are the terms and conditions for UnitConverter. By using this tool, you agree to these terms.</p>
        <p>The calculations provided on this site are for informational purposes only. We do not guarantee accuracy, and the tool should not be used for critical engineering or medical decisions.</p>
      </div>
    </div>
  );
}
