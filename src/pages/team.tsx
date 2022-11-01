import { Box, Card, Container, Fade, Grid, Typography } from "@mui/material";
import Page from "../ui-library/components/Page";
import type { NextPage } from "next";
import Layout from "../ui-library/layout/Layout";

const data = [
  {
    image: "/assets/team/caleb.jpg",
    name: "Caleb Franklin",
    designation: "CEO",
  },
  {
    image: "/assets/team/rohan.jpg",
    name: "Rohan Rajguru",
    designation: "Growth Head",
  },
  {
    image: "/assets/team/aman.jpg",
    name: "Aman Aggarwal",
    designation: "VP Business Development",
  },
  {
    image: "/assets/team/aryan.jpg",
    name: "Aryan Gautam",
    designation: "Product Manager",
  },
  {
    image: "/assets/team/monish.jpg",
    name: "Monish Bhatt",
    designation: "Head of Influencer Marketing",
  },
  {
    image: "/assets/team/jheel.jpg",
    name: "Jheel Thakker",
    designation: "Head of Communications",
  },
  {
    image: "/assets/team/archi.jpg",
    name: "Archi Joshi",
    designation: "Talent Manager",
  },
  {
    image: "/assets/team/muskan.jpg",
    name: "Muskan Agwan",
    designation: "Talent Manager",
  },
];

const Team: NextPage = () => {
  return (
    <Page title="MADverse">
      <Layout>
        <Fade in={true}>
          <Container>
            <Box mb={6} mt={20}>
              <Typography
                variant="h2"
                textAlign="center"
                sx={{ fontFamily: "Syne" }}
              >
                MEET THE TEAM
              </Typography>
            </Box>
            <Box maxWidth={600} marginX="auto" mb={10}>
              <Typography variant="body1" textAlign="center">
                HeyLabs is the destination for the world’s leading entertainment
                and content powered NFTs. All of our NFTs are packed with our
                three core pillars: Real World Utilities, Access to VIP
                Communities &amp; Long Term Value for every one of our
                customers.
              </Typography>
            </Box>

            <Grid container spacing={8} mb={6}>
              {data?.map((res, idx) => (
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  sm={4}
                  xs={6}
                  justifyContent="center"
                  key={idx}
                >
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: "50%",
                      backgroundImage: `url(${res.image})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />

                  <Typography
                    variant="h5"
                    sx={{ fontFamily: "Syne", mt: 4, mb: 1 }}
                    textAlign="center"
                  >
                    {res.name}
                  </Typography>
                  <Typography variant="body1" textAlign="center">
                    {res.designation}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Fade>
      </Layout>
    </Page>
  );
};

export default Team;
