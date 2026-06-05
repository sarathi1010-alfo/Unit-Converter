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
          <span className="font-semibold text-slate-900 block mb-4">Categories</span>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/category/length" className="hover:text-primary">Length</Link></li>
            <li><Link href="/category/weight" className="hover:text-primary">Weight & Mass</Link></li>
            <li><Link href="/category/temperature" className="hover:text-primary">Temperature</Link></li>
          </ul>
        </div>
        <div>
          <span className="font-semibold text-slate-900 block mb-4">Popular Guides</span>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/convert/cm-to-inches" className="hover:text-primary">CM to Inches</Link></li>
            <li><Link href="/convert/kg-to-lbs" className="hover:text-primary">KG to LBS</Link></li>
            <li><Link href="/convert/c-to-f" className="hover:text-primary">Celsius to Fahrenheit</Link></li>
          </ul>
        </div>
        <div>
          <span className="font-semibold text-slate-900 block mb-4">Legal</span>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} UnitConverter. All rights reserved.
      </div>
    </footer>
  );
}