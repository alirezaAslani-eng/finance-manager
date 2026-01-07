import { FilterPanel, Transactions } from "@/components/module";
import { FilterTrsStateProvider } from "@/context";
import { PanelLayout } from "@/layout";
import { transactionCursorConfig } from "@/lib/constant";
import { getServerSidePropsWithAuth } from "@/server/HOFs";
import { initializeTransactions } from "@/server/services";
import { FilterTransactionSchemaType } from "@/lib/validations/types";
import type { GlobalAppProps } from "@/types/pages/Global.types";
import peyda_md from "@/constant/font/peyda_md";
import { AllTransactionResponse } from "@/types/api/transactionApi.types";
import { PageComponent } from "@/types/page.types";
import { GetServerSidePropsWithAuth } from "@/types/ssr.types";
import { identifyDate, identifyNumber, parseURLQueryToArray } from "@/lib/utils";
import { Box, Button, Dialog, Typography, useMediaQuery } from "@mui/material";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import React, { JSX, useState } from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { keyAllTransactions } from "@/packages/react-query";

const index: PageComponent = () => {
  return (
    <Box padding={{ xs: "16px", _540: "30px" }}>
      <FilterTrsStateProvider>
        {/* // * Filter Modla and Open Filter Modal Button ==== > */}
        <FilterModalOpener />
        {/* // * Transactions ===================== > */}
        <Box sx={{ mt: "20px" }}>
          <Transactions />
        </Box>
      </FilterTrsStateProvider>
    </Box>
  );
};

index.Layout = PanelLayout;
export default index;

/**
 * This is a wrrapper of two elements A Filtering Modal and a button that trigger it to open
 * they are wrapped to avoid sharing open or close state throught the whole page
 */
function FilterModalOpener(): JSX.Element {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  //  * Events ====================>
  const openSidebar = () => {
    setIsOpenSidebar(true);
  };
  const closeSidebar = () => {
    setIsOpenSidebar(false);
  };

  // * use breakepoints to show a full screen filter panel in mobile size ===== >
  const is_after_540 = useMediaQuery((tm) => tm.breakpoints.up("_540"));
  return (
    <>
      <Button
        variant="outlined"
        onClick={openSidebar}
        sx={{
          padding: {
            xs: "12px",
          },
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <TuneRoundedIcon />
        <Typography>{"فیلتر ها"}</Typography>
      </Button>
      {/* Modal Filter ========================= > */}

      <Dialog
        open={isOpenSidebar}
        onClose={closeSidebar}
        fullWidth
        fullScreen={!is_after_540}
      >
        <Box padding={"20px"} className={peyda_md.className}>
          <FilterPanel onClose={closeSidebar} />
        </Box>
      </Dialog>
    </>
  );
}

interface TrnasactionFilterURLQueries
  extends Record<keyof FilterTransactionSchemaType, string | undefined> {}

const ssr: GetServerSidePropsWithAuth<GlobalAppProps> = async (
  context,
  { tokenPayload }
) => {
  // * Context to access to queries which are filter parameters ==== >
  const { query } = context;

  const { _id: userId } = tokenPayload;

  // * includes only needed queries to filter ==== >
  const queries = parseTrsFilterQueries(query as TrnasactionFilterURLQueries);

  // * QueryClient for prefetch transactions ============= >
  const queryClient = new QueryClient();

  // *  Prefetch Initial Transactions  ===== >
  await queryClient.prefetchInfiniteQuery<AllTransactionResponse>({
    initialPageParam: null,
    queryKey: keyAllTransactions.all(queries),
    queryFn: async () => {
      const initializeTransaction = await initializeTransactions(
        userId,
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
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const getServerSideProps = getServerSidePropsWithAuth(ssr);

export { getServerSideProps };

// * Local Helper ========= >
const parseTrsFilterQueries = function (
  queries: TrnasactionFilterURLQueries
): FilterTransactionSchemaType {
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
    accounts: parseURLQueryToArray({ query: accounts ?? "" }),
    categories: parseURLQueryToArray({ query: categories ?? "" }),
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
