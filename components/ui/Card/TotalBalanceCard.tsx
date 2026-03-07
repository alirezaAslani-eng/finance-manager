import { useModalState } from "@/hooks";
import { muiTheme } from "@/packages/mui";
import DialogBottomSheet from "@/packages/mui/styled-components/Dialog/DialogBottomSheet";
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
import { PropsWithChildren } from "react";
import dana_md from "@/constant/font/dana_md";
import { AccountListModal, Accounts } from "@/components/module";
import CloseRounded from "@mui/icons-material/CloseRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import Link from "next/link";

// * Component's Context =========== >
const { Context, useCreatedContext } = contextCreator<ComponentFetchState>();

// * Parent Component =============== >
const TotalBalanceCard = (props: PropsWithChildren<StackProps>) => {
  return (
    <Context value={{ data: "", isError: false, isPending: false }}>
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

TotalBalanceCard.TriggerAccountListButton = function (
  props: PropsWithChildren<ButtonProps>,
) {
  const { isPending, isError } = useCreatedContext();

  const { isOpenModal, closeModal, openModal } = useModalState({
    isParentModal: true,
  });

  return (
    <>
      <Button
        size="small"
        color="success"
        variant="outlined"
        sx={{ alignItems: "center", display: "flex", gap: "4px" }}
        {...props}
        disabled={props.disabled || isPending || isError}
        onClick={(e) => {
          props?.onClick && props.onClick(e);
          openModal(null);
        }}
      >
        {props.children}
      </Button>
      <AccountListModal isOpen={isOpenModal} onClose={closeModal} />
    </>
  );
};

export default TotalBalanceCard;
