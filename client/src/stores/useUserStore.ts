import { create } from "zustand";
import { UserType } from "../types";
import axios from "axios";

interface UserStore {
  user: null | UserType;
  error: boolean;
  loading: boolean;

  getUser: (clerkUserId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  error: false,
  loading: false,
  getUser: async (clerkUserId) => {
    try {
      set({ loading: true });
      const user = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${clerkUserId}`
      );
      set({ user: user.data, error: false, loading: false });
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
