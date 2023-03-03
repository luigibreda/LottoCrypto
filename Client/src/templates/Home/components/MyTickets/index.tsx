import Button from "@/components/Button";
import { H3 } from "@/components/Heading";
import Ticket from "@/components/Ticket";
import { useState } from "react";
import * as S from "./styles";
import { motion } from "framer-motion";

const tickets = [1, 2, 3];

const MyTickets = () => {
  const [currentTicket, setCurrentTicket] = useState(0);

  return (
    <S.Container>
      <H3>My Tickets</H3>
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {tickets.map((ticket, index) => (
          <Ticket key={index} id={index} current={currentTicket === index} />
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
      <Button width="30%" disabled theme="black">
        Claim
      </Button>
    </S.Container>
  );
};

export default MyTickets;
