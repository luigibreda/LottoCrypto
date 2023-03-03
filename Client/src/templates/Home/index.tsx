import { Sphere } from "@/components/GradientBall/styles";
import Header from "@/components/Header";
import MyTickets from "./components/MyTickets";
import Resume from "./components/Resume";
import * as S from "./styles";
import { motion } from "framer-motion";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <S.Container>
      <Header />
      <S.Content>
        <motion.div
          initial={{ x: 800, y: 300 }}
          animate={{ x: 600, y: [200, 100] }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Sphere />
        </motion.div>

        <Resume />
        <MyTickets />
      </S.Content>
    </S.Container>
  );
};

export default Home;
