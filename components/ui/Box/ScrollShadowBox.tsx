import { Box, styled } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { CSSProperties, useTheme } from "@mui/material/styles";
import React, { PropsWithChildren } from "react";

const _ScrollShadowBox = styled(Box)({
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  position: "relative",
});

interface MyProps {
  boxProps?: BoxProps;
  yScroll?: boolean;
  xScroll?: boolean;
}
const ScrollShadowBox = ({
  children,
  boxProps,
  xScroll = false,
  yScroll = false,
}: PropsWithChildren<MyProps>) => {
  const {
    palette: { background },
  } = useTheme();
  return (
    <Box
      sx={{
        position: "relative", // * Shadow ===================== >
        height: "fit-content",
        "&::after": {
          content: `""`,
          position: "absolute",
          width: xScroll ? "50px" : "100%",
          height: xScroll ? "100%" : "50px",
          background: `linear-gradient(${xScroll ? "to right" : "to top"}, ${
            background.default
          } 10% , transparent 100%)`,
          bottom: "0",
          left: "0",
        } as CSSProperties,
      }}
    >
      <_ScrollShadowBox
        {...boxProps}
        sx={{
          overflowX: yScroll ? "auto" : undefined,
          overflowY: xScroll ? "auto" : undefined,
          ...boxProps?.sx,
          boxSizing: "content-box",
          pl: xScroll ? "50px" : "0",
          pb: yScroll ? "50px" : "0",
        }}
      >
        {children}
      </_ScrollShadowBox>
    </Box>
  );
};

export default ScrollShadowBox;
