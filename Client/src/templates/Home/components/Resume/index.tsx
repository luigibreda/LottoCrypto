import { P } from "@/components/Heading";
import Image from "next/image";
import * as S from "./styles";

import ActionButtons from "./ActionButtons";
import { LinearProgress } from "@mui/material";

const Resume = () => {
  return (
    <S.Container
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 40,
      }}
    >
      <Image
        src={"/logo-big.png"}
        alt={"LottoCrypto"}
        width={370}
        height={98}
        style={{ position: "relative", left: "-23px", top: "5px" }}
      />
      <S.TextResume>
        <P>
          Welcome to our cryptocurrency lottery site! Here you have the chance
          to win big prizes by purchasing tickets with your favorite
          cryptocurrencies. We've made buying tickets simple and easy, with no
          need to provide personal information. You can buy as many tickets as
          you want and increase your chances of winning the grand cryptocurrency
          prize. With a fair and transparent lottery system, you can be sure
          that all tickets have an equal chance of being selected. And with our
          fast and secure cryptocurrency payments, you can receive your prize
          within minutes. So what are you waiting for? Buy your tickets now and
          start dreaming of the big cryptocurrency prize!
        </P>
      </S.TextResume>
      <ActionButtons />
    </S.Container>
  );
};

export default Resume;
