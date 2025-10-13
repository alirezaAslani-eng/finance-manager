import {
  BoxWithTitle,
  MuiButton,
  NoData,
  TransactionCard,
} from "@/components/ui";
import { Box } from "@mui/material";
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
      <LoadeingErrorHandler
        dataCheck={{
          check: !!recentTransactions.length,
          error: (
        
            <NoData
            containerProps={{sx:{py:"20px"}}}
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
            return <TransactionCard {...transaction} />;
          })}
        </Box>
      </LoadeingErrorHandler>
    </BoxWithTitle>
  );
};

export default RecentTransactions;
