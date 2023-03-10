import { rightChainId } from "@/constants";
import { useEthersStore } from "@/store/ethersStore";
import { useInfiniteScrollStore } from "@/store/infiniteScrollStore";

export const useInfiniteLotto = () => {
  const chainId = useEthersStore((state) => state.chainId);
  const lottoContract = useEthersStore((state) => state.lottoContract);
  const start = useInfiniteScrollStore((state) => state.start);
  const end = useInfiniteScrollStore((state) => state.end);

  const hasMoreRounds = end > 0;

  const getMoreRounds = async () => {
    if (!lottoContract || chainId != rightChainId) return;
    const lastLotteryId = await lottoContract.lotteryId();
    try {
      if (start < 0) return;
      for (let i = start; i >= end; i--) {
        if (lastLotteryId == 0) return;
        if (i < 0) break;
        const round = await lottoContract.getLotteryStatus(i);
        useEthersStore.setState({
          lastRounds: [
            ...useEthersStore.getState().lastRounds,
            { id: i, ...round },
          ],
        });
      }
      if (end > 0) {
        useInfiniteScrollStore.setState({
          start: end - 1,
          end: end - 4,
        });
        return;
      }
      useInfiniteScrollStore.setState({
        start: -1,
        end: -1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { getMoreRounds, hasMoreRounds };
};
