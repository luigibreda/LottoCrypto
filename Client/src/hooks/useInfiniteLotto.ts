import { rightChainId } from "@/constants";
import { useEthersStore } from "@/store/ethersStore";
import { useInfiniteScrollStore } from "@/store/infiniteScrollStore";

export const useInfiniteLotto = () => {
  const chainId = useEthersStore((state) => state.chainId);
  const lottoContract = useEthersStore((state) => state.lottoContract);
  const provider = useEthersStore((state) => state.provider);
  const step = useInfiniteScrollStore((state) => state.step);
  const start = useInfiniteScrollStore((state) => state.start);
  const end = useInfiniteScrollStore((state) => state.end);
  const isLoadingMoreRounds = useInfiniteScrollStore(
    (state) => state.isLoadingMoreRounds
  );

  const hasMoreRounds = start >= 0;

  const getMoreRounds = async () => {
    if (!lottoContract || chainId != rightChainId) return;
    if (isLoadingMoreRounds) return;

    const chainIdProvider = provider?._network?.chainId;
    if (chainIdProvider != rightChainId) return;

    try {
      const lastLotteryId = await lottoContract.lotteryId();
      if (start < 0) return;
      useInfiniteScrollStore.setState({
        isLoadingMoreRounds: true,
      });

      for (let i = start; i >= end; i--) {
        if (lastLotteryId == 0) return;
        if (i < 0) break;
        const round = await lottoContract.getLotteryStatus(i);
        if (useEthersStore.getState().lastRounds.find((r) => r.id == i))
          continue;
        useEthersStore.setState({
          lastRounds: [
            ...useEthersStore.getState().lastRounds,
            { id: i, ...round },
          ],
        });
      }
      updateStartEnd(end, step);
    } catch (error) {
      console.log(error);
    } finally {
      useInfiniteScrollStore.setState({
        isLoadingMoreRounds: false,
      });
    }
  };

  const updateStartEnd = (end: number, step: number) => {
    if (end > 0) {
      useInfiniteScrollStore.setState({
        start: end - 1,
        end: end - step,
      });
      return;
    }
    useInfiniteScrollStore.setState({
      start: -1,
      end: -1,
    });
  };

  return { getMoreRounds, hasMoreRounds };
};
