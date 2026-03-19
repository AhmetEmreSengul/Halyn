import React, { useEffect, useState } from "react";
import { useScanStore } from "../store/useScanStore";
import { Scanner } from "@yudiel/react-qr-scanner";
import ProductCard from "../components/ProductCard";
import IngredientScanCard from "../components/IngredientScanCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import toast from "react-hot-toast";

const LandingPage = () => {
  const {
    scanProductBarcode,
    scanProductIngredients,
    isLoading,
    product,
    ingredientsProduct,
    popularScans,
    getMostPopularProducts,
  } = useScanStore();

  const [barcode, setBarcode] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");

  const handleScanSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    useScanStore.setState({ ingredientsProduct: null });
    scanProductBarcode(barcode.trim());
    setBarcode("");
  };

  const handleIngredientSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (ingredientsText.length <= 3) {
      toast.error("Input too short.");
      setIngredientsText("");
      return;
    }
    useScanStore.setState({ product: null });
    scanProductIngredients(ingredientsText);
    setIngredientsText("");
  };

  useEffect(() => {
    getMostPopularProducts();
  }, []);

  console.log(product);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-5 py-60">
      <h1 className="text-4xl font-bold">Scan Barcode</h1>
      <div className="max-w-lg container h-35 rounded-xl overflow-hidden">
        <Scanner
          formats={["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39"]}
          onScan={(result) => result.map((r) => scanProductBarcode(r.rawValue))}
        />
      </div>
      <h1>You can manually enter a barcode or an ingredient.</h1>
      <div className="flex items-center justify-center gap-3 flex-col md:flex-row">
        <form onSubmit={handleScanSubmit} className="flex flex-col gap-2">
          <input
            placeholder="ex: 3017624010701"
            className="border-2 p-2 rounded-lg hover:border-stone-500 transition "
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            required
          />
          <button className="p-2 rounded-lg bg-stone-300 hover:bg-stone-500 text-black hover:text-white transition cursor-pointer">
            Scan Barcode
          </button>
        </form>
        <form className="flex flex-col gap-2" onSubmit={handleIngredientSubmit}>
          <input
            placeholder="ex: pork wine"
            type="text"
            className="border-2 p-2 rounded-lg hover:border-stone-500 transition "
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            required
          />
          <button className="p-2 rounded-lg bg-stone-300 hover:bg-stone-500 text-black hover:text-white transition cursor-pointer">
            Scan Ingredient
          </button>
        </form>
      </div>

      {isLoading && (
        <p>
          <LoadingSkeleton />
        </p>
      )}
      {product && <ProductCard product={product} />}
      {ingredientsProduct && (
        <IngredientScanCard ingredientProduct={ingredientsProduct} />
      )}

      <div>
        {popularScans.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-5 mt-30">
            <h1 className="text-4xl font-bold">Popular Scans</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2">
              {popularScans.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  showDelete={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
