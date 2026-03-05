import { ThemeOptions } from "@mui/material";

import palette from "./palette";
import breakpoints from "./breakpoints";
import typography from "./typography";
import {
  alert,
  button,
  container,
  cssBaseLine,
  dialog,
  inputLabel,
  svgIcon,
  textField,
  toggleButtonGroup,
  typography as typography_,
} from "./overrides";

const theme: ThemeOptions = {
  spacing: 4, //  * << spacing(2) -> 8px
  breakpoints,
  palette,
  typography,
  custom: {
    /**
     * it removes padding, width, and apply aspect-ratio:1/1 to make button fully rounded
     */
    circleButton: {
      minWidth: "0px",
      padding: "0px",
      aspectRatio: "1/1",
      borderRadius: "999px",
    },
    noScroll: {
      /* (Chrome, Edge, Safari) */
      "::-webkit-scrollbar": {
        width: "0px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "transparent",
      },
    },
  },
  components: {
    MuiTypography: typography_,
    MuiCssBaseline: cssBaseLine,
    MuiButton: button,
    MuiSvgIcon: svgIcon,
    MuiInputLabel: inputLabel,
    MuiToggleButtonGroup: toggleButtonGroup,
    MuiAlert: alert,
    MuiTextField: textField,
    MuiDialog: dialog,
    MuiContainer: container,
  },
};

export default theme;
