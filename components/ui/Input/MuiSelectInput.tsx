import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import type { SelectProps } from "@mui/material/Select";
import { MouseEvent, ReactNode, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import MuiButton from "../Button/MuiButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
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
  isDeletable?: boolean;
  onDeleteOption?: (value: string) => void;
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
  isDeletable,
  isEditable,
  onDeleteOption = () => {},
  onEditOption = () => {},
}: MyProps) {
  const { palette } = useTheme();

  // * Options Event ==================== >>
  const deleteOption = (
    e: MouseEvent<HTMLButtonElement>,
    value: string
  ): void => {
    e.stopPropagation(); // * Dont close select list (Bubbling)
    onDeleteOption && onDeleteOption(value);
  };
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
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{text}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {/* // * Delete Button ===== > */}
                  {isDeletable && (
                    <MuiButton
                      reset
                      buttonProps={{
                        onClick: (e) => deleteOption(e, value),
                        color: "error",
                        variant: "text",
                        sx: { p: "5px", borderRadius: "999px" },
                      }}
                    >
                      <DeleteRoundedIcon />
                    </MuiButton>
                  )}
                  {/* // * Edit Button ===== > */}
                  {isEditable && (
                    <MuiButton
                      reset
                      buttonProps={{
                        onClick: (e) => editOption(e, value),
                        variant: "text",
                        sx: { p: "5px", borderRadius: "999px" },
                      }}
                    >
                      <EditRoundedIcon />
                    </MuiButton>
                  )}
                </Box>
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
