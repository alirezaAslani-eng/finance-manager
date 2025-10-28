import { Box, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React, { PropsWithChildren } from "react";
import font from "next/font/local";
import {
  AuthProvider,
  ModalProvider,
  MuiThemeProvider,
  SignupProvider,
} from "@/context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProviderInput } from "@/context/AuthContext";
import { CustomPageProps } from "@/types/page.types";
import { ModalGroup } from "@/components/common";

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
      {/* // * Signup Context ----------- >  */}
      <SignupProvider>
        {/* // * Auth Context ----------- >  */}
        <AuthProvider ssrUserInfo={pageProps.ssrUserInfo}>
          {/* // * Modal Context ----------- >  */}
          <ModalProvider>
            {/* // * div tag to add font variable ----------- >  */}
            <div className={`${danaMediume.variable} ${peydaMedium.variable}`}>
              {/* // * Mui Theme Context ----------- >  */}
              <MuiThemeProvider>
                {/* // * Normalize Css --------- >*/}
                <CssBaseline />
                {/* // * Layout ------ > */}
                <Layout>
                  {/* // * Page ------- > */}
                  <Component {...pageProps} />
                </Layout>
                {/* // * Modals ------ > */}
                <ModalGroup />
              </MuiThemeProvider>
            </div>
          </ModalProvider>
        </AuthProvider>
      </SignupProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default _app;
export { danaMediume, peydaMedium };
export type { GlobalAppProps };
