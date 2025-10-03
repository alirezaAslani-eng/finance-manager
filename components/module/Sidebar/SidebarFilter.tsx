import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Typography, useTheme } from "@mui/material";
import PriceFilter from "../Input/PriceFilter";
import Datefilter from "../Input/Datefilter";
import { MuiButton, MuiSelectInput } from "@/components/ui";
import { danaMediume, peydaMedium } from "@/pages/_app";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
interface Myprops {
  open?: boolean;
  onClose?: () => any;
}
const SidebarFilter = ({ onClose, open }: Myprops) => {
  // * Theme ================== >
  const theme = useTheme();
  // * Events ================= >
  const closeMe = (): void => {
    onClose && onClose();
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={closeMe}
        variant="temporary"
        className={`${danaMediume.className}`}
      >
        <Box
          sx={{
            width: "280px",
            padding: "20px 25px",
          }}
        >
          {/* Header =================== > */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/*  // * Restart Button ========== > */}
            <MuiButton
              buttonProps={{
                variant: "outlined",
                sx: {
                  ...theme.custom.resetButton,
                  borderRadius: "999px",
                  p: "8px",
                },
              }}
            >
              <RestartAltRoundedIcon />
            </MuiButton>
            {/* // * Apply Button ========== > */}
            <MuiButton>{"اعمال فیلتر"}</MuiButton>

            {/* // * Close Button ==================== > */}
            <MuiButton
              buttonProps={{
                onClick: closeMe,
                variant: "outlined",
                color: "error",
                sx: {
                  ...theme.custom.resetButton,
                  borderRadius: "999px",
                  p: "8px",
                },
              }}
            >
              <CloseRoundedIcon />
            </MuiButton>
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
      className={peydaMedium.className}
    >
      <Typography variant="h1" sx={{ fontSize: "20px" }}>
        {children}
      </Typography>
    </Box>
  );
}
