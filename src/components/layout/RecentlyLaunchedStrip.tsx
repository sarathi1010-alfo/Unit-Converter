import { Sparkles } from "lucide-react";

export function RecentlyLaunchedStrip() {
  const newTools = [
    { name: "Resume Forge", url: "#" },
    { name: "QR Generator", url: "#" },
    { name: "Palette Flow", url: "#" },
    { name: "Pack Fit", url: "#" },
  ];

  return (
    <div className="bg-primary/5 border-b border-primary/10 py-2 hidden sm:block">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-4 text-sm">
        <span className="flex items-center gap-1 font-semibold text-primary">
          <Sparkles className="w-4 h-4" /> 🆕 Just Launched:
        </span>
        <div className="flex items-center gap-4">
          {newTools.map((tool, index) => (
            <div key={tool.name} className="flex items-center gap-4">
              <a href={tool.url} className="text-slate-600 hover:text-primary transition-colors">
                {tool.name}
              </a>
              {index < newTools.length - 1 && <span className="text-slate-300">•</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
