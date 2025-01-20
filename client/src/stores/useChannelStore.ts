import { create } from "zustand";
import { VideoType } from "../types";
import axios from "axios";

interface ChannelStore {
  subscribers: number;
  authorVideos: VideoType[];
  error: boolean;
  loading: boolean;

  setSubscribers: (subscribers: number) => void;
  getAuthorVideos: (authorId: string, filter: string) => Promise<void>;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  subscribers: 0,
  authorVideos: [],
  loading: false,
  error: false,

  setSubscribers: (subscribers) => set({ subscribers }),
  getAuthorVideos: async (authorId, filter) => {
    try {
      set({ loading: true, error: false });

      const videos = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/videos/author/${authorId}`,
        { params: { filter } }
      );

      set({ authorVideos: videos.data, error: false });
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
