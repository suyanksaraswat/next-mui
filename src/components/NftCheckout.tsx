import { useEffect, useState } from "react";
import { Alert, Box, Grid, Snackbar, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { getCollectionDetails, getNftDetails } from "./api";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import PurchaseSuccess from "./PurchaseSuccess";
import CryptoPayment from "./payment/CryptoPayment";
import { abridgeAddress } from "../utils/abridgeAddress";

interface NftCheckoutProps {
  nftId: string;
}

export default function NftCheckout({ nftId }: NftCheckoutProps) {
  const { address } = useAccount();
  const router = useRouter();

  const [nftDetails, setNftDetails] = useState<any>();
  const [collectionDetails, setCollectionDetails] = useState<any>();
  const [err, setErr] = useState<any>();
  const [success, setSuccess] = useState<any>();

  const fetchNftDetails = async () => {
    try {
      const res: any = await getNftDetails(nftId);

      if (!res?.data?.isDisplayed) {
        router.push(`/nft-details/${window.location.pathname.split("/")[2]}`);
      }
      setNftDetails(res?.data);
      fetchCollectionDetails(res?.data?.collection_id?._id)
    } catch (err: any) {
      setErr(err?.response?.data?.error);
    }
  };

  const fetchCollectionDetails = async (collection_id: string) => {
    try {
      const res: any = await getCollectionDetails(collection_id);
      setCollectionDetails(res?.data);
    } catch (err: any) {
      setErr(err?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchNftDetails();
  }, []);

  useEffect(() => {
    if (!address) {
      router.push(`/nft-details/${window.location.pathname.split("/")[2]}`);
    }
  }, [address]);

  return (
    <>
      <img
        src={
          "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
        }
        alt=""
        style={{
          position: "absolute",
          top: 0,
          filter: "blur(34px)",
          opacity: 0.2,
          width: "100%",
          height: "400px",
        }}
      />
      <Box
        sx={{
          background: `linear-gradient(360deg, #0D0D0D 65.17%, rgba(13, 13, 13, 0) 103.04%)`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          position: "relative",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          margin="auto"
          flexDirection="column"
          pt={16}
          paddingX={{ xs: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
          mb={6}
          sx={{
            maxWidth: 1200,
          }}
        >
          <Box mb={2} display="flex" alignItems="center" gap={2}>
            <Box
              p={2}
              sx={{
                border: "1px solid #333333",
                background: "#1A1A1A",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() =>
                router.push(`/nft-details/${window.location.pathname.split("/")[2]}`)
              }
            >
              <CloseIcon sx={{ color: "#808080" }} />
            </Box>
            <Typography variant="h4">NFT Checkout</Typography>
          </Box>

          <Box
            mb={4}
            p={4}
            sx={{
              border: "1px solid #333333",
              background: "#1A1A1A",
              borderRadius: "8px",
            }}
          >
            <Grid container spacing={2} mb={4}>
              <Grid item xl={8} lg={8} md={8} sm={6} xs={12}>
                <Box mb={1}>
                  <Typography variant="h4">Step 1</Typography>
                </Box>
                <Box mb={3} pb={3} sx={{ borderBottom: "1px solid #333333" }}>
                  <Typography variant="subtitle2" color="grey">
                    Choose payment method
                  </Typography>
                </Box>
                <Box>
                  {nftDetails && (
                    <>
                      <CryptoPayment
                        nftId={nftId}
                        nftDetails={nftDetails}
                        setErr={setErr}
                        setSuccess={setSuccess}
                      />
                    </>
                  )}
                </Box>
                <PurchaseSuccess
                  open={success}
                  collectionDetails={collectionDetails}
                  onClose={() =>
                    router.push(`/profile/${address}`)
                  }
                />
                <Snackbar
                  open={err}
                  autoHideDuration={6000}
                  onClose={() => setErr(null)}
                >
                  <Alert
                    onClose={() => setErr(null)}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {err}
                  </Alert>
                </Snackbar>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                <Box
                  mb={1}
                  sx={{
                    background: "#0D0D0D",
                    border: "1px solid #333333",
                    borderRadius: "8px",
                    height: "400px",
                    img: {
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <img src={nftDetails?.aws_s3_url} alt={""} />
                </Box>
                <Box mb={1}>
                  <Typography variant="h4">{nftDetails?.name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "gray", cursor: "pointer" }}
                    mr={1}
                    onClick={() =>
                      router.push(
                        `/profile/${nftDetails?.user_id?.web3_address}`
                      )
                    }
                  >
                    {nftDetails?.user_id?.first_name ||
                    nftDetails?.user_id?.last_name
                      ? `${nftDetails?.user_id?.first_name} ${nftDetails?.user_id?.last_name}`
                      : `${abridgeAddress(nftDetails?.user_id?.web3_address)}`}
                  </Typography>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </Box>

                <Box
                  mb={4}
                  p={2}
                  sx={{
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      span: {
                        background:
                          "linear-gradient(79.99deg, #4FAEED 3.52%, #4E72D9 16.37%, #5959D0 27.97%, #7E4DBF 37.68%, #C04EA5 49.91%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      },
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Exclusive Perks</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {nftDetails?.collection_id?.perks_description}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="subtitle2" color="grey">
                      PRICE
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    {/* <img src={MaticIcon} alt="" /> */}
                    <Typography variant="h4">
                      {nftDetails?.price}&nbsp;
                    </Typography>
                    <Typography variant="h4">{nftDetails?.currency}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
