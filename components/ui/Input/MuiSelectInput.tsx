import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import type { SelectProps } from "@mui/material/Select";
import { ReactNode, useState } from "react";
import { Typography, useTheme } from "@mui/material";

// * Types ===================== >
interface Item {
  value: string;
  text: ReactNode;
}
interface MyProps {
  selectItems?: Item[];
  inputProps?: SelectProps;
  errorText: string | undefined | null;
}
//  * Default Value ======================== >
const defProp: Partial<MyProps> = {
  selectItems: [{ text: "", value: "" }],
};

function MuiSelectInput({
  inputProps,
  selectItems = defProp.selectItems,
  errorText,
}: MyProps) {
  const { palette } = useTheme();

  return (
    <FormControl
      error={!!errorText}
      fullWidth
      sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
    >
      <InputLabel>{inputProps?.label || "label"}</InputLabel>
      <Select
        label={inputProps?.label || "label"}
        {...inputProps}
        error={!!errorText}
      >
        <Box maxHeight={"300px"}>
          {selectItems?.map(({ text, value }) => {
            return (
              <MenuItem key={crypto.randomUUID()} value={value}>
                {text}
              </MenuItem>
            );
          })}
        </Box>
      </Select>
      {!!errorText && (
        <Typography component={"span"} sx={{ color: palette.error.main }}>
          {errorText}
        </Typography>
      )}
    </FormControl>
  );
}

export default MuiSelectInput;
