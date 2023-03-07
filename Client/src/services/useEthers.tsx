import { useEthersStore } from "@/store/ethersStore";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

type EthersContextType = {
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;
};

const EthersContext = createContext({} as EthersContextType);

export const EthersProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();

  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = provider?.getNetwork().then((network) => {
      useEthersStore.setState({ chainId: network.chainId });
    });
    setProvider(provider);
    useEthersStore.setState({ provider });

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      useEthersStore.setState({ currentWallet: accounts[0] });
    });

    window.ethereum.on("chainChanged", (chainId: string) => {
      useEthersStore.setState({ chainId: parseInt(chainId) });
    });
  }, []);

  useEffect(() => {
    if (!currentWallet) return;
    const signer = provider?.getSigner();
    setSigner(signer);
  }, [provider, currentWallet]);

  return (
    <EthersContext.Provider value={{ provider, signer }}>
      {children}
    </EthersContext.Provider>
  );
};

export const useEthers = () => {
  return useContext(EthersContext);
};
