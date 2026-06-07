import { CheckCircle2, ShieldCheck, Clock } from "lucide-react";

interface TrustReinforcementProps {
  lastUpdated?: string;
  methodology?: string;
  reviewedBy?: string;
  accuracyGuarantee?: boolean;
}

export function TrustReinforcement({
  lastUpdated = new Date().toISOString().split('T')[0],
  methodology = "Calculated using standard international conversion factors.",
  reviewedBy = "UnitConverter Engineering Team",
  accuracyGuarantee = true,
}: TrustReinforcementProps) {
  return (
    <section className="bg-slate-50 rounded-xl border border-slate-200 p-6 mt-8 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-slate-900">Trust & Accuracy</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
        <div className="space-y-2">
          {accuracyGuarantee && (
             <div className="flex items-start gap-2">
               <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
               <p><strong>Accuracy Guarantee:</strong> All conversions are verified against standardized NIST and SI unit definitions.</p>
             </div>
          )}
          <div className="flex items-start gap-2">
             <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
             <p><strong>Last Updated:</strong> {lastUpdated}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
             <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center mt-0.5 shrink-0">
               <span className="text-[10px] font-bold text-slate-600">M</span>
             </div>
             <p><strong>Methodology:</strong> {methodology}</p>
          </div>
          <div className="flex items-start gap-2">
             <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center mt-0.5 shrink-0">
               <span className="text-[10px] font-bold text-slate-600">R</span>
             </div>
             <p><strong>Reviewed By:</strong> {reviewedBy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
