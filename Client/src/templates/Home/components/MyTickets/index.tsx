import { H3 } from "@/components/Heading";
import Ticket from "@/components/Ticket";
import { useState } from "react";
import * as S from "./styles";
import { motion } from "framer-motion";
import { useEthersStore } from "@/store/ethersStore";
import NoTicket from "@/components/NoTicket";
import { Pagination } from "@mui/material";
import Linear from "@/components/LinearProgress";
import { useCounter } from "./hooks/useCounter";

const MyTickets = () => {
  const [currentTicket, setCurrentTicket] = useState(0);
  const tickets = useEthersStore((state) => state.tickets);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const currentLottoInfo = useEthersStore((state) => state.currentLottoInfo);
  const { timeLeft, progress } = useCounter();

  return (
    <>
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
              ticketsToSale={currentLottoInfo?.minTicket}
              finalized={currentLottoInfo?.finalized}
              ticketsCount={currentLottoInfo?.ticketsCount}
              wallet={currentWallet}
              current={currentTicket === index}
            />
          ))}

          <Pagination
            count={tickets.length}
            page={currentTicket + 1}
            sx={{
              "& .Mui-selected": {
                backgroundColor: "black",
                color: "white",
              },
              "& .MuiPaginationItem-page": {
                backgroundColor: "#0d0d0d",
                color: "#f2f2f2",
              },
              "& .MuiPaginationItem-root": {
                color: "#f2f2f2",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#232323",
                color: "#89FF13",
              },
            }}
            variant="outlined"
            shape="rounded"
            onChange={(e, page) => setCurrentTicket(page - 1)}
          />
        </motion.div>

        {currentLottoInfo?.finishTrigger && (
          <S.TimeLeft>
            <Linear value={progress} />
            <S.TimeLeftText>
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </S.TimeLeftText>
          </S.TimeLeft>
        )}
      </S.Container>
    </>
  );
};

export default MyTickets;
