import { P } from "../Heading";
import * as S from "./styles";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TicketProps {
  current: boolean;
  id: any;
  ownerWallet: string;
  finalized: boolean;
  ticketsCount: any;
}

const Ticket = ({
  current,
  id,
  ownerWallet,
  finalized,
  ticketsCount,
}: TicketProps) => {
  return (
    <>
      {current && (
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          initial={{ x: 50, rotateY: 90, opacity: 0 }}
          animate={{ x: 0, rotateY: 0, opacity: 1 }}
          whileHover={{ rotateY: 25, rotateX: 25 }}
          whileTap={{ rotateY: 0, rotateX: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 40,
          }}
        >
          <S.Container>
            <Image
              src={"/LottoCrypto.png"}
              alt={"LottoCrypto"}
              width={110}
              height={20}
            />
            <S.Line>
              <S.Label>Ticket Owner Wallet</S.Label>
              <P>{ownerWallet}</P>
            </S.Line>
            <S.Line>
              <S.Label>Ticket ID</S.Label>
              <P>{id.toNumber()}</P>
            </S.Line>
            <S.Line>
              <S.Label>Tickets sold</S.Label>
              <P>{ticketsCount && ticketsCount.toString()}</P>
            </S.Line>
            <S.Line>
              <S.Label>Status</S.Label>
              <P>{finalized ? "Finished" : "Not finished"}</P>
            </S.Line>
            <Image
              src={"/logo.png"}
              alt={"LottoCrypto"}
              width={110}
              height={110}
              style={{
                position: "absolute",
                right: "0",
                bottom: "0",
              }}
            />
          </S.Container>
        </motion.div>
      )}
    </>
  );
};

export default Ticket;
