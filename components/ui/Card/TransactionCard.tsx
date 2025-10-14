import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { MuiButton, TextPrice } from "@/components/ui";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { muiTheme } from "@/utils";
import { RecentTransactionType } from "@/types/transaction.types";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
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
    palette: { grey, mode, primary, success, error },
    alpha,
  } = theme;

  const date = new Date(createdAt).toLocaleDateString("fa-IR", {
    timeZone: "Asia/Tehran",
  });
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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
          {/* // * remove Button ==================== > */}
          <MuiButton
            buttonProps={{
              variant: "outlined",
              color: "error",
              sx: {
                ...theme.custom.resetButton,
                borderRadius: "999px",
                p: "10px",
              },
            }}
          >
            <DeleteOutlineRoundedIcon />
          </MuiButton>
        </Box>
        {/* Date ===================== > */}
        <Typography>{date}</Typography>
      </Box>
    </Card>
  );
};

export default TransactionCard;
