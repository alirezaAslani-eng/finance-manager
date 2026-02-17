import { ComponentType } from "@/types/component.types";
import { PickOptionElementAttributes } from "@/types/elementAttributes.types";
import { BoxProps } from "@mui/material";

interface WheelSelectorProps {
  onChangeOption?: (value: string) => void;
  selctedOption?: string;
  options?:PickOptionElementAttributes<"value"|"children">[];
  boxProps?: BoxProps;
}

type WheelSelectorComponent = ComponentType<WheelSelectorProps>;

export type { WheelSelectorProps, WheelSelectorComponent };
