import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface InfluencerStore {
  selectedList: UserProfileSummary[];
  addToList: (profile: UserProfileSummary) => void;
  removeFromList: (userId: string) => void;
  isInList: (userId: string) => boolean;
  clearList: () => void;
}

export const useInfluencerStore = create<InfluencerStore>()(
  persist(
    (set, get) => ({
      selectedList: [],

      addToList: (profile) => {
        const { selectedList } = get();
        const alreadyExists = selectedList.some(
          (p) => p.user_id === profile.user_id
        );
        if (alreadyExists) return;
        set({ selectedList: [...selectedList, profile] });
      },

      removeFromList: (userId) => {
        set((state) => ({
          selectedList: state.selectedList.filter((p) => p.user_id !== userId),
        }));
      },

      isInList: (userId) => {
        return get().selectedList.some((p) => p.user_id === userId);
      },

      clearList: () => {
        set({ selectedList: [] });
      },
    }),
    {
      name: "wobb-influencer-list",
    }
  )
);
