import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import StaticNftDetails from "../../components/StaticNftDetails";
import Page from "../../ui-library/components/Page";
import Layout from "../../ui-library/layout/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  const { nftId } = router.query;

  return (
    <Page title="MADverse">
      <Layout>
        <Container sx={{ position: "relative" }}>
          <StaticNftDetails
            nftId={nftId?.toString() || ""}
          />
        </Container>
      </Layout>
    </Page>
  );
};

export default Home;
