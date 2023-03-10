import * as S from "./styles";

interface BetaHeaderProps {}

const BetaHeader = ({}: BetaHeaderProps) => {
  return (
    <S.Container>
      We are in Beta test on Mumbai network,{" "}
      <a href="https://faucet.polygon.technology/" target="_blank">
        get faucets
      </a>
    </S.Container>
  );
};

export default BetaHeader;
