import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Stack,
  SvgIconProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { PropsWithChildren } from "react";
import Link from "next/link";

import { UrlObject } from "url";
import { contextCreator } from "@/utils";
import { ComponentFetchState } from "@/types/component.types";

const { Context, useCreatedContext } =
  contextCreator<Required<ComponentFetchState<"Data Type">>>();

// * Parent Component ================= >
function IncomeExpenseCard(props: BoxProps) {
  return (
    <Context value={{ data: "Data Type", isError: false, isPending: false }}>
      <Box p={"16px"} {...props}>
        {props.children}
      </Box>
    </Context>
  );
}

// * Compound Children ================= >
IncomeExpenseCard.Title = function (props: PropsWithChildren<TypographyProps>) {
  const { isPending, isError } = useCreatedContext();
  return (
    <Typography
      variant="xl"
      textAlign={"center"}
      {...props}
      sx={{ opacity: isPending || isError ? "0.5" : undefined, ...props.sx }}
    >
      {props.children}
    </Typography>
  );
};
IncomeExpenseCard.IncomeExpenseSection = function (
  props: PropsWithChildren<BoxProps>
) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"24px"}
      mt={"24px"}
      {...props}
    >
      {props.children}
    </Box>
  );
};
IncomeExpenseCard.IncomeCategory = function (props: SvgIconProps) {
  const { color = "success" } = props;
  const { isPending, isError } = useCreatedContext();
  const isDisabledIcon = isPending || isError;
  return (
    <Stack
      alignItems={"center"}
      sx={{ opacity: isDisabledIcon ? "0.5" : undefined }}
    >
      <ArrowBack
        sx={{
          transform: "rotate(-90deg)",
          fontSize: "40px",
        }}
        {...props}
        color={color}
      />

      {!isDisabledIcon && (
        <Typography variant="base" color={color}>
          {"حقوق ماهیانه"}
        </Typography>
      )}
    </Stack>
  );
};
IncomeExpenseCard.ExpenseCategory = function (props: SvgIconProps) {
  const { color = "error" } = props;
  const { isPending, isError } = useCreatedContext();
  const isDisabledIcon = isPending || isError;
  return (
    <Stack
      alignItems={"center"}
      sx={{ opacity: isDisabledIcon ? "0.5" : undefined }}
    >
      <ArrowBack
        sx={{
          transform: "rotate(90deg)",
          fontSize: "40px",
        }}
        {...props}
        color={color}
      />

      {!isDisabledIcon && (
        <Typography variant="base" color={color}>
          {"خرج خونه"}
        </Typography>
      )}
    </Stack>
  );
};
IncomeExpenseCard.MoreDetailsButton = function (
  props: PropsWithChildren<{
    buttonProps?: ButtonProps;
    href?: UrlObject | string;
  }>
) {
  const { buttonProps, children, href } = props;
  const { isPending, isError } = useCreatedContext();
  const isDisabledButton = isError || isPending;
  return (
    <Link href={isDisabledButton ? "" : href ?? "/my-panel/transactions"}>
      <Button
        variant="outlined"
        color="success"
        size="large"
        fullWidth
        {...buttonProps}
        disabled={buttonProps?.disabled || isDisabledButton}
      >
        {children}
      </Button>
    </Link>
  );
};

export default IncomeExpenseCard;
