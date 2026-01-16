import { triggerRandomID } from "@/lib/utils";
import { Box, BoxProps } from "@mui/material";
import React, { useState } from "react";

interface MyProps {
  animationDurationAsMs?: number;
  bgcolor?: BoxProps["bgcolor"];
  circleSize?: string;
}
function CircleLoader({
  animationDurationAsMs = 300,
  bgcolor = "background.paper",
  circleSize = "10px",
}: MyProps) {
  const [triggerRemount, setTriggerRemount] = useState(false);
  return (
    <Box display={"flex"} alignItems={"center"} gap={"4px"}>
      <Box
        key={triggerRandomID(triggerRemount)}
        height={circleSize}
        bgcolor={bgcolor}
        borderRadius={"999px"}
        sx={{
          aspectRatio: "1/1",
          opacity: "0.5",
          animation: `breath-opacity ease ${animationDurationAsMs}ms`,
        }}
      />
      <Box
        key={triggerRandomID(triggerRemount)}
        height={circleSize}
        bgcolor={bgcolor}
        borderRadius={"999px"}
        sx={{
          aspectRatio: "1/1",
          opacity: "0.5",
          animation: `breath-opacity ease ${animationDurationAsMs}ms`,
          animationDelay: `${animationDurationAsMs * 2}ms`,
        }}
        onAnimationEnd={() => {
          setTriggerRemount((prev) => !prev);
        }}
      />
      <Box
        key={triggerRandomID(triggerRemount)}
        height={circleSize}
        bgcolor={bgcolor}
        borderRadius={"999px"}
        sx={{
          aspectRatio: "1/1",
          opacity: "0.5",
          animation: `breath-opacity ease ${animationDurationAsMs}ms`,
          animationDelay: `${animationDurationAsMs}ms`,
        }}
      />
    </Box>
  );
}

export default CircleLoader;
