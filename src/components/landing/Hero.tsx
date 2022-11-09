import React, { useRef } from "react";
import { Box, Button, Container, Fade, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const data = [
  {
    cover: "/assets/maar-sutteya.png",
    title: "Maar Sutteya",
    subtitle: "Gajendra Verma",
    link: "/collection-details/63517f1b6f535b65bc2dc7fe",
  },
  {
    cover: "/assets/collide.png",
    title: "Collide",
    subtitle: "Viral Fission",
    link: "/collection-details/viral-fission",
  },
  {
    cover: "/assets/shabaash-mithu.png",
    title: "Shabaash Mithu",
    subtitle: "Viacom 18",
    link: "/collection-details/shabaash-mithu",
  },
  {
    cover: "/assets/olive.png",
    title: "Oliverse",
    subtitle: "Olive Bar & Kitchen",
    link: "/collection-details/oliverse",
  },
  {
    cover: "/assets/i-dream-of-sunny.png",
    title: "I Dream of Sunny",
    subtitle: "Sunny Leone",
    link: "/collection-details/idos",
  },
];

const Hero = () => {
  const ref: any = useRef();

  return (
    <Fade in={true}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          textAlign="center"
          sx={{
            span: {
              background:
                "linear-gradient(78.1deg, #4FAEED -18.03%, #4E72D9 14.51%, #5959D0 43.88%, #7E4DBF 68.48%, #C04EA5 99.43%, #ED7A4F 134.35%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
        >
          Discover, collect and sell <span>unique</span> NFTs
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ marginY: { xl: 4, lg: 4, md: 3, sm: 2, xs: 1 } }}
        >
          Premium experiences powered by the <strong>best</strong> in
          entertainment
        </Typography>

        <Box sx={{ position: "relative", width: "100%" }}>
          <ResponsiveContainer
            carouselRef={ref}
            render={(parentWidth: any, carouselRef: any) => {
              return (
                <StackedCarousel
                  ref={carouselRef}
                  data={data}
                  carouselWidth={parentWidth}
                  slideWidth={window.innerWidth < 500 ? 200 : 300}
                  slideComponent={Card}
                  maxVisibleSlide={5}
                  currentVisibleSlide={5}
                  useGrabCursor={false}
                />
              );
            }}
          />
          <Button
            sx={{
              position: "absolute",
              top: "40%",
              left: 10,
              zIndex: 10,
              color: "black",
              minWidth: "auto",
              marginRight: { xl: 20, lg: 20, md: 20, sm: 12, xs: 2 },
              background: "rgba(255, 255, 255)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.6)",
              },
            }}
            onClick={() => {
              ref.current?.goBack();
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            sx={{
              position: "absolute",
              top: "40%",
              right: 35,
              zIndex: 10,
              color: "black",
              minWidth: "auto",
              marginLeft: { xl: 20, lg: 20, md: 20, sm: 12, xs: 2 },
              background: "rgba(255, 255, 255)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.6)",
              },
            }}
            onClick={() => {
              ref.current?.goNext(6);
            }}
          >
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default Hero;

const Card = (props: any) => {
  const router = useRouter();
  const { data, dataIndex } = props;
  const { cover, link, title, subtitle } = data[dataIndex || 0];

  return (
    <Box
      border="1px solid #333333"
      borderRadius={2}
      padding={1}
      sx={{
        background: "#171717",
        cursor: "pointer",
        img: {
          borderRadius: "6px",
        },
      }}
      onClick={() => router.push(link)}
    >
      {cover && <Image src={cover} alt="cover" height={300} width={250} />}
      <Typography
        variant="h6"
        textAlign="center"
        mt={1}
        sx={{
          fontFamily: "Syne",
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "gray" }}
          mr={1}
        >
          {subtitle}
        </Typography>
        <CheckCircleIcon fontSize="small" sx={{ color: "#4689ED" }} />
      </Box>
    </Box>
  );
};
