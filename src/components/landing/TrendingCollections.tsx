import { Box, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import CollectionCard from "../CollectionCard";
import { useEffect, useState } from "react";

export default function TrendingCollections() {
  const router = useRouter();
  const [trendingCollections] = useState<any>([
    {
      _id: "63517f1b6f535b65bc2dc7fe",
      user_id: {
        first_name: "Gajendra",
        last_name: "Verma",
      },
      name: "Maar Sutteya",
      feature_image:
        "https://hey-nft.s3.ap-south-1.amazonaws.com/Gajendra+Verma+/Tier+1-+Poster/Maar+Sutteya_Poster+for+Hey.png",
      description:
        "Check out music sensation Gajendra Verma's new song Maar Sutteya's NFT collection. With a song that plays with the strings of your heart, this exclusive NFT collection gives you the opportunity to know about Gajendra Verma a little more! Being one of the first Indian singers to enter Web3 with an exclusive NFT collection, attached with real-life utilities. This collection is ultra special for all his fans. There are 3 categories to this collection.",
      banners: [
        {
          file: "https://hey-nft.s3.ap-south-1.amazonaws.com/Gajendra+Verma+/Collection+Page+Banner/NFTs+Banner.png",
        },
      ],
    },
    {
      _id: "shabaash-mithu",
      user_id: {
        first_name: "Viacom18",
        last_name: "Studios",
      },
      feature_image:
        "https://hey-nft.s3.ap-south-1.amazonaws.com/nft_marketplace/logo.jpg",
      name: "Shabaash Mithu",
      banners: [
        {
          file: "https://hey-nft.s3.ap-south-1.amazonaws.com/nft_marketplace/banner1.jpg",
        },
      ],
    },
    {
      _id: "idos",
      user_id: {
        first_name: "Sunny",
        last_name: "Leone",
      },
      feature_image: "/assets/i-dream-of-sunny.png",
      name: "I Dream of Sunny",
      banners: [
        {
          file: "https://cdn.shopify.com/s/files/1/0554/6393/6105/files/nft_banner_final_2_1950x.jpg",
        },
      ],
    },
    {
      _id: "viral-fission",
      user_id: {
        first_name: "Viral",
        last_name: "Fission",
      },
      feature_image:
        "https://hey-nft.s3.ap-south-1.amazonaws.com/Viral+Fission/Collide.png",
      name: "Collide",
      banners: [
        {
          file: "https://hey-nft.s3.ap-south-1.amazonaws.com/Viral+Fission/Collide.png",
        },
      ],
    },
  ]);

  return (
    <Box
      paddingX={{ xs: 4, sm: 4, md: 4, lg: 0, xl: 0 }}
      paddingY={{ xs: 4, sm: 4, md: 8, lg: 8, xl: 8 }}
      maxWidth={1200}
      m="auto"
      id="trending-nfts"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h3"
          margin="auto"
          sx={{
            fontFamily: "Syne",
          }}
        >
          Trending Collections
        </Typography>
      </Box>
      <Box display="flex" mb={7}>
        <Typography
          variant="body1"
          margin="auto"
          sx={{
            color: "gray",
            textAlign: {
              xl: "left",
              lg: "left",
              md: "left",
              sm: "center",
              xs: "center",
            },
          }}
        >
          Fantastic Projects Loaded with Benefits!
        </Typography>
      </Box>
      <Grid container spacing={4} alignItems="center" mb={8}>
        {trendingCollections
          ?.filter((res: any) => res?._id !== "62fe6a33580ac36db586f5c7")
          ?.map((res: any, idx: number) => (
            <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={idx}>
              <CollectionCard
                title={res?.name}
                img={res?.banners?.[0]?.file}
                logo={res?.feature_image}
                owner={`${res?.user_id.first_name} ${res?.user_id.last_name}`}
                onClick={() => router.push(`/collection-details/${res?._id}`)}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
