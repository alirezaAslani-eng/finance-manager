import { Box, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React from "react";
import font from "next/font/local";
import { MuiThemeProvider } from "@/context";

// * Load Dana Medume Font as Gloabal ================= >
const danaMediume = font({
  src: "../assets/fonts/DanaFaNum-DemiBold.woff2",
  variable: "--dana-md",
});
const peydaMedium = font({
  src: "../assets/fonts/PeydaWeb-Medium.woff",
  variable: "--peyda-md",
});

function _app({ Component, pageProps }: AppProps) {
  return (
    <main className={`${danaMediume.variable} ${peydaMedium.variable}`}>
      <MuiThemeProvider>
        {/* Normalize Css ================== >*/}
        <CssBaseline />
        {/* Render Page ================== >*/}
        <Component {...pageProps} />
      </MuiThemeProvider>
    </main>
  );
}

export default _app;
