import NorthWestRoundedIcon from "@mui/icons-material/NorthWestRounded";
import { Box, Typography, useTheme } from "@mui/material";
import type { BoxProps } from "@mui/material";
import React, { PropsWithChildren } from "react";
import MuiButton from "../Button/MuiButton";
import { muiTheme } from "@/utils";
import Link from "next/link";

interface myProp {
  title: string;
  boxProps?: BoxProps;
  hasButton?: boolean;
  link?: string;
}
function BoxWithTitle({
  children,
  title = "عنوان تستی",
  boxProps,
  hasButton=true,
  link,
}: PropsWithChildren<myProp>) {
  const { palette, alpha } = useTheme();
  const backgroundColor = alpha(palette.primary.main, 0.2);
  return (
    <Box
    boxShadow={"initial"}
      {...boxProps}
      sx={{
        backgroundColor,
        padding: "20px",
        borderRadius: "20px",
        ...boxProps?.sx,
      }}
    >
      {/* Heading ================== > */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title ====================== > */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "32px" },
            color: muiTheme(palette.mode, {
              dark: palette.grey[200],
              light: palette.grey[900],
            }),
          }}
        >
          {title}
        </Typography>
        {/* Link ============================= > */}
        {hasButton ? (
          <Link href={link || ""}>
            <MuiButton
              buttonProps={{
                sx: { display: "flex", alignItems: "center", gap: "8px" },
              }}
            >
              مشاهده همه
              <NorthWestRoundedIcon />
            </MuiButton>
          </Link>
        ) : undefined}
      </Box>
      {/* Content ==================== > */}
      {/* space between content and title is from children  */}
      {children}
    </Box>
  );
}

export default BoxWithTitle;
