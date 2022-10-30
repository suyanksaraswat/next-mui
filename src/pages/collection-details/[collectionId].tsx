import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import StaticCollectionDetails from "../../components/StaticCollectionDetails";
import Page from "../../ui-library/components/Page";
import Layout from "../../ui-library/layout/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;

  return (
    <Page title="MADverse">
      <Layout>
        <Container sx={{ position: "relative" }}>
          <StaticCollectionDetails
            collectionId={collectionId?.toString() || ""}
          />
        </Container>
      </Layout>
    </Page>
  );
};

export default Home;
