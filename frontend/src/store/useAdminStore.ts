import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { AuthUser } from "./useAuthStore";
import type { PastScans, Product } from "./useScanStore";

interface AdminStore {
  users: AuthUser[];
  isLoading: boolean;
  userScans: PastScans[];
  products: Product[];

  getUsers: () => Promise<void>;
  getScansByUserId: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getAllProducts: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  users: [],
  isLoading: false,
  userScans: [],
  products: [],

  getAllProducts: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/admin/products");
      set({ products: res.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getUsers: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/admin/users");
      set({ users: res.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getScansByUserId: async (id) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/admin/user-scan-history/${id}`);
      set({ userScans: res.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      await axiosInstance.delete(`/admin/delete-product/${id}`);
      toast.success("Product deleted.");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  },
}));
