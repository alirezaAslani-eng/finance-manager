import { TransactionCard } from "@/components/ui";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

const RecentTransactions = (boxProps: BoxProps) => {
  return (
    <Box
      display={"flex"}
      gap={"14px"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={{ xs: "326px", sm: "414px" }}
      {...boxProps}
    >
      <TransactionCard
        amount={40000000}
        category={{ _id: "", name: "خرج خونه" }}
        createdAt={new Date().toISOString()}
        type="0"
      />
      <TransactionCard
        amount={40000000}
        category={{ _id: "", name: "خرج خونه" }}
        createdAt={new Date().toISOString()}
        type="0"
      />
      <TransactionCard
        amount={40000000}
        category={{ _id: "", name: "خرج خونه" }}
        createdAt={new Date().toISOString()}
        type="0"
      />
      <TransactionCard
        amount={40000000}
        category={{ _id: "", name: "خرج خونه" }}
        createdAt={new Date().toISOString()}
        type="0"
      />
    </Box>
  );
};

export default RecentTransactions;