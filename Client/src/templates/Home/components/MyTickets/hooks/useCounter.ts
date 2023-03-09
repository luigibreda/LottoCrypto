import { useEthersStore } from "@/store/ethersStore";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

export const useCounter = () => {
  const currentLottoInfo = useEthersStore((state) => state.currentLottoInfo);
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const counterRef = useRef<any>(null);
  const [progress, setProgress] = useState<number | string>(0);
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!currentLottoInfo) return;
    if (!currentWallet) return clearInterval(counterRef.current);
    if (currentLottoInfo?.finishTrigger) {
      const start = currentLottoInfo.startedTime.toNumber();
      const end = currentLottoInfo.timeToFinish.toNumber();

      if (counterRef.current) clearInterval(counterRef.current);

      counterRef.current = setInterval(() => {
        if (progress >= 100) clearInterval(counterRef.current);
        const now = Math.floor(Date.now() / 1000);
        const timeLeftInSeconds = end - now;
        const percPercorrido = ((now - start) / (end - start)) * 100;

        const duration = moment.duration(timeLeftInSeconds, "seconds");

        setTimeLeft({
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });

        setProgress(percPercorrido.toFixed(2));
        if (timeLeftInSeconds <= 0) return clearInterval(counterRef.current);
      }, 1000);
    }
  }, [currentLottoInfo, currentWallet]);

  return { progress, timeLeft };
};
