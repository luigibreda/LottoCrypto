import * as S from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  color?: string;
}

const Button = ({ children, color }: ButtonProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Button;
