import React from "react";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import MuiButton from "./MuiButton";
import { Box, Typography, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material";
import { useBreakePoints } from "@/hooks";

interface MyProps {
  // * render El === >
  allButton?: boolean;
  // * variant of Mui component true = contained & false = outlined === >
  isInComeActive?: boolean;
  isExpenseActive?: boolean;
  // * buttons type ================= >
  type?: "button" | "submit";
}
function SwitchButton({
  allButton = true,
  isExpenseActive,
  isInComeActive,
  type = "button",
}: MyProps) {
  // * Breakpoints ===================== >
  const { is_after_600 } = useBreakePoints();
  // * Theme ================ >
  const theme = useTheme();
  // * Button style ============== >
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
        {allButton && (
          <MuiButton buttonProps={{ sx: { ...butto_sx } }}>
            <Typography>همه</Typography>
          </MuiButton>
        )}
        {/* Income Button Button ================== > */}
        <MuiButton
          buttonProps={{
            variant: isInComeActive ? "contained" : "outlined",
            color: "success",
            sx: { ...butto_sx, color: theme.palette.grey[50] },
            type,
          }}
        >
          <CallReceivedRoundedIcon />
          {is_after_600 && <Typography>واریز</Typography>}{" "}
        </MuiButton>
        {/* Expense Button Button ================== > */}
        <MuiButton
          buttonProps={{
            variant: isExpenseActive ? "contained" : "outlined",
            color: "error",
            sx: { ...butto_sx },
            type,
          }}
        >
          <CallMadeRoundedIcon />
          {is_after_600 && <Typography>بر داشت</Typography>}
        </MuiButton>
      </Box>
    </>
  );
}

export default SwitchButton;
