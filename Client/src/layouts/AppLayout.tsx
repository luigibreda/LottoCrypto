import BetaHeader from "@/components/BetaHeader";
import Header from "@/components/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <BetaHeader />
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
