import { useEthers } from "@/services/useEthers";
import { useEthersStore } from "@/store/ethersStore";
import LottoAbi from "../../contracts/Lottery.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { rightChainId } from "@/constants";

export const useLotto = () => {
  const chainId = useEthersStore((state) => state.chainId);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const { provider, signer } = useEthers();
  const lottoContractAddress = "0x26d2c3dc70ceD2dA8cB2b74A4576C93382CBb6A4";
  const [lottoContract, setLottoContract] = useState<any>(null);
  const [error, setError] = useState<string | null>();

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
    getLastRounds();
    getUserStatus();
  }, [currentWallet, lottoContract, chainId]);

  const getLastLottery = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    try {
      const currentLotto = await lottoContract.lotteryId();
      const lotteryStatus = await lottoContract.getLotteryStatus(currentLotto);

      return lotteryStatus;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserStatus = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    const lastLottery = await getLastLottery();
    useEthersStore.setState({ currentLottoInfo: lastLottery });

    const userStatusInLastLottery = await lottoContract.getUserStatus(
      lastLottery.indexChainLink,
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
      getUserStatus();
    } catch (error: any) {
      if (error.code == -32603)
        return useEthersStore.setState({ error: "You dont have MATIC enough" });
      console.log(error);
    } finally {
      useEthersStore.setState({ loading: false });
    }
  };

  const claim = async () => {
    if (!provider || !lottoContract) return;
    try {
      useEthersStore.setState({ loading: true });
      const lastLottery = await getLastLottery();
      const tx = await lottoContract.claim(lastLottery.indexChainLink);
      const receipt = await tx.wait();
      getUserStatus();
    } catch (error) {
      console.log(error);
    } finally {
      useEthersStore.setState({ loading: false });
    }
  };

  const getLastRounds = async () => {
    if (!provider || !lottoContract || chainId != rightChainId) return;
    try {
      const lastLottery = await getLastLottery();
      const lastLotteryId = lastLottery.indexChainLink;
      const lastRounds = [];
      for (let i = 0; i < 5; i++) {
        if (lastLotteryId - i < 0) break;
        const round = await lottoContract.getLotteryStatus(lastLotteryId - i);
        lastRounds.push(round);
      }

      useEthersStore.setState({ lastRounds });
    } catch (error) {
      console.log(error);
    }
  };

  return { buyTicket, claim, error };
};
