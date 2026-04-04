import { statusConfig } from "../Data";
import type { IngredientProduct } from "../store/useScanStore";

const IngredientScanCard = ({
  ingredientProduct,
}: {
  ingredientProduct: IngredientProduct;
}) => {
  const s = statusConfig[ingredientProduct.halalStatus] ?? statusConfig.unknown;

  return (
    <div className="px-8 py-4">
      <div className="w-full md:w-105 bg-green-100 rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
        <div className="px-7 pt-7 pb-5 border-b border-stone-200">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            <span className="text-xs font-extralight tracking-widest uppercase text-stone-400 font-sans">
              Source {ingredientProduct.source}
            </span>
          </div>
          <h2
            className="text-2xl font-bold text-stone-900 leading-snug wrap-break-word"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {ingredientProduct.ingredientsText}
          </h2>
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
                className={`text-xl font-bold ${s.label_color} leading-none mb-0.5`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {s.label}
              </p>
              <p className="text-[11px] text-stone-400 tracking-wide font-sans uppercase">
                Halal Status
              </p>
            </div>
          </div>
        </div>

        <div className="px-7 py-5 border-b border-stone-200">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
            Analysis
          </p>
          <ul className="space-y-2.5">
            {ingredientProduct.analysisReasons.map((reason, i) => (
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
        </div>
        {ingredientProduct.reasonExplanation.length > 0 ? (
          <div className="px-7 py-5 border-b border-stone-200">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-3 font-sans">
              Explanation
            </p>
            <ul className="space-y-2.5">
              {ingredientProduct.reasonExplanation.map((explanation, i) => (
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
            <p className="font-light text-sm text-gray-400">
              No explanation for this scan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientScanCard;
