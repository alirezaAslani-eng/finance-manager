import { PaletteOptions } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

const palette: PaletteOptions = {
  white: "#fff",
  black: "#000",
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
