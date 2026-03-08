import { ComponentType } from "@/types/component.types";
import { CheckboxProps } from "@mui/material";
import { ReactNode } from "react";

// * --------- InputMultipleSelectCheckBox.tsx ---------

interface InputMultipleSelectCheckBoxProps {
  activeValues?: string[];
  children: ReactNode;
  onChange?: (updatedActiveValues: string[]) => void;
}
interface InputMultipleSelectCheckBoxContextValue {
  registerCheckBox: (
    config: Required<Pick<CheckboxProps, "value">>,
  ) => CheckboxProps;
}

interface Compound_CheckBoxProps extends CheckboxProps {
  value: string;
}

type InputMultipleSelectCheckBoxComponent = ComponentType<
  InputMultipleSelectCheckBoxProps,
  {
    CheckBox: ComponentType<Compound_CheckBoxProps>;
  }
>;
export type {
  InputMultipleSelectCheckBoxContextValue,
  InputMultipleSelectCheckBoxProps,
  InputMultipleSelectCheckBoxComponent,
};
