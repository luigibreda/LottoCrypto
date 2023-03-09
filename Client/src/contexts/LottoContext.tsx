import { useEthersStore } from "@/store/ethersStore";
import LottoAbi from "../../contracts/Lottery.json";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { rightChainId } from "@/constants";
import { useEthers } from "@/hooks/useEthers";

type LottoContextType = {
  buyTicket: () => Promise<void>;
  claim: (loteryId: number | string) => Promise<void>;
  refresh: () => Promise<void>;
};

const LottoContext = createContext({} as LottoContextType);

export const useLotto = () => useContext(LottoContext);

const LottoProvider = ({ children }: { children: any }) => {
  const chainId = useEthersStore((state) => state.chainId);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const { provider, signer } = useEthers();
  const lottoContractAddress = "0x8C673f4b0C0a934d388eb9ADcD7bCEb7CC41Db8a";
  const [lottoContract, setLottoContract] = useState<any>(null);
  const refresherRef = useRef<any>(null);

  useEffect(() => {
    if (!provider || !currentWallet || !signer || chainId != rightChainId)
      return;
    const lottoContract = new ethers.Contract(
      lottoContractAddress,
      LottoAbi.abi,
      signer
    );
    setLottoContract(lottoContract);
  }, [chainId, provider, signer]);

  useEffect(() => {
    if (!currentWallet || !lottoContract || chainId != rightChainId) return;
    refresh();
    refresherRef.current = refreshInterval();
    return () => {
      clearInterval(refresherRef.current);
    };
  }, [currentWallet, lottoContract, chainId]);

  const refreshInterval = () =>
    setInterval(() => {
      refresh();
    }, 10000);

  const getLastLottery = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    try {
      const currentLottoId = await lottoContract.lotteryId();
      const lotteryStatus = await lottoContract.getLotteryStatus(
        currentLottoId
      );
      return lotteryStatus;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserStatus = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    const currentLottoId = await lottoContract.lotteryId();
    const userStatusInLastLottery = await lottoContract.getUserStatus(
      currentLottoId,
      currentWallet
    );
    userStatusInLastLottery.hasTicket
      ? useEthersStore.setState({
          tickets: [...userStatusInLastLottery.tickets],
        })
      : useEthersStore.setState({
          tickets: [],
        });
  };

  const buyTicket = async () => {
    if (!provider || !lottoContract) return;
    try {
      useEthersStore.setState({ loading: true });
      const lastLottery = await getLastLottery();
      const lotteryPrice = await lastLottery.ticketPrice;

      const tx = await lottoContract.buyTicket({
        value: lotteryPrice,
      });
      const receipt = await tx.wait();
      refresh();
    } catch (error: any) {
      if (error.code == -32603)
        return useEthersStore.setState({ error: "You dont have MATIC enough" });
      console.log(error);
    } finally {
      useEthersStore.setState({ loading: false });
    }
  };

  const claim = async (loteryId: number | string) => {
    if (!provider || !lottoContract) return;
    try {
      useEthersStore.setState({ loading: true });
      const tx = await lottoContract.claim(loteryId);
      const receipt = await tx.wait();
      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      useEthersStore.setState({ loading: false });
    }
  };

  const getLastRounds = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    try {
      const currentLottoId = await lottoContract.lotteryId();
      const lastRounds = [];
      for (let i = 1; i < 5; i++) {
        if (currentLottoId - i < 0) break;
        const round = await lottoContract.getLotteryStatus(currentLottoId - i);
        const userStatus = await lottoContract.getUserStatus(
          currentLottoId - i,
          currentWallet
        );
        lastRounds.push({ id: currentLottoId - i, userStatus, ...round });
      }
      useEthersStore.setState({ lastRounds: lastRounds });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastLotteryInfo = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    const lastLottery = await getLastLottery();
    useEthersStore.setState({ currentLottoInfo: lastLottery });
  };

  const refresh = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    try {
      updateLastLotteryInfo();
      getUserStatus();
      getLastRounds();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LottoContext.Provider
      value={{
        buyTicket,
        claim,
        refresh,
      }}
    >
      {children}
    </LottoContext.Provider>
  );
};

export default LottoProvider;
