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
        sx={{
          "& .Mui-error": {
            color: palette.error[300],
            borderColor: palette.error[300],
          },
          "& .MuiOutlinedInput-root.Mui-error fieldset": {
            borderColor: palette.error[300],
          },

          ...textFieldProps.sx,
        }}
      />

      {!!errorText && (
        <Typography component={"span"} sx={{ color: palette.error[300] }}>
          {errorText}
        </Typography>
      )}
    </Box>
  );
}

export default MuiTextField;
