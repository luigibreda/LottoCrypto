import Button from "@/components/Button";
import { useLotto } from "@/hooks/useLotto";
import { useEthersStore } from "@/store/ethersStore";
import * as S from "./styles";

interface ActionButtonsProps {}

const ActionButtons = ({}: ActionButtonsProps) => {
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const loading = useEthersStore((state) => state.loading);
  const connectWallet = useEthersStore((state) => state.connectWallet);
  const disconnectWallet = useEthersStore((state) => state.disconnectWallet);
  const { buyTickey } = useLotto();

  return (
    <S.ButtonsContainer>
      <Button
        onClick={buyTickey}
        width="50%"
        color="black"
        disabled={loading || !currentWallet}
      >
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
