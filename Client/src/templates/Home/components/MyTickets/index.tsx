import Button from "@/components/Button";
import { H3 } from "@/components/Heading";
import Ticket from "@/components/Ticket";
import { useState } from "react";
import * as S from "./styles";
import { motion } from "framer-motion";
import { useEthersStore } from "@/store/ethersStore";
import NoTicket from "@/components/NoTicket";
import { useLotto } from "@/hooks/useLotto";
import { rightChainId } from "@/constants";
import { Pagination } from "@mui/material";

const MyTickets = () => {
  const [currentTicket, setCurrentTicket] = useState(0);
  const tickets = useEthersStore((state) => state.tickets);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const currentLottoInfo = useEthersStore((state) => state.currentLottoInfo);
  const chainId = useEthersStore((state) => state.chainId);
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
      <Button
        width="30%"
        disabled={
          !currentWallet ||
          (currentWallet && !userWin) ||
          chainId != rightChainId
        }
        theme="black"
        onClick={claim}
      >
        Claim
      </Button>
    </S.Container>
  );
};

export default MyTickets;
