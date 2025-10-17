import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import React, { PropsWithChildren } from "react";

interface myProps {
  buttonProps?: ButtonProps;
}
function MuiButton({ children, buttonProps = {} }: PropsWithChildren<myProps>) {
  return (
    <Button
      variant="contained"
      {...buttonProps}
      sx={{ fontSize: { xs: "1rem", md: "1.125rem" }, ...buttonProps?.sx }}
    >
      {children}
    </Button>
  );
}

export default MuiButton;
