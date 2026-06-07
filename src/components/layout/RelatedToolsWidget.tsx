import { ArrowRight } from "lucide-react";

export function RelatedToolsWidget() {
  // Mock data for the ecosystem tools based on the prompt
  const tools = [
    {
      name: "Resume Forge",
      description: "Create professional resumes instantly.",
      url: "#",
      tag: "productivity",
    },
    {
      name: "PDF Utility",
      description: "Compress, merge, and split PDFs.",
      url: "#",
      tag: "document",
    },
    {
      name: "Palette Flow",
      description: "Generate and export beautiful brand colors.",
      url: "#",
      tag: "design",
    },
    {
      name: "QR Generator",
      description: "Create free custom QR codes.",
      url: "#",
      tag: "marketing",
    },
  ];

  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">You might also need:</h2>
        <a href="#" className="text-sm font-medium text-primary hover:underline hidden sm:block">
          View all tools →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
                {tool.tag}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-slate-500 mb-6">{tool.description}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              Try it out <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
