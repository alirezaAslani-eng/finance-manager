import { CircularProgress } from "@mui/material";
import type { CircularProgressProps } from "@mui/material";
import React from "react";

interface myProps {
  progressProps?: CircularProgressProps;
}
function MuiProgress({ progressProps = {} }: myProps) {
  return <CircularProgress {...progressProps} />;
}

export default MuiProgress;
