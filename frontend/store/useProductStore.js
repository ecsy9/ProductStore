import {create} from 'zustand';
import axios from 'axios';

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set,get) => ({
  products: [],
  loading:true,
  error:null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {

        const response = await axios.get(`${BASE_URL}/api/products`);
        set({ products: response.data.data, error:null });
    } catch (error) {
      if (error.status == 429) set({ error: "Too many requests, please try again later." });
      else set ({ error: "Error fetching products." });
    } finally {
      set({ loading: false });
    }
  }
}));
