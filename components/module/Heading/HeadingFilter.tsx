import { MuiButton, SwitchButton } from "@/components/ui";
import { Box, SxProps, Typography, useTheme } from "@mui/material";
import React from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useBreakePoints } from "@/hooks";
interface MyProps {
  onSidebar?: (e: boolean) => any;
}
function HedingFilter({ onSidebar }: MyProps) {
  // Style ================== >
  const theme = useTheme();
  const butto_sx: SxProps = {
    ...theme.custom.resetButton,
    borderRadius: "18px",
    p: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };
  // * Breakepoints ================ >
  const { is_after_600 } = useBreakePoints();

  // * Events ================= >
  const openSidebar = () => {
    onSidebar && onSidebar(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Switch Button between income and expense ================> */}
      <SwitchButton />

      <Box component={"aside"}>
        <MuiButton buttonProps={{ sx: { ...butto_sx }, onClick: openSidebar }}>
          <TuneRoundedIcon />
          {is_after_600 && <Typography>جستجو پیشرفته</Typography>}
        </MuiButton>
      </Box>
    </Box>
  );
}

export default HedingFilter;
