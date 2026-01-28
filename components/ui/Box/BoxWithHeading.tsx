import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Typography,
  TypographyProps,
  useMediaQuery,
} from "@mui/material";

const BoxWithHeading = (props: BoxProps) => {
  return (
    <Box width={"100%"} {...props}>
      {props.children}
    </Box>
  );
};

export default BoxWithHeading;

BoxWithHeading.Heading = function (props: BoxProps) {
  return (
    <Box
      display={"flex"}
      justifyContent={{ xs: "center", _540: "space-between" }}
      flexDirection={{ xs: "column", _540: "row" }}
      alignItems={"center"}
      gap={"4px"}
      flexWrap={"wrap"}
      {...props}
    >
      {props.children}
    </Box>
  );
};
BoxWithHeading.TitleHeading = function (props: TypographyProps) {
  return (
    <Typography variant="xl-title" {...props}>
      {props.children}
    </Typography>
  );
};
BoxWithHeading.ButtonHeading = function (props: ButtonProps) {
  const isAftersm = useMediaQuery(({ breakpoints }) => breakpoints.up("sm"));
  return (
    <Button
      sx={{ gap: "8px" }}
      size={isAftersm ? "medium" : "small"}
      {...props}
    >
      {props.children}
    </Button>
  );
};
BoxWithHeading.Content = function (props: BoxProps) {
  return <Box mt="20px">{props.children}</Box>;
};
