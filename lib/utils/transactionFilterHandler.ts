import { TrnasactionFilterURLQueries } from "@/types/api/transactionApi.types";
import { RootFilterQuery } from "mongoose";
import React from "react";

interface Input {
  /**
   * Apply this query when there is no filter
   */
  defaultQuery: RootFilterQuery<any>;
  /**
   * queries to filter
   */
  queries: Omit<TrnasactionFilterURLQueries, "filter">;
}
interface Output {
  /**
   * mongo query pass it ti find method
   */
  query: RootFilterQuery<any>;
  /**
   * sort data based on _id
   */
  sort_id: 1 | -1;
  /**
   * call to clean-up filters
   */
  resetFilter: () => void;
}

type GetTransactionQuery = (input: Input) => Output;
const transactionFilterHandler: GetTransactionQuery = (input) => {
  const { defaultQuery, queries } = input;
  let query: RootFilterQuery<any> = { ...defaultQuery };
  if (queries) {
    const {
      type,
      fromDate,
      toDate,
      maxAmount,
      minAmount,
      accounts,
      categories,
    } = queries;
    if (type) query.type = type == "0" ? "0" : "1";
    if (fromDate && typeof fromDate == "string") {
      query.timestamp = query.timestamp || {};
      query.timestamp.$gte = new Date(fromDate);
    }
    if (toDate && typeof toDate == "string") {
      query.timestamp = query.timestamp || {};
      query.timestamp.$lte = new Date(toDate);
    }
    if (Number(minAmount)) {
      query.amount = query.amount || {};
      query.amount.$gte = Number(minAmount);
    }
    if (Number(maxAmount)) {
      query.amount = query.amount || {};
      query.amount.$lte = Number(maxAmount);
    }
    if (accounts) {
      if (typeof accounts == "string") {
        query.account = accounts;
      } else {
        query.$or = accounts.map((_id) => ({ account: _id }));
      }
    }
    if (categories) {
      if (typeof categories == "string") {
        query.category = categories;
      } else {
        query.$or = categories.map((_id) => ({ category: _id }));
      }
    }
  }

  const resetFilter = () => {
    query = defaultQuery;
  };
  return { query, resetFilter, sort_id: queries?.old ? 1 : -1 };
};

export default transactionFilterHandler;
