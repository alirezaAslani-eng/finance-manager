import { pulse } from "@/packages/mui";
import { Box, BoxProps } from "@mui/material";

interface PulsingCircleProps extends Pick<
  BoxProps,
  "borderRadius" | "bgcolor"
> {
  size?: string;
  animatedSize?: number;
}

function PulsingCircle({
  animatedSize = 2,
  size = "20px",
  borderRadius = "999px",
  bgcolor = "primary.main",
}: PulsingCircleProps) {
  return (
    <Box
      bgcolor={bgcolor}
      sx={{
        width: size,
        height: size,
        borderRadius,
        position: "relative",
        "::after": {
          content: `""`,
          position: "absolute",
          backgroundColor: "inherit",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius,
          transform: "scale(0)",
          animation: `${pulse(animatedSize)} infinite 800ms linear`,
        },
      }}
    ></Box>
  );
}

export default PulsingCircle;
