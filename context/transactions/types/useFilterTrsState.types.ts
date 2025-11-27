import { FilterSchemaType } from "@/lib/validations/transactionSchema";
import { FilterTrsStateType } from "./FilterTrsStateContext.types";

interface UseTrsFilterReturnedType {
  filterState: FilterTrsStateType;
  dynamicQueryKey: FilterSchemaType;
  setMinAmount: (amount: number) => void;
  setMaxAmount: (amount: number) => void;
  setFromDate: (date: Date) => void;
  setToDate: (date: Date) => void;
  setCategory: (category: string) => void;
  setAccount: (category: string) => void;
  resetFilter: () => void;
  cancelAccount: (account: string) => void;
  cancelCategory: (account: string) => void;
  cancelToDate: () => void;
  cancelFromDate: () => void;
  apply: () => void;
  toggleSort: () => void;
}

type UseTrsFilterState = () => UseTrsFilterReturnedType;

export type { UseTrsFilterState };
