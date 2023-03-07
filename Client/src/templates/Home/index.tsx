import { Sphere } from "@/components/GradienBall/styles";
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
        {/* <motion.div
          initial={{ x: 600, y: 200 }}
          animate={{ x: [600, 860, 550], y: [200, 250, 40] }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Sphere />
        </motion.div> */}

        <Resume />
        <MyTickets />
      </S.Content>
    </S.Container>
  );
};

export default Home;
