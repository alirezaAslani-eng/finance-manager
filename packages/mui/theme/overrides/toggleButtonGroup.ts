import { Components, Theme } from "@mui/material/styles";

const toggleButtonGroup = {
  defaultProps: {
    dir: "ltr",
    exclusive: true,
  },
} satisfies Components<Theme>["MuiToggleButtonGroup"];

export default toggleButtonGroup;
