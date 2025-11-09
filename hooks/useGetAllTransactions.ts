import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { UseGetAllTransactions } from "./types/useGetAllTransactions.types";
import { transactionsInfinitQueryConfig } from "@/config/react-query";
import { AllTransactionResponse } from "@/pages/api/types/transactionApi.types";

const useGetAllTransactions: UseGetAllTransactions = () => {
  // * IninitQuery ============ >s
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(transactionsInfinitQueryConfig);

  const queryClient = useQueryClient();
  // * Reset cached data directly ===== >
  useEffect(() => {
    return () => {
      queryClient.setQueryData(transactionsInfinitQueryConfig.queryKey, () => {
        return {
          pages: [],
          pageParams: [],
        };
      });
    };
  }, []);
  // * Offered Functions ================= >
  const loadMore = useCallback(() => {
    fetchNextPage();
  }, []);

  return { transactions: data, hasNextPage, isFetchingNextPage, loadMore };
};

export default useGetAllTransactions;
