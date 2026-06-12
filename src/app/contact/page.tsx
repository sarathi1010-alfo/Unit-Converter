import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | UnitConverter",
  description: "Contact the UnitConverter team.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900">Contact Us</h1>
      <div className="prose prose-slate">
        <p>Have questions, suggestions, or found an issue with a conversion?</p>
        <p>Email us at: support@unitconverter.com</p>
      </div>
    </div>
  );
}
