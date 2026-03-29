import { useEffect } from "react";
import { useScanStore } from "../store/useScanStore";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

const ScanHistory = () => {
  const { getUsersPastScans, pastScans, isFetching } = useScanStore();

  useEffect(() => {
    getUsersPastScans();
  }, []);

  if (isFetching) {
    return (
      <div className="min-h-screen w-screen py-30 block md:flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-2">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <LoadingSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (pastScans.length === 0) {
    return (
      <div className="min-h-screen w-screen py-30 flex items-center justify-center">
        <p className="text-2xl font-bold text-stone-900 leading-snug wrap-break-word">
          No scan history found
        </p>
      </div>
    );
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Barcode copied to clipboard");
  };

  return (
    <div className="min-h-screen w-screen py-30 flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2">
        {pastScans.map((scan) => {
          if (scan.productDeleted) {
            return (
              <div className="w-full md:w-105 max-h-50 bg-green-100 rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
                <div className="px-7 pt-7 pb-5 border-b border-stone-200">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    <span className="text-xs font-extralight tracking-widest uppercase text-stone-400 font-sans">
                      Deleted
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 leading-snug wrap-break-word inline-flex items-center gap-2">
                    {scan.barcode}{" "}
                    <span
                      onClick={() => handleCopy(scan.barcode)}
                      className="cursor-pointer"
                    >
                      <FiCopy />
                    </span>
                  </h2>
                </div>
                <p className="p-4 font-light text-gray-500">
                  Product with this barcode was removed from our records. You
                  can try scanning it again.
                </p>
              </div>
            );
          }
          return (
            <ProductCard
              key={scan._id}
              product={scan.productId}
              showScanDelete={true}
              scanId={scan._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScanHistory;
