import { Box, Card, Container, Fade, Grid, Typography } from "@mui/material";
import Page from "../ui-library/components/Page";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../ui-library/layout/Layout";

const About: NextPage = () => {
  return (
    <Page title="About">
      <Layout>
        <Fade in={true}>
          <Container>
            <Box mb={6} mt={20}>
              <Typography
                variant="h2"
                textAlign="center"
                sx={{ fontFamily: "Syne" }}
              >
                About HeyLabs!
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
            <Grid container spacing={8} mb={10}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Typography variant="h4" sx={{ fontFamily: "Syne", mb: 2 }}>
                  Real World Utilities
                </Typography>
                <Typography variant="body1">
                  Our NFTs are gateways into a new world of amazing experiences.
                  With every NFT purchase from us, users get utilities that they
                  can avail in the real world. With benefits including movie
                  premiere, movie set visits, access to the hottest restaurants,
                  real-world interactions with your favourite celebrities and
                  more; our NFTs are packed with experiences to enhance your
                  life.
                </Typography>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box
                  sx={{
                    backgroundImage: `url(/assets/about/real.png)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    height: "100%",
                    width: "100%",
                    minHeight: "200px",
                  }}
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Typography variant="h4" sx={{ fontFamily: "Syne", mb: 2 }}>
                  Access to VIP Communities
                </Typography>
                <Typography variant="body1">
                  Get closer access to your favourite artists &amp; know them
                  better by purchasing their NFTs and joining their exclusive
                  discord communities. Ownership of our NFTs grants you a
                  subscription to VIP communities and groups. Take the
                  opportunity to meet first-hand with the world’s top artists,
                  brands, celebrities and fellow fans!
                </Typography>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box
                  sx={{
                    backgroundImage: `url(/assets/about/vip.png)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    height: "100%",
                    width: "100%",
                    minHeight: "200px",
                  }}
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Typography variant="h4" sx={{ fontFamily: "Syne", mb: 2 }}>
                  Long Term Value
                </Typography>
                <Typography variant="body1">
                  If you thought you can avail a utility only once, you got it
                  wrong! The longer you own our NFTs, the more benefits you can
                  unlock.
                </Typography>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box
                  sx={{
                    backgroundImage: `url(/assets/about/long.png)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    height: "100%",
                    width: "100%",
                    minHeight: "200px",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Fade>
      </Layout>
    </Page>
  );
};

export default About;
