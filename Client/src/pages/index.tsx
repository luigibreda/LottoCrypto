import Head from "next/head";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Home from "@/templates/Home";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function HomePage() {
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
