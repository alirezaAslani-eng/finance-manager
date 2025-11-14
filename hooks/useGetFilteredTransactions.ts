import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import {
  filteredTransactionsInfinitQueryConfig,
  keys,
} from "@/config/react-query";
import { UseGetFilteredTransactions } from "./types/useGetFilteredTransactions.types";
import { FilteredTransactionResonse } from "@/types/api/transactionApi.types";
import { BadResponse } from "@/lib/utils";
import { TransactionList } from "@/types/transaction.types";
import { getMoreTransactions } from "@/api/get";

const useGetFilteredTransactions: UseGetFilteredTransactions = ({
  queriesToFilter,
}) => {
  // * Queries ============== ?
  const { filter } = queriesToFilter;
  // * IninitQuery ============ >s
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      FilteredTransactionResonse,
      BadResponse,
      TransactionList,
      typeof keys.allTransactions.filtered,
      null | string
    >({
      enabled: filter, // * enable, if filter state is on
      ...filteredTransactionsInfinitQueryConfig,
      queryFn: ({ pageParam }) => {
        return getMoreTransactions(pageParam, {
          ...queriesToFilter,
          filter: true, // * response is always filtered, enabled is true
        });
      },
    });

  const queryClient = useQueryClient();
  // * Reset cached data directly ===== >
  useEffect(() => {
    return () => {
      queryClient.setQueryData(
        filteredTransactionsInfinitQueryConfig.queryKey,
        () => {
          return {
            pages: [],
            pageParams: [],
          };
        }
      );
    };
  }, []);
  // * Offered Functions ================= >
  const loadMore = useCallback(() => {
    fetchNextPage();
  }, []);

  return {
    f_transactions: data,
    f_hasNextPage: hasNextPage,
    f_isFetchingNextPage: isFetchingNextPage,
    f_loadMore: loadMore,
  };
};

export default useGetFilteredTransactions;
