import { PaletteOptions } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

const palette: PaletteOptions = {
  primary: {
    main: blue[500],
  },
  error: {
    main: red[500],
    300: red[300],
    50: grey[50],
  },
  grey: {
    100: grey[100],
  },
};

export default palette;
