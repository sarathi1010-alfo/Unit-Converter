import Link from "next/link";
import { ArrowRightLeft, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <ArrowRightLeft className="w-6 h-6" />
            UnitConverter
          </Link>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
            Powered by alfo.online
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1 hover:text-primary transition-colors">
              Related Tools <ChevronDown className="w-4 h-4" />
            </span>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="py-2 flex flex-col">
                <a href="#" className="px-4 py-2 hover:bg-slate-50 hover:text-primary">Resume Forge</a>
                <a href="#" className="px-4 py-2 hover:bg-slate-50 hover:text-primary">PDF Utility</a>
                <a href="#" className="px-4 py-2 hover:bg-slate-50 hover:text-primary">Palette Flow</a>
                <a href="#" className="px-4 py-2 hover:bg-slate-50 hover:text-primary">QR Generator</a>
                <a href="#" className="px-4 py-2 hover:bg-slate-50 hover:text-primary">EMI Calculator</a>
              </div>
            </div>
          </div>
          <Link href="/guides" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
}