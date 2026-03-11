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
}

interface PastScans {
  _id: string;
  scanType: string;
  productId: Product;
}

interface ScanStore {
  product: Product | null;
  isLoading: boolean;
  pastScans: PastScans[];

  scanProductBarcode: (barcode: string) => Promise<void>;
  scanProductIngredients: (ingredientsText: string[]) => Promise<void>;
  getUsersPastScans: () => Promise<void>;
}

export const useScanStore = create<ScanStore>((set) => ({
  product: null,
  isLoading: false,
  pastScans: [],

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

  scanProductIngredients: async (ingredients) => {
    try {
      const res = await axiosInstance.post("/scan/ingredients", ingredients);
      set({ product: res.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  },

  getUsersPastScans: async () => {
    try {
      const res = await axiosInstance.get("/scan/past-scans");
      set({ pastScans: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching past scans");
    }
  },
}));
