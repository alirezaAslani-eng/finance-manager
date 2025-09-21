import React from "react";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";
import { Box, Typography, useTheme } from "@mui/material";
import { muiTheme } from "@/utils";
import { CSSProperties } from "@mui/material/styles";

interface myProps {
  textFieldProps?: TextFieldProps;
  errorText?: string | undefined | null;
}
function MuiTextField({ textFieldProps = {}, errorText }: myProps) {
  const { palette } = useTheme();

  // * quiet_sx => normal state user still seeing the input
  const quiet_sx = {
    // Label ============== >
    "& .MuiInputLabel-root": {
      color: muiTheme(palette.mode, {
        light: palette.grey[800],
        dark: palette.grey[400],
      }),
    },
    // Border ================ >
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: muiTheme(palette.mode, {
        light: palette.grey[800],
        dark: palette.grey[400],
      }),
    },
  };
  // * hover_sx => hover state user is hovering on input
  const hover_sx = {
    // * border Hover =========================== >
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: muiTheme(palette.mode, {
        light: palette.grey[800],
        dark: palette.primary.main,
      }),
    },
  };
  // * focused_sx => focused state
  const focused_sx = {
    // Label Focused ====================== >
    "& .MuiInputLabel-root.Mui-focused": {
      color: palette.primary.main,
    },
    // Border Focused ================ >
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: muiTheme(palette.mode, {
        light: palette.primary.main,
        dark: palette.primary.main,
      }),
    },
    // Typing Color ================ >
    "& .MuiOutlinedInput-input": {
      color: muiTheme(palette.mode, {
        light: palette.grey[800],
        dark: palette.grey[300],
      }),
    },
    // Placeholder =============== >
    ".MuiOutlinedInput-input::placeholder": {},
  };
  // * error_sx => error state
  const error_sx = {
    // * Label Erro ================ >
    "& .MuiInputLabel-root.Mui-error": {
      color: palette.error[300],
    },
    // * Border Error ================ >
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.error[300],
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <TextField
        error={!!errorText}
        variant="outlined"
        label={textFieldProps.placeholder ?? ""}
        {...textFieldProps}
        sx={{
          ...quiet_sx,
          ...hover_sx,
          ...focused_sx,
          ...error_sx,
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

// "& .Mui-error": {
//             color: palette.error[300],
//             borderColor: palette.error[300],
//           },
//           "& .MuiOutlinedInput-root.Mui-error fieldset": {
//             borderColor: palette.error[300],
//           },
