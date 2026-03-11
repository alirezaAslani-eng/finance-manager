import { FilterTransactionSchemaType } from "@/lib/validations/types";
import { FilterTrsStateType } from "./FilterTrsStateContext.types";

interface UseTrsFilterReturnedType {
  filterState: FilterTrsStateType;
  dynamicQueryKey: FilterTransactionSchemaType;
  setMinAmount: (amount: number) => void;
  setMaxAmount: (amount: number) => void;
  setFromDate: (date: Date) => void;
  setToDate: (date: Date) => void;
  setCategories: (categories: string[]) => void;
  setAccounts: (accounts: string[]) => void;
  clearCategories: () => void;
  clearAccounts: () => void;
  resetFilter: () => void;
  cancelToDate: () => void;
  cancelFromDate: () => void;
  apply: () => void;
  toggleSort: () => void;
  setType: (value: "0" | "1" | "all") => void;
}

type UseTrsFilterState = () => UseTrsFilterReturnedType;

export type { UseTrsFilterState, UseTrsFilterReturnedType };
