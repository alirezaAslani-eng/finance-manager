import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Typography from "@mui/material/Typography";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { MuiButton, MuiProgress, TextPrice } from "@/components/ui";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { muiTheme } from "@/utils";
import { RecentTransactionType } from "@/types/transaction.types";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useState } from "react";
import { useDate } from "@/hooks";
type Transaction = Pick<
  RecentTransactionType,
  "_id" | "amount" | "category" | "reason" | "createdAt" | "type" | "isLatest"
>;
interface MyProps extends Transaction {
  onRemove?: (id: string) => void;
  isRemoving?: boolean;
}

const TransactionCard = ({
  _id,
  amount = 0,
  category,
  createdAt,
  reason,
  type,
  isLatest,
  isRemoving,
  onRemove = () => {},
}: MyProps) => {
  // * is in Remove state ======== >
  const [isRemoveState, setIsRemoveState] = useState<boolean>(false);

  // * MUI theme ======= >
  const theme = useTheme();
  const {
    palette: { grey, mode, success, error },
    alpha,
  } = theme;

  // * Date ========== >
  const { date } = useDate(createdAt);

  // * Remove event === >
  const removeMe = () => {
    onRemove(_id);
  };

  // * State handler === >
  const removeStateToggle = () => {
    setIsRemoveState((prev) => !prev);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* // * cover for remove state ==== > */}
      {isRemoveState && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: alpha(error.main, 0.2),
          }}
        ></Box>
      )}
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
            sx={{
              fontSize: {
                xs: "18px",
                sm: "22px",
                color: muiTheme(mode, { light: grey[800], dark: grey[100] }),
              },
            }}
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
        <Link
          href={{
            pathname: "/my-panel/transactions/[id]",
            query: { id: _id },
          }}
        >
          <Typography
            variant="subtitle1"
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
        </Link>
      </Box>

      {/* // * Footer Section ================= > */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "10px",
          borderTop: "1px solid",
          borderColor:
            type == "0" ? alpha(error.main, 0.2) : alpha(success.main, 0.2),
          boxShadow: `0px 30px 50px 0px ${
            type == "0" ? alpha(error.main, 0.5) : alpha(success.main, 0.5)
          }`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* // * Dont show info button when state is remove ========== > */}
          {!isRemoveState && (
            <Link
              href={{
                pathname: "/my-panel/transactions/[id]",
                query: { id: _id },
              }}
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
              </MuiButton>
            </Link>
          )}
          {/* // * Remove Section ==================== > */}

          {isLatest && (
            <MuiButton
              buttonProps={{
                disabled: isRemoving,
                onClick: isRemoveState ? removeMe : removeStateToggle,
                variant: isRemoveState ? "contained" : "outlined",
                color: "error",
                sx: {
                  ...theme.custom.resetButton,
                  borderRadius: "999px",
                  p: "10px",
                },
              }}
            >
              {isRemoveState ? (
                <DoneRoundedIcon />
              ) : (
                <DeleteOutlineRoundedIcon />
              )}
            </MuiButton>
          )}
          {/* // * Close Remove State =========== > */}
          {isRemoveState && (
            <MuiButton
              buttonProps={{
                disabled: isRemoving,
                onClick: removeStateToggle,
                sx: {
                  ...theme.custom.resetButton,
                  borderRadius: "999px",
                  p: "10px",
                },
              }}
            >
              <CloseRoundedIcon />
            </MuiButton>
          )}
        </Box>
        {/* Date ===================== > */}
        <Typography>{date}</Typography>
      </Box>
    </Card>
  );
};

export default TransactionCard;
