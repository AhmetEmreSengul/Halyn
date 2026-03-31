import { useEffect, useState } from "react";
import { useScanStore } from "../store/useScanStore";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

const ScanHistory = () => {
  const { totalPages, pastScans, isFetching, getUsersPastScans, deleteScan } =
    useScanStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsersPastScans();
  }, []);

  console.log(pastScans);

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
    <div className="min-h-screen w-screen py-30 flex flex-col items-center justify-center">
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
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-stone-900 leading-snug wrap-break-word inline-flex items-center gap-2">
                      {scan.barcode}{" "}
                      <span
                        onClick={() => handleCopy(scan.barcode)}
                        className="cursor-pointer"
                      >
                        <FiCopy />
                      </span>
                    </h2>
                    <button
                      onClick={() => deleteScan(scan._id)}
                      className="p-2 bg-red-400 hover:bg-red-500 transition rounded-lg cursor-pointer"
                    >
                      Delete Scan
                    </button>
                  </div>
                </div>
                <p className="p-4 font-light text-gray-600">
                  Product with this barcode was removed from our records. Please
                  delete it if you want to scan it again.
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
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${
              page === currentPage
                ? "bg-green-300 text-white"
                : "bg-white text-green-300"
            } px-3 py-1 rounded-lg mr-2 cursor-pointer`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;
