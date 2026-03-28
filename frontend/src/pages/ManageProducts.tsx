import { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import ProductCard from "../components/ProductCard";

const ManageProducts = () => {
  const {
    filteredProducts,
    products,
    getAllProducts,
    deleteProduct,
    searchProduct,
  } = useAdminStore();
  const [searchProductInput, setSearchProductInput] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      searchProduct(searchProductInput);
    }, 1000);
  }, [searchProductInput, searchProduct]);

  const productsToBeMapped = filteredProducts ? filteredProducts : products;

  return (
    <div className="w-screen min-h-screen bg-black pt-40">
      <input
        className="border rounded-lg p-2 mx-10"
        type="text"
        placeholder="Enter name / barcode"
        value={searchProductInput}
        onChange={(e) => setSearchProductInput(e.target.value)}
      />
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {productsToBeMapped.map((product) => (
          <div key={product._id}>
            <ProductCard
              product={product}
              productId={product._id}
              deleteProduct={deleteProduct}
              showProductDelete
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
