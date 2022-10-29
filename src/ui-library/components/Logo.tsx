import { forwardRef } from "react";
import NextLink from "next/link";
// @mui
import { Box, BoxProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<any, Props>(function Logo(
  { disabledLink = false, sx },
  ref,
) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box ref={ref} sx={{ width: 100, height: 50, cursor: "pointer", ...sx }}>
      <Image
        src={"/logo.svg"}
        alt="HeyLabs logo"
        width={100}
        height={50}
      ></Image>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

export default Logo;
