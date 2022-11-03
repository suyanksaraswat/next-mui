import { useEffect, useState } from "react";
import Web3 from "web3";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { BigNumber } from "@ethersproject/bignumber";
import Image from "next/image";
import { buyNftFromUser, getNftDetails, walletLogin } from "../api";
import { Router, useRouter } from "next/router";
import {
  useAccount,
  useSendTransaction,
  usePrepareSendTransaction,
} from "wagmi";
import { ethers } from "ethers";
import useWarnIfUnsavedChanges from "../../utils/useWarnIfUnsavedChanges";

interface CryptoPaymentProps {
  nftId: string;
  nftDetails: any;
  setErr: (state: string) => void;
  setSuccess: (state: string) => void;
}

export default function CryptoPayment({
  nftId,
  nftDetails,
  setErr,
  setSuccess,
}: CryptoPaymentProps) {
  const router = useRouter();
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const { config } = usePrepareSendTransaction({
    request: {
      to: "0x547B088C586AdB3878f5048f2f0DB43b02072bE0",
      value: BigNumber.from(
        `${Number(nftDetails?.price) * 1000000000000000000}`
      ), // 1 eth
    },
  });

  const {
    data: transactionData,
    error,
    isError,
    isSuccess,
    sendTransaction,
  } = useSendTransaction(config);

  const handleBuy = async (txHash: string) => {
    try {
      const res: any = await buyNftFromUser(
        {
          nftId: nftDetails?._id,
          buyer_public_key: address,
          transactionHash: txHash,
        },
        token
      );

      setLoading(false);
      setSuccess(res?.data?.message);
    } catch (err: any) {
      setLoading(false);
      setErr(err?.message || "Error occured!");
    }
  };

  const login = async () => {
    const web3 = new Web3(window.ethereum as any);

    try {
      // @ts-ignore
      const signed_msg = await web3.eth.personal.sign(
        "HeyNFT",
        address || "",
        ""
      );

      const res: any = await walletLogin({
        web3_address: address,
        signature: signed_msg,
        message: "HeyNFT",
      });

      return res?.data?.token;
    } catch (error) {
      console.log("### error-", error);
      setErr("Error in signature!");
      return;
    }
  };

  const fetchNftDetails = async () => {
    try {
      const res: any = await getNftDetails(nftId);
      return res?.data;
    } catch (err: any) {
      setErr(err?.response?.data?.error);
    }
  };

  const handleCryptoPayment = async () => {
    if (!address) {
      setErr("Please connect wallet");
      return;
    }

    try {
      const token = await login();
      const latestDetails = await fetchNftDetails();

      setToken(token);

      if (!latestDetails?.isDisplayed) {
        router.push(`/nft-details/${window.location.pathname.split("/")[2]}`);
      }

      if (token && latestDetails?.isDisplayed) {
        setLoading(true);
        console.log('### intiate trans-')
        await sendTransaction?.();
      }
    } catch (err: any) {
      setLoading(false);
      setErr(err?.message || "Error occured!");
    }
  };

  const checkTransactionHashisMined = async (txHash: any) => {
    await setTimeout(() => {}, 5000);
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const data = await provider.waitForTransaction(txHash);

      return data.blockHash ? true : false;
    }
  };

  const checkStatus = async (transactionData: any) => {
    const status = await checkTransactionHashisMined(transactionData?.hash);

    return status;
  };

  const handleSuccessTransaction = async (transactionData: any) => {
    let status;
    while (true) {
      status = await checkStatus(transactionData);

      if (status) {
        break;
      }
    }

    if (status) {
      handleBuy(transactionData?.hash);
    }
  };

  useEffect(() => {
    if (transactionData && isSuccess) {
      handleSuccessTransaction(transactionData);
    } else if (isError) {
      setLoading(false);
      setErr("Transaction error");
    }
  }, [transactionData, isSuccess, error, isError]);

  useWarnIfUnsavedChanges(loading, () => {
    return confirm(
      "Warning! Your transaction is in progress. Don't exit this window."
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#262626",
        border: "1px solid #4D4D4D",
        borderRadius: 2,
        p: 2,
        mb: 3,
        cursor: "pointer",
        gap: 2,
        img: {
          mr: 2,
        },
      }}
      onClick={() => !loading && handleCryptoPayment()}
    >
      <Image src="/assets/metaMask.png" alt="Logo" height={30} width={30} />
      <Typography variant="body1">Cryptocurrency</Typography>
      {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
    </Box>
  );
}
