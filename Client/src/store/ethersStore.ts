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
  currentWallet: string | any;
  loading: boolean;
  tickets: any[];
  currentLottoInfo: any;
  lastRounds: any[];
  error: string | null;
  lottoContract: any;
  connectWallet: () => Promise<any>;
  disconnectWallet: () => void;
  addLastRound: (ticket: any) => void;
};

export const useEthersStore = create<EthersStore>()(
  subscribeWithSelector((set, get) => ({
    provider: null,
    currentWallet: null,
    chainId: null,
    loading: false,
    currentLottoInfo: null,
    lastRounds: [],
    tickets: [],
    error: null,
    lottoContract: null,
    connectWallet: async () => {
      try {
        const wallet = await AuthServices.connect(get().provider!);
        if (!wallet) return;
        set({ currentWallet: wallet });
      } catch (error) {
        console.log(error);
      }
    },
    disconnectWallet: () => {
      set({ currentWallet: null, tickets: [] });
    },
    addLastRound: (lastRound: any) => {
      set((state) => ({ lastRounds: [lastRound, ...state.lastRounds] }));
    },
  }))
);
