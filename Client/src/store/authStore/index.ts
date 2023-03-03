import { AuthServices } from "@/services/AuthServices";
import { useEffect } from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

declare global {
  interface Window {
    ethereum: any;
  }
}

type AuthStore = {
  currentWallet: string | null;
  connectWallet: () => Promise<void>;
  loading: boolean;
  disconnectWallet: () => void;
  tickets: any[];
};

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector((set) => ({
    currentWallet: null,
    loading: false,
    tickets: [],
    connectWallet: async () => {
      try {
        set({ loading: true });
        const account = await AuthServices.connectWallet();
        set({ currentWallet: account });
      } catch (error) {
        console.log(error);
      } finally {
        set({ loading: false });
      }
    },
    disconnectWallet: () => {
      set({ currentWallet: null });
    },
  }))
);

const unsubscribeCurrentWallet = useAuthStore.subscribe(
  (state) => state.currentWallet,
  (currentWallet) => {
    if (currentWallet) {
      console.log("Current wallet: ", currentWallet);
    }
  }
);
