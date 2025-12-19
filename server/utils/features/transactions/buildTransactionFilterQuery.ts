import { RootFilterQuery } from "mongoose";
import { FilterSchemaType } from "@/lib/validations/transactionSchema";

interface Input {
  /**
   * Apply this query when there is no filter
   */
  defaultQuery: RootFilterQuery<any>;
  /**
   * queries to filter
   */
  queries: FilterSchemaType;
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
const buildTransactionFilterQuery: GetTransactionQuery = (input) => {
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

    const accountOrs: { account: string }[] = [];
    const categoryOrs: { category: string }[] = [];
    if (type) query.type = type;
    if (fromDate) {
      query.createdAt = query.createdAt || {};
      query.createdAt.$gte = fromDate;
    }
    if (toDate) {
      query.createdAt = query.createdAt || {};
      query.createdAt.$lte = toDate;
    }
    if (minAmount !== null) {
      query.amount = query.amount || {};
      query.amount.$gte = minAmount;
    }
    if (maxAmount !== null) {
      query.amount = query.amount || {};
      query.amount.$lte = maxAmount;
    }
    accounts.forEach((_id) => accountOrs.push({ account: _id }));
    categories.forEach((_id) => categoryOrs.push({ category: _id }));
    if (accounts.length || categories.length) {
      query.$or = [...accountOrs, ...categoryOrs];
    }
  }

  const resetFilter = () => {
    query = defaultQuery;
  };
  return { query, resetFilter, sort_id: queries.old ? 1 : -1 };
};

export default buildTransactionFilterQuery;
