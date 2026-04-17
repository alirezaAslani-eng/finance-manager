import { PaletteOptions } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";
const sharedPalette = {
  white: { 50: "#fff", 100: "#f8f8f8ff" },
  black: { 950: "#000" },
} satisfies PaletteOptions;

const palette: PaletteOptions = {
  white: sharedPalette.white,
  black: sharedPalette.black,
  background: {
    default: "#fff",
    paper: grey[50],
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
