import Button from "@/components/Button";
import { useAuthStore } from "@/store/authStore";
import * as S from "./styles";

interface ActionButtonsProps {}

const ActionButtons = ({}: ActionButtonsProps) => {
  const connectWallet = useAuthStore((state) => state.connectWallet);
  const loading = useAuthStore((state) => state.loading);
  const currentWallet = useAuthStore((state) => state.currentWallet);
  const disconnectWallet = useAuthStore((state) => state.disconnectWallet);

  return (
    <S.ButtonsContainer>
      <Button width="50%" color="black" disabled={loading || !currentWallet}>
        Buy a Ticket
      </Button>
      <Button
        onClick={currentWallet ? disconnectWallet : connectWallet}
        width="50%"
        theme="black"
        loading={loading}
      >
        {currentWallet ? "Logout" : "Connect Wallet"}
      </Button>
    </S.ButtonsContainer>
  );
};

export default ActionButtons;
