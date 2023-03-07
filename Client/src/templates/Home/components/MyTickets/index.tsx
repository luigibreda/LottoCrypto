import Button from "@/components/Button";
import { H3 } from "@/components/Heading";
import Ticket from "@/components/Ticket";
import { useState } from "react";
import * as S from "./styles";
import { motion } from "framer-motion";
import { useEthersStore } from "@/store/ethersStore";
import NoTicket from "@/components/NoTicket";
import { useLotto } from "@/hooks/useLotto";

const MyTickets = () => {
  const [currentTicket, setCurrentTicket] = useState(0);
  const tickets = useEthersStore((state) => state.tickets);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const currentLottoInfo = useEthersStore((state) => state.currentLottoInfo);
  const { claim } = useLotto();

  const userWin = currentLottoInfo?.winner.toLowerCase() == currentWallet;

  return (
    <S.Container>
      <H3>{!tickets.length ? "You no have tickets" : "My tickets"}</H3>
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {!tickets.length && <NoTicket />}
        {tickets.map((ticket, index) => (
          <Ticket
            key={index}
            id={ticket}
            finalized={currentLottoInfo.finalized}
            ticketsCount={currentLottoInfo.ticketsCount}
            ownerWallet={currentWallet}
            current={currentTicket === index}
          />
        ))}

        <S.Navigation>
          {tickets.map((ticket, index) => (
            <S.Bullet
              active={currentTicket == index}
              key={index}
              onClick={() => setCurrentTicket(index)}
            />
          ))}
        </S.Navigation>
      </motion.div>
      <Button width="30%" disabled={!userWin} theme="black" onClick={claim}>
        Claim
      </Button>
    </S.Container>
  );
};

export default MyTickets;
