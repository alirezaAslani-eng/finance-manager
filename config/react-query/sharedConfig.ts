import { getMoreTransactions } from "@/api/get";
import { BadResponse } from "@/lib/utils";
import {
  AllTransactionResponse,
  FilteredTransactionResonse,
} from "@/types/api/transactionApi.types";
import { TransactionList } from "@/types/transaction.types";
import { UseInfiniteQueryOptions } from "@tanstack/react-query";
import { keys } from ".";

const transactionsInfinitQueryConfig: UseInfiniteQueryOptions<
  AllTransactionResponse,
  BadResponse,
  TransactionList,
  typeof keys.allTransactions.all,
  null | string
> = {
  initialPageParam: null,
  queryKey: keys.allTransactions.all,
  // * staleTime of All loaded pages is Infinity because data will updates by SSR  ==== >
  staleTime: Infinity,
  // * bcTime is 0 because each in each mount SSR start prefetch and fill the cache with fresh data ===== >
  gcTime: 0,
  // * This queryFn always run in client when user click on more items ==== >
  queryFn: ({ pageParam }) => {
    return getMoreTransactions(pageParam, { filter: false });
  },
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
} as const;

const filteredTransactionsInfinitQueryConfig: UseInfiniteQueryOptions<
  FilteredTransactionResonse,
  BadResponse,
  TransactionList,
  typeof keys.allTransactions.filtered,
  null | string
> = {
  initialPageParam: null,
  queryKey: keys.allTransactions.filtered,
  gcTime: 0,
  staleTime: Infinity,
  getNextPageParam: transactionsInfinitQueryConfig.getNextPageParam,
  select: transactionsInfinitQueryConfig.select,
} as const;

export {
  transactionsInfinitQueryConfig,
  filteredTransactionsInfinitQueryConfig,
};
