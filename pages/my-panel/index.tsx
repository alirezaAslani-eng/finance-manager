import { Accounts, RecentTransactions } from "@/components/module";
import { PageComponent } from "@/types/page.types";
import { Box } from "@mui/material";
import { getRecentTransactions } from "@/server/services";
import { toSerializable } from "@/lib/utils";
import type { GetServerSidePropsWithAuth } from "@/types/ssr.types";
import type { GlobalAppProps } from "../_app";
import type { MainPageProps } from "@/types/pages/mainPage.types";
import { PanelLayout } from "@/layout";
import { getServerSidePropsWithAuth } from "@/server/HOFs";
import { useAuth } from "@/context";
import { useRecentTransactions } from "@/hooks";

const RecentTransAction_gap = "20px";
const index: PageComponent<MainPageProps> = ({ recentTransactions }) => {
  // * Recent Transactions ===================== >
  const { transactions } = useRecentTransactions({
    initialData: recentTransactions, // * SSR Data <<
  });

  const {
    userInfo: { accounts },
  } = useAuth();
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
            recentTransactions={transactions}
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

const ssr: GetServerSidePropsWithAuth<GlobalAppProps & MainPageProps> = async (
  _,
  { tokenPayload }
) => {
  const { _id: userId } = tokenPayload;

  // * Get Recent Transactions =================== >
  const recentTransactions = await getRecentTransactions(userId);

  return {
    props: {
      recentTransactions: toSerializable(recentTransactions),
    },
  };
};

export const getServerSideProps = getServerSidePropsWithAuth(ssr);
