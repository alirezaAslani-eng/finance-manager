import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React from "react";
import loadDanaFont from "next/font/local";


// * Load Dana Medume Font as Gloabal ================= >
const danaMediume = loadDanaFont({
  src: "../assets/fonts/DanaFaNum-DemiBold.woff2",
});

function _app({ Component, pageProps }: AppProps) {
  return (
    <main className={danaMediume.className}>
      {/* Normalize Css ================== >*/}
      <CssBaseline />
      {/* Render Page ================== >*/}
      <Component {...pageProps} />
    </main>
  );
}

export default _app;
