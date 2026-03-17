import { useState } from "react";
import type { Product } from "../store/useScanStore";

export const statusConfig = {
  halal: {
    label: "Halal",
    icon: "✓",
    badge: "bg-green-50 border-green-200",
    iconBg: "bg-green-500",
    iconRing: "ring-green-100",
    label_color: "text-green-600",
    bullet: "bg-green-400",
  },
  haram: {
    label: "Haram",
    icon: "✕",
    badge: "bg-red-50 border-red-200",
    iconBg: "bg-red-500",
    iconRing: "ring-red-100",
    label_color: "text-red-600",
    bullet: "bg-red-400",
  },
  doubtful: {
    label: "Doubtful",
    icon: "?",
    badge: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-400",
    iconRing: "ring-amber-100",
    label_color: "text-amber-500",
    bullet: "bg-amber-400",
  },
  unknown: {
    label: "Unknown",
    icon: "–",
    badge: "bg-slate-50 border-slate-200",
    iconBg: "bg-slate-400",
    iconRing: "ring-slate-100",
    label_color: "text-slate-500",
    bullet: "bg-slate-300",
  },
};

const ProductCard = ({ product }: { product: Product }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const s = statusConfig[product.halalStatus] ?? statusConfig.unknown;

  return (
    <div className="px-8 py-4">
      <div className="w-full md:w-105 bg-green-100 rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
        <div className="px-7 pt-7 pb-5 border-b border-stone-200">
          <div className="flex items-center justify-between gap-1.5 mb-3">
            <div>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              <span className="text-xs font-extralight tracking-widest uppercase text-stone-600 font-sans">
                Source <span className="font-bold">{product.source}</span>
              </span>
            </div>
            <p className="text-xs  text-stone-700">
              Scanned
              <span className="font-extrabold mx-1">{product.scanCount}</span>
              times
            </p>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 leading-snug wrap-break-word font-serif">
            {product.name}
          </h2>
          {product.brand && (
            <p className="text-sm text-stone-900 font-sans">{product.brand}</p>
          )}
          <p className="text-xs tracking-widest text-stone-600 mt-2 ">
            {product.barcode}
          </p>
        </div>

        <div
          className={`px-3 py-5 flex items-center gap-5 border-b border-stone-200 ${s.badge} border-0 border-b`}
        >
          <div className="flex items-center gap-3 flex-1">
            <div
              className={`w-11 h-11 rounded-full ${s.iconBg} ring-8 ${s.iconRing} flex items-center justify-center text-white font-bold text-lg shrink-0 font-sans`}
            >
              {s.icon}
            </div>
            <div>
              <p
                className={`text-xl font-bold ${s.label_color} leading-none mb-0.5 font-serif`}
              >
                {s.label}
              </p>
              <p className="text-[11px] text-stone-600 tracking-wide font-sans uppercase">
                Halal Status
              </p>
            </div>
          </div>
        </div>

        <div className="px-7 py-5 border-b border-stone-200">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
            Analysis
          </p>
          {product.analysisReasons.length > 0 ? (
            <ul className="space-y-2.5">
              {product.analysisReasons.map((reason, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[13px] text-stone-700 leading-relaxed font-sans"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${s.bullet} shrink-0 mt-1.5 opacity-70`}
                  />
                  {reason}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-light text-sm text-gray-700">
              No analysis available for this scan.
            </p>
          )}
        </div>
        {product.reasonExplanation.length > 0 ? (
          <div className="px-7 py-5 border-b border-stone-200">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
              Explanation
            </p>
            <ul className="space-y-2.5">
              {product.reasonExplanation.map((explanation, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[13px] text-stone-700 leading-relaxed font-sans"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${s.bullet} shrink-0 mt-1.5 opacity-70`}
                  />
                  {explanation}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="px-7 py-5 border-b border-stone-200">
            <h1 className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
              Explanation
            </h1>
            <p className="font-light text-sm text-gray-700">
              No explanation available for this scan.
            </p>
          </div>
        )}

        <button
          onClick={() => setShowIngredients(!showIngredients)}
          className="w-full px-7 py-3.5 flex items-center justify-between text-[12px] font-medium text-stone-600 hover:bg-stone-100 transition-colors border-b border-stone-200 font-sans"
        >
          <span>Ingredients ({product.ingredientsList.length})</span>
          <span
            className={`text-stone-400 text-[10px] transition-transform duration-200 ${showIngredients ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>

        {showIngredients && (
          <div className="px-7 py-4 flex flex-wrap gap-1.5 border-b border-stone-200">
            {product.ingredientsList.map((ing, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-full bg-stone-200 text-stone-600 font-sans"
              >
                {ing}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
