alfo-ecosystem-standardization-10716047684776820565
export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Contact Us</h1>
      <p className="text-slate-600 mb-8">
        Have questions, feedback, or need help with a conversion? Reach out to us using the form below.
      </p>

      <form
        action="https://formspree.io/f/placeholder" // Replace with real Formspree endpoint when ready
        method="POST"
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="Your name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            required
            rows={5}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Send Message
        </button>
      </form>
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
jules-16680094041159827713-0e0fd200
    </div>
  );
}
