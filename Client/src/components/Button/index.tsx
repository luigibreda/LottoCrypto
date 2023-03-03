import * as S from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  theme?: string;
  color?: string;
  width?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  theme = "primary",
  color = "white",
  width = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <S.Container
      disabled={disabled}
      themeType={theme}
      color={color}
      width={width}
    >
      <S.Text>{children}</S.Text>
    </S.Container>
  );
};

export default Button;
