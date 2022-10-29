import { Box, Card, Container, Fade, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Hero = () => {
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

        <Typography variant="body1" color="text.secondary" textAlign="center">
          Premium experiences powered by the <strong>best</strong> in
          entertainment
        </Typography>
      </Box>
    </Fade>
  );
};

export default Hero;
