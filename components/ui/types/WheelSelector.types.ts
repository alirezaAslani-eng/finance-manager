import { ComponentType, OptionTagBasicProps } from "@/types/component.types";
import { BoxProps } from "@mui/material";

interface WheelSelectorProps {
  onChangeOption?: (value: string) => void;
  selctedOption?: string;
  options?: OptionTagBasicProps[];
  boxProps?: BoxProps;
}

type WheelSelectorComponent = ComponentType<WheelSelectorProps>;

export type { WheelSelectorProps, WheelSelectorComponent };
