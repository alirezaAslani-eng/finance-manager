import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Divider,
} from "@mui/material";
import type { CardProps } from "@mui/material";

interface MyProps {
  amount: number;
  balance: number;
  type: "expense" | "income"; // deposit یا withdraw
  cardProps?: CardProps;
}
function TransactionDetalCard({
  amount = 300_000,
  balance = 200_000,
  type = "expense",
  cardProps,
}: Partial<MyProps>) {
  const theme = useTheme();
  const {
    alpha,
    palette: { success, error },
  } = theme;
  //  * State Color =============== >
  const amountColor = type == "income" ? success.main : error.main;
  const currentBalanceColor = balance <= 10_000 ? error.main : success.main;
  return (
    <Card
      {...cardProps}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: alpha(amountColor, 0.5),
        ...cardProps?.sx,
      }}
    >
      <CardContent>
        {/* Price ====================== > */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h1"
            color={amountColor}
            sx={{ fontSize: "34px" }}
          >
            {type === "income" ? "+" : "-"} {amount.toLocaleString()} {"تومان"}
          </Typography>
        </Box>
        {/* Current Balance ========================== > */}
        <Typography gutterBottom>
             موجودی بعد از تراکنش :{"  "}
          <Typography component={"span"} color={currentBalanceColor}>
            {balance.toLocaleString()}
          </Typography>{" "}
          {"تومان"}
        </Typography>
        <Divider sx={{ my: "10px" }} />
        <Typography gutterBottom>تاریخ : {"1404/12/13"}</Typography>
        <Divider sx={{ my: "10px" }} />
        <Typography gutterBottom>روز : {"دو شنبه"}</Typography>
        <Divider sx={{ my: "10px" }} />
        <Typography gutterBottom>ساعت : {"22:44"}</Typography>
      </CardContent>
    </Card>
  );
}

export default TransactionDetalCard;
