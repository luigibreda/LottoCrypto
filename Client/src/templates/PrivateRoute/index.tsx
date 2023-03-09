import { adminsWallets } from "@/constants";
import { useEthersStore } from "@/store/ethersStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentWallet } = useEthersStore();
  const router = useRouter();
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (!currentWallet || !adminsWallets.includes(currentWallet)) {
      router.push("/");
    }
  }, [currentWallet]);

  return (
    <>
      {!isBrowser && null}
      {isBrowser &&
        currentWallet &&
        adminsWallets.includes(currentWallet) &&
        children}
    </>
  );
};
