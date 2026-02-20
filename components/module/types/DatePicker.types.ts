import { UseWheelDatePickerConfig } from "@/hooks/app/types";

// * -------------- WheelDatePicker.tsx --------------
interface WheelDatePickerProps extends Pick<
  UseWheelDatePickerConfig,
  "onFinalizeDate" | "value"
> {}

export type { WheelDatePickerProps };
