import { useEffect } from "react";
import { useScanStore } from "../store/useScanStore";
import ProductCard from "../components/ProductCard";

const ScanHistory = () => {
  const { getUsersPastScans, pastScans } = useScanStore();

  useEffect(() => {
    getUsersPastScans();
  }, []);

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
