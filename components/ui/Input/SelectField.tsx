import { FormControl, InputLabel, Select, SelectProps } from "@mui/material";

function SelectField(props: SelectProps) {
  return (
    <FormControl error={props.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select label={props.label} {...props}>
        {props.children}
      </Select>
    </FormControl>
  );
}

export default SelectField;
