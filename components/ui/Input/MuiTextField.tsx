import React from "react";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";
import { Box, Typography, useTheme } from "@mui/material";

interface myProps {
  textFieldProps?: TextFieldProps;
  errorText?: string | undefined | null;
}
function MuiTextField({ textFieldProps = {}, errorText }: myProps) {
  const { palette } = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <TextField
        error={!!errorText}
        variant="outlined"
        label={textFieldProps.placeholder ?? ""}
        {...textFieldProps}
      />

      {!!errorText && (
        <Typography component={"span"} sx={{ color: palette.error.main }}>
          {errorText}
        </Typography>
      )}
    </Box>
  );
}
export type { myProps as MuiTextFieldProps };
export default MuiTextField;
