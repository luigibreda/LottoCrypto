import { AnimatePresence, motion } from "framer-motion";
import * as S from "./styles";
import Logo from "../Logo";
import { useEthersStore } from "@/store/ethersStore";
import Image from "next/image";
import { changeNetwork } from "@/functions/changeNetwork";
import { adminsWallets, rightChainId } from "@/constants";
import Link from "next/link";
import Button from "../Button";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const provider = useEthersStore((state) => state.provider);
  const chainId = useEthersStore((state) => state.chainId);

  return (
    <S.Container layout>
      {currentWallet && chainId != rightChainId && (
        <Button
          onClick={() => changeNetwork(provider, rightChainId)}
          color="black"
        >
          change network to Mumbai
        </Button>
      )}
      {currentWallet && adminsWallets.includes(currentWallet) && (
        <S.LinkStyled href="/admin">Admin Panel</S.LinkStyled>
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
