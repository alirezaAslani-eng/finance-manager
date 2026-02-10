import { ComponentType, OptionTagBasicProps } from "@/types/component.types";
import { BoxProps, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

interface WheelSelectorProps extends PropsWithChildren {
  onChangeOption?: (value: string) => void;
  selctedOption?: string;
  options?: OptionTagBasicProps[];
  boxProps?: BoxProps;
}

type WheelSelectorComponent = ComponentType<WheelSelectorProps>;

export type {
  WheelSelectorProps,
  WheelSelectorComponent,
};
