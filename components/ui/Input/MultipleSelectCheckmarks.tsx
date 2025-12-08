import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  BoxProps,
  InputLabel,
  Stack,
} from "@mui/material";
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
      {items?.map((item, index) => {
        const { text, value: itemValue } = item;
        return (
          <Stack key={itemValue} flexDirection={"row"} alignItems={"center"}>
            <Checkbox
              size="large"
              id={String(index)}
              value={itemValue}
              checked={activedCheckBoxs?.includes(itemValue)}
              onChange={checkedHandler}
            />
            <InputLabel htmlFor={String(index)}>{text}</InputLabel>
          </Stack>
        );
      })}
    </Box>
  );
}

export type { MyProps as MultipleSelectCheckmarksProps };
export default MultipleSelectCheckmarks;
