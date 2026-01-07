import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React, { PropsWithChildren } from "react";
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
import { queryClient, setAllDefaults } from "@/packages/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProviderProps } from "@/context";
import { CustomPageProps } from "@/types/page.types";
import { ModalGroup } from "@/components/common";
import dana_md from "@/constant/font/dana_md";
import peyda_md from "@/constant/font/peyda_md";

// * set all default queries ======= >
setAllDefaults(); // ! Side effet module

type GlobalAppProps = AuthProviderProps & { dehydratedState?: DehydratedState };
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
export type { GlobalAppProps };
