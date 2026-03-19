import dana_md from "@/constant/font/dana_md";
import { Box, Typography } from "@mui/material";
import BankIcon from "../Img/BankIcon";
import { lastCardNumbers } from "@/lib/utils";
import type { AccountMenuItemProps } from "../types";

function AccountMenuItem(props: AccountMenuItemProps) {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      className={dana_md.className}
    >
      <Box display={"flex"} alignItems={"center"} gap={"4px"}>
        <BankIcon src={props.bankIcon ?? null} alt={props.bankName ?? null} />
        <Typography variant="sm">{props.accountName}</Typography>
      </Box>
      <Typography>{lastCardNumbers(props.cardNumber)}</Typography>
    </Box>
  );
}

export default AccountMenuItem;
