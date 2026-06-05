import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedLink {
  href: string;
  label: string;
}

export function RelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all group"
        >
          <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">
            {link.label}
          </span>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
        </Link>
      ))}
    </div>
  );
}