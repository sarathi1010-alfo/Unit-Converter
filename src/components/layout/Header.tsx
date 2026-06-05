import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <ArrowRightLeft className="w-6 h-6" />
          UnitConverter
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/category/length" className="hover:text-primary transition-colors">Length</Link>
          <Link href="/category/weight" className="hover:text-primary transition-colors">Weight</Link>
          <Link href="/category/temperature" className="hover:text-primary transition-colors">Temperature</Link>
        </nav>
      </div>
    </header>
  );
}