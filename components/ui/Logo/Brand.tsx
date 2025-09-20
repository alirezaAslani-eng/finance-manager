import { Typography, TypographyProps } from "@mui/material";
import React from "react";

interface myProps {
  textProps?: TypographyProps;
}
function Brand({ textProps }: myProps) {
  return (
    <Typography
      variant="h1"
      component={"h1"}
      {...textProps}
      sx={{ fontSize: "28px", ...textProps?.sx }}
    >
      {"هزینه یار"}
    </Typography>
  );
}

export default Brand;
