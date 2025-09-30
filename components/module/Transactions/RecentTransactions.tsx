import { BoxWithTitle, MuiButton, TransactionCard } from "@/components/ui";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import NorthWestRoundedIcon from "@mui/icons-material/NorthWestRounded";
import Link from "next/link";
import { useBreakePoints } from "@/hooks";
interface myProp {
  containerProps?: BoxProps;
}
// TODO logic of showing and transactions and get theme from server
const RecentTransactions = ({ containerProps }: myProp) => {
  return (
    <BoxWithTitle
      title="تراکنش های اخیر"
      boxProps={{ sx: { p: "20px", height: "100%" } }}
      Button={
        <Link href="">
          <MuiButton
            buttonProps={{
              sx: { display: "flex", alignItems: "center", gap: "5px" },
            }}
          >
            {"مشاهده همه"}
            <NorthWestRoundedIcon />
          </MuiButton>
        </Link>
      }
    >
      <Box
        {...containerProps}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2,1fr)",
          },
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
