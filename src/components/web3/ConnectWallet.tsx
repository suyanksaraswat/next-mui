import { useAccount, useNetwork, useDisconnect } from "wagmi";
import WalletModal from "./WalletModal";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { NEXT_PUBLIC_CHAIN_ID } from "../../utils/allowedChainId";
import { abridgeAddress } from "../../utils/abridgeAddress";

type ConnectWalletProps = {
  isMobile?: boolean;
  size?: "small" | "medium" | "large" | undefined;
};

const CHAIN_ID = Number(NEXT_PUBLIC_CHAIN_ID);

const ConnectWallet = ({ isMobile, size }: ConnectWalletProps) => {
  const router = useRouter();
  const { data } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();

  const { disconnect } = useDisconnect();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (activeChain?.id !== CHAIN_ID && switchNetwork) switchNetwork(CHAIN_ID);
  }, [activeChain]);

  return (
    <div>
      {!isMobile ? (
        <Box>
          {!data ? (
            <Button
              variant="contained"
              onClick={() => setOpenConnectWallet(true)}
            >
              Connect Wallet
            </Button>
          ) : activeChain?.id === CHAIN_ID ? (
            <div>
              <Button variant="contained" onClick={handleClick}>
                {abridgeAddress(data?.address)}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ zIndex: 100 }}
              >
                <MenuItem
                  onClick={() => {
                    router.push(`/profile/${data?.address}`);
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    disconnect();
                  }}
                >
                  Disconnect Wallet
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              variant="contained"
              onClick={() => switchNetwork && switchNetwork(CHAIN_ID)}
            >
              Switch Network
            </Button>
          )}
        </Box>
      ) : (
        <>
          {!data ? (
            <Button
              variant="contained"
              onClick={() => setOpenConnectWallet(true)}
              fullWidth
            >
              Connect Wallet
            </Button>
          ) : (
            <Box mt={2}>
              <Link href={`/profile/${data?.address}`}>
                <Button fullWidth>Profile</Button>
              </Link>
              <Button
                fullWidth
                onClick={() => {
                  disconnect();
                }}
                sx={{ mt: 2 }}
              >
                Disconnect Wallet
              </Button>
            </Box>
          )}
        </>
      )}
      <WalletModal
        isOpen={openConnectWallet}
        closeModal={() => setOpenConnectWallet(false)}
      />
    </div>
  );
};

export default ConnectWallet;
