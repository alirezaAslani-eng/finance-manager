import { Box, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React, { PropsWithChildren } from "react";
import font from "next/font/local";
import { AuthProvider, MuiThemeProvider, SignupProvider } from "@/context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProviderInput } from "@/context/AuthContext";
import { CustomPageProps, PageComponent } from "@/types/page.types";

// * Load Dana Medume Font as Gloabal ================= >
const danaMediume = font({
  src: "../assets/fonts/DanaFaNum-DemiBold.woff2",
  variable: "--dana-md",
});
const peydaMedium = font({
  src: "../assets/fonts/PeydaWeb-Medium.woff",
  variable: "--peyda-md",
});

type GlobalAppProps = AuthProviderInput;
function _app({
  Component,
  pageProps,
}: AppProps<GlobalAppProps> & { Component: CustomPageProps }) {
  const Layout =
    Component.Layout ?? (({ children }: PropsWithChildren) => <>{children}</>);
  return (
    <QueryClientProvider client={queryClient}>
      <SignupProvider>
        <AuthProvider ssrUserInfo={pageProps.ssrUserInfo}>
          <Layout>
            <main className={`${danaMediume.variable} ${peydaMedium.variable}`}>
              <MuiThemeProvider>
                {/* Normalize Css ================== >*/}
                <CssBaseline />
                {/* Render Page ================== >*/}
                <Component {...pageProps} />
              </MuiThemeProvider>
            </main>
          </Layout>
        </AuthProvider>
      </SignupProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default _app;

export type { GlobalAppProps };
