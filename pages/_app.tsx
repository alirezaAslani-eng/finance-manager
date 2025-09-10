import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React from "react";
import loadDanaFont from "next/font/local";
import { MuiThemeProvider } from "@/context";

// * Load Dana Medume Font as Gloabal ================= >
const danaMediume = loadDanaFont({
  src: "../assets/fonts/DanaFaNum-DemiBold.woff2",
  variable: "--dana-md",
});

function _app({ Component, pageProps }: AppProps) {
  return (
    <main className={danaMediume.className}>
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
