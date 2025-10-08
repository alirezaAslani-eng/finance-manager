import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { MuiButton, TextPrice } from "@/components/ui";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { muiTheme } from "@/utils";
import { RecentTransactionType } from "@/types/transaction.types";

type Transaction = Pick<
  RecentTransactionType,
  "_id" | "amount" | "category" | "reason" | "createdAt" | "type"
>;
interface MyProps extends Transaction {}

const TransactionCard = ({
  _id,
  amount = 0,
  category,
  createdAt,
  reason,
  type,
}: MyProps) => {
  const theme = useTheme();
  const {
    palette: { grey, mode },
    alpha,
  } = theme;
  console.log(category);
  
  return (
    <Card variant="outlined" sx={{ width: "auto", borderRadius: "20px" }}>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            // * Responsive Flex ===================== >
            justifyContent: { xs: "center", md: "space-between" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* // * Title ===================== > */}
          <Typography
            component="p"
            // * Responsive fontSize ===================== >
            sx={{ fontSize: { xs: "18px", sm: "22px" } }}
          >
            {category?.name}
          </Typography>
          {/* // * Price ================ > */}
          <TextPrice
            price={amount}
            type={type == "0" ? "expense" : "income"}
            // * Responsive fontSize ===================== >
            priceProps={{ sx: { fontSize: { xs: "24px", sm: "26px" } } }}
          />
        </Box>
        {/* // * Description ================ > */}
        <Typography
          sx={{
            // * Responsive textAlign ===================== >
            textAlign: { xs: "center", sm: "right" },
            color: muiTheme(mode, {
              light: alpha(grey[900], 0.6),
              dark: alpha(grey[50], 0.6),
            }),
          }}
        >
          {reason}
        </Typography>
      </Box>
      <Divider />
      {/* // * Footer Section ================= > */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "10px",
        }}
      >
        <Link
          href={{ pathname: "/my-panel/transactions/[id]", query: { id: _id } }}
        >
          <MuiButton
            buttonProps={{
              sx: {
                ...theme.custom.resetButton,
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                p: "10px",
              },
            }}
          >
            <ArrowOutwardRoundedIcon />
            {"مشاهده"}
          </MuiButton>
        </Link>
        {/* Date ===================== > */}
        <Typography>{createdAt as string}</Typography>
      </Box>
    </Card>
  );
};

export default TransactionCard;
