import { Accounts, RecentTransactions } from "@/components/module";
import { useBreakePoints } from "@/hooks";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box } from "@mui/material";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { GlobalAppProps } from "../_app";
import type { MainPageProps } from "@/types/pages/mainPage.types";
import {
  accountServices,
  transactionServices,
  userServices,
} from "@/lib/services";
import { parseDoc, redirect } from "@/lib/utils";
import { GetMeOutput } from "@/types/user.types";

const RecentTransAction_gap = "20px";
const index: PageComponent<MainPageProps> = ({ recentTransactions }) => {
  return (
    <Box
      sx={{
        padding: {
          xs: "30px 0px",
          md: "35px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            xl: "row",
          },
          justifyContent: "center",
          alignItems: "stretch",
          gap: "35px",
        }}
      >
        {/* Transatcions ================ > */}
        <Box
          sx={{
            flex: "1",
            minWidth: "0",
            order: {
              xs: "2",
              md: "1",
            },
          }}
        >
          <RecentTransactions
            containerProps={{ sx: { gap: RecentTransAction_gap } }}
          />
        </Box>
        {/* Accounts Slider ====================== > */}
        <Box
          sx={{
            flex: "1",
            minWidth: "0",
            order: {
              xs: "1",
              md: "2",
            },
          }}
        >
          <Accounts />
        </Box>
      </Box>
    </Box>
  );
};

index.Layout = PanelLayout;

export default index;

const getServerSideProps: GetServerSideProps<
  GlobalAppProps & MainPageProps
> = async (context: GetServerSidePropsContext) => {
  // * Context =================== >
  const { req } = context;

  // * User Services ================ >>
  const { getUserInfo } = userServices;
  const { getRecentTransaction } = transactionServices;
  const { hasAccount } = accountServices;

  // * Auth User redirect or return userInfo ================= >
  const userInfo = (await getUserInfo(req.cookies.token)) as GetMeOutput;
  const isAuth = redirect(!!!userInfo, { destination: "/auth/signin" });
  if (isAuth) return isAuth;

  // * Get Recent Transactions =================== >
  const recentTransactions = await getRecentTransaction(userInfo._id);

  // * Dose User have Account ============== >
  const userHasAccount = await hasAccount(userInfo._id);  
  const has = redirect(!!!userHasAccount, {
    destination: "/my-panel/init",
  });
  if (has) return has;

  return {
    props: {
      recentTransactions: parseDoc(recentTransactions),
      ssrUserInfo: parseDoc(userInfo),
    },
  };
};
export { getServerSideProps };
