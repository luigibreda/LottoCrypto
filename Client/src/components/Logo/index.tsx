import Image from "next/image";

interface LogoProps {}

const Logo = ({}: LogoProps) => {
  return (
    <Image src={"/logo.png"} width={100} height={100} alt={"LottoCrypto"} />
  );
};

export default Logo;
