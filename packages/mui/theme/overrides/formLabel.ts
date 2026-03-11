import { Components, Theme } from "@mui/material";

const formLabel = {
  defaultProps: { sx: { userSelect: "none", cursor: "pointer" } },
} satisfies Components<Theme>["MuiFormLabel"];

export default formLabel;
