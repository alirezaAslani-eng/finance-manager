import { Slider } from "@mui/material";
import React, { useState } from "react";

interface myProps {
  max?: number;
  value?: number;
  onChange?: (num: number) => any;
}
function MuiSlider({ max = 500_000, onChange = () => {}, value }: myProps) {
  const [_value, setValue] = useState(0);
  const handleChange = (_: Event, v: number) => {
    if (!value) {
      setValue(v);
    }
    onChange(v);
  };

  return (
    <>
      <Slider
        min={0}
        max={max}
        step={!max ? Math.floor(max / 4) : 100}
        valueLabelDisplay="auto"
        value={value ?? _value}
        onChange={handleChange}
      />
    </>
  );
}

export default MuiSlider;
