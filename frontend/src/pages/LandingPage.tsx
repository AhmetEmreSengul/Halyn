import React, { useState } from "react";
import { useScanStore } from "../store/useScanStore";
import { Scanner } from "@yudiel/react-qr-scanner";
import ProductCard from "../components/ProductCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import IngredientScanCard from "../components/IngredientScanCard";

const LandingPage = () => {
  const {
    scanProductBarcode,
    scanProductIngredients,
    isLoading,
    product,
    ingredientsProduct,
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
    useScanStore.setState({ product: null });
    scanProductIngredients(ingredientsText.replace(" ", ","));
    setIngredientsText("");
  };

  console.log(ingredientsProduct);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-5 py-40">
      <h1 className="text-4xl font-bold">Scan Barcode</h1>
      <div className="max-w-lg h-35">
        <Scanner
          formats={["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39"]}
          onScan={(result) =>
            console.log(result.map((r) => scanProductBarcode(r.rawValue)))
          }
        />
      </div>
      <h1>You can manually enter a barcode or an ingredient.</h1>
      <div className="flex items-center justify-center gap-3">
        <form onSubmit={handleScanSubmit} className="flex flex-col gap-2">
          <input
            placeholder="Barcode"
            className="p-2 rounded-lg border"
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <button className="p-2 rounded-lg border">Scan Barcode</button>
        </form>
        <form className="flex flex-col gap-2" onSubmit={handleIngredientSubmit}>
          <input
            placeholder="Ingredients"
            type="text"
            className="border p-2 rounded-lg"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />
          <button className="p-2 rounded-lg border">Scan Ingredient</button>
        </form>
      </div>

      {isLoading && (
        <p>
          <AiOutlineLoading3Quarters className="size-10 animate-spin mt-10" />
        </p>
      )}
      {product && <ProductCard product={product} />}
      {ingredientsProduct && (
        <IngredientScanCard ingredientProduct={ingredientsProduct} />
      )}
    </div>
  );
};

export default LandingPage;
