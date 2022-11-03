import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import StaticNftDetails from "../../../components/StaticNftDetails";
import DynamicNftDetails from "../../../components/DynamicNftDetails";
import Page from "../../../ui-library/components/Page";
import Layout from "../../../ui-library/layout/Layout";
import { staticNftData } from "../../../utils/constants";

const NftDetails: NextPage = () => {
  const router = useRouter();
  const { nftId } = router.query;

  const staticRoutes = Object.keys(staticNftData);

  return (
    <Page title="HeyLabs">
      <Layout>
        <Container sx={{ position: "relative" }}>
          {nftId && staticRoutes.includes(nftId?.toString()) ? (
            <StaticNftDetails nftId={nftId?.toString() || ""} />
          ) : (
            <DynamicNftDetails nftId={nftId?.toString() || ""} />
          )}
        </Container>
      </Layout>
    </Page>
  );
};

export default NftDetails;
