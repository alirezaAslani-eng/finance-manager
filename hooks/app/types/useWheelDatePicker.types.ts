import { PickOptionElementAttributes } from "@/types/elementAttributes.types";
import type dayjs from "dayjs";

interface UseWheelDatePickerConfig {
  value?: Date;
  onFinalizeDate?: (date: Date) => void;
}
interface UseWheelDatePickerReturn {
  selectedDate: ReturnType<typeof dayjs>;
  months: PickOptionElementAttributes<"value" | "children">[];
  years: PickOptionElementAttributes<"value" | "children">[];
  days: PickOptionElementAttributes<"value" | "children">[];
  setDay: (jDay: string) => void;
  setMonth: (jMonth: string) => void;
  setYear: (jYear: string) => void;
  finalizeDate: () => void;
}
// * ---------------------- internal-hook types ----------------------
interface UseWheelDatePickerStateManagerConfig extends Pick<
  Required<UseWheelDatePickerConfig>,
  "onFinalizeDate" | "value"
> {}
type UseWheelDatePickerStateManagerReturn = Pick<
  UseWheelDatePickerReturn,
  "setDay" | "setMonth" | "setYear" | "finalizeDate" | "selectedDate"
> &
  Record<
    keyof Pick<UseWheelDatePickerReturn, "days" | "months" | "years">,
    number[]
  >;

export type {
  UseWheelDatePickerConfig,
  UseWheelDatePickerReturn,
  UseWheelDatePickerStateManagerConfig,
  UseWheelDatePickerStateManagerReturn,
};
