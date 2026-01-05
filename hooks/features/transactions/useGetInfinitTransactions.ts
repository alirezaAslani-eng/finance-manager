import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { UseGetInfinitTransactions } from "./types/useGetInfinitTransactions.types";
import { AllTransactionResponse } from "@/types/api/transactionApi.types";
import { getMoreTransactions } from "@/api";
import { TransactionList } from "@/types/transaction.types";
import { useFilterTrsState } from "@/context";
import {
  keyAllTransactions,
  KeyAllTransactionsSerialized,
} from "@/packages/react-query";
import { BadResponse_face } from "@/types/error.types";

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
    BadResponse_face,
    TransactionList,
    KeyAllTransactionsSerialized,
    null | string
  >({
    initialPageParam: null,
    queryKey: keyAllTransactions.all(dynamicQueryKey),
    // * staleTime of All loaded pages is Infinity because data will updates by SSR or user's filtering action ==== >
    staleTime: Infinity,
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
