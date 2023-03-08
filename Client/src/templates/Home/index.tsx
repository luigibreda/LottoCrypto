import { Sphere } from "@/components/GradienBall/styles";
import Header from "@/components/Header";
import MyTickets from "./components/MyTickets";
import Resume from "./components/Resume";
import * as S from "./styles";
import { motion } from "framer-motion";
import LastRounds from "../LastRounds";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <S.Container>
      <Header />
      <S.Content>
        <Resume />
        <MyTickets />
      </S.Content>
      <LastRounds />
    </S.Container>
  );
};

export default Home;
