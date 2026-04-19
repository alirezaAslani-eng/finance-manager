import { PaletteOptions } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

const sharedPalette = {
  white: { 50: "#fff", 100: "#f8f8f8ff" },
  black: { 950: "#000" },
  blue: { 900: "#0e1015ff", 950: "#12161eff" },
} satisfies PaletteOptions;

const palette: PaletteOptions = {
  white: sharedPalette.white,
  black: sharedPalette.black,
  blue: sharedPalette.blue,
  darkBackground: sharedPalette.blue[900],
  darkPaper: sharedPalette.blue[950],
  background: {
    default: sharedPalette.white[50],
    paper: sharedPalette.white[100],
  },
  primary: {
    main: blue[500],
  },
  error: {
    main: red[500],
  },
  grey: {
    900: grey[900],
  },
};

export default palette;
