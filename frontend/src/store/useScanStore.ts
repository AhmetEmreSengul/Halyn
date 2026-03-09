import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export type HalalStatus = "halal" | "haram" | "doubtful" | "unknown";

export interface Product {
  barcode: string;
  name: string;
  brand?: string;

  ingredientsText?: string;
  ingredientsList: string[];

  halalStatus: HalalStatus;
  confidenceScore: number;

  analysisReasons: string[];

  source: "openfoodfacts";

  rawSourceData?: any;
  analyzedAt: Date;
}

interface ScanStore {
  product: Product | null;
  isLoading: boolean;

  scanProductBarcode: (barcode: string) => Promise<void>;
  scanProductIngredients: (ingredientsText: string[]) => Promise<void>;
}

export const useScanStore = create<ScanStore>((set) => ({
  product: null,
  isLoading: false,

  scanProductBarcode: async (barcode) => {
    try {
      const res = await axiosInstance.post("/scan/barcode", {barcode});
      set({ product: res.data });
      toast.success("Product scanned.");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  },

  scanProductIngredients: async (ingredients) => {
    try {
      const res = await axiosInstance.post("/scan/ingredients", ingredients);
      set({ product: res.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  },
}));
