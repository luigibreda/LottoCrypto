import * as S from "./styles";
import Linear from "@/components/LinearProgress";

import { BigNumber } from "ethers";
import { useCounterGeneric } from "@/hooks/useCounter";

interface CounterProps {
  startedTime: BigNumber;
  timeToFinish: BigNumber;
  trigger: boolean;
}

const Counter = ({ startedTime, timeToFinish, trigger }: CounterProps) => {
  const { timeLeft, progress } = useCounterGeneric({
    startedTime,
    timeToFinish,
    trigger,
  });

  return (
    <S.TimeLeft>
      <Linear value={progress} />
      <S.TimeLeftText>
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </S.TimeLeftText>
    </S.TimeLeft>
  );
};

export default Counter;
