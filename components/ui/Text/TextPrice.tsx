import { Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import React from "react";

interface MyProps {
  price?: string | number;
  unitProps?: TypographyProps;
  priceProps?: TypographyProps;
  type?: "expense" | "income";
  normal?: boolean;
}
function TextPrice({
  price = 300000,
  priceProps,
  unitProps,
  type = "income",
  normal,
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
        color: color,
        ...priceProps?.sx,
      }}
      component={"span"}
    >
      {/* Price ========================> */}
      {!normal ? (type == "expense" ? "-" : "+") : ""} {price?.toLocaleString()}
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
