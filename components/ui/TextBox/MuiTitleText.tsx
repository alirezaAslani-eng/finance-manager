import { Box, Typography } from "@mui/material";
import React from "react";

interface myProps {
  title: string;
  text: string;
}
function MuiTitleText({ text, title }: myProps) {
  return (
    <Box>
      {/* Title =================== > */}
      <Typography>{title}</Typography>
      {/* Text =============== > */}
      <Typography>{text}</Typography>
    </Box>
  );
}

export default MuiTitleText;
