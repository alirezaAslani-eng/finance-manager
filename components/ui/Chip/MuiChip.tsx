import { Chip } from "@mui/material";
import React from "react";
interface MyProps {
  text?: string;
}
function MuiChip({  text }: MyProps) {
  return <Chip label={text} />;
}
export default MuiChip;
