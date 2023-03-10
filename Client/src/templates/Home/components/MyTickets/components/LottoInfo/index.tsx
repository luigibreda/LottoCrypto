import { P } from "@/components/Heading";
import * as S from "./styles";

interface LottoInfoProps {
  info: {
    id: number;
    ticketsCount: BigInt;
    minTicket: number;
    finalized: boolean;
  };
  isLogged: boolean;
}

const LottoInfo = ({ info, isLogged }: LottoInfoProps) => {
  return (
    <S.Container isLogged={isLogged}>
      <S.Line>
        <S.Info>
          <P bold>Round ID</P>
          <P>{info?.id || "?"}</P>
        </S.Info>
      </S.Line>
      <S.Line>
        <S.Info>
          <P>Min Ticket</P>
          <P>{info?.minTicket || "?"}</P>
        </S.Info>
      </S.Line>
      <S.Line>
        <S.Info>
          <P>Tickets Sold</P>
          <P>{info?.ticketsCount?.toString() || "?"}</P>
        </S.Info>
      </S.Line>
    </S.Container>
  );
};

export default LottoInfo;
