import { useEthersStore } from "@/store/ethersStore";
import { rightChainId } from "@/constants";
import ethers from "ethers";

export const AuthServices = {
  connect: async (provider: ethers.providers.Web3Provider) => {
    const network = await provider.getNetwork();

    if (network.chainId === rightChainId) {
      const [wallet] = await provider.send("eth_requestAccounts", []);
      return wallet;
    }

    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${rightChainId.toString(16)}` },
      ]);
      useEthersStore.setState({ chainId: rightChainId });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        return null;
      }
      throw switchError;
    }

    const [wallet] = await provider.send("eth_requestAccounts", []);
    return wallet;
  },
  getConnectedWallet: async (provider: ethers.providers.Web3Provider) => {
    try {
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        return accounts[0];
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
