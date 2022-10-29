import { ReactNode } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { Box, Container, Stack, Typography } from "@mui/material";
// components
import Logo from "../../components/Logo";
//
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { pathname } = useRouter();

  const isHome = pathname === "/";

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      {children}

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
            position: "relative",
            bgcolor: "background.default",
          }}
        >
          <Container>
            <Logo sx={{ mb: 1, mx: "auto" }} />

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> Made with ❤️ in India &nbsp;
              {/* <Link href="https://minimals.cc/">minimals.cc</Link> */}
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
