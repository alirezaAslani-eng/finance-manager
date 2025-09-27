import { Box, Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface MyProps {
  price?: string | number;
  unitProps?: TypographyProps;
  priceProps?: TypographyProps;
  type?: "expense" | "income";
}
function TextPrice({
  price = 300000,
  priceProps,
  unitProps,
  type = "income",
}: MyProps) {
  const color = type == "income" ? "success.main" : "error.main";
  return (
    <Typography
      {...priceProps}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "32px",
        ...priceProps?.sx,
      }}
      component={"span"}
      color={color}
    >
      {/* Price ========================> */}
      {type == "expense" ? "-" : "+"} {price?.toLocaleString()}
      {/* unit ========================> */}
      <Typography
        component={"span"}
        {...unitProps}
        sx={{ fontSize: "14px", ...unitProps?.sx }}
      >
        {"تومان"}
      </Typography>
    </Typography>
  );
}

export default TextPrice;
