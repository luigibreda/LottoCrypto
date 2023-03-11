import { rightChainId } from "@/constants";
import { useEthersStore } from "@/store/ethersStore";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

type useEthersReturn = {
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;
};

export const useEthers = (): useEthersReturn => {
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const chainId = useEthersStore((state) => state.chainId);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();

  useEffect(() => {
    if (!window.ethereum) return;
    try {
      const providerInstance = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const idChain = providerInstance?.getNetwork().then((network) => {
        useEthersStore.setState({ chainId: network.chainId });
      });
      setProvider(providerInstance);
      useEthersStore.setState({ provider: providerInstance });
    } catch (error) {
      console.log(error);
    }
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      useEthersStore.setState({ currentWallet: accounts[0] });
    });

    window.ethereum.on("chainChanged", (idChain: string) => {
      useEthersStore.setState({ chainId: Number(idChain) });
    });
  }, []);

  useEffect(() => {
    if (!provider || !currentWallet) return;
    const signer = provider?.getSigner();
    setSigner(signer);
  }, [provider, currentWallet]);

  return {
    provider,
    signer,
  };
};
