import { UseWheelDatePickerConfig } from "@/hooks/app/types";

// * -------------- WheelDatePicker.tsx --------------
interface WheelDatePickerProps extends Pick<
  UseWheelDatePickerConfig,
  "onChange" | "value"
> {}


export type { WheelDatePickerProps };
