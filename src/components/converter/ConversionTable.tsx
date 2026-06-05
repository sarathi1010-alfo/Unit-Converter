import { convert, formatConversionResult, type CategoryId, getUnitsForCategory } from "@/lib/conversion";

interface ConversionTableProps {
  categoryId: CategoryId;
  from: string;
  to: string;
  values?: number[];
}

export function ConversionTable({
  categoryId,
  from,
  to,
  values = [1, 5, 10, 25, 50, 100, 500, 1000]
}: ConversionTableProps) {
  const units = getUnitsForCategory(categoryId);
  const fromUnit = units[from];
  const toUnit = units[to];

  if (!fromUnit || !toUnit) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-slate-50 border-b border-slate-200 font-medium text-slate-700 rounded-tl-xl">
              {fromUnit.name} ({fromUnit.symbol})
            </th>
            <th className="py-3 px-4 bg-slate-50 border-b border-slate-200 font-medium text-slate-700 rounded-tr-xl">
              {toUnit.name} ({toUnit.symbol})
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {values.map((val) => {
            const result = convert(val, from, to, categoryId);
            return (
              <tr key={val} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="py-3 px-4 text-slate-600">
                  {val.toLocaleString()} {fromUnit.symbol}
                </td>
                <td className="py-3 px-4 font-medium text-slate-900">
                  {formatConversionResult(result)} {toUnit.symbol}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}