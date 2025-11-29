import { useState, ChangeEvent, ChangeEventHandler, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useUpdateEffect } from "@/hooks";

const converToFaPrice = (value: number): string => {
  return value.toLocaleString();
};
const onlyNumber = (value: string): number => {
  return Number(value.replace(/[^0-9]/g, ""));
};

interface MyProps {
  value?: number;
  onChange?: (value: number) => void;
}

export default function TomanInput({ onChange, value }: MyProps) {
  const [formated, setFormated] = useState<string>(
    value ? converToFaPrice(value) : ""
  );

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const input_val = e.target.value;
    const number = onlyNumber(input_val);

    // * send value to the parent ==== >
    onChange && onChange(number);

    // * set localeString ==== >
    setFormated(converToFaPrice(number));
  };

  // * initialize value from parent and listen to it's changes ==== >
  useUpdateEffect(() => {
    if (!value) return;
    setFormated(converToFaPrice(value));
  }, [value]);

  return (
    <TextField
      label="مبلغ"
      value={formated}
      onChange={onChangeHandler}
      inputMode="numeric"
    />
  );
}
