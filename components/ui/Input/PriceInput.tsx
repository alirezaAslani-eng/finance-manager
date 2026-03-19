import { ChangeEventHandler } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useResponsiveState } from "@/hooks";
import faNumToEnNum from "@/lib/utils/app/faNumtoEnNum";

const converToFaPrice = (value: number): string => {
  return value.toLocaleString();
};
const onlyNumber = (value: string): number => {
  return Number(faNumToEnNum(value).replace(/[^0-9]/g, ""));
};

interface MyProps extends Omit<TextFieldProps, "value" | "onChange"> {
  value?: number;
  onChange?: (value: number) => void;
}

export default function PriceInput(props: MyProps) {
  const [formated, setFormated] = useResponsiveState(
    "",
    converToFaPrice(props.value ?? 0),
  );

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const input_val = e.target.value;
    const number = onlyNumber(input_val);

    // * send value to the parent ==== >
    props.onChange && props.onChange(number);

    // * set localeString ==== >
    setFormated(converToFaPrice(number));
  };

  return (
    <TextField
      label={props.label ?? props.placeholder}
      placeholder={props.placeholder}
      inputMode="numeric"
      {...props}
      value={formated === "0" ? "" : formated}
      onChange={onChangeHandler}
    />
  );
}
