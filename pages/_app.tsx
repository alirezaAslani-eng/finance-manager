import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React, { PropsWithChildren } from "react";
import font from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

import {
  AuthProvider,
  ModalProvider,
  MuiThemeProvider,
  SignupProvider,
} from "@/context";
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryClient } from "@/lib/integration/react-query/client";
import { setAllDefaults } from "@/lib/integration/react-query/client/defaults";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProviderInput } from "@/context/AuthContext";
import { CustomPageProps } from "@/types/page.types";
import { ModalGroup } from "@/components/common";
import { dana_md, peyda_md } from "@/utils/font";

// * set all default queries ======= >
setAllDefaults(); // ! Side effet module


type GlobalAppProps = AuthProviderInput & { dehydratedState?: DehydratedState };
function _app({
  Component,
  pageProps,
}: AppProps<GlobalAppProps> & { Component: CustomPageProps }) {
  const Layout =
    Component.Layout ?? (({ children }: PropsWithChildren) => <>{children}</>);
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps?.dehydratedState}>
        {/* // * unqs Adapter for SSR ----------------- >*/}
        <NuqsAdapter>
          {/* // * Signup Context ----------- >  */}
          <SignupProvider>
            {/* // * Auth Context ----------- >  */}
            <AuthProvider ssrUserInfo={pageProps.ssrUserInfo}>
              {/* // * Modal Context ----------- >  */}
              <ModalProvider>
                {/* // * div tag to add font variable ----------- >  */}
                <div className={`${dana_md.variable} ${peyda_md.variable}`}>
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
        </NuqsAdapter>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default _app;
export { dana_md as danaMediume, dana_md as peydaMedium };
export type { GlobalAppProps };
