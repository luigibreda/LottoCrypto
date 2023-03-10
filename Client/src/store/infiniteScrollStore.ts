import { create } from "zustand";

export type InfiniteScrollStore = {
  step: number;
  start: number;
  end: number;
  hasMoreRounds: boolean;
  isLoadingMoreRounds: boolean;
};

export const useInfiniteScrollStore = create<InfiniteScrollStore>((set) => ({
  step: 2,
  start: -1,
  end: -1,
  hasMoreRounds: false,
  isLoadingMoreRounds: false,
}));
