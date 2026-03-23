import { BrowserMultiFormatReader } from "@zxing/browser";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import IngredientScanCard from "../components/IngredientScanCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProductCard from "../components/ProductCard";
import { useScanStore } from "../store/useScanStore";

const LandingPage = () => {
  const {
    isLoading,
    isFetching,
    product,
    ingredientsProduct,
    popularScans,
    getMostPopularProducts,
    scanProductBarcode,
    scanProductIngredients,
  } = useScanStore();

  const [barcode, setBarcode] = useState("");
  const isScannedRef = useRef(false);
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

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (!videoRef.current) return;

    const reader = codeReader.current;
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            advanced: [{ focusMode: "continuous", zoom: 1 } as any],
            width: 1920,
            height: 1080,
            sampleRate: 44800,
            autoGainControl: true,
            frameRate: { ideal: 60 },
            noiseSuppression: true,
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        reader.decodeFromVideoElement(videoRef.current!, (result, _) => {
          if (result && !isScannedRef.current) {
            isScannedRef.current = true;
            scanProductBarcode(result.getText());
            setTimeout(() => {
              isScannedRef.current = false;
            }, 2000);
          }
        });
      } catch (err) {
        reader.decodeFromVideoDevice(
          undefined,
          videoRef.current!,
          (result, _) => {
            if (result && !isScannedRef.current) {
              isScannedRef.current = true;
              scanProductBarcode(result.getText());
              setTimeout(() => {
                isScannedRef.current = false;
              }, 2000);
            }
          },
        );
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-5 py-60">
      <h1 className="text-4xl font-bold">Scan Barcode</h1>
      <div className="max-w-lg container h-60 rounded-xl overflow-hidden relative">
        <video ref={videoRef} className="w-full h-full object-cover" />

        <div className="absolute top-3 left-5 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-sm md:text-base">
          Use flash if possible.
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-3/4 h-1/2 border-2 border-dotted border-green-400 rounded-lg"></div>
        </div>
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

      {isFetching && (
        <div className="py-30 block md:flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-2">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <LoadingSkeleton />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        {popularScans.length > 0 && !isFetching && (
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
