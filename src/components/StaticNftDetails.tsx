import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import { abridgeAddress } from "../utils/abridgeAddress";
import { staticNftData } from "../utils/constants";

interface StaticNftDetailsI {
  nftId: string;
}

export default function StaticNftDetails({ nftId }: StaticNftDetailsI) {
  const router = useRouter();
  const [nftDetails, setNftDetails] = useState<any>();

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (staticNftData[nftId as keyof typeof staticNftData]) {
      setNftDetails(staticNftData[nftId as keyof typeof staticNftData]);
    }
  }, [nftId]);

  return (
    <div>
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
          <Grid container spacing={2} mb={4}>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <Box
                sx={{
                  background: "#0D0D0D",
                  border: "1px solid #333333",
                  borderRadius: "8px",
                  height: "600px",
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
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <Box p={2}>
                <Box mb={1}>
                  <Typography variant="h5" sx={{ fontFamily: "Syne" }}>
                    {nftDetails?.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body2" sx={{ color: "gray" }} mr={1}>
                    {nftDetails?.user_id?.first_name ||
                    nftDetails?.user_id?.last_name
                      ? `${nftDetails?.user_id?.first_name} ${nftDetails?.user_id?.last_name}`
                      : `${abridgeAddress(nftDetails?.user_id?.web3_address)}`}
                  </Typography>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </Box>
                <Box display="flex" alignItems="center" mb={4}>
                  <Button
                    variant="contained"
                    startIcon={<IosShareIcon fontSize={"small"} />}
                    disabled={isCopied}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setIsCopied(true);

                      setTimeout(() => {
                        setIsCopied(false);
                      }, 2000);
                    }}
                  >
                    {isCopied ? "Copied!" : "Share"}
                  </Button>
                  {/* <Button
                    sx={{ ml: 2 }}
                    startIcon={
                      <FavoriteIcon fontSize={"small"} sx={{ color: "#fff" }} />
                    }
                  >
                    Favorite
                  </Button> */}
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
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        background:
                          "linear-gradient(79.99deg, #4FAEED 3.52%, #4E72D9 16.37%, #5959D0 27.97%, #7E4DBF 37.68%, #C04EA5 49.91%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Exclusive Perks
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: nftDetails?.perks_description,
                        }}
                      />
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {nftDetails?.metadata && (
            <Box
              mb={4}
              p={4}
              sx={{ background: "#1A1A1A", borderRadius: "8px" }}
            >
              <Box mb={2}>
                <Typography variant="h5" sx={{ fontFamily: "Syne" }}>
                  Special traits
                </Typography>
              </Box>
              <Box display="flex" gap={2} flexWrap="wrap">
                {JSON.parse(nftDetails?.metadata)?.map(
                  (res1: any, idx: number) => (
                    <Box
                      key={idx}
                      sx={{
                        background: "#262626",
                        borderRadius: 2,
                        border: "1px solid #4D4D4D",
                      }}
                      paddingX={3}
                      paddingY={2}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          {res1?.trait_type}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">{res1?.value}</Typography>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            </Box>
          )}

          <Box mb={4} p={4} sx={{ background: "#1A1A1A", borderRadius: "8px" }}>
            <Box mb={2}>
              <Typography variant="h5" sx={{ fontFamily: "Syne" }}>
                About this NFT
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ color: "gray" }}>
                {nftDetails?.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
