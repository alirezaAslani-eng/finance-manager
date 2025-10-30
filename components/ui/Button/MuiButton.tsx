import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import React, { PropsWithChildren } from "react";

interface myProps {
  buttonProps?: ButtonProps;
  reset?: boolean;
}
function MuiButton({
  children,
  buttonProps = {},
  reset,
}: PropsWithChildren<myProps>) {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      {...buttonProps}
      sx={{
        ...Object.assign(reset ? { ...theme.custom.resetButton } : {}, {
          fontSize: { xs: "1rem", md: "1.125rem" },
          ...buttonProps?.sx,
        }),
      }}
    >
      {children}
    </Button>
  );
}

export default MuiButton;
