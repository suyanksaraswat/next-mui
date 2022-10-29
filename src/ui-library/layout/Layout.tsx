import { ReactNode } from "react";
// next
// @mui
import { Box, Container, Stack } from "@mui/material";
// components
//
import MainHeader from "./main/MainHeader";
import MainFooter from "./main/MainFooter";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  noBackground?: boolean;
};

export default function Layout({ children }: Props) {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
      }}
    >
      <MainHeader />

      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Container>

      <Box sx={{ flexGrow: 1 }} />
      
      <MainFooter />
    </Stack>
  );
}
