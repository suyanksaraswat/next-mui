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
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "react-material-ui-carousel";
import NftCard from "./NftCard";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import moment from "moment";
import { useRouter } from "next/router";
import LanguageIcon from "@mui/icons-material/Language";
import { abridgeAddress } from "../utils/abridgeAddress";
import { staticCollectionData } from "../utils/constants";

interface StaticCollectionDetailsI {
  collectionId: string;
}

export default function StaticCollectionDetails({
  collectionId,
}: StaticCollectionDetailsI) {
  const router = useRouter();
  const [collectionDetails, setCollectionDetails] = useState<any>();
  const [activeSlide, setActiveSlide] = useState<any>(0);
  const [mute, setMute] = useState<boolean>(true);

  useEffect(() => {
    console.log('### collectionId', staticCollectionData)
    if (
      staticCollectionData[collectionId as keyof typeof staticCollectionData]
    ) {
      setCollectionDetails(
        staticCollectionData[collectionId as keyof typeof staticCollectionData]
      );
    }
  }, [collectionId]);

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
            <Grid item xl={8} lg={8} md={6} sm={6} xs={12}>
              {collectionDetails?.banners?.length > 0 && (
                <Box
                  sx={{
                    background: "#0D0D0D",
                    border: "1px solid #333333",
                    borderRadius: "8px",
                    img: {
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    },
                    video: {
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    },
                  }}
                >
                  <Carousel
                    indicators={false}
                    navButtonsAlwaysVisible={true}
                    swipe={true}
                    cycleNavigation={false}
                    height={500}
                    onChange={(now) => setActiveSlide(now)}
                  >
                    {collectionDetails?.banners?.map((item: any, i: number) => {
                      return item?.file?.split(".").pop() === "mp4" &&
                        activeSlide === i ? (
                        <>
                          <video
                            autoPlay
                            muted={mute}
                            loop
                            key={i}
                            onClick={() => setMute(!mute)}
                          >
                            <source
                              src={
                                window.innerWidth > 800
                                  ? item?.file
                                  : item?.mobileFile || item?.file
                              }
                              type="video/mp4"
                            />
                          </video>

                          {!mute ? (
                            <VolumeUpIcon
                              key={`volumeup${i}`}
                              sx={{
                                position: "absolute",
                                bottom: 20,
                                left: 20,
                                cursor: "pointer",
                                zIndex: 100000,
                              }}
                              onClick={() => setMute(!mute)}
                            />
                          ) : (
                            <VolumeOffIcon
                              key={`volumeup${i}`}
                              sx={{
                                position: "absolute",
                                bottom: 20,
                                left: 20,
                                cursor: "pointer",
                                zIndex: 100000,
                              }}
                              onClick={() => setMute(!mute)}
                            />
                          )}
                        </>
                      ) : (
                        <img
                          key={i}
                          src={
                            window.innerWidth > 800
                              ? item?.file
                              : item?.mobileFile || item?.file
                          }
                          alt={""}
                        />
                      );
                    })}
                  </Carousel>
                </Box>
              )}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
              <Box p={2}>
                <Box mb={1}>
                  <Typography variant="h5" sx={{ fontFamily: "Syne" }}>
                    {collectionDetails?.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body2" sx={{ color: "#a6a6a6" }} mr={1}>
                    {collectionDetails?.user_id?.first_name}{" "}
                    {collectionDetails?.user_id?.last_name}
                  </Typography>
                  <CheckCircleIcon
                    fontSize="small"
                    sx={{ color: "rgb(25, 118, 210)" }}
                  />
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body2" sx={{ color: "#a6a6a6" }} mr={1}>
                    Join the community:
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{ img: { cursor: "pointer" } }}
                  >
                    {collectionDetails?.link?.map((res: any, idx: number) => {
                      if (res?.platform === "youtube") {
                        return (
                          <a
                            target="_blank"
                            href={res?.url}
                            rel="noreferrer"
                            key={idx}
                          >
                            <YouTubeIcon
                              sx={{ cursor: "pointer", color: "white" }}
                            />
                          </a>
                        );
                      }
                      if (res?.platform === "instagram") {
                        return (
                          <a
                            target="_blank"
                            href={res?.url}
                            rel="noreferrer"
                            key={idx}
                          >
                            <InstagramIcon
                              sx={{ cursor: "pointer", color: "white" }}
                            />
                          </a>
                        );
                      }
                      if (res?.platform === "twitter") {
                        return (
                          <a
                            target="_blank"
                            href={res?.url}
                            rel="noreferrer"
                            key={idx}
                          >
                            <TwitterIcon
                              sx={{ cursor: "pointer", color: "white" }}
                            />
                          </a>
                        );
                      }
                      if (res?.platform === "discord") {
                        return (
                          <a
                            target="_blank"
                            href={res?.url}
                            rel="noreferrer"
                            key={idx}
                          >
                            <Image
                              src={`/assets/discord-white.svg`}
                              alt="discord"
                              width={25}
                              height={25}
                            />
                          </a>
                        );
                      }
                      if (res?.platform === "website") {
                        return (
                          <a
                            target="_blank"
                            href={res?.url}
                            rel="noreferrer"
                            key={idx}
                          >
                            <LanguageIcon
                              sx={{ cursor: "pointer", color: "white" }}
                            />
                          </a>
                        );
                      }
                    })}
                  </Box>
                </Box>

                <Box
                  p={2}
                  sx={{
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                    borderRadius: "8px",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#a6a6a6" }}
                      mr={1}
                    >
                      Items:
                    </Typography>
                    <Typography variant="subtitle1">
                      {collectionDetails?.nfts?.length} NFTs
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#a6a6a6" }}
                      mr={1}
                    >
                      Release date:
                    </Typography>
                    {collectionDetails?.createdAt && (
                      <Typography variant="subtitle1">
                        {moment(collectionDetails?.createdAt).format(
                          "DD MMMM, YYYY"
                        )}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box
                  mt={2}
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
                          __html: collectionDetails?.perks_description,
                        }}
                      />
                    </Typography>
                  </Box>
                </Box>
                {(collectionId === "shabaash-mithu" ||
                  collectionId === "viral-fission") && (
                  <Box display="flex" mt={2}>
                    <Button fullWidth disabled>
                      Claimed out
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box mb={4} p={4} sx={{ background: "#1A1A1A", borderRadius: "8px" }}>
            <Box mb={1}>
              <Typography variant="h5" sx={{ fontFamily: "Syne" }}>
                About this collection
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ color: "#a6a6a6" }}>
                {collectionDetails?.description}
              </Typography>
            </Box>
          </Box>

          {collectionDetails?.nfts?.length > 0 && (
            <Box width="100%" mt={4}>
              <Box mb={4}>
                <Typography variant="h5" sx={{ fontFamily: "Syne" }}>
                  NFT Collection
                </Typography>
              </Box>

              <Grid container spacing={3} alignItems="center">
                {collectionDetails?.nfts?.map((res: any, idx: number) => (
                  <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={idx}>
                    <NftCard
                      name={res?.name}
                      owner={
                        res?.user_id?.first_name || res?.user_id?.last_name
                          ? `${res?.user_id?.first_name} ${res?.user_id?.last_name}`
                          : `${abridgeAddress(res?.user_id?.web3_address)}`
                      }
                      img={res?.aws_s3_url}
                      price={res?.isDisplayed && res?.price}
                      currency={res?.currency}
                      onClick={() => {
                        router.push(`/nft-details/${res?._id}`);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}
