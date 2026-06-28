import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-20">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="font-bold text-lg text-slate-900 block mb-4">UnitConverter</span>
          <p className="text-slate-500 text-sm">
            Fast, visual, SEO-first unit converter that helps you compare and understand conversions instantly.
          </p>
        </div>
        <div>
          <span className="font-semibold text-slate-900 block mb-4">Tools Hub</span>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#" className="hover:text-primary">Resume Forge</a></li>
            <li><a href="#" className="hover:text-primary">PDF Utility</a></li>
            <li><a href="#" className="hover:text-primary">Palette Flow</a></li>
            <li><a href="#" className="hover:text-primary">QR Generator</a></li>
            <li><a href="#" className="hover:text-primary">EMI Calculator</a></li>
          </ul>
        </div>
        <div>
          <span className="font-semibold text-slate-900 block mb-4">Legal & About</span>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
          </ul>
        </div>
        <div>
          <span className="font-semibold text-slate-900 block mb-4">Social</span>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="https://twitter.com/alfo_online" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Twitter</a></li>
            <li><a href="https://github.com/alfo-online" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a></li>
            <li><a href="https://linkedin.com/company/alfo-online" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} alfo.online — All rights reserved
      </div>
    </footer>
  );
}