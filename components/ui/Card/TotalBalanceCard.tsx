import { muiTheme } from "@/packages/mui";
import { ComponentFetchState } from "@/types/component.types";
import { contextCreator } from "@/utils";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Skeleton,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { createContext, PropsWithChildren, useContext } from "react";

// * Component's Context =========== >
const { Context, useCreatedContext } = contextCreator<ComponentFetchState>();

// * Parent Component =============== >
const TotalBalanceCard = (props: PropsWithChildren<StackProps>) => {
  return (
    <Context value={{ data: "", isError: false, isPending: true }}>
      <Stack
        height={"fit-content"}
        alignItems={"center"}
        gap={"16px"}
        bgcolor={"background.paper"}
        p={"14px"}
        borderRadius={"18px"}
        border={"1px solid"}
        borderColor={(tm) =>
          muiTheme(tm.palette.mode, {
            light: tm.alpha(tm.palette.black, 0.12),
            dark: tm.alpha(tm.palette.white, 0.12),
          })
        }
        {...props}
      >
        {props.children}
      </Stack>
    </Context>
  );
};
// * Children Components =============== >
TotalBalanceCard.BalanceSection = function (
  props: PropsWithChildren<BoxProps>,
) {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      fontSize={{ xs: "16px", sm: "20px" }}
      {...props}
    >
      {props.children}
    </Box>
  );
};

TotalBalanceCard.BalanceText = function (
  props: PropsWithChildren<TypographyProps>,
) {
  const { isPending, isError } = useCreatedContext();
  return (
    <>
      <Typography
        component={"span"}
        fontSize={"inherit"}
        {...props}
        sx={{ opacity: isError || isPending ? "0.5" : undefined, ...props.sx }}
      >
        {props.children}
      </Typography>
    </>
  );
};

TotalBalanceCard.BalanceNumber = function (props: TypographyProps) {
  const { isPending, isError } = useCreatedContext();
  return (
    <>
      {isPending || isError ? (
        <Skeleton variant="text" width="100px" sx={{ fontSize: "inherit" }} />
      ) : (
        <Typography component={"span"} fontSize={"inherit"} {...props}>
          {"0 تومان"}
        </Typography>
      )}
    </>
  );
};

TotalBalanceCard.AccountSection = function (
  props: PropsWithChildren<BoxProps>,
) {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"8px"}
      width={"100%"}
      {...props}
    >
      {props.children}
    </Box>
  );
};

TotalBalanceCard.AccountIconList = function (props: BoxProps) {
  const { isPending, isError } = useCreatedContext();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={isPending || isError ? "8px" : undefined}
      {...props}
    >
      {isPending || isError ? (
        <>
          <Skeleton
            variant="rounded"
            height={"25px"}
            sx={{ aspectRatio: "1/1" }}
          />
          <Skeleton
            variant="rounded"
            height={"25px"}
            sx={{ aspectRatio: "1/1" }}
          />
        </>
      ) : (
        <>
          <Box
            src="/images/bankIcons/melli-22.svg"
            alt=""
            component={"img"}
            height={"35px"}
            sx={{ objectFit: "cover", aspectRatio: "1/1" }}
            {...props}
          />
        </>
      )}
    </Box>
  );
};

TotalBalanceCard.AccountButton = function (
  props: PropsWithChildren<ButtonProps>,
) {
  const { isPending, isError } = useCreatedContext();
  return (
    <Button
      size="small"
      color="success"
      variant="outlined"
      sx={{ alignItems: "center", display: "flex", gap: "4px" }}
      {...props}
      disabled={props.disabled || isPending || isError}
    >
      {props.children}
    </Button>
  );
};

export default TotalBalanceCard;
