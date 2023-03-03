import { motion } from "framer-motion";
import * as S from "./styles";
import Logo from "../Logo";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <S.Container>
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
    </S.Container>
  );
};

export default Header;
