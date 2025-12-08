import { Box, Button, Stack, StackProps, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// * Links is Defined it to enable intellisense
type Links = "/my-panel/transactions/add";

interface MyProps {
  text?: string;
  /**
   * if true, Element is in a centered position relative parent
   */
  center?: boolean;
  linkAddress?: Links;
  linkText?: string;
}

function NoTransactions({
  text = "تراکنش یافت نشد",
  center,
  linkAddress = "/my-panel/transactions/add",
  linkText,
}: MyProps) {
  return (
    <Stack
      gap={"10px"}
      width={"min(400px,100%)"}
      px={"16px"}
      textAlign={"center"}
      alignItems={"center"}
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
      <Typography
        fontSize={{ xs: "18px", sm: "24px" }}
        fontFamily={"var(--peyda-md)"}
      >
        {text}
      </Typography>
      {linkText && (
        <Link href={linkAddress}>
          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
            <Typography color="primary">{linkText}</Typography>
            <ArrowBackRoundedIcon color="primary" />
          </Box>
        </Link>
      )}
    </Stack>
  );
}

export default NoTransactions;
