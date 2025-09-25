import React from "react";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import MuiButton from "./MuiButton";
import { Box, Typography, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material";
function SwitchButton() {
  const theme = useTheme();
  const butto_sx: SxProps = {
    ...theme.custom.resetButton,
    borderRadius: "18px",
    p: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };
  return (
    <>
      <Box
        component={"aside"}
        sx={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        {/* All Button ================== > */}
        <MuiButton buttonProps={{ sx: { ...butto_sx } }}>
          <Typography>همه</Typography>
        </MuiButton>
        {/* Income Button Button ================== > */}
        <MuiButton
          buttonProps={{
            variant: "outlined",
            color: "info",
            sx: { ...butto_sx },
          }}
        >
          <CallReceivedRoundedIcon />
          <Typography>واریز</Typography>
        </MuiButton>
        {/* Expense Button Button ================== > */}
        <MuiButton
          buttonProps={{
            variant: "outlined",
            color: "error",
            sx: { ...butto_sx },
          }}
        >
          <CallMadeRoundedIcon />
          <Typography>بر داشت</Typography>
        </MuiButton>
      </Box>
    </>
  );
}

export default SwitchButton;
