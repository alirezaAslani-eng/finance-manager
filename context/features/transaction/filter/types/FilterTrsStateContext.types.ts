import { FilterTransactionSchemaType } from "@/lib/validations/types";
import { JSX, PropsWithChildren } from "react";

/**
 * State Structure Type
 */
interface FilterTrsStateType {
  /**
   * Filter State
   */
  filter: boolean;
  /**
   * transactions start from this date it's null when it's not existed in URL bar
   */
  fromDate: FilterTransactionSchemaType["fromDate"];
  /**
   * transactions untl this date, it's null when it's not existed in URL bar
   */
  toDate: FilterTransactionSchemaType["toDate"];

  /**
   * min amount can be null when it's not existed in URL bar
   */
  minAmount: FilterTransactionSchemaType["minAmount"];
  /**
   * max amount can be null when it's not existed in URL bar
   */
  maxAmount: FilterTransactionSchemaType["minAmount"];
  /**
   * accounts property is always an array empty or include account's _id
   */
  accounts: FilterTransactionSchemaType["accounts"];
  /**
   * categories property is always an array empty or include category's _id
   */
  categories: FilterTransactionSchemaType["categories"];
  /**
   * true = show oldest transactions & false or not existed = opposite
   */
  old: FilterTransactionSchemaType["old"];
  /**
   * "null" = all & "0" = expenses & "1" = income
   */
  type: FilterTransactionSchemaType["type"];
}

/**
 * Provided Values Type
 */
interface ProvidedFilterTrsStateValue {
  /**
   * All states of filter
   */
  filterState: FilterTrsStateType;
  /**
   * use this dynaimc queryKey to mount a new query for each filter
   */
  dynamicQueryKey: FilterTransactionSchemaType;
  /**
   * Dispatcher Method
   */
  dispatcher: Dispatcher;
  /**
   * Apply filters
   */
  apply: () => void;
}

/**
 * Provider Function Type
 */
type ProviderFilterTrsStateFn = (props: PropsWithChildren) => JSX.Element;

/**
 * Action types
 */
type ActionsType =
  | "RESET_FILTER"
  | "TRANSACTION_TYPE"
  | "TOGGLE_SORT"
  // * DATE Actions
  | "FROM_DATE"
  | "TO_DATE"
  | "CANCEL_FROM_DATE"
  | "CANCEL_TO_DATE"
  // * AMOUNT Actions
  | "MIN_AMOUNT"
  | "MAX_AMOUNT"
  // * ACOUNT Actions
  | "ADD_ACCOUNT"
  | "REMOVE_ACCOUNT"
  // * CATEGORY Actions
  | "ADD_CATEGORY"
  | "REMOVE_CATEGORY";

/**
 * Reset all filters
 */
type ResetType = {
  type: Extract<ActionsType, "RESET_FILTER">;
};

/**
 *  Dispatch Type to Filter based transaction's type or remove This Filter
 */
type Transaction_Type_ActionType = {
  type: Extract<ActionsType, "TRANSACTION_TYPE">;
  payload: { value: "0" | "1" | null };
};

/**
 * Dispatch Type to Filter based on Date or remove This Filter
 */
type DateActionType = {
  type: Extract<ActionsType, "FROM_DATE"> | Extract<ActionsType, "TO_DATE">;
  payload: {
    value: Date;
  };
};
type CancelDateActionType = {
  type:
    | Extract<ActionsType, "CANCEL_FROM_DATE">
    | Extract<ActionsType, "CANCEL_TO_DATE">;
};
//  * Dispatch Type to filter based on Amount or remove Tihs Filter
//  */
type AmountActionType = {
  type: Extract<ActionsType, "MIN_AMOUNT"> | Extract<ActionsType, "MAX_AMOUNT">;
  payload: {
    value: number;
  };
};

/**
 * Dispatch Type to filter based on ordering or remove Tihs Filter
 */
type SortActionType = {
  type: Extract<ActionsType, "TOGGLE_SORT">;
};

/**
 * Filter based on account
 * Dispatch Type to add account or remove one or all added accounts
 */
type AcountActionType = {
  type:
    | Extract<ActionsType, "ADD_ACCOUNT">
    | Extract<ActionsType, "REMOVE_ACCOUNT">;
  payload: { value: string };
};

/**
 * Filter based on category
 * Dispatch Type to add category or remove one or all added categories
 */
type CategoryActionType = {
  type:
    | Extract<ActionsType, "ADD_CATEGORY">
    | Extract<ActionsType, "REMOVE_CATEGORY">;
  payload: { value: string };
};

/**
 * Global Dispatch Types
 */
type GlobalActionType = { autoApply?: boolean };
/**
 * Dispatch Types
 */
type DispatchActionType =
  | ResetType
  | Transaction_Type_ActionType
  | DateActionType
  | AmountActionType
  | SortActionType
  | AcountActionType
  | CategoryActionType
  | CancelDateActionType;
/**
 * Dispatcher Method
 */
type Dispatcher = (action: DispatchActionType) => void;
export type {
  ProviderFilterTrsStateFn,
  ProvidedFilterTrsStateValue,
  FilterTrsStateType,
  DispatchActionType,
  Dispatcher,
};
