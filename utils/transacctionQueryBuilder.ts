import { TransactionFilterQueries } from "@/types/api/transactionApi.types";
import { Transaction_face } from "@/types/transaction.types";
import React from "react";

function transacctionQueryBuilder(queries: TransactionFilterQueries): `?filter=${boolean}${string}` {
  const {
    filter,
    accounts,
    categories,
    fromDate,
    maxAmount,
    minAmount,
    toDate,
    old,
    type,
  } = queries;

  // * Account Query String ===== >
  let accountQuerySttring: string =
    typeof accounts === "string" ? accounts : "";

  if (queries?.accounts && typeof queries?.accounts !== "string") {
    const accountsQueriesArray = queries.accounts.map<`&accounts=${string}`>(
      (item) => {
        return `&accounts=${item}`;
      }
    );
    // * Build Query String ===== >
    accountQuerySttring = accountsQueriesArray.toString().replace(",", "");
  }

  // * Category Query String ===== >
  let categoryQueryString: string =
    typeof categories === "string" ? categories : "";

  if (categories && typeof categories !== "string") {
    const categoriesQueriesArray = categories.map<`&categories=${string}`>(
      (item) => {
        return `&categories=${item}`;
      }
    );
    // * Build Query String ===== >
    categoryQueryString = categoriesQueriesArray.toString().replace(",", "");
  }
  // * fromDate QueryString ====== >
  const fromDateQueryString: "" | `&fromDate=${string}` = fromDate
    ? `&fromDate=${fromDate}`
    : "";
  // * toDate QueryString ====== >
  const toDateQueryString: "" | `&toDate=${string}` = toDate
    ? `&toDate=${toDate}`
    : "";

  // * Max Amount Query String ============ >
  const minAmountQueryString: "" | `&minAmount=${string}` = minAmount
    ? `&minAmount=${minAmount}`
    : "";

  // * Min Amount Query String ============ >
  const maxAmountQueryString: "" | `&maxAmount=${string}` = maxAmount
    ? `&maxAmount=${maxAmount}`
    : "";
  // * Type Query String ===== >
  const oldQueryString: "" | `&old=${boolean}` =
    old !== undefined ? `&old=${old}` : "";
  const typeQueryString: "" | `&type=${Transaction_face["type"]}` = type
    ? `&type=${type}`
    : "";

  // * Final Query String ======= >
  return `?filter=${filter}${accountQuerySttring}${categoryQueryString}${fromDateQueryString}${toDateQueryString}${minAmountQueryString}${maxAmountQueryString}${oldQueryString}${typeQueryString}`;
}

export default transacctionQueryBuilder;
