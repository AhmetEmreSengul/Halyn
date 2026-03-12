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
  rawSourceData?: {
    completeness: number;
    last_modified: number;
  };
  analyzedAt: Date;
  scanCount: number;
}

interface PastScans {
  _id: string;
  scanType: string;
  productId: Product;
}

export interface IngredientProduct {
  ingredientsText: string;
  halalStatus: HalalStatus;
  confidenceScore: number;
  source: "openfoodfacts" | "user_scan";
  analysisReasons: string[];
}

interface ScanStore {
  product: Product | null;
  isLoading: boolean;
  isFetching: boolean;
  pastScans: PastScans[];
  ingredientsProduct: IngredientProduct | null;

  scanProductBarcode: (barcode: string) => Promise<void>;
  scanProductIngredients: (ingredientsText: string) => Promise<void>;
  getUsersPastScans: () => Promise<void>;
}

export const useScanStore = create<ScanStore>((set) => ({
  product: null,
  isLoading: false,
  isFetching: false,
  pastScans: [],
  ingredientsProduct: null,

  scanProductBarcode: async (barcode) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/scan/barcode", { barcode });
      set({ product: res.data });
      toast.success("Product scanned.");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  scanProductIngredients: async (ingredientsText) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/scan/ingredients", {
        ingredientsText,
      });
      set({ ingredientsProduct: res.data });
      toast.success("Ingredient scanned.");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getUsersPastScans: async () => {
    try {
      set({ isFetching: true });
      const res = await axiosInstance.get("/scan/past-scans");
      set({ pastScans: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching past scans");
    } finally {
      set({ isFetching: false });
    }
  },
}));
