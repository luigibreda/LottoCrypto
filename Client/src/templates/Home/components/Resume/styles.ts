import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 50%;
  padding: 2em;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TextResume = styled.div`
  max-width: 600px;
`;

