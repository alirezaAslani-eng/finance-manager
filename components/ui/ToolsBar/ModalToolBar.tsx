import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Typography,
  TypographyProps,
} from "@mui/material";

function ModalToolBar(props: BoxProps) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      {...props}
    >
      {props.children}
    </Box>
  );
}

ModalToolBar.Button = function (props: ButtonProps) {
  return (
    <Button variant="text-grey" {...props}>
      {props.children}
    </Button>
  );
};
ModalToolBar.CloseButton = function (props: ButtonProps) {
  return (
    <Button variant="text-grey" {...props}>
      <CloseRounded fontSize={props?.size ?? "medium"} />
    </Button>
  );
};
ModalToolBar.Title = function (props: TypographyProps) {
  return <Typography>{props.children}</Typography>;
};

export default ModalToolBar;
