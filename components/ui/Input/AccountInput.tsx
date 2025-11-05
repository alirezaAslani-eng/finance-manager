import React from "react";
import MuiTextField, { MuiTextFieldProps } from "./MuiTextField";
import { Box } from "@mui/material";
import { useIdentyfyBank } from "@/hooks";
import { Controller, type Control } from "react-hook-form";

interface MyProps extends MuiTextFieldProps {
  control: Control<any>;
}
function AccountInput({ errorText, textFieldProps, control }: MyProps) {
  const { bankIcon, cardNumberHandler, formattedCardNumber } =
    useIdentyfyBank();

  return (
    <Controller
      control={control}
      name="cardNumber"
      render={({ field: { onChange } }) => {
        return (
          <Box sx={{ position: "relative" }}>
            <MuiTextField
              errorText={errorText}
              textFieldProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                  fontSize: "32px",
                },
                ...textFieldProps,
                onChange: (e) => {
                  cardNumberHandler(e.target.value);
                  onChange(e);
                },
                value: formattedCardNumber,
              }}
            />
            {bankIcon && (
              <Box
                sx={{
                  objectFit: "cover",
                  aspectRatio: "1/1",
                  height: "35px",
                  position: "absolute",
                  animation: "opacity-appear 300ms ease forwards",
                  top: "10px",

                  left: "10px",
                }}
                component={"img"}
                src={bankIcon}
              ></Box>
            )}
          </Box>
        );
      }}
    />
  );
}

export default AccountInput;
