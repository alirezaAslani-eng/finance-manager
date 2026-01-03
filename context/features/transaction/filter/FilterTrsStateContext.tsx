import { createContext, useCallback, useState } from "react";
import {
  useQueryState,
  parseAsBoolean,
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringLiteral,
} from "nuqs";
import {
  Dispatcher,
  ProvidedFilterTrsStateValue,
  ProviderFilterTrsStateFn,
} from "./types";
import {
  addKey,
  addOneId,
  removeOneId,
  setAmountHandler,
} from "./FIlterTrsState.helpers";
import { Transaction_face } from "@/types/transaction.types";
import { parseAsFromDate, parseAsToDate, parseAsTrue } from "@/packages/nuqs";
import { useUpdateEffect } from "@/hooks";
import { FilterTransactionSchemaType } from "@/lib/validations/types";

// * Context ======= >
const FilterTrsStateContext = createContext({} as ProvidedFilterTrsStateValue);
const FilterTrsStateProvider: ProviderFilterTrsStateFn = ({ children }) => {
  // * Is Data filtred ================= >
  const [filter, setFilter] = useQueryState<boolean>(
    addKey("filter"),
    parseAsBoolean.withDefault(false)
  );
  // * Should we render oldest transactions =============== >
  const [old, setOld] = useQueryState<true>(addKey("old"), parseAsTrue);

  // * expenses = 0 / income = 1 transactions or all =========== >
  const [type, setType] = useQueryState<Transaction_face["type"]>(
    addKey("type"),
    parseAsStringLiteral(["0", "1"])
  );
  // * Filter transactions based on Selected Accounts / [] = all ====== >
  const [accounts, setAccounts] = useQueryState<string[]>(
    addKey("accounts"),
    parseAsArrayOf(parseAsString).withDefault([])
  );
  // * Filter transactions based on Selected categories / [] = all ====== >
  const [categories, setCategories] = useQueryState<string[]>(
    addKey("categories"),
    parseAsArrayOf(parseAsString).withDefault([])
  );
  // * Show me transactions which have amount >= minAmount  ====== >
  const [minAmount, setMinAmount] = useQueryState<number>(
    addKey("minAmount"),
    parseAsInteger
  );
  // * Show me transactions which have amount <= maxAmount  ====== >
  const [maxAmount, setMaxAmount] = useQueryState<number>(
    addKey("maxAmount"),
    parseAsInteger
  );
  // * Show me transactions which are created in (date >= fromDate ) ====== >
  const [fromDate, setFromDate] = useQueryState<Date>(
    addKey("fromDate"),
    parseAsFromDate
  );
  // * Show me transactions which are created in (date <= toDate ) ====== >
  const [toDate, setToDate] = useQueryState<Date>(
    addKey("toDate"),
    parseAsToDate
  );
  /**
   * If this state get updates, it cause a side-effect run
   * true / false cause rerender and run a side-effect
   */
  const [triggerEffect, setTriggerEffect] = useState<boolean>(false);

  const trigger = (reason: "clean-all-filters") => {
    if (reason === "clean-all-filters") {
      setTriggerEffect((prev) => !prev);
    }
  };

  /**
   * This state responsible for only storing filter parameters as a dynamicQueryKey
   */
  const [dynamicQueryKey, setDynamicQueryKey] =
    useState<FilterTransactionSchemaType>({
      accounts,
      categories,
      fromDate,
      maxAmount,
      minAmount,
      old,
      toDate,
      type,
    });

  /**
   * This function update dynamicQueryKey with a new refrence of filter paramters
   * and cause the query remount and build a new cache or use prevous
   */
  const updateQueryKey = () => {
    setDynamicQueryKey({
      accounts,
      categories,
      fromDate,
      maxAmount,
      minAmount,
      old,
      toDate,
      type,
    });
  };
  // * Only This Dispatcher can update the states and it has no side effects   === >
  const dispatcher: Dispatcher = useCallback(
    (action) => {
      // * switch cases ============ >
      switch (action.type) {
        case "TRANSACTION_TYPE": {
          // * set "0" = show expenses / "1" = show incomes ==== >
          setType(action.payload.value);
          break;
        }
        case "TOGGLE_SORT": {
          // * true = show oldest transactions / null = no filter (default=Latest) ===== >
          setOld((prev) => (!prev ? true : null));
          break;
        }
        case "ADD_ACCOUNT": {
          // * Add one id to the array of accounts' id ======= >
          setAccounts((prev) => addOneId(prev, action.payload.value));
          break;
        }
        case "REMOVE_ACCOUNT": {
          // * Remove one id to the array of accounts' id ======= >
          setAccounts((prev) => removeOneId(prev, action.payload.value));
          break;
        }
        case "ADD_CATEGORY": {
          // * Add one id to the array of categories' id ======= >
          setCategories((prev) => addOneId(prev, action.payload.value));
          break;
        }
        case "REMOVE_CATEGORY": {
          // * Remove one id to the array of categories' id ======= >
          setCategories((prev) => removeOneId(prev, action.payload.value));
          break;
        }
        case "FROM_DATE": {
          // * set Date as fromDate to only see transactions >= fromDate ==== >
          setFromDate(action.payload.value);
          // * oldest transactions because user wants to see them from a specefic date ==== >
          setOld(true);
          break;
        }
        case "TO_DATE": {
          // * set Date as toDate to only see transactions <= toDate ==== >
          setToDate(action.payload.value);
          break;
        }
        case "CANCEL_FROM_DATE": {
          setFromDate(null);
          setOld(null);
          break;
        }
        case "CANCEL_TO_DATE": {
          setToDate(null);
          break;
        }
        case "MIN_AMOUNT": {
          // * set number as minAmount to only see transactions >= minAmount ==== >
          setMinAmount(setAmountHandler(action.payload.value));
          break;
        }
        case "MAX_AMOUNT": {
          // * set number as maxAmount to only see transactions <= maxAmount ==== >
          setMaxAmount(setAmountHandler(action.payload.value));
          break;
        }
        case "RESET_FILTER": {
          // * trun off filter state & and clear all filters ==== >
          setFilter(false);
          // * run side a effect after rerender which request to the server and get transactions without any filter
          trigger("clean-all-filters"); // * <<< dont need to press apply button
          setType(null);
          setOld(null);
          setAccounts(null);
          setAccounts(null);
          setCategories(null);
          setCategories(null);
          setFromDate(null);
          setToDate(null);
          setMinAmount(null);
          setMaxAmount(null);
          break;
        }
        default: {
          let neverHappen: never = action;
          console.warn("Dispatched value is invalid");
        }
      }
    },
    [
      setFilter,
      setType,
      setOld,
      setAccounts,
      setAccounts,
      setCategories,
      setCategories,
      setFromDate,
      setToDate,
      setMinAmount,
      setMaxAmount,
    ]
  );

  // * Apply By User =========== >
  const apply = () => {
    // * Now State is Filtered ====== >
    setFilter(true);
    updateQueryKey();
  };

  // * Apply By Trigger to refetch transactions with Latest queries ============== >
  useUpdateEffect(() => {
    updateQueryKey();
  }, [triggerEffect]);

  // * Memoizing, because of children prop might changes or parnet providers might make rerenders ===== >
  const providedValue: ProvidedFilterTrsStateValue = {
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
    dispatcher,
    apply,
  };

  return (
    <FilterTrsStateContext value={providedValue}>
      {children}
    </FilterTrsStateContext>
  );
};

export { FilterTrsStateProvider, FilterTrsStateContext };
