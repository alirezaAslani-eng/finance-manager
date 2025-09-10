import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import React, { PropsWithChildren } from "react";

interface myProps {
  buttonProps?: ButtonProps;
}
function MuiButton({ children, buttonProps={} }: PropsWithChildren<myProps>) {
  return (
    <Button variant="contained" {...buttonProps}>
      {children}
    </Button>
  );
}

export default MuiButton;
