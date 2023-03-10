import BetaHeader from "@/components/BetaHeader";
import Header from "@/components/Header";
import LottoProvider from "@/contexts/LottoContext";
import { GlobalStyle } from "@/styles/globalStyles";
import { theme } from "@/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LottoProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <Component {...pageProps} />
        </ThemeProvider>
      </LottoProvider>
    </>
  );
}
