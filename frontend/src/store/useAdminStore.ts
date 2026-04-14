import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { AuthUser } from "./useAuthStore";
import type { PastScans, Product } from "./useScanStore";

interface ProductReport {
  user: AuthUser;
  productId: string;
  reportReason: "inappropriate" | "fake" | "spam" | "other";
  createdAt: Date;
  updatedAt: Date;
}

interface AdminStore {
  users: AuthUser[];
  filteredUsers: AuthUser[];
  isLoading: boolean;
  isDeleting: boolean;
  userScans: PastScans[];
  products: Product[];
  filteredProducts: Product[];
  totalUserPages: number;
  totalProductPages: number;
  productReports: ProductReport[];

  getUsers: (currentPage?: number) => Promise<void>;
  getScansByUserId: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getAllProducts: (currentPage?: number) => Promise<void>;
  searchProduct: (data: string) => void;
  searchUser: (data: string) => void;
  getProductReports: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  totalUserPages: 1,
  totalProductPages: 1,
  isLoading: false,
  isDeleting: false,
  users: [],
  filteredUsers: [],
  userScans: [],
  products: [],
  filteredProducts: [],
  productReports: [],

  getAllProducts: async (currentPage) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(
        `/admin/products?page=${currentPage}&limit=10`,
      );
      set({ products: res.data.products });
      set({ totalProductPages: res.data.totalPages });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getUsers: async (currentPage) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(
        `/admin/users?page=${currentPage}&limit=10`,
      );
      set({ users: res.data.users });
      set({ totalUserPages: res.data.totalPages });
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
      set({ isDeleting: true });
      await axiosInstance.delete(`/admin/delete-product/${id}`);
      toast.success("Product deleted.");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isDeleting: false });
    }
  },

  searchProduct: (data) => {
    const list = get().products;

    const filtered = list.filter(
      (item) =>
        item.barcode.includes(data) ||
        item.name.toLowerCase().includes(data.toLowerCase()),
    );

    set({ filteredProducts: filtered });
  },

  searchUser: (data) => {
    const list = get().users;

    const filtered = list.filter(
      (item) =>
        item.fullName.toLowerCase().includes(data.toLowerCase()) ||
        item._id.toLowerCase().includes(data.toLowerCase()) ||
        item.email.toLowerCase().includes(data.toLowerCase()),
    );

    set({ filteredUsers: filtered });
  },

  getProductReports: async (id) => {
    try {
      const res = await axiosInstance.get(`/admin/product-reports/${id}`);
      set({ productReports: res.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  },
}));
