import { useEthersStore } from "@/store/ethersStore";
import LottoAbi from "../../contracts/Lottery.json";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { rightChainId } from "@/constants";
import { useEthers } from "@/hooks/useEthers";
import { useInfiniteScrollStore } from "@/store/infiniteScrollStore";

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
  const addLastRound = useEthersStore((state) => state.addLastRound);
  const { provider, signer } = useEthers();
  const lottoContractAddress = "0x72a20ce4c4eDa85aa88a34a3292a46689020A11b";
  const [lottoContract, setLottoContract] = useState<any>(null);
  const refresherRef = useRef<any>(null);
  const step = useInfiniteScrollStore((state) => state.step);
  const isLoadingMoreRounds = useInfiniteScrollStore(
    (state) => state.isLoadingMoreRounds
  );

  useEffect(() => {
    if (!provider || !currentWallet || !signer) return;
    const lottoContract = new ethers.Contract(
      lottoContractAddress,
      LottoAbi.abi,
      signer
    );
    useEthersStore.setState({ lottoContract });
    setLottoContract(lottoContract);
  }, [chainId, provider, signer]);

  useEffect(() => {
    if (
      !currentWallet ||
      !lottoContract ||
      chainId != rightChainId ||
      !provider
    )
      return;
    if (useEthersStore.getState().lastRounds.length < step) {
      try {
        getLastRounds();
      } catch (e) {
        console.log(e);
      }
    }
    refresh();
    refresherRef.current = refreshInterval();
    return () => {
      clearInterval(refresherRef.current);
    };
  }, [currentWallet, lottoContract]);

  const refreshInterval = () =>
    setInterval(() => {
      refresh();
      checkIfLastTicketIdChanged();
    }, 15000);

  const getLastLottery = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    try {
      const currentLottoId = await lottoContract.lotteryId();
      const lotteryStatus = await lottoContract.getLotteryStatus(
        currentLottoId
      );
      return { ...lotteryStatus, id: currentLottoId.toString() };
    } catch (error) {
      console.log(error);
    }
  };

  const getUserStatus = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;

    try {
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
    } catch (error) {
      console.log(error);
    }
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
      const lastRounds = useEthersStore.getState().lastRounds;
      const newLastRounds = lastRounds.map((round) => {
        if (round.id == loteryId) {
          return { ...round, claimed: true };
        }
        return round;
      });
      useEthersStore.setState({ lastRounds: newLastRounds });
    } catch (error) {
      console.log(error);
    } finally {
      useEthersStore.setState({ loading: false });
    }
  };

  const getLastRounds = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;

    try {
      if (isLoadingMoreRounds) return;
      useInfiniteScrollStore.setState({ isLoadingMoreRounds: true });
      const currentLottoId = await lottoContract.lotteryId();
      const lastRounds = [];
      for (let i = 1; i < step + 1; i++) {
        if (currentLottoId - i < 0) break;
        const round = await lottoContract.getLotteryStatus(currentLottoId - i);
        lastRounds.push({ id: currentLottoId - i, ...round });
      }

      const lastFetched = lastRounds[lastRounds.length - 1].id;

      useInfiniteScrollStore.setState({
        start: lastFetched - 1,
        end: lastFetched - step,
      });

      useEthersStore.setState({ lastRounds: lastRounds });
    } catch (error) {
      console.log(error);
    } finally {
      useInfiniteScrollStore.setState({ isLoadingMoreRounds: false });
    }
  };

  const checkIfLastTicketIdChanged = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;

    try {
      const lastTicketId = (await lottoContract.lotteryId()) - 1;
      const lastTicketInStoreId = useEthersStore.getState().lastRounds[0].id;

      if (lastTicketId != lastTicketInStoreId) {
        const lastRoundInfo = await lottoContract.getLotteryStatus(
          lastTicketId
        );
        const lastTicketTrated = { id: lastTicketId, ...lastRoundInfo };

        addLastRound(lastTicketTrated);
      }
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
