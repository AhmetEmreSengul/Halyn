import { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import ProductCard from "../components/ProductCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ManageProducts = () => {
  const {
    totalProductPages,
    isLoading,
    filteredProducts,
    products,
    getAllProducts,
    searchProduct,
  } = useAdminStore();
  const [searchProductInput, setSearchProductInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setTimeout(() => {
      searchProduct(searchProductInput);
    }, 1000);
  }, [searchProductInput, searchProduct]);

  const productsToBeMapped = filteredProducts ? filteredProducts : products;

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
        <AiOutlineLoading3Quarters className="size-7 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-black pt-40 flex flex-col items-center">
      <input
        className="border rounded-lg p-2 mx-10"
        type="text"
        placeholder="Enter name / barcode"
        value={searchProductInput}
        onChange={(e) => setSearchProductInput(e.target.value.trim())}
      />
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {productsToBeMapped.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} showProductDelete />
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: totalProductPages }, (_, i) => i + 1).map(
          (page) => (
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
          ),
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
