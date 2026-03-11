import { identifySxProp } from "@/packages/mui";
import {
  Button,
  ButtonProps,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from "@mui/material";

function InputTrigger(props: StackProps) {
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      {...props}
    >
      {props.children}
    </Stack>
  );
}

InputTrigger.TriggerButton = function (props: ButtonProps) {
  return (
    <Button size="medium" {...props}>
      {props.children}
    </Button>
  );
};
InputTrigger.Placeholder = function (props: TypographyProps) {
  return (
    <Typography
      component={"span"}
      {...props}
      sx={(tm) => ({
        cursor: "pointer",
        userSelect: "none",
        ...identifySxProp(tm, props.sx),
      })}
    >
      {props.children}
    </Typography>
  );
};

export default InputTrigger;
