import {
  HeadingFilter,
  SidebarFilter,
  Transactions,
} from "@/components/module";
import { keys } from "@/config/react-query";
import { useGetAllTransactions, useGetFilteredTransactions } from "@/hooks";
import { PanelLayout } from "@/layout";
import { allTransactionsConfig } from "@/lib/constant";
import { withAuth } from "@/lib/hoc";
import { transactionServices } from "@/lib/services";
import { BadResponse } from "@/lib/utils";
import { GlobalAppProps } from "@/pages/_app";
import {
  AllTransactionResponse,
  FilteredTransactionResonse,
  TrnasactionFilterURLQueries,
} from "@/types/api/transactionApi.types";
import { PageComponent } from "@/types/page.types";
import { TransactionListPageProps } from "@/types/pages/transactionListPageProps.types";
import { WrappedGetserverSideProps } from "@/types/ssr.types";
import { TransactionList } from "@/types/transaction.types";
import { Box } from "@mui/material";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const index: PageComponent<TransactionListPageProps> = ({ isFiltered }) => {
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
  GlobalAppProps & TransactionListPageProps
> = async (context, { user }) => {
  // * Context to access to queries which are filter parameters ==== >
  const { query } = context;

  // * Prefetch State filtered transactions or all transactions  ===== >
  const isFiltered = query.filter == "true";

  // * includes only needed queries to filter ==== >
  const queries: Omit<TrnasactionFilterURLQueries, "filter"> = {
    accounts: query.accounts,
    categories: query?.categories,
    fromDate: query?.fromDate,
    toDate: query?.toDate,
    minAmount: query?.minAmount,
    maxAmount: query?.maxAmount,
    old: query?.old,
    type: query?.type,
  };

  // * QueryClient for prefetch transactions ============= >
  const queryClient = new QueryClient();

  // * Services to initial transactions  =============== >
  const { initialTransactions } = transactionServices;

  // * Render Page For All Transactions ================= >
  if (!isFiltered) {
  // *  Prefetch Initial Transactions (Without Filtering) === >
  await queryClient.prefetchInfiniteQuery<
    AllTransactionResponse,
    BadResponse,
    TransactionList
  >({
      initialPageParam: null,
      queryKey: keys.allTransactions.all,
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
    // * SSR Render ================= <<
    return {
      props: {
        ssrUserInfo: user,
        dehydratedState: dehydrate(queryClient),
        isFiltered,
      },
    };
  }
  // * Render For Filtered Transactions =============== >
  await queryClient.prefetchInfiniteQuery<
    FilteredTransactionResonse,
    BadResponse,
    TransactionList,
    typeof keys.allTransactions.filtered,
    null | string
  >({
    initialPageParam: null,
    queryKey: keys.allTransactions.filtered,
    queryFn: async () => {
      const filtered_init = await initialTransactions(user._id, queries);
      const { initial_transactions: init_filtered_trs, nextCursor } =
        filtered_init;
      return {
        nextCursor,
        transactions: init_filtered_trs,
        hasMore:
          init_filtered_trs.length < allTransactionsConfig.initialLimit
            ? false
            : true,
      };
    },
  });
  // * SSR Render ================= <<
  return {
    props: {
      ssrUserInfo: user,
      dehydratedState: dehydrate(queryClient),
      isFiltered,
    },
  };
};

const getServerSideProps = withAuth(ssr);

export { getServerSideProps };
