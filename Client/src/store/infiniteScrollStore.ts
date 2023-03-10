import { create } from "zustand";

export type InfiniteScrollStore = {
  start: number;
  end: number;
  hasMoreRounds: boolean;
};

export const useInfiniteScrollStore = create<InfiniteScrollStore>((set) => ({
  start: -1,
  end: -1,
  hasMoreRounds: false,
}));
