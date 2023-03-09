import * as S from "./styles";

interface LinearProgressProps {
  value: number | string;
}

const LinearProgress = ({ value }: LinearProgressProps) => {
  return (
    <S.LinearProgressContainer>
      <S.LinearProgressFill value={value} />
    </S.LinearProgressContainer>
  );
};

export default LinearProgress;
