import { identifySxProp } from "@/packages/mui";
import { ArrowBackRounded } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useRouter } from "next/navigation";

function FormPanelHeading(props: BoxProps) {
  return (
    <Box
      display={"flex"}
      justifyContent={{ xs: "space-between", sm: "center" }}
      alignItems={"center"}
      height={"60px"}
      my={"24px"}
      px={"16px"}
    >
      {props.children}
    </Box>
  );
}

FormPanelHeading.Title = function (props: TypographyProps) {
  return (
    <Typography variant="xl-title" {...props}>
      {props.children}
    </Typography>
  );
};
FormPanelHeading.BackButton = function (props: ButtonProps) {
  const { back } = useRouter();
  return (
    <Button
      variant="text-grey"
      {...props}
      sx={(tm) => ({
        display: { xs: "flex", sm: "none" },
        ...(tm.custom!.circleButton as object),
        ...identifySxProp(tm, props.sx),
      })}
      onClick={back}
    >
      <ArrowBackRounded />
    </Button>
  );
};

export default FormPanelHeading;
