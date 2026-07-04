"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { convert, formatConversionResult, getUnitsForCategory, type CategoryId } from "@/lib/conversion";
import { ArrowRightLeft, Copy, Check } from "lucide-react";

interface ConverterProps {
  initialCategoryId?: CategoryId;
  initialFrom?: string;
  initialTo?: string;
  initialValue?: number;
  isPairLocked?: boolean;
}

export function ConverterForm({
  initialCategoryId = "length",
  initialFrom = "cm",
  initialTo = "in",
  initialValue = 1,
  isPairLocked = false,
}: ConverterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categoryId, setCategoryId] = useState<CategoryId>(initialCategoryId);
  const [fromUnit, setFromUnit] = useState(initialFrom);
  const [toUnit, setToUnit] = useState(initialTo);
  const [copied, setCopied] = useState(false);

  const queryValue = searchParams.get("value");
  const [value, setValue] = useState(queryValue ? queryValue : initialValue.toString());

  const units = getUnitsForCategory(categoryId);
  const unitList = Object.values(units);

  useEffect(() => {
    if (isPairLocked && value !== initialValue.toString() && value !== "") {
      const params = new URLSearchParams(searchParams);
      params.set("value", value);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [value, isPairLocked, initialValue, router, searchParams]);

  const handleSwap = () => {
    if (isPairLocked) {
      router.push(`/convert/${toUnit}-to-${fromUnit}?value=${value}`);
    } else {
      setFromUnit(toUnit);
      setToUnit(fromUnit);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value as CategoryId;
    setCategoryId(newCat);
    const firstUnit = Object.keys(getUnitsForCategory(newCat))[0];
    const secondUnit = Object.keys(getUnitsForCategory(newCat))[1];
    setFromUnit(firstUnit);
    setToUnit(secondUnit);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const numValue = parseFloat(value);
  const isInvalid = isNaN(numValue) || value === "";
  const result = isInvalid ? 0 : convert(numValue, fromUnit, toUnit, categoryId);
  const formattedResult = formatConversionResult(result);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      {!isPairLocked && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={categoryId}
              onChange={handleCategoryChange}
              name="category"
              className="w-full sm:w-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="length">Length</option>
              <option value="weight">Weight</option>
              <option value="temperature">Temperature</option>
              <option value="volume">Volume</option>
              <option value="area">Area</option>
              <option value="speed">Speed</option>
              <option value="data">Digital Data</option>
              <option value="pressure">Pressure</option>
              <option value="currency">Currency</option>
              <option value="cooking">Cooking</option>
              <option value="clothing">Clothing & Shoes</option>
            </select>
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100"
            title="Copy link to this conversion"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      )}

      {isPairLocked && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100"
            title="Copy link to this conversion"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Input Side */}
        <div className="w-full flex-1">
          <div className="relative">
            <input
              type="number"
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full text-2xl p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="0"
            />
            <select
              value={fromUnit}
              name="from"
              onChange={(e) => {
                if (!isPairLocked) setFromUnit(e.target.value);
                else router.push(`/convert/${e.target.value}-to-${toUnit}?value=${value}`);
              }}
              disabled={isPairLocked}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm"
            >
              {unitList.map((u) => (
                <option key={u.id} value={u.id}>{u.symbol} - {u.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="p-3 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 hover:scale-105 transition-all focus:outline-none"
          aria-label="Swap units"
        >
          <ArrowRightLeft className="w-5 h-5 text-slate-500" />
        </button>

        {/* Output Side */}
        <div className="w-full flex-1">
          <div className="relative">
            <div
              data-testid="result-display"
              className="w-full text-2xl p-4 bg-primary/5 border border-primary/20 rounded-xl text-primary font-semibold truncate"
            >
              {isInvalid ? "0" : formattedResult}
            </div>
            <select
              value={toUnit}
              name="to"
              onChange={(e) => {
                if (!isPairLocked) setToUnit(e.target.value);
                else router.push(`/convert/${fromUnit}-to-${e.target.value}?value=${value}`);
              }}
              disabled={isPairLocked}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm"
            >
              {unitList.map((u) => (
                <option key={u.id} value={u.id}>{u.symbol} - {u.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
