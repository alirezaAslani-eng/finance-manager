import React from "react";
import LandingTopBar from "../LandingTopBar/LandingTopBar";
import { Box } from "@mui/material";

function Landing() {
  return (
    <Box sx={{ minHeight: "100svh" }}>
      {/* TopBar ======================== > */}
      <LandingTopBar />
    </Box>
  );
}

export default Landing;
