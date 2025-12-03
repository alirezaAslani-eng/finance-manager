import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { UseGetInfinitTransactions } from "./types/useGetInfinitTransactions.types";
import { AllTransactionResponse } from "@/types/api/transactionApi.types";
import { getMoreTransactions } from "@/api/get";
import { TransactionList } from "@/types/transaction.types";
import { BadResponse } from "@/lib/utils";
import { useFilterTrsState } from "@/context/transactions";
import { keyAllTransactions } from "@/lib/integration/react-query/keys";
import { TransactionsQueryKey } from "@/lib/integration/react-query/keys/types";

const useGetInfinitTransactions: UseGetInfinitTransactions = () => {
  // * Transaction's filter & queries states =========== >
  const {
    filterState: {
      filter,
      accounts,
      categories,
      fromDate,
      maxAmount,
      minAmount,
      old,
      toDate,
      type,
    },
    dynamicQueryKey,
  } = useFilterTrsState();

  // * IninitQuery ============ >
  const {
    fetchNextPage,
    data,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
  } = useInfiniteQuery<
    AllTransactionResponse,
    BadResponse,
    TransactionList,
    TransactionsQueryKey,
    null | string
  >({
    initialPageParam: null,
    queryKey: keyAllTransactions.all(dynamicQueryKey),
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
      return getMoreTransactions(pageParam, {
        accounts,
        categories,
        fromDate,
        maxAmount,
        minAmount,
        old,
        toDate,
        type,
      });
    },
  });

  const qrc = useQueryClient();
  useEffect(() => {
    return () => {
      qrc.removeQueries({ queryKey: [keyAllTransactions.mainKey] });
    };
  }, []);
  // * Offered Functions ================= >
  const loadMore = useCallback(() => {
    fetchNextPage();
  }, []);

  return {
    transactions: data ?? [],
    hasNextPage,
    isFetchingNextPage,
    isFiltering: isFetchingNextPage ? false : isFetching,
    loadMore,
    emprtArrayReason: filter
      ? "نتیجه ای برای این فیلتر یافت نشد"
      : "هنوز تراکنشی وجود ندارد",
    isError,
  };
};

export default useGetInfinitTransactions;
