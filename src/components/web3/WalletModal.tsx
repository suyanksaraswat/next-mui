import Image from "next/image";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";

type WalletModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function WalletModal({ isOpen, closeModal }: WalletModalProps) {
  const { connect, connectors, isConnected, isConnecting, error } =
    useConnect();
  const [downloadWalletLink, setDownloadWalletLink] = useState(
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
  );

  useEffect(() => {
    (isConnected || error) && closeModal();
  }, [isConnected, error]);

  useEffect(() => {
    let details = navigator.userAgent;

    let androidRegex = /android/i;
    let iphoneRegex = /iphone|ipad/i;

    if (androidRegex.test(details)) {
      setDownloadWalletLink(
        "https://play.google.com/store/apps/details?id=io.metamask&hl=en_IN&gl=US"
      );
    } else if (iphoneRegex.test(details)) {
      setDownloadWalletLink(
        "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202"
      );
    }
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      PaperProps={{
        style: {
          backgroundColor: "#1A1A1A",
          boxShadow: "none",
          border: "1px solid #333333",
          borderRadius: "8px",
          minWidth: "400px",
          color: "#fff",
          padding: 28,
        },
      }}
    >
      {connectors.map((connector: any, idx: number) => (
        <Button
          fullWidth
          key={idx}
          sx={{ display: "flex", justifyContent: "flex-start", marginY: 1 }}
          onClick={() => {
            connect(connector);
          }}
        >
          <Image
            src={`/assets/${connector.id}.png`}
            alt="Coinbase Wallet Logo"
            width={50}
            height={50}
          />
          <Typography variant="body1" sx={{ color: "white", ml: 4 }}>
            {connector.name}
          </Typography>
        </Button>
      ))}
      {isConnecting && <CircularProgress />}
      <Box display="flex" justifyContent="center" mt={2}>
        <a target="_blank" rel="noreferrer" href={downloadWalletLink}>
          <Typography variant="body2" sx={{ color: "white" }}>
            Don&apos;t have a wallet? Click here
          </Typography>
        </a>
      </Box>
    </Dialog>
  );
}
