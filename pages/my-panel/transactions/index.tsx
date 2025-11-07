import {
  HeadingFilter,
  SidebarFilter,
  Transactions,
} from "@/components/module";
import { PanelLayout } from "@/layout";
import { withAuth } from "@/lib/hoc";
import { transactionServices } from "@/lib/services";
import { GlobalAppProps } from "@/pages/_app";
import { PageComponent } from "@/types/page.types";
import { AllTransactionPageProps } from "@/types/pages/AllTransactionsProp.type";
import { WrappedGetserverSideProps } from "@/types/ssr.types";
import { Box } from "@mui/material";
import React, { useState } from "react";

const index: PageComponent<AllTransactionPageProps> = ({
  hasMore,
  nextCursor,
  transactions,
}) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  //  * Events ====================>
  const openSidebar = () => {
    setIsOpenSidebar(true);
  };
  const closeSidebar = () => {
    setIsOpenSidebar(false);
  };

  return (
    <Box padding={"30px"}>
      {/* Heading Filter  ========================= > */}
      <HeadingFilter onSidebar={openSidebar} />
      {/* Sidebar Advanced Filter ========================= > */}
      <SidebarFilter open={isOpenSidebar} onClose={closeSidebar} />
      {/* Transactions ===================== > */}
      <Box sx={{ mt: "20px" }}>
        <Transactions />
      </Box>
    </Box>
  );
};

index.Layout = PanelLayout;
export default index;

const ssr: WrappedGetserverSideProps<
  GlobalAppProps & AllTransactionPageProps
> = async (context, { user }) => {
  const { initialTransactions } = transactionServices;
  // * Get 50 initialzed transactions ==== >
  const initializeTransaction = await initialTransactions(user._id);
  const { initial_transactions, lastId } = initializeTransaction;
  return {
    props: {
      ssrUserInfo: user,
      transactions: initial_transactions,
      lastId,
      // * less than 50 means user can't request to server to load more transactions
      hasMore: initial_transactions.length < 50 ? false : true,
    },
  };
};

const getServerSideProps = withAuth(ssr);

export { getServerSideProps };
