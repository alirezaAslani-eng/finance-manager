import { useResponsiveState } from "@/hooks";
import { contextCreator } from "@/utils";
import { Checkbox, CheckboxProps } from "@mui/material";
import { useTransition } from "react";
import {
  InputMultipleSelectCheckBoxComponent,
  InputMultipleSelectCheckBoxContextValue,
  InputMultipleSelectCheckBoxProps,
} from "../types";
import { identifySxProp } from "@/packages/mui";

// * <------------- Component's Context ------------->
const { Context, useCreatedContext } =
  contextCreator<InputMultipleSelectCheckBoxContextValue>();

// * <------------- Component ------------->
const defProps = {
  activeValues: [],
} satisfies Partial<InputMultipleSelectCheckBoxProps>;

const InputMultipleSelectCheckBox: InputMultipleSelectCheckBoxComponent = ({
  activeValues = defProps.activeValues,
  children,
  onChange = () => {},
}) => {
  const [_, startTransition] = useTransition();
  const [_activeValues, set_ActiveValues] = useResponsiveState<string[]>(
    [],
    activeValues,
  );

  const onChangeHandler = (updatedValues: string[]) => {
    // * update internal state (high priority)
    set_ActiveValues(updatedValues);
    // * update parent's state (low priority)
    startTransition(() => {
      onChange(updatedValues);
    });
  };

  const registerCheckBox = ({
    value,
  }: Required<Pick<CheckboxProps, "value">>): CheckboxProps => {
    return {
      checked: _activeValues.includes(value as string),
      onChange: (e) => {
        const checkBoxValue = e.target.value;
        const isChecked = e.target.checked;
        // * Remove value from `_activeValues`, when it turns into Unchecked
        if (!isChecked) {
          const updatedActiveCheckBoxs = _activeValues.filter((item) => {
            return item !== checkBoxValue;
          });
          onChangeHandler(updatedActiveCheckBoxs);
          return;
        }
        // * Add value to `_activeValues`, when it turns into Checked
        const updatedActiveCheckBoxs = [..._activeValues, checkBoxValue];
        onChangeHandler(updatedActiveCheckBoxs);
      },
    };
  };

  return <Context value={{ registerCheckBox }}>{children}</Context>;
};

// * <------------- Compound Components ------------->
InputMultipleSelectCheckBox.CheckBox = function (props) {
  const { registerCheckBox } = useCreatedContext();
  return (
    <Checkbox
      {...props}
      sx={(tm) => ({
        width: "fit-content",
        ...identifySxProp(tm, props.sx),
      })}
      {...registerCheckBox({
        value: props.value,
      })}
    />
  );
};

export default InputMultipleSelectCheckBox;
