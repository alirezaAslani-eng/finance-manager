import React from "react";
import {
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
  useTheme,
  Button,
  Alert,
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import dana_md from "@/constant/font/dana_md";
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
  return (
    <div className={dana_md.className}>
      <Box padding={"20px"}>
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ opacity: isSubmiting ? "0.5" : "1" }}
        >
          {/* // * Icon Transaction ====== >  */}
          <Box
            width={70}
            height={70}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"999px"}
            sx={({ palette: { error, success }, alpha }) => ({
              backgroundColor:
                type === "expense"
                  ? alpha(error.main, 0.2)
                  : alpha(success.main, 0.2),
            })}
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
          <Alert severity="warning">{"تراکنش برای حساب فعال ثبت میشود"}</Alert>

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
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button
              onClick={onAccept}
              disabled={isSubmiting}
              variant="contained"
              size="large"
            >
              {isSubmiting ? "در حال ثبت" : " ثبت تراکنش"}
            </Button>
            <Button
              onClick={onReject}
              disabled={isSubmiting}
              variant="text-grey"
              size="large"
            >
              {"لغو"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default FinallDetailsModal;
