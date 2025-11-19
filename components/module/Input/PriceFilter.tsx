import { MuiButton, MuiSlider } from "@/components/ui";
import { Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import React, { useState } from "react";

type FromOnChange = (val: number) => void;
type ToOnChange = (val: number) => void;
interface myProps {
  containerProps?: BoxProps;
  fromValue?: number;
  toValue?: number;
  fromOnChange?: FromOnChange;
  toOnChange?: ToOnChange;
  max?: number;
}
function PriceFilter({
  containerProps,
  fromOnChange,
  toOnChange,
  fromValue,
  toValue,
  max = 500_000,
}: myProps) {
  return (
    <Box {...containerProps}>
      {/* From ================= > */}
      <Box>
        <Typography>{`از ${
          fromValue?.toLocaleString() ?? 0
        } تومان`}</Typography>
        <MuiSlider
          onChange={(val) => {
            fromOnChange && fromOnChange(val);
          }}
          value={fromValue}
          max={max}
        />
      </Box>
      {/* To ======================= > */}
      <Box>
        <Typography>{`تا ${toValue?.toLocaleString() ?? 0} تومان`}</Typography>
        <MuiSlider
          onChange={(val) => {
            toOnChange && toOnChange(val);
          }}
          value={toValue}
          max={max}
        />
      </Box>
    </Box>
  );
}

export type { FromOnChange, ToOnChange };
export default PriceFilter;
