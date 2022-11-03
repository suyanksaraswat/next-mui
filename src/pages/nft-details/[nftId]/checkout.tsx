import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import NftCheckout from "../../../components/NftCheckout";
import Page from "../../../ui-library/components/Page";
import Layout from "../../../ui-library/layout/Layout";

const NftDetails: NextPage = () => {
  const router = useRouter();
  const { nftId } = router.query;

  return (
    <Page title="HeyLabs">
      <Layout>
        <Container sx={{ position: "relative" }}>
          <NftCheckout nftId={nftId?.toString() || ""} />
        </Container>
      </Layout>
    </Page>
  );
};

export default NftDetails;
