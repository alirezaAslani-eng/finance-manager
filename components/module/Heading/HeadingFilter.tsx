import { MuiButton, SwitchButton } from "@/components/ui";
import { Box, SxProps, Typography, useTheme } from "@mui/material";
import React from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface MyProps {
  onSidebar?: (e:boolean) => any;
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

  // * Events ================= >
  const openSidebar = () => {
    onSidebar && onSidebar(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Switch Button between income and expense ================> */}
      <SwitchButton />

      <Box component={"aside"}>
        <MuiButton buttonProps={{ sx: { ...butto_sx }, onClick: openSidebar }}>
          <AutoAwesomeIcon />
          <Typography>جستجو پیشرفته</Typography>
        </MuiButton>
      </Box>
    </Box>
  );
}

export default HedingFilter;
