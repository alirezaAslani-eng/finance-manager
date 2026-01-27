// * Copy to use :
// <NoData>
//   <NoData.Text>{""}</NoData.Text>
//   <NoData.Link href="">
//     <NoData.Button>{""}</NoData.Button>
//   </NoData.Link>
// </NoData>
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { muiTheme } from "@/packages/mui";

interface NoDataProps extends PropsWithChildren {
  center?: boolean;
  stackProps?: StackProps;
}
function NoData({ center, stackProps, children }: NoDataProps) {
  return (
    <Stack
      gap={"10px"}
      width={"min(400px,100%)"}
      px={"16px"}
      textAlign={"center"}
      alignItems={"center"}
      {...stackProps}
      position={center ? "absolute" : "relative"}
      top={center ? "50%" : undefined}
      // * (- 120px) means -> (- half of SideBar)
      left={
        center
          ? {
              xs: "50%",
              md: "calc(50%)",
            }
          : undefined
      }
      sx={{
        transform: center
          ? {
              xs: "translateX(-50%)",
              md: "translateX(calc(-50% - 120px))",
            }
          : undefined,
      }}
    >
      {children}
    </Stack>
  );
}

NoData.Icon = (props: BoxProps<"img">) => {
  return <Box component={"img"} {...props}></Box>;
};
NoData.Text = (props: TypographyProps) => {
  return (
    <Typography
      sx={({ palette }) => {
        return {
          color: muiTheme(palette.mode, {
            light: palette.grey[700],
            dark: palette.grey[300],
          }),
        };
      }}
      fontSize={{ xs: "18px", sm: "24px" }}
    >
      {props.children}
    </Typography>
  );
};
NoData.Link = (props: PropsWithChildren<LinkProps>) => {
  return (
    <Box>
      <Link {...props}>{props.children}</Link>
    </Box>
  );
};
NoData.Button = (props: ButtonProps) => {
  return (
    <Button
      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
export default NoData;
