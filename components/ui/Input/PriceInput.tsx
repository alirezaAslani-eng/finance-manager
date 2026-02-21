import { useState, ChangeEvent, ChangeEventHandler, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useResponsiveState, useUpdateEffect } from "@/hooks";

const converToFaPrice = (value: number): string => {
  return value.toLocaleString();
};
const onlyNumber = (value: string): number => {
  return Number(value.replace(/[^0-9]/g, ""));
};

interface MyProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  label?: string;
}

export default function TomanInput({
  onChange,
  value,
  placeholder = "مبلغ",
  label,
}: MyProps) {
  const [formated, setFormated] = useResponsiveState(
    "",
    converToFaPrice(value ?? 0),
  );

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const input_val = e.target.value;
    const number = onlyNumber(input_val);

    // * send value to the parent ==== >
    onChange && onChange(number);

    // * set localeString ==== >
    setFormated(converToFaPrice(number));
  };

  return (
    <TextField
      label={label ?? placeholder}
      value={formated === "0" ? "" : formated}
      onChange={onChangeHandler}
      placeholder={placeholder}
      inputMode="numeric"
    />
  );
}
