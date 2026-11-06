import Link from 'next/link';
import { ArrowLeft, Compass, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | UnitFlow',
  description: 'The unit conversion tool, guide, or category you requested could not be found.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const popularCategories = [
    { label: 'Length Converter', href: '/category/length-converter' },
    { label: 'Weight & Mass Converter', href: '/category/weight-converter' },
    { label: 'Temperature Converter', href: '/category/temperature-converter' },
    { label: 'Volume Converter', href: '/category/volume-converter' },
    { label: 'Speed Converter', href: '/category/speed-converter' },
    { label: 'Area Converter', href: '/category/area-converter' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-2">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold tracking-wide uppercase text-primary">Error 404</p>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Page Not Found
        </h1>
        <p className="text-base text-slate-600 max-w-lg mx-auto">
          We couldn’t find the conversion tool or article you were looking for. It may have been moved, renamed, or consolidated.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>
        <Link
          href="/blog"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Search className="w-4 h-4" />
          Explore Guides & Blog
        </Link>
      </div>

      <div className="pt-8 border-t border-slate-200 text-left">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 text-center">
          Popular Conversion Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 hover:text-primary hover:border-primary/40 transition-colors text-sm font-medium flex items-center justify-between"
            >
              <span>{cat.label}</span>
              <span className="text-slate-400">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
