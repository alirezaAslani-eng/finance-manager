import Image from "next/image";
import React from "react";
import noDataPic from "@/assets/images/icons/noTransaction.png";
import { Box, Typography, useTheme } from "@mui/material";
import MuiButton from "../Button/MuiButton";
import Link from "next/link";
import { muiTheme } from "@/utils";

interface MyProp {
  noDataText?: string;
  link?: string;
  buttonText?: string;
}
function NoData({
  noDataText = "اطلاعاتی وجود ندارد",
  buttonText = "ایجاد اطلاعات",
  link = "/",
}: MyProp) {
  // * Style ==================== >
  const theme = useTheme();
  const {
    palette: { grey, mode },
  } = theme;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* // * Icon =========================== > */}
      <Box sx={{ width: "200px", height: "200px", position: "relative" }}>
        <Image style={{ objectFit: "cover" }} src={noDataPic} alt="" fill />
      </Box>
      {/* //  * Text =========================== > */}
      <Typography
        component={"span"}
        variant="h1"
        sx={{
          fontSize: "28px",
          color: muiTheme(mode, { light: grey[800], dark: grey[100] }),
        }}
      >
        {noDataText}
      </Typography>
      {/* // * Link =========================== > */}
      <Link href={link}>
        <MuiButton
          buttonProps={{
            sx: {
              ...theme.custom.resetButton,
              borderRadius: "999px",
              p: "15px",
              fontSize:"18px"
            },
          }}
        >
          {buttonText}
        </MuiButton>
      </Link>
    </Box>
  );
}

export default NoData;
