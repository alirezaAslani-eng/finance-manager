import React from "react";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import MuiButton from "./MuiButton";
import { Box, Typography, useTheme } from "@mui/material";
import type { SxProps } from "@mui/material";
import { useBreakePoints } from "@/hooks";

interface MyProps {
  // * Events === >
  onIncomeClick?: (...args: any) => void;
  onExpenseClick?: (...args: any) => void;
  onAllClick?: (...args: any) => void;
  // * render El === >
  allButton?: boolean;
  // * variant of Mui component true = contained & false = outlined === >
  isInComeActive?: boolean;
  isExpenseActive?: boolean;
  // * buttons type ================= >
  type?: "button" | "submit";
  inComeDesabled?: boolean;
  expenseDisabled?: boolean;
  allDisabled?: boolean;
  disabled?: boolean;
}
function SwitchButton({
  allButton = true,
  isExpenseActive,
  isInComeActive,
  disabled,
  allDisabled,
  expenseDisabled,
  inComeDesabled,
  type = "button",
  onAllClick,
  onExpenseClick,
  onIncomeClick,
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

  // * Events ================== >
  const incomeClick = () => {
    onIncomeClick && onIncomeClick();
  };
  const expenseClick = () => {
    onExpenseClick && onExpenseClick();
  };
  const allClick = () => {
    onAllClick && onAllClick();
  };
  return (
    <>
      <Box
        component={"aside"}
        sx={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        {/* All Button ================== > */}
        {allButton && (
          <MuiButton
            buttonProps={{
              onClick: allClick,
              sx: { ...butto_sx },
              disabled: allDisabled || disabled,
            }}
          >
            <Typography>همه</Typography>
          </MuiButton>
        )}
        {/* Income Button Button ================== > */}
        <MuiButton
          buttonProps={{
            onClick: incomeClick,
            disabled: inComeDesabled || disabled,
            variant: isInComeActive ? "contained" : "outlined",
            color: "success",
            sx: { ...butto_sx },
            type,
          }}
        >
          <CallReceivedRoundedIcon />
          {is_after_600 && <Typography>واریز</Typography>}{" "}
        </MuiButton>
        {/* Expense Button Button ================== > */}
        <MuiButton
          buttonProps={{
            onClick: expenseClick,
            disabled: expenseDisabled || disabled,
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
