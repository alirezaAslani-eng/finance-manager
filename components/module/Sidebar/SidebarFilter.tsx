import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Typography, useTheme } from "@mui/material";
import PriceFilter from "../Input/PriceFilter";
import Datefilter from "../Input/Datefilter";
import { MuiButton, MuiSelectInput } from "@/components/ui";

const SidebarFilter = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Drawer open={open} onClose={() => {}} variant="permanent">
        <Box
          sx={{
            width: "300px",
            padding: "20px 25px",
          }}
        >
          {/* Header =================== > */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Apply Button ========== > */}
            <MuiButton>{"اعمال فیلتر"}</MuiButton>
          </Box>
          {/* Body Sidebar ================= > */}
          <Box sx={{ mt: "20px" }}>
            {/* Price Filter ===============================> */}
            <Box>
              <Title>{"مبلغ تراکنش"}</Title>
              <PriceFilter containerProps={{ sx: { mt: "20px" } }} />
            </Box>
            <Divider sx={{ m: "20px 0px" }} />
            {/* Date Filter ===============================> */}
            <Box>
              <Title>{"تاریخ تراکنش"}</Title>
              <Datefilter containerProps={{ sx: { mt: "20px" } }} />
            </Box>
            <Divider sx={{ m: "20px 0px" }} />
            {/* Category Filter ================================ >*/}
            <Title>{"دسته بندی تراکنش"}</Title>
            <Box sx={{ mt: "20px" }}>
              <MuiSelectInput
                inputProps={{ label: "دسته بندی" }}
                value={[
                  { text: "متن تستس", value: "value" },
                  { text: "متن تستس", value: "value" },
                ]}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default SidebarFilter;

function Title({ children }: { children: string }) {
  return (
    <Box
      sx={{
        width: "fit-content",
        p: "8px",
        borderRadius: "20px",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "20px" }}>
        {children}
      </Typography>
    </Box>
  );
}
