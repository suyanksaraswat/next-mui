import { Box, Card, Container, Fade, Typography } from "@mui/material";
import Page from "../ui-library/components/Page";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../ui-library/layout/Layout";

const About: NextPage = () => {
  const router = useRouter();

  return (
    <Page title="MADverse">
      <Layout>
        <Container maxWidth={"md"}>
          <Fade in={true}>
            <Card sx={{ marginTop: 20 }}>
              <Box m={8} sx={{ textAlign: "center" }}>
                <Typography variant="body1">About</Typography>
              </Box>
              <Box onClick={() => router.push("/")}>Home</Box>
            </Card>
          </Fade>
        </Container>
      </Layout>
    </Page>
  );
};

export default About;
