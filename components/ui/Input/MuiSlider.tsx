import { Slider } from "@mui/material";
import React, { useState } from "react";

interface myProps {
  max?: number;
  onChange?: (num: number) => any;
}
function MuiSlider({ max = 500_000, onChange = () => {} }: myProps) {
  const [value, setValue] = useState(0);
  const handleChange = (_: Event, v: number) => {
    setValue(v);
    onChange(v);
  };
  return (
    <>
      <Slider
        marks={[
          { value: 0,  },
          { value: 5000000 },
        ]}
        step={100000}
        valueLabelDisplay="auto"
        min={0}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}

export default MuiSlider;
