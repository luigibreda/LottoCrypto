import { AuthServices } from "@/services/AuthServices";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

declare global {
  interface Window {
    ethereum: any;
  }
}

type EthersStore = {
  provider: any;
  chainId: number | null;
  currentWallet: string | null;
  loading: boolean;
  tickets: any[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

export const useEthersStore = create<EthersStore>()(
  subscribeWithSelector((set, get) => ({
    provider: null,
    currentWallet: null,
    chainId: null,
    loading: false,
    tickets: [],
    connectWallet: async () => {
      try {
        set({ loading: true });
        const wallet = await AuthServices.connect(get().provider!);
        set({ currentWallet: wallet });
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

const unsubscribeCurrentWallet = useEthersStore.subscribe(
  (state) => state.currentWallet,
  (currentWallet) => {
    if (currentWallet) {
      console.log("Current wallet: ", currentWallet);
    }
  }
);
