import { BoxProps, ButtonProps } from "@mui/material";
import { JSX, PropsWithChildren } from "react";

interface WheelSelectorProps<TValue = unknown> extends PropsWithChildren {
  onChangeOption?: (value: TValue) => void;
  value?: TValue;
  boxProps?: BoxProps;
}

type Compound_WheelShadowProps = PropsWithChildren &
  BoxProps &
  PropsWithChildren;
interface Compound_WheelProps extends BoxProps {}
interface Compound_OptionProps extends BoxProps<"option"> {
  tabIndex: number;
}
interface Compound_Selector extends BoxProps<"div"> {}
interface Compound_ButtonProps extends PropsWithChildren {
  action_type: "prev" | "next";
  buttonProps?: ButtonProps;
}

export type {
  WheelSelectorProps,
  Compound_ButtonProps,
  Compound_OptionProps,
  Compound_WheelProps,
  Compound_WheelShadowProps,
  Compound_Selector,
};
