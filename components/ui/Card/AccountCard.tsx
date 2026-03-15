import { Box, Stack, Typography } from "@mui/material";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import { formatBankNumber } from "@/lib/utils";
import TextPrice from "../Text/TextPrice";
import { muiTheme } from "@/packages/mui";
import { Account } from "@/types/account.types";
import BankIcon from "../Img/BankIcon";

function AccountCard(props: Partial<Account>) {
  return (
    <Box
      p={"16px"}
      position={"relative"}
      borderRadius={"16px"}
      sx={({ alpha, palette }) => ({
        border: "1px solid",
        borderColor: muiTheme(palette.mode, {
          light: alpha(palette.black, 0.3),
          dark: alpha(palette.white, 0.3),
        }),
      })}
    >
      <Stack alignItems={"center"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            width={"100%"}
            gap={"4px"}
          >
            {/* // * --------------- Bank Icon --------------- */}
            <BankIcon src="/images/bankIcons/maskan-26.svg" alt="test icon" />
            {/* // * --------------- Owner Name --------------- */}
            <Typography>{"مریم اصلانی"}</Typography>
          </Box>

          {/* // * --------------- Edit Icon --------------- */}
          <ModeRoundedIcon
            fontSize="small"
            sx={({ palette }) => ({
              cursor: "pointer",
              color: muiTheme(palette.mode, {
                dark: palette.grey[300],
                light: palette.grey[700],
              }),
            })}
          />
        </Box>

        <Stack alignItems={"center"} mt={"12px"}>
          {/* // * --------------- Card Number --------------- */}
          <Typography>{formatBankNumber("6104337485085414")}</Typography>
          {/* // * --------------- Account Balance --------------- */}
          <Box>
            <TextPrice
              price={25000000000}
              fontSize={"16px"}
              unitFontSize={"14px"}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AccountCard;
