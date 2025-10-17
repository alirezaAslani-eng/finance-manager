import { Alert } from "@mui/material";
import type { AlertProps } from "@mui/material";
import React from "react";

interface MyProps {
  text?: string;
  alertProps?: AlertProps;
}

function MuiAlert({ text, alertProps }: MyProps) {
  return (
    <Alert
      severity="warning"
      {...alertProps}
      slotProps={{
        icon: {
          style: {
            marginRight: "0",
            marginLeft: "10px",
          },
        },
        ...alertProps?.slotProps,
      }}
      sx={{ fontSize: { xs: "16px",md:"18px" }, ...alertProps?.sx }}
    >
      {text}
    </Alert>
  );
}

export default MuiAlert;
