import { Box, Typography } from "@mui/material";
import React from "react";

interface myProps {
  title: string;
  text: string;
}
function MuiTitleText({ text, title }: myProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Title =================== > */}
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "32px",
            md: "40px",
            lg: "45px",
          },
        }}
      >
        {title}
      </Typography>
      {/* Text =============== > */}
      <Typography
        sx={{
          fontSize: {
            xs: "18px",
            md: "20px",
          },
          mt: "20px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default MuiTitleText;
