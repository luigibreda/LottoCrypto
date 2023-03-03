import Button from "@/components/Button";
import { P } from "@/components/Heading";
import Image from "next/image";
import * as S from "./styles";

const Resume = () => {
  return (
    <S.Container>
      <Image
        src={"/logo-big.png"}
        alt={"LottoCrypto"}
        width={392}
        height={105}
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
      <S.ButtonsContainer>
        <Button width="50%" color="black">
          Buy a Ticket
        </Button>
        <Button width="50%" theme="black">
          Connect Wallet
        </Button>
      </S.ButtonsContainer>
    </S.Container>
  );
};

export default Resume;
