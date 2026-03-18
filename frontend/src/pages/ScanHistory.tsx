import { useEffect } from "react";
import { useScanStore } from "../store/useScanStore";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

const ScanHistory = () => {
  const { getUsersPastScans, pastScans, isFetching } = useScanStore();

  useEffect(() => {
    getUsersPastScans();
  }, []);

  if (!isFetching) {
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

  return (
    <div className="min-h-screen w-screen py-30 flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2">
        {pastScans.map((scan) => (
          <ProductCard product={scan.productId} />
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;
