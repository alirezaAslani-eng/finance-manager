import { useCallback, useContext } from "react";
import { FilterTrsStateContext } from "./FilterTrsStateContext";
import { UseTrsFilterReturnedType, UseTrsFilterState } from "./types";
import { debounce } from "@mui/material";

const useFilterTrsState: UseTrsFilterState = () => {
  const { dispatcher, filterState, apply, dynamicQueryKey } = useContext(
    FilterTrsStateContext
  );

  // * Reset Filter =========== >
  const resetFilter = useCallback(
    () => dispatcher({ type: "RESET_FILTER" }),
    [dispatcher]
  );
  // * Reset Filter =========== >
  const toggleSort = useCallback(
    () => dispatcher({ type: "TOGGLE_SORT" }),
    [dispatcher]
  );

  // * Filter Transactions Based on Amount =========== >
  const setMinAmount = useCallback(
    debounce(
      (n: number) => dispatcher({ type: "MIN_AMOUNT", payload: { value: n } }),
      400
    ),
    [dispatcher]
  );

  const setMaxAmount = useCallback(
    debounce(
      (n: number) => dispatcher({ type: "MAX_AMOUNT", payload: { value: n } }),
      400
    ),
    [dispatcher]
  );

  // * Filter Transactions Based on Date =========== >
  const setFromDate = useCallback(
    (date: Date) => dispatcher({ type: "FROM_DATE", payload: { value: date } }),
    [dispatcher]
  );

  const setToDate = useCallback(
    (date: Date) => dispatcher({ type: "TO_DATE", payload: { value: date } }),
    [dispatcher]
  );

  const cancelFromDate = useCallback(
    () => dispatcher({ type: "CANCEL_FROM_DATE" }),
    [dispatcher]
  );

  const cancelToDate = useCallback(
    () => dispatcher({ type: "CANCEL_TO_DATE" }),
    [dispatcher]
  );
  const setType: UseTrsFilterReturnedType["setType"] = useCallback(
    (value) =>
      dispatcher({
        type: "TRANSACTION_TYPE",
        payload: { value: value === "all" ? null : value },
      }),
    [dispatcher]
  );

  // * Categories ==== >
  const setCategory = useCallback(
    (addedCategory: string) =>
      dispatcher({
        type: "ADD_CATEGORY",
        payload: { value: addedCategory },
      }),
    [dispatcher]
  );

  const cancelCategory = useCallback(
    (canceledCategory: string) =>
      dispatcher({
        type: "REMOVE_CATEGORY",
        payload: { value: canceledCategory },
      }),
    [dispatcher]
  );

  // * Accounts ========= >
  const setAccount = useCallback(
    (addedAccount: string) =>
      dispatcher({ type: "ADD_ACCOUNT", payload: { value: addedAccount } }),
    [dispatcher]
  );

  const cancelAccount = useCallback(
    (canceledAccount: string) =>
      dispatcher({
        type: "REMOVE_ACCOUNT",
        payload: { value: canceledAccount },
      }),
    [dispatcher]
  );

  return {
    filterState,
    dynamicQueryKey,
    resetFilter,
    setMinAmount,
    setMaxAmount,
    setFromDate,
    setToDate,
    cancelFromDate,
    cancelToDate,
    setCategory,
    cancelCategory,
    setAccount,
    cancelAccount,
    apply,
    toggleSort,
    setType,
  };
};

export default useFilterTrsState;
