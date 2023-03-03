import Button from "@/components/Button";
import { H3 } from "@/components/Heading";
import Ticket from "@/components/Ticket";
import { useState } from "react";
import * as S from "./styles";
import { motion } from "framer-motion";

const tickets = [1, 2, 3];
const variants = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
    },
  }),
  hidden: { opacity: 0, x: -100 },
};

const MyTickets = () => {
  const [currentTicket, setCurrentTicket] = useState(0);

  return (
    <S.Container>
      <H3>My Tickets</H3>
      <motion.div variants={variants}>
        {tickets.map((ticket, index) => (
          <Ticket key={index} current={currentTicket === index} />
        ))}
      </motion.div>

      <S.Navigation>
        {tickets.map((ticket, index) => (
          <S.Bullet
            active={currentTicket == index}
            key={index}
            onClick={() => setCurrentTicket(index)}
          />
        ))}
      </S.Navigation>
      <Button width="30%" disabled theme="black">
        Claim
      </Button>
    </S.Container>
  );
};

export default MyTickets;
