import { Components, Theme } from "@mui/material/styles";

const tooltip = {
  defaultProps: {
    slotProps: {
      tooltip: {
        sx: {
          fontFamily: "var(--dana-rg)",
          fontSize: "14px",
        },
      },
    },
  },
} satisfies Components<Theme>["MuiTooltip"];

export default tooltip;
