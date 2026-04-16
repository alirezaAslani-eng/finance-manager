import { Box, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { PropsWithChildren } from "react";
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
import dana_rg from "@/constant/font/dana_rg";
import { useSetFontVarsToBody } from "@/hooks";

// * set all default queries ======= >
setAllDefaults(); // ! Side effet module

type GlobalAppProps = AuthProviderProps & { dehydratedState?: DehydratedState };
function _app({
  Component,
  pageProps,
}: AppProps<GlobalAppProps> & { Component: CustomPageProps }) {
  const Layout =
    Component.Layout ?? (({ children }: PropsWithChildren) => <>{children}</>);

  const { serialized_font_vars } = useSetFontVarsToBody(
    dana_md.variable,
    peyda_md.variable,
    dana_rg.variable,
  );

  return (
    <Box
      role="font-variables"
      component={"div"}
      bgcolor={"palette.background.default"}
      minHeight={"100svh"}
      className={serialized_font_vars}
    >
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
                </ModalProvider>
              </AuthProvider>
            </SignupProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </NuqsAdapter>
        </HydrationBoundary>
      </QueryClientProvider>
    </Box>
  );
}

export default _app;
export type { GlobalAppProps };
