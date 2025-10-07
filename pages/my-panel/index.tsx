import { Accounts, RecentTransactions } from "@/components/module";
import { PageComponent } from "@/types/page.types";
import { Box } from "@mui/material";
import { transactionServices } from "@/lib/services";
import { parseDoc } from "@/lib/utils";
import type { WrappedGetserverSideProps } from "@/types/ssr.types";
import type { GlobalAppProps } from "../_app";
import type { MainPageProps } from "@/types/pages/mainPage.types";
import { PanelLayout } from "@/layout";
import { withAuth } from "@/lib/hoc";
import { useContext } from "react";
import { AuthContex } from "@/context";

const RecentTransAction_gap = "20px";
const index: PageComponent<MainPageProps> = ({ recentTransactions }) => {
  const {
    userInfo: { accounts },
  } = useContext(AuthContex)!;
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
          <Accounts accounts={accounts} />
        </Box>
      </Box>
    </Box>
  );
};

index.Layout = PanelLayout;

export default index;

const ssr: WrappedGetserverSideProps<GlobalAppProps & MainPageProps> = async (
  _,
  { user }
) => {
  // * Services ================ >>
  const { getRecentTransaction } = transactionServices;

  // * Get Recent Transactions =================== >
  const recentTransactions = await getRecentTransaction(user._id);

  return {
    props: {
      recentTransactions: parseDoc(recentTransactions),
      ssrUserInfo: parseDoc(user),
    },
  };
};

export const getServerSideProps = withAuth(ssr);
