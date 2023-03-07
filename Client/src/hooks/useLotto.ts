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
    if (!currentWallet || !signer || !lottoContract) return;
    const getUserStatus = async () => {
      const lastLottery = await getLastLottery();
      const ID = lastLottery.indexChainLink;
      console.log(lottoContract);
    };
    getUserStatus();
  }, [currentWallet, signer, lottoContract]);

  const getLastLottery = async () => {
    if (!provider || !lottoContract) return;
    try {
      const currentLotto = await lottoContract.lotteryId();

      console.log(currentLotto);

      const lotteryStatus = await lottoContract.getLotteryStatus(currentLotto);
      return lotteryStatus;
    } catch (error) {
      console.log(error);
    }
  };

  const buyTickey = async () => {
    if (!provider || !lottoContract) return;
    try {
      const lastLottery = await getLastLottery();
      const lotteryPrice = await lastLottery.ticketPrice;

      const tx = await lottoContract.buyTicket({
        value: lotteryPrice,
      });
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  };

  return { buyTickey };
};
