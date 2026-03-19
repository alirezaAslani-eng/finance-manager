import { Components, Theme } from "@mui/material/styles";
import SlotTransition from "../../slots-module/SlotTransition";
import { Fade } from "@mui/material";

const menu = {
  defaultProps: {
    slots: {
      transition: SlotTransition(Fade),
    },
  },
  styleOverrides: {
    root: {
      "& .MuiPaper-root": {
        borderRadius: "12px",
      },
    },
  },
} satisfies Components<Theme>["MuiMenu"];

export default menu;
