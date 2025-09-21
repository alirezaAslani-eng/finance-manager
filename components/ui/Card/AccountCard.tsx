import { MuiButton } from "@/components/ui";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";

function AccountCard() {
  const theme = useTheme();
  const { palette, alpha } = theme;

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "25px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          padding: "30px 15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: palette.primary.main,
        }}
      >
        {/* Card Number =============== > */}
        <Typography
          component={"span"}
          display={"block"}
          sx={{ fontSize: "26px", color: palette.grey[50] }}
        >
          {"6037 6976 8508 5414"}
        </Typography>
        <Typography
          component={"span"}
          display={"block"}
          sx={{ fontSize: "20px", color: palette.grey[50] }}
        >{`مجودی : ${"20,000,000"}`}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          p: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: alpha(palette.primary.main, 0.1),
        }}
      >
        <MuiButton
          buttonProps={{
            variant: "outlined",
            sx: {
              ...theme.custom.resetButton,
              borderRadius: "999px",
              p: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            },
          }}
        >
          <DoneRoundedIcon />
          فعال کردن کارت
        </MuiButton>
        <Typography component={"p"}>{`به نام : ${"مریم اصلانی"}`}</Typography>
      </Box>
    </Box>
  );
}

export default AccountCard;
