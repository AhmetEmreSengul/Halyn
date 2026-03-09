import { useState, type FormEvent } from "react";
import { useScanStore } from "../store/useScanStore";
import { Scanner } from "@yudiel/react-qr-scanner";
import ProductCard from "../components/ProductCard";

const LandingPage = () => {
  const { scanProductBarcode, scanProductIngredients, isLoading, product } =
    useScanStore();

  const [barcode, setBarcode] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    scanProductBarcode(barcode);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-5 py-20">
      <h1 className="text-4xl font-bold">Scan Barcode</h1>
      <div className="max-w-lg h-35">
        <Scanner
          formats={["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39"]}
          onScan={(result) =>
            console.log(result.map((r) => scanProductBarcode(r.rawValue)))
          }
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>You can manually enter a barcode if scan fails.</label>
        <input
          className="p-2 rounded-lg border"
          type="text"
          onChange={(e) => setBarcode(e.target.value)}
        />
        <button className="p-2 rounded-lg border">Scan Barcode</button>
      </form>
      {product && <ProductCard product={product!} />}
    </div>
  );
};

export default LandingPage;
