import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextPrice } from "@/components/ui";
import { muiTheme } from "@/utils";
import { RecentTransactionType } from "@/types/transaction.types";
import { useDate } from "@/hooks";
import { Skeleton, Stack, SxProps } from "@mui/material";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import Link from "next/link";

type Transaction = Partial<
  Pick<
    RecentTransactionType,
    "amount" | "category" | "createdAt" | "type" | "_id"
  >
>;
interface MyProps extends Transaction {
  isPending?: boolean;
}

const shared_icon_sx: SxProps = {
  borderRadius: "14px",
  aspectRatio: "1/1",
  height: { xs: "35px", _540: "40px" },
};

const shared_category_sx: SxProps = { fontSize: { xs: "16px", _540: "24px" } };
const shared_date_sx: SxProps = { xs: "14px", _540: "16px" };
const TransactionCard = ({
  amount = 0,
  category,
  createdAt,
  type,
  _id = "",
  isPending,
}: MyProps) => {
  // * income = 1 / expense = 0 ===== >
  const isIncome = type === "1";

  // * Date ========== >
  const { date, time } = useDate(new Date(createdAt ?? ""));

  return (
    <Link href={`/my-panel/transactions/${_id}`}>
      <Box
        // * Box is wrapper
        sx={(theme) => {
          const {
            palette: { grey, mode },
          } = theme;
          return {
            p: "14px",
            borderRadius: "12px",
            transition: "scale 150ms ease",
            cursor: "pointer",
            bgcolor: muiTheme(mode, {
              dark: grey[900],
              light: grey[100],
            }),
            ":hover": {
              scale: "1.01",
            },
          };
        }}
      >
        {/* // * Used Stack to centeralize Type Icon with Content */}
        <Stack flexDirection={"row"} alignItems={"center"} gap={"14px"}>
          {/* // * Type Icon === > */}
          {!isPending ? (
            <Box
              sx={(theme) => {
                const {
                  palette: { error, success },
                  alpha,
                } = theme;
                return {
                  ...shared_icon_sx,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: isIncome ? success.main : error.main,
                  bgcolor: isIncome
                    ? alpha(success.main, 0.2)
                    : alpha(error.main, 0.2),
                };
              }}
            >
              {isIncome ? (
                <CallReceivedRoundedIcon />
              ) : (
                <CallReceivedRoundedIcon sx={{ rotate: "180deg" }} />
              )}
            </Box>
          ) : (
            <Skeleton variant="rounded" sx={shared_icon_sx} />
          )}

          {/* // * Transactions Content (Price) | Category =============================== > */}
          <Box flex={"1"} minWidth={"0"}>
            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              {/* // * Category ==== > */}
              {!isPending ? (
                <Typography
                  fontFamily={"var(--peyda-md)"}
                  sx={shared_category_sx}
                >
                  {category?.name ?? ""}
                </Typography>
              ) : (
                <Skeleton
                  variant="text"
                  sx={shared_category_sx}
                  width={"100px"}
                />
              )}
              {/* // * Amount ==== > */}
              {!isPending ? (
                <Box
                  alignSelf={{ xs: "start", _540: "center" }}
                  sx={(theme) => {
                    const {
                      palette: { error, success },
                      alpha,
                    } = theme;
                    return {
                      borderRadius: "8px",
                      p: "4px 8px",
                      bgcolor: isIncome
                        ? alpha(success.main, 0.1)
                        : alpha(error.main, 0.1),
                    };
                  }}
                >
                  <TextPrice
                    fontSize={{
                      xs: "14px",
                      _540: "18px",
                    }}
                    price={amount}
                    type={isIncome ? "income" : "expense"}
                  />
                </Box>
              ) : (
                <Skeleton
                  variant="text"
                  sx={shared_category_sx}
                  width={"100px"}
                />
              )}
            </Stack>
            {/* // * Date ======== > */}
            {!isPending ? (
              <Typography
                mt={"5px"}
                sx={shared_date_sx}
              >{`${date} | ${time}`}</Typography>
            ) : (
              <Skeleton variant="text" sx={shared_date_sx} width={"150px"} />
            )}
          </Box>
        </Stack>
      </Box>
    </Link>
  );
};

export default TransactionCard;
