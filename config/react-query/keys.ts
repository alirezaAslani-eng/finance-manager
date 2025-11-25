import {
  filterSchema,
  FilterSchemaType,
} from "@/lib/validations/transactionSchema";
import { TransactionsQueryKey } from "./types/keys.types";

const keys = {
  userInfo: {
    all: ["user-info"],
  },
  recntTransactions: {
    all: ["recent-transactions"],
  },

  allTransactions: {
    /**
     * each key of FilterSchemaType is transformed to JSON in output 
     * because SSR prefetchs this key and some keys are not serializable
     */
    all(filters: FilterSchemaType): TransactionsQueryKey {
      return [
        "transactions",
        // * Filter Parmeters ==== >
        JSON.stringify(filters["type"]),
        JSON.stringify(filters["old"]),
        JSON.stringify(filters["minAmount"]),
        JSON.stringify(filters["maxAmount"]),
        JSON.stringify(filters["fromDate"]),
        JSON.stringify(filters["toDate"]),
        JSON.stringify(filters["categories"]),
        JSON.stringify(filters["accounts"]),
      ] as const;
    },
  },
} as const;

export default keys;
