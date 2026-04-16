import { useEffect, useState } from "react";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useScanStore } from "../store/useScanStore";
import ProductCard from "../components/ProductCard";

const AllScans = () => {
  const { allScans, isFetching, totalPages, getAllScans } = useScanStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllScans(currentPage);
  }, [currentPage]);

  console.log(allScans);

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
    <div className="flex items-center justify-center pt-30 flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {allScans.map((scan) => (
          <ProductCard product={scan} key={scan._id} />
        ))}
      </div>
      <div className="py-10">
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

export default AllScans;
