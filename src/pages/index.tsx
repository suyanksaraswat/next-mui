import { Box, Card, Container, Fade, Typography } from "@mui/material";
import Page from "../ui-library/components/Page";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../ui-library/layout/Layout";
import Hero from "../components/landing/Hero";
import TrendingCollections from "../components/landing/TrendingCollections";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Page title="HeyLabs">
      <Layout>
        <Container>
          <Hero />
          <TrendingCollections />
        </Container>
      </Layout>
    </Page>
  );
};

export default Home;
