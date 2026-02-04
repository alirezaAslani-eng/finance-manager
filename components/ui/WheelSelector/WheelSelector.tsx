import { useWheelSelector } from "@/hooks";
import { contextCreator } from "@/utils";
import type {
  Compound_ButtonProps,
  Compound_OptionProps,
  Compound_Selector,
  Compound_WheelProps,
  Compound_WheelShadowProps,
  WheelSelectorProps,
} from "@/components/ui/types";
import { Box, Button } from "@mui/material";
import { UseWheelSelectorReturnType } from "@/hooks/app/types";
import { identifySxProp, muiTheme } from "@/packages/mui";
const { Context, useCreatedContext } =
  contextCreator<UseWheelSelectorReturnType>();

function WheelSelector({
  children,
  onChangeOption,
  value,
  boxProps,
}: WheelSelectorProps) {
  return (
    // todo style the component based on MUI
    <Context
      value={useWheelSelector({
        onChange: onChangeOption,
        value,
        active_className: "active-option",
      })}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="8px"
        flexDirection="column"
        {...boxProps}
        sx={{
          ["& .active-option"]: {
            fontWeight: 700,
          },
        }}
      >
        {children}
      </Box>
    </Context>
  );
}

// * Compound Components ---------------------------------- >
WheelSelector.WheelShadow = (props: Compound_WheelShadowProps) => {
  return (
    <Box
      {...props}
      sx={(tm) => {
        const { palette, alpha } = tm;
        return {
          "::after": {
            content: `""`,
            position: "absolute",
            width: "100%",
            height: "25%",
            zIndex: "3",
            backgroundImage: `linear-gradient(180deg, ${palette.background.default}, ${alpha(palette.background.default, 0.5)}, ${alpha(palette.background.default, 0)})`,
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
            backgroundImage: `linear-gradient(0deg, ${palette.background.default}, ${alpha(palette.background.default, 0.5)}, ${alpha(palette.background.default, 0)})`,
            bottom: 0,
            left: 0,
            pointerEvents: "none",
          },
          width: "100%",
          ...identifySxProp(tm, props?.sx),
        };
      }}
      position={"relative"}
    >
      {props?.children}
    </Box>
  );
};

WheelSelector.Wheel = (props: Compound_WheelProps) => {
  const { registerScrollContainer } = useCreatedContext();
  return (
    <Box
      {...props}
      sx={(tm) => {
        return {
          height: "150px",
          width: "100%",
          scrollBehavior: "smooth",
          scrollSnapType: "y mandatory",
          overflowY: "auto",
          overflowX: "hidden",
          ...identifySxProp(tm, props?.sx),
          ...(tm.custom!.noScroll as object),
        };
      }}
      {...registerScrollContainer()}
    >
      <Box height={"50px"} width={"100%"}></Box>
      {props?.children}
      <Box height={"50px"} width={"100%"}></Box>
    </Box>
  );
};

WheelSelector.Option = (props: Compound_OptionProps) => {
  const { registerEachOption } = useCreatedContext();
  return (
    <Box
      sx={{
        height: "50px",
        width: "100%",
        scrollSnapAlign: "center",
        scrollSnapStop: "always",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "transparent",
        fontFamily: "var(--dana-md)",
      }}
      {...props}
      {...registerEachOption(props.tabIndex)}
      component={"option"}
    >
      {props?.children}
    </Box>
  );
};

WheelSelector.Button = ({
  buttonProps,
  children,
  action_type,
}: Compound_ButtonProps) => {
  const { prevOption, nextOption } = useCreatedContext();
  return (
    <Button
      {...buttonProps}
      onClick={(e) => {
        if (action_type === "next") nextOption();
        else if (action_type === "prev") prevOption();
        buttonProps?.onClick && buttonProps.onClick(e);
      }}
    >
      {children}
    </Button>
  );
};

WheelSelector.Selector = (props: Compound_Selector) => {
  return (
    <Box
      sx={(tm) => {
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
          ...identifySxProp(tm, props?.sx),
        };
      }}
      {...props}
    ></Box>
  );
};

export default WheelSelector;

/**
 * ? Usage :
<WheelSelector>
 <WheelSelector.Button action_type="prev">قبلی</WheelSelector.Button>
 <WheelSelector.WheelShadow>
   <WheelSelector.Wheel>
 <WheelSelector.Option tabIndex={0}>1</WheelSelector.Option>
 <WheelSelector.Option tabIndex={1}>2</WheelSelector.Option>
 <WheelSelector.Option tabIndex={2}>3</WheelSelector.Option>
 <WheelSelector.Option tabIndex={3}>4</WheelSelector.Option>
   </WheelSelector.Wheel>
   <WheelSelector.Selector />
 </WheelSelector.WheelShadow>
 <WheelSelector.Button action_type="next">بعدی</WheelSelector.Button>
</WheelSelector>
 */
