import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import type { SelectProps } from "@mui/material/Select";
import { useState } from "react";

// * Types ===================== >
interface Item {
  value: string;
  text: string;
}
interface MyProps {
  value?: Item[];
  onChange?: (e: SelectChangeEvent) => any;
  inputProps?: SelectProps;
}
//  * Default Value ======================== >
const defProp: Partial<MyProps> = {
  value: [{ text: "", value: "" }],
};

function MuiSelectInput({
  inputProps,
  value = defProp.value,
  onChange = () => {},
}: MyProps) {
  const [selectValue, setValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    onChange(event);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{inputProps?.label || "label"}</InputLabel>
      <Select
        value={selectValue}
        label={inputProps?.label || "label"}
        onChange={handleChange}
      >
        {value?.map(({ text, value }) => {
          return <MenuItem value={value}>{text}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

export default MuiSelectInput;
