import { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import ProductCard from "../components/ProductCard";

const ManageProducts = () => {
  const { products, getAllProducts, deleteProduct } = useAdminStore();

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(products);

  return (
    <div className="w-screen min-h-screen bg-black pt-40">
      <input
        className="border rounded-lg p-2"
        type="text"
        placeholder="Enter name / barcode"
      />
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
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
