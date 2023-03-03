import * as S from "./styles";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  theme?: string;
  color?: string;
  width?: string;
  disabled?: boolean;
  onClick?: (params: any) => void;
  loading?: boolean;
}

const Button = ({
  children,
  theme = "primary",
  color = "white",
  width = "",
  disabled = false,
  onClick,
  loading = false,
}: ButtonProps) => {
  return (
    <motion.div
      style={{
        width,
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96, opacity: 0.8 }}
    >
      <S.Container
        onClick={onClick}
        disabled={disabled || loading}
        themeType={theme}
        color={color}
      >
        <S.Text>{children}</S.Text>
      </S.Container>
    </motion.div>
  );
};

export default Button;
