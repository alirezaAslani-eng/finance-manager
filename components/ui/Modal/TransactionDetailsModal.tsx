import React from "react";
import { Typography, Box, Chip, Divider, Stack, useTheme } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import MuiAlert from "../Alert/MuiAlert";
import MuiButton from "../Button/MuiButton";
import { dana_md } from "@/utils/font";
import TextPrice from "../Text/TextPrice";

interface MyProps {
  type?: "expense" | "income";
  amount?: number;
  category?: string;
  onReject?: () => void;
  onAccept?: () => void;
  isSubmiting?: boolean;
}
function FinallDetailsModal({
  amount = 200000,
  category = "دسته بندی",
  type = "expense",
  onAccept = () => {},
  onReject = () => {},
  isSubmiting,
}: MyProps) {
  const {
    palette: { success, error, background },
    alpha,
  } = useTheme();

  return (
    <div className={dana_md.className}>
      <Box
        padding={"20px"}
        sx={{
          width: {
            xs: "100%",
            sm: "500px",
            backgroundColor: background.default,
            borderRadius: "12px",
          },
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ opacity: isSubmiting ? "0.5" : "1" }}
        >
          {/* // * Icon Transaction ====== >  */}
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                type === "expense"
                  ? alpha(error.main, 0.2)
                  : alpha(success.main, 0.2),
            }}
          >
            {type === "expense" ? (
              <ArrowUpward color="error" sx={{ fontSize: 36 }} />
            ) : (
              <ArrowDownward color="success" sx={{ fontSize: 36 }} />
            )}
          </Box>
          {/* //  * Transaction Details ======> */}
          <Box textAlign="center">
            {/* // * Amount ===== > */}
            <TextPrice price={amount} type={type} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {type === "expense" ? "برداشت از" : "واریز به"} حساب فعال
            </Typography>
          </Box>
          {/* // * Warning Alert Alert ========= > */}
          <MuiAlert text={"تراکنش برای حساب فعال ثبت میشود"} />

          <Divider sx={{ width: "100%" }} />
          {/* // * Category ==== > */}
          <Chip
            label={category}
            color={type == "expense" ? "error" : "success"}
            variant="outlined"
            sx={{
              borderRadius: 2,
            }}
          />
          {/* // * Buttons ==== > */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <MuiButton
              buttonProps={{
                disabled: isSubmiting,
                onClick: onAccept,
                sx: { borderRadius: 2 },
                variant: "contained",
              }}
            >
              {isSubmiting ? "در حال ثبت" : " ثبت تراکنش"}
            </MuiButton>
            <MuiButton
              buttonProps={{
                disabled: isSubmiting,
                onClick: onReject,
                sx: { borderRadius: 2 },
                variant: "outlined",
              }}
            >
              لغو
            </MuiButton>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default FinallDetailsModal;
