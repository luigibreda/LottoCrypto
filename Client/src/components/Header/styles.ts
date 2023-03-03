import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Wallet = styled(motion.div)`
  background-color: #101010;
  color: #a7a7a7;
  padding: 2px 5px;
  border-radius: 4px;
  border: 1px dashed #303030;
  display: flex;
  align-items: center;
  gap: 5px;
`;
