import { Box, Button } from "@mui/material";
import type { BoxProps } from "@mui/material";
import NorthWestRoundedIcon from "@mui/icons-material/NorthWestRounded";
import Link from "next/link";
import { RecentTransactionType } from "@/types/transaction.types";
import LoadeingErrorHandler from "../WaitHandler/LoadeingErrorHandler";
interface myProp {
  containerProps?: BoxProps;
  recentTransactions: RecentTransactionType[];
}
const RecentTransactions = ({
  containerProps,
  recentTransactions = [],
}: myProp) => {
  return (
    <BoxWithTitle
      title="تراکنش های اخیر"
      boxProps={{ sx: { p: "20px", height: "100%" } }}
      Button={
        <Link href="">
          <Button
            size="medium"
            variant="text"
            sx={(tm) => {
              return { gap: tm.spacing(1) };
            }}
          >
            {"مشاهده همه"}
            <NorthWestRoundedIcon />
          </Button>
        </Link>
      }
    >
      <LoadeingErrorHandler
        dataCheck={{
          check: !!recentTransactions.length,
          error: (
            <NoData
              containerProps={{ sx: { py: "20px" } }}
              buttonText="ایجاد اولین تراکنش"
              noDataText="هنوز تراکنشی ایجاد نشده"
              link="/my-panel/transactions/add"
            />
          ),
        }}
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
          {recentTransactions.map((transaction) => {
            return <TransactionCard key={transaction._id} {...transaction} />;
          })}
        </Box>
      </LoadeingErrorHandler>
    </BoxWithTitle>
  );
};

export default RecentTransactions;
