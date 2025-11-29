import Checkbox from "@mui/material/Checkbox";
import { Box, BoxProps, Stack, Typography, useTheme } from "@mui/material";
import { ChangeEvent, memo } from "react";

type SelectArrayType = { text: string; value: string }[];
interface MyProps {
  items?: SelectArrayType;
  onDisable?: (value: string) => void;
  onEnable?: (value: string) => void;
  activedCheckBoxs?: string[];
  containerProps?: BoxProps;
}
function MultipleSelectCheckmarks({
  items,
  onDisable = () => {},
  onEnable = () => {},
  activedCheckBoxs = [],
  containerProps,
}: MyProps) {
  const checkedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    // * Disable if it exists in the active list ==== >
    if (activedCheckBoxs.includes(value)) onDisable(value);
    // * Enable if it didn't exist in the active list ==== >
    else onEnable(value);
  };

  return (
    <Box sx={{ ...containerProps?.sx }}>
      {items?.map((item) => {
        const { text, value: itemValue } = item;
        return (
          <Stack key={itemValue} flexDirection={"row"} alignItems={"center"}>
            <Checkbox
              value={itemValue}
              checked={activedCheckBoxs?.includes(itemValue)}
              onChange={checkedHandler}
            />
            <Typography>{text}</Typography>
          </Stack>
        );
      })}
    </Box>
  );
}

export type { MyProps as MultipleSelectCheckmarksProps };
export default MultipleSelectCheckmarks
