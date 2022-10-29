import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { Provider as WagmiProvider } from "wagmi";
import ThemeProvider from "../ui-library/theme/index";
import { WagmiClient } from "../utils/wagmiClient";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiProvider client={WagmiClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </WagmiProvider>
  );
};

export default MyApp;
