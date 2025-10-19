import { useState } from "react";
import type { MouseEvent, PropsWithChildren } from "react";
import type { ToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface MyProps {
  onChange?: (val: string) => any;
  inputProps?: ToggleButtonGroupProps;
}
const MuiToggleButton = ({
  inputProps,
  onChange,
  children,
}: PropsWithChildren<MyProps>) => {
  const [alignment, setAlignment] = useState<string | null>("");

  const handleAlignment = (
    _: MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value === null) {
      setAlignment(alignment);
      onChange && onChange(alignment as string);
      return;
    }
    setAlignment(value);
    onChange && onChange(value);
  };

  return (
    <Box sx={{ direction: "ltr", width: "fit-content" }}>
      <ToggleButtonGroup
        exclusive
        {...inputProps}
        onChange={handleAlignment}
        value={inputProps?.value || alignment}
      >
        {children}
      </ToggleButtonGroup>
    </Box>
  );
};
export default MuiToggleButton;
