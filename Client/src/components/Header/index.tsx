import { AnimatePresence, motion } from "framer-motion";
import * as S from "./styles";
import Logo from "../Logo";
import { useEthersStore } from "@/store/ethersStore";
import Image from "next/image";
import { Alert } from "@mui/material";
import { adminsWallets, rightChainId } from "@/constants";
import Link from "next/link";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const chainId = useEthersStore((state) => state.chainId);

  return (
    <S.Container layout>
      {currentWallet && chainId != rightChainId && (
        <Alert severity="error">Please connect to the MUMBAI network!</Alert>
      )}
      {currentWallet && adminsWallets.includes(currentWallet) && (
        <Link href="/admin">Admin Panel</Link>
      )}

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
          <Link href="/">
            <Logo />
          </Link>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {currentWallet && (
          <>
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
          </>
        )}
      </AnimatePresence>
    </S.Container>
  );
};

export default Header;
