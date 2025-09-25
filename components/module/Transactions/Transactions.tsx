import { MuiButton, TransactionCard } from "@/components/ui";
import { Box, Grid, useTheme } from "@mui/material";

const Transactions = () => {
  // * Style =========== >
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
            xl: "repeat(4,1fr)",
          },
          gap: "20px",
        }}
      >
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </Box>
      {/* Lazy Fetch Button ==================== > */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
        <MuiButton
          buttonProps={{
            sx: {
              ...theme.custom.resetButton,
              borderRadius: "999px",
              p: "18px",
            },
          }}
        >
          {"بیشتر"}
        </MuiButton>
      </Box>
    </Box>
  );
};

export default Transactions;
