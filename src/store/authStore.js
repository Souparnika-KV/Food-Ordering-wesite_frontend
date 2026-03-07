import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "../constants";

export const useAuthStore = create((set, get) => ({
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  login: async (email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });
      set({ userInfo: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  register: async (name, email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/users`, {
        name,
        email,
        password,
      });
      set({ userInfo: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  logout: () => {
    set({ userInfo: null });
    localStorage.removeItem("userInfo");
  },

  // --- ORDER MANAGEMENT (ADMIN) ---
  getAllOrders: async () => {
    const { userInfo } = get();
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get(`${BASE_URL}/api/orders`, config);
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  updateOrderToDelivered: async (orderId) => {
    const { userInfo } = get();
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/orders/${orderId}/status`,
        { status: "Delivered" },
        config,
      );
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // --- MENU MANAGEMENT (ADMIN CRUD) ---
  // Hits: DELETE /api/menu/:id
  deleteMenuItem: async (id) => {
    const { userInfo } = get();
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      // Ensures the request goes to the correct backend route
      await axios.delete(`${BASE_URL}/api/menu/${id}`, config);
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Hits: POST /api/menu
  createMenuItem: async (itemData) => {
    const { userInfo } = get();
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/menu`,
        itemData,
        config,
      );
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Hits: PUT /api/menu/:id
  updateMenuItem: async (id, itemData) => {
    const { userInfo } = get();
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/menu/${id}`,
        itemData,
        config,
      );
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
}));
