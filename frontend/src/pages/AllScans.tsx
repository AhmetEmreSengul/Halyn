import { useEffect } from "react";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useScanStore } from "../store/useScanStore";
import ProductCard from "../components/ProductCard";

const AllScans = () => {
  const { allScans, isFetching, getAllScans } = useScanStore();

  useEffect(() => {
    getAllScans();
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

  console.log(allScans);

  return (
    <div className="flex items-center justify-center pt-30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allScans.map((scan) => (
          <ProductCard product={scan} key={scan._id} />
        ))}
      </div>
    </div>
  );
};

export default AllScans;
