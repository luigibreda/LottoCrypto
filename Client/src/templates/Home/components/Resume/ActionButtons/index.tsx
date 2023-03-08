import Button from "@/components/Button";
import { rightChainId } from "@/constants";
import { useLotto } from "@/hooks/useLotto";
import { useEthersStore } from "@/store/ethersStore";
import { Alert, Collapse, IconButton, LinearProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import * as S from "./styles";

interface ActionButtonsProps {}

const ActionButtons = ({}: ActionButtonsProps) => {
  const currentWallet = useEthersStore((state) => state.currentWallet);
  const loading = useEthersStore((state) => state.loading);
  const connectWallet = useEthersStore((state) => state.connectWallet);
  const disconnectWallet = useEthersStore((state) => state.disconnectWallet);
  const chainId = useEthersStore((state) => state.chainId);
  const error = useEthersStore((state) => state.error);
  const { buyTicket } = useLotto();

  return (
    <>
      <Collapse in={!!error}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                useEthersStore.setState({ error: null });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ marginTop: "6px" }}
        >
          {error}
        </Alert>
      </Collapse>
      <S.ButtonsContainer>
        <Button
          onClick={buyTicket}
          width="50%"
          color="black"
          disabled={loading || !currentWallet || chainId != rightChainId}
        >
          Buy a Ticket
        </Button>
        <Button
          onClick={currentWallet ? disconnectWallet : connectWallet}
          width="50%"
          theme="black"
          disabled={loading || (currentWallet && chainId != rightChainId)}
        >
          {currentWallet ? "Logout" : "Connect Wallet"}
        </Button>
      </S.ButtonsContainer>
      {loading && (
        <LinearProgress
          sx={{
            backgroundColor: "#191919",

            "& .MuiLinearProgress-barColorPrimary": {
              backgroundColor: "#89FF13",
            },
          }}
        />
      )}
    </>
  );
};

export default ActionButtons;
