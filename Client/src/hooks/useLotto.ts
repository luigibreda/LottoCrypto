import { useEthers } from "@/services/useEthers";
import { useEthersStore } from "@/store/ethersStore";
import LottoAbi from "../../contracts/Lottery.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useLotto = () => {
  const chainId = useEthersStore((state) => state.chainId);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const { provider, signer } = useEthers();
  const lottoContractAddress = "0x26d2c3dc70ceD2dA8cB2b74A4576C93382CBb6A4";
  const [lottoContract, setLottoContract] = useState<any>(null);

  useEffect(() => {
    if (!provider || !currentWallet || !signer) return;
    const lottoContract = new ethers.Contract(
      lottoContractAddress,
      LottoAbi.abi,
      signer
    );

    setLottoContract(lottoContract);
  }, [chainId, provider, signer]);

  useEffect(() => {
    if (!currentWallet || !lottoContract) return;
    getUserStatus();
  }, [currentWallet, lottoContract]);

  const getLastLottery = async () => {
    if (!provider || !lottoContract) return;
    try {
      const currentLotto = await lottoContract.lotteryId();
      const lotteryStatus = await lottoContract.getLotteryStatus(currentLotto);

      return lotteryStatus;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserStatus = async () => {
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

  const buyTickey = async () => {
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
    } catch (error) {
      console.log(error);
    } finally {
      useEthersStore.setState({ loading: false });
    }
  };

  return { buyTickey };
};
