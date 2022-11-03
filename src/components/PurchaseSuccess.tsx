import React, { useState } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";

interface PurchaseSuccessProps {
  collectionDetails: any;
  open: boolean;
  onClose: () => void;
}

export default function PurchaseSuccess({
  collectionDetails,
  open,
  onClose,
}: PurchaseSuccessProps) {
  return (
    <Dialog
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
      open={open}
      onClose={() => onClose()}
    >
      <Box display="flex" justifyContent="center" mb={4}>
        <Image
          src="/assets/success.svg"
          alt="success"
          height={100}
          width={100}
        />
      </Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h4">Success!</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography variant="body1" color="grey">
          The NFT has been transferred to your wallet.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap={2}>
        {collectionDetails?.link?.map((res: any, i: number) => (
          <Box
            key={i}
            sx={{
              background: "#262626",
              border: "1px solid #4D4D4D",
              borderRadius: "8px",
              p: 2,
              width: 60,
              height: 60,
              cursor: "pointer",
            }}
            onClick={() => window.open(res?.url)}
          >
            {res?.platform === "discord" && (
              <Image
                src={`/assets/discord-white.svg`}
                alt="discord"
                width={25}
                height={25}
              />
            )}
            {res?.platform === "instagram" && <InstagramIcon />}
            {res?.platform === "facebook" && <FacebookRoundedIcon />}
            {res?.platform === "twitter" && <TwitterIcon />}
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}
