import { Box, TextField, TextFieldProps } from "@mui/material";
import React, { InputHTMLAttributes, RefObject, useEffect } from "react";
import { buildArray } from "@/lib/utils";
import useMultipleInput from "@/hooks/app/useMultipleInput";
import { useUpdateEffect } from "@/hooks";

const InputShareProps: TextFieldProps = {
  fullWidth: false,
  sx: { aspectRatio: "1/1", height: "65px", fontFamily: "var(--peyda-md)" },
};

interface MyProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "name"> {
  inputCount?: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  value?: string;
  ref?: RefObject<HTMLInputElement>;
}

function MultipleInputs({
  onChange = () => {},
  onComplete,
  name,
  ref,
  value,
  inputCount = 4,
}: MyProps) {
  const { registerMui, setSerializedValue, multiInputValues } =
    useMultipleInput({
      inputCount,
      onComplete,
    });

  useUpdateEffect(() => {
    onChange(multiInputValues.join(""));
  }, [multiInputValues]);

  // * for default value from parameter "value"
  useEffect(() => {
    if (!value) return;
    setSerializedValue(value);
  }, [setSerializedValue]);

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"8px"}
        sx={{ direction: "ltr" }}
      >
        {buildArray(inputCount).map((_, index) => {
          return <TextField {...InputShareProps} {...registerMui(index)} />;
        })}
      </Box>

      <input
        value={value}
        name={name}
        type={"hidden"}
        ref={ref}
        maxLength={inputCount}
        onChange={(e) => {
          setSerializedValue(e.target.value);
        }}
      />
    </>
  );
}
export default MultipleInputs;
