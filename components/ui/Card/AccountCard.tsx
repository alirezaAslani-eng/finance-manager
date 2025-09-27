import { MuiButton } from "@/components/ui";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import React from "react";
import Link from "next/link";

interface MyProp {
  onlyInfo?: boolean;
}
function AccountCard({ onlyInfo }: MyProp) {
  const theme = useTheme();
  const { palette, alpha } = theme;

  const footerButton_sx = {
    ...theme.custom.resetButton,
    borderRadius: "999px",
    p: "8px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "25px",
        overflow: "hidden",
      }}
    >
      {/* Body Card ============================== > */}
      <Box
        sx={{
          padding: "20px 15px",
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
        {/* Current Balance ========================= > */}
        <Typography
          component={"span"}
          display={"block"}
          sx={{ fontSize: "20px", color: palette.grey[50] }}
        >{`مجودی : ${"20,000,000"}`}</Typography>
        {/* Owner name =================================> */}
        <Typography
          component={"p"}
          sx={{ color: palette.grey[50] }}
        >{`به نام : ${"مریم اصلانی"}`}</Typography>
      </Box>

      <Divider />
      {/* Footer =============================== > */}
      {!onlyInfo && (
        <Box
          sx={{
            p: "8px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: alpha(palette.primary.main, 0.1),
          }}
        >
          {/* Enable Button ======================== > */}
          <MuiButton
            buttonProps={{
              variant: "outlined",
              sx: footerButton_sx,
            }}
          >
            <DoneRoundedIcon />
            <Typography sx={{ fontSize: "12px" }}>فعال کردن کارت</Typography>
          </MuiButton>
          {/* Edit Button ============================== > */}
          <Link href={"/my-panel/account/add?edit=1"}>
            <MuiButton
              buttonProps={{
                variant: "outlined",
                sx: footerButton_sx,
              }}
            >
              <EditNoteRoundedIcon />
            </MuiButton>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default AccountCard;
