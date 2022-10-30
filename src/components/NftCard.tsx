import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface NftCardProps {
  name: string;
  owner: string;
  img: string;
  currency?: string;
  price?: string;
  onClick: () => void;
}

export default function NftCard({
  img,
  onClick,
  name,
  owner,
  price,
  currency,
}: NftCardProps) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, button: { borderRadius: 2 } }}>
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
          height="250"
          image={img}
          alt="asset"
          sx={{
            border: "1px solid #333333",
            borderRadius: 2,
          }}
        />
        <CardContent>
          <Typography
            variant="body1"
            mt={2}
            sx={{
              fontFamily: "Syne",
            }}
          >
            {name}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body2" sx={{ color: "gray" }} mr={1}>
              {owner}
            </Typography>
            <CheckCircleIcon fontSize="small" sx={{ color: "#4689ED" }} />
          </Box>
          {price && (
            <Box display="flex" gap={1}>
              <Typography variant="body1" sx={{ color: "white" }}>
                {currency}
              </Typography>
              <Typography variant="body1" sx={{ color: "white" }}>
                {price}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
