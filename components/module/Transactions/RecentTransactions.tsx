import { BoxWithTitle, TransactionCard } from "@/components/ui";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

interface myProp {
  containerProps?: BoxProps;
}
// TODO logic of showing and transactions and get theme from server 
const RecentTransactions = ({ containerProps }: myProp) => {
  return (
    <BoxWithTitle
      title="تراکنش های اخیر"
      boxProps={{ sx: { p: "20px", height: "100%" } }}
    >
      <Box
        {...containerProps}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
          mt: "20px",
          ...containerProps?.sx,
        }}
      >
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </Box>
    </BoxWithTitle>
  );
};

export default RecentTransactions;
