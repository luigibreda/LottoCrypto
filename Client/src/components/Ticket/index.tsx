import { P } from "../Heading";
import * as S from "./styles";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TicketProps {
  current: boolean;
}

const Ticket = ({ current }: TicketProps) => {
  return (
    <>
      {current && (
        <AnimatePresence>
          <motion.div
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 40,
            }}
            exit={{ rotateY: 90 }}
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
                <P>0xBbF87375E6e659f76A449e79030a97abAdBC4D3e</P>
              </S.Line>
              <S.Line>
                <S.Label>Lottery</S.Label>
                <P>My Ticket</P>
              </S.Line>
              <S.Line>
                <S.Label>Lottery</S.Label>
                <P>My Ticket</P>
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
        </AnimatePresence>
      )}
    </>
  );
};

export default Ticket;
