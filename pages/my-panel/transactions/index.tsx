import {
  HeadingFilter,
  SidebarFilter,
  Transactions,
} from "@/components/module";
import { keys } from "@/config/react-query";
import { useGetAllTransactions, useGetFilteredTransactions } from "@/hooks";
import { PanelLayout } from "@/layout";
import { transactionCursorConfig } from "@/lib/constant";
import { withAuth } from "@/lib/hoc";
import { transactionServices } from "@/lib/services";
import { BadResponse } from "@/lib/utils";
import { FilterSchemaType } from "@/lib/validations/transactionSchema";
import { GlobalAppProps } from "@/pages/_app";
import {
  AllTransactionResponse,
  TrnasactionFilterURLQueries,
} from "@/types/api/transactionApi.types";
import { PageComponent } from "@/types/page.types";
import { WrappedGetserverSideProps } from "@/types/ssr.types";
import { TransactionList } from "@/types/transaction.types";
import { identifyDate, identifyNumber, parseAQueryToArray } from "@/utils";
import { Box } from "@mui/material";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import React, { JSX, useState } from "react";
import { keyAllTransactions } from "@/lib/integration/react-query/keys";

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

const ssr: WrappedGetserverSideProps<GlobalAppProps> = async (
  context,
  { user }
) => {
  // * Context to access to queries which are filter parameters ==== >
  const { query } = context;

  // * includes only needed queries to filter ==== >
  const queries = parseTrsFilterQueries(query as TrnasactionFilterURLQueries);

  // * QueryClient for prefetch transactions ============= >
  const queryClient = new QueryClient();

  // * Services to initial transactions  =============== >
  const { initialTransactions } = transactionServices;

  // *  Prefetch Initial Transactions  ===== >
  await queryClient.prefetchInfiniteQuery<
    AllTransactionResponse,
    BadResponse,
    TransactionList
  >({
    initialPageParam: null,
    queryKey: keyAllTransactions.all(queries),
    queryFn: async () => {
      const initializeTransaction = await initialTransactions(
        user._id,
        queries // * to filter
      );
      const { initial_transactions, nextCursor } = initializeTransaction;
      return {
        nextCursor,
        transactions: initial_transactions,
        hasMore:
          initial_transactions.length == transactionCursorConfig.initialLimit,
      };
    },
  });

  // * SSR Render ================= <<
  return {
    props: {
      ssrUserInfo: user,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const getServerSideProps = withAuth(ssr);

export { getServerSideProps };

// * Local Helper ========= >
const parseTrsFilterQueries = function (
  queries: TrnasactionFilterURLQueries
): FilterSchemaType {
  const {
    accounts,
    categories,
    fromDate,
    toDate,
    minAmount,
    maxAmount,
    old,
    type,
  } = queries;
  return {
    accounts: parseAQueryToArray({ query: accounts ?? "" }),
    categories: parseAQueryToArray({ query: categories ?? "" }),
    fromDate: identifyDate(fromDate ?? ""),
    toDate: identifyDate(toDate ?? ""),
    maxAmount: identifyNumber(maxAmount ?? ""),
    minAmount: identifyNumber(minAmount ?? ""),
    old: old?.length ? (old == "true" ? true : null) : null,
    type: type?.length
      ? type === "0"
        ? "0"
        : type === "1"
        ? "1"
        : null
      : null,
  };
};
