import { Bot } from "lucide-react";

interface AICitationBlockProps {
  summary: string;
  keyPoints?: string[];
  entityFocus?: string;
}

export function AICitationBlock({
  summary,
  keyPoints,
  entityFocus,
}: AICitationBlockProps) {
  return (
    <section
      className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-8"
      aria-label="Quick Summary"
      data-nosnippet="false"
    >
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-lg shrink-0 mt-0.5">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-1">
            Quick Answer
          </h2>
          <p className="text-slate-800 font-medium leading-relaxed">
            {summary}
          </p>

          {keyPoints && keyPoints.length > 0 && (
            <ul className="space-y-1.5 mt-3">
              {keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {entityFocus && (
            <div className="mt-4 text-xs text-slate-500 italic">
              Concept: <span className="font-semibold text-slate-600">{entityFocus}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
