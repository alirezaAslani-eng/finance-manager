import { useEffect } from "react";
import MuiTextField, { MuiTextFieldProps } from "./MuiTextField";
import { Box } from "@mui/material";
import { useIdentyfyBank } from "@/hooks";
import { Controller, type Control } from "react-hook-form";
import BankIcon from "../Img/BankIcon";

interface MyProps extends Pick<MuiTextFieldProps, "errorText"> {
  control: Control<any>;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}
function AccountInput({
  errorText,
  control,
  disabled,
  placeholder = "شماره کارت (۱۶ رقم)",
  label = "شماره کارت",
}: MyProps) {
  const { bankIcon, cardNumberHandler, formattedCardNumber } =
    useIdentyfyBank();

  return (
    <Controller
      control={control}
      name="cardNumber"
      render={({ field }) => {
        const { onChange } = field;
        // * for the sake of defaultValues ==== >
        useEffect(() => {
          cardNumberHandler(field.value || "");
        }, []);
        return (
          <Box sx={{ position: "relative" }}>
            <MuiTextField
              errorText={errorText}
              textFieldProps={{
                ...field,
                inputProps: { maxLength: 19 },
                value: formattedCardNumber,
                disabled,
                placeholder,
                label,
                onChange: (e) => {
                  cardNumberHandler(e.target.value);
                  onChange(e);
                },
                sx: {
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                  fontSize: "32px",
                },
              }}
            />
            {!!bankIcon && (
              <BankIcon
                src={bankIcon.bank_logo}
                alt={bankIcon.bank_title}
                sx={{
                  position: "absolute",
                  animation: "opacity-appear 800ms ease forwards",
                  top: "12px",
                  left: "10px",
                }}
              />
            )}
          </Box>
        );
      }}
    />
  );
}

export default AccountInput;
