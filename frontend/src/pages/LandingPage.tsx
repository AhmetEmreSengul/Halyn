import React, { useState } from "react";
import { useScanStore } from "../store/useScanStore";
import { Scanner } from "@yudiel/react-qr-scanner";
import ProductCard from "../components/ProductCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LandingPage = () => {
  const { scanProductBarcode, scanProductIngredients, isLoading, product } =
    useScanStore();

  const [barcode, setBarcode] = useState("");
  const [switchScanner, setSwitchScanner] = useState(false);

  const handleScanSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    scanProductBarcode(barcode.trim());
    setBarcode("");
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-5 py-20">
      <button
        className="p-2 rounded-lg bg-teal-900"
        onClick={() => setSwitchScanner(!switchScanner)}
      >
        Switch to {switchScanner ? "Barcode scanner" : "Ingredient scanner"}
      </button>
      {switchScanner ? (
        <>
          <h1 className="text-4xl font-bold">Scan Ingredients</h1>
          <div className="max-w-lg h-35"></div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Scan Barcode</h1>
          <div className="max-w-lg h-35">
            <Scanner
              formats={[
                "ean_13",
                "ean_8",
                "upc_a",
                "upc_e",
                "code_128",
                "code_39",
              ]}
              onScan={(result) =>
                console.log(result.map((r) => scanProductBarcode(r.rawValue)))
              }
            />
          </div>
          <form onSubmit={handleScanSubmit} className="flex flex-col gap-2">
            <label>You can manually enter a barcode if scan fails.</label>
            <input
              placeholder="Barcode"
              className="p-2 rounded-lg border"
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
            <button className="p-2 rounded-lg border">Scan Barcode</button>
          </form>
        </>
      )}
      {isLoading && (
        <p>
          <AiOutlineLoading3Quarters className="size-10 animate-spin mt-10" />
        </p>
      )}
      {product && <ProductCard product={product} />}
    </div>
  );
};

export default LandingPage;
