import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { UseGetAllTransactions } from "./types/useGetAllTransactions.types";
import { keys } from "@/config/react-query";
import { AllTransactionResponse } from "@/types/api/transactionApi.types";
import { getMoreTransactions } from "@/api/get";
import { TransactionList } from "@/types/transaction.types";
import { BadResponse } from "@/lib/utils";

const useGetAllTransactions: UseGetAllTransactions = (queries) => {
  // * IninitQuery ============ >s
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      AllTransactionResponse,
      BadResponse,
      TransactionList,
      typeof keys.allTransactions.all,
      null | string
    >({
      initialPageParam: null,
      queryKey: keys.allTransactions.all,
      // * staleTime of All loaded pages is Infinity because data will updates by SSR or user's filtering action ==== >
      staleTime: Infinity,
      // * gcTime is 0 because in each mount SSR start prefetch and fill the cache with fresh data ===== >
      gcTime: 0,
      // * first lastPage is from prefetched data ===== >
      getNextPageParam: (lastPage) => {
        // * Last data from response tells us if there is more page ----- >
        return lastPage.hasMore ? lastPage.nextCursor : null;
      },
      // * transform pages into just an array ------ >
      select: (data) => {
        const transformed: TransactionList = data.pages.flatMap((page) => {
          return page.transactions;
        });
        return transformed;
      },
      queryFn: ({ pageParam }) => {
        // * send next page to load more and queries which is for filters === >
        return getMoreTransactions(pageParam, queries);
      },
    });

  const queryClient = useQueryClient();
  // * Reset cached data directly ===== >
  useEffect(() => {
    return () => {
      queryClient.setQueryData(keys.allTransactions.all, () => {
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
