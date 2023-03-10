import { H2 } from "@/components/Heading";
import { useEthersStore } from "@/store/ethersStore";
import Ticket from "@/components/Ticket";
import * as S from "./styles";
import Button from "@/components/Button";
import { useLotto } from "@/contexts/LottoContext";
import { useInfiniteLotto } from "@/hooks/useInfiniteLotto";
import { useEffect } from "react";
import { useInfiniteScrollStore } from "@/store/infiniteScrollStore";

const LastRounds = () => {
  const lastRounds = useEthersStore((state) => state.lastRounds);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const loading = useEthersStore((state) => state.loading);
  const isLoadingMoreRounds = useInfiniteScrollStore(
    (state) => state.isLoadingMoreRounds
  );
  const { claim } = useLotto();
  const { getMoreRounds, hasMoreRounds } = useInfiniteLotto();
  const thresouldInPx = 150;

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMoreRounds || isLoadingMoreRounds) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - thresouldInPx
      ) {
        getMoreRounds();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMoreRounds, isLoadingMoreRounds]);

  return (
    <S.Container>
      <H2>Last Rounds</H2>
      <S.RoundsContainer>
        {lastRounds.length &&
          lastRounds?.map((round) => (
            <S.RoundContainer key={round.id}>
              <Ticket
                isLastsRounds={true}
                ticketsToSale={round.minTicket || 0}
                id={round.id}
                finalized={round.finalized}
                ticketsCount={round.ticketsCount}
                wallet={round.winner}
                claimed={round.claimed}
                current={true}
                isWinner={
                  round.winner.toLowerCase() == currentWallet?.toLowerCase()
                }
              />
              {!round.claimed &&
                round.winner.toLowerCase() == currentWallet?.toLowerCase() && (
                  <S.RoundManageArea>
                    <Button
                      width="30%"
                      theme="black"
                      disabled={loading}
                      onClick={() => {
                        claim(round.id);
                      }}
                    >
                      Claim
                    </Button>
                  </S.RoundManageArea>
                )}
            </S.RoundContainer>
          ))}
      </S.RoundsContainer>
    </S.Container>
  );
};

export default LastRounds;
