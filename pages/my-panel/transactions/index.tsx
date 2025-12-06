import { FilterPanel, Transactions } from "@/components/module";
import { MuiButton } from "@/components/ui";
import { FilterTrsStateProvider } from "@/context/transactions";
import { useBreakePoints } from "@/hooks";
import { PanelLayout } from "@/layout";
import { transactionCursorConfig } from "@/lib/constant";
import { withAuth } from "@/lib/hoc";
import { transactionServices } from "@/lib/services";
import { BadResponse } from "@/lib/utils";
import { FilterSchemaType } from "@/lib/validations/transactionSchema";
import type { GlobalAppProps } from "@/types/pages/Global.types";
import { peyda_md } from "@/utils/font";
import {
  AllTransactionResponse,
  TrnasactionFilterURLQueries,
} from "@/types/api/transactionApi.types";
import { PageComponent } from "@/types/page.types";
import { WrappedGetserverSideProps } from "@/types/ssr.types";
import { TransactionList } from "@/types/transaction.types";
import { identifyDate, identifyNumber, parseAQueryToArray } from "@/utils";
import { Box, Dialog, Typography } from "@mui/material";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import React, { JSX, useState } from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { keyAllTransactions } from "@/lib/integration/react-query/keys";

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
  const { is_after_540 } = useBreakePoints();
  return (
    <>
      <MuiButton
        reset
        buttonProps={{
          variant: "outlined",
          onClick: openSidebar,
          sx: {
          padding: {
            xs: "12px",
          },
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          },
        }}
      >
        <TuneRoundedIcon />
        <Typography>{"فیلتر ها"}</Typography>
      </MuiButton>
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
