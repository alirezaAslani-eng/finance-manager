import { MuiButton, MuiSlider } from "@/components/ui";
import { Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import React, { useState } from "react";

type PriceFilterOnChange = (val: {
  from: null | number;
  to: null | number;
}) => void;
interface myProps {
  containerProps?: BoxProps;
  fromValue?: number | null;
  toValue?: number | null;
  onChange?: PriceFilterOnChange;
  max?: number;
}
function PriceFilter({
  containerProps,
  onChange,
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
            onChange && onChange({ from: val, to: toValue ?? 0 });
          }}
          value={fromValue ?? undefined}
          max={max}
        />
      </Box>
      {/* To ======================= > */}
      <Box>
        <Typography>{`تا ${toValue?.toLocaleString() ?? 0} تومان`}</Typography>
        <MuiSlider
          onChange={(val) => {
            onChange && onChange({ from: fromValue ?? 0, to: val });
          }}
          value={toValue ?? undefined}
          max={max}
        />
      </Box>
    </Box>
  );
}

export type { PriceFilterOnChange };
export default PriceFilter;
