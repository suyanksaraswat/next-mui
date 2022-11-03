import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import ThemeProvider from "../ui-library/theme/index";
import {
  wagmiClient,
  chains,
  WagmiConfig,
  RainbowKitProvider,
} from "../utils/walletSetup";
import { darkTheme } from "@rainbow-me/rainbowkit";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#ffffff",
          accentColorForeground: "#000000",
        })}
      >
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
