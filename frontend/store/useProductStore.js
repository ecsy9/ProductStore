import {create} from 'zustand';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set,get) => ({
  products: [],
  loading:true,
  error:null,
  currentProduct: null,

  //form state
  formData: {
    name: '',
    description: '',
    price: '',
    image: ''
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({
    formData: {
      name: '',
      description: '',
      price: '',
      image: ''
    }
  }),

  addProduct: async(e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully.");
      document.getElementById("addProductModal").close();
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error("Error adding product.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
        const response = await axios.get(`${BASE_URL}/api/products`);
        set({ products: response.data.data, error:null });
    } catch (error) {
      if (error.status == 429) set({ error: "Too many requests, please try again later.", products: [] });
      else set ({ error: "Error fetching products.", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set(prev => ({
        products: prev.products.filter(product => product.id !== id)
      }));
      toast.success("Product deleted successfully.");
    } catch (error) {
      set({ error: "Error deleting product." });
      toast.error("Error deleting product.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({ currentProduct: response.data.data,
        formData: response.data.data, // prefill form with product data
       });
    } catch (error) {
      console.log("Error fetching product:", error);
      set({ error: "Error fetching product.", currentProduct: null });
    } finally {
      set({ loading: false });
    }

  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully.");
      document.getElementById("addProductModal").close();
    } catch (error) {
      console.log("Error updating product:", error);
      set({ error: "Error updating product." });
      toast.error("Error updating product.");
    } finally {
      set({ loading: false });
    }
  },
}));
