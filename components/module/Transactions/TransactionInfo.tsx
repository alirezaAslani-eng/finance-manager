import { TextPrice } from "@/components/ui";
import dana_md from "@/constant/font/dana_md";
import { formatBankNumber, getFaDate } from "@/lib/utils";
import { muiTheme } from "@/packages/mui";
import type { Transaction } from "@/types/transaction.types";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";

function TransactionInfo(transactionInfo: Partial<Transaction>) {
  // * component's info to present
  const {
    _id,
    account = "",
    amount = 0,
    category = {},
    createdAt = "",
    isLatest,
    reason,
    type,
  } = transactionInfo;

  const { fa_date, fa_time } = getFaDate(
    new Date(transactionInfo?.createdAt ?? ""),
  );

  return (
    <Stack
      className={dana_md.className}
      alignItems={"center"}
      p={"20px"}
      width={"100%"}
    >
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        {/* // * Amount ---- > */}
        <TextPrice
          price={25000}
          type="income"
          fontSize={{ xs: "28px", sm: "32px" }}
          unitFontSize={"16px"}
        />

        {/* // * Account Info */}
        <Stack alignItems={"center"}>
          <Box display={"flex"} alignItems={"center"} gap={"4px"}>
            <Box component={"img"} src={"/images/bankIcons/ansar-05.svg"} />
            <Typography>{"مریم اصلانی"}</Typography>
          </Box>
          <Typography component={"span"}>
            {formatBankNumber("6104337686987876")}
          </Typography>
        </Stack>
      </Box>

      <Box mt={"12px"} display="flex" alignItems="center" gap={"8px"}>
        <Chip label={fa_date} />
        <Chip label={fa_time} />
      </Box>

      {/* balance after transaction */}
      <Stack alignItems={"center"} mt={"12px"}>
        <Typography>{"موجودی بعد از تراکنش"}</Typography>
        <TextPrice price={55000} />
      </Stack>
      <Box display={"flex"} mt={"8px"} alignItems={"center"} gap={"8px"}>
        <Button
          variant="outlined"
          sx={(tm) => ({ ...tm.custom!.circleButton })}
        >
          <ModeRoundedIcon />
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={(tm) => ({ ...tm.custom!.circleButton })}
        >
          <DeleteOutlineRounded />
        </Button>
      </Box>
      <Divider sx={{ my: "16px", width: "100%" }} />

      {/* reason of transaction */}
      <Stack alignItems={"start"} width={"100%"}>
        <Typography>{"دلیل تراکنش"}</Typography>
        <Typography
          mt={"8px"}
          sx={({ palette }) => ({
            color: muiTheme(palette.mode, {
              dark: palette.grey[500],
              light: palette.grey[700],
            }),
          })}
        >
          {
            " این تراکنش یک متن طولانی کیتواند باشد و این دیزاین باید جوری طراحی شود که هم برای متن کوتاه و هم بلند به کاربر بهترین تجربه را دهد"
          }
        </Typography>
      </Stack>
    </Stack>
  );
}

export default TransactionInfo;
