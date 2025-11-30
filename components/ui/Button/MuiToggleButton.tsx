import { useState } from "react";
import type { MouseEvent, PropsWithChildren } from "react";
import type { ToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface MyProps<T = any> {
  onChange?: (val: T) => void;
  inputProps?: ToggleButtonGroupProps;
}
function MuiToggleButton<T = any>({
  inputProps,
  onChange,
  children,
}: PropsWithChildren<MyProps<T>>) {
  // * Update Value ======= >
  const handleAlignment = (_: MouseEvent<HTMLElement>, value: T) => {
    onChange && onChange(value);
  };

  return (
    <Box sx={{ direction: "ltr" }}>
      <ToggleButtonGroup
        exclusive
        {...inputProps}
        onChange={handleAlignment}
        value={inputProps?.value}
      >
        {children}
      </ToggleButtonGroup>
    </Box>
  );
}
export default MuiToggleButton;
