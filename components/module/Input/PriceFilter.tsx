import { MuiButton, MuiSlider } from "@/components/ui";
import { Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import React, { useState } from "react";

interface myProps {
  containerProps?: BoxProps;
}
function PriceFilter({ containerProps }: myProps) {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  // todo add a prop to send filtered price to out of the component
  return (
    <Box {...containerProps}>
      {/* From ================= > */}
      <Box>
        <Typography>{`از ${from.toLocaleString()} تومان`}</Typography>
        <MuiSlider
          onChange={(val) => {
            setFrom(val);
          }}
        />
      </Box>
      {/* To ======================= > */}
      <Box>
        <Typography>{`تا ${to.toLocaleString()} تومان`}</Typography>
        <MuiSlider
          onChange={(val) => {
            setTo(val);
          }}
        />
      </Box>
    </Box>
  );
}

export default PriceFilter;
