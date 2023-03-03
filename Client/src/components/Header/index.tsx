import { AnimatePresence, motion } from "framer-motion";
import * as S from "./styles";
import Logo from "../Logo";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const currentWallet = useAuthStore((state) => state.currentWallet);
  return (
    <S.Container layout>
      <AnimatePresence>
        <motion.div
          animate={{
            transform: [
              "rotate(0deg)",
              "rotate(30deg)",
              "rotate(0deg)",
              "rotate(-30deg)",
            ],
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 70,
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Logo />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {currentWallet && (
          <S.Wallet
            exit={{ opacity: 0, width: 0 }}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 40,
            }}
          >
            <Image
              src={"/metamask.png"}
              alt={"metamask"}
              width={20}
              height={20}
            />
            {currentWallet}
          </S.Wallet>
        )}
      </AnimatePresence>
    </S.Container>
  );
};

export default Header;
