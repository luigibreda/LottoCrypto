import Header from "@/components/Header";
import MyTickets from "./components/MyTickets";
import Resume from "./components/Resume";
import * as S from "./styles";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <S.Container>
      <Header />
      <S.Content>
        <Resume />
        <MyTickets />
      </S.Content>
    </S.Container>
  );
};

export default Home;
