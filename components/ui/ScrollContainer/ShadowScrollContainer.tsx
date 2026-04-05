import { gradient } from "@/packages/mui";
import { ParamType } from "@/types/utils";
import { Box, BoxProps } from "@mui/material";

function ShadowScrollContainer(props: Omit<BoxProps, "position">) {
  return (
    <Box {...props} position={"relative"}>
      {props.children}
    </Box>
  );
}

ShadowScrollContainer.Scroll = function (props: BoxProps) {
  return (
    <>
      {/* // * --------- scrollContainer --------- */}
      <Box overflow={"auto"} {...props}>
        {props.children}
      </Box>
    </>
  );
};

ShadowScrollContainer.Shadow = function ({
  gradient: gradientProps,
  position,
  size = "32px",
}: ShadowProps) {
  const isHorizontalShadow = position === "right" || position === "left";
  return (
    <Box
      // * ----- Size -----
      width={isHorizontalShadow ? size : "100%"}
      height={isHorizontalShadow ? "100%" : size}
      // * ----- Position -----
      position={"absolute"}
      left={position == "left" || !isHorizontalShadow ? 0 : undefined}
      right={position == "right" ? 0 : undefined}
      top={position == "top" || isHorizontalShadow ? 0 : undefined}
      bottom={position == "bottom" ? 0 : undefined}
      sx={(tm) => ({
        // * ----- Gradient -----
        backgroundImage: gradient({
          deg: gradientProps?.deg ?? "to top",
          colors: gradientProps?.colors ?? [
            `${tm.palette.background.paper} 20%`,
            "transparent",
          ],
        }),
      })}
    />
  );
};

export default ShadowScrollContainer;

interface ShadowProps {
  size?: `${number}px`;
  gradient?: Partial<ParamType<typeof gradient>>;
  position: "left" | "right" | "top" | "bottom";
}
