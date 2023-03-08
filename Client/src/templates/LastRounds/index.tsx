import { H2 } from "@/components/Heading";
import { useEthersStore } from "@/store/ethersStore";
import Ticket from "@/components/Ticket";
import * as S from "./styles";

interface LastRoundsProps {}

const LastRounds = ({}: LastRoundsProps) => {
  const lastRounds = useEthersStore((state) => state.lastRounds);

  return (
    <S.Container>
      <H2>Last Rounds</H2>
      <S.RoundsContainer>
        {LastRounds.length &&
          lastRounds?.map((round) => (
            <Ticket
              isLastRound={true}
              key={round.indexChainLink}
              id={round.indexChainLink}
              finalized={round.finalized}
              ticketsCount={round.ticketsCount}
              wallet={round.winner}
              current={true}
            />
          ))}
      </S.RoundsContainer>
    </S.Container>
  );
};

export default LastRounds;
