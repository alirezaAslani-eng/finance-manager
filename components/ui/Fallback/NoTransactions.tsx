import { Box, Button, Stack, StackProps, Typography } from "@mui/material";
import React from "react";
import MuiButton from "../Button/MuiButton";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
interface MyProps {
  text?: string;
  /**
   * if true, Element is in a centered position
   */
  center?: boolean;
  link?: boolean;
}

function NoTransactions({
  text = "تراکنش یافت نشد",
  center,
  link = true,
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
      {link && (
        <Link href={"/my-panel/transactions/add"}>
          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
            <Typography color="primary">{"ایجاد تراکنش"}</Typography>
            <ArrowBackRoundedIcon color="primary" />
          </Box>
        </Link>
      )}
    </Stack>
  );
}

export default NoTransactions;
