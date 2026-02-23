import { useWheelSelector } from "@/hooks";
import type { WheelSelectorComponent } from "@/components/ui/types";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  SxProps,
  Theme,
} from "@mui/material";
import { muiTheme } from "@/packages/mui";
import { useCallback } from "react";
import { OptimizedMap } from "@/components/module";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { PickOptionElementAttributes } from "@/types/elementAttributes.types";
const sx_parentBox: SxProps = {
  ["& .active-option"]: {
    fontWeight: 700,
  },
};
const sx_shadowBox: SxProps<Theme> = (tm: Theme) => {
  const { palette, alpha } = tm;
  return {
    "::after": {
      content: `""`,
      position: "absolute",
      width: "100%",
      height: "25%",
      zIndex: "3",
      backgroundImage: `linear-gradient(180deg, ${palette.background.paper}, ${alpha(palette.background.paper, 0.5)}, ${alpha(palette.background.paper, 0)})`,
      top: 0,
      left: 0,
      pointerEvents: "none",
    },
    "::before": {
      content: `""`,
      position: "absolute",
      width: "100%",
      height: "25%",
      zIndex: "3",
      backgroundImage: `linear-gradient(0deg, ${palette.background.paper}, ${alpha(palette.background.paper, 0.5)}, ${alpha(palette.background.paper, 0)})`,
      bottom: 0,
      left: 0,
      pointerEvents: "none",
    },
    width: "100%",
  };
};
const sx_scrollBox: SxProps<Theme> = (tm: Theme) => {
  return {
    height: "150px",
    width: "100%",
    scrollBehavior: "smooth",
    scrollSnapType: "y mandatory",
    overflowY: "auto",
    overflowX: "hidden",
    ...(tm.custom!.noScroll as object),
  };
};
const sx_selectorBox: SxProps<Theme> = (tm) => {
  const { palette, alpha } = tm;
  return {
    height: "50px",
    width: "100%",
    borderTop: `1px solid ${muiTheme(palette.mode, { dark: alpha("#fff", 0.3), light: alpha("#000", 0.3) })}`,
    borderBottom: `1px solid ${muiTheme(palette.mode, { dark: alpha("#fff", 0.3), light: alpha("#000", 0.3) })}`,
    position: "absolute",
    zIndex: 2,
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  };
};
const sx_option: SxProps = {
  height: "50px",
  width: "100%",
  scrollSnapAlign: "center",
  scrollSnapStop: "always",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "transparent",
  fontFamily: "var(--dana-md)",
};
const shared_button_props: ButtonProps = {
  variant: "outlined",
  size: "small",
  sx: (tm) => tm.custom!.circleButton as object,
};

const WheelSelector: WheelSelectorComponent = function ({
  onChangeOption,
  selctedOption,
  options = [],
}) {
  const wheel = useWheelSelector({
    active_className: "active-option",
    value: selctedOption,
    onChange: onChangeOption,
  });

  const optionsProps = useCallback(
    (
      item: PickOptionElementAttributes<"value" | "children">,
      index: number,
    ): BoxProps<"option"> => {
      return {
        component: "option",
        sx: sx_option,
        value: item.value,
        children: item.children,
        ...wheel.registerEachOption(index),
      };
    },
    [wheel.registerEachOption, sx_option],
  );
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="8px"
      flexDirection="column"
      position={"relative"}
      width={"100%"}
      sx={sx_parentBox}
    >
      {/* // * ---------------- Prev Button ---------------- */}
      <Button {...shared_button_props} onClick={wheel.prevOption}>
        <KeyboardArrowUpRoundedIcon />
      </Button>

      {/* // * ---------------- Scroll Shadow ---------------- */}
      <Box sx={sx_shadowBox} position={"relative"}>
        {/* // * ---------------- Scroll Container ---------------- */}
        <Box sx={sx_scrollBox} {...wheel.registerScrollContainer()}>
          <Box height={"50px"} width={"100%"}></Box>
          {/* // * ---------------- Options ---------------- */}
          <OptimizedMap
            Component={Box}
            data={options}
            injector={optionsProps}
          />
          <Box height={"50px"} width={"100%"}></Box>
        </Box>
      </Box>

      {/* // * ---------------- Next Button ---------------- */}
      <Button {...shared_button_props} onClick={wheel.nextOption}>
        <KeyboardArrowDownRoundedIcon />
      </Button>

      {/* // * ---------------- Selector ---------------- */}
      <Box sx={sx_selectorBox} />
    </Box>
  );
};

export default WheelSelector;
