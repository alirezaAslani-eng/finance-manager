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
import MuiButton from "../Button/MuiButton";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import Link from "next/link";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface MyProps {
  _id?: string;
  amount?: number;
  balance?: number;
  type?: "expense" | "income";
  date?: string;
  houre?: string;
  accountNumber?: string;
  cardProps?: CardProps;
}
function TransactionDetalCard({
  amount = 8000000000,
  balance = 200_000,
  type = "expense",
  _id = "",
  cardProps,
  date = "1404/04/09",
  houre = "2 عصر",
  accountNumber = "",
}: Partial<MyProps>) {
  const theme = useTheme();
  const {
    alpha,
    palette: { success, error, primary },
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
        <Box mb={2}>
          <Typography
            variant="h1"
            color={amountColor}
            sx={{ fontSize: { xs: "24px", md: "30px" } }}
          >
            {type === "income" ? "+" : "-"} {amount.toLocaleString()} {"تومان"}
          </Typography>
        </Box>
        {/* Current Balance ========================== > */}
        <Typography>
          موجودی بعد از تراکنش :{"  "}
          <Typography component={"span"} color={currentBalanceColor}>
            {balance.toLocaleString()}
          </Typography>{" "}
          {"تومان"}
        </Typography>
        {/* Acccount number ================= > */}
        <Typography mt={"10px"}>
          {type == "expense" ? "از حساب" : "به حساب"}
          {" : "}
          <Typography component={"span"} color="primary">
            {accountNumber
              .replace(/(.{4})(?=.)/g, "$1-")
              .split("-")
              .reverse()
              .join("-")}
          </Typography>
        </Typography>
        <Divider sx={{ my: "10px" }} />
        {/* Date ========================== > */}
        <Typography>تاریخ : {date}</Typography>
        <Divider sx={{ my: "10px" }} />
        {/* Time ========================== > */}
        <Typography>ساعت : {houre}</Typography>
        {/* Edit and Remove Button ============================= > */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            mt: "10px",
            justifyContent: "end",
          }}
        >
          {/* // * Edit ====================== > */}
          <Link href={`/my-panel/transactions/${_id}?edit=true`}>
            <MuiButton
              buttonProps={{
                variant: "outlined",
                sx: {
                  ...theme.custom.resetButton,
                  p: "10px",
                  borderRadius: "999px",
                },
              }}
            >
              <ModeRoundedIcon />
            </MuiButton>
          </Link>
          {/* // * Remove ============================= > */}
          <MuiButton
            buttonProps={{
              variant: "outlined",
              color: "error",
              sx: {
                ...theme.custom.resetButton,
                p: "10px",
                borderRadius: "999px",
              },
            }}
          >
            <DeleteRoundedIcon />
          </MuiButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TransactionDetalCard;
