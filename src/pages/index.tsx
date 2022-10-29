import { Box, Card, Container, Fade, Typography } from "@mui/material";
import Page from "../ui-library/components/Page";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../ui-library/layout/Layout";
import Hero from "../components/landing/Hero";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Page title="MADverse">
      <Layout>
        <Container maxWidth={"md"}>
          <Hero />
        </Container>
      </Layout>
    </Page>
  );
};

export default Home;
