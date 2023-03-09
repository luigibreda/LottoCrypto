import { H2 } from "@/components/Heading";
import { useEthersStore } from "@/store/ethersStore";
import Ticket from "@/components/Ticket";
import * as S from "./styles";
import Button from "@/components/Button";
import { useLotto } from "@/contexts/LottoContext";

interface LastRoundsProps {}

const LastRounds = ({}: LastRoundsProps) => {
  const lastRounds = useEthersStore((state) => state.lastRounds);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const { claim } = useLotto();

  return (
    <S.Container>
      <H2>Last Rounds</H2>
      <S.RoundsContainer>
        {LastRounds.length &&
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
              />
              {!round.claimed &&
                round.winner.toLowerCase() == currentWallet?.toLowerCase() && (
                  <S.RoundManageArea>
                    <Button
                      width="30%"
                      theme="black"
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
