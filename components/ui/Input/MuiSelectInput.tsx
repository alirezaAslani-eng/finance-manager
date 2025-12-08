import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectProps } from "@mui/material/Select";
import { MouseEvent, ReactNode } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
// * Types ===================== >
interface Item {
  value: string;
  text: ReactNode;
}
interface MyProps {
  selectItems?: Item[];
  inputProps?: SelectProps;
  errorText: string | undefined | null;
  isEditable?: boolean;
  onEditOption?: (value: string) => void;
}
//  * Default Value ======================== >
const defProp: Partial<MyProps> = {
  selectItems: [{ text: "", value: "" }],
};

function MuiSelectInput({
  inputProps,
  selectItems = defProp.selectItems,
  errorText,
  isEditable,
  onEditOption = () => {},
}: MyProps) {
  const { palette } = useTheme();

  // * Options Event ==================== >>
  const editOption = (
    e: MouseEvent<HTMLButtonElement>,
    value: string
  ): void => {
    e.stopPropagation(); // * Dont close select list (Bubbling)
    onEditOption && onEditOption(value);
  };
  return (
    <FormControl
      error={!!errorText}
      fullWidth
      sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
    >
      <InputLabel>{inputProps?.label || "label"}</InputLabel>
      <Select
        label={inputProps?.label || "label"}
        {...inputProps}
        error={!!errorText}
        // * custom selected value (just show the text)
        renderValue={(value) => {
          const selected =
            selectItems?.find &&
            selectItems.find((item) => {
              return item.value == value;
            });
          return <Typography component={"span"}>{selected?.text}</Typography>;
        }}
      >
        {selectItems?.map(({ text, value }) => {
          return (
            <MenuItem key={crypto.randomUUID()} value={value}>
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>{text}</Typography>
                {/* // * Edit Button ===== > */}
                {isEditable && (
                  <Button
                    size="small"
                    onClick={(e) => editOption(e, value)}
                    sx={(tm) => ({ ...tm.custom.circleButton })}
                  >
                    <EditRoundedIcon />
                  </Button>
                )}
              </Box>
            </MenuItem>
          );
        })}
      </Select>
      {!!errorText && (
        <Typography component={"span"} sx={{ color: palette.error.main }}>
          {errorText}
        </Typography>
      )}
    </FormControl>
  );
}

export default MuiSelectInput;
