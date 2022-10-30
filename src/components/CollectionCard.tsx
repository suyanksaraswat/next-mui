import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";

interface CollectionCardProps {
  title: string;
  owner: string;
  img: string;
  logo: string;
  onClick: () => void;
}

export default function CollectionCard({
  img,
  logo,
  onClick,
  title,
  owner,
}: CollectionCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 420,
        borderRadius: 2,
        height: "100%",
        button: { borderRadius: 2 },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          border: "1px solid #333333",
          padding: 1,
          background: "#171717",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={img}
          alt="asset"
          sx={{
            border: "1px solid #333333",
            borderRadius: 2,
            objectFit: "contain",
            background: "#171717",
          }}
        />
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "#171717",
              border: "1px solid #333333",
              top: "150px",
              height: "100px",
              width: "100px",
              borderRadius: "12px",
              backgroundImage: `url(${logo})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
          <Typography
            variant="h6"
            mt={5}
            sx={{
              fontFamily: "Syne",
            }}
          >
            {title}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body2" sx={{ color: "gray" }} mr={1}>
              {owner}
            </Typography>
            <CheckCircleIcon fontSize="small" sx={{ color: "#4689ED" }} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
