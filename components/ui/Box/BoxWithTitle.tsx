import { Box, Typography, useTheme } from "@mui/material";
import type { BoxProps } from "@mui/material";
import React, { PropsWithChildren, ReactNode } from "react";
import { muiTheme } from "@/utils";

interface myProp {
  title: string;
  boxProps?: BoxProps;
  Button?: ReactNode;
}
function BoxWithTitle({
  children,
  title = "عنوان تستی",
  boxProps,
  Button,
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
        borderRadius: {
          xs:"0px",
          md:"20px"
        },
        ...boxProps?.sx,
      }}
    >
      {/* Heading ================== > */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Title ====================== > */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "25px", sm: "32px" },
            color: muiTheme(palette.mode, {
              dark: palette.grey[200],
              light: palette.grey[900],
            }),
          }}
        >
          {title}
        </Typography>
        {/* Link ============================= > */}
        {Button}
      </Box>
      {/* Content ==================== > */}
      {/* space between content and title is from children  */}
      {children}
    </Box>
  );
}

export default BoxWithTitle;
