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
import { getCollectionDetails, getNftsByCollectionId } from "./api";

interface DynamicCollectionDetailsI {
  collectionId: string;
}

export default function DynamicCollectionDetails({
  collectionId,
}: DynamicCollectionDetailsI) {
  const router = useRouter();
  const [collectionDetails, setCollectionDetails] = useState<any>();
  const [activeSlide, setActiveSlide] = useState<any>(0);
  const [mute, setMute] = useState<boolean>(true);
  const [err, setErr] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<any>([]);
  const [otherNfts, setOtherNfts] = useState<any>([]);
  const [filteredNfts, setFilteredNfts] = useState<any>([]);
  const [type, setType] = useState("all");
  const [filterLoading, setFilterLoading] = useState<boolean>(false);

  const fetchCollectionDetails = async (id: string) => {
    try {
      const res: any = await getCollectionDetails(id);
      setCollectionDetails(res?.data);
    } catch (err: any) {
      setErr(err?.response?.data?.error);
    }
  };

  const fetchNfts = async (id: string) => {
    setLoading(true);
    try {
      const res: any = await getNftsByCollectionId({
        collection_id: id,
        limit: 100,
      });

      if (collectionId === "63517f1b6f535b65bc2dc7fe") {
        setOtherNfts([...res.data]);
        setFilteredNfts([...res.data]);
      } else {
        setNfts([...res.data]);
      }
      setLoading(false);
    } catch (err: any) {
      setErr(err?.response?.data?.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collectionId) {
      fetchCollectionDetails(collectionId);
      fetchNfts(collectionId);
    }
  }, [collectionId]);

  useEffect(() => {
    setFilterLoading(true);
    if (type === "all") {
      setFilteredNfts([...otherNfts]);
    } else if (type === "aplha") {
      setFilteredNfts(
        otherNfts?.filter(
          (res: any) =>
            res.name === "Maar Sutteya Alpha 1" ||
            res.name === "Maar Sutteya Alpha 2" ||
            res.name === "Maar Sutteya Alpha 3" ||
            res.name === "Maar Sutteya Alpha 4" ||
            res.name === "Maar Sutteya Alpha 5"
        )
      );
    } else if (type === "supreme") {
      setFilteredNfts(
        otherNfts?.filter(
          (res: any) =>
            res.name === "Maar Sutteya Supreme 1" ||
            res.name === "Maar Sutteya Supreme 2" ||
            res.name === "Maar Sutteya Supreme 3"
        )
      );
    }
    setFilterLoading(false);
  }, [type]);

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
                      {collectionDetails?.nftsLength}
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
                {collectionId === "63517f1b6f535b65bc2dc7fe" && (
                  <Box display="flex" mt={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => router.push("/free-nft/maar-sutteya")}
                    >
                      Claim free NFT
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

          <Box width="100%" mt={6}>
            <Box
              mb={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" sx={{ fontFamily: "Syne" }}>
                Premium NFTs
              </Typography>
              <FormControl
                sx={{
                  minWidth: 100,
                  div: {
                    color: "white !important",
                  },
                  svg: {
                    color: "white !important",
                  },
                  label: {
                    color: "white !important",
                  },
                  fieldset: {
                    borderColor: "white !important",
                  },
                }}
              >
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  label="Type"
                  onChange={(e) => setType(e.target.value as string)}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"aplha"}>Aplha</MenuItem>
                  <MenuItem value={"supreme"}>Supreme</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {filterLoading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={3} alignItems="center">
                {filteredNfts?.map((res: any, idx: number) => (
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
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
