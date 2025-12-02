import { Stack, Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import React from "react";

interface MyProps {
  price?: string | number;
  type?: "expense" | "income";
  /**
   * fontSize of number
   */
  fontSize?: TypographyProps["fontSize"];
  /**
   * fontSize of unit which is "تومان"
   */
  unitFontSize?: TypographyProps["fontSize"];
}
function TextPrice({ price = 300000, type, fontSize, unitFontSize }: MyProps) {
  const isIncome = type == "income";
  const color: "error" | "success" | undefined = type
    ? isIncome
      ? "success"
      : "error"
    : undefined;

  return (
    <Stack flexDirection={"row"} alignItems={"center"} gap={"8px"}>
      <Typography
        color={color}
        fontSize={fontSize ?? "20px"}
        component={"span"}
      >
        {/* Price ========================> */}

        {price?.toLocaleString()}
        {/* unit ========================> */}
      </Typography>
      <Typography
        component={"span"}
        color={color}
        fontSize={unitFontSize ?? "14px"}
      >
        {"تومان"}
      </Typography>
    </Stack>
  );
}

export default TextPrice;
