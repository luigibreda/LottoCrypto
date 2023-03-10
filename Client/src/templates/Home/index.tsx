import Header from "@/components/Header";
import MyTickets from "./components/MyTickets";
import Resume from "./components/Resume";
import * as S from "./styles";
import LastRounds from "../LastRounds";
import BetaHeader from "@/components/BetaHeader";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <S.Container>
      <S.Content>
        <Resume />
        <MyTickets />
      </S.Content>
      <LastRounds />
    </S.Container>
  );
};

export default Home;
