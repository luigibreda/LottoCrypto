import { useEthersStore } from "@/store/ethersStore";
import { ethers } from "ethers";

export const changeNetwork = async (
  provider: ethers.providers.Web3Provider,
  network: number
) => {
  try {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: `0x${network.toString(16)}` },
    ]);
    useEthersStore.setState({ chainId: network });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: `0x${network.toString(16)}`,
            chainName: "Matic Mumbai Testnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ]);
        useEthersStore.setState({ chainId: network });
      } catch (addError: any) {
        console.log(addError);
      }
    }
    console.log(switchError);
  }
};
