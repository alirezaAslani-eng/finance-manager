import { Accounts, RecentTransactions } from "@/components/module";
import { useBreakePoints } from "@/hooks";
import { PanelLayout } from "@/layout";
import { PageComponent } from "@/types/page.types";
import { Box } from "@mui/material";
import React from "react";

const RecentTransAction_gap = "20px";
const index: PageComponent = () => {
  const { isTablet } = useBreakePoints();
  return (
    <Box
      sx={{
        padding: {
          xs: "30px 0px",
          md: "35px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            xl: "row",
          },
          justifyContent: "center",
          alignItems: "stretch",
          gap: "35px",
        }}
      >
        {/* Transatcions ================ > */}
        <Box
          sx={{
            flex: "1",
            minWidth: "0",
            order: {
              xs: "2",
              md: "1",
            },
          }}
        >
          <RecentTransactions
            containerProps={{ sx: { gap: RecentTransAction_gap } }}
          />
        </Box>
        {/* Accounts Slider ====================== > */}
        <Box
          sx={{
            flex: "1",
            minWidth: "0",
            order: {
              xs: "1",
              md: "2",
            },
          }}
        >
          <Accounts />
        </Box>
      </Box>
    </Box>
  );
};

index.Layout = PanelLayout;

export default index;
