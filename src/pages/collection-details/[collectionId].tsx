import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import StaticCollectionDetails from "../../components/StaticCollectionDetails";
import DynamicCollectionDetails from "../../components/DynamicCollectionDetails";
import Page from "../../ui-library/components/Page";
import Layout from "../../ui-library/layout/Layout";
import { staticCollectionData } from "../../utils/constants";

const Home: NextPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;

  const staticRoutes = Object.keys(staticCollectionData);

  return (
    <Page title="MADverse">
      <Layout>
        <Container sx={{ position: "relative" }}>
          {collectionId && staticRoutes.includes(collectionId?.toString()) ? (
            <StaticCollectionDetails
              collectionId={collectionId?.toString() || ""}
            />
          ) : (
            <DynamicCollectionDetails
              collectionId={collectionId?.toString() || ""}
            />
          )}
        </Container>
      </Layout>
    </Page>
  );
};

export default Home;
