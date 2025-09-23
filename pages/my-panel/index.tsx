import { Accounts, RecentTransactions } from "@/components/module";
import { BoxWithTitle, MuiChartBar } from "@/components/ui";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box } from "@mui/material";
import React from "react";

const RecentTransAction_gap = "20px";
const index: PageComponent = () => {
  return (
    <Box sx={{ padding: "35px", height: "2000px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "35px",
        }}
      >
        {/* Transatcions ================ > */}
        <Box sx={{ flex: "1", minWidth: "0" }}>
          <RecentTransactions
            containerProps={{ sx: { gap: RecentTransAction_gap } }}
          />
        </Box>
        {/* Accounts Slider ====================== > */}
        <Box sx={{ flex: "1", minWidth: "0" }}>
          <Accounts />
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: "400px", mt: "35px" }}>
        {/* BarChart ======================= >*/}
        <BoxWithTitle title="گزارش ماهانه">
          <Box height={"400px"}>
            <MuiChartBar />
          </Box>
        </BoxWithTitle>
      </Box>
    </Box>
  );
};

index.Layout = PanelLayout;

export default index;
