import {
  HeadingFilter,
  SidebarFilter,
  Transactions,
} from "@/components/module";
import { transactionsInfinitQueryConfig } from "@/config/react-query";
import { PanelLayout } from "@/layout";
import { allTransactionsConfig } from "@/lib/constant";
import { withAuth } from "@/lib/hoc";
import { transactionServices } from "@/lib/services";
import { BadResponse } from "@/lib/utils";
import { GlobalAppProps } from "@/pages/_app";
import { AllTransactionResponse } from "@/types/api/transactionApi.types";
import { PageComponent } from "@/types/page.types";
import { WrappedGetserverSideProps } from "@/types/ssr.types";
import { TransactionList } from "@/types/transaction.types";
import { Box } from "@mui/material";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const index: PageComponent = () => {
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

const ssr: WrappedGetserverSideProps<GlobalAppProps> = async (_, { user }) => {
  const queryClient = new QueryClient();
  const { initialTransactions } = transactionServices;

  // *  Prefetch Initial Transactions (Without Filtering) === >
  const { queryKey, initialPageParam } = transactionsInfinitQueryConfig;
  await queryClient.prefetchInfiniteQuery<
    AllTransactionResponse,
    BadResponse,
    TransactionList
  >({
    initialPageParam,
    queryKey,
    queryFn: async () => {
      const initializeTransaction = await initialTransactions(user._id);
      const { initial_transactions, nextCursor } = initializeTransaction;
      return {
        nextCursor,
        transactions: initial_transactions,
        hasMore:
          initial_transactions.length == allTransactionsConfig.initialLimit,
      };
    },
  });

  return {
    props: {
      ssrUserInfo: user,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const getServerSideProps = withAuth(ssr);

export { getServerSideProps };
