import { FilterSchemaType } from "@/lib/validations/transactionSchema";
import { KeyAllTransactions } from "./types";

const keyAllTransactions: KeyAllTransactions = {
  mainKey: "transactions",
  all(filters) {
    return [
      keyAllTransactions.mainKey,
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
};

export default keyAllTransactions;
