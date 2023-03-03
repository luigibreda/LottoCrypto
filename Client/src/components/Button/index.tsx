import * as S from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  theme?: string;
  color?: string;
  width?: string;
}

const Button = ({
  children,
  theme = "primary",
  color = "white",
  width = "",
}: ButtonProps) => {
  return (
    <S.Container themeType={theme} color={color} width={width}>
      {children}
    </S.Container>
  );
};

export default Button;
