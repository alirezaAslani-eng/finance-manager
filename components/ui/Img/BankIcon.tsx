import { identifySxProp } from "@/packages/mui";
import { Box, BoxProps } from "@mui/material";
import React from "react";
interface BankIconProps extends BoxProps<"img"> {
  src: string | undefined;
  alt: string | undefined;
}
function BankIcon(props: BankIconProps) {
  return (
    <Box
      {...props}
      sx={(tm) => ({
        width: "30px",
        height: "30px",
        objectFit: "cover",
        ...identifySxProp(tm, props.sx),
      })}
      component={"img"}
    />
  );
}

export default BankIcon;
