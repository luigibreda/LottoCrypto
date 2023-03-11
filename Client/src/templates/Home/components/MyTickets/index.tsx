import { H3, P } from "@/components/Heading";
import Ticket from "@/components/Ticket";
import { useState } from "react";
import * as S from "./styles";
import { motion } from "framer-motion";
import { useEthersStore } from "@/store/ethersStore";
import NoTicket from "@/components/NoTicket";
import { Pagination } from "@mui/material";
import LottoInfo from "./components/LottoInfo";
import Counter from "../../../../components/Counter";

const MyTickets = () => {
  const [currentTicket, setCurrentTicket] = useState(0);
  const tickets = useEthersStore((state) => state.tickets);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const currentLottoInfo = useEthersStore((state) => state.currentLottoInfo);

  return (
    <>
      <S.Container>
        <LottoInfo info={currentLottoInfo} isLogged={!!currentWallet} />
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
          <Counter
            startedTime={currentLottoInfo?.startedTime}
            trigger={currentLottoInfo?.finishTrigger}
            timeToFinish={currentLottoInfo?.timeToFinish}
          />
        )}
      </S.Container>
    </>
  );
};

export default MyTickets;
