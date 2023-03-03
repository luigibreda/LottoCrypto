import Head from "next/head";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Home from "@/templates/Home";
import { useEffect } from "react";
import { AuthServices } from "@/services/AuthServices";
import { useAuthStore } from "@/store/authStore";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function HomePage() {
  useEffect(() => {
    const tryConnect = async () => {
      const res = await AuthServices.getConnectedWallet().catch((err) => {
        console.log(err);
      });
      useAuthStore.setState({ currentWallet: res });
    };
    tryConnect();

    window.ethereum.on("accountsChanged", (accounts: string) => {
      if (!accounts[0]) return useAuthStore.setState({ currentWallet: null });
      useAuthStore.setState({ currentWallet: accounts[0] });
    });
  }, []);

  return (
    <>
      <Head>
        <title>LottoCrypto</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={poppins.className}>
        <Home />
      </main>
    </>
  );
}
