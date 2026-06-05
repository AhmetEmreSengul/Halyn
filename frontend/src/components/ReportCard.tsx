import type { ProductReport } from "../store/useScanStore";

const statusConfig = {
  halal: {
    label: "Halal",
    icon: "✓",
    iconBg: "bg-green-500",
    iconRing: "ring-green-200",
    sectionBg: "bg-green-50",
    textColor: "text-green-800",
  },
  haram: {
    label: "Haram",
    icon: "✕",
    iconBg: "bg-red-500",
    iconRing: "ring-red-200",
    sectionBg: "bg-red-50",
    textColor: "text-red-800",
  },
  doubtful: {
    label: "Doubtful",
    icon: "?",
    iconBg: "bg-amber-500",
    iconRing: "ring-amber-200",
    sectionBg: "bg-amber-50",
    textColor: "text-amber-800",
  },
  unknown: {
    label: "Unknown",
    icon: "–",
    iconBg: "bg-gray-400",
    iconRing: "ring-gray-200",
    sectionBg: "bg-gray-50",
    textColor: "text-gray-700",
  },
};

const formatDate = (iso: Date) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function ReportCard({ report }: { report: ProductReport }) {
  const { productId, reportReason, reportDescription, createdAt } = report;
  const { name, brand, halalStatus, scanCount } = productId;
  const s = statusConfig[halalStatus] ?? statusConfig.unknown;

  return (
    <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-stone-100">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 font-mono">
          Product report
        </p>
        <p className="text-xl font-semibold text-stone-900">{name}</p>
        {brand && <p className="text-sm text-stone-500 mt-0.5">{brand}</p>}
      </div>

      <div
        className={`px-6 py-4 border-b border-stone-100 flex items-center gap-4 ${s.sectionBg}`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 ring-8 ${s.iconBg} ${s.iconRing}`}
        >
          {s.icon}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mb-0.5">
            Halal status
          </p>
          <p className={`text-base font-semibold ${s.textColor}`}>{s.label}</p>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-stone-100">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-mono mb-2">
          Report reason
        </p>
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-800">
          {reportReason}
        </span>
        <div className="w-full h-3">
          {reportDescription ? (
            <p className="mt-2 text-sm text-stone-500">{reportDescription}</p>
          ) : (
            <p className="mt-2 text-sm text-stone-500">
              No description provided.
            </p>
          )}
        </div>
      </div>

      <div className="px-6 py-3 flex justify-between items-center">
        <span className="text-[11px] text-stone-400 font-mono">
          {formatDate(createdAt)}
        </span>
        {scanCount != null && (
          <span className="text-[11px] text-stone-400 font-mono">
            scanned {scanCount}×
          </span>
        )}
      </div>
    </div>
  );
}
