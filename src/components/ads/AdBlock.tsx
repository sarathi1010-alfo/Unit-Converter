export function AdBlock({
  type,
}: {
  type: "leaderboard" | "rectangle" | "in-content" | "footer";
}) {
  // Mock AdSense sizes based on the blueprint
  const sizes = {
    leaderboard: "w-full max-w-[728px] h-[90px] md:h-[90px] max-md:max-w-[320px] max-md:h-[50px]",
    rectangle: "w-[300px] h-[250px]",
    "in-content": "w-[336px] h-[280px]",
    footer: "w-full max-w-[728px] h-[90px]",
  };

  return (
    <div className={`my-8 mx-auto bg-slate-100 flex items-center justify-center text-slate-400 text-sm border border-slate-200 border-dashed rounded-lg ${sizes[type]}`}>
      <span>AdSense Placeholder ({type})</span>
    </div>
  );
}
