import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export type HalalStatus = "halal" | "haram" | "doubtful" | "unknown";

export interface Product {
  _id: string;
  barcode: string;
  name: string;
  brand?: string;
  ingredientsText?: string;
  ingredientsList: string[];
  halalStatus: HalalStatus;
  confidenceScore: number;
  analysisReasons: string[];
  reasonExplanation: string[];
  source: "openfoodfacts";
  rawSourceData?: {
    completeness: number;
    last_modified: number;
  };
  analyzedAt: Date;
  scanCount: number;
}

export interface PastScans {
  _id: string;
  scanType: string;
  productId: Product;
  productDeleted?: boolean;
  barcode: string;
}

export interface IngredientProduct {
  ingredientsText: string;
  halalStatus: HalalStatus;
  confidenceScore: number;
  source: "openfoodfacts" | "user_scan";
  analysisReasons: string[];
  reasonExplanation: string[];
}

interface ScanStore {
  product: Product | null;
  isLoading: boolean;
  isFetching: boolean;
  isDeleting: boolean;
  pastScans: PastScans[];
  popularScans: Product[];
  allScans: Product[];
  ingredientsProduct: IngredientProduct | null;
  totalPages: number;

  scanProductBarcode: (barcode: string) => Promise<void>;
  scanProductIngredients: (ingredientsText: string) => Promise<void>;
  getUsersPastScans: (currentPage?: number) => Promise<void>;
  getMostPopularProducts: () => Promise<void>;
  deleteScan: (id: string) => Promise<void>;
  getAllScans: () => Promise<void>;
}

export const useScanStore = create<ScanStore>((set) => ({
  totalPages: 1,
  product: null,
  isLoading: false,
  isFetching: false,
  isDeleting: false,
  pastScans: [],
  popularScans: [],
  allScans: [],
  ingredientsProduct: null,

  getAllScans: async () => {
    try {
      set({ isFetching: true });
      const res = await axiosInstance.get("/scan/all-scans");
      set({ allScans: res.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },

  scanProductBarcode: async (barcode) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/scan/barcode", { barcode });
      set({ product: res.data });
      toast.success("Product scanned.");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
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

  getUsersPastScans: async (currentPage) => {
    try {
      set({ isFetching: true });
      const res = await axiosInstance.get(
        `/scan/past-scans?page=${currentPage}&limit=6`,
      );
      set({ pastScans: res.data.scansWithStatus });
      set({ totalPages: res.data.totalPages });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching past scans");
    } finally {
      set({ isFetching: false });
    }
  },

  deleteScan: async (id) => {
    try {
      set({ isDeleting: true });
      await axiosInstance.delete(`/scan/delete-scan/${id}`);
      set((state) => ({
        pastScans: state.pastScans.filter((scan) => scan._id !== id),
      }));
      toast.success("Scan deleted.");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isDeleting: false });
    }
  },

  getMostPopularProducts: async () => {
    try {
      set({ isFetching: true });
      const res = await axiosInstance.get("/scan/popular");
      set({ popularScans: res.data });
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isFetching: false });
    }
  },
}));
